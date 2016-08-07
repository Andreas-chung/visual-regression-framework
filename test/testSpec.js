var suite = require('../util/Suite');

suite.Mixed('Check the web application has no visual regressions', function (done) {
    var resultObject = {};

    before('Taking screenshots for elements', function (done) {
        driver
            .init()
            .sync()
            .url(baseUrl)
            .webdrivercss('series', [
                {name: 'elementName',elem: '#elementId'},
            ], function (err, res) {
                should.not.exist(err);
                resultObject = res;
            })
            .sync()
            .call(done);
    });

    it('Check the element in the series of elements', function () {
        var elementName = resultObject.elementName[0];
        elementName.isWithinMisMatchTolerance.should.equal(true);
    });


});
