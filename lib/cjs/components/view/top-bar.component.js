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
    return _react2.default.createElement(
      'div',
      { className: 'oc-dialog-top-bar' },
      _react2.default.createElement(
        'div',
        { className: 'action-left' },
        _react2.default.createElement(
          _reactBootstrap.Modal.Title,
          null,
          this.props.title
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'action-right' },
        _react2.default.createElement(
          _reactBootstrap.Button,
          { onClick: this.props.onSelect, disabled: this.props.selectDisabled },
          this.props.btnSelectLabel
        ),
        _react2.default.createElement(
          _reactBootstrap.Button,
          { onClick: this.props.onCancel },
          this.props.btnCancelLabel
        ),
        _react2.default.createElement(
          'button',
          { type: 'button', className: 'oc-help-button', onClick: this.props.onHelp },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdG9wLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlZpZXdUb3BCYXIiLCJyZW5kZXIiLCJwcm9wcyIsInRpdGxlIiwib25TZWxlY3QiLCJzZWxlY3REaXNhYmxlZCIsImJ0blNlbGVjdExhYmVsIiwib25DYW5jZWwiLCJidG5DYW5jZWxMYWJlbCIsIm9uSGVscCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7SUFFcUJBLFU7Ozs7Ozs7Ozt1QkFDbkJDLE0scUJBQVM7QUFDUCxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsbUJBQWY7QUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGFBQWY7QUFDRTtBQUFBLGdDQUFPLEtBQVA7QUFBQTtBQUFlLGVBQUtDLEtBQUwsQ0FBV0M7QUFBMUI7QUFERixPQURGO0FBSUU7QUFBQTtBQUFBLFVBQUssV0FBVSxjQUFmO0FBQ0U7QUFBQTtBQUFBLFlBQVEsU0FBUyxLQUFLRCxLQUFMLENBQVdFLFFBQTVCLEVBQXNDLFVBQVUsS0FBS0YsS0FBTCxDQUFXRyxjQUEzRDtBQUNHLGVBQUtILEtBQUwsQ0FBV0k7QUFEZCxTQURGO0FBSUU7QUFBQTtBQUFBLFlBQVEsU0FBUyxLQUFLSixLQUFMLENBQVdLLFFBQTVCO0FBQXVDLGVBQUtMLEtBQUwsQ0FBV007QUFBbEQsU0FKRjtBQUtFO0FBQUE7QUFBQSxZQUFRLE1BQUssUUFBYixFQUFzQixXQUFVLGdCQUFoQyxFQUFpRCxTQUFTLEtBQUtOLEtBQUwsQ0FBV08sTUFBckU7QUFDRTtBQURGO0FBTEY7QUFKRixLQURGO0FBZ0JELEc7OztFQWxCcUMsZ0JBQU1DLGE7O2tCQUF6QlYsVTs7O0FBK0JyQkEsV0FBV1csWUFBWCxHQUEwQjtBQUN4QkosWUFBVSxvQkFBTSxDQUFFLENBRE07QUFFeEJILFlBQVUsb0JBQU0sQ0FBRSxDQUZNO0FBR3hCSyxVQUFRLGtCQUFNLENBQUUsQ0FIUTtBQUl4Qkgsa0JBQWdCLFFBSlE7QUFLeEJFLGtCQUFnQjtBQUxRLENBQTFCIiwiZmlsZSI6InRvcC1iYXIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBNb2RhbCwgQnV0dG9uIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCBGYVF1ZXN0aW9uIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9xdWVzdGlvbi1jaXJjbGUnO1xuXG5pbXBvcnQgJy4vdG9wLWJhci5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld1RvcEJhciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGlhbG9nLXRvcC1iYXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tbGVmdFwiPlxuICAgICAgICAgIDxNb2RhbC5UaXRsZT57IHRoaXMucHJvcHMudGl0bGUgfTwvTW9kYWwuVGl0bGU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGlvbi1yaWdodFwiPlxuICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5wcm9wcy5vblNlbGVjdH0gZGlzYWJsZWQ9e3RoaXMucHJvcHMuc2VsZWN0RGlzYWJsZWR9PlxuICAgICAgICAgICAge3RoaXMucHJvcHMuYnRuU2VsZWN0TGFiZWx9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2FuY2VsfT57dGhpcy5wcm9wcy5idG5DYW5jZWxMYWJlbH08L0J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJvYy1oZWxwLWJ1dHRvblwiIG9uQ2xpY2s9e3RoaXMucHJvcHMub25IZWxwfT5cbiAgICAgICAgICAgIDxGYVF1ZXN0aW9uIC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5WaWV3VG9wQmFyLnByb3BUeXBlcyA9IHtcbiAgb25DYW5jZWw6IFByb3BUeXBlcy5mdW5jLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uSGVscDogUHJvcFR5cGVzLmZ1bmMsXG4gIHNlbGVjdERpc2FibGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICB0aXRsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKS5pc1JlcXVpcmVkLFxuICBidG5TZWxlY3RMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgYnRuQ2FuY2VsTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG59O1xuXG5WaWV3VG9wQmFyLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25DYW5jZWw6ICgpID0+IHt9LFxuICBvblNlbGVjdDogKCkgPT4ge30sXG4gIG9uSGVscDogKCkgPT4ge30sXG4gIGJ0blNlbGVjdExhYmVsOiAnU2VsZWN0JyxcbiAgYnRuQ2FuY2VsTGFiZWw6ICdDYW5jZWwnLFxufTtcbiJdfQ==