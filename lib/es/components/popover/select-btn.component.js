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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvc2VsZWN0LWJ0bi5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiSGllcmFyY2h5U2VsZWN0b3JTZWxlY3RCdXR0b24iLCJyZW5kZXIiLCJwcm9wcyIsIm9uQ2xpY2siLCJsYWJlbCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCOztJQUVxQkMsNkI7Ozs7Ozs7OzswQ0FDbkJDLE0scUJBQVM7QUFDUCxXQUNFO0FBQUE7QUFBQSxRQUFJLFdBQVUsWUFBZDtBQUNFO0FBQUE7QUFBQSxVQUFJLFdBQVUsaUJBQWQ7QUFBZ0M7QUFBQTtBQUFBLFlBQVEsV0FBVSxlQUFsQixFQUFrQyxTQUFTLEtBQUtDLEtBQUwsQ0FBV0MsT0FBdEQ7QUFBZ0UsZUFBS0QsS0FBTCxDQUFXRTtBQUEzRTtBQUFoQztBQURGLEtBREY7QUFLRCxHOzs7RUFQd0ROLE1BQU1PLGE7O1NBQTVDTCw2Qjs7O0FBZXJCQSw4QkFBOEJNLFlBQTlCLEdBQTZDO0FBQzNDRixTQUFPLFdBRG9DO0FBRTNDRCxXQUFTLG1CQUFNLENBQUU7QUFGMEIsQ0FBN0MiLCJmaWxlIjoic2VsZWN0LWJ0bi5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5U2VsZWN0b3JTZWxlY3RCdXR0b24gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdC1ncm91cFwiPlxuICAgICAgICA8bGkgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtXCI+PGJ1dHRvbiBjbGFzc05hbWU9XCJidG4tb3Blbi12aWV3XCIgb25DbGljaz17dGhpcy5wcm9wcy5vbkNsaWNrfT57dGhpcy5wcm9wcy5sYWJlbH08L2J1dHRvbj48L2xpPlxuICAgICAgPC91bD5cbiAgICApO1xuICB9XG59XG5cbkhpZXJhcmNoeVNlbGVjdG9yU2VsZWN0QnV0dG9uLnByb3BUeXBlcyA9IHtcbiAgbGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxufTtcblxuSGllcmFyY2h5U2VsZWN0b3JTZWxlY3RCdXR0b24uZGVmYXVsdFByb3BzID0ge1xuICBsYWJlbDogJ1NlbGVjdC4uLicsXG4gIG9uQ2xpY2s6ICgpID0+IHt9LFxufTtcbiJdfQ==