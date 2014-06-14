'use strict';

var print = print || console.log;

function* receiver() {
  let value;

  while (true) {
    try {
      value = yield null;
    } catch (e) {
      value = e;
    } finally {
      print(value);
    }
  }
}

var rec = receiver();
rec.next();
rec.next('hello');
rec.next('world');
