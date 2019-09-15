// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

// npm i protractor-html-reporter-2

const { SpecReporter } = require('jasmine-spec-reporter');
var jasmineReporters = require('jasmine-reporters');
var htmlReporter = require('protractor-html-reporter-2/lib/protractor-xml2html-reporter');
var fs = require('fs-extra');
exports.config = {
  allScriptsTimeout: 30000,
  specs: [
    '../e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': [ 'show-fps-counter=true', '--no-sandbox']
      // 'args': ['--headless', 'show-fps-counter=true', '--no-sandbox']  // headless
    }
  },
  SELENIUM_PROMISE_MANAGER: false,
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  beforeLaunch: function() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
  },
  onPrepare() {
    // jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
     
        // Default window size
        browser.driver.manage().window().maximize();
        // Default implicit wait
        browser.manage().timeouts().implicitlyWait(60000);
        // Angular sync for non angular apps
        browser.ignoreSynchronization = true;

        fs.emptyDir('./reports/xml/', function (err) {
            console.log(err);
        });

        fs.emptyDir('./reports/screenshots/', function (err) {
            console.log(err);
        });

        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: './reports/xml/',
            filePrefix: 'xmlresults'
        }));

        jasmine.getEnv().addReporter({
            specDone: function (result) {
                //if (result.status == 'failed') {
					browser.getCapabilities().then(function (caps) {
						var browserName = caps.get('browserName');

						browser.takeScreenshot().then(function (png) {
							var stream = fs.createWriteStream('./reports/screenshots/' + browserName + '-' + result.fullName + '.png');
							stream.write(new Buffer(png, 'base64'));
							stream.end();
						});
					});
                //}
            }
        });
  },
  onComplete: function () {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();

    capsPromise.then(function (caps) {
        browserName = caps.get('browserName');
        browserVersion = caps.get('version');
        platform = caps.get('platform');

        testConfig = {
            reportTitle: 'Protractor Test Execution Report',
            outputPath: './reports/',
            outputFilename: 'ProtractorTestReport',
            screenshotPath: './screenshots',
            testBrowser: browserName,
            browserVersion: browserVersion,
            modifiedSuiteName: false,
            screenshotsOnlyOnFailure: false,
            testPlatform: platform
        };
        new htmlReporter().from('./reports/xml/xmlresults.xml', testConfig);
    });
},
  //HTMLReport called once tests are finished
//   onComplete: function() {

//     var browserName, browserVersion;
//     var capsPromise = browser.getCapabilities();

//     capsPromise.then(function (caps) {
//        browserName = caps.get('browserName');
//        browserVersion = caps.get('version');
//        platform = caps.get('platform');

//        var HTMLReport = require('protractor-html-reporter-2');

//        testConfig = {
//            reportTitle: 'Protractor Test Execution Report',
//            outputPath: './',
//            outputFilename: 'ProtractorTestReport',
//            screenshotPath: './screenshots',
//            testBrowser: browserName,
//            browserVersion: browserVersion,
//            modifiedSuiteName: false,
//            screenshotsOnlyOnFailure: true,
//            testPlatform: platform
//        };
//        new HTMLReport().from('xmlresults.xml', testConfig);
//    });
// }
};
