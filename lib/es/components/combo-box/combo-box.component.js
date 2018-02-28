var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/no-unused-state */

import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import PropTypes from 'prop-types';
import FaChevronDown from 'react-icons/lib/fa/chevron-down';
import { dataSourceProviderType } from '../../services/types';
import { preCheckedItemsListShape, popoverOptionsType, viewOptionsType } from '../../types';
import Spinner from '../spinner';
import HSPopover from '../popover';
import HSView from '../view';
import HSBadge from '../badge';

import { TOOLTIP_DELAY_MS, MAX_COUNT_OF_TOOLTIP_ITEMS } from './constants';
import './combo-box.scss';

var HierarchySelectorComboBox = (_temp = _class = function (_React$PureComponent) {
  _inherits(HierarchySelectorComboBox, _React$PureComponent);

  function HierarchySelectorComboBox(props) {
    _classCallCheck(this, HierarchySelectorComboBox);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _initialiseProps.call(_this);

    var isDataLoaded = props.dataSourceProvider.isLoaded;
    var needToUpdatePreChecked = props.preCheckedItems && props.preCheckedItems.length;
    var needToLoadData = !isDataLoaded && needToUpdatePreChecked;

    _this.state = {
      needToLoadData: needToLoadData,
      needToUpdatePreChecked: needToUpdatePreChecked,
      preCheckedItems: props.preCheckedItems,
      selected: null,
      isPopoverVisible: props.popoverVisible,
      isViewVisible: false
    };
    return _this;
  }

  HierarchySelectorComboBox.prototype.componentWillMount = function componentWillMount() {
    var needToLoadData = this.state.needToLoadData;

    if (needToLoadData) {
      this.loadData(this.props);
    }
  };

  HierarchySelectorComboBox.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _props = this.props,
        dataSourceProvider = _props.dataSourceProvider,
        preCheckedItems = _props.preCheckedItems;


    if (dataSourceProvider !== nextProps.dataSourceProvider) {
      this.setState({
        needToLoadData: true
      });
    }

    if (preCheckedItems !== nextProps.preCheckedItems) {
      this.setState({
        needToUpdatePreChecked: true
      });
    }
  };

  HierarchySelectorComboBox.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
    var needToLoadData = nextState.needToLoadData,
        needToUpdatePreChecked = nextState.needToUpdatePreChecked;

    if (needToLoadData) {
      this.loadData(nextProps);
    } else if (needToUpdatePreChecked) {
      this.updatePrechecked(nextProps);
    }
  };

  HierarchySelectorComboBox.prototype.render = function render() {
    var _this2 = this;

    var inputName = this.props.inputName;

    var inputOptions = {
      onFocus: this.onInputFocus,
      type: 'text',
      placeholder: this.props.noSelectionText,
      readOnly: true,
      ref: function ref(input) {
        _this2.inputElement = input;
      },
      value: this.getInputText()
    };

    if (inputName.trim() !== '') {
      inputOptions.name = inputName;
    }

    return React.createElement(
      'div',
      { className: 'oc-hierarchy-selector-list-wrapper' },
      React.createElement(
        OverlayTrigger,
        {
          delay: TOOLTIP_DELAY_MS,
          placement: this.props.tooltipPlacement,
          overlay: this.getToolTip(this.getDefaultToolTipContent())
        },
        React.createElement(
          'div',
          { className: 'oc-hierarchy-selector-list' },
          React.createElement('input', inputOptions),
          this.state.needToLoadData ? React.createElement(Spinner, null) : React.createElement(
            HSBadge,
            { className: 'badge-orange' },
            this.getCountOfSelectedItems()
          ),
          React.createElement(
            'button',
            { type: 'button', disabled: this.state.needToLoadData, className: 'oc-hierarchy-selector-list-btn', onClick: this.onClickHandler },
            React.createElement(FaChevronDown, null)
          )
        )
      ),
      this.state.isPopoverVisible ? this.getPopover() : null,
      this.state.isViewVisible ? this.getView() : null
    );
  };

  return HierarchySelectorComboBox;
}(React.PureComponent), _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.onClickHandler = function () {
    _this3.setPopoverVisibility(!_this3.state.isPopoverVisible);
  };

  this.onInputFocus = function () {
    _this3.inputElement.blur();
  };

  this.onSelectHandler = function (selectedItem, checkedOutput) {
    _this3.setState({
      selected: selectedItem,
      isPopoverVisible: false,
      isViewVisible: false
    });
    var items = checkedOutput ? checkedOutput.map(function (item) {
      return Object.assign({}, item);
    }) : [];

    _this3.props.onSelect(items);
  };

  this.onPopoverBlur = function () {
    if (_this3.props.hideOnPopoverBlur) {
      _this3.popoverShouldBeHidden();
    }
  };

  this.onShouldOpenView = function () {
    _this3.setState({ isViewVisible: true });
  };

  this.onShouldClosePopover = function () {
    _this3.setState({
      isPopoverVisible: false
    });
  };

  this.onCanceledView = function () {
    _this3.setState({
      isPopoverVisible: false,
      isViewVisible: false
    });
  };

  this.onSelectedInView = function (groupName, selectedItems, checkedOutput) {
    var selectedItem = {
      name: groupName,
      items: selectedItems
    };
    _this3.setState({
      preCheckedItems: checkedOutput
    });
    _this3.onSelectHandler(selectedItem, checkedOutput);
  };

  this.onSelectedInPopover = function (selectedItem) {
    _this3.uncheckAllItems();
    var checkedOutput = selectedItem && Array.isArray(selectedItem.items) ? selectedItem.items.map(function (item) {
      return {
        id: item.id,
        name: item.name,
        level: 0,
        parentId: null,
        parentIds: [],
        isCheckedAll: false,
        isChildren: false
      };
    }) : [];
    _this3.onSelectHandler(selectedItem, checkedOutput);
  };

  this.getInputText = function () {
    var selectionText = '';

    if (_this3.state.selected && _this3.state.selected.items && _this3.state.selected.items.length > 0) {
      selectionText = _this3.state.selected.name;
    }
    return selectionText;
  };

  this.getView = function () {
    var options = _this3.props.viewOptions;
    var preCheckedItems = Array.isArray(_this3.state.preCheckedItems) ? _this3.state.preCheckedItems.slice() : null;

    return React.createElement(HSView, _extends({
      dataSourceProvider: _this3.props.dataSourceProvider
    }, options, {
      onCancel: _this3.onCanceledView,
      onSelect: _this3.onSelectedInView,
      groupName: _this3.state.selected ? _this3.state.selected.name : '',
      preCheckedItems: preCheckedItems
    }));
  };

  this.getPopover = function () {
    var options = _this3.props.popoverOptions;

    return React.createElement(HSPopover, _extends({
      dataSourceProvider: _this3.props.dataSourceProvider,
      onComponentBlur: _this3.onPopoverBlur,
      onSelect: _this3.onSelectedInPopover,
      onShouldOpenView: _this3.onShouldOpenView,
      onShouldClosePopover: _this3.onShouldClosePopover
    }, options));
  };

  this.getToolTip = function (content) {
    return React.createElement(
      Tooltip,
      { id: 'tooltip', className: 'hs-combo-box-tooltip' },
      content
    );
  };

  this.getDefaultToolTipContent = function () {
    if (!_this3.isSelectedItems()) return _this3.props.noSelectionText;
    var totalCount = _this3.state.selected.items.length;
    var count = totalCount > MAX_COUNT_OF_TOOLTIP_ITEMS ? MAX_COUNT_OF_TOOLTIP_ITEMS : totalCount;

    var items = _this3.state.selected.items.slice(0, count);
    var elements = Object.keys(items).map(function (i) {
      return React.createElement(
        'p',
        { key: i },
        items[i].name
      );
    });

    if (count < totalCount) elements.push(React.createElement(
      'p',
      { key: count },
      '. . .'
    ));

    return elements;
  };

  this.getCountOfSelectedItems = function () {
    return _this3.isSelectedItems() ? _this3.state.selected.items.length : 0;
  };

  this.setPopoverVisibility = function (isVisible) {
    _this3.setState({ isPopoverVisible: isVisible });
  };

  this.isSelectedItems = function () {
    return _this3.state.selected && _this3.state.selected.items && _this3.state.selected.items.length > 0;
  };

  this.loadData = function (props) {
    props.dataSourceProvider.loadData().then(function () {
      _this3.setState({
        needToLoadData: false
      });
    });
  };

  this.popoverShouldBeHidden = function () {
    setTimeout(function () {
      if (_this3.state.isPopoverVisible) _this3.setPopoverVisibility(false);
    }, 150);
  };

  this.uncheckAllItems = function () {
    _this3.setState({
      preCheckedItems: []
    });
  };

  this.updatePrechecked = function (props) {
    var dataSourceProvider = props.dataSourceProvider,
        preCheckedGroupName = props.preCheckedGroupName,
        preCheckedItems = props.preCheckedItems;


    dataSourceProvider.setPrecheckedItems(preCheckedItems);

    var checkedOutput = dataSourceProvider.getCheckedOutput();
    var selectedItems = dataSourceProvider.getAllCheckedItems();
    var checked = checkedOutput.checked || [];

    _this3.setState({
      needToUpdatePreChecked: false
    });

    _this3.onSelectedInView(preCheckedGroupName, selectedItems, checked);
  };
}, _temp);
export { HierarchySelectorComboBox as default };


HierarchySelectorComboBox.defaultProps = {
  hideOnPopoverBlur: true,
  inputName: '',
  noSelectionText: 'No one selected...',
  popoverVisible: false,
  preCheckedItems: null,
  preCheckedGroupName: 'Default group',
  tooltipPlacement: 'bottom',
  onSelect: function onSelect() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbWJvLWJveC9jb21iby1ib3guY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlRvb2x0aXAiLCJPdmVybGF5VHJpZ2dlciIsIlByb3BUeXBlcyIsIkZhQ2hldnJvbkRvd24iLCJkYXRhU291cmNlUHJvdmlkZXJUeXBlIiwicHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlIiwicG9wb3Zlck9wdGlvbnNUeXBlIiwidmlld09wdGlvbnNUeXBlIiwiU3Bpbm5lciIsIkhTUG9wb3ZlciIsIkhTVmlldyIsIkhTQmFkZ2UiLCJUT09MVElQX0RFTEFZX01TIiwiTUFYX0NPVU5UX09GX1RPT0xUSVBfSVRFTVMiLCJIaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94IiwicHJvcHMiLCJpc0RhdGFMb2FkZWQiLCJkYXRhU291cmNlUHJvdmlkZXIiLCJpc0xvYWRlZCIsIm5lZWRUb1VwZGF0ZVByZUNoZWNrZWQiLCJwcmVDaGVja2VkSXRlbXMiLCJsZW5ndGgiLCJuZWVkVG9Mb2FkRGF0YSIsInN0YXRlIiwic2VsZWN0ZWQiLCJpc1BvcG92ZXJWaXNpYmxlIiwicG9wb3ZlclZpc2libGUiLCJpc1ZpZXdWaXNpYmxlIiwiY29tcG9uZW50V2lsbE1vdW50IiwibG9hZERhdGEiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwic2V0U3RhdGUiLCJjb21wb25lbnRXaWxsVXBkYXRlIiwibmV4dFN0YXRlIiwidXBkYXRlUHJlY2hlY2tlZCIsInJlbmRlciIsImlucHV0TmFtZSIsImlucHV0T3B0aW9ucyIsIm9uRm9jdXMiLCJvbklucHV0Rm9jdXMiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJub1NlbGVjdGlvblRleHQiLCJyZWFkT25seSIsInJlZiIsImlucHV0IiwiaW5wdXRFbGVtZW50IiwidmFsdWUiLCJnZXRJbnB1dFRleHQiLCJ0cmltIiwibmFtZSIsInRvb2x0aXBQbGFjZW1lbnQiLCJnZXRUb29sVGlwIiwiZ2V0RGVmYXVsdFRvb2xUaXBDb250ZW50IiwiZ2V0Q291bnRPZlNlbGVjdGVkSXRlbXMiLCJvbkNsaWNrSGFuZGxlciIsImdldFBvcG92ZXIiLCJnZXRWaWV3IiwiUHVyZUNvbXBvbmVudCIsInNldFBvcG92ZXJWaXNpYmlsaXR5IiwiYmx1ciIsIm9uU2VsZWN0SGFuZGxlciIsInNlbGVjdGVkSXRlbSIsImNoZWNrZWRPdXRwdXQiLCJpdGVtcyIsIm1hcCIsIk9iamVjdCIsImFzc2lnbiIsIml0ZW0iLCJvblNlbGVjdCIsIm9uUG9wb3ZlckJsdXIiLCJoaWRlT25Qb3BvdmVyQmx1ciIsInBvcG92ZXJTaG91bGRCZUhpZGRlbiIsIm9uU2hvdWxkT3BlblZpZXciLCJvblNob3VsZENsb3NlUG9wb3ZlciIsIm9uQ2FuY2VsZWRWaWV3Iiwib25TZWxlY3RlZEluVmlldyIsImdyb3VwTmFtZSIsInNlbGVjdGVkSXRlbXMiLCJvblNlbGVjdGVkSW5Qb3BvdmVyIiwidW5jaGVja0FsbEl0ZW1zIiwiQXJyYXkiLCJpc0FycmF5IiwiaWQiLCJsZXZlbCIsInBhcmVudElkIiwicGFyZW50SWRzIiwiaXNDaGVja2VkQWxsIiwiaXNDaGlsZHJlbiIsInNlbGVjdGlvblRleHQiLCJvcHRpb25zIiwidmlld09wdGlvbnMiLCJzbGljZSIsInBvcG92ZXJPcHRpb25zIiwiY29udGVudCIsImlzU2VsZWN0ZWRJdGVtcyIsInRvdGFsQ291bnQiLCJjb3VudCIsImVsZW1lbnRzIiwia2V5cyIsImkiLCJwdXNoIiwiaXNWaXNpYmxlIiwidGhlbiIsInNldFRpbWVvdXQiLCJwcmVDaGVja2VkR3JvdXBOYW1lIiwic2V0UHJlY2hlY2tlZEl0ZW1zIiwiZ2V0Q2hlY2tlZE91dHB1dCIsImdldEFsbENoZWNrZWRJdGVtcyIsImNoZWNrZWQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7QUFFQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsU0FBU0MsT0FBVCxFQUFrQkMsY0FB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bUIwRixrQkFBbkIsQ0FBc0N2RixlQUF0Qzs7QUFFQSxRQUFNNEMsZ0JBQWdCL0MsbUJBQW1CMkYsZ0JBQW5CLEVBQXRCO0FBQ0EsUUFBTTdCLGdCQUFnQjlELG1CQUFtQjRGLGtCQUFuQixFQUF0QjtBQUNBLFFBQU1DLFVBQVU5QyxjQUFjOEMsT0FBZCxJQUF5QixFQUF6Qzs7QUFFQSxXQUFLOUUsUUFBTCxDQUFjO0FBQ1piLDhCQUF3QjtBQURaLEtBQWQ7O0FBSUEsV0FBSzBELGdCQUFMLENBQXNCNkIsbUJBQXRCLEVBQTJDM0IsYUFBM0MsRUFBMEQrQixPQUExRDtBQUNELEc7O1NBek5rQmhHLHlCOzs7QUErUXJCQSwwQkFBMEJpRyxZQUExQixHQUF5QztBQUN2Q3ZDLHFCQUFtQixJQURvQjtBQUV2Q25DLGFBQVcsRUFGNEI7QUFHdkNNLG1CQUFpQixvQkFIc0I7QUFJdkNqQixrQkFBZ0IsS0FKdUI7QUFLdkNOLG1CQUFpQixJQUxzQjtBQU12Q3NGLHVCQUFxQixlQU5rQjtBQU92Q3RELG9CQUFrQixRQVBxQjtBQVF2Q2tCLFlBQVUsb0JBQU0sQ0FBRTtBQVJxQixDQUF6QyIsImZpbGUiOiJjb21iby1ib3guY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tdW51c2VkLXN0YXRlICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBUb29sdGlwLCBPdmVybGF5VHJpZ2dlciB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEZhQ2hldnJvbkRvd24gZnJvbSAncmVhY3QtaWNvbnMvbGliL2ZhL2NoZXZyb24tZG93bic7XG5pbXBvcnQgeyBkYXRhU291cmNlUHJvdmlkZXJUeXBlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdHlwZXMnO1xuaW1wb3J0IHsgcHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlLCBwb3BvdmVyT3B0aW9uc1R5cGUsIHZpZXdPcHRpb25zVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCBTcGlubmVyIGZyb20gJy4uL3NwaW5uZXInO1xuaW1wb3J0IEhTUG9wb3ZlciBmcm9tICcuLi9wb3BvdmVyJztcbmltcG9ydCBIU1ZpZXcgZnJvbSAnLi4vdmlldyc7XG5pbXBvcnQgSFNCYWRnZSBmcm9tICcuLi9iYWRnZSc7XG5cblxuaW1wb3J0IHsgVE9PTFRJUF9ERUxBWV9NUywgTUFYX0NPVU5UX09GX1RPT0xUSVBfSVRFTVMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgJy4vY29tYm8tYm94LnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgY29uc3QgaXNEYXRhTG9hZGVkID0gcHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzTG9hZGVkO1xuICAgIGNvbnN0IG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQgPSBwcm9wcy5wcmVDaGVja2VkSXRlbXMgJiYgcHJvcHMucHJlQ2hlY2tlZEl0ZW1zLmxlbmd0aDtcbiAgICBjb25zdCBuZWVkVG9Mb2FkRGF0YSA9ICFpc0RhdGFMb2FkZWQgJiYgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZDtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBuZWVkVG9Mb2FkRGF0YSxcbiAgICAgIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQsXG4gICAgICBwcmVDaGVja2VkSXRlbXM6IHByb3BzLnByZUNoZWNrZWRJdGVtcyxcbiAgICAgIHNlbGVjdGVkOiBudWxsLFxuICAgICAgaXNQb3BvdmVyVmlzaWJsZTogcHJvcHMucG9wb3ZlclZpc2libGUsXG4gICAgICBpc1ZpZXdWaXNpYmxlOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGNvbnN0IHsgbmVlZFRvTG9hZERhdGEgfSA9IHRoaXMuc3RhdGU7XG4gICAgaWYgKG5lZWRUb0xvYWREYXRhKSB7XG4gICAgICB0aGlzLmxvYWREYXRhKHRoaXMucHJvcHMpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgY29uc3QgeyBkYXRhU291cmNlUHJvdmlkZXIsIHByZUNoZWNrZWRJdGVtcyB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChkYXRhU291cmNlUHJvdmlkZXIgIT09IG5leHRQcm9wcy5kYXRhU291cmNlUHJvdmlkZXIpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBuZWVkVG9Mb2FkRGF0YTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChwcmVDaGVja2VkSXRlbXMgIT09IG5leHRQcm9wcy5wcmVDaGVja2VkSXRlbXMpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBuZWVkVG9VcGRhdGVQcmVDaGVja2VkOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgIGNvbnN0IHsgbmVlZFRvTG9hZERhdGEsIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQgfSA9IG5leHRTdGF0ZTtcbiAgICBpZiAobmVlZFRvTG9hZERhdGEpIHtcbiAgICAgIHRoaXMubG9hZERhdGEobmV4dFByb3BzKTtcbiAgICB9IGVsc2UgaWYgKG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQpIHtcbiAgICAgIHRoaXMudXBkYXRlUHJlY2hlY2tlZChuZXh0UHJvcHMpO1xuICAgIH1cbiAgfVxuXG4gIG9uQ2xpY2tIYW5kbGVyID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0UG9wb3ZlclZpc2liaWxpdHkoIXRoaXMuc3RhdGUuaXNQb3BvdmVyVmlzaWJsZSk7XG4gIH1cblxuICBvbklucHV0Rm9jdXMgPSAoKSA9PiB7XG4gICAgdGhpcy5pbnB1dEVsZW1lbnQuYmx1cigpO1xuICB9XG5cbiAgb25TZWxlY3RIYW5kbGVyID0gKHNlbGVjdGVkSXRlbSwgY2hlY2tlZE91dHB1dCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWQ6IHNlbGVjdGVkSXRlbSxcbiAgICAgIGlzUG9wb3ZlclZpc2libGU6IGZhbHNlLFxuICAgICAgaXNWaWV3VmlzaWJsZTogZmFsc2UsXG4gICAgfSk7XG4gICAgY29uc3QgaXRlbXMgPSBjaGVja2VkT3V0cHV0ID8gY2hlY2tlZE91dHB1dC5tYXAoaXRlbSA9PiBPYmplY3QuYXNzaWduKHt9LCBpdGVtKSkgOiBbXTtcblxuICAgIHRoaXMucHJvcHMub25TZWxlY3QoaXRlbXMpO1xuICB9XG5cbiAgb25Qb3BvdmVyQmx1ciA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5oaWRlT25Qb3BvdmVyQmx1cikge1xuICAgICAgdGhpcy5wb3BvdmVyU2hvdWxkQmVIaWRkZW4oKTtcbiAgICB9XG4gIH1cblxuICBvblNob3VsZE9wZW5WaWV3ID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBpc1ZpZXdWaXNpYmxlOiB0cnVlIH0pO1xuICB9XG5cbiAgb25TaG91bGRDbG9zZVBvcG92ZXIgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpc1BvcG92ZXJWaXNpYmxlOiBmYWxzZSxcbiAgICB9KTtcbiAgfVxuXG4gIG9uQ2FuY2VsZWRWaWV3ID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaXNQb3BvdmVyVmlzaWJsZTogZmFsc2UsXG4gICAgICBpc1ZpZXdWaXNpYmxlOiBmYWxzZSxcbiAgICB9KTtcbiAgfVxuXG4gIG9uU2VsZWN0ZWRJblZpZXcgPSAoZ3JvdXBOYW1lLCBzZWxlY3RlZEl0ZW1zLCBjaGVja2VkT3V0cHV0KSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ZWRJdGVtID0ge1xuICAgICAgbmFtZTogZ3JvdXBOYW1lLFxuICAgICAgaXRlbXM6IHNlbGVjdGVkSXRlbXMsXG4gICAgfTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHByZUNoZWNrZWRJdGVtczogY2hlY2tlZE91dHB1dCxcbiAgICB9KTtcbiAgICB0aGlzLm9uU2VsZWN0SGFuZGxlcihzZWxlY3RlZEl0ZW0sIGNoZWNrZWRPdXRwdXQpO1xuICB9XG5cbiAgb25TZWxlY3RlZEluUG9wb3ZlciA9IChzZWxlY3RlZEl0ZW0pID0+IHtcbiAgICB0aGlzLnVuY2hlY2tBbGxJdGVtcygpO1xuICAgIGNvbnN0IGNoZWNrZWRPdXRwdXQgPSBzZWxlY3RlZEl0ZW0gJiYgQXJyYXkuaXNBcnJheShzZWxlY3RlZEl0ZW0uaXRlbXMpID9cbiAgICAgIHNlbGVjdGVkSXRlbS5pdGVtcy5tYXAoaXRlbSA9PiAoe1xuICAgICAgICBpZDogaXRlbS5pZCxcbiAgICAgICAgbmFtZTogaXRlbS5uYW1lLFxuICAgICAgICBsZXZlbDogMCxcbiAgICAgICAgcGFyZW50SWQ6IG51bGwsXG4gICAgICAgIHBhcmVudElkczogW10sXG4gICAgICAgIGlzQ2hlY2tlZEFsbDogZmFsc2UsXG4gICAgICAgIGlzQ2hpbGRyZW46IGZhbHNlLFxuICAgICAgfSkpXG4gICAgICA6IFtdO1xuICAgIHRoaXMub25TZWxlY3RIYW5kbGVyKHNlbGVjdGVkSXRlbSwgY2hlY2tlZE91dHB1dCk7XG4gIH1cblxuICBnZXRJbnB1dFRleHQgPSAoKSA9PiB7XG4gICAgbGV0IHNlbGVjdGlvblRleHQgPSAnJztcblxuICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkICYmIHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMgJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICBzZWxlY3Rpb25UZXh0ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZC5uYW1lO1xuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0aW9uVGV4dDtcbiAgfVxuXG4gIGdldFZpZXcgPSAoKSA9PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMucHJvcHMudmlld09wdGlvbnM7XG4gICAgY29uc3QgcHJlQ2hlY2tlZEl0ZW1zID0gQXJyYXkuaXNBcnJheSh0aGlzLnN0YXRlLnByZUNoZWNrZWRJdGVtcykgP1xuICAgICAgdGhpcy5zdGF0ZS5wcmVDaGVja2VkSXRlbXMuc2xpY2UoKSA6IG51bGw7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPEhTVmlld1xuICAgICAgICBkYXRhU291cmNlUHJvdmlkZXI9e3RoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyfVxuICAgICAgICB7Li4ub3B0aW9uc31cbiAgICAgICAgb25DYW5jZWw9e3RoaXMub25DYW5jZWxlZFZpZXd9XG4gICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0ZWRJblZpZXd9XG4gICAgICAgIGdyb3VwTmFtZT17dGhpcy5zdGF0ZS5zZWxlY3RlZCA/IHRoaXMuc3RhdGUuc2VsZWN0ZWQubmFtZSA6ICcnfVxuICAgICAgICBwcmVDaGVja2VkSXRlbXM9e3ByZUNoZWNrZWRJdGVtc31cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIGdldFBvcG92ZXIgPSAoKSA9PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMucHJvcHMucG9wb3Zlck9wdGlvbnM7XG5cbiAgICByZXR1cm4gKDxIU1BvcG92ZXJcbiAgICAgIGRhdGFTb3VyY2VQcm92aWRlcj17dGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXJ9XG4gICAgICBvbkNvbXBvbmVudEJsdXI9e3RoaXMub25Qb3BvdmVyQmx1cn1cbiAgICAgIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0ZWRJblBvcG92ZXJ9XG4gICAgICBvblNob3VsZE9wZW5WaWV3PXt0aGlzLm9uU2hvdWxkT3BlblZpZXd9XG4gICAgICBvblNob3VsZENsb3NlUG9wb3Zlcj17dGhpcy5vblNob3VsZENsb3NlUG9wb3Zlcn1cbiAgICAgIHsuLi5vcHRpb25zfVxuICAgIC8+KTtcbiAgfVxuXG4gIGdldFRvb2xUaXAgPSBjb250ZW50ID0+IDxUb29sdGlwIGlkPVwidG9vbHRpcFwiIGNsYXNzTmFtZT1cImhzLWNvbWJvLWJveC10b29sdGlwXCI+e2NvbnRlbnR9PC9Ub29sdGlwPjtcblxuICBnZXREZWZhdWx0VG9vbFRpcENvbnRlbnQgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzU2VsZWN0ZWRJdGVtcygpKSByZXR1cm4gdGhpcy5wcm9wcy5ub1NlbGVjdGlvblRleHQ7XG4gICAgY29uc3QgdG90YWxDb3VudCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMubGVuZ3RoO1xuICAgIGNvbnN0IGNvdW50ID0gdG90YWxDb3VudCA+IE1BWF9DT1VOVF9PRl9UT09MVElQX0lURU1TID8gTUFYX0NPVU5UX09GX1RPT0xUSVBfSVRFTVMgOiB0b3RhbENvdW50O1xuXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLnNsaWNlKDAsIGNvdW50KTtcbiAgICBjb25zdCBlbGVtZW50cyA9IE9iamVjdC5rZXlzKGl0ZW1zKS5tYXAoaSA9PiA8cCBrZXk9e2l9PntpdGVtc1tpXS5uYW1lfTwvcD4pO1xuXG4gICAgaWYgKGNvdW50IDwgdG90YWxDb3VudCkgZWxlbWVudHMucHVzaCg8cCBrZXk9e2NvdW50fT4uIC4gLjwvcD4pO1xuXG4gICAgcmV0dXJuIGVsZW1lbnRzO1xuICB9XG5cbiAgZ2V0Q291bnRPZlNlbGVjdGVkSXRlbXMgPSAoKSA9PiAodGhpcy5pc1NlbGVjdGVkSXRlbXMoKSA/IHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMubGVuZ3RoIDogMCk7XG5cbiAgc2V0UG9wb3ZlclZpc2liaWxpdHkgPSAoaXNWaXNpYmxlKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlzUG9wb3ZlclZpc2libGU6IGlzVmlzaWJsZSB9KTtcbiAgfVxuXG4gIGlzU2VsZWN0ZWRJdGVtcyA9ICgpID0+IChcbiAgICB0aGlzLnN0YXRlLnNlbGVjdGVkICYmIHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMgJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5sZW5ndGggPiAwXG4gICk7XG5cbiAgbG9hZERhdGEgPSAocHJvcHMpID0+IHtcbiAgICBwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIubG9hZERhdGEoKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBuZWVkVG9Mb2FkRGF0YTogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHBvcG92ZXJTaG91bGRCZUhpZGRlbiA9ICgpID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLnN0YXRlLmlzUG9wb3ZlclZpc2libGUpIHRoaXMuc2V0UG9wb3ZlclZpc2liaWxpdHkoZmFsc2UpO1xuICAgIH0sIDE1MCk7XG4gIH1cblxuICB1bmNoZWNrQWxsSXRlbXMgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwcmVDaGVja2VkSXRlbXM6IFtdLFxuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlUHJlY2hlY2tlZCA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgZGF0YVNvdXJjZVByb3ZpZGVyLCBwcmVDaGVja2VkR3JvdXBOYW1lLCBwcmVDaGVja2VkSXRlbXMgfSA9IHByb3BzO1xuXG4gICAgZGF0YVNvdXJjZVByb3ZpZGVyLnNldFByZWNoZWNrZWRJdGVtcyhwcmVDaGVja2VkSXRlbXMpO1xuXG4gICAgY29uc3QgY2hlY2tlZE91dHB1dCA9IGRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkT3V0cHV0KCk7XG4gICAgY29uc3Qgc2VsZWN0ZWRJdGVtcyA9IGRhdGFTb3VyY2VQcm92aWRlci5nZXRBbGxDaGVja2VkSXRlbXMoKTtcbiAgICBjb25zdCBjaGVja2VkID0gY2hlY2tlZE91dHB1dC5jaGVja2VkIHx8IFtdO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBuZWVkVG9VcGRhdGVQcmVDaGVja2VkOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRoaXMub25TZWxlY3RlZEluVmlldyhwcmVDaGVja2VkR3JvdXBOYW1lLCBzZWxlY3RlZEl0ZW1zLCBjaGVja2VkKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGlucHV0TmFtZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpbnB1dE9wdGlvbnMgPSB7XG4gICAgICBvbkZvY3VzOiB0aGlzLm9uSW5wdXRGb2N1cyxcbiAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnByb3BzLm5vU2VsZWN0aW9uVGV4dCxcbiAgICAgIHJlYWRPbmx5OiB0cnVlLFxuICAgICAgcmVmOiAoaW5wdXQpID0+IHsgdGhpcy5pbnB1dEVsZW1lbnQgPSBpbnB1dDsgfSxcbiAgICAgIHZhbHVlOiB0aGlzLmdldElucHV0VGV4dCgpLFxuICAgIH07XG5cbiAgICBpZiAoaW5wdXROYW1lLnRyaW0oKSAhPT0gJycpIHtcbiAgICAgIGlucHV0T3B0aW9ucy5uYW1lID0gaW5wdXROYW1lO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1saXN0LXdyYXBwZXJcIj5cbiAgICAgICAgPE92ZXJsYXlUcmlnZ2VyXG4gICAgICAgICAgZGVsYXk9e1RPT0xUSVBfREVMQVlfTVN9XG4gICAgICAgICAgcGxhY2VtZW50PXt0aGlzLnByb3BzLnRvb2x0aXBQbGFjZW1lbnR9XG4gICAgICAgICAgb3ZlcmxheT17dGhpcy5nZXRUb29sVGlwKHRoaXMuZ2V0RGVmYXVsdFRvb2xUaXBDb250ZW50KCkpfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItbGlzdFwiPlxuICAgICAgICAgICAgPGlucHV0IHsuLi5pbnB1dE9wdGlvbnN9IC8+XG4gICAgICAgICAgICB7dGhpcy5zdGF0ZS5uZWVkVG9Mb2FkRGF0YSA/XG4gICAgICAgICAgICAgIDxTcGlubmVyIC8+IDpcbiAgICAgICAgICAgICAgPEhTQmFkZ2UgY2xhc3NOYW1lPVwiYmFkZ2Utb3JhbmdlXCI+e3RoaXMuZ2V0Q291bnRPZlNlbGVjdGVkSXRlbXMoKX08L0hTQmFkZ2U+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkaXNhYmxlZD17dGhpcy5zdGF0ZS5uZWVkVG9Mb2FkRGF0YX0gY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWxpc3QtYnRuXCIgb25DbGljaz17dGhpcy5vbkNsaWNrSGFuZGxlcn0+PEZhQ2hldnJvbkRvd24gLz48L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9PdmVybGF5VHJpZ2dlcj5cbiAgICAgICAgeyB0aGlzLnN0YXRlLmlzUG9wb3ZlclZpc2libGUgPyB0aGlzLmdldFBvcG92ZXIoKSA6IG51bGwgfVxuICAgICAgICB7IHRoaXMuc3RhdGUuaXNWaWV3VmlzaWJsZSA/IHRoaXMuZ2V0VmlldygpIDogbnVsbCB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkhpZXJhcmNoeVNlbGVjdG9yQ29tYm9Cb3gucHJvcFR5cGVzID0ge1xuICBkYXRhU291cmNlUHJvdmlkZXI6IGRhdGFTb3VyY2VQcm92aWRlclR5cGUuaXNSZXF1aXJlZCxcbiAgaGlkZU9uUG9wb3ZlckJsdXI6IFByb3BUeXBlcy5ib29sLFxuICBpbnB1dE5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIG5vU2VsZWN0aW9uVGV4dDogUHJvcFR5cGVzLnN0cmluZyxcbiAgcG9wb3ZlclZpc2libGU6IFByb3BUeXBlcy5ib29sLFxuICBwb3BvdmVyT3B0aW9uczogcG9wb3Zlck9wdGlvbnNUeXBlLmlzUmVxdWlyZWQsXG4gIHByZUNoZWNrZWRJdGVtczogcHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlLFxuICBwcmVDaGVja2VkR3JvdXBOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICB0b29sdGlwUGxhY2VtZW50OiBQcm9wVHlwZXMuc3RyaW5nLFxuICB2aWV3T3B0aW9uczogdmlld09wdGlvbnNUeXBlLmlzUmVxdWlyZWQsXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cbkhpZXJhcmNoeVNlbGVjdG9yQ29tYm9Cb3guZGVmYXVsdFByb3BzID0ge1xuICBoaWRlT25Qb3BvdmVyQmx1cjogdHJ1ZSxcbiAgaW5wdXROYW1lOiAnJyxcbiAgbm9TZWxlY3Rpb25UZXh0OiAnTm8gb25lIHNlbGVjdGVkLi4uJyxcbiAgcG9wb3ZlclZpc2libGU6IGZhbHNlLFxuICBwcmVDaGVja2VkSXRlbXM6IG51bGwsXG4gIHByZUNoZWNrZWRHcm91cE5hbWU6ICdEZWZhdWx0IGdyb3VwJyxcbiAgdG9vbHRpcFBsYWNlbWVudDogJ2JvdHRvbScsXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbn07XG4iXX0=