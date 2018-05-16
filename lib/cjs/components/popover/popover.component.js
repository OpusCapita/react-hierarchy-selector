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
  searchPlaceHolder: 'Search...'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkhpZXJhcmNoeVNlbGVjdG9yUG9wb3ZlciIsInByb3BzIiwib25Gb2N1c091dEhhbmRsZXIiLCJlIiwiaXNGb2N1c09uQ3VycmVudFRhcmdldCIsIm9uQ29tcG9uZW50Qmx1ciIsIm9uU2VhcmNoQ2hhbmdlSGFuZGxlciIsInNlYXJjaGluZ1ZhbHVlIiwidGFyZ2V0IiwidmFsdWUiLCJzZWFyY2hpbmdGb3IiLCJlbm91Z2hTZWFyY2hUZXh0TGVuZ3RoIiwic2V0U3RhdGUiLCJvblNlbGVjdEhhbmRsZXIiLCJkYXRhIiwibW9kZWwiLCJncm91cE5hbWUiLCJuYW1lIiwiaXRlbXMiLCJBcnJheSIsImlzQXJyYXkiLCJvblNlbGVjdCIsIm9uS2V5RG93bkhhbmxkZXIiLCJzZWFyY2hFbGVtZW50Rm9jdXNIYW5sZGVyIiwiZ2V0U2VhcmNoRWxlbWVudCIsInNlYXJjaFBsYWNlSG9sZGVyIiwib25TaG91bGRDbG9zZVBvcG92ZXIiLCJnZXRMaXN0cyIsImJ0bk9wZW5WaWV3TGFiZWwiLCJvblNob3VsZE9wZW5WaWV3IiwiZ2V0U2VhcmNoTGF5b3V0Iiwic2VhcmNoTW9kZWwiLCJkYXRhU291cmNlUHJvdmlkZXIiLCJmb3VuZEl0ZW1zIiwiZ2V0Rm91bmRGcm9tSGllcmFyY2h5Iiwic3RhdGUiLCJmb3VuZEl0ZW1SZW5kZXJGdW5jdGlvbiIsImdldE1haW5MYXlvdXQiLCJpc0RhdGFMb2FkZWQiLCJpc0xvYWRlZCIsImNvbXBvbmVudFdpbGxNb3VudCIsImxvYWREYXRhIiwidGhlbiIsImNvbXBvbmVudERpZE1vdW50IiwibWFpbkVsZW1lbnQiLCJmb2N1cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJlbCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0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Q0FIWTtBQUl0Q0gsd0JBQXNCLGdDQUFNLENBQUUsQ0FKUTtBQUt0Q1UsMkJBQXlCLElBTGE7QUFNdENSLG9CQUFrQixXQU5vQjtBQU90Q0gscUJBQW1CO0FBUG1CLENBQXhDIiwiZmlsZSI6InBvcG92ZXIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLW5vbmludGVyYWN0aXZlLXRhYmluZGV4ICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5cclxuaW1wb3J0IHsgZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3R5cGVzJztcclxuaW1wb3J0IFNlYXJjaCBmcm9tICcuLi8uLi9tb2RlbHMvc2VhcmNoJztcclxuaW1wb3J0IEdyb3VwRW50aXR5IGZyb20gJy4uLy4uL21vZGVscy9ncm91cC5lbnRpdHknO1xyXG5cclxuaW1wb3J0IENvbW1vbkxheW91dCBmcm9tICcuL2xheW91dHMvY29tbW9uLmxheW91dCc7XHJcbmltcG9ydCBTcGlubmVyTGF5b3V0IGZyb20gJy4vbGF5b3V0cy9zcGlubmVyLmxheW91dCc7XHJcbmltcG9ydCBIU1NlbGVjdEJ1dHRvbiBmcm9tICcuL3NlbGVjdC1idG4uY29tcG9uZW50JztcclxuaW1wb3J0IFBvcG92ZXJTZWFyY2hDb250ZW50IGZyb20gJy4vc2VhcmNoL3NlYXJjaC1jb250ZW50LmNvbXBvbmVudCc7XHJcbmltcG9ydCBFdmVudEhhbmRsZXIgZnJvbSAnLi9ldmVudC1oYW5kbGVycyc7XHJcbmltcG9ydCB7IENMQVNTX05BTUVfU0VBUkNIX0ZPQ1VTQUJMRSB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuaW1wb3J0IFNlYXJjaEJhciBmcm9tICcuLi9zZWFyY2gtYmFyJztcclxuaW1wb3J0IFV0aWxzIGZyb20gJy4uLy4uL3V0aWxzJztcclxuaW1wb3J0ICcuL3BvcG92ZXIuc2Nzcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlTZWxlY3RvclBvcG92ZXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgaXNEYXRhTG9hZGVkOiBwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuaXNMb2FkZWQsXHJcbiAgICAgIHNlYXJjaGluZ0ZvcjogJycsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgaWYgKCF0aGlzLnN0YXRlLmlzRGF0YUxvYWRlZCkge1xyXG4gICAgICB0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5sb2FkRGF0YSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0RhdGFMb2FkZWQ6IHRydWUgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICB0aGlzLm1haW5FbGVtZW50LmZvY3VzKCk7XHJcbiAgICB0aGlzLm1haW5FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdGhpcy5vbkZvY3VzT3V0SGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgIHRoaXMubWFpbkVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCB0aGlzLm9uRm9jdXNPdXRIYW5kbGVyKTtcclxuICB9XHJcblxyXG4gIG9uRm9jdXNPdXRIYW5kbGVyID0gKGUpID0+IHtcclxuICAgIGlmICghVXRpbHMuaXNGb2N1c09uQ3VycmVudFRhcmdldChlKSkgdGhpcy5wcm9wcy5vbkNvbXBvbmVudEJsdXIoKTtcclxuICB9XHJcblxyXG4gIG9uU2VhcmNoQ2hhbmdlSGFuZGxlciA9IChlKSA9PiB7XHJcbiAgICBjb25zdCBzZWFyY2hpbmdWYWx1ZSA9IGUudGFyZ2V0ID8gZS50YXJnZXQudmFsdWUgfHwgJycgOiAnJztcclxuICAgIGxldCBzZWFyY2hpbmdGb3IgPSAnJztcclxuXHJcbiAgICBpZiAoVXRpbHMuZW5vdWdoU2VhcmNoVGV4dExlbmd0aChzZWFyY2hpbmdWYWx1ZSkpIHtcclxuICAgICAgc2VhcmNoaW5nRm9yID0gc2VhcmNoaW5nVmFsdWU7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoaW5nRm9yIH0pO1xyXG4gIH1cclxuXHJcbiAgb25TZWxlY3RIYW5kbGVyID0gKGRhdGEpID0+IHtcclxuICAgIGxldCBtb2RlbCA9IG51bGw7XHJcblxyXG4gICAgaWYgKGRhdGEpIHtcclxuICAgICAgY29uc3QgZ3JvdXBOYW1lID0gZGF0YS5uYW1lID8gZGF0YS5uYW1lIDogJ1VuZGVmaW5lZCc7XHJcbiAgICAgIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShkYXRhKSA/IGRhdGEgOiBbZGF0YV07XHJcbiAgICAgIG1vZGVsID0gbmV3IEdyb3VwRW50aXR5KGdyb3VwTmFtZSwgaXRlbXMpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChtb2RlbCk7XHJcbiAgfVxyXG5cclxuICBvbktleURvd25IYW5sZGVyID0gKGUpID0+IHtcclxuICAgIEV2ZW50SGFuZGxlci5zZWFyY2hFbGVtZW50Rm9jdXNIYW5sZGVyKGUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0U2VhcmNoRWxlbWVudCA9ICgpID0+IChcclxuICAgIDxTZWFyY2hCYXJcclxuICAgICAgaW5wdXRDbGFzc05hbWU9e0NMQVNTX05BTUVfU0VBUkNIX0ZPQ1VTQUJMRX1cclxuICAgICAgc2VhcmNoUGxhY2VIb2xkZXI9e3RoaXMucHJvcHMuc2VhcmNoUGxhY2VIb2xkZXJ9XHJcbiAgICAgIG9uU2VhcmNoQ2hhbmdlPXt0aGlzLm9uU2VhcmNoQ2hhbmdlSGFuZGxlcn1cclxuICAgICAgb25DbG9zZUNsaWNrPXt0aGlzLnByb3BzLm9uU2hvdWxkQ2xvc2VQb3BvdmVyfVxyXG4gICAgLz5cclxuICApO1xyXG5cclxuICBnZXRMaXN0cyA9ICgpID0+IChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxIU1NlbGVjdEJ1dHRvbiBsYWJlbD17dGhpcy5wcm9wcy5idG5PcGVuVmlld0xhYmVsfSBvbkNsaWNrPXt0aGlzLnByb3BzLm9uU2hvdWxkT3BlblZpZXd9IC8+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG5cclxuICBnZXRTZWFyY2hMYXlvdXQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBzZWFyY2hNb2RlbCA9IG5ldyBTZWFyY2godGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXIpO1xyXG4gICAgY29uc3QgZm91bmRJdGVtcyA9IHNlYXJjaE1vZGVsLmdldEZvdW5kRnJvbUhpZXJhcmNoeSh0aGlzLnN0YXRlLnNlYXJjaGluZ0Zvcik7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPFBvcG92ZXJTZWFyY2hDb250ZW50XHJcbiAgICAgICAgZm91bmRJdGVtcz17Zm91bmRJdGVtc31cclxuICAgICAgICBvblNlbGVjdD17ZGF0YSA9PiB0aGlzLm9uU2VsZWN0SGFuZGxlcihkYXRhKX1cclxuICAgICAgICBpdGVtUmVuZGVyRnVuY3Rpb249e3RoaXMucHJvcHMuZm91bmRJdGVtUmVuZGVyRnVuY3Rpb259XHJcbiAgICAgIC8+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0TWFpbkxheW91dCA9ICgpID0+IChcclxuICAgIDxDb21tb25MYXlvdXQ+XHJcbiAgICAgIHt0aGlzLmdldFNlYXJjaEVsZW1lbnQoKX1cclxuICAgICAge3RoaXMuc3RhdGUuc2VhcmNoaW5nRm9yICE9PSAnJyA/IHRoaXMuZ2V0U2VhcmNoTGF5b3V0KCkgOiB0aGlzLmdldExpc3RzKCl9XHJcbiAgICA8L0NvbW1vbkxheW91dD5cclxuICApO1xyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXBvcG92ZXJcIlxyXG4gICAgICAgIHRhYkluZGV4PVwiMFwiXHJcbiAgICAgICAgcmVmPXsoZWwpID0+IHsgdGhpcy5tYWluRWxlbWVudCA9IGVsOyB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgeyB0aGlzLnN0YXRlLmlzRGF0YUxvYWRlZCA/IHRoaXMuZ2V0TWFpbkxheW91dCgpIDogPFNwaW5uZXJMYXlvdXQgLz4gfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5IaWVyYXJjaHlTZWxlY3RvclBvcG92ZXIucHJvcFR5cGVzID0ge1xyXG4gIGRhdGFTb3VyY2VQcm92aWRlcjogZGF0YVNvdXJjZVByb3ZpZGVyVHlwZS5pc1JlcXVpcmVkLFxyXG4gIG9uQ29tcG9uZW50Qmx1cjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxyXG4gIG9uU2hvdWxkT3BlblZpZXc6IFByb3BUeXBlcy5mdW5jLFxyXG4gIGZvdW5kSXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcclxuICBvblNob3VsZENsb3NlUG9wb3ZlcjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgYnRuT3BlblZpZXdMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICBzZWFyY2hQbGFjZUhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcbkhpZXJhcmNoeVNlbGVjdG9yUG9wb3Zlci5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgb25Db21wb25lbnRCbHVyOiAoKSA9PiB7fSxcclxuICBvblNlbGVjdDogKCkgPT4ge30sXHJcbiAgb25TaG91bGRPcGVuVmlldzogKCkgPT4ge30sXHJcbiAgb25TaG91bGRDbG9zZVBvcG92ZXI6ICgpID0+IHt9LFxyXG4gIGZvdW5kSXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxyXG4gIGJ0bk9wZW5WaWV3TGFiZWw6ICdTZWxlY3QuLi4nLFxyXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiAnU2VhcmNoLi4uJyxcclxufTtcclxuIl19