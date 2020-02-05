function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

var HierarchySelectorSelectButton =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(HierarchySelectorSelectButton, _React$PureComponent);

  function HierarchySelectorSelectButton() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = HierarchySelectorSelectButton.prototype;

  _proto.render = function render() {
    return React.createElement("ul", {
      className: "list-group"
    }, React.createElement("li", {
      className: "list-group-item"
    }, React.createElement("button", {
      className: "btn-open-view",
      onClick: this.props.onClick
    }, this.props.label)));
  };

  return HierarchySelectorSelectButton;
}(React.PureComponent);

export { HierarchySelectorSelectButton as default };
HierarchySelectorSelectButton.defaultProps = {
  label: 'Select...',
  onClick: function onClick() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvc2VsZWN0LWJ0bi5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiSGllcmFyY2h5U2VsZWN0b3JTZWxlY3RCdXR0b24iLCJyZW5kZXIiLCJwcm9wcyIsIm9uQ2xpY2siLCJsYWJlbCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7O0lBRXFCQyw2Qjs7Ozs7Ozs7Ozs7U0FDbkJDLE0sR0FBQSxrQkFBUztBQUNQLFdBQ0U7QUFBSSxNQUFBLFNBQVMsRUFBQztBQUFkLE9BQ0U7QUFBSSxNQUFBLFNBQVMsRUFBQztBQUFkLE9BQWdDO0FBQVEsTUFBQSxTQUFTLEVBQUMsZUFBbEI7QUFBa0MsTUFBQSxPQUFPLEVBQUUsS0FBS0MsS0FBTCxDQUFXQztBQUF0RCxPQUFnRSxLQUFLRCxLQUFMLENBQVdFLEtBQTNFLENBQWhDLENBREYsQ0FERjtBQUtELEc7OztFQVB3RE4sS0FBSyxDQUFDTyxhOztTQUE1Q0wsNkI7QUFlckJBLDZCQUE2QixDQUFDTSxZQUE5QixHQUE2QztBQUMzQ0YsRUFBQUEsS0FBSyxFQUFFLFdBRG9DO0FBRTNDRCxFQUFBQSxPQUFPLEVBQUUsbUJBQU0sQ0FBRTtBQUYwQixDQUE3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlTZWxlY3RvclNlbGVjdEJ1dHRvbiBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0LWdyb3VwXCI+XG4gICAgICAgIDxsaSBjbGFzc05hbWU9XCJsaXN0LWdyb3VwLWl0ZW1cIj48YnV0dG9uIGNsYXNzTmFtZT1cImJ0bi1vcGVuLXZpZXdcIiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xpY2t9Pnt0aGlzLnByb3BzLmxhYmVsfTwvYnV0dG9uPjwvbGk+XG4gICAgICA8L3VsPlxuICAgICk7XG4gIH1cbn1cblxuSGllcmFyY2h5U2VsZWN0b3JTZWxlY3RCdXR0b24ucHJvcFR5cGVzID0ge1xuICBsYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5IaWVyYXJjaHlTZWxlY3RvclNlbGVjdEJ1dHRvbi5kZWZhdWx0UHJvcHMgPSB7XG4gIGxhYmVsOiAnU2VsZWN0Li4uJyxcbiAgb25DbGljazogKCkgPT4ge30sXG59O1xuIl19