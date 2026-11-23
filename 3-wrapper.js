'use strict';

const contract = (fn, ...types) => {
  const resultType = types.pop().name.toLowerCase();

  return (...args) => {
    if (args.length !== types.length) {
      throw new TypeError('Unexpected number of arguments');
    }

    for (let i = 0; i < types.length; i++) {
      const expected = types[i].name.toLowerCase();

      if (typeof args[i] !== expected) {
        throw new TypeError(`Argument ${i + 1} must be ${expected}`);
      }
    }

    const result = fn(...args);

    if (typeof result !== resultType) {
      throw new TypeError(`Result must be ${resultType}`);
    }

    return result;
  };
};

module.exports = { contract };