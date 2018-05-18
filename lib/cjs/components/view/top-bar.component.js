'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

var _questionCircle = require('react-icons/lib/fa/question-circle');

var _questionCircle2 = _interopRequireDefault(_questionCircle);

require('./top-bar.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ViewTopBar = function (_React$PureComponent) {
  _inherits(ViewTopBar, _React$PureComponent);

  function ViewTopBar() {
    _classCallCheck(this, ViewTopBar);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  ViewTopBar.prototype.render = function render() {
    var _props = this.props,
        title = _props.title,
        onCancel = _props.onCancel,
        onSelect = _props.onSelect,
        onHelp = _props.onHelp,
        selectDisabled = _props.selectDisabled,
        btnSelectLabel = _props.btnSelectLabel,
        btnCancelLabel = _props.btnCancelLabel,
        helpDisabled = _props.helpDisabled;

    return _react2.default.createElement(
      'div',
      { className: 'oc-dialog-top-bar' },
      _react2.default.createElement(
        'div',
        { className: 'action-left' },
        _react2.default.createElement(
          _reactBootstrap.Modal.Title,
          null,
          title
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'action-right' },
        _react2.default.createElement(
          _reactBootstrap.Button,
          { onClick: onSelect, disabled: selectDisabled },
          btnSelectLabel
        ),
        _react2.default.createElement(
          _reactBootstrap.Button,
          { onClick: onCancel },
          btnCancelLabel
        ),
        _react2.default.createElement(
          'button',
          { type: 'button', className: 'oc-help-button' + (helpDisabled ? '-disabled' : ''), onClick: onHelp },
          _react2.default.createElement(_questionCircle2.default, null)
        )
      )
    );
  };

  return ViewTopBar;
}(_react2.default.PureComponent);

exports.default = ViewTopBar;


ViewTopBar.defaultProps = {
  onCancel: function onCancel() {},
  onSelect: function onSelect() {},
  onHelp: function onHelp() {},
  btnSelectLabel: 'Select',
  btnCancelLabel: 'Cancel'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdG9wLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlZpZXdUb3BCYXIiLCJyZW5kZXIiLCJwcm9wcyIsInRpdGxlIiwib25DYW5jZWwiLCJvblNlbGVjdCIsIm9uSGVscCIsInNlbGVjdERpc2FibGVkIiwiYnRuU2VsZWN0TGFiZWwiLCJidG5DYW5jZWxMYWJlbCIsImhlbHBEaXNhYmxlZCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7SUFFcUJBLFU7Ozs7Ozs7Ozt1QkFDbkJDLE0scUJBQVM7QUFBQSxpQkFVSCxLQUFLQyxLQVZGO0FBQUEsUUFFTEMsS0FGSyxVQUVMQSxLQUZLO0FBQUEsUUFHTEMsUUFISyxVQUdMQSxRQUhLO0FBQUEsUUFJTEMsUUFKSyxVQUlMQSxRQUpLO0FBQUEsUUFLTEMsTUFMSyxVQUtMQSxNQUxLO0FBQUEsUUFNTEMsY0FOSyxVQU1MQSxjQU5LO0FBQUEsUUFPTEMsY0FQSyxVQU9MQSxjQVBLO0FBQUEsUUFRTEMsY0FSSyxVQVFMQSxjQVJLO0FBQUEsUUFTTEMsWUFUSyxVQVNMQSxZQVRLOztBQVdQLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSxtQkFBZjtBQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsYUFBZjtBQUNFO0FBQUEsZ0NBQU8sS0FBUDtBQUFBO0FBQWVQO0FBQWY7QUFERixPQURGO0FBSUU7QUFBQTtBQUFBLFVBQUssV0FBVSxjQUFmO0FBQ0U7QUFBQTtBQUFBLFlBQVEsU0FBU0UsUUFBakIsRUFBMkIsVUFBVUUsY0FBckM7QUFDR0M7QUFESCxTQURGO0FBSUU7QUFBQTtBQUFBLFlBQVEsU0FBU0osUUFBakI7QUFBNEJLO0FBQTVCLFNBSkY7QUFLRTtBQUFBO0FBQUEsWUFBUSxNQUFLLFFBQWIsRUFBc0IsK0JBQTRCQyxlQUFlLFdBQWYsR0FBNkIsRUFBekQsQ0FBdEIsRUFBcUYsU0FBU0osTUFBOUY7QUFDRTtBQURGO0FBTEY7QUFKRixLQURGO0FBZ0JELEc7OztFQTVCcUMsZ0JBQU1LLGE7O2tCQUF6QlgsVTs7O0FBMENyQkEsV0FBV1ksWUFBWCxHQUEwQjtBQUN4QlIsWUFBVSxvQkFBTSxDQUFFLENBRE07QUFFeEJDLFlBQVUsb0JBQU0sQ0FBRSxDQUZNO0FBR3hCQyxVQUFRLGtCQUFNLENBQUUsQ0FIUTtBQUl4QkUsa0JBQWdCLFFBSlE7QUFLeEJDLGtCQUFnQjtBQUxRLENBQTFCIiwiZmlsZSI6InRvcC1iYXIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBNb2RhbCwgQnV0dG9uIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCBGYVF1ZXN0aW9uIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9xdWVzdGlvbi1jaXJjbGUnO1xuXG5pbXBvcnQgJy4vdG9wLWJhci5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld1RvcEJhciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdGl0bGUsXG4gICAgICBvbkNhbmNlbCxcbiAgICAgIG9uU2VsZWN0LFxuICAgICAgb25IZWxwLFxuICAgICAgc2VsZWN0RGlzYWJsZWQsXG4gICAgICBidG5TZWxlY3RMYWJlbCxcbiAgICAgIGJ0bkNhbmNlbExhYmVsLFxuICAgICAgaGVscERpc2FibGVkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRpYWxvZy10b3AtYmFyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLWxlZnRcIj5cbiAgICAgICAgICA8TW9kYWwuVGl0bGU+eyB0aXRsZSB9PC9Nb2RhbC5UaXRsZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLXJpZ2h0XCI+XG4gICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtvblNlbGVjdH0gZGlzYWJsZWQ9e3NlbGVjdERpc2FibGVkfT5cbiAgICAgICAgICAgIHtidG5TZWxlY3RMYWJlbH1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e29uQ2FuY2VsfT57YnRuQ2FuY2VsTGFiZWx9PC9CdXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPXtgb2MtaGVscC1idXR0b24ke2hlbHBEaXNhYmxlZCA/ICctZGlzYWJsZWQnIDogJyd9YH0gb25DbGljaz17b25IZWxwfT5cbiAgICAgICAgICAgIDxGYVF1ZXN0aW9uIC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5WaWV3VG9wQmFyLnByb3BUeXBlcyA9IHtcbiAgb25DYW5jZWw6IFByb3BUeXBlcy5mdW5jLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uSGVscDogUHJvcFR5cGVzLmZ1bmMsXG4gIGhlbHBEaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgc2VsZWN0RGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIHRpdGxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLmlzUmVxdWlyZWQsXG4gIGJ0blNlbGVjdExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBidG5DYW5jZWxMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbn07XG5cblZpZXdUb3BCYXIuZGVmYXVsdFByb3BzID0ge1xuICBvbkNhbmNlbDogKCkgPT4ge30sXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgb25IZWxwOiAoKSA9PiB7fSxcbiAgYnRuU2VsZWN0TGFiZWw6ICdTZWxlY3QnLFxuICBidG5DYW5jZWxMYWJlbDogJ0NhbmNlbCcsXG59O1xuIl19