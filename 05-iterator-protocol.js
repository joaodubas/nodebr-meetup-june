'use strict';

var print = print || console.log;

function JSONStrings(strings) {
  this.jsonStrings = strings;
}

function JSONStringIterator(strings) {
  this.arrayStrings = strings;
  this.index = 0;
}
JSONStringIterator.prototype.next = function () {
  if (this.index >= this.arrayStrings.length) {
    return {done: true};
  }
  return {
    value: JSON.parse(this.arrayStrings[this.index++]),
    done: false
  };
};


JSONStrings.prototype['@@iterator'] = function () {
  return new JSONStringIterator(this.jsonStrings);
};

var strings = [
  '{"id": 1, "name": "Joao"}',
  '{"id": 2, "name": "Paulo"}',
  '{"id": 3, "name": "Dubas"}'
];

var iterStrings = new JSONStrings(strings);

for (let user of iterStrings) {
  print(user.id + ' : ' + user.name);
}
