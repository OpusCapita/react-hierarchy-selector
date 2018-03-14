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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdGFicy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiVGFicyIsIlRhYiIsIlZpZXdUYWJDb250ZW50IiwidGFiT3B0aW9uc1R5cGUiLCJVdGlscyIsIlZpZXdUYWJzIiwicHJvcHMiLCJvblNlbGVjdEhhbmRsZXIiLCJrZXkiLCJzZXRTdGF0ZSIsImFjdGl2ZVRhYiIsImdldENvbnRlbnQiLCJpdGVtcyIsIml0ZW0iLCJ1bmRlZmluZWQiLCJnZXRWaWV3VGFiQ29udGVudCIsImRhdGFTb3VyY2VQcm92aWRlciIsImdldENvbnRlbnRXaXRoVGFicyIsInRhYnNJZCIsInVJZDgiLCJzdGF0ZSIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJpIiwiTnVtYmVyIiwidGl0bGUiLCJhbGxMYWJlbCIsImxpc3RJdGVtUmVuZGVyRnVuY3Rpb24iLCJzZWFyY2hQbGFjZUhvbGRlciIsIm9uQ2hlY2tMaXN0Q2hhbmdlIiwic2hvdWxkQ29tcG9uZW50VXBkYXRlIiwicmVuZGVyIiwibGVuZ3RoIiwiaGlkZVNpbmdsZVRhYiIsIkNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxJQUFULEVBQWVDLEdBQWYsUUFBMEIsaUJBQTFCOztBQUVBLE9BQU9DLGNBQVAsTUFBMkIseUJBQTNCO0FBQ0EsU0FBU0MsY0FBVCxRQUErQixhQUEvQjtBQUNBLE9BQU9DLEtBQVAsTUFBa0IsYUFBbEI7O0FBRUEsT0FBTyxhQUFQOztJQUVxQkMsUTs7O0FBQ25CLG9CQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLDRCQUFNQSxLQUFOLENBRGlCOztBQUFBLFVBWW5CQyxlQVptQixHQVlELFVBQUNDLEdBQUQsRUFBUztBQUN6QixZQUFLQyxRQUFMLENBQWMsRUFBRUMsV0FBV0YsR0FBYixFQUFkO0FBQ0QsS0Fka0I7O0FBQUEsVUFnQm5CRyxVQWhCbUIsR0FnQk4sWUFBTTtBQUFBLFVBQ1RDLEtBRFMsR0FDQyxNQUFLTixLQUROLENBQ1RNLEtBRFM7O0FBRWpCLFVBQU1KLE1BQU0sQ0FBWjtBQUNBLFVBQU1LLE9BQU9ELE1BQU1KLEdBQU4sQ0FBYjs7QUFFQSxhQUFPSyxTQUFTQyxTQUFULEdBQXFCLElBQXJCLEdBQTRCLE1BQUtDLGlCQUFMLENBQXVCUCxNQUFNLENBQTdCLEVBQWdDSyxLQUFLRyxrQkFBckMsQ0FBbkM7QUFDRCxLQXRCa0I7O0FBQUEsVUF3Qm5CQyxrQkF4Qm1CLEdBd0JFLFlBQU07QUFBQSxVQUNqQkwsS0FEaUIsR0FDUCxNQUFLTixLQURFLENBQ2pCTSxLQURpQjs7QUFFekIsVUFBTU0sMkJBQXlCZCxNQUFNZSxJQUFOLEVBQS9CO0FBQ0EsYUFDRTtBQUFDLFlBQUQ7QUFBQTtBQUNFLHFCQUFXLE1BQUtDLEtBQUwsQ0FBV1YsU0FEeEI7QUFFRSx5QkFGRjtBQUdFLHFCQUFVLGlDQUhaO0FBSUUsY0FBSVEsTUFKTjtBQUtFLG9CQUFVLE1BQUtYO0FBTGpCO0FBT0djLGVBQU9DLElBQVAsQ0FBWVYsS0FBWixFQUFtQlcsR0FBbkIsQ0FBdUIsVUFBQ2YsR0FBRCxFQUFTO0FBQy9CLGNBQU1nQixJQUFJQyxPQUFPakIsR0FBUCxJQUFjLENBQXhCO0FBQ0EsY0FBTUssT0FBT0QsTUFBTUosR0FBTixDQUFiO0FBQ0EsaUJBQ0U7QUFBQyxlQUFEO0FBQUE7QUFDRSxnQ0FERjtBQUVFLG1CQUFLZ0IsQ0FGUDtBQUdFLHdCQUFVQSxDQUhaO0FBSUUscUJBQU9YLEtBQUthO0FBSmQ7QUFNRyxrQkFBS1gsaUJBQUwsQ0FBdUJTLENBQXZCLEVBQTBCWCxLQUFLRyxrQkFBL0I7QUFOSCxXQURGO0FBVUQsU0FiQTtBQVBILE9BREY7QUF3QkQsS0FuRGtCOztBQUFBLFVBcURuQkQsaUJBckRtQixHQXFEQyxVQUFDUyxDQUFELEVBQUlSLGtCQUFKO0FBQUEsYUFDbEIsb0JBQUMsY0FBRDtBQUNFLGtCQUFVLE1BQUtWLEtBQUwsQ0FBV3FCLFFBRHZCO0FBRUUsZUFBT0gsQ0FGVDtBQUdFLGdDQUF3QixNQUFLbEIsS0FBTCxDQUFXc0Isc0JBSHJDO0FBSUUsNEJBQW9CWixrQkFKdEI7QUFLRSwyQkFBbUIsTUFBS1YsS0FBTCxDQUFXdUIsaUJBTGhDO0FBTUUsMkJBQW1CLE1BQUt2QixLQUFMLENBQVd3QjtBQU5oQyxRQURrQjtBQUFBLEtBckREOztBQUVqQixVQUFLVixLQUFMLEdBQWE7QUFDWFYsaUJBQVc7QUFEQSxLQUFiO0FBRmlCO0FBS2xCOztxQkFFRHFCLHFCLG9DQUF3QjtBQUN0QjtBQUNBLFdBQU8sSUFBUDtBQUNELEc7O3FCQXNEREMsTSxxQkFBUztBQUNQLFdBQU8sS0FBSzFCLEtBQUwsQ0FBV00sS0FBWCxDQUFpQnFCLE1BQWpCLEtBQTRCLENBQTVCLElBQWlDLEtBQUszQixLQUFMLENBQVc0QixhQUE1QyxHQUNMLEtBQUt2QixVQUFMLEVBREssR0FDZSxLQUFLTSxrQkFBTCxFQUR0QjtBQUVELEc7OztFQXBFbUNuQixNQUFNcUMsUzs7U0FBdkI5QixROzs7QUFnRnJCQSxTQUFTK0IsWUFBVCxHQUF3QjtBQUN0QlQsWUFBVSxLQURZO0FBRXRCTyxpQkFBZSxLQUZPO0FBR3RCTiwwQkFBd0IsSUFIRjtBQUl0QkMscUJBQW1CLFdBSkc7QUFLdEJDLHFCQUFtQiw2QkFBTSxDQUFFO0FBTEwsQ0FBeEIiLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRhYnMsIFRhYiB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5cbmltcG9ydCBWaWV3VGFiQ29udGVudCBmcm9tICcuL3RhYi1jb250ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyB0YWJPcHRpb25zVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi91dGlscyc7XG5cbmltcG9ydCAnLi90YWJzLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3VGFicyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBhY3RpdmVUYWI6IDEsXG4gICAgfTtcbiAgfVxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpIHtcbiAgICAvLyBzaG91bGQgYmUgdXBkYXRlZCBhbHdheXMuIFJlYWwgdXBkYXRlIGxvZ2ljIGlzIGRlbGVnYXRlZCB0byBjaGlsZHJlblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgb25TZWxlY3RIYW5kbGVyID0gKGtleSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBhY3RpdmVUYWI6IGtleSB9KTtcbiAgfVxuXG4gIGdldENvbnRlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBpdGVtcyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBrZXkgPSAwO1xuICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1trZXldO1xuXG4gICAgcmV0dXJuIGl0ZW0gPT09IHVuZGVmaW5lZCA/IG51bGwgOiB0aGlzLmdldFZpZXdUYWJDb250ZW50KGtleSArIDEsIGl0ZW0uZGF0YVNvdXJjZVByb3ZpZGVyKTtcbiAgfVxuXG4gIGdldENvbnRlbnRXaXRoVGFicyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGl0ZW1zIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHRhYnNJZCA9IGBocy12aWV3LXRhYnMtJHtVdGlscy51SWQ4KCl9YDtcbiAgICByZXR1cm4gKFxuICAgICAgPFRhYnNcbiAgICAgICAgYWN0aXZlS2V5PXt0aGlzLnN0YXRlLmFjdGl2ZVRhYn1cbiAgICAgICAgYW5pbWF0aW9uXG4gICAgICAgIGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci12aWV3LXRhYnNcIlxuICAgICAgICBpZD17dGFic0lkfVxuICAgICAgICBvblNlbGVjdD17dGhpcy5vblNlbGVjdEhhbmRsZXJ9XG4gICAgICA+XG4gICAgICAgIHtPYmplY3Qua2V5cyhpdGVtcykubWFwKChrZXkpID0+IHtcbiAgICAgICAgICBjb25zdCBpID0gTnVtYmVyKGtleSkgKyAxO1xuICAgICAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1trZXldO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VGFiXG4gICAgICAgICAgICAgIG1vdW50T25FbnRlclxuICAgICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICAgIGV2ZW50S2V5PXtpfVxuICAgICAgICAgICAgICB0aXRsZT17aXRlbS50aXRsZX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3RoaXMuZ2V0Vmlld1RhYkNvbnRlbnQoaSwgaXRlbS5kYXRhU291cmNlUHJvdmlkZXIpfVxuICAgICAgICAgICAgPC9UYWI+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSl9XG4gICAgICA8L1RhYnM+XG4gICAgKTtcbiAgfVxuXG4gIGdldFZpZXdUYWJDb250ZW50ID0gKGksIGRhdGFTb3VyY2VQcm92aWRlcikgPT4gKFxuICAgIDxWaWV3VGFiQ29udGVudFxuICAgICAgYWxsTGFiZWw9e3RoaXMucHJvcHMuYWxsTGFiZWx9XG4gICAgICBpbmRleD17aX1cbiAgICAgIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb249e3RoaXMucHJvcHMubGlzdEl0ZW1SZW5kZXJGdW5jdGlvbn1cbiAgICAgIGRhdGFTb3VyY2VQcm92aWRlcj17ZGF0YVNvdXJjZVByb3ZpZGVyfVxuICAgICAgc2VhcmNoUGxhY2VIb2xkZXI9e3RoaXMucHJvcHMuc2VhcmNoUGxhY2VIb2xkZXJ9XG4gICAgICBvbkNoZWNrTGlzdENoYW5nZT17dGhpcy5wcm9wcy5vbkNoZWNrTGlzdENoYW5nZX1cbiAgICAvPlxuICApXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLml0ZW1zLmxlbmd0aCA9PT0gMSAmJiB0aGlzLnByb3BzLmhpZGVTaW5nbGVUYWIgP1xuICAgICAgdGhpcy5nZXRDb250ZW50KCkgOiB0aGlzLmdldENvbnRlbnRXaXRoVGFicygpO1xuICB9XG59XG5cblZpZXdUYWJzLnByb3BUeXBlcyA9IHtcbiAgYWxsTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIGhpZGVTaW5nbGVUYWI6IFByb3BUeXBlcy5ib29sLFxuICBpdGVtczogUHJvcFR5cGVzLmFycmF5T2YodGFiT3B0aW9uc1R5cGUpLmlzUmVxdWlyZWQsXG4gIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICBvbkNoZWNrTGlzdENoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxufTtcblxuVmlld1RhYnMuZGVmYXVsdFByb3BzID0ge1xuICBhbGxMYWJlbDogJ0FsbCcsXG4gIGhpZGVTaW5nbGVUYWI6IGZhbHNlLFxuICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxuICBzZWFyY2hQbGFjZUhvbGRlcjogJ1NlYXJjaC4uLicsXG4gIG9uQ2hlY2tMaXN0Q2hhbmdlOiAoKSA9PiB7fSxcbn07XG4iXX0=