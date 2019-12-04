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
      value: this.getInputText(),
      onClick: this.onClickHandler
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

  this.onSelectHandler = function (groupName, selectedItem, checkedOutput, flags) {
    _this3.setState({
      selected: selectedItem,
      isPopoverVisible: false,
      isViewVisible: false
    });
    var items = checkedOutput ? checkedOutput.map(function (item) {
      return Object.assign({}, item);
    }) : [];

    _this3.props.onSelect(items, groupName, flags);
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

  this.onSelectedInView = function (groupName, selectedItems, checkedOutput, flags) {
    var selectedItem = {
      name: groupName,
      items: selectedItems
    };
    _this3.setState({
      preCheckedItems: checkedOutput
    });
    _this3.onSelectHandler(groupName, selectedItem, checkedOutput, flags);
  };

  this.onSelectedInPopover = function (selectedItem, flags) {
    _this3.uncheckAllItems();
    var checkedOutput = selectedItem && Array.isArray(selectedItem.items) ? selectedItem.items : [];
    _this3.setState({
      preCheckedItems: checkedOutput
    });
    _this3.onSelectHandler(selectedItem.name, selectedItem, checkedOutput, flags);
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
      onHelp: _this3.props.onHelp,
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
      return _this3.props.tooltipItemRenderFunction ? _this3.props.tooltipItemRenderFunction(items[i], i, _this3.defaultItemRenderFunction) : _this3.defaultItemRenderFunction(items[i], i);
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

  this.defaultItemRenderFunction = function (item, key) {
    return React.createElement(
      'p',
      { key: key },
      item.name
    );
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
  onSelect: function onSelect() {},
  onHelp: function onHelp() {},
  tooltipItemRenderFunction: null
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbWJvLWJveC9jb21iby1ib3guY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlRvb2x0aXAiLCJPdmVybGF5VHJpZ2dlciIsIlByb3BUeXBlcyIsIkZhQ2hldnJvbkRvd24iLCJkYXRhU291cmNlUHJvdmlkZXJUeXBlIiwicHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlIiwicG9wb3Zlck9wdGlvbnNUeXBlIiwidmlld09wdGlvbnNUeXBlIiwiU3Bpbm5lciIsIkhTUG9wb3ZlciIsIkhTVmlldyIsIkhTQmFkZ2UiLCJUT09MVElQX0RFTEFZX01TIiwiTUFYX0NPVU5UX09GX1RPT0xUSVBfSVRFTVMiLCJIaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94IiwicHJvcHMiLCJpc0RhdGFMb2FkZWQiLCJkYXRhU291cmNlUHJvdmlkZXIiLCJpc0xvYWRlZCIsIm5lZWRUb1VwZGF0ZVByZUNoZWNrZWQiLCJwcmVDaGVja2VkSXRlbXMiLCJsZW5ndGgiLCJuZWVkVG9Mb2FkRGF0YSIsInN0YXRlIiwic2VsZWN0ZWQiLCJpc1BvcG92ZXJWaXNpYmxlIiwicG9wb3ZlclZpc2libGUiLCJpc1ZpZXdWaXNpYmxlIiwiY29tcG9uZW50V2lsbE1vdW50IiwibG9hZERhdGEiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwic2V0U3RhdGUiLCJjb21wb25lbnRXaWxsVXBkYXRlIiwibmV4dFN0YXRlIiwidXBkYXRlUHJlY2hlY2tlZCIsInJlbmRlciIsImlucHV0TmFtZSIsImlucHV0T3B0aW9ucyIsIm9uRm9jdXMiLCJvbklucHV0Rm9jdXMiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJub1NlbGVjdGlvblRleHQiLCJyZWFkT25seSIsInJlZiIsImlucHV0IiwiaW5wdXRFbGVtZW50IiwidmFsdWUiLCJnZXRJbnB1dFRleHQiLCJvbkNsaWNrIiwib25DbGlja0hhbmRsZXIiLCJ0cmltIiwibmFtZSIsInRvb2x0aXBQbGFjZW1lbnQiLCJnZXRUb29sVGlwIiwiZ2V0RGVmYXVsdFRvb2xUaXBDb250ZW50IiwiZ2V0Q291bnRPZlNlbGVjdGVkSXRlbXMiLCJnZXRQb3BvdmVyIiwiZ2V0VmlldyIsIlB1cmVDb21wb25lbnQiLCJzZXRQb3BvdmVyVmlzaWJpbGl0eSIsImJsdXIiLCJvblNlbGVjdEhhbmRsZXIiLCJncm91cE5hbWUiLCJzZWxlY3RlZEl0ZW0iLCJjaGVja2VkT3V0cHV0IiwiZmxhZ3MiLCJpdGVtcyIsIm1hcCIsIk9iamVjdCIsImFzc2lnbiIsIml0ZW0iLCJvblNlbGVjdCIsIm9uUG9wb3ZlckJsdXIiLCJoaWRlT25Qb3BvdmVyQmx1ciIsInBvcG92ZXJTaG91bGRCZUhpZGRlbiIsIm9uU2hvdWxkT3BlblZpZXciLCJvblNob3VsZENsb3NlUG9wb3ZlciIsIm9uQ2FuY2VsZWRWaWV3Iiwib25TZWxlY3RlZEluVmlldyIsInNlbGVjdGVkSXRlbXMiLCJvblNlbGVjdGVkSW5Qb3BvdmVyIiwidW5jaGVja0FsbEl0ZW1zIiwiQXJyYXkiLCJpc0FycmF5Iiwic2VsZWN0aW9uVGV4dCIsIm9wdGlvbnMiLCJ2aWV3T3B0aW9ucyIsInNsaWNlIiwib25IZWxwIiwicG9wb3Zlck9wdGlvbnMiLCJjb250ZW50IiwiaXNTZWxlY3RlZEl0ZW1zIiwidG90YWxDb3VudCIsImNvdW50IiwiZWxlbWVudHMiLCJrZXlzIiwidG9vbHRpcEl0ZW1SZW5kZXJGdW5jdGlvbiIsImkiLCJkZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uIiwicHVzaCIsImlzVmlzaWJsZSIsImtleSIsInRoZW4iLCJzZXRUaW1lb3V0IiwicHJlQ2hlY2tlZEdyb3VwTmFtZSIsInNldFByZWNoZWNrZWRJdGVtcyIsImdldENoZWNrZWRPdXRwdXQiLCJnZXRBbGxDaGVja2VkSXRlbXMiLCJjaGVja2VkIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0FBRUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtB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c2FibGUgcmVhY3Qvbm8tdW51c2VkLXN0YXRlICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBUb29sdGlwLCBPdmVybGF5VHJpZ2dlciB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEZhQ2hldnJvbkRvd24gZnJvbSAncmVhY3QtaWNvbnMvbGliL2ZhL2NoZXZyb24tZG93bic7XG5pbXBvcnQgeyBkYXRhU291cmNlUHJvdmlkZXJUeXBlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdHlwZXMnO1xuaW1wb3J0IHsgcHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlLCBwb3BvdmVyT3B0aW9uc1R5cGUsIHZpZXdPcHRpb25zVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCBTcGlubmVyIGZyb20gJy4uL3NwaW5uZXInO1xuaW1wb3J0IEhTUG9wb3ZlciBmcm9tICcuLi9wb3BvdmVyJztcbmltcG9ydCBIU1ZpZXcgZnJvbSAnLi4vdmlldyc7XG5pbXBvcnQgSFNCYWRnZSBmcm9tICcuLi9iYWRnZSc7XG5cblxuaW1wb3J0IHsgVE9PTFRJUF9ERUxBWV9NUywgTUFYX0NPVU5UX09GX1RPT0xUSVBfSVRFTVMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgJy4vY29tYm8tYm94LnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgY29uc3QgaXNEYXRhTG9hZGVkID0gcHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzTG9hZGVkO1xuICAgIGNvbnN0IG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQgPSBwcm9wcy5wcmVDaGVja2VkSXRlbXMgJiYgcHJvcHMucHJlQ2hlY2tlZEl0ZW1zLmxlbmd0aDtcbiAgICBjb25zdCBuZWVkVG9Mb2FkRGF0YSA9ICFpc0RhdGFMb2FkZWQgJiYgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZDtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBuZWVkVG9Mb2FkRGF0YSxcbiAgICAgIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQsXG4gICAgICBwcmVDaGVja2VkSXRlbXM6IHByb3BzLnByZUNoZWNrZWRJdGVtcyxcbiAgICAgIHNlbGVjdGVkOiBudWxsLFxuICAgICAgaXNQb3BvdmVyVmlzaWJsZTogcHJvcHMucG9wb3ZlclZpc2libGUsXG4gICAgICBpc1ZpZXdWaXNpYmxlOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGNvbnN0IHsgbmVlZFRvTG9hZERhdGEgfSA9IHRoaXMuc3RhdGU7XG4gICAgaWYgKG5lZWRUb0xvYWREYXRhKSB7XG4gICAgICB0aGlzLmxvYWREYXRhKHRoaXMucHJvcHMpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgY29uc3QgeyBkYXRhU291cmNlUHJvdmlkZXIsIHByZUNoZWNrZWRJdGVtcyB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChkYXRhU291cmNlUHJvdmlkZXIgIT09IG5leHRQcm9wcy5kYXRhU291cmNlUHJvdmlkZXIpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBuZWVkVG9Mb2FkRGF0YTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChwcmVDaGVja2VkSXRlbXMgIT09IG5leHRQcm9wcy5wcmVDaGVja2VkSXRlbXMpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBuZWVkVG9VcGRhdGVQcmVDaGVja2VkOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgIGNvbnN0IHsgbmVlZFRvTG9hZERhdGEsIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQgfSA9IG5leHRTdGF0ZTtcbiAgICBpZiAobmVlZFRvTG9hZERhdGEpIHtcbiAgICAgIHRoaXMubG9hZERhdGEobmV4dFByb3BzKTtcbiAgICB9IGVsc2UgaWYgKG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQpIHtcbiAgICAgIHRoaXMudXBkYXRlUHJlY2hlY2tlZChuZXh0UHJvcHMpO1xuICAgIH1cbiAgfVxuXG4gIG9uQ2xpY2tIYW5kbGVyID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0UG9wb3ZlclZpc2liaWxpdHkoIXRoaXMuc3RhdGUuaXNQb3BvdmVyVmlzaWJsZSk7XG4gIH1cblxuICBvbklucHV0Rm9jdXMgPSAoKSA9PiB7XG4gICAgdGhpcy5pbnB1dEVsZW1lbnQuYmx1cigpO1xuICB9XG5cbiAgb25TZWxlY3RIYW5kbGVyID0gKGdyb3VwTmFtZSwgc2VsZWN0ZWRJdGVtLCBjaGVja2VkT3V0cHV0LCBmbGFncykgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWQ6IHNlbGVjdGVkSXRlbSxcbiAgICAgIGlzUG9wb3ZlclZpc2libGU6IGZhbHNlLFxuICAgICAgaXNWaWV3VmlzaWJsZTogZmFsc2UsXG4gICAgfSk7XG4gICAgY29uc3QgaXRlbXMgPSBjaGVja2VkT3V0cHV0ID8gY2hlY2tlZE91dHB1dC5tYXAoaXRlbSA9PiBPYmplY3QuYXNzaWduKHt9LCBpdGVtKSkgOiBbXTtcblxuICAgIHRoaXMucHJvcHMub25TZWxlY3QoaXRlbXMsIGdyb3VwTmFtZSwgZmxhZ3MpO1xuICB9XG5cbiAgb25Qb3BvdmVyQmx1ciA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5oaWRlT25Qb3BvdmVyQmx1cikge1xuICAgICAgdGhpcy5wb3BvdmVyU2hvdWxkQmVIaWRkZW4oKTtcbiAgICB9XG4gIH1cblxuICBvblNob3VsZE9wZW5WaWV3ID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBpc1ZpZXdWaXNpYmxlOiB0cnVlIH0pO1xuICB9XG5cbiAgb25TaG91bGRDbG9zZVBvcG92ZXIgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpc1BvcG92ZXJWaXNpYmxlOiBmYWxzZSxcbiAgICB9KTtcbiAgfVxuXG4gIG9uQ2FuY2VsZWRWaWV3ID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaXNQb3BvdmVyVmlzaWJsZTogZmFsc2UsXG4gICAgICBpc1ZpZXdWaXNpYmxlOiBmYWxzZSxcbiAgICB9KTtcbiAgfVxuXG4gIG9uU2VsZWN0ZWRJblZpZXcgPSAoZ3JvdXBOYW1lLCBzZWxlY3RlZEl0ZW1zLCBjaGVja2VkT3V0cHV0LCBmbGFncykgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IHtcbiAgICAgIG5hbWU6IGdyb3VwTmFtZSxcbiAgICAgIGl0ZW1zOiBzZWxlY3RlZEl0ZW1zLFxuICAgIH07XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwcmVDaGVja2VkSXRlbXM6IGNoZWNrZWRPdXRwdXQsXG4gICAgfSk7XG4gICAgdGhpcy5vblNlbGVjdEhhbmRsZXIoZ3JvdXBOYW1lLCBzZWxlY3RlZEl0ZW0sIGNoZWNrZWRPdXRwdXQsIGZsYWdzKTtcbiAgfVxuXG4gIG9uU2VsZWN0ZWRJblBvcG92ZXIgPSAoc2VsZWN0ZWRJdGVtLCBmbGFncykgPT4ge1xuICAgIHRoaXMudW5jaGVja0FsbEl0ZW1zKCk7XG4gICAgY29uc3QgY2hlY2tlZE91dHB1dCA9IHNlbGVjdGVkSXRlbSAmJiBBcnJheS5pc0FycmF5KHNlbGVjdGVkSXRlbS5pdGVtcykgP1xuICAgICAgc2VsZWN0ZWRJdGVtLml0ZW1zIDogW107XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwcmVDaGVja2VkSXRlbXM6IGNoZWNrZWRPdXRwdXQsXG4gICAgfSk7XG4gICAgdGhpcy5vblNlbGVjdEhhbmRsZXIoc2VsZWN0ZWRJdGVtLm5hbWUsIHNlbGVjdGVkSXRlbSwgY2hlY2tlZE91dHB1dCwgZmxhZ3MpO1xuICB9XG5cbiAgZ2V0SW5wdXRUZXh0ID0gKCkgPT4ge1xuICAgIGxldCBzZWxlY3Rpb25UZXh0ID0gJyc7XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3RlZCAmJiB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zICYmIHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgc2VsZWN0aW9uVGV4dCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWQubmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGlvblRleHQ7XG4gIH1cblxuICBnZXRWaWV3ID0gKCkgPT4ge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLnByb3BzLnZpZXdPcHRpb25zO1xuICAgIGNvbnN0IHByZUNoZWNrZWRJdGVtcyA9IEFycmF5LmlzQXJyYXkodGhpcy5zdGF0ZS5wcmVDaGVja2VkSXRlbXMpID9cbiAgICAgIHRoaXMuc3RhdGUucHJlQ2hlY2tlZEl0ZW1zLnNsaWNlKCkgOiBudWxsO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxIU1ZpZXdcbiAgICAgICAgZGF0YVNvdXJjZVByb3ZpZGVyPXt0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlcn1cbiAgICAgICAgey4uLm9wdGlvbnN9XG4gICAgICAgIG9uQ2FuY2VsPXt0aGlzLm9uQ2FuY2VsZWRWaWV3fVxuICAgICAgICBvblNlbGVjdD17dGhpcy5vblNlbGVjdGVkSW5WaWV3fVxuICAgICAgICBvbkhlbHA9e3RoaXMucHJvcHMub25IZWxwfVxuICAgICAgICBncm91cE5hbWU9e3RoaXMuc3RhdGUuc2VsZWN0ZWQgPyB0aGlzLnN0YXRlLnNlbGVjdGVkLm5hbWUgOiAnJ31cbiAgICAgICAgcHJlQ2hlY2tlZEl0ZW1zPXtwcmVDaGVja2VkSXRlbXN9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICBnZXRQb3BvdmVyID0gKCkgPT4ge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLnByb3BzLnBvcG92ZXJPcHRpb25zO1xuXG4gICAgcmV0dXJuICg8SFNQb3BvdmVyXG4gICAgICBkYXRhU291cmNlUHJvdmlkZXI9e3RoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyfVxuICAgICAgb25Db21wb25lbnRCbHVyPXt0aGlzLm9uUG9wb3ZlckJsdXJ9XG4gICAgICBvblNlbGVjdD17dGhpcy5vblNlbGVjdGVkSW5Qb3BvdmVyfVxuICAgICAgb25TaG91bGRPcGVuVmlldz17dGhpcy5vblNob3VsZE9wZW5WaWV3fVxuICAgICAgb25TaG91bGRDbG9zZVBvcG92ZXI9e3RoaXMub25TaG91bGRDbG9zZVBvcG92ZXJ9XG4gICAgICB7Li4ub3B0aW9uc31cbiAgICAvPik7XG4gIH1cblxuICBnZXRUb29sVGlwID0gY29udGVudCA9PiA8VG9vbHRpcCBpZD1cInRvb2x0aXBcIiBjbGFzc05hbWU9XCJocy1jb21iby1ib3gtdG9vbHRpcFwiPntjb250ZW50fTwvVG9vbHRpcD47XG5cbiAgZ2V0RGVmYXVsdFRvb2xUaXBDb250ZW50ID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5pc1NlbGVjdGVkSXRlbXMoKSkgcmV0dXJuIHRoaXMucHJvcHMubm9TZWxlY3Rpb25UZXh0O1xuICAgIGNvbnN0IHRvdGFsQ291bnQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLmxlbmd0aDtcbiAgICBjb25zdCBjb3VudCA9IHRvdGFsQ291bnQgPiBNQVhfQ09VTlRfT0ZfVE9PTFRJUF9JVEVNUyA/IE1BWF9DT1VOVF9PRl9UT09MVElQX0lURU1TIDogdG90YWxDb3VudDtcblxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5zbGljZSgwLCBjb3VudCk7XG4gICAgY29uc3QgZWxlbWVudHMgPSBPYmplY3Qua2V5cyhpdGVtcykubWFwKGkgPT4gKHRoaXMucHJvcHMudG9vbHRpcEl0ZW1SZW5kZXJGdW5jdGlvbiA/XG4gICAgICB0aGlzLnByb3BzLnRvb2x0aXBJdGVtUmVuZGVyRnVuY3Rpb24oaXRlbXNbaV0sIGksIHRoaXMuZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbikgOlxuICAgICAgdGhpcy5kZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uKGl0ZW1zW2ldLCBpKSkpO1xuICAgIGlmIChjb3VudCA8IHRvdGFsQ291bnQpIGVsZW1lbnRzLnB1c2goPHAga2V5PXtjb3VudH0+LiAuIC48L3A+KTtcblxuICAgIHJldHVybiBlbGVtZW50cztcbiAgfVxuXG4gIGdldENvdW50T2ZTZWxlY3RlZEl0ZW1zID0gKCkgPT4gKHRoaXMuaXNTZWxlY3RlZEl0ZW1zKCkgPyB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLmxlbmd0aCA6IDApO1xuXG4gIHNldFBvcG92ZXJWaXNpYmlsaXR5ID0gKGlzVmlzaWJsZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBpc1BvcG92ZXJWaXNpYmxlOiBpc1Zpc2libGUgfSk7XG4gIH1cblxuICBkZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uID0gKGl0ZW0sIGtleSkgPT4gKDxwIGtleT17a2V5fT57aXRlbS5uYW1lfTwvcD4pO1xuXG4gIGlzU2VsZWN0ZWRJdGVtcyA9ICgpID0+IChcbiAgICB0aGlzLnN0YXRlLnNlbGVjdGVkICYmIHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMgJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5sZW5ndGggPiAwXG4gICk7XG5cbiAgbG9hZERhdGEgPSAocHJvcHMpID0+IHtcbiAgICBwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIubG9hZERhdGEoKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBuZWVkVG9Mb2FkRGF0YTogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHBvcG92ZXJTaG91bGRCZUhpZGRlbiA9ICgpID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLnN0YXRlLmlzUG9wb3ZlclZpc2libGUpIHRoaXMuc2V0UG9wb3ZlclZpc2liaWxpdHkoZmFsc2UpO1xuICAgIH0sIDE1MCk7XG4gIH1cblxuICB1bmNoZWNrQWxsSXRlbXMgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwcmVDaGVja2VkSXRlbXM6IFtdLFxuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlUHJlY2hlY2tlZCA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgZGF0YVNvdXJjZVByb3ZpZGVyLCBwcmVDaGVja2VkR3JvdXBOYW1lLCBwcmVDaGVja2VkSXRlbXMgfSA9IHByb3BzO1xuXG4gICAgZGF0YVNvdXJjZVByb3ZpZGVyLnNldFByZWNoZWNrZWRJdGVtcyhwcmVDaGVja2VkSXRlbXMpO1xuXG4gICAgY29uc3QgY2hlY2tlZE91dHB1dCA9IGRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkT3V0cHV0KCk7XG4gICAgY29uc3Qgc2VsZWN0ZWRJdGVtcyA9IGRhdGFTb3VyY2VQcm92aWRlci5nZXRBbGxDaGVja2VkSXRlbXMoKTtcbiAgICBjb25zdCBjaGVja2VkID0gY2hlY2tlZE91dHB1dC5jaGVja2VkIHx8IFtdO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBuZWVkVG9VcGRhdGVQcmVDaGVja2VkOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRoaXMub25TZWxlY3RlZEluVmlldyhwcmVDaGVja2VkR3JvdXBOYW1lLCBzZWxlY3RlZEl0ZW1zLCBjaGVja2VkKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGlucHV0TmFtZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpbnB1dE9wdGlvbnMgPSB7XG4gICAgICBvbkZvY3VzOiB0aGlzLm9uSW5wdXRGb2N1cyxcbiAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnByb3BzLm5vU2VsZWN0aW9uVGV4dCxcbiAgICAgIHJlYWRPbmx5OiB0cnVlLFxuICAgICAgcmVmOiAoaW5wdXQpID0+IHsgdGhpcy5pbnB1dEVsZW1lbnQgPSBpbnB1dDsgfSxcbiAgICAgIHZhbHVlOiB0aGlzLmdldElucHV0VGV4dCgpLFxuICAgICAgb25DbGljazogdGhpcy5vbkNsaWNrSGFuZGxlcixcbiAgICB9O1xuXG4gICAgaWYgKGlucHV0TmFtZS50cmltKCkgIT09ICcnKSB7XG4gICAgICBpbnB1dE9wdGlvbnMubmFtZSA9IGlucHV0TmFtZTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItbGlzdC13cmFwcGVyXCI+XG4gICAgICAgIDxPdmVybGF5VHJpZ2dlclxuICAgICAgICAgIGRlbGF5PXtUT09MVElQX0RFTEFZX01TfVxuICAgICAgICAgIHBsYWNlbWVudD17dGhpcy5wcm9wcy50b29sdGlwUGxhY2VtZW50fVxuICAgICAgICAgIG92ZXJsYXk9e3RoaXMuZ2V0VG9vbFRpcCh0aGlzLmdldERlZmF1bHRUb29sVGlwQ29udGVudCgpKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWxpc3RcIj5cbiAgICAgICAgICAgIDxpbnB1dCB7Li4uaW5wdXRPcHRpb25zfSAvPlxuICAgICAgICAgICAge3RoaXMuc3RhdGUubmVlZFRvTG9hZERhdGEgP1xuICAgICAgICAgICAgICA8U3Bpbm5lciAvPiA6XG4gICAgICAgICAgICAgIDxIU0JhZGdlIGNsYXNzTmFtZT1cImJhZGdlLW9yYW5nZVwiPnt0aGlzLmdldENvdW50T2ZTZWxlY3RlZEl0ZW1zKCl9PC9IU0JhZGdlPlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZGlzYWJsZWQ9e3RoaXMuc3RhdGUubmVlZFRvTG9hZERhdGF9IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1saXN0LWJ0blwiIG9uQ2xpY2s9e3RoaXMub25DbGlja0hhbmRsZXJ9PjxGYUNoZXZyb25Eb3duIC8+PC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvT3ZlcmxheVRyaWdnZXI+XG4gICAgICAgIHsgdGhpcy5zdGF0ZS5pc1BvcG92ZXJWaXNpYmxlID8gdGhpcy5nZXRQb3BvdmVyKCkgOiBudWxsIH1cbiAgICAgICAgeyB0aGlzLnN0YXRlLmlzVmlld1Zpc2libGUgPyB0aGlzLmdldFZpZXcoKSA6IG51bGwgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5IaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94LnByb3BUeXBlcyA9IHtcbiAgZGF0YVNvdXJjZVByb3ZpZGVyOiBkYXRhU291cmNlUHJvdmlkZXJUeXBlLmlzUmVxdWlyZWQsXG4gIGhpZGVPblBvcG92ZXJCbHVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgaW5wdXROYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBub1NlbGVjdGlvblRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHBvcG92ZXJWaXNpYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgcG9wb3Zlck9wdGlvbnM6IHBvcG92ZXJPcHRpb25zVHlwZS5pc1JlcXVpcmVkLFxuICBwcmVDaGVja2VkSXRlbXM6IHByZUNoZWNrZWRJdGVtc0xpc3RTaGFwZSxcbiAgcHJlQ2hlY2tlZEdyb3VwTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgdG9vbHRpcFBsYWNlbWVudDogUHJvcFR5cGVzLnN0cmluZyxcbiAgdmlld09wdGlvbnM6IHZpZXdPcHRpb25zVHlwZS5pc1JlcXVpcmVkLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uSGVscDogUHJvcFR5cGVzLmZ1bmMsXG4gIHRvb2x0aXBJdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxufTtcblxuSGllcmFyY2h5U2VsZWN0b3JDb21ib0JveC5kZWZhdWx0UHJvcHMgPSB7XG4gIGhpZGVPblBvcG92ZXJCbHVyOiB0cnVlLFxuICBpbnB1dE5hbWU6ICcnLFxuICBub1NlbGVjdGlvblRleHQ6ICdObyBvbmUgc2VsZWN0ZWQuLi4nLFxuICBwb3BvdmVyVmlzaWJsZTogZmFsc2UsXG4gIHByZUNoZWNrZWRJdGVtczogbnVsbCxcbiAgcHJlQ2hlY2tlZEdyb3VwTmFtZTogJ0RlZmF1bHQgZ3JvdXAnLFxuICB0b29sdGlwUGxhY2VtZW50OiAnYm90dG9tJyxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBvbkhlbHA6ICgpID0+IHt9LFxuICB0b29sdGlwSXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxufTtcbiJdfQ==