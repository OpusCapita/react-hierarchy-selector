'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _spinner = require('../../spinner');

var _spinner2 = _interopRequireDefault(_spinner);

var _common = require('./common.layout');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HSSpinnerLayout = function (_React$PureComponent) {
  _inherits(HSSpinnerLayout, _React$PureComponent);

  function HSSpinnerLayout() {
    _classCallCheck(this, HSSpinnerLayout);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  HSSpinnerLayout.prototype.render = function render() {
    return _react2.default.createElement(
      _common2.default,
      null,
      _react2.default.createElement(_spinner2.default, null)
    );
  };

  return HSSpinnerLayout;
}(_react2.default.PureComponent);

exports.default = HSSpinnerLayout;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvbGF5b3V0cy9zcGlubmVyLmxheW91dC5qc3giXSwibmFtZXMiOlsiSFNTcGlubmVyTGF5b3V0IiwicmVuZGVyIiwiUHVyZUNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztJQUVxQkEsZTs7Ozs7Ozs7OzRCQUNuQkMsTSxxQkFBUztBQUNQLFdBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFERixLQURGO0FBS0QsRzs7O0VBUDBDLGdCQUFNQyxhOztrQkFBOUJGLGUiLCJmaWxlIjoic3Bpbm5lci5sYXlvdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgU3Bpbm5lciBmcm9tICcuLi8uLi9zcGlubmVyJztcclxuXHJcbmltcG9ydCBDb21tb25MYXlvdXQgZnJvbSAnLi9jb21tb24ubGF5b3V0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhTU3Bpbm5lckxheW91dCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxDb21tb25MYXlvdXQ+XHJcbiAgICAgICAgPFNwaW5uZXIgLz5cclxuICAgICAgPC9Db21tb25MYXlvdXQ+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=