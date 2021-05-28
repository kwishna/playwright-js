const reporter = require('cucumber-html-reporter');

const options = {
    theme: 'bootstrap',
    jsonFile: 'reports/cucumber-report.json',
    output: 'reports/cucumber-report.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    metadata: {
        "App Version": "v0.0.4",
        "Test Environment": "DEV",
        "Browser": "Chrome",
        "Platform": "Windows 10",
        "Parallel": "Scenarios",
        "Executed": "Krishna Kumar Singh"
    }
};

reporter.generate(options);