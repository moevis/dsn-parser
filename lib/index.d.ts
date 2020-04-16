interface DSN {
    driver?: string;
    user?: string;
    password?: string;
    host?: string;
    port?: number;
    database?: string;
    params?: {
        [k: string]: string;
    };
}
declare class DSNParser {
    private dsn;
    private parts;
    constructor(dsn: string);
    GetParts(): DSN;
    Format(): string;
    private parse;
}
export default DSNParser;
