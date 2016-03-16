'use strict';

define(['data', 'math', 'dom', 'profiler'],
  function (data, math, dom, prof) {

    var displayResult
      = function (tests, tiempos, testFunctions, testDataSize, rnd) {
      var rows = [];
      var line = "#####################################";
      console.log(line);
      console.log("ITERATIONS: " + tests);
      console.log("TOTAL SIZE ARRAY: " + testDataSize);
      console.log(line);
      for (var test in testFunctions) {
        var avg = math.average(tiempos[test]);
        var stdDv = math.standardDeviation(tiempos[test], avg);
        console.log(line);
        console.log("MEDIA DE " + test + ": ", avg);
        console.log("STD DEV DE " + test + ": ", stdDv);
        console.log(line);
        rows.push({
          'test': test,
          'avg': avg,
          'stdDev': stdDv,
          'rnd': rnd,
          'it': tests,
          'ds': testDataSize
        });
      }
      dom.fillRows(rows);
    };

    var testFunction = function (data, testName, profile, funToTest) {
      var start = prof.start(testName, profile);
      funToTest(data);
      return prof.end(testName, start, profile);
    };

    var testAll
      = function (tests, testSize, testFunctions, randomData, profile) {
      var tiempos = {};
      var testData = randomData ?
        data.getRandomArray(testSize) : data.getData(testSize);
      var testDataSize = testData.length;
      var testFun;

      for (var item in testFunctions) {
        tiempos[item] = [];
      }
      for (var i = 0; i < tests; i++) {
        for (var test in testFunctions) {
          testFun = testFunctions[test];
          tiempos[test].push(testFunction(testData, test, profile, testFun));
        }
      }
      displayResult(tests, tiempos, testFunctions, testDataSize, randomData);
    };

    return {
      'testAll': testAll
    };
  });