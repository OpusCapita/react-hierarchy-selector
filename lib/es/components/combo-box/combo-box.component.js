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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbWJvLWJveC9jb21iby1ib3guY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlRvb2x0aXAiLCJPdmVybGF5VHJpZ2dlciIsIlByb3BUeXBlcyIsIkZhQ2hldnJvbkRvd24iLCJkYXRhU291cmNlUHJvdmlkZXJUeXBlIiwicHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlIiwicG9wb3Zlck9wdGlvbnNUeXBlIiwidmlld09wdGlvbnNUeXBlIiwiU3Bpbm5lciIsIkhTUG9wb3ZlciIsIkhTVmlldyIsIkhTQmFkZ2UiLCJUT09MVElQX0RFTEFZX01TIiwiTUFYX0NPVU5UX09GX1RPT0xUSVBfSVRFTVMiLCJIaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94IiwicHJvcHMiLCJpc0RhdGFMb2FkZWQiLCJkYXRhU291cmNlUHJvdmlkZXIiLCJpc0xvYWRlZCIsIm5lZWRUb1VwZGF0ZVByZUNoZWNrZWQiLCJwcmVDaGVja2VkSXRlbXMiLCJsZW5ndGgiLCJuZWVkVG9Mb2FkRGF0YSIsInN0YXRlIiwic2VsZWN0ZWQiLCJpc1BvcG92ZXJWaXNpYmxlIiwicG9wb3ZlclZpc2libGUiLCJpc1ZpZXdWaXNpYmxlIiwiY29tcG9uZW50V2lsbE1vdW50IiwibG9hZERhdGEiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwic2V0U3RhdGUiLCJjb21wb25lbnRXaWxsVXBkYXRlIiwibmV4dFN0YXRlIiwidXBkYXRlUHJlY2hlY2tlZCIsInJlbmRlciIsImlucHV0TmFtZSIsImlucHV0T3B0aW9ucyIsIm9uRm9jdXMiLCJvbklucHV0Rm9jdXMiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJub1NlbGVjdGlvblRleHQiLCJyZWFkT25seSIsInJlZiIsImlucHV0IiwiaW5wdXRFbGVtZW50IiwidmFsdWUiLCJnZXRJbnB1dFRleHQiLCJ0cmltIiwibmFtZSIsInRvb2x0aXBQbGFjZW1lbnQiLCJnZXRUb29sVGlwIiwiZ2V0RGVmYXVsdFRvb2xUaXBDb250ZW50IiwiZ2V0Q291bnRPZlNlbGVjdGVkSXRlbXMiLCJvbkNsaWNrSGFuZGxlciIsImdldFBvcG92ZXIiLCJnZXRWaWV3IiwiUHVyZUNvbXBvbmVudCIsInNldFBvcG92ZXJWaXNpYmlsaXR5IiwiYmx1ciIsIm9uU2VsZWN0SGFuZGxlciIsInNlbGVjdGVkSXRlbSIsImNoZWNrZWRPdXRwdXQiLCJpdGVtcyIsIm1hcCIsIk9iamVjdCIsImFzc2lnbiIsIml0ZW0iLCJvblNlbGVjdCIsIm9uUG9wb3ZlckJsdXIiLCJoaWRlT25Qb3BvdmVyQmx1ciIsInBvcG92ZXJTaG91bGRCZUhpZGRlbiIsIm9uU2hvdWxkT3BlblZpZXciLCJvblNob3VsZENsb3NlUG9wb3ZlciIsIm9uQ2FuY2VsZWRWaWV3Iiwib25TZWxlY3RlZEluVmlldyIsImdyb3VwTmFtZSIsInNlbGVjdGVkSXRlbXMiLCJvblNlbGVjdGVkSW5Qb3BvdmVyIiwidW5jaGVja0FsbEl0ZW1zIiwiQXJyYXkiLCJpc0FycmF5IiwiaWQiLCJsZXZlbCIsInBhcmVudElkIiwicGFyZW50SWRzIiwiaXNDaGVja2VkQWxsIiwiaXNDaGlsZHJlbiIsInNlbGVjdGlvblRleHQiLCJvcHRpb25zIiwidmlld09wdGlvbnMiLCJzbGljZSIsInBvcG92ZXJPcHRpb25zIiwiY29udGVudCIsImlzU2VsZWN0ZWRJdGVtcyIsInRvdGFsQ291bnQiLCJjb3VudCIsImVsZW1lbnRzIiwia2V5cyIsImkiLCJwdXNoIiwiaXNWaXNpYmxlIiwidGhlbiIsInNldFRpbWVvdXQiLCJwcmVDaGVja2VkR3JvdXBOYW1lIiwic2V0UHJlY2hlY2tlZEl0ZW1zIiwiZ2V0Q2hlY2tlZE91dHB1dCIsImdldEFsbENoZWNrZWRJdGVtcyIsImNoZWNrZWQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7QUFFQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsU0FBU0MsT0FBVCxFQUFrQkMsY0FBbEIsUUFBd0MsaUJBQXhDO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLGFBQVAsTUFBMEIsaUNBQTFCO0FBQ0EsU0FBU0Msc0JBQVQsUUFBdUMsc0JBQXZDO0FBQ0EsU0FBU0Msd0JBQVQsRUFBbUNDLGtCQUFuQyxFQUF1REMsZUFBdkQsUUFBOEUsYUFBOUU7QUFDQSxPQUFPQyxPQUFQLE1BQW9CLFlBQXBCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLE1BQVAsTUFBbUIsU0FBbkI7QUFDQSxPQUFPQyxPQUFQLE1BQW9CLFVBQXBCOztBQUdBLFNBQVNDLGdCQUFULEVBQTJCQywwQkFBM0IsUUFBNkQsYUFBN0Q7QUFDQSxPQUFPLGtCQUFQOztJQUVxQkMseUI7OztBQUNuQixxQ0FBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQTs7QUFHakIsUUFBTUMsZUFBZUQsTUFBTUUsa0JBQU4sQ0FBeUJDLFFBQTlDO0FBQ0EsUUFBTUMseUJBQXlCSixNQUFNSyxlQUFOLElBQXlCTCxNQUFNSyxlQUFOLENBQXNCQyxNQUE5RTtBQUNBLFFBQU1DLGlCQUFpQixDQUFDTixZQUFELElBQWlCRyxzQkFBeEM7O0FBRUEsVUFBS0ksS0FBTCxHQUFhO0FBQ1hELG9DQURXO0FBRVhILG9EQUZXO0FBR1hDLHVCQUFpQkwsTUFBTUssZUFIWjtBQUlYSSxnQkFBVSxJQUpDO0FBS1hDLHdCQUFrQlYsTUFBTVcsY0FMYjtBQU1YQyxxQkFBZTtBQU5KLEtBQWI7QUFQaUI7QUFlbEI7O3NDQUVEQyxrQixpQ0FBcUI7QUFBQSxRQUNYTixjQURXLEdBQ1EsS0FBS0MsS0FEYixDQUNYRCxjQURXOztBQUVuQixRQUFJQSxjQUFKLEVBQW9CO0FBQ2xCLFdBQUtPLFFBQUwsQ0FBYyxLQUFLZCxLQUFuQjtBQUNEO0FBQ0YsRzs7c0NBRURlLHlCLHNDQUEwQkMsUyxFQUFXO0FBQUEsaUJBQ2EsS0FBS2hCLEtBRGxCO0FBQUEsUUFDM0JFLGtCQUQyQixVQUMzQkEsa0JBRDJCO0FBQUEsUUFDUEcsZUFETyxVQUNQQSxlQURPOzs7QUFHbkMsUUFBSUgsdUJBQXVCYyxVQUFVZCxrQkFBckMsRUFBeUQ7QUFDdkQsV0FBS2UsUUFBTCxDQUFjO0FBQ1pWLHdCQUFnQjtBQURKLE9BQWQ7QUFHRDs7QUFFRCxRQUFJRixvQkFBb0JXLFVBQVVYLGVBQWxDLEVBQW1EO0FBQ2pELFdBQUtZLFFBQUwsQ0FBYztBQUNaYixnQ0FBd0I7QUFEWixPQUFkO0FBR0Q7QUFDRixHOztzQ0FFRGMsbUIsZ0NBQW9CRixTLEVBQVdHLFMsRUFBVztBQUFBLFFBQ2hDWixjQURnQyxHQUNXWSxTQURYLENBQ2hDWixjQURnQztBQUFBLFFBQ2hCSCxzQkFEZ0IsR0FDV2UsU0FEWCxDQUNoQmYsc0JBRGdCOztBQUV4QyxRQUFJRyxjQUFKLEVBQW9CO0FBQ2xCLFdBQUtPLFFBQUwsQ0FBY0UsU0FBZDtBQUNELEtBRkQsTUFFTyxJQUFJWixzQkFBSixFQUE0QjtBQUNqQyxXQUFLZ0IsZ0JBQUwsQ0FBc0JKLFNBQXRCO0FBQ0Q7QUFDRixHOztzQ0EyS0RLLE0scUJBQVM7QUFBQTs7QUFBQSxRQUNDQyxTQURELEdBQ2UsS0FBS3RCLEtBRHBCLENBQ0NzQixTQUREOztBQUVQLFFBQU1DLGVBQWU7QUFDbkJDLGVBQVMsS0FBS0MsWUFESztBQUVuQkMsWUFBTSxNQUZhO0FBR25CQyxtQkFBYSxLQUFLM0IsS0FBTCxDQUFXNEIsZUFITDtBQUluQkMsZ0JBQVUsSUFKUztBQUtuQkMsV0FBSyxhQUFDQyxLQUFELEVBQVc7QUFBRSxlQUFLQyxZQUFMLEdBQW9CRCxLQUFwQjtBQUE0QixPQUwzQjtBQU1uQkUsYUFBTyxLQUFLQyxZQUFMO0FBTlksS0FBckI7O0FBU0EsUUFBSVosVUFBVWEsSUFBVixPQUFxQixFQUF6QixFQUE2QjtBQUMzQlosbUJBQWFhLElBQWIsR0FBb0JkLFNBQXBCO0FBQ0Q7O0FBRUQsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLG9DQUFmO0FBQ0U7QUFBQyxzQkFBRDtBQUFBO0FBQ0UsaUJBQU96QixnQkFEVDtBQUVFLHFCQUFXLEtBQUtHLEtBQUwsQ0FBV3FDLGdCQUZ4QjtBQUdFLG1CQUFTLEtBQUtDLFVBQUwsQ0FBZ0IsS0FBS0Msd0JBQUwsRUFBaEI7QUFIWDtBQUtFO0FBQUE7QUFBQSxZQUFLLFdBQVUsNEJBQWY7QUFDRSx1Q0FBV2hCLFlBQVgsQ0FERjtBQUVHLGVBQUtmLEtBQUwsQ0FBV0QsY0FBWCxHQUNDLG9CQUFDLE9BQUQsT0FERCxHQUVDO0FBQUMsbUJBQUQ7QUFBQSxjQUFTLFdBQVUsY0FBbkI7QUFBbUMsaUJBQUtpQyx1QkFBTDtBQUFuQyxXQUpKO0FBTUU7QUFBQTtBQUFBLGNBQVEsTUFBSyxRQUFiLEVBQXNCLFVBQVUsS0FBS2hDLEtBQUwsQ0FBV0QsY0FBM0MsRUFBMkQsV0FBVSxnQ0FBckUsRUFBc0csU0FBUyxLQUFLa0MsY0FBcEg7QUFBb0ksZ0NBQUMsYUFBRDtBQUFwSTtBQU5GO0FBTEYsT0FERjtBQWVJLFdBQUtqQyxLQUFMLENBQVdFLGdCQUFYLEdBQThCLEtBQUtnQyxVQUFMLEVBQTlCLEdBQWtELElBZnREO0FBZ0JJLFdBQUtsQyxLQUFMLENBQVdJLGFBQVgsR0FBMkIsS0FBSytCLE9BQUwsRUFBM0IsR0FBNEM7QUFoQmhELEtBREY7QUFvQkQsRzs7O0VBOVBvRDNELE1BQU00RCxhOzs7T0FrRDNESCxjLEdBQWlCLFlBQU07QUFDckIsV0FBS0ksb0JBQUwsQ0FBMEIsQ0FBQyxPQUFLckMsS0FBTCxDQUFXRSxnQkFBdEM7QUFDRCxHOztPQUVEZSxZLEdBQWUsWUFBTTtBQUNuQixXQUFLTyxZQUFMLENBQWtCYyxJQUFsQjtBQUNELEc7O09BRURDLGUsR0FBa0IsVUFBQ0MsWUFBRCxFQUFlQyxhQUFmLEVBQWlDO0FBQ2pELFdBQUtoQyxRQUFMLENBQWM7QUFDWlIsZ0JBQVV1QyxZQURFO0FBRVp0Qyx3QkFBa0IsS0FGTjtBQUdaRSxxQkFBZTtBQUhILEtBQWQ7QUFLQSxRQUFNc0MsUUFBUUQsZ0JBQWdCQSxjQUFjRSxHQUFkLENBQWtCO0FBQUEsYUFBUUMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JDLElBQWxCLENBQVI7QUFBQSxLQUFsQixDQUFoQixHQUFxRSxFQUFuRjs7QUFFQSxXQUFLdEQsS0FBTCxDQUFXdUQsUUFBWCxDQUFvQkwsS0FBcEI7QUFDRCxHOztPQUVETSxhLEdBQWdCLFlBQU07QUFDcEIsUUFBSSxPQUFLeEQsS0FBTCxDQUFXeUQsaUJBQWYsRUFBa0M7QUFDaEMsYUFBS0MscUJBQUw7QUFDRDtBQUNGLEc7O09BRURDLGdCLEdBQW1CLFlBQU07QUFDdkIsV0FBSzFDLFFBQUwsQ0FBYyxFQUFFTCxlQUFlLElBQWpCLEVBQWQ7QUFDRCxHOztPQUVEZ0Qsb0IsR0FBdUIsWUFBTTtBQUMzQixXQUFLM0MsUUFBTCxDQUFjO0FBQ1pQLHdCQUFrQjtBQUROLEtBQWQ7QUFHRCxHOztPQUVEbUQsYyxHQUFpQixZQUFNO0FBQ3JCLFdBQUs1QyxRQUFMLENBQWM7QUFDWlAsd0JBQWtCLEtBRE47QUFFWkUscUJBQWU7QUFGSCxLQUFkO0FBSUQsRzs7T0FFRGtELGdCLEdBQW1CLFVBQUNDLFNBQUQsRUFBWUMsYUFBWixFQUEyQmYsYUFBM0IsRUFBNkM7QUFDOUQsUUFBTUQsZUFBZTtBQUNuQlosWUFBTTJCLFNBRGE7QUFFbkJiLGFBQU9jO0FBRlksS0FBckI7QUFJQSxXQUFLL0MsUUFBTCxDQUFjO0FBQ1paLHVCQUFpQjRDO0FBREwsS0FBZDtBQUdBLFdBQUtGLGVBQUwsQ0FBcUJDLFlBQXJCLEVBQW1DQyxhQUFuQztBQUNELEc7O09BRURnQixtQixHQUFzQixVQUFDakIsWUFBRCxFQUFrQjtBQUN0QyxXQUFLa0IsZUFBTDtBQUNBLFFBQU1qQixnQkFBZ0JELGdCQUFnQm1CLE1BQU1DLE9BQU4sQ0FBY3BCLGFBQWFFLEtBQTNCLENBQWhCLEdBQ3BCRixhQUFhRSxLQUFiLENBQW1CQyxHQUFuQixDQUF1QjtBQUFBLGFBQVM7QUFDOUJrQixZQUFJZixLQUFLZSxFQURxQjtBQUU5QmpDLGNBQU1rQixLQUFLbEIsSUFGbUI7QUFHOUJrQyxlQUFPLENBSHVCO0FBSTlCQyxrQkFBVSxJQUpvQjtBQUs5QkMsbUJBQVcsRUFMbUI7QUFNOUJDLHNCQUFjLEtBTmdCO0FBTzlCQyxvQkFBWTtBQVBrQixPQUFUO0FBQUEsS0FBdkIsQ0FEb0IsR0FVbEIsRUFWSjtBQVdBLFdBQUszQixlQUFMLENBQXFCQyxZQUFyQixFQUFtQ0MsYUFBbkM7QUFDRCxHOztPQUVEZixZLEdBQWUsWUFBTTtBQUNuQixRQUFJeUMsZ0JBQWdCLEVBQXBCOztBQUVBLFFBQUksT0FBS25FLEtBQUwsQ0FBV0MsUUFBWCxJQUF1QixPQUFLRCxLQUFMLENBQVdDLFFBQVgsQ0FBb0J5QyxLQUEzQyxJQUFvRCxPQUFLMUMsS0FBTCxDQUFXQyxRQUFYLENBQW9CeUMsS0FBcEIsQ0FBMEI1QyxNQUExQixHQUFtQyxDQUEzRixFQUE4RjtBQUM1RnFFLHNCQUFnQixPQUFLbkUsS0FBTCxDQUFXQyxRQUFYLENBQW9CMkIsSUFBcEM7QUFDRDtBQUNELFdBQU91QyxhQUFQO0FBQ0QsRzs7T0FFRGhDLE8sR0FBVSxZQUFNO0FBQ2QsUUFBTWlDLFVBQVUsT0FBSzVFLEtBQUwsQ0FBVzZFLFdBQTNCO0FBQ0EsUUFBTXhFLGtCQUFrQjhELE1BQU1DLE9BQU4sQ0FBYyxPQUFLNUQsS0FBTCxDQUFXSCxlQUF6QixJQUN0QixPQUFLRyxLQUFMLENBQVdILGVBQVgsQ0FBMkJ5RSxLQUEzQixFQURzQixHQUNlLElBRHZDOztBQUdBLFdBQ0Usb0JBQUMsTUFBRDtBQUNFLDBCQUFvQixPQUFLOUUsS0FBTCxDQUFXRTtBQURqQyxPQUVNMEUsT0FGTjtBQUdFLGdCQUFVLE9BQUtmLGNBSGpCO0FBSUUsZ0JBQVUsT0FBS0MsZ0JBSmpCO0FBS0UsaUJBQVcsT0FBS3RELEtBQUwsQ0FBV0MsUUFBWCxHQUFzQixPQUFLRCxLQUFMLENBQVdDLFFBQVgsQ0FBb0IyQixJQUExQyxHQUFpRCxFQUw5RDtBQU1FLHVCQUFpQi9CO0FBTm5CLE9BREY7QUFVRCxHOztPQUVEcUMsVSxHQUFhLFlBQU07QUFDakIsUUFBTWtDLFVBQVUsT0FBSzVFLEtBQUwsQ0FBVytFLGNBQTNCOztBQUVBLFdBQVEsb0JBQUMsU0FBRDtBQUNOLDBCQUFvQixPQUFLL0UsS0FBTCxDQUFXRSxrQkFEekI7QUFFTix1QkFBaUIsT0FBS3NELGFBRmhCO0FBR04sZ0JBQVUsT0FBS1MsbUJBSFQ7QUFJTix3QkFBa0IsT0FBS04sZ0JBSmpCO0FBS04sNEJBQXNCLE9BQUtDO0FBTHJCLE9BTUZnQixPQU5FLEVBQVI7QUFRRCxHOztPQUVEdEMsVSxHQUFhO0FBQUEsV0FBVztBQUFDLGFBQUQ7QUFBQSxRQUFTLElBQUcsU0FBWixFQUFzQixXQUFVLHNCQUFoQztBQUF3RDBDO0FBQXhELEtBQVg7QUFBQSxHOztPQUViekMsd0IsR0FBMkIsWUFBTTtBQUMvQixRQUFJLENBQUMsT0FBSzBDLGVBQUwsRUFBTCxFQUE2QixPQUFPLE9BQUtqRixLQUFMLENBQVc0QixlQUFsQjtBQUM3QixRQUFNc0QsYUFBYSxPQUFLMUUsS0FBTCxDQUFXQyxRQUFYLENBQW9CeUMsS0FBcEIsQ0FBMEI1QyxNQUE3QztBQUNBLFFBQU02RSxRQUFRRCxhQUFhcEYsMEJBQWIsR0FBMENBLDBCQUExQyxHQUF1RW9GLFVBQXJGOztBQUVBLFFBQU1oQyxRQUFRLE9BQUsxQyxLQUFMLENBQVdDLFFBQVgsQ0FBb0J5QyxLQUFwQixDQUEwQjRCLEtBQTFCLENBQWdDLENBQWhDLEVBQW1DSyxLQUFuQyxDQUFkO0FBQ0EsUUFBTUMsV0FBV2hDLE9BQU9pQyxJQUFQLENBQVluQyxLQUFaLEVBQW1CQyxHQUFuQixDQUF1QjtBQUFBLGFBQUs7QUFBQTtBQUFBLFVBQUcsS0FBS21DLENBQVI7QUFBWXBDLGNBQU1vQyxDQUFOLEVBQVNsRDtBQUFyQixPQUFMO0FBQUEsS0FBdkIsQ0FBakI7O0FBRUEsUUFBSStDLFFBQVFELFVBQVosRUFBd0JFLFNBQVNHLElBQVQsQ0FBYztBQUFBO0FBQUEsUUFBRyxLQUFLSixLQUFSO0FBQUE7QUFBQSxLQUFkOztBQUV4QixXQUFPQyxRQUFQO0FBQ0QsRzs7T0FFRDVDLHVCLEdBQTBCO0FBQUEsV0FBTyxPQUFLeUMsZUFBTCxLQUF5QixPQUFLekUsS0FBTCxDQUFXQyxRQUFYLENBQW9CeUMsS0FBcEIsQ0FBMEI1QyxNQUFuRCxHQUE0RCxDQUFuRTtBQUFBLEc7O09BRTFCdUMsb0IsR0FBdUIsVUFBQzJDLFNBQUQsRUFBZTtBQUNwQyxXQUFLdkUsUUFBTCxDQUFjLEVBQUVQLGtCQUFrQjhFLFNBQXBCLEVBQWQ7QUFDRCxHOztPQUVEUCxlLEdBQWtCO0FBQUEsV0FDaEIsT0FBS3pFLEtBQUwsQ0FBV0MsUUFBWCxJQUF1QixPQUFLRCxLQUFMLENBQVdDLFFBQVgsQ0FBb0J5QyxLQUEzQyxJQUFvRCxPQUFLMUMsS0FBTCxDQUFXQyxRQUFYLENBQW9CeUMsS0FBcEIsQ0FBMEI1QyxNQUExQixHQUFtQyxDQUR2RTtBQUFBLEc7O09BSWxCUSxRLEdBQVcsVUFBQ2QsS0FBRCxFQUFXO0FBQ3BCQSxVQUFNRSxrQkFBTixDQUF5QlksUUFBekIsR0FBb0MyRSxJQUFwQyxDQUF5QyxZQUFNO0FBQzdDLGFBQUt4RSxRQUFMLENBQWM7QUFDWlYsd0JBQWdCO0FBREosT0FBZDtBQUdELEtBSkQ7QUFLRCxHOztPQUVEbUQscUIsR0FBd0IsWUFBTTtBQUM1QmdDLGVBQVcsWUFBTTtBQUNmLFVBQUksT0FBS2xGLEtBQUwsQ0FBV0UsZ0JBQWYsRUFBaUMsT0FBS21DLG9CQUFMLENBQTBCLEtBQTFCO0FBQ2xDLEtBRkQsRUFFRyxHQUZIO0FBR0QsRzs7T0FFRHFCLGUsR0FBa0IsWUFBTTtBQUN0QixXQUFLakQsUUFBTCxDQUFjO0FBQ1paLHVCQUFpQjtBQURMLEtBQWQ7QUFHRCxHOztPQUVEZSxnQixHQUFtQixVQUFDcEIsS0FBRCxFQUFXO0FBQUEsUUFDcEJFLGtCQURvQixHQUN5Q0YsS0FEekMsQ0FDcEJFLGtCQURvQjtBQUFBLFFBQ0F5RixtQkFEQSxHQUN5QzNGLEtBRHpDLENBQ0EyRixtQkFEQTtBQUFBLFFBQ3FCdEYsZUFEckIsR0FDeUNMLEtBRHpDLENBQ3FCSyxlQURyQjs7O0FBRzVCSCx1QkFBbUIwRixrQkFBbkIsQ0FBc0N2RixlQUF0Qzs7QUFFQSxRQUFNNEMsZ0JBQWdCL0MsbUJBQW1CMkYsZ0JBQW5CLEVBQXRCO0FBQ0EsUUFBTTdCLGdCQUFnQjlELG1CQUFtQjRGLGtCQUFuQixFQUF0QjtBQUNBLFFBQU1DLFVBQVU5QyxjQUFjOEMsT0FBZCxJQUF5QixFQUF6Qzs7QUFFQSxXQUFLOUUsUUFBTCxDQUFjO0FBQ1piLDhCQUF3QjtBQURaLEtBQWQ7O0FBSUEsV0FBSzBELGdCQUFMLENBQXNCNkIsbUJBQXRCLEVBQTJDM0IsYUFBM0MsRUFBMEQrQixPQUExRDtBQUNELEc7O1NBek5rQmhHLHlCOzs7QUErUXJCQSwwQkFBMEJpRyxZQUExQixHQUF5QztBQUN2Q3ZDLHFCQUFtQixJQURvQjtBQUV2Q25DLGFBQVcsRUFGNEI7QUFHdkNNLG1CQUFpQixvQkFIc0I7QUFJdkNqQixrQkFBZ0IsS0FKdUI7QUFLdkNOLG1CQUFpQixJQUxzQjtBQU12Q3NGLHVCQUFxQixlQU5rQjtBQU92Q3RELG9CQUFrQixRQVBxQjtBQVF2Q2tCLFlBQVUsb0JBQU0sQ0FBRTtBQVJxQixDQUF6QyIsImZpbGUiOiJjb21iby1ib3guY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tdW51c2VkLXN0YXRlICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBUb29sdGlwLCBPdmVybGF5VHJpZ2dlciB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCBGYUNoZXZyb25Eb3duIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9jaGV2cm9uLWRvd24nO1xyXG5pbXBvcnQgeyBkYXRhU291cmNlUHJvdmlkZXJUeXBlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdHlwZXMnO1xyXG5pbXBvcnQgeyBwcmVDaGVja2VkSXRlbXNMaXN0U2hhcGUsIHBvcG92ZXJPcHRpb25zVHlwZSwgdmlld09wdGlvbnNUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xyXG5pbXBvcnQgU3Bpbm5lciBmcm9tICcuLi9zcGlubmVyJztcclxuaW1wb3J0IEhTUG9wb3ZlciBmcm9tICcuLi9wb3BvdmVyJztcclxuaW1wb3J0IEhTVmlldyBmcm9tICcuLi92aWV3JztcclxuaW1wb3J0IEhTQmFkZ2UgZnJvbSAnLi4vYmFkZ2UnO1xyXG5cclxuXHJcbmltcG9ydCB7IFRPT0xUSVBfREVMQVlfTVMsIE1BWF9DT1VOVF9PRl9UT09MVElQX0lURU1TIH0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgJy4vY29tYm8tYm94LnNjc3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5U2VsZWN0b3JDb21ib0JveCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcblxyXG4gICAgY29uc3QgaXNEYXRhTG9hZGVkID0gcHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzTG9hZGVkO1xyXG4gICAgY29uc3QgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZCA9IHByb3BzLnByZUNoZWNrZWRJdGVtcyAmJiBwcm9wcy5wcmVDaGVja2VkSXRlbXMubGVuZ3RoO1xyXG4gICAgY29uc3QgbmVlZFRvTG9hZERhdGEgPSAhaXNEYXRhTG9hZGVkICYmIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQ7XHJcblxyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgbmVlZFRvTG9hZERhdGEsXHJcbiAgICAgIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQsXHJcbiAgICAgIHByZUNoZWNrZWRJdGVtczogcHJvcHMucHJlQ2hlY2tlZEl0ZW1zLFxyXG4gICAgICBzZWxlY3RlZDogbnVsbCxcclxuICAgICAgaXNQb3BvdmVyVmlzaWJsZTogcHJvcHMucG9wb3ZlclZpc2libGUsXHJcbiAgICAgIGlzVmlld1Zpc2libGU6IGZhbHNlLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgIGNvbnN0IHsgbmVlZFRvTG9hZERhdGEgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBpZiAobmVlZFRvTG9hZERhdGEpIHtcclxuICAgICAgdGhpcy5sb2FkRGF0YSh0aGlzLnByb3BzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XHJcbiAgICBjb25zdCB7IGRhdGFTb3VyY2VQcm92aWRlciwgcHJlQ2hlY2tlZEl0ZW1zIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIGlmIChkYXRhU291cmNlUHJvdmlkZXIgIT09IG5leHRQcm9wcy5kYXRhU291cmNlUHJvdmlkZXIpIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgbmVlZFRvTG9hZERhdGE6IHRydWUsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcmVDaGVja2VkSXRlbXMgIT09IG5leHRQcm9wcy5wcmVDaGVja2VkSXRlbXMpIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZDogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnRXaWxsVXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XHJcbiAgICBjb25zdCB7IG5lZWRUb0xvYWREYXRhLCBuZWVkVG9VcGRhdGVQcmVDaGVja2VkIH0gPSBuZXh0U3RhdGU7XHJcbiAgICBpZiAobmVlZFRvTG9hZERhdGEpIHtcclxuICAgICAgdGhpcy5sb2FkRGF0YShuZXh0UHJvcHMpO1xyXG4gICAgfSBlbHNlIGlmIChuZWVkVG9VcGRhdGVQcmVDaGVja2VkKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlUHJlY2hlY2tlZChuZXh0UHJvcHMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25DbGlja0hhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnNldFBvcG92ZXJWaXNpYmlsaXR5KCF0aGlzLnN0YXRlLmlzUG9wb3ZlclZpc2libGUpO1xyXG4gIH1cclxuXHJcbiAgb25JbnB1dEZvY3VzID0gKCkgPT4ge1xyXG4gICAgdGhpcy5pbnB1dEVsZW1lbnQuYmx1cigpO1xyXG4gIH1cclxuXHJcbiAgb25TZWxlY3RIYW5kbGVyID0gKHNlbGVjdGVkSXRlbSwgY2hlY2tlZE91dHB1dCkgPT4ge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIHNlbGVjdGVkOiBzZWxlY3RlZEl0ZW0sXHJcbiAgICAgIGlzUG9wb3ZlclZpc2libGU6IGZhbHNlLFxyXG4gICAgICBpc1ZpZXdWaXNpYmxlOiBmYWxzZSxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgaXRlbXMgPSBjaGVja2VkT3V0cHV0ID8gY2hlY2tlZE91dHB1dC5tYXAoaXRlbSA9PiBPYmplY3QuYXNzaWduKHt9LCBpdGVtKSkgOiBbXTtcclxuXHJcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGl0ZW1zKTtcclxuICB9XHJcblxyXG4gIG9uUG9wb3ZlckJsdXIgPSAoKSA9PiB7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5oaWRlT25Qb3BvdmVyQmx1cikge1xyXG4gICAgICB0aGlzLnBvcG92ZXJTaG91bGRCZUhpZGRlbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25TaG91bGRPcGVuVmlldyA9ICgpID0+IHtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBpc1ZpZXdWaXNpYmxlOiB0cnVlIH0pO1xyXG4gIH1cclxuXHJcbiAgb25TaG91bGRDbG9zZVBvcG92ZXIgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgaXNQb3BvdmVyVmlzaWJsZTogZmFsc2UsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uQ2FuY2VsZWRWaWV3ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGlzUG9wb3ZlclZpc2libGU6IGZhbHNlLFxyXG4gICAgICBpc1ZpZXdWaXNpYmxlOiBmYWxzZSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25TZWxlY3RlZEluVmlldyA9IChncm91cE5hbWUsIHNlbGVjdGVkSXRlbXMsIGNoZWNrZWRPdXRwdXQpID0+IHtcclxuICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IHtcclxuICAgICAgbmFtZTogZ3JvdXBOYW1lLFxyXG4gICAgICBpdGVtczogc2VsZWN0ZWRJdGVtcyxcclxuICAgIH07XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgcHJlQ2hlY2tlZEl0ZW1zOiBjaGVja2VkT3V0cHV0LFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLm9uU2VsZWN0SGFuZGxlcihzZWxlY3RlZEl0ZW0sIGNoZWNrZWRPdXRwdXQpO1xyXG4gIH1cclxuXHJcbiAgb25TZWxlY3RlZEluUG9wb3ZlciA9IChzZWxlY3RlZEl0ZW0pID0+IHtcclxuICAgIHRoaXMudW5jaGVja0FsbEl0ZW1zKCk7XHJcbiAgICBjb25zdCBjaGVja2VkT3V0cHV0ID0gc2VsZWN0ZWRJdGVtICYmIEFycmF5LmlzQXJyYXkoc2VsZWN0ZWRJdGVtLml0ZW1zKSA/XHJcbiAgICAgIHNlbGVjdGVkSXRlbS5pdGVtcy5tYXAoaXRlbSA9PiAoe1xyXG4gICAgICAgIGlkOiBpdGVtLmlkLFxyXG4gICAgICAgIG5hbWU6IGl0ZW0ubmFtZSxcclxuICAgICAgICBsZXZlbDogMCxcclxuICAgICAgICBwYXJlbnRJZDogbnVsbCxcclxuICAgICAgICBwYXJlbnRJZHM6IFtdLFxyXG4gICAgICAgIGlzQ2hlY2tlZEFsbDogZmFsc2UsXHJcbiAgICAgICAgaXNDaGlsZHJlbjogZmFsc2UsXHJcbiAgICAgIH0pKVxyXG4gICAgICA6IFtdO1xyXG4gICAgdGhpcy5vblNlbGVjdEhhbmRsZXIoc2VsZWN0ZWRJdGVtLCBjaGVja2VkT3V0cHV0KTtcclxuICB9XHJcblxyXG4gIGdldElucHV0VGV4dCA9ICgpID0+IHtcclxuICAgIGxldCBzZWxlY3Rpb25UZXh0ID0gJyc7XHJcblxyXG4gICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWQgJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcyAmJiB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgc2VsZWN0aW9uVGV4dCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWQubmFtZTtcclxuICAgIH1cclxuICAgIHJldHVybiBzZWxlY3Rpb25UZXh0O1xyXG4gIH1cclxuXHJcbiAgZ2V0VmlldyA9ICgpID0+IHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLnByb3BzLnZpZXdPcHRpb25zO1xyXG4gICAgY29uc3QgcHJlQ2hlY2tlZEl0ZW1zID0gQXJyYXkuaXNBcnJheSh0aGlzLnN0YXRlLnByZUNoZWNrZWRJdGVtcykgP1xyXG4gICAgICB0aGlzLnN0YXRlLnByZUNoZWNrZWRJdGVtcy5zbGljZSgpIDogbnVsbDtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8SFNWaWV3XHJcbiAgICAgICAgZGF0YVNvdXJjZVByb3ZpZGVyPXt0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlcn1cclxuICAgICAgICB7Li4ub3B0aW9uc31cclxuICAgICAgICBvbkNhbmNlbD17dGhpcy5vbkNhbmNlbGVkVmlld31cclxuICAgICAgICBvblNlbGVjdD17dGhpcy5vblNlbGVjdGVkSW5WaWV3fVxyXG4gICAgICAgIGdyb3VwTmFtZT17dGhpcy5zdGF0ZS5zZWxlY3RlZCA/IHRoaXMuc3RhdGUuc2VsZWN0ZWQubmFtZSA6ICcnfVxyXG4gICAgICAgIHByZUNoZWNrZWRJdGVtcz17cHJlQ2hlY2tlZEl0ZW1zfVxyXG4gICAgICAvPlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldFBvcG92ZXIgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5wcm9wcy5wb3BvdmVyT3B0aW9ucztcclxuXHJcbiAgICByZXR1cm4gKDxIU1BvcG92ZXJcclxuICAgICAgZGF0YVNvdXJjZVByb3ZpZGVyPXt0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlcn1cclxuICAgICAgb25Db21wb25lbnRCbHVyPXt0aGlzLm9uUG9wb3ZlckJsdXJ9XHJcbiAgICAgIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0ZWRJblBvcG92ZXJ9XHJcbiAgICAgIG9uU2hvdWxkT3BlblZpZXc9e3RoaXMub25TaG91bGRPcGVuVmlld31cclxuICAgICAgb25TaG91bGRDbG9zZVBvcG92ZXI9e3RoaXMub25TaG91bGRDbG9zZVBvcG92ZXJ9XHJcbiAgICAgIHsuLi5vcHRpb25zfVxyXG4gICAgLz4pO1xyXG4gIH1cclxuXHJcbiAgZ2V0VG9vbFRpcCA9IGNvbnRlbnQgPT4gPFRvb2x0aXAgaWQ9XCJ0b29sdGlwXCIgY2xhc3NOYW1lPVwiaHMtY29tYm8tYm94LXRvb2x0aXBcIj57Y29udGVudH08L1Rvb2x0aXA+O1xyXG5cclxuICBnZXREZWZhdWx0VG9vbFRpcENvbnRlbnQgPSAoKSA9PiB7XHJcbiAgICBpZiAoIXRoaXMuaXNTZWxlY3RlZEl0ZW1zKCkpIHJldHVybiB0aGlzLnByb3BzLm5vU2VsZWN0aW9uVGV4dDtcclxuICAgIGNvbnN0IHRvdGFsQ291bnQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLmxlbmd0aDtcclxuICAgIGNvbnN0IGNvdW50ID0gdG90YWxDb3VudCA+IE1BWF9DT1VOVF9PRl9UT09MVElQX0lURU1TID8gTUFYX0NPVU5UX09GX1RPT0xUSVBfSVRFTVMgOiB0b3RhbENvdW50O1xyXG5cclxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5zbGljZSgwLCBjb3VudCk7XHJcbiAgICBjb25zdCBlbGVtZW50cyA9IE9iamVjdC5rZXlzKGl0ZW1zKS5tYXAoaSA9PiA8cCBrZXk9e2l9PntpdGVtc1tpXS5uYW1lfTwvcD4pO1xyXG5cclxuICAgIGlmIChjb3VudCA8IHRvdGFsQ291bnQpIGVsZW1lbnRzLnB1c2goPHAga2V5PXtjb3VudH0+LiAuIC48L3A+KTtcclxuXHJcbiAgICByZXR1cm4gZWxlbWVudHM7XHJcbiAgfVxyXG5cclxuICBnZXRDb3VudE9mU2VsZWN0ZWRJdGVtcyA9ICgpID0+ICh0aGlzLmlzU2VsZWN0ZWRJdGVtcygpID8gdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5sZW5ndGggOiAwKTtcclxuXHJcbiAgc2V0UG9wb3ZlclZpc2liaWxpdHkgPSAoaXNWaXNpYmxlKSA9PiB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgaXNQb3BvdmVyVmlzaWJsZTogaXNWaXNpYmxlIH0pO1xyXG4gIH1cclxuXHJcbiAgaXNTZWxlY3RlZEl0ZW1zID0gKCkgPT4gKFxyXG4gICAgdGhpcy5zdGF0ZS5zZWxlY3RlZCAmJiB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zICYmIHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMubGVuZ3RoID4gMFxyXG4gICk7XHJcblxyXG4gIGxvYWREYXRhID0gKHByb3BzKSA9PiB7XHJcbiAgICBwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIubG9hZERhdGEoKS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgbmVlZFRvTG9hZERhdGE6IGZhbHNlLFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcG9wb3ZlclNob3VsZEJlSGlkZGVuID0gKCkgPT4ge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnN0YXRlLmlzUG9wb3ZlclZpc2libGUpIHRoaXMuc2V0UG9wb3ZlclZpc2liaWxpdHkoZmFsc2UpO1xyXG4gICAgfSwgMTUwKTtcclxuICB9XHJcblxyXG4gIHVuY2hlY2tBbGxJdGVtcyA9ICgpID0+IHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBwcmVDaGVja2VkSXRlbXM6IFtdLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVQcmVjaGVja2VkID0gKHByb3BzKSA9PiB7XHJcbiAgICBjb25zdCB7IGRhdGFTb3VyY2VQcm92aWRlciwgcHJlQ2hlY2tlZEdyb3VwTmFtZSwgcHJlQ2hlY2tlZEl0ZW1zIH0gPSBwcm9wcztcclxuXHJcbiAgICBkYXRhU291cmNlUHJvdmlkZXIuc2V0UHJlY2hlY2tlZEl0ZW1zKHByZUNoZWNrZWRJdGVtcyk7XHJcblxyXG4gICAgY29uc3QgY2hlY2tlZE91dHB1dCA9IGRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkT3V0cHV0KCk7XHJcbiAgICBjb25zdCBzZWxlY3RlZEl0ZW1zID0gZGF0YVNvdXJjZVByb3ZpZGVyLmdldEFsbENoZWNrZWRJdGVtcygpO1xyXG4gICAgY29uc3QgY2hlY2tlZCA9IGNoZWNrZWRPdXRwdXQuY2hlY2tlZCB8fCBbXTtcclxuXHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZDogZmFsc2UsXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm9uU2VsZWN0ZWRJblZpZXcocHJlQ2hlY2tlZEdyb3VwTmFtZSwgc2VsZWN0ZWRJdGVtcywgY2hlY2tlZCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IGlucHV0TmFtZSB9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IGlucHV0T3B0aW9ucyA9IHtcclxuICAgICAgb25Gb2N1czogdGhpcy5vbklucHV0Rm9jdXMsXHJcbiAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucHJvcHMubm9TZWxlY3Rpb25UZXh0LFxyXG4gICAgICByZWFkT25seTogdHJ1ZSxcclxuICAgICAgcmVmOiAoaW5wdXQpID0+IHsgdGhpcy5pbnB1dEVsZW1lbnQgPSBpbnB1dDsgfSxcclxuICAgICAgdmFsdWU6IHRoaXMuZ2V0SW5wdXRUZXh0KCksXHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChpbnB1dE5hbWUudHJpbSgpICE9PSAnJykge1xyXG4gICAgICBpbnB1dE9wdGlvbnMubmFtZSA9IGlucHV0TmFtZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1saXN0LXdyYXBwZXJcIj5cclxuICAgICAgICA8T3ZlcmxheVRyaWdnZXJcclxuICAgICAgICAgIGRlbGF5PXtUT09MVElQX0RFTEFZX01TfVxyXG4gICAgICAgICAgcGxhY2VtZW50PXt0aGlzLnByb3BzLnRvb2x0aXBQbGFjZW1lbnR9XHJcbiAgICAgICAgICBvdmVybGF5PXt0aGlzLmdldFRvb2xUaXAodGhpcy5nZXREZWZhdWx0VG9vbFRpcENvbnRlbnQoKSl9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItbGlzdFwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgey4uLmlucHV0T3B0aW9uc30gLz5cclxuICAgICAgICAgICAge3RoaXMuc3RhdGUubmVlZFRvTG9hZERhdGEgP1xyXG4gICAgICAgICAgICAgIDxTcGlubmVyIC8+IDpcclxuICAgICAgICAgICAgICA8SFNCYWRnZSBjbGFzc05hbWU9XCJiYWRnZS1vcmFuZ2VcIj57dGhpcy5nZXRDb3VudE9mU2VsZWN0ZWRJdGVtcygpfTwvSFNCYWRnZT5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkaXNhYmxlZD17dGhpcy5zdGF0ZS5uZWVkVG9Mb2FkRGF0YX0gY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWxpc3QtYnRuXCIgb25DbGljaz17dGhpcy5vbkNsaWNrSGFuZGxlcn0+PEZhQ2hldnJvbkRvd24gLz48L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvT3ZlcmxheVRyaWdnZXI+XHJcbiAgICAgICAgeyB0aGlzLnN0YXRlLmlzUG9wb3ZlclZpc2libGUgPyB0aGlzLmdldFBvcG92ZXIoKSA6IG51bGwgfVxyXG4gICAgICAgIHsgdGhpcy5zdGF0ZS5pc1ZpZXdWaXNpYmxlID8gdGhpcy5nZXRWaWV3KCkgOiBudWxsIH1cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuSGllcmFyY2h5U2VsZWN0b3JDb21ib0JveC5wcm9wVHlwZXMgPSB7XHJcbiAgZGF0YVNvdXJjZVByb3ZpZGVyOiBkYXRhU291cmNlUHJvdmlkZXJUeXBlLmlzUmVxdWlyZWQsXHJcbiAgaGlkZU9uUG9wb3ZlckJsdXI6IFByb3BUeXBlcy5ib29sLFxyXG4gIGlucHV0TmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICBub1NlbGVjdGlvblRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgcG9wb3ZlclZpc2libGU6IFByb3BUeXBlcy5ib29sLFxyXG4gIHBvcG92ZXJPcHRpb25zOiBwb3BvdmVyT3B0aW9uc1R5cGUuaXNSZXF1aXJlZCxcclxuICBwcmVDaGVja2VkSXRlbXM6IHByZUNoZWNrZWRJdGVtc0xpc3RTaGFwZSxcclxuICBwcmVDaGVja2VkR3JvdXBOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIHRvb2x0aXBQbGFjZW1lbnQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgdmlld09wdGlvbnM6IHZpZXdPcHRpb25zVHlwZS5pc1JlcXVpcmVkLFxyXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcclxufTtcclxuXHJcbkhpZXJhcmNoeVNlbGVjdG9yQ29tYm9Cb3guZGVmYXVsdFByb3BzID0ge1xyXG4gIGhpZGVPblBvcG92ZXJCbHVyOiB0cnVlLFxyXG4gIGlucHV0TmFtZTogJycsXHJcbiAgbm9TZWxlY3Rpb25UZXh0OiAnTm8gb25lIHNlbGVjdGVkLi4uJyxcclxuICBwb3BvdmVyVmlzaWJsZTogZmFsc2UsXHJcbiAgcHJlQ2hlY2tlZEl0ZW1zOiBudWxsLFxyXG4gIHByZUNoZWNrZWRHcm91cE5hbWU6ICdEZWZhdWx0IGdyb3VwJyxcclxuICB0b29sdGlwUGxhY2VtZW50OiAnYm90dG9tJyxcclxuICBvblNlbGVjdDogKCkgPT4ge30sXHJcbn07XHJcbiJdfQ==