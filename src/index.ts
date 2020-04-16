interface DSN {
  driver?: string;
  user?: string;
  password?: string;
  host?: string;
  port?: number;
  database?: string;
  params?: { [k: string]: string };
}

class DSNParser {
  private dsn: string;
  private parts: DSN;
  constructor(dsn: string) {
    this.dsn = dsn;
    this.parts = {};
    this.parse();
  }
  public GetParts(): DSN {
    return this.parts;
  }
  public Format(): string {
    let dsn =
      (this.parts.driver || '') +
      '://' +
      (this.parts.user ? (this.parts.user || '') + (this.parts.password ? ':' + this.parts.password : '') + '@' : '') +
      (this.parts.host || '') +
      (this.parts.port ? ':' + this.parts.port : '') +
      '/' +
      (this.parts.database || '');

    if (this.parts.params && Object.keys(this.parts.params).length > 0) {
      dsn += '?' + toQueryParams(this.parts.params);
    }

    return dsn;
  }
  private parse() {
    const regexp = new RegExp(
      '^' +
      '(?:' +
      '([^:/?#.]+)' + // driver
      ':)?' +
      '(?://' +
      '(?:([^/?#]*)@)?' + // auth
      '([\\w\\d\\-\\u0100-\\uffff.%]*)' + // host
      '(?::([0-9]+))?' + // port
      ')?' +
      '([^?#]+)?' + // database
      '(?:\\?([^#]*))?' + // params
        '$',
    );
    const split = this.dsn.match(regexp);
    if (split == null) {
      return;
    }
    const auth = split.length >= 2 ? split[2].split(':') : [];
    this.parts = {
      driver: split[1],
      user: auth[0] || undefined,
      password: auth[1] || undefined,
      host: split[3],
      port: split[4] ? parseInt(split[4], 10) : undefined,
      database: stripLeadingSlash(split[5]),
      params: fromQueryParams(split[6]),
    };

    return this;
  }
}

function fromQueryParams(params: string) {
  if (!params) {
    return {};
  }
  return JSON.parse('{"' + decodeURI(params).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
}

function stripLeadingSlash(str: string) {
  if (str.substr(0, 1) === '/') {
    return str.substr(1, str.length);
  }
  return str;
}

function toQueryParams(obj: object) {
  const str = [];
  for (const [k, v] of Object.entries(obj)) {
    str.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
  }
  return str.join('&');
}

export default DSNParser;
