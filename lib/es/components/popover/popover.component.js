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

    _this.onSelectHandler = function (data, flags) {
      var model = null;

      if (data) {
        var groupName = data.name ? data.name : 'Undefined';
        var items = Array.isArray(data) ? data : [data];
        model = new GroupEntity(groupName, items);
      }
      _this.props.onSelect(model, flags);
    };

    _this.onKeyDownHanlder = function (e) {
      EventHandler.searchElementFocusHanlder(e);
    };

    _this.getSearchElement = function () {
      return React.createElement(SearchBar, {
        autoFocus: true,
        defaltValue: _this.state.searchingFor,
        inputClassName: CLASS_NAME_SEARCH_FOCUSABLE,
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
        onSelect: _this.onSelectHandler,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiU2VhcmNoQmFyIiwiZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSIsIlNlYXJjaCIsIkdyb3VwRW50aXR5IiwiQ29tbW9uTGF5b3V0IiwiU3Bpbm5lckxheW91dCIsIkhTU2VsZWN0QnV0dG9uIiwiUG9wb3ZlclNlYXJjaENvbnRlbnQiLCJFdmVudEhhbmRsZXIiLCJDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEUiLCJVdGlscyIsIkhpZXJhcmNoeVNlbGVjdG9yUG9wb3ZlciIsInByb3BzIiwib25Gb2N1c091dEhhbmRsZXIiLCJlIiwiaXNGb2N1c09uQ3VycmVudFRhcmdldCIsIm9uQ29tcG9uZW50Qmx1ciIsIm9uU2VhcmNoQ2hhbmdlSGFuZGxlciIsInNldFN0YXRlIiwic2VhcmNoaW5nRm9yIiwib25TZWxlY3RIYW5kbGVyIiwiZGF0YSIsImZsYWdzIiwibW9kZWwiLCJncm91cE5hbWUiLCJuYW1lIiwiaXRlbXMiLCJBcnJheSIsImlzQXJyYXkiLCJvblNlbGVjdCIsIm9uS2V5RG93bkhhbmxkZXIiLCJzZWFyY2hFbGVtZW50Rm9jdXNIYW5sZGVyIiwiZ2V0U2VhcmNoRWxlbWVudCIsInN0YXRlIiwidG9vbHRpcCIsInNlYXJjaFRvb2x0aXAiLCJzZWFyY2hQbGFjZUhvbGRlciIsIm9uU2hvdWxkQ2xvc2VQb3BvdmVyIiwiZ2V0TGlzdHMiLCJidG5PcGVuVmlld0xhYmVsIiwib25TaG91bGRPcGVuVmlldyIsImdldFNlYXJjaExheW91dCIsInNlYXJjaE1vZGVsIiwiZGF0YVNvdXJjZVByb3ZpZGVyIiwiZm91bmRJdGVtcyIsImdldEZvdW5kRnJvbUhpZXJhcmNoeSIsImZvdW5kSXRlbVJlbmRlckZ1bmN0aW9uIiwiZ2V0TWFpbkxheW91dCIsImlzRGF0YUxvYWRlZCIsImlzTG9hZGVkIiwiY29tcG9uZW50V2lsbE1vdW50IiwibG9hZERhdGEiLCJ0aGVuIiwiY29tcG9uZW50RGlkTW91bnQiLCJtYWluRWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJlbCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7O0FBRUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLDZCQUF0Qjs7QUFFQSxTQUFTQyxzQkFBVCxRQUF1QyxzQkFBdkM7QUFDQSxPQUFPQyxNQUFQLE1BQW1CLHFCQUFuQjtBQUNBLE9BQU9DLFdBQVAsTUFBd0IsMkJBQXhCOztBQUVBLE9BQU9DLFlBQVAsTUFBeUIseUJBQXpCO0FBQ0EsT0FBT0MsYUFBUCxNQUEwQiwwQkFBMUI7QUFDQSxPQUFPQyxjQUFQLE1BQTJCLHdCQUEzQjtBQUNBLE9BQU9DLG9CQUFQLE1BQWlDLG1DQUFqQztBQUNBLE9BQU9DLFlBQVAsTUFBeUIsa0JBQXpCO0FBQ0EsU0FBU0MsMkJBQVQsUUFBNEMsYUFBNUM7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLGFBQWxCO0FBQ0EsT0FBTyxnQkFBUDs7SUFFcUJDLHdCOzs7QUFDbkIsb0NBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsZ0NBQU1BLEtBQU4sQ0FEaUI7O0FBQUEsVUF3Qm5CQyxpQkF4Qm1CLEdBd0JDLFVBQUNDLENBQUQsRUFBTztBQUN6QixVQUFJLENBQUNKLE1BQU1LLHNCQUFOLENBQTZCRCxDQUE3QixDQUFMLEVBQXNDLE1BQUtGLEtBQUwsQ0FBV0ksZUFBWDtBQUN2QyxLQTFCa0I7O0FBQUEsVUE0Qm5CQyxxQkE1Qm1CLEdBNEJLO0FBQUEsYUFBZ0IsTUFBS0MsUUFBTCxDQUFjLEVBQUVDLDBCQUFGLEVBQWQsQ0FBaEI7QUFBQSxLQTVCTDs7QUFB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QixTQUFLRixXQUFMLENBQWlCRyxtQkFBakIsQ0FBcUMsVUFBckMsRUFBaUQsS0FBSzVDLGlCQUF0RDtBQUNELEc7O3FDQWtFRDZDLE0scUJBQVM7QUFBQTs7QUFDUCxXQUNFO0FBQUE7QUFBQTtBQUNFLG1CQUFVLCtCQURaO0FBRUUsa0JBQVMsR0FGWDtBQUdFLGFBQUssYUFBQ0MsRUFBRCxFQUFRO0FBQUUsaUJBQUtMLFdBQUwsR0FBbUJLLEVBQW5CO0FBQXdCO0FBSHpDO0FBS0ksV0FBSzFCLEtBQUwsQ0FBV2UsWUFBWCxHQUEwQixLQUFLRCxhQUFMLEVBQTFCLEdBQWlELG9CQUFDLGFBQUQ7QUFMckQsS0FERjtBQVNELEc7OztFQW5HbURqRCxNQUFNOEQsYTs7U0FBdkNqRCx3Qjs7O0FBa0hyQkEseUJBQXlCa0QsWUFBekIsR0FBd0M7QUFDdEM3QyxtQkFBaUIsMkJBQU0sQ0FBRSxDQURhO0FBRXRDYSxZQUFVLG9CQUFNLENBQUUsQ0FGb0I7QUFHdENXLG9CQUFrQiw0QkFBTSxDQUFFLENBSFk7QUFJdENILHdCQUFzQixnQ0FBTSxDQUFFLENBSlE7QUFLdENTLDJCQUF5QixJQUxhO0FBTXRDUCxvQkFBa0IsV0FOb0I7QUFPdENILHFCQUFtQixXQVBtQjtBQVF0Q0QsaUJBQWU7QUFSdUIsQ0FBeEMiLCJmaWxlIjoicG9wb3Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLW5vbmludGVyYWN0aXZlLXRhYmluZGV4ICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFNlYXJjaEJhciBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zZWFyY2hiYXInO1xuXG5pbXBvcnQgeyBkYXRhU291cmNlUHJvdmlkZXJUeXBlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdHlwZXMnO1xuaW1wb3J0IFNlYXJjaCBmcm9tICcuLi8uLi9tb2RlbHMvc2VhcmNoJztcbmltcG9ydCBHcm91cEVudGl0eSBmcm9tICcuLi8uLi9tb2RlbHMvZ3JvdXAuZW50aXR5JztcblxuaW1wb3J0IENvbW1vbkxheW91dCBmcm9tICcuL2xheW91dHMvY29tbW9uLmxheW91dCc7XG5pbXBvcnQgU3Bpbm5lckxheW91dCBmcm9tICcuL2xheW91dHMvc3Bpbm5lci5sYXlvdXQnO1xuaW1wb3J0IEhTU2VsZWN0QnV0dG9uIGZyb20gJy4vc2VsZWN0LWJ0bi5jb21wb25lbnQnO1xuaW1wb3J0IFBvcG92ZXJTZWFyY2hDb250ZW50IGZyb20gJy4vc2VhcmNoL3NlYXJjaC1jb250ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgRXZlbnRIYW5kbGVyIGZyb20gJy4vZXZlbnQtaGFuZGxlcnMnO1xuaW1wb3J0IHsgQ0xBU1NfTkFNRV9TRUFSQ0hfRk9DVVNBQkxFIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCAnLi9wb3BvdmVyLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlTZWxlY3RvclBvcG92ZXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzRGF0YUxvYWRlZDogcHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzTG9hZGVkLFxuICAgICAgc2VhcmNoaW5nRm9yOiAnJyxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGlmICghdGhpcy5zdGF0ZS5pc0RhdGFMb2FkZWQpIHtcbiAgICAgIHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmxvYWREYXRhKCkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0RhdGFMb2FkZWQ6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLm1haW5FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdGhpcy5vbkZvY3VzT3V0SGFuZGxlcik7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLm1haW5FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdGhpcy5vbkZvY3VzT3V0SGFuZGxlcik7XG4gIH1cblxuICBvbkZvY3VzT3V0SGFuZGxlciA9IChlKSA9PiB7XG4gICAgaWYgKCFVdGlscy5pc0ZvY3VzT25DdXJyZW50VGFyZ2V0KGUpKSB0aGlzLnByb3BzLm9uQ29tcG9uZW50Qmx1cigpO1xuICB9XG5cbiAgb25TZWFyY2hDaGFuZ2VIYW5kbGVyID0gc2VhcmNoaW5nRm9yID0+IHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hpbmdGb3IgfSk7XG5cbiAgb25TZWxlY3RIYW5kbGVyID0gKGRhdGEsIGZsYWdzKSA9PiB7XG4gICAgbGV0IG1vZGVsID0gbnVsbDtcblxuICAgIGlmIChkYXRhKSB7XG4gICAgICBjb25zdCBncm91cE5hbWUgPSBkYXRhLm5hbWUgPyBkYXRhLm5hbWUgOiAnVW5kZWZpbmVkJztcbiAgICAgIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShkYXRhKSA/IGRhdGEgOiBbZGF0YV07XG4gICAgICBtb2RlbCA9IG5ldyBHcm91cEVudGl0eShncm91cE5hbWUsIGl0ZW1zKTtcbiAgICB9XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChtb2RlbCwgZmxhZ3MpO1xuICB9XG5cbiAgb25LZXlEb3duSGFubGRlciA9IChlKSA9PiB7XG4gICAgRXZlbnRIYW5kbGVyLnNlYXJjaEVsZW1lbnRGb2N1c0hhbmxkZXIoZSk7XG4gIH1cblxuICBnZXRTZWFyY2hFbGVtZW50ID0gKCkgPT4gKFxuICAgIDxTZWFyY2hCYXJcbiAgICAgIGF1dG9Gb2N1c1xuICAgICAgZGVmYWx0VmFsdWU9e3RoaXMuc3RhdGUuc2VhcmNoaW5nRm9yfVxuICAgICAgaW5wdXRDbGFzc05hbWU9e0NMQVNTX05BTUVfU0VBUkNIX0ZPQ1VTQUJMRX1cbiAgICAgIGlzRHluYW1pY1xuICAgICAgaXNUb29sdGlwRW5hYmxlZFxuICAgICAgbWluQ2hhcnM9ezJ9XG4gICAgICB0cmFuc2xhdGlvbnM9e3tcbiAgICAgICAgdG9vbHRpcDogdGhpcy5wcm9wcy5zZWFyY2hUb29sdGlwLFxuICAgICAgICBzZWFyY2hQbGFjZUhvbGRlcjogdGhpcy5wcm9wcy5zZWFyY2hQbGFjZUhvbGRlcixcbiAgICAgIH19XG4gICAgICBvblNlYXJjaD17dGhpcy5vblNlYXJjaENoYW5nZUhhbmRsZXJ9XG4gICAgICBvbkNsZWFyPXt0aGlzLnByb3BzLm9uU2hvdWxkQ2xvc2VQb3BvdmVyfVxuICAgIC8+XG4gICk7XG5cbiAgZ2V0TGlzdHMgPSAoKSA9PiAoXG4gICAgPGRpdj5cbiAgICAgIDxIU1NlbGVjdEJ1dHRvbiBsYWJlbD17dGhpcy5wcm9wcy5idG5PcGVuVmlld0xhYmVsfSBvbkNsaWNrPXt0aGlzLnByb3BzLm9uU2hvdWxkT3BlblZpZXd9IC8+XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgZ2V0U2VhcmNoTGF5b3V0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHNlYXJjaE1vZGVsID0gbmV3IFNlYXJjaCh0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlcik7XG4gICAgY29uc3QgZm91bmRJdGVtcyA9IHNlYXJjaE1vZGVsLmdldEZvdW5kRnJvbUhpZXJhcmNoeSh0aGlzLnN0YXRlLnNlYXJjaGluZ0Zvcik7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFBvcG92ZXJTZWFyY2hDb250ZW50XG4gICAgICAgIGZvdW5kSXRlbXM9e2ZvdW5kSXRlbXN9XG4gICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0SGFuZGxlcn1cbiAgICAgICAgaXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLmZvdW5kSXRlbVJlbmRlckZ1bmN0aW9ufVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgZ2V0TWFpbkxheW91dCA9ICgpID0+IChcbiAgICA8Q29tbW9uTGF5b3V0PlxuICAgICAge3RoaXMuZ2V0U2VhcmNoRWxlbWVudCgpfVxuICAgICAge3RoaXMuc3RhdGUuc2VhcmNoaW5nRm9yICE9PSAnJyA/IHRoaXMuZ2V0U2VhcmNoTGF5b3V0KCkgOiB0aGlzLmdldExpc3RzKCl9XG4gICAgPC9Db21tb25MYXlvdXQ+XG4gICk7XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1wb3BvdmVyXCJcbiAgICAgICAgdGFiSW5kZXg9XCIwXCJcbiAgICAgICAgcmVmPXsoZWwpID0+IHsgdGhpcy5tYWluRWxlbWVudCA9IGVsOyB9fVxuICAgICAgPlxuICAgICAgICB7IHRoaXMuc3RhdGUuaXNEYXRhTG9hZGVkID8gdGhpcy5nZXRNYWluTGF5b3V0KCkgOiA8U3Bpbm5lckxheW91dCAvPiB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkhpZXJhcmNoeVNlbGVjdG9yUG9wb3Zlci5wcm9wVHlwZXMgPSB7XG4gIGRhdGFTb3VyY2VQcm92aWRlcjogZGF0YVNvdXJjZVByb3ZpZGVyVHlwZS5pc1JlcXVpcmVkLFxuICBvbkNvbXBvbmVudEJsdXI6IFByb3BUeXBlcy5mdW5jLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2hvdWxkT3BlblZpZXc6IFByb3BUeXBlcy5mdW5jLFxuICBmb3VuZEl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2hvdWxkQ2xvc2VQb3BvdmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgYnRuT3BlblZpZXdMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgc2VhcmNoUGxhY2VIb2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHNlYXJjaFRvb2x0aXA6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5lbGVtZW50LCBQcm9wVHlwZXMuc3RyaW5nXSksXG59O1xuXG5IaWVyYXJjaHlTZWxlY3RvclBvcG92ZXIuZGVmYXVsdFByb3BzID0ge1xuICBvbkNvbXBvbmVudEJsdXI6ICgpID0+IHt9LFxuICBvblNlbGVjdDogKCkgPT4ge30sXG4gIG9uU2hvdWxkT3BlblZpZXc6ICgpID0+IHt9LFxuICBvblNob3VsZENsb3NlUG9wb3ZlcjogKCkgPT4ge30sXG4gIGZvdW5kSXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxuICBidG5PcGVuVmlld0xhYmVsOiAnU2VsZWN0Li4uJyxcbiAgc2VhcmNoUGxhY2VIb2xkZXI6ICdTZWFyY2guLi4nLFxuICBzZWFyY2hUb29sdGlwOiBudWxsLFxufTtcbiJdfQ==