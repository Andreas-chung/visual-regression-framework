fs = require('fs-extra');
gm = require('gm');
glob = require('glob');
async = require('async');
should = require('chai').should();
expect = require('chai').expect;
assert = require('assert');

baseUrl = 'http://www.example.co.uk/';
environmentHelper =  require('./EnvironmentSetup.js');

function initEnv(done) {
    environmentHelper.setDesiredCaps(process.env.ENVIRONMENTTYPE.toLowerCase());
    environmentHelper.initWebdriver();
    done();
}

function tearDownEnv(done) {
    console.log(process.env.ENVIRONMENTTYPE);
    if (process.env.ENVIRONMENTTYPE != 'local') {
        async.parallel([
            function (done) {
                fs.remove(screenshotDiff, done);
            },
            function (done) {
                fs.remove(screenshotRoot, done);
            }
        ]);
    }
    driver.end();
    done();
}

exports.Mixed = function(desc, cb) {
    describe(desc, function () {
            this.timeout(800000);
            before(initEnv);
            cb();
            after(tearDownEnv);
    });
};

exports.Desktop = function(desc, cb) {
    describe(desc, function () {
        if (process.env.DEVICETYPE.toLowerCase() == "desktop") {
            this.timeout(100000);
            before(initEnv);
            cb();
            after(tearDownEnv);
        }
    });
};

exports.Mobile = function(desc, cb) {
    describe(desc, function () {
        if (process.env.DEVICETYPE.toLowerCase() == "mobile") {
            this.timeout(200000);
            before(initEnv);
            cb();
            after(tearDownEnv);
        }
    });
};
