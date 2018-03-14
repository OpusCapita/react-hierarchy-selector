function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

var HierarchySelectorSelectButton = function (_React$PureComponent) {
  _inherits(HierarchySelectorSelectButton, _React$PureComponent);

  function HierarchySelectorSelectButton() {
    _classCallCheck(this, HierarchySelectorSelectButton);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  HierarchySelectorSelectButton.prototype.render = function render() {
    return React.createElement(
      'ul',
      { className: 'list-group' },
      React.createElement(
        'li',
        { className: 'list-group-item' },
        React.createElement(
          'button',
          { className: 'btn-open-view', onClick: this.props.onClick },
          this.props.label
        )
      )
    );
  };

  return HierarchySelectorSelectButton;
}(React.PureComponent);

export { HierarchySelectorSelectButton as default };


HierarchySelectorSelectButton.defaultProps = {
  label: 'Select...',
  onClick: function onClick() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvc2VsZWN0LWJ0bi5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiSGllcmFyY2h5U2VsZWN0b3JTZWxlY3RCdXR0b24iLCJyZW5kZXIiLCJwcm9wcyIsIm9uQ2xpY2siLCJsYWJlbCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCOztJQUVxQkMsNkI7Ozs7Ozs7OzswQ0FDbkJDLE0scUJBQVM7QUFDUCxXQUNFO0FBQUE7QUFBQSxRQUFJLFdBQVUsWUFBZDtBQUNFO0FBQUE7QUFBQSxVQUFJLFdBQVUsaUJBQWQ7QUFBZ0M7QUFBQTtBQUFBLFlBQVEsV0FBVSxlQUFsQixFQUFrQyxTQUFTLEtBQUtDLEtBQUwsQ0FBV0MsT0FBdEQ7QUFBZ0UsZUFBS0QsS0FBTCxDQUFXRTtBQUEzRTtBQUFoQztBQURGLEtBREY7QUFLRCxHOzs7RUFQd0ROLE1BQU1PLGE7O1NBQTVDTCw2Qjs7O0FBZXJCQSw4QkFBOEJNLFlBQTlCLEdBQTZDO0FBQzNDRixTQUFPLFdBRG9DO0FBRTNDRCxXQUFTLG1CQUFNLENBQUU7QUFGMEIsQ0FBN0MiLCJmaWxlIjoic2VsZWN0LWJ0bi5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5U2VsZWN0b3JTZWxlY3RCdXR0b24gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdC1ncm91cFwiPlxyXG4gICAgICAgIDxsaSBjbGFzc05hbWU9XCJsaXN0LWdyb3VwLWl0ZW1cIj48YnV0dG9uIGNsYXNzTmFtZT1cImJ0bi1vcGVuLXZpZXdcIiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xpY2t9Pnt0aGlzLnByb3BzLmxhYmVsfTwvYnV0dG9uPjwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuSGllcmFyY2h5U2VsZWN0b3JTZWxlY3RCdXR0b24ucHJvcFR5cGVzID0ge1xyXG4gIGxhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxyXG59O1xyXG5cclxuSGllcmFyY2h5U2VsZWN0b3JTZWxlY3RCdXR0b24uZGVmYXVsdFByb3BzID0ge1xyXG4gIGxhYmVsOiAnU2VsZWN0Li4uJyxcclxuICBvbkNsaWNrOiAoKSA9PiB7fSxcclxufTtcclxuIl19