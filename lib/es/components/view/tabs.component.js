function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-bootstrap';
import ViewTabContent from './tab-content.component';
import { tabOptionsType } from '../../types';
import Utils from '../../utils';
import './tabs.scss';

var ViewTabs =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ViewTabs, _React$Component);

  function ViewTabs(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onSelectHandler", function (key) {
      _this.setState({
        activeTab: key
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getContent", function () {
      var items = _this.props.items;
      var key = 0;
      var item = items[key];
      return item === undefined ? null : _this.getViewTabContent(key + 1, item.dataSourceProvider);
    });

    _defineProperty(_assertThisInitialized(_this), "getContentWithTabs", function () {
      var items = _this.props.items;
      var tabsId = "hs-view-tabs-" + Utils.uId8();
      return React.createElement(Tabs, {
        activeKey: _this.state.activeTab,
        animation: true,
        className: "oc-hierarchy-selector-view-tabs",
        id: tabsId,
        onSelect: _this.onSelectHandler
      }, Object.keys(items).map(function (key) {
        var i = Number(key) + 1;
        var item = items[key];
        return React.createElement(Tab, {
          mountOnEnter: true,
          key: i,
          eventKey: i,
          title: item.title
        }, _this.getViewTabContent(i, item.dataSourceProvider));
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "getViewTabContent", function (i, dataSourceProvider) {
      return React.createElement(ViewTabContent, {
        allLabel: _this.props.allLabel,
        index: i,
        listItemRenderFunction: _this.props.listItemRenderFunction,
        dataSourceProvider: dataSourceProvider,
        searchPlaceHolder: _this.props.searchPlaceHolder,
        searchTooltip: _this.props.searchTooltip,
        onCheckListChange: _this.props.onCheckListChange
      });
    });

    _this.state = {
      activeTab: 1
    };
    return _this;
  }

  var _proto = ViewTabs.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate() {
    // should be updated always. Real update logic is delegated to children
    return true;
  };

  _proto.render = function render() {
    return this.props.items.length === 1 && this.props.hideSingleTab ? this.getContent() : this.getContentWithTabs();
  };

  return ViewTabs;
}(React.Component);

export { ViewTabs as default };
ViewTabs.defaultProps = {
  allLabel: 'All',
  hideSingleTab: false,
  listItemRenderFunction: null,
  searchPlaceHolder: 'Search...',
  searchTooltip: null,
  onCheckListChange: function onCheckListChange() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdGFicy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiVGFicyIsIlRhYiIsIlZpZXdUYWJDb250ZW50IiwidGFiT3B0aW9uc1R5cGUiLCJVdGlscyIsIlZpZXdUYWJzIiwicHJvcHMiLCJrZXkiLCJzZXRTdGF0ZSIsImFjdGl2ZVRhYiIsIml0ZW1zIiwiaXRlbSIsInVuZGVmaW5lZCIsImdldFZpZXdUYWJDb250ZW50IiwiZGF0YVNvdXJjZVByb3ZpZGVyIiwidGFic0lkIiwidUlkOCIsInN0YXRlIiwib25TZWxlY3RIYW5kbGVyIiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsImkiLCJOdW1iZXIiLCJ0aXRsZSIsImFsbExhYmVsIiwibGlzdEl0ZW1SZW5kZXJGdW5jdGlvbiIsInNlYXJjaFBsYWNlSG9sZGVyIiwic2VhcmNoVG9vbHRpcCIsIm9uQ2hlY2tMaXN0Q2hhbmdlIiwic2hvdWxkQ29tcG9uZW50VXBkYXRlIiwicmVuZGVyIiwibGVuZ3RoIiwiaGlkZVNpbmdsZVRhYiIsImdldENvbnRlbnQiLCJnZXRDb250ZW50V2l0aFRhYnMiLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsSUFBVCxFQUFlQyxHQUFmLFFBQTBCLGlCQUExQjtBQUVBLE9BQU9DLGNBQVAsTUFBMkIseUJBQTNCO0FBQ0EsU0FBU0MsY0FBVCxRQUErQixhQUEvQjtBQUNBLE9BQU9DLEtBQVAsTUFBa0IsYUFBbEI7QUFFQSxPQUFPLGFBQVA7O0lBRXFCQyxROzs7OztBQUNuQixvQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUNqQix3Q0FBTUEsS0FBTjs7QUFEaUIsc0VBWUQsVUFBQ0MsR0FBRCxFQUFTO0FBQ3pCLFlBQUtDLFFBQUwsQ0FB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QUpHO0FBS3RCQyxFQUFBQSxhQUFhLEVBQUUsSUFMTztBQU10QkMsRUFBQUEsaUJBQWlCLEVBQUUsNkJBQU0sQ0FBRTtBQU5MLENBQXhCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUYWJzLCBUYWIgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuXG5pbXBvcnQgVmlld1RhYkNvbnRlbnQgZnJvbSAnLi90YWItY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgdGFiT3B0aW9uc1R5cGUgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vdXRpbHMnO1xuXG5pbXBvcnQgJy4vdGFicy5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld1RhYnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgYWN0aXZlVGFiOiAxLFxuICAgIH07XG4gIH1cblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoKSB7XG4gICAgLy8gc2hvdWxkIGJlIHVwZGF0ZWQgYWx3YXlzLiBSZWFsIHVwZGF0ZSBsb2dpYyBpcyBkZWxlZ2F0ZWQgdG8gY2hpbGRyZW5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIG9uU2VsZWN0SGFuZGxlciA9IChrZXkpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgYWN0aXZlVGFiOiBrZXkgfSk7XG4gIH1cblxuICBnZXRDb250ZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgaXRlbXMgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qga2V5ID0gMDtcbiAgICBjb25zdCBpdGVtID0gaXRlbXNba2V5XTtcblxuICAgIHJldHVybiBpdGVtID09PSB1bmRlZmluZWQgPyBudWxsIDogdGhpcy5nZXRWaWV3VGFiQ29udGVudChrZXkgKyAxLCBpdGVtLmRhdGFTb3VyY2VQcm92aWRlcik7XG4gIH1cblxuICBnZXRDb250ZW50V2l0aFRhYnMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBpdGVtcyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB0YWJzSWQgPSBgaHMtdmlldy10YWJzLSR7VXRpbHMudUlkOCgpfWA7XG4gICAgcmV0dXJuIChcbiAgICAgIDxUYWJzXG4gICAgICAgIGFjdGl2ZUtleT17dGhpcy5zdGF0ZS5hY3RpdmVUYWJ9XG4gICAgICAgIGFuaW1hdGlvblxuICAgICAgICBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3Itdmlldy10YWJzXCJcbiAgICAgICAgaWQ9e3RhYnNJZH1cbiAgICAgICAgb25TZWxlY3Q9e3RoaXMub25TZWxlY3RIYW5kbGVyfVxuICAgICAgPlxuICAgICAgICB7T2JqZWN0LmtleXMoaXRlbXMpLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgICAgY29uc3QgaSA9IE51bWJlcihrZXkpICsgMTtcbiAgICAgICAgICBjb25zdCBpdGVtID0gaXRlbXNba2V5XTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFRhYlxuICAgICAgICAgICAgICBtb3VudE9uRW50ZXJcbiAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICBldmVudEtleT17aX1cbiAgICAgICAgICAgICAgdGl0bGU9e2l0ZW0udGl0bGV9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt0aGlzLmdldFZpZXdUYWJDb250ZW50KGksIGl0ZW0uZGF0YVNvdXJjZVByb3ZpZGVyKX1cbiAgICAgICAgICAgIDwvVGFiPlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC9UYWJzPlxuICAgICk7XG4gIH1cblxuICBnZXRWaWV3VGFiQ29udGVudCA9IChpLCBkYXRhU291cmNlUHJvdmlkZXIpID0+IChcbiAgICA8Vmlld1RhYkNvbnRlbnRcbiAgICAgIGFsbExhYmVsPXt0aGlzLnByb3BzLmFsbExhYmVsfVxuICAgICAgaW5kZXg9e2l9XG4gICAgICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLmxpc3RJdGVtUmVuZGVyRnVuY3Rpb259XG4gICAgICBkYXRhU291cmNlUHJvdmlkZXI9e2RhdGFTb3VyY2VQcm92aWRlcn1cbiAgICAgIHNlYXJjaFBsYWNlSG9sZGVyPXt0aGlzLnByb3BzLnNlYXJjaFBsYWNlSG9sZGVyfVxuICAgICAgc2VhcmNoVG9vbHRpcD17dGhpcy5wcm9wcy5zZWFyY2hUb29sdGlwfVxuICAgICAgb25DaGVja0xpc3RDaGFuZ2U9e3RoaXMucHJvcHMub25DaGVja0xpc3RDaGFuZ2V9XG4gICAgLz5cbiAgKVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5sZW5ndGggPT09IDEgJiYgdGhpcy5wcm9wcy5oaWRlU2luZ2xlVGFiID9cbiAgICAgIHRoaXMuZ2V0Q29udGVudCgpIDogdGhpcy5nZXRDb250ZW50V2l0aFRhYnMoKTtcbiAgfVxufVxuXG5WaWV3VGFicy5wcm9wVHlwZXMgPSB7XG4gIGFsbExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBoaWRlU2luZ2xlVGFiOiBQcm9wVHlwZXMuYm9vbCxcbiAgaXRlbXM6IFByb3BUeXBlcy5hcnJheU9mKHRhYk9wdGlvbnNUeXBlKS5pc1JlcXVpcmVkLFxuICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25DaGVja0xpc3RDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICBzZWFyY2hQbGFjZUhvbGRlcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgc2VhcmNoVG9vbHRpcDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmVsZW1lbnQsIFByb3BUeXBlcy5zdHJpbmddKSxcbn07XG5cblZpZXdUYWJzLmRlZmF1bHRQcm9wcyA9IHtcbiAgYWxsTGFiZWw6ICdBbGwnLFxuICBoaWRlU2luZ2xlVGFiOiBmYWxzZSxcbiAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcbiAgc2VhcmNoUGxhY2VIb2xkZXI6ICdTZWFyY2guLi4nLFxuICBzZWFyY2hUb29sdGlwOiBudWxsLFxuICBvbkNoZWNrTGlzdENoYW5nZTogKCkgPT4ge30sXG59O1xuIl19