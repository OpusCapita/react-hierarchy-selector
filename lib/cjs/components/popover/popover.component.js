"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSearchbar = _interopRequireDefault(require("@opuscapita/react-searchbar"));

var _types = require("../../services/types");

var _search = _interopRequireDefault(require("../../models/search"));

var _group = _interopRequireDefault(require("../../models/group.entity"));

var _common = _interopRequireDefault(require("./layouts/common.layout"));

var _spinner = _interopRequireDefault(require("./layouts/spinner.layout"));

var _selectBtn = _interopRequireDefault(require("./select-btn.component"));

var _searchContent = _interopRequireDefault(require("./search/search-content.component"));

var _eventHandlers = _interopRequireDefault(require("./event-handlers"));

var _constants = require("./constants");

var _utils = _interopRequireDefault(require("../../utils"));

require("./popover.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HierarchySelectorPopover =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(HierarchySelectorPopover, _React$PureComponent);

  function HierarchySelectorPopover(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onFocusOutHandler", function (e) {
      if (!_utils["default"].isFocusOnCurrentTarget(e)) _this.props.onComponentBlur();
    });

    _defineProperty(_assertThisInitialized(_this), "onSearchChangeHandler", function (searchingFor) {
      return _this.setState({
        searchingFor: searchingFor
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectHandler", function (data, flags) {
      var model = null;

      if (data) {
        var groupName = data.name ? data.name : 'Undefined';
        var items = Array.isArray(data) ? data : [data];
        model = new _group["default"](groupName, items);
      }

      _this.props.onSelect(model, flags);
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDownHanlder", function (e) {
      _eventHandlers["default"].searchElementFocusHanlder(e);
    });

    _defineProperty(_assertThisInitialized(_this), "getSearchElement", function () {
      return _react["default"].createElement(_reactSearchbar["default"], {
        autoFocus: true,
        defaltValue: _this.state.searchingFor,
        inputClassName: _constants.CLASS_NAME_SEARCH_FOCUSABLE,
        isDynamic: true,
        isTooltipEnabled: !!_this.props.searchTooltip,
        minChars: 2,
        translations: {
          tooltip: _this.props.searchTooltip,
          searchPlaceHolder: _this.props.searchPlaceHolder
        },
        onSearch: _this.onSearchChangeHandler,
        onClear: _this.props.onShouldClosePopover
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getLists", function () {
      return _react["default"].createElement("div", null, _react["default"].createElement(_selectBtn["default"], {
        label: _this.props.btnOpenViewLabel,
        onClick: _this.props.onShouldOpenView
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "getSearchLayout", function () {
      var searchModel = new _search["default"](_this.props.dataSourceProvider);
      var foundItems = searchModel.getFoundFromHierarchy(_this.state.searchingFor);
      return _react["default"].createElement(_searchContent["default"], {
        foundItems: foundItems,
        onSelect: _this.onSelectHandler,
        itemRenderFunction: _this.props.foundItemRenderFunction
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getMainLayout", function () {
      return _react["default"].createElement(_common["default"], null, _this.getSearchElement(), _this.state.searchingFor !== '' ? _this.getSearchLayout() : _this.getLists());
    });

    _this.state = {
      isDataLoaded: props.dataSourceProvider.isLoaded,
      searchingFor: ''
    };
    return _this;
  }

  var _proto = HierarchySelectorPopover.prototype;

  _proto.componentWillMount = function componentWillMount() {
    var _this2 = this;

    if (!this.state.isDataLoaded) {
      this.props.dataSourceProvider.loadData().then(function () {
        _this2.setState({
          isDataLoaded: true
        });
      });
    }
  };

  _proto.componentDidMount = function componentDidMount() {
    this.mainElement.addEventListener('focusout', this.onFocusOutHandler);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.mainElement.removeEventListener('focusout', this.onFocusOutHandler);
  };

  _proto.render = function render() {
    var _this3 = this;

    return _react["default"].createElement("div", {
      className: "oc-hierarchy-selector-popover",
      tabIndex: "0",
      ref: function ref(el) {
        _this3.mainElement = el;
      }
    }, this.state.isDataLoaded ? this.getMainLayout() : _react["default"].createElement(_spinner["default"], null));
  };

  return HierarchySelectorPopover;
}(_react["default"].PureComponent);

exports["default"] = HierarchySelectorPopover;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkhpZXJhcmNoeVNlbGVjdG9yUG9wb3ZlciIsInByb3BzIiwiZSIsIlV0aWxzIiwiaXNGb2N1c09uQ3VycmVudFRhcmdldCIsIm9uQ29tcG9uZW50Qmx1ciIsInNlYXJjaGluZ0ZvciIsInNldFN0YXRlIiwiZGF0YSIsImZsYWdzIiwibW9kZWwiLCJncm91cE5hbWUiLCJuYW1lIiwiaXRlbXMiLCJBcnJheSIsImlzQXJyYXkiLCJHcm91cEVudGl0eSIsIm9uU2VsZWN0IiwiRXZlbnRIYW5kbGVyIiwic2VhcmNoRWxlbWVudEZvY3VzSGFubGRlciIsInN0YXRlIiwiQ0xBU1NfTkFNRV9TRUFSQ0hfRk9DVVNBQkxFIiwic2VhcmNoVG9vbHRpcCIsInRvb2x0aXAiLCJzZWFyY2hQbGFjZUhvbGRlciIsIm9uU2VhcmNoQ2hhbmdlSGFuZGxlciIsIm9uU2hvdWxkQ2xvc2VQb3BvdmVyIiwiYnRuT3BlblZpZXdMYWJlbCIsIm9uU2hvdWxkT3BlblZpZXciLCJzZWFyY2hNb2RlbCIsIlNlYXJjaCIsImRhdGFTb3VyY2VQcm92aWRlciIsImZvdW5kSXRlbXMiLCJnZXRGb3VuZEZyb21IaWVyYXJjaHkiLCJvblNlbGVjdEhhbmRsZXIiLCJmb3VuZEl0ZW1SZW5kZXJGdW5jdGlvbiIsImdldFNlYXJjaEVsZW1lbnQiLCJnZXRTZWFyY2hMYXlvdXQiLCJnZXRMaXN0cyIsImlzRGF0YUxvYWRlZCIsImlzTG9hZGVkIiwiY29tcG9uZW50V2lsbE1vdW50IiwibG9hZERhdGEiLCJ0aGVuIiwiY29tcG9uZW50RGlkTW91bnQiLCJtYWluRWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbkZvY3VzT3V0SGFuZGxlciIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlciIsImVsIiwiZ2V0TWFpbkxheW91dCIs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LFlBQVgsR0FBMEIsS0FBS2EsYUFBTCxFQUExQixHQUFpRCxnQ0FBQyxtQkFBRCxPQUxyRCxDQURGO0FBU0QsRzs7O0VBbkdtREMsa0JBQU1DLGE7OztBQWtINUR0RCx3QkFBd0IsQ0FBQ3VELFlBQXpCLEdBQXdDO0FBQ3RDbEQsRUFBQUEsZUFBZSxFQUFFLDJCQUFNLENBQUUsQ0FEYTtBQUV0Q1ksRUFBQUEsUUFBUSxFQUFFLG9CQUFNLENBQUUsQ0FGb0I7QUFHdENXLEVBQUFBLGdCQUFnQixFQUFFLDRCQUFNLENBQUUsQ0FIWTtBQUl0Q0YsRUFBQUEsb0JBQW9CLEVBQUUsZ0NBQU0sQ0FBRSxDQUpRO0FBS3RDUyxFQUFBQSx1QkFBdUIsRUFBRSxJQUxhO0FBTXRDUixFQUFBQSxnQkFBZ0IsRUFBRSxXQU5vQjtBQU90Q0gsRUFBQUEsaUJBQWlCLEVBQUUsV0FQbUI7QUFRdENGLEVBQUFBLGFBQWEsRUFBRTtBQVJ1QixDQUF4QyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9ucyAqL1xuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tbm9uaW50ZXJhY3RpdmUtdGFiaW5kZXggKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgU2VhcmNoQmFyIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNlYXJjaGJhcic7XG5cbmltcG9ydCB7IGRhdGFTb3VyY2VQcm92aWRlclR5cGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90eXBlcyc7XG5pbXBvcnQgU2VhcmNoIGZyb20gJy4uLy4uL21vZGVscy9zZWFyY2gnO1xuaW1wb3J0IEdyb3VwRW50aXR5IGZyb20gJy4uLy4uL21vZGVscy9ncm91cC5lbnRpdHknO1xuXG5pbXBvcnQgQ29tbW9uTGF5b3V0IGZyb20gJy4vbGF5b3V0cy9jb21tb24ubGF5b3V0JztcbmltcG9ydCBTcGlubmVyTGF5b3V0IGZyb20gJy4vbGF5b3V0cy9zcGlubmVyLmxheW91dCc7XG5pbXBvcnQgSFNTZWxlY3RCdXR0b24gZnJvbSAnLi9zZWxlY3QtYnRuLmNvbXBvbmVudCc7XG5pbXBvcnQgUG9wb3ZlclNlYXJjaENvbnRlbnQgZnJvbSAnLi9zZWFyY2gvc2VhcmNoLWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCBFdmVudEhhbmRsZXIgZnJvbSAnLi9ldmVudC1oYW5kbGVycyc7XG5pbXBvcnQgeyBDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0ICcuL3BvcG92ZXIuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVNlbGVjdG9yUG9wb3ZlciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaXNEYXRhTG9hZGVkOiBwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuaXNMb2FkZWQsXG4gICAgICBzZWFyY2hpbmdGb3I6ICcnLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLmlzRGF0YUxvYWRlZCkge1xuICAgICAgdGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXIubG9hZERhdGEoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzRGF0YUxvYWRlZDogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMubWFpbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCB0aGlzLm9uRm9jdXNPdXRIYW5kbGVyKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMubWFpbkVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCB0aGlzLm9uRm9jdXNPdXRIYW5kbGVyKTtcbiAgfVxuXG4gIG9uRm9jdXNPdXRIYW5kbGVyID0gKGUpID0+IHtcbiAgICBpZiAoIVV0aWxzLmlzRm9jdXNPbkN1cnJlbnRUYXJnZXQoZSkpIHRoaXMucHJvcHMub25Db21wb25lbnRCbHVyKCk7XG4gIH1cblxuICBvblNlYXJjaENoYW5nZUhhbmRsZXIgPSBzZWFyY2hpbmdGb3IgPT4gdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaGluZ0ZvciB9KTtcblxuICBvblNlbGVjdEhhbmRsZXIgPSAoZGF0YSwgZmxhZ3MpID0+IHtcbiAgICBsZXQgbW9kZWwgPSBudWxsO1xuXG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIGNvbnN0IGdyb3VwTmFtZSA9IGRhdGEubmFtZSA/IGRhdGEubmFtZSA6ICdVbmRlZmluZWQnO1xuICAgICAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KGRhdGEpID8gZGF0YSA6IFtkYXRhXTtcbiAgICAgIG1vZGVsID0gbmV3IEdyb3VwRW50aXR5KGdyb3VwTmFtZSwgaXRlbXMpO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KG1vZGVsLCBmbGFncyk7XG4gIH1cblxuICBvbktleURvd25IYW5sZGVyID0gKGUpID0+IHtcbiAgICBFdmVudEhhbmRsZXIuc2VhcmNoRWxlbWVudEZvY3VzSGFubGRlcihlKTtcbiAgfVxuXG4gIGdldFNlYXJjaEVsZW1lbnQgPSAoKSA9PiAoXG4gICAgPFNlYXJjaEJhclxuICAgICAgYXV0b0ZvY3VzXG4gICAgICBkZWZhbHRWYWx1ZT17dGhpcy5zdGF0ZS5zZWFyY2hpbmdGb3J9XG4gICAgICBpbnB1dENsYXNzTmFtZT17Q0xBU1NfTkFNRV9TRUFSQ0hfRk9DVVNBQkxFfVxuICAgICAgaXNEeW5hbWljXG4gICAgICBpc1Rvb2x0aXBFbmFibGVkPXshIXRoaXMucHJvcHMuc2VhcmNoVG9vbHRpcH1cbiAgICAgIG1pbkNoYXJzPXsyfVxuICAgICAgdHJhbnNsYXRpb25zPXt7XG4gICAgICAgIHRvb2x0aXA6IHRoaXMucHJvcHMuc2VhcmNoVG9vbHRpcCxcbiAgICAgICAgc2VhcmNoUGxhY2VIb2xkZXI6IHRoaXMucHJvcHMuc2VhcmNoUGxhY2VIb2xkZXIsXG4gICAgICB9fVxuICAgICAgb25TZWFyY2g9e3RoaXMub25TZWFyY2hDaGFuZ2VIYW5kbGVyfVxuICAgICAgb25DbGVhcj17dGhpcy5wcm9wcy5vblNob3VsZENsb3NlUG9wb3Zlcn1cbiAgICAvPlxuICApO1xuXG4gIGdldExpc3RzID0gKCkgPT4gKFxuICAgIDxkaXY+XG4gICAgICA8SFNTZWxlY3RCdXR0b24gbGFiZWw9e3RoaXMucHJvcHMuYnRuT3BlblZpZXdMYWJlbH0gb25DbGljaz17dGhpcy5wcm9wcy5vblNob3VsZE9wZW5WaWV3fSAvPlxuICAgIDwvZGl2PlxuICApO1xuXG4gIGdldFNlYXJjaExheW91dCA9ICgpID0+IHtcbiAgICBjb25zdCBzZWFyY2hNb2RlbCA9IG5ldyBTZWFyY2godGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXIpO1xuICAgIGNvbnN0IGZvdW5kSXRlbXMgPSBzZWFyY2hNb2RlbC5nZXRGb3VuZEZyb21IaWVyYXJjaHkodGhpcy5zdGF0ZS5zZWFyY2hpbmdGb3IpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxQb3BvdmVyU2VhcmNoQ29udGVudFxuICAgICAgICBmb3VuZEl0ZW1zPXtmb3VuZEl0ZW1zfVxuICAgICAgICBvblNlbGVjdD17dGhpcy5vblNlbGVjdEhhbmRsZXJ9XG4gICAgICAgIGl0ZW1SZW5kZXJGdW5jdGlvbj17dGhpcy5wcm9wcy5mb3VuZEl0ZW1SZW5kZXJGdW5jdGlvbn1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIGdldE1haW5MYXlvdXQgPSAoKSA9PiAoXG4gICAgPENvbW1vbkxheW91dD5cbiAgICAgIHt0aGlzLmdldFNlYXJjaEVsZW1lbnQoKX1cbiAgICAgIHt0aGlzLnN0YXRlLnNlYXJjaGluZ0ZvciAhPT0gJycgPyB0aGlzLmdldFNlYXJjaExheW91dCgpIDogdGhpcy5nZXRMaXN0cygpfVxuICAgIDwvQ29tbW9uTGF5b3V0PlxuICApO1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItcG9wb3ZlclwiXG4gICAgICAgIHRhYkluZGV4PVwiMFwiXG4gICAgICAgIHJlZj17KGVsKSA9PiB7IHRoaXMubWFpbkVsZW1lbnQgPSBlbDsgfX1cbiAgICAgID5cbiAgICAgICAgeyB0aGlzLnN0YXRlLmlzRGF0YUxvYWRlZCA/IHRoaXMuZ2V0TWFpbkxheW91dCgpIDogPFNwaW5uZXJMYXlvdXQgLz4gfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5IaWVyYXJjaHlTZWxlY3RvclBvcG92ZXIucHJvcFR5cGVzID0ge1xuICBkYXRhU291cmNlUHJvdmlkZXI6IGRhdGFTb3VyY2VQcm92aWRlclR5cGUuaXNSZXF1aXJlZCxcbiAgb25Db21wb25lbnRCbHVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBvblNob3VsZE9wZW5WaWV3OiBQcm9wVHlwZXMuZnVuYyxcbiAgZm91bmRJdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICBvblNob3VsZENsb3NlUG9wb3ZlcjogUHJvcFR5cGVzLmZ1bmMsXG4gIGJ0bk9wZW5WaWV3TGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBzZWFyY2hUb29sdGlwOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZWxlbWVudCwgUHJvcFR5cGVzLnN0cmluZ10pLFxufTtcblxuSGllcmFyY2h5U2VsZWN0b3JQb3BvdmVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25Db21wb25lbnRCbHVyOiAoKSA9PiB7fSxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBvblNob3VsZE9wZW5WaWV3OiAoKSA9PiB7fSxcbiAgb25TaG91bGRDbG9zZVBvcG92ZXI6ICgpID0+IHt9LFxuICBmb3VuZEl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcbiAgYnRuT3BlblZpZXdMYWJlbDogJ1NlbGVjdC4uLicsXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiAnU2VhcmNoLi4uJyxcbiAgc2VhcmNoVG9vbHRpcDogbnVsbCxcbn07XG4iXX0=