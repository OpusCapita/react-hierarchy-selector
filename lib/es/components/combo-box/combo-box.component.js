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

  this.onSelectHandler = function (groupName, selectedItem, checkedOutput) {
    _this3.setState({
      selected: selectedItem,
      isPopoverVisible: false,
      isViewVisible: false
    });
    var items = checkedOutput ? checkedOutput.map(function (item) {
      return Object.assign({}, item);
    }) : [];

    _this3.props.onSelect(items, groupName);
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
    _this3.onSelectHandler(groupName, selectedItem, checkedOutput);
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
      return _this3.props.tooltipItemRenderFunction ? _this3.props.tooltipItemRenderFunction(items[i], _this3.defaultItemRenderFunction) : _this3.defaultItemRenderFunction(items[i]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbWJvLWJveC9jb21iby1ib3guY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlRvb2x0aXAiLCJPdmVybGF5VHJpZ2dlciIsIlByb3BUeXBlcyIsIkZhQ2hldnJvbkRvd24iLCJkYXRhU291cmNlUHJvdmlkZXJUeXBlIiwicHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlIiwicG9wb3Zlck9wdGlvbnNUeXBlIiwidmlld09wdGlvbnNUeXBlIiwiU3Bpbm5lciIsIkhTUG9wb3ZlciIsIkhTVmlldyIsIkhTQmFkZ2UiLCJUT09MVElQX0RFTEFZX01TIiwiTUFYX0NPVU5UX09GX1RPT0xUSVBfSVRFTVMiLCJIaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94IiwicHJvcHMiLCJpc0RhdGFMb2FkZWQiLCJkYXRhU291cmNlUHJvdmlkZXIiLCJpc0xvYWRlZCIsIm5lZWRUb1VwZGF0ZVByZUNoZWNrZWQiLCJwcmVDaGVja2VkSXRlbXMiLCJsZW5ndGgiLCJuZWVkVG9Mb2FkRGF0YSIsInN0YXRlIiwic2VsZWN0ZWQiLCJpc1BvcG92ZXJWaXNpYmxlIiwicG9wb3ZlclZpc2libGUiLCJpc1ZpZXdWaXNpYmxlIiwiY29tcG9uZW50V2lsbE1vdW50IiwibG9hZERhdGEiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwic2V0U3RhdGUiLCJjb21wb25lbnRXaWxsVXBkYXRlIiwibmV4dFN0YXRlIiwidXBkYXRlUHJlY2hlY2tlZCIsInJlbmRlciIsImlucHV0TmFtZSIsImlucHV0T3B0aW9ucyIsIm9uRm9jdXMiLCJvbklucHV0Rm9jdXMiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJub1NlbGVjdGlvblRleHQiLCJyZWFkT25seSIsInJlZiIsImlucHV0IiwiaW5wdXRFbGVtZW50IiwidmFsdWUiLCJnZXRJbnB1dFRleHQiLCJ0cmltIiwibmFtZSIsInRvb2x0aXBQbGFjZW1lbnQiLCJnZXRUb29sVGlwIiwiZ2V0RGVmYXVsdFRvb2xUaXBDb250ZW50IiwiZ2V0Q291bnRPZlNlbGVjdGVkSXRlbXMiLCJvbkNsaWNrSGFuZGxlciIsImdldFBvcG92ZXIiLCJnZXRWaWV3IiwiUHVyZUNvbXBvbmVudCIsInNldFBvcG92ZXJWaXNpYmlsaXR5IiwiYmx1ciIsIm9uU2VsZWN0SGFuZGxlciIsImdyb3VwTmFtZSIsInNlbGVjdGVkSXRlbSIsImNoZWNrZWRPdXRwdXQiLCJpdGVtcyIsIm1hcCIsIk9iamVjdCIsImFzc2lnbiIsIml0ZW0iLCJvblNlbGVjdCIsIm9uUG9wb3ZlckJsdXIiLCJoaWRlT25Qb3BvdmVyQmx1ciIsInBvcG92ZXJTaG91bGRCZUhpZGRlbiIsIm9uU2hvdWxkT3BlblZpZXciLCJvblNob3VsZENsb3NlUG9wb3ZlciIsIm9uQ2FuY2VsZWRWaWV3Iiwib25TZWxlY3RlZEluVmlldyIsInNlbGVjdGVkSXRlbXMiLCJvblNlbGVjdGVkSW5Qb3BvdmVyIiwidW5jaGVja0FsbEl0ZW1zIiwiQXJyYXkiLCJpc0FycmF5IiwiaWQiLCJsZXZlbCIsInBhcmVudElkIiwicGFyZW50SWRzIiwiaXNDaGVja2VkQWxsIiwiaXNDaGlsZHJlbiIsInNlbGVjdGlvblRleHQiLCJvcHRpb25zIiwidmlld09wdGlvbnMiLCJzbGljZSIsIm9uSGVscCIsInBvcG92ZXJPcHRpb25zIiwiY29udGVudCIsImlzU2VsZWN0ZWRJdGVtcyIsInRvdGFsQ291bnQiLCJjb3VudCIsImVsZW1lbnRzIiwia2V5cyIsInRvb2x0aXBJdGVtUmVuZGVyRnVuY3Rpb24iLCJpIiwiZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbiIsInB1c2giLCJpc1Zpc2libGUiLCJrZXkiLCJ0aGVuIiwic2V0VGltZW91dCIsInByZUNoZWNrZWRHcm91cE5hbWUiLCJzZXRQcmVjaGVja2VkSXRlbXMiLCJnZXRDaGVja2VkT3V0cHV0IiwiZ2V0QWxsQ2hlY2tlZEl0ZW1zIiwiY2hlY2tlZCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6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b21iby1ib3guY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tdW51c2VkLXN0YXRlICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBUb29sdGlwLCBPdmVybGF5VHJpZ2dlciB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEZhQ2hldnJvbkRvd24gZnJvbSAncmVhY3QtaWNvbnMvbGliL2ZhL2NoZXZyb24tZG93bic7XG5pbXBvcnQgeyBkYXRhU291cmNlUHJvdmlkZXJUeXBlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdHlwZXMnO1xuaW1wb3J0IHsgcHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlLCBwb3BvdmVyT3B0aW9uc1R5cGUsIHZpZXdPcHRpb25zVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCBTcGlubmVyIGZyb20gJy4uL3NwaW5uZXInO1xuaW1wb3J0IEhTUG9wb3ZlciBmcm9tICcuLi9wb3BvdmVyJztcbmltcG9ydCBIU1ZpZXcgZnJvbSAnLi4vdmlldyc7XG5pbXBvcnQgSFNCYWRnZSBmcm9tICcuLi9iYWRnZSc7XG5cblxuaW1wb3J0IHsgVE9PTFRJUF9ERUxBWV9NUywgTUFYX0NPVU5UX09GX1RPT0xUSVBfSVRFTVMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgJy4vY29tYm8tYm94LnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgY29uc3QgaXNEYXRhTG9hZGVkID0gcHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzTG9hZGVkO1xuICAgIGNvbnN0IG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQgPSBwcm9wcy5wcmVDaGVja2VkSXRlbXMgJiYgcHJvcHMucHJlQ2hlY2tlZEl0ZW1zLmxlbmd0aDtcbiAgICBjb25zdCBuZWVkVG9Mb2FkRGF0YSA9ICFpc0RhdGFMb2FkZWQgJiYgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZDtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBuZWVkVG9Mb2FkRGF0YSxcbiAgICAgIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQsXG4gICAgICBwcmVDaGVja2VkSXRlbXM6IHByb3BzLnByZUNoZWNrZWRJdGVtcyxcbiAgICAgIHNlbGVjdGVkOiBudWxsLFxuICAgICAgaXNQb3BvdmVyVmlzaWJsZTogcHJvcHMucG9wb3ZlclZpc2libGUsXG4gICAgICBpc1ZpZXdWaXNpYmxlOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGNvbnN0IHsgbmVlZFRvTG9hZERhdGEgfSA9IHRoaXMuc3RhdGU7XG4gICAgaWYgKG5lZWRUb0xvYWREYXRhKSB7XG4gICAgICB0aGlzLmxvYWREYXRhKHRoaXMucHJvcHMpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgY29uc3QgeyBkYXRhU291cmNlUHJvdmlkZXIsIHByZUNoZWNrZWRJdGVtcyB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChkYXRhU291cmNlUHJvdmlkZXIgIT09IG5leHRQcm9wcy5kYXRhU291cmNlUHJvdmlkZXIpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBuZWVkVG9Mb2FkRGF0YTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChwcmVDaGVja2VkSXRlbXMgIT09IG5leHRQcm9wcy5wcmVDaGVja2VkSXRlbXMpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBuZWVkVG9VcGRhdGVQcmVDaGVja2VkOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgIGNvbnN0IHsgbmVlZFRvTG9hZERhdGEsIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQgfSA9IG5leHRTdGF0ZTtcbiAgICBpZiAobmVlZFRvTG9hZERhdGEpIHtcbiAgICAgIHRoaXMubG9hZERhdGEobmV4dFByb3BzKTtcbiAgICB9IGVsc2UgaWYgKG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQpIHtcbiAgICAgIHRoaXMudXBkYXRlUHJlY2hlY2tlZChuZXh0UHJvcHMpO1xuICAgIH1cbiAgfVxuXG4gIG9uQ2xpY2tIYW5kbGVyID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0UG9wb3ZlclZpc2liaWxpdHkoIXRoaXMuc3RhdGUuaXNQb3BvdmVyVmlzaWJsZSk7XG4gIH1cblxuICBvbklucHV0Rm9jdXMgPSAoKSA9PiB7XG4gICAgdGhpcy5pbnB1dEVsZW1lbnQuYmx1cigpO1xuICB9XG5cbiAgb25TZWxlY3RIYW5kbGVyID0gKGdyb3VwTmFtZSwgc2VsZWN0ZWRJdGVtLCBjaGVja2VkT3V0cHV0KSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZDogc2VsZWN0ZWRJdGVtLFxuICAgICAgaXNQb3BvdmVyVmlzaWJsZTogZmFsc2UsXG4gICAgICBpc1ZpZXdWaXNpYmxlOiBmYWxzZSxcbiAgICB9KTtcbiAgICBjb25zdCBpdGVtcyA9IGNoZWNrZWRPdXRwdXQgPyBjaGVja2VkT3V0cHV0Lm1hcChpdGVtID0+IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pKSA6IFtdO1xuXG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChpdGVtcywgZ3JvdXBOYW1lKTtcbiAgfVxuXG4gIG9uUG9wb3ZlckJsdXIgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuaGlkZU9uUG9wb3ZlckJsdXIpIHtcbiAgICAgIHRoaXMucG9wb3ZlclNob3VsZEJlSGlkZGVuKCk7XG4gICAgfVxuICB9XG5cbiAgb25TaG91bGRPcGVuVmlldyA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgaXNWaWV3VmlzaWJsZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIG9uU2hvdWxkQ2xvc2VQb3BvdmVyID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaXNQb3BvdmVyVmlzaWJsZTogZmFsc2UsXG4gICAgfSk7XG4gIH1cblxuICBvbkNhbmNlbGVkVmlldyA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlzUG9wb3ZlclZpc2libGU6IGZhbHNlLFxuICAgICAgaXNWaWV3VmlzaWJsZTogZmFsc2UsXG4gICAgfSk7XG4gIH1cblxuICBvblNlbGVjdGVkSW5WaWV3ID0gKGdyb3VwTmFtZSwgc2VsZWN0ZWRJdGVtcywgY2hlY2tlZE91dHB1dCkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IHtcbiAgICAgIG5hbWU6IGdyb3VwTmFtZSxcbiAgICAgIGl0ZW1zOiBzZWxlY3RlZEl0ZW1zLFxuICAgIH07XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwcmVDaGVja2VkSXRlbXM6IGNoZWNrZWRPdXRwdXQsXG4gICAgfSk7XG4gICAgdGhpcy5vblNlbGVjdEhhbmRsZXIoZ3JvdXBOYW1lLCBzZWxlY3RlZEl0ZW0sIGNoZWNrZWRPdXRwdXQpO1xuICB9XG5cbiAgb25TZWxlY3RlZEluUG9wb3ZlciA9IChzZWxlY3RlZEl0ZW0pID0+IHtcbiAgICB0aGlzLnVuY2hlY2tBbGxJdGVtcygpO1xuICAgIGNvbnN0IGNoZWNrZWRPdXRwdXQgPSBzZWxlY3RlZEl0ZW0gJiYgQXJyYXkuaXNBcnJheShzZWxlY3RlZEl0ZW0uaXRlbXMpID9cbiAgICAgIHNlbGVjdGVkSXRlbS5pdGVtcy5tYXAoaXRlbSA9PiAoe1xuICAgICAgICBpZDogaXRlbS5pZCxcbiAgICAgICAgbmFtZTogaXRlbS5uYW1lLFxuICAgICAgICBsZXZlbDogMCxcbiAgICAgICAgcGFyZW50SWQ6IG51bGwsXG4gICAgICAgIHBhcmVudElkczogW10sXG4gICAgICAgIGlzQ2hlY2tlZEFsbDogZmFsc2UsXG4gICAgICAgIGlzQ2hpbGRyZW46IGZhbHNlLFxuICAgICAgfSkpXG4gICAgICA6IFtdO1xuICAgIHRoaXMub25TZWxlY3RIYW5kbGVyKHNlbGVjdGVkSXRlbSwgY2hlY2tlZE91dHB1dCk7XG4gIH1cblxuICBnZXRJbnB1dFRleHQgPSAoKSA9PiB7XG4gICAgbGV0IHNlbGVjdGlvblRleHQgPSAnJztcblxuICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkICYmIHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMgJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICBzZWxlY3Rpb25UZXh0ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZC5uYW1lO1xuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0aW9uVGV4dDtcbiAgfVxuXG4gIGdldFZpZXcgPSAoKSA9PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMucHJvcHMudmlld09wdGlvbnM7XG4gICAgY29uc3QgcHJlQ2hlY2tlZEl0ZW1zID0gQXJyYXkuaXNBcnJheSh0aGlzLnN0YXRlLnByZUNoZWNrZWRJdGVtcykgP1xuICAgICAgdGhpcy5zdGF0ZS5wcmVDaGVja2VkSXRlbXMuc2xpY2UoKSA6IG51bGw7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPEhTVmlld1xuICAgICAgICBkYXRhU291cmNlUHJvdmlkZXI9e3RoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyfVxuICAgICAgICB7Li4ub3B0aW9uc31cbiAgICAgICAgb25DYW5jZWw9e3RoaXMub25DYW5jZWxlZFZpZXd9XG4gICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0ZWRJblZpZXd9XG4gICAgICAgIG9uSGVscD17dGhpcy5wcm9wcy5vbkhlbHB9XG4gICAgICAgIGdyb3VwTmFtZT17dGhpcy5zdGF0ZS5zZWxlY3RlZCA/IHRoaXMuc3RhdGUuc2VsZWN0ZWQubmFtZSA6ICcnfVxuICAgICAgICBwcmVDaGVja2VkSXRlbXM9e3ByZUNoZWNrZWRJdGVtc31cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIGdldFBvcG92ZXIgPSAoKSA9PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMucHJvcHMucG9wb3Zlck9wdGlvbnM7XG5cbiAgICByZXR1cm4gKDxIU1BvcG92ZXJcbiAgICAgIGRhdGFTb3VyY2VQcm92aWRlcj17dGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXJ9XG4gICAgICBvbkNvbXBvbmVudEJsdXI9e3RoaXMub25Qb3BvdmVyQmx1cn1cbiAgICAgIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0ZWRJblBvcG92ZXJ9XG4gICAgICBvblNob3VsZE9wZW5WaWV3PXt0aGlzLm9uU2hvdWxkT3BlblZpZXd9XG4gICAgICBvblNob3VsZENsb3NlUG9wb3Zlcj17dGhpcy5vblNob3VsZENsb3NlUG9wb3Zlcn1cbiAgICAgIHsuLi5vcHRpb25zfVxuICAgIC8+KTtcbiAgfVxuXG4gIGdldFRvb2xUaXAgPSBjb250ZW50ID0+IDxUb29sdGlwIGlkPVwidG9vbHRpcFwiIGNsYXNzTmFtZT1cImhzLWNvbWJvLWJveC10b29sdGlwXCI+e2NvbnRlbnR9PC9Ub29sdGlwPjtcblxuICBnZXREZWZhdWx0VG9vbFRpcENvbnRlbnQgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzU2VsZWN0ZWRJdGVtcygpKSByZXR1cm4gdGhpcy5wcm9wcy5ub1NlbGVjdGlvblRleHQ7XG4gICAgY29uc3QgdG90YWxDb3VudCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMubGVuZ3RoO1xuICAgIGNvbnN0IGNvdW50ID0gdG90YWxDb3VudCA+IE1BWF9DT1VOVF9PRl9UT09MVElQX0lURU1TID8gTUFYX0NPVU5UX09GX1RPT0xUSVBfSVRFTVMgOiB0b3RhbENvdW50O1xuXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLnNsaWNlKDAsIGNvdW50KTtcbiAgICBjb25zdCBlbGVtZW50cyA9IE9iamVjdC5rZXlzKGl0ZW1zKS5tYXAoaSA9PiAodGhpcy5wcm9wcy50b29sdGlwSXRlbVJlbmRlckZ1bmN0aW9uID9cbiAgICAgIHRoaXMucHJvcHMudG9vbHRpcEl0ZW1SZW5kZXJGdW5jdGlvbihpdGVtc1tpXSwgdGhpcy5kZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uKSA6XG4gICAgICB0aGlzLmRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24oaXRlbXNbaV0pKSk7XG4gICAgaWYgKGNvdW50IDwgdG90YWxDb3VudCkgZWxlbWVudHMucHVzaCg8cCBrZXk9e2NvdW50fT4uIC4gLjwvcD4pO1xuXG4gICAgcmV0dXJuIGVsZW1lbnRzO1xuICB9XG5cbiAgZ2V0Q291bnRPZlNlbGVjdGVkSXRlbXMgPSAoKSA9PiAodGhpcy5pc1NlbGVjdGVkSXRlbXMoKSA/IHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMubGVuZ3RoIDogMCk7XG5cbiAgc2V0UG9wb3ZlclZpc2liaWxpdHkgPSAoaXNWaXNpYmxlKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlzUG9wb3ZlclZpc2libGU6IGlzVmlzaWJsZSB9KTtcbiAgfVxuXG4gIGRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24gPSAoaXRlbSwga2V5KSA9PiAoPHAga2V5PXtrZXl9PntpdGVtLm5hbWV9PC9wPik7XG5cbiAgaXNTZWxlY3RlZEl0ZW1zID0gKCkgPT4gKFxuICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWQgJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcyAmJiB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLmxlbmd0aCA+IDBcbiAgKTtcblxuICBsb2FkRGF0YSA9IChwcm9wcykgPT4ge1xuICAgIHByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5sb2FkRGF0YSgpLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG5lZWRUb0xvYWREYXRhOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcG9wb3ZlclNob3VsZEJlSGlkZGVuID0gKCkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuc3RhdGUuaXNQb3BvdmVyVmlzaWJsZSkgdGhpcy5zZXRQb3BvdmVyVmlzaWJpbGl0eShmYWxzZSk7XG4gICAgfSwgMTUwKTtcbiAgfVxuXG4gIHVuY2hlY2tBbGxJdGVtcyA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHByZUNoZWNrZWRJdGVtczogW10sXG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVQcmVjaGVja2VkID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhU291cmNlUHJvdmlkZXIsIHByZUNoZWNrZWRHcm91cE5hbWUsIHByZUNoZWNrZWRJdGVtcyB9ID0gcHJvcHM7XG5cbiAgICBkYXRhU291cmNlUHJvdmlkZXIuc2V0UHJlY2hlY2tlZEl0ZW1zKHByZUNoZWNrZWRJdGVtcyk7XG5cbiAgICBjb25zdCBjaGVja2VkT3V0cHV0ID0gZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWRPdXRwdXQoKTtcbiAgICBjb25zdCBzZWxlY3RlZEl0ZW1zID0gZGF0YVNvdXJjZVByb3ZpZGVyLmdldEFsbENoZWNrZWRJdGVtcygpO1xuICAgIGNvbnN0IGNoZWNrZWQgPSBjaGVja2VkT3V0cHV0LmNoZWNrZWQgfHwgW107XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQ6IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5vblNlbGVjdGVkSW5WaWV3KHByZUNoZWNrZWRHcm91cE5hbWUsIHNlbGVjdGVkSXRlbXMsIGNoZWNrZWQpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaW5wdXROYW1lIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGlucHV0T3B0aW9ucyA9IHtcbiAgICAgIG9uRm9jdXM6IHRoaXMub25JbnB1dEZvY3VzLFxuICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucHJvcHMubm9TZWxlY3Rpb25UZXh0LFxuICAgICAgcmVhZE9ubHk6IHRydWUsXG4gICAgICByZWY6IChpbnB1dCkgPT4geyB0aGlzLmlucHV0RWxlbWVudCA9IGlucHV0OyB9LFxuICAgICAgdmFsdWU6IHRoaXMuZ2V0SW5wdXRUZXh0KCksXG4gICAgfTtcblxuICAgIGlmIChpbnB1dE5hbWUudHJpbSgpICE9PSAnJykge1xuICAgICAgaW5wdXRPcHRpb25zLm5hbWUgPSBpbnB1dE5hbWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWxpc3Qtd3JhcHBlclwiPlxuICAgICAgICA8T3ZlcmxheVRyaWdnZXJcbiAgICAgICAgICBkZWxheT17VE9PTFRJUF9ERUxBWV9NU31cbiAgICAgICAgICBwbGFjZW1lbnQ9e3RoaXMucHJvcHMudG9vbHRpcFBsYWNlbWVudH1cbiAgICAgICAgICBvdmVybGF5PXt0aGlzLmdldFRvb2xUaXAodGhpcy5nZXREZWZhdWx0VG9vbFRpcENvbnRlbnQoKSl9XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1saXN0XCI+XG4gICAgICAgICAgICA8aW5wdXQgey4uLmlucHV0T3B0aW9uc30gLz5cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLm5lZWRUb0xvYWREYXRhID9cbiAgICAgICAgICAgICAgPFNwaW5uZXIgLz4gOlxuICAgICAgICAgICAgICA8SFNCYWRnZSBjbGFzc05hbWU9XCJiYWRnZS1vcmFuZ2VcIj57dGhpcy5nZXRDb3VudE9mU2VsZWN0ZWRJdGVtcygpfTwvSFNCYWRnZT5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRpc2FibGVkPXt0aGlzLnN0YXRlLm5lZWRUb0xvYWREYXRhfSBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItbGlzdC1idG5cIiBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tIYW5kbGVyfT48RmFDaGV2cm9uRG93biAvPjwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L092ZXJsYXlUcmlnZ2VyPlxuICAgICAgICB7IHRoaXMuc3RhdGUuaXNQb3BvdmVyVmlzaWJsZSA/IHRoaXMuZ2V0UG9wb3ZlcigpIDogbnVsbCB9XG4gICAgICAgIHsgdGhpcy5zdGF0ZS5pc1ZpZXdWaXNpYmxlID8gdGhpcy5nZXRWaWV3KCkgOiBudWxsIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuSGllcmFyY2h5U2VsZWN0b3JDb21ib0JveC5wcm9wVHlwZXMgPSB7XG4gIGRhdGFTb3VyY2VQcm92aWRlcjogZGF0YVNvdXJjZVByb3ZpZGVyVHlwZS5pc1JlcXVpcmVkLFxuICBoaWRlT25Qb3BvdmVyQmx1cjogUHJvcFR5cGVzLmJvb2wsXG4gIGlucHV0TmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgbm9TZWxlY3Rpb25UZXh0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICBwb3BvdmVyVmlzaWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gIHBvcG92ZXJPcHRpb25zOiBwb3BvdmVyT3B0aW9uc1R5cGUuaXNSZXF1aXJlZCxcbiAgcHJlQ2hlY2tlZEl0ZW1zOiBwcmVDaGVja2VkSXRlbXNMaXN0U2hhcGUsXG4gIHByZUNoZWNrZWRHcm91cE5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHRvb2x0aXBQbGFjZW1lbnQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHZpZXdPcHRpb25zOiB2aWV3T3B0aW9uc1R5cGUuaXNSZXF1aXJlZCxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBvbkhlbHA6IFByb3BUeXBlcy5mdW5jLFxuICB0b29sdGlwSXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cbkhpZXJhcmNoeVNlbGVjdG9yQ29tYm9Cb3guZGVmYXVsdFByb3BzID0ge1xuICBoaWRlT25Qb3BvdmVyQmx1cjogdHJ1ZSxcbiAgaW5wdXROYW1lOiAnJyxcbiAgbm9TZWxlY3Rpb25UZXh0OiAnTm8gb25lIHNlbGVjdGVkLi4uJyxcbiAgcG9wb3ZlclZpc2libGU6IGZhbHNlLFxuICBwcmVDaGVja2VkSXRlbXM6IG51bGwsXG4gIHByZUNoZWNrZWRHcm91cE5hbWU6ICdEZWZhdWx0IGdyb3VwJyxcbiAgdG9vbHRpcFBsYWNlbWVudDogJ2JvdHRvbScsXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgb25IZWxwOiAoKSA9PiB7fSxcbiAgdG9vbHRpcEl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcbn07XG4iXX0=