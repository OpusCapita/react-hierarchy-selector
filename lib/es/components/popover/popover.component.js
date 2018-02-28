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
import HSPinnedList from './pinned-list.component';
import HSRecentList from './recent-list.component';
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
        React.createElement(HSSelectButton, { label: _this.props.btnOpenViewLabel, onClick: _this.props.onShouldOpenView }),
        React.createElement('hr', null),
        React.createElement(HSPinnedList, { pinnedGroupLabel: _this.props.pinnedGroupLabel }),
        React.createElement('hr', null),
        React.createElement(HSRecentList, { recentGroupLabel: _this.props.recentGroupLabel })
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
  searchPlaceHolder: 'Search...',
  pinnedGroupLabel: 'Pinned items',
  recentGroupLabel: 'Recently used'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSIsIlNlYXJjaCIsIkdyb3VwRW50aXR5IiwiQ29tbW9uTGF5b3V0IiwiU3Bpbm5lckxheW91dCIsIkhTU2VsZWN0QnV0dG9uIiwiUG9wb3ZlclNlYXJjaENvbnRlbnQiLCJIU1Bpbm5lZExpc3QiLCJIU1JlY2VudExpc3QiLCJFdmVudEhhbmRsZXIiLCJDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEUiLCJTZWFyY2hCYXIiLCJVdGlscyIsIkhpZXJhcmNoeVNlbGVjdG9yUG9wb3ZlciIsInByb3BzIiwib25Gb2N1c091dEhhbmRsZXIiLCJlIiwiaXNGb2N1c09uQ3VycmVudFRhcmdldCIsIm9uQ29tcG9uZW50Qmx1ciIsIm9uU2VhcmNoQ2hhbmdlSGFuZGxlciIsInNlYXJjaGluZ1ZhbHVlIiwidGFyZ2V0IiwidmFsdWUiLCJzZWFyY2hpbmdGb3IiLCJlbm91Z2hTZWFyY2hUZXh0TGVuZ3RoIiwic2V0U3RhdGUiLCJvblNlbGVjdEhhbmRsZXIiLCJkYXRhIiwibW9kZWwiLCJncm91cE5hbWUiLCJuYW1lIiwiaXRlbXMiLCJBcnJheSIsImlzQXJyYXkiLCJvblNlbGVjdCIsIm9uS2V5RG93bkhhbmxkZXIiLCJzZWFyY2hFbGVtZW50Rm9jdXNIYW5sZGVyIiwiZ2V0U2VhcmNoRWxlbWVudCIsInNlYXJjaFBsYWNlSG9sZGVyIiwib25TaG91bGRDbG9zZVBvcG92ZXIiLCJnZXRMaXN0cyIsImJ0bk9wZW5WaWV3TGFiZWwiLCJvblNob3VsZE9wZW5WaWV3IiwicGlubmVkR3JvdXBMYWJlbCIsInJlY2VudEdyb3VwTGFiZWwiLCJnZXRTZWFyY2hMYXlvdXQiLCJzZWFyY2hNb2RlbCIsImRhdGFTb3VyY2VQcm92aWRlciIsImZvdW5kSXRlbXMiLCJnZXRGb3VuZEZyb21IaWVyYXJjaHkiLCJzdGF0ZSIsImdldE1haW5MYXlvdXQiLCJpc0RhdGFMb2FkZWQiLCJpc0xvYWRlZCIsImNvbXBvbmVudFdpbGxNb3VudCIsImxvYWREYXRhIiwidGhlbiIsImNvbXBvbmVudERpZE1vdW50IiwibWFpbkVsZW1lbnQiLCJmb2N1cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJlbCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7O0FBRUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7O0FBRUEsU0FBU0Msc0JBQVQsUUFBdUMsc0JBQXZDO0FBQ0EsT0FBT0MsTUFBUCxNQUFtQixxQkFBbkI7QUFDQSxPQUFPQyxXQUFQLE1BQXdCLDJCQUF4Qjs7QUFFQSxPQUFPQyxZQUFQLE1BQXlCLHlCQUF6QjtBQUNBLE9BQU9DLGFBQVAsTUFBMEIsMEJBQTFCO0FBQ0EsT0FBT0MsY0FBUCxNQUEyQix3QkFBM0I7QUFDQSxPQUFPQyxvQkFBUCxNQUFpQyxtQ0FBakM7QUFDQSxPQUFPQyxZQUFQLE1BQXlCLHlCQUF6QjtBQUNBLE9BQU9DLFlBQVAsTUFBeUIseUJBQXpCO0FBQ0EsT0FBT0MsWUFBUCxNQUF5QixrQkFBekI7QUFDQSxTQUFTQywyQkFBVCxRQUE0QyxhQUE1QztBQUNBLE9BQU9DLFNBQVAsTUFBc0IsZUFBdEI7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLGFBQWxCO0FBQ0EsT0FBTyxnQkFBUDs7SUFFcUJDLHdCOzs7QUFDbkIsb0NBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsZ0NBQU1BLEtBQU4sQ0FEaUI7O0FBQUEsVUF5Qm5CQyxpQkF6Qm1CLEdBeUJDLFVBQUNDLENBQUQsRUFBTztBQUN6QixVQUFJLENBQUNKLE1BQU1LLHNCQUFOLENBQTZCRCxDQUE3QixDQUFMLEVB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OiJwb3BvdmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9ucyAqL1xuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tbm9uaW50ZXJhY3RpdmUtdGFiaW5kZXggKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCB7IGRhdGFTb3VyY2VQcm92aWRlclR5cGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90eXBlcyc7XG5pbXBvcnQgU2VhcmNoIGZyb20gJy4uLy4uL21vZGVscy9zZWFyY2gnO1xuaW1wb3J0IEdyb3VwRW50aXR5IGZyb20gJy4uLy4uL21vZGVscy9ncm91cC5lbnRpdHknO1xuXG5pbXBvcnQgQ29tbW9uTGF5b3V0IGZyb20gJy4vbGF5b3V0cy9jb21tb24ubGF5b3V0JztcbmltcG9ydCBTcGlubmVyTGF5b3V0IGZyb20gJy4vbGF5b3V0cy9zcGlubmVyLmxheW91dCc7XG5pbXBvcnQgSFNTZWxlY3RCdXR0b24gZnJvbSAnLi9zZWxlY3QtYnRuLmNvbXBvbmVudCc7XG5pbXBvcnQgUG9wb3ZlclNlYXJjaENvbnRlbnQgZnJvbSAnLi9zZWFyY2gvc2VhcmNoLWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCBIU1Bpbm5lZExpc3QgZnJvbSAnLi9waW5uZWQtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IEhTUmVjZW50TGlzdCBmcm9tICcuL3JlY2VudC1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgRXZlbnRIYW5kbGVyIGZyb20gJy4vZXZlbnQtaGFuZGxlcnMnO1xuaW1wb3J0IHsgQ0xBU1NfTkFNRV9TRUFSQ0hfRk9DVVNBQkxFIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IFNlYXJjaEJhciBmcm9tICcuLi9zZWFyY2gtYmFyJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgJy4vcG9wb3Zlci5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5U2VsZWN0b3JQb3BvdmVyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpc0RhdGFMb2FkZWQ6IHByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5pc0xvYWRlZCxcbiAgICAgIHNlYXJjaGluZ0ZvcjogJycsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICBpZiAoIXRoaXMuc3RhdGUuaXNEYXRhTG9hZGVkKSB7XG4gICAgICB0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5sb2FkRGF0YSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgaXNEYXRhTG9hZGVkOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5tYWluRWxlbWVudC5mb2N1cygpO1xuICAgIHRoaXMubWFpbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCB0aGlzLm9uRm9jdXNPdXRIYW5kbGVyKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMubWFpbkVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCB0aGlzLm9uRm9jdXNPdXRIYW5kbGVyKTtcbiAgfVxuXG4gIG9uRm9jdXNPdXRIYW5kbGVyID0gKGUpID0+IHtcbiAgICBpZiAoIVV0aWxzLmlzRm9jdXNPbkN1cnJlbnRUYXJnZXQoZSkpIHRoaXMucHJvcHMub25Db21wb25lbnRCbHVyKCk7XG4gIH1cblxuICBvblNlYXJjaENoYW5nZUhhbmRsZXIgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHNlYXJjaGluZ1ZhbHVlID0gZS50YXJnZXQgPyBlLnRhcmdldC52YWx1ZSB8fCAnJyA6ICcnO1xuICAgIGxldCBzZWFyY2hpbmdGb3IgPSAnJztcblxuICAgIGlmIChVdGlscy5lbm91Z2hTZWFyY2hUZXh0TGVuZ3RoKHNlYXJjaGluZ1ZhbHVlKSkge1xuICAgICAgc2VhcmNoaW5nRm9yID0gc2VhcmNoaW5nVmFsdWU7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hpbmdGb3IgfSk7XG4gIH1cblxuICBvblNlbGVjdEhhbmRsZXIgPSAoZGF0YSkgPT4ge1xuICAgIGxldCBtb2RlbCA9IG51bGw7XG5cbiAgICBpZiAoZGF0YSkge1xuICAgICAgY29uc3QgZ3JvdXBOYW1lID0gZGF0YS5uYW1lID8gZGF0YS5uYW1lIDogJ1VuZGVmaW5lZCc7XG4gICAgICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkoZGF0YSkgPyBkYXRhIDogW2RhdGFdO1xuICAgICAgbW9kZWwgPSBuZXcgR3JvdXBFbnRpdHkoZ3JvdXBOYW1lLCBpdGVtcyk7XG4gICAgfVxuICAgIHRoaXMucHJvcHMub25TZWxlY3QobW9kZWwpO1xuICB9XG5cbiAgb25LZXlEb3duSGFubGRlciA9IChlKSA9PiB7XG4gICAgRXZlbnRIYW5kbGVyLnNlYXJjaEVsZW1lbnRGb2N1c0hhbmxkZXIoZSk7XG4gIH1cblxuICBnZXRTZWFyY2hFbGVtZW50ID0gKCkgPT4gKFxuICAgIDxTZWFyY2hCYXJcbiAgICAgIGlucHV0Q2xhc3NOYW1lPXtDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEV9XG4gICAgICBzZWFyY2hQbGFjZUhvbGRlcj17dGhpcy5wcm9wcy5zZWFyY2hQbGFjZUhvbGRlcn1cbiAgICAgIG9uU2VhcmNoQ2hhbmdlPXt0aGlzLm9uU2VhcmNoQ2hhbmdlSGFuZGxlcn1cbiAgICAgIG9uQ2xvc2VDbGljaz17dGhpcy5wcm9wcy5vblNob3VsZENsb3NlUG9wb3Zlcn1cbiAgICAvPlxuICApO1xuXG4gIGdldExpc3RzID0gKCkgPT4gKFxuICAgIDxkaXY+XG4gICAgICA8SFNTZWxlY3RCdXR0b24gbGFiZWw9e3RoaXMucHJvcHMuYnRuT3BlblZpZXdMYWJlbH0gb25DbGljaz17dGhpcy5wcm9wcy5vblNob3VsZE9wZW5WaWV3fSAvPlxuICAgICAgPGhyIC8+XG4gICAgICA8SFNQaW5uZWRMaXN0IHBpbm5lZEdyb3VwTGFiZWw9e3RoaXMucHJvcHMucGlubmVkR3JvdXBMYWJlbH0gLz5cbiAgICAgIDxociAvPlxuICAgICAgPEhTUmVjZW50TGlzdCByZWNlbnRHcm91cExhYmVsPXt0aGlzLnByb3BzLnJlY2VudEdyb3VwTGFiZWx9IC8+XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgZ2V0U2VhcmNoTGF5b3V0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHNlYXJjaE1vZGVsID0gbmV3IFNlYXJjaCh0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlcik7XG4gICAgY29uc3QgZm91bmRJdGVtcyA9IHNlYXJjaE1vZGVsLmdldEZvdW5kRnJvbUhpZXJhcmNoeSh0aGlzLnN0YXRlLnNlYXJjaGluZ0Zvcik7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFBvcG92ZXJTZWFyY2hDb250ZW50XG4gICAgICAgIGZvdW5kSXRlbXM9e2ZvdW5kSXRlbXN9XG4gICAgICAgIG9uU2VsZWN0PXtkYXRhID0+IHRoaXMub25TZWxlY3RIYW5kbGVyKGRhdGEpfVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgZ2V0TWFpbkxheW91dCA9ICgpID0+IChcbiAgICA8Q29tbW9uTGF5b3V0PlxuICAgICAge3RoaXMuZ2V0U2VhcmNoRWxlbWVudCgpfVxuICAgICAge3RoaXMuc3RhdGUuc2VhcmNoaW5nRm9yICE9PSAnJyA/IHRoaXMuZ2V0U2VhcmNoTGF5b3V0KCkgOiB0aGlzLmdldExpc3RzKCl9XG4gICAgPC9Db21tb25MYXlvdXQ+XG4gICk7XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1wb3BvdmVyXCJcbiAgICAgICAgdGFiSW5kZXg9XCIwXCJcbiAgICAgICAgcmVmPXsoZWwpID0+IHsgdGhpcy5tYWluRWxlbWVudCA9IGVsOyB9fVxuICAgICAgPlxuICAgICAgICB7IHRoaXMuc3RhdGUuaXNEYXRhTG9hZGVkID8gdGhpcy5nZXRNYWluTGF5b3V0KCkgOiA8U3Bpbm5lckxheW91dCAvPiB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkhpZXJhcmNoeVNlbGVjdG9yUG9wb3Zlci5wcm9wVHlwZXMgPSB7XG4gIGRhdGFTb3VyY2VQcm92aWRlcjogZGF0YVNvdXJjZVByb3ZpZGVyVHlwZS5pc1JlcXVpcmVkLFxuICBvbkNvbXBvbmVudEJsdXI6IFByb3BUeXBlcy5mdW5jLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2hvdWxkT3BlblZpZXc6IFByb3BUeXBlcy5mdW5jLFxuICBvblNob3VsZENsb3NlUG9wb3ZlcjogUHJvcFR5cGVzLmZ1bmMsXG4gIGJ0bk9wZW5WaWV3TGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBwaW5uZWRHcm91cExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICByZWNlbnRHcm91cExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxufTtcblxuSGllcmFyY2h5U2VsZWN0b3JQb3BvdmVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25Db21wb25lbnRCbHVyOiAoKSA9PiB7fSxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBvblNob3VsZE9wZW5WaWV3OiAoKSA9PiB7fSxcbiAgb25TaG91bGRDbG9zZVBvcG92ZXI6ICgpID0+IHt9LFxuICBidG5PcGVuVmlld0xhYmVsOiAnU2VsZWN0Li4uJyxcbiAgc2VhcmNoUGxhY2VIb2xkZXI6ICdTZWFyY2guLi4nLFxuICBwaW5uZWRHcm91cExhYmVsOiAnUGlubmVkIGl0ZW1zJyxcbiAgcmVjZW50R3JvdXBMYWJlbDogJ1JlY2VudGx5IHVzZWQnLFxufTtcbiJdfQ==