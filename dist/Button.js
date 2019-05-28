"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

require("../styles/Button.css");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class Button extends _react.Component {
  render() {
    const _this$props = this.props,
          className = _this$props.className,
          textBtn = _this$props.textBtn,
          style = _this$props.style,
          type = _this$props.type;
    return _react.default.createElement("div", null, _react.default.createElement("button", {
      className: "fnt-btn-general".concat(type.length ? '-' : '').concat(type, " ").concat(className),
      style: style,
      onClick: e => this.props.onClick(e)
    }, textBtn));
  }

}

Button.defaultProps = {
  className: '',
  textBtn: 'Botón',
  type: '',
  style: {}
};
var _default = Button;
exports.default = _default;