'use strict';

var print = print || console.log;

function* fibonacci() {
  var a = 0;
  var b = 1;
  var t = 0;

  while (true) {
    yield a;
    t = a;
    a = b;
    b = t + b;
  }
}

function* take(iterable, howMany) {
  var counter = 0;
  for (var taken of iterable) {
    if (counter++ === howMany) {
      return;
    }
    yield taken;
  }
}

function* skip(iterable, howMany) {
  var counter = 0;
  for (var taken of iterable) {
    if (counter++ < howMany) {
      continue
    }
    yield taken;
  }
}

for (var x of take(skip(fibonacci(), 10), 10)) {
  print(x);
}
