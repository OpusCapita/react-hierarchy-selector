'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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

var _pinnedList = require('./pinned-list.component');

var _pinnedList2 = _interopRequireDefault(_pinnedList);

var _recentList = require('./recent-list.component');

var _recentList2 = _interopRequireDefault(_recentList);

var _eventHandlers = require('./event-handlers');

var _eventHandlers2 = _interopRequireDefault(_eventHandlers);

var _constants = require('./constants');

var _searchBar = require('../search-bar');

var _searchBar2 = _interopRequireDefault(_searchBar);

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

    _this.onSearchChangeHandler = function (e) {
      var searchingValue = e.target ? e.target.value || '' : '';
      var searchingFor = '';

      if (_utils2.default.enoughSearchTextLength(searchingValue)) {
        searchingFor = searchingValue;
      }
      _this.setState({ searchingFor: searchingFor });
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
      return _react2.default.createElement(_searchBar2.default, {
        inputClassName: _constants.CLASS_NAME_SEARCH_FOCUSABLE,
        searchPlaceHolder: _this.props.searchPlaceHolder,
        onSearchChange: _this.onSearchChangeHandler,
        onCloseClick: _this.props.onShouldClosePopover
      });
    };

    _this.getLists = function () {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_selectBtn2.default, { label: _this.props.btnOpenViewLabel, onClick: _this.props.onShouldOpenView }),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(_pinnedList2.default, { pinnedGroupLabel: _this.props.pinnedGroupLabel }),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(_recentList2.default, { recentGroupLabel: _this.props.recentGroupLabel })
      );
    };

    _this.getSearchLayout = function () {
      var searchModel = new _search2.default(_this.props.dataSourceProvider);
      var foundItems = searchModel.getFoundFromHierarchy(_this.state.searchingFor);

      return _react2.default.createElement(_searchContent2.default, {
        foundItems: foundItems,
        onSelect: function onSelect(data) {
          return _this.onSelectHandler(data);
        }
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
  btnOpenViewLabel: 'Select...',
  searchPlaceHolder: 'Search...',
  pinnedGroupLabel: 'Pinned items',
  recentGroupLabel: 'Recently used'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkhpZXJhcmNoeVNlbGVjdG9yUG9wb3ZlciIsInByb3BzIiwib25Gb2N1c091dEhhbmRsZXIiLCJlIiwiaXNGb2N1c09uQ3VycmVudFRhcmdldCIsIm9uQ29tcG9uZW50Qmx1ciIsIm9uU2VhcmNoQ2hhbmdlSGFuZGxlciIsInNlYXJjaGluZ1ZhbHVlIiwidGFyZ2V0IiwidmFsdWUiLCJzZWFyY2hpbmdGb3IiLCJlbm91Z2hTZWFyY2hUZXh0TGVuZ3RoIiwic2V0U3RhdGUiLCJvblNlbGVjdEhhbmRsZXIiLCJkYXRhIiwibW9kZWwiLCJncm91cE5hbWUiLCJuYW1lIiwiaXRlbXMiLCJBcnJheSIsImlzQXJyYXkiLCJvblNlbGVjdCIsIm9uS2V5RG93bkhhbmxkZXIiLCJzZWFyY2hFbGVtZW50Rm9jdXNIYW5sZGVyIiwiZ2V0U2VhcmNoRWxlbWVudCIsInNlYXJjaFBsYWNlSG9sZGVyIiwib25TaG91bGRDbG9zZVBvcG92ZXIiLCJnZXRMaXN0cyIsImJ0bk9wZW5WaWV3TGFiZWwiLCJvblNob3VsZE9wZW5WaWV3IiwicGlubmVkR3JvdXBMYWJlbCIsInJlY2VudEdyb3VwTGFiZWwiLCJnZXRTZWFyY2hMYXlvdXQiLCJzZWFyY2hNb2RlbCIsImRhdGFTb3VyY2VQcm92aWRlciIsImZvdW5kSXRlbXMiLCJnZXRGb3VuZEZyb21IaWVyYXJjaHkiLCJzdGF0ZSIsImdldE1haW5MYXlvdXQiLCJpc0RhdGFMb2FkZWQiLCJpc0xvYWRlZCIsImNvbXBvbmVudFdpbGxNb3VudCIsImxvYWREYXRhIiwidGhlbiIsImNvbXBvbmVudERpZE1vdW50IiwibWFpbkVsZW1lbnQiLCJmb2N1cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJlbCIsIlB1cmVDb21wb25l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c0hyQkEseUJBQXlCcUQsWUFBekIsR0FBd0M7QUFDdENoRCxtQkFBaUIsMkJBQU0sQ0FBRSxDQURhO0FBRXRDZ0IsWUFBVSxvQkFBTSxDQUFFLENBRm9CO0FBR3RDUSxvQkFBa0IsNEJBQU0sQ0FBRSxDQUhZO0FBSXRDSCx3QkFBc0IsZ0NBQU0sQ0FBRSxDQUpRO0FBS3RDRSxvQkFBa0IsV0FMb0I7QUFNdENILHFCQUFtQixXQU5tQjtBQU90Q0ssb0JBQWtCLGNBUG9CO0FBUXRDQyxvQkFBa0I7QUFSb0IsQ0FBeEMiLCJmaWxlIjoicG9wb3Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLW5vbmludGVyYWN0aXZlLXRhYmluZGV4ICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgeyBkYXRhU291cmNlUHJvdmlkZXJUeXBlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdHlwZXMnO1xuaW1wb3J0IFNlYXJjaCBmcm9tICcuLi8uLi9tb2RlbHMvc2VhcmNoJztcbmltcG9ydCBHcm91cEVudGl0eSBmcm9tICcuLi8uLi9tb2RlbHMvZ3JvdXAuZW50aXR5JztcblxuaW1wb3J0IENvbW1vbkxheW91dCBmcm9tICcuL2xheW91dHMvY29tbW9uLmxheW91dCc7XG5pbXBvcnQgU3Bpbm5lckxheW91dCBmcm9tICcuL2xheW91dHMvc3Bpbm5lci5sYXlvdXQnO1xuaW1wb3J0IEhTU2VsZWN0QnV0dG9uIGZyb20gJy4vc2VsZWN0LWJ0bi5jb21wb25lbnQnO1xuaW1wb3J0IFBvcG92ZXJTZWFyY2hDb250ZW50IGZyb20gJy4vc2VhcmNoL3NlYXJjaC1jb250ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgSFNQaW5uZWRMaXN0IGZyb20gJy4vcGlubmVkLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCBIU1JlY2VudExpc3QgZnJvbSAnLi9yZWNlbnQtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IEV2ZW50SGFuZGxlciBmcm9tICcuL2V2ZW50LWhhbmRsZXJzJztcbmltcG9ydCB7IENMQVNTX05BTUVfU0VBUkNIX0ZPQ1VTQUJMRSB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCBTZWFyY2hCYXIgZnJvbSAnLi4vc2VhcmNoLWJhcic7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0ICcuL3BvcG92ZXIuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVNlbGVjdG9yUG9wb3ZlciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaXNEYXRhTG9hZGVkOiBwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuaXNMb2FkZWQsXG4gICAgICBzZWFyY2hpbmdGb3I6ICcnLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLmlzRGF0YUxvYWRlZCkge1xuICAgICAgdGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXIubG9hZERhdGEoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzRGF0YUxvYWRlZDogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMubWFpbkVsZW1lbnQuZm9jdXMoKTtcbiAgICB0aGlzLm1haW5FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdGhpcy5vbkZvY3VzT3V0SGFuZGxlcik7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLm1haW5FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdGhpcy5vbkZvY3VzT3V0SGFuZGxlcik7XG4gIH1cblxuICBvbkZvY3VzT3V0SGFuZGxlciA9IChlKSA9PiB7XG4gICAgaWYgKCFVdGlscy5pc0ZvY3VzT25DdXJyZW50VGFyZ2V0KGUpKSB0aGlzLnByb3BzLm9uQ29tcG9uZW50Qmx1cigpO1xuICB9XG5cbiAgb25TZWFyY2hDaGFuZ2VIYW5kbGVyID0gKGUpID0+IHtcbiAgICBjb25zdCBzZWFyY2hpbmdWYWx1ZSA9IGUudGFyZ2V0ID8gZS50YXJnZXQudmFsdWUgfHwgJycgOiAnJztcbiAgICBsZXQgc2VhcmNoaW5nRm9yID0gJyc7XG5cbiAgICBpZiAoVXRpbHMuZW5vdWdoU2VhcmNoVGV4dExlbmd0aChzZWFyY2hpbmdWYWx1ZSkpIHtcbiAgICAgIHNlYXJjaGluZ0ZvciA9IHNlYXJjaGluZ1ZhbHVlO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoaW5nRm9yIH0pO1xuICB9XG5cbiAgb25TZWxlY3RIYW5kbGVyID0gKGRhdGEpID0+IHtcbiAgICBsZXQgbW9kZWwgPSBudWxsO1xuXG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIGNvbnN0IGdyb3VwTmFtZSA9IGRhdGEubmFtZSA/IGRhdGEubmFtZSA6ICdVbmRlZmluZWQnO1xuICAgICAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KGRhdGEpID8gZGF0YSA6IFtkYXRhXTtcbiAgICAgIG1vZGVsID0gbmV3IEdyb3VwRW50aXR5KGdyb3VwTmFtZSwgaXRlbXMpO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KG1vZGVsKTtcbiAgfVxuXG4gIG9uS2V5RG93bkhhbmxkZXIgPSAoZSkgPT4ge1xuICAgIEV2ZW50SGFuZGxlci5zZWFyY2hFbGVtZW50Rm9jdXNIYW5sZGVyKGUpO1xuICB9XG5cbiAgZ2V0U2VhcmNoRWxlbWVudCA9ICgpID0+IChcbiAgICA8U2VhcmNoQmFyXG4gICAgICBpbnB1dENsYXNzTmFtZT17Q0xBU1NfTkFNRV9TRUFSQ0hfRk9DVVNBQkxFfVxuICAgICAgc2VhcmNoUGxhY2VIb2xkZXI9e3RoaXMucHJvcHMuc2VhcmNoUGxhY2VIb2xkZXJ9XG4gICAgICBvblNlYXJjaENoYW5nZT17dGhpcy5vblNlYXJjaENoYW5nZUhhbmRsZXJ9XG4gICAgICBvbkNsb3NlQ2xpY2s9e3RoaXMucHJvcHMub25TaG91bGRDbG9zZVBvcG92ZXJ9XG4gICAgLz5cbiAgKTtcblxuICBnZXRMaXN0cyA9ICgpID0+IChcbiAgICA8ZGl2PlxuICAgICAgPEhTU2VsZWN0QnV0dG9uIGxhYmVsPXt0aGlzLnByb3BzLmJ0bk9wZW5WaWV3TGFiZWx9IG9uQ2xpY2s9e3RoaXMucHJvcHMub25TaG91bGRPcGVuVmlld30gLz5cbiAgICAgIDxociAvPlxuICAgICAgPEhTUGlubmVkTGlzdCBwaW5uZWRHcm91cExhYmVsPXt0aGlzLnByb3BzLnBpbm5lZEdyb3VwTGFiZWx9IC8+XG4gICAgICA8aHIgLz5cbiAgICAgIDxIU1JlY2VudExpc3QgcmVjZW50R3JvdXBMYWJlbD17dGhpcy5wcm9wcy5yZWNlbnRHcm91cExhYmVsfSAvPlxuICAgIDwvZGl2PlxuICApO1xuXG4gIGdldFNlYXJjaExheW91dCA9ICgpID0+IHtcbiAgICBjb25zdCBzZWFyY2hNb2RlbCA9IG5ldyBTZWFyY2godGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXIpO1xuICAgIGNvbnN0IGZvdW5kSXRlbXMgPSBzZWFyY2hNb2RlbC5nZXRGb3VuZEZyb21IaWVyYXJjaHkodGhpcy5zdGF0ZS5zZWFyY2hpbmdGb3IpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxQb3BvdmVyU2VhcmNoQ29udGVudFxuICAgICAgICBmb3VuZEl0ZW1zPXtmb3VuZEl0ZW1zfVxuICAgICAgICBvblNlbGVjdD17ZGF0YSA9PiB0aGlzLm9uU2VsZWN0SGFuZGxlcihkYXRhKX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIGdldE1haW5MYXlvdXQgPSAoKSA9PiAoXG4gICAgPENvbW1vbkxheW91dD5cbiAgICAgIHt0aGlzLmdldFNlYXJjaEVsZW1lbnQoKX1cbiAgICAgIHt0aGlzLnN0YXRlLnNlYXJjaGluZ0ZvciAhPT0gJycgPyB0aGlzLmdldFNlYXJjaExheW91dCgpIDogdGhpcy5nZXRMaXN0cygpfVxuICAgIDwvQ29tbW9uTGF5b3V0PlxuICApO1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItcG9wb3ZlclwiXG4gICAgICAgIHRhYkluZGV4PVwiMFwiXG4gICAgICAgIHJlZj17KGVsKSA9PiB7IHRoaXMubWFpbkVsZW1lbnQgPSBlbDsgfX1cbiAgICAgID5cbiAgICAgICAgeyB0aGlzLnN0YXRlLmlzRGF0YUxvYWRlZCA/IHRoaXMuZ2V0TWFpbkxheW91dCgpIDogPFNwaW5uZXJMYXlvdXQgLz4gfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5IaWVyYXJjaHlTZWxlY3RvclBvcG92ZXIucHJvcFR5cGVzID0ge1xuICBkYXRhU291cmNlUHJvdmlkZXI6IGRhdGFTb3VyY2VQcm92aWRlclR5cGUuaXNSZXF1aXJlZCxcbiAgb25Db21wb25lbnRCbHVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBvblNob3VsZE9wZW5WaWV3OiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TaG91bGRDbG9zZVBvcG92ZXI6IFByb3BUeXBlcy5mdW5jLFxuICBidG5PcGVuVmlld0xhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBzZWFyY2hQbGFjZUhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgcGlubmVkR3JvdXBMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgcmVjZW50R3JvdXBMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbn07XG5cbkhpZXJhcmNoeVNlbGVjdG9yUG9wb3Zlci5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uQ29tcG9uZW50Qmx1cjogKCkgPT4ge30sXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgb25TaG91bGRPcGVuVmlldzogKCkgPT4ge30sXG4gIG9uU2hvdWxkQ2xvc2VQb3BvdmVyOiAoKSA9PiB7fSxcbiAgYnRuT3BlblZpZXdMYWJlbDogJ1NlbGVjdC4uLicsXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiAnU2VhcmNoLi4uJyxcbiAgcGlubmVkR3JvdXBMYWJlbDogJ1Bpbm5lZCBpdGVtcycsXG4gIHJlY2VudEdyb3VwTGFiZWw6ICdSZWNlbnRseSB1c2VkJyxcbn07XG4iXX0=