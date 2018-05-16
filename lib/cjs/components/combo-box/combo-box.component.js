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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbWJvLWJveC9jb21iby1ib3guY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJIaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94IiwicHJvcHMiLCJpc0RhdGFMb2FkZWQiLCJkYXRhU291cmNlUHJvdmlkZXIiLCJpc0xvYWRlZCIsIm5lZWRUb1VwZGF0ZVByZUNoZWNrZWQiLCJwcmVDaGVja2VkSXRlbXMiLCJsZW5ndGgiLCJuZWVkVG9Mb2FkRGF0YSIsInN0YXRlIiwic2VsZWN0ZWQiLCJpc1BvcG92ZXJWaXNpYmxlIiwicG9wb3ZlclZpc2libGUiLCJpc1ZpZXdWaXNpYmxlIiwiY29tcG9uZW50V2lsbE1vdW50IiwibG9hZERhdGEiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwic2V0U3RhdGUiLCJjb21wb25lbnRXaWxsVXBkYXRlIiwibmV4dFN0YXRlIiwidXBkYXRlUHJlY2hlY2tlZCIsInJlbmRlciIsImlucHV0TmFtZSIsImlucHV0T3B0aW9ucyIsIm9uRm9jdXMiLCJvbklucHV0Rm9jdXMiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJub1NlbGVjdGlvblRleHQiLCJyZWFkT25seSIsInJlZiIsImlucHV0IiwiaW5wdXRFbGVtZW50IiwidmFsdWUiLCJnZXRJbnB1dFRleHQiLCJ0cmltIiwibmFtZSIsInRvb2x0aXBQbGFjZW1lbnQiLCJnZXRUb29sVGlwIiwiZ2V0RGVmYXVsdFRvb2xUaXBDb250ZW50IiwiZ2V0Q291bnRPZlNlbGVjdGVkSXRlbXMiLCJvbkNsaWNrSGFuZGxlciIsImdldFBvcG92ZXIiLCJnZXRWaWV3IiwiUHVyZUNvbXBvbmVudCIsInNldFBvcG92ZXJWaXNpYmlsaXR5IiwiYmx1ciIsIm9uU2VsZWN0SGFuZGxlciIsImdyb3VwTmFtZSIsInNlbGVjdGVkSXRlbSIsImNoZWNrZWRPdXRwdXQiLCJpdGVtcyIsIm1hcCIsIk9iamVjdCIsImFzc2lnbiIsIml0ZW0iLCJvblNlbGVjdCIsIm9uUG9wb3ZlckJsdXIiLCJoaWRlT25Qb3BvdmVyQmx1ciIsInBvcG92ZXJTaG91bGRCZUhpZGRlbiIsIm9uU2hvdWxkT3BlblZpZXciLCJvblNob3VsZENsb3NlUG9wb3ZlciIsIm9uQ2FuY2VsZWRWaWV3Iiwib25TZWxlY3RlZEluVmlldyIsInNlbGVjdGVkSXRlbXMiLCJvblNlbGVjdGVkSW5Qb3BvdmVyIiwidW5jaGVja0FsbEl0ZW1zIiwiQXJyYXkiLCJpc0FycmF5IiwiaWQiLCJsZXZlbCIsInBhcmVudElkIiwicGFyZW50SWRzIiwiaXNDaGVja2VkQWxsIiwiaXNDaGlsZHJlbiIsInNlbGVjdGlvblRleHQiLCJvcHRpb25zIiwidmlld09wdGlvbnMiLCJzbGljZSIsInBvcG92ZXJPcHRpb25zIiwiY29udGVudCIsImlzU2VsZWN0ZWRJdGVtcyIsInRvdGFsQ291bnQiLCJjb3VudCIsImVsZW1lbnRzIiwia2V5cyIsImkiLCJwdXNoIiwiaXNWaXNpYmxlIiwidGhlbiIsInNldFRpbWVvdXQiLCJwcmVDaGVja2VkR3JvdXBOYW1lIiwic2V0UHJlY2hlY2tlZEl0ZW1zIiwiZ2V0Q2hlY2tlZE91dHB1dCIsImdldEFsbENoZWNrZWRJdGVtcyIsImNoZWNrZWQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7cUNBQUE7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFHQTs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEseUI7OztBQUNuQixxQ0FBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQTs7QUFHakIsUUFBTUMsZUFBZUQsTUFBTUUsa0JBQU4sQ0FBeUJDLFFBQTlDO0FBQ0EsUUFBTUMseUJBQXlCSixNQUFNSyxlQUFOLElBQXlCTCxNQUFNSyxlQUFOLENBQXNCQyxNQUE5RTtBQUNBLFFBQU1DLGlCQUFpQixDQUFD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bUMsb0JBQUwsQ0FBMEIsS0FBMUI7QUFDbEMsS0FGRCxFQUVHLEdBRkg7QUFHRCxHOztPQUVEcUIsZSxHQUFrQixZQUFNO0FBQ3RCLFdBQUtqRCxRQUFMLENBQWM7QUFDWlosdUJBQWlCO0FBREwsS0FBZDtBQUdELEc7O09BRURlLGdCLEdBQW1CLFVBQUNwQixLQUFELEVBQVc7QUFBQSxRQUNwQkUsa0JBRG9CLEdBQ3lDRixLQUR6QyxDQUNwQkUsa0JBRG9CO0FBQUEsUUFDQXlGLG1CQURBLEdBQ3lDM0YsS0FEekMsQ0FDQTJGLG1CQURBO0FBQUEsUUFDcUJ0RixlQURyQixHQUN5Q0wsS0FEekMsQ0FDcUJLLGVBRHJCOzs7QUFHNUJILHVCQUFtQjBGLGtCQUFuQixDQUFzQ3ZGLGVBQXRDOztBQUVBLFFBQU02QyxnQkFBZ0JoRCxtQkFBbUIyRixnQkFBbkIsRUFBdEI7QUFDQSxRQUFNN0IsZ0JBQWdCOUQsbUJBQW1CNEYsa0JBQW5CLEVBQXRCO0FBQ0EsUUFBTUMsVUFBVTdDLGNBQWM2QyxPQUFkLElBQXlCLEVBQXpDOztBQUVBLFdBQUs5RSxRQUFMLENBQWM7QUFDWmIsOEJBQXdCO0FBRFosS0FBZDs7QUFJQSxXQUFLMkQsZ0JBQUwsQ0FBc0I0QixtQkFBdEIsRUFBMkMzQixhQUEzQyxFQUEwRCtCLE9BQTFEO0FBQ0QsRzs7a0JBek5rQmhHLHlCOzs7QUErUXJCQSwwQkFBMEJpRyxZQUExQixHQUF5QztBQUN2Q3RDLHFCQUFtQixJQURvQjtBQUV2Q3BDLGFBQVcsRUFGNEI7QUFHdkNNLG1CQUFpQixvQkFIc0I7QUFJdkNqQixrQkFBZ0IsS0FKdUI7QUFLdkNOLG1CQUFpQixJQUxzQjtBQU12Q3NGLHVCQUFxQixlQU5rQjtBQU92Q3RELG9CQUFrQixRQVBxQjtBQVF2Q21CLFlBQVUsb0JBQU0sQ0FBRTtBQVJxQixDQUF6QyIsImZpbGUiOiJjb21iby1ib3guY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tdW51c2VkLXN0YXRlICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBUb29sdGlwLCBPdmVybGF5VHJpZ2dlciB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCBGYUNoZXZyb25Eb3duIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9jaGV2cm9uLWRvd24nO1xyXG5pbXBvcnQgeyBkYXRhU291cmNlUHJvdmlkZXJUeXBlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdHlwZXMnO1xyXG5pbXBvcnQgeyBwcmVDaGVja2VkSXRlbXNMaXN0U2hhcGUsIHBvcG92ZXJPcHRpb25zVHlwZSwgdmlld09wdGlvbnNUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xyXG5pbXBvcnQgU3Bpbm5lciBmcm9tICcuLi9zcGlubmVyJztcclxuaW1wb3J0IEhTUG9wb3ZlciBmcm9tICcuLi9wb3BvdmVyJztcclxuaW1wb3J0IEhTVmlldyBmcm9tICcuLi92aWV3JztcclxuaW1wb3J0IEhTQmFkZ2UgZnJvbSAnLi4vYmFkZ2UnO1xyXG5cclxuXHJcbmltcG9ydCB7IFRPT0xUSVBfREVMQVlfTVMsIE1BWF9DT1VOVF9PRl9UT09MVElQX0lURU1TIH0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgJy4vY29tYm8tYm94LnNjc3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5U2VsZWN0b3JDb21ib0JveCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcblxyXG4gICAgY29uc3QgaXNEYXRhTG9hZGVkID0gcHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzTG9hZGVkO1xyXG4gICAgY29uc3QgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZCA9IHByb3BzLnByZUNoZWNrZWRJdGVtcyAmJiBwcm9wcy5wcmVDaGVja2VkSXRlbXMubGVuZ3RoO1xyXG4gICAgY29uc3QgbmVlZFRvTG9hZERhdGEgPSAhaXNEYXRhTG9hZGVkICYmIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQ7XHJcblxyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgbmVlZFRvTG9hZERhdGEsXHJcbiAgICAgIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQsXHJcbiAgICAgIHByZUNoZWNrZWRJdGVtczogcHJvcHMucHJlQ2hlY2tlZEl0ZW1zLFxyXG4gICAgICBzZWxlY3RlZDogbnVsbCxcclxuICAgICAgaXNQb3BvdmVyVmlzaWJsZTogcHJvcHMucG9wb3ZlclZpc2libGUsXHJcbiAgICAgIGlzVmlld1Zpc2libGU6IGZhbHNlLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgIGNvbnN0IHsgbmVlZFRvTG9hZERhdGEgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBpZiAobmVlZFRvTG9hZERhdGEpIHtcclxuICAgICAgdGhpcy5sb2FkRGF0YSh0aGlzLnByb3BzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XHJcbiAgICBjb25zdCB7IGRhdGFTb3VyY2VQcm92aWRlciwgcHJlQ2hlY2tlZEl0ZW1zIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIGlmIChkYXRhU291cmNlUHJvdmlkZXIgIT09IG5leHRQcm9wcy5kYXRhU291cmNlUHJvdmlkZXIpIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgbmVlZFRvTG9hZERhdGE6IHRydWUsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcmVDaGVja2VkSXRlbXMgIT09IG5leHRQcm9wcy5wcmVDaGVja2VkSXRlbXMpIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZDogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnRXaWxsVXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XHJcbiAgICBjb25zdCB7IG5lZWRUb0xvYWREYXRhLCBuZWVkVG9VcGRhdGVQcmVDaGVja2VkIH0gPSBuZXh0U3RhdGU7XHJcbiAgICBpZiAobmVlZFRvTG9hZERhdGEpIHtcclxuICAgICAgdGhpcy5sb2FkRGF0YShuZXh0UHJvcHMpO1xyXG4gICAgfSBlbHNlIGlmIChuZWVkVG9VcGRhdGVQcmVDaGVja2VkKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlUHJlY2hlY2tlZChuZXh0UHJvcHMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25DbGlja0hhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnNldFBvcG92ZXJWaXNpYmlsaXR5KCF0aGlzLnN0YXRlLmlzUG9wb3ZlclZpc2libGUpO1xyXG4gIH1cclxuXHJcbiAgb25JbnB1dEZvY3VzID0gKCkgPT4ge1xyXG4gICAgdGhpcy5pbnB1dEVsZW1lbnQuYmx1cigpO1xyXG4gIH1cclxuXHJcbiAgb25TZWxlY3RIYW5kbGVyID0gKGdyb3VwTmFtZSwgc2VsZWN0ZWRJdGVtLCBjaGVja2VkT3V0cHV0KSA9PiB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgc2VsZWN0ZWQ6IHNlbGVjdGVkSXRlbSxcclxuICAgICAgaXNQb3BvdmVyVmlzaWJsZTogZmFsc2UsXHJcbiAgICAgIGlzVmlld1Zpc2libGU6IGZhbHNlLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBpdGVtcyA9IGNoZWNrZWRPdXRwdXQgPyBjaGVja2VkT3V0cHV0Lm1hcChpdGVtID0+IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pKSA6IFtdO1xyXG5cclxuICAgIHRoaXMucHJvcHMub25TZWxlY3QoaXRlbXMsIGdyb3VwTmFtZSk7XHJcbiAgfVxyXG5cclxuICBvblBvcG92ZXJCbHVyID0gKCkgPT4ge1xyXG4gICAgaWYgKHRoaXMucHJvcHMuaGlkZU9uUG9wb3ZlckJsdXIpIHtcclxuICAgICAgdGhpcy5wb3BvdmVyU2hvdWxkQmVIaWRkZW4oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uU2hvdWxkT3BlblZpZXcgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgaXNWaWV3VmlzaWJsZTogdHJ1ZSB9KTtcclxuICB9XHJcblxyXG4gIG9uU2hvdWxkQ2xvc2VQb3BvdmVyID0gKCkgPT4ge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGlzUG9wb3ZlclZpc2libGU6IGZhbHNlLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvbkNhbmNlbGVkVmlldyA9ICgpID0+IHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBpc1BvcG92ZXJWaXNpYmxlOiBmYWxzZSxcclxuICAgICAgaXNWaWV3VmlzaWJsZTogZmFsc2UsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uU2VsZWN0ZWRJblZpZXcgPSAoZ3JvdXBOYW1lLCBzZWxlY3RlZEl0ZW1zLCBjaGVja2VkT3V0cHV0KSA9PiB7XHJcbiAgICBjb25zdCBzZWxlY3RlZEl0ZW0gPSB7XHJcbiAgICAgIG5hbWU6IGdyb3VwTmFtZSxcclxuICAgICAgaXRlbXM6IHNlbGVjdGVkSXRlbXMsXHJcbiAgICB9O1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIHByZUNoZWNrZWRJdGVtczogY2hlY2tlZE91dHB1dCxcclxuICAgIH0pO1xyXG4gICAgdGhpcy5vblNlbGVjdEhhbmRsZXIoZ3JvdXBOYW1lLCBzZWxlY3RlZEl0ZW0sIGNoZWNrZWRPdXRwdXQpO1xyXG4gIH1cclxuXHJcbiAgb25TZWxlY3RlZEluUG9wb3ZlciA9IChzZWxlY3RlZEl0ZW0pID0+IHtcclxuICAgIHRoaXMudW5jaGVja0FsbEl0ZW1zKCk7XHJcbiAgICBjb25zdCBjaGVja2VkT3V0cHV0ID0gc2VsZWN0ZWRJdGVtICYmIEFycmF5LmlzQXJyYXkoc2VsZWN0ZWRJdGVtLml0ZW1zKSA/XHJcbiAgICAgIHNlbGVjdGVkSXRlbS5pdGVtcy5tYXAoaXRlbSA9PiAoe1xyXG4gICAgICAgIGlkOiBpdGVtLmlkLFxyXG4gICAgICAgIG5hbWU6IGl0ZW0ubmFtZSxcclxuICAgICAgICBsZXZlbDogMCxcclxuICAgICAgICBwYXJlbnRJZDogbnVsbCxcclxuICAgICAgICBwYXJlbnRJZHM6IFtdLFxyXG4gICAgICAgIGlzQ2hlY2tlZEFsbDogZmFsc2UsXHJcbiAgICAgICAgaXNDaGlsZHJlbjogZmFsc2UsXHJcbiAgICAgIH0pKVxyXG4gICAgICA6IFtdO1xyXG4gICAgdGhpcy5vblNlbGVjdEhhbmRsZXIoc2VsZWN0ZWRJdGVtLCBjaGVja2VkT3V0cHV0KTtcclxuICB9XHJcblxyXG4gIGdldElucHV0VGV4dCA9ICgpID0+IHtcclxuICAgIGxldCBzZWxlY3Rpb25UZXh0ID0gJyc7XHJcblxyXG4gICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWQgJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcyAmJiB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgc2VsZWN0aW9uVGV4dCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWQubmFtZTtcclxuICAgIH1cclxuICAgIHJldHVybiBzZWxlY3Rpb25UZXh0O1xyXG4gIH1cclxuXHJcbiAgZ2V0VmlldyA9ICgpID0+IHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLnByb3BzLnZpZXdPcHRpb25zO1xyXG4gICAgY29uc3QgcHJlQ2hlY2tlZEl0ZW1zID0gQXJyYXkuaXNBcnJheSh0aGlzLnN0YXRlLnByZUNoZWNrZWRJdGVtcykgP1xyXG4gICAgICB0aGlzLnN0YXRlLnByZUNoZWNrZWRJdGVtcy5zbGljZSgpIDogbnVsbDtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8SFNWaWV3XHJcbiAgICAgICAgZGF0YVNvdXJjZVByb3ZpZGVyPXt0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlcn1cclxuICAgICAgICB7Li4ub3B0aW9uc31cclxuICAgICAgICBvbkNhbmNlbD17dGhpcy5vbkNhbmNlbGVkVmlld31cclxuICAgICAgICBvblNlbGVjdD17dGhpcy5vblNlbGVjdGVkSW5WaWV3fVxyXG4gICAgICAgIGdyb3VwTmFtZT17dGhpcy5zdGF0ZS5zZWxlY3RlZCA/IHRoaXMuc3RhdGUuc2VsZWN0ZWQubmFtZSA6ICcnfVxyXG4gICAgICAgIHByZUNoZWNrZWRJdGVtcz17cHJlQ2hlY2tlZEl0ZW1zfVxyXG4gICAgICAvPlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldFBvcG92ZXIgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5wcm9wcy5wb3BvdmVyT3B0aW9ucztcclxuXHJcbiAgICByZXR1cm4gKDxIU1BvcG92ZXJcclxuICAgICAgZGF0YVNvdXJjZVByb3ZpZGVyPXt0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlcn1cclxuICAgICAgb25Db21wb25lbnRCbHVyPXt0aGlzLm9uUG9wb3ZlckJsdXJ9XHJcbiAgICAgIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0ZWRJblBvcG92ZXJ9XHJcbiAgICAgIG9uU2hvdWxkT3BlblZpZXc9e3RoaXMub25TaG91bGRPcGVuVmlld31cclxuICAgICAgb25TaG91bGRDbG9zZVBvcG92ZXI9e3RoaXMub25TaG91bGRDbG9zZVBvcG92ZXJ9XHJcbiAgICAgIHsuLi5vcHRpb25zfVxyXG4gICAgLz4pO1xyXG4gIH1cclxuXHJcbiAgZ2V0VG9vbFRpcCA9IGNvbnRlbnQgPT4gPFRvb2x0aXAgaWQ9XCJ0b29sdGlwXCIgY2xhc3NOYW1lPVwiaHMtY29tYm8tYm94LXRvb2x0aXBcIj57Y29udGVudH08L1Rvb2x0aXA+O1xyXG5cclxuICBnZXREZWZhdWx0VG9vbFRpcENvbnRlbnQgPSAoKSA9PiB7XHJcbiAgICBpZiAoIXRoaXMuaXNTZWxlY3RlZEl0ZW1zKCkpIHJldHVybiB0aGlzLnByb3BzLm5vU2VsZWN0aW9uVGV4dDtcclxuICAgIGNvbnN0IHRvdGFsQ291bnQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLmxlbmd0aDtcclxuICAgIGNvbnN0IGNvdW50ID0gdG90YWxDb3VudCA+IE1BWF9DT1VOVF9PRl9UT09MVElQX0lURU1TID8gTUFYX0NPVU5UX09GX1RPT0xUSVBfSVRFTVMgOiB0b3RhbENvdW50O1xyXG5cclxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5zbGljZSgwLCBjb3VudCk7XHJcbiAgICBjb25zdCBlbGVtZW50cyA9IE9iamVjdC5rZXlzKGl0ZW1zKS5tYXAoaSA9PiA8cCBrZXk9e2l9PntpdGVtc1tpXS5uYW1lfTwvcD4pO1xyXG5cclxuICAgIGlmIChjb3VudCA8IHRvdGFsQ291bnQpIGVsZW1lbnRzLnB1c2goPHAga2V5PXtjb3VudH0+LiAuIC48L3A+KTtcclxuXHJcbiAgICByZXR1cm4gZWxlbWVudHM7XHJcbiAgfVxyXG5cclxuICBnZXRDb3VudE9mU2VsZWN0ZWRJdGVtcyA9ICgpID0+ICh0aGlzLmlzU2VsZWN0ZWRJdGVtcygpID8gdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5sZW5ndGggOiAwKTtcclxuXHJcbiAgc2V0UG9wb3ZlclZpc2liaWxpdHkgPSAoaXNWaXNpYmxlKSA9PiB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgaXNQb3BvdmVyVmlzaWJsZTogaXNWaXNpYmxlIH0pO1xyXG4gIH1cclxuXHJcbiAgaXNTZWxlY3RlZEl0ZW1zID0gKCkgPT4gKFxyXG4gICAgdGhpcy5zdGF0ZS5zZWxlY3RlZCAmJiB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zICYmIHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMubGVuZ3RoID4gMFxyXG4gICk7XHJcblxyXG4gIGxvYWREYXRhID0gKHByb3BzKSA9PiB7XHJcbiAgICBwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIubG9hZERhdGEoKS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgbmVlZFRvTG9hZERhdGE6IGZhbHNlLFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcG9wb3ZlclNob3VsZEJlSGlkZGVuID0gKCkgPT4ge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnN0YXRlLmlzUG9wb3ZlclZpc2libGUpIHRoaXMuc2V0UG9wb3ZlclZpc2liaWxpdHkoZmFsc2UpO1xyXG4gICAgfSwgMTUwKTtcclxuICB9XHJcblxyXG4gIHVuY2hlY2tBbGxJdGVtcyA9ICgpID0+IHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBwcmVDaGVja2VkSXRlbXM6IFtdLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVQcmVjaGVja2VkID0gKHByb3BzKSA9PiB7XHJcbiAgICBjb25zdCB7IGRhdGFTb3VyY2VQcm92aWRlciwgcHJlQ2hlY2tlZEdyb3VwTmFtZSwgcHJlQ2hlY2tlZEl0ZW1zIH0gPSBwcm9wcztcclxuXHJcbiAgICBkYXRhU291cmNlUHJvdmlkZXIuc2V0UHJlY2hlY2tlZEl0ZW1zKHByZUNoZWNrZWRJdGVtcyk7XHJcblxyXG4gICAgY29uc3QgY2hlY2tlZE91dHB1dCA9IGRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkT3V0cHV0KCk7XHJcbiAgICBjb25zdCBzZWxlY3RlZEl0ZW1zID0gZGF0YVNvdXJjZVByb3ZpZGVyLmdldEFsbENoZWNrZWRJdGVtcygpO1xyXG4gICAgY29uc3QgY2hlY2tlZCA9IGNoZWNrZWRPdXRwdXQuY2hlY2tlZCB8fCBbXTtcclxuXHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZDogZmFsc2UsXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm9uU2VsZWN0ZWRJblZpZXcocHJlQ2hlY2tlZEdyb3VwTmFtZSwgc2VsZWN0ZWRJdGVtcywgY2hlY2tlZCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IGlucHV0TmFtZSB9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IGlucHV0T3B0aW9ucyA9IHtcclxuICAgICAgb25Gb2N1czogdGhpcy5vbklucHV0Rm9jdXMsXHJcbiAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucHJvcHMubm9TZWxlY3Rpb25UZXh0LFxyXG4gICAgICByZWFkT25seTogdHJ1ZSxcclxuICAgICAgcmVmOiAoaW5wdXQpID0+IHsgdGhpcy5pbnB1dEVsZW1lbnQgPSBpbnB1dDsgfSxcclxuICAgICAgdmFsdWU6IHRoaXMuZ2V0SW5wdXRUZXh0KCksXHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChpbnB1dE5hbWUudHJpbSgpICE9PSAnJykge1xyXG4gICAgICBpbnB1dE9wdGlvbnMubmFtZSA9IGlucHV0TmFtZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1saXN0LXdyYXBwZXJcIj5cclxuICAgICAgICA8T3ZlcmxheVRyaWdnZXJcclxuICAgICAgICAgIGRlbGF5PXtUT09MVElQX0RFTEFZX01TfVxyXG4gICAgICAgICAgcGxhY2VtZW50PXt0aGlzLnByb3BzLnRvb2x0aXBQbGFjZW1lbnR9XHJcbiAgICAgICAgICBvdmVybGF5PXt0aGlzLmdldFRvb2xUaXAodGhpcy5nZXREZWZhdWx0VG9vbFRpcENvbnRlbnQoKSl9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItbGlzdFwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgey4uLmlucHV0T3B0aW9uc30gLz5cclxuICAgICAgICAgICAge3RoaXMuc3RhdGUubmVlZFRvTG9hZERhdGEgP1xyXG4gICAgICAgICAgICAgIDxTcGlubmVyIC8+IDpcclxuICAgICAgICAgICAgICA8SFNCYWRnZSBjbGFzc05hbWU9XCJiYWRnZS1vcmFuZ2VcIj57dGhpcy5nZXRDb3VudE9mU2VsZWN0ZWRJdGVtcygpfTwvSFNCYWRnZT5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkaXNhYmxlZD17dGhpcy5zdGF0ZS5uZWVkVG9Mb2FkRGF0YX0gY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWxpc3QtYnRuXCIgb25DbGljaz17dGhpcy5vbkNsaWNrSGFuZGxlcn0+PEZhQ2hldnJvbkRvd24gLz48L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvT3ZlcmxheVRyaWdnZXI+XHJcbiAgICAgICAgeyB0aGlzLnN0YXRlLmlzUG9wb3ZlclZpc2libGUgPyB0aGlzLmdldFBvcG92ZXIoKSA6IG51bGwgfVxyXG4gICAgICAgIHsgdGhpcy5zdGF0ZS5pc1ZpZXdWaXNpYmxlID8gdGhpcy5nZXRWaWV3KCkgOiBudWxsIH1cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuSGllcmFyY2h5U2VsZWN0b3JDb21ib0JveC5wcm9wVHlwZXMgPSB7XHJcbiAgZGF0YVNvdXJjZVByb3ZpZGVyOiBkYXRhU291cmNlUHJvdmlkZXJUeXBlLmlzUmVxdWlyZWQsXHJcbiAgaGlkZU9uUG9wb3ZlckJsdXI6IFByb3BUeXBlcy5ib29sLFxyXG4gIGlucHV0TmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICBub1NlbGVjdGlvblRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgcG9wb3ZlclZpc2libGU6IFByb3BUeXBlcy5ib29sLFxyXG4gIHBvcG92ZXJPcHRpb25zOiBwb3BvdmVyT3B0aW9uc1R5cGUuaXNSZXF1aXJlZCxcclxuICBwcmVDaGVja2VkSXRlbXM6IHByZUNoZWNrZWRJdGVtc0xpc3RTaGFwZSxcclxuICBwcmVDaGVja2VkR3JvdXBOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIHRvb2x0aXBQbGFjZW1lbnQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgdmlld09wdGlvbnM6IHZpZXdPcHRpb25zVHlwZS5pc1JlcXVpcmVkLFxyXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcclxufTtcclxuXHJcbkhpZXJhcmNoeVNlbGVjdG9yQ29tYm9Cb3guZGVmYXVsdFByb3BzID0ge1xyXG4gIGhpZGVPblBvcG92ZXJCbHVyOiB0cnVlLFxyXG4gIGlucHV0TmFtZTogJycsXHJcbiAgbm9TZWxlY3Rpb25UZXh0OiAnTm8gb25lIHNlbGVjdGVkLi4uJyxcclxuICBwb3BvdmVyVmlzaWJsZTogZmFsc2UsXHJcbiAgcHJlQ2hlY2tlZEl0ZW1zOiBudWxsLFxyXG4gIHByZUNoZWNrZWRHcm91cE5hbWU6ICdEZWZhdWx0IGdyb3VwJyxcclxuICB0b29sdGlwUGxhY2VtZW50OiAnYm90dG9tJyxcclxuICBvblNlbGVjdDogKCkgPT4ge30sXHJcbn07XHJcbiJdfQ==