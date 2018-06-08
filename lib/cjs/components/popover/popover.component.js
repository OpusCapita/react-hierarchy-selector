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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkhpZXJhcmNoeVNlbGVjdG9yUG9wb3ZlciIsInByb3BzIiwib25Gb2N1c091dEhhbmRsZXIiLCJlIiwiaXNGb2N1c09uQ3VycmVudFRhcmdldCIsIm9uQ29tcG9uZW50Qmx1ciIsIm9uU2VhcmNoQ2hhbmdlSGFuZGxlciIsInNldFN0YXRlIiwic2VhcmNoaW5nRm9yIiwib25TZWxlY3RIYW5kbGVyIiwiZGF0YSIsIm1vZGVsIiwiZ3JvdXBOYW1lIiwibmFtZSIsIml0ZW1zIiwiQXJyYXkiLCJpc0FycmF5Iiwib25TZWxlY3QiLCJvbktleURvd25IYW5sZGVyIiwic2VhcmNoRWxlbWVudEZvY3VzSGFubGRlciIsImdldFNlYXJjaEVsZW1lbnQiLCJzZWFyY2hQbGFjZUhvbGRlciIsIm9uU2hvdWxkQ2xvc2VQb3BvdmVyIiwic3RhdGUiLCJzZWFyY2hUb29sdGlwIiwiZ2V0TGlzdHMiLCJidG5PcGVuVmlld0xhYmVsIiwib25TaG91bGRPcGVuVmlldyIsImdldFNlYXJjaExheW91dCIsInNlYXJjaE1vZGVsIiwiZGF0YVNvdXJjZVByb3ZpZGVyIiwiZm91bmRJdGVtcyIsImdldEZvdW5kRnJvbUhpZXJhcmNoeSIsImZvdW5kSXRlbVJlbmRlckZ1bmN0aW9uIiwiZ2V0TWFpbkxheW91dCIsImlzRGF0YUxvYWRlZCIsImlzTG9hZGVkIiwiY29tcG9uZW50V2lsbE1vdW50IiwibG9hZERhdGEiLCJ0aGVuIiwiY29tcG9uZW50RGlkTW91bnQiLCJtYWluRWxlbWVudCIsImZvY3VzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlciIsImVsIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQTs7OztBQUNBOzs7O0FB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dC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9ucyAqL1xuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tbm9uaW50ZXJhY3RpdmUtdGFiaW5kZXggKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgU2VhcmNoQmFyIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNlYXJjaGJhcic7XG5cbmltcG9ydCB7IGRhdGFTb3VyY2VQcm92aWRlclR5cGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90eXBlcyc7XG5pbXBvcnQgU2VhcmNoIGZyb20gJy4uLy4uL21vZGVscy9zZWFyY2gnO1xuaW1wb3J0IEdyb3VwRW50aXR5IGZyb20gJy4uLy4uL21vZGVscy9ncm91cC5lbnRpdHknO1xuXG5pbXBvcnQgQ29tbW9uTGF5b3V0IGZyb20gJy4vbGF5b3V0cy9jb21tb24ubGF5b3V0JztcbmltcG9ydCBTcGlubmVyTGF5b3V0IGZyb20gJy4vbGF5b3V0cy9zcGlubmVyLmxheW91dCc7XG5pbXBvcnQgSFNTZWxlY3RCdXR0b24gZnJvbSAnLi9zZWxlY3QtYnRuLmNvbXBvbmVudCc7XG5pbXBvcnQgUG9wb3ZlclNlYXJjaENvbnRlbnQgZnJvbSAnLi9zZWFyY2gvc2VhcmNoLWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCBFdmVudEhhbmRsZXIgZnJvbSAnLi9ldmVudC1oYW5kbGVycyc7XG5pbXBvcnQgeyBDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0ICcuL3BvcG92ZXIuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVNlbGVjdG9yUG9wb3ZlciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaXNEYXRhTG9hZGVkOiBwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuaXNMb2FkZWQsXG4gICAgICBzZWFyY2hpbmdGb3I6ICcnLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLmlzRGF0YUxvYWRlZCkge1xuICAgICAgdGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXIubG9hZERhdGEoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzRGF0YUxvYWRlZDogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMubWFpbkVsZW1lbnQuZm9jdXMoKTtcbiAgICB0aGlzLm1haW5FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdGhpcy5vbkZvY3VzT3V0SGFuZGxlcik7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLm1haW5FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdGhpcy5vbkZvY3VzT3V0SGFuZGxlcik7XG4gIH1cblxuICBvbkZvY3VzT3V0SGFuZGxlciA9IChlKSA9PiB7XG4gICAgaWYgKCFVdGlscy5pc0ZvY3VzT25DdXJyZW50VGFyZ2V0KGUpKSB0aGlzLnByb3BzLm9uQ29tcG9uZW50Qmx1cigpO1xuICB9XG5cbiAgb25TZWFyY2hDaGFuZ2VIYW5kbGVyID0gc2VhcmNoaW5nRm9yID0+IHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hpbmdGb3IgfSk7XG5cbiAgb25TZWxlY3RIYW5kbGVyID0gKGRhdGEpID0+IHtcbiAgICBsZXQgbW9kZWwgPSBudWxsO1xuXG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIGNvbnN0IGdyb3VwTmFtZSA9IGRhdGEubmFtZSA/IGRhdGEubmFtZSA6ICdVbmRlZmluZWQnO1xuICAgICAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KGRhdGEpID8gZGF0YSA6IFtkYXRhXTtcbiAgICAgIG1vZGVsID0gbmV3IEdyb3VwRW50aXR5KGdyb3VwTmFtZSwgaXRlbXMpO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KG1vZGVsKTtcbiAgfVxuXG4gIG9uS2V5RG93bkhhbmxkZXIgPSAoZSkgPT4ge1xuICAgIEV2ZW50SGFuZGxlci5zZWFyY2hFbGVtZW50Rm9jdXNIYW5sZGVyKGUpO1xuICB9XG5cbiAgZ2V0U2VhcmNoRWxlbWVudCA9ICgpID0+IChcbiAgICA8U2VhcmNoQmFyXG4gICAgICBvblNlYXJjaD17dGhpcy5vblNlYXJjaENoYW5nZUhhbmRsZXJ9XG4gICAgICBpbnB1dENsYXNzTmFtZT17Q0xBU1NfTkFNRV9TRUFSQ0hfRk9DVVNBQkxFfVxuICAgICAgc2VhcmNoUGxhY2VIb2xkZXI9e3RoaXMucHJvcHMuc2VhcmNoUGxhY2VIb2xkZXJ9XG4gICAgICBvbkNsb3NlQ2xpY2s9e3RoaXMucHJvcHMub25TaG91bGRDbG9zZVBvcG92ZXJ9XG4gICAgICBkeW5hbWljU2VhcmNoU3RhcnRzRnJvbT17M31cbiAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnNlYXJjaGluZ0Zvcn1cbiAgICAgIHRvb2x0aXA9e3RoaXMucHJvcHMuc2VhcmNoVG9vbHRpcH1cbiAgICAvPlxuICApO1xuXG4gIGdldExpc3RzID0gKCkgPT4gKFxuICAgIDxkaXY+XG4gICAgICA8SFNTZWxlY3RCdXR0b24gbGFiZWw9e3RoaXMucHJvcHMuYnRuT3BlblZpZXdMYWJlbH0gb25DbGljaz17dGhpcy5wcm9wcy5vblNob3VsZE9wZW5WaWV3fSAvPlxuICAgIDwvZGl2PlxuICApO1xuXG4gIGdldFNlYXJjaExheW91dCA9ICgpID0+IHtcbiAgICBjb25zdCBzZWFyY2hNb2RlbCA9IG5ldyBTZWFyY2godGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXIpO1xuICAgIGNvbnN0IGZvdW5kSXRlbXMgPSBzZWFyY2hNb2RlbC5nZXRGb3VuZEZyb21IaWVyYXJjaHkodGhpcy5zdGF0ZS5zZWFyY2hpbmdGb3IpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxQb3BvdmVyU2VhcmNoQ29udGVudFxuICAgICAgICBmb3VuZEl0ZW1zPXtmb3VuZEl0ZW1zfVxuICAgICAgICBvblNlbGVjdD17ZGF0YSA9PiB0aGlzLm9uU2VsZWN0SGFuZGxlcihkYXRhKX1cbiAgICAgICAgaXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLmZvdW5kSXRlbVJlbmRlckZ1bmN0aW9ufVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgZ2V0TWFpbkxheW91dCA9ICgpID0+IChcbiAgICA8Q29tbW9uTGF5b3V0PlxuICAgICAge3RoaXMuZ2V0U2VhcmNoRWxlbWVudCgpfVxuICAgICAge3RoaXMuc3RhdGUuc2VhcmNoaW5nRm9yICE9PSAnJyA/IHRoaXMuZ2V0U2VhcmNoTGF5b3V0KCkgOiB0aGlzLmdldExpc3RzKCl9XG4gICAgPC9Db21tb25MYXlvdXQ+XG4gICk7XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1wb3BvdmVyXCJcbiAgICAgICAgdGFiSW5kZXg9XCIwXCJcbiAgICAgICAgcmVmPXsoZWwpID0+IHsgdGhpcy5tYWluRWxlbWVudCA9IGVsOyB9fVxuICAgICAgPlxuICAgICAgICB7IHRoaXMuc3RhdGUuaXNEYXRhTG9hZGVkID8gdGhpcy5nZXRNYWluTGF5b3V0KCkgOiA8U3Bpbm5lckxheW91dCAvPiB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkhpZXJhcmNoeVNlbGVjdG9yUG9wb3Zlci5wcm9wVHlwZXMgPSB7XG4gIGRhdGFTb3VyY2VQcm92aWRlcjogZGF0YVNvdXJjZVByb3ZpZGVyVHlwZS5pc1JlcXVpcmVkLFxuICBvbkNvbXBvbmVudEJsdXI6IFByb3BUeXBlcy5mdW5jLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2hvdWxkT3BlblZpZXc6IFByb3BUeXBlcy5mdW5jLFxuICBmb3VuZEl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2hvdWxkQ2xvc2VQb3BvdmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgYnRuT3BlblZpZXdMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgc2VhcmNoUGxhY2VIb2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHNlYXJjaFRvb2x0aXA6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5lbGVtZW50LCBQcm9wVHlwZXMuc3RyaW5nXSksXG59O1xuXG5IaWVyYXJjaHlTZWxlY3RvclBvcG92ZXIuZGVmYXVsdFByb3BzID0ge1xuICBvbkNvbXBvbmVudEJsdXI6ICgpID0+IHt9LFxuICBvblNlbGVjdDogKCkgPT4ge30sXG4gIG9uU2hvdWxkT3BlblZpZXc6ICgpID0+IHt9LFxuICBvblNob3VsZENsb3NlUG9wb3ZlcjogKCkgPT4ge30sXG4gIGZvdW5kSXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxuICBidG5PcGVuVmlld0xhYmVsOiAnU2VsZWN0Li4uJyxcbiAgc2VhcmNoUGxhY2VIb2xkZXI6ICdTZWFyY2guLi4nLFxuICBzZWFyY2hUb29sdGlwOiBudWxsLFxufTtcbiJdfQ==