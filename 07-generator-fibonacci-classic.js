'use strict';

module.exports = fibonacci;

function* fibonacci() {
  var a = 0;
  var b = 1;
  var temp = 0;
  while (true) {
    temp = a;
    a = b;
    b = temp + b;
    yield temp;
  }
}

