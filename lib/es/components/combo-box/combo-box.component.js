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
import FaClose from 'react-icons/lib/fa/close';
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

    var isBusy = this.props.isBusy || this.state.needToLoadData;

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
          isBusy ? React.createElement(Spinner, null) : React.createElement(
            React.Fragment,
            null,
            React.createElement(
              HSBadge,
              { className: 'badge-orange' },
              this.getCountOfSelectedItems()
            ),
            this.getClearButton()
          ),
          React.createElement(
            'button',
            {
              type: 'button',
              disabled: isBusy,
              className: 'oc-hierarchy-selector-list-btn',
              onClick: this.onClickHandler
            },
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

  this.onClearHandler = function () {
    var groupName = '';
    var selectedItem = [];
    var checkedOutput = [];
    var flags = { interactive: true };
    _this3.uncheckAllItems();
    _this3.onSelectHandler(groupName, selectedItem, checkedOutput, flags);
  };

  this.getClearButton = function () {
    if (!_this3.props.isClearable || !_this3.state.selected || !_this3.state.selected.items || !_this3.state.selected.items.length) {
      return null;
    }
    return React.createElement(
      'button',
      {
        type: 'reset',
        className: 'oc-hierarchy-selector-list-clear-btn',
        onClick: _this3.onClearHandler
      },
      React.createElement(FaClose, null)
    );
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
      preCheckedItems: preCheckedItems,
      isClearable: _this3.props.isClearable
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbWJvLWJveC9jb21iby1ib3guY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlRvb2x0aXAiLCJPdmVybGF5VHJpZ2dlciIsIlByb3BUeXBlcyIsIkZhQ2hldnJvbkRvd24iLCJGYUNsb3NlIiwiZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSIsInByZUNoZWNrZWRJdGVtc0xpc3RTaGFwZSIsInBvcG92ZXJPcHRpb25zVHlwZSIsInZpZXdPcHRpb25zVHlwZSIsIlNwaW5uZXIiLCJIU1BvcG92ZXIiLCJIU1ZpZXciLCJIU0JhZGdlIiwiVE9PTFRJUF9ERUxBWV9NUyIsIk1BWF9DT1VOVF9PRl9UT09MVElQX0lURU1TIiwiSGllcmFyY2h5U2VsZWN0b3JDb21ib0JveCIsInByb3BzIiwiaXNEYXRhTG9hZGVkIiwiZGF0YVNvdXJjZVByb3ZpZGVyIiwiaXNMb2FkZWQiLCJuZWVkVG9VcGRhdGVQcmVDaGVja2VkIiwicHJlQ2hlY2tlZEl0ZW1zIiwibGVuZ3RoIiwibmVlZFRvTG9hZERhdGEiLCJzdGF0ZSIsInNlbGVjdGVkIiwiaXNQb3BvdmVyVmlzaWJsZSIsInBvcG92ZXJWaXNpYmxlIiwiaXNWaWV3VmlzaWJsZSIsImNvbXBvbmVudFdpbGxNb3VudCIsImxvYWREYXRhIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsInNldFN0YXRlIiwiY29tcG9uZW50V2lsbFVwZGF0ZSIsIm5leHRTdGF0ZSIsInVwZGF0ZVByZWNoZWNrZWQiLCJyZW5kZXIiLCJpbnB1dE5hbWUiLCJpbnB1dE9wdGlvbnMiLCJvbkZvY3VzIiwib25JbnB1dEZvY3VzIiwidHlwZSIsInBsYWNlaG9sZGVyIiwibm9TZWxlY3Rpb25UZXh0IiwicmVhZE9ubHkiLCJyZWYiLCJpbnB1dCIsImlucHV0RWxlbWVudCIsInZhbHVlIiwiZ2V0SW5wdXRUZXh0Iiwib25DbGljayIsIm9uQ2xpY2tIYW5kbGVyIiwidHJpbSIsIm5hbWUiLCJpc0J1c3kiLCJ0b29sdGlwUGxhY2VtZW50IiwiZ2V0VG9vbFRpcCIsImdldERlZmF1bHRUb29sVGlwQ29udGVudCIsImdldENvdW50T2ZTZWxlY3RlZEl0ZW1zIiwiZ2V0Q2xlYXJCdXR0b24iLCJnZXRQb3BvdmVyIiwiZ2V0VmlldyIsIlB1cmVDb21wb25lbnQiLCJzZXRQb3BvdmVyVmlzaWJpbGl0eSIsImJsdXIiLCJvblNlbGVjdEhhbmRsZXIiLCJncm91cE5hbWUiLCJzZWxlY3RlZEl0ZW0iLCJjaGVja2VkT3V0cHV0IiwiZmxhZ3MiLCJpdGVtcyIsIm1hcCIsIk9iamVjdCIsImFzc2lnbiIsIml0ZW0iLCJvblNlbGVjdCIsIm9uUG9wb3ZlckJsdXIiLCJoaWRlT25Qb3BvdmVyQmx1ciIsInBvcG92ZXJTaG91bGRCZUhpZGRlbiIsIm9uU2hvdWxkT3BlblZpZXciLCJvblNob3VsZENsb3NlUG9wb3ZlciIsIm9uQ2FuY2VsZWRWaWV3Iiwib25TZWxlY3RlZEluVmlldyIsInNlbGVjdGVkSXRlbXMiLCJvblNlbGVjdGVkSW5Qb3BvdmVyIiwidW5jaGVja0FsbEl0ZW1zIiwiQXJyYXkiLCJpc0FycmF5Iiwib25DbGVhckhhbmRsZXIiLCJpbnRlcmFjdGl2ZSIsImlzQ2xlYXJhYmxlIiwic2VsZWN0aW9uVGV4dCIsIm9wdGlvbnMiLCJ2aWV3T3B0aW9ucyIsInNsaWNlIiwib25IZWxwIiwicG9wb3Zlck9wdGlvbnMiLCJjb250ZW50IiwiaXNTZWxlY3RlZEl0ZW1zIiwidG90YWxDb3VudCIsImNvdW50IiwiZWxlbWVudHMiLCJrZXlzIiwidG9vbHRpcEl0ZW1SZW5kZXJGdW5jdGlvbiIsImkiLCJkZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uIiwicHVzaCIsImlzVmlzaWJsZSIsImtleSIsInRoZW4iLCJzZXRUaW1lb3V0IiwicHJlQ2hlY2tlZEdyb3VwTmFtZSIsInNldFByZWNoZWNrZWRJdGVtcyIsImdldENoZWNrZWRPdXRwdXQiLCJnZXRBbGxDaGVja2VkSXRlbXMiLCJj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LEc7O09BRURlLGdCLEdBQW1CLFVBQUNwQixLQUFELEVBQVc7QUFBQSxRQUNwQkUsa0JBRG9CLEdBQ3lDRixLQUR6QyxDQUNwQkUsa0JBRG9CO0FBQUEsUUFDQThGLG1CQURBLEdBQ3lDaEcsS0FEekMsQ0FDQWdHLG1CQURBO0FBQUEsUUFDcUIzRixlQURyQixHQUN5Q0wsS0FEekMsQ0FDcUJLLGVBRHJCOzs7QUFHNUJILHVCQUFtQitGLGtCQUFuQixDQUFzQzVGLGVBQXRDOztBQUVBLFFBQU1nRCxnQkFBZ0JuRCxtQkFBbUJnRyxnQkFBbkIsRUFBdEI7QUFDQSxRQUFNOUIsZ0JBQWdCbEUsbUJBQW1CaUcsa0JBQW5CLEVBQXRCO0FBQ0EsUUFBTUMsVUFBVS9DLGNBQWMrQyxPQUFkLElBQXlCLEVBQXpDOztBQUVBLFdBQUtuRixRQUFMLENBQWM7QUFDWmIsOEJBQXdCO0FBRFosS0FBZDs7QUFJQSxXQUFLK0QsZ0JBQUwsQ0FBc0I2QixtQkFBdEIsRUFBMkM1QixhQUEzQyxFQUEwRGdDLE9BQTFEO0FBQ0QsRzs7U0FyUGtCckcseUI7OztBQTRUckJBLDBCQUEwQnNHLFlBQTFCLEdBQXlDO0FBQ3ZDdkMscUJBQW1CLElBRG9CO0FBRXZDeEMsYUFBVyxFQUY0QjtBQUd2Q00sbUJBQWlCLHFCQUhzQjtBQUl2Q2pCLGtCQUFnQixLQUp1QjtBQUt2Q04sbUJBQWlCLElBTHNCO0FBTXZDMkYsdUJBQXFCLGVBTmtCO0FBT3ZDeEQsb0JBQWtCLFFBUHFCO0FBUXZDb0IsWUFBVSxvQkFBTSxDQUFFLENBUnFCO0FBU3ZDb0IsVUFBUSxrQkFBTSxDQUFFLENBVHVCO0FBVXZDUSw2QkFBMkIsSUFWWTtBQVd2Q2IsZUFBYSxLQVgwQjtBQVl2Q3BDLFVBQVE7QUFaK0IsQ0FBekMiLCJmaWxlIjoiY29tYm8tYm94LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXVudXNlZC1zdGF0ZSAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgVG9vbHRpcCwgT3ZlcmxheVRyaWdnZXIgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBGYUNoZXZyb25Eb3duIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9jaGV2cm9uLWRvd24nO1xuaW1wb3J0IEZhQ2xvc2UgZnJvbSAncmVhY3QtaWNvbnMvbGliL2ZhL2Nsb3NlJztcbmltcG9ydCB7IGRhdGFTb3VyY2VQcm92aWRlclR5cGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90eXBlcyc7XG5pbXBvcnQgeyBwcmVDaGVja2VkSXRlbXNMaXN0U2hhcGUsIHBvcG92ZXJPcHRpb25zVHlwZSwgdmlld09wdGlvbnNUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IFNwaW5uZXIgZnJvbSAnLi4vc3Bpbm5lcic7XG5pbXBvcnQgSFNQb3BvdmVyIGZyb20gJy4uL3BvcG92ZXInO1xuaW1wb3J0IEhTVmlldyBmcm9tICcuLi92aWV3JztcbmltcG9ydCBIU0JhZGdlIGZyb20gJy4uL2JhZGdlJztcblxuXG5pbXBvcnQgeyBUT09MVElQX0RFTEFZX01TLCBNQVhfQ09VTlRfT0ZfVE9PTFRJUF9JVEVNUyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCAnLi9jb21iby1ib3guc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVNlbGVjdG9yQ29tYm9Cb3ggZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICBjb25zdCBpc0RhdGFMb2FkZWQgPSBwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuaXNMb2FkZWQ7XG4gICAgY29uc3QgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZCA9IHByb3BzLnByZUNoZWNrZWRJdGVtcyAmJiBwcm9wcy5wcmVDaGVja2VkSXRlbXMubGVuZ3RoO1xuICAgIGNvbnN0IG5lZWRUb0xvYWREYXRhID0gIWlzRGF0YUxvYWRlZCAmJiBuZWVkVG9VcGRhdGVQcmVDaGVja2VkO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG5lZWRUb0xvYWREYXRhLFxuICAgICAgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZCxcbiAgICAgIHByZUNoZWNrZWRJdGVtczogcHJvcHMucHJlQ2hlY2tlZEl0ZW1zLFxuICAgICAgc2VsZWN0ZWQ6IG51bGwsXG4gICAgICBpc1BvcG92ZXJWaXNpYmxlOiBwcm9wcy5wb3BvdmVyVmlzaWJsZSxcbiAgICAgIGlzVmlld1Zpc2libGU6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgY29uc3QgeyBuZWVkVG9Mb2FkRGF0YSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBpZiAobmVlZFRvTG9hZERhdGEpIHtcbiAgICAgIHRoaXMubG9hZERhdGEodGhpcy5wcm9wcyk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBjb25zdCB7IGRhdGFTb3VyY2VQcm92aWRlciwgcHJlQ2hlY2tlZEl0ZW1zIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKGRhdGFTb3VyY2VQcm92aWRlciAhPT0gbmV4dFByb3BzLmRhdGFTb3VyY2VQcm92aWRlcikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG5lZWRUb0xvYWREYXRhOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHByZUNoZWNrZWRJdGVtcyAhPT0gbmV4dFByb3BzLnByZUNoZWNrZWRJdGVtcykge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQ6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgY29uc3QgeyBuZWVkVG9Mb2FkRGF0YSwgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZCB9ID0gbmV4dFN0YXRlO1xuICAgIGlmIChuZWVkVG9Mb2FkRGF0YSkge1xuICAgICAgdGhpcy5sb2FkRGF0YShuZXh0UHJvcHMpO1xuICAgIH0gZWxzZSBpZiAobmVlZFRvVXBkYXRlUHJlQ2hlY2tlZCkge1xuICAgICAgdGhpcy51cGRhdGVQcmVjaGVja2VkKG5leHRQcm9wcyk7XG4gICAgfVxuICB9XG5cbiAgb25DbGlja0hhbmRsZXIgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRQb3BvdmVyVmlzaWJpbGl0eSghdGhpcy5zdGF0ZS5pc1BvcG92ZXJWaXNpYmxlKTtcbiAgfVxuXG4gIG9uSW5wdXRGb2N1cyA9ICgpID0+IHtcbiAgICB0aGlzLmlucHV0RWxlbWVudC5ibHVyKCk7XG4gIH1cblxuICBvblNlbGVjdEhhbmRsZXIgPSAoZ3JvdXBOYW1lLCBzZWxlY3RlZEl0ZW0sIGNoZWNrZWRPdXRwdXQsIGZsYWdzKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZDogc2VsZWN0ZWRJdGVtLFxuICAgICAgaXNQb3BvdmVyVmlzaWJsZTogZmFsc2UsXG4gICAgICBpc1ZpZXdWaXNpYmxlOiBmYWxzZSxcbiAgICB9KTtcbiAgICBjb25zdCBpdGVtcyA9IGNoZWNrZWRPdXRwdXQgPyBjaGVja2VkT3V0cHV0Lm1hcChpdGVtID0+IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pKSA6IFtdO1xuXG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChpdGVtcywgZ3JvdXBOYW1lLCBmbGFncyk7XG4gIH1cblxuICBvblBvcG92ZXJCbHVyID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmhpZGVPblBvcG92ZXJCbHVyKSB7XG4gICAgICB0aGlzLnBvcG92ZXJTaG91bGRCZUhpZGRlbigpO1xuICAgIH1cbiAgfVxuXG4gIG9uU2hvdWxkT3BlblZpZXcgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlzVmlld1Zpc2libGU6IHRydWUgfSk7XG4gIH1cblxuICBvblNob3VsZENsb3NlUG9wb3ZlciA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlzUG9wb3ZlclZpc2libGU6IGZhbHNlLFxuICAgIH0pO1xuICB9XG5cbiAgb25DYW5jZWxlZFZpZXcgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpc1BvcG92ZXJWaXNpYmxlOiBmYWxzZSxcbiAgICAgIGlzVmlld1Zpc2libGU6IGZhbHNlLFxuICAgIH0pO1xuICB9XG5cbiAgb25TZWxlY3RlZEluVmlldyA9IChncm91cE5hbWUsIHNlbGVjdGVkSXRlbXMsIGNoZWNrZWRPdXRwdXQsIGZsYWdzKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ZWRJdGVtID0ge1xuICAgICAgbmFtZTogZ3JvdXBOYW1lLFxuICAgICAgaXRlbXM6IHNlbGVjdGVkSXRlbXMsXG4gICAgfTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHByZUNoZWNrZWRJdGVtczogY2hlY2tlZE91dHB1dCxcbiAgICB9KTtcbiAgICB0aGlzLm9uU2VsZWN0SGFuZGxlcihncm91cE5hbWUsIHNlbGVjdGVkSXRlbSwgY2hlY2tlZE91dHB1dCwgZmxhZ3MpO1xuICB9XG5cbiAgb25TZWxlY3RlZEluUG9wb3ZlciA9IChzZWxlY3RlZEl0ZW0sIGZsYWdzKSA9PiB7XG4gICAgdGhpcy51bmNoZWNrQWxsSXRlbXMoKTtcbiAgICBjb25zdCBjaGVja2VkT3V0cHV0ID0gc2VsZWN0ZWRJdGVtICYmIEFycmF5LmlzQXJyYXkoc2VsZWN0ZWRJdGVtLml0ZW1zKSA/XG4gICAgICBzZWxlY3RlZEl0ZW0uaXRlbXMgOiBbXTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHByZUNoZWNrZWRJdGVtczogY2hlY2tlZE91dHB1dCxcbiAgICB9KTtcbiAgICB0aGlzLm9uU2VsZWN0SGFuZGxlcihzZWxlY3RlZEl0ZW0ubmFtZSwgc2VsZWN0ZWRJdGVtLCBjaGVja2VkT3V0cHV0LCBmbGFncyk7XG4gIH1cblxuICBvbkNsZWFySGFuZGxlciA9ICgpID0+IHtcbiAgICBjb25zdCBncm91cE5hbWUgPSAnJztcbiAgICBjb25zdCBzZWxlY3RlZEl0ZW0gPSBbXTtcbiAgICBjb25zdCBjaGVja2VkT3V0cHV0ID0gW107XG4gICAgY29uc3QgZmxhZ3MgPSB7IGludGVyYWN0aXZlOiB0cnVlIH07XG4gICAgdGhpcy51bmNoZWNrQWxsSXRlbXMoKTtcbiAgICB0aGlzLm9uU2VsZWN0SGFuZGxlcihncm91cE5hbWUsIHNlbGVjdGVkSXRlbSwgY2hlY2tlZE91dHB1dCwgZmxhZ3MpO1xuICB9XG5cbiAgZ2V0Q2xlYXJCdXR0b24gPSAoKSA9PiB7XG4gICAgaWYgKFxuICAgICAgIXRoaXMucHJvcHMuaXNDbGVhcmFibGVcbiAgICAgIHx8ICF0aGlzLnN0YXRlLnNlbGVjdGVkXG4gICAgICB8fCAhdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtc1xuICAgICAgfHwgIXRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMubGVuZ3RoXG4gICAgKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cInJlc2V0XCJcbiAgICAgICAgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWxpc3QtY2xlYXItYnRuXCJcbiAgICAgICAgb25DbGljaz17dGhpcy5vbkNsZWFySGFuZGxlcn1cbiAgICAgID5cbiAgICAgICAgPEZhQ2xvc2UgLz5cbiAgICAgIDwvYnV0dG9uPlxuICAgICk7XG4gIH1cblxuICBnZXRJbnB1dFRleHQgPSAoKSA9PiB7XG4gICAgbGV0IHNlbGVjdGlvblRleHQgPSAnJztcblxuICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkICYmIHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMgJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICBzZWxlY3Rpb25UZXh0ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZC5uYW1lO1xuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0aW9uVGV4dDtcbiAgfVxuXG4gIGdldFZpZXcgPSAoKSA9PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMucHJvcHMudmlld09wdGlvbnM7XG4gICAgY29uc3QgcHJlQ2hlY2tlZEl0ZW1zID0gQXJyYXkuaXNBcnJheSh0aGlzLnN0YXRlLnByZUNoZWNrZWRJdGVtcykgP1xuICAgICAgdGhpcy5zdGF0ZS5wcmVDaGVja2VkSXRlbXMuc2xpY2UoKSA6IG51bGw7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPEhTVmlld1xuICAgICAgICBkYXRhU291cmNlUHJvdmlkZXI9e3RoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyfVxuICAgICAgICB7Li4ub3B0aW9uc31cbiAgICAgICAgb25DYW5jZWw9e3RoaXMub25DYW5jZWxlZFZpZXd9XG4gICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0ZWRJblZpZXd9XG4gICAgICAgIG9uSGVscD17dGhpcy5wcm9wcy5vbkhlbHB9XG4gICAgICAgIGdyb3VwTmFtZT17dGhpcy5zdGF0ZS5zZWxlY3RlZCA/IHRoaXMuc3RhdGUuc2VsZWN0ZWQubmFtZSA6ICcnfVxuICAgICAgICBwcmVDaGVja2VkSXRlbXM9e3ByZUNoZWNrZWRJdGVtc31cbiAgICAgICAgaXNDbGVhcmFibGU9e3RoaXMucHJvcHMuaXNDbGVhcmFibGV9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICBnZXRQb3BvdmVyID0gKCkgPT4ge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLnByb3BzLnBvcG92ZXJPcHRpb25zO1xuXG4gICAgcmV0dXJuICg8SFNQb3BvdmVyXG4gICAgICBkYXRhU291cmNlUHJvdmlkZXI9e3RoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyfVxuICAgICAgb25Db21wb25lbnRCbHVyPXt0aGlzLm9uUG9wb3ZlckJsdXJ9XG4gICAgICBvblNlbGVjdD17dGhpcy5vblNlbGVjdGVkSW5Qb3BvdmVyfVxuICAgICAgb25TaG91bGRPcGVuVmlldz17dGhpcy5vblNob3VsZE9wZW5WaWV3fVxuICAgICAgb25TaG91bGRDbG9zZVBvcG92ZXI9e3RoaXMub25TaG91bGRDbG9zZVBvcG92ZXJ9XG4gICAgICB7Li4ub3B0aW9uc31cbiAgICAvPik7XG4gIH1cblxuICBnZXRUb29sVGlwID0gY29udGVudCA9PiA8VG9vbHRpcCBpZD1cInRvb2x0aXBcIiBjbGFzc05hbWU9XCJocy1jb21iby1ib3gtdG9vbHRpcFwiPntjb250ZW50fTwvVG9vbHRpcD47XG5cbiAgZ2V0RGVmYXVsdFRvb2xUaXBDb250ZW50ID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5pc1NlbGVjdGVkSXRlbXMoKSkgcmV0dXJuIHRoaXMucHJvcHMubm9TZWxlY3Rpb25UZXh0O1xuICAgIGNvbnN0IHRvdGFsQ291bnQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLmxlbmd0aDtcbiAgICBjb25zdCBjb3VudCA9IHRvdGFsQ291bnQgPiBNQVhfQ09VTlRfT0ZfVE9PTFRJUF9JVEVNUyA/IE1BWF9DT1VOVF9PRl9UT09MVElQX0lURU1TIDogdG90YWxDb3VudDtcblxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5zbGljZSgwLCBjb3VudCk7XG4gICAgY29uc3QgZWxlbWVudHMgPSBPYmplY3Qua2V5cyhpdGVtcykubWFwKGkgPT4gKHRoaXMucHJvcHMudG9vbHRpcEl0ZW1SZW5kZXJGdW5jdGlvbiA/XG4gICAgICB0aGlzLnByb3BzLnRvb2x0aXBJdGVtUmVuZGVyRnVuY3Rpb24oaXRlbXNbaV0sIGksIHRoaXMuZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbikgOlxuICAgICAgdGhpcy5kZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uKGl0ZW1zW2ldLCBpKSkpO1xuICAgIGlmIChjb3VudCA8IHRvdGFsQ291bnQpIGVsZW1lbnRzLnB1c2goPHAga2V5PXtjb3VudH0+LiAuIC48L3A+KTtcblxuICAgIHJldHVybiBlbGVtZW50cztcbiAgfVxuXG4gIGdldENvdW50T2ZTZWxlY3RlZEl0ZW1zID0gKCkgPT4gKHRoaXMuaXNTZWxlY3RlZEl0ZW1zKCkgPyB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLmxlbmd0aCA6IDApO1xuXG4gIHNldFBvcG92ZXJWaXNpYmlsaXR5ID0gKGlzVmlzaWJsZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBpc1BvcG92ZXJWaXNpYmxlOiBpc1Zpc2libGUgfSk7XG4gIH1cblxuICBkZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uID0gKGl0ZW0sIGtleSkgPT4gKDxwIGtleT17a2V5fT57aXRlbS5uYW1lfTwvcD4pO1xuXG4gIGlzU2VsZWN0ZWRJdGVtcyA9ICgpID0+IChcbiAgICB0aGlzLnN0YXRlLnNlbGVjdGVkICYmIHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMgJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5sZW5ndGggPiAwXG4gICk7XG5cbiAgbG9hZERhdGEgPSAocHJvcHMpID0+IHtcbiAgICBwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIubG9hZERhdGEoKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBuZWVkVG9Mb2FkRGF0YTogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHBvcG92ZXJTaG91bGRCZUhpZGRlbiA9ICgpID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLnN0YXRlLmlzUG9wb3ZlclZpc2libGUpIHRoaXMuc2V0UG9wb3ZlclZpc2liaWxpdHkoZmFsc2UpO1xuICAgIH0sIDE1MCk7XG4gIH1cblxuICB1bmNoZWNrQWxsSXRlbXMgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwcmVDaGVja2VkSXRlbXM6IFtdLFxuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlUHJlY2hlY2tlZCA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgZGF0YVNvdXJjZVByb3ZpZGVyLCBwcmVDaGVja2VkR3JvdXBOYW1lLCBwcmVDaGVja2VkSXRlbXMgfSA9IHByb3BzO1xuXG4gICAgZGF0YVNvdXJjZVByb3ZpZGVyLnNldFByZWNoZWNrZWRJdGVtcyhwcmVDaGVja2VkSXRlbXMpO1xuXG4gICAgY29uc3QgY2hlY2tlZE91dHB1dCA9IGRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkT3V0cHV0KCk7XG4gICAgY29uc3Qgc2VsZWN0ZWRJdGVtcyA9IGRhdGFTb3VyY2VQcm92aWRlci5nZXRBbGxDaGVja2VkSXRlbXMoKTtcbiAgICBjb25zdCBjaGVja2VkID0gY2hlY2tlZE91dHB1dC5jaGVja2VkIHx8IFtdO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBuZWVkVG9VcGRhdGVQcmVDaGVja2VkOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRoaXMub25TZWxlY3RlZEluVmlldyhwcmVDaGVja2VkR3JvdXBOYW1lLCBzZWxlY3RlZEl0ZW1zLCBjaGVja2VkKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGlucHV0TmFtZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpbnB1dE9wdGlvbnMgPSB7XG4gICAgICBvbkZvY3VzOiB0aGlzLm9uSW5wdXRGb2N1cyxcbiAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnByb3BzLm5vU2VsZWN0aW9uVGV4dCxcbiAgICAgIHJlYWRPbmx5OiB0cnVlLFxuICAgICAgcmVmOiAoaW5wdXQpID0+IHsgdGhpcy5pbnB1dEVsZW1lbnQgPSBpbnB1dDsgfSxcbiAgICAgIHZhbHVlOiB0aGlzLmdldElucHV0VGV4dCgpLFxuICAgICAgb25DbGljazogdGhpcy5vbkNsaWNrSGFuZGxlcixcbiAgICB9O1xuXG4gICAgaWYgKGlucHV0TmFtZS50cmltKCkgIT09ICcnKSB7XG4gICAgICBpbnB1dE9wdGlvbnMubmFtZSA9IGlucHV0TmFtZTtcbiAgICB9XG5cbiAgICBjb25zdCBpc0J1c3kgPSB0aGlzLnByb3BzLmlzQnVzeSB8fCB0aGlzLnN0YXRlLm5lZWRUb0xvYWREYXRhO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWxpc3Qtd3JhcHBlclwiPlxuICAgICAgICA8T3ZlcmxheVRyaWdnZXJcbiAgICAgICAgICBkZWxheT17VE9PTFRJUF9ERUxBWV9NU31cbiAgICAgICAgICBwbGFjZW1lbnQ9e3RoaXMucHJvcHMudG9vbHRpcFBsYWNlbWVudH1cbiAgICAgICAgICBvdmVybGF5PXt0aGlzLmdldFRvb2xUaXAodGhpcy5nZXREZWZhdWx0VG9vbFRpcENvbnRlbnQoKSl9XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1saXN0XCI+XG4gICAgICAgICAgICA8aW5wdXQgey4uLmlucHV0T3B0aW9uc30gLz5cbiAgICAgICAgICAgIHtpc0J1c3kgP1xuICAgICAgICAgICAgICA8U3Bpbm5lciAvPiA6XG4gICAgICAgICAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICAgICAgICA8SFNCYWRnZSBjbGFzc05hbWU9XCJiYWRnZS1vcmFuZ2VcIj57dGhpcy5nZXRDb3VudE9mU2VsZWN0ZWRJdGVtcygpfTwvSFNCYWRnZT5cbiAgICAgICAgICAgICAgICB7dGhpcy5nZXRDbGVhckJ1dHRvbigpfVxuICAgICAgICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzQnVzeX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWxpc3QtYnRuXCJcbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrSGFuZGxlcn1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPEZhQ2hldnJvbkRvd24gLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L092ZXJsYXlUcmlnZ2VyPlxuICAgICAgICB7IHRoaXMuc3RhdGUuaXNQb3BvdmVyVmlzaWJsZSA/IHRoaXMuZ2V0UG9wb3ZlcigpIDogbnVsbCB9XG4gICAgICAgIHsgdGhpcy5zdGF0ZS5pc1ZpZXdWaXNpYmxlID8gdGhpcy5nZXRWaWV3KCkgOiBudWxsIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuSGllcmFyY2h5U2VsZWN0b3JDb21ib0JveC5wcm9wVHlwZXMgPSB7XG4gIGRhdGFTb3VyY2VQcm92aWRlcjogZGF0YVNvdXJjZVByb3ZpZGVyVHlwZS5pc1JlcXVpcmVkLFxuICBoaWRlT25Qb3BvdmVyQmx1cjogUHJvcFR5cGVzLmJvb2wsXG4gIGlucHV0TmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgbm9TZWxlY3Rpb25UZXh0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICBwb3BvdmVyVmlzaWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gIHBvcG92ZXJPcHRpb25zOiBwb3BvdmVyT3B0aW9uc1R5cGUuaXNSZXF1aXJlZCxcbiAgcHJlQ2hlY2tlZEl0ZW1zOiBwcmVDaGVja2VkSXRlbXNMaXN0U2hhcGUsXG4gIHByZUNoZWNrZWRHcm91cE5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHRvb2x0aXBQbGFjZW1lbnQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHZpZXdPcHRpb25zOiB2aWV3T3B0aW9uc1R5cGUuaXNSZXF1aXJlZCxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBvbkhlbHA6IFByb3BUeXBlcy5mdW5jLFxuICB0b29sdGlwSXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgaXNDbGVhcmFibGU6IFByb3BUeXBlcy5ib29sLFxuICBpc0J1c3k6IFByb3BUeXBlcy5ib29sLFxufTtcblxuSGllcmFyY2h5U2VsZWN0b3JDb21ib0JveC5kZWZhdWx0UHJvcHMgPSB7XG4gIGhpZGVPblBvcG92ZXJCbHVyOiB0cnVlLFxuICBpbnB1dE5hbWU6ICcnLFxuICBub1NlbGVjdGlvblRleHQ6ICdOb3RoaW5nIHNlbGVjdGVkLi4uJyxcbiAgcG9wb3ZlclZpc2libGU6IGZhbHNlLFxuICBwcmVDaGVja2VkSXRlbXM6IG51bGwsXG4gIHByZUNoZWNrZWRHcm91cE5hbWU6ICdEZWZhdWx0IGdyb3VwJyxcbiAgdG9vbHRpcFBsYWNlbWVudDogJ2JvdHRvbScsXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgb25IZWxwOiAoKSA9PiB7fSxcbiAgdG9vbHRpcEl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcbiAgaXNDbGVhcmFibGU6IGZhbHNlLFxuICBpc0J1c3k6IGZhbHNlLFxufTtcbiJdfQ==