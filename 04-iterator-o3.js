'use strict';

var print = print || console.log;

var outer = [1, 2, 3];
var middle = [1, 2, 3];
var inner = [1, 2, 3];

print('O(3)');
var format = (a, b, c) => a + ' * ' + b + ' * ' + c + ' = ' + a * b * c
print([format(a, b, c) for (c of inner) for (b of middle) for (a of outer)].join('\n'));
