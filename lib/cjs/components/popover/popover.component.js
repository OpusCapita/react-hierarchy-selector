'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSearchbar = require('@opuscapita/react-searchbar');

var _reactSearchbar2 = _interopRequireDefault(_reactSearchbar);

var _types = require('../../services/types');

var _search = require('../../models/search');

var _search2 = _interopRequireDefault(_search);

var _group = require('../../models/group.entity');

var _group2 = _interopRequireDefault(_group);

var _common = require('./layouts/common.layout');

var _common2 = _interopRequireDefault(_common);

var _spinner = require('./layouts/spinner.layout');

var _spinner2 = _interopRequireDefault(_spinner);

var _selectBtn = require('./select-btn.component');

var _selectBtn2 = _interopRequireDefault(_selectBtn);

var _searchContent = require('./search/search-content.component');

var _searchContent2 = _interopRequireDefault(_searchContent);

var _eventHandlers = require('./event-handlers');

var _eventHandlers2 = _interopRequireDefault(_eventHandlers);

var _constants = require('./constants');

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

require('./popover.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

var HierarchySelectorPopover = function (_React$PureComponent) {
  _inherits(HierarchySelectorPopover, _React$PureComponent);

  function HierarchySelectorPopover(props) {
    _classCallCheck(this, HierarchySelectorPopover);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.onFocusOutHandler = function (e) {
      if (!_utils2.default.isFocusOnCurrentTarget(e)) _this.props.onComponentBlur();
    };

    _this.onSearchChangeHandler = function (searchingFor) {
      return _this.setState({ searchingFor: searchingFor });
    };

    _this.onSelectHandler = function (data) {
      var model = null;

      if (data) {
        var groupName = data.name ? data.name : 'Undefined';
        var items = Array.isArray(data) ? data : [data];
        model = new _group2.default(groupName, items);
      }
      _this.props.onSelect(model);
    };

    _this.onKeyDownHanlder = function (e) {
      _eventHandlers2.default.searchElementFocusHanlder(e);
    };

    _this.getSearchElement = function () {
      return _react2.default.createElement(_reactSearchbar2.default, {
        autoFocus: true,
        defaltValue: _this.state.searchingFor,
        inputClassName: _constants.CLASS_NAME_SEARCH_FOCUSABLE,
        isDynamic: true,
        isTooltipEnabled: true,
        minChars: 2,
        translations: {
          tooltip: _this.props.searchTooltip,
          searchPlaceHolder: _this.props.searchPlaceHolder
        },
        onSearch: _this.onSearchChangeHandler,
        onClear: _this.props.onShouldClosePopover
      });
    };

    _this.getLists = function () {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_selectBtn2.default, { label: _this.props.btnOpenViewLabel, onClick: _this.props.onShouldOpenView })
      );
    };

    _this.getSearchLayout = function () {
      var searchModel = new _search2.default(_this.props.dataSourceProvider);
      var foundItems = searchModel.getFoundFromHierarchy(_this.state.searchingFor);

      return _react2.default.createElement(_searchContent2.default, {
        foundItems: foundItems,
        onSelect: function onSelect(data) {
          return _this.onSelectHandler(data);
        },
        itemRenderFunction: _this.props.foundItemRenderFunction
      });
    };

    _this.getMainLayout = function () {
      return _react2.default.createElement(
        _common2.default,
        null,
        _this.getSearchElement(),
        _this.state.searchingFor !== '' ? _this.getSearchLayout() : _this.getLists()
      );
    };

    _this.state = {
      isDataLoaded: props.dataSourceProvider.isLoaded,
      searchingFor: ''
    };
    return _this;
  }

  HierarchySelectorPopover.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    if (!this.state.isDataLoaded) {
      this.props.dataSourceProvider.loadData().then(function () {
        _this2.setState({ isDataLoaded: true });
      });
    }
  };

  HierarchySelectorPopover.prototype.componentDidMount = function componentDidMount() {
    this.mainElement.addEventListener('focusout', this.onFocusOutHandler);
  };

  HierarchySelectorPopover.prototype.componentWillUnmount = function componentWillUnmount() {
    this.mainElement.removeEventListener('focusout', this.onFocusOutHandler);
  };

  HierarchySelectorPopover.prototype.render = function render() {
    var _this3 = this;

    return _react2.default.createElement(
      'div',
      {
        className: 'oc-hierarchy-selector-popover',
        tabIndex: '0',
        ref: function ref(el) {
          _this3.mainElement = el;
        }
      },
      this.state.isDataLoaded ? this.getMainLayout() : _react2.default.createElement(_spinner2.default, null)
    );
  };

  return HierarchySelectorPopover;
}(_react2.default.PureComponent);

exports.default = HierarchySelectorPopover;


HierarchySelectorPopover.defaultProps = {
  onComponentBlur: function onComponentBlur() {},
  onSelect: function onSelect() {},
  onShouldOpenView: function onShouldOpenView() {},
  onShouldClosePopover: function onShouldClosePopover() {},
  foundItemRenderFunction: null,
  btnOpenViewLabel: 'Select...',
  searchPlaceHolder: 'Search...',
  searchTooltip: null
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkhpZXJhcmNoeVNlbGVjdG9yUG9wb3ZlciIsInByb3BzIiwib25Gb2N1c091dEhhbmRsZXIiLCJlIiwiVXRpbHMiLCJpc0ZvY3VzT25DdXJyZW50VGFyZ2V0Iiwib25Db21wb25lbnRCbHVyIiwib25TZWFyY2hDaGFuZ2VIYW5kbGVyIiwic2V0U3RhdGUiLCJzZWFyY2hpbmdGb3IiLCJvblNlbGVjdEhhbmRsZXIiLCJkYXRhIiwibW9kZWwiLCJncm91cE5hbWUiLCJuYW1lIiwiaXRlbXMiLCJBcnJheSIsImlzQXJyYXkiLCJHcm91cEVudGl0eSIsIm9uU2VsZWN0Iiwib25LZXlEb3duSGFubGRlciIsIkV2ZW50SGFuZGxlciIsInNlYXJjaEVsZW1lbnRGb2N1c0hhbmxkZXIiLCJnZXRTZWFyY2hFbGVtZW50Iiwic3RhdGUiLCJDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEUiLCJ0b29sdGlwIiwic2VhcmNoVG9vbHRpcCIsInNlYXJjaFBsYWNlSG9sZGVyIiwib25TaG91bGRDbG9zZVBvcG92ZXIiLCJnZXRMaXN0cyIsImJ0bk9wZW5WaWV3TGFiZWwiLCJvblNob3VsZE9wZW5WaWV3IiwiZ2V0U2VhcmNoTGF5b3V0Iiwic2VhcmNoTW9kZWwiLCJTZWFyY2giLCJkYXRhU291cmNlUHJvdmlkZXIiLCJmb3VuZEl0ZW1zIiwiZ2V0Rm91bmRGcm9tSGllcmFyY2h5IiwiZm91bmRJdGVtUmVuZGVyRnVuY3Rpb24iLCJnZXRNYWluTGF5b3V0IiwiaXNEYXRhTG9hZGVkIiwiaXNMb2FkZWQiLCJjb21wb25lbnRXaWxsTW91bnQiLCJsb2FkRGF0YSIsInRoZW4iLCJjb21wb25lbnREaWRNb3VudCIsIm1haW5FbGVtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlciIsImVsIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7K2VBbEJBO0FBQ0E7O0lBbUJxQkEsd0I7OztBQUNuQixvQ0FBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQSxVQXdCbkJDLGlCQXhCbUIsR0F3QkMsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3pCLFVBQUksQ0FBQ0MsZ0JBQU1DLHNCQUFOLENBQTZCRixDQUE3QixDQUFMLEVBQXNDLE1BQUtGLEtBQUwsQ0FBV0ssZUFBWDtBQUN2QyxLQTFCa0I7O0FBQUEsVUE0Qm5CQyxxQkE1Qm1CLEdBNEJLO0FBQUEsYUFBZ0IsTUFBS0MsUUFBTCxDQUFjLEVBQUVDLDBCQUFGLEVBQWQsQ0FBaEI7QUFBQSxLQTVCTDs7QUFBQSxVQThCbkJDLGVBOUJtQixHQThCRCxVQUFDQyxJQUFELEVBQVU7QUFDMUIsVUFBSUMsUUFBUSxJQUFaOztBQUVBLFVBQUlELElBQUosRUFBVTtBQUNSLFlBQU1FLFlBQVlGLEtBQUtHLElBQUwsR0FBWUgsS0FBS0csSUFBakIsR0FBd0IsV0FBMUM7QUFDQSxZQUFNQyxRQUFRQyxNQUFNQyxPQUFOLENBQWNOLElBQWQsSUFBc0JBLElBQXRCLEdBQTZCLENBQUNBLElBQUQsQ0FBM0M7QUFDQUMsZ0JBQVEsSUFBSU0sZUFBSixDQUFnQkwsU0FBaEIsRUFBMkJFLEtBQTNCLENBQVI7QUFDRDtBQUNELFlBQUtkLEtBQUwsQ0FBV2tCLFFBQVgsQ0FBb0JQLEtBQXBCO0FBQ0QsS0F2Q2tCOztBQUFBLFVBeUNuQlEsZ0JBekNtQixHQXlDQSxVQUFDakIsQ0FBRCxFQUFPO0FBQ3hCa0IsOEJBQWFDLHlCQUFiLENBQXVDbkIsQ0FBdkM7QUFDRCxLQTNDa0I7O0FBQUEsVUE2Q25Cb0IsZ0JBN0NtQixHQTZDQTtBQUFBLGFBQ2pCLDhCQUFDLHdCQUFEO0FBQ0UsdUJBREY7QUFFRSxxQkFBYSxNQUFLQyxLQUFMLENBQVdmLFlBRjFCO0FBR0Usd0JBQWdCZ0Isc0NBSGxCO0FBSUUsdUJBSkY7QUFLRSw4QkFMRjtBQU1FLGtCQUFVLENBTlo7QUFPRSxzQkFBYztBQUNaQyxtQkFBUyxNQUFLekIsS0FBTCxDQUFXMEIsYUFEUjtBQUVaQyw2QkFBbUIsTUFBSzNCLEtBQUwsQ0FBVzJCO0FBRmxCLFNBUGhCO0FBV0Usa0JBQVUsTUFBS3JCLHFCQVhqQjtBQVlFLGlCQUFTLE1BQUtOLEtBQUwsQ0FBVzRCO0FBWnRCLFFBRGlCO0FBQUEsS0E3Q0E7O0FBQUEsVUE4RG5CQyxRQTlEbUIsR0E4RFI7QUFBQSxhQUNUO0FBQUE7QUFBQTtBQUNFLHNDQUFDLG1CQUFELElBQWdCLE9BQU8sTUFBSzdCLEtBQUwsQ0FBVzhCLGdCQUFsQyxFQUFvRCxTQUFTLE1BQUs5QixLQUFMLENBQVcrQixnQkFBeEU7QUFERixPQURTO0FBQUEsS0E5RFE7O0FBQUEsVUFvRW5CQyxlQXBFbUIsR0FvRUQsWUFBTTtBQUN0QixVQUFNQyxjQUFjLElBQUlDLGdCQUFKLENBQVcsTUFBS2xDLEtBQUwsQ0FBV21DLGtCQUF0QixDQUFwQjtBQUNBLFVBQU1DLGFBQWFILFlBQVlJLHFCQUFaLENBQWtDLE1BQUtkLEtBQUwsQ0FBV2YsWUFBN0MsQ0FBbkI7O0FBRUEsYUFDRSw4QkFBQyx1QkFBRDtBQUNFLG9CQUFZNEIsVUFEZDtBQUVFLGtCQUFVO0FBQUEsaUJBQVEsTUFBSzNCLGVBQUwsQ0FBcUJDLElBQXJCLENBQVI7QUFBQSxTQUZaO0FBR0UsNEJBQW9CLE1BQUtWLEtBQUwsQ0FBV3NDO0FBSGpDLFFBREY7QUFPRCxLQS9Fa0I7O0FBQUEsVUFpRm5CQyxhQWpGbUIsR0FpRkg7QUFBQSxhQUNkO0FBQUMsd0JBQUQ7QUFBQTtBQUNHLGNBQUtqQixnQkFBTCxFQURIO0FBRUcsY0FBS0MsS0FBTCxDQUFXZixZQUFYLEtBQTRCLEVBQTVCLEdBQWlDLE1BQUt3QixlQUFMLEVBQWpDLEdBQTBELE1BQUtILFFBQUw7QUFGN0QsT0FEYztBQUFBLEtBakZHOztBQUVqQixVQUFLTixLQUFMLEdBQWE7QUFDWGlCLG9CQUFjeEMsTUFBTW1DLGtCQUFOLENBQXlCTSxRQUQ1QjtBQUVYakMsb0JBQWM7QUFGSCxLQUFiO0FBRmlCO0FBTWxCOztxQ0FFRGtDLGtCLGlDQUFxQjtBQUFBOztBQUNuQixRQUFJLENBQUMsS0FBS25CLEtBQUwsQ0FBV2lCLFlBQWhCLEVBQThCO0FBQzVCLFdBQUt4QyxLQUFMLENBQVdtQyxrQkFBWCxDQUE4QlEsUUFBOUIsR0FBeUNDLElBQXpDLENBQThDLFlBQU07QUFDbEQsZUFBS3JDLFFBQUwsQ0FBYyxFQUFFaUMsY0FBYyxJQUFoQixFQUFkO0FBQ0QsT0FGRDtBQUdEO0FBQ0YsRzs7cUNBRURLLGlCLGdDQUFvQjtBQUNsQixTQUFLQyxXQUFMLENBQWlCQyxnQkFBakIsQ0FBa0MsVUFBbEMsRUFBOEMsS0FBSzlDLGlCQUFuRDtBQUNELEc7O3FDQUVEK0Msb0IsbUNBQXVCO0FBQ3JCLFNBQUtGLFdBQUwsQ0FBaUJHLG1CQUFqQixDQUFxQyxVQUFyQyxFQUFpRCxLQUFLaEQsaUJBQXREO0FBQ0QsRzs7cUNBa0VEaUQsTSxxQkFBUztBQUFBOztBQUNQLFdBQ0U7QUFBQTtBQUFBO0FBQ0UsbUJBQVUsK0JBRFo7QUFFRSxrQkFBUyxHQUZYO0FBR0UsYUFBSyxhQUFDQyxFQUFELEVBQVE7QUFBRSxpQkFBS0wsV0FBTCxHQUFtQkssRUFBbkI7QUFBd0I7QUFIekM7QUFLSSxXQUFLNUIsS0FBTCxDQUFXaUIsWUFBWCxHQUEwQixLQUFLRCxhQUFMLEVBQTFCLEdBQWlELDhCQUFDLGlCQUFEO0FBTHJELEtBREY7QUFTRCxHOzs7RUFuR21EYSxnQkFBTUMsYTs7a0JBQXZDdEQsd0I7OztBQWtIckJBLHlCQUF5QnVELFlBQXpCLEdBQXdDO0FBQ3RDakQsbUJBQWlCLDJCQUFNLENBQUUsQ0FEYTtBQUV0Q2EsWUFBVSxvQkFBTSxDQUFFLENBRm9CO0FBR3RDYSxvQkFBa0IsNEJBQU0sQ0FBRSxDQUhZO0FBSXRDSCx3QkFBc0IsZ0NBQU0sQ0FBRSxDQUpRO0FBS3RDVSwyQkFBeUIsSUFMYTtBQU10Q1Isb0JBQWtCLFdBTm9CO0FBT3RDSCxxQkFBbUIsV0FQbUI7QUFRdENELGlCQUFlO0FBUnVCLENBQXhDIiwiZmlsZSI6InBvcG92ZXIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1ub25pbnRlcmFjdGl2ZS10YWJpbmRleCAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBTZWFyY2hCYXIgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3Qtc2VhcmNoYmFyJztcblxuaW1wb3J0IHsgZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3R5cGVzJztcbmltcG9ydCBTZWFyY2ggZnJvbSAnLi4vLi4vbW9kZWxzL3NlYXJjaCc7XG5pbXBvcnQgR3JvdXBFbnRpdHkgZnJvbSAnLi4vLi4vbW9kZWxzL2dyb3VwLmVudGl0eSc7XG5cbmltcG9ydCBDb21tb25MYXlvdXQgZnJvbSAnLi9sYXlvdXRzL2NvbW1vbi5sYXlvdXQnO1xuaW1wb3J0IFNwaW5uZXJMYXlvdXQgZnJvbSAnLi9sYXlvdXRzL3NwaW5uZXIubGF5b3V0JztcbmltcG9ydCBIU1NlbGVjdEJ1dHRvbiBmcm9tICcuL3NlbGVjdC1idG4uY29tcG9uZW50JztcbmltcG9ydCBQb3BvdmVyU2VhcmNoQ29udGVudCBmcm9tICcuL3NlYXJjaC9zZWFyY2gtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IEV2ZW50SGFuZGxlciBmcm9tICcuL2V2ZW50LWhhbmRsZXJzJztcbmltcG9ydCB7IENMQVNTX05BTUVfU0VBUkNIX0ZPQ1VTQUJMRSB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgJy4vcG9wb3Zlci5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5U2VsZWN0b3JQb3BvdmVyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpc0RhdGFMb2FkZWQ6IHByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5pc0xvYWRlZCxcbiAgICAgIHNlYXJjaGluZ0ZvcjogJycsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICBpZiAoIXRoaXMuc3RhdGUuaXNEYXRhTG9hZGVkKSB7XG4gICAgICB0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5sb2FkRGF0YSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgaXNEYXRhTG9hZGVkOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5tYWluRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHRoaXMub25Gb2N1c091dEhhbmRsZXIpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5tYWluRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHRoaXMub25Gb2N1c091dEhhbmRsZXIpO1xuICB9XG5cbiAgb25Gb2N1c091dEhhbmRsZXIgPSAoZSkgPT4ge1xuICAgIGlmICghVXRpbHMuaXNGb2N1c09uQ3VycmVudFRhcmdldChlKSkgdGhpcy5wcm9wcy5vbkNvbXBvbmVudEJsdXIoKTtcbiAgfVxuXG4gIG9uU2VhcmNoQ2hhbmdlSGFuZGxlciA9IHNlYXJjaGluZ0ZvciA9PiB0aGlzLnNldFN0YXRlKHsgc2VhcmNoaW5nRm9yIH0pO1xuXG4gIG9uU2VsZWN0SGFuZGxlciA9IChkYXRhKSA9PiB7XG4gICAgbGV0IG1vZGVsID0gbnVsbDtcblxuICAgIGlmIChkYXRhKSB7XG4gICAgICBjb25zdCBncm91cE5hbWUgPSBkYXRhLm5hbWUgPyBkYXRhLm5hbWUgOiAnVW5kZWZpbmVkJztcbiAgICAgIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShkYXRhKSA/IGRhdGEgOiBbZGF0YV07XG4gICAgICBtb2RlbCA9IG5ldyBHcm91cEVudGl0eShncm91cE5hbWUsIGl0ZW1zKTtcbiAgICB9XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChtb2RlbCk7XG4gIH1cblxuICBvbktleURvd25IYW5sZGVyID0gKGUpID0+IHtcbiAgICBFdmVudEhhbmRsZXIuc2VhcmNoRWxlbWVudEZvY3VzSGFubGRlcihlKTtcbiAgfVxuXG4gIGdldFNlYXJjaEVsZW1lbnQgPSAoKSA9PiAoXG4gICAgPFNlYXJjaEJhclxuICAgICAgYXV0b0ZvY3VzXG4gICAgICBkZWZhbHRWYWx1ZT17dGhpcy5zdGF0ZS5zZWFyY2hpbmdGb3J9XG4gICAgICBpbnB1dENsYXNzTmFtZT17Q0xBU1NfTkFNRV9TRUFSQ0hfRk9DVVNBQkxFfVxuICAgICAgaXNEeW5hbWljXG4gICAgICBpc1Rvb2x0aXBFbmFibGVkXG4gICAgICBtaW5DaGFycz17Mn1cbiAgICAgIHRyYW5zbGF0aW9ucz17e1xuICAgICAgICB0b29sdGlwOiB0aGlzLnByb3BzLnNlYXJjaFRvb2x0aXAsXG4gICAgICAgIHNlYXJjaFBsYWNlSG9sZGVyOiB0aGlzLnByb3BzLnNlYXJjaFBsYWNlSG9sZGVyLFxuICAgICAgfX1cbiAgICAgIG9uU2VhcmNoPXt0aGlzLm9uU2VhcmNoQ2hhbmdlSGFuZGxlcn1cbiAgICAgIG9uQ2xlYXI9e3RoaXMucHJvcHMub25TaG91bGRDbG9zZVBvcG92ZXJ9XG4gICAgLz5cbiAgKTtcblxuICBnZXRMaXN0cyA9ICgpID0+IChcbiAgICA8ZGl2PlxuICAgICAgPEhTU2VsZWN0QnV0dG9uIGxhYmVsPXt0aGlzLnByb3BzLmJ0bk9wZW5WaWV3TGFiZWx9IG9uQ2xpY2s9e3RoaXMucHJvcHMub25TaG91bGRPcGVuVmlld30gLz5cbiAgICA8L2Rpdj5cbiAgKTtcblxuICBnZXRTZWFyY2hMYXlvdXQgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2VhcmNoTW9kZWwgPSBuZXcgU2VhcmNoKHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyKTtcbiAgICBjb25zdCBmb3VuZEl0ZW1zID0gc2VhcmNoTW9kZWwuZ2V0Rm91bmRGcm9tSGllcmFyY2h5KHRoaXMuc3RhdGUuc2VhcmNoaW5nRm9yKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8UG9wb3ZlclNlYXJjaENvbnRlbnRcbiAgICAgICAgZm91bmRJdGVtcz17Zm91bmRJdGVtc31cbiAgICAgICAgb25TZWxlY3Q9e2RhdGEgPT4gdGhpcy5vblNlbGVjdEhhbmRsZXIoZGF0YSl9XG4gICAgICAgIGl0ZW1SZW5kZXJGdW5jdGlvbj17dGhpcy5wcm9wcy5mb3VuZEl0ZW1SZW5kZXJGdW5jdGlvbn1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIGdldE1haW5MYXlvdXQgPSAoKSA9PiAoXG4gICAgPENvbW1vbkxheW91dD5cbiAgICAgIHt0aGlzLmdldFNlYXJjaEVsZW1lbnQoKX1cbiAgICAgIHt0aGlzLnN0YXRlLnNlYXJjaGluZ0ZvciAhPT0gJycgPyB0aGlzLmdldFNlYXJjaExheW91dCgpIDogdGhpcy5nZXRMaXN0cygpfVxuICAgIDwvQ29tbW9uTGF5b3V0PlxuICApO1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItcG9wb3ZlclwiXG4gICAgICAgIHRhYkluZGV4PVwiMFwiXG4gICAgICAgIHJlZj17KGVsKSA9PiB7IHRoaXMubWFpbkVsZW1lbnQgPSBlbDsgfX1cbiAgICAgID5cbiAgICAgICAgeyB0aGlzLnN0YXRlLmlzRGF0YUxvYWRlZCA/IHRoaXMuZ2V0TWFpbkxheW91dCgpIDogPFNwaW5uZXJMYXlvdXQgLz4gfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5IaWVyYXJjaHlTZWxlY3RvclBvcG92ZXIucHJvcFR5cGVzID0ge1xuICBkYXRhU291cmNlUHJvdmlkZXI6IGRhdGFTb3VyY2VQcm92aWRlclR5cGUuaXNSZXF1aXJlZCxcbiAgb25Db21wb25lbnRCbHVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBvblNob3VsZE9wZW5WaWV3OiBQcm9wVHlwZXMuZnVuYyxcbiAgZm91bmRJdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICBvblNob3VsZENsb3NlUG9wb3ZlcjogUHJvcFR5cGVzLmZ1bmMsXG4gIGJ0bk9wZW5WaWV3TGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBzZWFyY2hUb29sdGlwOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZWxlbWVudCwgUHJvcFR5cGVzLnN0cmluZ10pLFxufTtcblxuSGllcmFyY2h5U2VsZWN0b3JQb3BvdmVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25Db21wb25lbnRCbHVyOiAoKSA9PiB7fSxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBvblNob3VsZE9wZW5WaWV3OiAoKSA9PiB7fSxcbiAgb25TaG91bGRDbG9zZVBvcG92ZXI6ICgpID0+IHt9LFxuICBmb3VuZEl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcbiAgYnRuT3BlblZpZXdMYWJlbDogJ1NlbGVjdC4uLicsXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiAnU2VhcmNoLi4uJyxcbiAgc2VhcmNoVG9vbHRpcDogbnVsbCxcbn07XG4iXX0=