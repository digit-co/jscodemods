/* global jest */

'use strict';

jest.autoMockOff();
const {defineInlineTest} = require('jscodeshift/src/testUtils');
const transform = require('../fix-test-return');

defineInlineTest(
  transform,
  {},
  `
  describe("foo", function () {
    return assert("bar", () => {});
  });
  `,
  `
  describe("foo", function () {
    assert("bar", () => {});
  });
  `
);


