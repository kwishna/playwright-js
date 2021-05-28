const feature = [
  '--require-module ts-node/register',
  '--require src/features/steps/**/*.ts',
  '--require src/features/support/cucumber_*.ts', // For Any Hook Or World
  '--format progress-bar',
  '--format rerun:reports/@rerun.txt',
  '--format json:reports/cucumber-report.json',
  '--format html:reports/cuke-report.html',
  '--format usage:reports/usage.txt',
  '--format message:reports/messages.ndjson',
  '--format @cucumber/pretty-formatter',
  '--format-options \'{"theme":{"datatable border":["green"],"datatable content":["green","italic"],"docstring content":["green","italic"],"docstring delimiter":["green"],"feature description":["green"],"feature keyword":["bold","green"],"rule keyword":["yellow"],"scenario keyword":["greenBright"],"scenario name":["green","underline"],"step keyword":["bgGreen","black","italic"],"step text":["greenBright","italic"],"tag":["green"]}}\'',
  '--publish-quiet',
].join(' ');

const cck = [
  '--require-module',
  'ts-node/register',
  '--format',
  'message',
].join(' ');

const FORMATTERS_INCLUDE = [
  'attachments',
  'data-tables',
  'examples-tables',
  'minimal',
  'parameter-types',
  'rules',
  'stack-traces',
  '--publish-quiet',
];

const htmlFormatter = [
  `node_modules/@cucumber/compatibility-kit/features/{${FORMATTERS_INCLUDE.join(
    ','
  )}}/*.feature`,
  '--require-module',
  'ts-node/register',
  '--require',
  `compatibility/features/{${FORMATTERS_INCLUDE.join(',')}}/*.ts`,
  '--format',
  'html:html-formatter.html',
  '--publish-quiet',
].join(' ');

module.exports = {
  default: feature,
  cck,
  htmlFormatter,
};
