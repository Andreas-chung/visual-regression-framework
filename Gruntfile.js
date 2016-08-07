'use strict';
var os = require('os');
var grunt = require('grunt');

module.exports = function (grunt) {
    grunt.initConfig({
        mocha_parallel: {
            options: {
                args: function (suiteName) {
                    return [];
                },
                env: function (suiteName) {
                    process.env.BROWSER = grunt.option('browser');
                    process.env.VERSION = grunt.option('version');
                    process.env.PLATFORM = grunt.option('platform');
                    process.env.ENVIRONMENTTYPE = grunt.option('environmentType');
                    process.env.DEVICETYPE = grunt.option('deviceType');
                    
                    process.env.DEVICENAME = grunt.option('deviceName');
                    process.env.DEVICEORIENTATION = grunt.option('deviceOrientation');
                    
                    return process.env;
                },
                report: function (suite, code, stdout, stderr) {
                    if (stdout.length) {
                        process.stdout.write(stdout);
                    }
                    if (stderr.length) {
                        process.stderr.write(stderr);
                    }
                },
                done: function (success, results) {
                },
                mocha: "node_modules\\.bin\\mocha.cmd",
                concurrency: 0.5
            }
        },

        parallel: {
            desktop: {
                options: {
                    grunt: true
                },
                tasks: ['win8Chrome50', 'win10Edge']
            },
            mobile: {
                options: {
                    grunt: true
                },
                tasks: ['winXpFF37', 'win8Chrome50', 'win10Edge']
            },
            grid: {
                options: {
                    grunt: true
                },
                tasks: ['grid_firefox','grid_chrome']
            }
        }
    });

    // load tasks
    grunt.loadNpmTasks('grunt-mocha-parallel');
    grunt.loadNpmTasks('grunt-parallel');

    grunt.registerTask('local', function (n) {
        grunt.option('browser', 'Chrome');
        grunt.option('force', true);
        grunt.option('environmentType', 'local');
        grunt.option('deviceType', 'Desktop');
    });

    grunt.registerTask('Windows10_edge', function (n) {
        grunt.option('browser', 'microsoftedge');
        grunt.option('version', '20.10240');
        grunt.option('platform', "Windows 10");
        grunt.option('force', true);
        grunt.option('environmentType', 'cloud');
        grunt.option('deviceType', 'Desktop');
    });

    grunt.registerTask('WindowsXP_firefox_37', function (n) {
        grunt.option('browser', 'firefox');
        grunt.option('version', 37);
        grunt.option('platform', "Windows XP");
        grunt.option('force', true);
        grunt.option('environmentType', 'cloud');
        grunt.option('deviceType', 'Desktop');
    });

    grunt.registerTask('Windows8_chrome_50', function (n) {
        grunt.option('browser', 'chrome');
        grunt.option('version', 50);
        grunt.option('platform', "Windows 8");
        grunt.option('force', true);
        grunt.option('environmentType', 'cloud');
        grunt.option('deviceType', 'Desktop');
    });

    grunt.registerTask('OSX10.10_safari_8', function (n) {
        grunt.option('browser', 'safari');
        grunt.option('version', 8);
        grunt.option('platform', "OS X 10.10");
        grunt.option('force', true);
        grunt.option('environmentType', 'cloud');
        grunt.option('deviceType', 'desktop');
    });

    grunt.registerTask('iPhone6', function (n) {
        grunt.option('browser', 'Safari');
        grunt.option('version', '9.3');
        grunt.option('platform', 'iOS');
        grunt.option('deviceName', 'iPhone 6 Simulator');
        grunt.option('deviceOrientation', 'portrait');
        grunt.option('force', true);
        grunt.option('environmentType', 'cloud');
        grunt.option('deviceType', 'mobile');
    });

    // register tasks
    grunt.registerTask('default', ['parallel:desktop']);

    grunt.registerTask('win10Edge', ['Windows10_edge', 'mocha_parallel']);
    grunt.registerTask('winXpFF37', ['WindowsXP_firefox_37', 'mocha_parallel']);
    grunt.registerTask('win8Chrome50', ['Windows8_chrome_50', 'mocha_parallel']);
    grunt.registerTask('mac', ['OSX10.10_safari_8', 'mocha_parallel']);
    grunt.registerTask('runLocal', ['local', 'mocha_parallel']);
    grunt.registerTask('runGrid', ['grid_chrome', 'mocha_parallel']);

    grunt.registerTask('iPhone', ['iPhone6','mocha_parallel']);

};

