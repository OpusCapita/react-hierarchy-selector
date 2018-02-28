'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSpinner = require('@opuscapita/react-spinner');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DELAY = 50;

var SelectorSpinner = function (_React$PureComponent) {
  _inherits(SelectorSpinner, _React$PureComponent);

  function SelectorSpinner() {
    _classCallCheck(this, SelectorSpinner);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  SelectorSpinner.prototype.render = function render() {
    return _react2.default.createElement(_reactSpinner.Spinner, { delay: DELAY });
  };

  return SelectorSpinner;
}(_react2.default.PureComponent);

exports.default = SelectorSpinner;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NwaW5uZXIvc3Bpbm5lci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkRFTEFZIiwiU2VsZWN0b3JTcGlubmVyIiwicmVuZGVyIiwiUHVyZUNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsUUFBUSxFQUFkOztJQUVxQkMsZTs7Ozs7Ozs7OzRCQUNuQkMsTSxxQkFBUztBQUNQLFdBQU8sdURBQVMsT0FBT0YsS0FBaEIsR0FBUDtBQUNELEc7OztFQUgwQyxnQkFBTUcsYTs7a0JBQTlCRixlIiwiZmlsZSI6InNwaW5uZXIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFNwaW5uZXIgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zcGlubmVyJztcblxuY29uc3QgREVMQVkgPSA1MDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0b3JTcGlubmVyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gPFNwaW5uZXIgZGVsYXk9e0RFTEFZfSAvPjtcbiAgfVxufVxuIl19