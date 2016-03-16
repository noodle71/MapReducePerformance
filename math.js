'use strict';

define(function () {

  var average = function (data) {
    var sum = data.reduce(function (sum, value) {
      return sum + value;
    }, 0);

    var avg = sum / data.length;
    return avg;
  };

  var standardDeviation = function (values, avg) {
    if ("undefined" === typeof avg) {
      avg = average(values);
    }

    var squareDiffs = values.map(function (value) {
      var diff = value - avg;
      var sqrDiff = diff * diff;
      return sqrDiff;
    });

    var avgSquareDiff = average(squareDiffs);

    var stdDev = Math.sqrt(avgSquareDiff);
    return stdDev;
  };

  return {
    'standardDeviation': standardDeviation,
    'average': average
  };
});