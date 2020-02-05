"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _spinner = _interopRequireDefault(require("../../spinner"));

var _common = _interopRequireDefault(require("./common.layout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var HSSpinnerLayout =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(HSSpinnerLayout, _React$PureComponent);

  function HSSpinnerLayout() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = HSSpinnerLayout.prototype;

  _proto.render = function render() {
    return _react["default"].createElement(_common["default"], null, _react["default"].createElement(_spinner["default"], null));
  };

  return HSSpinnerLayout;
}(_react["default"].PureComponent);

exports["default"] = HSSpinnerLayout;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvbGF5b3V0cy9zcGlubmVyLmxheW91dC5qc3giXSwibmFtZXMiOlsiSFNTcGlubmVyTGF5b3V0IiwicmVuZGVyIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOztBQUVBOzs7Ozs7SUFFcUJBLGU7Ozs7Ozs7Ozs7O1NBQ25CQyxNLEdBQUEsa0JBQVM7QUFDUCxXQUNFLGdDQUFDLGtCQUFELFFBQ0UsZ0NBQUMsbUJBQUQsT0FERixDQURGO0FBS0QsRzs7O0VBUDBDQyxrQkFBTUMsYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU3Bpbm5lciBmcm9tICcuLi8uLi9zcGlubmVyJztcblxuaW1wb3J0IENvbW1vbkxheW91dCBmcm9tICcuL2NvbW1vbi5sYXlvdXQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIU1NwaW5uZXJMYXlvdXQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8Q29tbW9uTGF5b3V0PlxuICAgICAgICA8U3Bpbm5lciAvPlxuICAgICAgPC9Db21tb25MYXlvdXQ+XG4gICAgKTtcbiAgfVxufVxuIl19