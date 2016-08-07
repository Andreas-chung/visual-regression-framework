WebdriverIO = require('webdriverio');
WebdriverCSS = require('webdrivercss');

exports.setDesiredCaps = function (environmentType) {
    var root;
    switch (environmentType) {
        case 'local':
            desiredCaps = getLocalCaps();
            root = 'Windows-8-chrome40';
            break;
        case 'cloud':
            cloudDevice = getCloudDevice();
            desiredCaps = getCloudCaps(cloudDevice);
            root = getCloudRoot(cloudDevice);
            break;
    }
    screenshotRoot = root;
    screenshotDiff = root + '/diff';
};

exports.initWebdriver = function () {
    driver = WebdriverIO.remote(desiredCaps);
    webdriverOptions = {
        screenshotRoot: screenshotRoot,
        failedComparisonsRoot: screenshotDiff,
        misMatchTolerance: 10,
        updateBaseline: false,
        api: 'http://localhost:9000/api/repositories/'
    };
    WebdriverCSS.init(driver, webdriverOptions);
};


function getLocalCaps() {
    return {
        logLevel: 'silent', desiredCapabilities: {
            browserName: 'chrome'
        }
    }
};

function getCloudDevice() {
    var browser = process.env.BROWSER;
    var version = process.env.VERSION;
    var platform = process.env.PLATFORM;
    var deviceName = process.env.DEVICENAME;
    var deviceOrientation = process.env.DEVICEORIENTATION;

    switch (process.env.DEVICETYPE.toLowerCase()){
        case "desktop":
            return {
                'browserName': browser,
                'platform': platform,
                'version': version
            };
        break;
        case "mobile":
            return {
                'browserName': browser,
                'platform': platform,
                'version': version,
                'deviceName': deviceName,
                'deviceOrientation':deviceOrientation
            };
        break;
    }

};

function getCloudCaps(desiredEnvironment) {
    return {
        desiredCapabilities: desiredEnvironment,
        host: 'ondemand.saucelabs.com',
        port: 80,
        user: 'username',
        key: 'accessKey'
    }
};

function getCloudRoot(desiredEnvironment) {
    switch (process.env.DEVICETYPE.toLowerCase()) {
        case "desktop":
            return desiredEnvironment.platform.replace(/ /g, '-') + '-' + desiredEnvironment.browserName.replace(/ /g, '-') + desiredEnvironment.version.replace(/ /g, '-');
            break;
        case "mobile":
            return desiredEnvironment.browserName.replace(/ /g, '-') + '-' + desiredEnvironment.platform.replace(/ /g, '-') + desiredEnvironment.version.replace(/ /g, '-');
            break;
    }
};
