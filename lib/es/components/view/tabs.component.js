function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-bootstrap';

import ViewTabContent from './tab-content.component';
import { tabOptionsType } from '../../types';
import Utils from '../../utils';

import './tabs.scss';

var ViewTabs = function (_React$Component) {
  _inherits(ViewTabs, _React$Component);

  function ViewTabs(props) {
    _classCallCheck(this, ViewTabs);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onSelectHandler = function (key) {
      _this.setState({ activeTab: key });
    };

    _this.getContent = function () {
      var items = _this.props.items;

      var key = 0;
      var item = items[key];

      return item === undefined ? null : _this.getViewTabContent(key + 1, item.dataSourceProvider);
    };

    _this.getContentWithTabs = function () {
      var items = _this.props.items;

      var tabsId = 'hs-view-tabs-' + Utils.uId8();
      return React.createElement(
        Tabs,
        {
          activeKey: _this.state.activeTab,
          animation: true,
          className: 'oc-hierarchy-selector-view-tabs',
          id: tabsId,
          onSelect: _this.onSelectHandler
        },
        Object.keys(items).map(function (key) {
          var i = Number(key) + 1;
          var item = items[key];
          return React.createElement(
            Tab,
            {
              mountOnEnter: true,
              key: i,
              eventKey: i,
              title: item.title
            },
            _this.getViewTabContent(i, item.dataSourceProvider)
          );
        })
      );
    };

    _this.getViewTabContent = function (i, dataSourceProvider) {
      return React.createElement(ViewTabContent, {
        allLabel: _this.props.allLabel,
        index: i,
        listItemRenderFunction: _this.props.listItemRenderFunction,
        dataSourceProvider: dataSourceProvider,
        searchPlaceHolder: _this.props.searchPlaceHolder,
        searchTooltip: _this.props.searchTooltip,
        onCheckListChange: _this.props.onCheckListChange
      });
    };

    _this.state = {
      activeTab: 1
    };
    return _this;
  }

  ViewTabs.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
    // should be updated always. Real update logic is delegated to children
    return true;
  };

  ViewTabs.prototype.render = function render() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdGFicy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiVGFicyIsIlRhYiIsIlZpZXdUYWJDb250ZW50IiwidGFiT3B0aW9uc1R5cGUiLCJVdGlscyIsIlZpZXdUYWJzIiwicHJvcHMiLCJvblNlbGVjdEhhbmRsZXIiLCJrZXkiLCJzZXRTdGF0ZSIsImFjdGl2ZVRhYiIsImdldENvbnRlbnQiLCJpdGVtcyIsIml0ZW0iLCJ1bmRlZmluZWQiLCJnZXRWaWV3VGFiQ29udGVudCIsImRhdGFTb3VyY2VQcm92aWRlciIsImdldENvbnRlbnRXaXRoVGFicyIsInRhYnNJZCIsInVJZDgiLCJzdGF0ZSIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJpIiwiTnVtYmVyIiwidGl0bGUiLCJhbGxMYWJlbCIsImxpc3RJdGVtUmVuZGVyRnVuY3Rpb24iLCJzZWFyY2hQbGFjZUhvbGRlciIsInNlYXJjaFRvb2x0aXAiLCJvbkNoZWNrTGlzdENoYW5nZSIsInNob3VsZENvbXBvbmVudFVwZGF0ZSIsInJlbmRlciIsImxlbmd0aCIsImhpZGVTaW5nbGVUYWIiLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsSUFBVCxFQUFlQyxHQUFmLFFBQTBCLGlCQUExQjs7QUFFQSxPQUFPQyxjQUFQLE1BQTJCLHlCQUEzQjtBQUNBLFNBQVNDLGNBQVQsUUFBK0IsYUFBL0I7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLGFBQWxCOztBQUVBLE9BQU8sYUFBUDs7SUFFcUJDLFE7OztBQUNuQixvQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQiw0QkFBTUEsS0FBTixDQURpQjs7QUFBQSxVQVluQkMsZUFabUIsR0FZRCxVQUFDQyxHQUFELEVBQVM7QUFDekIsWUFBS0MsUUFBTCxDQUFjLEVBQUVDLFdBQVdGLEdBQWIsRUFBZDtBQUNELEtBZGtCOztBQUFBLFVBZ0JuQkcsVUFoQm1CLEdBZ0JOLFlBQU07QUFBQSxVQUNUQyxLQURTLEdBQ0MsTUFBS04sS0FETixDQUNUTSxLQURTOztBQUVqQixVQUFNSixNQUFNLENBQVo7QUFDQSxVQUFNSyxPQUFPRCxNQUFNSixHQUFOLENBQWI7O0FBRUEsYUFBT0ssU0FBU0MsU0FBVCxHQUFxQixJQUFyQixHQUE0QixNQUFLQyxpQkFBTCxDQUF1QlAsTUFBTSxDQUE3QixFQUFnQ0ssS0FBS0csa0JBQXJDLENBQW5DO0FBQ0QsS0F0QmtCOztBQUFBLFVBd0JuQkMsa0JBeEJtQixHQXdCRSxZQUFNO0FBQUEsVUFDakJMLEtBRGlCLEdBQ1AsTUFBS04sS0FERSxDQUNqQk0sS0FEaUI7O0FBRXpCLFVBQU1NLDJCQUF5QmQsTUFBTWUsSUFBTixFQUEvQjtBQUNBLGFBQ0U7QUFBQyxZQUFEO0FBQUE7QUFDRSxxQkFBVyxNQUFLQyxLQUFMLENBQVdWLFNBRHhCO0FBRUUseUJBRkY7QUFHRSxxQkFBVSxpQ0FIWjtBQUlFLGNBQUlRLE1BSk47QUFLRSxvQkFBVSxNQUFLWDtBQUxqQjtBQU9HYyxlQUFPQyxJQUFQLENBQVlWLEtBQVosRUFBbUJXLEdBQW5CLENBQXVCLFVBQUNmLEdBQUQsRUFBUztBQUMvQixjQUFNZ0IsSUFBSUMsT0FBT2pCLEdBQVAsSUFBYyxDQUF4QjtBQUNBLGNBQU1LLE9BQU9ELE1BQU1KLEdBQU4sQ0FBYjtBQUNBLGlCQUNFO0FBQUMsZUFBRDtBQUFBO0FBQ0UsZ0NBREY7QUFFRSxtQkFBS2dCLENBRlA7QUFHRSx3QkFBVUEsQ0FIWjtBQUlFLHFCQUFPWCxLQUFLYTtBQUpkO0FBTUcsa0JBQUtYLGlCQUFMLENBQXVCUyxDQUF2QixFQUEwQlgsS0FBS0csa0JBQS9CO0FBTkgsV0FERjtBQVVELFNBYkE7QUFQSCxPQURGO0FBd0JELEtBbkRrQjs7QUFBQSxVQXFEbkJELGlCQXJEbUIsR0FxREMsVUFBQ1MsQ0FBRCxFQUFJUixrQkFBSjtBQUFBLGFBQ2xCLG9CQUFDLGNBQUQ7QUFDRSxrQkFBVSxNQUFLVixLQUFMLENBQVdxQixRQUR2QjtBQUVFLGVBQU9ILENBRlQ7QUFHRSxnQ0FBd0IsTUFBS2xCLEtBQUwsQ0FBV3NCLHNCQUhyQztBQUlFLDRCQUFvQlosa0JBSnRCO0FBS0UsMkJBQW1CLE1BQUtWLEtBQUwsQ0FBV3VCLGlCQUxoQztBQU1FLHVCQUFlLE1BQUt2QixLQUFMLENBQVd3QixhQU41QjtBQU9FLDJCQUFtQixNQUFLeEIsS0FBTCxDQUFXeUI7QUFQaEMsUUFEa0I7QUFBQSxLQXJERDs7QUFFakIsVUFBS1gsS0FBTCxHQUFhO0FBQ1hWLGlCQUFXO0FBREEsS0FBYjtBQUZpQjtBQUtsQjs7cUJBRURzQixxQixvQ0FBd0I7QUFDdEI7QUFDQSxXQUFPLElBQVA7QUFDRCxHOztxQkF1RERDLE0scUJBQVM7QUFDUCxXQUFPLEtBQUszQixLQUFMLENBQVdNLEtBQVgsQ0FBaUJzQixNQUFqQixLQUE0QixDQUE1QixJQUFpQyxLQUFLNUIsS0FBTCxDQUFXNkIsYUFBNUMsR0FDTCxLQUFLeEIsVUFBTCxFQURLLEdBQ2UsS0FBS00sa0JBQUwsRUFEdEI7QUFFRCxHOzs7RUFyRW1DbkIsTUFBTXNDLFM7O1NBQXZCL0IsUTs7O0FBa0ZyQkEsU0FBU2dDLFlBQVQsR0FBd0I7QUFDdEJWLFlBQVUsS0FEWTtBQUV0QlEsaUJBQWUsS0FGTztBQUd0QlAsMEJBQXdCLElBSEY7QUFJdEJDLHFCQUFtQixXQUpHO0FBS3RCQyxpQkFBZSxJQUxPO0FBTXRCQyxxQkFBbUIsNkJBQU0sQ0FBRTtBQU5MLENBQXhCIiwiZmlsZSI6InRhYnMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUYWJzLCBUYWIgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuXG5pbXBvcnQgVmlld1RhYkNvbnRlbnQgZnJvbSAnLi90YWItY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgdGFiT3B0aW9uc1R5cGUgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vdXRpbHMnO1xuXG5pbXBvcnQgJy4vdGFicy5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld1RhYnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgYWN0aXZlVGFiOiAxLFxuICAgIH07XG4gIH1cblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoKSB7XG4gICAgLy8gc2hvdWxkIGJlIHVwZGF0ZWQgYWx3YXlzLiBSZWFsIHVwZGF0ZSBsb2dpYyBpcyBkZWxlZ2F0ZWQgdG8gY2hpbGRyZW5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIG9uU2VsZWN0SGFuZGxlciA9IChrZXkpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgYWN0aXZlVGFiOiBrZXkgfSk7XG4gIH1cblxuICBnZXRDb250ZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgaXRlbXMgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qga2V5ID0gMDtcbiAgICBjb25zdCBpdGVtID0gaXRlbXNba2V5XTtcblxuICAgIHJldHVybiBpdGVtID09PSB1bmRlZmluZWQgPyBudWxsIDogdGhpcy5nZXRWaWV3VGFiQ29udGVudChrZXkgKyAxLCBpdGVtLmRhdGFTb3VyY2VQcm92aWRlcik7XG4gIH1cblxuICBnZXRDb250ZW50V2l0aFRhYnMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBpdGVtcyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB0YWJzSWQgPSBgaHMtdmlldy10YWJzLSR7VXRpbHMudUlkOCgpfWA7XG4gICAgcmV0dXJuIChcbiAgICAgIDxUYWJzXG4gICAgICAgIGFjdGl2ZUtleT17dGhpcy5zdGF0ZS5hY3RpdmVUYWJ9XG4gICAgICAgIGFuaW1hdGlvblxuICAgICAgICBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3Itdmlldy10YWJzXCJcbiAgICAgICAgaWQ9e3RhYnNJZH1cbiAgICAgICAgb25TZWxlY3Q9e3RoaXMub25TZWxlY3RIYW5kbGVyfVxuICAgICAgPlxuICAgICAgICB7T2JqZWN0LmtleXMoaXRlbXMpLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgICAgY29uc3QgaSA9IE51bWJlcihrZXkpICsgMTtcbiAgICAgICAgICBjb25zdCBpdGVtID0gaXRlbXNba2V5XTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFRhYlxuICAgICAgICAgICAgICBtb3VudE9uRW50ZXJcbiAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICBldmVudEtleT17aX1cbiAgICAgICAgICAgICAgdGl0bGU9e2l0ZW0udGl0bGV9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt0aGlzLmdldFZpZXdUYWJDb250ZW50KGksIGl0ZW0uZGF0YVNvdXJjZVByb3ZpZGVyKX1cbiAgICAgICAgICAgIDwvVGFiPlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC9UYWJzPlxuICAgICk7XG4gIH1cblxuICBnZXRWaWV3VGFiQ29udGVudCA9IChpLCBkYXRhU291cmNlUHJvdmlkZXIpID0+IChcbiAgICA8Vmlld1RhYkNvbnRlbnRcbiAgICAgIGFsbExhYmVsPXt0aGlzLnByb3BzLmFsbExhYmVsfVxuICAgICAgaW5kZXg9e2l9XG4gICAgICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLmxpc3RJdGVtUmVuZGVyRnVuY3Rpb259XG4gICAgICBkYXRhU291cmNlUHJvdmlkZXI9e2RhdGFTb3VyY2VQcm92aWRlcn1cbiAgICAgIHNlYXJjaFBsYWNlSG9sZGVyPXt0aGlzLnByb3BzLnNlYXJjaFBsYWNlSG9sZGVyfVxuICAgICAgc2VhcmNoVG9vbHRpcD17dGhpcy5wcm9wcy5zZWFyY2hUb29sdGlwfVxuICAgICAgb25DaGVja0xpc3RDaGFuZ2U9e3RoaXMucHJvcHMub25DaGVja0xpc3RDaGFuZ2V9XG4gICAgLz5cbiAgKVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5sZW5ndGggPT09IDEgJiYgdGhpcy5wcm9wcy5oaWRlU2luZ2xlVGFiID9cbiAgICAgIHRoaXMuZ2V0Q29udGVudCgpIDogdGhpcy5nZXRDb250ZW50V2l0aFRhYnMoKTtcbiAgfVxufVxuXG5WaWV3VGFicy5wcm9wVHlwZXMgPSB7XG4gIGFsbExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBoaWRlU2luZ2xlVGFiOiBQcm9wVHlwZXMuYm9vbCxcbiAgaXRlbXM6IFByb3BUeXBlcy5hcnJheU9mKHRhYk9wdGlvbnNUeXBlKS5pc1JlcXVpcmVkLFxuICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25DaGVja0xpc3RDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICBzZWFyY2hQbGFjZUhvbGRlcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgc2VhcmNoVG9vbHRpcDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmVsZW1lbnQsIFByb3BUeXBlcy5zdHJpbmddKSxcbn07XG5cblZpZXdUYWJzLmRlZmF1bHRQcm9wcyA9IHtcbiAgYWxsTGFiZWw6ICdBbGwnLFxuICBoaWRlU2luZ2xlVGFiOiBmYWxzZSxcbiAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcbiAgc2VhcmNoUGxhY2VIb2xkZXI6ICdTZWFyY2guLi4nLFxuICBzZWFyY2hUb29sdGlwOiBudWxsLFxuICBvbkNoZWNrTGlzdENoYW5nZTogKCkgPT4ge30sXG59O1xuIl19