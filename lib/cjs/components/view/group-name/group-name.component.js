"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactBootstrap = require("react-bootstrap");

require("./group-name.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GroupName =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(GroupName, _React$PureComponent);

  function GroupName(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "changeHandler", function (e) {
      _this.setState({
        changedByUser: true,
        value: e.target.value
      });

      _this.props.onChange(e.target.value);
    });

    _this.state = {
      changedByUser: props.initialValue.trim() !== '',
      value: props.initialValue
    };
    return _this;
  }

  var _proto = GroupName.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (!this.state.changedByUser) {
      var newValue = nextProps.initialValue;
      this.setState({
        value: newValue
      });
    }
  };

  _proto.render = function render() {
    return _react["default"].createElement("div", {
      className: "oc-hierarchy-selector-group-name-wrapper"
    }, _react["default"].createElement("p", null, this.props.label), _react["default"].createElement(_reactBootstrap.FormControl, {
      type: "text",
      placeholder: this.props.placeHolder,
      onChange: this.changeHandler,
      value: this.state.value
    }));
  };

  return GroupName;
}(_react["default"].PureComponent);

exports["default"] = GroupName;
GroupName.defaultProps = {
  label: 'Group name',
  placeHolder: 'Please, fill a group name',
  initialValue: '',
  onChange: function onChange() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvZ3JvdXAtbmFtZS9ncm91cC1uYW1lLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiR3JvdXBOYW1lIiwicHJvcHMiLCJlIiwic2V0U3RhdGUiLCJjaGFuZ2VkQnlVc2VyIiwidmFsdWUiLCJ0YXJnZXQiLCJvbkNoYW5nZSIsInN0YXRlIiwiaW5pdGlhbFZhbHVlIiwidHJpbSIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJuZXdWYWx1ZSIsInJlbmRlciIsImxhYmVsIiwicGxhY2VIb2xkZXIiLCJjaGFuZ2VIYW5kbGVyIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7Ozs7O0lBRXFCQSxTOzs7OztBQUNuQixxQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUNqQiw0Q0FBTUEsS0FBTjs7QUFEaUIsb0VBaUJILFVBQUNDLENBQUQsRUFBTztBQUNyQixZQUFLQyxRQUFMLENBQWM7QUFDWkMsUUFBQUEsYUFBYSxFQUFFLElBREg7QUFFWkMsUUFBQUEsS0FBSyxFQUFFSCxDQUFDLENBQUNJLE1BQUYsQ0FBU0Q7QUFGSixPQUFkOztBQUlBLFlBQUtKLEtBQUwsQ0FBV00sUUFBWCxDQUFvQkwsQ0FBQyxDQUFDSSxNQUFGLENBQVNELEtBQTdCO0FBQ0QsS0F2QmtCOztBQUVqQixVQUFLRyxLQUFMLEdBQWE7QUFDWEosTUFBQUEsYUFBYSxFQUFFSCxLQUFLLENBQUNRLFlBQU4sQ0FBbUJDLElBQW5CLE9BQThCLEVBRGxDO0FBRVhMLE1BQUFBLEtBQUssRUFBRUosS0FBSyxDQUFDUTtBQUZGLEtBQWI7QUFGaUI7QUFNbEI7Ozs7U0FFREUseUIsR0FBQSxtQ0FBMEJDLFNBQTFCLEVBQXFDO0FBQ25DLFFBQUksQ0FBQyxLQUFLSixLQUFMLENBQVdKLGFBQWhCLEVBQStCO0FBQzdCLFVBQU1TLFFBQVEsR0FBR0QsU0FBUyxDQUFDSCxZQUEzQjtBQUNBLFdBQUtOLFFBQUwsQ0FBYztBQUNaRSxRQUFBQSxLQUFLLEVBQUVRO0FBREssT0FBZDtBQUdEO0FBQ0YsRzs7U0FVREMsTSxHQUFBLGtCQUFTO0FBQ1AsV0FDRTtBQUFLLE1BQUEsU0FBUyxFQUFDO0FBQWYsT0FDRSwyQ0FBSSxLQUFLYixLQUFMLENBQVdjLEtBQWYsQ0FERixFQUVFLGdDQUFDLDJCQUFEO0FBQ0UsTUFBQSxJQUFJLEVBQUMsTUFEUDtBQUVFLE1BQUEsV0FBVyxFQUFFLEtBQUtkLEtBQUwsQ0FBV2UsV0FGMUI7QUFHRSxNQUFBLFFBQVEsRUFBRSxLQUFLQyxhQUhqQjtBQUlFLE1BQUEsS0FBSyxFQUFFLEtBQUtULEtBQUwsQ0FBV0g7QUFKcEIsTUFGRixDQURGO0FBV0QsRzs7O0VBdENvQ2Esa0JBQU1DLGE7OztBQWdEN0NuQixTQUFTLENBQUNvQixZQUFWLEdBQXlCO0FBQ3ZCTCxFQUFBQSxLQUFLLEVBQUUsWUFEZ0I7QUFFdkJDLEVBQUFBLFdBQVcsRUFBRSwyQkFGVTtBQUd2QlAsRUFBQUEsWUFBWSxFQUFFLEVBSFM7QUFJdkJGLEVBQUFBLFFBQVEsRUFBRSxvQkFBTSxDQUFFO0FBSkssQ0FBekIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcblxuaW1wb3J0ICcuL2dyb3VwLW5hbWUuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyb3VwTmFtZSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY2hhbmdlZEJ5VXNlcjogcHJvcHMuaW5pdGlhbFZhbHVlLnRyaW0oKSAhPT0gJycsXG4gICAgICB2YWx1ZTogcHJvcHMuaW5pdGlhbFZhbHVlLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGlmICghdGhpcy5zdGF0ZS5jaGFuZ2VkQnlVc2VyKSB7XG4gICAgICBjb25zdCBuZXdWYWx1ZSA9IG5leHRQcm9wcy5pbml0aWFsVmFsdWU7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdmFsdWU6IG5ld1ZhbHVlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY2hhbmdlSGFuZGxlciA9IChlKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjaGFuZ2VkQnlVc2VyOiB0cnVlLFxuICAgICAgdmFsdWU6IGUudGFyZ2V0LnZhbHVlLFxuICAgIH0pO1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoZS50YXJnZXQudmFsdWUpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1ncm91cC1uYW1lLXdyYXBwZXJcIj5cbiAgICAgICAgPHA+e3RoaXMucHJvcHMubGFiZWx9PC9wPlxuICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3RoaXMucHJvcHMucGxhY2VIb2xkZXJ9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMuY2hhbmdlSGFuZGxlcn1cbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuR3JvdXBOYW1lLnByb3BUeXBlcyA9IHtcbiAgbGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIHBsYWNlSG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBpbml0aWFsVmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cbkdyb3VwTmFtZS5kZWZhdWx0UHJvcHMgPSB7XG4gIGxhYmVsOiAnR3JvdXAgbmFtZScsXG4gIHBsYWNlSG9sZGVyOiAnUGxlYXNlLCBmaWxsIGEgZ3JvdXAgbmFtZScsXG4gIGluaXRpYWxWYWx1ZTogJycsXG4gIG9uQ2hhbmdlOiAoKSA9PiB7fSxcbn07XG4iXX0=