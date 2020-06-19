'use strict';

const { get } = require('lodash');
const assert = require('assert');

module.exports = function transform(fileInfo, api) {
  const src = fileInfo.source;
  const j = api.jscodeshift;
  const root = j(src);

  root
    .find(j.ReturnStatement)
    .filter(isReturnTestFunction)
    .replaceWith(({value}) => removeReturn(j, value));

  return root.toSource();
};

function isReturnTestFunction(path) {
  const returnStatement = path.value;
  const callee = get(returnStatement, "argument.callee");
  const name = get(callee, "name") || get(callee, "object.name");
  const testFunctions = ["it", "describe", "assert", "before", "after"];
  return testFunctions.includes(name)
}

function removeReturn(j, returnStatement) {
  return j.expressionStatement(returnStatement.argument);
}
