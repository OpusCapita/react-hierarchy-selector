function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { FaTrashAlt, FaCaretRight, FaCaretDown } from 'react-icons/fa';
import HSBadge from '../../badge';

var GroupItem =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(GroupItem, _React$PureComponent);

  function GroupItem(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "getIcon", function () {
      return _this.state.collapsed ? React.createElement(FaCaretRight, null) : React.createElement(FaCaretDown, null);
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
    return this.props.removable ? React.createElement("span", {
      className: "component-icon clickable",
      onClick: this.removeClickHandler
    }, React.createElement(FaTrashAlt, null)) : null;
  };

  _proto.render = function render() {
    var content = !this.state.collapsed ? this.props.children : null;
    var _this$props = this.props,
        count = _this$props.count,
        title = _this$props.title,
        selectedAll = _this$props.selectedAll;
    var selecteAllContent = selectedAll ? React.createElement("span", null, this.props.allLabel) : null;
    return React.createElement("li", {
      className: "group-list-item",
      onClick: this.clickHanlder
    }, React.createElement("div", {
      className: "title-block"
    }, React.createElement("div", {
      className: "left-block"
    }, this.getIcon(), React.createElement("span", null, title)), React.createElement("div", {
      className: "right-block"
    }, selecteAllContent, React.createElement(HSBadge, {
      className: "badge-orange"
    }, count), this.getRemoveIcon())), content);
  };

  return GroupItem;
}(React.PureComponent);

export { GroupItem as default };
GroupItem.defaultProps = {
  allLabel: 'All',
  children: null,
  referenceIds: [],
  onRemoveClick: function onRemoveClick() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvc2VsZWN0ZWQtaXRlbXMvZ3JvdXAuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIkZhVHJhc2hBbHQiLCJGYUNhcmV0UmlnaHQiLCJGYUNhcmV0RG93biIsIkhTQmFkZ2UiLCJHcm91cEl0ZW0iLCJwcm9wcyIsInN0YXRlIiwiY29sbGFwc2VkIiwiZSIsInByZXZlbnREZWZhdWx0IiwidG9nZ2xlQ29sbGFwc2UiLCJzdG9wUHJvcGFnYXRpb24iLCJvblJlbW92ZUNsaWNrIiwic291cmNlSWQiLCJyZWZlcmVuY2VJZHMiLCJzbGljZSIsInNldFN0YXRlIiwiZ2V0UmVtb3ZlSWNvbiIsInJlbW92YWJsZSIsInJlbW92ZUNsaWNrSGFuZGxlciIsInJlbmRlciIsImNvbnRlbnQiLCJjaGlsZHJlbiIsImNvdW50IiwidGl0bGUiLCJzZWxlY3RlZEFsbCIsInNlbGVjdGVBbGxDb250ZW50IiwiYWxsTGFiZWwiLCJjbGlja0hhbmxkZXIiLCJnZXRJY29uIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7QUFFQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLFVBQVQsRUFBcUJDLFlBQXJCLEVBQW1DQyxXQUFuQyxRQUFzRCxnQkFBdEQ7QUFFQSxPQUFPQyxPQUFQLE1BQW9CLGFBQXBCOztJQUVxQkMsUzs7Ozs7QUFDbkIscUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFDakIsNENBQU1BLEtBQU47O0FBRGlCLDhEQU9UO0FBQUEsYUFBTyxNQUFLQyxLQUFMLENBQVdDLFNBQVgsR0FBdUIsb0JBQUMsWUFBRCxPQUF2QixHQUEwQyxvQkFBQyxXQUFELE9BQWpEO0FBQUEsS0FQUzs7QUFBQSxtRUFpQkosVUFBQ0MsQ0FBRCxFQUFPO0FBQ3BCQSxNQUFBQSxDQUFDLENBQUNDLGNBQUY7O0FBQ0EsWUFBS0MsY0FBTDtBQUNELEtBcEJrQjs7QUFBQSx5RUFzQkUsVUFBQ0YsQ0FBRCxFQUFPO0FBQzFCQSxNQUFBQSxDQUFDLENBQUNHLGVBQUY7O0FBQ0EsWUFBS04sS0FBTCxDQUFXTyxhQUFYLENBQXlCLE1BQUtQLEtBQUwsQ0FBV1EsUUFBcEMsRUFBOEMsTUFBS1IsS0FBTCxDQUFXUyxZQUFYLENBQXdCQyxLQUF4QixFQUE5QztBQUNELEtBekJrQjs7QUFBQSxxRUEyQkYsWUFBTTtBQUNyQixZQUFLQyxRQUFMLENBQWM7QUFDWlQsUUFBQUEsU0FBUyxFQUFFLENBQUMsTUFBS0QsS0FBTCxDQUFXQztBQURYLE9BQWQ7QUFHRCxLQS9Ca0I7O0FBRWpCLFVBQUtELEtBQUwsR0FBYTtBQUNYQyxNQUFBQSxTQUFTLEVBQUU7QUFEQSxLQUFiO0FBRmlCO0FBS2xCOzs7O1NBSURVLGEsR0FBQSx5QkFBZ0I7QUFDZCxXQUFPLEtBQUtaLEtBQUwsQ0FBV2EsU0FBWCxHQUNMO0FBQU0sTUFBQSxTQUFTLEVBQUMsMEJBQWhCO0FBQTJDLE1BQUEsT0FBTyxFQUFFLEtBQUtDO0FBQXpELE9BQ0Usb0JBQUMsVUFBRCxPQURGLENBREssR0FJSCxJQUpKO0FBS0QsRzs7U0FrQkRDLE0sR0FBQSxrQkFBUztBQUNQLFFBQU1DLE9BQU8sR0FBRyxDQUFDLEtBQUtmLEtBQUwsQ0FBV0MsU0FBWixHQUF3QixLQUFLRixLQUFMLENBQVdpQixRQUFuQyxHQUE4QyxJQUE5RDtBQURPLHNCQUUrQixLQUFLakIsS0FGcEM7QUFBQSxRQUVDa0IsS0FGRCxlQUVDQSxLQUZEO0FBQUEsUUFFUUMsS0FGUixlQUVRQSxLQUZSO0FBQUEsUUFFZUMsV0FGZixlQUVlQSxXQUZmO0FBSVAsUUFBTUMsaUJBQWlCLEdBQUdELFdBQVcsR0FDbkMsa0NBQU8sS0FBS3BCLEtBQUwsQ0FBV3NCLFFBQWxCLENBRG1DLEdBQ0UsSUFEdkM7QUFHQSxXQUNFO0FBQUksTUFBQSxTQUFTLEVBQUMsaUJBQWQ7QUFBZ0MsTUFBQSxPQUFPLEVBQUUsS0FBS0M7QUFBOUMsT0FDRTtBQUFLLE1BQUEsU0FBUyxFQUFDO0FBQWYsT0FDRTtBQUFLLE1BQUEsU0FBUyxFQUFDO0FBQWYsT0FDRyxLQUFLQyxPQUFMLEVBREgsRUFFRSxrQ0FBT0wsS0FBUCxDQUZGLENBREYsRUFLRTtBQUFLLE1BQUEsU0FBUyxFQUFDO0FBQWYsT0FDR0UsaUJBREgsRUFFRSxvQkFBQyxPQUFEO0FBQVMsTUFBQSxTQUFTLEVBQUM7QUFBbkIsT0FBbUNILEtBQW5DLENBRkYsRUFHRyxLQUFLTixhQUFMLEVBSEgsQ0FMRixDQURGLEVBWUdJLE9BWkgsQ0FERjtBQWdCRCxHOzs7RUF6RG9DdkIsS0FBSyxDQUFDZ0MsYTs7U0FBeEIxQixTO0FBd0VyQkEsU0FBUyxDQUFDMkIsWUFBVixHQUF5QjtBQUN2QkosRUFBQUEsUUFBUSxFQUFFLEtBRGE7QUFFdkJMLEVBQUFBLFFBQVEsRUFBRSxJQUZhO0FBR3ZCUixFQUFBQSxZQUFZLEVBQUUsRUFIUztBQUl2QkYsRUFBQUEsYUFBYSxFQUFFLHlCQUFNLENBQUU7QUFKQSxDQUF6QiIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9ucyAqL1xuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tbm9uaW50ZXJhY3RpdmUtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L2NsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHMgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBGYVRyYXNoQWx0LCBGYUNhcmV0UmlnaHQsIEZhQ2FyZXREb3duIH0gZnJvbSAncmVhY3QtaWNvbnMvZmEnO1xuXG5pbXBvcnQgSFNCYWRnZSBmcm9tICcuLi8uLi9iYWRnZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyb3VwSXRlbSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0SWNvbiA9ICgpID0+ICh0aGlzLnN0YXRlLmNvbGxhcHNlZCA/IDxGYUNhcmV0UmlnaHQgLz4gOiA8RmFDYXJldERvd24gLz4pO1xuXG4gIGdldFJlbW92ZUljb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMucmVtb3ZhYmxlID9cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNvbXBvbmVudC1pY29uIGNsaWNrYWJsZVwiIG9uQ2xpY2s9e3RoaXMucmVtb3ZlQ2xpY2tIYW5kbGVyfT5cbiAgICAgICAgPEZhVHJhc2hBbHQgLz5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDogbnVsbDtcbiAgfVxuXG4gIGNsaWNrSGFubGRlciA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMudG9nZ2xlQ29sbGFwc2UoKTtcbiAgfVxuXG4gIHJlbW92ZUNsaWNrSGFuZGxlciA9IChlKSA9PiB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLnByb3BzLm9uUmVtb3ZlQ2xpY2sodGhpcy5wcm9wcy5zb3VyY2VJZCwgdGhpcy5wcm9wcy5yZWZlcmVuY2VJZHMuc2xpY2UoKSk7XG4gIH1cblxuICB0b2dnbGVDb2xsYXBzZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNvbGxhcHNlZDogIXRoaXMuc3RhdGUuY29sbGFwc2VkLFxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSAhdGhpcy5zdGF0ZS5jb2xsYXBzZWQgPyB0aGlzLnByb3BzLmNoaWxkcmVuIDogbnVsbDtcbiAgICBjb25zdCB7IGNvdW50LCB0aXRsZSwgc2VsZWN0ZWRBbGwgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBzZWxlY3RlQWxsQ29udGVudCA9IHNlbGVjdGVkQWxsID9cbiAgICAgIDxzcGFuPnt0aGlzLnByb3BzLmFsbExhYmVsfTwvc3Bhbj4gOiBudWxsO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxsaSBjbGFzc05hbWU9XCJncm91cC1saXN0LWl0ZW1cIiBvbkNsaWNrPXt0aGlzLmNsaWNrSGFubGRlcn0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGUtYmxvY2tcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxlZnQtYmxvY2tcIj5cbiAgICAgICAgICAgIHt0aGlzLmdldEljb24oKX1cbiAgICAgICAgICAgIDxzcGFuPnt0aXRsZX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyaWdodC1ibG9ja1wiPlxuICAgICAgICAgICAge3NlbGVjdGVBbGxDb250ZW50fVxuICAgICAgICAgICAgPEhTQmFkZ2UgY2xhc3NOYW1lPVwiYmFkZ2Utb3JhbmdlXCI+e2NvdW50fTwvSFNCYWRnZT5cbiAgICAgICAgICAgIHt0aGlzLmdldFJlbW92ZUljb24oKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtjb250ZW50fVxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59XG5cbkdyb3VwSXRlbS5wcm9wVHlwZXMgPSB7XG4gIGFsbExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBjb3VudDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gIHJlZmVyZW5jZUlkczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pKSxcbiAgcmVtb3ZhYmxlOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBzb3VyY2VJZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBzZWxlY3RlZEFsbDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgb25SZW1vdmVDbGljazogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5Hcm91cEl0ZW0uZGVmYXVsdFByb3BzID0ge1xuICBhbGxMYWJlbDogJ0FsbCcsXG4gIGNoaWxkcmVuOiBudWxsLFxuICByZWZlcmVuY2VJZHM6IFtdLFxuICBvblJlbW92ZUNsaWNrOiAoKSA9PiB7fSxcbn07XG4iXX0=