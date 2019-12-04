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

    _this.onSelectHandler = function (data, flags) {
      var model = null;

      if (data) {
        var groupName = data.name ? data.name : 'Undefined';
        var items = Array.isArray(data) ? data : [data];
        model = new _group2.default(groupName, items);
      }
      _this.props.onSelect(model, flags);
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
        onSelect: _this.onSelectHandler,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkhpZXJhcmNoeVNlbGVjdG9yUG9wb3ZlciIsInByb3BzIiwib25Gb2N1c091dEhhbmRsZXIiLCJlIiwiVXRpbHMiLCJpc0ZvY3VzT25DdXJyZW50VGFyZ2V0Iiwib25Db21wb25lbnRCbHVyIiwib25TZWFyY2hDaGFuZ2VIYW5kbGVyIiwic2V0U3RhdGUiLCJzZWFyY2hpbmdGb3IiLCJvblNlbGVjdEhhbmRsZXIiLCJkYXRhIiwiZmxhZ3MiLCJtb2RlbCIsImdyb3VwTmFtZSIsIm5hbWUiLCJpdGVtcyIsIkFycmF5IiwiaXNBcnJheSIsIkdyb3VwRW50aXR5Iiwib25TZWxlY3QiLCJvbktleURvd25IYW5sZGVyIiwiRXZlbnRIYW5kbGVyIiwic2VhcmNoRWxlbWVudEZvY3VzSGFubGRlciIsImdldFNlYXJjaEVsZW1lbnQiLCJzdGF0ZSIsIkNMQVNTX05BTUVfU0VBUkNIX0ZPQ1VTQUJMRSIsInRvb2x0aXAiLCJzZWFyY2hUb29sdGlwIiwic2VhcmNoUGxhY2VIb2xkZXIiLCJvblNob3VsZENsb3NlUG9wb3ZlciIsImdldExpc3RzIiwiYnRuT3BlblZpZXdMYWJlbCIsIm9uU2hvdWxkT3BlblZpZXciLCJnZXRTZWFyY2hMYXlvdXQiLCJzZWFyY2hNb2RlbCIsIlNlYXJjaCIsImRhdGFTb3VyY2VQcm92aWRlciIsImZvdW5kSXRlbXMiLCJnZXRGb3VuZEZyb21IaWVyYXJjaHkiLCJmb3VuZEl0ZW1SZW5kZXJGdW5jdGlvbiIsImdldE1haW5MYXlvdXQiLCJpc0RhdGFMb2FkZWQiLCJpc0xvYWRlZCIsImNvbXBvbmVudFdpbGxNb3VudCIsImxvYWREYXRhIiwidGhlbiIsImNvbXBvbmVudERpZE1vdW50IiwibWFpbkVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW1vdmVFdmVudExpc3Rl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QUFFdENjLFlBQVUsb0JBQU0sQ0FBRSxDQUZvQjtBQUd0Q2Esb0JBQWtCLDRCQUFNLENBQUUsQ0FIWTtBQUl0Q0gsd0JBQXNCLGdDQUFNLENBQUUsQ0FKUTtBQUt0Q1UsMkJBQXlCLElBTGE7QUFNdENSLG9CQUFrQixXQU5vQjtBQU90Q0gscUJBQW1CLFdBUG1CO0FBUXRDRCxpQkFBZTtBQVJ1QixDQUF4QyIsImZpbGUiOiJwb3BvdmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9ucyAqL1xuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tbm9uaW50ZXJhY3RpdmUtdGFiaW5kZXggKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgU2VhcmNoQmFyIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNlYXJjaGJhcic7XG5cbmltcG9ydCB7IGRhdGFTb3VyY2VQcm92aWRlclR5cGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90eXBlcyc7XG5pbXBvcnQgU2VhcmNoIGZyb20gJy4uLy4uL21vZGVscy9zZWFyY2gnO1xuaW1wb3J0IEdyb3VwRW50aXR5IGZyb20gJy4uLy4uL21vZGVscy9ncm91cC5lbnRpdHknO1xuXG5pbXBvcnQgQ29tbW9uTGF5b3V0IGZyb20gJy4vbGF5b3V0cy9jb21tb24ubGF5b3V0JztcbmltcG9ydCBTcGlubmVyTGF5b3V0IGZyb20gJy4vbGF5b3V0cy9zcGlubmVyLmxheW91dCc7XG5pbXBvcnQgSFNTZWxlY3RCdXR0b24gZnJvbSAnLi9zZWxlY3QtYnRuLmNvbXBvbmVudCc7XG5pbXBvcnQgUG9wb3ZlclNlYXJjaENvbnRlbnQgZnJvbSAnLi9zZWFyY2gvc2VhcmNoLWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCBFdmVudEhhbmRsZXIgZnJvbSAnLi9ldmVudC1oYW5kbGVycyc7XG5pbXBvcnQgeyBDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0ICcuL3BvcG92ZXIuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVNlbGVjdG9yUG9wb3ZlciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaXNEYXRhTG9hZGVkOiBwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuaXNMb2FkZWQsXG4gICAgICBzZWFyY2hpbmdGb3I6ICcnLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLmlzRGF0YUxvYWRlZCkge1xuICAgICAgdGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXIubG9hZERhdGEoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzRGF0YUxvYWRlZDogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMubWFpbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCB0aGlzLm9uRm9jdXNPdXRIYW5kbGVyKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMubWFpbkVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCB0aGlzLm9uRm9jdXNPdXRIYW5kbGVyKTtcbiAgfVxuXG4gIG9uRm9jdXNPdXRIYW5kbGVyID0gKGUpID0+IHtcbiAgICBpZiAoIVV0aWxzLmlzRm9jdXNPbkN1cnJlbnRUYXJnZXQoZSkpIHRoaXMucHJvcHMub25Db21wb25lbnRCbHVyKCk7XG4gIH1cblxuICBvblNlYXJjaENoYW5nZUhhbmRsZXIgPSBzZWFyY2hpbmdGb3IgPT4gdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaGluZ0ZvciB9KTtcblxuICBvblNlbGVjdEhhbmRsZXIgPSAoZGF0YSwgZmxhZ3MpID0+IHtcbiAgICBsZXQgbW9kZWwgPSBudWxsO1xuXG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIGNvbnN0IGdyb3VwTmFtZSA9IGRhdGEubmFtZSA/IGRhdGEubmFtZSA6ICdVbmRlZmluZWQnO1xuICAgICAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KGRhdGEpID8gZGF0YSA6IFtkYXRhXTtcbiAgICAgIG1vZGVsID0gbmV3IEdyb3VwRW50aXR5KGdyb3VwTmFtZSwgaXRlbXMpO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KG1vZGVsLCBmbGFncyk7XG4gIH1cblxuICBvbktleURvd25IYW5sZGVyID0gKGUpID0+IHtcbiAgICBFdmVudEhhbmRsZXIuc2VhcmNoRWxlbWVudEZvY3VzSGFubGRlcihlKTtcbiAgfVxuXG4gIGdldFNlYXJjaEVsZW1lbnQgPSAoKSA9PiAoXG4gICAgPFNlYXJjaEJhclxuICAgICAgYXV0b0ZvY3VzXG4gICAgICBkZWZhbHRWYWx1ZT17dGhpcy5zdGF0ZS5zZWFyY2hpbmdGb3J9XG4gICAgICBpbnB1dENsYXNzTmFtZT17Q0xBU1NfTkFNRV9TRUFSQ0hfRk9DVVNBQkxFfVxuICAgICAgaXNEeW5hbWljXG4gICAgICBpc1Rvb2x0aXBFbmFibGVkXG4gICAgICBtaW5DaGFycz17Mn1cbiAgICAgIHRyYW5zbGF0aW9ucz17e1xuICAgICAgICB0b29sdGlwOiB0aGlzLnByb3BzLnNlYXJjaFRvb2x0aXAsXG4gICAgICAgIHNlYXJjaFBsYWNlSG9sZGVyOiB0aGlzLnByb3BzLnNlYXJjaFBsYWNlSG9sZGVyLFxuICAgICAgfX1cbiAgICAgIG9uU2VhcmNoPXt0aGlzLm9uU2VhcmNoQ2hhbmdlSGFuZGxlcn1cbiAgICAgIG9uQ2xlYXI9e3RoaXMucHJvcHMub25TaG91bGRDbG9zZVBvcG92ZXJ9XG4gICAgLz5cbiAgKTtcblxuICBnZXRMaXN0cyA9ICgpID0+IChcbiAgICA8ZGl2PlxuICAgICAgPEhTU2VsZWN0QnV0dG9uIGxhYmVsPXt0aGlzLnByb3BzLmJ0bk9wZW5WaWV3TGFiZWx9IG9uQ2xpY2s9e3RoaXMucHJvcHMub25TaG91bGRPcGVuVmlld30gLz5cbiAgICA8L2Rpdj5cbiAgKTtcblxuICBnZXRTZWFyY2hMYXlvdXQgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2VhcmNoTW9kZWwgPSBuZXcgU2VhcmNoKHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyKTtcbiAgICBjb25zdCBmb3VuZEl0ZW1zID0gc2VhcmNoTW9kZWwuZ2V0Rm91bmRGcm9tSGllcmFyY2h5KHRoaXMuc3RhdGUuc2VhcmNoaW5nRm9yKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8UG9wb3ZlclNlYXJjaENvbnRlbnRcbiAgICAgICAgZm91bmRJdGVtcz17Zm91bmRJdGVtc31cbiAgICAgICAgb25TZWxlY3Q9e3RoaXMub25TZWxlY3RIYW5kbGVyfVxuICAgICAgICBpdGVtUmVuZGVyRnVuY3Rpb249e3RoaXMucHJvcHMuZm91bmRJdGVtUmVuZGVyRnVuY3Rpb259XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICBnZXRNYWluTGF5b3V0ID0gKCkgPT4gKFxuICAgIDxDb21tb25MYXlvdXQ+XG4gICAgICB7dGhpcy5nZXRTZWFyY2hFbGVtZW50KCl9XG4gICAgICB7dGhpcy5zdGF0ZS5zZWFyY2hpbmdGb3IgIT09ICcnID8gdGhpcy5nZXRTZWFyY2hMYXlvdXQoKSA6IHRoaXMuZ2V0TGlzdHMoKX1cbiAgICA8L0NvbW1vbkxheW91dD5cbiAgKTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXBvcG92ZXJcIlxuICAgICAgICB0YWJJbmRleD1cIjBcIlxuICAgICAgICByZWY9eyhlbCkgPT4geyB0aGlzLm1haW5FbGVtZW50ID0gZWw7IH19XG4gICAgICA+XG4gICAgICAgIHsgdGhpcy5zdGF0ZS5pc0RhdGFMb2FkZWQgPyB0aGlzLmdldE1haW5MYXlvdXQoKSA6IDxTcGlubmVyTGF5b3V0IC8+IH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuSGllcmFyY2h5U2VsZWN0b3JQb3BvdmVyLnByb3BUeXBlcyA9IHtcbiAgZGF0YVNvdXJjZVByb3ZpZGVyOiBkYXRhU291cmNlUHJvdmlkZXJUeXBlLmlzUmVxdWlyZWQsXG4gIG9uQ29tcG9uZW50Qmx1cjogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TaG91bGRPcGVuVmlldzogUHJvcFR5cGVzLmZ1bmMsXG4gIGZvdW5kSXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TaG91bGRDbG9zZVBvcG92ZXI6IFByb3BUeXBlcy5mdW5jLFxuICBidG5PcGVuVmlld0xhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBzZWFyY2hQbGFjZUhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgc2VhcmNoVG9vbHRpcDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmVsZW1lbnQsIFByb3BUeXBlcy5zdHJpbmddKSxcbn07XG5cbkhpZXJhcmNoeVNlbGVjdG9yUG9wb3Zlci5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uQ29tcG9uZW50Qmx1cjogKCkgPT4ge30sXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgb25TaG91bGRPcGVuVmlldzogKCkgPT4ge30sXG4gIG9uU2hvdWxkQ2xvc2VQb3BvdmVyOiAoKSA9PiB7fSxcbiAgZm91bmRJdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXG4gIGJ0bk9wZW5WaWV3TGFiZWw6ICdTZWxlY3QuLi4nLFxuICBzZWFyY2hQbGFjZUhvbGRlcjogJ1NlYXJjaC4uLicsXG4gIHNlYXJjaFRvb2x0aXA6IG51bGwsXG59O1xuIl19