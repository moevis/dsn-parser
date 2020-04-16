import { expect } from "chai";
import DSNParser from "../src/index";
import 'mocha';

describe('#DSNParser', function() {
    it('should parse correct values', function() {
        const dsn = new DSNParser('pgsql://user:pass@127.0.0.1:5432/my_db?sslmode=verify-full&application_name=myapp');
        const parts = dsn.GetParts();
        expect(expect(parts.driver).to.equal('pgsql'));
        expect(expect(parts.user).to.equal('user'));
        expect(expect(parts.password).to.equal('pass'));
        expect(expect(parts.host).to.equal('127.0.0.1'));
        expect(expect(parts.database).to.equal('my_db'));
        expect(expect(parts.port).to.equal(5432));
        expect(expect(parts.params!.sslmode).to.equal('verify-full'));
        expect(expect(parts.params!.application_name).to.equal('myapp'));
    });
});
