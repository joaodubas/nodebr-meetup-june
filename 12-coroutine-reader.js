#!/usr/local/bin/node --use_strict --harmony
'use strict';

const fs = require('fs');

function run(genfun) {
  let gen = genfun();

  function next(err, data) {
    let result;

    if (err) return gen.throw(err);

    result = gen.next(data);
    if (result.done) return;
    result.value(next);
  }

  next();
}

function readFile(filepath) {
  return function (fn) {
    fs.readFile(filepath, 'utf-8', fn);
  };
}

function* template() {
  try {
    let tmpl = yield readFile('fixture/template.html');
    let content = yield readFile('fixture/content.html');

    console.log(tmpl.replace('{{ content }}', content.replace(/\n/, '')));
  } catch (e) {
    console.log('Something went wrong: ', e.message);
  }
}

run(template);
