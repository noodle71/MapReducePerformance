'use strict';
requirejs(['tester', 'tests', 'dom'],
  function (tester, tests, dom) {

    var cb = function (tester, tests, dom) {
      return function (e) {
        var d = e.detail;
        var tsts = d.rnd ? tests.randomData : tests.fixedData;
        //If data isn't random, we have to divide it by 10.000 because
        //fixed data is an array of 10.000 elements.
        d.dsz /= d.rnd ? 1 : 10000;
        d.dsz = Math.floor(d.dsz);
        d.it = Math.floor(d.it);
        d.dsz = d.dsz > 0 ? d.dsz : 1;
        dom.iterations.val(d.it);
        dom.dataSize.val(d.rnd ? d.dsz : d.dsz * 10000);

        tester.testAll(d.it, d.dsz, tsts, d.rnd, d.prof);
      }
    }(tester, tests.testFunctions, dom.dom);

    dom.initEvents();

    document.addEventListener('testAll', cb);

  });