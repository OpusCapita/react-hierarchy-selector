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
  onCheckListChange: function onCheckListChange() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdGFicy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlZpZXdUYWJzIiwicHJvcHMiLCJvblNlbGVjdEhhbmRsZXIiLCJrZXkiLCJzZXRTdGF0ZSIsImFjdGl2ZVRhYiIsImdldENvbnRlbnQiLCJpdGVtcyIsIml0ZW0iLCJ1bmRlZmluZWQiLCJnZXRWaWV3VGFiQ29udGVudCIsImRhdGFTb3VyY2VQcm92aWRlciIsImdldENvbnRlbnRXaXRoVGFicyIsInRhYnNJZCIsInVJZDgiLCJzdGF0ZSIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJpIiwiTnVtYmVyIiwidGl0bGUiLCJhbGxMYWJlbCIsImxpc3RJdGVtUmVuZGVyRnVuY3Rpb24iLCJzZWFyY2hQbGFjZUhvbGRlciIsIm9uQ2hlY2tMaXN0Q2hhbmdlIiwic2hvdWxkQ29tcG9uZW50VXBkYXRlIiwicmVuZGVyIiwibGVuZ3RoIiwiaGlkZVNpbmdsZVRhYiIsIkNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7O0lBRXFCQSxROzs7QUFDbkIsb0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsNEJBQU1BLEtBQU4sQ0FEaUI7O0FBQUEsVUFZbkJDLGVBWm1CLEdBWUQsVUFBQ0MsR0FBRCxFQUFTO0FBQ3pCLFlBQUtDLFFBQUwsQ0FBYyxFQUFFQyxXQUFXRixHQUFiLEVBQWQ7QUFDRCxLQWRrQjs7QUFBQSxVQWdCbkJHLFVBaEJtQixHQWdCTixZQUFNO0FBQUEsVUFDVEMsS0FEUyxHQUNDLE1BQUtOLEtBRE4sQ0FDVE0sS0FEUzs7QUFFakIsVUFBTUosTUFBTSxDQUFaO0FBQ0EsVUFBTUssT0FBT0QsTUFBTUosR0FBTixDQUFiOztBQUVBLGFBQU9LLFNBQVNDLFNBQVQsR0FBcUIsSUFBckIsR0FBNEIsTUFBS0MsaUJBQUwsQ0FBdUJQLE1BQU0sQ0FBN0IsRUFBZ0NLLEtBQUtHLGtCQUFyQyxDQUFuQztBQUNELEtBdEJrQjs7QUFBQSxVQXdCbkJDLGtCQXhCbUIsR0F3QkUsWUFBTTtBQUFBLFVBQ2pCTCxLQURpQixHQUNQLE1BQUtOLEtBREUsQ0FDakJNLEtBRGlCOztBQUV6QixVQUFNTSwyQkFBeUIsZ0JBQU1DLElBQU4sRUFBL0I7QUFDQSxhQUNFO0FBQUE7QUFBQTtBQUNFLHFCQUFXLE1BQUtDLEtBQUwsQ0FBV1YsU0FEeEI7QUFFRSx5QkFGRjtBQUdFLHFCQUFVLGlDQUhaO0FBSUUsY0FBSVEsTUFKTjtBQUtFLG9CQUFVLE1BQUtYO0FBTGpCO0FBT0djLGVBQU9DLElBQVAsQ0FBWVYsS0FBWixFQUFtQlcsR0FBbkIsQ0FBdUIsVUFBQ2YsR0FBRCxFQUFTO0FBQy9CLGNBQU1nQixJQUFJQyxPQUFPakIsR0FBUCxJQUFjLENBQXhCO0FBQ0EsY0FBTUssT0FBT0QsTUFBTUosR0FBTixDQUFiO0FBQ0EsaUJBQ0U7QUFBQTtBQUFBO0FBQ0UsZ0NBREY7QUFFRSxtQkFBS2dCLENBRlA7QUFHRSx3QkFBVUEsQ0FIWjtBQUlFLHFCQUFPWCxLQUFLYTtBQUpkO0FBTUcsa0JBQUtYLGlCQUFMLENBQXVCUyxDQUF2QixFQUEwQlgsS0FBS0csa0JBQS9CO0FBTkgsV0FERjtBQVVELFNBYkE7QUFQSCxPQURGO0FBd0JELEtBbkRrQjs7QUFBQSxVQXFEbkJELGlCQXJEbUIsR0FxREMsVUFBQ1MsQ0FBRCxFQUFJUixrQkFBSjtBQUFBLGFBQ2xCO0FBQ0Usa0JBQVUsTUFBS1YsS0FBTCxDQUFXcUIsUUFEdkI7QUFFRSxlQUFPSCxDQUZUO0FBR0UsZ0NBQXdCLE1BQUtsQixLQUFMLENBQVdzQixzQkFIckM7QUFJRSw0QkFBb0JaLGtCQUp0QjtBQUtFLDJCQUFtQixNQUFLVixLQUFMLENBQVd1QixpQkFMaEM7QUFNRSwyQkFBbUIsTUFBS3ZCLEtBQUwsQ0FBV3dCO0FBTmhDLFFBRGtCO0FBQUEsS0FyREQ7O0FBRWpCLFVBQUtWLEtBQUwsR0FBYTtBQUNYVixpQkFBVztBQURBLEtBQWI7QUFGaUI7QUFLbEI7O3FCQUVEcUIscUIsb0NBQXdCO0FBQ3RCO0FBQ0EsV0FBTyxJQUFQO0FBQ0QsRzs7cUJBc0REQyxNLHFCQUFTO0FBQ1AsV0FBTyxLQUFLMUIsS0FBTCxDQUFXTSxLQUFYLENBQWlCcUIsTUFBakIsS0FBNEIsQ0FBNUIsSUFBaUMsS0FBSzNCLEtBQUwsQ0FBVzRCLGFBQTVDLEdBQ0wsS0FBS3ZCLFVBQUwsRUFESyxHQUNlLEtBQUtNLGtCQUFMLEVBRHRCO0FBRUQsRzs7O0VBcEVtQyxnQkFBTWtCLFM7O2tCQUF2QjlCLFE7OztBQWdGckJBLFNBQVMrQixZQUFULEdBQXdCO0FBQ3RCVCxZQUFVLEtBRFk7QUFFdEJPLGlCQUFlLEtBRk87QUFHdEJOLDBCQUF3QixJQUhGO0FBSXRCQyxxQkFBbUIsV0FKRztBQUt0QkMscUJBQW1CLDZCQUFNLENBQUU7QUFMTCxDQUF4QiIsImZpbGUiOiJ0YWJzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCB7IFRhYnMsIFRhYiB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcblxyXG5pbXBvcnQgVmlld1RhYkNvbnRlbnQgZnJvbSAnLi90YWItY29udGVudC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyB0YWJPcHRpb25zVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzJztcclxuaW1wb3J0IFV0aWxzIGZyb20gJy4uLy4uL3V0aWxzJztcclxuXHJcbmltcG9ydCAnLi90YWJzLnNjc3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld1RhYnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBhY3RpdmVUYWI6IDEsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCkge1xyXG4gICAgLy8gc2hvdWxkIGJlIHVwZGF0ZWQgYWx3YXlzLiBSZWFsIHVwZGF0ZSBsb2dpYyBpcyBkZWxlZ2F0ZWQgdG8gY2hpbGRyZW5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgb25TZWxlY3RIYW5kbGVyID0gKGtleSkgPT4ge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGFjdGl2ZVRhYjoga2V5IH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29udGVudCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHsgaXRlbXMgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCBrZXkgPSAwO1xyXG4gICAgY29uc3QgaXRlbSA9IGl0ZW1zW2tleV07XHJcblxyXG4gICAgcmV0dXJuIGl0ZW0gPT09IHVuZGVmaW5lZCA/IG51bGwgOiB0aGlzLmdldFZpZXdUYWJDb250ZW50KGtleSArIDEsIGl0ZW0uZGF0YVNvdXJjZVByb3ZpZGVyKTtcclxuICB9XHJcblxyXG4gIGdldENvbnRlbnRXaXRoVGFicyA9ICgpID0+IHtcclxuICAgIGNvbnN0IHsgaXRlbXMgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCB0YWJzSWQgPSBgaHMtdmlldy10YWJzLSR7VXRpbHMudUlkOCgpfWA7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8VGFic1xyXG4gICAgICAgIGFjdGl2ZUtleT17dGhpcy5zdGF0ZS5hY3RpdmVUYWJ9XHJcbiAgICAgICAgYW5pbWF0aW9uXHJcbiAgICAgICAgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXZpZXctdGFic1wiXHJcbiAgICAgICAgaWQ9e3RhYnNJZH1cclxuICAgICAgICBvblNlbGVjdD17dGhpcy5vblNlbGVjdEhhbmRsZXJ9XHJcbiAgICAgID5cclxuICAgICAgICB7T2JqZWN0LmtleXMoaXRlbXMpLm1hcCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBpID0gTnVtYmVyKGtleSkgKyAxO1xyXG4gICAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2tleV07XHJcbiAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8VGFiXHJcbiAgICAgICAgICAgICAgbW91bnRPbkVudGVyXHJcbiAgICAgICAgICAgICAga2V5PXtpfVxyXG4gICAgICAgICAgICAgIGV2ZW50S2V5PXtpfVxyXG4gICAgICAgICAgICAgIHRpdGxlPXtpdGVtLnRpdGxlfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAge3RoaXMuZ2V0Vmlld1RhYkNvbnRlbnQoaSwgaXRlbS5kYXRhU291cmNlUHJvdmlkZXIpfVxyXG4gICAgICAgICAgICA8L1RhYj5cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSl9XHJcbiAgICAgIDwvVGFicz5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXRWaWV3VGFiQ29udGVudCA9IChpLCBkYXRhU291cmNlUHJvdmlkZXIpID0+IChcclxuICAgIDxWaWV3VGFiQ29udGVudFxyXG4gICAgICBhbGxMYWJlbD17dGhpcy5wcm9wcy5hbGxMYWJlbH1cclxuICAgICAgaW5kZXg9e2l9XHJcbiAgICAgIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb249e3RoaXMucHJvcHMubGlzdEl0ZW1SZW5kZXJGdW5jdGlvbn1cclxuICAgICAgZGF0YVNvdXJjZVByb3ZpZGVyPXtkYXRhU291cmNlUHJvdmlkZXJ9XHJcbiAgICAgIHNlYXJjaFBsYWNlSG9sZGVyPXt0aGlzLnByb3BzLnNlYXJjaFBsYWNlSG9sZGVyfVxyXG4gICAgICBvbkNoZWNrTGlzdENoYW5nZT17dGhpcy5wcm9wcy5vbkNoZWNrTGlzdENoYW5nZX1cclxuICAgIC8+XHJcbiAgKVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5sZW5ndGggPT09IDEgJiYgdGhpcy5wcm9wcy5oaWRlU2luZ2xlVGFiID9cclxuICAgICAgdGhpcy5nZXRDb250ZW50KCkgOiB0aGlzLmdldENvbnRlbnRXaXRoVGFicygpO1xyXG4gIH1cclxufVxyXG5cclxuVmlld1RhYnMucHJvcFR5cGVzID0ge1xyXG4gIGFsbExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG4gIGhpZGVTaW5nbGVUYWI6IFByb3BUeXBlcy5ib29sLFxyXG4gIGl0ZW1zOiBQcm9wVHlwZXMuYXJyYXlPZih0YWJPcHRpb25zVHlwZSkuaXNSZXF1aXJlZCxcclxuICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcclxuICBvbkNoZWNrTGlzdENoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgc2VhcmNoUGxhY2VIb2xkZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXHJcbn07XHJcblxyXG5WaWV3VGFicy5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgYWxsTGFiZWw6ICdBbGwnLFxyXG4gIGhpZGVTaW5nbGVUYWI6IGZhbHNlLFxyXG4gIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXHJcbiAgc2VhcmNoUGxhY2VIb2xkZXI6ICdTZWFyY2guLi4nLFxyXG4gIG9uQ2hlY2tMaXN0Q2hhbmdlOiAoKSA9PiB7fSxcclxufTtcclxuIl19