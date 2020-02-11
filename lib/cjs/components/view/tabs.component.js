"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactBootstrap = require("react-bootstrap");

var _tabContent = _interopRequireDefault(require("./tab-content.component"));

var _types = require("../../types");

var _utils = _interopRequireDefault(require("../../utils"));

require("./tabs.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

      var tabsId = "hs-view-tabs-" + _utils["default"].uId8();

      return _react["default"].createElement(_reactBootstrap.Tabs, {
        activeKey: _this.state.activeTab,
        animation: true,
        className: "oc-hierarchy-selector-view-tabs",
        id: tabsId,
        onSelect: _this.onSelectHandler
      }, Object.keys(items).map(function (key) {
        var i = Number(key) + 1;
        var item = items[key];
        return _react["default"].createElement(_reactBootstrap.Tab, {
          mountOnEnter: true,
          key: i,
          eventKey: i,
          title: item.title
        }, _this.getViewTabContent(i, item.dataSourceProvider));
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "getViewTabContent", function (i, dataSourceProvider) {
      return _react["default"].createElement(_tabContent["default"], {
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
}(_react["default"].Component);

exports["default"] = ViewTabs;
ViewTabs.defaultProps = {
  allLabel: 'All',
  hideSingleTab: false,
  listItemRenderFunction: null,
  searchPlaceHolder: 'Search...',
  searchTooltip: null,
  onCheckListChange: function onCheckListChange() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdGFicy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlZpZXdUYWJzIiwicHJvcHMiLCJrZXkiLCJzZXRTdGF0ZSIsImFjdGl2ZVRhYiIsIml0ZW1zIiwiaXRlbSIsInVuZGVmaW5lZCIsImdldFZpZXdUYWJDb250ZW50IiwiZGF0YVNvdXJjZVByb3ZpZGVyIiwidGFic0lkIiwiVXRpbHMiLCJ1SWQ4Iiwic3RhdGUiLCJvblNlbGVjdEhhbmRsZXIiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwiaSIsIk51bWJlciIsInRpdGxlIiwiYWxsTGFiZWwiLCJsaXN0SXRlbVJlbmRlckZ1bmN0aW9uIiwic2VhcmNoUGxhY2VIb2xkZXIiLCJzZWFyY2hUb29sdGlwIiwib25DaGVja0xpc3RDaGFuZ2UiLCJzaG91bGRDb21wb25lbnRVcGRhdGUiLCJyZW5kZXIiLCJsZW5ndGgiLCJoaWRlU2luZ2xlVGFiIiwiZ2V0Q29udGVudCIsImdldENvbnRlbnRXaXRoVGFicyIsIlJlYWN0IiwiQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7Ozs7O0lBRXFCQSxROzs7OztBQUNuQixvQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUNqQix3Q0FBTUEsS0FBTjs7QUFEaUIsc0VBWUQsVUFBQ0MsR0FBRCxFQUFTO0FBQ3pCLFlBQUtDLFFBQUwsQ0FBYztBQUFFQyxRQUFBQSxTQUFTLEVBQUVGO0FBQWIsT0FBZDtBQUNELEtBZGtCOztBQUFBLGlFQWdCTixZQUFNO0FBQUEsVUFDVEcsS0FEUyxHQUNDLE1BQUtKLEtBRE4sQ0FDVEksS0FEUztBQUVqQixVQUFNSCxHQUFHLEdBQUcsQ0FBWjtBQUNBLFVBQU1JLElBQUksR0FBR0QsS0FBSyxDQUFDSCxHQUFELENBQWxCO0FBRUEsYUFBT0ksSUFBSSxLQUFLQyxTQUFULEdBQXFCLElBQXJCLEdBQTRCLE1BQUtDLGlCQUFMLENBQXVCTixHQUFHLEdBQUcsQ0FBN0IsRUFBZ0NJLElBQUksQ0FBQ0csa0JBQXJDLENBQW5DO0FBQ0QsS0F0QmtCOztBQUFBLHlFQXdCRSxZQUFNO0FBQUEsVUFDakJKLEtBRGlCLEdBQ1AsTUFBS0osS0FERSxDQUNqQkksS0FEaUI7O0FBRXpCLFVBQU1LLE1BQU0scUJBQW1CQyxrQkFBTUMsSUFBTixFQUEvQjs7QUFDQSxhQUNFLGdDQUFDLG9CQUFEO0FBQ0UsUUFBQSxTQUFTLEVBQUUsTUFBS0MsS0FBTCxDQUFXVCxTQUR4QjtBQUVFLFFBQUEsU0FBUyxNQUZYO0FBR0UsUUFBQSxTQUFTLEVBQUMsaUNBSFo7QUFJRSxRQUFBLEVBQUUsRUFBRU0sTUFKTjtBQUtFLFFBQUEsUUFBUSxFQUFFLE1BQUtJO0FBTGpCLFNBT0dDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZWCxLQUFaLEVBQW1CWSxHQUFuQixDQUF1QixVQUFDZixHQUFELEVBQVM7QUFDL0IsWUFBTWdCLENBQUMsR0FBR0MsTUFBTSxDQUFDakIsR0FBRCxDQUFOLEdBQWMsQ0FBeEI7QUFDQSxZQUFNSSxJQUFJLEdBQUdELEtBQUssQ0FBQ0gsR0FBRCxDQUFsQjtBQUNBLGVBQ0UsZ0NBQUMsbUJBQUQ7QUFDRSxVQUFBLFlBQVksTUFEZDtBQUVFLFVBQUEsR0FBRyxFQUFFZ0IsQ0FGUDtBQUdFLFVBQUEsUUFBUSxFQUFFQSxDQUhaO0FBSUUsVUFBQSxLQUFLLEVBQUVaLElBQUksQ0FBQ2M7QUFKZCxXQU1HLE1BQUtaLGlCQUFMLENBQXVCVSxDQUF2QixFQUEwQlosSUFBSSxDQUFDRyxrQkFBL0IsQ0FOSCxDQURGO0FBVUQsT0FiQSxDQVBILENBREY7QUF3QkQsS0FuRGtCOztBQUFBLHdFQXFEQyxVQUFDUyxDQUFELEVBQUlULGtCQUFKO0FBQUEsYUFDbEIsZ0NBQUMsc0JBQUQ7QUFDRSxRQUFBLFFBQVEsRUFBRSxNQUFLUixLQUFMLENBQVdvQixRQUR2QjtBQUVFLFFBQUEsS0FBSyxFQUFFSCxDQUZUO0FBR0UsUUFBQSxzQkFBc0IsRUFBRSxNQUFLakIsS0FBTCxDQUFXcUIsc0JBSHJDO0FBSUUsUUFBQSxrQkFBa0IsRUFBRWIsa0JBSnRCO0FBS0UsUUFBQSxpQkFBaUIsRUFBRSxNQUFLUixLQUFMLENBQVdzQixpQkFMaEM7QUFNRSxRQUFBLGFBQWEsRUFBRSxNQUFLdEIsS0FBTCxDQUFXdUIsYUFONUI7QUFPRSxRQUFBLGlCQUFpQixFQUFFLE1BQUt2QixLQUFMLENBQVd3QjtBQVBoQyxRQURrQjtBQUFBLEtBckREOztBQUVqQixVQUFLWixLQUFMLEdBQWE7QUFDWFQsTUFBQUEsU0FBUyxFQUFFO0FBREEsS0FBYjtBQUZpQjtBQUtsQjs7OztTQUVEc0IscUIsR0FBQSxpQ0FBd0I7QUFDdEI7QUFDQSxXQUFPLElBQVA7QUFDRCxHOztTQXVEREMsTSxHQUFBLGtCQUFTO0FBQ1AsV0FBTyxLQUFLMUIsS0FBTCxDQUFXSSxLQUFYLENBQWlCdUIsTUFBakIsS0FBNEIsQ0FBNUIsSUFBaUMsS0FBSzNCLEtBQUwsQ0FBVzRCLGFBQTVDLEdBQ0wsS0FBS0MsVUFBTCxFQURLLEdBQ2UsS0FBS0Msa0JBQUwsRUFEdEI7QUFFRCxHOzs7RUFyRW1DQyxrQkFBTUMsUzs7O0FBa0Y1Q2pDLFFBQVEsQ0FBQ2tDLFlBQVQsR0FBd0I7QUFDdEJiLEVBQUFBLFFBQVEsRUFBRSxLQURZO0FBRXRCUSxFQUFBQSxhQUFhLEVBQUUsS0FGTztBQUd0QlAsRUFBQUEsc0JBQXNCLEVBQUUsSUFIRjtBQUl0QkMsRUFBQUEsaUJBQWlCLEVBQUUsV0FKRztBQUt0QkMsRUFBQUEsYUFBYSxFQUFFLElBTE87QUFNdEJDLEVBQUFBLGlCQUFpQixFQUFFLDZCQUFNLENBQUU7QUFOTCxDQUF4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVGFicywgVGFiIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcblxuaW1wb3J0IFZpZXdUYWJDb250ZW50IGZyb20gJy4vdGFiLWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IHRhYk9wdGlvbnNUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uLy4uL3V0aWxzJztcblxuaW1wb3J0ICcuL3RhYnMuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdUYWJzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGFjdGl2ZVRhYjogMSxcbiAgICB9O1xuICB9XG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCkge1xuICAgIC8vIHNob3VsZCBiZSB1cGRhdGVkIGFsd2F5cy4gUmVhbCB1cGRhdGUgbG9naWMgaXMgZGVsZWdhdGVkIHRvIGNoaWxkcmVuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBvblNlbGVjdEhhbmRsZXIgPSAoa2V5KSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGFjdGl2ZVRhYjoga2V5IH0pO1xuICB9XG5cbiAgZ2V0Q29udGVudCA9ICgpID0+IHtcbiAgICBjb25zdCB7IGl0ZW1zIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGtleSA9IDA7XG4gICAgY29uc3QgaXRlbSA9IGl0ZW1zW2tleV07XG5cbiAgICByZXR1cm4gaXRlbSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IHRoaXMuZ2V0Vmlld1RhYkNvbnRlbnQoa2V5ICsgMSwgaXRlbS5kYXRhU291cmNlUHJvdmlkZXIpO1xuICB9XG5cbiAgZ2V0Q29udGVudFdpdGhUYWJzID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgaXRlbXMgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgdGFic0lkID0gYGhzLXZpZXctdGFicy0ke1V0aWxzLnVJZDgoKX1gO1xuICAgIHJldHVybiAoXG4gICAgICA8VGFic1xuICAgICAgICBhY3RpdmVLZXk9e3RoaXMuc3RhdGUuYWN0aXZlVGFifVxuICAgICAgICBhbmltYXRpb25cbiAgICAgICAgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXZpZXctdGFic1wiXG4gICAgICAgIGlkPXt0YWJzSWR9XG4gICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0SGFuZGxlcn1cbiAgICAgID5cbiAgICAgICAge09iamVjdC5rZXlzKGl0ZW1zKS5tYXAoKGtleSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGkgPSBOdW1iZXIoa2V5KSArIDE7XG4gICAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2tleV07XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxUYWJcbiAgICAgICAgICAgICAgbW91bnRPbkVudGVyXG4gICAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgICAgZXZlbnRLZXk9e2l9XG4gICAgICAgICAgICAgIHRpdGxlPXtpdGVtLnRpdGxlfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7dGhpcy5nZXRWaWV3VGFiQ29udGVudChpLCBpdGVtLmRhdGFTb3VyY2VQcm92aWRlcil9XG4gICAgICAgICAgICA8L1RhYj5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgIDwvVGFicz5cbiAgICApO1xuICB9XG5cbiAgZ2V0Vmlld1RhYkNvbnRlbnQgPSAoaSwgZGF0YVNvdXJjZVByb3ZpZGVyKSA9PiAoXG4gICAgPFZpZXdUYWJDb250ZW50XG4gICAgICBhbGxMYWJlbD17dGhpcy5wcm9wcy5hbGxMYWJlbH1cbiAgICAgIGluZGV4PXtpfVxuICAgICAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbj17dGhpcy5wcm9wcy5saXN0SXRlbVJlbmRlckZ1bmN0aW9ufVxuICAgICAgZGF0YVNvdXJjZVByb3ZpZGVyPXtkYXRhU291cmNlUHJvdmlkZXJ9XG4gICAgICBzZWFyY2hQbGFjZUhvbGRlcj17dGhpcy5wcm9wcy5zZWFyY2hQbGFjZUhvbGRlcn1cbiAgICAgIHNlYXJjaFRvb2x0aXA9e3RoaXMucHJvcHMuc2VhcmNoVG9vbHRpcH1cbiAgICAgIG9uQ2hlY2tMaXN0Q2hhbmdlPXt0aGlzLnByb3BzLm9uQ2hlY2tMaXN0Q2hhbmdlfVxuICAgIC8+XG4gIClcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMubGVuZ3RoID09PSAxICYmIHRoaXMucHJvcHMuaGlkZVNpbmdsZVRhYiA/XG4gICAgICB0aGlzLmdldENvbnRlbnQoKSA6IHRoaXMuZ2V0Q29udGVudFdpdGhUYWJzKCk7XG4gIH1cbn1cblxuVmlld1RhYnMucHJvcFR5cGVzID0ge1xuICBhbGxMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgaGlkZVNpbmdsZVRhYjogUHJvcFR5cGVzLmJvb2wsXG4gIGl0ZW1zOiBQcm9wVHlwZXMuYXJyYXlPZih0YWJPcHRpb25zVHlwZSkuaXNSZXF1aXJlZCxcbiAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2hlY2tMaXN0Q2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgc2VhcmNoUGxhY2VIb2xkZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIHNlYXJjaFRvb2x0aXA6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5lbGVtZW50LCBQcm9wVHlwZXMuc3RyaW5nXSksXG59O1xuXG5WaWV3VGFicy5kZWZhdWx0UHJvcHMgPSB7XG4gIGFsbExhYmVsOiAnQWxsJyxcbiAgaGlkZVNpbmdsZVRhYjogZmFsc2UsXG4gIGxpc3RJdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiAnU2VhcmNoLi4uJyxcbiAgc2VhcmNoVG9vbHRpcDogbnVsbCxcbiAgb25DaGVja0xpc3RDaGFuZ2U6ICgpID0+IHt9LFxufTtcbiJdfQ==