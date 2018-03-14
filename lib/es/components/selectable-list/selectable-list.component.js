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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NlbGVjdGFibGUtbGlzdC9zZWxlY3RhYmxlLWxpc3QuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIlJlYWN0TGlzdCIsIkxpc3RJdGVtIiwiaGllcmFyY2h5SXRlbUxpc3RTaGFwZSIsIlNlbGVjdGFibGVMaXN0IiwiaXRlbVJlbmRlcmVyIiwiaW5kZXgiLCJrZXkiLCJwcm9wcyIsIml0ZW1zIiwiY2hlY2tEaXNhYmxlZCIsIml0ZW0iLCJpc0NoaWxkcmVuIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJjaGVja2VkIiwiY2hlY2tlZEFsbCIsImNoZWNrZWRJZHMiLCJpbmRleE9mIiwiaWQiLCJpdGVtUmVuZGVyRnVuY3Rpb24iLCJzZWxlY3RlZElkIiwiU3RyaW5nIiwib25DaGVjayIsIm9uQ2xpY2siLCJyZW5kZXIiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7O0FBRUEsT0FBT0MsUUFBUCxNQUFxQix1QkFBckI7QUFDQSxTQUFTQyxzQkFBVCxRQUF1QyxhQUF2QztBQUNBLE9BQU8sd0JBQVA7O0lBR3FCQyxjOzs7Ozs7Ozs7Ozs7Z0tBQ25CQyxZLEdBQWUsVUFBQ0MsS0FBRCxFQUFRQyxHQUFSLEVBQWdCO0FBQUEsd0JBQ0ksTUFBS0MsS0FEVDtBQUFBLFVBQ3JCQyxLQURxQixlQUNyQkEsS0FEcUI7QUFBQSxVQUNkQyxhQURjLGVBQ2RBLGFBRGM7O0FBRTdCLFVBQU1DLE9BQU9GLE1BQU1ILEtBQU4sQ0FBYjtBQUNBLFVBQU1NLGFBQWFELEtBQUtFLFFBQUwsSUFBaUJGLEtBQUtFLFFBQUwsQ0FBY0MsTUFBZCxHQUF1QixDQUEzRDtBQUNBLFVBQU1DLFVBQVUsTUFBS1AsS0FBTCxDQUFXUSxVQUFYLElBQ2IsTUFBS1IsS0FBTCxDQUFXUyxVQUFYLENBQXNCQyxPQUF0QixDQUE4QlAsS0FBS1EsRUFBbkMsTUFBMkMsQ0FBQyxDQUQvQzs7QUFHQSxhQUNFLG9CQUFDLFFBQUQ7QUFDRSxrQkFBUVosR0FEVjtBQUVFLGlCQUFTUSxPQUZYO0FBR0UsdUJBQWVMLGlCQUFpQkUsVUFIbEM7QUFJRSxjQUFNRCxJQUpSO0FBS0UsNEJBQW9CLE1BQUtILEtBQUwsQ0FBV1ksa0JBTGpDO0FBTUUsa0JBQVUsTUFBS1osS0FBTCxDQUFXYSxVQUFYLEtBQTBCQyxPQUFPWCxLQUFLUSxFQUFaLENBTnRDO0FBT0UsaUJBQVMsTUFBS1gsS0FBTCxDQUFXZSxPQVB0QjtBQVFFLGlCQUFTLE1BQUtmLEtBQUwsQ0FBV2dCO0FBUnRCLFFBREY7QUFXRCxLOzs7MkJBRURDLE0scUJBQVM7QUFDUCxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsNEJBQWY7QUFDRTtBQUFBO0FBQUE7QUFDRSw0QkFBQyxTQUFEO0FBQ0Usd0JBQWMsS0FBS3BCLFlBRHJCO0FBRUUsa0JBQVEsS0FBS0csS0FBTCxDQUFXQyxLQUFYLENBQWlCSyxNQUYzQjtBQUdFLGdCQUFLLFNBSFA7QUFJRTtBQUpGO0FBREY7QUFERixLQURGO0FBWUQsRzs7O0VBbEN5Q2YsTUFBTTJCLGE7O1NBQTdCdEIsYzs7O0FBZ0RyQkEsZUFBZXVCLFlBQWYsR0FBOEI7QUFDNUJYLGNBQVksS0FEZ0I7QUFFNUJQLFNBQU8sRUFGcUI7QUFHNUJXLHNCQUFvQixJQUhRO0FBSTVCSCxjQUFZLEVBSmdCO0FBSzVCUCxpQkFBZSxLQUxhO0FBTTVCVyxjQUFZLElBTmdCO0FBTzVCRSxXQUFTLG1CQUFNLENBQUUsQ0FQVztBQVE1QkMsV0FBUyxtQkFBTSxDQUFFO0FBUlcsQ0FBOUIiLCJmaWxlIjoic2VsZWN0YWJsZS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0TGlzdCBmcm9tICdyZWFjdC1saXN0JztcblxuaW1wb3J0IExpc3RJdGVtIGZyb20gJy4vbGlzdC1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBoaWVyYXJjaHlJdGVtTGlzdFNoYXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0ICcuL3NlbGVjdGFibGUtbGlzdC5zY3NzJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWxlY3RhYmxlTGlzdCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBpdGVtUmVuZGVyZXIgPSAoaW5kZXgsIGtleSkgPT4ge1xuICAgIGNvbnN0IHsgaXRlbXMsIGNoZWNrRGlzYWJsZWQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaXRlbSA9IGl0ZW1zW2luZGV4XTtcbiAgICBjb25zdCBpc0NoaWxkcmVuID0gaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDA7XG4gICAgY29uc3QgY2hlY2tlZCA9IHRoaXMucHJvcHMuY2hlY2tlZEFsbFxuICAgIHx8IHRoaXMucHJvcHMuY2hlY2tlZElkcy5pbmRleE9mKGl0ZW0uaWQpICE9PSAtMTtcblxuICAgIHJldHVybiAoXG4gICAgICA8TGlzdEl0ZW1cbiAgICAgICAga2V5PXtgJHtrZXl9YH1cbiAgICAgICAgY2hlY2tlZD17Y2hlY2tlZH1cbiAgICAgICAgY2hlY2tEaXNhYmxlZD17Y2hlY2tEaXNhYmxlZCB8fCBpc0NoaWxkcmVufVxuICAgICAgICBpdGVtPXtpdGVtfVxuICAgICAgICBpdGVtUmVuZGVyRnVuY3Rpb249e3RoaXMucHJvcHMuaXRlbVJlbmRlckZ1bmN0aW9ufVxuICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZElkID09PSBTdHJpbmcoaXRlbS5pZCl9XG4gICAgICAgIG9uQ2hlY2s9e3RoaXMucHJvcHMub25DaGVja31cbiAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkNsaWNrfVxuICAgICAgLz4pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLXNlbGVjdGFibGUtbGlzdC13cmFwcGVyXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPFJlYWN0TGlzdFxuICAgICAgICAgICAgaXRlbVJlbmRlcmVyPXt0aGlzLml0ZW1SZW5kZXJlcn1cbiAgICAgICAgICAgIGxlbmd0aD17dGhpcy5wcm9wcy5pdGVtcy5sZW5ndGh9XG4gICAgICAgICAgICB0eXBlPVwidW5pZm9ybVwiXG4gICAgICAgICAgICB1c2VTdGF0aWNTaXplXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblNlbGVjdGFibGVMaXN0LnByb3BUeXBlcyA9IHtcbiAgY2hlY2tlZEFsbDogUHJvcFR5cGVzLmJvb2wsXG4gIGl0ZW1zOiBoaWVyYXJjaHlJdGVtTGlzdFNoYXBlLFxuICBpdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICBjaGVja2VkSWRzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMubnVtYmVyKSxcbiAgY2hlY2tEaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gIHNlbGVjdGVkSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIG9uQ2hlY2s6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cblNlbGVjdGFibGVMaXN0LmRlZmF1bHRQcm9wcyA9IHtcbiAgY2hlY2tlZEFsbDogZmFsc2UsXG4gIGl0ZW1zOiBbXSxcbiAgaXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxuICBjaGVja2VkSWRzOiBbXSxcbiAgY2hlY2tEaXNhYmxlZDogZmFsc2UsXG4gIHNlbGVjdGVkSWQ6IG51bGwsXG4gIG9uQ2hlY2s6ICgpID0+IHt9LFxuICBvbkNsaWNrOiAoKSA9PiB7fSxcbn07XG4iXX0=