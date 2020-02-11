"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactSpinner = _interopRequireDefault(require("@opuscapita/react-spinner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var DELAY = 50;

var SelectorSpinner =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(SelectorSpinner, _React$PureComponent);

  function SelectorSpinner() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = SelectorSpinner.prototype;

  _proto.render = function render() {
    return _react["default"].createElement(_reactSpinner["default"], {
      delay: DELAY
    });
  };

  return SelectorSpinner;
}(_react["default"].PureComponent);

exports["default"] = SelectorSpinner;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NwaW5uZXIvc3Bpbm5lci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkRFTEFZIiwiU2VsZWN0b3JTcGlubmVyIiwicmVuZGVyIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxLQUFLLEdBQUcsRUFBZDs7SUFFcUJDLGU7Ozs7Ozs7Ozs7O1NBQ25CQyxNLEdBQUEsa0JBQVM7QUFDUCxXQUFPLGdDQUFDLHdCQUFEO0FBQVMsTUFBQSxLQUFLLEVBQUVGO0FBQWhCLE1BQVA7QUFDRCxHOzs7RUFIMENHLGtCQUFNQyxhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTcGlubmVyIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNwaW5uZXInO1xuXG5jb25zdCBERUxBWSA9IDUwO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWxlY3RvclNwaW5uZXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiA8U3Bpbm5lciBkZWxheT17REVMQVl9IC8+O1xuICB9XG59XG4iXX0=