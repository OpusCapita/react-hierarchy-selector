"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var HSPopoverCommonLayout =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(HSPopoverCommonLayout, _React$PureComponent);

  function HSPopoverCommonLayout() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = HSPopoverCommonLayout.prototype;

  _proto.render = function render() {
    return _react["default"].createElement("div", {
      className: "oc-hierarchy-selector-popover-layout"
    }, this.props.children);
  };

  return HSPopoverCommonLayout;
}(_react["default"].PureComponent);

exports["default"] = HSPopoverCommonLayout;
HSPopoverCommonLayout.defaultProps = {
  children: null
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvbGF5b3V0cy9jb21tb24ubGF5b3V0LmpzeCJdLCJuYW1lcyI6WyJIU1BvcG92ZXJDb21tb25MYXlvdXQiLCJyZW5kZXIiLCJwcm9wcyIsImNoaWxkcmVuIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOzs7Ozs7SUFFcUJBLHFCOzs7Ozs7Ozs7OztTQUNuQkMsTSxHQUFBLGtCQUFTO0FBQ1AsV0FDRTtBQUFLLE1BQUEsU0FBUyxFQUFDO0FBQWYsT0FDSSxLQUFLQyxLQUFMLENBQVdDLFFBRGYsQ0FERjtBQUtELEc7OztFQVBnREMsa0JBQU1DLGE7OztBQWN6REwscUJBQXFCLENBQUNNLFlBQXRCLEdBQXFDO0FBQ25DSCxFQUFBQSxRQUFRLEVBQUU7QUFEeUIsQ0FBckMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFNQb3BvdmVyQ29tbW9uTGF5b3V0IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItcG9wb3Zlci1sYXlvdXRcIj5cbiAgICAgICAgeyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuSFNQb3BvdmVyQ29tbW9uTGF5b3V0LnByb3BUeXBlcyA9IHtcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxufTtcblxuSFNQb3BvdmVyQ29tbW9uTGF5b3V0LmRlZmF1bHRQcm9wcyA9IHtcbiAgY2hpbGRyZW46IG51bGwsXG59O1xuIl19