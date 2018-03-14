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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbWJvLWJveC9jb21iby1ib3guY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJIaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94IiwicHJvcHMiLCJpc0RhdGFMb2FkZWQiLCJkYXRhU291cmNlUHJvdmlkZXIiLCJpc0xvYWRlZCIsIm5lZWRUb1VwZGF0ZVByZUNoZWNrZWQiLCJwcmVDaGVja2VkSXRlbXMiLCJsZW5ndGgiLCJuZWVkVG9Mb2FkRGF0YSIsInN0YXRlIiwic2VsZWN0ZWQiLCJpc1BvcG92ZXJWaXNpYmxlIiwicG9wb3ZlclZpc2libGUiLCJpc1ZpZXdWaXNpYmxlIiwiY29tcG9uZW50V2lsbE1vdW50IiwibG9hZERhdGEiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwic2V0U3RhdGUiLCJjb21wb25lbnRXaWxsVXBkYXRlIiwibmV4dFN0YXRlIiwidXBkYXRlUHJlY2hlY2tlZCIsInJlbmRlciIsImlucHV0TmFtZSIsImlucHV0T3B0aW9ucyIsIm9uRm9jdXMiLCJvbklucHV0Rm9jdXMiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJub1NlbGVjdGlvblRleHQiLCJyZWFkT25seSIsInJlZiIsImlucHV0IiwiaW5wdXRFbGVtZW50IiwidmFsdWUiLCJnZXRJbnB1dFRleHQiLCJ0cmltIiwibmFtZSIsInRvb2x0aXBQbGFjZW1lbnQiLCJnZXRUb29sVGlwIiwiZ2V0RGVmYXVsdFRvb2xUaXBDb250ZW50IiwiZ2V0Q291bnRPZlNlbGVjdGVkSXRlbXMiLCJvbkNsaWNrSGFuZGxlciIsImdldFBvcG92ZXIiLCJnZXRWaWV3IiwiUHVyZUNvbXBvbmVudCIsInNldFBvcG92ZXJWaXNpYmlsaXR5IiwiYmx1ciIsIm9uU2VsZWN0SGFuZGxlciIsInNlbGVjdGVkSXRlbSIsImNoZWNrZWRPdXRwdXQiLCJpdGVtcyIsIm1hcCIsIk9iamVjdCIsImFzc2lnbiIsIml0ZW0iLCJvblNlbGVjdCIsIm9uUG9wb3ZlckJsdXIiLCJoaWRlT25Qb3BvdmVyQmx1ciIsInBvcG92ZXJTaG91bGRCZUhpZGRlbiIsIm9uU2hvdWxkT3BlblZpZXciLCJvblNob3VsZENsb3NlUG9wb3ZlciIsIm9uQ2FuY2VsZWRWaWV3Iiwib25TZWxlY3RlZEluVmlldyIsImdyb3VwTmFtZSIsInNlbGVjdGVkSXRlbXMiLCJvblNlbGVjdGVkSW5Qb3BvdmVyIiwidW5jaGVja0FsbEl0ZW1zIiwiQXJyYXkiLCJpc0FycmF5IiwiaWQiLCJsZXZlbCIsInBhcmVudElkIiwicGFyZW50SWRzIiwiaXNDaGVja2VkQWxsIiwiaXNDaGlsZHJlbiIsInNlbGVjdGlvblRleHQiLCJvcHRpb25zIiwidmlld09wdGlvbnMiLCJzbGljZSIsInBvcG92ZXJPcHRpb25zIiwiY29udGVudCIsImlzU2VsZWN0ZWRJdGVtcyIsInRvdGFsQ291bnQiLCJjb3VudCIsImVsZW1lbnRzIiwia2V5cyIsImkiLCJwdXNoIiwiaXNWaXNpYmxlIiwidGhlbiIsInNldFRpbWVvdXQiLCJwcmVDaGVja2VkR3JvdXBOYW1lIiwic2V0UHJlY2hlY2tlZEl0ZW1zIiwiZ2V0Q2hlY2tlZE91dHB1dCIsImdldEFsbENoZWNrZWRJdGVtcyIsImNoZWNrZWQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7cUNBQUE7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFHQTs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEseUI7OztBQUNuQixxQ0FBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQTs7QUFHakIsUUFBTUMsZUFBZUQsTUFBTUUsa0JBQU4sQ0FBeUJDLFFBQTlDO0FBQ0EsUUFBTUMseUJBQXlCSixNQUFNSyxlQUFOLElBQXlCTCxNQUFNSyxlQUFOLENBQXNCQyxNQUE5RTtBQUNBLFFBQU1DLGlCQUFpQixDQUFD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QUZIO0FBR0QsRzs7T0FFRHFCLGUsR0FBa0IsWUFBTTtBQUN0QixXQUFLakQsUUFBTCxDQUFjO0FBQ1paLHVCQUFpQjtBQURMLEtBQWQ7QUFHRCxHOztPQUVEZSxnQixHQUFtQixVQUFDcEIsS0FBRCxFQUFXO0FBQUEsUUFDcEJFLGtCQURvQixHQUN5Q0YsS0FEekMsQ0FDcEJFLGtCQURvQjtBQUFBLFFBQ0F5RixtQkFEQSxHQUN5QzNGLEtBRHpDLENBQ0EyRixtQkFEQTtBQUFBLFFBQ3FCdEYsZUFEckIsR0FDeUNMLEtBRHpDLENBQ3FCSyxlQURyQjs7O0FBRzVCSCx1QkFBbUIwRixrQkFBbkIsQ0FBc0N2RixlQUF0Qzs7QUFFQSxRQUFNNEMsZ0JBQWdCL0MsbUJBQW1CMkYsZ0JBQW5CLEVBQXRCO0FBQ0EsUUFBTTdCLGdCQUFnQjlELG1CQUFtQjRGLGtCQUFuQixFQUF0QjtBQUNBLFFBQU1DLFVBQVU5QyxjQUFjOEMsT0FBZCxJQUF5QixFQUF6Qzs7QUFFQSxXQUFLOUUsUUFBTCxDQUFjO0FBQ1piLDhCQUF3QjtBQURaLEtBQWQ7O0FBSUEsV0FBSzBELGdCQUFMLENBQXNCNkIsbUJBQXRCLEVBQTJDM0IsYUFBM0MsRUFBMEQrQixPQUExRDtBQUNELEc7O2tCQXpOa0JoRyx5Qjs7O0FBK1FyQkEsMEJBQTBCaUcsWUFBMUIsR0FBeUM7QUFDdkN2QyxxQkFBbUIsSUFEb0I7QUFFdkNuQyxhQUFXLEVBRjRCO0FBR3ZDTSxtQkFBaUIsb0JBSHNCO0FBSXZDakIsa0JBQWdCLEtBSnVCO0FBS3ZDTixtQkFBaUIsSUFMc0I7QUFNdkNzRix1QkFBcUIsZUFOa0I7QUFPdkN0RCxvQkFBa0IsUUFQcUI7QUFRdkNrQixZQUFVLG9CQUFNLENBQUU7QUFScUIsQ0FBekMiLCJmaWxlIjoiY29tYm8tYm94LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXVudXNlZC1zdGF0ZSAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgVG9vbHRpcCwgT3ZlcmxheVRyaWdnZXIgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5pbXBvcnQgRmFDaGV2cm9uRG93biBmcm9tICdyZWFjdC1pY29ucy9saWIvZmEvY2hldnJvbi1kb3duJztcclxuaW1wb3J0IHsgZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3R5cGVzJztcclxuaW1wb3J0IHsgcHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlLCBwb3BvdmVyT3B0aW9uc1R5cGUsIHZpZXdPcHRpb25zVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzJztcclxuaW1wb3J0IFNwaW5uZXIgZnJvbSAnLi4vc3Bpbm5lcic7XHJcbmltcG9ydCBIU1BvcG92ZXIgZnJvbSAnLi4vcG9wb3Zlcic7XHJcbmltcG9ydCBIU1ZpZXcgZnJvbSAnLi4vdmlldyc7XHJcbmltcG9ydCBIU0JhZGdlIGZyb20gJy4uL2JhZGdlJztcclxuXHJcblxyXG5pbXBvcnQgeyBUT09MVElQX0RFTEFZX01TLCBNQVhfQ09VTlRfT0ZfVE9PTFRJUF9JVEVNUyB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuaW1wb3J0ICcuL2NvbWJvLWJveC5zY3NzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVNlbGVjdG9yQ29tYm9Cb3ggZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG5cclxuICAgIGNvbnN0IGlzRGF0YUxvYWRlZCA9IHByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5pc0xvYWRlZDtcclxuICAgIGNvbnN0IG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQgPSBwcm9wcy5wcmVDaGVja2VkSXRlbXMgJiYgcHJvcHMucHJlQ2hlY2tlZEl0ZW1zLmxlbmd0aDtcclxuICAgIGNvbnN0IG5lZWRUb0xvYWREYXRhID0gIWlzRGF0YUxvYWRlZCAmJiBuZWVkVG9VcGRhdGVQcmVDaGVja2VkO1xyXG5cclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIG5lZWRUb0xvYWREYXRhLFxyXG4gICAgICBuZWVkVG9VcGRhdGVQcmVDaGVja2VkLFxyXG4gICAgICBwcmVDaGVja2VkSXRlbXM6IHByb3BzLnByZUNoZWNrZWRJdGVtcyxcclxuICAgICAgc2VsZWN0ZWQ6IG51bGwsXHJcbiAgICAgIGlzUG9wb3ZlclZpc2libGU6IHByb3BzLnBvcG92ZXJWaXNpYmxlLFxyXG4gICAgICBpc1ZpZXdWaXNpYmxlOiBmYWxzZSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICBjb25zdCB7IG5lZWRUb0xvYWREYXRhIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgaWYgKG5lZWRUb0xvYWREYXRhKSB7XHJcbiAgICAgIHRoaXMubG9hZERhdGEodGhpcy5wcm9wcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xyXG4gICAgY29uc3QgeyBkYXRhU291cmNlUHJvdmlkZXIsIHByZUNoZWNrZWRJdGVtcyB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICBpZiAoZGF0YVNvdXJjZVByb3ZpZGVyICE9PSBuZXh0UHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyKSB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIG5lZWRUb0xvYWREYXRhOiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocHJlQ2hlY2tlZEl0ZW1zICE9PSBuZXh0UHJvcHMucHJlQ2hlY2tlZEl0ZW1zKSB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQ6IHRydWUsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xyXG4gICAgY29uc3QgeyBuZWVkVG9Mb2FkRGF0YSwgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZCB9ID0gbmV4dFN0YXRlO1xyXG4gICAgaWYgKG5lZWRUb0xvYWREYXRhKSB7XHJcbiAgICAgIHRoaXMubG9hZERhdGEobmV4dFByb3BzKTtcclxuICAgIH0gZWxzZSBpZiAobmVlZFRvVXBkYXRlUHJlQ2hlY2tlZCkge1xyXG4gICAgICB0aGlzLnVwZGF0ZVByZWNoZWNrZWQobmV4dFByb3BzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uQ2xpY2tIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgdGhpcy5zZXRQb3BvdmVyVmlzaWJpbGl0eSghdGhpcy5zdGF0ZS5pc1BvcG92ZXJWaXNpYmxlKTtcclxuICB9XHJcblxyXG4gIG9uSW5wdXRGb2N1cyA9ICgpID0+IHtcclxuICAgIHRoaXMuaW5wdXRFbGVtZW50LmJsdXIoKTtcclxuICB9XHJcblxyXG4gIG9uU2VsZWN0SGFuZGxlciA9IChzZWxlY3RlZEl0ZW0sIGNoZWNrZWRPdXRwdXQpID0+IHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBzZWxlY3RlZDogc2VsZWN0ZWRJdGVtLFxyXG4gICAgICBpc1BvcG92ZXJWaXNpYmxlOiBmYWxzZSxcclxuICAgICAgaXNWaWV3VmlzaWJsZTogZmFsc2UsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGl0ZW1zID0gY2hlY2tlZE91dHB1dCA/IGNoZWNrZWRPdXRwdXQubWFwKGl0ZW0gPT4gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSkpIDogW107XHJcblxyXG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChpdGVtcyk7XHJcbiAgfVxyXG5cclxuICBvblBvcG92ZXJCbHVyID0gKCkgPT4ge1xyXG4gICAgaWYgKHRoaXMucHJvcHMuaGlkZU9uUG9wb3ZlckJsdXIpIHtcclxuICAgICAgdGhpcy5wb3BvdmVyU2hvdWxkQmVIaWRkZW4oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uU2hvdWxkT3BlblZpZXcgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgaXNWaWV3VmlzaWJsZTogdHJ1ZSB9KTtcclxuICB9XHJcblxyXG4gIG9uU2hvdWxkQ2xvc2VQb3BvdmVyID0gKCkgPT4ge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGlzUG9wb3ZlclZpc2libGU6IGZhbHNlLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvbkNhbmNlbGVkVmlldyA9ICgpID0+IHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBpc1BvcG92ZXJWaXNpYmxlOiBmYWxzZSxcclxuICAgICAgaXNWaWV3VmlzaWJsZTogZmFsc2UsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uU2VsZWN0ZWRJblZpZXcgPSAoZ3JvdXBOYW1lLCBzZWxlY3RlZEl0ZW1zLCBjaGVja2VkT3V0cHV0KSA9PiB7XHJcbiAgICBjb25zdCBzZWxlY3RlZEl0ZW0gPSB7XHJcbiAgICAgIG5hbWU6IGdyb3VwTmFtZSxcclxuICAgICAgaXRlbXM6IHNlbGVjdGVkSXRlbXMsXHJcbiAgICB9O1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIHByZUNoZWNrZWRJdGVtczogY2hlY2tlZE91dHB1dCxcclxuICAgIH0pO1xyXG4gICAgdGhpcy5vblNlbGVjdEhhbmRsZXIoc2VsZWN0ZWRJdGVtLCBjaGVja2VkT3V0cHV0KTtcclxuICB9XHJcblxyXG4gIG9uU2VsZWN0ZWRJblBvcG92ZXIgPSAoc2VsZWN0ZWRJdGVtKSA9PiB7XHJcbiAgICB0aGlzLnVuY2hlY2tBbGxJdGVtcygpO1xyXG4gICAgY29uc3QgY2hlY2tlZE91dHB1dCA9IHNlbGVjdGVkSXRlbSAmJiBBcnJheS5pc0FycmF5KHNlbGVjdGVkSXRlbS5pdGVtcykgP1xyXG4gICAgICBzZWxlY3RlZEl0ZW0uaXRlbXMubWFwKGl0ZW0gPT4gKHtcclxuICAgICAgICBpZDogaXRlbS5pZCxcclxuICAgICAgICBuYW1lOiBpdGVtLm5hbWUsXHJcbiAgICAgICAgbGV2ZWw6IDAsXHJcbiAgICAgICAgcGFyZW50SWQ6IG51bGwsXHJcbiAgICAgICAgcGFyZW50SWRzOiBbXSxcclxuICAgICAgICBpc0NoZWNrZWRBbGw6IGZhbHNlLFxyXG4gICAgICAgIGlzQ2hpbGRyZW46IGZhbHNlLFxyXG4gICAgICB9KSlcclxuICAgICAgOiBbXTtcclxuICAgIHRoaXMub25TZWxlY3RIYW5kbGVyKHNlbGVjdGVkSXRlbSwgY2hlY2tlZE91dHB1dCk7XHJcbiAgfVxyXG5cclxuICBnZXRJbnB1dFRleHQgPSAoKSA9PiB7XHJcbiAgICBsZXQgc2VsZWN0aW9uVGV4dCA9ICcnO1xyXG5cclxuICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkICYmIHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMgJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHNlbGVjdGlvblRleHQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkLm5hbWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2VsZWN0aW9uVGV4dDtcclxuICB9XHJcblxyXG4gIGdldFZpZXcgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5wcm9wcy52aWV3T3B0aW9ucztcclxuICAgIGNvbnN0IHByZUNoZWNrZWRJdGVtcyA9IEFycmF5LmlzQXJyYXkodGhpcy5zdGF0ZS5wcmVDaGVja2VkSXRlbXMpID9cclxuICAgICAgdGhpcy5zdGF0ZS5wcmVDaGVja2VkSXRlbXMuc2xpY2UoKSA6IG51bGw7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPEhTVmlld1xyXG4gICAgICAgIGRhdGFTb3VyY2VQcm92aWRlcj17dGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXJ9XHJcbiAgICAgICAgey4uLm9wdGlvbnN9XHJcbiAgICAgICAgb25DYW5jZWw9e3RoaXMub25DYW5jZWxlZFZpZXd9XHJcbiAgICAgICAgb25TZWxlY3Q9e3RoaXMub25TZWxlY3RlZEluVmlld31cclxuICAgICAgICBncm91cE5hbWU9e3RoaXMuc3RhdGUuc2VsZWN0ZWQgPyB0aGlzLnN0YXRlLnNlbGVjdGVkLm5hbWUgOiAnJ31cclxuICAgICAgICBwcmVDaGVja2VkSXRlbXM9e3ByZUNoZWNrZWRJdGVtc31cclxuICAgICAgLz5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXRQb3BvdmVyID0gKCkgPT4ge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMucHJvcHMucG9wb3Zlck9wdGlvbnM7XHJcblxyXG4gICAgcmV0dXJuICg8SFNQb3BvdmVyXHJcbiAgICAgIGRhdGFTb3VyY2VQcm92aWRlcj17dGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXJ9XHJcbiAgICAgIG9uQ29tcG9uZW50Qmx1cj17dGhpcy5vblBvcG92ZXJCbHVyfVxyXG4gICAgICBvblNlbGVjdD17dGhpcy5vblNlbGVjdGVkSW5Qb3BvdmVyfVxyXG4gICAgICBvblNob3VsZE9wZW5WaWV3PXt0aGlzLm9uU2hvdWxkT3BlblZpZXd9XHJcbiAgICAgIG9uU2hvdWxkQ2xvc2VQb3BvdmVyPXt0aGlzLm9uU2hvdWxkQ2xvc2VQb3BvdmVyfVxyXG4gICAgICB7Li4ub3B0aW9uc31cclxuICAgIC8+KTtcclxuICB9XHJcblxyXG4gIGdldFRvb2xUaXAgPSBjb250ZW50ID0+IDxUb29sdGlwIGlkPVwidG9vbHRpcFwiIGNsYXNzTmFtZT1cImhzLWNvbWJvLWJveC10b29sdGlwXCI+e2NvbnRlbnR9PC9Ub29sdGlwPjtcclxuXHJcbiAgZ2V0RGVmYXVsdFRvb2xUaXBDb250ZW50ID0gKCkgPT4ge1xyXG4gICAgaWYgKCF0aGlzLmlzU2VsZWN0ZWRJdGVtcygpKSByZXR1cm4gdGhpcy5wcm9wcy5ub1NlbGVjdGlvblRleHQ7XHJcbiAgICBjb25zdCB0b3RhbENvdW50ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5sZW5ndGg7XHJcbiAgICBjb25zdCBjb3VudCA9IHRvdGFsQ291bnQgPiBNQVhfQ09VTlRfT0ZfVE9PTFRJUF9JVEVNUyA/IE1BWF9DT1VOVF9PRl9UT09MVElQX0lURU1TIDogdG90YWxDb3VudDtcclxuXHJcbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMuc2xpY2UoMCwgY291bnQpO1xyXG4gICAgY29uc3QgZWxlbWVudHMgPSBPYmplY3Qua2V5cyhpdGVtcykubWFwKGkgPT4gPHAga2V5PXtpfT57aXRlbXNbaV0ubmFtZX08L3A+KTtcclxuXHJcbiAgICBpZiAoY291bnQgPCB0b3RhbENvdW50KSBlbGVtZW50cy5wdXNoKDxwIGtleT17Y291bnR9Pi4gLiAuPC9wPik7XHJcblxyXG4gICAgcmV0dXJuIGVsZW1lbnRzO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q291bnRPZlNlbGVjdGVkSXRlbXMgPSAoKSA9PiAodGhpcy5pc1NlbGVjdGVkSXRlbXMoKSA/IHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMubGVuZ3RoIDogMCk7XHJcblxyXG4gIHNldFBvcG92ZXJWaXNpYmlsaXR5ID0gKGlzVmlzaWJsZSkgPT4ge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlzUG9wb3ZlclZpc2libGU6IGlzVmlzaWJsZSB9KTtcclxuICB9XHJcblxyXG4gIGlzU2VsZWN0ZWRJdGVtcyA9ICgpID0+IChcclxuICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWQgJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcyAmJiB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLmxlbmd0aCA+IDBcclxuICApO1xyXG5cclxuICBsb2FkRGF0YSA9IChwcm9wcykgPT4ge1xyXG4gICAgcHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmxvYWREYXRhKCkudGhlbigoKSA9PiB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIG5lZWRUb0xvYWREYXRhOiBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHBvcG92ZXJTaG91bGRCZUhpZGRlbiA9ICgpID0+IHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5zdGF0ZS5pc1BvcG92ZXJWaXNpYmxlKSB0aGlzLnNldFBvcG92ZXJWaXNpYmlsaXR5KGZhbHNlKTtcclxuICAgIH0sIDE1MCk7XHJcbiAgfVxyXG5cclxuICB1bmNoZWNrQWxsSXRlbXMgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgcHJlQ2hlY2tlZEl0ZW1zOiBbXSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUHJlY2hlY2tlZCA9IChwcm9wcykgPT4ge1xyXG4gICAgY29uc3QgeyBkYXRhU291cmNlUHJvdmlkZXIsIHByZUNoZWNrZWRHcm91cE5hbWUsIHByZUNoZWNrZWRJdGVtcyB9ID0gcHJvcHM7XHJcblxyXG4gICAgZGF0YVNvdXJjZVByb3ZpZGVyLnNldFByZWNoZWNrZWRJdGVtcyhwcmVDaGVja2VkSXRlbXMpO1xyXG5cclxuICAgIGNvbnN0IGNoZWNrZWRPdXRwdXQgPSBkYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZE91dHB1dCgpO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRJdGVtcyA9IGRhdGFTb3VyY2VQcm92aWRlci5nZXRBbGxDaGVja2VkSXRlbXMoKTtcclxuICAgIGNvbnN0IGNoZWNrZWQgPSBjaGVja2VkT3V0cHV0LmNoZWNrZWQgfHwgW107XHJcblxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5vblNlbGVjdGVkSW5WaWV3KHByZUNoZWNrZWRHcm91cE5hbWUsIHNlbGVjdGVkSXRlbXMsIGNoZWNrZWQpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBpbnB1dE5hbWUgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCBpbnB1dE9wdGlvbnMgPSB7XHJcbiAgICAgIG9uRm9jdXM6IHRoaXMub25JbnB1dEZvY3VzLFxyXG4gICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnByb3BzLm5vU2VsZWN0aW9uVGV4dCxcclxuICAgICAgcmVhZE9ubHk6IHRydWUsXHJcbiAgICAgIHJlZjogKGlucHV0KSA9PiB7IHRoaXMuaW5wdXRFbGVtZW50ID0gaW5wdXQ7IH0sXHJcbiAgICAgIHZhbHVlOiB0aGlzLmdldElucHV0VGV4dCgpLFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoaW5wdXROYW1lLnRyaW0oKSAhPT0gJycpIHtcclxuICAgICAgaW5wdXRPcHRpb25zLm5hbWUgPSBpbnB1dE5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItbGlzdC13cmFwcGVyXCI+XHJcbiAgICAgICAgPE92ZXJsYXlUcmlnZ2VyXHJcbiAgICAgICAgICBkZWxheT17VE9PTFRJUF9ERUxBWV9NU31cclxuICAgICAgICAgIHBsYWNlbWVudD17dGhpcy5wcm9wcy50b29sdGlwUGxhY2VtZW50fVxyXG4gICAgICAgICAgb3ZlcmxheT17dGhpcy5nZXRUb29sVGlwKHRoaXMuZ2V0RGVmYXVsdFRvb2xUaXBDb250ZW50KCkpfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWxpc3RcIj5cclxuICAgICAgICAgICAgPGlucHV0IHsuLi5pbnB1dE9wdGlvbnN9IC8+XHJcbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLm5lZWRUb0xvYWREYXRhID9cclxuICAgICAgICAgICAgICA8U3Bpbm5lciAvPiA6XHJcbiAgICAgICAgICAgICAgPEhTQmFkZ2UgY2xhc3NOYW1lPVwiYmFkZ2Utb3JhbmdlXCI+e3RoaXMuZ2V0Q291bnRPZlNlbGVjdGVkSXRlbXMoKX08L0hTQmFkZ2U+XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZGlzYWJsZWQ9e3RoaXMuc3RhdGUubmVlZFRvTG9hZERhdGF9IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1saXN0LWJ0blwiIG9uQ2xpY2s9e3RoaXMub25DbGlja0hhbmRsZXJ9PjxGYUNoZXZyb25Eb3duIC8+PC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L092ZXJsYXlUcmlnZ2VyPlxyXG4gICAgICAgIHsgdGhpcy5zdGF0ZS5pc1BvcG92ZXJWaXNpYmxlID8gdGhpcy5nZXRQb3BvdmVyKCkgOiBudWxsIH1cclxuICAgICAgICB7IHRoaXMuc3RhdGUuaXNWaWV3VmlzaWJsZSA/IHRoaXMuZ2V0VmlldygpIDogbnVsbCB9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbkhpZXJhcmNoeVNlbGVjdG9yQ29tYm9Cb3gucHJvcFR5cGVzID0ge1xyXG4gIGRhdGFTb3VyY2VQcm92aWRlcjogZGF0YVNvdXJjZVByb3ZpZGVyVHlwZS5pc1JlcXVpcmVkLFxyXG4gIGhpZGVPblBvcG92ZXJCbHVyOiBQcm9wVHlwZXMuYm9vbCxcclxuICBpbnB1dE5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgbm9TZWxlY3Rpb25UZXh0OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIHBvcG92ZXJWaXNpYmxlOiBQcm9wVHlwZXMuYm9vbCxcclxuICBwb3BvdmVyT3B0aW9uczogcG9wb3Zlck9wdGlvbnNUeXBlLmlzUmVxdWlyZWQsXHJcbiAgcHJlQ2hlY2tlZEl0ZW1zOiBwcmVDaGVja2VkSXRlbXNMaXN0U2hhcGUsXHJcbiAgcHJlQ2hlY2tlZEdyb3VwTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICB0b29sdGlwUGxhY2VtZW50OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIHZpZXdPcHRpb25zOiB2aWV3T3B0aW9uc1R5cGUuaXNSZXF1aXJlZCxcclxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXHJcbn07XHJcblxyXG5IaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94LmRlZmF1bHRQcm9wcyA9IHtcclxuICBoaWRlT25Qb3BvdmVyQmx1cjogdHJ1ZSxcclxuICBpbnB1dE5hbWU6ICcnLFxyXG4gIG5vU2VsZWN0aW9uVGV4dDogJ05vIG9uZSBzZWxlY3RlZC4uLicsXHJcbiAgcG9wb3ZlclZpc2libGU6IGZhbHNlLFxyXG4gIHByZUNoZWNrZWRJdGVtczogbnVsbCxcclxuICBwcmVDaGVja2VkR3JvdXBOYW1lOiAnRGVmYXVsdCBncm91cCcsXHJcbiAgdG9vbHRpcFBsYWNlbWVudDogJ2JvdHRvbScsXHJcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxyXG59O1xyXG4iXX0=