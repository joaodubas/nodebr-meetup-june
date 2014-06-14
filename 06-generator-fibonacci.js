'use strict';

var print = print || console.log;

function *fibonacci() {
  var [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
