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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiU2VhcmNoQmFyIiwiZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSIsIlNlYXJjaCIsIkdyb3VwRW50aXR5IiwiQ29tbW9uTGF5b3V0IiwiU3Bpbm5lckxheW91dCIsIkhTU2VsZWN0QnV0dG9uIiwiUG9wb3ZlclNlYXJjaENvbnRlbnQiLCJFdmVudEhhbmRsZXIiLCJDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEUiLCJVdGlscyIsIkhpZXJhcmNoeVNlbGVjdG9yUG9wb3ZlciIsInByb3BzIiwib25Gb2N1c091dEhhbmRsZXIiLCJlIiwiaXNGb2N1c09uQ3VycmVudFRhcmdldCIsIm9uQ29tcG9uZW50Qmx1ciIsIm9uU2VhcmNoQ2hhbmdlSGFuZGxlciIsInNldFN0YXRlIiwic2VhcmNoaW5nRm9yIiwib25TZWxlY3RIYW5kbGVyIiwiZGF0YSIsIm1vZGVsIiwiZ3JvdXBOYW1lIiwibmFtZSIsIml0ZW1zIiwiQXJyYXkiLCJpc0FycmF5Iiwib25TZWxlY3QiLCJvbktleURvd25IYW5sZGVyIiwic2VhcmNoRWxlbWVudEZvY3VzSGFubGRlciIsImdldFNlYXJjaEVsZW1lbnQiLCJzZWFyY2hQbGFjZUhvbGRlciIsIm9uU2hvdWxkQ2xvc2VQb3BvdmVyIiwic3RhdGUiLCJzZWFyY2hUb29sdGlwIiwiZ2V0TGlzdHMiLCJidG5PcGVuVmlld0xhYmVsIiwib25TaG91bGRPcGVuVmlldyIsImdldFNlYXJjaExheW91dCIsInNlYXJjaE1vZGVsIiwiZGF0YVNvdXJjZVByb3ZpZGVyIiwiZm91bmRJdGVtcyIsImdldEZvdW5kRnJvbUhpZXJhcmNoeSIsImZvdW5kSXRlbVJlbmRlckZ1bmN0aW9uIiwiZ2V0TWFpbkxheW91dCIsImlzRGF0YUxvYWRlZCIsImlzTG9hZGVkIiwiY29tcG9uZW50V2lsbE1vdW50IiwibG9hZERhdGEiLCJ0aGVuIiwiY29tcG9uZW50RGlkTW91bnQiLCJtYWluRWxlbWVudCIsImZvY3VzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlciIsImVsIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTs7QUFFQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsNkJBQXRCOztBQUVBLFNBQVNDLHNCQUFULFFBQXVDLHNCQUF2QztBQUNBLE9BQU9DLE1BQVAsTUFBbUIscUJBQW5CO0FBQ0EsT0FBT0MsV0FBUCxNQUF3QiwyQkFBeEI7O0FBRUEsT0FBT0MsWUFBUCxNQUF5Qix5QkFBekI7QUFDQSxPQUFPQyxhQUFQLE1BQTBCLDBCQUExQjtBQUNBLE9BQU9DLGNBQVAsTUFBMkIsd0JBQTNCO0FBQ0EsT0FBT0Msb0JBQVAsTUFBaUMsbUNBQWpDO0FBQ0EsT0FBT0MsWUFBUCxNQUF5QixrQkFBekI7QUFDQSxTQUFTQywyQkFBVCxRQUE0QyxhQUE1QztBQUNBLE9BQU9DLEtBQVAsTUFBa0IsYUFBbEI7QUFDQSxPQUFPLGdCQUFQOztJQUVxQkMsd0I7OztBQUNuQixvQ0FBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQSxVQXlCbkJDLGlCQXpCbUIsR0F5QkMsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3pCLFVBQUksQ0FBQ0osTUFBTUssc0JBQU4sQ0FBNkJELENBQTdCLENBQUwsRUFBc0MsTUFBS0YsS0FBTCxDQUFXSSxlQUFYO0FBQ3ZDLEtBM0JrQjs7QUFBQSxVQTZCbkJDLHFCQTdCbUIsR0E2Qks7QUFBQSxhQUFnQixNQUFLQyxRQUFMLENBQWMsRUFBRUMsMEJBQUYsRUFBZCxDQUFoQjtBQUFBLEtBN0JMOztBQUFBLFVBK0JuQkMs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QkFBakIsQ0FBcUMsVUFBckMsRUFBaUQsS0FBSzNDLGlCQUF0RDtBQUNELEc7O3FDQTZERDRDLE0scUJBQVM7QUFBQTs7QUFDUCxXQUNFO0FBQUE7QUFBQTtBQUNFLG1CQUFVLCtCQURaO0FBRUUsa0JBQVMsR0FGWDtBQUdFLGFBQUssYUFBQ0MsRUFBRCxFQUFRO0FBQUUsaUJBQUtOLFdBQUwsR0FBbUJNLEVBQW5CO0FBQXdCO0FBSHpDO0FBS0ksV0FBS3hCLEtBQUwsQ0FBV1ksWUFBWCxHQUEwQixLQUFLRCxhQUFMLEVBQTFCLEdBQWlELG9CQUFDLGFBQUQ7QUFMckQsS0FERjtBQVNELEc7OztFQS9GbUQvQyxNQUFNNkQsYTs7U0FBdkNoRCx3Qjs7O0FBOEdyQkEseUJBQXlCaUQsWUFBekIsR0FBd0M7QUFDdEM1QyxtQkFBaUIsMkJBQU0sQ0FBRSxDQURhO0FBRXRDWSxZQUFVLG9CQUFNLENBQUUsQ0FGb0I7QUFHdENVLG9CQUFrQiw0QkFBTSxDQUFFLENBSFk7QUFJdENMLHdCQUFzQixnQ0FBTSxDQUFFLENBSlE7QUFLdENXLDJCQUF5QixJQUxhO0FBTXRDUCxvQkFBa0IsV0FOb0I7QUFPdENMLHFCQUFtQixXQVBtQjtBQVF0Q0csaUJBQWU7QUFSdUIsQ0FBeEMiLCJmaWxlIjoicG9wb3Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLW5vbmludGVyYWN0aXZlLXRhYmluZGV4ICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFNlYXJjaEJhciBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zZWFyY2hiYXInO1xuXG5pbXBvcnQgeyBkYXRhU291cmNlUHJvdmlkZXJUeXBlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdHlwZXMnO1xuaW1wb3J0IFNlYXJjaCBmcm9tICcuLi8uLi9tb2RlbHMvc2VhcmNoJztcbmltcG9ydCBHcm91cEVudGl0eSBmcm9tICcuLi8uLi9tb2RlbHMvZ3JvdXAuZW50aXR5JztcblxuaW1wb3J0IENvbW1vbkxheW91dCBmcm9tICcuL2xheW91dHMvY29tbW9uLmxheW91dCc7XG5pbXBvcnQgU3Bpbm5lckxheW91dCBmcm9tICcuL2xheW91dHMvc3Bpbm5lci5sYXlvdXQnO1xuaW1wb3J0IEhTU2VsZWN0QnV0dG9uIGZyb20gJy4vc2VsZWN0LWJ0bi5jb21wb25lbnQnO1xuaW1wb3J0IFBvcG92ZXJTZWFyY2hDb250ZW50IGZyb20gJy4vc2VhcmNoL3NlYXJjaC1jb250ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgRXZlbnRIYW5kbGVyIGZyb20gJy4vZXZlbnQtaGFuZGxlcnMnO1xuaW1wb3J0IHsgQ0xBU1NfTkFNRV9TRUFSQ0hfRk9DVVNBQkxFIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCAnLi9wb3BvdmVyLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlTZWxlY3RvclBvcG92ZXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzRGF0YUxvYWRlZDogcHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzTG9hZGVkLFxuICAgICAgc2VhcmNoaW5nRm9yOiAnJyxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGlmICghdGhpcy5zdGF0ZS5pc0RhdGFMb2FkZWQpIHtcbiAgICAgIHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmxvYWREYXRhKCkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0RhdGFMb2FkZWQ6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLm1haW5FbGVtZW50LmZvY3VzKCk7XG4gICAgdGhpcy5tYWluRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHRoaXMub25Gb2N1c091dEhhbmRsZXIpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5tYWluRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHRoaXMub25Gb2N1c091dEhhbmRsZXIpO1xuICB9XG5cbiAgb25Gb2N1c091dEhhbmRsZXIgPSAoZSkgPT4ge1xuICAgIGlmICghVXRpbHMuaXNGb2N1c09uQ3VycmVudFRhcmdldChlKSkgdGhpcy5wcm9wcy5vbkNvbXBvbmVudEJsdXIoKTtcbiAgfVxuXG4gIG9uU2VhcmNoQ2hhbmdlSGFuZGxlciA9IHNlYXJjaGluZ0ZvciA9PiB0aGlzLnNldFN0YXRlKHsgc2VhcmNoaW5nRm9yIH0pO1xuXG4gIG9uU2VsZWN0SGFuZGxlciA9IChkYXRhKSA9PiB7XG4gICAgbGV0IG1vZGVsID0gbnVsbDtcblxuICAgIGlmIChkYXRhKSB7XG4gICAgICBjb25zdCBncm91cE5hbWUgPSBkYXRhLm5hbWUgPyBkYXRhLm5hbWUgOiAnVW5kZWZpbmVkJztcbiAgICAgIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShkYXRhKSA/IGRhdGEgOiBbZGF0YV07XG4gICAgICBtb2RlbCA9IG5ldyBHcm91cEVudGl0eShncm91cE5hbWUsIGl0ZW1zKTtcbiAgICB9XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChtb2RlbCk7XG4gIH1cblxuICBvbktleURvd25IYW5sZGVyID0gKGUpID0+IHtcbiAgICBFdmVudEhhbmRsZXIuc2VhcmNoRWxlbWVudEZvY3VzSGFubGRlcihlKTtcbiAgfVxuXG4gIGdldFNlYXJjaEVsZW1lbnQgPSAoKSA9PiAoXG4gICAgPFNlYXJjaEJhclxuICAgICAgb25TZWFyY2g9e3RoaXMub25TZWFyY2hDaGFuZ2VIYW5kbGVyfVxuICAgICAgaW5wdXRDbGFzc05hbWU9e0NMQVNTX05BTUVfU0VBUkNIX0ZPQ1VTQUJMRX1cbiAgICAgIHNlYXJjaFBsYWNlSG9sZGVyPXt0aGlzLnByb3BzLnNlYXJjaFBsYWNlSG9sZGVyfVxuICAgICAgb25DbG9zZUNsaWNrPXt0aGlzLnByb3BzLm9uU2hvdWxkQ2xvc2VQb3BvdmVyfVxuICAgICAgZHluYW1pY1NlYXJjaFN0YXJ0c0Zyb209ezN9XG4gICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zZWFyY2hpbmdGb3J9XG4gICAgICB0b29sdGlwPXt0aGlzLnByb3BzLnNlYXJjaFRvb2x0aXB9XG4gICAgLz5cbiAgKTtcblxuICBnZXRMaXN0cyA9ICgpID0+IChcbiAgICA8ZGl2PlxuICAgICAgPEhTU2VsZWN0QnV0dG9uIGxhYmVsPXt0aGlzLnByb3BzLmJ0bk9wZW5WaWV3TGFiZWx9IG9uQ2xpY2s9e3RoaXMucHJvcHMub25TaG91bGRPcGVuVmlld30gLz5cbiAgICA8L2Rpdj5cbiAgKTtcblxuICBnZXRTZWFyY2hMYXlvdXQgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2VhcmNoTW9kZWwgPSBuZXcgU2VhcmNoKHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyKTtcbiAgICBjb25zdCBmb3VuZEl0ZW1zID0gc2VhcmNoTW9kZWwuZ2V0Rm91bmRGcm9tSGllcmFyY2h5KHRoaXMuc3RhdGUuc2VhcmNoaW5nRm9yKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8UG9wb3ZlclNlYXJjaENvbnRlbnRcbiAgICAgICAgZm91bmRJdGVtcz17Zm91bmRJdGVtc31cbiAgICAgICAgb25TZWxlY3Q9e2RhdGEgPT4gdGhpcy5vblNlbGVjdEhhbmRsZXIoZGF0YSl9XG4gICAgICAgIGl0ZW1SZW5kZXJGdW5jdGlvbj17dGhpcy5wcm9wcy5mb3VuZEl0ZW1SZW5kZXJGdW5jdGlvbn1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIGdldE1haW5MYXlvdXQgPSAoKSA9PiAoXG4gICAgPENvbW1vbkxheW91dD5cbiAgICAgIHt0aGlzLmdldFNlYXJjaEVsZW1lbnQoKX1cbiAgICAgIHt0aGlzLnN0YXRlLnNlYXJjaGluZ0ZvciAhPT0gJycgPyB0aGlzLmdldFNlYXJjaExheW91dCgpIDogdGhpcy5nZXRMaXN0cygpfVxuICAgIDwvQ29tbW9uTGF5b3V0PlxuICApO1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItcG9wb3ZlclwiXG4gICAgICAgIHRhYkluZGV4PVwiMFwiXG4gICAgICAgIHJlZj17KGVsKSA9PiB7IHRoaXMubWFpbkVsZW1lbnQgPSBlbDsgfX1cbiAgICAgID5cbiAgICAgICAgeyB0aGlzLnN0YXRlLmlzRGF0YUxvYWRlZCA/IHRoaXMuZ2V0TWFpbkxheW91dCgpIDogPFNwaW5uZXJMYXlvdXQgLz4gfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5IaWVyYXJjaHlTZWxlY3RvclBvcG92ZXIucHJvcFR5cGVzID0ge1xuICBkYXRhU291cmNlUHJvdmlkZXI6IGRhdGFTb3VyY2VQcm92aWRlclR5cGUuaXNSZXF1aXJlZCxcbiAgb25Db21wb25lbnRCbHVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBvblNob3VsZE9wZW5WaWV3OiBQcm9wVHlwZXMuZnVuYyxcbiAgZm91bmRJdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICBvblNob3VsZENsb3NlUG9wb3ZlcjogUHJvcFR5cGVzLmZ1bmMsXG4gIGJ0bk9wZW5WaWV3TGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBzZWFyY2hUb29sdGlwOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZWxlbWVudCwgUHJvcFR5cGVzLnN0cmluZ10pLFxufTtcblxuSGllcmFyY2h5U2VsZWN0b3JQb3BvdmVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25Db21wb25lbnRCbHVyOiAoKSA9PiB7fSxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBvblNob3VsZE9wZW5WaWV3OiAoKSA9PiB7fSxcbiAgb25TaG91bGRDbG9zZVBvcG92ZXI6ICgpID0+IHt9LFxuICBmb3VuZEl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcbiAgYnRuT3BlblZpZXdMYWJlbDogJ1NlbGVjdC4uLicsXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiAnU2VhcmNoLi4uJyxcbiAgc2VhcmNoVG9vbHRpcDogbnVsbCxcbn07XG4iXX0=