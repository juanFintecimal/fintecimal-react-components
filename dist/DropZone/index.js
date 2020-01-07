"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDropzone = require("react-dropzone");

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _AddCircleOutline = _interopRequireDefault(require("@material-ui/icons/AddCircleOutline"));

var _style = _interopRequireDefault(require("./style"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DropZone = function DropZone(_ref) {
  var multiple = _ref.multiple,
      accept = _ref.accept,
      onDrop = _ref.onDrop;
  var classes = (0, _style.default)();

  var _useDropzone = (0, _reactDropzone.useDropzone)({
    multiple: multiple,
    accept: accept,
    onDrop: onDrop
  }),
      getRootProps = _useDropzone.getRootProps,
      getInputProps = _useDropzone.getInputProps;

  var rootProps = getRootProps({
    className: classes.dropZone
  });
  var inputProps = getInputProps();
  return _react.default.createElement("div", {
    className: classes.dropZoneContainer
  }, _react.default.createElement(_Paper.default, rootProps, _react.default.createElement("input", inputProps), _react.default.createElement("div", null, _react.default.createElement(_AddCircleOutline.default, null)), _react.default.createElement(_Typography.default, {
    className: classes.typography
  }, "Arrastra o selecciona el (los)", _react.default.createElement("br", null), "documento(s) para agregar")));
};

DropZone.propTypes = {
  multiple: _propTypes.default.bool,
  accept: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)]),
  onDrop: _propTypes.default.func
};
DropZone.defaultProps = {
  multiple: false,
  accept: '',
  onDrop: function onDrop() {}
};
var _default = DropZone;
exports.default = _default;