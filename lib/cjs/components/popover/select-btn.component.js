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

var HierarchySelectorSelectButton = function (_React$PureComponent) {
  _inherits(HierarchySelectorSelectButton, _React$PureComponent);

  function HierarchySelectorSelectButton() {
    _classCallCheck(this, HierarchySelectorSelectButton);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  HierarchySelectorSelectButton.prototype.render = function render() {
    return _react2.default.createElement(
      'ul',
      { className: 'list-group' },
      _react2.default.createElement(
        'li',
        { className: 'list-group-item' },
        _react2.default.createElement(
          'button',
          { className: 'btn-open-view', onClick: this.props.onClick },
          this.props.label
        )
      )
    );
  };

  return HierarchySelectorSelectButton;
}(_react2.default.PureComponent);

exports.default = HierarchySelectorSelectButton;


HierarchySelectorSelectButton.defaultProps = {
  label: 'Select...',
  onClick: function onClick() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvc2VsZWN0LWJ0bi5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkhpZXJhcmNoeVNlbGVjdG9yU2VsZWN0QnV0dG9uIiwicmVuZGVyIiwicHJvcHMiLCJvbkNsaWNrIiwibGFiZWwiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsNkI7Ozs7Ozs7OzswQ0FDbkJDLE0scUJBQVM7QUFDUCxXQUNFO0FBQUE7QUFBQSxRQUFJLFdBQVUsWUFBZDtBQUNFO0FBQUE7QUFBQSxVQUFJLFdBQVUsaUJBQWQ7QUFBZ0M7QUFBQTtBQUFBLFlBQVEsV0FBVSxlQUFsQixFQUFrQyxTQUFTLEtBQUtDLEtBQUwsQ0FBV0MsT0FBdEQ7QUFBZ0UsZUFBS0QsS0FBTCxDQUFXRTtBQUEzRTtBQUFoQztBQURGLEtBREY7QUFLRCxHOzs7RUFQd0QsZ0JBQU1DLGE7O2tCQUE1Q0wsNkI7OztBQWVyQkEsOEJBQThCTSxZQUE5QixHQUE2QztBQUMzQ0YsU0FBTyxXQURvQztBQUUzQ0QsV0FBUyxtQkFBTSxDQUFFO0FBRjBCLENBQTdDIiwiZmlsZSI6InNlbGVjdC1idG4uY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVNlbGVjdG9yU2VsZWN0QnV0dG9uIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXBcIj5cclxuICAgICAgICA8bGkgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtXCI+PGJ1dHRvbiBjbGFzc05hbWU9XCJidG4tb3Blbi12aWV3XCIgb25DbGljaz17dGhpcy5wcm9wcy5vbkNsaWNrfT57dGhpcy5wcm9wcy5sYWJlbH08L2J1dHRvbj48L2xpPlxyXG4gICAgICA8L3VsPlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbkhpZXJhcmNoeVNlbGVjdG9yU2VsZWN0QnV0dG9uLnByb3BUeXBlcyA9IHtcclxuICBsYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcclxufTtcclxuXHJcbkhpZXJhcmNoeVNlbGVjdG9yU2VsZWN0QnV0dG9uLmRlZmF1bHRQcm9wcyA9IHtcclxuICBsYWJlbDogJ1NlbGVjdC4uLicsXHJcbiAgb25DbGljazogKCkgPT4ge30sXHJcbn07XHJcbiJdfQ==