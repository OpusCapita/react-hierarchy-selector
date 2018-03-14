function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import PropTypes from 'prop-types';
import FaTrash from 'react-icons/lib/fa/trash';
import FaCaretRight from 'react-icons/lib/fa/caret-right';
import FaCaretDown from 'react-icons/lib/fa/caret-down';

import HSBadge from '../../badge';

var GroupItem = function (_React$PureComponent) {
  _inherits(GroupItem, _React$PureComponent);

  function GroupItem(props) {
    _classCallCheck(this, GroupItem);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.getIcon = function () {
      return _this.state.collapsed ? React.createElement(FaCaretRight, null) : React.createElement(FaCaretDown, null);
    };

    _this.clickHanlder = function (e) {
      e.preventDefault();
      _this.toggleCollapse();
    };

    _this.removeClickHandler = function (e) {
      e.stopPropagation();
      _this.props.onRemoveClick(_this.props.sourceId, _this.props.referenceIds.slice());
    };

    _this.toggleCollapse = function () {
      _this.setState({
        collapsed: !_this.state.collapsed
      });
    };

    _this.state = {
      collapsed: false
    };
    return _this;
  }

  GroupItem.prototype.getRemoveIcon = function getRemoveIcon() {
    return this.props.removable ? React.createElement(
      'span',
      { className: 'component-icon clickable', onClick: this.removeClickHandler },
      React.createElement(FaTrash, null)
    ) : null;
  };

  GroupItem.prototype.render = function render() {
    var content = !this.state.collapsed ? this.props.children : null;
    var _props = this.props,
        count = _props.count,
        title = _props.title,
        selectedAll = _props.selectedAll;


    var selecteAllContent = selectedAll ? React.createElement(
      'span',
      null,
      this.props.allLabel
    ) : null;

    return React.createElement(
      'li',
      { className: 'group-list-item', onClick: this.clickHanlder },
      this.getIcon(),
      React.createElement(
        'span',
        null,
        title
      ),
      React.createElement(
        'div',
        { className: 'right-block' },
        selecteAllContent,
        React.createElement(
          HSBadge,
          { className: 'badge-orange' },
          count
        ),
        this.getRemoveIcon()
      ),
      content
    );
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvc2VsZWN0ZWQtaXRlbXMvZ3JvdXAuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIkZhVHJhc2giLCJGYUNhcmV0UmlnaHQiLCJGYUNhcmV0RG93biIsIkhTQmFkZ2UiLCJHcm91cEl0ZW0iLCJwcm9wcyIsImdldEljb24iLCJzdGF0ZSIsImNvbGxhcHNlZCIsImNsaWNrSGFubGRlciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRvZ2dsZUNvbGxhcHNlIiwicmVtb3ZlQ2xpY2tIYW5kbGVyIiwic3RvcFByb3BhZ2F0aW9uIiwib25SZW1vdmVDbGljayIsInNvdXJjZUlkIiwicmVmZXJlbmNlSWRzIiwic2xpY2UiLCJzZXRTdGF0ZSIsImdldFJlbW92ZUljb24iLCJyZW1vdmFibGUiLCJyZW5kZXIiLCJjb250ZW50IiwiY2hpbGRyZW4iLCJjb3VudCIsInRpdGxlIiwic2VsZWN0ZWRBbGwiLCJzZWxlY3RlQWxsQ29udGVudCIsImFsbExhYmVsIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBOztBQUVBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsT0FBUCxNQUFvQiwwQkFBcEI7QUFDQSxPQUFPQyxZQUFQLE1BQXlCLGdDQUF6QjtBQUNBLE9BQU9DLFdBQVAsTUFBd0IsK0JBQXhCOztBQUVBLE9BQU9DLE9BQVAsTUFBb0IsYUFBcEI7O0lBRXFCQyxTOzs7QUFDbkIscUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsZ0NBQU1BLEtBQU4sQ0FEaUI7O0FBQUEsVUFPbkJDLE9BUG1CLEdBT1Q7QUFBQSxhQUFPLE1BQUtDLEtBQUwsQ0FBV0MsU0FBWCxHQUF1QixvQkFBQyxZQUFELE9BQXZCLEdBQTBDLG9CQUFDLFdBQUQsT0FBakQ7QUFBQSxLQVBTOztBQUFBLFVBaUJuQkMsWUFqQm1CLEdBaUJKLFVBQUNDLENBQUQsRUFBTztBQUNwQkEsUUFBRUMsY0FBRjtBQUNBLFlBQUtDLGNBQUw7QUFDRCxLQXBCa0I7O0FBQUEsVUFzQm5CQyxrQkF0Qm1CLEdBc0JFLFVBQUNILENBQUQsRUFBTztBQUMxQkEsUUFBRUksZUFBRjtBQUNBLFlBQUtULEtBQUwsQ0FBV1UsYUFBWCxDQUF5QixNQUFLVixLQUFMLENBQVdXLFFBQXBDLEVBQThDLE1BQUtYLEtBQUwsQ0FBV1ksWUFBWCxDQUF3QkMsS0FBeEIsRUFBOUM7QUFDRCxLQXpCa0I7O0FBQUEsVUEyQm5CTixjQTNCbUIsR0EyQkYsWUFBTTtBQUNyQixZQUFLTyxRQUFMLENBQWM7QUFDWlgsbUJBQVcsQ0FBQyxNQUFLRCxLQUFMLENBQVdDO0FBRFgsT0FBZDtBQUdELEtBL0JrQjs7QUFFakIsVUFBS0QsS0FBTCxHQUFhO0FBQ1hDLGlCQUFXO0FBREEsS0FBYjtBQUZpQjtBQUtsQjs7c0JBSURZLGEsNEJBQWdCO0FBQ2QsV0FBTyxLQUFLZixLQUFMLENBQVdnQixTQUFYLEdBQ0w7QUFBQTtBQUFBLFFBQU0sV0FBVSwwQkFBaEIsRUFBMkMsU0FBUyxLQUFLUixrQkFBekQ7QUFDRSwwQkFBQyxPQUFEO0FBREYsS0FESyxHQUlILElBSko7QUFLRCxHOztzQkFrQkRTLE0scUJBQVM7QUFDUCxRQUFNQyxVQUFVLENBQUMsS0FBS2hCLEtBQUwsQ0FBV0MsU0FBWixHQUF3QixLQUFLSCxLQUFMLENBQVdtQixRQUFuQyxHQUE4QyxJQUE5RDtBQURPLGlCQUUrQixLQUFLbkIsS0FGcEM7QUFBQSxRQUVDb0IsS0FGRCxVQUVDQSxLQUZEO0FBQUEsUUFFUUMsS0FGUixVQUVRQSxLQUZSO0FBQUEsUUFFZUMsV0FGZixVQUVlQSxXQUZmOzs7QUFJUCxRQUFNQyxvQkFBb0JELGNBQ3hCO0FBQUE7QUFBQTtBQUFPLFdBQUt0QixLQUFMLENBQVd3QjtBQUFsQixLQUR3QixHQUNhLElBRHZDOztBQUdBLFdBQ0U7QUFBQTtBQUFBLFFBQUksV0FBVSxpQkFBZCxFQUFnQyxTQUFTLEtBQUtwQixZQUE5QztBQUNHLFdBQUtILE9BQUwsRUFESDtBQUVFO0FBQUE7QUFBQTtBQUFPb0I7QUFBUCxPQUZGO0FBR0U7QUFBQTtBQUFBLFVBQUssV0FBVSxhQUFmO0FBQ0dFLHlCQURIO0FBRUU7QUFBQyxpQkFBRDtBQUFBLFlBQVMsV0FBVSxjQUFuQjtBQUFtQ0g7QUFBbkMsU0FGRjtBQUdHLGFBQUtMLGFBQUw7QUFISCxPQUhGO0FBUUdHO0FBUkgsS0FERjtBQVlELEc7OztFQXJEb0N6QixNQUFNZ0MsYTs7U0FBeEIxQixTOzs7QUFvRXJCQSxVQUFVMkIsWUFBVixHQUF5QjtBQUN2QkYsWUFBVSxLQURhO0FBRXZCTCxZQUFVLElBRmE7QUFHdkJQLGdCQUFjLEVBSFM7QUFJdkJGLGlCQUFlLHlCQUFNLENBQUU7QUFKQSxDQUF6QiIsImZpbGUiOiJncm91cC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tbm9uaW50ZXJhY3RpdmUtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvY2xpY2stZXZlbnRzLWhhdmUta2V5LWV2ZW50cyAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IEZhVHJhc2ggZnJvbSAncmVhY3QtaWNvbnMvbGliL2ZhL3RyYXNoJztcclxuaW1wb3J0IEZhQ2FyZXRSaWdodCBmcm9tICdyZWFjdC1pY29ucy9saWIvZmEvY2FyZXQtcmlnaHQnO1xyXG5pbXBvcnQgRmFDYXJldERvd24gZnJvbSAncmVhY3QtaWNvbnMvbGliL2ZhL2NhcmV0LWRvd24nO1xyXG5cclxuaW1wb3J0IEhTQmFkZ2UgZnJvbSAnLi4vLi4vYmFkZ2UnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JvdXBJdGVtIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGNvbGxhcHNlZDogZmFsc2UsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZ2V0SWNvbiA9ICgpID0+ICh0aGlzLnN0YXRlLmNvbGxhcHNlZCA/IDxGYUNhcmV0UmlnaHQgLz4gOiA8RmFDYXJldERvd24gLz4pO1xyXG5cclxuICBnZXRSZW1vdmVJY29uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucHJvcHMucmVtb3ZhYmxlID9cclxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY29tcG9uZW50LWljb24gY2xpY2thYmxlXCIgb25DbGljaz17dGhpcy5yZW1vdmVDbGlja0hhbmRsZXJ9PlxyXG4gICAgICAgIDxGYVRyYXNoIC8+XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgICAgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgY2xpY2tIYW5sZGVyID0gKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMudG9nZ2xlQ29sbGFwc2UoKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUNsaWNrSGFuZGxlciA9IChlKSA9PiB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgdGhpcy5wcm9wcy5vblJlbW92ZUNsaWNrKHRoaXMucHJvcHMuc291cmNlSWQsIHRoaXMucHJvcHMucmVmZXJlbmNlSWRzLnNsaWNlKCkpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlQ29sbGFwc2UgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgY29sbGFwc2VkOiAhdGhpcy5zdGF0ZS5jb2xsYXBzZWQsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSAhdGhpcy5zdGF0ZS5jb2xsYXBzZWQgPyB0aGlzLnByb3BzLmNoaWxkcmVuIDogbnVsbDtcclxuICAgIGNvbnN0IHsgY291bnQsIHRpdGxlLCBzZWxlY3RlZEFsbCB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICBjb25zdCBzZWxlY3RlQWxsQ29udGVudCA9IHNlbGVjdGVkQWxsID9cclxuICAgICAgPHNwYW4+e3RoaXMucHJvcHMuYWxsTGFiZWx9PC9zcGFuPiA6IG51bGw7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGxpIGNsYXNzTmFtZT1cImdyb3VwLWxpc3QtaXRlbVwiIG9uQ2xpY2s9e3RoaXMuY2xpY2tIYW5sZGVyfT5cclxuICAgICAgICB7dGhpcy5nZXRJY29uKCl9XHJcbiAgICAgICAgPHNwYW4+e3RpdGxlfTwvc3Bhbj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJpZ2h0LWJsb2NrXCI+XHJcbiAgICAgICAgICB7c2VsZWN0ZUFsbENvbnRlbnR9XHJcbiAgICAgICAgICA8SFNCYWRnZSBjbGFzc05hbWU9XCJiYWRnZS1vcmFuZ2VcIj57Y291bnR9PC9IU0JhZGdlPlxyXG4gICAgICAgICAge3RoaXMuZ2V0UmVtb3ZlSWNvbigpfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIHtjb250ZW50fVxyXG4gICAgICA8L2xpPlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbkdyb3VwSXRlbS5wcm9wVHlwZXMgPSB7XHJcbiAgYWxsTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXHJcbiAgY291bnQ6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXHJcbiAgcmVmZXJlbmNlSWRzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSkpLFxyXG4gIHJlbW92YWJsZTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICBzb3VyY2VJZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gIHNlbGVjdGVkQWxsOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxyXG4gIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgb25SZW1vdmVDbGljazogUHJvcFR5cGVzLmZ1bmMsXHJcbn07XHJcblxyXG5Hcm91cEl0ZW0uZGVmYXVsdFByb3BzID0ge1xyXG4gIGFsbExhYmVsOiAnQWxsJyxcclxuICBjaGlsZHJlbjogbnVsbCxcclxuICByZWZlcmVuY2VJZHM6IFtdLFxyXG4gIG9uUmVtb3ZlQ2xpY2s6ICgpID0+IHt9LFxyXG59O1xyXG4iXX0=