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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdG9wLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlZpZXdUb3BCYXIiLCJyZW5kZXIiLCJwcm9wcyIsInRpdGxlIiwib25DYW5jZWwiLCJvblNlbGVjdCIsIm9uSGVscCIsInNlbGVjdERpc2FibGVkIiwiYnRuU2VsZWN0TGFiZWwiLCJidG5DYW5jZWxMYWJlbCIsImhlbHBEaXNhYmxlZCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7SUFFcUJBLFU7Ozs7Ozs7Ozt1QkFDbkJDLE0scUJBQVM7QUFBQSxpQkFVSCxLQUFLQyxLQVZGO0FBQUEsUUFFTEMsS0FGSyxVQUVMQSxLQUZLO0FBQUEsUUFHTEMsUUFISyxVQUdMQSxRQUhLO0FBQUEsUUFJTEMsUUFKSyxVQUlMQSxRQUpLO0FBQUEsUUFLTEMsTUFMSyxVQUtMQSxNQUxLO0FBQUEsUUFNTEMsY0FOSyxVQU1MQSxjQU5LO0FBQUEsUUFPTEMsY0FQSyxVQU9MQSxjQVBLO0FBQUEsUUFRTEMsY0FSSyxVQVFMQSxjQVJLO0FBQUEsUUFTTEMsWUFUSyxVQVNMQSxZQVRLOztBQVdQLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSxtQkFBZjtBQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsYUFBZjtBQUNFO0FBQUEsZ0NBQU8sS0FBUDtBQUFBO0FBQWVQO0FBQWY7QUFERixPQURGO0FBSUU7QUFBQTtBQUFBLFVBQUssV0FBVSxjQUFmO0FBQ0U7QUFBQTtBQUFBLFlBQVEsU0FBU0UsUUFBakIsRUFBMkIsVUFBVUUsY0FBckM7QUFDR0M7QUFESCxTQURGO0FBSUU7QUFBQTtBQUFBLFlBQVEsU0FBU0osUUFBakI7QUFBNEJLO0FBQTVCLFNBSkY7QUFLRTtBQUFBO0FBQUEsWUFBUSxNQUFLLFFBQWIsRUFBc0IsK0JBQTRCQyxlQUFlLFdBQWYsR0FBNkIsRUFBekQsQ0FBdEIsRUFBcUYsU0FBU0osTUFBOUY7QUFDRTtBQURGO0FBTEY7QUFKRixLQURGO0FBZ0JELEc7OztFQTVCcUMsZ0JBQU1LLGE7O2tCQUF6QlgsVTs7O0FBMENyQkEsV0FBV1ksWUFBWCxHQUEwQjtBQUN4QlIsWUFBVSxvQkFBTSxDQUFFLENBRE07QUFFeEJDLFlBQVUsb0JBQU0sQ0FBRSxDQUZNO0FBR3hCQyxVQUFRLGtCQUFNLENBQUUsQ0FIUTtBQUl4QkUsa0JBQWdCLFFBSlE7QUFLeEJDLGtCQUFnQjtBQUxRLENBQTFCIiwiZmlsZSI6InRvcC1iYXIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IHsgTW9kYWwsIEJ1dHRvbiB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCBGYVF1ZXN0aW9uIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9xdWVzdGlvbi1jaXJjbGUnO1xyXG5cclxuaW1wb3J0ICcuL3RvcC1iYXIuc2Nzcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3VG9wQmFyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICB0aXRsZSxcclxuICAgICAgb25DYW5jZWwsXHJcbiAgICAgIG9uU2VsZWN0LFxyXG4gICAgICBvbkhlbHAsXHJcbiAgICAgIHNlbGVjdERpc2FibGVkLFxyXG4gICAgICBidG5TZWxlY3RMYWJlbCxcclxuICAgICAgYnRuQ2FuY2VsTGFiZWwsXHJcbiAgICAgIGhlbHBEaXNhYmxlZCxcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kaWFsb2ctdG9wLWJhclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLWxlZnRcIj5cclxuICAgICAgICAgIDxNb2RhbC5UaXRsZT57IHRpdGxlIH08L01vZGFsLlRpdGxlPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLXJpZ2h0XCI+XHJcbiAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e29uU2VsZWN0fSBkaXNhYmxlZD17c2VsZWN0RGlzYWJsZWR9PlxyXG4gICAgICAgICAgICB7YnRuU2VsZWN0TGFiZWx9XHJcbiAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgIDxCdXR0b24gb25DbGljaz17b25DYW5jZWx9PntidG5DYW5jZWxMYWJlbH08L0J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT17YG9jLWhlbHAtYnV0dG9uJHtoZWxwRGlzYWJsZWQgPyAnLWRpc2FibGVkJyA6ICcnfWB9IG9uQ2xpY2s9e29uSGVscH0+XHJcbiAgICAgICAgICAgIDxGYVF1ZXN0aW9uIC8+XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuVmlld1RvcEJhci5wcm9wVHlwZXMgPSB7XHJcbiAgb25DYW5jZWw6IFByb3BUeXBlcy5mdW5jLFxyXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcclxuICBvbkhlbHA6IFByb3BUeXBlcy5mdW5jLFxyXG4gIGhlbHBEaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICBzZWxlY3REaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICB0aXRsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKS5pc1JlcXVpcmVkLFxyXG4gIGJ0blNlbGVjdExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG4gIGJ0bkNhbmNlbExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG59O1xyXG5cclxuVmlld1RvcEJhci5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgb25DYW5jZWw6ICgpID0+IHt9LFxyXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcclxuICBvbkhlbHA6ICgpID0+IHt9LFxyXG4gIGJ0blNlbGVjdExhYmVsOiAnU2VsZWN0JyxcclxuICBidG5DYW5jZWxMYWJlbDogJ0NhbmNlbCcsXHJcbn07XHJcbiJdfQ==