'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps; /* eslint-disable react/no-unused-state */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _chevronDown = require('react-icons/lib/fa/chevron-down');

var _chevronDown2 = _interopRequireDefault(_chevronDown);

var _close = require('react-icons/lib/fa/close');

var _close2 = _interopRequireDefault(_close);

var _types = require('../../services/types');

var _types2 = require('../../types');

var _spinner = require('../spinner');

var _spinner2 = _interopRequireDefault(_spinner);

var _popover = require('../popover');

var _popover2 = _interopRequireDefault(_popover);

var _view = require('../view');

var _view2 = _interopRequireDefault(_view);

var _badge = require('../badge');

var _badge2 = _interopRequireDefault(_badge);

var _constants = require('./constants');

require('./combo-box.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

    return _react2.default.createElement(
      'div',
      { className: 'oc-hierarchy-selector-list-wrapper' },
      _react2.default.createElement(
        _reactBootstrap.OverlayTrigger,
        {
          delay: _constants.TOOLTIP_DELAY_MS,
          placement: this.props.tooltipPlacement,
          overlay: this.getToolTip(this.getDefaultToolTipContent())
        },
        _react2.default.createElement(
          'div',
          { className: 'oc-hierarchy-selector-list' },
          _react2.default.createElement('input', inputOptions),
          isBusy ? _react2.default.createElement(_spinner2.default, null) : _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement(
              _badge2.default,
              { className: 'badge-orange' },
              this.getCountOfSelectedItems()
            ),
            this.getClearButton()
          ),
          _react2.default.createElement(
            'button',
            {
              type: 'button',
              disabled: isBusy,
              className: 'oc-hierarchy-selector-list-btn',
              onClick: this.onClickHandler
            },
            _react2.default.createElement(_chevronDown2.default, null)
          )
        )
      ),
      this.state.isPopoverVisible ? this.getPopover() : null,
      this.state.isViewVisible ? this.getView() : null
    );
  };

  return HierarchySelectorComboBox;
}(_react2.default.PureComponent), _initialiseProps = function _initialiseProps() {
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
    return _react2.default.createElement(
      'button',
      {
        type: 'reset',
        className: 'oc-hierarchy-selector-list-clear-btn',
        onClick: _this3.onClearHandler
      },
      _react2.default.createElement(_close2.default, null)
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

    return _react2.default.createElement(_view2.default, _extends({
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

    return _react2.default.createElement(_popover2.default, _extends({
      dataSourceProvider: _this3.props.dataSourceProvider,
      onComponentBlur: _this3.onPopoverBlur,
      onSelect: _this3.onSelectedInPopover,
      onShouldOpenView: _this3.onShouldOpenView,
      onShouldClosePopover: _this3.onShouldClosePopover
    }, options));
  };

  this.getToolTip = function (content) {
    return _react2.default.createElement(
      _reactBootstrap.Tooltip,
      { id: 'tooltip', className: 'hs-combo-box-tooltip' },
      content
    );
  };

  this.getDefaultToolTipContent = function () {
    if (!_this3.isSelectedItems()) return _this3.props.noSelectionText;
    var totalCount = _this3.state.selected.items.length;
    var count = totalCount > _constants.MAX_COUNT_OF_TOOLTIP_ITEMS ? _constants.MAX_COUNT_OF_TOOLTIP_ITEMS : totalCount;

    var items = _this3.state.selected.items.slice(0, count);
    var elements = Object.keys(items).map(function (i) {
      return _this3.props.tooltipItemRenderFunction ? _this3.props.tooltipItemRenderFunction(items[i], i, _this3.defaultItemRenderFunction) : _this3.defaultItemRenderFunction(items[i], i);
    });
    if (count < totalCount) elements.push(_react2.default.createElement(
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
    return _react2.default.createElement(
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
exports.default = HierarchySelectorComboBox;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbWJvLWJveC9jb21iby1ib3guY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJIaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94IiwicHJvcHMiLCJpc0RhdGFMb2FkZWQiLCJkYXRhU291cmNlUHJvdmlkZXIiLCJpc0xvYWRlZCIsIm5lZWRUb1VwZGF0ZVByZUNoZWNrZWQiLCJwcmVDaGVja2VkSXRlbXMiLCJsZW5ndGgiLCJuZWVkVG9Mb2FkRGF0YSIsInN0YXRlIiwic2VsZWN0ZWQiLCJpc1BvcG92ZXJWaXNpYmxlIiwicG9wb3ZlclZpc2libGUiLCJpc1ZpZXdWaXNpYmxlIiwiY29tcG9uZW50V2lsbE1vdW50IiwibG9hZERhdGEiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwic2V0U3RhdGUiLCJjb21wb25lbnRXaWxsVXBkYXRlIiwibmV4dFN0YXRlIiwidXBkYXRlUHJlY2hlY2tlZCIsInJlbmRlciIsImlucHV0TmFtZSIsImlucHV0T3B0aW9ucyIsIm9uRm9jdXMiLCJvbklucHV0Rm9jdXMiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJub1NlbGVjdGlvblRleHQiLCJyZWFkT25seSIsInJlZiIsImlucHV0IiwiaW5wdXRFbGVtZW50IiwidmFsdWUiLCJnZXRJbnB1dFRleHQiLCJvbkNsaWNrIiwib25DbGlja0hhbmRsZXIiLCJ0cmltIiwibmFtZSIsImlzQnVzeSIsIlRPT0xUSVBfREVMQVlfTVMiLCJ0b29sdGlwUGxhY2VtZW50IiwiZ2V0VG9vbFRpcCIsImdldERlZmF1bHRUb29sVGlwQ29udGVudCIsImdldENvdW50T2ZTZWxlY3RlZEl0ZW1zIiwiZ2V0Q2xlYXJCdXR0b24iLCJnZXRQb3BvdmVyIiwiZ2V0VmlldyIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsInNldFBvcG92ZXJWaXNpYmlsaXR5IiwiYmx1ciIsIm9uU2VsZWN0SGFuZGxlciIsImdyb3VwTmFtZSIsInNlbGVjdGVkSXRlbSIsImNoZWNrZWRPdXRwdXQiLCJmbGFncyIsIml0ZW1zIiwibWFwIiwiT2JqZWN0IiwiYXNzaWduIiwiaXRlbSIsIm9uU2VsZWN0Iiwib25Qb3BvdmVyQmx1ciIsImhpZGVPblBvcG92ZXJCbHVyIiwicG9wb3ZlclNob3VsZEJlSGlkZGVuIiwib25TaG91bGRPcGVuVmlldyIsIm9uU2hvdWxkQ2xvc2VQb3BvdmVyIiwib25DYW5jZWxlZFZpZXciLCJvblNlbGVjdGVkSW5WaWV3Iiwic2VsZWN0ZWRJdGVtcyIsIm9uU2VsZWN0ZWRJblBvcG92ZXIiLCJ1bmNoZWNrQWxsSXRlbXMiLCJBcnJheSIsImlzQXJyYXkiLCJvbkNsZWFySGFuZGxlciIsImludGVyYWN0aXZlIiwiaXNDbGVhcmFibGUiLCJzZWxlY3Rpb25UZXh0Iiwib3B0aW9ucyIsInZpZXdPcHRpb25zIiwic2xpY2UiLCJvbkhlbHAiLCJwb3BvdmVyT3B0aW9ucyIsImNvbnRlbnQiLCJpc1NlbGVjdGVkSXRlbXMiLCJ0b3RhbENvdW50IiwiY291bnQiLCJNQVhfQ09VTlRfT0ZfVE9PTFRJUF9JVEVNUyIsImVsZW1lbnRzIiwia2V5cyIsInRvb2x0aXBJdGVtUmVuZGVyRnVuY3Rpb24iLCJpIiwiZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbiIsInB1c2giLCJpc1Zpc2libGUiLCJrZXkiLCJ0aGVuIiwic2V0VGltZW91dCIsInByZUNoZWNrZWRHcm91cE5hbWUiLCJzZXRQcmVjaGVja2VkSXRlbXMiLCJnZXRDaGVja2VkT3V0cHV0IiwiZ2V0QWxsQ2hlY2tlZEl0ZW1zIiwiY2hlY2tlZCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztxQ0FBQTs7QUFFQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBR0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLHlCOzs7QUFDbkIscUNBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFB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QyxxQkFBbUIsSUFEb0I7QUFFdkMxQyxhQUFXLEVBRjRCO0FBR3ZDTSxtQkFBaUIscUJBSHNCO0FBSXZDakIsa0JBQWdCLEtBSnVCO0FBS3ZDTixtQkFBaUIsSUFMc0I7QUFNdkM4Rix1QkFBcUIsZUFOa0I7QUFPdkMxRCxvQkFBa0IsUUFQcUI7QUFRdkNxQixZQUFVLG9CQUFNLENBQUUsQ0FScUI7QUFTdkNvQixVQUFRLGtCQUFNLENBQUUsQ0FUdUI7QUFVdkNTLDZCQUEyQixJQVZZO0FBV3ZDZCxlQUFhLEtBWDBCO0FBWXZDdEMsVUFBUTtBQVorQixDQUF6QyIsImZpbGUiOiJjb21iby1ib3guY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tdW51c2VkLXN0YXRlICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBUb29sdGlwLCBPdmVybGF5VHJpZ2dlciB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEZhQ2hldnJvbkRvd24gZnJvbSAncmVhY3QtaWNvbnMvbGliL2ZhL2NoZXZyb24tZG93bic7XG5pbXBvcnQgRmFDbG9zZSBmcm9tICdyZWFjdC1pY29ucy9saWIvZmEvY2xvc2UnO1xuaW1wb3J0IHsgZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3R5cGVzJztcbmltcG9ydCB7IHByZUNoZWNrZWRJdGVtc0xpc3RTaGFwZSwgcG9wb3Zlck9wdGlvbnNUeXBlLCB2aWV3T3B0aW9uc1R5cGUgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgU3Bpbm5lciBmcm9tICcuLi9zcGlubmVyJztcbmltcG9ydCBIU1BvcG92ZXIgZnJvbSAnLi4vcG9wb3Zlcic7XG5pbXBvcnQgSFNWaWV3IGZyb20gJy4uL3ZpZXcnO1xuaW1wb3J0IEhTQmFkZ2UgZnJvbSAnLi4vYmFkZ2UnO1xuXG5cbmltcG9ydCB7IFRPT0xUSVBfREVMQVlfTVMsIE1BWF9DT1VOVF9PRl9UT09MVElQX0lURU1TIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0ICcuL2NvbWJvLWJveC5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5U2VsZWN0b3JDb21ib0JveCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIGNvbnN0IGlzRGF0YUxvYWRlZCA9IHByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5pc0xvYWRlZDtcbiAgICBjb25zdCBuZWVkVG9VcGRhdGVQcmVDaGVja2VkID0gcHJvcHMucHJlQ2hlY2tlZEl0ZW1zICYmIHByb3BzLnByZUNoZWNrZWRJdGVtcy5sZW5ndGg7XG4gICAgY29uc3QgbmVlZFRvTG9hZERhdGEgPSAhaXNEYXRhTG9hZGVkICYmIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQ7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbmVlZFRvTG9hZERhdGEsXG4gICAgICBuZWVkVG9VcGRhdGVQcmVDaGVja2VkLFxuICAgICAgcHJlQ2hlY2tlZEl0ZW1zOiBwcm9wcy5wcmVDaGVja2VkSXRlbXMsXG4gICAgICBzZWxlY3RlZDogbnVsbCxcbiAgICAgIGlzUG9wb3ZlclZpc2libGU6IHByb3BzLnBvcG92ZXJWaXNpYmxlLFxuICAgICAgaXNWaWV3VmlzaWJsZTogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICBjb25zdCB7IG5lZWRUb0xvYWREYXRhIH0gPSB0aGlzLnN0YXRlO1xuICAgIGlmIChuZWVkVG9Mb2FkRGF0YSkge1xuICAgICAgdGhpcy5sb2FkRGF0YSh0aGlzLnByb3BzKTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGNvbnN0IHsgZGF0YVNvdXJjZVByb3ZpZGVyLCBwcmVDaGVja2VkSXRlbXMgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoZGF0YVNvdXJjZVByb3ZpZGVyICE9PSBuZXh0UHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbmVlZFRvTG9hZERhdGE6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocHJlQ2hlY2tlZEl0ZW1zICE9PSBuZXh0UHJvcHMucHJlQ2hlY2tlZEl0ZW1zKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZDogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICBjb25zdCB7IG5lZWRUb0xvYWREYXRhLCBuZWVkVG9VcGRhdGVQcmVDaGVja2VkIH0gPSBuZXh0U3RhdGU7XG4gICAgaWYgKG5lZWRUb0xvYWREYXRhKSB7XG4gICAgICB0aGlzLmxvYWREYXRhKG5leHRQcm9wcyk7XG4gICAgfSBlbHNlIGlmIChuZWVkVG9VcGRhdGVQcmVDaGVja2VkKSB7XG4gICAgICB0aGlzLnVwZGF0ZVByZWNoZWNrZWQobmV4dFByb3BzKTtcbiAgICB9XG4gIH1cblxuICBvbkNsaWNrSGFuZGxlciA9ICgpID0+IHtcbiAgICB0aGlzLnNldFBvcG92ZXJWaXNpYmlsaXR5KCF0aGlzLnN0YXRlLmlzUG9wb3ZlclZpc2libGUpO1xuICB9XG5cbiAgb25JbnB1dEZvY3VzID0gKCkgPT4ge1xuICAgIHRoaXMuaW5wdXRFbGVtZW50LmJsdXIoKTtcbiAgfVxuXG4gIG9uU2VsZWN0SGFuZGxlciA9IChncm91cE5hbWUsIHNlbGVjdGVkSXRlbSwgY2hlY2tlZE91dHB1dCwgZmxhZ3MpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkOiBzZWxlY3RlZEl0ZW0sXG4gICAgICBpc1BvcG92ZXJWaXNpYmxlOiBmYWxzZSxcbiAgICAgIGlzVmlld1Zpc2libGU6IGZhbHNlLFxuICAgIH0pO1xuICAgIGNvbnN0IGl0ZW1zID0gY2hlY2tlZE91dHB1dCA/IGNoZWNrZWRPdXRwdXQubWFwKGl0ZW0gPT4gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSkpIDogW107XG5cbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGl0ZW1zLCBncm91cE5hbWUsIGZsYWdzKTtcbiAgfVxuXG4gIG9uUG9wb3ZlckJsdXIgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuaGlkZU9uUG9wb3ZlckJsdXIpIHtcbiAgICAgIHRoaXMucG9wb3ZlclNob3VsZEJlSGlkZGVuKCk7XG4gICAgfVxuICB9XG5cbiAgb25TaG91bGRPcGVuVmlldyA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgaXNWaWV3VmlzaWJsZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIG9uU2hvdWxkQ2xvc2VQb3BvdmVyID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaXNQb3BvdmVyVmlzaWJsZTogZmFsc2UsXG4gICAgfSk7XG4gIH1cblxuICBvbkNhbmNlbGVkVmlldyA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlzUG9wb3ZlclZpc2libGU6IGZhbHNlLFxuICAgICAgaXNWaWV3VmlzaWJsZTogZmFsc2UsXG4gICAgfSk7XG4gIH1cblxuICBvblNlbGVjdGVkSW5WaWV3ID0gKGdyb3VwTmFtZSwgc2VsZWN0ZWRJdGVtcywgY2hlY2tlZE91dHB1dCwgZmxhZ3MpID0+IHtcbiAgICBjb25zdCBzZWxlY3RlZEl0ZW0gPSB7XG4gICAgICBuYW1lOiBncm91cE5hbWUsXG4gICAgICBpdGVtczogc2VsZWN0ZWRJdGVtcyxcbiAgICB9O1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcHJlQ2hlY2tlZEl0ZW1zOiBjaGVja2VkT3V0cHV0LFxuICAgIH0pO1xuICAgIHRoaXMub25TZWxlY3RIYW5kbGVyKGdyb3VwTmFtZSwgc2VsZWN0ZWRJdGVtLCBjaGVja2VkT3V0cHV0LCBmbGFncyk7XG4gIH1cblxuICBvblNlbGVjdGVkSW5Qb3BvdmVyID0gKHNlbGVjdGVkSXRlbSwgZmxhZ3MpID0+IHtcbiAgICB0aGlzLnVuY2hlY2tBbGxJdGVtcygpO1xuICAgIGNvbnN0IGNoZWNrZWRPdXRwdXQgPSBzZWxlY3RlZEl0ZW0gJiYgQXJyYXkuaXNBcnJheShzZWxlY3RlZEl0ZW0uaXRlbXMpID9cbiAgICAgIHNlbGVjdGVkSXRlbS5pdGVtcyA6IFtdO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcHJlQ2hlY2tlZEl0ZW1zOiBjaGVja2VkT3V0cHV0LFxuICAgIH0pO1xuICAgIHRoaXMub25TZWxlY3RIYW5kbGVyKHNlbGVjdGVkSXRlbS5uYW1lLCBzZWxlY3RlZEl0ZW0sIGNoZWNrZWRPdXRwdXQsIGZsYWdzKTtcbiAgfVxuXG4gIG9uQ2xlYXJIYW5kbGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGdyb3VwTmFtZSA9ICcnO1xuICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IFtdO1xuICAgIGNvbnN0IGNoZWNrZWRPdXRwdXQgPSBbXTtcbiAgICBjb25zdCBmbGFncyA9IHsgaW50ZXJhY3RpdmU6IHRydWUgfTtcbiAgICB0aGlzLnVuY2hlY2tBbGxJdGVtcygpO1xuICAgIHRoaXMub25TZWxlY3RIYW5kbGVyKGdyb3VwTmFtZSwgc2VsZWN0ZWRJdGVtLCBjaGVja2VkT3V0cHV0LCBmbGFncyk7XG4gIH1cblxuICBnZXRDbGVhckJ1dHRvbiA9ICgpID0+IHtcbiAgICBpZiAoXG4gICAgICAhdGhpcy5wcm9wcy5pc0NsZWFyYWJsZVxuICAgICAgfHwgIXRoaXMuc3RhdGUuc2VsZWN0ZWRcbiAgICAgIHx8ICF0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zXG4gICAgICB8fCAhdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5sZW5ndGhcbiAgICApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwicmVzZXRcIlxuICAgICAgICBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItbGlzdC1jbGVhci1idG5cIlxuICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xlYXJIYW5kbGVyfVxuICAgICAgPlxuICAgICAgICA8RmFDbG9zZSAvPlxuICAgICAgPC9idXR0b24+XG4gICAgKTtcbiAgfVxuXG4gIGdldElucHV0VGV4dCA9ICgpID0+IHtcbiAgICBsZXQgc2VsZWN0aW9uVGV4dCA9ICcnO1xuXG4gICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWQgJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcyAmJiB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgIHNlbGVjdGlvblRleHQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkLm5hbWU7XG4gICAgfVxuICAgIHJldHVybiBzZWxlY3Rpb25UZXh0O1xuICB9XG5cbiAgZ2V0VmlldyA9ICgpID0+IHtcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5wcm9wcy52aWV3T3B0aW9ucztcbiAgICBjb25zdCBwcmVDaGVja2VkSXRlbXMgPSBBcnJheS5pc0FycmF5KHRoaXMuc3RhdGUucHJlQ2hlY2tlZEl0ZW1zKSA/XG4gICAgICB0aGlzLnN0YXRlLnByZUNoZWNrZWRJdGVtcy5zbGljZSgpIDogbnVsbDtcblxuICAgIHJldHVybiAoXG4gICAgICA8SFNWaWV3XG4gICAgICAgIGRhdGFTb3VyY2VQcm92aWRlcj17dGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXJ9XG4gICAgICAgIHsuLi5vcHRpb25zfVxuICAgICAgICBvbkNhbmNlbD17dGhpcy5vbkNhbmNlbGVkVmlld31cbiAgICAgICAgb25TZWxlY3Q9e3RoaXMub25TZWxlY3RlZEluVmlld31cbiAgICAgICAgb25IZWxwPXt0aGlzLnByb3BzLm9uSGVscH1cbiAgICAgICAgZ3JvdXBOYW1lPXt0aGlzLnN0YXRlLnNlbGVjdGVkID8gdGhpcy5zdGF0ZS5zZWxlY3RlZC5uYW1lIDogJyd9XG4gICAgICAgIHByZUNoZWNrZWRJdGVtcz17cHJlQ2hlY2tlZEl0ZW1zfVxuICAgICAgICBpc0NsZWFyYWJsZT17dGhpcy5wcm9wcy5pc0NsZWFyYWJsZX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIGdldFBvcG92ZXIgPSAoKSA9PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMucHJvcHMucG9wb3Zlck9wdGlvbnM7XG5cbiAgICByZXR1cm4gKDxIU1BvcG92ZXJcbiAgICAgIGRhdGFTb3VyY2VQcm92aWRlcj17dGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXJ9XG4gICAgICBvbkNvbXBvbmVudEJsdXI9e3RoaXMub25Qb3BvdmVyQmx1cn1cbiAgICAgIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0ZWRJblBvcG92ZXJ9XG4gICAgICBvblNob3VsZE9wZW5WaWV3PXt0aGlzLm9uU2hvdWxkT3BlblZpZXd9XG4gICAgICBvblNob3VsZENsb3NlUG9wb3Zlcj17dGhpcy5vblNob3VsZENsb3NlUG9wb3Zlcn1cbiAgICAgIHsuLi5vcHRpb25zfVxuICAgIC8+KTtcbiAgfVxuXG4gIGdldFRvb2xUaXAgPSBjb250ZW50ID0+IDxUb29sdGlwIGlkPVwidG9vbHRpcFwiIGNsYXNzTmFtZT1cImhzLWNvbWJvLWJveC10b29sdGlwXCI+e2NvbnRlbnR9PC9Ub29sdGlwPjtcblxuICBnZXREZWZhdWx0VG9vbFRpcENvbnRlbnQgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzU2VsZWN0ZWRJdGVtcygpKSByZXR1cm4gdGhpcy5wcm9wcy5ub1NlbGVjdGlvblRleHQ7XG4gICAgY29uc3QgdG90YWxDb3VudCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMubGVuZ3RoO1xuICAgIGNvbnN0IGNvdW50ID0gdG90YWxDb3VudCA+IE1BWF9DT1VOVF9PRl9UT09MVElQX0lURU1TID8gTUFYX0NPVU5UX09GX1RPT0xUSVBfSVRFTVMgOiB0b3RhbENvdW50O1xuXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLnNsaWNlKDAsIGNvdW50KTtcbiAgICBjb25zdCBlbGVtZW50cyA9IE9iamVjdC5rZXlzKGl0ZW1zKS5tYXAoaSA9PiAodGhpcy5wcm9wcy50b29sdGlwSXRlbVJlbmRlckZ1bmN0aW9uID9cbiAgICAgIHRoaXMucHJvcHMudG9vbHRpcEl0ZW1SZW5kZXJGdW5jdGlvbihpdGVtc1tpXSwgaSwgdGhpcy5kZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uKSA6XG4gICAgICB0aGlzLmRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24oaXRlbXNbaV0sIGkpKSk7XG4gICAgaWYgKGNvdW50IDwgdG90YWxDb3VudCkgZWxlbWVudHMucHVzaCg8cCBrZXk9e2NvdW50fT4uIC4gLjwvcD4pO1xuXG4gICAgcmV0dXJuIGVsZW1lbnRzO1xuICB9XG5cbiAgZ2V0Q291bnRPZlNlbGVjdGVkSXRlbXMgPSAoKSA9PiAodGhpcy5pc1NlbGVjdGVkSXRlbXMoKSA/IHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMubGVuZ3RoIDogMCk7XG5cbiAgc2V0UG9wb3ZlclZpc2liaWxpdHkgPSAoaXNWaXNpYmxlKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlzUG9wb3ZlclZpc2libGU6IGlzVmlzaWJsZSB9KTtcbiAgfVxuXG4gIGRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24gPSAoaXRlbSwga2V5KSA9PiAoPHAga2V5PXtrZXl9PntpdGVtLm5hbWV9PC9wPik7XG5cbiAgaXNTZWxlY3RlZEl0ZW1zID0gKCkgPT4gKFxuICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWQgJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcyAmJiB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLmxlbmd0aCA+IDBcbiAgKTtcblxuICBsb2FkRGF0YSA9IChwcm9wcykgPT4ge1xuICAgIHByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5sb2FkRGF0YSgpLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG5lZWRUb0xvYWREYXRhOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcG9wb3ZlclNob3VsZEJlSGlkZGVuID0gKCkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuc3RhdGUuaXNQb3BvdmVyVmlzaWJsZSkgdGhpcy5zZXRQb3BvdmVyVmlzaWJpbGl0eShmYWxzZSk7XG4gICAgfSwgMTUwKTtcbiAgfVxuXG4gIHVuY2hlY2tBbGxJdGVtcyA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHByZUNoZWNrZWRJdGVtczogW10sXG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVQcmVjaGVja2VkID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhU291cmNlUHJvdmlkZXIsIHByZUNoZWNrZWRHcm91cE5hbWUsIHByZUNoZWNrZWRJdGVtcyB9ID0gcHJvcHM7XG5cbiAgICBkYXRhU291cmNlUHJvdmlkZXIuc2V0UHJlY2hlY2tlZEl0ZW1zKHByZUNoZWNrZWRJdGVtcyk7XG5cbiAgICBjb25zdCBjaGVja2VkT3V0cHV0ID0gZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWRPdXRwdXQoKTtcbiAgICBjb25zdCBzZWxlY3RlZEl0ZW1zID0gZGF0YVNvdXJjZVByb3ZpZGVyLmdldEFsbENoZWNrZWRJdGVtcygpO1xuICAgIGNvbnN0IGNoZWNrZWQgPSBjaGVja2VkT3V0cHV0LmNoZWNrZWQgfHwgW107XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQ6IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5vblNlbGVjdGVkSW5WaWV3KHByZUNoZWNrZWRHcm91cE5hbWUsIHNlbGVjdGVkSXRlbXMsIGNoZWNrZWQpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaW5wdXROYW1lIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGlucHV0T3B0aW9ucyA9IHtcbiAgICAgIG9uRm9jdXM6IHRoaXMub25JbnB1dEZvY3VzLFxuICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucHJvcHMubm9TZWxlY3Rpb25UZXh0LFxuICAgICAgcmVhZE9ubHk6IHRydWUsXG4gICAgICByZWY6IChpbnB1dCkgPT4geyB0aGlzLmlucHV0RWxlbWVudCA9IGlucHV0OyB9LFxuICAgICAgdmFsdWU6IHRoaXMuZ2V0SW5wdXRUZXh0KCksXG4gICAgICBvbkNsaWNrOiB0aGlzLm9uQ2xpY2tIYW5kbGVyLFxuICAgIH07XG5cbiAgICBpZiAoaW5wdXROYW1lLnRyaW0oKSAhPT0gJycpIHtcbiAgICAgIGlucHV0T3B0aW9ucy5uYW1lID0gaW5wdXROYW1lO1xuICAgIH1cblxuICAgIGNvbnN0IGlzQnVzeSA9IHRoaXMucHJvcHMuaXNCdXN5IHx8IHRoaXMuc3RhdGUubmVlZFRvTG9hZERhdGE7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItbGlzdC13cmFwcGVyXCI+XG4gICAgICAgIDxPdmVybGF5VHJpZ2dlclxuICAgICAgICAgIGRlbGF5PXtUT09MVElQX0RFTEFZX01TfVxuICAgICAgICAgIHBsYWNlbWVudD17dGhpcy5wcm9wcy50b29sdGlwUGxhY2VtZW50fVxuICAgICAgICAgIG92ZXJsYXk9e3RoaXMuZ2V0VG9vbFRpcCh0aGlzLmdldERlZmF1bHRUb29sVGlwQ29udGVudCgpKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWxpc3RcIj5cbiAgICAgICAgICAgIDxpbnB1dCB7Li4uaW5wdXRPcHRpb25zfSAvPlxuICAgICAgICAgICAge2lzQnVzeSA/XG4gICAgICAgICAgICAgIDxTcGlubmVyIC8+IDpcbiAgICAgICAgICAgICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgICAgICAgICAgIDxIU0JhZGdlIGNsYXNzTmFtZT1cImJhZGdlLW9yYW5nZVwiPnt0aGlzLmdldENvdW50T2ZTZWxlY3RlZEl0ZW1zKCl9PC9IU0JhZGdlPlxuICAgICAgICAgICAgICAgIHt0aGlzLmdldENsZWFyQnV0dG9uKCl9XG4gICAgICAgICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNCdXN5fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItbGlzdC1idG5cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tIYW5kbGVyfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8RmFDaGV2cm9uRG93biAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvT3ZlcmxheVRyaWdnZXI+XG4gICAgICAgIHsgdGhpcy5zdGF0ZS5pc1BvcG92ZXJWaXNpYmxlID8gdGhpcy5nZXRQb3BvdmVyKCkgOiBudWxsIH1cbiAgICAgICAgeyB0aGlzLnN0YXRlLmlzVmlld1Zpc2libGUgPyB0aGlzLmdldFZpZXcoKSA6IG51bGwgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5IaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94LnByb3BUeXBlcyA9IHtcbiAgZGF0YVNvdXJjZVByb3ZpZGVyOiBkYXRhU291cmNlUHJvdmlkZXJUeXBlLmlzUmVxdWlyZWQsXG4gIGhpZGVPblBvcG92ZXJCbHVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgaW5wdXROYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBub1NlbGVjdGlvblRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHBvcG92ZXJWaXNpYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgcG9wb3Zlck9wdGlvbnM6IHBvcG92ZXJPcHRpb25zVHlwZS5pc1JlcXVpcmVkLFxuICBwcmVDaGVja2VkSXRlbXM6IHByZUNoZWNrZWRJdGVtc0xpc3RTaGFwZSxcbiAgcHJlQ2hlY2tlZEdyb3VwTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgdG9vbHRpcFBsYWNlbWVudDogUHJvcFR5cGVzLnN0cmluZyxcbiAgdmlld09wdGlvbnM6IHZpZXdPcHRpb25zVHlwZS5pc1JlcXVpcmVkLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uSGVscDogUHJvcFR5cGVzLmZ1bmMsXG4gIHRvb2x0aXBJdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICBpc0NsZWFyYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gIGlzQnVzeTogUHJvcFR5cGVzLmJvb2wsXG59O1xuXG5IaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94LmRlZmF1bHRQcm9wcyA9IHtcbiAgaGlkZU9uUG9wb3ZlckJsdXI6IHRydWUsXG4gIGlucHV0TmFtZTogJycsXG4gIG5vU2VsZWN0aW9uVGV4dDogJ05vdGhpbmcgc2VsZWN0ZWQuLi4nLFxuICBwb3BvdmVyVmlzaWJsZTogZmFsc2UsXG4gIHByZUNoZWNrZWRJdGVtczogbnVsbCxcbiAgcHJlQ2hlY2tlZEdyb3VwTmFtZTogJ0RlZmF1bHQgZ3JvdXAnLFxuICB0b29sdGlwUGxhY2VtZW50OiAnYm90dG9tJyxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBvbkhlbHA6ICgpID0+IHt9LFxuICB0b29sdGlwSXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxuICBpc0NsZWFyYWJsZTogZmFsc2UsXG4gIGlzQnVzeTogZmFsc2UsXG59O1xuIl19