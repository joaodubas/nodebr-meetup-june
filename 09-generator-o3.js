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

var format = (a, b, c) => a + ' * ' + b + ' * ' + c + ' = ' + a * b * c
var seq = (format(a, b, c)
    for (c of take(skip(fibonacci(), 6), 3))
    for (b of take(skip(fibonacci(), 3), 3))
    for (a of take(fibonacci(), 3))
);

print('O(3)');
for (let x of seq) {
  print(x);
}
