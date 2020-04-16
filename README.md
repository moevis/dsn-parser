# parser for dsn

fork from https://github.com/fonini/dsn-parser

```typescript
const DSNParser = require('dsn-parser');

const dsn = new DSNParser('pgsql://user:pass@127.0.0.1:5432/my_db?sslmode=verify-full&application_name=myapp');
dsn.getParts();

/*
{ 
  driver: 'pgsql',
  user: 'user',
  password: 'pass',
  host: '127.0.0.1',
  port: 5432,
  database: 'my_db',
  params: { sslmode: 'verify-full', application_name: 'myapp' } 
} */
```
