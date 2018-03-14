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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdG9wLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlZpZXdUb3BCYXIiLCJyZW5kZXIiLCJwcm9wcyIsInRpdGxlIiwib25TZWxlY3QiLCJzZWxlY3REaXNhYmxlZCIsImJ0blNlbGVjdExhYmVsIiwib25DYW5jZWwiLCJidG5DYW5jZWxMYWJlbCIsIm9uSGVscCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7SUFFcUJBLFU7Ozs7Ozs7Ozt1QkFDbkJDLE0scUJBQVM7QUFDUCxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsbUJBQWY7QUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGFBQWY7QUFDRTtBQUFBLGdDQUFPLEtBQVA7QUFBQTtBQUFlLGVBQUtDLEtBQUwsQ0FBV0M7QUFBMUI7QUFERixPQURGO0FBSUU7QUFBQTtBQUFBLFVBQUssV0FBVSxjQUFmO0FBQ0U7QUFBQTtBQUFBLFlBQVEsU0FBUyxLQUFLRCxLQUFMLENBQVdFLFFBQTVCLEVBQXNDLFVBQVUsS0FBS0YsS0FBTCxDQUFXRyxjQUEzRDtBQUNHLGVBQUtILEtBQUwsQ0FBV0k7QUFEZCxTQURGO0FBSUU7QUFBQTtBQUFBLFlBQVEsU0FBUyxLQUFLSixLQUFMLENBQVdLLFFBQTVCO0FBQXVDLGVBQUtMLEtBQUwsQ0FBV007QUFBbEQsU0FKRjtBQUtFO0FBQUE7QUFBQSxZQUFRLE1BQUssUUFBYixFQUFzQixXQUFVLGdCQUFoQyxFQUFpRCxTQUFTLEtBQUtOLEtBQUwsQ0FBV08sTUFBckU7QUFDRTtBQURGO0FBTEY7QUFKRixLQURGO0FBZ0JELEc7OztFQWxCcUMsZ0JBQU1DLGE7O2tCQUF6QlYsVTs7O0FBK0JyQkEsV0FBV1csWUFBWCxHQUEwQjtBQUN4QkosWUFBVSxvQkFBTSxDQUFFLENBRE07QUFFeEJILFlBQVUsb0JBQU0sQ0FBRSxDQUZNO0FBR3hCSyxVQUFRLGtCQUFNLENBQUUsQ0FIUTtBQUl4Qkgsa0JBQWdCLFFBSlE7QUFLeEJFLGtCQUFnQjtBQUxRLENBQTFCIiwiZmlsZSI6InRvcC1iYXIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IHsgTW9kYWwsIEJ1dHRvbiB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCBGYVF1ZXN0aW9uIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9xdWVzdGlvbi1jaXJjbGUnO1xyXG5cclxuaW1wb3J0ICcuL3RvcC1iYXIuc2Nzcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3VG9wQmFyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kaWFsb2ctdG9wLWJhclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLWxlZnRcIj5cclxuICAgICAgICAgIDxNb2RhbC5UaXRsZT57IHRoaXMucHJvcHMudGl0bGUgfTwvTW9kYWwuVGl0bGU+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tcmlnaHRcIj5cclxuICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5wcm9wcy5vblNlbGVjdH0gZGlzYWJsZWQ9e3RoaXMucHJvcHMuc2VsZWN0RGlzYWJsZWR9PlxyXG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5idG5TZWxlY3RMYWJlbH1cclxuICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2FuY2VsfT57dGhpcy5wcm9wcy5idG5DYW5jZWxMYWJlbH08L0J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cIm9jLWhlbHAtYnV0dG9uXCIgb25DbGljaz17dGhpcy5wcm9wcy5vbkhlbHB9PlxyXG4gICAgICAgICAgICA8RmFRdWVzdGlvbiAvPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcblZpZXdUb3BCYXIucHJvcFR5cGVzID0ge1xyXG4gIG9uQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYyxcclxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgb25IZWxwOiBQcm9wVHlwZXMuZnVuYyxcclxuICBzZWxlY3REaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICB0aXRsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKS5pc1JlcXVpcmVkLFxyXG4gIGJ0blNlbGVjdExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG4gIGJ0bkNhbmNlbExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG59O1xyXG5cclxuVmlld1RvcEJhci5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgb25DYW5jZWw6ICgpID0+IHt9LFxyXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcclxuICBvbkhlbHA6ICgpID0+IHt9LFxyXG4gIGJ0blNlbGVjdExhYmVsOiAnU2VsZWN0JyxcclxuICBidG5DYW5jZWxMYWJlbDogJ0NhbmNlbCcsXHJcbn07XHJcbiJdfQ==