'use strict';

var print = print || console.log;

function* values() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 4;
  yield 5;
}

for (let x of values()) {
  print(x);
}
