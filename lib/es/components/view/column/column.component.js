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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvY29sdW1uL2NvbHVtbi5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiQ2hlY2tib3giLCJQcm9wVHlwZXMiLCJTZWxlY3RhYmxlTGlzdCIsIkNvbHVtbkRhdGEiLCJWaWV3Q29sdW1uIiwicHJvcHMiLCJjbGlja0hhbmRsZXIiLCJpZCIsImV2ZW50Iiwib25DbGljayIsImluZGV4IiwiY2hlY2tIYW5kbGVyIiwiY2hlY2tTdGF0ZSIsIm9uQ2hlY2siLCJyZWZlcmVuY2VJZHMiLCJzbGljZSIsImNoZWNrQWxsSGFuZGxlciIsIm5ld1N0YXRlIiwic3RhdGUiLCJjaGVja2VkQWxsIiwib25DaGVja0FsbCIsInNldFN0YXRlIiwicmVuZGVyV3JhcHBlckZ1bmN0aW9uIiwiaXRlbSIsImRlZmF1bHRSZW5kZXJGdW5jdGlvbiIsIml0ZW1SZW5kZXJGdW5jdGlvbiIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJyZW5kZXIiLCJkaXNhYmxlZFByb3BlcnR5IiwiY2hlY2tlZEFsbERpc2FibGVkIiwiZGlzYWJsZWQiLCJjaGVja2VkQWxsSGlkZGVuIiwiYWxsTGFiZWwiLCJjaGVja2VkSWRzIiwiZGF0YSIsIml0ZW1zIiwic2VsZWN0ZWRJZCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLFNBQVNDLFFBQVQsUUFBeUIsaUJBQXpCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0Qjs7QUFFQSxPQUFPQyxjQUFQLE1BQTJCLHVCQUEzQjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsb0NBQXZCOztBQUVBLE9BQU8sZUFBUDs7SUFFcUJDLFU7OztBQUNuQixzQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQSxV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QixJQU5JO0FBT3hCWSxjQUFZLElBUFk7QUFReEJ2QixnQkFBYyxFQVJVO0FBU3hCRCxXQUFTLG1CQUFNLENBQUUsQ0FUTztBQVV4Qk8sY0FBWSxzQkFBTSxDQUFFLENBVkk7QUFXeEJYLFdBQVMsbUJBQU0sQ0FBRSxDQVhPO0FBWXhCeUIsY0FBWTtBQVpZLENBQTFCIiwiZmlsZSI6ImNvbHVtbi5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBDaGVja2JveCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcblxyXG5pbXBvcnQgU2VsZWN0YWJsZUxpc3QgZnJvbSAnLi4vLi4vc2VsZWN0YWJsZS1saXN0JztcclxuaW1wb3J0IENvbHVtbkRhdGEgZnJvbSAnLi4vLi4vLi4vbW9kZWxzL2NvbHVtbi9jb2x1bW4tZGF0YSc7XHJcblxyXG5pbXBvcnQgJy4vY29sdW1uLnNjc3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld0NvbHVtbiBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBjaGVja2VkQWxsOiB0aGlzLnByb3BzLmNoZWNrZWRBbGwsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgIGlmIChuZXh0UHJvcHMuY2hlY2tlZEFsbCAhPT0gdGhpcy5wcm9wcy5jaGVja2VkQWxsKSB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIGNoZWNrZWRBbGw6IG5leHRQcm9wcy5jaGVja2VkQWxsLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNsaWNrSGFuZGxlciA9IChpZCwgZXZlbnQpID0+IHtcclxuICAgIHRoaXMucHJvcHMub25DbGljayh0aGlzLnByb3BzLmluZGV4LCBpZCwgZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tIYW5kbGVyID0gKGlkLCBjaGVja1N0YXRlKSA9PiB7XHJcbiAgICB0aGlzLnByb3BzLm9uQ2hlY2sodGhpcy5wcm9wcy5yZWZlcmVuY2VJZHMuc2xpY2UoKSwgaWQsIGNoZWNrU3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tBbGxIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbmV3U3RhdGUgPSAhdGhpcy5zdGF0ZS5jaGVja2VkQWxsO1xyXG4gICAgdGhpcy5wcm9wcy5vbkNoZWNrQWxsKHRoaXMucHJvcHMucmVmZXJlbmNlSWRzLnNsaWNlKCksIG5ld1N0YXRlKTtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBjaGVja2VkQWxsOiBuZXdTdGF0ZSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyV3JhcHBlckZ1bmN0aW9uID0gaW5kZXggPT4gKGl0ZW0sIGRlZmF1bHRSZW5kZXJGdW5jdGlvbikgPT5cclxuICAgIHRoaXMucHJvcHMuaXRlbVJlbmRlckZ1bmN0aW9uKGluZGV4LCBpdGVtLCBkZWZhdWx0UmVuZGVyRnVuY3Rpb24pO1xyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICAvLyBUT0RPOiAnQWxsJyB0ZXh0IHNob3VsZCBiZSBwYXNzZWQgaGVyZSB0byBzaG93IHRyYW5zbGF0ZWQgdGV4dC5cclxuICAgIGNvbnN0IGRpc2FibGVkUHJvcGVydHkgPSB0aGlzLnByb3BzLmNoZWNrZWRBbGxEaXNhYmxlZCA/IHsgZGlzYWJsZWQ6IHRydWUgfSA6IG51bGw7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1jb2x1bW5cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1jb2x1bW4tYWxsXCI+XHJcbiAgICAgICAgICB7IXRoaXMucHJvcHMuY2hlY2tlZEFsbEhpZGRlbiA/XHJcbiAgICAgICAgICAgIDxDaGVja2JveFxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmNoZWNrQWxsSGFuZGxlcn1cclxuICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnN0YXRlLmNoZWNrZWRBbGx9XHJcbiAgICAgICAgICAgICAgey4uLmRpc2FibGVkUHJvcGVydHl9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5hbGxMYWJlbH1cclxuICAgICAgICAgICAgPC9DaGVja2JveD5cclxuICAgICAgICAgICAgOiBudWxsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPFNlbGVjdGFibGVMaXN0XHJcbiAgICAgICAgICBjaGVja2VkQWxsPXt0aGlzLnByb3BzLmNoZWNrZWRBbGx9XHJcbiAgICAgICAgICBjaGVja0Rpc2FibGVkPXt0aGlzLnN0YXRlLmNoZWNrZWRBbGx9XHJcbiAgICAgICAgICBjaGVja2VkSWRzPXt0aGlzLnByb3BzLmNoZWNrZWRJZHN9XHJcbiAgICAgICAgICBpdGVtcz17dGhpcy5wcm9wcy5kYXRhLml0ZW1zfVxyXG4gICAgICAgICAgaXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLml0ZW1SZW5kZXJGdW5jdGlvbiA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyV3JhcHBlckZ1bmN0aW9uKHRoaXMucHJvcHMuaW5kZXgpIDogbnVsbH1cclxuICAgICAgICAgIHNlbGVjdGVkSWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWRJZH1cclxuICAgICAgICAgIG9uQ2hlY2s9e3RoaXMuY2hlY2tIYW5kbGVyfVxyXG4gICAgICAgICAgb25DbGljaz17dGhpcy5jbGlja0hhbmRsZXJ9XHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuVmlld0NvbHVtbi5wcm9wVHlwZXMgPSB7XHJcbiAgYWxsTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXHJcbiAgY2hlY2tlZElkczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm51bWJlciksXHJcbiAgY2hlY2tlZEFsbDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgY2hlY2tlZEFsbERpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcclxuICBjaGVja2VkQWxsSGlkZGVuOiBQcm9wVHlwZXMuYm9vbCxcclxuICBpbmRleDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgZGF0YTogUHJvcFR5cGVzLmluc3RhbmNlT2YoQ29sdW1uRGF0YSksXHJcbiAgc2VsZWN0ZWRJZDogUHJvcFR5cGVzLnN0cmluZyxcclxuICByZWZlcmVuY2VJZHM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5udW1iZXJdKSksXHJcbiAgb25DaGVjazogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgb25DaGVja0FsbDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXHJcbn07XHJcblxyXG5WaWV3Q29sdW1uLmRlZmF1bHRQcm9wcyA9IHtcclxuICBhbGxMYWJlbDogJ0FsbCcsXHJcbiAgY2hlY2tlZEFsbDogZmFsc2UsXHJcbiAgY2hlY2tlZEFsbERpc2FibGVkOiBmYWxzZSxcclxuICBjaGVja2VkQWxsSGlkZGVuOiBmYWxzZSxcclxuICBkYXRhOiBuZXcgQ29sdW1uRGF0YSgpLFxyXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcclxuICBzZWxlY3RlZElkOiBudWxsLFxyXG4gIHJlZmVyZW5jZUlkczogW10sXHJcbiAgb25DaGVjazogKCkgPT4ge30sXHJcbiAgb25DaGVja0FsbDogKCkgPT4ge30sXHJcbiAgb25DbGljazogKCkgPT4ge30sXHJcbiAgY2hlY2tlZElkczogW10sXHJcbn07XHJcbiJdfQ==