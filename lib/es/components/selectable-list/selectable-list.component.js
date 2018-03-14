function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import ReactList from 'react-list';

import ListItem from './list-item.component';
import { hierarchyItemListShape } from '../../types';
import './selectable-list.scss';

var SelectableList = function (_React$PureComponent) {
  _inherits(SelectableList, _React$PureComponent);

  function SelectableList() {
    var _temp, _this, _ret;

    _classCallCheck(this, SelectableList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.itemRenderer = function (index, key) {
      var _this$props = _this.props,
          items = _this$props.items,
          checkDisabled = _this$props.checkDisabled;

      var item = items[index];
      var isChildren = item.children && item.children.length > 0;
      var checked = _this.props.checkedAll || _this.props.checkedIds.indexOf(item.id) !== -1;

      return React.createElement(ListItem, {
        key: '' + key,
        checked: checked,
        checkDisabled: checkDisabled || isChildren,
        item: item,
        itemRenderFunction: _this.props.itemRenderFunction,
        selected: _this.props.selectedId === String(item.id),
        onCheck: _this.props.onCheck,
        onClick: _this.props.onClick
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  SelectableList.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'oc-selectable-list-wrapper' },
      React.createElement(
        'div',
        null,
        React.createElement(ReactList, {
          itemRenderer: this.itemRenderer,
          length: this.props.items.length,
          type: 'uniform',
          useStaticSize: true
        })
      )
    );
  };

  return SelectableList;
}(React.PureComponent);

export { SelectableList as default };


SelectableList.defaultProps = {
  checkedAll: false,
  items: [],
  itemRenderFunction: null,
  checkedIds: [],
  checkDisabled: false,
  selectedId: null,
  onCheck: function onCheck() {},
  onClick: function onClick() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NlbGVjdGFibGUtbGlzdC9zZWxlY3RhYmxlLWxpc3QuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIlJlYWN0TGlzdCIsIkxpc3RJdGVtIiwiaGllcmFyY2h5SXRlbUxpc3RTaGFwZSIsIlNlbGVjdGFibGVMaXN0IiwiaXRlbVJlbmRlcmVyIiwiaW5kZXgiLCJrZXkiLCJwcm9wcyIsIml0ZW1zIiwiY2hlY2tEaXNhYmxlZCIsIml0ZW0iLCJpc0NoaWxkcmVuIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJjaGVja2VkIiwiY2hlY2tlZEFsbCIsImNoZWNrZWRJZHMiLCJpbmRleE9mIiwiaWQiLCJpdGVtUmVuZGVyRnVuY3Rpb24iLCJzZWxlY3RlZElkIiwiU3RyaW5nIiwib25DaGVjayIsIm9uQ2xpY2siLCJyZW5kZXIiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7O0FBRUEsT0FBT0MsUUFBUCxNQUFxQix1QkFBckI7QUFDQSxTQUFTQyxzQkFBVCxRQUF1QyxhQUF2QztBQUNBLE9BQU8sd0JBQVA7O0lBR3FCQyxjOzs7Ozs7Ozs7Ozs7Z0tBQ25CQyxZLEdBQWUsVUFBQ0MsS0FBRCxFQUFRQyxHQUFSLEVBQWdCO0FBQUEsd0JBQ0ksTUFBS0MsS0FEVDtBQUFBLFVBQ3JCQyxLQURxQixlQUNyQkEsS0FEcUI7QUFBQSxVQUNkQyxhQURjLGVBQ2RBLGFBRGM7O0FBRTdCLFVBQU1DLE9BQU9GLE1BQU1ILEtBQU4sQ0FBYjtBQUNBLFVBQU1NLGFBQWFELEtBQUtFLFFBQUwsSUFBaUJGLEtBQUtFLFFBQUwsQ0FBY0MsTUFBZCxHQUF1QixDQUEzRDtBQUNBLFVBQU1DLFVBQVUsTUFBS1AsS0FBTCxDQUFXUSxVQUFYLElBQ2IsTUFBS1IsS0FBTCxDQUFXUyxVQUFYLENBQXNCQyxPQUF0QixDQUE4QlAsS0FBS1EsRUFBbkMsTUFBMkMsQ0FBQyxDQUQvQzs7QUFHQSxhQUNFLG9CQUFDLFFBQUQ7QUFDRSxrQkFBUVosR0FEVjtBQUVFLGlCQUFTUSxPQUZYO0FBR0UsdUJBQWVMLGlCQUFpQkUsVUFIbEM7QUFJRSxjQUFNRCxJQUpSO0FBS0UsNEJBQW9CLE1BQUtILEtBQUwsQ0FBV1ksa0JBTGpDO0FBTUUsa0JBQVUsTUFBS1osS0FBTCxDQUFXYSxVQUFYLEtBQTBCQyxPQUFPWCxLQUFLUSxFQUFaLENBTnRDO0FBT0UsaUJBQVMsTUFBS1gsS0FBTCxDQUFXZSxPQVB0QjtBQVFFLGlCQUFTLE1BQUtmLEtBQUwsQ0FBV2dCO0FBUnRCLFFBREY7QUFXRCxLOzs7MkJBRURDLE0scUJBQVM7QUFDUCxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsNEJBQWY7QUFDRTtBQUFBO0FBQUE7QUFDRSw0QkFBQyxTQUFEO0FBQ0Usd0JBQWMsS0FBS3BCLFlBRHJCO0FBRUUsa0JBQVEsS0FBS0csS0FBTCxDQUFXQyxLQUFYLENBQWlCSyxNQUYzQjtBQUdFLGdCQUFLLFNBSFA7QUFJRTtBQUpGO0FBREY7QUFERixLQURGO0FBWUQsRzs7O0VBbEN5Q2YsTUFBTTJCLGE7O1NBQTdCdEIsYzs7O0FBZ0RyQkEsZUFBZXVCLFlBQWYsR0FBOEI7QUFDNUJYLGNBQVksS0FEZ0I7QUFFNUJQLFNBQU8sRUFGcUI7QUFHNUJXLHNCQUFvQixJQUhRO0FBSTVCSCxjQUFZLEVBSmdCO0FBSzVCUCxpQkFBZSxLQUxhO0FBTTVCVyxjQUFZLElBTmdCO0FBTzVCRSxXQUFTLG1CQUFNLENBQUUsQ0FQVztBQVE1QkMsV0FBUyxtQkFBTSxDQUFFO0FBUlcsQ0FBOUIiLCJmaWxlIjoic2VsZWN0YWJsZS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCBSZWFjdExpc3QgZnJvbSAncmVhY3QtbGlzdCc7XHJcblxyXG5pbXBvcnQgTGlzdEl0ZW0gZnJvbSAnLi9saXN0LWl0ZW0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgaGllcmFyY2h5SXRlbUxpc3RTaGFwZSB9IGZyb20gJy4uLy4uL3R5cGVzJztcclxuaW1wb3J0ICcuL3NlbGVjdGFibGUtbGlzdC5zY3NzJztcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWxlY3RhYmxlTGlzdCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gIGl0ZW1SZW5kZXJlciA9IChpbmRleCwga2V5KSA9PiB7XHJcbiAgICBjb25zdCB7IGl0ZW1zLCBjaGVja0Rpc2FibGVkIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgaXRlbSA9IGl0ZW1zW2luZGV4XTtcclxuICAgIGNvbnN0IGlzQ2hpbGRyZW4gPSBpdGVtLmNoaWxkcmVuICYmIGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID4gMDtcclxuICAgIGNvbnN0IGNoZWNrZWQgPSB0aGlzLnByb3BzLmNoZWNrZWRBbGxcclxuICAgIHx8IHRoaXMucHJvcHMuY2hlY2tlZElkcy5pbmRleE9mKGl0ZW0uaWQpICE9PSAtMTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8TGlzdEl0ZW1cclxuICAgICAgICBrZXk9e2Ake2tleX1gfVxyXG4gICAgICAgIGNoZWNrZWQ9e2NoZWNrZWR9XHJcbiAgICAgICAgY2hlY2tEaXNhYmxlZD17Y2hlY2tEaXNhYmxlZCB8fCBpc0NoaWxkcmVufVxyXG4gICAgICAgIGl0ZW09e2l0ZW19XHJcbiAgICAgICAgaXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLml0ZW1SZW5kZXJGdW5jdGlvbn1cclxuICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZElkID09PSBTdHJpbmcoaXRlbS5pZCl9XHJcbiAgICAgICAgb25DaGVjaz17dGhpcy5wcm9wcy5vbkNoZWNrfVxyXG4gICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25DbGlja31cclxuICAgICAgLz4pO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1zZWxlY3RhYmxlLWxpc3Qtd3JhcHBlclwiPlxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICA8UmVhY3RMaXN0XHJcbiAgICAgICAgICAgIGl0ZW1SZW5kZXJlcj17dGhpcy5pdGVtUmVuZGVyZXJ9XHJcbiAgICAgICAgICAgIGxlbmd0aD17dGhpcy5wcm9wcy5pdGVtcy5sZW5ndGh9XHJcbiAgICAgICAgICAgIHR5cGU9XCJ1bmlmb3JtXCJcclxuICAgICAgICAgICAgdXNlU3RhdGljU2l6ZVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuU2VsZWN0YWJsZUxpc3QucHJvcFR5cGVzID0ge1xyXG4gIGNoZWNrZWRBbGw6IFByb3BUeXBlcy5ib29sLFxyXG4gIGl0ZW1zOiBoaWVyYXJjaHlJdGVtTGlzdFNoYXBlLFxyXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgY2hlY2tlZElkczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm51bWJlciksXHJcbiAgY2hlY2tEaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgc2VsZWN0ZWRJZDogUHJvcFR5cGVzLnN0cmluZyxcclxuICBvbkNoZWNrOiBQcm9wVHlwZXMuZnVuYyxcclxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcclxufTtcclxuXHJcblNlbGVjdGFibGVMaXN0LmRlZmF1bHRQcm9wcyA9IHtcclxuICBjaGVja2VkQWxsOiBmYWxzZSxcclxuICBpdGVtczogW10sXHJcbiAgaXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxyXG4gIGNoZWNrZWRJZHM6IFtdLFxyXG4gIGNoZWNrRGlzYWJsZWQ6IGZhbHNlLFxyXG4gIHNlbGVjdGVkSWQ6IG51bGwsXHJcbiAgb25DaGVjazogKCkgPT4ge30sXHJcbiAgb25DbGljazogKCkgPT4ge30sXHJcbn07XHJcbiJdfQ==