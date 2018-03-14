'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _abstractList = require('./abstract-list.component');

var _abstractList2 = _interopRequireDefault(_abstractList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HierarchySelectorRecentList = function (_HierarchySelectorAbs) {
  _inherits(HierarchySelectorRecentList, _HierarchySelectorAbs);

  function HierarchySelectorRecentList() {
    _classCallCheck(this, HierarchySelectorRecentList);

    return _possibleConstructorReturn(this, _HierarchySelectorAbs.apply(this, arguments));
  }

  HierarchySelectorRecentList.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'p',
        { className: 'list-group-header' },
        this.props.recentGroupLabel
      )
    );
  };

  return HierarchySelectorRecentList;
}(_abstractList2.default);

exports.default = HierarchySelectorRecentList;


HierarchySelectorRecentList.propTypes = {
  recentGroupLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element])
};

HierarchySelectorRecentList.defaultProps = {
  recentGroupLabel: 'Recently used'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvcmVjZW50LWxpc3QuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJIaWVyYXJjaHlTZWxlY3RvclJlY2VudExpc3QiLCJyZW5kZXIiLCJwcm9wcyIsInJlY2VudEdyb3VwTGFiZWwiLCJwcm9wVHlwZXMiLCJvbmVPZlR5cGUiLCJzdHJpbmciLCJlbGVtZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRXFCQSwyQjs7Ozs7Ozs7O3dDQUNuQkMsTSxxQkFBUztBQUNQLFdBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLFVBQUcsV0FBVSxtQkFBYjtBQUFrQyxhQUFLQyxLQUFMLENBQVdDO0FBQTdDO0FBREYsS0FERjtBQUtELEc7Ozs7O2tCQVBrQkgsMkI7OztBQVVyQkEsNEJBQTRCSSxTQUE1QixHQUF3QztBQUN0Q0Qsb0JBQWtCLG9CQUFVRSxTQUFWLENBQW9CLENBQUMsb0JBQVVDLE1BQVgsRUFBbUIsb0JBQVVDLE9BQTdCLENBQXBCO0FBRG9CLENBQXhDOztBQUlBUCw0QkFBNEJRLFlBQTVCLEdBQTJDO0FBQ3pDTCxvQkFBa0I7QUFEdUIsQ0FBM0MiLCJmaWxlIjoicmVjZW50LWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuXHJcbmltcG9ydCBIaWVyYXJjaHlTZWxlY3RvckFic3RyYWN0TGlzdCBmcm9tICcuL2Fic3RyYWN0LWxpc3QuY29tcG9uZW50JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVNlbGVjdG9yUmVjZW50TGlzdCBleHRlbmRzIEhpZXJhcmNoeVNlbGVjdG9yQWJzdHJhY3RMaXN0IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxwIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaGVhZGVyXCI+e3RoaXMucHJvcHMucmVjZW50R3JvdXBMYWJlbH08L3A+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbkhpZXJhcmNoeVNlbGVjdG9yUmVjZW50TGlzdC5wcm9wVHlwZXMgPSB7XHJcbiAgcmVjZW50R3JvdXBMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxufTtcclxuXHJcbkhpZXJhcmNoeVNlbGVjdG9yUmVjZW50TGlzdC5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgcmVjZW50R3JvdXBMYWJlbDogJ1JlY2VudGx5IHVzZWQnLFxyXG59O1xyXG4iXX0=