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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbWJvLWJveC9jb21iby1ib3guY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlRvb2x0aXAiLCJPdmVybGF5VHJpZ2dlciIsIlByb3BUeXBlcyIsIkZhQ2hldnJvbkRvd24iLCJkYXRhU291cmNlUHJvdmlkZXJUeXBlIiwicHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlIiwicG9wb3Zlck9wdGlvbnNUeXBlIiwidmlld09wdGlvbnNUeXBlIiwiU3Bpbm5lciIsIkhTUG9wb3ZlciIsIkhTVmlldyIsIkhTQmFkZ2UiLCJUT09MVElQX0RFTEFZX01TIiwiTUFYX0NPVU5UX09GX1RPT0xUSVBfSVRFTVMiLCJIaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94IiwicHJvcHMiLCJpc0RhdGFMb2FkZWQiLCJkYXRhU291cmNlUHJvdmlkZXIiLCJpc0xvYWRlZCIsIm5lZWRUb1VwZGF0ZVByZUNoZWNrZWQiLCJwcmVDaGVja2VkSXRlbXMiLCJsZW5ndGgiLCJuZWVkVG9Mb2FkRGF0YSIsInN0YXRlIiwic2VsZWN0ZWQiLCJpc1BvcG92ZXJWaXNpYmxlIiwicG9wb3ZlclZpc2libGUiLCJpc1ZpZXdWaXNpYmxlIiwiY29tcG9uZW50V2lsbE1vdW50IiwibG9hZERhdGEiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwic2V0U3RhdGUiLCJjb21wb25lbnRXaWxsVXBkYXRlIiwibmV4dFN0YXRlIiwidXBkYXRlUHJlY2hlY2tlZCIsInJlbmRlciIsImlucHV0TmFtZSIsImlucHV0T3B0aW9ucyIsIm9uRm9jdXMiLCJvbklucHV0Rm9jdXMiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJub1NlbGVjdGlvblRleHQiLCJyZWFkT25seSIsInJlZiIsImlucHV0IiwiaW5wdXRFbGVtZW50IiwidmFsdWUiLCJnZXRJbnB1dFRleHQiLCJvbkNsaWNrIiwib25DbGlja0hhbmRsZXIiLCJ0cmltIiwibmFtZSIsInRvb2x0aXBQbGFjZW1lbnQiLCJnZXRUb29sVGlwIiwiZ2V0RGVmYXVsdFRvb2xUaXBDb250ZW50IiwiZ2V0Q291bnRPZlNlbGVjdGVkSXRlbXMiLCJnZXRQb3BvdmVyIiwiZ2V0VmlldyIsIlB1cmVDb21wb25lbnQiLCJzZXRQb3BvdmVyVmlzaWJpbGl0eSIsImJsdXIiLCJvblNlbGVjdEhhbmRsZXIiLCJncm91cE5hbWUiLCJzZWxlY3RlZEl0ZW0iLCJjaGVja2VkT3V0cHV0IiwiaXRlbXMiLCJtYXAiLCJPYmplY3QiLCJhc3NpZ24iLCJpdGVtIiwib25TZWxlY3QiLCJvblBvcG92ZXJCbHVyIiwiaGlkZU9uUG9wb3ZlckJsdXIiLCJwb3BvdmVyU2hvdWxkQmVIaWRkZW4iLCJvblNob3VsZE9wZW5WaWV3Iiwib25TaG91bGRDbG9zZVBvcG92ZXIiLCJvbkNhbmNlbGVkVmlldyIsIm9uU2VsZWN0ZWRJblZpZXciLCJzZWxlY3RlZEl0ZW1zIiwib25TZWxlY3RlZEluUG9wb3ZlciIsInVuY2hlY2tBbGxJdGVtcyIsIkFycmF5IiwiaXNBcnJheSIsInNlbGVjdGlvblRleHQiLCJvcHRpb25zIiwidmlld09wdGlvbnMiLCJzbGljZSIsIm9uSGVscCIsInBvcG92ZXJPcHRpb25zIiwiY29udGVudCIsImlzU2VsZWN0ZWRJdGVtcyIsInRvdGFsQ291bnQiLCJjb3VudCIsImVsZW1lbnRzIiwia2V5cyIsInRvb2x0aXBJdGVtUmVuZGVyRnVuY3Rpb24iLCJpIiwiZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbiIsInB1c2giLCJpc1Zpc2libGUiLCJrZXkiLCJ0aGVuIiwic2V0VGltZW91dCIsInByZUNoZWNrZWRHcm91cE5hbWUiLCJzZXRQcmVjaGVja2VkSXRlbXMiLCJnZXRDaGVja2VkT3V0cHV0IiwiZ2V0QWxsQ2hlY2tlZEl0ZW1zIiwiY2hlY2tlZCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztBQUVBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxTQUFT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Wix1QkFBaUI7QUFETCxLQUFkO0FBR0QsRzs7T0FFRGUsZ0IsR0FBbUIsVUFBQ3BCLEtBQUQsRUFBVztBQUFBLFFBQ3BCRSxrQkFEb0IsR0FDeUNGLEtBRHpDLENBQ3BCRSxrQkFEb0I7QUFBQSxRQUNBd0YsbUJBREEsR0FDeUMxRixLQUR6QyxDQUNBMEYsbUJBREE7QUFBQSxRQUNxQnJGLGVBRHJCLEdBQ3lDTCxLQUR6QyxDQUNxQkssZUFEckI7OztBQUc1QkgsdUJBQW1CeUYsa0JBQW5CLENBQXNDdEYsZUFBdEM7O0FBRUEsUUFBTThDLGdCQUFnQmpELG1CQUFtQjBGLGdCQUFuQixFQUF0QjtBQUNBLFFBQU0zQixnQkFBZ0IvRCxtQkFBbUIyRixrQkFBbkIsRUFBdEI7QUFDQSxRQUFNQyxVQUFVM0MsY0FBYzJDLE9BQWQsSUFBeUIsRUFBekM7O0FBRUEsV0FBSzdFLFFBQUwsQ0FBYztBQUNaYiw4QkFBd0I7QUFEWixLQUFkOztBQUlBLFdBQUs0RCxnQkFBTCxDQUFzQjBCLG1CQUF0QixFQUEyQ3pCLGFBQTNDLEVBQTBENkIsT0FBMUQ7QUFDRCxHOztTQXZOa0IvRix5Qjs7O0FBZ1JyQkEsMEJBQTBCZ0csWUFBMUIsR0FBeUM7QUFDdkNwQyxxQkFBbUIsSUFEb0I7QUFFdkNyQyxhQUFXLEVBRjRCO0FBR3ZDTSxtQkFBaUIsb0JBSHNCO0FBSXZDakIsa0JBQWdCLEtBSnVCO0FBS3ZDTixtQkFBaUIsSUFMc0I7QUFNdkNxRix1QkFBcUIsZUFOa0I7QUFPdkNuRCxvQkFBa0IsUUFQcUI7QUFRdkNrQixZQUFVLG9CQUFNLENBQUUsQ0FScUI7QUFTdkNpQixVQUFRLGtCQUFNLENBQUUsQ0FUdUI7QUFVdkNRLDZCQUEyQjtBQVZZLENBQXpDIiwiZmlsZSI6ImNvbWJvLWJveC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby11bnVzZWQtc3RhdGUgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFRvb2x0aXAsIE92ZXJsYXlUcmlnZ2VyIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgRmFDaGV2cm9uRG93biBmcm9tICdyZWFjdC1pY29ucy9saWIvZmEvY2hldnJvbi1kb3duJztcbmltcG9ydCB7IGRhdGFTb3VyY2VQcm92aWRlclR5cGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90eXBlcyc7XG5pbXBvcnQgeyBwcmVDaGVja2VkSXRlbXNMaXN0U2hhcGUsIHBvcG92ZXJPcHRpb25zVHlwZSwgdmlld09wdGlvbnNUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IFNwaW5uZXIgZnJvbSAnLi4vc3Bpbm5lcic7XG5pbXBvcnQgSFNQb3BvdmVyIGZyb20gJy4uL3BvcG92ZXInO1xuaW1wb3J0IEhTVmlldyBmcm9tICcuLi92aWV3JztcbmltcG9ydCBIU0JhZGdlIGZyb20gJy4uL2JhZGdlJztcblxuXG5pbXBvcnQgeyBUT09MVElQX0RFTEFZX01TLCBNQVhfQ09VTlRfT0ZfVE9PTFRJUF9JVEVNUyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCAnLi9jb21iby1ib3guc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVNlbGVjdG9yQ29tYm9Cb3ggZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICBjb25zdCBpc0RhdGFMb2FkZWQgPSBwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuaXNMb2FkZWQ7XG4gICAgY29uc3QgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZCA9IHByb3BzLnByZUNoZWNrZWRJdGVtcyAmJiBwcm9wcy5wcmVDaGVja2VkSXRlbXMubGVuZ3RoO1xuICAgIGNvbnN0IG5lZWRUb0xvYWREYXRhID0gIWlzRGF0YUxvYWRlZCAmJiBuZWVkVG9VcGRhdGVQcmVDaGVja2VkO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG5lZWRUb0xvYWREYXRhLFxuICAgICAgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZCxcbiAgICAgIHByZUNoZWNrZWRJdGVtczogcHJvcHMucHJlQ2hlY2tlZEl0ZW1zLFxuICAgICAgc2VsZWN0ZWQ6IG51bGwsXG4gICAgICBpc1BvcG92ZXJWaXNpYmxlOiBwcm9wcy5wb3BvdmVyVmlzaWJsZSxcbiAgICAgIGlzVmlld1Zpc2libGU6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgY29uc3QgeyBuZWVkVG9Mb2FkRGF0YSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBpZiAobmVlZFRvTG9hZERhdGEpIHtcbiAgICAgIHRoaXMubG9hZERhdGEodGhpcy5wcm9wcyk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBjb25zdCB7IGRhdGFTb3VyY2VQcm92aWRlciwgcHJlQ2hlY2tlZEl0ZW1zIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKGRhdGFTb3VyY2VQcm92aWRlciAhPT0gbmV4dFByb3BzLmRhdGFTb3VyY2VQcm92aWRlcikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG5lZWRUb0xvYWREYXRhOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHByZUNoZWNrZWRJdGVtcyAhPT0gbmV4dFByb3BzLnByZUNoZWNrZWRJdGVtcykge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQ6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgY29uc3QgeyBuZWVkVG9Mb2FkRGF0YSwgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZCB9ID0gbmV4dFN0YXRlO1xuICAgIGlmIChuZWVkVG9Mb2FkRGF0YSkge1xuICAgICAgdGhpcy5sb2FkRGF0YShuZXh0UHJvcHMpO1xuICAgIH0gZWxzZSBpZiAobmVlZFRvVXBkYXRlUHJlQ2hlY2tlZCkge1xuICAgICAgdGhpcy51cGRhdGVQcmVjaGVja2VkKG5leHRQcm9wcyk7XG4gICAgfVxuICB9XG5cbiAgb25DbGlja0hhbmRsZXIgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRQb3BvdmVyVmlzaWJpbGl0eSghdGhpcy5zdGF0ZS5pc1BvcG92ZXJWaXNpYmxlKTtcbiAgfVxuXG4gIG9uSW5wdXRGb2N1cyA9ICgpID0+IHtcbiAgICB0aGlzLmlucHV0RWxlbWVudC5ibHVyKCk7XG4gIH1cblxuICBvblNlbGVjdEhhbmRsZXIgPSAoZ3JvdXBOYW1lLCBzZWxlY3RlZEl0ZW0sIGNoZWNrZWRPdXRwdXQpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkOiBzZWxlY3RlZEl0ZW0sXG4gICAgICBpc1BvcG92ZXJWaXNpYmxlOiBmYWxzZSxcbiAgICAgIGlzVmlld1Zpc2libGU6IGZhbHNlLFxuICAgIH0pO1xuICAgIGNvbnN0IGl0ZW1zID0gY2hlY2tlZE91dHB1dCA/IGNoZWNrZWRPdXRwdXQubWFwKGl0ZW0gPT4gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSkpIDogW107XG5cbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGl0ZW1zLCBncm91cE5hbWUpO1xuICB9XG5cbiAgb25Qb3BvdmVyQmx1ciA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5oaWRlT25Qb3BvdmVyQmx1cikge1xuICAgICAgdGhpcy5wb3BvdmVyU2hvdWxkQmVIaWRkZW4oKTtcbiAgICB9XG4gIH1cblxuICBvblNob3VsZE9wZW5WaWV3ID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBpc1ZpZXdWaXNpYmxlOiB0cnVlIH0pO1xuICB9XG5cbiAgb25TaG91bGRDbG9zZVBvcG92ZXIgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpc1BvcG92ZXJWaXNpYmxlOiBmYWxzZSxcbiAgICB9KTtcbiAgfVxuXG4gIG9uQ2FuY2VsZWRWaWV3ID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaXNQb3BvdmVyVmlzaWJsZTogZmFsc2UsXG4gICAgICBpc1ZpZXdWaXNpYmxlOiBmYWxzZSxcbiAgICB9KTtcbiAgfVxuXG4gIG9uU2VsZWN0ZWRJblZpZXcgPSAoZ3JvdXBOYW1lLCBzZWxlY3RlZEl0ZW1zLCBjaGVja2VkT3V0cHV0KSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ZWRJdGVtID0ge1xuICAgICAgbmFtZTogZ3JvdXBOYW1lLFxuICAgICAgaXRlbXM6IHNlbGVjdGVkSXRlbXMsXG4gICAgfTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHByZUNoZWNrZWRJdGVtczogY2hlY2tlZE91dHB1dCxcbiAgICB9KTtcbiAgICB0aGlzLm9uU2VsZWN0SGFuZGxlcihncm91cE5hbWUsIHNlbGVjdGVkSXRlbSwgY2hlY2tlZE91dHB1dCk7XG4gIH1cblxuICBvblNlbGVjdGVkSW5Qb3BvdmVyID0gKHNlbGVjdGVkSXRlbSkgPT4ge1xuICAgIHRoaXMudW5jaGVja0FsbEl0ZW1zKCk7XG4gICAgY29uc3QgY2hlY2tlZE91dHB1dCA9IHNlbGVjdGVkSXRlbSAmJiBBcnJheS5pc0FycmF5KHNlbGVjdGVkSXRlbS5pdGVtcykgP1xuICAgICAgc2VsZWN0ZWRJdGVtLml0ZW1zIDogW107XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwcmVDaGVja2VkSXRlbXM6IGNoZWNrZWRPdXRwdXQsXG4gICAgfSk7XG4gICAgdGhpcy5vblNlbGVjdEhhbmRsZXIoc2VsZWN0ZWRJdGVtLm5hbWUsIHNlbGVjdGVkSXRlbSwgY2hlY2tlZE91dHB1dCk7XG4gIH1cblxuICBnZXRJbnB1dFRleHQgPSAoKSA9PiB7XG4gICAgbGV0IHNlbGVjdGlvblRleHQgPSAnJztcblxuICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkICYmIHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMgJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICBzZWxlY3Rpb25UZXh0ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZC5uYW1lO1xuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0aW9uVGV4dDtcbiAgfVxuXG4gIGdldFZpZXcgPSAoKSA9PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMucHJvcHMudmlld09wdGlvbnM7XG4gICAgY29uc3QgcHJlQ2hlY2tlZEl0ZW1zID0gQXJyYXkuaXNBcnJheSh0aGlzLnN0YXRlLnByZUNoZWNrZWRJdGVtcykgP1xuICAgICAgdGhpcy5zdGF0ZS5wcmVDaGVja2VkSXRlbXMuc2xpY2UoKSA6IG51bGw7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPEhTVmlld1xuICAgICAgICBkYXRhU291cmNlUHJvdmlkZXI9e3RoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyfVxuICAgICAgICB7Li4ub3B0aW9uc31cbiAgICAgICAgb25DYW5jZWw9e3RoaXMub25DYW5jZWxlZFZpZXd9XG4gICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0ZWRJblZpZXd9XG4gICAgICAgIG9uSGVscD17dGhpcy5wcm9wcy5vbkhlbHB9XG4gICAgICAgIGdyb3VwTmFtZT17dGhpcy5zdGF0ZS5zZWxlY3RlZCA/IHRoaXMuc3RhdGUuc2VsZWN0ZWQubmFtZSA6ICcnfVxuICAgICAgICBwcmVDaGVja2VkSXRlbXM9e3ByZUNoZWNrZWRJdGVtc31cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIGdldFBvcG92ZXIgPSAoKSA9PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMucHJvcHMucG9wb3Zlck9wdGlvbnM7XG5cbiAgICByZXR1cm4gKDxIU1BvcG92ZXJcbiAgICAgIGRhdGFTb3VyY2VQcm92aWRlcj17dGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXJ9XG4gICAgICBvbkNvbXBvbmVudEJsdXI9e3RoaXMub25Qb3BvdmVyQmx1cn1cbiAgICAgIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0ZWRJblBvcG92ZXJ9XG4gICAgICBvblNob3VsZE9wZW5WaWV3PXt0aGlzLm9uU2hvdWxkT3BlblZpZXd9XG4gICAgICBvblNob3VsZENsb3NlUG9wb3Zlcj17dGhpcy5vblNob3VsZENsb3NlUG9wb3Zlcn1cbiAgICAgIHsuLi5vcHRpb25zfVxuICAgIC8+KTtcbiAgfVxuXG4gIGdldFRvb2xUaXAgPSBjb250ZW50ID0+IDxUb29sdGlwIGlkPVwidG9vbHRpcFwiIGNsYXNzTmFtZT1cImhzLWNvbWJvLWJveC10b29sdGlwXCI+e2NvbnRlbnR9PC9Ub29sdGlwPjtcblxuICBnZXREZWZhdWx0VG9vbFRpcENvbnRlbnQgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzU2VsZWN0ZWRJdGVtcygpKSByZXR1cm4gdGhpcy5wcm9wcy5ub1NlbGVjdGlvblRleHQ7XG4gICAgY29uc3QgdG90YWxDb3VudCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMubGVuZ3RoO1xuICAgIGNvbnN0IGNvdW50ID0gdG90YWxDb3VudCA+IE1BWF9DT1VOVF9PRl9UT09MVElQX0lURU1TID8gTUFYX0NPVU5UX09GX1RPT0xUSVBfSVRFTVMgOiB0b3RhbENvdW50O1xuXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLnNsaWNlKDAsIGNvdW50KTtcbiAgICBjb25zdCBlbGVtZW50cyA9IE9iamVjdC5rZXlzKGl0ZW1zKS5tYXAoaSA9PiAodGhpcy5wcm9wcy50b29sdGlwSXRlbVJlbmRlckZ1bmN0aW9uID9cbiAgICAgIHRoaXMucHJvcHMudG9vbHRpcEl0ZW1SZW5kZXJGdW5jdGlvbihpdGVtc1tpXSwgaSwgdGhpcy5kZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uKSA6XG4gICAgICB0aGlzLmRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24oaXRlbXNbaV0sIGkpKSk7XG4gICAgaWYgKGNvdW50IDwgdG90YWxDb3VudCkgZWxlbWVudHMucHVzaCg8cCBrZXk9e2NvdW50fT4uIC4gLjwvcD4pO1xuXG4gICAgcmV0dXJuIGVsZW1lbnRzO1xuICB9XG5cbiAgZ2V0Q291bnRPZlNlbGVjdGVkSXRlbXMgPSAoKSA9PiAodGhpcy5pc1NlbGVjdGVkSXRlbXMoKSA/IHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMubGVuZ3RoIDogMCk7XG5cbiAgc2V0UG9wb3ZlclZpc2liaWxpdHkgPSAoaXNWaXNpYmxlKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlzUG9wb3ZlclZpc2libGU6IGlzVmlzaWJsZSB9KTtcbiAgfVxuXG4gIGRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24gPSAoaXRlbSwga2V5KSA9PiAoPHAga2V5PXtrZXl9PntpdGVtLm5hbWV9PC9wPik7XG5cbiAgaXNTZWxlY3RlZEl0ZW1zID0gKCkgPT4gKFxuICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWQgJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcyAmJiB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLmxlbmd0aCA+IDBcbiAgKTtcblxuICBsb2FkRGF0YSA9IChwcm9wcykgPT4ge1xuICAgIHByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5sb2FkRGF0YSgpLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG5lZWRUb0xvYWREYXRhOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcG9wb3ZlclNob3VsZEJlSGlkZGVuID0gKCkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuc3RhdGUuaXNQb3BvdmVyVmlzaWJsZSkgdGhpcy5zZXRQb3BvdmVyVmlzaWJpbGl0eShmYWxzZSk7XG4gICAgfSwgMTUwKTtcbiAgfVxuXG4gIHVuY2hlY2tBbGxJdGVtcyA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHByZUNoZWNrZWRJdGVtczogW10sXG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVQcmVjaGVja2VkID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhU291cmNlUHJvdmlkZXIsIHByZUNoZWNrZWRHcm91cE5hbWUsIHByZUNoZWNrZWRJdGVtcyB9ID0gcHJvcHM7XG5cbiAgICBkYXRhU291cmNlUHJvdmlkZXIuc2V0UHJlY2hlY2tlZEl0ZW1zKHByZUNoZWNrZWRJdGVtcyk7XG5cbiAgICBjb25zdCBjaGVja2VkT3V0cHV0ID0gZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWRPdXRwdXQoKTtcbiAgICBjb25zdCBzZWxlY3RlZEl0ZW1zID0gZGF0YVNvdXJjZVByb3ZpZGVyLmdldEFsbENoZWNrZWRJdGVtcygpO1xuICAgIGNvbnN0IGNoZWNrZWQgPSBjaGVja2VkT3V0cHV0LmNoZWNrZWQgfHwgW107XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQ6IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5vblNlbGVjdGVkSW5WaWV3KHByZUNoZWNrZWRHcm91cE5hbWUsIHNlbGVjdGVkSXRlbXMsIGNoZWNrZWQpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaW5wdXROYW1lIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGlucHV0T3B0aW9ucyA9IHtcbiAgICAgIG9uRm9jdXM6IHRoaXMub25JbnB1dEZvY3VzLFxuICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucHJvcHMubm9TZWxlY3Rpb25UZXh0LFxuICAgICAgcmVhZE9ubHk6IHRydWUsXG4gICAgICByZWY6IChpbnB1dCkgPT4geyB0aGlzLmlucHV0RWxlbWVudCA9IGlucHV0OyB9LFxuICAgICAgdmFsdWU6IHRoaXMuZ2V0SW5wdXRUZXh0KCksXG4gICAgICBvbkNsaWNrOiB0aGlzLm9uQ2xpY2tIYW5kbGVyLFxuICAgIH07XG5cbiAgICBpZiAoaW5wdXROYW1lLnRyaW0oKSAhPT0gJycpIHtcbiAgICAgIGlucHV0T3B0aW9ucy5uYW1lID0gaW5wdXROYW1lO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1saXN0LXdyYXBwZXJcIj5cbiAgICAgICAgPE92ZXJsYXlUcmlnZ2VyXG4gICAgICAgICAgZGVsYXk9e1RPT0xUSVBfREVMQVlfTVN9XG4gICAgICAgICAgcGxhY2VtZW50PXt0aGlzLnByb3BzLnRvb2x0aXBQbGFjZW1lbnR9XG4gICAgICAgICAgb3ZlcmxheT17dGhpcy5nZXRUb29sVGlwKHRoaXMuZ2V0RGVmYXVsdFRvb2xUaXBDb250ZW50KCkpfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItbGlzdFwiPlxuICAgICAgICAgICAgPGlucHV0IHsuLi5pbnB1dE9wdGlvbnN9IC8+XG4gICAgICAgICAgICB7dGhpcy5zdGF0ZS5uZWVkVG9Mb2FkRGF0YSA/XG4gICAgICAgICAgICAgIDxTcGlubmVyIC8+IDpcbiAgICAgICAgICAgICAgPEhTQmFkZ2UgY2xhc3NOYW1lPVwiYmFkZ2Utb3JhbmdlXCI+e3RoaXMuZ2V0Q291bnRPZlNlbGVjdGVkSXRlbXMoKX08L0hTQmFkZ2U+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkaXNhYmxlZD17dGhpcy5zdGF0ZS5uZWVkVG9Mb2FkRGF0YX0gY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWxpc3QtYnRuXCIgb25DbGljaz17dGhpcy5vbkNsaWNrSGFuZGxlcn0+PEZhQ2hldnJvbkRvd24gLz48L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9PdmVybGF5VHJpZ2dlcj5cbiAgICAgICAgeyB0aGlzLnN0YXRlLmlzUG9wb3ZlclZpc2libGUgPyB0aGlzLmdldFBvcG92ZXIoKSA6IG51bGwgfVxuICAgICAgICB7IHRoaXMuc3RhdGUuaXNWaWV3VmlzaWJsZSA/IHRoaXMuZ2V0VmlldygpIDogbnVsbCB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkhpZXJhcmNoeVNlbGVjdG9yQ29tYm9Cb3gucHJvcFR5cGVzID0ge1xuICBkYXRhU291cmNlUHJvdmlkZXI6IGRhdGFTb3VyY2VQcm92aWRlclR5cGUuaXNSZXF1aXJlZCxcbiAgaGlkZU9uUG9wb3ZlckJsdXI6IFByb3BUeXBlcy5ib29sLFxuICBpbnB1dE5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIG5vU2VsZWN0aW9uVGV4dDogUHJvcFR5cGVzLnN0cmluZyxcbiAgcG9wb3ZlclZpc2libGU6IFByb3BUeXBlcy5ib29sLFxuICBwb3BvdmVyT3B0aW9uczogcG9wb3Zlck9wdGlvbnNUeXBlLmlzUmVxdWlyZWQsXG4gIHByZUNoZWNrZWRJdGVtczogcHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlLFxuICBwcmVDaGVja2VkR3JvdXBOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICB0b29sdGlwUGxhY2VtZW50OiBQcm9wVHlwZXMuc3RyaW5nLFxuICB2aWV3T3B0aW9uczogdmlld09wdGlvbnNUeXBlLmlzUmVxdWlyZWQsXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgb25IZWxwOiBQcm9wVHlwZXMuZnVuYyxcbiAgdG9vbHRpcEl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5IaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94LmRlZmF1bHRQcm9wcyA9IHtcbiAgaGlkZU9uUG9wb3ZlckJsdXI6IHRydWUsXG4gIGlucHV0TmFtZTogJycsXG4gIG5vU2VsZWN0aW9uVGV4dDogJ05vIG9uZSBzZWxlY3RlZC4uLicsXG4gIHBvcG92ZXJWaXNpYmxlOiBmYWxzZSxcbiAgcHJlQ2hlY2tlZEl0ZW1zOiBudWxsLFxuICBwcmVDaGVja2VkR3JvdXBOYW1lOiAnRGVmYXVsdCBncm91cCcsXG4gIHRvb2x0aXBQbGFjZW1lbnQ6ICdib3R0b20nLFxuICBvblNlbGVjdDogKCkgPT4ge30sXG4gIG9uSGVscDogKCkgPT4ge30sXG4gIHRvb2x0aXBJdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXG59O1xuIl19