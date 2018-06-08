function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from '@opuscapita/react-searchbar';

import { dataSourceProviderType } from '../../services/types';
import Search from '../../models/search';
import GroupEntity from '../../models/group.entity';

import CommonLayout from './layouts/common.layout';
import SpinnerLayout from './layouts/spinner.layout';
import HSSelectButton from './select-btn.component';
import PopoverSearchContent from './search/search-content.component';
import EventHandler from './event-handlers';
import { CLASS_NAME_SEARCH_FOCUSABLE } from './constants';
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

    _this.onSearchChangeHandler = function (searchingFor) {
      return _this.setState({ searchingFor: searchingFor });
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
        onSearch: _this.onSearchChangeHandler,
        inputClassName: CLASS_NAME_SEARCH_FOCUSABLE,
        searchPlaceHolder: _this.props.searchPlaceHolder,
        onCloseClick: _this.props.onShouldClosePopover,
        dynamicSearchStartsFrom: 3,
        value: _this.state.searchingFor,
        tooltip: _this.props.searchTooltip
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
        },
        itemRenderFunction: _this.props.foundItemRenderFunction
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
  foundItemRenderFunction: null,
  btnOpenViewLabel: 'Select...',
  searchPlaceHolder: 'Search...',
  searchTooltip: null
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiU2VhcmNoQmFyIiwiZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSIsIlNlYXJjaCIsIkdyb3VwRW50aXR5IiwiQ29tbW9uTGF5b3V0IiwiU3Bpbm5lckxheW91dCIsIkhTU2VsZWN0QnV0dG9uIiwiUG9wb3ZlclNlYXJjaENvbnRlbnQiLCJFdmVudEhhbmRsZXIiLCJDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEUiLCJVdGlscyIsIkhpZXJhcmNoeVNlbGVjdG9yUG9wb3ZlciIsInByb3BzIiwib25Gb2N1c091dEhhbmRsZXIiLCJlIiwiaXNGb2N1c09uQ3VycmVudFRhcmdldCIsIm9uQ29tcG9uZW50Qmx1ciIsIm9uU2VhcmNoQ2hhbmdlSGFuZGxlciIsInNldFN0YXRlIiwic2VhcmNoaW5nRm9yIiwib25TZWxlY3RIYW5kbGVyIiwiZGF0YSIsIm1vZGVsIiwiZ3JvdXBOYW1lIiwibmFtZSIsIml0ZW1zIiwiQXJyYXkiLCJpc0FycmF5Iiwib25TZWxlY3QiLCJvbktleURvd25IYW5sZGVyIiwic2VhcmNoRWxlbWVudEZvY3VzSGFubGRlciIsImdldFNlYXJjaEVsZW1lbnQiLCJzZWFyY2hQbGFjZUhvbGRlciIsIm9uU2hvdWxkQ2xvc2VQb3BvdmVyIiwic3RhdGUiLCJzZWFyY2hUb29sdGlwIiwiZ2V0TGlzdHMiLCJidG5PcGVuVmlld0xhYmVsIiwib25TaG91bGRPcGVuVmlldyIsImdldFNlYXJjaExheW91dCIsInNlYXJjaE1vZGVsIiwiZGF0YVNvdXJjZVByb3ZpZGVyIiwiZm91bmRJdGVtcyIsImdldEZvdW5kRnJvbUhpZXJhcmNoeSIsImZvdW5kSXRlbVJlbmRlckZ1bmN0aW9uIiwiZ2V0TWFpbkxheW91dCIsImlzRGF0YUxvYWRlZCIsImlzTG9hZGVkIiwiY29tcG9uZW50V2lsbE1vdW50IiwibG9hZERhdGEiLCJ0aGVuIiwiY29tcG9uZW50RGlkTW91bnQiLCJtYWluRWxlbWVudCIsImZvY3VzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlciIsImVsIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTs7QUFFQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsNkJBQXRCOztBQUVBLFNBQVNDLHNCQUFULFFBQXVDLHNCQUF2QztBQUNBLE9BQU9DLE1BQVAsTUFBbUIscUJBQW5CO0FBQ0EsT0FBT0MsV0FBUCxNQUF3QiwyQkFBeEI7O0FBRUEsT0FBT0MsWUFBUCxNQUF5Qix5QkFBekI7QUFDQSxPQUFPQyxhQUFQLE1BQTBCLDBCQUExQjtBQUNBLE9BQU9DLGNBQVAsTUFBMkIsd0JBQTNCO0FBQ0EsT0FBT0Msb0JBQVAsTUFBaUMsbUNBQWpDO0FBQ0EsT0FBT0MsWUFBUCxNQUF5QixrQkFBekI7QUFDQSxTQUFTQywyQkFBVCxRQUE0QyxhQUE1QztBQUNBLE9BQU9DLEtBQVAsTUFBa0IsYUFBbEI7QUFDQSxPQUFPLGdCQUFQOztJQUVxQkMsd0I7OztBQUNuQixvQ0FBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQSxVQXlCbkJDLGlCQXpCbUIsR0F5QkMsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3pCLFVBQUksQ0FBQ0osTUFBTUssc0JBQU4sQ0FBNkJELENBQTdCLENBQUwsRUFBc0MsTUFBS0YsS0FBTCxDQUFXSSxlQUFYO0FBQ3ZDLEtBM0JrQjs7QUFBQSxVQTZCbkJDLHFCQTdCbUIsR0E2Qks7QUFBQSxhQUFnQixNQUFLQyxRQUFMLENBQWMsRUFBRUMsMEJBQUYsRUFBZCxDQUFoQjtBQUFBLEtBN0JMOztBQUFBLFVBK0JuQkMsZUEvQm1CLEdBK0JELFVBQUNDLElBQUQsRUFBVTtBQUMxQixVQUFJQyxRQUFRLElBQVo7O0FBRUEsVUFBSUQsSUFBSixFQUFVO0FBQ1IsWUFBTUUsWUFBWUYsS0FBS0csSUFBTCxHQUFZSCxLQUFLRyxJQUFqQixHQUF3QixXQUExQztBQUNBLFlBQU1DLFFBQVFDLE1BQU1DLE9BQU4sQ0FBY04sSUFBZCxJQUFzQkEsSUFBdEIsR0FBNkIsQ0FBQ0EsSUFBRCxDQUEzQztBQUNBQyxnQkFBUSxJQUFJbkIsV0FBSixDQUFnQm9CLFNBQWhCLEVBQTJCRSxLQUEzQixDQUFSO0FBQ0Q7QUFDRCxZQUFLYixLQUFMLENBQVdnQixRQUFYLENBQW9CTixLQUFwQjtBQUNELEtBeENrQjs7QUFBQSxVQTBDbkJPLGdCQTFDbUIsR0EwQ0EsVUFBQ2YsQ0FBRCxFQUFPO0FBQ3hCTixtQkFBYXNCLHlCQUFiLENBQXVDaEIsQ0FBdkM7QUFDRCxLQTVDa0I7O0FBQUEsVUE4Q25CaUIsZ0JBOUNtQixHQThDQTtBQUFBLGFBQ2pCLG9CQUFDLFNBQUQ7QUFDRSxrQkFBVSxNQUFLZCxxQkFEakI7QUFFRSx3QkFBZ0JSLDJCQUZsQjtBQUdFLDJCQUFtQixNQUFLRyxLQUFMLENBQVdvQixpQkFIaEM7QUFJRSxzQkFBYyxNQUFLcEIsS0FBTCxDQUFXcUIsb0JBSjNCO0FBS0UsaUNBQXlCLENBTDNCO0FBTUUsZUFBTyxNQUFLQyxLQUFMLENBQVdmLFlBTnBCO0FBT0UsaUJBQVMsTUFBS1AsS0FBTCxDQUFXdUI7QUFQdEIsUUFEaUI7QUFBQSxLQTlDQTs7QUFBQSxVQTBEbkJDLFFBMURtQixHQTBEUjtBQUFBLGFBQ1Q7QUFBQTtBQUFBO0FBQ0UsNEJBQUMsY0FBRCxJQUFnQixPQUFPLE1BQUt4QixLQUFMLENBQVd5QixnQkFBbEMsRUFBb0QsU0FBUyxNQUFLekIsS0FBTCxDQUFXMEIsZ0JBQXhFO0FBREYsT0FEUztBQUFBLEtBMURROztBQUFBLFVBZ0VuQkMsZUFoRW1CLEdBZ0VELFlBQU07QUFDdEIsVUFBTUMsY0FBYyxJQUFJdEMsTUFBSixDQUFXLE1BQUtVLEtBQUwsQ0FBVzZCLGtCQUF0QixDQUFwQjtBQUNBLFVBQU1DLGFBQWFGLFlBQVlHLHFCQUFaLENBQWtDLE1BQUtULEtBQUwsQ0FBV2YsWUFBN0MsQ0FBbkI7O0FBRUEsYUFDRSxvQkFBQyxvQkFBRDtBQUNFLG9CQUFZdUIsVUFEZDtBQUVFLGtCQUFVO0FBQUEsaUJBQVEsTUFBS3RCLGVBQUwsQ0FBcUJDLElBQXJCLENBQVI7QUFBQSxTQUZaO0FBR0UsNEJBQW9CLE1BQUtULEtBQUwsQ0FBV2dDO0FBSGpDLFFBREY7QUFPRCxLQTNFa0I7O0FBQUEsVUE2RW5CQyxhQTdFbUIsR0E2RUg7QUFBQSxhQUNkO0FBQUMsb0JBQUQ7QUFBQTtBQUNHLGNBQUtkLGdCQUFMLEVBREg7QUFFRyxjQUFLRyxLQUFMLENBQVdmLFlBQVgsS0FBNEIsRUFBNUIsR0FBaUMsTUFBS29CLGVBQUwsRUFBakMsR0FBMEQsTUFBS0gsUUFBTDtBQUY3RCxPQURjO0FBQUEsS0E3RUc7O0FBRWpCLFVBQUtGLEtBQUwsR0FBYTtBQUNYWSxvQkFBY2xDLE1BQU02QixrQkFBTixDQUF5Qk0sUUFENUI7QUFFWDVCLG9CQUFjO0FBRkgsS0FBYjtBQUZpQjtBQU1sQjs7cUNBRUQ2QixrQixpQ0FBcUI7QUFBQTs7QUFDbkIsUUFBSSxDQUFDLEtBQUtkLEtBQUwsQ0FBV1ksWUFBaEIsRUFBOEI7QUFDNUIsV0FBS2xDLEtBQUwsQ0FBVzZCLGtCQUFYLENBQThCUSxRQUE5QixHQUF5Q0MsSUFBekMsQ0FBOEMsWUFBTTtBQUNsRCxlQUFLaEMsUUFBTCxDQUFjLEVBQUU0QixjQUFjLElBQWhCLEVBQWQ7QUFDRCxPQUZEO0FBR0Q7QUFDRixHOztxQ0FFREssaUIsZ0NBQW9CO0FBQ2xCLFNBQUtDLFdBQUwsQ0FBaUJDLEtBQWpCO0FBQ0EsU0FBS0QsV0FBTCxDQUFpQkUsZ0JBQWpCLENBQWtDLFVBQWxDLEVBQThDLEtBQUt6QyxpQkFBbkQ7QUFDRCxHOztxQ0FFRDBDLG9CLG1DQUF1QjtBQUNyQixTQUFLSCxXQUFMLENBQWlCSSxtQkFBakIsQ0FBcUMsVUFBckMsRUFBaUQsS0FBSzNDLGlCQUF0RDtBQUNELEc7O3FDQTZERDRDLE0scUJBQVM7QUFBQTs7QUFDUCxXQUNFO0FBQUE7QUFBQTtBQUNFLG1CQUFVLCtCQURaO0FBRUUsa0JBQVMsR0FGWDtBQUdFLGFBQUssYUFBQ0MsRUFBRCxFQUFRO0FBQUUsaUJBQUtOLFdBQUwsR0FBbUJNLEVBQW5CO0FBQXdCO0FBSHpDO0FBS0ksV0FBS3hCLEtBQUwsQ0FBV1ksWUFBWCxHQUEwQixLQUFLRCxhQUFMLEVBQTFCLEdBQWlELG9CQUFDLGFBQUQ7QUFMckQsS0FERjtBQVNELEc7OztFQS9GbUQvQyxNQUFNNkQsYTs7U0FBdkNoRCx3Qjs7O0FBOEdyQkEseUJBQXlCaUQsWUFBekIsR0FBd0M7QUFDdEM1QyxtQkFBaUIsMkJBQU0sQ0FBRSxDQURhO0FBRXRDWSxZQUFVLG9CQUFNLENBQUUsQ0FGb0I7QUFHdENVLG9CQUFrQiw0QkFBTSxDQUFFLENBSFk7QUFJdENMLHdCQUFzQixnQ0FBTSxDQUFFLENBSlE7QUFLdENXLDJCQUF5QixJQUxhO0FBTXRDUCxvQkFBa0IsV0FOb0I7QUFPdENMLHFCQUFtQixXQVBtQjtBQVF0Q0csaUJBQWU7QUFSdUIsQ0FBeEMiLCJmaWxlIjoicG9wb3Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tbm9uaW50ZXJhY3RpdmUtdGFiaW5kZXggKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCBTZWFyY2hCYXIgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3Qtc2VhcmNoYmFyJztcclxuXHJcbmltcG9ydCB7IGRhdGFTb3VyY2VQcm92aWRlclR5cGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90eXBlcyc7XHJcbmltcG9ydCBTZWFyY2ggZnJvbSAnLi4vLi4vbW9kZWxzL3NlYXJjaCc7XHJcbmltcG9ydCBHcm91cEVudGl0eSBmcm9tICcuLi8uLi9tb2RlbHMvZ3JvdXAuZW50aXR5JztcclxuXHJcbmltcG9ydCBDb21tb25MYXlvdXQgZnJvbSAnLi9sYXlvdXRzL2NvbW1vbi5sYXlvdXQnO1xyXG5pbXBvcnQgU3Bpbm5lckxheW91dCBmcm9tICcuL2xheW91dHMvc3Bpbm5lci5sYXlvdXQnO1xyXG5pbXBvcnQgSFNTZWxlY3RCdXR0b24gZnJvbSAnLi9zZWxlY3QtYnRuLmNvbXBvbmVudCc7XHJcbmltcG9ydCBQb3BvdmVyU2VhcmNoQ29udGVudCBmcm9tICcuL3NlYXJjaC9zZWFyY2gtY29udGVudC5jb21wb25lbnQnO1xyXG5pbXBvcnQgRXZlbnRIYW5kbGVyIGZyb20gJy4vZXZlbnQtaGFuZGxlcnMnO1xyXG5pbXBvcnQgeyBDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEUgfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi91dGlscyc7XHJcbmltcG9ydCAnLi9wb3BvdmVyLnNjc3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5U2VsZWN0b3JQb3BvdmVyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGlzRGF0YUxvYWRlZDogcHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzTG9hZGVkLFxyXG4gICAgICBzZWFyY2hpbmdGb3I6ICcnLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgIGlmICghdGhpcy5zdGF0ZS5pc0RhdGFMb2FkZWQpIHtcclxuICAgICAgdGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXIubG9hZERhdGEoKS50aGVuKCgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgaXNEYXRhTG9hZGVkOiB0cnVlIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgdGhpcy5tYWluRWxlbWVudC5mb2N1cygpO1xyXG4gICAgdGhpcy5tYWluRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHRoaXMub25Gb2N1c091dEhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICB0aGlzLm1haW5FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdGhpcy5vbkZvY3VzT3V0SGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBvbkZvY3VzT3V0SGFuZGxlciA9IChlKSA9PiB7XHJcbiAgICBpZiAoIVV0aWxzLmlzRm9jdXNPbkN1cnJlbnRUYXJnZXQoZSkpIHRoaXMucHJvcHMub25Db21wb25lbnRCbHVyKCk7XHJcbiAgfVxyXG5cclxuICBvblNlYXJjaENoYW5nZUhhbmRsZXIgPSBzZWFyY2hpbmdGb3IgPT4gdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaGluZ0ZvciB9KTtcclxuXHJcbiAgb25TZWxlY3RIYW5kbGVyID0gKGRhdGEpID0+IHtcclxuICAgIGxldCBtb2RlbCA9IG51bGw7XHJcblxyXG4gICAgaWYgKGRhdGEpIHtcclxuICAgICAgY29uc3QgZ3JvdXBOYW1lID0gZGF0YS5uYW1lID8gZGF0YS5uYW1lIDogJ1VuZGVmaW5lZCc7XHJcbiAgICAgIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShkYXRhKSA/IGRhdGEgOiBbZGF0YV07XHJcbiAgICAgIG1vZGVsID0gbmV3IEdyb3VwRW50aXR5KGdyb3VwTmFtZSwgaXRlbXMpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChtb2RlbCk7XHJcbiAgfVxyXG5cclxuICBvbktleURvd25IYW5sZGVyID0gKGUpID0+IHtcclxuICAgIEV2ZW50SGFuZGxlci5zZWFyY2hFbGVtZW50Rm9jdXNIYW5sZGVyKGUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0U2VhcmNoRWxlbWVudCA9ICgpID0+IChcclxuICAgIDxTZWFyY2hCYXJcclxuICAgICAgb25TZWFyY2g9e3RoaXMub25TZWFyY2hDaGFuZ2VIYW5kbGVyfVxyXG4gICAgICBpbnB1dENsYXNzTmFtZT17Q0xBU1NfTkFNRV9TRUFSQ0hfRk9DVVNBQkxFfVxyXG4gICAgICBzZWFyY2hQbGFjZUhvbGRlcj17dGhpcy5wcm9wcy5zZWFyY2hQbGFjZUhvbGRlcn1cclxuICAgICAgb25DbG9zZUNsaWNrPXt0aGlzLnByb3BzLm9uU2hvdWxkQ2xvc2VQb3BvdmVyfVxyXG4gICAgICBkeW5hbWljU2VhcmNoU3RhcnRzRnJvbT17M31cclxuICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuc2VhcmNoaW5nRm9yfVxyXG4gICAgICB0b29sdGlwPXt0aGlzLnByb3BzLnNlYXJjaFRvb2x0aXB9XHJcbiAgICAvPlxyXG4gICk7XHJcblxyXG4gIGdldExpc3RzID0gKCkgPT4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPEhTU2VsZWN0QnV0dG9uIGxhYmVsPXt0aGlzLnByb3BzLmJ0bk9wZW5WaWV3TGFiZWx9IG9uQ2xpY2s9e3RoaXMucHJvcHMub25TaG91bGRPcGVuVmlld30gLz5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcblxyXG4gIGdldFNlYXJjaExheW91dCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHNlYXJjaE1vZGVsID0gbmV3IFNlYXJjaCh0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlcik7XHJcbiAgICBjb25zdCBmb3VuZEl0ZW1zID0gc2VhcmNoTW9kZWwuZ2V0Rm91bmRGcm9tSGllcmFyY2h5KHRoaXMuc3RhdGUuc2VhcmNoaW5nRm9yKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8UG9wb3ZlclNlYXJjaENvbnRlbnRcclxuICAgICAgICBmb3VuZEl0ZW1zPXtmb3VuZEl0ZW1zfVxyXG4gICAgICAgIG9uU2VsZWN0PXtkYXRhID0+IHRoaXMub25TZWxlY3RIYW5kbGVyKGRhdGEpfVxyXG4gICAgICAgIGl0ZW1SZW5kZXJGdW5jdGlvbj17dGhpcy5wcm9wcy5mb3VuZEl0ZW1SZW5kZXJGdW5jdGlvbn1cclxuICAgICAgLz5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXRNYWluTGF5b3V0ID0gKCkgPT4gKFxyXG4gICAgPENvbW1vbkxheW91dD5cclxuICAgICAge3RoaXMuZ2V0U2VhcmNoRWxlbWVudCgpfVxyXG4gICAgICB7dGhpcy5zdGF0ZS5zZWFyY2hpbmdGb3IgIT09ICcnID8gdGhpcy5nZXRTZWFyY2hMYXlvdXQoKSA6IHRoaXMuZ2V0TGlzdHMoKX1cclxuICAgIDwvQ29tbW9uTGF5b3V0PlxyXG4gICk7XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItcG9wb3ZlclwiXHJcbiAgICAgICAgdGFiSW5kZXg9XCIwXCJcclxuICAgICAgICByZWY9eyhlbCkgPT4geyB0aGlzLm1haW5FbGVtZW50ID0gZWw7IH19XHJcbiAgICAgID5cclxuICAgICAgICB7IHRoaXMuc3RhdGUuaXNEYXRhTG9hZGVkID8gdGhpcy5nZXRNYWluTGF5b3V0KCkgOiA8U3Bpbm5lckxheW91dCAvPiB9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbkhpZXJhcmNoeVNlbGVjdG9yUG9wb3Zlci5wcm9wVHlwZXMgPSB7XHJcbiAgZGF0YVNvdXJjZVByb3ZpZGVyOiBkYXRhU291cmNlUHJvdmlkZXJUeXBlLmlzUmVxdWlyZWQsXHJcbiAgb25Db21wb25lbnRCbHVyOiBQcm9wVHlwZXMuZnVuYyxcclxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgb25TaG91bGRPcGVuVmlldzogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgZm91bmRJdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxyXG4gIG9uU2hvdWxkQ2xvc2VQb3BvdmVyOiBQcm9wVHlwZXMuZnVuYyxcclxuICBidG5PcGVuVmlld0xhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIHNlYXJjaFRvb2x0aXA6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5lbGVtZW50LCBQcm9wVHlwZXMuc3RyaW5nXSksXHJcbn07XHJcblxyXG5IaWVyYXJjaHlTZWxlY3RvclBvcG92ZXIuZGVmYXVsdFByb3BzID0ge1xyXG4gIG9uQ29tcG9uZW50Qmx1cjogKCkgPT4ge30sXHJcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxyXG4gIG9uU2hvdWxkT3BlblZpZXc6ICgpID0+IHt9LFxyXG4gIG9uU2hvdWxkQ2xvc2VQb3BvdmVyOiAoKSA9PiB7fSxcclxuICBmb3VuZEl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcclxuICBidG5PcGVuVmlld0xhYmVsOiAnU2VsZWN0Li4uJyxcclxuICBzZWFyY2hQbGFjZUhvbGRlcjogJ1NlYXJjaC4uLicsXHJcbiAgc2VhcmNoVG9vbHRpcDogbnVsbCxcclxufTtcclxuIl19