#!/usr/local/bin/node --harmony
'use strict';

const request = require('superagent');
const co = require('co');

function get(url) {
  let handlers = {
    error: function (response) {
      return function (fn) {
        fn(new Error(response.status + ': ' + response.text), null);
      };
    },
    ok: function (response) {
      return function (fn) {
        fn(null, response);
      };
    }
  };

  return function (fn) {
    request.get(url, function (response) {
      let key = /^[4|5]\d{2}$/.test(String(response.status)) ? 'err' : 'ok';
      let handler = handlers[key](response);
      handler(fn);
    });
  }
}

function links(body) {
  let regex = /href=\"http[^\"]+\"/g;
  return body.match(regex).map(function (href) {
    return href.substring(href.indexOf('"') + 1, href.lastIndexOf('"'));
  });
}

function header(field) {
  return function (response) {
    return response.headers[field];
  }
}

function* getContents() {
  let response;
  let responses;
  try {
    response = yield get('http://cloudup.com');
    responses = yield links(response.text).map(get);
  } catch (e) {
    console.log('error');
    return e
  }

  let contents = responses.map(header('content-type'));
  return contents;
}

function showTypes(fn) {
  co(getContents)(fn);
}

showTypes(function (err, result) {
  if (err) {
    console.log('wtf', err);
  } else {
    console.log('ok', result);
  }
});
