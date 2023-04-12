"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Edit = _interopRequireDefault(require("@material-ui/icons/Edit"));

var _Delete = _interopRequireDefault(require("@material-ui/icons/Delete"));

var _style = _interopRequireDefault(require("./style"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Table = function Table(_ref) {
  var headers = _ref.headers,
      items = _ref.items,
      onClickRow = _ref.onClickRow,
      edit = _ref.edit,
      onEdit = _ref.onEdit,
      deleteRow = _ref.deleteRow,
      onDeleteRow = _ref.onDeleteRow,
      maxHeaders = _ref.maxHeaders,
      disable = _ref.disable;
  var classes = (0, _style.default)();

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      shortItems = _useState2[0],
      setShortItems = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      shortHeaders = _useState4[0],
      setShortHeaders = _useState4[1];
  /**
   *
   * @param {Number} currentIndex
   * @param {Array} array
   */


  var isLastIndex = function isLastIndex(array, currentIndex) {
    return currentIndex === array.length - 1;
  };
  /**
   * 
   * @param {Any} item 
   * @param {Number} index 
   */


  var handleOnClickRow = function handleOnClickRow(item, index) {
    return function () {
      onClickRow(item, index);
    };
  };
  /**
   * 
   * @param {Any} item 
   * @param {Number} index 
   */


  var handleOnEdit = function handleOnEdit(item, index) {
    return function (event) {
      event.preventDefault();
      event.stopPropagation();
      onEdit(item, index, event);
    };
  };

  var handleOnDelete = function handleOnDelete(item, index) {
    return function (event) {
      event.preventDefault();
      event.stopPropagation();
      onDeleteRow(item, index, event);
    };
  };

  var setShortValues = function setShortValues() {
    var newShortHeaders = headers.slice(0, maxHeaders);
    var newShortItems = items.map(function (item) {
      var names = Object.keys(item).slice(0, maxHeaders);
      var values = Object.values(item).slice(0, maxHeaders);
      var newItem = names.reduce(function (acc, name, index) {
        acc[name] = values[index];
        return acc;
      }, {});
      return newItem;
    });
    setShortHeaders(newShortHeaders);
    setShortItems(newShortItems);
  };

  (0, _react.useEffect)(function () {
    if (items.length && headers.length) {
      setShortValues();
    }
  }, [items, headers]);
  return _react.default.createElement("tbody", null, items.map(function (item, index) {
    return _react.default.createElement("tr", {
      key: "tr-".concat(index),
      className: classes.tr,
      onClick: handleOnClickRow(item, index)
    }, shortHeaders.map(function (_ref2, headerIndex) {
      var key = _ref2.key;
      return _react.default.createElement("td", {
        key: "td-".concat(key, "-").concat(shortItems[key], "-").concat(index),
        className: (0, _classnames3.default)(classes.td, _defineProperty({}, classes.editButton, edit && isLastIndex(shortHeaders, headerIndex)), _defineProperty({}, classes.editButton, deleteRow && isLastIndex(shortHeaders, headerIndex)))
      }, _react.default.createElement("span", {
        className: classes.tableValue
      }, item[key]), isLastIndex(shortHeaders, headerIndex) && _react.default.createElement("div", null, edit && _react.default.createElement(_IconButton.default, {
        className: classes.noPadding,
        onClick: handleOnEdit(item, index),
        disable: disable
      }, _react.default.createElement(_Edit.default, null)), deleteRow && _react.default.createElement(_IconButton.default, {
        className: classes.noPadding,
        onClick: handleOnDelete(item, index),
        disable: disable
      }, _react.default.createElement(_Delete.default, null))));
    }));
  }));
};

Table.propTypes = {
  headers: _propTypes.default.arrayOf(_propTypes.default.shape({
    key: _propTypes.default.string,
    value: _propTypes.default.string
  })),
  items: _propTypes.default.array,
  onClickRow: _propTypes.default.func,
  edit: _propTypes.default.bool,
  onEdit: _propTypes.default.func,
  deleteRow: _propTypes.default.bool,
  onDeleteRow: _propTypes.default.func,
  disable: _propTypes.default.bool
};
Table.defaultProps = {
  headers: [],
  items: [],
  onClickRow: function onClickRow() {},
  edit: false,
  onEdit: function onEdit() {},
  deleteRow: false,
  onDeleteRow: function onDeleteRow() {},
  disable: false
};
var _default = Table;
exports.default = _default;