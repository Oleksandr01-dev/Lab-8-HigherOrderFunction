'use strict';

const iterate = (obj, callback) => {
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    callback(key, value, obj);
  }
};

module.exports = { iterate };