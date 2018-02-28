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
      value: this.getInputText()
    };

    if (inputName.trim() !== '') {
      inputOptions.name = inputName;
    }

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
          this.state.needToLoadData ? _react2.default.createElement(_spinner2.default, null) : _react2.default.createElement(
            _badge2.default,
            { className: 'badge-orange' },
            this.getCountOfSelectedItems()
          ),
          _react2.default.createElement(
            'button',
            { type: 'button', disabled: this.state.needToLoadData, className: 'oc-hierarchy-selector-list-btn', onClick: this.onClickHandler },
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

    return _react2.default.createElement(_view2.default, _extends({
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
      return _react2.default.createElement(
        'p',
        { key: i },
        items[i].name
      );
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
  noSelectionText: 'No one selected...',
  popoverVisible: false,
  preCheckedItems: null,
  preCheckedGroupName: 'Default group',
  tooltipPlacement: 'bottom',
  onSelect: function onSelect() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbWJvLWJveC9jb21iby1ib3guY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJIaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94IiwicHJvcHMiLCJpc0RhdGFMb2FkZWQiLCJkYXRhU291cmNlUHJvdmlkZXIiLCJpc0xvYWRlZCIsIm5lZWRUb1VwZGF0ZVByZUNoZWNrZWQiLCJwcmVDaGVja2VkSXRlbXMiLCJsZW5ndGgiLCJuZWVkVG9Mb2FkRGF0YSIsInN0YXRlIiwic2VsZWN0ZWQiLCJpc1BvcG92ZXJWaXNpYmxlIiwicG9wb3ZlclZpc2libGUiLCJpc1ZpZXdWaXNpYmxlIiwiY29tcG9uZW50V2lsbE1vdW50IiwibG9hZERhdGEiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwic2V0U3RhdGUiLCJjb21wb25lbnRXaWxsVXBkYXRlIiwibmV4dFN0YXRlIiwidXBkYXRlUHJlY2hlY2tlZCIsInJlbmRlciIsImlucHV0TmFtZSIsImlucHV0T3B0aW9ucyIsIm9uRm9jdXMiLCJvbklucHV0Rm9jdXMiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJub1NlbGVjdGlvblRleHQiLCJyZWFkT25seSIsInJlZiIsImlucHV0IiwiaW5wdXRFbGVtZW50IiwidmFsdWUiLCJnZXRJbnB1dFRleHQiLCJ0cmltIiwibmFtZSIsInRvb2x0aXBQbGFjZW1lbnQiLCJnZXRUb29sVGlwIiwiZ2V0RGVmYXVsdFRvb2xUaXBDb250ZW50IiwiZ2V0Q291bnRPZlNlbGVjdGVkSXRlbXMiLCJvbkNsaWNrSGFuZGxlciIsImdldFBvcG92ZXIiLCJnZXRWaWV3IiwiUHVyZUNvbXBvbmVudCIsInNldFBvcG92ZXJWaXNpYmlsaXR5IiwiYmx1ciIsIm9uU2VsZWN0SGFuZGxlciIsInNlbGVjdGVkSXRlbSIsImNoZWNrZWRPdXRwdXQiLCJpdGVtcyIsIm1hcCIsIk9iamVjdCIsImFzc2lnbiIsIml0ZW0iLCJvblNlbGVjdCIsIm9uUG9wb3ZlckJsdXIiLCJoaWRlT25Qb3BvdmVyQmx1ciIsInBvcG92ZXJTaG91bGRCZUhpZGRlbiIsIm9uU2hvdWxkT3BlblZpZXciLCJvblNob3VsZENsb3NlUG9wb3ZlciIsIm9uQ2FuY2VsZWRWaWV3Iiwib25TZWxlY3RlZEluVmlldyIsImdyb3VwTmFtZSIsInNlbGVjdGVkSXRlbXMiLCJvblNlbGVjdGVkSW5Qb3BvdmVyIiwidW5jaGVja0FsbEl0ZW1zIiwiQXJyYXkiLCJpc0FycmF5IiwiaWQiLCJsZXZlbCIsInBhcmVudElkIiwicGFyZW50SWRzIiwiaXNDaGVja2VkQWxsIiwiaXNDaGlsZHJlbiIsInNlbGVjdGlvblRleHQiLCJvcHRpb25zIiwidmlld09wdGlvbnMiLCJzbGljZSIsInBvcG92ZXJPcHRpb25zIiwiY29udGVudCIsImlzU2VsZWN0ZWRJdGVtcyIsInRvdGFsQ291bnQiLCJjb3VudCIsImVsZW1lbnRzIiwia2V5cyIsImkiLCJwdXNoIiwiaXNWaXNpYmxlIiwidGhlbiIsInNldFRpbWVvdXQiLCJwcmVDaGVja2VkR3JvdXBOYW1lIiwic2V0UHJlY2hlY2tlZEl0ZW1zIiwiZ2V0Q2hlY2tlZE91dHB1dCIsImdldEFsbENoZWNrZWRJdGVtcyIsImNoZWNrZWQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7cUNBQUE7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFHQTs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEseUI7OztBQUNuQixxQ0FBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQTs7QUFHakIsUUFBTUMsZUFBZUQsTUFBTUUsa0JBQU4sQ0FBeUJDLFFBQTlDO0FBQ0EsUUFBTUMseUJBQXlCSixNQUFNSyxlQUFOLElBQXlCTCxNQUFNSyxlQUFOLENBQXNCQyxNQUE5RTtBQUNBLFFBQU1DLGlCQUFpQixDQUFD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QUZIO0FBR0QsRzs7T0FFRHFCLGUsR0FBa0IsWUFBTTtBQUN0QixXQUFLakQsUUFBTCxDQUFjO0FBQ1paLHVCQUFpQjtBQURMLEtBQWQ7QUFHRCxHOztPQUVEZSxnQixHQUFtQixVQUFDcEIsS0FBRCxFQUFXO0FBQUEsUUFDcEJFLGtCQURvQixHQUN5Q0YsS0FEekMsQ0FDcEJFLGtCQURvQjtBQUFBLFFBQ0F5RixtQkFEQSxHQUN5QzNGLEtBRHpDLENBQ0EyRixtQkFEQTtBQUFBLFFBQ3FCdEYsZUFEckIsR0FDeUNMLEtBRHpDLENBQ3FCSyxlQURyQjs7O0FBRzVCSCx1QkFBbUIwRixrQkFBbkIsQ0FBc0N2RixlQUF0Qzs7QUFFQSxRQUFNNEMsZ0JBQWdCL0MsbUJBQW1CMkYsZ0JBQW5CLEVBQXRCO0FBQ0EsUUFBTTdCLGdCQUFnQjlELG1CQUFtQjRGLGtCQUFuQixFQUF0QjtBQUNBLFFBQU1DLFVBQVU5QyxjQUFjOEMsT0FBZCxJQUF5QixFQUF6Qzs7QUFFQSxXQUFLOUUsUUFBTCxDQUFjO0FBQ1piLDhCQUF3QjtBQURaLEtBQWQ7O0FBSUEsV0FBSzBELGdCQUFMLENBQXNCNkIsbUJBQXRCLEVBQTJDM0IsYUFBM0MsRUFBMEQrQixPQUExRDtBQUNELEc7O2tCQXpOa0JoRyx5Qjs7O0FBK1FyQkEsMEJBQTBCaUcsWUFBMUIsR0FBeUM7QUFDdkN2QyxxQkFBbUIsSUFEb0I7QUFFdkNuQyxhQUFXLEVBRjRCO0FBR3ZDTSxtQkFBaUIsb0JBSHNCO0FBSXZDakIsa0JBQWdCLEtBSnVCO0FBS3ZDTixtQkFBaUIsSUFMc0I7QUFNdkNzRix1QkFBcUIsZUFOa0I7QUFPdkN0RCxvQkFBa0IsUUFQcUI7QUFRdkNrQixZQUFVLG9CQUFNLENBQUU7QUFScUIsQ0FBekMiLCJmaWxlIjoiY29tYm8tYm94LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXVudXNlZC1zdGF0ZSAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgVG9vbHRpcCwgT3ZlcmxheVRyaWdnZXIgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBGYUNoZXZyb25Eb3duIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9jaGV2cm9uLWRvd24nO1xuaW1wb3J0IHsgZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3R5cGVzJztcbmltcG9ydCB7IHByZUNoZWNrZWRJdGVtc0xpc3RTaGFwZSwgcG9wb3Zlck9wdGlvbnNUeXBlLCB2aWV3T3B0aW9uc1R5cGUgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgU3Bpbm5lciBmcm9tICcuLi9zcGlubmVyJztcbmltcG9ydCBIU1BvcG92ZXIgZnJvbSAnLi4vcG9wb3Zlcic7XG5pbXBvcnQgSFNWaWV3IGZyb20gJy4uL3ZpZXcnO1xuaW1wb3J0IEhTQmFkZ2UgZnJvbSAnLi4vYmFkZ2UnO1xuXG5cbmltcG9ydCB7IFRPT0xUSVBfREVMQVlfTVMsIE1BWF9DT1VOVF9PRl9UT09MVElQX0lURU1TIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0ICcuL2NvbWJvLWJveC5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5U2VsZWN0b3JDb21ib0JveCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIGNvbnN0IGlzRGF0YUxvYWRlZCA9IHByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5pc0xvYWRlZDtcbiAgICBjb25zdCBuZWVkVG9VcGRhdGVQcmVDaGVja2VkID0gcHJvcHMucHJlQ2hlY2tlZEl0ZW1zICYmIHByb3BzLnByZUNoZWNrZWRJdGVtcy5sZW5ndGg7XG4gICAgY29uc3QgbmVlZFRvTG9hZERhdGEgPSAhaXNEYXRhTG9hZGVkICYmIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQ7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbmVlZFRvTG9hZERhdGEsXG4gICAgICBuZWVkVG9VcGRhdGVQcmVDaGVja2VkLFxuICAgICAgcHJlQ2hlY2tlZEl0ZW1zOiBwcm9wcy5wcmVDaGVja2VkSXRlbXMsXG4gICAgICBzZWxlY3RlZDogbnVsbCxcbiAgICAgIGlzUG9wb3ZlclZpc2libGU6IHByb3BzLnBvcG92ZXJWaXNpYmxlLFxuICAgICAgaXNWaWV3VmlzaWJsZTogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICBjb25zdCB7IG5lZWRUb0xvYWREYXRhIH0gPSB0aGlzLnN0YXRlO1xuICAgIGlmIChuZWVkVG9Mb2FkRGF0YSkge1xuICAgICAgdGhpcy5sb2FkRGF0YSh0aGlzLnByb3BzKTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGNvbnN0IHsgZGF0YVNvdXJjZVByb3ZpZGVyLCBwcmVDaGVja2VkSXRlbXMgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoZGF0YVNvdXJjZVByb3ZpZGVyICE9PSBuZXh0UHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbmVlZFRvTG9hZERhdGE6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocHJlQ2hlY2tlZEl0ZW1zICE9PSBuZXh0UHJvcHMucHJlQ2hlY2tlZEl0ZW1zKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZDogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICBjb25zdCB7IG5lZWRUb0xvYWREYXRhLCBuZWVkVG9VcGRhdGVQcmVDaGVja2VkIH0gPSBuZXh0U3RhdGU7XG4gICAgaWYgKG5lZWRUb0xvYWREYXRhKSB7XG4gICAgICB0aGlzLmxvYWREYXRhKG5leHRQcm9wcyk7XG4gICAgfSBlbHNlIGlmIChuZWVkVG9VcGRhdGVQcmVDaGVja2VkKSB7XG4gICAgICB0aGlzLnVwZGF0ZVByZWNoZWNrZWQobmV4dFByb3BzKTtcbiAgICB9XG4gIH1cblxuICBvbkNsaWNrSGFuZGxlciA9ICgpID0+IHtcbiAgICB0aGlzLnNldFBvcG92ZXJWaXNpYmlsaXR5KCF0aGlzLnN0YXRlLmlzUG9wb3ZlclZpc2libGUpO1xuICB9XG5cbiAgb25JbnB1dEZvY3VzID0gKCkgPT4ge1xuICAgIHRoaXMuaW5wdXRFbGVtZW50LmJsdXIoKTtcbiAgfVxuXG4gIG9uU2VsZWN0SGFuZGxlciA9IChzZWxlY3RlZEl0ZW0sIGNoZWNrZWRPdXRwdXQpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkOiBzZWxlY3RlZEl0ZW0sXG4gICAgICBpc1BvcG92ZXJWaXNpYmxlOiBmYWxzZSxcbiAgICAgIGlzVmlld1Zpc2libGU6IGZhbHNlLFxuICAgIH0pO1xuICAgIGNvbnN0IGl0ZW1zID0gY2hlY2tlZE91dHB1dCA/IGNoZWNrZWRPdXRwdXQubWFwKGl0ZW0gPT4gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSkpIDogW107XG5cbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGl0ZW1zKTtcbiAgfVxuXG4gIG9uUG9wb3ZlckJsdXIgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuaGlkZU9uUG9wb3ZlckJsdXIpIHtcbiAgICAgIHRoaXMucG9wb3ZlclNob3VsZEJlSGlkZGVuKCk7XG4gICAgfVxuICB9XG5cbiAgb25TaG91bGRPcGVuVmlldyA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgaXNWaWV3VmlzaWJsZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIG9uU2hvdWxkQ2xvc2VQb3BvdmVyID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaXNQb3BvdmVyVmlzaWJsZTogZmFsc2UsXG4gICAgfSk7XG4gIH1cblxuICBvbkNhbmNlbGVkVmlldyA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlzUG9wb3ZlclZpc2libGU6IGZhbHNlLFxuICAgICAgaXNWaWV3VmlzaWJsZTogZmFsc2UsXG4gICAgfSk7XG4gIH1cblxuICBvblNlbGVjdGVkSW5WaWV3ID0gKGdyb3VwTmFtZSwgc2VsZWN0ZWRJdGVtcywgY2hlY2tlZE91dHB1dCkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IHtcbiAgICAgIG5hbWU6IGdyb3VwTmFtZSxcbiAgICAgIGl0ZW1zOiBzZWxlY3RlZEl0ZW1zLFxuICAgIH07XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwcmVDaGVja2VkSXRlbXM6IGNoZWNrZWRPdXRwdXQsXG4gICAgfSk7XG4gICAgdGhpcy5vblNlbGVjdEhhbmRsZXIoc2VsZWN0ZWRJdGVtLCBjaGVja2VkT3V0cHV0KTtcbiAgfVxuXG4gIG9uU2VsZWN0ZWRJblBvcG92ZXIgPSAoc2VsZWN0ZWRJdGVtKSA9PiB7XG4gICAgdGhpcy51bmNoZWNrQWxsSXRlbXMoKTtcbiAgICBjb25zdCBjaGVja2VkT3V0cHV0ID0gc2VsZWN0ZWRJdGVtICYmIEFycmF5LmlzQXJyYXkoc2VsZWN0ZWRJdGVtLml0ZW1zKSA/XG4gICAgICBzZWxlY3RlZEl0ZW0uaXRlbXMubWFwKGl0ZW0gPT4gKHtcbiAgICAgICAgaWQ6IGl0ZW0uaWQsXG4gICAgICAgIG5hbWU6IGl0ZW0ubmFtZSxcbiAgICAgICAgbGV2ZWw6IDAsXG4gICAgICAgIHBhcmVudElkOiBudWxsLFxuICAgICAgICBwYXJlbnRJZHM6IFtdLFxuICAgICAgICBpc0NoZWNrZWRBbGw6IGZhbHNlLFxuICAgICAgICBpc0NoaWxkcmVuOiBmYWxzZSxcbiAgICAgIH0pKVxuICAgICAgOiBbXTtcbiAgICB0aGlzLm9uU2VsZWN0SGFuZGxlcihzZWxlY3RlZEl0ZW0sIGNoZWNrZWRPdXRwdXQpO1xuICB9XG5cbiAgZ2V0SW5wdXRUZXh0ID0gKCkgPT4ge1xuICAgIGxldCBzZWxlY3Rpb25UZXh0ID0gJyc7XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3RlZCAmJiB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zICYmIHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgc2VsZWN0aW9uVGV4dCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWQubmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGlvblRleHQ7XG4gIH1cblxuICBnZXRWaWV3ID0gKCkgPT4ge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLnByb3BzLnZpZXdPcHRpb25zO1xuICAgIGNvbnN0IHByZUNoZWNrZWRJdGVtcyA9IEFycmF5LmlzQXJyYXkodGhpcy5zdGF0ZS5wcmVDaGVja2VkSXRlbXMpID9cbiAgICAgIHRoaXMuc3RhdGUucHJlQ2hlY2tlZEl0ZW1zLnNsaWNlKCkgOiBudWxsO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxIU1ZpZXdcbiAgICAgICAgZGF0YVNvdXJjZVByb3ZpZGVyPXt0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlcn1cbiAgICAgICAgey4uLm9wdGlvbnN9XG4gICAgICAgIG9uQ2FuY2VsPXt0aGlzLm9uQ2FuY2VsZWRWaWV3fVxuICAgICAgICBvblNlbGVjdD17dGhpcy5vblNlbGVjdGVkSW5WaWV3fVxuICAgICAgICBncm91cE5hbWU9e3RoaXMuc3RhdGUuc2VsZWN0ZWQgPyB0aGlzLnN0YXRlLnNlbGVjdGVkLm5hbWUgOiAnJ31cbiAgICAgICAgcHJlQ2hlY2tlZEl0ZW1zPXtwcmVDaGVja2VkSXRlbXN9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICBnZXRQb3BvdmVyID0gKCkgPT4ge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLnByb3BzLnBvcG92ZXJPcHRpb25zO1xuXG4gICAgcmV0dXJuICg8SFNQb3BvdmVyXG4gICAgICBkYXRhU291cmNlUHJvdmlkZXI9e3RoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyfVxuICAgICAgb25Db21wb25lbnRCbHVyPXt0aGlzLm9uUG9wb3ZlckJsdXJ9XG4gICAgICBvblNlbGVjdD17dGhpcy5vblNlbGVjdGVkSW5Qb3BvdmVyfVxuICAgICAgb25TaG91bGRPcGVuVmlldz17dGhpcy5vblNob3VsZE9wZW5WaWV3fVxuICAgICAgb25TaG91bGRDbG9zZVBvcG92ZXI9e3RoaXMub25TaG91bGRDbG9zZVBvcG92ZXJ9XG4gICAgICB7Li4ub3B0aW9uc31cbiAgICAvPik7XG4gIH1cblxuICBnZXRUb29sVGlwID0gY29udGVudCA9PiA8VG9vbHRpcCBpZD1cInRvb2x0aXBcIiBjbGFzc05hbWU9XCJocy1jb21iby1ib3gtdG9vbHRpcFwiPntjb250ZW50fTwvVG9vbHRpcD47XG5cbiAgZ2V0RGVmYXVsdFRvb2xUaXBDb250ZW50ID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5pc1NlbGVjdGVkSXRlbXMoKSkgcmV0dXJuIHRoaXMucHJvcHMubm9TZWxlY3Rpb25UZXh0O1xuICAgIGNvbnN0IHRvdGFsQ291bnQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLmxlbmd0aDtcbiAgICBjb25zdCBjb3VudCA9IHRvdGFsQ291bnQgPiBNQVhfQ09VTlRfT0ZfVE9PTFRJUF9JVEVNUyA/IE1BWF9DT1VOVF9PRl9UT09MVElQX0lURU1TIDogdG90YWxDb3VudDtcblxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5zbGljZSgwLCBjb3VudCk7XG4gICAgY29uc3QgZWxlbWVudHMgPSBPYmplY3Qua2V5cyhpdGVtcykubWFwKGkgPT4gPHAga2V5PXtpfT57aXRlbXNbaV0ubmFtZX08L3A+KTtcblxuICAgIGlmIChjb3VudCA8IHRvdGFsQ291bnQpIGVsZW1lbnRzLnB1c2goPHAga2V5PXtjb3VudH0+LiAuIC48L3A+KTtcblxuICAgIHJldHVybiBlbGVtZW50cztcbiAgfVxuXG4gIGdldENvdW50T2ZTZWxlY3RlZEl0ZW1zID0gKCkgPT4gKHRoaXMuaXNTZWxlY3RlZEl0ZW1zKCkgPyB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLmxlbmd0aCA6IDApO1xuXG4gIHNldFBvcG92ZXJWaXNpYmlsaXR5ID0gKGlzVmlzaWJsZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBpc1BvcG92ZXJWaXNpYmxlOiBpc1Zpc2libGUgfSk7XG4gIH1cblxuICBpc1NlbGVjdGVkSXRlbXMgPSAoKSA9PiAoXG4gICAgdGhpcy5zdGF0ZS5zZWxlY3RlZCAmJiB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zICYmIHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMubGVuZ3RoID4gMFxuICApO1xuXG4gIGxvYWREYXRhID0gKHByb3BzKSA9PiB7XG4gICAgcHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmxvYWREYXRhKCkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbmVlZFRvTG9hZERhdGE6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwb3BvdmVyU2hvdWxkQmVIaWRkZW4gPSAoKSA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5pc1BvcG92ZXJWaXNpYmxlKSB0aGlzLnNldFBvcG92ZXJWaXNpYmlsaXR5KGZhbHNlKTtcbiAgICB9LCAxNTApO1xuICB9XG5cbiAgdW5jaGVja0FsbEl0ZW1zID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcHJlQ2hlY2tlZEl0ZW1zOiBbXSxcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVByZWNoZWNrZWQgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IGRhdGFTb3VyY2VQcm92aWRlciwgcHJlQ2hlY2tlZEdyb3VwTmFtZSwgcHJlQ2hlY2tlZEl0ZW1zIH0gPSBwcm9wcztcblxuICAgIGRhdGFTb3VyY2VQcm92aWRlci5zZXRQcmVjaGVja2VkSXRlbXMocHJlQ2hlY2tlZEl0ZW1zKTtcblxuICAgIGNvbnN0IGNoZWNrZWRPdXRwdXQgPSBkYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZE91dHB1dCgpO1xuICAgIGNvbnN0IHNlbGVjdGVkSXRlbXMgPSBkYXRhU291cmNlUHJvdmlkZXIuZ2V0QWxsQ2hlY2tlZEl0ZW1zKCk7XG4gICAgY29uc3QgY2hlY2tlZCA9IGNoZWNrZWRPdXRwdXQuY2hlY2tlZCB8fCBbXTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZDogZmFsc2UsXG4gICAgfSk7XG5cbiAgICB0aGlzLm9uU2VsZWN0ZWRJblZpZXcocHJlQ2hlY2tlZEdyb3VwTmFtZSwgc2VsZWN0ZWRJdGVtcywgY2hlY2tlZCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBpbnB1dE5hbWUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaW5wdXRPcHRpb25zID0ge1xuICAgICAgb25Gb2N1czogdGhpcy5vbklucHV0Rm9jdXMsXG4gICAgICB0eXBlOiAndGV4dCcsXG4gICAgICBwbGFjZWhvbGRlcjogdGhpcy5wcm9wcy5ub1NlbGVjdGlvblRleHQsXG4gICAgICByZWFkT25seTogdHJ1ZSxcbiAgICAgIHJlZjogKGlucHV0KSA9PiB7IHRoaXMuaW5wdXRFbGVtZW50ID0gaW5wdXQ7IH0sXG4gICAgICB2YWx1ZTogdGhpcy5nZXRJbnB1dFRleHQoKSxcbiAgICB9O1xuXG4gICAgaWYgKGlucHV0TmFtZS50cmltKCkgIT09ICcnKSB7XG4gICAgICBpbnB1dE9wdGlvbnMubmFtZSA9IGlucHV0TmFtZTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItbGlzdC13cmFwcGVyXCI+XG4gICAgICAgIDxPdmVybGF5VHJpZ2dlclxuICAgICAgICAgIGRlbGF5PXtUT09MVElQX0RFTEFZX01TfVxuICAgICAgICAgIHBsYWNlbWVudD17dGhpcy5wcm9wcy50b29sdGlwUGxhY2VtZW50fVxuICAgICAgICAgIG92ZXJsYXk9e3RoaXMuZ2V0VG9vbFRpcCh0aGlzLmdldERlZmF1bHRUb29sVGlwQ29udGVudCgpKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWxpc3RcIj5cbiAgICAgICAgICAgIDxpbnB1dCB7Li4uaW5wdXRPcHRpb25zfSAvPlxuICAgICAgICAgICAge3RoaXMuc3RhdGUubmVlZFRvTG9hZERhdGEgP1xuICAgICAgICAgICAgICA8U3Bpbm5lciAvPiA6XG4gICAgICAgICAgICAgIDxIU0JhZGdlIGNsYXNzTmFtZT1cImJhZGdlLW9yYW5nZVwiPnt0aGlzLmdldENvdW50T2ZTZWxlY3RlZEl0ZW1zKCl9PC9IU0JhZGdlPlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZGlzYWJsZWQ9e3RoaXMuc3RhdGUubmVlZFRvTG9hZERhdGF9IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1saXN0LWJ0blwiIG9uQ2xpY2s9e3RoaXMub25DbGlja0hhbmRsZXJ9PjxGYUNoZXZyb25Eb3duIC8+PC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvT3ZlcmxheVRyaWdnZXI+XG4gICAgICAgIHsgdGhpcy5zdGF0ZS5pc1BvcG92ZXJWaXNpYmxlID8gdGhpcy5nZXRQb3BvdmVyKCkgOiBudWxsIH1cbiAgICAgICAgeyB0aGlzLnN0YXRlLmlzVmlld1Zpc2libGUgPyB0aGlzLmdldFZpZXcoKSA6IG51bGwgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5IaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94LnByb3BUeXBlcyA9IHtcbiAgZGF0YVNvdXJjZVByb3ZpZGVyOiBkYXRhU291cmNlUHJvdmlkZXJUeXBlLmlzUmVxdWlyZWQsXG4gIGhpZGVPblBvcG92ZXJCbHVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgaW5wdXROYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBub1NlbGVjdGlvblRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHBvcG92ZXJWaXNpYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgcG9wb3Zlck9wdGlvbnM6IHBvcG92ZXJPcHRpb25zVHlwZS5pc1JlcXVpcmVkLFxuICBwcmVDaGVja2VkSXRlbXM6IHByZUNoZWNrZWRJdGVtc0xpc3RTaGFwZSxcbiAgcHJlQ2hlY2tlZEdyb3VwTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgdG9vbHRpcFBsYWNlbWVudDogUHJvcFR5cGVzLnN0cmluZyxcbiAgdmlld09wdGlvbnM6IHZpZXdPcHRpb25zVHlwZS5pc1JlcXVpcmVkLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5IaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94LmRlZmF1bHRQcm9wcyA9IHtcbiAgaGlkZU9uUG9wb3ZlckJsdXI6IHRydWUsXG4gIGlucHV0TmFtZTogJycsXG4gIG5vU2VsZWN0aW9uVGV4dDogJ05vIG9uZSBzZWxlY3RlZC4uLicsXG4gIHBvcG92ZXJWaXNpYmxlOiBmYWxzZSxcbiAgcHJlQ2hlY2tlZEl0ZW1zOiBudWxsLFxuICBwcmVDaGVja2VkR3JvdXBOYW1lOiAnRGVmYXVsdCBncm91cCcsXG4gIHRvb2x0aXBQbGFjZW1lbnQ6ICdib3R0b20nLFxuICBvblNlbGVjdDogKCkgPT4ge30sXG59O1xuIl19