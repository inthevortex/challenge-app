var expect = chai.expect;
var site = site;

describe('site', function() {

    before(function(done) {
        this.xhr = sinon.useFakeXMLHttpRequest();
        var requests = this.requests = [];

        this.xhr.onCreate = function(xhr) {
            requests.push(xhr);
        };

    });

    after(function(done) {
        this.xhr.restore();
    });

    it('get json data', function() {
        var callback = sinon.spy();
        site.getToken(callback);
        expect(this.requests.length).to.equal(1);
        this.requests[0].respond(200, { "Content-type": "application/json" },
            '{ "id": 1, "name": "foobar" }');
        sinon.assert.calledWith(callback, { "id": 1, "name": "foobar" });
    });
});