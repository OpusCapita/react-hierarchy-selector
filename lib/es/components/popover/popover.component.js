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
  searchPlaceHolder: 'Search...'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSIsIlNlYXJjaCIsIkdyb3VwRW50aXR5IiwiQ29tbW9uTGF5b3V0IiwiU3Bpbm5lckxheW91dCIsIkhTU2VsZWN0QnV0dG9uIiwiUG9wb3ZlclNlYXJjaENvbnRlbnQiLCJFdmVudEhhbmRsZXIiLCJDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEUiLCJTZWFyY2hCYXIiLCJVdGlscyIsIkhpZXJhcmNoeVNlbGVjdG9yUG9wb3ZlciIsInByb3BzIiwib25Gb2N1c091dEhhbmRsZXIiLCJlIiwiaXNGb2N1c09uQ3VycmVudFRhcmdldCIsIm9uQ29tcG9uZW50Qmx1ciIsIm9uU2VhcmNoQ2hhbmdlSGFuZGxlciIsInNlYXJjaGluZ1ZhbHVlIiwidGFyZ2V0IiwidmFsdWUiLCJzZWFyY2hpbmdGb3IiLCJlbm91Z2hTZWFyY2hUZXh0TGVuZ3RoIiwic2V0U3RhdGUiLCJvblNlbGVjdEhhbmRsZXIiLCJkYXRhIiwibW9kZWwiLCJncm91cE5hbWUiLCJuYW1lIiwiaXRlbXMiLCJBcnJheSIsImlzQXJyYXkiLCJvblNlbGVjdCIsIm9uS2V5RG93bkhhbmxkZXIiLCJzZWFyY2hFbGVtZW50Rm9jdXNIYW5sZGVyIiwiZ2V0U2VhcmNoRWxlbWVudCIsInNlYXJjaFBsYWNlSG9sZGVyIiwib25TaG91bGRDbG9zZVBvcG92ZXIiLCJnZXRMaXN0cyIsImJ0bk9wZW5WaWV3TGFiZWwiLCJvblNob3VsZE9wZW5WaWV3IiwiZ2V0U2VhcmNoTGF5b3V0Iiwic2VhcmNoTW9kZWwiLCJkYXRhU291cmNlUHJvdmlkZXIiLCJmb3VuZEl0ZW1zIiwiZ2V0Rm91bmRGcm9tSGllcmFyY2h5Iiwic3RhdGUiLCJmb3VuZEl0ZW1SZW5kZXJGdW5jdGlvbiIsImdldE1haW5MYXlvdXQiLCJpc0RhdGFMb2FkZWQiLCJpc0xvYWRlZCIsImNvbXBvbmVudFdpbGxNb3VudCIsImxvYWREYXRhIiwidGhlbiIsImNvbXBvbmVudERpZE1vdW50IiwibWFpbkVsZW1lbnQiLCJmb2N1cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJlbCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7O0FBRUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7O0FBRUEsU0FBU0Msc0JBQVQsUUFBdUMsc0JBQXZDO0FBQ0EsT0FBT0MsTUFBUCxNQUFtQixxQkFBbkI7QUFDQSxPQUFPQyxXQUFQLE1BQXdCLDJCQUF4Qjs7QUFFQSxPQUFPQyxZQUFQLE1BQXlCLHlCQUF6QjtBQUNBLE9BQU9DLGFBQVAsTUFBMEIsMEJBQTFCO0FBQ0EsT0FBT0MsY0FBUCxNQUEyQix3QkFBM0I7QUFDQSxPQUFPQyxvQkFBUCxNQUFpQyxtQ0FBakM7QUFDQSxPQUFPQyxZQUFQLE1BQXlCLGtCQUF6QjtBQUNBLFNBQVNDLDJCQUFULFFBQTRDLGFBQTVDO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixlQUF0QjtBQUNBLE9BQU9DLEtBQVAsTUFBa0IsYUFBbEI7QUFDQSxPQUFPLGdCQUFQOztJQUVxQkMsd0I7OztBQUNuQixvQ0FBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQSxVQXlCbkJDLGlCQXpCbUIsR0F5QkMsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3pCLFVBQUksQ0FBQ0osTUFBTUssc0JBQU4sQ0FBNkJELENBQTdCLENBQUwsRUFBc0MsTUFBS0YsS0FBTCxDQUFXSSxlQUFYO0FBQ3ZDLEtBM0JrQjs7QUFBQSxVQTZCbkJDLHFCQTdCbUIsR0E2QkssVUFBQ0gsQ0FBRCxFQUFPO0FBQzdCLFVBQU1JLGlCQUFp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QUFDbEIsU0FBS0MsV0FBTCxDQUFpQkMsS0FBakI7QUFDQSxTQUFLRCxXQUFMLENBQWlCRSxnQkFBakIsQ0FBa0MsVUFBbEMsRUFBOEMsS0FBSzVDLGlCQUFuRDtBQUNELEc7O3FDQUVENkMsb0IsbUNBQXVCO0FBQ3JCLFNBQUtILFdBQUwsQ0FBaUJJLG1CQUFqQixDQUFxQyxVQUFyQyxFQUFpRCxLQUFLOUMsaUJBQXREO0FBQ0QsRzs7cUNBa0VEK0MsTSxxQkFBUztBQUFBOztBQUNQLFdBQ0U7QUFBQTtBQUFBO0FBQ0UsbUJBQVUsK0JBRFo7QUFFRSxrQkFBUyxHQUZYO0FBR0UsYUFBSyxhQUFDQyxFQUFELEVBQVE7QUFBRSxpQkFBS04sV0FBTCxHQUFtQk0sRUFBbkI7QUFBd0I7QUFIekM7QUFLSSxXQUFLZixLQUFMLENBQVdHLFlBQVgsR0FBMEIsS0FBS0QsYUFBTCxFQUExQixHQUFpRCxvQkFBQyxhQUFEO0FBTHJELEtBREY7QUFTRCxHOzs7RUFwR21EbEQsTUFBTWdFLGE7O1NBQXZDbkQsd0I7OztBQWtIckJBLHlCQUF5Qm9ELFlBQXpCLEdBQXdDO0FBQ3RDL0MsbUJBQWlCLDJCQUFNLENBQUUsQ0FEYTtBQUV0Q2dCLFlBQVUsb0JBQU0sQ0FBRSxDQUZvQjtBQUd0Q1Esb0JBQWtCLDRCQUFNLENBQUUsQ0FIWTtBQUl0Q0gsd0JBQXNCLGdDQUFNLENBQUUsQ0FKUTtBQUt0Q1UsMkJBQXlCLElBTGE7QUFNdENSLG9CQUFrQixXQU5vQjtBQU90Q0gscUJBQW1CO0FBUG1CLENBQXhDIiwiZmlsZSI6InBvcG92ZXIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1ub25pbnRlcmFjdGl2ZS10YWJpbmRleCAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IHsgZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3R5cGVzJztcbmltcG9ydCBTZWFyY2ggZnJvbSAnLi4vLi4vbW9kZWxzL3NlYXJjaCc7XG5pbXBvcnQgR3JvdXBFbnRpdHkgZnJvbSAnLi4vLi4vbW9kZWxzL2dyb3VwLmVudGl0eSc7XG5cbmltcG9ydCBDb21tb25MYXlvdXQgZnJvbSAnLi9sYXlvdXRzL2NvbW1vbi5sYXlvdXQnO1xuaW1wb3J0IFNwaW5uZXJMYXlvdXQgZnJvbSAnLi9sYXlvdXRzL3NwaW5uZXIubGF5b3V0JztcbmltcG9ydCBIU1NlbGVjdEJ1dHRvbiBmcm9tICcuL3NlbGVjdC1idG4uY29tcG9uZW50JztcbmltcG9ydCBQb3BvdmVyU2VhcmNoQ29udGVudCBmcm9tICcuL3NlYXJjaC9zZWFyY2gtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IEV2ZW50SGFuZGxlciBmcm9tICcuL2V2ZW50LWhhbmRsZXJzJztcbmltcG9ydCB7IENMQVNTX05BTUVfU0VBUkNIX0ZPQ1VTQUJMRSB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCBTZWFyY2hCYXIgZnJvbSAnLi4vc2VhcmNoLWJhcic7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0ICcuL3BvcG92ZXIuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVNlbGVjdG9yUG9wb3ZlciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaXNEYXRhTG9hZGVkOiBwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuaXNMb2FkZWQsXG4gICAgICBzZWFyY2hpbmdGb3I6ICcnLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLmlzRGF0YUxvYWRlZCkge1xuICAgICAgdGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXIubG9hZERhdGEoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzRGF0YUxvYWRlZDogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMubWFpbkVsZW1lbnQuZm9jdXMoKTtcbiAgICB0aGlzLm1haW5FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdGhpcy5vbkZvY3VzT3V0SGFuZGxlcik7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLm1haW5FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdGhpcy5vbkZvY3VzT3V0SGFuZGxlcik7XG4gIH1cblxuICBvbkZvY3VzT3V0SGFuZGxlciA9IChlKSA9PiB7XG4gICAgaWYgKCFVdGlscy5pc0ZvY3VzT25DdXJyZW50VGFyZ2V0KGUpKSB0aGlzLnByb3BzLm9uQ29tcG9uZW50Qmx1cigpO1xuICB9XG5cbiAgb25TZWFyY2hDaGFuZ2VIYW5kbGVyID0gKGUpID0+IHtcbiAgICBjb25zdCBzZWFyY2hpbmdWYWx1ZSA9IGUudGFyZ2V0ID8gZS50YXJnZXQudmFsdWUgfHwgJycgOiAnJztcbiAgICBsZXQgc2VhcmNoaW5nRm9yID0gJyc7XG5cbiAgICBpZiAoVXRpbHMuZW5vdWdoU2VhcmNoVGV4dExlbmd0aChzZWFyY2hpbmdWYWx1ZSkpIHtcbiAgICAgIHNlYXJjaGluZ0ZvciA9IHNlYXJjaGluZ1ZhbHVlO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoaW5nRm9yIH0pO1xuICB9XG5cbiAgb25TZWxlY3RIYW5kbGVyID0gKGRhdGEpID0+IHtcbiAgICBsZXQgbW9kZWwgPSBudWxsO1xuXG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIGNvbnN0IGdyb3VwTmFtZSA9IGRhdGEubmFtZSA/IGRhdGEubmFtZSA6ICdVbmRlZmluZWQnO1xuICAgICAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KGRhdGEpID8gZGF0YSA6IFtkYXRhXTtcbiAgICAgIG1vZGVsID0gbmV3IEdyb3VwRW50aXR5KGdyb3VwTmFtZSwgaXRlbXMpO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KG1vZGVsKTtcbiAgfVxuXG4gIG9uS2V5RG93bkhhbmxkZXIgPSAoZSkgPT4ge1xuICAgIEV2ZW50SGFuZGxlci5zZWFyY2hFbGVtZW50Rm9jdXNIYW5sZGVyKGUpO1xuICB9XG5cbiAgZ2V0U2VhcmNoRWxlbWVudCA9ICgpID0+IChcbiAgICA8U2VhcmNoQmFyXG4gICAgICBpbnB1dENsYXNzTmFtZT17Q0xBU1NfTkFNRV9TRUFSQ0hfRk9DVVNBQkxFfVxuICAgICAgc2VhcmNoUGxhY2VIb2xkZXI9e3RoaXMucHJvcHMuc2VhcmNoUGxhY2VIb2xkZXJ9XG4gICAgICBvblNlYXJjaENoYW5nZT17dGhpcy5vblNlYXJjaENoYW5nZUhhbmRsZXJ9XG4gICAgICBvbkNsb3NlQ2xpY2s9e3RoaXMucHJvcHMub25TaG91bGRDbG9zZVBvcG92ZXJ9XG4gICAgLz5cbiAgKTtcblxuICBnZXRMaXN0cyA9ICgpID0+IChcbiAgICA8ZGl2PlxuICAgICAgPEhTU2VsZWN0QnV0dG9uIGxhYmVsPXt0aGlzLnByb3BzLmJ0bk9wZW5WaWV3TGFiZWx9IG9uQ2xpY2s9e3RoaXMucHJvcHMub25TaG91bGRPcGVuVmlld30gLz5cbiAgICA8L2Rpdj5cbiAgKTtcblxuICBnZXRTZWFyY2hMYXlvdXQgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2VhcmNoTW9kZWwgPSBuZXcgU2VhcmNoKHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyKTtcbiAgICBjb25zdCBmb3VuZEl0ZW1zID0gc2VhcmNoTW9kZWwuZ2V0Rm91bmRGcm9tSGllcmFyY2h5KHRoaXMuc3RhdGUuc2VhcmNoaW5nRm9yKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8UG9wb3ZlclNlYXJjaENvbnRlbnRcbiAgICAgICAgZm91bmRJdGVtcz17Zm91bmRJdGVtc31cbiAgICAgICAgb25TZWxlY3Q9e2RhdGEgPT4gdGhpcy5vblNlbGVjdEhhbmRsZXIoZGF0YSl9XG4gICAgICAgIGl0ZW1SZW5kZXJGdW5jdGlvbj17dGhpcy5wcm9wcy5mb3VuZEl0ZW1SZW5kZXJGdW5jdGlvbn1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIGdldE1haW5MYXlvdXQgPSAoKSA9PiAoXG4gICAgPENvbW1vbkxheW91dD5cbiAgICAgIHt0aGlzLmdldFNlYXJjaEVsZW1lbnQoKX1cbiAgICAgIHt0aGlzLnN0YXRlLnNlYXJjaGluZ0ZvciAhPT0gJycgPyB0aGlzLmdldFNlYXJjaExheW91dCgpIDogdGhpcy5nZXRMaXN0cygpfVxuICAgIDwvQ29tbW9uTGF5b3V0PlxuICApO1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItcG9wb3ZlclwiXG4gICAgICAgIHRhYkluZGV4PVwiMFwiXG4gICAgICAgIHJlZj17KGVsKSA9PiB7IHRoaXMubWFpbkVsZW1lbnQgPSBlbDsgfX1cbiAgICAgID5cbiAgICAgICAgeyB0aGlzLnN0YXRlLmlzRGF0YUxvYWRlZCA/IHRoaXMuZ2V0TWFpbkxheW91dCgpIDogPFNwaW5uZXJMYXlvdXQgLz4gfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5IaWVyYXJjaHlTZWxlY3RvclBvcG92ZXIucHJvcFR5cGVzID0ge1xuICBkYXRhU291cmNlUHJvdmlkZXI6IGRhdGFTb3VyY2VQcm92aWRlclR5cGUuaXNSZXF1aXJlZCxcbiAgb25Db21wb25lbnRCbHVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBvblNob3VsZE9wZW5WaWV3OiBQcm9wVHlwZXMuZnVuYyxcbiAgZm91bmRJdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICBvblNob3VsZENsb3NlUG9wb3ZlcjogUHJvcFR5cGVzLmZ1bmMsXG4gIGJ0bk9wZW5WaWV3TGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuSGllcmFyY2h5U2VsZWN0b3JQb3BvdmVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25Db21wb25lbnRCbHVyOiAoKSA9PiB7fSxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBvblNob3VsZE9wZW5WaWV3OiAoKSA9PiB7fSxcbiAgb25TaG91bGRDbG9zZVBvcG92ZXI6ICgpID0+IHt9LFxuICBmb3VuZEl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcbiAgYnRuT3BlblZpZXdMYWJlbDogJ1NlbGVjdC4uLicsXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiAnU2VhcmNoLi4uJyxcbn07XG4iXX0=