"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _fa = require("react-icons/fa");

var _types = require("../../services/types");

var _types2 = require("../../types");

var _spinner = _interopRequireDefault(require("../spinner"));

var _popover = _interopRequireDefault(require("../popover"));

var _view = _interopRequireDefault(require("../view"));

var _badge = _interopRequireDefault(require("../badge"));

var _constants = require("./constants");

require("./combo-box.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

      return _react["default"].createElement("button", {
        type: "reset",
        className: "oc-hierarchy-selector-list-clear-btn",
        onClick: _this.onClearHandler
      }, _react["default"].createElement(_fa.FaTimes, null));
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
      return _react["default"].createElement(_view["default"], _extends({
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
      return _react["default"].createElement(_popover["default"], _extends({
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

      return _react["default"].createElement("div", {
        className: "oc-hierarchy-selector-list"
      }, _react["default"].createElement("input", inputOptions), isBusy ? _react["default"].createElement(_spinner["default"], null) : _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_badge["default"], {
        className: "badge-orange"
      }, _this.getCountOfSelectedItems()), _this.getClearButton()), _react["default"].createElement("button", {
        type: "button",
        disabled: isBusy,
        className: "oc-hierarchy-selector-list-btn",
        onClick: _this.onClickHandler
      }, _this.state.isPopoverVisible ? _react["default"].createElement(_fa.FaCaretUp, null) : _react["default"].createElement(_fa.FaCaretDown, null)));
    });

    _defineProperty(_assertThisInitialized(_this), "getToolTip", function (content) {
      return _react["default"].createElement(_reactBootstrap.Tooltip, {
        id: "tooltip",
        className: "hs-combo-box-tooltip"
      }, content);
    });

    _defineProperty(_assertThisInitialized(_this), "getDefaultToolTipContent", function () {
      if (!_this.isSelectedItems()) return _this.props.noSelectionText;
      var totalCount = _this.state.selected.items.length;
      var count = totalCount > _constants.MAX_COUNT_OF_TOOLTIP_ITEMS ? _constants.MAX_COUNT_OF_TOOLTIP_ITEMS : totalCount;

      var items = _this.state.selected.items.slice(0, count);

      var elements = Object.keys(items).map(function (i) {
        return _this.props.tooltipItemRenderFunction ? _this.props.tooltipItemRenderFunction(items[i], i, _this.defaultItemRenderFunction) : _this.defaultItemRenderFunction(items[i], i);
      });
      if (count < totalCount) elements.push(_react["default"].createElement("p", {
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
      return _react["default"].createElement("p", {
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
      return _react["default"].createElement("div", {
        className: "oc-hierarchy-selector-list-wrapper"
      }, this.getHierarchySelector(), this.state.isPopoverVisible ? this.getPopover() : null, this.state.isViewVisible ? this.getView() : null);
    }

    return _react["default"].createElement("div", {
      className: "oc-hierarchy-selector-list-wrapper"
    }, _react["default"].createElement(_reactBootstrap.OverlayTrigger, {
      delay: _constants.TOOLTIP_DELAY_MS,
      placement: this.props.tooltipPlacement,
      overlay: this.getToolTip(this.getDefaultToolTipContent())
    }, this.getHierarchySelector()), this.state.isPopoverVisible ? this.getPopover() : null, this.state.isViewVisible ? this.getView() : null);
  };

  return HierarchySelectorComboBox;
}(_react["default"].PureComponent);

exports["default"] = HierarchySelectorComboBox;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbWJvLWJveC9jb21iby1ib3guY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJIaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94IiwicHJvcHMiLCJzZXRQb3BvdmVyVmlzaWJpbGl0eSIsInN0YXRlIiwiaXNQb3BvdmVyVmlzaWJsZSIsImlucHV0RWxlbWVudCIsImJsdXIiLCJncm91cE5hbWUiLCJzZWxlY3RlZEl0ZW0iLCJjaGVja2VkT3V0cHV0IiwiZmxhZ3MiLCJzZXRTdGF0ZSIsInNlbGVjdGVkIiwiaXNWaWV3VmlzaWJsZSIsIml0ZW1zIiwibWFwIiwiaXRlbSIsIk9iamVjdCIsImFzc2lnbiIsIm9uU2VsZWN0IiwiaGlkZU9uUG9wb3ZlckJsdXIiLCJwb3BvdmVyU2hvdWxkQmVIaWRkZW4iLCJzZWxlY3RlZEl0ZW1zIiwibmFtZSIsInByZUNoZWNrZWRJdGVtcyIsIm9uU2VsZWN0SGFuZGxlciIsInVuY2hlY2tBbGxJdGVtcyIsIkFycmF5IiwiaXNBcnJheSIsImludGVyYWN0aXZlIiwiaXNDbGVhcmFibGUiLCJsZW5ndGgiLCJvbkNsZWFySGFuZGxlciIsInNlbGVjdGlvblRleHQiLCJvcHRpb25zIiwidmlld09wdGlvbnMiLCJzbGljZSIsImRhdGFTb3VyY2VQcm92aWRlciIsIm9uQ2FuY2VsZWRWaWV3Iiwib25TZWxlY3RlZEluVmlldyIsIm9uSGVscCIsInBvcG92ZXJPcHRpb25zIiwib25Qb3BvdmVyQmx1ciIsIm9uU2VsZWN0ZWRJblBvcG92ZXIiLCJvblNob3VsZE9wZW5WaWV3Iiwib25TaG91bGRDbG9zZVBvcG92ZXIiLCJpbnB1dE5hbWUiLCJpc0J1c3kiLCJuZWVkVG9Mb2FkRGF0YSIsImlucHV0T3B0aW9ucyIsIm9uRm9jdXMiLCJvbklucHV0Rm9jdXMiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJub1NlbGVjdGlvblRleHQiLCJyZWFkT25seSIsInJlZiIsImlucHV0IiwidmFsdWUiLCJnZXRJbnB1dFRleHQiLCJvbkNsaWNrIiwib25DbGlja0hhbmRsZXIiLCJ0cmltIiwiZ2V0Q291bnRPZlNlbGVjdGVkSXRlbXMiLCJnZXRDbGVhckJ1dHRvbiIsImNvbnRlbnQiLCJpc1NlbGVjdGVkSXRlbXMiLCJ0b3RhbENvdW50IiwiY291bnQiLCJNQVhfQ09VTlRfT0ZfVE9PTFRJUF9JVEVNUyIsImVsZW1lbnRzIiwia2V5cyIsImkiLCJ0b29sdGlwSXRlbVJlbmRlckZ1bmN0aW9uIiwiZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbiIsInB1c2giLCJpc1Zpc2libGUiLCJrZXkiLCJsb2FkRGF0YSIsInRoZW4iLCJzZXRUaW1lb3V0IiwicHJlQ2hlY2tlZEdyb3VwTmFtZSIsInNldFByZWNoZWNrZWRJdGVtcyIsImdldENoZWNrZWRPdXRwdXQiLCJnZXRBbGxDaGVja2VkSXRlbXMiLCJjaGVja2VkIiwibmVlZFRvVXBkYXRlUHJlQ2hlY2tlZCIsImlzRGF0YUxvYWRlZCIsImlzTG9hZGVkIiwicG9wb3ZlclZpc2libGUiLCJjb21wb25lbnRXaWxsTW91bnQiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwiY29tcG9uZW50V2lsbFVwZGF0ZSIsIm5leHRTdGF0ZSIsInVwZGF0ZVByZWNoZWNrZWQiLCJyZW5kZXIiLCJnZXRIaWVyYXJjaHlTZWxlY3RvciIsImdldFBvcG92ZXIiLCJnZXRWaWV3IiwiVE9PTFRJUF9ERUxBWV9NUyIsInRvb2x0aXBQbGFjZW1lbnQiLCJnZXRUb29sVGlwIiwiZ2V0RGVmYXVsdFRvb2xUaXBDb250ZW50IiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUdBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLHlCOzs7OztBQUNuQixxQ0FBWUMsTUFBWixFQUFtQjtBQUFBOztBQUNqQiw0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SyxFQUFFQywyQkFEVDtBQUVFLE1BQUEsU0FBUyxFQUFFLEtBQUtuRyxLQUFMLENBQVdvRyxnQkFGeEI7QUFHRSxNQUFBLE9BQU8sRUFBRSxLQUFLQyxVQUFMLENBQWdCLEtBQUtDLHdCQUFMLEVBQWhCO0FBSFgsT0FLSSxLQUFLTixvQkFBTCxFQUxKLENBREYsRUFRSSxLQUFLOUYsS0FBTCxDQUFXQyxnQkFBWCxHQUE4QixLQUFLOEYsVUFBTCxFQUE5QixHQUFrRCxJQVJ0RCxFQVNJLEtBQUsvRixLQUFMLENBQVdVLGFBQVgsR0FBMkIsS0FBS3NGLE9BQUwsRUFBM0IsR0FBNEMsSUFUaEQsQ0FERjtBQWFELEc7OztFQTFUb0RLLGtCQUFNQyxhOzs7QUErVTdEekcseUJBQXlCLENBQUMwRyxZQUExQixHQUF5QztBQUN2Q3RGLEVBQUFBLGlCQUFpQixFQUFFLElBRG9CO0FBRXZDMEIsRUFBQUEsU0FBUyxFQUFFLEVBRjRCO0FBR3ZDUSxFQUFBQSxlQUFlLEVBQUUscUJBSHNCO0FBSXZDbUMsRUFBQUEsY0FBYyxFQUFFLEtBSnVCO0FBS3ZDakUsRUFBQUEsZUFBZSxFQUFFLElBTHNCO0FBTXZDeUQsRUFBQUEsbUJBQW1CLEVBQUUsZUFOa0I7QUFPdkNvQixFQUFBQSxnQkFBZ0IsRUFBRSxRQVBxQjtBQVF2Q2xGLEVBQUFBLFFBQVEsRUFBRSxvQkFBTSxDQUFFLENBUnFCO0FBU3ZDcUIsRUFBQUEsTUFBTSxFQUFFLGtCQUFNLENBQUUsQ0FUdUI7QUFVdkNpQyxFQUFBQSx5QkFBeUIsRUFBRSxJQVZZO0FBV3ZDM0MsRUFBQUEsV0FBVyxFQUFFLEtBWDBCO0FBWXZDaUIsRUFBQUEsTUFBTSxFQUFFO0FBWitCLENBQXpDIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tdW51c2VkLXN0YXRlICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBUb29sdGlwLCBPdmVybGF5VHJpZ2dlciB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgRmFDYXJldERvd24sIEZhQ2FyZXRVcCwgRmFUaW1lcyB9IGZyb20gJ3JlYWN0LWljb25zL2ZhJztcbmltcG9ydCB7IGRhdGFTb3VyY2VQcm92aWRlclR5cGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90eXBlcyc7XG5pbXBvcnQgeyBwcmVDaGVja2VkSXRlbXNMaXN0U2hhcGUsIHBvcG92ZXJPcHRpb25zVHlwZSwgdmlld09wdGlvbnNUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IFNwaW5uZXIgZnJvbSAnLi4vc3Bpbm5lcic7XG5pbXBvcnQgSFNQb3BvdmVyIGZyb20gJy4uL3BvcG92ZXInO1xuaW1wb3J0IEhTVmlldyBmcm9tICcuLi92aWV3JztcbmltcG9ydCBIU0JhZGdlIGZyb20gJy4uL2JhZGdlJztcblxuXG5pbXBvcnQgeyBUT09MVElQX0RFTEFZX01TLCBNQVhfQ09VTlRfT0ZfVE9PTFRJUF9JVEVNUyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCAnLi9jb21iby1ib3guc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVNlbGVjdG9yQ29tYm9Cb3ggZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICBjb25zdCBpc0RhdGFMb2FkZWQgPSBwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuaXNMb2FkZWQ7XG4gICAgY29uc3QgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZCA9IHByb3BzLnByZUNoZWNrZWRJdGVtcyAmJiBwcm9wcy5wcmVDaGVja2VkSXRlbXMubGVuZ3RoO1xuICAgIGNvbnN0IG5lZWRUb0xvYWREYXRhID0gIWlzRGF0YUxvYWRlZCAmJiBuZWVkVG9VcGRhdGVQcmVDaGVja2VkO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG5lZWRUb0xvYWREYXRhLFxuICAgICAgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZCxcbiAgICAgIHByZUNoZWNrZWRJdGVtczogcHJvcHMucHJlQ2hlY2tlZEl0ZW1zLFxuICAgICAgc2VsZWN0ZWQ6IG51bGwsXG4gICAgICBpc1BvcG92ZXJWaXNpYmxlOiBwcm9wcy5wb3BvdmVyVmlzaWJsZSxcbiAgICAgIGlzVmlld1Zpc2libGU6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgY29uc3QgeyBuZWVkVG9Mb2FkRGF0YSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBpZiAobmVlZFRvTG9hZERhdGEpIHtcbiAgICAgIHRoaXMubG9hZERhdGEodGhpcy5wcm9wcyk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBjb25zdCB7IGRhdGFTb3VyY2VQcm92aWRlciwgcHJlQ2hlY2tlZEl0ZW1zIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKGRhdGFTb3VyY2VQcm92aWRlciAhPT0gbmV4dFByb3BzLmRhdGFTb3VyY2VQcm92aWRlcikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG5lZWRUb0xvYWREYXRhOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHByZUNoZWNrZWRJdGVtcyAhPT0gbmV4dFByb3BzLnByZUNoZWNrZWRJdGVtcykge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQ6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgY29uc3QgeyBuZWVkVG9Mb2FkRGF0YSwgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZCB9ID0gbmV4dFN0YXRlO1xuICAgIGlmIChuZWVkVG9Mb2FkRGF0YSkge1xuICAgICAgdGhpcy5sb2FkRGF0YShuZXh0UHJvcHMpO1xuICAgIH0gZWxzZSBpZiAobmVlZFRvVXBkYXRlUHJlQ2hlY2tlZCkge1xuICAgICAgdGhpcy51cGRhdGVQcmVjaGVja2VkKG5leHRQcm9wcyk7XG4gICAgfVxuICB9XG5cbiAgb25DbGlja0hhbmRsZXIgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRQb3BvdmVyVmlzaWJpbGl0eSghdGhpcy5zdGF0ZS5pc1BvcG92ZXJWaXNpYmxlKTtcbiAgfVxuXG4gIG9uSW5wdXRGb2N1cyA9ICgpID0+IHtcbiAgICB0aGlzLmlucHV0RWxlbWVudC5ibHVyKCk7XG4gIH1cblxuICBvblNlbGVjdEhhbmRsZXIgPSAoZ3JvdXBOYW1lLCBzZWxlY3RlZEl0ZW0sIGNoZWNrZWRPdXRwdXQsIGZsYWdzKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZDogc2VsZWN0ZWRJdGVtLFxuICAgICAgaXNQb3BvdmVyVmlzaWJsZTogZmFsc2UsXG4gICAgICBpc1ZpZXdWaXNpYmxlOiBmYWxzZSxcbiAgICB9KTtcbiAgICBjb25zdCBpdGVtcyA9IGNoZWNrZWRPdXRwdXQgPyBjaGVja2VkT3V0cHV0Lm1hcChpdGVtID0+IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pKSA6IFtdO1xuXG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChpdGVtcywgZ3JvdXBOYW1lLCBmbGFncyk7XG4gIH1cblxuICBvblBvcG92ZXJCbHVyID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmhpZGVPblBvcG92ZXJCbHVyKSB7XG4gICAgICB0aGlzLnBvcG92ZXJTaG91bGRCZUhpZGRlbigpO1xuICAgIH1cbiAgfVxuXG4gIG9uU2hvdWxkT3BlblZpZXcgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlzVmlld1Zpc2libGU6IHRydWUgfSk7XG4gIH1cblxuICBvblNob3VsZENsb3NlUG9wb3ZlciA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlzUG9wb3ZlclZpc2libGU6IGZhbHNlLFxuICAgIH0pO1xuICB9XG5cbiAgb25DYW5jZWxlZFZpZXcgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpc1BvcG92ZXJWaXNpYmxlOiBmYWxzZSxcbiAgICAgIGlzVmlld1Zpc2libGU6IGZhbHNlLFxuICAgIH0pO1xuICB9XG5cbiAgb25TZWxlY3RlZEluVmlldyA9IChncm91cE5hbWUsIHNlbGVjdGVkSXRlbXMsIGNoZWNrZWRPdXRwdXQsIGZsYWdzKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ZWRJdGVtID0ge1xuICAgICAgbmFtZTogZ3JvdXBOYW1lLFxuICAgICAgaXRlbXM6IHNlbGVjdGVkSXRlbXMsXG4gICAgfTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHByZUNoZWNrZWRJdGVtczogY2hlY2tlZE91dHB1dCxcbiAgICB9KTtcbiAgICB0aGlzLm9uU2VsZWN0SGFuZGxlcihncm91cE5hbWUsIHNlbGVjdGVkSXRlbSwgY2hlY2tlZE91dHB1dCwgZmxhZ3MpO1xuICB9XG5cbiAgb25TZWxlY3RlZEluUG9wb3ZlciA9IChzZWxlY3RlZEl0ZW0sIGZsYWdzKSA9PiB7XG4gICAgdGhpcy51bmNoZWNrQWxsSXRlbXMoKTtcbiAgICBjb25zdCBjaGVja2VkT3V0cHV0ID0gc2VsZWN0ZWRJdGVtICYmIEFycmF5LmlzQXJyYXkoc2VsZWN0ZWRJdGVtLml0ZW1zKSA/XG4gICAgICBzZWxlY3RlZEl0ZW0uaXRlbXMgOiBbXTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHByZUNoZWNrZWRJdGVtczogY2hlY2tlZE91dHB1dCxcbiAgICB9KTtcbiAgICB0aGlzLm9uU2VsZWN0SGFuZGxlcihzZWxlY3RlZEl0ZW0ubmFtZSwgc2VsZWN0ZWRJdGVtLCBjaGVja2VkT3V0cHV0LCBmbGFncyk7XG4gIH1cblxuICBvbkNsZWFySGFuZGxlciA9ICgpID0+IHtcbiAgICBjb25zdCBncm91cE5hbWUgPSAnJztcbiAgICBjb25zdCBzZWxlY3RlZEl0ZW0gPSBbXTtcbiAgICBjb25zdCBjaGVja2VkT3V0cHV0ID0gW107XG4gICAgY29uc3QgZmxhZ3MgPSB7IGludGVyYWN0aXZlOiB0cnVlIH07XG4gICAgdGhpcy51bmNoZWNrQWxsSXRlbXMoKTtcbiAgICB0aGlzLm9uU2VsZWN0SGFuZGxlcihncm91cE5hbWUsIHNlbGVjdGVkSXRlbSwgY2hlY2tlZE91dHB1dCwgZmxhZ3MpO1xuICB9XG5cbiAgZ2V0Q2xlYXJCdXR0b24gPSAoKSA9PiB7XG4gICAgaWYgKFxuICAgICAgIXRoaXMucHJvcHMuaXNDbGVhcmFibGVcbiAgICAgIHx8ICF0aGlzLnN0YXRlLnNlbGVjdGVkXG4gICAgICB8fCAhdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtc1xuICAgICAgfHwgIXRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMubGVuZ3RoXG4gICAgKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cInJlc2V0XCJcbiAgICAgICAgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWxpc3QtY2xlYXItYnRuXCJcbiAgICAgICAgb25DbGljaz17dGhpcy5vbkNsZWFySGFuZGxlcn1cbiAgICAgID5cbiAgICAgICAgPEZhVGltZXMgLz5cbiAgICAgIDwvYnV0dG9uPlxuICAgICk7XG4gIH1cblxuICBnZXRJbnB1dFRleHQgPSAoKSA9PiB7XG4gICAgbGV0IHNlbGVjdGlvblRleHQgPSAnJztcblxuICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkICYmIHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMgJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICBzZWxlY3Rpb25UZXh0ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZC5uYW1lO1xuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0aW9uVGV4dDtcbiAgfVxuXG4gIGdldFZpZXcgPSAoKSA9PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMucHJvcHMudmlld09wdGlvbnM7XG4gICAgY29uc3QgcHJlQ2hlY2tlZEl0ZW1zID0gQXJyYXkuaXNBcnJheSh0aGlzLnN0YXRlLnByZUNoZWNrZWRJdGVtcykgP1xuICAgICAgdGhpcy5zdGF0ZS5wcmVDaGVja2VkSXRlbXMuc2xpY2UoKSA6IG51bGw7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPEhTVmlld1xuICAgICAgICBkYXRhU291cmNlUHJvdmlkZXI9e3RoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyfVxuICAgICAgICB7Li4ub3B0aW9uc31cbiAgICAgICAgb25DYW5jZWw9e3RoaXMub25DYW5jZWxlZFZpZXd9XG4gICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0ZWRJblZpZXd9XG4gICAgICAgIG9uSGVscD17dGhpcy5wcm9wcy5vbkhlbHB9XG4gICAgICAgIGdyb3VwTmFtZT17dGhpcy5zdGF0ZS5zZWxlY3RlZCA/IHRoaXMuc3RhdGUuc2VsZWN0ZWQubmFtZSA6ICcnfVxuICAgICAgICBwcmVDaGVja2VkSXRlbXM9e3ByZUNoZWNrZWRJdGVtc31cbiAgICAgICAgaXNDbGVhcmFibGU9e3RoaXMucHJvcHMuaXNDbGVhcmFibGV9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICBnZXRQb3BvdmVyID0gKCkgPT4ge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLnByb3BzLnBvcG92ZXJPcHRpb25zO1xuXG4gICAgcmV0dXJuICg8SFNQb3BvdmVyXG4gICAgICBkYXRhU291cmNlUHJvdmlkZXI9e3RoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyfVxuICAgICAgb25Db21wb25lbnRCbHVyPXt0aGlzLm9uUG9wb3ZlckJsdXJ9XG4gICAgICBvblNlbGVjdD17dGhpcy5vblNlbGVjdGVkSW5Qb3BvdmVyfVxuICAgICAgb25TaG91bGRPcGVuVmlldz17dGhpcy5vblNob3VsZE9wZW5WaWV3fVxuICAgICAgb25TaG91bGRDbG9zZVBvcG92ZXI9e3RoaXMub25TaG91bGRDbG9zZVBvcG92ZXJ9XG4gICAgICB7Li4ub3B0aW9uc31cbiAgICAvPik7XG4gIH1cblxuICBnZXRIaWVyYXJjaHlTZWxlY3RvciA9ICgpID0+IHtcbiAgICBjb25zdCB7IGlucHV0TmFtZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpc0J1c3kgPSB0aGlzLnByb3BzLmlzQnVzeSB8fCB0aGlzLnN0YXRlLm5lZWRUb0xvYWREYXRhO1xuXG4gICAgY29uc3QgaW5wdXRPcHRpb25zID0ge1xuICAgICAgb25Gb2N1czogdGhpcy5vbklucHV0Rm9jdXMsXG4gICAgICB0eXBlOiAndGV4dCcsXG4gICAgICBwbGFjZWhvbGRlcjogdGhpcy5wcm9wcy5ub1NlbGVjdGlvblRleHQsXG4gICAgICByZWFkT25seTogdHJ1ZSxcbiAgICAgIHJlZjogKGlucHV0KSA9PiB7IHRoaXMuaW5wdXRFbGVtZW50ID0gaW5wdXQ7IH0sXG4gICAgICB2YWx1ZTogdGhpcy5nZXRJbnB1dFRleHQoKSxcbiAgICAgIG9uQ2xpY2s6IHRoaXMub25DbGlja0hhbmRsZXIsXG4gICAgfTtcblxuICAgIGlmIChpbnB1dE5hbWUudHJpbSgpICE9PSAnJykge1xuICAgICAgaW5wdXRPcHRpb25zLm5hbWUgPSBpbnB1dE5hbWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWxpc3RcIj5cbiAgICAgICAgPGlucHV0IHsuLi5pbnB1dE9wdGlvbnN9IC8+XG4gICAgICAgIHtpc0J1c3kgP1xuICAgICAgICAgIDxTcGlubmVyIC8+IDpcbiAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgICA8SFNCYWRnZSBjbGFzc05hbWU9XCJiYWRnZS1vcmFuZ2VcIj57dGhpcy5nZXRDb3VudE9mU2VsZWN0ZWRJdGVtcygpfTwvSFNCYWRnZT5cbiAgICAgICAgICAgIHt0aGlzLmdldENsZWFyQnV0dG9uKCl9XG4gICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgfVxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgZGlzYWJsZWQ9e2lzQnVzeX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItbGlzdC1idG5cIlxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGlja0hhbmRsZXJ9XG4gICAgICAgID5cbiAgICAgICAgICB7IHRoaXMuc3RhdGUuaXNQb3BvdmVyVmlzaWJsZVxuICAgICAgICAgICAgPyA8RmFDYXJldFVwIC8+XG4gICAgICAgICAgICA6IDxGYUNhcmV0RG93biAvPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgZ2V0VG9vbFRpcCA9IGNvbnRlbnQgPT4gPFRvb2x0aXAgaWQ9XCJ0b29sdGlwXCIgY2xhc3NOYW1lPVwiaHMtY29tYm8tYm94LXRvb2x0aXBcIj57Y29udGVudH08L1Rvb2x0aXA+O1xuXG4gIGdldERlZmF1bHRUb29sVGlwQ29udGVudCA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNTZWxlY3RlZEl0ZW1zKCkpIHJldHVybiB0aGlzLnByb3BzLm5vU2VsZWN0aW9uVGV4dDtcbiAgICBjb25zdCB0b3RhbENvdW50ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5sZW5ndGg7XG4gICAgY29uc3QgY291bnQgPSB0b3RhbENvdW50ID4gTUFYX0NPVU5UX09GX1RPT0xUSVBfSVRFTVMgPyBNQVhfQ09VTlRfT0ZfVE9PTFRJUF9JVEVNUyA6IHRvdGFsQ291bnQ7XG5cbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMuc2xpY2UoMCwgY291bnQpO1xuICAgIGNvbnN0IGVsZW1lbnRzID0gT2JqZWN0LmtleXMoaXRlbXMpLm1hcChpID0+ICh0aGlzLnByb3BzLnRvb2x0aXBJdGVtUmVuZGVyRnVuY3Rpb24gP1xuICAgICAgdGhpcy5wcm9wcy50b29sdGlwSXRlbVJlbmRlckZ1bmN0aW9uKGl0ZW1zW2ldLCBpLCB0aGlzLmRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24pIDpcbiAgICAgIHRoaXMuZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbihpdGVtc1tpXSwgaSkpKTtcbiAgICBpZiAoY291bnQgPCB0b3RhbENvdW50KSBlbGVtZW50cy5wdXNoKDxwIGtleT17Y291bnR9Pi4gLiAuPC9wPik7XG5cbiAgICByZXR1cm4gZWxlbWVudHM7XG4gIH1cblxuICBnZXRDb3VudE9mU2VsZWN0ZWRJdGVtcyA9ICgpID0+ICh0aGlzLmlzU2VsZWN0ZWRJdGVtcygpID8gdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5sZW5ndGggOiAwKTtcblxuICBzZXRQb3BvdmVyVmlzaWJpbGl0eSA9IChpc1Zpc2libGUpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgaXNQb3BvdmVyVmlzaWJsZTogaXNWaXNpYmxlIH0pO1xuICB9XG5cbiAgZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbiA9IChpdGVtLCBrZXkpID0+ICg8cCBrZXk9e2tleX0+e2l0ZW0ubmFtZX08L3A+KTtcblxuICBpc1NlbGVjdGVkSXRlbXMgPSAoKSA9PiAoXG4gICAgdGhpcy5zdGF0ZS5zZWxlY3RlZCAmJiB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zICYmIHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMubGVuZ3RoID4gMFxuICApO1xuXG4gIGxvYWREYXRhID0gKHByb3BzKSA9PiB7XG4gICAgcHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmxvYWREYXRhKCkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbmVlZFRvTG9hZERhdGE6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwb3BvdmVyU2hvdWxkQmVIaWRkZW4gPSAoKSA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5pc1BvcG92ZXJWaXNpYmxlKSB0aGlzLnNldFBvcG92ZXJWaXNpYmlsaXR5KGZhbHNlKTtcbiAgICB9LCAxNTApO1xuICB9XG5cbiAgdW5jaGVja0FsbEl0ZW1zID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcHJlQ2hlY2tlZEl0ZW1zOiBbXSxcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVByZWNoZWNrZWQgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IGRhdGFTb3VyY2VQcm92aWRlciwgcHJlQ2hlY2tlZEdyb3VwTmFtZSwgcHJlQ2hlY2tlZEl0ZW1zIH0gPSBwcm9wcztcblxuICAgIGRhdGFTb3VyY2VQcm92aWRlci5zZXRQcmVjaGVja2VkSXRlbXMocHJlQ2hlY2tlZEl0ZW1zKTtcblxuICAgIGNvbnN0IGNoZWNrZWRPdXRwdXQgPSBkYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZE91dHB1dCgpO1xuICAgIGNvbnN0IHNlbGVjdGVkSXRlbXMgPSBkYXRhU291cmNlUHJvdmlkZXIuZ2V0QWxsQ2hlY2tlZEl0ZW1zKCk7XG4gICAgY29uc3QgY2hlY2tlZCA9IGNoZWNrZWRPdXRwdXQuY2hlY2tlZCB8fCBbXTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZDogZmFsc2UsXG4gICAgfSk7XG5cbiAgICB0aGlzLm9uU2VsZWN0ZWRJblZpZXcocHJlQ2hlY2tlZEdyb3VwTmFtZSwgc2VsZWN0ZWRJdGVtcywgY2hlY2tlZCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgLy8gSWYgcG9wb3ZlciBpcyB2aXNpYmxlLCBkb24ndCBzaG93IHRvb2x0aXAgKG92ZXJsYXkpXG4gICAgaWYgKHRoaXMuc3RhdGUuaXNQb3BvdmVyVmlzaWJsZSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItbGlzdC13cmFwcGVyXCI+XG4gICAgICAgICAgeyB0aGlzLmdldEhpZXJhcmNoeVNlbGVjdG9yKCkgfVxuICAgICAgICAgIHsgdGhpcy5zdGF0ZS5pc1BvcG92ZXJWaXNpYmxlID8gdGhpcy5nZXRQb3BvdmVyKCkgOiBudWxsIH1cbiAgICAgICAgICB7IHRoaXMuc3RhdGUuaXNWaWV3VmlzaWJsZSA/IHRoaXMuZ2V0VmlldygpIDogbnVsbCB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWxpc3Qtd3JhcHBlclwiPlxuICAgICAgICA8T3ZlcmxheVRyaWdnZXJcbiAgICAgICAgICBkZWxheT17VE9PTFRJUF9ERUxBWV9NU31cbiAgICAgICAgICBwbGFjZW1lbnQ9e3RoaXMucHJvcHMudG9vbHRpcFBsYWNlbWVudH1cbiAgICAgICAgICBvdmVybGF5PXt0aGlzLmdldFRvb2xUaXAodGhpcy5nZXREZWZhdWx0VG9vbFRpcENvbnRlbnQoKSl9XG4gICAgICAgID5cbiAgICAgICAgICB7IHRoaXMuZ2V0SGllcmFyY2h5U2VsZWN0b3IoKSB9XG4gICAgICAgIDwvT3ZlcmxheVRyaWdnZXI+XG4gICAgICAgIHsgdGhpcy5zdGF0ZS5pc1BvcG92ZXJWaXNpYmxlID8gdGhpcy5nZXRQb3BvdmVyKCkgOiBudWxsIH1cbiAgICAgICAgeyB0aGlzLnN0YXRlLmlzVmlld1Zpc2libGUgPyB0aGlzLmdldFZpZXcoKSA6IG51bGwgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5IaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94LnByb3BUeXBlcyA9IHtcbiAgZGF0YVNvdXJjZVByb3ZpZGVyOiBkYXRhU291cmNlUHJvdmlkZXJUeXBlLmlzUmVxdWlyZWQsXG4gIGhpZGVPblBvcG92ZXJCbHVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgaW5wdXROYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBub1NlbGVjdGlvblRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHBvcG92ZXJWaXNpYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgcG9wb3Zlck9wdGlvbnM6IHBvcG92ZXJPcHRpb25zVHlwZS5pc1JlcXVpcmVkLFxuICBwcmVDaGVja2VkSXRlbXM6IHByZUNoZWNrZWRJdGVtc0xpc3RTaGFwZSxcbiAgcHJlQ2hlY2tlZEdyb3VwTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgdG9vbHRpcFBsYWNlbWVudDogUHJvcFR5cGVzLnN0cmluZyxcbiAgdmlld09wdGlvbnM6IHZpZXdPcHRpb25zVHlwZS5pc1JlcXVpcmVkLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uSGVscDogUHJvcFR5cGVzLmZ1bmMsXG4gIHRvb2x0aXBJdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICBpc0NsZWFyYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gIGlzQnVzeTogUHJvcFR5cGVzLmJvb2wsXG59O1xuXG5IaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94LmRlZmF1bHRQcm9wcyA9IHtcbiAgaGlkZU9uUG9wb3ZlckJsdXI6IHRydWUsXG4gIGlucHV0TmFtZTogJycsXG4gIG5vU2VsZWN0aW9uVGV4dDogJ05vdGhpbmcgc2VsZWN0ZWQuLi4nLFxuICBwb3BvdmVyVmlzaWJsZTogZmFsc2UsXG4gIHByZUNoZWNrZWRJdGVtczogbnVsbCxcbiAgcHJlQ2hlY2tlZEdyb3VwTmFtZTogJ0RlZmF1bHQgZ3JvdXAnLFxuICB0b29sdGlwUGxhY2VtZW50OiAnYm90dG9tJyxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBvbkhlbHA6ICgpID0+IHt9LFxuICB0b29sdGlwSXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxuICBpc0NsZWFyYWJsZTogZmFsc2UsXG4gIGlzQnVzeTogZmFsc2UsXG59O1xuIl19