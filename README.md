# Automation Testing Suite

## _Programming Languages Used:_
  - [`Typescript`](https://www.typescriptlang.org/docs/)
  - [`Javascript`](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## _Installations Required_:
###### Mandatory
   - [`Java Development Kit 11+`](https://jdk.java.net/)
   - [`Node 14+`](https://nodejs.org/en/download/)
###### ~~Optional (On requirement basis)~~
   - [`Python 3.8+`](https://www.python.org/downloads/)
   - [`Android SDK 4+`](https://developer.android.com/studio#downloads)

## _Libraries Used_:
#### Automation:
###### Desktop Browser Automation
  - [`selenium-webdriver`](https://www.npmjs.com/package/selenium-webdriver)
###### Mobile Browser Automation
  - [`appium`](https://www.npmjs.com/package/appium)
###### Mobile Native App Automation
  - [`selenium-appium`](https://www.npmjs.com/package/selenium-appium)
###### API Automation
  - [`axios`](https://www.npmjs.com/package/axios) (skipped)
  - [`supertest`](https://www.npmjs.com/package/supertest)
  - [`superagent`](https://www.npmjs.com/package/superagent) (implemented)

#### Test Runner
  - [`jest`](https://www.npmjs.com/package/jest)
  - [`ts-jest`](https://www.npmjs.com/package/ts-jest)
  - [`jest-runner-groups`](https://www.npmjs.com/package/jest-runner-groups)
  - [`jest-jasmine2`](https://www.npmjs.com/package/jest-jasmine2)

#### Assertions
  - [`jest`](https://www.npmjs.com/package/jest)
  - [`chai`](https://www.npmjs.com/package/chai)
  - [`chai-as-promised`](https://www.npmjs.com/package/chai-as-promised)

## _Browsers Support_:
  - [`Google Chrome`]
  - [`Mozilla Firefox`]
  - [`Microsoft Edge`]
  - [`Opera`]
  - [`Internet Explorer`]

#### Reporters
###### XML Report
  - [`jest-junit`](https://www.npmjs.com/package/jest-junit)
###### HTML Report
  - [`jest-html-reporters`](https://www.npmjs.com/package/jest-html-reporters)
  - [`jest-allure2-adapter`](https://www.npmjs.com/package/jest-allure2-adapter)

#### Transpile
  - [`@babel-core`](https://www.npmjs.com/package/@babel-core)
  - [`@babel/preset-env`](https://www.npmjs.com/package/@babel/preset-env)
  - [`@babel/preset-typescript`](https://www.npmjs.com/package/@babel/preset-typescript)
  - [`babel-jest`](https://www.npmjs.com/package/babel-jest`)

#### Other Tools:
###### ~~Performance Test~~
- [`JMeter`](https://jmeter.apache.org/)
###### ~~Security Test~~
- [`Zed Attack Proxy (ZAP) Developed by OWASP`](https://www.zaproxy.org/)

## _Framework Set-up Process_:
  - Store the project in your local storage.
  - Run `npm install` command in the project directory in parallel to `package.json`
  - Run `jest` command to execute all test.
    (Note: It may take long time to finish)
  - Other helpful commands can be found in `scripts` section in `package.json`
  - Use [`cross-env`](https://www.npmjs.com/package/cross-env) in command line for environment parameters set up
  - Use `.env` file for basic execution environment set up.
  - By default, execution will start in parallel. It may start multiple browsers simultaneously. Be careful!
  - Study `jest.config.ts` for other mandatory test environment set up before execution.
  - Depending upon the driver `capabilities` provided, `webdriver` will spin-up the browsers.
  - To run on `browserstack` provide `browserstack.user` and `browserstack.key` parameters in driver `capabilities`.
