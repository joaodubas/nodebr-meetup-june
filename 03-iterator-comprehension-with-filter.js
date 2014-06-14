'use strict';

var print = print || console.log;

var listValues = [1, 2, 3, 4, 4, 5]

print('Show list values');
print([a for (a of listValues) if (!(a % 2))]);

var setValues = Set(listValues);

print('Show set values');
print([a for (a of setValues) if (!(a % 2))]);
