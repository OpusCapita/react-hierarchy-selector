function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import ReactList from 'react-list';
import ListItem from './list-item.component';
import { hierarchyItemListShape } from '../../types';
import './selectable-list.scss';

var SelectableList =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(SelectableList, _React$PureComponent);

  function SelectableList() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "itemRenderer", function (index, key) {
      var _this$props = _this.props,
          items = _this$props.items,
          checkDisabled = _this$props.checkDisabled;
      var item = items[index];
      var isChildren = item.children && item.children.length > 0;
      var checked = _this.props.checkedAll || _this.props.checkedIds.indexOf(item.id) !== -1;
      return React.createElement(ListItem, {
        key: "" + key,
        checked: checked,
        checkDisabled: checkDisabled || isChildren,
        item: item,
        itemRenderFunction: _this.props.itemRenderFunction,
        selected: _this.props.selectedId === String(item.id),
        onCheck: _this.props.onCheck,
        onClick: _this.props.onClick
      });
    });

    return _this;
  }

  var _proto = SelectableList.prototype;

  _proto.render = function render() {
    return React.createElement("div", {
      className: "oc-selectable-list-wrapper"
    }, React.createElement("div", null, React.createElement(ReactList, {
      itemRenderer: this.itemRenderer,
      length: this.props.items.length,
      type: "uniform",
      useStaticSize: true
    })));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NlbGVjdGFibGUtbGlzdC9zZWxlY3RhYmxlLWxpc3QuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIlJlYWN0TGlzdCIsIkxpc3RJdGVtIiwiaGllcmFyY2h5SXRlbUxpc3RTaGFwZSIsIlNlbGVjdGFibGVMaXN0IiwiaW5kZXgiLCJrZXkiLCJwcm9wcyIsIml0ZW1zIiwiY2hlY2tEaXNhYmxlZCIsIml0ZW0iLCJpc0NoaWxkcmVuIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJjaGVja2VkIiwiY2hlY2tlZEFsbCIsImNoZWNrZWRJZHMiLCJpbmRleE9mIiwiaWQiLCJpdGVtUmVuZGVyRnVuY3Rpb24iLCJzZWxlY3RlZElkIiwiU3RyaW5nIiwib25DaGVjayIsIm9uQ2xpY2siLCJyZW5kZXIiLCJpdGVtUmVuZGVyZXIiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFFQSxPQUFPQyxRQUFQLE1BQXFCLHVCQUFyQjtBQUNBLFNBQVNDLHNCQUFULFFBQXVDLGFBQXZDO0FBQ0EsT0FBTyx3QkFBUDs7SUFHcUJDLGM7Ozs7Ozs7Ozs7Ozs7O21FQUNKLFVBQUNDLEtBQUQsRUFBUUMsR0FBUixFQUFnQjtBQUFBLHdCQUNJLE1BQUtDLEtBRFQ7QUFBQSxVQUNyQkMsS0FEcUIsZUFDckJBLEtBRHFCO0FBQUEsVUFDZEMsYUFEYyxlQUNkQSxhQURjO0FBRTdCLFVBQU1DLElBQUksR0FBR0YsS0FBSyxDQUFDSCxLQUFELENBQWxCO0FBQ0EsVUFBTU0sVUFBVSxHQUFHRCxJQUFJLENBQUNFLFFBQUwsSUFBaUJGLElBQUksQ0FBQ0UsUUFBTCxDQUFjQyxNQUFkLEdBQXVCLENBQTNEO0FBQ0EsVUFBTUMsT0FBTyxHQUFHLE1BQUtQLEtBQUwsQ0FBV1EsVUFBWCxJQUNiLE1BQUtSLEtBQUwsQ0FBV1MsVUFBWCxDQUFzQkMsT0FBdEIsQ0FBOEJQLElBQUksQ0FBQ1EsRUFBbkMsTUFBMkMsQ0FBQyxDQUQvQztBQUdBLGFBQ0Usb0JBQUMsUUFBRDtBQUNFLFFBQUEsR0FBRyxPQUFLWixHQURWO0FBRUUsUUFBQSxPQUFPLEVBQUVRLE9BRlg7QUFHRSxRQUFBLGFBQWEsRUFBRUwsYUFBYSxJQUFJRSxVQUhsQztBQUlFLFFBQUEsSUFBSSxFQUFFRCxJQUpSO0FBS0UsUUFBQSxrQkFBa0IsRUFBRSxNQUFLSCxLQUFMLENBQVdZLGtCQUxqQztBQU1FLFFBQUEsUUFBUSxFQUFFLE1BQUtaLEtBQUwsQ0FBV2EsVUFBWCxLQUEwQkMsTUFBTSxDQUFDWCxJQUFJLENBQUNRLEVBQU4sQ0FONUM7QUFPRSxRQUFBLE9BQU8sRUFBRSxNQUFLWCxLQUFMLENBQVdlLE9BUHRCO0FBUUUsUUFBQSxPQUFPLEVBQUUsTUFBS2YsS0FBTCxDQUFXZ0I7QUFSdEIsUUFERjtBQVdELEs7Ozs7Ozs7U0FFREMsTSxHQUFBLGtCQUFTO0FBQ1AsV0FDRTtBQUFLLE1BQUEsU0FBUyxFQUFDO0FBQWYsT0FDRSxpQ0FDRSxvQkFBQyxTQUFEO0FBQ0UsTUFBQSxZQUFZLEVBQUUsS0FBS0MsWUFEckI7QUFFRSxNQUFBLE1BQU0sRUFBRSxLQUFLbEIsS0FBTCxDQUFXQyxLQUFYLENBQWlCSyxNQUYzQjtBQUdFLE1BQUEsSUFBSSxFQUFDLFNBSFA7QUFJRSxNQUFBLGFBQWE7QUFKZixNQURGLENBREYsQ0FERjtBQVlELEc7OztFQWxDeUNkLEtBQUssQ0FBQzJCLGE7O1NBQTdCdEIsYztBQWdEckJBLGNBQWMsQ0FBQ3VCLFlBQWYsR0FBOEI7QUFDNUJaLEVBQUFBLFVBQVUsRUFBRSxLQURnQjtBQUU1QlAsRUFBQUEsS0FBSyxFQUFFLEVBRnFCO0FBRzVCVyxFQUFBQSxrQkFBa0IsRUFBRSxJQUhRO0FBSTVCSCxFQUFBQSxVQUFVLEVBQUUsRUFKZ0I7QUFLNUJQLEVBQUFBLGFBQWEsRUFBRSxLQUxhO0FBTTVCVyxFQUFBQSxVQUFVLEVBQUUsSUFOZ0I7QUFPNUJFLEVBQUFBLE9BQU8sRUFBRSxtQkFBTSxDQUFFLENBUFc7QUFRNUJDLEVBQUFBLE9BQU8sRUFBRSxtQkFBTSxDQUFFO0FBUlcsQ0FBOUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdExpc3QgZnJvbSAncmVhY3QtbGlzdCc7XG5cbmltcG9ydCBMaXN0SXRlbSBmcm9tICcuL2xpc3QtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgaGllcmFyY2h5SXRlbUxpc3RTaGFwZSB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCAnLi9zZWxlY3RhYmxlLWxpc3Quc2Nzcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0YWJsZUxpc3QgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgaXRlbVJlbmRlcmVyID0gKGluZGV4LCBrZXkpID0+IHtcbiAgICBjb25zdCB7IGl0ZW1zLCBjaGVja0Rpc2FibGVkIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1tpbmRleF07XG4gICAgY29uc3QgaXNDaGlsZHJlbiA9IGl0ZW0uY2hpbGRyZW4gJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwO1xuICAgIGNvbnN0IGNoZWNrZWQgPSB0aGlzLnByb3BzLmNoZWNrZWRBbGxcbiAgICB8fCB0aGlzLnByb3BzLmNoZWNrZWRJZHMuaW5kZXhPZihpdGVtLmlkKSAhPT0gLTE7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPExpc3RJdGVtXG4gICAgICAgIGtleT17YCR7a2V5fWB9XG4gICAgICAgIGNoZWNrZWQ9e2NoZWNrZWR9XG4gICAgICAgIGNoZWNrRGlzYWJsZWQ9e2NoZWNrRGlzYWJsZWQgfHwgaXNDaGlsZHJlbn1cbiAgICAgICAgaXRlbT17aXRlbX1cbiAgICAgICAgaXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLml0ZW1SZW5kZXJGdW5jdGlvbn1cbiAgICAgICAgc2VsZWN0ZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWRJZCA9PT0gU3RyaW5nKGl0ZW0uaWQpfVxuICAgICAgICBvbkNoZWNrPXt0aGlzLnByb3BzLm9uQ2hlY2t9XG4gICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25DbGlja31cbiAgICAgIC8+KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1zZWxlY3RhYmxlLWxpc3Qtd3JhcHBlclwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxSZWFjdExpc3RcbiAgICAgICAgICAgIGl0ZW1SZW5kZXJlcj17dGhpcy5pdGVtUmVuZGVyZXJ9XG4gICAgICAgICAgICBsZW5ndGg9e3RoaXMucHJvcHMuaXRlbXMubGVuZ3RofVxuICAgICAgICAgICAgdHlwZT1cInVuaWZvcm1cIlxuICAgICAgICAgICAgdXNlU3RhdGljU2l6ZVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5TZWxlY3RhYmxlTGlzdC5wcm9wVHlwZXMgPSB7XG4gIGNoZWNrZWRBbGw6IFByb3BUeXBlcy5ib29sLFxuICBpdGVtczogaGllcmFyY2h5SXRlbUxpc3RTaGFwZSxcbiAgaXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgY2hlY2tlZElkczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm51bWJlciksXG4gIGNoZWNrRGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICBzZWxlY3RlZElkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBvbkNoZWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5TZWxlY3RhYmxlTGlzdC5kZWZhdWx0UHJvcHMgPSB7XG4gIGNoZWNrZWRBbGw6IGZhbHNlLFxuICBpdGVtczogW10sXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcbiAgY2hlY2tlZElkczogW10sXG4gIGNoZWNrRGlzYWJsZWQ6IGZhbHNlLFxuICBzZWxlY3RlZElkOiBudWxsLFxuICBvbkNoZWNrOiAoKSA9PiB7fSxcbiAgb25DbGljazogKCkgPT4ge30sXG59O1xuIl19