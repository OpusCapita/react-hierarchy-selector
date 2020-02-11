function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable react/no-unused-state */
import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FaCaretDown, FaCaretUp, FaTimes } from 'react-icons/fa';
import { dataSourceProviderType } from '../../services/types';
import { preCheckedItemsListShape, popoverOptionsType, viewOptionsType } from '../../types';
import Spinner from '../spinner';
import HSPopover from '../popover';
import HSView from '../view';
import HSBadge from '../badge';
import { TOOLTIP_DELAY_MS, MAX_COUNT_OF_TOOLTIP_ITEMS } from './constants';
import './combo-box.scss';

var HierarchySelectorComboBox =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(HierarchySelectorComboBox, _React$PureComponent);

  function HierarchySelectorComboBox(_props) {
    var _this;

    _this = _React$PureComponent.call(this, _props) || this;

    _defineProperty(_assertThisInitialized(_this), "onClickHandler", function () {
      _this.setPopoverVisibility(!_this.state.isPopoverVisible);
    });

    _defineProperty(_assertThisInitialized(_this), "onInputFocus", function () {
      _this.inputElement.blur();
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectHandler", function (groupName, selectedItem, checkedOutput, flags) {
      _this.setState({
        selected: selectedItem,
        isPopoverVisible: false,
        isViewVisible: false
      });

      var items = checkedOutput ? checkedOutput.map(function (item) {
        return Object.assign({}, item);
      }) : [];

      _this.props.onSelect(items, groupName, flags);
    });

    _defineProperty(_assertThisInitialized(_this), "onPopoverBlur", function () {
      if (_this.props.hideOnPopoverBlur) {
        _this.popoverShouldBeHidden();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onShouldOpenView", function () {
      _this.setState({
        isViewVisible: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onShouldClosePopover", function () {
      _this.setState({
        isPopoverVisible: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onCanceledView", function () {
      _this.setState({
        isPopoverVisible: false,
        isViewVisible: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectedInView", function (groupName, selectedItems, checkedOutput, flags) {
      var selectedItem = {
        name: groupName,
        items: selectedItems
      };

      _this.setState({
        preCheckedItems: checkedOutput
      });

      _this.onSelectHandler(groupName, selectedItem, checkedOutput, flags);
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectedInPopover", function (selectedItem, flags) {
      _this.uncheckAllItems();

      var checkedOutput = selectedItem && Array.isArray(selectedItem.items) ? selectedItem.items : [];

      _this.setState({
        preCheckedItems: checkedOutput
      });

      _this.onSelectHandler(selectedItem.name, selectedItem, checkedOutput, flags);
    });

    _defineProperty(_assertThisInitialized(_this), "onClearHandler", function () {
      var groupName = '';
      var selectedItem = [];
      var checkedOutput = [];
      var flags = {
        interactive: true
      };

      _this.uncheckAllItems();

      _this.onSelectHandler(groupName, selectedItem, checkedOutput, flags);
    });

    _defineProperty(_assertThisInitialized(_this), "getClearButton", function () {
      if (!_this.props.isClearable || !_this.state.selected || !_this.state.selected.items || !_this.state.selected.items.length) {
        return null;
      }

      return React.createElement("button", {
        type: "reset",
        className: "oc-hierarchy-selector-list-clear-btn",
        onClick: _this.onClearHandler
      }, React.createElement(FaTimes, null));
    });

    _defineProperty(_assertThisInitialized(_this), "getInputText", function () {
      var selectionText = '';

      if (_this.state.selected && _this.state.selected.items && _this.state.selected.items.length > 0) {
        selectionText = _this.state.selected.name;
      }

      return selectionText;
    });

    _defineProperty(_assertThisInitialized(_this), "getView", function () {
      var options = _this.props.viewOptions;
      var preCheckedItems = Array.isArray(_this.state.preCheckedItems) ? _this.state.preCheckedItems.slice() : null;
      return React.createElement(HSView, _extends({
        dataSourceProvider: _this.props.dataSourceProvider
      }, options, {
        onCancel: _this.onCanceledView,
        onSelect: _this.onSelectedInView,
        onHelp: _this.props.onHelp,
        groupName: _this.state.selected ? _this.state.selected.name : '',
        preCheckedItems: preCheckedItems,
        isClearable: _this.props.isClearable
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "getPopover", function () {
      var options = _this.props.popoverOptions;
      return React.createElement(HSPopover, _extends({
        dataSourceProvider: _this.props.dataSourceProvider,
        onComponentBlur: _this.onPopoverBlur,
        onSelect: _this.onSelectedInPopover,
        onShouldOpenView: _this.onShouldOpenView,
        onShouldClosePopover: _this.onShouldClosePopover
      }, options));
    });

    _defineProperty(_assertThisInitialized(_this), "getHierarchySelector", function () {
      var inputName = _this.props.inputName;
      var isBusy = _this.props.isBusy || _this.state.needToLoadData;
      var inputOptions = {
        onFocus: _this.onInputFocus,
        type: 'text',
        placeholder: _this.props.noSelectionText,
        readOnly: true,
        ref: function ref(input) {
          _this.inputElement = input;
        },
        value: _this.getInputText(),
        onClick: _this.onClickHandler
      };

      if (inputName.trim() !== '') {
        inputOptions.name = inputName;
      }

      return React.createElement("div", {
        className: "oc-hierarchy-selector-list"
      }, React.createElement("input", inputOptions), isBusy ? React.createElement(Spinner, null) : React.createElement(React.Fragment, null, React.createElement(HSBadge, {
        className: "badge-orange"
      }, _this.getCountOfSelectedItems()), _this.getClearButton()), React.createElement("button", {
        type: "button",
        disabled: isBusy,
        className: "oc-hierarchy-selector-list-btn",
        onClick: _this.onClickHandler
      }, _this.state.isPopoverVisible ? React.createElement(FaCaretUp, null) : React.createElement(FaCaretDown, null)));
    });

    _defineProperty(_assertThisInitialized(_this), "getToolTip", function (content) {
      return React.createElement(Tooltip, {
        id: "tooltip",
        className: "hs-combo-box-tooltip"
      }, content);
    });

    _defineProperty(_assertThisInitialized(_this), "getDefaultToolTipContent", function () {
      if (!_this.isSelectedItems()) return _this.props.noSelectionText;
      var totalCount = _this.state.selected.items.length;
      var count = totalCount > MAX_COUNT_OF_TOOLTIP_ITEMS ? MAX_COUNT_OF_TOOLTIP_ITEMS : totalCount;

      var items = _this.state.selected.items.slice(0, count);

      var elements = Object.keys(items).map(function (i) {
        return _this.props.tooltipItemRenderFunction ? _this.props.tooltipItemRenderFunction(items[i], i, _this.defaultItemRenderFunction) : _this.defaultItemRenderFunction(items[i], i);
      });
      if (count < totalCount) elements.push(React.createElement("p", {
        key: count
      }, ". . ."));
      return elements;
    });

    _defineProperty(_assertThisInitialized(_this), "getCountOfSelectedItems", function () {
      return _this.isSelectedItems() ? _this.state.selected.items.length : 0;
    });

    _defineProperty(_assertThisInitialized(_this), "setPopoverVisibility", function (isVisible) {
      _this.setState({
        isPopoverVisible: isVisible
      });
    });

    _defineProperty(_assertThisInitialized(_this), "defaultItemRenderFunction", function (item, key) {
      return React.createElement("p", {
        key: key
      }, item.name);
    });

    _defineProperty(_assertThisInitialized(_this), "isSelectedItems", function () {
      return _this.state.selected && _this.state.selected.items && _this.state.selected.items.length > 0;
    });

    _defineProperty(_assertThisInitialized(_this), "loadData", function (props) {
      props.dataSourceProvider.loadData().then(function () {
        _this.setState({
          needToLoadData: false
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "popoverShouldBeHidden", function () {
      setTimeout(function () {
        if (_this.state.isPopoverVisible) _this.setPopoverVisibility(false);
      }, 150);
    });

    _defineProperty(_assertThisInitialized(_this), "uncheckAllItems", function () {
      _this.setState({
        preCheckedItems: []
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updatePrechecked", function (props) {
      var dataSourceProvider = props.dataSourceProvider,
          preCheckedGroupName = props.preCheckedGroupName,
          preCheckedItems = props.preCheckedItems;
      dataSourceProvider.setPrecheckedItems(preCheckedItems);
      var checkedOutput = dataSourceProvider.getCheckedOutput();
      var selectedItems = dataSourceProvider.getAllCheckedItems();
      var checked = checkedOutput.checked || [];

      _this.setState({
        needToUpdatePreChecked: false
      });

      _this.onSelectedInView(preCheckedGroupName, selectedItems, checked);
    });

    var isDataLoaded = _props.dataSourceProvider.isLoaded;
    var needToUpdatePreChecked = _props.preCheckedItems && _props.preCheckedItems.length;
    var needToLoadData = !isDataLoaded && needToUpdatePreChecked;
    _this.state = {
      needToLoadData: needToLoadData,
      needToUpdatePreChecked: needToUpdatePreChecked,
      preCheckedItems: _props.preCheckedItems,
      selected: null,
      isPopoverVisible: _props.popoverVisible,
      isViewVisible: false
    };
    return _this;
  }

  var _proto = HierarchySelectorComboBox.prototype;

  _proto.componentWillMount = function componentWillMount() {
    var needToLoadData = this.state.needToLoadData;

    if (needToLoadData) {
      this.loadData(this.props);
    }
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this$props = this.props,
        dataSourceProvider = _this$props.dataSourceProvider,
        preCheckedItems = _this$props.preCheckedItems;

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

  _proto.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
    var needToLoadData = nextState.needToLoadData,
        needToUpdatePreChecked = nextState.needToUpdatePreChecked;

    if (needToLoadData) {
      this.loadData(nextProps);
    } else if (needToUpdatePreChecked) {
      this.updatePrechecked(nextProps);
    }
  };

  _proto.render = function render() {
    // If popover is visible, don't show tooltip (overlay)
    if (this.state.isPopoverVisible) {
      return React.createElement("div", {
        className: "oc-hierarchy-selector-list-wrapper"
      }, this.getHierarchySelector(), this.state.isPopoverVisible ? this.getPopover() : null, this.state.isViewVisible ? this.getView() : null);
    }

    return React.createElement("div", {
      className: "oc-hierarchy-selector-list-wrapper"
    }, React.createElement(OverlayTrigger, {
      delay: TOOLTIP_DELAY_MS,
      placement: this.props.tooltipPlacement,
      overlay: this.getToolTip(this.getDefaultToolTipContent())
    }, this.getHierarchySelector()), this.state.isPopoverVisible ? this.getPopover() : null, this.state.isViewVisible ? this.getView() : null);
  };

  return HierarchySelectorComboBox;
}(React.PureComponent);

export { HierarchySelectorComboBox as default };
HierarchySelectorComboBox.defaultProps = {
  hideOnPopoverBlur: true,
  inputName: '',
  noSelectionText: 'Nothing selected...',
  popoverVisible: false,
  preCheckedItems: null,
  preCheckedGroupName: 'Default group',
  tooltipPlacement: 'bottom',
  onSelect: function onSelect() {},
  onHelp: function onHelp() {},
  tooltipItemRenderFunction: null,
  isClearable: false,
  isBusy: false
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbWJvLWJveC9jb21iby1ib3guY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlRvb2x0aXAiLCJPdmVybGF5VHJpZ2dlciIsIlByb3BUeXBlcyIsIkZhQ2FyZXREb3duIiwiRmFDYXJldFVwIiwiRmFUaW1lcyIsImRhdGFTb3VyY2VQcm92aWRlclR5cGUiLCJwcmVDaGVja2VkSXRlbXNMaXN0U2hhcGUiLCJwb3BvdmVyT3B0aW9uc1R5cGUiLCJ2aWV3T3B0aW9uc1R5cGUiLCJTcGlubmVyIiwiSFNQb3BvdmVyIiwiSFNWaWV3IiwiSFNCYWRnZSIsIlRPT0xUSVBfREVMQVlfTVMiLCJNQVhfQ09VTlRfT0ZfVE9PTFRJUF9JVEVNUyIsIkhpZXJhcmNoeVNlbGVjdG9yQ29tYm9Cb3giLCJwcm9wcyIsInNldFBvcG92ZXJWaXNpYmlsaXR5Iiwic3RhdGUiLCJpc1BvcG92ZXJWaXNpYmxlIiwiaW5wdXRFbGVtZW50IiwiYmx1ciIsImdyb3VwTmFtZSIsInNlbGVjdGVkSXRlbSIsImNoZWNrZWRPdXRwdXQiLCJmbGFncyIsInNldFN0YXRlIiwic2VsZWN0ZWQiLCJpc1ZpZXdWaXNpYmxlIiwiaXRlbXMiLCJtYXAiLCJpdGVtIiwiT2JqZWN0IiwiYXNzaWduIiwib25TZWxlY3QiLCJoaWRlT25Qb3BvdmVyQmx1ciIsInBvcG92ZXJTaG91bGRCZUhpZGRlbiIsInNlbGVjdGVkSXRlbXMiLCJuYW1lIiwicHJlQ2hlY2tlZEl0ZW1zIiwib25TZWxlY3RIYW5kbGVyIiwidW5jaGVja0FsbEl0ZW1zIiwiQXJyYXkiLCJpc0FycmF5IiwiaW50ZXJhY3RpdmUiLCJpc0NsZWFyYWJsZSIsImxlbmd0aCIsIm9uQ2xlYXJIYW5kbGVyIiwic2VsZWN0aW9uVGV4dCIsIm9wdGlvbnMiLCJ2aWV3T3B0aW9ucyIsInNsaWNlIiwiZGF0YVNvdXJjZVByb3ZpZGVyIiwib25DYW5jZWxlZFZpZXciLCJvblNlbGVjdGVkSW5WaWV3Iiwib25IZWxwIiwicG9wb3Zlck9wdGlvbnMiLCJvblBvcG92ZXJCbHVyIiwib25TZWxlY3RlZEluUG9wb3ZlciIsIm9uU2hvdWxkT3BlblZpZXciLCJvblNob3VsZENsb3NlUG9wb3ZlciIsImlucHV0TmFtZSIsImlzQnVzeSIsIm5lZWRUb0xvYWREYXRhIiwiaW5wdXRPcHRpb25zIiwib25Gb2N1cyIsIm9uSW5wdXRGb2N1cyIsInR5cGUiLCJwbGFjZWhvbGRlciIsIm5vU2VsZWN0aW9uVGV4dCIsInJlYWRPbmx5IiwicmVmIiwiaW5wdXQiLCJ2YWx1ZSIsImdldElucHV0VGV4dCIsIm9uQ2xpY2siLCJvbkNsaWNrSGFuZGxlciIsInRyaW0iLCJnZXRDb3VudE9mU2VsZWN0ZWRJdGVtcyIsImdldENsZWFyQnV0dG9uIiwiY29udGVudCIsImlzU2VsZWN0ZWRJdGVtcyIsInRvdGFsQ291bnQiLCJjb3VudCIsImVsZW1lbnRzIiwia2V5cyIsImkiLCJ0b29sdGlwSXRlbVJlbmRlckZ1bmN0aW9uIiwiZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbiIsInB1c2giLCJpc1Zpc2libGUiLCJrZXkiLCJsb2FkRGF0YSIsInRoZW4iLCJzZXRUaW1lb3V0IiwicHJlQ2hlY2tlZEdyb3VwTmFtZSIsInNldFByZWNoZWNrZWRJdGVtcyIsImdldENoZWNrZWRPdXRwdXQiLCJnZXRBbGxDaGVja2VkSXRlbXMiLCJjaGVja2VkIiwibmVlZFRvVXBkYXRlUHJlQ2hlY2tlZCIsImlzRGF0YUxvYWRlZCIsImlzTG9hZGVkIiwicG9wb3ZlclZpc2libGUiLCJjb21wb25lbnRXaWxsTW91bnQiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwiY29tcG9uZW50V2lsbFVwZGF0ZSIsIm5leHRTdGF0ZSIsInVwZGF0ZVByZWNoZWNrZWQiLCJyZW5kZXIiLCJnZXRIaWVyYXJjaHlTZWxlY3RvciIsImdldFBvcG92ZXIiLCJnZXRWaWV3IiwidG9vbHRpcFBsYWNlbWVudCIsImdldFRvb2xUaXAiLCJn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Q3ZDbkYsRUFBQUEsaUJBQWlCLEVBQUUsSUFEb0I7QUFFdkMwQixFQUFBQSxTQUFTLEVBQUUsRUFGNEI7QUFHdkNRLEVBQUFBLGVBQWUsRUFBRSxxQkFIc0I7QUFJdkNrQyxFQUFBQSxjQUFjLEVBQUUsS0FKdUI7QUFLdkNoRSxFQUFBQSxlQUFlLEVBQUUsSUFMc0I7QUFNdkN3RCxFQUFBQSxtQkFBbUIsRUFBRSxlQU5rQjtBQU92Q21CLEVBQUFBLGdCQUFnQixFQUFFLFFBUHFCO0FBUXZDaEYsRUFBQUEsUUFBUSxFQUFFLG9CQUFNLENBQUUsQ0FScUI7QUFTdkNxQixFQUFBQSxNQUFNLEVBQUUsa0JBQU0sQ0FBRSxDQVR1QjtBQVV2Q2dDLEVBQUFBLHlCQUF5QixFQUFFLElBVlk7QUFXdkMxQyxFQUFBQSxXQUFXLEVBQUUsS0FYMEI7QUFZdkNpQixFQUFBQSxNQUFNLEVBQUU7QUFaK0IsQ0FBekMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby11bnVzZWQtc3RhdGUgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFRvb2x0aXAsIE92ZXJsYXlUcmlnZ2VyIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBGYUNhcmV0RG93biwgRmFDYXJldFVwLCBGYVRpbWVzIH0gZnJvbSAncmVhY3QtaWNvbnMvZmEnO1xuaW1wb3J0IHsgZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3R5cGVzJztcbmltcG9ydCB7IHByZUNoZWNrZWRJdGVtc0xpc3RTaGFwZSwgcG9wb3Zlck9wdGlvbnNUeXBlLCB2aWV3T3B0aW9uc1R5cGUgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgU3Bpbm5lciBmcm9tICcuLi9zcGlubmVyJztcbmltcG9ydCBIU1BvcG92ZXIgZnJvbSAnLi4vcG9wb3Zlcic7XG5pbXBvcnQgSFNWaWV3IGZyb20gJy4uL3ZpZXcnO1xuaW1wb3J0IEhTQmFkZ2UgZnJvbSAnLi4vYmFkZ2UnO1xuXG5cbmltcG9ydCB7IFRPT0xUSVBfREVMQVlfTVMsIE1BWF9DT1VOVF9PRl9UT09MVElQX0lURU1TIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0ICcuL2NvbWJvLWJveC5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5U2VsZWN0b3JDb21ib0JveCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIGNvbnN0IGlzRGF0YUxvYWRlZCA9IHByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5pc0xvYWRlZDtcbiAgICBjb25zdCBuZWVkVG9VcGRhdGVQcmVDaGVja2VkID0gcHJvcHMucHJlQ2hlY2tlZEl0ZW1zICYmIHByb3BzLnByZUNoZWNrZWRJdGVtcy5sZW5ndGg7XG4gICAgY29uc3QgbmVlZFRvTG9hZERhdGEgPSAhaXNEYXRhTG9hZGVkICYmIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQ7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbmVlZFRvTG9hZERhdGEsXG4gICAgICBuZWVkVG9VcGRhdGVQcmVDaGVja2VkLFxuICAgICAgcHJlQ2hlY2tlZEl0ZW1zOiBwcm9wcy5wcmVDaGVja2VkSXRlbXMsXG4gICAgICBzZWxlY3RlZDogbnVsbCxcbiAgICAgIGlzUG9wb3ZlclZpc2libGU6IHByb3BzLnBvcG92ZXJWaXNpYmxlLFxuICAgICAgaXNWaWV3VmlzaWJsZTogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICBjb25zdCB7IG5lZWRUb0xvYWREYXRhIH0gPSB0aGlzLnN0YXRlO1xuICAgIGlmIChuZWVkVG9Mb2FkRGF0YSkge1xuICAgICAgdGhpcy5sb2FkRGF0YSh0aGlzLnByb3BzKTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGNvbnN0IHsgZGF0YVNvdXJjZVByb3ZpZGVyLCBwcmVDaGVja2VkSXRlbXMgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoZGF0YVNvdXJjZVByb3ZpZGVyICE9PSBuZXh0UHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbmVlZFRvTG9hZERhdGE6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocHJlQ2hlY2tlZEl0ZW1zICE9PSBuZXh0UHJvcHMucHJlQ2hlY2tlZEl0ZW1zKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZDogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICBjb25zdCB7IG5lZWRUb0xvYWREYXRhLCBuZWVkVG9VcGRhdGVQcmVDaGVja2VkIH0gPSBuZXh0U3RhdGU7XG4gICAgaWYgKG5lZWRUb0xvYWREYXRhKSB7XG4gICAgICB0aGlzLmxvYWREYXRhKG5leHRQcm9wcyk7XG4gICAgfSBlbHNlIGlmIChuZWVkVG9VcGRhdGVQcmVDaGVja2VkKSB7XG4gICAgICB0aGlzLnVwZGF0ZVByZWNoZWNrZWQobmV4dFByb3BzKTtcbiAgICB9XG4gIH1cblxuICBvbkNsaWNrSGFuZGxlciA9ICgpID0+IHtcbiAgICB0aGlzLnNldFBvcG92ZXJWaXNpYmlsaXR5KCF0aGlzLnN0YXRlLmlzUG9wb3ZlclZpc2libGUpO1xuICB9XG5cbiAgb25JbnB1dEZvY3VzID0gKCkgPT4ge1xuICAgIHRoaXMuaW5wdXRFbGVtZW50LmJsdXIoKTtcbiAgfVxuXG4gIG9uU2VsZWN0SGFuZGxlciA9IChncm91cE5hbWUsIHNlbGVjdGVkSXRlbSwgY2hlY2tlZE91dHB1dCwgZmxhZ3MpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkOiBzZWxlY3RlZEl0ZW0sXG4gICAgICBpc1BvcG92ZXJWaXNpYmxlOiBmYWxzZSxcbiAgICAgIGlzVmlld1Zpc2libGU6IGZhbHNlLFxuICAgIH0pO1xuICAgIGNvbnN0IGl0ZW1zID0gY2hlY2tlZE91dHB1dCA/IGNoZWNrZWRPdXRwdXQubWFwKGl0ZW0gPT4gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSkpIDogW107XG5cbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGl0ZW1zLCBncm91cE5hbWUsIGZsYWdzKTtcbiAgfVxuXG4gIG9uUG9wb3ZlckJsdXIgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuaGlkZU9uUG9wb3ZlckJsdXIpIHtcbiAgICAgIHRoaXMucG9wb3ZlclNob3VsZEJlSGlkZGVuKCk7XG4gICAgfVxuICB9XG5cbiAgb25TaG91bGRPcGVuVmlldyA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgaXNWaWV3VmlzaWJsZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIG9uU2hvdWxkQ2xvc2VQb3BvdmVyID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaXNQb3BvdmVyVmlzaWJsZTogZmFsc2UsXG4gICAgfSk7XG4gIH1cblxuICBvbkNhbmNlbGVkVmlldyA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlzUG9wb3ZlclZpc2libGU6IGZhbHNlLFxuICAgICAgaXNWaWV3VmlzaWJsZTogZmFsc2UsXG4gICAgfSk7XG4gIH1cblxuICBvblNlbGVjdGVkSW5WaWV3ID0gKGdyb3VwTmFtZSwgc2VsZWN0ZWRJdGVtcywgY2hlY2tlZE91dHB1dCwgZmxhZ3MpID0+IHtcbiAgICBjb25zdCBzZWxlY3RlZEl0ZW0gPSB7XG4gICAgICBuYW1lOiBncm91cE5hbWUsXG4gICAgICBpdGVtczogc2VsZWN0ZWRJdGVtcyxcbiAgICB9O1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcHJlQ2hlY2tlZEl0ZW1zOiBjaGVja2VkT3V0cHV0LFxuICAgIH0pO1xuICAgIHRoaXMub25TZWxlY3RIYW5kbGVyKGdyb3VwTmFtZSwgc2VsZWN0ZWRJdGVtLCBjaGVja2VkT3V0cHV0LCBmbGFncyk7XG4gIH1cblxuICBvblNlbGVjdGVkSW5Qb3BvdmVyID0gKHNlbGVjdGVkSXRlbSwgZmxhZ3MpID0+IHtcbiAgICB0aGlzLnVuY2hlY2tBbGxJdGVtcygpO1xuICAgIGNvbnN0IGNoZWNrZWRPdXRwdXQgPSBzZWxlY3RlZEl0ZW0gJiYgQXJyYXkuaXNBcnJheShzZWxlY3RlZEl0ZW0uaXRlbXMpID9cbiAgICAgIHNlbGVjdGVkSXRlbS5pdGVtcyA6IFtdO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcHJlQ2hlY2tlZEl0ZW1zOiBjaGVja2VkT3V0cHV0LFxuICAgIH0pO1xuICAgIHRoaXMub25TZWxlY3RIYW5kbGVyKHNlbGVjdGVkSXRlbS5uYW1lLCBzZWxlY3RlZEl0ZW0sIGNoZWNrZWRPdXRwdXQsIGZsYWdzKTtcbiAgfVxuXG4gIG9uQ2xlYXJIYW5kbGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGdyb3VwTmFtZSA9ICcnO1xuICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IFtdO1xuICAgIGNvbnN0IGNoZWNrZWRPdXRwdXQgPSBbXTtcbiAgICBjb25zdCBmbGFncyA9IHsgaW50ZXJhY3RpdmU6IHRydWUgfTtcbiAgICB0aGlzLnVuY2hlY2tBbGxJdGVtcygpO1xuICAgIHRoaXMub25TZWxlY3RIYW5kbGVyKGdyb3VwTmFtZSwgc2VsZWN0ZWRJdGVtLCBjaGVja2VkT3V0cHV0LCBmbGFncyk7XG4gIH1cblxuICBnZXRDbGVhckJ1dHRvbiA9ICgpID0+IHtcbiAgICBpZiAoXG4gICAgICAhdGhpcy5wcm9wcy5pc0NsZWFyYWJsZVxuICAgICAgfHwgIXRoaXMuc3RhdGUuc2VsZWN0ZWRcbiAgICAgIHx8ICF0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zXG4gICAgICB8fCAhdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5sZW5ndGhcbiAgICApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwicmVzZXRcIlxuICAgICAgICBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItbGlzdC1jbGVhci1idG5cIlxuICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xlYXJIYW5kbGVyfVxuICAgICAgPlxuICAgICAgICA8RmFUaW1lcyAvPlxuICAgICAgPC9idXR0b24+XG4gICAgKTtcbiAgfVxuXG4gIGdldElucHV0VGV4dCA9ICgpID0+IHtcbiAgICBsZXQgc2VsZWN0aW9uVGV4dCA9ICcnO1xuXG4gICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWQgJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcyAmJiB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgIHNlbGVjdGlvblRleHQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkLm5hbWU7XG4gICAgfVxuICAgIHJldHVybiBzZWxlY3Rpb25UZXh0O1xuICB9XG5cbiAgZ2V0VmlldyA9ICgpID0+IHtcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5wcm9wcy52aWV3T3B0aW9ucztcbiAgICBjb25zdCBwcmVDaGVja2VkSXRlbXMgPSBBcnJheS5pc0FycmF5KHRoaXMuc3RhdGUucHJlQ2hlY2tlZEl0ZW1zKSA/XG4gICAgICB0aGlzLnN0YXRlLnByZUNoZWNrZWRJdGVtcy5zbGljZSgpIDogbnVsbDtcblxuICAgIHJldHVybiAoXG4gICAgICA8SFNWaWV3XG4gICAgICAgIGRhdGFTb3VyY2VQcm92aWRlcj17dGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXJ9XG4gICAgICAgIHsuLi5vcHRpb25zfVxuICAgICAgICBvbkNhbmNlbD17dGhpcy5vbkNhbmNlbGVkVmlld31cbiAgICAgICAgb25TZWxlY3Q9e3RoaXMub25TZWxlY3RlZEluVmlld31cbiAgICAgICAgb25IZWxwPXt0aGlzLnByb3BzLm9uSGVscH1cbiAgICAgICAgZ3JvdXBOYW1lPXt0aGlzLnN0YXRlLnNlbGVjdGVkID8gdGhpcy5zdGF0ZS5zZWxlY3RlZC5uYW1lIDogJyd9XG4gICAgICAgIHByZUNoZWNrZWRJdGVtcz17cHJlQ2hlY2tlZEl0ZW1zfVxuICAgICAgICBpc0NsZWFyYWJsZT17dGhpcy5wcm9wcy5pc0NsZWFyYWJsZX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIGdldFBvcG92ZXIgPSAoKSA9PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMucHJvcHMucG9wb3Zlck9wdGlvbnM7XG5cbiAgICByZXR1cm4gKDxIU1BvcG92ZXJcbiAgICAgIGRhdGFTb3VyY2VQcm92aWRlcj17dGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXJ9XG4gICAgICBvbkNvbXBvbmVudEJsdXI9e3RoaXMub25Qb3BvdmVyQmx1cn1cbiAgICAgIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0ZWRJblBvcG92ZXJ9XG4gICAgICBvblNob3VsZE9wZW5WaWV3PXt0aGlzLm9uU2hvdWxkT3BlblZpZXd9XG4gICAgICBvblNob3VsZENsb3NlUG9wb3Zlcj17dGhpcy5vblNob3VsZENsb3NlUG9wb3Zlcn1cbiAgICAgIHsuLi5vcHRpb25zfVxuICAgIC8+KTtcbiAgfVxuXG4gIGdldEhpZXJhcmNoeVNlbGVjdG9yID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgaW5wdXROYW1lIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGlzQnVzeSA9IHRoaXMucHJvcHMuaXNCdXN5IHx8IHRoaXMuc3RhdGUubmVlZFRvTG9hZERhdGE7XG5cbiAgICBjb25zdCBpbnB1dE9wdGlvbnMgPSB7XG4gICAgICBvbkZvY3VzOiB0aGlzLm9uSW5wdXRGb2N1cyxcbiAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnByb3BzLm5vU2VsZWN0aW9uVGV4dCxcbiAgICAgIHJlYWRPbmx5OiB0cnVlLFxuICAgICAgcmVmOiAoaW5wdXQpID0+IHsgdGhpcy5pbnB1dEVsZW1lbnQgPSBpbnB1dDsgfSxcbiAgICAgIHZhbHVlOiB0aGlzLmdldElucHV0VGV4dCgpLFxuICAgICAgb25DbGljazogdGhpcy5vbkNsaWNrSGFuZGxlcixcbiAgICB9O1xuXG4gICAgaWYgKGlucHV0TmFtZS50cmltKCkgIT09ICcnKSB7XG4gICAgICBpbnB1dE9wdGlvbnMubmFtZSA9IGlucHV0TmFtZTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItbGlzdFwiPlxuICAgICAgICA8aW5wdXQgey4uLmlucHV0T3B0aW9uc30gLz5cbiAgICAgICAge2lzQnVzeSA/XG4gICAgICAgICAgPFNwaW5uZXIgLz4gOlxuICAgICAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICAgIDxIU0JhZGdlIGNsYXNzTmFtZT1cImJhZGdlLW9yYW5nZVwiPnt0aGlzLmdldENvdW50T2ZTZWxlY3RlZEl0ZW1zKCl9PC9IU0JhZGdlPlxuICAgICAgICAgICAge3RoaXMuZ2V0Q2xlYXJCdXR0b24oKX1cbiAgICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICAgICB9XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBkaXNhYmxlZD17aXNCdXN5fVxuICAgICAgICAgIGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1saXN0LWJ0blwiXG4gICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrSGFuZGxlcn1cbiAgICAgICAgPlxuICAgICAgICAgIHsgdGhpcy5zdGF0ZS5pc1BvcG92ZXJWaXNpYmxlXG4gICAgICAgICAgICA/IDxGYUNhcmV0VXAgLz5cbiAgICAgICAgICAgIDogPEZhQ2FyZXREb3duIC8+XG4gICAgICAgICAgfVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBnZXRUb29sVGlwID0gY29udGVudCA9PiA8VG9vbHRpcCBpZD1cInRvb2x0aXBcIiBjbGFzc05hbWU9XCJocy1jb21iby1ib3gtdG9vbHRpcFwiPntjb250ZW50fTwvVG9vbHRpcD47XG5cbiAgZ2V0RGVmYXVsdFRvb2xUaXBDb250ZW50ID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5pc1NlbGVjdGVkSXRlbXMoKSkgcmV0dXJuIHRoaXMucHJvcHMubm9TZWxlY3Rpb25UZXh0O1xuICAgIGNvbnN0IHRvdGFsQ291bnQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLmxlbmd0aDtcbiAgICBjb25zdCBjb3VudCA9IHRvdGFsQ291bnQgPiBNQVhfQ09VTlRfT0ZfVE9PTFRJUF9JVEVNUyA/IE1BWF9DT1VOVF9PRl9UT09MVElQX0lURU1TIDogdG90YWxDb3VudDtcblxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5zbGljZSgwLCBjb3VudCk7XG4gICAgY29uc3QgZWxlbWVudHMgPSBPYmplY3Qua2V5cyhpdGVtcykubWFwKGkgPT4gKHRoaXMucHJvcHMudG9vbHRpcEl0ZW1SZW5kZXJGdW5jdGlvbiA/XG4gICAgICB0aGlzLnByb3BzLnRvb2x0aXBJdGVtUmVuZGVyRnVuY3Rpb24oaXRlbXNbaV0sIGksIHRoaXMuZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbikgOlxuICAgICAgdGhpcy5kZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uKGl0ZW1zW2ldLCBpKSkpO1xuICAgIGlmIChjb3VudCA8IHRvdGFsQ291bnQpIGVsZW1lbnRzLnB1c2goPHAga2V5PXtjb3VudH0+LiAuIC48L3A+KTtcblxuICAgIHJldHVybiBlbGVtZW50cztcbiAgfVxuXG4gIGdldENvdW50T2ZTZWxlY3RlZEl0ZW1zID0gKCkgPT4gKHRoaXMuaXNTZWxlY3RlZEl0ZW1zKCkgPyB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLmxlbmd0aCA6IDApO1xuXG4gIHNldFBvcG92ZXJWaXNpYmlsaXR5ID0gKGlzVmlzaWJsZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBpc1BvcG92ZXJWaXNpYmxlOiBpc1Zpc2libGUgfSk7XG4gIH1cblxuICBkZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uID0gKGl0ZW0sIGtleSkgPT4gKDxwIGtleT17a2V5fT57aXRlbS5uYW1lfTwvcD4pO1xuXG4gIGlzU2VsZWN0ZWRJdGVtcyA9ICgpID0+IChcbiAgICB0aGlzLnN0YXRlLnNlbGVjdGVkICYmIHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMgJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5sZW5ndGggPiAwXG4gICk7XG5cbiAgbG9hZERhdGEgPSAocHJvcHMpID0+IHtcbiAgICBwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIubG9hZERhdGEoKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBuZWVkVG9Mb2FkRGF0YTogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHBvcG92ZXJTaG91bGRCZUhpZGRlbiA9ICgpID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLnN0YXRlLmlzUG9wb3ZlclZpc2libGUpIHRoaXMuc2V0UG9wb3ZlclZpc2liaWxpdHkoZmFsc2UpO1xuICAgIH0sIDE1MCk7XG4gIH1cblxuICB1bmNoZWNrQWxsSXRlbXMgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwcmVDaGVja2VkSXRlbXM6IFtdLFxuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlUHJlY2hlY2tlZCA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgZGF0YVNvdXJjZVByb3ZpZGVyLCBwcmVDaGVja2VkR3JvdXBOYW1lLCBwcmVDaGVja2VkSXRlbXMgfSA9IHByb3BzO1xuXG4gICAgZGF0YVNvdXJjZVByb3ZpZGVyLnNldFByZWNoZWNrZWRJdGVtcyhwcmVDaGVja2VkSXRlbXMpO1xuXG4gICAgY29uc3QgY2hlY2tlZE91dHB1dCA9IGRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkT3V0cHV0KCk7XG4gICAgY29uc3Qgc2VsZWN0ZWRJdGVtcyA9IGRhdGFTb3VyY2VQcm92aWRlci5nZXRBbGxDaGVja2VkSXRlbXMoKTtcbiAgICBjb25zdCBjaGVja2VkID0gY2hlY2tlZE91dHB1dC5jaGVja2VkIHx8IFtdO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBuZWVkVG9VcGRhdGVQcmVDaGVja2VkOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRoaXMub25TZWxlY3RlZEluVmlldyhwcmVDaGVja2VkR3JvdXBOYW1lLCBzZWxlY3RlZEl0ZW1zLCBjaGVja2VkKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICAvLyBJZiBwb3BvdmVyIGlzIHZpc2libGUsIGRvbid0IHNob3cgdG9vbHRpcCAob3ZlcmxheSlcbiAgICBpZiAodGhpcy5zdGF0ZS5pc1BvcG92ZXJWaXNpYmxlKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1saXN0LXdyYXBwZXJcIj5cbiAgICAgICAgICB7IHRoaXMuZ2V0SGllcmFyY2h5U2VsZWN0b3IoKSB9XG4gICAgICAgICAgeyB0aGlzLnN0YXRlLmlzUG9wb3ZlclZpc2libGUgPyB0aGlzLmdldFBvcG92ZXIoKSA6IG51bGwgfVxuICAgICAgICAgIHsgdGhpcy5zdGF0ZS5pc1ZpZXdWaXNpYmxlID8gdGhpcy5nZXRWaWV3KCkgOiBudWxsIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItbGlzdC13cmFwcGVyXCI+XG4gICAgICAgIDxPdmVybGF5VHJpZ2dlclxuICAgICAgICAgIGRlbGF5PXtUT09MVElQX0RFTEFZX01TfVxuICAgICAgICAgIHBsYWNlbWVudD17dGhpcy5wcm9wcy50b29sdGlwUGxhY2VtZW50fVxuICAgICAgICAgIG92ZXJsYXk9e3RoaXMuZ2V0VG9vbFRpcCh0aGlzLmdldERlZmF1bHRUb29sVGlwQ29udGVudCgpKX1cbiAgICAgICAgPlxuICAgICAgICAgIHsgdGhpcy5nZXRIaWVyYXJjaHlTZWxlY3RvcigpIH1cbiAgICAgICAgPC9PdmVybGF5VHJpZ2dlcj5cbiAgICAgICAgeyB0aGlzLnN0YXRlLmlzUG9wb3ZlclZpc2libGUgPyB0aGlzLmdldFBvcG92ZXIoKSA6IG51bGwgfVxuICAgICAgICB7IHRoaXMuc3RhdGUuaXNWaWV3VmlzaWJsZSA/IHRoaXMuZ2V0VmlldygpIDogbnVsbCB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkhpZXJhcmNoeVNlbGVjdG9yQ29tYm9Cb3gucHJvcFR5cGVzID0ge1xuICBkYXRhU291cmNlUHJvdmlkZXI6IGRhdGFTb3VyY2VQcm92aWRlclR5cGUuaXNSZXF1aXJlZCxcbiAgaGlkZU9uUG9wb3ZlckJsdXI6IFByb3BUeXBlcy5ib29sLFxuICBpbnB1dE5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIG5vU2VsZWN0aW9uVGV4dDogUHJvcFR5cGVzLnN0cmluZyxcbiAgcG9wb3ZlclZpc2libGU6IFByb3BUeXBlcy5ib29sLFxuICBwb3BvdmVyT3B0aW9uczogcG9wb3Zlck9wdGlvbnNUeXBlLmlzUmVxdWlyZWQsXG4gIHByZUNoZWNrZWRJdGVtczogcHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlLFxuICBwcmVDaGVja2VkR3JvdXBOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICB0b29sdGlwUGxhY2VtZW50OiBQcm9wVHlwZXMuc3RyaW5nLFxuICB2aWV3T3B0aW9uczogdmlld09wdGlvbnNUeXBlLmlzUmVxdWlyZWQsXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgb25IZWxwOiBQcm9wVHlwZXMuZnVuYyxcbiAgdG9vbHRpcEl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gIGlzQ2xlYXJhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgaXNCdXN5OiBQcm9wVHlwZXMuYm9vbCxcbn07XG5cbkhpZXJhcmNoeVNlbGVjdG9yQ29tYm9Cb3guZGVmYXVsdFByb3BzID0ge1xuICBoaWRlT25Qb3BvdmVyQmx1cjogdHJ1ZSxcbiAgaW5wdXROYW1lOiAnJyxcbiAgbm9TZWxlY3Rpb25UZXh0OiAnTm90aGluZyBzZWxlY3RlZC4uLicsXG4gIHBvcG92ZXJWaXNpYmxlOiBmYWxzZSxcbiAgcHJlQ2hlY2tlZEl0ZW1zOiBudWxsLFxuICBwcmVDaGVja2VkR3JvdXBOYW1lOiAnRGVmYXVsdCBncm91cCcsXG4gIHRvb2x0aXBQbGFjZW1lbnQ6ICdib3R0b20nLFxuICBvblNlbGVjdDogKCkgPT4ge30sXG4gIG9uSGVscDogKCkgPT4ge30sXG4gIHRvb2x0aXBJdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXG4gIGlzQ2xlYXJhYmxlOiBmYWxzZSxcbiAgaXNCdXN5OiBmYWxzZSxcbn07XG4iXX0=