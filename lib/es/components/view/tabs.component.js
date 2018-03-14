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
  onCheckListChange: function onCheckListChange() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdGFicy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiVGFicyIsIlRhYiIsIlZpZXdUYWJDb250ZW50IiwidGFiT3B0aW9uc1R5cGUiLCJVdGlscyIsIlZpZXdUYWJzIiwicHJvcHMiLCJvblNlbGVjdEhhbmRsZXIiLCJrZXkiLCJzZXRTdGF0ZSIsImFjdGl2ZVRhYiIsImdldENvbnRlbnQiLCJpdGVtcyIsIml0ZW0iLCJ1bmRlZmluZWQiLCJnZXRWaWV3VGFiQ29udGVudCIsImRhdGFTb3VyY2VQcm92aWRlciIsImdldENvbnRlbnRXaXRoVGFicyIsInRhYnNJZCIsInVJZDgiLCJzdGF0ZSIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJpIiwiTnVtYmVyIiwidGl0bGUiLCJhbGxMYWJlbCIsImxpc3RJdGVtUmVuZGVyRnVuY3Rpb24iLCJzZWFyY2hQbGFjZUhvbGRlciIsIm9uQ2hlY2tMaXN0Q2hhbmdlIiwic2hvdWxkQ29tcG9uZW50VXBkYXRlIiwicmVuZGVyIiwibGVuZ3RoIiwiaGlkZVNpbmdsZVRhYiIsIkNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxJQUFULEVBQWVDLEdBQWYsUUFBMEIsaUJBQTFCOztBQUVBLE9BQU9DLGNBQVAsTUFBMkIseUJBQTNCO0FBQ0EsU0FBU0MsY0FBVCxRQUErQixhQUEvQjtBQUNBLE9BQU9DLEtBQVAsTUFBa0IsYUFBbEI7O0FBRUEsT0FBTyxhQUFQOztJQUVxQkMsUTs7O0FBQ25CLG9CQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLDRCQUFNQSxLQUFOLENBRGlCOztBQUFBLFVBWW5CQyxlQVptQixHQVlELFVBQUNDLEdBQUQsRUFBUztBQUN6QixZQUFLQyxRQUFMLENBQWMsRUFBRUMsV0FBV0YsR0FBYixFQUFkO0FBQ0QsS0Fka0I7O0FBQUEsVUFnQm5CRyxVQWhCbUIsR0FnQk4sWUFBTTtBQUFBLFVBQ1RDLEtBRFMsR0FDQyxNQUFLTixLQUROLENBQ1RNLEtBRFM7O0FBRWpCLFVBQU1KLE1BQU0sQ0FBWjtBQUNBLFVBQU1LLE9BQU9ELE1BQU1KLEdBQU4sQ0FBYjs7QUFFQSxhQUFPSyxTQUFTQyxTQUFULEdBQXFCLElBQXJCLEdBQTRCLE1BQUtDLGlCQUFMLENBQXVCUCxNQUFNLENBQTdCLEVBQWdDSyxLQUFLRyxrQkFBckMsQ0FBbkM7QUFDRCxLQXRCa0I7O0FBQUEsVUF3Qm5CQyxrQkF4Qm1CLEdBd0JFLFlBQU07QUFBQSxVQUNqQkwsS0FEaUIsR0FDUCxNQUFLTixLQURFLENBQ2pCTSxLQURpQjs7QUFFekIsVUFBTU0sMkJBQXlCZCxNQUFNZSxJQUFOLEVBQS9CO0FBQ0EsYUFDRTtBQUFDLFlBQUQ7QUFBQTtBQUNFLHFCQUFXLE1BQUtDLEtBQUwsQ0FBV1YsU0FEeEI7QUFFRSx5QkFGRjtBQUdFLHFCQUFVLGlDQUhaO0FBSUUsY0FBSVEsTUFKTjtBQUtFLG9CQUFVLE1BQUtYO0FBTGpCO0FBT0djLGVBQU9DLElBQVAsQ0FBWVYsS0FBWixFQUFtQlcsR0FBbkIsQ0FBdUIsVUFBQ2YsR0FBRCxFQUFTO0FBQy9CLGNBQU1nQixJQUFJQyxPQUFPakIsR0FBUCxJQUFjLENBQXhCO0FBQ0EsY0FBTUssT0FBT0QsTUFBTUosR0FBTixDQUFiO0FBQ0EsaUJBQ0U7QUFBQyxlQUFEO0FBQUE7QUFDRSxnQ0FERjtBQUVFLG1CQUFLZ0IsQ0FGUDtBQUdFLHdCQUFVQSxDQUhaO0FBSUUscUJBQU9YLEtBQUthO0FBSmQ7QUFNRyxrQkFBS1gsaUJBQUwsQ0FBdUJTLENBQXZCLEVBQTBCWCxLQUFLRyxrQkFBL0I7QUFOSCxXQURGO0FBVUQsU0FiQTtBQVBILE9BREY7QUF3QkQsS0FuRGtCOztBQUFBLFVBcURuQkQsaUJBckRtQixHQXFEQyxVQUFDUyxDQUFELEVBQUlSLGtCQUFKO0FBQUEsYUFDbEIsb0JBQUMsY0FBRDtBQUNFLGtCQUFVLE1BQUtWLEtBQUwsQ0FBV3FCLFFBRHZCO0FBRUUsZUFBT0gsQ0FGVDtBQUdFLGdDQUF3QixNQUFLbEIsS0FBTCxDQUFXc0Isc0JBSHJDO0FBSUUsNEJBQW9CWixrQkFKdEI7QUFLRSwyQkFBbUIsTUFBS1YsS0FBTCxDQUFXdUIsaUJBTGhDO0FBTUUsMkJBQW1CLE1BQUt2QixLQUFMLENBQVd3QjtBQU5oQyxRQURrQjtBQUFBLEtBckREOztBQUVqQixVQUFLVixLQUFMLEdBQWE7QUFDWFYsaUJBQVc7QUFEQSxLQUFiO0FBRmlCO0FBS2xCOztxQkFFRHFCLHFCLG9DQUF3QjtBQUN0QjtBQUNBLFdBQU8sSUFBUDtBQUNELEc7O3FCQXNEREMsTSxxQkFBUztBQUNQLFdBQU8sS0FBSzFCLEtBQUwsQ0FBV00sS0FBWCxDQUFpQnFCLE1BQWpCLEtBQTRCLENBQTVCLElBQWlDLEtBQUszQixLQUFMLENBQVc0QixhQUE1QyxHQUNMLEtBQUt2QixVQUFMLEVBREssR0FDZSxLQUFLTSxrQkFBTCxFQUR0QjtBQUVELEc7OztFQXBFbUNuQixNQUFNcUMsUzs7U0FBdkI5QixROzs7QUFnRnJCQSxTQUFTK0IsWUFBVCxHQUF3QjtBQUN0QlQsWUFBVSxLQURZO0FBRXRCTyxpQkFBZSxLQUZPO0FBR3RCTiwwQkFBd0IsSUFIRjtBQUl0QkMscUJBQW1CLFdBSkc7QUFLdEJDLHFCQUFtQiw2QkFBTSxDQUFFO0FBTEwsQ0FBeEIiLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5pbXBvcnQgeyBUYWJzLCBUYWIgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5cclxuaW1wb3J0IFZpZXdUYWJDb250ZW50IGZyb20gJy4vdGFiLWNvbnRlbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgdGFiT3B0aW9uc1R5cGUgfSBmcm9tICcuLi8uLi90eXBlcyc7XHJcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi91dGlscyc7XHJcblxyXG5pbXBvcnQgJy4vdGFicy5zY3NzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdUYWJzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgYWN0aXZlVGFiOiAxLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpIHtcclxuICAgIC8vIHNob3VsZCBiZSB1cGRhdGVkIGFsd2F5cy4gUmVhbCB1cGRhdGUgbG9naWMgaXMgZGVsZWdhdGVkIHRvIGNoaWxkcmVuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIG9uU2VsZWN0SGFuZGxlciA9IChrZXkpID0+IHtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBhY3RpdmVUYWI6IGtleSB9KTtcclxuICB9XHJcblxyXG4gIGdldENvbnRlbnQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB7IGl0ZW1zIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3Qga2V5ID0gMDtcclxuICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1trZXldO1xyXG5cclxuICAgIHJldHVybiBpdGVtID09PSB1bmRlZmluZWQgPyBudWxsIDogdGhpcy5nZXRWaWV3VGFiQ29udGVudChrZXkgKyAxLCBpdGVtLmRhdGFTb3VyY2VQcm92aWRlcik7XHJcbiAgfVxyXG5cclxuICBnZXRDb250ZW50V2l0aFRhYnMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB7IGl0ZW1zIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgdGFic0lkID0gYGhzLXZpZXctdGFicy0ke1V0aWxzLnVJZDgoKX1gO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPFRhYnNcclxuICAgICAgICBhY3RpdmVLZXk9e3RoaXMuc3RhdGUuYWN0aXZlVGFifVxyXG4gICAgICAgIGFuaW1hdGlvblxyXG4gICAgICAgIGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci12aWV3LXRhYnNcIlxyXG4gICAgICAgIGlkPXt0YWJzSWR9XHJcbiAgICAgICAgb25TZWxlY3Q9e3RoaXMub25TZWxlY3RIYW5kbGVyfVxyXG4gICAgICA+XHJcbiAgICAgICAge09iamVjdC5rZXlzKGl0ZW1zKS5tYXAoKGtleSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgaSA9IE51bWJlcihrZXkpICsgMTtcclxuICAgICAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1trZXldO1xyXG4gICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPFRhYlxyXG4gICAgICAgICAgICAgIG1vdW50T25FbnRlclxyXG4gICAgICAgICAgICAgIGtleT17aX1cclxuICAgICAgICAgICAgICBldmVudEtleT17aX1cclxuICAgICAgICAgICAgICB0aXRsZT17aXRlbS50aXRsZX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHt0aGlzLmdldFZpZXdUYWJDb250ZW50KGksIGl0ZW0uZGF0YVNvdXJjZVByb3ZpZGVyKX1cclxuICAgICAgICAgICAgPC9UYWI+XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0pfVxyXG4gICAgICA8L1RhYnM+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0Vmlld1RhYkNvbnRlbnQgPSAoaSwgZGF0YVNvdXJjZVByb3ZpZGVyKSA9PiAoXHJcbiAgICA8Vmlld1RhYkNvbnRlbnRcclxuICAgICAgYWxsTGFiZWw9e3RoaXMucHJvcHMuYWxsTGFiZWx9XHJcbiAgICAgIGluZGV4PXtpfVxyXG4gICAgICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLmxpc3RJdGVtUmVuZGVyRnVuY3Rpb259XHJcbiAgICAgIGRhdGFTb3VyY2VQcm92aWRlcj17ZGF0YVNvdXJjZVByb3ZpZGVyfVxyXG4gICAgICBzZWFyY2hQbGFjZUhvbGRlcj17dGhpcy5wcm9wcy5zZWFyY2hQbGFjZUhvbGRlcn1cclxuICAgICAgb25DaGVja0xpc3RDaGFuZ2U9e3RoaXMucHJvcHMub25DaGVja0xpc3RDaGFuZ2V9XHJcbiAgICAvPlxyXG4gIClcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMubGVuZ3RoID09PSAxICYmIHRoaXMucHJvcHMuaGlkZVNpbmdsZVRhYiA/XHJcbiAgICAgIHRoaXMuZ2V0Q29udGVudCgpIDogdGhpcy5nZXRDb250ZW50V2l0aFRhYnMoKTtcclxuICB9XHJcbn1cclxuXHJcblZpZXdUYWJzLnByb3BUeXBlcyA9IHtcclxuICBhbGxMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICBoaWRlU2luZ2xlVGFiOiBQcm9wVHlwZXMuYm9vbCxcclxuICBpdGVtczogUHJvcFR5cGVzLmFycmF5T2YodGFiT3B0aW9uc1R5cGUpLmlzUmVxdWlyZWQsXHJcbiAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgb25DaGVja0xpc3RDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxyXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG59O1xyXG5cclxuVmlld1RhYnMuZGVmYXVsdFByb3BzID0ge1xyXG4gIGFsbExhYmVsOiAnQWxsJyxcclxuICBoaWRlU2luZ2xlVGFiOiBmYWxzZSxcclxuICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxyXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiAnU2VhcmNoLi4uJyxcclxuICBvbkNoZWNrTGlzdENoYW5nZTogKCkgPT4ge30sXHJcbn07XHJcbiJdfQ==