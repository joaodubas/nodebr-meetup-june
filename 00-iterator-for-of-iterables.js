'use strict';

var print = print ? print : console.log;

var listValues = [1, 2, 3, 4, 4, 5];

print('Show list values');
for (let x of listValues) {
  print(x);
}

var setValues = Set(listValues);

print('Show set values');
for (let x of setValues) {
  print(x);
}
