'use strict';

const assert = require('node:assert/strict');
const { iterate } = require('./1-callback.js');
const { store } = require('./2-closure.js');
const { contract } = require('./3-wrapper.js');

const original = { a: 1, b: 2 };
const copy = {};

iterate(original, (key, value, object) => {
  assert.strictEqual(object, original);
  copy[key] = value;
});

assert.deepStrictEqual(copy, original);
console.log('1-callback.js — OK');

const readFive = store(5);
const readSeven = store(7);
assert.strictEqual(readFive(), 5);
assert.strictEqual(readSeven(), 7);
console.log('2-closure.js — OK');

const add = contract((a, b) => a + b, Number, Number, Number);
assert.strictEqual(add(2, 3), 5);
assert.throws(() => add(2, '3'), TypeError);

const badResult = contract((a, b) => String(a + b), Number, Number, Number);
assert.throws(() => badResult(2, 3), TypeError);
console.log('3-wrapper.js — OK');