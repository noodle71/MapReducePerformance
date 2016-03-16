'use strict';

define(['jquery'],
  function ($) {

    var profile = $('#profile');
    var random = $('#random');
    var testAll = $('#testAll');
    var iterations = $('#iterations');
    var dataSize = $('#dataSize');

    var initEvents = function () {

      testAll.off('click');
      testAll.on('click', function () {
        document.dispatchEvent(new CustomEvent("testAll", {
          detail: {
            'it': parseInt(iterations.val()),
            'dsz': parseInt(dataSize.val()),
            'prof': profile.is(':checked'),
            'rnd': random.is(':checked')
          }
        }));
      });
    };

    var buildTD = function (text) {
      return $('<td>', {'text': text});
    };

    var fillTR = function (data) {

      return $('<tr>')
        .append(buildTD(new Date()))
        .append(buildTD(data.test))
        .append(buildTD(data.avg))
        .append(buildTD(data.stdDev))
        .append(buildTD(data.it))
        .append(buildTD(data.ds))
        .append(buildTD(data.rnd));
    };

    var fillRows = function (data) {
      var tbody = $('table tbody');
      var i = 0;
      var total = data && Array.isArray(data) ? data.length : 0;


      for (i; i < total; i++) {
        tbody.append(fillTR(data[i]));
      }
    };

    return {
      'initEvents': initEvents,
      'fillRows': fillRows,
      'dom': {
        profile: profile,
        random: random,
        testAll: testAll,
        iterations: iterations,
        dataSize: dataSize
      }
    };
  });