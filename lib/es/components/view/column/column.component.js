var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { Checkbox } from 'react-bootstrap';
import PropTypes from 'prop-types';

import SelectableList from '../../selectable-list';
import ColumnData from '../../../models/column/column-data';

import './column.scss';

var ViewColumn = function (_React$PureComponent) {
  _inherits(ViewColumn, _React$PureComponent);

  function ViewColumn(props) {
    _classCallCheck(this, ViewColumn);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.clickHandler = function (id, event) {
      _this.props.onClick(_this.props.index, id, event);
    };

    _this.checkHandler = function (id, checkState) {
      _this.props.onCheck(_this.props.referenceIds.slice(), id, checkState);
    };

    _this.checkAllHandler = function () {
      var newState = !_this.state.checkedAll;
      _this.props.onCheckAll(_this.props.referenceIds.slice(), newState);
      _this.setState({
        checkedAll: newState
      });
    };

    _this.renderWrapperFunction = function (index) {
      return function (item, defaultRenderFunction) {
        return _this.props.itemRenderFunction(index, item, defaultRenderFunction);
      };
    };

    _this.state = {
      checkedAll: _this.props.checkedAll
    };
    return _this;
  }

  ViewColumn.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.checkedAll !== this.props.checkedAll) {
      this.setState({
        checkedAll: nextProps.checkedAll
      });
    }
  };

  ViewColumn.prototype.render = function render() {
    // TODO: 'All' text should be passed here to show translated text.
    var disabledProperty = this.props.checkedAllDisabled ? { disabled: true } : null;
    return React.createElement(
      'div',
      { className: 'oc-hierarchy-selector-column' },
      React.createElement(
        'div',
        { className: 'oc-hierarchy-selector-column-all' },
        !this.props.checkedAllHidden ? React.createElement(
          Checkbox,
          _extends({
            onChange: this.checkAllHandler,
            checked: this.state.checkedAll
          }, disabledProperty),
          this.props.allLabel
        ) : null
      ),
      React.createElement(SelectableList, {
        checkedAll: this.props.checkedAll,
        checkDisabled: this.state.checkedAll,
        checkedIds: this.props.checkedIds,
        items: this.props.data.items,
        itemRenderFunction: this.props.itemRenderFunction ? this.renderWrapperFunction(this.props.index) : null,
        selectedId: this.props.selectedId,
        onCheck: this.checkHandler,
        onClick: this.clickHandler
      })
    );
  };

  return ViewColumn;
}(React.PureComponent);

export { ViewColumn as default };


ViewColumn.defaultProps = {
  allLabel: 'All',
  checkedAll: false,
  checkedAllDisabled: false,
  checkedAllHidden: false,
  data: new ColumnData(),
  itemRenderFunction: null,
  selectedId: null,
  referenceIds: [],
  onCheck: function onCheck() {},
  onCheckAll: function onCheckAll() {},
  onClick: function onClick() {},
  checkedIds: []
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvY29sdW1uL2NvbHVtbi5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiQ2hlY2tib3giLCJQcm9wVHlwZXMiLCJTZWxlY3RhYmxlTGlzdCIsIkNvbHVtbkRhdGEiLCJWaWV3Q29sdW1uIiwicHJvcHMiLCJjbGlja0hhbmRsZXIiLCJpZCIsImV2ZW50Iiwib25DbGljayIsImluZGV4IiwiY2hlY2tIYW5kbGVyIiwiY2hlY2tTdGF0ZSIsIm9uQ2hlY2siLCJyZWZlcmVuY2VJZHMiLCJzbGljZSIsImNoZWNrQWxsSGFuZGxlciIsIm5ld1N0YXRlIiwic3RhdGUiLCJjaGVja2VkQWxsIiwib25DaGVja0FsbCIsInNldFN0YXRlIiwicmVuZGVyV3JhcHBlckZ1bmN0aW9uIiwiaXRlbSIsImRlZmF1bHRSZW5kZXJGdW5jdGlvbiIsIml0ZW1SZW5kZXJGdW5jdGlvbiIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJyZW5kZXIiLCJkaXNhYmxlZFByb3BlcnR5IiwiY2hlY2tlZEFsbERpc2FibGVkIiwiZGlzYWJsZWQiLCJjaGVja2VkQWxsSGlkZGVuIiwiYWxsTGFiZWwiLCJjaGVja2VkSWRzIiwiZGF0YSIsIml0ZW1zIiwic2VsZWN0ZWRJZCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLFNBQVNDLFFBQVQsUUFBeUIsaUJBQXpCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0Qjs7QUFFQSxPQUFPQyxjQUFQLE1BQTJCLHVCQUEzQjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsb0NBQXZCOztBQUVBLE9BQU8sZUFBUDs7SUFFcUJDLFU7OztBQUNuQixzQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQSxV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QixJQU5JO0FBT3hCWSxjQUFZLElBUFk7QUFReEJ2QixnQkFBYyxFQVJVO0FBU3hCRCxXQUFTLG1CQUFNLENBQUUsQ0FUTztBQVV4Qk8sY0FBWSxzQkFBTSxDQUFFLENBVkk7QUFXeEJYLFdBQVMsbUJBQU0sQ0FBRSxDQVhPO0FBWXhCeUIsY0FBWTtBQVpZLENBQTFCIiwiZmlsZSI6ImNvbHVtbi5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQ2hlY2tib3ggfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IFNlbGVjdGFibGVMaXN0IGZyb20gJy4uLy4uL3NlbGVjdGFibGUtbGlzdCc7XG5pbXBvcnQgQ29sdW1uRGF0YSBmcm9tICcuLi8uLi8uLi9tb2RlbHMvY29sdW1uL2NvbHVtbi1kYXRhJztcblxuaW1wb3J0ICcuL2NvbHVtbi5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld0NvbHVtbiBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY2hlY2tlZEFsbDogdGhpcy5wcm9wcy5jaGVja2VkQWxsLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGlmIChuZXh0UHJvcHMuY2hlY2tlZEFsbCAhPT0gdGhpcy5wcm9wcy5jaGVja2VkQWxsKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY2hlY2tlZEFsbDogbmV4dFByb3BzLmNoZWNrZWRBbGwsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjbGlja0hhbmRsZXIgPSAoaWQsIGV2ZW50KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbkNsaWNrKHRoaXMucHJvcHMuaW5kZXgsIGlkLCBldmVudCk7XG4gIH1cblxuICBjaGVja0hhbmRsZXIgPSAoaWQsIGNoZWNrU3RhdGUpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2hlY2sodGhpcy5wcm9wcy5yZWZlcmVuY2VJZHMuc2xpY2UoKSwgaWQsIGNoZWNrU3RhdGUpO1xuICB9XG5cbiAgY2hlY2tBbGxIYW5kbGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IG5ld1N0YXRlID0gIXRoaXMuc3RhdGUuY2hlY2tlZEFsbDtcbiAgICB0aGlzLnByb3BzLm9uQ2hlY2tBbGwodGhpcy5wcm9wcy5yZWZlcmVuY2VJZHMuc2xpY2UoKSwgbmV3U3RhdGUpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY2hlY2tlZEFsbDogbmV3U3RhdGUsXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXJXcmFwcGVyRnVuY3Rpb24gPSBpbmRleCA9PiAoaXRlbSwgZGVmYXVsdFJlbmRlckZ1bmN0aW9uKSA9PlxuICAgIHRoaXMucHJvcHMuaXRlbVJlbmRlckZ1bmN0aW9uKGluZGV4LCBpdGVtLCBkZWZhdWx0UmVuZGVyRnVuY3Rpb24pO1xuXG4gIHJlbmRlcigpIHtcbiAgICAvLyBUT0RPOiAnQWxsJyB0ZXh0IHNob3VsZCBiZSBwYXNzZWQgaGVyZSB0byBzaG93IHRyYW5zbGF0ZWQgdGV4dC5cbiAgICBjb25zdCBkaXNhYmxlZFByb3BlcnR5ID0gdGhpcy5wcm9wcy5jaGVja2VkQWxsRGlzYWJsZWQgPyB7IGRpc2FibGVkOiB0cnVlIH0gOiBudWxsO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1jb2x1bW5cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItY29sdW1uLWFsbFwiPlxuICAgICAgICAgIHshdGhpcy5wcm9wcy5jaGVja2VkQWxsSGlkZGVuID9cbiAgICAgICAgICAgIDxDaGVja2JveFxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5jaGVja0FsbEhhbmRsZXJ9XG4gICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuY2hlY2tlZEFsbH1cbiAgICAgICAgICAgICAgey4uLmRpc2FibGVkUHJvcGVydHl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt0aGlzLnByb3BzLmFsbExhYmVsfVxuICAgICAgICAgICAgPC9DaGVja2JveD5cbiAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxTZWxlY3RhYmxlTGlzdFxuICAgICAgICAgIGNoZWNrZWRBbGw9e3RoaXMucHJvcHMuY2hlY2tlZEFsbH1cbiAgICAgICAgICBjaGVja0Rpc2FibGVkPXt0aGlzLnN0YXRlLmNoZWNrZWRBbGx9XG4gICAgICAgICAgY2hlY2tlZElkcz17dGhpcy5wcm9wcy5jaGVja2VkSWRzfVxuICAgICAgICAgIGl0ZW1zPXt0aGlzLnByb3BzLmRhdGEuaXRlbXN9XG4gICAgICAgICAgaXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLml0ZW1SZW5kZXJGdW5jdGlvbiA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcldyYXBwZXJGdW5jdGlvbih0aGlzLnByb3BzLmluZGV4KSA6IG51bGx9XG4gICAgICAgICAgc2VsZWN0ZWRJZD17dGhpcy5wcm9wcy5zZWxlY3RlZElkfVxuICAgICAgICAgIG9uQ2hlY2s9e3RoaXMuY2hlY2tIYW5kbGVyfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY2xpY2tIYW5kbGVyfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5WaWV3Q29sdW1uLnByb3BUeXBlcyA9IHtcbiAgYWxsTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIGNoZWNrZWRJZHM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpLFxuICBjaGVja2VkQWxsOiBQcm9wVHlwZXMuYm9vbCxcbiAgY2hlY2tlZEFsbERpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgY2hlY2tlZEFsbEhpZGRlbjogUHJvcFR5cGVzLmJvb2wsXG4gIGluZGV4OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gIGRhdGE6IFByb3BUeXBlcy5pbnN0YW5jZU9mKENvbHVtbkRhdGEpLFxuICBzZWxlY3RlZElkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICByZWZlcmVuY2VJZHM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5udW1iZXJdKSksXG4gIG9uQ2hlY2s6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNoZWNrQWxsOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5WaWV3Q29sdW1uLmRlZmF1bHRQcm9wcyA9IHtcbiAgYWxsTGFiZWw6ICdBbGwnLFxuICBjaGVja2VkQWxsOiBmYWxzZSxcbiAgY2hlY2tlZEFsbERpc2FibGVkOiBmYWxzZSxcbiAgY2hlY2tlZEFsbEhpZGRlbjogZmFsc2UsXG4gIGRhdGE6IG5ldyBDb2x1bW5EYXRhKCksXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcbiAgc2VsZWN0ZWRJZDogbnVsbCxcbiAgcmVmZXJlbmNlSWRzOiBbXSxcbiAgb25DaGVjazogKCkgPT4ge30sXG4gIG9uQ2hlY2tBbGw6ICgpID0+IHt9LFxuICBvbkNsaWNrOiAoKSA9PiB7fSxcbiAgY2hlY2tlZElkczogW10sXG59O1xuIl19