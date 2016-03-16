'use strict';

define(['lodash'], function (_) {
  var testFunctions = {
    'randomData': {},
    'fixedData': {}
  };

  /**************************
   ****** FIXED DATA ********
   *************************/

  testFunctions.fixedData.testMapReduce = function (d) {

    d.map(function (el) {
      el.k[3] = new Date(el.k[3]).getTime();
      return el;
    }).sort(function (a, b) {
      return a.k[3] - b.k[3]
    }).reduce(function (total, current) {
      var totalLen = total.length;
      var currentIndex = totalLen - 1;
      if (totalLen && total[currentIndex].period == current.k[3]) {
        total[currentIndex].values[0].push(current.k[1]);
        total[currentIndex].values[1].push(current.k[2]);
        total[currentIndex].values[2].push(current.v[0]);
      } else {
        total.push({
          period: current.k[3],
          values: [[current.k[1]], [current.k[2]], [current.v[0]]]
        });
      }
      return total;
    }, []);

  };

  testFunctions.fixedData.testReduceWithObject = function (d) {

    d.reduce(function (total, current) {
      var millis = new Date(current.k[3]).getTime();
      var v0 = current.k[0];
      var v1 = current.k[1];
      var v2 = current.k[2];

      if (millis in total) {
        total[millis].values[0].push(v1);
        total[millis].values[1].push(v2);
        total[millis].values[2].push(v0);
      } else {
        total[millis] = {
          period: millis,
          values: [[v1], [v2], [v0]]
        };
      }
      return total;
    }, {});

  };

  /**
   * Realmente el map no es necesario dado que el valor de la fecha a timestamp
   * se puede aplicar directamente en el reduce y me follo el map
   */
  testFunctions.fixedData.testReduceWithArray = function (d) {

    d.reduce(function (total, current) {
      var millis = new Date(current.k[3]).getTime();
      var json;
      for (var j = 0; j <= total.length; j++) {
        if (j == total.length || total[j].period > millis) {
          json = {
            period: millis,
            values: [[], [], []]
          };
          total.splice(j, 0, json);
        }
        if (total[j].period == millis) {
          json = total[j];
          break;
        }
      }
      json.values[0].push(current.k[1]);
      json.values[1].push(current.k[2]);
      json.values[2].push(current.v[0]);
      return total;
    }, []);

  };

  /**
   * Version iterativa
   */
  testFunctions.fixedData.testIterative = function (d) {

    var parsed_data = [];
    for (var i = 0; i < d.length; i++) {
      var millis = new Date(d[i].k[3]).getTime();
      var json;
      for (var j = 0; j <= parsed_data.length; j++) {
        if (j == parsed_data.length || parsed_data[j].period > millis) {
          json = {
            period: millis,
            values: [[], [], []]
          };
          parsed_data.splice(j, 0, json);
        }
        if (parsed_data[j].period == millis) {
          json = parsed_data[j];
          break;
        }
      }
      json.values[0].push(d[i].k[1]);
      json.values[1].push(d[i].k[2]);
      json.values[2].push(d[i].v[0]);
    }

  };

  testFunctions.fixedData.testIterativeSort = function (d) {

    var total = [];
    d = d.sort(function (a, b) {
        if ("string" === typeof a.k[3]) {
          a.k[3] = new Date(a.k[3]).getTime()
        }
        if ("string" === typeof b.k[3]) {
          b.k[3] = new Date(b.k[3]).getTime()
        }
        return a.k[3] - b.k[3]
      }
    );
    var currentIndex = -1;
    for (var i = 0; i < d.length; i++) {
      var millis = d[i].k[3];
      if (currentIndex >= 0 &&
        total[currentIndex].period == millis) {
        total[currentIndex].values[0].push(d[i].k[1]);
        total[currentIndex].values[1].push(d[i].k[2]);
        total[currentIndex].values[2].push(d[i].v[0]);
      } else {
        total.push({
          period: millis,
          values: [[d[i].k[1]], [d[i].k[2]], [d[i].v[0]]]
        });
        ++currentIndex;
      }
    }

  };

  //LODASH MAP REDUCE
  testFunctions.fixedData.lodashChainMapReduceWithArray = function (d) {

    _.chain(d).map(function (el) {
      el.k[3] = new Date(el.k[3]).getTime();
      return el;
    }).sort(function (a, b) {
      return a.k[3] - b.k[3]
    }).reduce(function (total, current) {
      var currentIndex = total.length - 1;
      if (total.length && total[currentIndex].period == current.k[3]) {
        total[currentIndex].values[0].push(current.k[1]);
        total[currentIndex].values[1].push(current.k[2]);
        total[currentIndex].values[2].push(current.v[0]);
      } else {
        total.push({
          period: current.k[3],
          values: [[current.k[1]], [current.k[2]], [current.v[0]]]
        });
      }
      return total;
    }, []).value();

  };

  testFunctions.fixedData.lodashReduceWithObject = function (d) {

    _.reduce(d, function (total, current) {
      var millis = new Date(current.k[3]).getTime();
      var v0 = current.k[0];
      var v1 = current.k[1];
      var v2 = current.k[2];

      if (millis in total) {
        total[millis].values[0].push(v1);
        total[millis].values[1].push(v2);
        total[millis].values[2].push(v0);
      } else {
        total[millis] = {
          period: millis,
          values: [[v1], [v2], [v0]]
        };
      }
      return total;
    }, {});

  };

  testFunctions.fixedData.lodashChainReduceWithObject = function (d) {

    _.chain(d).reduce(function (total, current) {
      var millis = new Date(current.k[3]).getTime();
      var v0 = current.k[0];
      var v1 = current.k[1];
      var v2 = current.k[2];

      if (millis in total) {
        total[millis].values[0].push(v1);
        total[millis].values[1].push(v2);
        total[millis].values[2].push(v0);
      } else {
        total[millis] = {
          period: millis,
          values: [[v1], [v2], [v0]]
        };
      }
      return total;
    }, {}).value();

  };

  //LODASH MAP TRANSFORM
  testFunctions.fixedData.lodashChainMapTransform = function (d) {

    _.chain(d).map(function (el) {
      el.k[3] = new Date(el.k[3]).getTime();
      return el;
    }).sort(function (a, b) {
      return a.k[3] - b.k[3]
    }).transform(function (total, current) {
      var currentIndex = total.length - 1;
      if (total.length && total[currentIndex].period == current.k[3]) {
        total[currentIndex].values[0].push(current.k[1]);
        total[currentIndex].values[1].push(current.k[2]);
        total[currentIndex].values[2].push(current.v[0]);
      } else {
        total.push({
          period: current.k[3],
          values: [[current.k[1]], [current.k[2]], [current.v[0]]]
        });
      }
      return total;
    }, []).value();

  };


  /**************************
   ****** RANDOM DATA *******
   *************************/

    // NATIVE MAP REDUCE
  testFunctions.randomData.testMapReduce1 = function (d) {

    d.map(function (el) {
      return el % 2 === 0 ? el / 2 : 0;
    }).reduce(function (total, current) {
      return total + current;
    }, 0);

  };

  // NATIVE REDUCE
  testFunctions.randomData.testOnlyReduce = function (d) {

    d.reduce(function (total, current) {
      return total + (current % 2 === 0 ? current / 2 : 0);
    }, 0);

  };

  // NATIVE WHILE
  testFunctions.randomData.testIterative = function (d) {

    var total = 0;
    var index = d.length;
    while (index--) {
      total += (d[index] % 2 === 0 ? d[index] / 2 : 0)
    }

  };

  // LODASH MAP REDUCE
  testFunctions.randomData.lodashMR = function (d) {

    _.chain(d).map(function (el) {
      return el % 2 === 0 ? el / 2 : 0;
    }).reduce(function (total, current) {
      return total + current;
    }, 0).value();

  };

  // LODASH MAP TRANSFORM
  testFunctions.randomData.lodashMT = function (d) {

    _.chain(d).map(function (el) {
      return el % 2 === 0 ? el / 2 : 0;
    }).transform(function (total, current) {
      return total + current;
    }, 0).value();

  };

  // LODASH REDUCE
  testFunctions.randomData.lodashReduce = function (d) {

    _.reduce(d, function (total, current) {
      return total + (current % 2 === 0 ? current / 2 : 0);
    }, 0);

  };

  // LODASH TRANSFORM
  testFunctions.randomData.lodashTransform = function (d) {

    _.transform(d, function (total, current) {
      return total + (current % 2 === 0 ? current / 2 : 0);
    }, 0);

  };


  return {
    'testFunctions': testFunctions
  };
});