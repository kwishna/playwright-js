// import {JestScreenshotReporter} from "./screenshotOnFailure";

const { configureToMatchImageSnapshot } = require('jest-image-snapshot');

const customConfig = { threshold: 0 };
const toMatchImageSnapshot = configureToMatchImageSnapshot({
    customDiffConfig: customConfig,
    noColors: true,
});
expect.extend({ toMatchImageSnapshot });
// Or,
// const { toMatchImageSnapshot } = require('jest-image-snapshot');
// expect.extend({ toMatchImageSnapshot });

jest.retryTimes(2);
// (jasmine as any).getEnv().addReporter(new JestScreenshotReporter());

// Alt.
// (jasmine as any).getEnv().addReporter( {
//     specStarted: result => (jasmine as any).currentTest = result,
//     specDone: result => {
//         (jasmine as any).result = result;
//         console.log(result)
//     }
// });
//
// Node Js Clean Up
// process.on('beforeExit', async () => {
//     console.log(drivr);
//     console.log(dSer);
//
//     if (drivr) {
//         await drivr.quit();
//     }
//
//     if (dSer) {
//         await dSer.kill();
//     }
// });

//catch uncaught exceptions, trace, then exit normally
process.on('uncaughtException', function(e) {
    console.log('Uncaught Exception...');
    console.log(e.stack);
    process.exit(99);
});

process.on('unhandledRejection', function(reason, promise) {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});
