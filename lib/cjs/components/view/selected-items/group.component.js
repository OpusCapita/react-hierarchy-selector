"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _fa = require("react-icons/fa");

var _badge = _interopRequireDefault(require("../../badge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GroupItem =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(GroupItem, _React$PureComponent);

  function GroupItem(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "getIcon", function () {
      return _this.state.collapsed ? _react["default"].createElement(_fa.FaCaretRight, null) : _react["default"].createElement(_fa.FaCaretDown, null);
    });

    _defineProperty(_assertThisInitialized(_this), "clickHanlder", function (e) {
      e.preventDefault();

      _this.toggleCollapse();
    });

    _defineProperty(_assertThisInitialized(_this), "removeClickHandler", function (e) {
      e.stopPropagation();

      _this.props.onRemoveClick(_this.props.sourceId, _this.props.referenceIds.slice());
    });

    _defineProperty(_assertThisInitialized(_this), "toggleCollapse", function () {
      _this.setState({
        collapsed: !_this.state.collapsed
      });
    });

    _this.state = {
      collapsed: false
    };
    return _this;
  }

  var _proto = GroupItem.prototype;

  _proto.getRemoveIcon = function getRemoveIcon() {
    return this.props.removable ? _react["default"].createElement("span", {
      className: "component-icon clickable",
      onClick: this.removeClickHandler
    }, _react["default"].createElement(_fa.FaTrashAlt, null)) : null;
  };

  _proto.render = function render() {
    var content = !this.state.collapsed ? this.props.children : null;
    var _this$props = this.props,
        count = _this$props.count,
        title = _this$props.title,
        selectedAll = _this$props.selectedAll;
    var selecteAllContent = selectedAll ? _react["default"].createElement("span", null, this.props.allLabel) : null;
    return _react["default"].createElement("li", {
      className: "group-list-item",
      onClick: this.clickHanlder
    }, _react["default"].createElement("div", {
      className: "title-block"
    }, _react["default"].createElement("div", {
      className: "left-block"
    }, this.getIcon(), _react["default"].createElement("span", null, title)), _react["default"].createElement("div", {
      className: "right-block"
    }, selecteAllContent, _react["default"].createElement(_badge["default"], {
      className: "badge-orange"
    }, count), this.getRemoveIcon())), content);
  };

  return GroupItem;
}(_react["default"].PureComponent);

exports["default"] = GroupItem;
GroupItem.defaultProps = {
  allLabel: 'All',
  children: null,
  referenceIds: [],
  onRemoveClick: function onRemoveClick() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvc2VsZWN0ZWQtaXRlbXMvZ3JvdXAuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJHcm91cEl0ZW0iLCJwcm9wcyIsInN0YXRlIiwiY29sbGFwc2VkIiwiZSIsInByZXZlbnREZWZhdWx0IiwidG9nZ2xlQ29sbGFwc2UiLCJzdG9wUHJvcGFnYXRpb24iLCJvblJlbW92ZUNsaWNrIiwic291cmNlSWQiLCJyZWZlcmVuY2VJZHMiLCJzbGljZSIsInNldFN0YXRlIiwiZ2V0UmVtb3ZlSWNvbiIsInJlbW92YWJsZSIsInJlbW92ZUNsaWNrSGFuZGxlciIsInJlbmRlciIsImNvbnRlbnQiLCJjaGlsZHJlbiIsImNvdW50IiwidGl0bGUiLCJzZWxlY3RlZEFsbCIsInNlbGVjdGVBbGxDb250ZW50IiwiYWxsTGFiZWwiLCJjbGlja0hhbmxkZXIiLCJnZXRJY29uIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUlBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7Ozs7O0lBRXFCQSxTOzs7OztBQUNuQixxQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUNqQiw0Q0FBTUEsS0FBTjs7QUFEaUIsOERBT1Q7QUFBQSxhQUFPLE1BQUtDLEtBQUwsQ0FBV0MsU0FBWCxHQUF1QixnQ0FBQyxnQkFBRCxPQUF2QixHQUEwQyxnQ0FBQyxlQUFELE9BQWpEO0FBQUEsS0FQUzs7QUFBQSxtRUFpQkosVUFBQ0MsQ0FBRCxFQUFPO0FBQ3BCQSxNQUFBQSxDQUFDLENBQUNDLGNBQUY7O0FBQ0EsWUFBS0MsY0FBTDtBQUNELEtBcEJrQjs7QUFBQSx5RUFzQkUsVUFBQ0YsQ0FBRCxFQUFPO0FBQzFCQSxNQUFBQSxDQUFDLENBQUNHLGVBQUY7O0FBQ0EsWUFBS04sS0FBTCxDQUFXTyxhQUFYLENBQXlCLE1BQUtQLEtBQUwsQ0FBV1EsUUFBcEMsRUFBOEMsTUFBS1IsS0FBTCxDQUFXUyxZQUFYLENBQXdCQyxLQUF4QixFQUE5QztBQUNELEtBekJrQjs7QUFBQSxxRUEyQkYsWUFBTTtBQUNyQixZQUFLQyxRQUFMLENBQWM7QUFDWlQsUUFBQUEsU0FBUyxFQUFFLENBQUMsTUFBS0QsS0FBTCxDQUFXQztBQURYLE9BQWQ7QUFHRCxLQS9Ca0I7O0FBRWpCLFVBQUtELEtBQUwsR0FBYTtBQUNYQyxNQUFBQSxTQUFTLEVBQUU7QUFEQSxLQUFiO0FBRmlCO0FBS2xCOzs7O1NBSURVLGEsR0FBQSx5QkFBZ0I7QUFDZCxXQUFPLEtBQUtaLEtBQUwsQ0FBV2EsU0FBWCxHQUNMO0FBQU0sTUFBQSxTQUFTLEVBQUMsMEJBQWhCO0FBQTJDLE1BQUEsT0FBTyxFQUFFLEtBQUtDO0FBQXpELE9BQ0UsZ0NBQUMsY0FBRCxPQURGLENBREssR0FJSCxJQUpKO0FBS0QsRzs7U0FrQkRDLE0sR0FBQSxrQkFBUztBQUNQLFFBQU1DLE9BQU8sR0FBRyxDQUFDLEtBQUtmLEtBQUwsQ0FBV0MsU0FBWixHQUF3QixLQUFLRixLQUFMLENBQVdpQixRQUFuQyxHQUE4QyxJQUE5RDtBQURPLHNCQUUrQixLQUFLakIsS0FGcEM7QUFBQSxRQUVDa0IsS0FGRCxlQUVDQSxLQUZEO0FBQUEsUUFFUUMsS0FGUixlQUVRQSxLQUZSO0FBQUEsUUFFZUMsV0FGZixlQUVlQSxXQUZmO0FBSVAsUUFBTUMsaUJBQWlCLEdBQUdELFdBQVcsR0FDbkMsOENBQU8sS0FBS3BCLEtBQUwsQ0FBV3NCLFFBQWxCLENBRG1DLEdBQ0UsSUFEdkM7QUFHQSxXQUNFO0FBQUksTUFBQSxTQUFTLEVBQUMsaUJBQWQ7QUFBZ0MsTUFBQSxPQUFPLEVBQUUsS0FBS0M7QUFBOUMsT0FDRTtBQUFLLE1BQUEsU0FBUyxFQUFDO0FBQWYsT0FDRTtBQUFLLE1BQUEsU0FBUyxFQUFDO0FBQWYsT0FDRyxLQUFLQyxPQUFMLEVBREgsRUFFRSw4Q0FBT0wsS0FBUCxDQUZGLENBREYsRUFLRTtBQUFLLE1BQUEsU0FBUyxFQUFDO0FBQWYsT0FDR0UsaUJBREgsRUFFRSxnQ0FBQyxpQkFBRDtBQUFTLE1BQUEsU0FBUyxFQUFDO0FBQW5CLE9BQW1DSCxLQUFuQyxDQUZGLEVBR0csS0FBS04sYUFBTCxFQUhILENBTEYsQ0FERixFQVlHSSxPQVpILENBREY7QUFnQkQsRzs7O0VBekRvQ1Msa0JBQU1DLGE7OztBQXdFN0MzQixTQUFTLENBQUM0QixZQUFWLEdBQXlCO0FBQ3ZCTCxFQUFBQSxRQUFRLEVBQUUsS0FEYTtBQUV2QkwsRUFBQUEsUUFBUSxFQUFFLElBRmE7QUFHdkJSLEVBQUFBLFlBQVksRUFBRSxFQUhTO0FBSXZCRixFQUFBQSxhQUFhLEVBQUUseUJBQU0sQ0FBRTtBQUpBLENBQXpCIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1ub25pbnRlcmFjdGl2ZS1lbGVtZW50LWludGVyYWN0aW9ucyAqL1xuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvY2xpY2stZXZlbnRzLWhhdmUta2V5LWV2ZW50cyAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IEZhVHJhc2hBbHQsIEZhQ2FyZXRSaWdodCwgRmFDYXJldERvd24gfSBmcm9tICdyZWFjdC1pY29ucy9mYSc7XG5cbmltcG9ydCBIU0JhZGdlIGZyb20gJy4uLy4uL2JhZGdlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JvdXBJdGVtIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBnZXRJY29uID0gKCkgPT4gKHRoaXMuc3RhdGUuY29sbGFwc2VkID8gPEZhQ2FyZXRSaWdodCAvPiA6IDxGYUNhcmV0RG93biAvPik7XG5cbiAgZ2V0UmVtb3ZlSWNvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5yZW1vdmFibGUgP1xuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY29tcG9uZW50LWljb24gY2xpY2thYmxlXCIgb25DbGljaz17dGhpcy5yZW1vdmVDbGlja0hhbmRsZXJ9PlxuICAgICAgICA8RmFUcmFzaEFsdCAvPlxuICAgICAgPC9zcGFuPlxuICAgICAgOiBudWxsO1xuICB9XG5cbiAgY2xpY2tIYW5sZGVyID0gKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy50b2dnbGVDb2xsYXBzZSgpO1xuICB9XG5cbiAgcmVtb3ZlQ2xpY2tIYW5kbGVyID0gKGUpID0+IHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMucHJvcHMub25SZW1vdmVDbGljayh0aGlzLnByb3BzLnNvdXJjZUlkLCB0aGlzLnByb3BzLnJlZmVyZW5jZUlkcy5zbGljZSgpKTtcbiAgfVxuXG4gIHRvZ2dsZUNvbGxhcHNlID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY29sbGFwc2VkOiAhdGhpcy5zdGF0ZS5jb2xsYXBzZWQsXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgY29udGVudCA9ICF0aGlzLnN0YXRlLmNvbGxhcHNlZCA/IHRoaXMucHJvcHMuY2hpbGRyZW4gOiBudWxsO1xuICAgIGNvbnN0IHsgY291bnQsIHRpdGxlLCBzZWxlY3RlZEFsbCB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHNlbGVjdGVBbGxDb250ZW50ID0gc2VsZWN0ZWRBbGwgP1xuICAgICAgPHNwYW4+e3RoaXMucHJvcHMuYWxsTGFiZWx9PC9zcGFuPiA6IG51bGw7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGxpIGNsYXNzTmFtZT1cImdyb3VwLWxpc3QtaXRlbVwiIG9uQ2xpY2s9e3RoaXMuY2xpY2tIYW5sZGVyfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZS1ibG9ja1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGVmdC1ibG9ja1wiPlxuICAgICAgICAgICAge3RoaXMuZ2V0SWNvbigpfVxuICAgICAgICAgICAgPHNwYW4+e3RpdGxlfTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJpZ2h0LWJsb2NrXCI+XG4gICAgICAgICAgICB7c2VsZWN0ZUFsbENvbnRlbnR9XG4gICAgICAgICAgICA8SFNCYWRnZSBjbGFzc05hbWU9XCJiYWRnZS1vcmFuZ2VcIj57Y291bnR9PC9IU0JhZGdlPlxuICAgICAgICAgICAge3RoaXMuZ2V0UmVtb3ZlSWNvbigpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge2NvbnRlbnR9XG4gICAgICA8L2xpPlxuICAgICk7XG4gIH1cbn1cblxuR3JvdXBJdGVtLnByb3BUeXBlcyA9IHtcbiAgYWxsTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIGNvdW50OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgcmVmZXJlbmNlSWRzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSkpLFxuICByZW1vdmFibGU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIHNvdXJjZUlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHNlbGVjdGVkQWxsOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBvblJlbW92ZUNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cbkdyb3VwSXRlbS5kZWZhdWx0UHJvcHMgPSB7XG4gIGFsbExhYmVsOiAnQWxsJyxcbiAgY2hpbGRyZW46IG51bGwsXG4gIHJlZmVyZW5jZUlkczogW10sXG4gIG9uUmVtb3ZlQ2xpY2s6ICgpID0+IHt9LFxufTtcbiJdfQ==