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

function read(filename) {
  return function (fn) {
    fs.readFile(filename, 'utf-8', fn);
  };
}

function write(filename, data) {
  return function (fn) {
    fs.writeFile(filename, data, fn);
  };
}

function* readAndWrite() {
  let tmpl, content;

  try {
    tmpl = yield read('fixture/template.html');
    content = yield read('fixture/content.html');
  } catch (e) {
    console.log('Something went wrong: ', e.message);
  }

  let html = tmpl.replace('{{ content }}', content);
  yield write('fixture/index.html', html);
}

run(readAndWrite);
