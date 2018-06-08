'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

var _tabContent = require('./tab-content.component');

var _tabContent2 = _interopRequireDefault(_tabContent);

var _types = require('../../types');

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

require('./tabs.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

      var tabsId = 'hs-view-tabs-' + _utils2.default.uId8();
      return _react2.default.createElement(
        _reactBootstrap.Tabs,
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
          return _react2.default.createElement(
            _reactBootstrap.Tab,
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
      return _react2.default.createElement(_tabContent2.default, {
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
}(_react2.default.Component);

exports.default = ViewTabs;


ViewTabs.defaultProps = {
  allLabel: 'All',
  hideSingleTab: false,
  listItemRenderFunction: null,
  searchPlaceHolder: 'Search...',
  searchTooltip: null,
  onCheckListChange: function onCheckListChange() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdGFicy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlZpZXdUYWJzIiwicHJvcHMiLCJvblNlbGVjdEhhbmRsZXIiLCJrZXkiLCJzZXRTdGF0ZSIsImFjdGl2ZVRhYiIsImdldENvbnRlbnQiLCJpdGVtcyIsIml0ZW0iLCJ1bmRlZmluZWQiLCJnZXRWaWV3VGFiQ29udGVudCIsImRhdGFTb3VyY2VQcm92aWRlciIsImdldENvbnRlbnRXaXRoVGFicyIsInRhYnNJZCIsInVJZDgiLCJzdGF0ZSIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJpIiwiTnVtYmVyIiwidGl0bGUiLCJhbGxMYWJlbCIsImxpc3RJdGVtUmVuZGVyRnVuY3Rpb24iLCJzZWFyY2hQbGFjZUhvbGRlciIsInNlYXJjaFRvb2x0aXAiLCJvbkNoZWNrTGlzdENoYW5nZSIsInNob3VsZENvbXBvbmVudFVwZGF0ZSIsInJlbmRlciIsImxlbmd0aCIsImhpZGVTaW5nbGVUYWIiLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztJQUVxQkEsUTs7O0FBQ25CLG9CQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLDRCQUFNQSxLQUFOLENBRGlCOztBQUFBLFVBWW5CQyxlQVptQixHQVlELFVBQUNDLEdBQUQsRUFBUztBQUN6QixZQUFLQyxRQUFMLENBQWMsRUFBRUMsV0FBV0YsR0FBYixFQUFkO0FBQ0QsS0Fka0I7O0FBQUEsVUFnQm5CRyxVQWhCbUIsR0FnQk4sWUFBTTtBQUFBLFVBQ1RDLEtBRFMsR0FDQyxNQUFLTixLQUROLENBQ1RNLEtBRFM7O0FBRWpCLFVBQU1KLE1BQU0sQ0FBWjtBQUNBLFVBQU1LLE9BQU9ELE1BQU1KLEdBQU4sQ0FBYjs7QUFFQSxhQUFPSyxTQUFTQyxTQUFULEdBQXFCLElBQXJCLEdBQTRCLE1BQUtDLGlCQUFMLENBQXVCUCxNQUFNLENBQTdCLEVBQWdDSyxLQUFLRyxrQkFBckMsQ0FBbkM7QUFDRCxLQXRCa0I7O0FBQUEsVUF3Qm5CQyxrQkF4Qm1CLEdBd0JFLFlBQU07QUFBQSxVQUNqQkwsS0FEaUIsR0FDUCxNQUFLTixLQURFLENBQ2pCTSxLQURpQjs7QUFFekIsVUFBTU0sMkJBQXlCLGdCQUFNQyxJQUFOLEVBQS9CO0FBQ0EsYUFDRTtBQUFBO0FBQUE7QUFDRSxxQkFBVyxNQUFLQyxLQUFMLENBQVdWLFNBRHhCO0FBRUUseUJBRkY7QUFHRSxxQkFBVSxpQ0FIWjtBQUlFLGNBQUlRLE1BSk47QUFLRSxvQkFBVSxNQUFLWDtBQUxqQjtBQU9HYyxlQUFPQyxJQUFQLENBQVlWLEtBQVosRUFBbUJXLEdBQW5CLENBQXVCLFVBQUNmLEdBQUQsRUFBUztBQUMvQixjQUFNZ0IsSUFBSUMsT0FBT2pCLEdBQVAsSUFBYyxDQUF4QjtBQUNBLGNBQU1LLE9BQU9ELE1BQU1KLEdBQU4sQ0FBYjtBQUNBLGlCQUNFO0FBQUE7QUFBQTtBQUNFLGdDQURGO0FBRUUsbUJBQUtnQixDQUZQO0FBR0Usd0JBQVVBLENBSFo7QUFJRSxxQkFBT1gsS0FBS2E7QUFKZDtBQU1HLGtCQUFLWCxpQkFBTCxDQUF1QlMsQ0FBdkIsRUFBMEJYLEtBQUtHLGtCQUEvQjtBQU5ILFdBREY7QUFVRCxTQWJBO0FBUEgsT0FERjtBQXdCRCxLQW5Ea0I7O0FBQUEsVUFxRG5CRCxpQkFyRG1CLEdBcURDLFVBQUNTLENBQUQsRUFBSVIsa0JBQUo7QUFBQSxhQUNsQjtBQUNFLGtCQUFVLE1BQUtWLEtBQUwsQ0FBV3FCLFFBRHZCO0FBRUUsZUFBT0gsQ0FGVDtBQUdFLGdDQUF3QixNQUFLbEIsS0FBTCxDQUFXc0Isc0JBSHJDO0FBSUUsNEJBQW9CWixrQkFKdEI7QUFLRSwyQkFBbUIsTUFBS1YsS0FBTCxDQUFXdUIsaUJBTGhDO0FBTUUsdUJBQWUsTUFBS3ZCLEtBQUwsQ0FBV3dCLGFBTjVCO0FBT0UsMkJBQW1CLE1BQUt4QixLQUFMLENBQVd5QjtBQVBoQyxRQURrQjtBQUFBLEtBckREOztBQUVqQixVQUFLWCxLQUFMLEdBQWE7QUFDWFYsaUJBQVc7QUFEQSxLQUFiO0FBRmlCO0FBS2xCOztxQkFFRHNCLHFCLG9DQUF3QjtBQUN0QjtBQUNBLFdBQU8sSUFBUDtBQUNELEc7O3FCQXVEREMsTSxxQkFBUztBQUNQLFdBQU8sS0FBSzNCLEtBQUwsQ0FBV00sS0FBWCxDQUFpQnNCLE1BQWpCLEtBQTRCLENBQTVCLElBQWlDLEtBQUs1QixLQUFMLENBQVc2QixhQUE1QyxHQUNMLEtBQUt4QixVQUFMLEVBREssR0FDZSxLQUFLTSxrQkFBTCxFQUR0QjtBQUVELEc7OztFQXJFbUMsZ0JBQU1tQixTOztrQkFBdkIvQixROzs7QUFrRnJCQSxTQUFTZ0MsWUFBVCxHQUF3QjtBQUN0QlYsWUFBVSxLQURZO0FBRXRCUSxpQkFBZSxLQUZPO0FBR3RCUCwwQkFBd0IsSUFIRjtBQUl0QkMscUJBQW1CLFdBSkc7QUFLdEJDLGlCQUFlLElBTE87QUFNdEJDLHFCQUFtQiw2QkFBTSxDQUFFO0FBTkwsQ0FBeEIiLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRhYnMsIFRhYiB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5cbmltcG9ydCBWaWV3VGFiQ29udGVudCBmcm9tICcuL3RhYi1jb250ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyB0YWJPcHRpb25zVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi91dGlscyc7XG5cbmltcG9ydCAnLi90YWJzLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3VGFicyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBhY3RpdmVUYWI6IDEsXG4gICAgfTtcbiAgfVxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpIHtcbiAgICAvLyBzaG91bGQgYmUgdXBkYXRlZCBhbHdheXMuIFJlYWwgdXBkYXRlIGxvZ2ljIGlzIGRlbGVnYXRlZCB0byBjaGlsZHJlblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgb25TZWxlY3RIYW5kbGVyID0gKGtleSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBhY3RpdmVUYWI6IGtleSB9KTtcbiAgfVxuXG4gIGdldENvbnRlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBpdGVtcyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBrZXkgPSAwO1xuICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1trZXldO1xuXG4gICAgcmV0dXJuIGl0ZW0gPT09IHVuZGVmaW5lZCA/IG51bGwgOiB0aGlzLmdldFZpZXdUYWJDb250ZW50KGtleSArIDEsIGl0ZW0uZGF0YVNvdXJjZVByb3ZpZGVyKTtcbiAgfVxuXG4gIGdldENvbnRlbnRXaXRoVGFicyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGl0ZW1zIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHRhYnNJZCA9IGBocy12aWV3LXRhYnMtJHtVdGlscy51SWQ4KCl9YDtcbiAgICByZXR1cm4gKFxuICAgICAgPFRhYnNcbiAgICAgICAgYWN0aXZlS2V5PXt0aGlzLnN0YXRlLmFjdGl2ZVRhYn1cbiAgICAgICAgYW5pbWF0aW9uXG4gICAgICAgIGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci12aWV3LXRhYnNcIlxuICAgICAgICBpZD17dGFic0lkfVxuICAgICAgICBvblNlbGVjdD17dGhpcy5vblNlbGVjdEhhbmRsZXJ9XG4gICAgICA+XG4gICAgICAgIHtPYmplY3Qua2V5cyhpdGVtcykubWFwKChrZXkpID0+IHtcbiAgICAgICAgICBjb25zdCBpID0gTnVtYmVyKGtleSkgKyAxO1xuICAgICAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1trZXldO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VGFiXG4gICAgICAgICAgICAgIG1vdW50T25FbnRlclxuICAgICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICAgIGV2ZW50S2V5PXtpfVxuICAgICAgICAgICAgICB0aXRsZT17aXRlbS50aXRsZX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3RoaXMuZ2V0Vmlld1RhYkNvbnRlbnQoaSwgaXRlbS5kYXRhU291cmNlUHJvdmlkZXIpfVxuICAgICAgICAgICAgPC9UYWI+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSl9XG4gICAgICA8L1RhYnM+XG4gICAgKTtcbiAgfVxuXG4gIGdldFZpZXdUYWJDb250ZW50ID0gKGksIGRhdGFTb3VyY2VQcm92aWRlcikgPT4gKFxuICAgIDxWaWV3VGFiQ29udGVudFxuICAgICAgYWxsTGFiZWw9e3RoaXMucHJvcHMuYWxsTGFiZWx9XG4gICAgICBpbmRleD17aX1cbiAgICAgIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb249e3RoaXMucHJvcHMubGlzdEl0ZW1SZW5kZXJGdW5jdGlvbn1cbiAgICAgIGRhdGFTb3VyY2VQcm92aWRlcj17ZGF0YVNvdXJjZVByb3ZpZGVyfVxuICAgICAgc2VhcmNoUGxhY2VIb2xkZXI9e3RoaXMucHJvcHMuc2VhcmNoUGxhY2VIb2xkZXJ9XG4gICAgICBzZWFyY2hUb29sdGlwPXt0aGlzLnByb3BzLnNlYXJjaFRvb2x0aXB9XG4gICAgICBvbkNoZWNrTGlzdENoYW5nZT17dGhpcy5wcm9wcy5vbkNoZWNrTGlzdENoYW5nZX1cbiAgICAvPlxuICApXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLml0ZW1zLmxlbmd0aCA9PT0gMSAmJiB0aGlzLnByb3BzLmhpZGVTaW5nbGVUYWIgP1xuICAgICAgdGhpcy5nZXRDb250ZW50KCkgOiB0aGlzLmdldENvbnRlbnRXaXRoVGFicygpO1xuICB9XG59XG5cblZpZXdUYWJzLnByb3BUeXBlcyA9IHtcbiAgYWxsTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIGhpZGVTaW5nbGVUYWI6IFByb3BUeXBlcy5ib29sLFxuICBpdGVtczogUHJvcFR5cGVzLmFycmF5T2YodGFiT3B0aW9uc1R5cGUpLmlzUmVxdWlyZWQsXG4gIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICBvbkNoZWNrTGlzdENoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBzZWFyY2hUb29sdGlwOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZWxlbWVudCwgUHJvcFR5cGVzLnN0cmluZ10pLFxufTtcblxuVmlld1RhYnMuZGVmYXVsdFByb3BzID0ge1xuICBhbGxMYWJlbDogJ0FsbCcsXG4gIGhpZGVTaW5nbGVUYWI6IGZhbHNlLFxuICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxuICBzZWFyY2hQbGFjZUhvbGRlcjogJ1NlYXJjaC4uLicsXG4gIHNlYXJjaFRvb2x0aXA6IG51bGwsXG4gIG9uQ2hlY2tMaXN0Q2hhbmdlOiAoKSA9PiB7fSxcbn07XG4iXX0=