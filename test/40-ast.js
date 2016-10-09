'use strict';


var assert = require('assert');
var path   = require('path');
var fs     = require('fs');
var yaml   = require('../');

var TEST_SCHEMA = require('./support/schema').TEST_SCHEMA;


suite('AST', function () {
  var samplesDir = path.resolve(__dirname, 'samples-common');

  fs.readdirSync(samplesDir).forEach(function (jsFile) {
    if (path.extname(jsFile) !== '.js') return; // continue

    var yamlFile = path.resolve(samplesDir, path.basename(jsFile, '.js') + '.yml');

    test(path.basename(jsFile, '.js'), function () {
      var expected = require(path.resolve(samplesDir, jsFile));
      var actual = [];
      // var data     = fs.readFileSync(yamlFile, { encoding: 'utf8' });
      // var ast      = yaml.scan(data, { schema: TEST_SCHEMA });
      // var actual   = ast.toJSON();

      yaml.scanAll(fs.readFileSync(yamlFile, { encoding: 'utf8' }), function (doc) {
        actual.push(doc.toJSON());
      }, {
        filename: yamlFile,
        schema: TEST_SCHEMA
      });

      if (actual.length === 1) actual = actual[0];

      if (typeof expected === 'function') {
        expected.call(this, actual);
      } else {
        assert.deepEqual(actual, expected);
      }
    });
  });
});
