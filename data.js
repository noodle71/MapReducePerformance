'use strict';

define(['example'], function (json) {

  var getRandomArray = function (size) {
    var data = [];
    var index = size;
    while (index--) {
      data[index] = Math.floor((Math.random() * size) + 1);
    }
    return data;
  };

  var getData = function (times) {
    var retorno = json;
    while (--times) {
      retorno = retorno.concat(json);
    }
    return retorno;
  };

  return {
    'getData': getData,
    'getRandomArray': getRandomArray
  };
});