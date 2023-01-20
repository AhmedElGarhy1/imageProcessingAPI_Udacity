//! it's not working so i imported it from node_moudels

// import {
//   DisplayProcessor,
//   SpecReporter,
//   StacktraceOption,
// } from 'jasmine-spec-reporter';

import {
  DisplayProcessor,
  SpecReporter,
  StacktraceOption,
} from '../../../node_modules/jasmine-spec-reporter/built/main.js';

import SuiteInfo = jasmine.SuiteInfo;

class CustomProcessor extends DisplayProcessor {
  public displayJasmineStarted(info: SuiteInfo, log: string): string {
    return `${log}`;
  }
}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayStacktrace: StacktraceOption.NONE,
    },
    customProcessors: [CustomProcessor],
  })
);
