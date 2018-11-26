'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HierarchySelectorAbstractList = function (_React$PureComponent) {
  _inherits(HierarchySelectorAbstractList, _React$PureComponent);

  function HierarchySelectorAbstractList() {
    var _temp, _this, _ret;

    _classCallCheck(this, HierarchySelectorAbstractList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.onSelect = function () {
      /** Template of onSelect event. It should be overridden in a child component */
      _this.props.onSelectHandler();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return HierarchySelectorAbstractList;
}(_react2.default.PureComponent);

exports.default = HierarchySelectorAbstractList;


HierarchySelectorAbstractList.defaultProps = {
  onSelectHandler: function onSelectHandler() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvYWJzdHJhY3QtbGlzdC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkhpZXJhcmNoeVNlbGVjdG9yQWJzdHJhY3RMaXN0Iiwib25TZWxlY3QiLCJwcm9wcyIsIm9uU2VsZWN0SGFuZGxlciIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLDZCOzs7Ozs7Ozs7Ozs7Z0tBQ25CQyxRLEdBQVcsWUFBTTtBQUNmO0FBQ0EsWUFBS0MsS0FBTCxDQUFXQyxlQUFYO0FBQ0QsSzs7OztFQUp3REMsZ0JBQU1DLGE7O2tCQUE1Q0wsNkI7OztBQVdyQkEsOEJBQThCTSxZQUE5QixHQUE2QztBQUMzQ0gsbUJBQWlCLDJCQUFNLENBQUU7QUFEa0IsQ0FBN0MiLCJmaWxlIjoiYWJzdHJhY3QtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5U2VsZWN0b3JBYnN0cmFjdExpc3QgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgb25TZWxlY3QgPSAoKSA9PiB7XG4gICAgLyoqIFRlbXBsYXRlIG9mIG9uU2VsZWN0IGV2ZW50LiBJdCBzaG91bGQgYmUgb3ZlcnJpZGRlbiBpbiBhIGNoaWxkIGNvbXBvbmVudCAqL1xuICAgIHRoaXMucHJvcHMub25TZWxlY3RIYW5kbGVyKCk7XG4gIH1cbn1cblxuSGllcmFyY2h5U2VsZWN0b3JBYnN0cmFjdExpc3QucHJvcFR5cGVzID0ge1xuICBvblNlbGVjdEhhbmRsZXI6IFByb3BUeXBlcy5mdW5jLFxufTtcblxuSGllcmFyY2h5U2VsZWN0b3JBYnN0cmFjdExpc3QuZGVmYXVsdFByb3BzID0ge1xuICBvblNlbGVjdEhhbmRsZXI6ICgpID0+IHt9LFxufTtcbiJdfQ==