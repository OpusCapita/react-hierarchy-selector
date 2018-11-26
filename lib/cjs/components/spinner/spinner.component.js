'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSpinner = require('@opuscapita/react-spinner');

var _reactSpinner2 = _interopRequireDefault(_reactSpinner);

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
    return _react2.default.createElement(_reactSpinner2.default, { delay: DELAY });
  };

  return SelectorSpinner;
}(_react2.default.PureComponent);

exports.default = SelectorSpinner;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NwaW5uZXIvc3Bpbm5lci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkRFTEFZIiwiU2VsZWN0b3JTcGlubmVyIiwicmVuZGVyIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFFBQVEsRUFBZDs7SUFFcUJDLGU7Ozs7Ozs7Ozs0QkFDbkJDLE0scUJBQVM7QUFDUCxXQUFPLDhCQUFDLHNCQUFELElBQVMsT0FBT0YsS0FBaEIsR0FBUDtBQUNELEc7OztFQUgwQ0csZ0JBQU1DLGE7O2tCQUE5QkgsZSIsImZpbGUiOiJzcGlubmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU3Bpbm5lciBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zcGlubmVyJztcblxuY29uc3QgREVMQVkgPSA1MDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0b3JTcGlubmVyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gPFNwaW5uZXIgZGVsYXk9e0RFTEFZfSAvPjtcbiAgfVxufVxuIl19