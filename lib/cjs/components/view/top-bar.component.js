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
    var _temp, _this, _ret;

    _classCallCheck(this, ViewTopBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.handleSelectClick = function () {
      var flags = {
        interactive: true
      };
      _this.props.onSelect(flags);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ViewTopBar.prototype.render = function render() {
    var _props = this.props,
        title = _props.title,
        onCancel = _props.onCancel,
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
          {
            onClick: this.handleSelectClick,
            disabled: selectDisabled,
            className: 'btn-primary'
          },
          btnSelectLabel
        ),
        _react2.default.createElement(
          _reactBootstrap.Button,
          { onClick: onCancel },
          btnCancelLabel
        ),
        _react2.default.createElement(
          'button',
          {
            type: 'button',
            className: 'oc-help-button' + (helpDisabled ? '-disabled' : ''),
            onClick: onHelp
          },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdG9wLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlZpZXdUb3BCYXIiLCJoYW5kbGVTZWxlY3RDbGljayIsImZsYWdzIiwiaW50ZXJhY3RpdmUiLCJwcm9wcyIsIm9uU2VsZWN0IiwicmVuZGVyIiwidGl0bGUiLCJvbkNhbmNlbCIsIm9uSGVscCIsInNlbGVjdERpc2FibGVkIiwiYnRuU2VsZWN0TGFiZWwiLCJidG5DYW5jZWxMYWJlbCIsImhlbHBEaXNhYmxlZCIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztJQUVxQkEsVTs7Ozs7Ozs7Ozs7O2dLQUNuQkMsaUIsR0FBb0IsWUFBTTtBQUN4QixVQUFNQyxRQUFRO0FBQ1pDLHFCQUFhO0FBREQsT0FBZDtBQUdBLFlBQUtDLEtBQUwsQ0FBV0MsUUFBWCxDQUFvQkgsS0FBcEI7QUFDRCxLOzs7dUJBRURJLE0scUJBQVM7QUFBQSxpQkFTSCxLQUFLRixLQVRGO0FBQUEsUUFFTEcsS0FGSyxVQUVMQSxLQUZLO0FBQUEsUUFHTEMsUUFISyxVQUdMQSxRQUhLO0FBQUEsUUFJTEMsTUFKSyxVQUlMQSxNQUpLO0FBQUEsUUFLTEMsY0FMSyxVQUtMQSxjQUxLO0FBQUEsUUFNTEMsY0FOSyxVQU1MQSxjQU5LO0FBQUEsUUFPTEMsY0FQSyxVQU9MQSxjQVBLO0FBQUEsUUFRTEMsWUFSSyxVQVFMQSxZQVJLOztBQVVQLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSxtQkFBZjtBQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsYUFBZjtBQUNFO0FBQUMsK0JBQUQsQ0FBTyxLQUFQO0FBQUE7QUFBZU47QUFBZjtBQURGLE9BREY7QUFJRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGNBQWY7QUFDRTtBQUFDLGdDQUFEO0FBQUE7QUFDRSxxQkFBUyxLQUFLTixpQkFEaEI7QUFFRSxzQkFBVVMsY0FGWjtBQUdFLHVCQUFVO0FBSFo7QUFLR0M7QUFMSCxTQURGO0FBUUU7QUFBQyxnQ0FBRDtBQUFBLFlBQVEsU0FBU0gsUUFBakI7QUFBNEJJO0FBQTVCLFNBUkY7QUFTRTtBQUFBO0FBQUE7QUFDRSxrQkFBSyxRQURQO0FBRUUsMkNBQTRCQyxlQUFlLFdBQWYsR0FBNkIsRUFBekQsQ0FGRjtBQUdFLHFCQUFTSjtBQUhYO0FBS0Usd0NBQUMsd0JBQUQ7QUFMRjtBQVRGO0FBSkYsS0FERjtBQXdCRCxHOzs7RUExQ3FDSyxnQkFBTUMsYTs7a0JBQXpCZixVOzs7QUF3RHJCQSxXQUFXZ0IsWUFBWCxHQUEwQjtBQUN4QlIsWUFBVSxvQkFBTSxDQUFFLENBRE07QUFFeEJILFlBQVUsb0JBQU0sQ0FBRSxDQUZNO0FBR3hCSSxVQUFRLGtCQUFNLENBQUUsQ0FIUTtBQUl4QkUsa0JBQWdCLFFBSlE7QUFLeEJDLGtCQUFnQjtBQUxRLENBQTFCIiwiZmlsZSI6InRvcC1iYXIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBNb2RhbCwgQnV0dG9uIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCBGYVF1ZXN0aW9uIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9xdWVzdGlvbi1jaXJjbGUnO1xuXG5pbXBvcnQgJy4vdG9wLWJhci5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld1RvcEJhciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBoYW5kbGVTZWxlY3RDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCBmbGFncyA9IHtcbiAgICAgIGludGVyYWN0aXZlOiB0cnVlLFxuICAgIH07XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChmbGFncyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdGl0bGUsXG4gICAgICBvbkNhbmNlbCxcbiAgICAgIG9uSGVscCxcbiAgICAgIHNlbGVjdERpc2FibGVkLFxuICAgICAgYnRuU2VsZWN0TGFiZWwsXG4gICAgICBidG5DYW5jZWxMYWJlbCxcbiAgICAgIGhlbHBEaXNhYmxlZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kaWFsb2ctdG9wLWJhclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGlvbi1sZWZ0XCI+XG4gICAgICAgICAgPE1vZGFsLlRpdGxlPnsgdGl0bGUgfTwvTW9kYWwuVGl0bGU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGlvbi1yaWdodFwiPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlU2VsZWN0Q2xpY2t9XG4gICAgICAgICAgICBkaXNhYmxlZD17c2VsZWN0RGlzYWJsZWR9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJidG4tcHJpbWFyeVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge2J0blNlbGVjdExhYmVsfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b24gb25DbGljaz17b25DYW5jZWx9PntidG5DYW5jZWxMYWJlbH08L0J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YG9jLWhlbHAtYnV0dG9uJHtoZWxwRGlzYWJsZWQgPyAnLWRpc2FibGVkJyA6ICcnfWB9XG4gICAgICAgICAgICBvbkNsaWNrPXtvbkhlbHB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEZhUXVlc3Rpb24gLz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblZpZXdUb3BCYXIucHJvcFR5cGVzID0ge1xuICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgb25IZWxwOiBQcm9wVHlwZXMuZnVuYyxcbiAgaGVscERpc2FibGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBzZWxlY3REaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgdGl0bGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSkuaXNSZXF1aXJlZCxcbiAgYnRuU2VsZWN0TGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIGJ0bkNhbmNlbExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxufTtcblxuVmlld1RvcEJhci5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uQ2FuY2VsOiAoKSA9PiB7fSxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBvbkhlbHA6ICgpID0+IHt9LFxuICBidG5TZWxlY3RMYWJlbDogJ1NlbGVjdCcsXG4gIGJ0bkNhbmNlbExhYmVsOiAnQ2FuY2VsJyxcbn07XG4iXX0=