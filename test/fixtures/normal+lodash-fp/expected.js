'use strict';

var _reject3 = require('lodash/reject');

var _reject4 = _interopRequireDefault(_reject3);

var _reject5 = require('lodash/fp/reject');

var _reject6 = _interopRequireDefault(_reject5);

var _add2 = require('lodash/fp/add');

var _add3 = _interopRequireDefault(_add2);

var _take2 = require('lodash/fp/take');

var _take3 = _interopRequireDefault(_take2);

var _map2 = require('lodash/fp/map');

var _map3 = _interopRequireDefault(_map2);

var _take4 = require('lodash/take');

var _take5 = _interopRequireDefault(_take4);

var _map4 = require('lodash/map');

var _map5 = _interopRequireDefault(_map4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapper = (0, _map3.default)((0, _add3.default)(1));
var result = mapper([1, 2, 3]);
(0, _take3.default)(1, (0, _reject6.default)(Boolean, result));

var result2 = (0, _map5.default)([1, 2, 3], function () {});
(0, _take5.default)((0, _reject4.default)(result), 1);