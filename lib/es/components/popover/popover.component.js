function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import React from 'react';
import PropTypes from 'prop-types';

import { dataSourceProviderType } from '../../services/types';
import Search from '../../models/search';
import GroupEntity from '../../models/group.entity';

import CommonLayout from './layouts/common.layout';
import SpinnerLayout from './layouts/spinner.layout';
import HSSelectButton from './select-btn.component';
import PopoverSearchContent from './search/search-content.component';
import EventHandler from './event-handlers';
import { CLASS_NAME_SEARCH_FOCUSABLE } from './constants';
import SearchBar from '../search-bar';
import Utils from '../../utils';
import './popover.scss';

var HierarchySelectorPopover = function (_React$PureComponent) {
  _inherits(HierarchySelectorPopover, _React$PureComponent);

  function HierarchySelectorPopover(props) {
    _classCallCheck(this, HierarchySelectorPopover);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.onFocusOutHandler = function (e) {
      if (!Utils.isFocusOnCurrentTarget(e)) _this.props.onComponentBlur();
    };

    _this.onSearchChangeHandler = function (e) {
      var searchingValue = e.target ? e.target.value || '' : '';
      var searchingFor = '';

      if (Utils.enoughSearchTextLength(searchingValue)) {
        searchingFor = searchingValue;
      }
      _this.setState({ searchingFor: searchingFor });
    };

    _this.onSelectHandler = function (data) {
      var model = null;

      if (data) {
        var groupName = data.name ? data.name : 'Undefined';
        var items = Array.isArray(data) ? data : [data];
        model = new GroupEntity(groupName, items);
      }
      _this.props.onSelect(model);
    };

    _this.onKeyDownHanlder = function (e) {
      EventHandler.searchElementFocusHanlder(e);
    };

    _this.getSearchElement = function () {
      return React.createElement(SearchBar, {
        inputClassName: CLASS_NAME_SEARCH_FOCUSABLE,
        searchPlaceHolder: _this.props.searchPlaceHolder,
        onSearchChange: _this.onSearchChangeHandler,
        onCloseClick: _this.props.onShouldClosePopover
      });
    };

    _this.getLists = function () {
      return React.createElement(
        'div',
        null,
        React.createElement(HSSelectButton, { label: _this.props.btnOpenViewLabel, onClick: _this.props.onShouldOpenView })
      );
    };

    _this.getSearchLayout = function () {
      var searchModel = new Search(_this.props.dataSourceProvider);
      var foundItems = searchModel.getFoundFromHierarchy(_this.state.searchingFor);

      return React.createElement(PopoverSearchContent, {
        foundItems: foundItems,
        onSelect: function onSelect(data) {
          return _this.onSelectHandler(data);
        }
      });
    };

    _this.getMainLayout = function () {
      return React.createElement(
        CommonLayout,
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

    return React.createElement(
      'div',
      {
        className: 'oc-hierarchy-selector-popover',
        tabIndex: '0',
        ref: function ref(el) {
          _this3.mainElement = el;
        }
      },
      this.state.isDataLoaded ? this.getMainLayout() : React.createElement(SpinnerLayout, null)
    );
  };

  return HierarchySelectorPopover;
}(React.PureComponent);

export { HierarchySelectorPopover as default };


HierarchySelectorPopover.defaultProps = {
  onComponentBlur: function onComponentBlur() {},
  onSelect: function onSelect() {},
  onShouldOpenView: function onShouldOpenView() {},
  onShouldClosePopover: function onShouldClosePopover() {},
  btnOpenViewLabel: 'Select...',
  searchPlaceHolder: 'Search...'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSIsIlNlYXJjaCIsIkdyb3VwRW50aXR5IiwiQ29tbW9uTGF5b3V0IiwiU3Bpbm5lckxheW91dCIsIkhTU2VsZWN0QnV0dG9uIiwiUG9wb3ZlclNlYXJjaENvbnRlbnQiLCJFdmVudEhhbmRsZXIiLCJDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEUiLCJTZWFyY2hCYXIiLCJVdGlscyIsIkhpZXJhcmNoeVNlbGVjdG9yUG9wb3ZlciIsInByb3BzIiwib25Gb2N1c091dEhhbmRsZXIiLCJlIiwiaXNGb2N1c09uQ3VycmVudFRhcmdldCIsIm9uQ29tcG9uZW50Qmx1ciIsIm9uU2VhcmNoQ2hhbmdlSGFuZGxlciIsInNlYXJjaGluZ1ZhbHVlIiwidGFyZ2V0IiwidmFsdWUiLCJzZWFyY2hpbmdGb3IiLCJlbm91Z2hTZWFyY2hUZXh0TGVuZ3RoIiwic2V0U3RhdGUiLCJvblNlbGVjdEhhbmRsZXIiLCJkYXRhIiwibW9kZWwiLCJncm91cE5hbWUiLCJuYW1lIiwiaXRlbXMiLCJBcnJheSIsImlzQXJyYXkiLCJvblNlbGVjdCIsIm9uS2V5RG93bkhhbmxkZXIiLCJzZWFyY2hFbGVtZW50Rm9jdXNIYW5sZGVyIiwiZ2V0U2VhcmNoRWxlbWVudCIsInNlYXJjaFBsYWNlSG9sZGVyIiwib25TaG91bGRDbG9zZVBvcG92ZXIiLCJnZXRMaXN0cyIsImJ0bk9wZW5WaWV3TGFiZWwiLCJvblNob3VsZE9wZW5WaWV3IiwiZ2V0U2VhcmNoTGF5b3V0Iiwic2VhcmNoTW9kZWwiLCJkYXRhU291cmNlUHJvdmlkZXIiLCJmb3VuZEl0ZW1zIiwiZ2V0Rm91bmRGcm9tSGllcmFyY2h5Iiwic3RhdGUiLCJnZXRNYWluTGF5b3V0IiwiaXNEYXRhTG9hZGVkIiwiaXNMb2FkZWQiLCJjb21wb25lbnRXaWxsTW91bnQiLCJsb2FkRGF0YSIsInRoZW4iLCJjb21wb25lbnREaWRNb3VudCIsIm1haW5FbGVtZW50IiwiZm9jdXMiLCJhZGRFdmVudExpc3RlbmVyIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVuZGVyIiwiZWwiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBOztBQUVBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCOztBQUVBLFNBQVNDLHNCQUFULFFBQXVDLHNCQUF2QztBQUNBLE9BQU9DLE1BQVAsTUFBbUIscUJBQW5CO0FBQ0EsT0FBT0MsV0FBUCxNQUF3QiwyQkFBeEI7O0FBRUEsT0FBT0MsWUFBUCxNQUF5Qix5QkFBekI7QUFDQSxPQUFPQyxhQUFQLE1BQTBCLDBCQUExQjtBQUNBLE9BQU9DLGNBQVAsTUFBMkIsd0JBQTNCO0FBQ0EsT0FBT0Msb0JBQVAsTUFBaUMsbUNBQWpDO0FBQ0EsT0FBT0MsWUFBUCxNQUF5QixrQkFBekI7QUFDQSxTQUFTQywyQkFBVCxRQUE0QyxhQUE1QztBQUNBLE9BQU9DLFNBQVAsTUFBc0IsZUFBdEI7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLGFBQWxCO0FBQ0EsT0FBTyxnQkFBUDs7SUFFcUJDLHdCOzs7QUFDbkIsb0NBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsZ0NBQU1BLEtBQU4sQ0FEaUI7O0FBQUEsVUF5Qm5CQyxpQkF6Qm1CLEdBeUJDLFVBQUNDLENBQUQsRUFBTztBQUN6QixVQUFJLENBQUNKLE1BQU1LLHNCQUFOLENBQTZCRCxDQUE3QixDQUFMLEVBQXNDLE1BQUtGLEtBQUwsQ0FBV0ksZUFBWDtBQUN2QyxLQTNCa0I7O0FBQUEsVUE2Qm5CQyxxQkE3Qm1CLEdBNkJLLFVBQUNILENBQUQsRUFBTztBQUM3QixVQUFNSSxpQkFBaUJKLEVBQUVLLE1BQUYsR0FBV0wsRUFBRUss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QUFrQyxVQUFsQyxFQUE4QyxLQUFLM0MsaUJBQW5EO0FBQ0QsRzs7cUNBRUQ0QyxvQixtQ0FBdUI7QUFDckIsU0FBS0gsV0FBTCxDQUFpQkksbUJBQWpCLENBQXFDLFVBQXJDLEVBQWlELEtBQUs3QyxpQkFBdEQ7QUFDRCxHOztxQ0FpRUQ4QyxNLHFCQUFTO0FBQUE7O0FBQ1AsV0FDRTtBQUFBO0FBQUE7QUFDRSxtQkFBVSwrQkFEWjtBQUVFLGtCQUFTLEdBRlg7QUFHRSxhQUFLLGFBQUNDLEVBQUQsRUFBUTtBQUFFLGlCQUFLTixXQUFMLEdBQW1CTSxFQUFuQjtBQUF3QjtBQUh6QztBQUtJLFdBQUtkLEtBQUwsQ0FBV0UsWUFBWCxHQUEwQixLQUFLRCxhQUFMLEVBQTFCLEdBQWlELG9CQUFDLGFBQUQ7QUFMckQsS0FERjtBQVNELEc7OztFQW5HbURqRCxNQUFNK0QsYTs7U0FBdkNsRCx3Qjs7O0FBZ0hyQkEseUJBQXlCbUQsWUFBekIsR0FBd0M7QUFDdEM5QyxtQkFBaUIsMkJBQU0sQ0FBRSxDQURhO0FBRXRDZ0IsWUFBVSxvQkFBTSxDQUFFLENBRm9CO0FBR3RDUSxvQkFBa0IsNEJBQU0sQ0FBRSxDQUhZO0FBSXRDSCx3QkFBc0IsZ0NBQU0sQ0FBRSxDQUpRO0FBS3RDRSxvQkFBa0IsV0FMb0I7QUFNdENILHFCQUFtQjtBQU5tQixDQUF4QyIsImZpbGUiOiJwb3BvdmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9ucyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1ub25pbnRlcmFjdGl2ZS10YWJpbmRleCAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuXHJcbmltcG9ydCB7IGRhdGFTb3VyY2VQcm92aWRlclR5cGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90eXBlcyc7XHJcbmltcG9ydCBTZWFyY2ggZnJvbSAnLi4vLi4vbW9kZWxzL3NlYXJjaCc7XHJcbmltcG9ydCBHcm91cEVudGl0eSBmcm9tICcuLi8uLi9tb2RlbHMvZ3JvdXAuZW50aXR5JztcclxuXHJcbmltcG9ydCBDb21tb25MYXlvdXQgZnJvbSAnLi9sYXlvdXRzL2NvbW1vbi5sYXlvdXQnO1xyXG5pbXBvcnQgU3Bpbm5lckxheW91dCBmcm9tICcuL2xheW91dHMvc3Bpbm5lci5sYXlvdXQnO1xyXG5pbXBvcnQgSFNTZWxlY3RCdXR0b24gZnJvbSAnLi9zZWxlY3QtYnRuLmNvbXBvbmVudCc7XHJcbmltcG9ydCBQb3BvdmVyU2VhcmNoQ29udGVudCBmcm9tICcuL3NlYXJjaC9zZWFyY2gtY29udGVudC5jb21wb25lbnQnO1xyXG5pbXBvcnQgRXZlbnRIYW5kbGVyIGZyb20gJy4vZXZlbnQtaGFuZGxlcnMnO1xyXG5pbXBvcnQgeyBDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEUgfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmltcG9ydCBTZWFyY2hCYXIgZnJvbSAnLi4vc2VhcmNoLWJhcic7XHJcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi91dGlscyc7XHJcbmltcG9ydCAnLi9wb3BvdmVyLnNjc3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5U2VsZWN0b3JQb3BvdmVyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGlzRGF0YUxvYWRlZDogcHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzTG9hZGVkLFxyXG4gICAgICBzZWFyY2hpbmdGb3I6ICcnLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgIGlmICghdGhpcy5zdGF0ZS5pc0RhdGFMb2FkZWQpIHtcclxuICAgICAgdGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXIubG9hZERhdGEoKS50aGVuKCgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgaXNEYXRhTG9hZGVkOiB0cnVlIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgdGhpcy5tYWluRWxlbWVudC5mb2N1cygpO1xyXG4gICAgdGhpcy5tYWluRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHRoaXMub25Gb2N1c091dEhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICB0aGlzLm1haW5FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdGhpcy5vbkZvY3VzT3V0SGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBvbkZvY3VzT3V0SGFuZGxlciA9IChlKSA9PiB7XHJcbiAgICBpZiAoIVV0aWxzLmlzRm9jdXNPbkN1cnJlbnRUYXJnZXQoZSkpIHRoaXMucHJvcHMub25Db21wb25lbnRCbHVyKCk7XHJcbiAgfVxyXG5cclxuICBvblNlYXJjaENoYW5nZUhhbmRsZXIgPSAoZSkgPT4ge1xyXG4gICAgY29uc3Qgc2VhcmNoaW5nVmFsdWUgPSBlLnRhcmdldCA/IGUudGFyZ2V0LnZhbHVlIHx8ICcnIDogJyc7XHJcbiAgICBsZXQgc2VhcmNoaW5nRm9yID0gJyc7XHJcblxyXG4gICAgaWYgKFV0aWxzLmVub3VnaFNlYXJjaFRleHRMZW5ndGgoc2VhcmNoaW5nVmFsdWUpKSB7XHJcbiAgICAgIHNlYXJjaGluZ0ZvciA9IHNlYXJjaGluZ1ZhbHVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaGluZ0ZvciB9KTtcclxuICB9XHJcblxyXG4gIG9uU2VsZWN0SGFuZGxlciA9IChkYXRhKSA9PiB7XHJcbiAgICBsZXQgbW9kZWwgPSBudWxsO1xyXG5cclxuICAgIGlmIChkYXRhKSB7XHJcbiAgICAgIGNvbnN0IGdyb3VwTmFtZSA9IGRhdGEubmFtZSA/IGRhdGEubmFtZSA6ICdVbmRlZmluZWQnO1xyXG4gICAgICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkoZGF0YSkgPyBkYXRhIDogW2RhdGFdO1xyXG4gICAgICBtb2RlbCA9IG5ldyBHcm91cEVudGl0eShncm91cE5hbWUsIGl0ZW1zKTtcclxuICAgIH1cclxuICAgIHRoaXMucHJvcHMub25TZWxlY3QobW9kZWwpO1xyXG4gIH1cclxuXHJcbiAgb25LZXlEb3duSGFubGRlciA9IChlKSA9PiB7XHJcbiAgICBFdmVudEhhbmRsZXIuc2VhcmNoRWxlbWVudEZvY3VzSGFubGRlcihlKTtcclxuICB9XHJcblxyXG4gIGdldFNlYXJjaEVsZW1lbnQgPSAoKSA9PiAoXHJcbiAgICA8U2VhcmNoQmFyXHJcbiAgICAgIGlucHV0Q2xhc3NOYW1lPXtDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEV9XHJcbiAgICAgIHNlYXJjaFBsYWNlSG9sZGVyPXt0aGlzLnByb3BzLnNlYXJjaFBsYWNlSG9sZGVyfVxyXG4gICAgICBvblNlYXJjaENoYW5nZT17dGhpcy5vblNlYXJjaENoYW5nZUhhbmRsZXJ9XHJcbiAgICAgIG9uQ2xvc2VDbGljaz17dGhpcy5wcm9wcy5vblNob3VsZENsb3NlUG9wb3Zlcn1cclxuICAgIC8+XHJcbiAgKTtcclxuXHJcbiAgZ2V0TGlzdHMgPSAoKSA9PiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8SFNTZWxlY3RCdXR0b24gbGFiZWw9e3RoaXMucHJvcHMuYnRuT3BlblZpZXdMYWJlbH0gb25DbGljaz17dGhpcy5wcm9wcy5vblNob3VsZE9wZW5WaWV3fSAvPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxuXHJcbiAgZ2V0U2VhcmNoTGF5b3V0ID0gKCkgPT4ge1xyXG4gICAgY29uc3Qgc2VhcmNoTW9kZWwgPSBuZXcgU2VhcmNoKHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyKTtcclxuICAgIGNvbnN0IGZvdW5kSXRlbXMgPSBzZWFyY2hNb2RlbC5nZXRGb3VuZEZyb21IaWVyYXJjaHkodGhpcy5zdGF0ZS5zZWFyY2hpbmdGb3IpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxQb3BvdmVyU2VhcmNoQ29udGVudFxyXG4gICAgICAgIGZvdW5kSXRlbXM9e2ZvdW5kSXRlbXN9XHJcbiAgICAgICAgb25TZWxlY3Q9e2RhdGEgPT4gdGhpcy5vblNlbGVjdEhhbmRsZXIoZGF0YSl9XHJcbiAgICAgIC8+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0TWFpbkxheW91dCA9ICgpID0+IChcclxuICAgIDxDb21tb25MYXlvdXQ+XHJcbiAgICAgIHt0aGlzLmdldFNlYXJjaEVsZW1lbnQoKX1cclxuICAgICAge3RoaXMuc3RhdGUuc2VhcmNoaW5nRm9yICE9PSAnJyA/IHRoaXMuZ2V0U2VhcmNoTGF5b3V0KCkgOiB0aGlzLmdldExpc3RzKCl9XHJcbiAgICA8L0NvbW1vbkxheW91dD5cclxuICApO1xyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXBvcG92ZXJcIlxyXG4gICAgICAgIHRhYkluZGV4PVwiMFwiXHJcbiAgICAgICAgcmVmPXsoZWwpID0+IHsgdGhpcy5tYWluRWxlbWVudCA9IGVsOyB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgeyB0aGlzLnN0YXRlLmlzRGF0YUxvYWRlZCA/IHRoaXMuZ2V0TWFpbkxheW91dCgpIDogPFNwaW5uZXJMYXlvdXQgLz4gfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5IaWVyYXJjaHlTZWxlY3RvclBvcG92ZXIucHJvcFR5cGVzID0ge1xyXG4gIGRhdGFTb3VyY2VQcm92aWRlcjogZGF0YVNvdXJjZVByb3ZpZGVyVHlwZS5pc1JlcXVpcmVkLFxyXG4gIG9uQ29tcG9uZW50Qmx1cjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxyXG4gIG9uU2hvdWxkT3BlblZpZXc6IFByb3BUeXBlcy5mdW5jLFxyXG4gIG9uU2hvdWxkQ2xvc2VQb3BvdmVyOiBQcm9wVHlwZXMuZnVuYyxcclxuICBidG5PcGVuVmlld0xhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5cclxuSGllcmFyY2h5U2VsZWN0b3JQb3BvdmVyLmRlZmF1bHRQcm9wcyA9IHtcclxuICBvbkNvbXBvbmVudEJsdXI6ICgpID0+IHt9LFxyXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcclxuICBvblNob3VsZE9wZW5WaWV3OiAoKSA9PiB7fSxcclxuICBvblNob3VsZENsb3NlUG9wb3ZlcjogKCkgPT4ge30sXHJcbiAgYnRuT3BlblZpZXdMYWJlbDogJ1NlbGVjdC4uLicsXHJcbiAgc2VhcmNoUGxhY2VIb2xkZXI6ICdTZWFyY2guLi4nLFxyXG59O1xyXG4iXX0=