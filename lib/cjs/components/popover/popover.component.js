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
        onSearch: _this.onSearchChangeHandler,
        inputClassName: _constants.CLASS_NAME_SEARCH_FOCUSABLE,
        searchPlaceHolder: _this.props.searchPlaceHolder,
        onCloseClick: _this.props.onShouldClosePopover,
        dynamicSearchStartsFrom: 3,
        value: _this.state.searchingFor,
        tooltip: _this.props.searchTooltip
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
    this.mainElement.focus();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkhpZXJhcmNoeVNlbGVjdG9yUG9wb3ZlciIsInByb3BzIiwib25Gb2N1c091dEhhbmRsZXIiLCJlIiwiaXNGb2N1c09uQ3VycmVudFRhcmdldCIsIm9uQ29tcG9uZW50Qmx1ciIsIm9uU2VhcmNoQ2hhbmdlSGFuZGxlciIsInNldFN0YXRlIiwic2VhcmNoaW5nRm9yIiwib25TZWxlY3RIYW5kbGVyIiwiZGF0YSIsIm1vZGVsIiwiZ3JvdXBOYW1lIiwibmFtZSIsIml0ZW1zIiwiQXJyYXkiLCJpc0FycmF5Iiwib25TZWxlY3QiLCJvbktleURvd25IYW5sZGVyIiwic2VhcmNoRWxlbWVudEZvY3VzSGFubGRlciIsImdldFNlYXJjaEVsZW1lbnQiLCJzZWFyY2hQbGFjZUhvbGRlciIsIm9uU2hvdWxkQ2xvc2VQb3BvdmVyIiwic3RhdGUiLCJzZWFyY2hUb29sdGlwIiwiZ2V0TGlzdHMiLCJidG5PcGVuVmlld0xhYmVsIiwib25TaG91bGRPcGVuVmlldyIsImdldFNlYXJjaExheW91dCIsInNlYXJjaE1vZGVsIiwiZGF0YVNvdXJjZVByb3ZpZGVyIiwiZm91bmRJdGVtcyIsImdldEZvdW5kRnJvbUhpZXJhcmNoeSIsImZvdW5kSXRlbVJlbmRlckZ1bmN0aW9uIiwiZ2V0TWFpbkxheW91dCIsImlzRGF0YUxvYWRlZCIsImlzTG9hZGVkIiwiY29tcG9uZW50V2lsbE1vdW50IiwibG9hZERhdGEiLCJ0aGVuIiwiY29tcG9uZW50RGlkTW91bnQiLCJtYWluRWxlbWVudCIsImZvY3VzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlciIsImVsIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQTs7OztBQUNBOzs7O0FB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dC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9ucyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1ub25pbnRlcmFjdGl2ZS10YWJpbmRleCAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IFNlYXJjaEJhciBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zZWFyY2hiYXInO1xyXG5cclxuaW1wb3J0IHsgZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3R5cGVzJztcclxuaW1wb3J0IFNlYXJjaCBmcm9tICcuLi8uLi9tb2RlbHMvc2VhcmNoJztcclxuaW1wb3J0IEdyb3VwRW50aXR5IGZyb20gJy4uLy4uL21vZGVscy9ncm91cC5lbnRpdHknO1xyXG5cclxuaW1wb3J0IENvbW1vbkxheW91dCBmcm9tICcuL2xheW91dHMvY29tbW9uLmxheW91dCc7XHJcbmltcG9ydCBTcGlubmVyTGF5b3V0IGZyb20gJy4vbGF5b3V0cy9zcGlubmVyLmxheW91dCc7XHJcbmltcG9ydCBIU1NlbGVjdEJ1dHRvbiBmcm9tICcuL3NlbGVjdC1idG4uY29tcG9uZW50JztcclxuaW1wb3J0IFBvcG92ZXJTZWFyY2hDb250ZW50IGZyb20gJy4vc2VhcmNoL3NlYXJjaC1jb250ZW50LmNvbXBvbmVudCc7XHJcbmltcG9ydCBFdmVudEhhbmRsZXIgZnJvbSAnLi9ldmVudC1oYW5kbGVycyc7XHJcbmltcG9ydCB7IENMQVNTX05BTUVfU0VBUkNIX0ZPQ1VTQUJMRSB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuaW1wb3J0IFV0aWxzIGZyb20gJy4uLy4uL3V0aWxzJztcclxuaW1wb3J0ICcuL3BvcG92ZXIuc2Nzcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlTZWxlY3RvclBvcG92ZXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgaXNEYXRhTG9hZGVkOiBwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuaXNMb2FkZWQsXHJcbiAgICAgIHNlYXJjaGluZ0ZvcjogJycsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgaWYgKCF0aGlzLnN0YXRlLmlzRGF0YUxvYWRlZCkge1xyXG4gICAgICB0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5sb2FkRGF0YSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0RhdGFMb2FkZWQ6IHRydWUgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICB0aGlzLm1haW5FbGVtZW50LmZvY3VzKCk7XHJcbiAgICB0aGlzLm1haW5FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdGhpcy5vbkZvY3VzT3V0SGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgIHRoaXMubWFpbkVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCB0aGlzLm9uRm9jdXNPdXRIYW5kbGVyKTtcclxuICB9XHJcblxyXG4gIG9uRm9jdXNPdXRIYW5kbGVyID0gKGUpID0+IHtcclxuICAgIGlmICghVXRpbHMuaXNGb2N1c09uQ3VycmVudFRhcmdldChlKSkgdGhpcy5wcm9wcy5vbkNvbXBvbmVudEJsdXIoKTtcclxuICB9XHJcblxyXG4gIG9uU2VhcmNoQ2hhbmdlSGFuZGxlciA9IHNlYXJjaGluZ0ZvciA9PiB0aGlzLnNldFN0YXRlKHsgc2VhcmNoaW5nRm9yIH0pO1xyXG5cclxuICBvblNlbGVjdEhhbmRsZXIgPSAoZGF0YSkgPT4ge1xyXG4gICAgbGV0IG1vZGVsID0gbnVsbDtcclxuXHJcbiAgICBpZiAoZGF0YSkge1xyXG4gICAgICBjb25zdCBncm91cE5hbWUgPSBkYXRhLm5hbWUgPyBkYXRhLm5hbWUgOiAnVW5kZWZpbmVkJztcclxuICAgICAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KGRhdGEpID8gZGF0YSA6IFtkYXRhXTtcclxuICAgICAgbW9kZWwgPSBuZXcgR3JvdXBFbnRpdHkoZ3JvdXBOYW1lLCBpdGVtcyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KG1vZGVsKTtcclxuICB9XHJcblxyXG4gIG9uS2V5RG93bkhhbmxkZXIgPSAoZSkgPT4ge1xyXG4gICAgRXZlbnRIYW5kbGVyLnNlYXJjaEVsZW1lbnRGb2N1c0hhbmxkZXIoZSk7XHJcbiAgfVxyXG5cclxuICBnZXRTZWFyY2hFbGVtZW50ID0gKCkgPT4gKFxyXG4gICAgPFNlYXJjaEJhclxyXG4gICAgICBvblNlYXJjaD17dGhpcy5vblNlYXJjaENoYW5nZUhhbmRsZXJ9XHJcbiAgICAgIGlucHV0Q2xhc3NOYW1lPXtDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEV9XHJcbiAgICAgIHNlYXJjaFBsYWNlSG9sZGVyPXt0aGlzLnByb3BzLnNlYXJjaFBsYWNlSG9sZGVyfVxyXG4gICAgICBvbkNsb3NlQ2xpY2s9e3RoaXMucHJvcHMub25TaG91bGRDbG9zZVBvcG92ZXJ9XHJcbiAgICAgIGR5bmFtaWNTZWFyY2hTdGFydHNGcm9tPXszfVxyXG4gICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zZWFyY2hpbmdGb3J9XHJcbiAgICAgIHRvb2x0aXA9e3RoaXMucHJvcHMuc2VhcmNoVG9vbHRpcH1cclxuICAgIC8+XHJcbiAgKTtcclxuXHJcbiAgZ2V0TGlzdHMgPSAoKSA9PiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8SFNTZWxlY3RCdXR0b24gbGFiZWw9e3RoaXMucHJvcHMuYnRuT3BlblZpZXdMYWJlbH0gb25DbGljaz17dGhpcy5wcm9wcy5vblNob3VsZE9wZW5WaWV3fSAvPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxuXHJcbiAgZ2V0U2VhcmNoTGF5b3V0ID0gKCkgPT4ge1xyXG4gICAgY29uc3Qgc2VhcmNoTW9kZWwgPSBuZXcgU2VhcmNoKHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyKTtcclxuICAgIGNvbnN0IGZvdW5kSXRlbXMgPSBzZWFyY2hNb2RlbC5nZXRGb3VuZEZyb21IaWVyYXJjaHkodGhpcy5zdGF0ZS5zZWFyY2hpbmdGb3IpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxQb3BvdmVyU2VhcmNoQ29udGVudFxyXG4gICAgICAgIGZvdW5kSXRlbXM9e2ZvdW5kSXRlbXN9XHJcbiAgICAgICAgb25TZWxlY3Q9e2RhdGEgPT4gdGhpcy5vblNlbGVjdEhhbmRsZXIoZGF0YSl9XHJcbiAgICAgICAgaXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLmZvdW5kSXRlbVJlbmRlckZ1bmN0aW9ufVxyXG4gICAgICAvPlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldE1haW5MYXlvdXQgPSAoKSA9PiAoXHJcbiAgICA8Q29tbW9uTGF5b3V0PlxyXG4gICAgICB7dGhpcy5nZXRTZWFyY2hFbGVtZW50KCl9XHJcbiAgICAgIHt0aGlzLnN0YXRlLnNlYXJjaGluZ0ZvciAhPT0gJycgPyB0aGlzLmdldFNlYXJjaExheW91dCgpIDogdGhpcy5nZXRMaXN0cygpfVxyXG4gICAgPC9Db21tb25MYXlvdXQ+XHJcbiAgKTtcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1wb3BvdmVyXCJcclxuICAgICAgICB0YWJJbmRleD1cIjBcIlxyXG4gICAgICAgIHJlZj17KGVsKSA9PiB7IHRoaXMubWFpbkVsZW1lbnQgPSBlbDsgfX1cclxuICAgICAgPlxyXG4gICAgICAgIHsgdGhpcy5zdGF0ZS5pc0RhdGFMb2FkZWQgPyB0aGlzLmdldE1haW5MYXlvdXQoKSA6IDxTcGlubmVyTGF5b3V0IC8+IH1cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuSGllcmFyY2h5U2VsZWN0b3JQb3BvdmVyLnByb3BUeXBlcyA9IHtcclxuICBkYXRhU291cmNlUHJvdmlkZXI6IGRhdGFTb3VyY2VQcm92aWRlclR5cGUuaXNSZXF1aXJlZCxcclxuICBvbkNvbXBvbmVudEJsdXI6IFByb3BUeXBlcy5mdW5jLFxyXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcclxuICBvblNob3VsZE9wZW5WaWV3OiBQcm9wVHlwZXMuZnVuYyxcclxuICBmb3VuZEl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgb25TaG91bGRDbG9zZVBvcG92ZXI6IFByb3BUeXBlcy5mdW5jLFxyXG4gIGJ0bk9wZW5WaWV3TGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXHJcbiAgc2VhcmNoUGxhY2VIb2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgc2VhcmNoVG9vbHRpcDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmVsZW1lbnQsIFByb3BUeXBlcy5zdHJpbmddKSxcclxufTtcclxuXHJcbkhpZXJhcmNoeVNlbGVjdG9yUG9wb3Zlci5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgb25Db21wb25lbnRCbHVyOiAoKSA9PiB7fSxcclxuICBvblNlbGVjdDogKCkgPT4ge30sXHJcbiAgb25TaG91bGRPcGVuVmlldzogKCkgPT4ge30sXHJcbiAgb25TaG91bGRDbG9zZVBvcG92ZXI6ICgpID0+IHt9LFxyXG4gIGZvdW5kSXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxyXG4gIGJ0bk9wZW5WaWV3TGFiZWw6ICdTZWxlY3QuLi4nLFxyXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiAnU2VhcmNoLi4uJyxcclxuICBzZWFyY2hUb29sdGlwOiBudWxsLFxyXG59O1xyXG4iXX0=