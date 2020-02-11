"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var HierarchySelectorSelectButton =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(HierarchySelectorSelectButton, _React$PureComponent);

  function HierarchySelectorSelectButton() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = HierarchySelectorSelectButton.prototype;

  _proto.render = function render() {
    return _react["default"].createElement("ul", {
      className: "list-group"
    }, _react["default"].createElement("li", {
      className: "list-group-item"
    }, _react["default"].createElement("button", {
      className: "btn-open-view",
      onClick: this.props.onClick
    }, this.props.label)));
  };

  return HierarchySelectorSelectButton;
}(_react["default"].PureComponent);

exports["default"] = HierarchySelectorSelectButton;
HierarchySelectorSelectButton.defaultProps = {
  label: 'Select...',
  onClick: function onClick() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvc2VsZWN0LWJ0bi5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkhpZXJhcmNoeVNlbGVjdG9yU2VsZWN0QnV0dG9uIiwicmVuZGVyIiwicHJvcHMiLCJvbkNsaWNrIiwibGFiZWwiLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztJQUVxQkEsNkI7Ozs7Ozs7Ozs7O1NBQ25CQyxNLEdBQUEsa0JBQVM7QUFDUCxXQUNFO0FBQUksTUFBQSxTQUFTLEVBQUM7QUFBZCxPQUNFO0FBQUksTUFBQSxTQUFTLEVBQUM7QUFBZCxPQUFnQztBQUFRLE1BQUEsU0FBUyxFQUFDLGVBQWxCO0FBQWtDLE1BQUEsT0FBTyxFQUFFLEtBQUtDLEtBQUwsQ0FBV0M7QUFBdEQsT0FBZ0UsS0FBS0QsS0FBTCxDQUFXRSxLQUEzRSxDQUFoQyxDQURGLENBREY7QUFLRCxHOzs7RUFQd0RDLGtCQUFNQyxhOzs7QUFlakVOLDZCQUE2QixDQUFDTyxZQUE5QixHQUE2QztBQUMzQ0gsRUFBQUEsS0FBSyxFQUFFLFdBRG9DO0FBRTNDRCxFQUFBQSxPQUFPLEVBQUUsbUJBQU0sQ0FBRTtBQUYwQixDQUE3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlTZWxlY3RvclNlbGVjdEJ1dHRvbiBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0LWdyb3VwXCI+XG4gICAgICAgIDxsaSBjbGFzc05hbWU9XCJsaXN0LWdyb3VwLWl0ZW1cIj48YnV0dG9uIGNsYXNzTmFtZT1cImJ0bi1vcGVuLXZpZXdcIiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xpY2t9Pnt0aGlzLnByb3BzLmxhYmVsfTwvYnV0dG9uPjwvbGk+XG4gICAgICA8L3VsPlxuICAgICk7XG4gIH1cbn1cblxuSGllcmFyY2h5U2VsZWN0b3JTZWxlY3RCdXR0b24ucHJvcFR5cGVzID0ge1xuICBsYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5IaWVyYXJjaHlTZWxlY3RvclNlbGVjdEJ1dHRvbi5kZWZhdWx0UHJvcHMgPSB7XG4gIGxhYmVsOiAnU2VsZWN0Li4uJyxcbiAgb25DbGljazogKCkgPT4ge30sXG59O1xuIl19