'use strict';

define(function () {

  var start = function (name, profile) {
    if (profile) {
      console.profile(name);
      console.time(name);
    }
    return window.performance.now();
  };

  var end = function (name, start, profile) {
    if (profile) {
      console.profileEnd(name);
      console.timeEnd(name);
    }
    return window.performance.now() - start;
  };

  return {
    'start': start,
    'end': end
  };
});