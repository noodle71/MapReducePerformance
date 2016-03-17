'use strict';

define(['lodash'], function (_) {
  var testFunctions = {
    'randomData': {},
    'fixedData': {}
  };

  /**************************
   ****** FIXED DATA ********
   *************************/

  /**
   * First. Use map to convert String date to Epoch.
   * Then, sort by epoch.
   * Finally, reduce to concatenate the values for repeated epochs.
   * The reduce function is made using an Array.
   * @param d
   */
  testFunctions.fixedData.arrayMapSortReduceWithArray = function (d) {

    d.map(function (el) {
      el.k[3] = new Date(el.k[3]).getTime();
      return el;
    }).sort(function (a, b) {
      return a.k[3] - b.k[3]
    }).reduce(function (total, current) {
      var totalLen = total.length;
      var lastIndex = totalLen - 1;
      var key = current.k[3];
      var v0 = current.k[1];
      var v1 = current.k[2];
      var v2 = current.v[0];
      if (totalLen && total[lastIndex].period === key) {
        total[lastIndex].values[0].push(v0);
        total[lastIndex].values[1].push(v1);
        total[lastIndex].values[2].push(v2);
      } else {
        total.push({
          period: key,
          values: [[v0], [v1], [v2]]
        });
      }
      return total;
    }, []);

  };

  /**
   * First. Use map to convert String date to Epoch.
   * Then, sort by epoch.
   * Finally, reduce to concatenate the values for repeated epochs.
   * The reduce function is made using an Object.
   * @param d
   */
  testFunctions.fixedData.arrayMapSortReduceWithObject = function (d) {

    d.map(function (el) {
      el.k[3] = new Date(el.k[3]).getTime();
      return el;
    }).sort(function (a, b) {
      return a.k[3] - b.k[3]
    }).reduce(function (total, current) {
      var key = current.k[3];
      var v0 = current.k[1];
      var v1 = current.k[2];
      var v2 = current.v[0];
      if (key in total) {
        total[key].values[0].push(v0);
        total[key].values[1].push(v1);
        total[key].values[2].push(v2);
      } else {
        total[key] = {
          period: key,
          values: [[v0], [v1], [v2]]
        };
      }
      return total;
    }, {});

  };

  /**
   * Use of reduce to concatenate the values for repeated epochs.
   * Meanwhile, result is sorted by key.
   * The result is an Array
   * @param d
   */
  testFunctions.fixedData.arrayReduceWithArray = function (d) {

    d.reduce(function (total, current) {
      var key = new Date(current.k[3]).getTime();
      var v0 = current.k[1];
      var v1 = current.k[2];
      var v2 = current.v[0];
      var json;
      var len = total.length;
      for (var j = 0; j <= len; j++) {
        if (j == len || total[j].period > key) {
          json = {
            period: key,
            values: [[v0], [v1], [v2]]
          };
          total.splice(j, 0, json);
        }
        if (total[j].period == key) {
          total[j].values[0].push(v0);
          total[j].values[1].push(v1);
          total[j].values[2].push(v2);
          break;
        }
      }
      return total;
    }, []);

  };

  /**
   * Use of reduce to concatenate the values for repeated epochs.
   * The result is an Object
   * @param d
   */
  testFunctions.fixedData.arrayReduceWithObject = function (d) {

    d.reduce(function (total, current) {
      var key = new Date(current.k[3]).getTime();
      var v0 = current.k[1];
      var v1 = current.k[2];
      var v2 = current.v[0];

      if (key in total) {
        total[key].values[0].push(v0);
        total[key].values[1].push(v1);
        total[key].values[2].push(v2);
      } else {
        total[key] = {
          period: key,
          values: [[v0], [v1], [v2]]
        };
      }
      return total;
    }, {});

  };

  /**
   * Iterate over data meanwhile the result is sorted by key.
   * Concatenates values with same key.
   * @param d
   */
  testFunctions.fixedData.iterative = function (d) {

    var parsed_data = [];
    var tot = d.length;
    for (var i = 0; i < tot; i++) {
      var key = new Date(d[i].k[3]).getTime();
      var v0 = d[i].k[1];
      var v1 = d[i].k[2];
      var v2 = d[i].v[0];
      var json;
      var len = parsed_data.length;
      for (var j = 0; j <= len; j++) {
        if (j == len || parsed_data[j].period > key) {
          json = {
            period: key,
            values: [[v0], [v1], [v2]]
          };
          parsed_data.splice(j, 0, json);
        }
        if (parsed_data[j].period == key) {
          parsed_data[j].values[0].push(v0);
          parsed_data[j].values[1].push(v1);
          parsed_data[j].values[2].push(v2);
          break;
        }
      }
    }

  };

  /**
   * Iterate over data previously sorted by key.
   * Concatenates values with same key.
   * @param d
   */
  testFunctions.fixedData.iterativeAndSort = function (d) {

    var total = [];
    d = d.sort(function (a, b) {
      if ("string" === typeof a.k[3]) {
        a.k[3] = new Date(a.k[3]).getTime();
      }
      if ("string" === typeof b.k[3]) {
        b.k[3] = new Date(b.k[3]).getTime();
      }
      return a.k[3] - b.k[3];
    });
    var currentIndex = -1;
    var len = d.length;
    for (var i = 0; i < len; i++) {
      var key = d[i].k[3];
      var v0 = d[i].k[1];
      var v1 = d[i].k[2];
      var v2 = d[i].v[0];
      if (currentIndex >= 0 && total[currentIndex].period == key) {
        total[currentIndex].values[0].push(v0);
        total[currentIndex].values[1].push(v1);
        total[currentIndex].values[2].push(v2);
      } else {
        total.push({
          period: key,
          values: [[v0], [v1], [v2]]
        });
        ++currentIndex;
      }
    }

  };

  /**
   * Using lodash with chain.
   * First. Use map to convert String date to Epoch.
   * Then, sort by epoch.
   * Finally, reduce to concatenate the values for repeated epochs.
   * The reduce function is made using an Array.
   * @param d
   */
  testFunctions.fixedData.lodashChainMapSortReduceWithArray = function (d) {

    _.chain(d).map(function (el) {
      el.k[3] = new Date(el.k[3]).getTime();
      return el;
    }).sort(function (a, b) {
      return a.k[3] - b.k[3]
    }).reduce(function (total, current) {
      var currentIndex = total.length - 1;
      var key = current.k[3];
      var v0 = current.k[1];
      var v1 = current.k[2];
      var v2 = current.v[0];
      if (total.length && total[currentIndex].period == key) {
        total[currentIndex].values[0].push(v0);
        total[currentIndex].values[1].push(v1);
        total[currentIndex].values[2].push(v2);
      } else {
        total.push({
          period: key,
          values: [[v0], [v1], [v2]]
        });
      }
      return total;
    }, []).value();

  };

  /**
   * Using lodash with chain.
   * First. Use map to convert String date to Epoch.
   * Then, sort by epoch.
   * Finally, reduce to concatenate the values for repeated epochs.
   * The reduce function is made using an Object.
   * @param d
   */
  testFunctions.fixedData.lodashChainMapSortReduceWithObject = function (d) {

    _.chain(d).map(function (el) {
      el.k[3] = new Date(el.k[3]).getTime();
      return el;
    }).sort(function (a, b) {
      return a.k[3] - b.k[3]
    }).reduce(function (total, current) {
      var key = current.k[3];
      var v0 = current.k[1];
      var v1 = current.k[2];
      var v2 = current.v[0];
      if (key in total) {
        total[key].values[0].push(v0);
        total[key].values[1].push(v1);
        total[key].values[2].push(v2);
      } else {
        total[key] = {
          period: key,
          values: [[v0], [v1], [v2]]
        };
      }
      return total;
    }, {}).value();

  };

  /**
   * Using lodash with chain
   * Use of reduce to concatenate the values for repeated epochs.
   * Meanwhile, result is sorted by key.
   * The result is an Array
   * @param d
   */
  testFunctions.fixedData.lodashChainReduceWithArray = function (d) {

    _.chain(d).reduce(function (total, current) {
      var key = new Date(current.k[3]).getTime();
      var v0 = current.k[1];
      var v1 = current.k[2];
      var v2 = current.v[0];
      var json;
      var len = total.length;
      for (var j = 0; j <= len; j++) {
        if (j == len || total[j].period > key) {
          json = {
            period: key,
            values: [[v0], [v1], [v2]]
          };
          total.splice(j, 0, json);
        }
        if (total[j].period == key) {
          total[j].values[0].push(v0);
          total[j].values[1].push(v1);
          total[j].values[2].push(v2);
          break;
        }
      }
      return total;
    }, {}).value();

  };

  /**
   * Using lodash without chain
   * Use of reduce to concatenate the values for repeated epochs.
   * Meanwhile, result is sorted by key.
   * The result is an Array
   * @param d
   */
  testFunctions.fixedData.lodashReduceWithArray = function (d) {

    _.reduce(d, function (total, current) {
      var key = new Date(current.k[3]).getTime();
      var v0 = current.k[1];
      var v1 = current.k[2];
      var v2 = current.v[0];
      var json;
      var len = total.length;
      for (var j = 0; j <= len; j++) {
        if (j == len || total[j].period > key) {
          json = {
            period: key,
            values: [[v0], [v1], [v2]]
          };
          total.splice(j, 0, json);
        }
        if (total[j].period == key) {
          total[j].values[0].push(v0);
          total[j].values[1].push(v1);
          total[j].values[2].push(v2);
          break;
        }
      }
      return total;
    }, {});

  };

  /**
   * Using lodash with chain
   * Use of reduce to concatenate the values for repeated epochs.
   * Meanwhile, result is sorted by key.
   * The result is an Object
   * @param d
   */
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

  /**
   * Using lodash without chain
   * Use of reduce to concatenate the values for repeated epochs.
   * Meanwhile, result is sorted by key.
   * The result is an Object
   * @param d
   */
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

  /**
   * First. Use map to convert String date to Epoch.
   * Then, sort by epoch.
   * Finally, reduce to concatenate the values for repeated epochs.
   * The transform function is made using an Array.
   * @param d
   */
  testFunctions.fixedData.lodashChainMapSortTransformWithArray = function (d) {

    _.chain(d).map(function (el) {
      el.k[3] = new Date(el.k[3]).getTime();
      return el;
    }).sort(function (a, b) {
      return a.k[3] - b.k[3]
    }).transform(function (total, current) {
      var totalLen = total.length;
      var lastIndex = totalLen - 1;
      var key = current.k[3];
      var v0 = current.k[1];
      var v1 = current.k[2];
      var v2 = current.v[0];
      if (totalLen && total[lastIndex].period === key) {
        total[lastIndex].values[0].push(v0);
        total[lastIndex].values[1].push(v1);
        total[lastIndex].values[2].push(v2);
      } else {
        total.push({
          period: key,
          values: [[v0], [v1], [v2]]
        });
      }
      return total;
    }, []).value();

  };

  /**
   * First. Use map to convert String date to Epoch.
   * Then, sort by epoch.
   * Finally, reduce to concatenate the values for repeated epochs.
   * The transform function is made using an Object.
   * @param d
   */
  testFunctions.fixedData.lodashChainMapSortTransformWithObject = function (d) {

    _.chain(d).map(function (el) {
      el.k[3] = new Date(el.k[3]).getTime();
      return el;
    }).sort(function (a, b) {
      return a.k[3] - b.k[3]
    }).transform(function (total, current) {
      var key = current.k[3];
      var v0 = current.k[1];
      var v1 = current.k[2];
      var v2 = current.v[0];
      if (key in total) {
        total[key].values[0].push(v0);
        total[key].values[1].push(v1);
        total[key].values[2].push(v2);
      } else {
        total[key] = {
          period: key,
          values: [[v0], [v1], [v2]]
        };
      }
      return total;
    }, {}).value();

  };


  /**************************
   ****** RANDOM DATA *******
   *************************/

  /**
   * Native map reduce
   * @param d
   */
  testFunctions.randomData.arrayMapReduce = function (d) {

    d.map(function (el) {
      return el % 2 === 0 ? el / 2 : 0;
    }).reduce(function (total, current) {
      return total + current;
    }, 0);

  };

  /**
   * Native reduce
   * @param d
   */
  testFunctions.randomData.arrayReduce = function (d) {

    d.reduce(function (total, current) {
      return total + (current % 2 === 0 ? current / 2 : 0);
    }, 0);

  };

  /**
   * Native while
   * @param d
   */
  testFunctions.randomData.iterative = function (d) {

    var total = 0;
    var index = d.length;
    while (index--) {
      total += (d[index] % 2 === 0 ? d[index] / 2 : 0)
    }

  };

  /**
   * Lodash Map reduce
   * @param d
   */
  testFunctions.randomData.lodashMapReduce = function (d) {

    _.chain(d).map(function (el) {
      return el % 2 === 0 ? el / 2 : 0;
    }).reduce(function (total, current) {
      return total + current;
    }, 0).value();

  };

  /**
   * Lodash Map Transform
   * @param d
   */
  testFunctions.randomData.lodashMapTransform = function (d) {

    _.chain(d).map(function (el) {
      return el % 2 === 0 ? el / 2 : 0;
    }).transform(function (total, current) {
      return total + current;
    }, 0).value();

  };

  /**
   * Lodash Reduce
   * @param d
   */
  testFunctions.randomData.lodashReduce = function (d) {

    _.reduce(d, function (total, current) {
      return total + (current % 2 === 0 ? current / 2 : 0);
    }, 0);

  };

  /**
   * Lodash Transform
   * @param d
   */
  testFunctions.randomData.lodashTransform = function (d) {

    _.transform(d, function (total, current) {
      return total + (current % 2 === 0 ? current / 2 : 0);
    }, 0);

  };

  return {
    'testFunctions': testFunctions
  };
});