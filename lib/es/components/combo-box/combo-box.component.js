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
    var checkedOutput = selectedItem && Array.isArray(selectedItem.items) ? selectedItem.items : [];
    _this3.setState({
      preCheckedItems: checkedOutput
    });
    _this3.onSelectHandler(selectedItem.name, selectedItem, checkedOutput);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbWJvLWJveC9jb21iby1ib3guY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlRvb2x0aXAiLCJPdmVybGF5VHJpZ2dlciIsIlByb3BUeXBlcyIsIkZhQ2hldnJvbkRvd24iLCJkYXRhU291cmNlUHJvdmlkZXJUeXBlIiwicHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlIiwicG9wb3Zlck9wdGlvbnNUeXBlIiwidmlld09wdGlvbnNUeXBlIiwiU3Bpbm5lciIsIkhTUG9wb3ZlciIsIkhTVmlldyIsIkhTQmFkZ2UiLCJUT09MVElQX0RFTEFZX01TIiwiTUFYX0NPVU5UX09GX1RPT0xUSVBfSVRFTVMiLCJIaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94IiwicHJvcHMiLCJpc0RhdGFMb2FkZWQiLCJkYXRhU291cmNlUHJvdmlkZXIiLCJpc0xvYWRlZCIsIm5lZWRUb1VwZGF0ZVByZUNoZWNrZWQiLCJwcmVDaGVja2VkSXRlbXMiLCJsZW5ndGgiLCJuZWVkVG9Mb2FkRGF0YSIsInN0YXRlIiwic2VsZWN0ZWQiLCJpc1BvcG92ZXJWaXNpYmxlIiwicG9wb3ZlclZpc2libGUiLCJpc1ZpZXdWaXNpYmxlIiwiY29tcG9uZW50V2lsbE1vdW50IiwibG9hZERhdGEiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwic2V0U3RhdGUiLCJjb21wb25lbnRXaWxsVXBkYXRlIiwibmV4dFN0YXRlIiwidXBkYXRlUHJlY2hlY2tlZCIsInJlbmRlciIsImlucHV0TmFtZSIsImlucHV0T3B0aW9ucyIsIm9uRm9jdXMiLCJvbklucHV0Rm9jdXMiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJub1NlbGVjdGlvblRleHQiLCJyZWFkT25seSIsInJlZiIsImlucHV0IiwiaW5wdXRFbGVtZW50IiwidmFsdWUiLCJnZXRJbnB1dFRleHQiLCJ0cmltIiwibmFtZSIsInRvb2x0aXBQbGFjZW1lbnQiLCJnZXRUb29sVGlwIiwiZ2V0RGVmYXVsdFRvb2xUaXBDb250ZW50IiwiZ2V0Q291bnRPZlNlbGVjdGVkSXRlbXMiLCJvbkNsaWNrSGFuZGxlciIsImdldFBvcG92ZXIiLCJnZXRWaWV3IiwiUHVyZUNvbXBvbmVudCIsInNldFBvcG92ZXJWaXNpYmlsaXR5IiwiYmx1ciIsIm9uU2VsZWN0SGFuZGxlciIsImdyb3VwTmFtZSIsInNlbGVjdGVkSXRlbSIsImNoZWNrZWRPdXRwdXQiLCJpdGVtcyIsIm1hcCIsIk9iamVjdCIsImFzc2lnbiIsIml0ZW0iLCJvblNlbGVjdCIsIm9uUG9wb3ZlckJsdXIiLCJoaWRlT25Qb3BvdmVyQmx1ciIsInBvcG92ZXJTaG91bGRCZUhpZGRlbiIsIm9uU2hvdWxkT3BlblZpZXciLCJvblNob3VsZENsb3NlUG9wb3ZlciIsIm9uQ2FuY2VsZWRWaWV3Iiwib25TZWxlY3RlZEluVmlldyIsInNlbGVjdGVkSXRlbXMiLCJvblNlbGVjdGVkSW5Qb3BvdmVyIiwidW5jaGVja0FsbEl0ZW1zIiwiQXJyYXkiLCJpc0FycmF5Iiwic2VsZWN0aW9uVGV4dCIsIm9wdGlvbnMiLCJ2aWV3T3B0aW9ucyIsInNsaWNlIiwib25IZWxwIiwicG9wb3Zlck9wdGlvbnMiLCJjb250ZW50IiwiaXNTZWxlY3RlZEl0ZW1zIiwidG90YWxDb3VudCIsImNvdW50IiwiZWxlbWVudHMiLCJrZXlzIiwidG9vbHRpcEl0ZW1SZW5kZXJGdW5jdGlvbiIsImkiLCJkZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uIiwicHVzaCIsImlzVmlzaWJsZSIsImtleSIsInRoZW4iLCJzZXRUaW1lb3V0IiwicHJlQ2hlY2tlZEdyb3VwTmFtZSIsInNldFByZWNoZWNrZWRJdGVtcyIsImdldENoZWNrZWRPdXRwdXQiLCJnZXRBbGxDaGVja2VkSXRlbXMiLCJjaGVja2VkIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0FBRUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLFNBQVNDLE9BQVQsRUFBa0JDLGNBQWxCLFFBQXdDLGlCQUF4QztBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxhQUFQLE1BQTBCLGlDQUExQjtBQUNBLFNBQVNDLHNCQUFULFFBQXVDLHNCQUF2QztBQUNBLFNBQVNDLHdCQUFULEVBQW1DQyxrQkFBbkMsRUFBdURDLGVBQXZELFFBQThFLGFBQTlFO0FBQ0EsT0FBT0MsT0FBUCxNQUFvQixZQUFwQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxNQUFQLE1BQW1CLFNBQW5CO0FBQ0EsT0FBT0MsT0FBUCxNQUFvQixVQUFwQjs7QUFHQSxTQUFTQyxnQkFBVCxFQUEyQkMsMEJBQTNCLFFBQTZELGFBQTdEO0FBQ0EsT0FBTyxrQkFBUDs7SUFFcUJDLHlCOzs7QUFDbkIscUNBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsZ0NBQU1BLEtBQU4sQ0FEaUI7O0FBQUE7O0FBR2pCLFFBQU1DLGVBQWVELE1BQU1FLGtCQUFOLENBQXlCQyxRQUE5QztBQUNBLFFBQU1DLHlCQUF5QkosTUFBTUssZUFBTixJQUF5QkwsTUFBTUssZUFBTixDQUFzQkMsTUFBOUU7QUFDQSxRQUFNQyxpQkFBaUIsQ0FBQ04sWUFBRCxJQUFpQkcsc0JBQXhDOztBQUVBLFVBQUtJLEtBQUwsR0FBYTtBQUNYRCxvQ0FEVztBQUVYSCxvREFGVztBQUdYQyx1QkFBaUJMLE1BQU1LLGVBSFo7QUFJWEksZ0JBQVUsSUFKQztBQUtYQyx3QkFBa0JWLE1BQU1XLGNBTGI7QUFNWEMscUJBQWU7QUFOSixLQUFiO0FBUGlCO0FBZWxCOztzQ0FFREMsa0IsaUNBQXFCO0FBQUEsUUFDWE4sY0FEVyxHQUNRLEtBQUtDLEtBRGIsQ0FDWEQsY0FEVzs7QUFFbkIsUUFBSUEsY0FBSixFQUFvQjtBQUNsQixXQUFLTyxRQUFMLENBQWMsS0FBS2QsS0FBbkI7QUFDRDtBQUNGLEc7O3NDQUVEZSx5QixzQ0FBMEJDLFMsRUFBVztBQUFBLGlCQUNhLEtBQUtoQixLQURsQjtBQUFBLFFBQzNCRSxrQkFEMkIsVUFDM0JBLGtCQUQyQjtBQUFBLFFBQ1BHLGVBRE8sVUFDUEEsZUFETzs7O0FBR25DLFFBQUlILHVCQUF1QmMsVUFBVWQsa0JBQXJDLEVBQXlEO0FBQ3ZELFdBQUtlLFFBQUwsQ0FBYztBQUNaVix3QkFBZ0I7QUFESixPQUFkO0FBR0Q7O0FBRUQsUUFBSUYsb0JBQW9CVyxVQUFVWCxlQUFsQyxFQUFtRDtBQUNqRCxXQUFLWSxRQUFMLENBQWM7QUFDWmIsZ0NBQXdCO0FBRFosT0FBZDtBQUdEO0FBQ0YsRzs7c0NBRURjLG1CLGdDQUFvQkYsUyxFQUFXRyxTLEVBQVc7QUFBQSxRQUNoQ1osY0FEZ0MsR0FDV1ksU0FEWCxDQUNoQ1osY0FEZ0M7QUFBQSxRQUNoQkgsc0JBRGdCLEdBQ1dlLFNBRFgsQ0FDaEJmLHNCQURnQjs7QUFFeEMsUUFBSUcsY0FBSixFQUFvQjtBQUNsQixXQUFLTyxRQUFMLENBQWNFLFNBQWQ7QUFDRCxLQUZELE1BRU8sSUFBSVosc0JBQUosRUFBNEI7QUFDakMsV0FBS2dCLGdCQUFMLENBQXNCSixTQUF0QjtBQUNEO0FBQ0YsRzs7c0NBeUtESyxNLHFCQUFTO0FBQUE7O0FBQUEsUUFDQ0MsU0FERCxHQUNlLEtBQUt0QixLQURwQixDQUNDc0IsU0FERDs7QUFFUCxRQUFNQyxlQUFlO0FBQ25CQyxlQUFTLEtBQUtDLFlBREs7QUFFbkJDLFlBQU0sTUFGYTtBQUduQkMsbUJBQWEsS0FBSzNCLEtBQUwsQ0FBVzRCLGVBSEw7QUFJbkJDLGdCQUFVLElBSlM7QUFLbkJDLFdBQUssYUFBQ0MsS0FBRCxFQUFXO0FBQUUsZUFBS0MsWUFBTCxHQUFvQkQsS0FBcEI7QUFBNEIsT0FMM0I7QUFNbkJFLGFBQU8sS0FBS0MsWUFBTDtBQU5ZLEtBQXJCOztBQVNBLFFBQUlaLFVBQVVhLElBQVYsT0FBcUIsRUFBekIsRUFBNkI7QUFDM0JaLG1CQUFhYSxJQUFiLEdBQW9CZCxTQUFwQjtBQUNEOztBQUVELFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSxvQ0FBZjtBQUNFO0FBQUMsc0JBQUQ7QUFBQTtBQUNFLGlCQUFPekIsZ0JBRFQ7QUFFRSxxQkFBVyxLQUFLRyxLQUFMLENBQVdxQyxnQkFGeEI7QUFHRSxtQkFBUyxLQUFLQyxVQUFMLENBQWdCLEtBQUtDLHdCQUFMLEVBQWhCO0FBSFg7QUFLRTtBQUFBO0FBQUEsWUFBSyxXQUFVLDRCQUFmO0FBQ0UsdUNBQVdoQixZQUFYLENBREY7QUFFRyxlQUFLZixLQUFMLENBQVdELGNBQVgsR0FDQyxvQkFBQyxPQUFELE9BREQsR0FFQztBQUFDLG1CQUFEO0FBQUEsY0FBUyxXQUFVLGNBQW5CO0FBQW1DLGlCQUFLaUMsdUJBQUw7QUFBbkMsV0FKSjtBQU1FO0FBQUE7QUFBQSxjQUFRLE1BQUssUUFBYixFQUFzQixVQUFVLEtBQUtoQyxLQUFMLENBQVdELGNBQTNDLEVBQTJELFdBQVUsZ0NBQXJFLEVBQXNHLFNBQVMsS0FBS2tDLGNBQXBIO0FBQW9JLGdDQUFDLGFBQUQ7QUFBcEk7QUFORjtBQUxGLE9BREY7QUFlSSxXQUFLakMsS0FBTCxDQUFXRSxnQkFBWCxHQUE4QixLQUFLZ0MsVUFBTCxFQUE5QixHQUFrRCxJQWZ0RDtBQWdCSSxXQUFLbEMsS0FBTCxDQUFXSSxhQUFYLEdBQTJCLEtBQUsrQixPQUFMLEVBQTNCLEdBQTRDO0FBaEJoRCxLQURGO0FBb0JELEc7OztFQTVQb0QzRCxNQUFNNEQsYTs7O09Ba0QzREgsYyxHQUFpQixZQUFNO0FBQ3JCLFdBQUtJLG9CQUFMLENBQTBCLENBQUMsT0FBS3JDLEtBQUwsQ0FBV0UsZ0JBQXRDO0FBQ0QsRzs7T0FFRGUsWSxHQUFlLFlBQU07QUFDbkIsV0FBS08sWUFBTCxDQUFrQmMsSUFBbEI7QUFDRCxHOztPQUVEQyxlLEdBQWtCLFVBQUNDLFNBQUQsRUFBWUMsWUFBWixFQUEwQkMsYUFBMUIsRUFBNEM7QUFDNUQsV0FBS2pDLFFBQUwsQ0FBYztBQUNaUixnQkFBVXdDLFlBREU7QUFFWnZDLHdCQUFrQixLQUZOO0FBR1pFLHFCQUFlO0FBSEgsS0FBZDtBQUtBLFFBQU11QyxRQUFRRCxnQkFBZ0JBLGNBQWNFLEdBQWQsQ0FBa0I7QUFBQSxhQUFRQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQkMsSUFBbEIsQ0FBUjtBQUFBLEtBQWxCLENBQWhCLEdBQXFFLEVBQW5GOztBQUVBLFdBQUt2RCxLQUFMLENBQVd3RCxRQUFYLENBQW9CTCxLQUFwQixFQUEyQkgsU0FBM0I7QUFDRCxHOztPQUVEUyxhLEdBQWdCLFlBQU07QUFDcEIsUUFBSSxPQUFLekQsS0FBTCxDQUFXMEQsaUJBQWYsRUFBa0M7QUFDaEMsYUFBS0MscUJBQUw7QUFDRDtBQUNGLEc7O09BRURDLGdCLEdBQW1CLFlBQU07QUFDdkIsV0FBSzNDLFFBQUwsQ0FBYyxFQUFFTCxlQUFlLElBQWpCLEVBQWQ7QUFDRCxHOztPQUVEaUQsb0IsR0FBdUIsWUFBTTtBQUMzQixXQUFLNUMsUUFBTCxDQUFjO0FBQ1pQLHdCQUFrQjtBQUROLEtBQWQ7QUFHRCxHOztPQUVEb0QsYyxHQUFpQixZQUFNO0FBQ3JCLFdBQUs3QyxRQUFMLENBQWM7QUFDWlAsd0JBQWtCLEtBRE47QUFFWkUscUJBQWU7QUFGSCxLQUFkO0FBSUQsRzs7T0FFRG1ELGdCLEdBQW1CLFVBQUNmLFNBQUQsRUFBWWdCLGFBQVosRUFBMkJkLGFBQTNCLEVBQTZDO0FBQzlELFFBQU1ELGVBQWU7QUFDbkJiLFlBQU1ZLFNBRGE7QUFFbkJHLGFBQU9hO0FBRlksS0FBckI7QUFJQSxXQUFLL0MsUUFBTCxDQUFjO0FBQ1paLHVCQUFpQjZDO0FBREwsS0FBZDtBQUdBLFdBQUtILGVBQUwsQ0FBcUJDLFNBQXJCLEVBQWdDQyxZQUFoQyxFQUE4Q0MsYUFBOUM7QUFDRCxHOztPQUVEZSxtQixHQUFzQixVQUFDaEIsWUFBRCxFQUFrQjtBQUN0QyxXQUFLaUIsZUFBTDtBQUNBLFFBQU1oQixnQkFBZ0JELGdCQUFnQmtCLE1BQU1DLE9BQU4sQ0FBY25CLGFBQWFFLEtBQTNCLENBQWhCLEdBQ3BCRixhQUFhRSxLQURPLEdBQ0MsRUFEdkI7QUFFQSxXQUFLbEMsUUFBTCxDQUFjO0FBQ1paLHVCQUFpQjZDO0FBREwsS0FBZDtBQUdBLFdBQUtILGVBQUwsQ0FBcUJFLGFBQWFiLElBQWxDLEVBQXdDYSxZQUF4QyxFQUFzREMsYUFBdEQ7QUFDRCxHOztPQUVEaEIsWSxHQUFlLFlBQU07QUFDbkIsUUFBSW1DLGdCQUFnQixFQUFwQjs7QUFFQSxRQUFJLE9BQUs3RCxLQUFMLENBQVdDLFFBQVgsSUFBdUIsT0FBS0QsS0FBTCxDQUFXQyxRQUFYLENBQW9CMEMsS0FBM0MsSUFBb0QsT0FBSzNDLEtBQUwsQ0FBV0MsUUFBWCxDQUFvQjBDLEtBQXBCLENBQTBCN0MsTUFBMUIsR0FBbUMsQ0FBM0YsRUFBOEY7QUFDNUYrRCxzQkFBZ0IsT0FBSzdELEtBQUwsQ0FBV0MsUUFBWCxDQUFvQjJCLElBQXBDO0FBQ0Q7QUFDRCxXQUFPaUMsYUFBUDtBQUNELEc7O09BRUQxQixPLEdBQVUsWUFBTTtBQUNkLFFBQU0yQixVQUFVLE9BQUt0RSxLQUFMLENBQVd1RSxXQUEzQjtBQUNBLFFBQU1sRSxrQkFBa0I4RCxNQUFNQyxPQUFOLENBQWMsT0FBSzVELEtBQUwsQ0FBV0gsZUFBekIsSUFDdEIsT0FBS0csS0FBTCxDQUFXSCxlQUFYLENBQTJCbUUsS0FBM0IsRUFEc0IsR0FDZSxJQUR2Qzs7QUFHQSxXQUNFLG9CQUFDLE1BQUQ7QUFDRSwwQkFBb0IsT0FBS3hFLEtBQUwsQ0FBV0U7QUFEakMsT0FFTW9FLE9BRk47QUFHRSxnQkFBVSxPQUFLUixjQUhqQjtBQUlFLGdCQUFVLE9BQUtDLGdCQUpqQjtBQUtFLGNBQVEsT0FBSy9ELEtBQUwsQ0FBV3lFLE1BTHJCO0FBTUUsaUJBQVcsT0FBS2pFLEtBQUwsQ0FBV0MsUUFBWCxHQUFzQixPQUFLRCxLQUFMLENBQVdDLFFBQVgsQ0FBb0IyQixJQUExQyxHQUFpRCxFQU45RDtBQU9FLHVCQUFpQi9CO0FBUG5CLE9BREY7QUFXRCxHOztPQUVEcUMsVSxHQUFhLFlBQU07QUFDakIsUUFBTTRCLFVBQVUsT0FBS3RFLEtBQUwsQ0FBVzBFLGNBQTNCOztBQUVBLFdBQVEsb0JBQUMsU0FBRDtBQUNOLDBCQUFvQixPQUFLMUUsS0FBTCxDQUFXRSxrQkFEekI7QUFFTix1QkFBaUIsT0FBS3VELGFBRmhCO0FBR04sZ0JBQVUsT0FBS1EsbUJBSFQ7QUFJTix3QkFBa0IsT0FBS0wsZ0JBSmpCO0FBS04sNEJBQXNCLE9BQUtDO0FBTHJCLE9BTUZTLE9BTkUsRUFBUjtBQVFELEc7O09BRURoQyxVLEdBQWE7QUFBQSxXQUFXO0FBQUMsYUFBRDtBQUFBLFFBQVMsSUFBRyxTQUFaLEVBQXNCLFdBQVUsc0JBQWhDO0FBQXdEcUM7QUFBeEQsS0FBWDtBQUFBLEc7O09BRWJwQyx3QixHQUEyQixZQUFNO0FBQy9CLFFBQUksQ0FBQyxPQUFLcUMsZUFBTCxFQUFMLEVBQTZCLE9BQU8sT0FBSzVFLEtBQUwsQ0FBVzRCLGVBQWxCO0FBQzdCLFFBQU1pRCxhQUFhLE9BQUtyRSxLQUFMLENBQVdDLFFBQVgsQ0FBb0IwQyxLQUFwQixDQUEwQjdDLE1BQTdDO0FBQ0EsUUFBTXdFLFFBQVFELGFBQWEvRSwwQkFBYixHQUEwQ0EsMEJBQTFDLEdBQXVFK0UsVUFBckY7O0FBRUEsUUFBTTFCLFFBQVEsT0FBSzNDLEtBQUwsQ0FBV0MsUUFBWCxDQUFvQjBDLEtBQXBCLENBQTBCcUIsS0FBMUIsQ0FBZ0MsQ0FBaEMsRUFBbUNNLEtBQW5DLENBQWQ7QUFDQSxRQUFNQyxXQUFXMUIsT0FBTzJCLElBQVAsQ0FBWTdCLEtBQVosRUFBbUJDLEdBQW5CLENBQXVCO0FBQUEsYUFBTSxPQUFLcEQsS0FBTCxDQUFXaUYseUJBQVgsR0FDNUMsT0FBS2pGLEtBQUwsQ0FBV2lGLHlCQUFYLENBQXFDOUIsTUFBTStCLENBQU4sQ0FBckMsRUFBK0NBLENBQS9DLEVBQWtELE9BQUtDLHlCQUF2RCxDQUQ0QyxHQUU1QyxPQUFLQSx5QkFBTCxDQUErQmhDLE1BQU0rQixDQUFOLENBQS9CLEVBQXlDQSxDQUF6QyxDQUZzQztBQUFBLEtBQXZCLENBQWpCO0FBR0EsUUFBSUosUUFBUUQsVUFBWixFQUF3QkUsU0FBU0ssSUFBVCxDQUFjO0FBQUE7QUFBQSxRQUFHLEtBQUtOLEtBQVI7QUFBQTtBQUFBLEtBQWQ7O0FBRXhCLFdBQU9DLFFBQVA7QUFDRCxHOztPQUVEdkMsdUIsR0FBMEI7QUFBQSxXQUFPLE9BQUtvQyxlQUFMLEtBQXlCLE9BQUtwRSxLQUFMLENBQVdDLFFBQVgsQ0FBb0IwQyxLQUFwQixDQUEwQjdDLE1BQW5ELEdBQTRELENBQW5FO0FBQUEsRzs7T0FFMUJ1QyxvQixHQUF1QixVQUFDd0MsU0FBRCxFQUFlO0FBQ3BDLFdBQUtwRSxRQUFMLENBQWMsRUFBRVAsa0JBQWtCMkUsU0FBcEIsRUFBZDtBQUNELEc7O09BRURGLHlCLEdBQTRCLFVBQUM1QixJQUFELEVBQU8rQixHQUFQO0FBQUEsV0FBZ0I7QUFBQTtBQUFBLFFBQUcsS0FBS0EsR0FBUjtBQUFjL0IsV0FBS25CO0FBQW5CLEtBQWhCO0FBQUEsRzs7T0FFNUJ3QyxlLEdBQWtCO0FBQUEsV0FDaEIsT0FBS3BFLEtBQUwsQ0FBV0MsUUFBWCxJQUF1QixPQUFLRCxLQUFMLENBQVdDLFFBQVgsQ0FBb0IwQyxLQUEzQyxJQUFvRCxPQUFLM0MsS0FBTCxDQUFXQyxRQUFYLENBQW9CMEMsS0FBcEIsQ0FBMEI3QyxNQUExQixHQUFtQyxDQUR2RTtBQUFBLEc7O09BSWxCUSxRLEdBQVcsVUFBQ2QsS0FBRCxFQUFXO0FBQ3BCQSxVQUFNRSxrQkFBTixDQUF5QlksUUFBekIsR0FBb0N5RSxJQUFwQyxDQUF5QyxZQUFNO0FBQzdDLGFBQUt0RSxRQUFMLENBQWM7QUFDWlYsd0JBQWdCO0FBREosT0FBZDtBQUdELEtBSkQ7QUFLRCxHOztPQUVEb0QscUIsR0FBd0IsWUFBTTtBQUM1QjZCLGVBQVcsWUFBTTtBQUNmLFVBQUksT0FBS2hGLEtBQUwsQ0FBV0UsZ0JBQWYsRUFBaUMsT0FBS21DLG9CQUFMLENBQTBCLEtBQTFCO0FBQ2xDLEtBRkQsRUFFRyxHQUZIO0FBR0QsRzs7T0FFRHFCLGUsR0FBa0IsWUFBTTtBQUN0QixXQUFLakQsUUFBTCxDQUFjO0FBQ1paLHVCQUFpQjtBQURMLEtBQWQ7QUFHRCxHOztPQUVEZSxnQixHQUFtQixVQUFDcEIsS0FBRCxFQUFXO0FBQUEsUUFDcEJFLGtCQURvQixHQUN5Q0YsS0FEekMsQ0FDcEJFLGtCQURvQjtBQUFBLFFBQ0F1RixtQkFEQSxHQUN5Q3pGLEtBRHpDLENBQ0F5RixtQkFEQTtBQUFBLFFBQ3FCcEYsZUFEckIsR0FDeUNMLEtBRHpDLENBQ3FCSyxlQURyQjs7O0FBRzVCSCx1QkFBbUJ3RixrQkFBbkIsQ0FBc0NyRixlQUF0Qzs7QUFFQSxRQUFNNkMsZ0JBQWdCaEQsbUJBQW1CeUYsZ0JBQW5CLEVBQXRCO0FBQ0EsUUFBTTNCLGdCQUFnQjlELG1CQUFtQjBGLGtCQUFuQixFQUF0QjtBQUNBLFFBQU1DLFVBQVUzQyxjQUFjMkMsT0FBZCxJQUF5QixFQUF6Qzs7QUFFQSxXQUFLNUUsUUFBTCxDQUFjO0FBQ1piLDhCQUF3QjtBQURaLEtBQWQ7O0FBSUEsV0FBSzJELGdCQUFMLENBQXNCMEIsbUJBQXRCLEVBQTJDekIsYUFBM0MsRUFBMEQ2QixPQUExRDtBQUNELEc7O1NBdk5rQjlGLHlCOzs7QUErUXJCQSwwQkFBMEIrRixZQUExQixHQUF5QztBQUN2Q3BDLHFCQUFtQixJQURvQjtBQUV2Q3BDLGFBQVcsRUFGNEI7QUFHdkNNLG1CQUFpQixvQkFIc0I7QUFJdkNqQixrQkFBZ0IsS0FKdUI7QUFLdkNOLG1CQUFpQixJQUxzQjtBQU12Q29GLHVCQUFxQixlQU5rQjtBQU92Q3BELG9CQUFrQixRQVBxQjtBQVF2Q21CLFlBQVUsb0JBQU0sQ0FBRSxDQVJxQjtBQVN2Q2lCLFVBQVEsa0JBQU0sQ0FBRSxDQVR1QjtBQVV2Q1EsNkJBQTJCO0FBVlksQ0FBekMiLCJmaWxlIjoiY29tYm8tYm94LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXVudXNlZC1zdGF0ZSAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgVG9vbHRpcCwgT3ZlcmxheVRyaWdnZXIgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBGYUNoZXZyb25Eb3duIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9jaGV2cm9uLWRvd24nO1xuaW1wb3J0IHsgZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3R5cGVzJztcbmltcG9ydCB7IHByZUNoZWNrZWRJdGVtc0xpc3RTaGFwZSwgcG9wb3Zlck9wdGlvbnNUeXBlLCB2aWV3T3B0aW9uc1R5cGUgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgU3Bpbm5lciBmcm9tICcuLi9zcGlubmVyJztcbmltcG9ydCBIU1BvcG92ZXIgZnJvbSAnLi4vcG9wb3Zlcic7XG5pbXBvcnQgSFNWaWV3IGZyb20gJy4uL3ZpZXcnO1xuaW1wb3J0IEhTQmFkZ2UgZnJvbSAnLi4vYmFkZ2UnO1xuXG5cbmltcG9ydCB7IFRPT0xUSVBfREVMQVlfTVMsIE1BWF9DT1VOVF9PRl9UT09MVElQX0lURU1TIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0ICcuL2NvbWJvLWJveC5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5U2VsZWN0b3JDb21ib0JveCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIGNvbnN0IGlzRGF0YUxvYWRlZCA9IHByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5pc0xvYWRlZDtcbiAgICBjb25zdCBuZWVkVG9VcGRhdGVQcmVDaGVja2VkID0gcHJvcHMucHJlQ2hlY2tlZEl0ZW1zICYmIHByb3BzLnByZUNoZWNrZWRJdGVtcy5sZW5ndGg7XG4gICAgY29uc3QgbmVlZFRvTG9hZERhdGEgPSAhaXNEYXRhTG9hZGVkICYmIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQ7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbmVlZFRvTG9hZERhdGEsXG4gICAgICBuZWVkVG9VcGRhdGVQcmVDaGVja2VkLFxuICAgICAgcHJlQ2hlY2tlZEl0ZW1zOiBwcm9wcy5wcmVDaGVja2VkSXRlbXMsXG4gICAgICBzZWxlY3RlZDogbnVsbCxcbiAgICAgIGlzUG9wb3ZlclZpc2libGU6IHByb3BzLnBvcG92ZXJWaXNpYmxlLFxuICAgICAgaXNWaWV3VmlzaWJsZTogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICBjb25zdCB7IG5lZWRUb0xvYWREYXRhIH0gPSB0aGlzLnN0YXRlO1xuICAgIGlmIChuZWVkVG9Mb2FkRGF0YSkge1xuICAgICAgdGhpcy5sb2FkRGF0YSh0aGlzLnByb3BzKTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGNvbnN0IHsgZGF0YVNvdXJjZVByb3ZpZGVyLCBwcmVDaGVja2VkSXRlbXMgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoZGF0YVNvdXJjZVByb3ZpZGVyICE9PSBuZXh0UHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbmVlZFRvTG9hZERhdGE6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocHJlQ2hlY2tlZEl0ZW1zICE9PSBuZXh0UHJvcHMucHJlQ2hlY2tlZEl0ZW1zKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZDogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICBjb25zdCB7IG5lZWRUb0xvYWREYXRhLCBuZWVkVG9VcGRhdGVQcmVDaGVja2VkIH0gPSBuZXh0U3RhdGU7XG4gICAgaWYgKG5lZWRUb0xvYWREYXRhKSB7XG4gICAgICB0aGlzLmxvYWREYXRhKG5leHRQcm9wcyk7XG4gICAgfSBlbHNlIGlmIChuZWVkVG9VcGRhdGVQcmVDaGVja2VkKSB7XG4gICAgICB0aGlzLnVwZGF0ZVByZWNoZWNrZWQobmV4dFByb3BzKTtcbiAgICB9XG4gIH1cblxuICBvbkNsaWNrSGFuZGxlciA9ICgpID0+IHtcbiAgICB0aGlzLnNldFBvcG92ZXJWaXNpYmlsaXR5KCF0aGlzLnN0YXRlLmlzUG9wb3ZlclZpc2libGUpO1xuICB9XG5cbiAgb25JbnB1dEZvY3VzID0gKCkgPT4ge1xuICAgIHRoaXMuaW5wdXRFbGVtZW50LmJsdXIoKTtcbiAgfVxuXG4gIG9uU2VsZWN0SGFuZGxlciA9IChncm91cE5hbWUsIHNlbGVjdGVkSXRlbSwgY2hlY2tlZE91dHB1dCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWQ6IHNlbGVjdGVkSXRlbSxcbiAgICAgIGlzUG9wb3ZlclZpc2libGU6IGZhbHNlLFxuICAgICAgaXNWaWV3VmlzaWJsZTogZmFsc2UsXG4gICAgfSk7XG4gICAgY29uc3QgaXRlbXMgPSBjaGVja2VkT3V0cHV0ID8gY2hlY2tlZE91dHB1dC5tYXAoaXRlbSA9PiBPYmplY3QuYXNzaWduKHt9LCBpdGVtKSkgOiBbXTtcblxuICAgIHRoaXMucHJvcHMub25TZWxlY3QoaXRlbXMsIGdyb3VwTmFtZSk7XG4gIH1cblxuICBvblBvcG92ZXJCbHVyID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmhpZGVPblBvcG92ZXJCbHVyKSB7XG4gICAgICB0aGlzLnBvcG92ZXJTaG91bGRCZUhpZGRlbigpO1xuICAgIH1cbiAgfVxuXG4gIG9uU2hvdWxkT3BlblZpZXcgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlzVmlld1Zpc2libGU6IHRydWUgfSk7XG4gIH1cblxuICBvblNob3VsZENsb3NlUG9wb3ZlciA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlzUG9wb3ZlclZpc2libGU6IGZhbHNlLFxuICAgIH0pO1xuICB9XG5cbiAgb25DYW5jZWxlZFZpZXcgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpc1BvcG92ZXJWaXNpYmxlOiBmYWxzZSxcbiAgICAgIGlzVmlld1Zpc2libGU6IGZhbHNlLFxuICAgIH0pO1xuICB9XG5cbiAgb25TZWxlY3RlZEluVmlldyA9IChncm91cE5hbWUsIHNlbGVjdGVkSXRlbXMsIGNoZWNrZWRPdXRwdXQpID0+IHtcbiAgICBjb25zdCBzZWxlY3RlZEl0ZW0gPSB7XG4gICAgICBuYW1lOiBncm91cE5hbWUsXG4gICAgICBpdGVtczogc2VsZWN0ZWRJdGVtcyxcbiAgICB9O1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcHJlQ2hlY2tlZEl0ZW1zOiBjaGVja2VkT3V0cHV0LFxuICAgIH0pO1xuICAgIHRoaXMub25TZWxlY3RIYW5kbGVyKGdyb3VwTmFtZSwgc2VsZWN0ZWRJdGVtLCBjaGVja2VkT3V0cHV0KTtcbiAgfVxuXG4gIG9uU2VsZWN0ZWRJblBvcG92ZXIgPSAoc2VsZWN0ZWRJdGVtKSA9PiB7XG4gICAgdGhpcy51bmNoZWNrQWxsSXRlbXMoKTtcbiAgICBjb25zdCBjaGVja2VkT3V0cHV0ID0gc2VsZWN0ZWRJdGVtICYmIEFycmF5LmlzQXJyYXkoc2VsZWN0ZWRJdGVtLml0ZW1zKSA/XG4gICAgICBzZWxlY3RlZEl0ZW0uaXRlbXMgOiBbXTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHByZUNoZWNrZWRJdGVtczogY2hlY2tlZE91dHB1dCxcbiAgICB9KTtcbiAgICB0aGlzLm9uU2VsZWN0SGFuZGxlcihzZWxlY3RlZEl0ZW0ubmFtZSwgc2VsZWN0ZWRJdGVtLCBjaGVja2VkT3V0cHV0KTtcbiAgfVxuXG4gIGdldElucHV0VGV4dCA9ICgpID0+IHtcbiAgICBsZXQgc2VsZWN0aW9uVGV4dCA9ICcnO1xuXG4gICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWQgJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcyAmJiB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgIHNlbGVjdGlvblRleHQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkLm5hbWU7XG4gICAgfVxuICAgIHJldHVybiBzZWxlY3Rpb25UZXh0O1xuICB9XG5cbiAgZ2V0VmlldyA9ICgpID0+IHtcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5wcm9wcy52aWV3T3B0aW9ucztcbiAgICBjb25zdCBwcmVDaGVja2VkSXRlbXMgPSBBcnJheS5pc0FycmF5KHRoaXMuc3RhdGUucHJlQ2hlY2tlZEl0ZW1zKSA/XG4gICAgICB0aGlzLnN0YXRlLnByZUNoZWNrZWRJdGVtcy5zbGljZSgpIDogbnVsbDtcblxuICAgIHJldHVybiAoXG4gICAgICA8SFNWaWV3XG4gICAgICAgIGRhdGFTb3VyY2VQcm92aWRlcj17dGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXJ9XG4gICAgICAgIHsuLi5vcHRpb25zfVxuICAgICAgICBvbkNhbmNlbD17dGhpcy5vbkNhbmNlbGVkVmlld31cbiAgICAgICAgb25TZWxlY3Q9e3RoaXMub25TZWxlY3RlZEluVmlld31cbiAgICAgICAgb25IZWxwPXt0aGlzLnByb3BzLm9uSGVscH1cbiAgICAgICAgZ3JvdXBOYW1lPXt0aGlzLnN0YXRlLnNlbGVjdGVkID8gdGhpcy5zdGF0ZS5zZWxlY3RlZC5uYW1lIDogJyd9XG4gICAgICAgIHByZUNoZWNrZWRJdGVtcz17cHJlQ2hlY2tlZEl0ZW1zfVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgZ2V0UG9wb3ZlciA9ICgpID0+IHtcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5wcm9wcy5wb3BvdmVyT3B0aW9ucztcblxuICAgIHJldHVybiAoPEhTUG9wb3ZlclxuICAgICAgZGF0YVNvdXJjZVByb3ZpZGVyPXt0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlcn1cbiAgICAgIG9uQ29tcG9uZW50Qmx1cj17dGhpcy5vblBvcG92ZXJCbHVyfVxuICAgICAgb25TZWxlY3Q9e3RoaXMub25TZWxlY3RlZEluUG9wb3Zlcn1cbiAgICAgIG9uU2hvdWxkT3BlblZpZXc9e3RoaXMub25TaG91bGRPcGVuVmlld31cbiAgICAgIG9uU2hvdWxkQ2xvc2VQb3BvdmVyPXt0aGlzLm9uU2hvdWxkQ2xvc2VQb3BvdmVyfVxuICAgICAgey4uLm9wdGlvbnN9XG4gICAgLz4pO1xuICB9XG5cbiAgZ2V0VG9vbFRpcCA9IGNvbnRlbnQgPT4gPFRvb2x0aXAgaWQ9XCJ0b29sdGlwXCIgY2xhc3NOYW1lPVwiaHMtY29tYm8tYm94LXRvb2x0aXBcIj57Y29udGVudH08L1Rvb2x0aXA+O1xuXG4gIGdldERlZmF1bHRUb29sVGlwQ29udGVudCA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNTZWxlY3RlZEl0ZW1zKCkpIHJldHVybiB0aGlzLnByb3BzLm5vU2VsZWN0aW9uVGV4dDtcbiAgICBjb25zdCB0b3RhbENvdW50ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5sZW5ndGg7XG4gICAgY29uc3QgY291bnQgPSB0b3RhbENvdW50ID4gTUFYX0NPVU5UX09GX1RPT0xUSVBfSVRFTVMgPyBNQVhfQ09VTlRfT0ZfVE9PTFRJUF9JVEVNUyA6IHRvdGFsQ291bnQ7XG5cbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMuc2xpY2UoMCwgY291bnQpO1xuICAgIGNvbnN0IGVsZW1lbnRzID0gT2JqZWN0LmtleXMoaXRlbXMpLm1hcChpID0+ICh0aGlzLnByb3BzLnRvb2x0aXBJdGVtUmVuZGVyRnVuY3Rpb24gP1xuICAgICAgdGhpcy5wcm9wcy50b29sdGlwSXRlbVJlbmRlckZ1bmN0aW9uKGl0ZW1zW2ldLCBpLCB0aGlzLmRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24pIDpcbiAgICAgIHRoaXMuZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbihpdGVtc1tpXSwgaSkpKTtcbiAgICBpZiAoY291bnQgPCB0b3RhbENvdW50KSBlbGVtZW50cy5wdXNoKDxwIGtleT17Y291bnR9Pi4gLiAuPC9wPik7XG5cbiAgICByZXR1cm4gZWxlbWVudHM7XG4gIH1cblxuICBnZXRDb3VudE9mU2VsZWN0ZWRJdGVtcyA9ICgpID0+ICh0aGlzLmlzU2VsZWN0ZWRJdGVtcygpID8gdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5sZW5ndGggOiAwKTtcblxuICBzZXRQb3BvdmVyVmlzaWJpbGl0eSA9IChpc1Zpc2libGUpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgaXNQb3BvdmVyVmlzaWJsZTogaXNWaXNpYmxlIH0pO1xuICB9XG5cbiAgZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbiA9IChpdGVtLCBrZXkpID0+ICg8cCBrZXk9e2tleX0+e2l0ZW0ubmFtZX08L3A+KTtcblxuICBpc1NlbGVjdGVkSXRlbXMgPSAoKSA9PiAoXG4gICAgdGhpcy5zdGF0ZS5zZWxlY3RlZCAmJiB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zICYmIHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMubGVuZ3RoID4gMFxuICApO1xuXG4gIGxvYWREYXRhID0gKHByb3BzKSA9PiB7XG4gICAgcHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmxvYWREYXRhKCkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbmVlZFRvTG9hZERhdGE6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwb3BvdmVyU2hvdWxkQmVIaWRkZW4gPSAoKSA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5pc1BvcG92ZXJWaXNpYmxlKSB0aGlzLnNldFBvcG92ZXJWaXNpYmlsaXR5KGZhbHNlKTtcbiAgICB9LCAxNTApO1xuICB9XG5cbiAgdW5jaGVja0FsbEl0ZW1zID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcHJlQ2hlY2tlZEl0ZW1zOiBbXSxcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVByZWNoZWNrZWQgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IGRhdGFTb3VyY2VQcm92aWRlciwgcHJlQ2hlY2tlZEdyb3VwTmFtZSwgcHJlQ2hlY2tlZEl0ZW1zIH0gPSBwcm9wcztcblxuICAgIGRhdGFTb3VyY2VQcm92aWRlci5zZXRQcmVjaGVja2VkSXRlbXMocHJlQ2hlY2tlZEl0ZW1zKTtcblxuICAgIGNvbnN0IGNoZWNrZWRPdXRwdXQgPSBkYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZE91dHB1dCgpO1xuICAgIGNvbnN0IHNlbGVjdGVkSXRlbXMgPSBkYXRhU291cmNlUHJvdmlkZXIuZ2V0QWxsQ2hlY2tlZEl0ZW1zKCk7XG4gICAgY29uc3QgY2hlY2tlZCA9IGNoZWNrZWRPdXRwdXQuY2hlY2tlZCB8fCBbXTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZDogZmFsc2UsXG4gICAgfSk7XG5cbiAgICB0aGlzLm9uU2VsZWN0ZWRJblZpZXcocHJlQ2hlY2tlZEdyb3VwTmFtZSwgc2VsZWN0ZWRJdGVtcywgY2hlY2tlZCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBpbnB1dE5hbWUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaW5wdXRPcHRpb25zID0ge1xuICAgICAgb25Gb2N1czogdGhpcy5vbklucHV0Rm9jdXMsXG4gICAgICB0eXBlOiAndGV4dCcsXG4gICAgICBwbGFjZWhvbGRlcjogdGhpcy5wcm9wcy5ub1NlbGVjdGlvblRleHQsXG4gICAgICByZWFkT25seTogdHJ1ZSxcbiAgICAgIHJlZjogKGlucHV0KSA9PiB7IHRoaXMuaW5wdXRFbGVtZW50ID0gaW5wdXQ7IH0sXG4gICAgICB2YWx1ZTogdGhpcy5nZXRJbnB1dFRleHQoKSxcbiAgICB9O1xuXG4gICAgaWYgKGlucHV0TmFtZS50cmltKCkgIT09ICcnKSB7XG4gICAgICBpbnB1dE9wdGlvbnMubmFtZSA9IGlucHV0TmFtZTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItbGlzdC13cmFwcGVyXCI+XG4gICAgICAgIDxPdmVybGF5VHJpZ2dlclxuICAgICAgICAgIGRlbGF5PXtUT09MVElQX0RFTEFZX01TfVxuICAgICAgICAgIHBsYWNlbWVudD17dGhpcy5wcm9wcy50b29sdGlwUGxhY2VtZW50fVxuICAgICAgICAgIG92ZXJsYXk9e3RoaXMuZ2V0VG9vbFRpcCh0aGlzLmdldERlZmF1bHRUb29sVGlwQ29udGVudCgpKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWxpc3RcIj5cbiAgICAgICAgICAgIDxpbnB1dCB7Li4uaW5wdXRPcHRpb25zfSAvPlxuICAgICAgICAgICAge3RoaXMuc3RhdGUubmVlZFRvTG9hZERhdGEgP1xuICAgICAgICAgICAgICA8U3Bpbm5lciAvPiA6XG4gICAgICAgICAgICAgIDxIU0JhZGdlIGNsYXNzTmFtZT1cImJhZGdlLW9yYW5nZVwiPnt0aGlzLmdldENvdW50T2ZTZWxlY3RlZEl0ZW1zKCl9PC9IU0JhZGdlPlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZGlzYWJsZWQ9e3RoaXMuc3RhdGUubmVlZFRvTG9hZERhdGF9IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1saXN0LWJ0blwiIG9uQ2xpY2s9e3RoaXMub25DbGlja0hhbmRsZXJ9PjxGYUNoZXZyb25Eb3duIC8+PC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvT3ZlcmxheVRyaWdnZXI+XG4gICAgICAgIHsgdGhpcy5zdGF0ZS5pc1BvcG92ZXJWaXNpYmxlID8gdGhpcy5nZXRQb3BvdmVyKCkgOiBudWxsIH1cbiAgICAgICAgeyB0aGlzLnN0YXRlLmlzVmlld1Zpc2libGUgPyB0aGlzLmdldFZpZXcoKSA6IG51bGwgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5IaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94LnByb3BUeXBlcyA9IHtcbiAgZGF0YVNvdXJjZVByb3ZpZGVyOiBkYXRhU291cmNlUHJvdmlkZXJUeXBlLmlzUmVxdWlyZWQsXG4gIGhpZGVPblBvcG92ZXJCbHVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgaW5wdXROYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBub1NlbGVjdGlvblRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHBvcG92ZXJWaXNpYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgcG9wb3Zlck9wdGlvbnM6IHBvcG92ZXJPcHRpb25zVHlwZS5pc1JlcXVpcmVkLFxuICBwcmVDaGVja2VkSXRlbXM6IHByZUNoZWNrZWRJdGVtc0xpc3RTaGFwZSxcbiAgcHJlQ2hlY2tlZEdyb3VwTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgdG9vbHRpcFBsYWNlbWVudDogUHJvcFR5cGVzLnN0cmluZyxcbiAgdmlld09wdGlvbnM6IHZpZXdPcHRpb25zVHlwZS5pc1JlcXVpcmVkLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uSGVscDogUHJvcFR5cGVzLmZ1bmMsXG4gIHRvb2x0aXBJdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxufTtcblxuSGllcmFyY2h5U2VsZWN0b3JDb21ib0JveC5kZWZhdWx0UHJvcHMgPSB7XG4gIGhpZGVPblBvcG92ZXJCbHVyOiB0cnVlLFxuICBpbnB1dE5hbWU6ICcnLFxuICBub1NlbGVjdGlvblRleHQ6ICdObyBvbmUgc2VsZWN0ZWQuLi4nLFxuICBwb3BvdmVyVmlzaWJsZTogZmFsc2UsXG4gIHByZUNoZWNrZWRJdGVtczogbnVsbCxcbiAgcHJlQ2hlY2tlZEdyb3VwTmFtZTogJ0RlZmF1bHQgZ3JvdXAnLFxuICB0b29sdGlwUGxhY2VtZW50OiAnYm90dG9tJyxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBvbkhlbHA6ICgpID0+IHt9LFxuICB0b29sdGlwSXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxufTtcbiJdfQ==