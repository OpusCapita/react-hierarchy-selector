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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdGFicy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlZpZXdUYWJzIiwicHJvcHMiLCJvblNlbGVjdEhhbmRsZXIiLCJrZXkiLCJzZXRTdGF0ZSIsImFjdGl2ZVRhYiIsImdldENvbnRlbnQiLCJpdGVtcyIsIml0ZW0iLCJ1bmRlZmluZWQiLCJnZXRWaWV3VGFiQ29udGVudCIsImRhdGFTb3VyY2VQcm92aWRlciIsImdldENvbnRlbnRXaXRoVGFicyIsInRhYnNJZCIsInVJZDgiLCJzdGF0ZSIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJpIiwiTnVtYmVyIiwidGl0bGUiLCJhbGxMYWJlbCIsImxpc3RJdGVtUmVuZGVyRnVuY3Rpb24iLCJzZWFyY2hQbGFjZUhvbGRlciIsIm9uQ2hlY2tMaXN0Q2hhbmdlIiwic2hvdWxkQ29tcG9uZW50VXBkYXRlIiwicmVuZGVyIiwibGVuZ3RoIiwiaGlkZVNpbmdsZVRhYiIsIkNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7O0lBRXFCQSxROzs7QUFDbkIsb0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsNEJBQU1BLEtBQU4sQ0FEaUI7O0FBQUEsVUFZbkJDLGVBWm1CLEdBWUQsVUFBQ0MsR0FBRCxFQUFTO0FBQ3pCLFlBQUtDLFFBQUwsQ0FBYyxFQUFFQyxXQUFXRixHQUFiLEVBQWQ7QUFDRCxLQWRrQjs7QUFBQSxVQWdCbkJHLFVBaEJtQixHQWdCTixZQUFNO0FBQUEsVUFDVEMsS0FEUyxHQUNDLE1BQUtOLEtBRE4sQ0FDVE0sS0FEUzs7QUFFakIsVUFBTUosTUFBTSxDQUFaO0FBQ0EsVUFBTUssT0FBT0QsTUFBTUosR0FBTixDQUFiOztBQUVBLGFBQU9LLFNBQVNDLFNBQVQsR0FBcUIsSUFBckIsR0FBNEIsTUFBS0MsaUJBQUwsQ0FBdUJQLE1BQU0sQ0FBN0IsRUFBZ0NLLEtBQUtHLGtCQUFyQyxDQUFuQztBQUNELEtBdEJrQjs7QUFBQSxVQXdCbkJDLGtCQXhCbUIsR0F3QkUsWUFBTTtBQUFBLFVBQ2pCTCxLQURpQixHQUNQLE1BQUtOLEtBREUsQ0FDakJNLEtBRGlCOztBQUV6QixVQUFNTSwyQkFBeUIsZ0JBQU1DLElBQU4sRUFBL0I7QUFDQSxhQUNFO0FBQUE7QUFBQTtBQUNFLHFCQUFXLE1BQUtDLEtBQUwsQ0FBV1YsU0FEeEI7QUFFRSx5QkFGRjtBQUdFLHFCQUFVLGlDQUhaO0FBSUUsY0FBSVEsTUFKTjtBQUtFLG9CQUFVLE1BQUtYO0FBTGpCO0FBT0djLGVBQU9DLElBQVAsQ0FBWVYsS0FBWixFQUFtQlcsR0FBbkIsQ0FBdUIsVUFBQ2YsR0FBRCxFQUFTO0FBQy9CLGNBQU1nQixJQUFJQyxPQUFPakIsR0FBUCxJQUFjLENBQXhCO0FBQ0EsY0FBTUssT0FBT0QsTUFBTUosR0FBTixDQUFiO0FBQ0EsaUJBQ0U7QUFBQTtBQUFBO0FBQ0UsZ0NBREY7QUFFRSxtQkFBS2dCLENBRlA7QUFHRSx3QkFBVUEsQ0FIWjtBQUlFLHFCQUFPWCxLQUFLYTtBQUpkO0FBTUcsa0JBQUtYLGlCQUFMLENBQXVCUyxDQUF2QixFQUEwQlgsS0FBS0csa0JBQS9CO0FBTkgsV0FERjtBQVVELFNBYkE7QUFQSCxPQURGO0FBd0JELEtBbkRrQjs7QUFBQSxVQXFEbkJELGlCQXJEbUIsR0FxREMsVUFBQ1MsQ0FBRCxFQUFJUixrQkFBSjtBQUFBLGFBQ2xCO0FBQ0Usa0JBQVUsTUFBS1YsS0FBTCxDQUFXcUIsUUFEdkI7QUFFRSxlQUFPSCxDQUZUO0FBR0UsZ0NBQXdCLE1BQUtsQixLQUFMLENBQVdzQixzQkFIckM7QUFJRSw0QkFBb0JaLGtCQUp0QjtBQUtFLDJCQUFtQixNQUFLVixLQUFMLENBQVd1QixpQkFMaEM7QUFNRSwyQkFBbUIsTUFBS3ZCLEtBQUwsQ0FBV3dCO0FBTmhDLFFBRGtCO0FBQUEsS0FyREQ7O0FBRWpCLFVBQUtWLEtBQUwsR0FBYTtBQUNYVixpQkFBVztBQURBLEtBQWI7QUFGaUI7QUFLbEI7O3FCQUVEcUIscUIsb0NBQXdCO0FBQ3RCO0FBQ0EsV0FBTyxJQUFQO0FBQ0QsRzs7cUJBc0REQyxNLHFCQUFTO0FBQ1AsV0FBTyxLQUFLMUIsS0FBTCxDQUFXTSxLQUFYLENBQWlCcUIsTUFBakIsS0FBNEIsQ0FBNUIsSUFBaUMsS0FBSzNCLEtBQUwsQ0FBVzRCLGFBQTVDLEdBQ0wsS0FBS3ZCLFVBQUwsRUFESyxHQUNlLEtBQUtNLGtCQUFMLEVBRHRCO0FBRUQsRzs7O0VBcEVtQyxnQkFBTWtCLFM7O2tCQUF2QjlCLFE7OztBQWdGckJBLFNBQVMrQixZQUFULEdBQXdCO0FBQ3RCVCxZQUFVLEtBRFk7QUFFdEJPLGlCQUFlLEtBRk87QUFHdEJOLDBCQUF3QixJQUhGO0FBSXRCQyxxQkFBbUIsV0FKRztBQUt0QkMscUJBQW1CLDZCQUFNLENBQUU7QUFMTCxDQUF4QiIsImZpbGUiOiJ0YWJzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVGFicywgVGFiIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcblxuaW1wb3J0IFZpZXdUYWJDb250ZW50IGZyb20gJy4vdGFiLWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IHRhYk9wdGlvbnNUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uLy4uL3V0aWxzJztcblxuaW1wb3J0ICcuL3RhYnMuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdUYWJzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGFjdGl2ZVRhYjogMSxcbiAgICB9O1xuICB9XG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCkge1xuICAgIC8vIHNob3VsZCBiZSB1cGRhdGVkIGFsd2F5cy4gUmVhbCB1cGRhdGUgbG9naWMgaXMgZGVsZWdhdGVkIHRvIGNoaWxkcmVuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBvblNlbGVjdEhhbmRsZXIgPSAoa2V5KSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGFjdGl2ZVRhYjoga2V5IH0pO1xuICB9XG5cbiAgZ2V0Q29udGVudCA9ICgpID0+IHtcbiAgICBjb25zdCB7IGl0ZW1zIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGtleSA9IDA7XG4gICAgY29uc3QgaXRlbSA9IGl0ZW1zW2tleV07XG5cbiAgICByZXR1cm4gaXRlbSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IHRoaXMuZ2V0Vmlld1RhYkNvbnRlbnQoa2V5ICsgMSwgaXRlbS5kYXRhU291cmNlUHJvdmlkZXIpO1xuICB9XG5cbiAgZ2V0Q29udGVudFdpdGhUYWJzID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgaXRlbXMgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgdGFic0lkID0gYGhzLXZpZXctdGFicy0ke1V0aWxzLnVJZDgoKX1gO1xuICAgIHJldHVybiAoXG4gICAgICA8VGFic1xuICAgICAgICBhY3RpdmVLZXk9e3RoaXMuc3RhdGUuYWN0aXZlVGFifVxuICAgICAgICBhbmltYXRpb25cbiAgICAgICAgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXZpZXctdGFic1wiXG4gICAgICAgIGlkPXt0YWJzSWR9XG4gICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0SGFuZGxlcn1cbiAgICAgID5cbiAgICAgICAge09iamVjdC5rZXlzKGl0ZW1zKS5tYXAoKGtleSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGkgPSBOdW1iZXIoa2V5KSArIDE7XG4gICAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2tleV07XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxUYWJcbiAgICAgICAgICAgICAgbW91bnRPbkVudGVyXG4gICAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgICAgZXZlbnRLZXk9e2l9XG4gICAgICAgICAgICAgIHRpdGxlPXtpdGVtLnRpdGxlfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7dGhpcy5nZXRWaWV3VGFiQ29udGVudChpLCBpdGVtLmRhdGFTb3VyY2VQcm92aWRlcil9XG4gICAgICAgICAgICA8L1RhYj5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgIDwvVGFicz5cbiAgICApO1xuICB9XG5cbiAgZ2V0Vmlld1RhYkNvbnRlbnQgPSAoaSwgZGF0YVNvdXJjZVByb3ZpZGVyKSA9PiAoXG4gICAgPFZpZXdUYWJDb250ZW50XG4gICAgICBhbGxMYWJlbD17dGhpcy5wcm9wcy5hbGxMYWJlbH1cbiAgICAgIGluZGV4PXtpfVxuICAgICAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbj17dGhpcy5wcm9wcy5saXN0SXRlbVJlbmRlckZ1bmN0aW9ufVxuICAgICAgZGF0YVNvdXJjZVByb3ZpZGVyPXtkYXRhU291cmNlUHJvdmlkZXJ9XG4gICAgICBzZWFyY2hQbGFjZUhvbGRlcj17dGhpcy5wcm9wcy5zZWFyY2hQbGFjZUhvbGRlcn1cbiAgICAgIG9uQ2hlY2tMaXN0Q2hhbmdlPXt0aGlzLnByb3BzLm9uQ2hlY2tMaXN0Q2hhbmdlfVxuICAgIC8+XG4gIClcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMubGVuZ3RoID09PSAxICYmIHRoaXMucHJvcHMuaGlkZVNpbmdsZVRhYiA/XG4gICAgICB0aGlzLmdldENvbnRlbnQoKSA6IHRoaXMuZ2V0Q29udGVudFdpdGhUYWJzKCk7XG4gIH1cbn1cblxuVmlld1RhYnMucHJvcFR5cGVzID0ge1xuICBhbGxMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgaGlkZVNpbmdsZVRhYjogUHJvcFR5cGVzLmJvb2wsXG4gIGl0ZW1zOiBQcm9wVHlwZXMuYXJyYXlPZih0YWJPcHRpb25zVHlwZSkuaXNSZXF1aXJlZCxcbiAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2hlY2tMaXN0Q2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgc2VhcmNoUGxhY2VIb2xkZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG59O1xuXG5WaWV3VGFicy5kZWZhdWx0UHJvcHMgPSB7XG4gIGFsbExhYmVsOiAnQWxsJyxcbiAgaGlkZVNpbmdsZVRhYjogZmFsc2UsXG4gIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiAnU2VhcmNoLi4uJyxcbiAgb25DaGVja0xpc3RDaGFuZ2U6ICgpID0+IHt9LFxufTtcbiJdfQ==