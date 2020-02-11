"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactBootstrap = require("react-bootstrap");

var _fa = require("react-icons/fa");

require("./top-bar.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ViewTopBar =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(ViewTopBar, _React$PureComponent);

  function ViewTopBar() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "handleSelectClick", function () {
      var flags = {
        interactive: true
      };

      _this.props.onSelect(flags);
    });

    return _this;
  }

  var _proto = ViewTopBar.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        title = _this$props.title,
        onCancel = _this$props.onCancel,
        onHelp = _this$props.onHelp,
        selectDisabled = _this$props.selectDisabled,
        btnSelectLabel = _this$props.btnSelectLabel,
        btnCancelLabel = _this$props.btnCancelLabel,
        helpDisabled = _this$props.helpDisabled;
    return _react["default"].createElement("div", {
      className: "oc-dialog-top-bar"
    }, _react["default"].createElement("div", {
      className: "action-left"
    }, _react["default"].createElement(_reactBootstrap.Modal.Title, null, title)), _react["default"].createElement("div", {
      className: "action-right"
    }, _react["default"].createElement(_reactBootstrap.Button, {
      onClick: this.handleSelectClick,
      disabled: selectDisabled,
      className: "btn-primary"
    }, btnSelectLabel), _react["default"].createElement(_reactBootstrap.Button, {
      onClick: onCancel
    }, btnCancelLabel), _react["default"].createElement("button", {
      type: "button",
      className: "oc-help-button" + (helpDisabled ? '-disabled' : ''),
      onClick: onHelp
    }, _react["default"].createElement(_fa.FaQuestion, null))));
  };

  return ViewTopBar;
}(_react["default"].PureComponent);

exports["default"] = ViewTopBar;
ViewTopBar.defaultProps = {
  onCancel: function onCancel() {},
  onSelect: function onSelect() {},
  onHelp: function onHelp() {},
  btnSelectLabel: 'Select',
  btnCancelLabel: 'Cancel'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdG9wLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlZpZXdUb3BCYXIiLCJmbGFncyIsImludGVyYWN0aXZlIiwicHJvcHMiLCJvblNlbGVjdCIsInJlbmRlciIsInRpdGxlIiwib25DYW5jZWwiLCJvbkhlbHAiLCJzZWxlY3REaXNhYmxlZCIsImJ0blNlbGVjdExhYmVsIiwiYnRuQ2FuY2VsTGFiZWwiLCJoZWxwRGlzYWJsZWQiLCJoYW5kbGVTZWxlY3RDbGljayIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7OztJQUVxQkEsVTs7Ozs7Ozs7Ozs7Ozs7d0VBQ0MsWUFBTTtBQUN4QixVQUFNQyxLQUFLLEdBQUc7QUFDWkMsUUFBQUEsV0FBVyxFQUFFO0FBREQsT0FBZDs7QUFHQSxZQUFLQyxLQUFMLENBQVdDLFFBQVgsQ0FBb0JILEtBQXBCO0FBQ0QsSzs7Ozs7OztTQUVESSxNLEdBQUEsa0JBQVM7QUFBQSxzQkFTSCxLQUFLRixLQVRGO0FBQUEsUUFFTEcsS0FGSyxlQUVMQSxLQUZLO0FBQUEsUUFHTEMsUUFISyxlQUdMQSxRQUhLO0FBQUEsUUFJTEMsTUFKSyxlQUlMQSxNQUpLO0FBQUEsUUFLTEMsY0FMSyxlQUtMQSxjQUxLO0FBQUEsUUFNTEMsY0FOSyxlQU1MQSxjQU5LO0FBQUEsUUFPTEMsY0FQSyxlQU9MQSxjQVBLO0FBQUEsUUFRTEMsWUFSSyxlQVFMQSxZQVJLO0FBVVAsV0FDRTtBQUFLLE1BQUEsU0FBUyxFQUFDO0FBQWYsT0FDRTtBQUFLLE1BQUEsU0FBUyxFQUFDO0FBQWYsT0FDRSxnQ0FBQyxxQkFBRCxDQUFPLEtBQVAsUUFBZU4sS0FBZixDQURGLENBREYsRUFJRTtBQUFLLE1BQUEsU0FBUyxFQUFDO0FBQWYsT0FDRSxnQ0FBQyxzQkFBRDtBQUNFLE1BQUEsT0FBTyxFQUFFLEtBQUtPLGlCQURoQjtBQUVFLE1BQUEsUUFBUSxFQUFFSixjQUZaO0FBR0UsTUFBQSxTQUFTLEVBQUM7QUFIWixPQUtHQyxjQUxILENBREYsRUFRRSxnQ0FBQyxzQkFBRDtBQUFRLE1BQUEsT0FBTyxFQUFFSDtBQUFqQixPQUE0QkksY0FBNUIsQ0FSRixFQVNFO0FBQ0UsTUFBQSxJQUFJLEVBQUMsUUFEUDtBQUVFLE1BQUEsU0FBUyxzQkFBbUJDLFlBQVksR0FBRyxXQUFILEdBQWlCLEVBQWhELENBRlg7QUFHRSxNQUFBLE9BQU8sRUFBRUo7QUFIWCxPQUtFLGdDQUFDLGNBQUQsT0FMRixDQVRGLENBSkYsQ0FERjtBQXdCRCxHOzs7RUExQ3FDTSxrQkFBTUMsYTs7O0FBd0Q5Q2YsVUFBVSxDQUFDZ0IsWUFBWCxHQUEwQjtBQUN4QlQsRUFBQUEsUUFBUSxFQUFFLG9CQUFNLENBQUUsQ0FETTtBQUV4QkgsRUFBQUEsUUFBUSxFQUFFLG9CQUFNLENBQUUsQ0FGTTtBQUd4QkksRUFBQUEsTUFBTSxFQUFFLGtCQUFNLENBQUUsQ0FIUTtBQUl4QkUsRUFBQUEsY0FBYyxFQUFFLFFBSlE7QUFLeEJDLEVBQUFBLGNBQWMsRUFBRTtBQUxRLENBQTFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBNb2RhbCwgQnV0dG9uIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCB7IEZhUXVlc3Rpb24gfSBmcm9tICdyZWFjdC1pY29ucy9mYSc7XG5cbmltcG9ydCAnLi90b3AtYmFyLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3VG9wQmFyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGhhbmRsZVNlbGVjdENsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IGZsYWdzID0ge1xuICAgICAgaW50ZXJhY3RpdmU6IHRydWUsXG4gICAgfTtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGZsYWdzKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB0aXRsZSxcbiAgICAgIG9uQ2FuY2VsLFxuICAgICAgb25IZWxwLFxuICAgICAgc2VsZWN0RGlzYWJsZWQsXG4gICAgICBidG5TZWxlY3RMYWJlbCxcbiAgICAgIGJ0bkNhbmNlbExhYmVsLFxuICAgICAgaGVscERpc2FibGVkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRpYWxvZy10b3AtYmFyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLWxlZnRcIj5cbiAgICAgICAgICA8TW9kYWwuVGl0bGU+eyB0aXRsZSB9PC9Nb2RhbC5UaXRsZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLXJpZ2h0XCI+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVTZWxlY3RDbGlja31cbiAgICAgICAgICAgIGRpc2FibGVkPXtzZWxlY3REaXNhYmxlZH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0bi1wcmltYXJ5XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7YnRuU2VsZWN0TGFiZWx9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtvbkNhbmNlbH0+e2J0bkNhbmNlbExhYmVsfTwvQnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgb2MtaGVscC1idXR0b24ke2hlbHBEaXNhYmxlZCA/ICctZGlzYWJsZWQnIDogJyd9YH1cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uSGVscH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8RmFRdWVzdGlvbiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuVmlld1RvcEJhci5wcm9wVHlwZXMgPSB7XG4gIG9uQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBvbkhlbHA6IFByb3BUeXBlcy5mdW5jLFxuICBoZWxwRGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIHNlbGVjdERpc2FibGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICB0aXRsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKS5pc1JlcXVpcmVkLFxuICBidG5TZWxlY3RMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgYnRuQ2FuY2VsTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG59O1xuXG5WaWV3VG9wQmFyLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25DYW5jZWw6ICgpID0+IHt9LFxuICBvblNlbGVjdDogKCkgPT4ge30sXG4gIG9uSGVscDogKCkgPT4ge30sXG4gIGJ0blNlbGVjdExhYmVsOiAnU2VsZWN0JyxcbiAgYnRuQ2FuY2VsTGFiZWw6ICdDYW5jZWwnLFxufTtcbiJdfQ==