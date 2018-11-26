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

    return _react2.default.createElement(_view2.default, _extends({
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
  noSelectionText: 'No one selected...',
  popoverVisible: false,
  preCheckedItems: null,
  preCheckedGroupName: 'Default group',
  tooltipPlacement: 'bottom',
  onSelect: function onSelect() {},
  onHelp: function onHelp() {},
  tooltipItemRenderFunction: null
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbWJvLWJveC9jb21iby1ib3guY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJIaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94IiwicHJvcHMiLCJpc0RhdGFMb2FkZWQiLCJkYXRhU291cmNlUHJvdmlkZXIiLCJpc0xvYWRlZCIsIm5lZWRUb1VwZGF0ZVByZUNoZWNrZWQiLCJwcmVDaGVja2VkSXRlbXMiLCJsZW5ndGgiLCJuZWVkVG9Mb2FkRGF0YSIsInN0YXRlIiwic2VsZWN0ZWQiLCJpc1BvcG92ZXJWaXNpYmxlIiwicG9wb3ZlclZpc2libGUiLCJpc1ZpZXdWaXNpYmxlIiwiY29tcG9uZW50V2lsbE1vdW50IiwibG9hZERhdGEiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwic2V0U3RhdGUiLCJjb21wb25lbnRXaWxsVXBkYXRlIiwibmV4dFN0YXRlIiwidXBkYXRlUHJlY2hlY2tlZCIsInJlbmRlciIsImlucHV0TmFtZSIsImlucHV0T3B0aW9ucyIsIm9uRm9jdXMiLCJvbklucHV0Rm9jdXMiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJub1NlbGVjdGlvblRleHQiLCJyZWFkT25seSIsInJlZiIsImlucHV0IiwiaW5wdXRFbGVtZW50IiwidmFsdWUiLCJnZXRJbnB1dFRleHQiLCJ0cmltIiwibmFtZSIsIlRPT0xUSVBfREVMQVlfTVMiLCJ0b29sdGlwUGxhY2VtZW50IiwiZ2V0VG9vbFRpcCIsImdldERlZmF1bHRUb29sVGlwQ29udGVudCIsImdldENvdW50T2ZTZWxlY3RlZEl0ZW1zIiwib25DbGlja0hhbmRsZXIiLCJnZXRQb3BvdmVyIiwiZ2V0VmlldyIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsInNldFBvcG92ZXJWaXNpYmlsaXR5IiwiYmx1ciIsIm9uU2VsZWN0SGFuZGxlciIsImdyb3VwTmFtZSIsInNlbGVjdGVkSXRlbSIsImNoZWNrZWRPdXRwdXQiLCJpdGVtcyIsIm1hcCIsIk9iamVjdCIsImFzc2lnbiIsIml0ZW0iLCJvblNlbGVjdCIsIm9uUG9wb3ZlckJsdXIiLCJoaWRlT25Qb3BvdmVyQmx1ciIsInBvcG92ZXJTaG91bGRCZUhpZGRlbiIsIm9uU2hvdWxkT3BlblZpZXciLCJvblNob3VsZENsb3NlUG9wb3ZlciIsIm9uQ2FuY2VsZWRWaWV3Iiwib25TZWxlY3RlZEluVmlldyIsInNlbGVjdGVkSXRlbXMiLCJvblNlbGVjdGVkSW5Qb3BvdmVyIiwidW5jaGVja0FsbEl0ZW1zIiwiQXJyYXkiLCJpc0FycmF5Iiwic2VsZWN0aW9uVGV4dCIsIm9wdGlvbnMiLCJ2aWV3T3B0aW9ucyIsInNsaWNlIiwib25IZWxwIiwicG9wb3Zlck9wdGlvbnMiLCJjb250ZW50IiwiaXNTZWxlY3RlZEl0ZW1zIiwidG90YWxDb3VudCIsImNvdW50IiwiTUFYX0NPVU5UX09GX1RPT0xUSVBfSVRFTVMiLCJlbGVtZW50cyIsImtleXMiLCJ0b29sdGlwSXRlbVJlbmRlckZ1bmN0aW9uIiwiaSIsImRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24iLCJwdXNoIiwiaXNWaXNpYmxlIiwia2V5IiwidGhlbiIsInNldFRpbWVvdXQiLCJwcmVDaGVja2VkR3JvdXBOYW1lIiwic2V0UHJlY2hlY2tlZEl0ZW1zIiwiZ2V0Q2hlY2tlZE91dHB1dCIsImdldEFsbENoZWNrZWRJdGVtcyIsImNoZWNrZWQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7cUNBQUE7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFHQTs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEseUI7OztBQUNuQixxQ0FBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQTs7QUFHakIsUUFBTUMsZUFBZUQsTUFBTUUsa0JBQU4sQ0FBeUJDLFFBQTlDO0FBQ0EsUUFBTUMseUJBQXlCSixN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QTFCLEdBQXlDO0FBQ3ZDckMscUJBQW1CLElBRG9CO0FBRXZDdEMsYUFBVyxFQUY0QjtBQUd2Q00sbUJBQWlCLG9CQUhzQjtBQUl2Q2pCLGtCQUFnQixLQUp1QjtBQUt2Q04sbUJBQWlCLElBTHNCO0FBTXZDdUYsdUJBQXFCLGVBTmtCO0FBT3ZDdEQsb0JBQWtCLFFBUHFCO0FBUXZDb0IsWUFBVSxvQkFBTSxDQUFFLENBUnFCO0FBU3ZDaUIsVUFBUSxrQkFBTSxDQUFFLENBVHVCO0FBVXZDUyw2QkFBMkI7QUFWWSxDQUF6QyIsImZpbGUiOiJjb21iby1ib3guY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tdW51c2VkLXN0YXRlICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBUb29sdGlwLCBPdmVybGF5VHJpZ2dlciB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEZhQ2hldnJvbkRvd24gZnJvbSAncmVhY3QtaWNvbnMvbGliL2ZhL2NoZXZyb24tZG93bic7XG5pbXBvcnQgeyBkYXRhU291cmNlUHJvdmlkZXJUeXBlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdHlwZXMnO1xuaW1wb3J0IHsgcHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlLCBwb3BvdmVyT3B0aW9uc1R5cGUsIHZpZXdPcHRpb25zVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCBTcGlubmVyIGZyb20gJy4uL3NwaW5uZXInO1xuaW1wb3J0IEhTUG9wb3ZlciBmcm9tICcuLi9wb3BvdmVyJztcbmltcG9ydCBIU1ZpZXcgZnJvbSAnLi4vdmlldyc7XG5pbXBvcnQgSFNCYWRnZSBmcm9tICcuLi9iYWRnZSc7XG5cblxuaW1wb3J0IHsgVE9PTFRJUF9ERUxBWV9NUywgTUFYX0NPVU5UX09GX1RPT0xUSVBfSVRFTVMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgJy4vY29tYm8tYm94LnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgY29uc3QgaXNEYXRhTG9hZGVkID0gcHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzTG9hZGVkO1xuICAgIGNvbnN0IG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQgPSBwcm9wcy5wcmVDaGVja2VkSXRlbXMgJiYgcHJvcHMucHJlQ2hlY2tlZEl0ZW1zLmxlbmd0aDtcbiAgICBjb25zdCBuZWVkVG9Mb2FkRGF0YSA9ICFpc0RhdGFMb2FkZWQgJiYgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZDtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBuZWVkVG9Mb2FkRGF0YSxcbiAgICAgIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQsXG4gICAgICBwcmVDaGVja2VkSXRlbXM6IHByb3BzLnByZUNoZWNrZWRJdGVtcyxcbiAgICAgIHNlbGVjdGVkOiBudWxsLFxuICAgICAgaXNQb3BvdmVyVmlzaWJsZTogcHJvcHMucG9wb3ZlclZpc2libGUsXG4gICAgICBpc1ZpZXdWaXNpYmxlOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGNvbnN0IHsgbmVlZFRvTG9hZERhdGEgfSA9IHRoaXMuc3RhdGU7XG4gICAgaWYgKG5lZWRUb0xvYWREYXRhKSB7XG4gICAgICB0aGlzLmxvYWREYXRhKHRoaXMucHJvcHMpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgY29uc3QgeyBkYXRhU291cmNlUHJvdmlkZXIsIHByZUNoZWNrZWRJdGVtcyB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChkYXRhU291cmNlUHJvdmlkZXIgIT09IG5leHRQcm9wcy5kYXRhU291cmNlUHJvdmlkZXIpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBuZWVkVG9Mb2FkRGF0YTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChwcmVDaGVja2VkSXRlbXMgIT09IG5leHRQcm9wcy5wcmVDaGVja2VkSXRlbXMpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBuZWVkVG9VcGRhdGVQcmVDaGVja2VkOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgIGNvbnN0IHsgbmVlZFRvTG9hZERhdGEsIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQgfSA9IG5leHRTdGF0ZTtcbiAgICBpZiAobmVlZFRvTG9hZERhdGEpIHtcbiAgICAgIHRoaXMubG9hZERhdGEobmV4dFByb3BzKTtcbiAgICB9IGVsc2UgaWYgKG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQpIHtcbiAgICAgIHRoaXMudXBkYXRlUHJlY2hlY2tlZChuZXh0UHJvcHMpO1xuICAgIH1cbiAgfVxuXG4gIG9uQ2xpY2tIYW5kbGVyID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0UG9wb3ZlclZpc2liaWxpdHkoIXRoaXMuc3RhdGUuaXNQb3BvdmVyVmlzaWJsZSk7XG4gIH1cblxuICBvbklucHV0Rm9jdXMgPSAoKSA9PiB7XG4gICAgdGhpcy5pbnB1dEVsZW1lbnQuYmx1cigpO1xuICB9XG5cbiAgb25TZWxlY3RIYW5kbGVyID0gKGdyb3VwTmFtZSwgc2VsZWN0ZWRJdGVtLCBjaGVja2VkT3V0cHV0KSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZDogc2VsZWN0ZWRJdGVtLFxuICAgICAgaXNQb3BvdmVyVmlzaWJsZTogZmFsc2UsXG4gICAgICBpc1ZpZXdWaXNpYmxlOiBmYWxzZSxcbiAgICB9KTtcbiAgICBjb25zdCBpdGVtcyA9IGNoZWNrZWRPdXRwdXQgPyBjaGVja2VkT3V0cHV0Lm1hcChpdGVtID0+IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pKSA6IFtdO1xuXG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChpdGVtcywgZ3JvdXBOYW1lKTtcbiAgfVxuXG4gIG9uUG9wb3ZlckJsdXIgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuaGlkZU9uUG9wb3ZlckJsdXIpIHtcbiAgICAgIHRoaXMucG9wb3ZlclNob3VsZEJlSGlkZGVuKCk7XG4gICAgfVxuICB9XG5cbiAgb25TaG91bGRPcGVuVmlldyA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgaXNWaWV3VmlzaWJsZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIG9uU2hvdWxkQ2xvc2VQb3BvdmVyID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaXNQb3BvdmVyVmlzaWJsZTogZmFsc2UsXG4gICAgfSk7XG4gIH1cblxuICBvbkNhbmNlbGVkVmlldyA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlzUG9wb3ZlclZpc2libGU6IGZhbHNlLFxuICAgICAgaXNWaWV3VmlzaWJsZTogZmFsc2UsXG4gICAgfSk7XG4gIH1cblxuICBvblNlbGVjdGVkSW5WaWV3ID0gKGdyb3VwTmFtZSwgc2VsZWN0ZWRJdGVtcywgY2hlY2tlZE91dHB1dCkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IHtcbiAgICAgIG5hbWU6IGdyb3VwTmFtZSxcbiAgICAgIGl0ZW1zOiBzZWxlY3RlZEl0ZW1zLFxuICAgIH07XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwcmVDaGVja2VkSXRlbXM6IGNoZWNrZWRPdXRwdXQsXG4gICAgfSk7XG4gICAgdGhpcy5vblNlbGVjdEhhbmRsZXIoZ3JvdXBOYW1lLCBzZWxlY3RlZEl0ZW0sIGNoZWNrZWRPdXRwdXQpO1xuICB9XG5cbiAgb25TZWxlY3RlZEluUG9wb3ZlciA9IChzZWxlY3RlZEl0ZW0pID0+IHtcbiAgICB0aGlzLnVuY2hlY2tBbGxJdGVtcygpO1xuICAgIGNvbnN0IGNoZWNrZWRPdXRwdXQgPSBzZWxlY3RlZEl0ZW0gJiYgQXJyYXkuaXNBcnJheShzZWxlY3RlZEl0ZW0uaXRlbXMpID9cbiAgICAgIHNlbGVjdGVkSXRlbS5pdGVtcyA6IFtdO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcHJlQ2hlY2tlZEl0ZW1zOiBjaGVja2VkT3V0cHV0LFxuICAgIH0pO1xuICAgIHRoaXMub25TZWxlY3RIYW5kbGVyKHNlbGVjdGVkSXRlbS5uYW1lLCBzZWxlY3RlZEl0ZW0sIGNoZWNrZWRPdXRwdXQpO1xuICB9XG5cbiAgZ2V0SW5wdXRUZXh0ID0gKCkgPT4ge1xuICAgIGxldCBzZWxlY3Rpb25UZXh0ID0gJyc7XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3RlZCAmJiB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zICYmIHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgc2VsZWN0aW9uVGV4dCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWQubmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGlvblRleHQ7XG4gIH1cblxuICBnZXRWaWV3ID0gKCkgPT4ge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLnByb3BzLnZpZXdPcHRpb25zO1xuICAgIGNvbnN0IHByZUNoZWNrZWRJdGVtcyA9IEFycmF5LmlzQXJyYXkodGhpcy5zdGF0ZS5wcmVDaGVja2VkSXRlbXMpID9cbiAgICAgIHRoaXMuc3RhdGUucHJlQ2hlY2tlZEl0ZW1zLnNsaWNlKCkgOiBudWxsO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxIU1ZpZXdcbiAgICAgICAgZGF0YVNvdXJjZVByb3ZpZGVyPXt0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlcn1cbiAgICAgICAgey4uLm9wdGlvbnN9XG4gICAgICAgIG9uQ2FuY2VsPXt0aGlzLm9uQ2FuY2VsZWRWaWV3fVxuICAgICAgICBvblNlbGVjdD17dGhpcy5vblNlbGVjdGVkSW5WaWV3fVxuICAgICAgICBvbkhlbHA9e3RoaXMucHJvcHMub25IZWxwfVxuICAgICAgICBncm91cE5hbWU9e3RoaXMuc3RhdGUuc2VsZWN0ZWQgPyB0aGlzLnN0YXRlLnNlbGVjdGVkLm5hbWUgOiAnJ31cbiAgICAgICAgcHJlQ2hlY2tlZEl0ZW1zPXtwcmVDaGVja2VkSXRlbXN9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICBnZXRQb3BvdmVyID0gKCkgPT4ge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLnByb3BzLnBvcG92ZXJPcHRpb25zO1xuXG4gICAgcmV0dXJuICg8SFNQb3BvdmVyXG4gICAgICBkYXRhU291cmNlUHJvdmlkZXI9e3RoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyfVxuICAgICAgb25Db21wb25lbnRCbHVyPXt0aGlzLm9uUG9wb3ZlckJsdXJ9XG4gICAgICBvblNlbGVjdD17dGhpcy5vblNlbGVjdGVkSW5Qb3BvdmVyfVxuICAgICAgb25TaG91bGRPcGVuVmlldz17dGhpcy5vblNob3VsZE9wZW5WaWV3fVxuICAgICAgb25TaG91bGRDbG9zZVBvcG92ZXI9e3RoaXMub25TaG91bGRDbG9zZVBvcG92ZXJ9XG4gICAgICB7Li4ub3B0aW9uc31cbiAgICAvPik7XG4gIH1cblxuICBnZXRUb29sVGlwID0gY29udGVudCA9PiA8VG9vbHRpcCBpZD1cInRvb2x0aXBcIiBjbGFzc05hbWU9XCJocy1jb21iby1ib3gtdG9vbHRpcFwiPntjb250ZW50fTwvVG9vbHRpcD47XG5cbiAgZ2V0RGVmYXVsdFRvb2xUaXBDb250ZW50ID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5pc1NlbGVjdGVkSXRlbXMoKSkgcmV0dXJuIHRoaXMucHJvcHMubm9TZWxlY3Rpb25UZXh0O1xuICAgIGNvbnN0IHRvdGFsQ291bnQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLmxlbmd0aDtcbiAgICBjb25zdCBjb3VudCA9IHRvdGFsQ291bnQgPiBNQVhfQ09VTlRfT0ZfVE9PTFRJUF9JVEVNUyA/IE1BWF9DT1VOVF9PRl9UT09MVElQX0lURU1TIDogdG90YWxDb3VudDtcblxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5zbGljZSgwLCBjb3VudCk7XG4gICAgY29uc3QgZWxlbWVudHMgPSBPYmplY3Qua2V5cyhpdGVtcykubWFwKGkgPT4gKHRoaXMucHJvcHMudG9vbHRpcEl0ZW1SZW5kZXJGdW5jdGlvbiA/XG4gICAgICB0aGlzLnByb3BzLnRvb2x0aXBJdGVtUmVuZGVyRnVuY3Rpb24oaXRlbXNbaV0sIGksIHRoaXMuZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbikgOlxuICAgICAgdGhpcy5kZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uKGl0ZW1zW2ldLCBpKSkpO1xuICAgIGlmIChjb3VudCA8IHRvdGFsQ291bnQpIGVsZW1lbnRzLnB1c2goPHAga2V5PXtjb3VudH0+LiAuIC48L3A+KTtcblxuICAgIHJldHVybiBlbGVtZW50cztcbiAgfVxuXG4gIGdldENvdW50T2ZTZWxlY3RlZEl0ZW1zID0gKCkgPT4gKHRoaXMuaXNTZWxlY3RlZEl0ZW1zKCkgPyB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLmxlbmd0aCA6IDApO1xuXG4gIHNldFBvcG92ZXJWaXNpYmlsaXR5ID0gKGlzVmlzaWJsZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBpc1BvcG92ZXJWaXNpYmxlOiBpc1Zpc2libGUgfSk7XG4gIH1cblxuICBkZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uID0gKGl0ZW0sIGtleSkgPT4gKDxwIGtleT17a2V5fT57aXRlbS5uYW1lfTwvcD4pO1xuXG4gIGlzU2VsZWN0ZWRJdGVtcyA9ICgpID0+IChcbiAgICB0aGlzLnN0YXRlLnNlbGVjdGVkICYmIHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMgJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5sZW5ndGggPiAwXG4gICk7XG5cbiAgbG9hZERhdGEgPSAocHJvcHMpID0+IHtcbiAgICBwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIubG9hZERhdGEoKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBuZWVkVG9Mb2FkRGF0YTogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHBvcG92ZXJTaG91bGRCZUhpZGRlbiA9ICgpID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLnN0YXRlLmlzUG9wb3ZlclZpc2libGUpIHRoaXMuc2V0UG9wb3ZlclZpc2liaWxpdHkoZmFsc2UpO1xuICAgIH0sIDE1MCk7XG4gIH1cblxuICB1bmNoZWNrQWxsSXRlbXMgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwcmVDaGVja2VkSXRlbXM6IFtdLFxuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlUHJlY2hlY2tlZCA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgZGF0YVNvdXJjZVByb3ZpZGVyLCBwcmVDaGVja2VkR3JvdXBOYW1lLCBwcmVDaGVja2VkSXRlbXMgfSA9IHByb3BzO1xuXG4gICAgZGF0YVNvdXJjZVByb3ZpZGVyLnNldFByZWNoZWNrZWRJdGVtcyhwcmVDaGVja2VkSXRlbXMpO1xuXG4gICAgY29uc3QgY2hlY2tlZE91dHB1dCA9IGRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkT3V0cHV0KCk7XG4gICAgY29uc3Qgc2VsZWN0ZWRJdGVtcyA9IGRhdGFTb3VyY2VQcm92aWRlci5nZXRBbGxDaGVja2VkSXRlbXMoKTtcbiAgICBjb25zdCBjaGVja2VkID0gY2hlY2tlZE91dHB1dC5jaGVja2VkIHx8IFtdO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBuZWVkVG9VcGRhdGVQcmVDaGVja2VkOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRoaXMub25TZWxlY3RlZEluVmlldyhwcmVDaGVja2VkR3JvdXBOYW1lLCBzZWxlY3RlZEl0ZW1zLCBjaGVja2VkKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGlucHV0TmFtZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpbnB1dE9wdGlvbnMgPSB7XG4gICAgICBvbkZvY3VzOiB0aGlzLm9uSW5wdXRGb2N1cyxcbiAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnByb3BzLm5vU2VsZWN0aW9uVGV4dCxcbiAgICAgIHJlYWRPbmx5OiB0cnVlLFxuICAgICAgcmVmOiAoaW5wdXQpID0+IHsgdGhpcy5pbnB1dEVsZW1lbnQgPSBpbnB1dDsgfSxcbiAgICAgIHZhbHVlOiB0aGlzLmdldElucHV0VGV4dCgpLFxuICAgIH07XG5cbiAgICBpZiAoaW5wdXROYW1lLnRyaW0oKSAhPT0gJycpIHtcbiAgICAgIGlucHV0T3B0aW9ucy5uYW1lID0gaW5wdXROYW1lO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1saXN0LXdyYXBwZXJcIj5cbiAgICAgICAgPE92ZXJsYXlUcmlnZ2VyXG4gICAgICAgICAgZGVsYXk9e1RPT0xUSVBfREVMQVlfTVN9XG4gICAgICAgICAgcGxhY2VtZW50PXt0aGlzLnByb3BzLnRvb2x0aXBQbGFjZW1lbnR9XG4gICAgICAgICAgb3ZlcmxheT17dGhpcy5nZXRUb29sVGlwKHRoaXMuZ2V0RGVmYXVsdFRvb2xUaXBDb250ZW50KCkpfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItbGlzdFwiPlxuICAgICAgICAgICAgPGlucHV0IHsuLi5pbnB1dE9wdGlvbnN9IC8+XG4gICAgICAgICAgICB7dGhpcy5zdGF0ZS5uZWVkVG9Mb2FkRGF0YSA/XG4gICAgICAgICAgICAgIDxTcGlubmVyIC8+IDpcbiAgICAgICAgICAgICAgPEhTQmFkZ2UgY2xhc3NOYW1lPVwiYmFkZ2Utb3JhbmdlXCI+e3RoaXMuZ2V0Q291bnRPZlNlbGVjdGVkSXRlbXMoKX08L0hTQmFkZ2U+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkaXNhYmxlZD17dGhpcy5zdGF0ZS5uZWVkVG9Mb2FkRGF0YX0gY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWxpc3QtYnRuXCIgb25DbGljaz17dGhpcy5vbkNsaWNrSGFuZGxlcn0+PEZhQ2hldnJvbkRvd24gLz48L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9PdmVybGF5VHJpZ2dlcj5cbiAgICAgICAgeyB0aGlzLnN0YXRlLmlzUG9wb3ZlclZpc2libGUgPyB0aGlzLmdldFBvcG92ZXIoKSA6IG51bGwgfVxuICAgICAgICB7IHRoaXMuc3RhdGUuaXNWaWV3VmlzaWJsZSA/IHRoaXMuZ2V0VmlldygpIDogbnVsbCB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkhpZXJhcmNoeVNlbGVjdG9yQ29tYm9Cb3gucHJvcFR5cGVzID0ge1xuICBkYXRhU291cmNlUHJvdmlkZXI6IGRhdGFTb3VyY2VQcm92aWRlclR5cGUuaXNSZXF1aXJlZCxcbiAgaGlkZU9uUG9wb3ZlckJsdXI6IFByb3BUeXBlcy5ib29sLFxuICBpbnB1dE5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIG5vU2VsZWN0aW9uVGV4dDogUHJvcFR5cGVzLnN0cmluZyxcbiAgcG9wb3ZlclZpc2libGU6IFByb3BUeXBlcy5ib29sLFxuICBwb3BvdmVyT3B0aW9uczogcG9wb3Zlck9wdGlvbnNUeXBlLmlzUmVxdWlyZWQsXG4gIHByZUNoZWNrZWRJdGVtczogcHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlLFxuICBwcmVDaGVja2VkR3JvdXBOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICB0b29sdGlwUGxhY2VtZW50OiBQcm9wVHlwZXMuc3RyaW5nLFxuICB2aWV3T3B0aW9uczogdmlld09wdGlvbnNUeXBlLmlzUmVxdWlyZWQsXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgb25IZWxwOiBQcm9wVHlwZXMuZnVuYyxcbiAgdG9vbHRpcEl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5IaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94LmRlZmF1bHRQcm9wcyA9IHtcbiAgaGlkZU9uUG9wb3ZlckJsdXI6IHRydWUsXG4gIGlucHV0TmFtZTogJycsXG4gIG5vU2VsZWN0aW9uVGV4dDogJ05vIG9uZSBzZWxlY3RlZC4uLicsXG4gIHBvcG92ZXJWaXNpYmxlOiBmYWxzZSxcbiAgcHJlQ2hlY2tlZEl0ZW1zOiBudWxsLFxuICBwcmVDaGVja2VkR3JvdXBOYW1lOiAnRGVmYXVsdCBncm91cCcsXG4gIHRvb2x0aXBQbGFjZW1lbnQ6ICdib3R0b20nLFxuICBvblNlbGVjdDogKCkgPT4ge30sXG4gIG9uSGVscDogKCkgPT4ge30sXG4gIHRvb2x0aXBJdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXG59O1xuIl19