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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSIsIlNlYXJjaCIsIkdyb3VwRW50aXR5IiwiQ29tbW9uTGF5b3V0IiwiU3Bpbm5lckxheW91dCIsIkhTU2VsZWN0QnV0dG9uIiwiUG9wb3ZlclNlYXJjaENvbnRlbnQiLCJFdmVudEhhbmRsZXIiLCJDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEUiLCJTZWFyY2hCYXIiLCJVdGlscyIsIkhpZXJhcmNoeVNlbGVjdG9yUG9wb3ZlciIsInByb3BzIiwib25Gb2N1c091dEhhbmRsZXIiLCJlIiwiaXNGb2N1c09uQ3VycmVudFRhcmdldCIsIm9uQ29tcG9uZW50Qmx1ciIsIm9uU2VhcmNoQ2hhbmdlSGFuZGxlciIsInNlYXJjaGluZ1ZhbHVlIiwidGFyZ2V0IiwidmFsdWUiLCJzZWFyY2hpbmdGb3IiLCJlbm91Z2hTZWFyY2hUZXh0TGVuZ3RoIiwic2V0U3RhdGUiLCJvblNlbGVjdEhhbmRsZXIiLCJkYXRhIiwibW9kZWwiLCJncm91cE5hbWUiLCJuYW1lIiwiaXRlbXMiLCJBcnJheSIsImlzQXJyYXkiLCJvblNlbGVjdCIsIm9uS2V5RG93bkhhbmxkZXIiLCJzZWFyY2hFbGVtZW50Rm9jdXNIYW5sZGVyIiwiZ2V0U2VhcmNoRWxlbWVudCIsInNlYXJjaFBsYWNlSG9sZGVyIiwib25TaG91bGRDbG9zZVBvcG92ZXIiLCJnZXRMaXN0cyIsImJ0bk9wZW5WaWV3TGFiZWwiLCJvblNob3VsZE9wZW5WaWV3IiwiZ2V0U2VhcmNoTGF5b3V0Iiwic2VhcmNoTW9kZWwiLCJkYXRhU291cmNlUHJvdmlkZXIiLCJmb3VuZEl0ZW1zIiwiZ2V0Rm91bmRGcm9tSGllcmFyY2h5Iiwic3RhdGUiLCJnZXRNYWluTGF5b3V0IiwiaXNEYXRhTG9hZGVkIiwiaXNMb2FkZWQiLCJjb21wb25lbnRXaWxsTW91bnQiLCJsb2FkRGF0YSIsInRoZW4iLCJjb21wb25lbnREaWRNb3VudCIsIm1haW5FbGVtZW50IiwiZm9jdXMiLCJhZGRFdmVudExpc3RlbmVyIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVuZGVyIiwiZWwiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBOztBQUVBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCOztBQUVBLFNBQVNDLHNCQUFULFFBQXVDLHNCQUF2QztBQUNBLE9BQU9DLE1BQVAsTUFBbUIscUJBQW5CO0FBQ0EsT0FBT0MsV0FBUCxNQUF3QiwyQkFBeEI7O0FBRUEsT0FBT0MsWUFBUCxNQUF5Qix5QkFBekI7QUFDQSxPQUFPQyxhQUFQLE1BQTBCLDBCQUExQjtBQUNBLE9BQU9DLGNBQVAsTUFBMkIsd0JBQTNCO0FBQ0EsT0FBT0Msb0JBQVAsTUFBaUMsbUNBQWpDO0FBQ0EsT0FBT0MsWUFBUCxNQUF5QixrQkFBekI7QUFDQSxTQUFTQywyQkFBVCxRQUE0QyxhQUE1QztBQUNBLE9BQU9DLFNBQVAsTUFBc0IsZUFBdEI7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLGFBQWxCO0FBQ0EsT0FBTyxnQkFBUDs7SUFFcUJDLHdCOzs7QUFDbkIsb0NBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsZ0NBQU1BLEtBQU4sQ0FEaUI7O0FBQUEsVUF5Qm5CQyxpQkF6Qm1CLEdBeUJDLFVBQUNDLENBQUQsRUFBTztBQUN6QixVQUFJLENBQUNKLE1BQU1LLHNCQUFOLENBQTZCRCxDQUE3QixDQUFMLEVBQXNDLE1BQUtGLEtBQUwsQ0FBV0ksZUFBWDtBQUN2QyxLQTNCa0I7O0FBQUEsVUE2Qm5CQyxxQkE3Qm1CLEdBNkJLLFVBQUNILENBQUQsRUFBTztBQUM3QixVQUFNSSxpQkFBaUJKLEVBQUVLLE1BQUYsR0FBV0wsRUFBRUssTUFBRixDQUFTQyxLQUFULElBQWtCLEVBQTdCLEdBQWtDLEVBQXpEO0FBQ0EsVUFBSUMsZUFBZSxFQUFuQjs7QUFFQSxVQUFJWCxNQUFNWSxzQkFBTixDQUE2QkosY0FBN0IsQ0FBSixFQUFrRDtBQUNoREcsdUJBQWVILGNBQWY7QUFDRDtBQUNELFlBQUtLLFFBQUwsQ0FBYyxFQUFFRiwwQkFBRixFQUFkO0FBQ0QsS0FyQ2tCOztBQUFBLFVBdUNuQkcsZUF2Q21CLEdBdUNELFVBQUNDLElBQUQsRUFBVTtBQUMxQixVQUFJQyxRQUFRLElBQVo7O0FBRUEsVUFBSUQsSUFBSixFQUFVO0FBQ1IsWUFBTUUsWUFBWUYsS0FBS0csSUFBTCxHQUFZSCxLQUFLRyxJQUFqQixHQUF3QixXQUExQztBQUNBLFlBQU1DLFFBQVFDLE1BQU1DLE9BQU4sQ0FBY04sSUFBZCxJQUFzQkEsSUFBdEIsR0FBNkIsQ0FBQ0EsSUFBRCxDQUEzQztBQUNBQyxnQkFBUSxJQUFJeEIsV0FBSixDQUFnQnlCLFNBQWhCLEVBQTJCRSxLQUEzQixDQUFSO0FBQ0Q7QUFDRCxZQUFLakIsS0FBTCxDQUFXb0IsUUFBWCxDQUFvQk4sS0FBcEI7QUFDRCxLQWhEa0I7O0FBQUEsVUFrRG5CTyxnQkFsRG1CLEdBa0RBLFVBQUNuQixDQUFELEVBQU87QUFDeEJQLG1CQUFhMkIseUJBQWIsQ0FBdUNwQixDQUF2QztBQUNELEtBcERrQjs7QUFBQSxVQXNEbkJxQixnQkF0RG1CLEdBc0RBO0FBQUEsYUFDakIsb0JBQUMsU0FBRDtBQUNFLHdCQUFnQjNCLDJCQURsQjtBQUVFLDJCQUFtQixNQUFLSSxLQUFMLENBQVd3QixpQkFGaEM7QUFHRSx3QkFBZ0IsTUFBS25CLHFCQUh2QjtBQUlFLHNCQUFjLE1BQUtMLEtBQUwsQ0FBV3lCO0FBSjNCLFFBRGlCO0FBQUEsS0F0REE7O0FBQUEsVUErRG5CQyxRQS9EbUIsR0ErRFI7QUFBQSxhQUNUO0FBQUE7QUFBQTtBQUNFLDRCQUFDLGNBQUQsSUFBZ0IsT0FBTyxNQUFLMUIsS0FBTCxDQUFXMkIsZ0JBQWxDLEVBQW9ELFNBQVMsTUFBSzNCLEtBQUwsQ0FBVzRCLGdCQUF4RTtBQURGLE9BRFM7QUFBQSxLQS9EUTs7QUFBQSxVQXFFbkJDLGVBckVtQixHQXFFRCxZQUFNO0FBQ3RCLFVBQU1DLGNBQWMsSUFBSXpDLE1BQUosQ0FBVyxNQUFLVyxLQUFMLENBQVcrQixrQkFBdEIsQ0FBcEI7QUFDQSxVQUFNQyxhQUFhRixZQUFZRyxxQkFBWixDQUFrQyxNQUFLQyxLQUFMLENBQVd6QixZQUE3QyxDQUFuQjs7QUFFQSxhQUNFLG9CQUFDLG9CQUFEO0FBQ0Usb0JBQVl1QixVQURkO0FBRUUsa0JBQVU7QUFBQSxpQkFBUSxNQUFLcEIsZUFBTCxDQUFxQkMsSUFBckIsQ0FBUjtBQUFBO0FBRlosUUFERjtBQU1ELEtBL0VrQjs7QUFBQSxVQWlGbkJzQixhQWpGbUIsR0FpRkg7QUFBQSxhQUNkO0FBQUMsb0JBQUQ7QUFBQTtBQUNHLGNBQUtaLGdCQUFMLEVBREg7QUFFRyxjQUFLVyxLQUFMLENBQVd6QixZQUFYLEtBQTRCLEVBQTVCLEdBQWlDLE1BQUtvQixlQUFMLEVBQWpDLEdBQTBELE1BQUtILFFBQUw7QUFGN0QsT0FEYztBQUFBLEtBakZHOztBQUVqQixVQUFLUSxLQUFMLEdBQWE7QUFDWEUsb0JBQWNwQyxNQUFNK0Isa0JBQU4sQ0FBeUJNLFFBRDVCO0FBRVg1QixvQkFBYztBQUZILEtBQWI7QUFGaUI7QUFNbEI7O3FDQUVENkIsa0IsaUNBQXFCO0FBQUE7O0FBQ25CLFFBQUksQ0FBQyxLQUFLSixLQUFMLENBQVdFLFlBQWhCLEVBQThCO0FBQzVCLFdBQUtwQyxLQUFMLENBQVcrQixrQkFBWCxDQUE4QlEsUUFBOUIsR0FBeUNDLElBQXpDLENBQThDLFlBQU07QUFDbEQsZUFBSzdCLFFBQUwsQ0FBYyxFQUFFeUIsY0FBYyxJQUFoQixFQUFkO0FBQ0QsT0FGRDtBQUdEO0FBQ0YsRzs7cUNBRURLLGlCLGdDQUFvQjtBQUNsQixTQUFLQyxXQUFMLENBQWlCQyxLQUFqQjtBQUNBLFNBQUtELFdBQUwsQ0FBaUJFLGdCQUFqQixDQUFrQyxVQUFsQyxFQUE4QyxLQUFLM0MsaUJBQW5EO0FBQ0QsRzs7cUNBRUQ0QyxvQixtQ0FBdUI7QUFDckIsU0FBS0gsV0FBTCxDQUFpQkksbUJBQWpCLENBQXFDLFVBQXJDLEVBQWlELEtBQUs3QyxpQkFBdEQ7QUFDRCxHOztxQ0FpRUQ4QyxNLHFCQUFTO0FBQUE7O0FBQ1AsV0FDRTtBQUFBO0FBQUE7QUFDRSxtQkFBVSwrQkFEWjtBQUVFLGtCQUFTLEdBRlg7QUFHRSxhQUFLLGFBQUNDLEVBQUQsRUFBUTtBQUFFLGlCQUFLTixXQUFMLEdBQW1CTSxFQUFuQjtBQUF3QjtBQUh6QztBQUtJLFdBQUtkLEtBQUwsQ0FBV0UsWUFBWCxHQUEwQixLQUFLRCxhQUFMLEVBQTFCLEdBQWlELG9CQUFDLGFBQUQ7QUFMckQsS0FERjtBQVNELEc7OztFQW5HbURqRCxNQUFNK0QsYTs7U0FBdkNsRCx3Qjs7O0FBZ0hyQkEseUJBQXlCbUQsWUFBekIsR0FBd0M7QUFDdEM5QyxtQkFBaUIsMkJBQU0sQ0FBRSxDQURhO0FBRXRDZ0IsWUFBVSxvQkFBTSxDQUFFLENBRm9CO0FBR3RDUSxvQkFBa0IsNEJBQU0sQ0FBRSxDQUhZO0FBSXRDSCx3QkFBc0IsZ0NBQU0sQ0FBRSxDQUpRO0FBS3RDRSxvQkFBa0IsV0FMb0I7QUFNdENILHFCQUFtQjtBQU5tQixDQUF4QyIsImZpbGUiOiJwb3BvdmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9ucyAqL1xuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tbm9uaW50ZXJhY3RpdmUtdGFiaW5kZXggKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCB7IGRhdGFTb3VyY2VQcm92aWRlclR5cGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90eXBlcyc7XG5pbXBvcnQgU2VhcmNoIGZyb20gJy4uLy4uL21vZGVscy9zZWFyY2gnO1xuaW1wb3J0IEdyb3VwRW50aXR5IGZyb20gJy4uLy4uL21vZGVscy9ncm91cC5lbnRpdHknO1xuXG5pbXBvcnQgQ29tbW9uTGF5b3V0IGZyb20gJy4vbGF5b3V0cy9jb21tb24ubGF5b3V0JztcbmltcG9ydCBTcGlubmVyTGF5b3V0IGZyb20gJy4vbGF5b3V0cy9zcGlubmVyLmxheW91dCc7XG5pbXBvcnQgSFNTZWxlY3RCdXR0b24gZnJvbSAnLi9zZWxlY3QtYnRuLmNvbXBvbmVudCc7XG5pbXBvcnQgUG9wb3ZlclNlYXJjaENvbnRlbnQgZnJvbSAnLi9zZWFyY2gvc2VhcmNoLWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCBFdmVudEhhbmRsZXIgZnJvbSAnLi9ldmVudC1oYW5kbGVycyc7XG5pbXBvcnQgeyBDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgU2VhcmNoQmFyIGZyb20gJy4uL3NlYXJjaC1iYXInO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCAnLi9wb3BvdmVyLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlTZWxlY3RvclBvcG92ZXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzRGF0YUxvYWRlZDogcHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzTG9hZGVkLFxuICAgICAgc2VhcmNoaW5nRm9yOiAnJyxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGlmICghdGhpcy5zdGF0ZS5pc0RhdGFMb2FkZWQpIHtcbiAgICAgIHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmxvYWREYXRhKCkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0RhdGFMb2FkZWQ6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLm1haW5FbGVtZW50LmZvY3VzKCk7XG4gICAgdGhpcy5tYWluRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHRoaXMub25Gb2N1c091dEhhbmRsZXIpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5tYWluRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHRoaXMub25Gb2N1c091dEhhbmRsZXIpO1xuICB9XG5cbiAgb25Gb2N1c091dEhhbmRsZXIgPSAoZSkgPT4ge1xuICAgIGlmICghVXRpbHMuaXNGb2N1c09uQ3VycmVudFRhcmdldChlKSkgdGhpcy5wcm9wcy5vbkNvbXBvbmVudEJsdXIoKTtcbiAgfVxuXG4gIG9uU2VhcmNoQ2hhbmdlSGFuZGxlciA9IChlKSA9PiB7XG4gICAgY29uc3Qgc2VhcmNoaW5nVmFsdWUgPSBlLnRhcmdldCA/IGUudGFyZ2V0LnZhbHVlIHx8ICcnIDogJyc7XG4gICAgbGV0IHNlYXJjaGluZ0ZvciA9ICcnO1xuXG4gICAgaWYgKFV0aWxzLmVub3VnaFNlYXJjaFRleHRMZW5ndGgoc2VhcmNoaW5nVmFsdWUpKSB7XG4gICAgICBzZWFyY2hpbmdGb3IgPSBzZWFyY2hpbmdWYWx1ZTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaGluZ0ZvciB9KTtcbiAgfVxuXG4gIG9uU2VsZWN0SGFuZGxlciA9IChkYXRhKSA9PiB7XG4gICAgbGV0IG1vZGVsID0gbnVsbDtcblxuICAgIGlmIChkYXRhKSB7XG4gICAgICBjb25zdCBncm91cE5hbWUgPSBkYXRhLm5hbWUgPyBkYXRhLm5hbWUgOiAnVW5kZWZpbmVkJztcbiAgICAgIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShkYXRhKSA/IGRhdGEgOiBbZGF0YV07XG4gICAgICBtb2RlbCA9IG5ldyBHcm91cEVudGl0eShncm91cE5hbWUsIGl0ZW1zKTtcbiAgICB9XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChtb2RlbCk7XG4gIH1cblxuICBvbktleURvd25IYW5sZGVyID0gKGUpID0+IHtcbiAgICBFdmVudEhhbmRsZXIuc2VhcmNoRWxlbWVudEZvY3VzSGFubGRlcihlKTtcbiAgfVxuXG4gIGdldFNlYXJjaEVsZW1lbnQgPSAoKSA9PiAoXG4gICAgPFNlYXJjaEJhclxuICAgICAgaW5wdXRDbGFzc05hbWU9e0NMQVNTX05BTUVfU0VBUkNIX0ZPQ1VTQUJMRX1cbiAgICAgIHNlYXJjaFBsYWNlSG9sZGVyPXt0aGlzLnByb3BzLnNlYXJjaFBsYWNlSG9sZGVyfVxuICAgICAgb25TZWFyY2hDaGFuZ2U9e3RoaXMub25TZWFyY2hDaGFuZ2VIYW5kbGVyfVxuICAgICAgb25DbG9zZUNsaWNrPXt0aGlzLnByb3BzLm9uU2hvdWxkQ2xvc2VQb3BvdmVyfVxuICAgIC8+XG4gICk7XG5cbiAgZ2V0TGlzdHMgPSAoKSA9PiAoXG4gICAgPGRpdj5cbiAgICAgIDxIU1NlbGVjdEJ1dHRvbiBsYWJlbD17dGhpcy5wcm9wcy5idG5PcGVuVmlld0xhYmVsfSBvbkNsaWNrPXt0aGlzLnByb3BzLm9uU2hvdWxkT3BlblZpZXd9IC8+XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgZ2V0U2VhcmNoTGF5b3V0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHNlYXJjaE1vZGVsID0gbmV3IFNlYXJjaCh0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlcik7XG4gICAgY29uc3QgZm91bmRJdGVtcyA9IHNlYXJjaE1vZGVsLmdldEZvdW5kRnJvbUhpZXJhcmNoeSh0aGlzLnN0YXRlLnNlYXJjaGluZ0Zvcik7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFBvcG92ZXJTZWFyY2hDb250ZW50XG4gICAgICAgIGZvdW5kSXRlbXM9e2ZvdW5kSXRlbXN9XG4gICAgICAgIG9uU2VsZWN0PXtkYXRhID0+IHRoaXMub25TZWxlY3RIYW5kbGVyKGRhdGEpfVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgZ2V0TWFpbkxheW91dCA9ICgpID0+IChcbiAgICA8Q29tbW9uTGF5b3V0PlxuICAgICAge3RoaXMuZ2V0U2VhcmNoRWxlbWVudCgpfVxuICAgICAge3RoaXMuc3RhdGUuc2VhcmNoaW5nRm9yICE9PSAnJyA/IHRoaXMuZ2V0U2VhcmNoTGF5b3V0KCkgOiB0aGlzLmdldExpc3RzKCl9XG4gICAgPC9Db21tb25MYXlvdXQ+XG4gICk7XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1wb3BvdmVyXCJcbiAgICAgICAgdGFiSW5kZXg9XCIwXCJcbiAgICAgICAgcmVmPXsoZWwpID0+IHsgdGhpcy5tYWluRWxlbWVudCA9IGVsOyB9fVxuICAgICAgPlxuICAgICAgICB7IHRoaXMuc3RhdGUuaXNEYXRhTG9hZGVkID8gdGhpcy5nZXRNYWluTGF5b3V0KCkgOiA8U3Bpbm5lckxheW91dCAvPiB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkhpZXJhcmNoeVNlbGVjdG9yUG9wb3Zlci5wcm9wVHlwZXMgPSB7XG4gIGRhdGFTb3VyY2VQcm92aWRlcjogZGF0YVNvdXJjZVByb3ZpZGVyVHlwZS5pc1JlcXVpcmVkLFxuICBvbkNvbXBvbmVudEJsdXI6IFByb3BUeXBlcy5mdW5jLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2hvdWxkT3BlblZpZXc6IFByb3BUeXBlcy5mdW5jLFxuICBvblNob3VsZENsb3NlUG9wb3ZlcjogUHJvcFR5cGVzLmZ1bmMsXG4gIGJ0bk9wZW5WaWV3TGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuSGllcmFyY2h5U2VsZWN0b3JQb3BvdmVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25Db21wb25lbnRCbHVyOiAoKSA9PiB7fSxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBvblNob3VsZE9wZW5WaWV3OiAoKSA9PiB7fSxcbiAgb25TaG91bGRDbG9zZVBvcG92ZXI6ICgpID0+IHt9LFxuICBidG5PcGVuVmlld0xhYmVsOiAnU2VsZWN0Li4uJyxcbiAgc2VhcmNoUGxhY2VIb2xkZXI6ICdTZWFyY2guLi4nLFxufTtcbiJdfQ==