'use strict';

var express = require('express');
express = 'default' in express ? express['default'] : express;
var bodyParser = require('body-parser');
bodyParser = 'default' in bodyParser ? bodyParser['default'] : bodyParser;
var babel = require('babel-core');
var _regeneratorRuntime = require('babel-runtime/regenerator');
_regeneratorRuntime = 'default' in _regeneratorRuntime ? _regeneratorRuntime['default'] : _regeneratorRuntime;
var _asyncToGenerator = require('babel-runtime/helpers/asyncToGenerator');
_asyncToGenerator = 'default' in _asyncToGenerator ? _asyncToGenerator['default'] : _asyncToGenerator;
var postcss = require('postcss');
postcss = 'default' in postcss ? postcss['default'] : postcss;
var jade = require('jade');
jade = 'default' in jade ? jade['default'] : jade;
var compile = require('css-whitespace');
compile = 'default' in compile ? compile['default'] : compile;

function babel$1 (req, res) {
  var code = req.body.code;
  if (!code) {
    return res.json({
      error: true,
      message: 'Expected <code> field but not found'
    });
  }
  var babelOpts = {
    presets: ['es2015'],
    plugins: []
  };
  if (req.body.experimental) {
    babelOpts.presets.push('stage-0');
    babelOpts.plugins.push('transform-runtime');
  }
  if (req.body.react) {
    babelOpts.presets.push('react');
  }
  try {
    var result = babel.transform(code, babelOpts);
    res.json({
      code: result.code
    });
  } catch (err) {
    res.json({
      error: true,
      message: err.stack
    });
  }
}

var postcss$1 = function () {
  var ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(req, res) {
    var code, plugins, result;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            code = req.body.code;
            plugins = [require('precss')];
            _context.prev = 2;
            _context.next = 5;
            return postcss(plugins).process(code);

          case 5:
            result = _context.sent;

            res.json({
              code: result.css
            });
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](2);

            res.json({
              error: true,
              message: _context.t0.stack
            });

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 9]]);
  }));

  return function (_x, _x2) {
    return ref.apply(this, arguments);
  };
}();

function jade$1 (req, res) {
  var code = req.body.code;
  try {
    var fn = jade.compile(code);
    res.json({
      code: fn()
    });
  } catch (err) {
    res.json({
      error: true,
      message: err.stack
    });
  }
}

function curlyCSS (req, res) {
  var code = req.body.code;
  try {
    code = compile(decodeURIComponent(encodeURIComponent(code).replace(/\%5Cn/g, '%0A')));
    res.json({
      code: code
    });
  } catch (err) {
    res.json({
      error: true,
      message: err.stack
    });
  }
}

var app = express();
function expectCode(req, res, next) {
  var code = req.body.code;
  if (!code) {
    res.json({
      error: true,
      message: 'Expected <code> field but not found'
    });
  } else {
    next();
  }
}

function server(root) {
  app.set('view engine', 'jade');
  app.set('views', root + '/templates');
  app.use('/static', express.static('build'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.get('/', function (req, res) {
    res.send('ok');
  });
  app.post('/api/babel', expectCode, babel$1);
  app.post('/api/postcss', expectCode, postcss$1);
  app.post('/api/jade', expectCode, jade$1);
  app.post('/api/curlycss', expectCode, curlyCSS);

  var port = app.get('port') || 3003;
  app.listen(port, function () {
    console.log('Transformers are fighting at http://localhost:' + port);
  });
}

module.exports = server;