"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _abstractList = _interopRequireDefault(require("./abstract-list.component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var HierarchySelectorRecentList =
/*#__PURE__*/
function (_HierarchySelectorAbs) {
  _inheritsLoose(HierarchySelectorRecentList, _HierarchySelectorAbs);

  function HierarchySelectorRecentList() {
    return _HierarchySelectorAbs.apply(this, arguments) || this;
  }

  var _proto = HierarchySelectorRecentList.prototype;

  _proto.render = function render() {
    return _react["default"].createElement("div", null, _react["default"].createElement("p", {
      className: "list-group-header"
    }, this.props.recentGroupLabel));
  };

  return HierarchySelectorRecentList;
}(_abstractList["default"]);

exports["default"] = HierarchySelectorRecentList;
HierarchySelectorRecentList.propTypes = {
  recentGroupLabel: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element])
};
HierarchySelectorRecentList.defaultProps = {
  recentGroupLabel: 'Recently used'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvcmVjZW50LWxpc3QuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJIaWVyYXJjaHlTZWxlY3RvclJlY2VudExpc3QiLCJyZW5kZXIiLCJwcm9wcyIsInJlY2VudEdyb3VwTGFiZWwiLCJIaWVyYXJjaHlTZWxlY3RvckFic3RyYWN0TGlzdCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9uZU9mVHlwZSIsInN0cmluZyIsImVsZW1lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBQ0E7O0FBRUE7Ozs7OztJQUVxQkEsMkI7Ozs7Ozs7Ozs7O1NBQ25CQyxNLEdBQUEsa0JBQVM7QUFDUCxXQUNFLDZDQUNFO0FBQUcsTUFBQSxTQUFTLEVBQUM7QUFBYixPQUFrQyxLQUFLQyxLQUFMLENBQVdDLGdCQUE3QyxDQURGLENBREY7QUFLRCxHOzs7RUFQc0RDLHdCOzs7QUFVekRKLDJCQUEyQixDQUFDSyxTQUE1QixHQUF3QztBQUN0Q0YsRUFBQUEsZ0JBQWdCLEVBQUVHLHNCQUFVQyxTQUFWLENBQW9CLENBQUNELHNCQUFVRSxNQUFYLEVBQW1CRixzQkFBVUcsT0FBN0IsQ0FBcEI7QUFEb0IsQ0FBeEM7QUFJQVQsMkJBQTJCLENBQUNVLFlBQTVCLEdBQTJDO0FBQ3pDUCxFQUFBQSxnQkFBZ0IsRUFBRTtBQUR1QixDQUEzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgSGllcmFyY2h5U2VsZWN0b3JBYnN0cmFjdExpc3QgZnJvbSAnLi9hYnN0cmFjdC1saXN0LmNvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVNlbGVjdG9yUmVjZW50TGlzdCBleHRlbmRzIEhpZXJhcmNoeVNlbGVjdG9yQWJzdHJhY3RMaXN0IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8cCBjbGFzc05hbWU9XCJsaXN0LWdyb3VwLWhlYWRlclwiPnt0aGlzLnByb3BzLnJlY2VudEdyb3VwTGFiZWx9PC9wPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5IaWVyYXJjaHlTZWxlY3RvclJlY2VudExpc3QucHJvcFR5cGVzID0ge1xuICByZWNlbnRHcm91cExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxufTtcblxuSGllcmFyY2h5U2VsZWN0b3JSZWNlbnRMaXN0LmRlZmF1bHRQcm9wcyA9IHtcbiAgcmVjZW50R3JvdXBMYWJlbDogJ1JlY2VudGx5IHVzZWQnLFxufTtcbiJdfQ==