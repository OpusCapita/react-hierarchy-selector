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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdGFicy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiVGFicyIsIlRhYiIsIlZpZXdUYWJDb250ZW50IiwidGFiT3B0aW9uc1R5cGUiLCJVdGlscyIsIlZpZXdUYWJzIiwicHJvcHMiLCJvblNlbGVjdEhhbmRsZXIiLCJrZXkiLCJzZXRTdGF0ZSIsImFjdGl2ZVRhYiIsImdldENvbnRlbnQiLCJpdGVtcyIsIml0ZW0iLCJ1bmRlZmluZWQiLCJnZXRWaWV3VGFiQ29udGVudCIsImRhdGFTb3VyY2VQcm92aWRlciIsImdldENvbnRlbnRXaXRoVGFicyIsInRhYnNJZCIsInVJZDgiLCJzdGF0ZSIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJpIiwiTnVtYmVyIiwidGl0bGUiLCJhbGxMYWJlbCIsImxpc3RJdGVtUmVuZGVyRnVuY3Rpb24iLCJzZWFyY2hQbGFjZUhvbGRlciIsInNlYXJjaFRvb2x0aXAiLCJvbkNoZWNrTGlzdENoYW5nZSIsInNob3VsZENvbXBvbmVudFVwZGF0ZSIsInJlbmRlciIsImxlbmd0aCIsImhpZGVTaW5nbGVUYWIiLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsSUFBVCxFQUFlQyxHQUFmLFFBQTBCLGlCQUExQjs7QUFFQSxPQUFPQyxjQUFQLE1BQTJCLHlCQUEzQjtBQUNBLFNBQVNDLGNBQVQsUUFBK0IsYUFBL0I7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLGFBQWxCOztBQUVBLE9BQU8sYUFBUDs7SUFFcUJDLFE7OztBQUNuQixvQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQiw0QkFBTUEsS0FBTixDQURpQjs7QUFBQSxVQVluQkMsZUFabUIsR0FZRCxVQUFDQyxHQUFELEVBQVM7QUFDekIsWUFBS0MsUUFBTCxDQUFjLEVBQUVDLFdBQVdGLEdBQWIsRUFBZDtBQUNELEtBZGtCOztBQUFBLFVBZ0JuQkcsVUFoQm1CLEdBZ0JOLFlBQU07QUFBQSxVQUNUQyxLQURTLEdBQ0MsTUFBS04sS0FETixDQUNUTSxLQURTOztBQUVqQixVQUFNSixNQUFNLENBQVo7QUFDQSxVQUFNSyxPQUFPRCxNQUFNSixHQUFOLENBQWI7O0FBRUEsYUFBT0ssU0FBU0MsU0FBVCxHQUFxQixJQUFyQixHQUE0QixNQUFLQyxpQkFBTCxDQUF1QlAsTUFBTSxDQUE3QixFQUFnQ0ssS0FBS0csa0JBQXJDLENBQW5DO0FBQ0QsS0F0QmtCOztBQUFBLFVBd0JuQkMsa0JBeEJtQixHQXdCRSxZQUFNO0FBQUEsVUFDakJMLEtBRGlCLEdBQ1AsTUFBS04sS0FERSxDQUNqQk0sS0FEaUI7O0FBRXpCLFVBQU1NLDJCQUF5QmQsTUFBTWUsSUFBTixFQUEvQjtBQUNBLGFBQ0U7QUFBQyxZQUFEO0FBQUE7QUFDRSxxQkFBVyxNQUFLQyxLQUFMLENBQVdWLFNBRHhCO0FBRUUseUJBRkY7QUFHRSxxQkFBVSxpQ0FIWjtBQUlFLGNBQUlRLE1BSk47QUFLRSxvQkFBVSxNQUFLWDtBQUxqQjtBQU9HYyxlQUFPQyxJQUFQLENBQVlWLEtBQVosRUFBbUJXLEdBQW5CLENBQXVCLFVBQUNmLEdBQUQsRUFBUztBQUMvQixjQUFNZ0IsSUFBSUMsT0FBT2pCLEdBQVAsSUFBYyxDQUF4QjtBQUNBLGNBQU1LLE9BQU9ELE1BQU1KLEdBQU4sQ0FBYjtBQUNBLGlCQUNFO0FBQUMsZUFBRDtBQUFBO0FBQ0UsZ0NBREY7QUFFRSxtQkFBS2dCLENBRlA7QUFHRSx3QkFBVUEsQ0FIWjtBQUlFLHFCQUFPWCxLQUFLYTtBQUpkO0FBTUcsa0JBQUtYLGlCQUFMLENBQXVCUyxDQUF2QixFQUEwQlgsS0FBS0csa0JBQS9CO0FBTkgsV0FERjtBQVVELFNBYkE7QUFQSCxPQURGO0FBd0JELEtBbkRrQjs7QUFBQSxVQXFEbkJELGlCQXJEbUIsR0FxREMsVUFBQ1MsQ0FBRCxFQUFJUixrQkFBSjtBQUFBLGFBQ2xCLG9CQUFDLGNBQUQ7QUFDRSxrQkFBVSxNQUFLVixLQUFMLENBQVdxQixRQUR2QjtBQUVFLGVBQU9ILENBRlQ7QUFHRSxnQ0FBd0IsTUFBS2xCLEtBQUwsQ0FBV3NCLHNCQUhyQztBQUlFLDRCQUFvQlosa0JBSnRCO0FBS0UsMkJBQW1CLE1BQUtWLEtBQUwsQ0FBV3VCLGlCQUxoQztBQU1FLHVCQUFlLE1BQUt2QixLQUFMLENBQVd3QixhQU41QjtBQU9FLDJCQUFtQixNQUFLeEIsS0FBTCxDQUFXeUI7QUFQaEMsUUFEa0I7QUFBQSxLQXJERDs7QUFFakIsVUFBS1gsS0FBTCxHQUFhO0FBQ1hWLGlCQUFXO0FBREEsS0FBYjtBQUZpQjtBQUtsQjs7cUJBRURzQixxQixvQ0FBd0I7QUFDdEI7QUFDQSxXQUFPLElBQVA7QUFDRCxHOztxQkF1RERDLE0scUJBQVM7QUFDUCxXQUFPLEtBQUszQixLQUFMLENBQVdNLEtBQVgsQ0FBaUJzQixNQUFqQixLQUE0QixDQUE1QixJQUFpQyxLQUFLNUIsS0FBTCxDQUFXNkIsYUFBNUMsR0FDTCxLQUFLeEIsVUFBTCxFQURLLEdBQ2UsS0FBS00sa0JBQUwsRUFEdEI7QUFFRCxHOzs7RUFyRW1DbkIsTUFBTXNDLFM7O1NBQXZCL0IsUTs7O0FBa0ZyQkEsU0FBU2dDLFlBQVQsR0FBd0I7QUFDdEJWLFlBQVUsS0FEWTtBQUV0QlEsaUJBQWUsS0FGTztBQUd0QlAsMEJBQXdCLElBSEY7QUFJdEJDLHFCQUFtQixXQUpHO0FBS3RCQyxpQkFBZSxJQUxPO0FBTXRCQyxxQkFBbUIsNkJBQU0sQ0FBRTtBQU5MLENBQXhCIiwiZmlsZSI6InRhYnMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IHsgVGFicywgVGFiIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuXHJcbmltcG9ydCBWaWV3VGFiQ29udGVudCBmcm9tICcuL3RhYi1jb250ZW50LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IHRhYk9wdGlvbnNUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vdXRpbHMnO1xyXG5cclxuaW1wb3J0ICcuL3RhYnMuc2Nzcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3VGFicyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGFjdGl2ZVRhYjogMSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoKSB7XHJcbiAgICAvLyBzaG91bGQgYmUgdXBkYXRlZCBhbHdheXMuIFJlYWwgdXBkYXRlIGxvZ2ljIGlzIGRlbGVnYXRlZCB0byBjaGlsZHJlblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBvblNlbGVjdEhhbmRsZXIgPSAoa2V5KSA9PiB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgYWN0aXZlVGFiOiBrZXkgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRDb250ZW50ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgeyBpdGVtcyB9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IGtleSA9IDA7XHJcbiAgICBjb25zdCBpdGVtID0gaXRlbXNba2V5XTtcclxuXHJcbiAgICByZXR1cm4gaXRlbSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IHRoaXMuZ2V0Vmlld1RhYkNvbnRlbnQoa2V5ICsgMSwgaXRlbS5kYXRhU291cmNlUHJvdmlkZXIpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29udGVudFdpdGhUYWJzID0gKCkgPT4ge1xyXG4gICAgY29uc3QgeyBpdGVtcyB9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IHRhYnNJZCA9IGBocy12aWV3LXRhYnMtJHtVdGlscy51SWQ4KCl9YDtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxUYWJzXHJcbiAgICAgICAgYWN0aXZlS2V5PXt0aGlzLnN0YXRlLmFjdGl2ZVRhYn1cclxuICAgICAgICBhbmltYXRpb25cclxuICAgICAgICBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3Itdmlldy10YWJzXCJcclxuICAgICAgICBpZD17dGFic0lkfVxyXG4gICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0SGFuZGxlcn1cclxuICAgICAgPlxyXG4gICAgICAgIHtPYmplY3Qua2V5cyhpdGVtcykubWFwKChrZXkpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGkgPSBOdW1iZXIoa2V5KSArIDE7XHJcbiAgICAgICAgICBjb25zdCBpdGVtID0gaXRlbXNba2V5XTtcclxuICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxUYWJcclxuICAgICAgICAgICAgICBtb3VudE9uRW50ZXJcclxuICAgICAgICAgICAgICBrZXk9e2l9XHJcbiAgICAgICAgICAgICAgZXZlbnRLZXk9e2l9XHJcbiAgICAgICAgICAgICAgdGl0bGU9e2l0ZW0udGl0bGV9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7dGhpcy5nZXRWaWV3VGFiQ29udGVudChpLCBpdGVtLmRhdGFTb3VyY2VQcm92aWRlcil9XHJcbiAgICAgICAgICAgIDwvVGFiPlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KX1cclxuICAgICAgPC9UYWJzPlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldFZpZXdUYWJDb250ZW50ID0gKGksIGRhdGFTb3VyY2VQcm92aWRlcikgPT4gKFxyXG4gICAgPFZpZXdUYWJDb250ZW50XHJcbiAgICAgIGFsbExhYmVsPXt0aGlzLnByb3BzLmFsbExhYmVsfVxyXG4gICAgICBpbmRleD17aX1cclxuICAgICAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbj17dGhpcy5wcm9wcy5saXN0SXRlbVJlbmRlckZ1bmN0aW9ufVxyXG4gICAgICBkYXRhU291cmNlUHJvdmlkZXI9e2RhdGFTb3VyY2VQcm92aWRlcn1cclxuICAgICAgc2VhcmNoUGxhY2VIb2xkZXI9e3RoaXMucHJvcHMuc2VhcmNoUGxhY2VIb2xkZXJ9XHJcbiAgICAgIHNlYXJjaFRvb2x0aXA9e3RoaXMucHJvcHMuc2VhcmNoVG9vbHRpcH1cclxuICAgICAgb25DaGVja0xpc3RDaGFuZ2U9e3RoaXMucHJvcHMub25DaGVja0xpc3RDaGFuZ2V9XHJcbiAgICAvPlxyXG4gIClcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMubGVuZ3RoID09PSAxICYmIHRoaXMucHJvcHMuaGlkZVNpbmdsZVRhYiA/XHJcbiAgICAgIHRoaXMuZ2V0Q29udGVudCgpIDogdGhpcy5nZXRDb250ZW50V2l0aFRhYnMoKTtcclxuICB9XHJcbn1cclxuXHJcblZpZXdUYWJzLnByb3BUeXBlcyA9IHtcclxuICBhbGxMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICBoaWRlU2luZ2xlVGFiOiBQcm9wVHlwZXMuYm9vbCxcclxuICBpdGVtczogUHJvcFR5cGVzLmFycmF5T2YodGFiT3B0aW9uc1R5cGUpLmlzUmVxdWlyZWQsXHJcbiAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgb25DaGVja0xpc3RDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxyXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG4gIHNlYXJjaFRvb2x0aXA6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5lbGVtZW50LCBQcm9wVHlwZXMuc3RyaW5nXSksXHJcbn07XHJcblxyXG5WaWV3VGFicy5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgYWxsTGFiZWw6ICdBbGwnLFxyXG4gIGhpZGVTaW5nbGVUYWI6IGZhbHNlLFxyXG4gIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXHJcbiAgc2VhcmNoUGxhY2VIb2xkZXI6ICdTZWFyY2guLi4nLFxyXG4gIHNlYXJjaFRvb2x0aXA6IG51bGwsXHJcbiAgb25DaGVja0xpc3RDaGFuZ2U6ICgpID0+IHt9LFxyXG59O1xyXG4iXX0=