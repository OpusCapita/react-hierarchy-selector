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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbWJvLWJveC9jb21iby1ib3guY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJIaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94IiwicHJvcHMiLCJpc0RhdGFMb2FkZWQiLCJkYXRhU291cmNlUHJvdmlkZXIiLCJpc0xvYWRlZCIsIm5lZWRUb1VwZGF0ZVByZUNoZWNrZWQiLCJwcmVDaGVja2VkSXRlbXMiLCJsZW5ndGgiLCJuZWVkVG9Mb2FkRGF0YSIsInN0YXRlIiwic2VsZWN0ZWQiLCJpc1BvcG92ZXJWaXNpYmxlIiwicG9wb3ZlclZpc2libGUiLCJpc1ZpZXdWaXNpYmxlIiwiY29tcG9uZW50V2lsbE1vdW50IiwibG9hZERhdGEiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwic2V0U3RhdGUiLCJjb21wb25lbnRXaWxsVXBkYXRlIiwibmV4dFN0YXRlIiwidXBkYXRlUHJlY2hlY2tlZCIsInJlbmRlciIsImlucHV0TmFtZSIsImlucHV0T3B0aW9ucyIsIm9uRm9jdXMiLCJvbklucHV0Rm9jdXMiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJub1NlbGVjdGlvblRleHQiLCJyZWFkT25seSIsInJlZiIsImlucHV0IiwiaW5wdXRFbGVtZW50IiwidmFsdWUiLCJnZXRJbnB1dFRleHQiLCJ0cmltIiwibmFtZSIsInRvb2x0aXBQbGFjZW1lbnQiLCJnZXRUb29sVGlwIiwiZ2V0RGVmYXVsdFRvb2xUaXBDb250ZW50IiwiZ2V0Q291bnRPZlNlbGVjdGVkSXRlbXMiLCJvbkNsaWNrSGFuZGxlciIsImdldFBvcG92ZXIiLCJnZXRWaWV3IiwiUHVyZUNvbXBvbmVudCIsInNldFBvcG92ZXJWaXNpYmlsaXR5IiwiYmx1ciIsIm9uU2VsZWN0SGFuZGxlciIsImdyb3VwTmFtZSIsInNlbGVjdGVkSXRlbSIsImNoZWNrZWRPdXRwdXQiLCJpdGVtcyIsIm1hcCIsIk9iamVjdCIsImFzc2lnbiIsIml0ZW0iLCJvblNlbGVjdCIsIm9uUG9wb3ZlckJsdXIiLCJoaWRlT25Qb3BvdmVyQmx1ciIsInBvcG92ZXJTaG91bGRCZUhpZGRlbiIsIm9uU2hvdWxkT3BlblZpZXciLCJvblNob3VsZENsb3NlUG9wb3ZlciIsIm9uQ2FuY2VsZWRWaWV3Iiwib25TZWxlY3RlZEluVmlldyIsInNlbGVjdGVkSXRlbXMiLCJvblNlbGVjdGVkSW5Qb3BvdmVyIiwidW5jaGVja0FsbEl0ZW1zIiwiQXJyYXkiLCJpc0FycmF5Iiwic2VsZWN0aW9uVGV4dCIsIm9wdGlvbnMiLCJ2aWV3T3B0aW9ucyIsInNsaWNlIiwib25IZWxwIiwicG9wb3Zlck9wdGlvbnMiLCJjb250ZW50IiwiaXNTZWxlY3RlZEl0ZW1zIiwidG90YWxDb3VudCIsImNvdW50IiwiZWxlbWVudHMiLCJrZXlzIiwidG9vbHRpcEl0ZW1SZW5kZXJGdW5jdGlvbiIsImkiLCJkZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uIiwicHVzaCIsImlzVmlzaWJsZSIsImtleSIsInRoZW4iLCJzZXRUaW1lb3V0IiwicHJlQ2hlY2tlZEdyb3VwTmFtZSIsInNldFByZWNoZWNrZWRJdGVtcyIsImdldENoZWNrZWRPdXRwdXQiLCJnZXRBbGxDaGVja2VkSXRlbXMiLCJjaGVja2VkIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O3FDQUFBOztBQUVBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBR0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLHlCOzs7QUFDbkIscUNBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsZ0NBQU1BLEtBQU4sQ0FEaUI7O0FBQUE7O0FBR2pCLFFBQU1DLGVBQWVELE1BQU1FLGtCQUFOLENBQXlCQyxRQUE5QztBQUNBLFFBQU1DLHlCQUF5QkosTUFBTUssZUFBTixJQUF5QkwsTUFBTUssZUFBTixDQUFzQkMsTUFBOUU7QUFDQSxRQUFNQyxpQkFB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QUFRdkNtQixZQUFVLG9CQUFNLENBQUUsQ0FScUI7QUFTdkNpQixVQUFRLGtCQUFNLENBQUUsQ0FUdUI7QUFVdkNRLDZCQUEyQjtBQVZZLENBQXpDIiwiZmlsZSI6ImNvbWJvLWJveC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby11bnVzZWQtc3RhdGUgKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFRvb2x0aXAsIE92ZXJsYXlUcmlnZ2VyIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IEZhQ2hldnJvbkRvd24gZnJvbSAncmVhY3QtaWNvbnMvbGliL2ZhL2NoZXZyb24tZG93bic7XHJcbmltcG9ydCB7IGRhdGFTb3VyY2VQcm92aWRlclR5cGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90eXBlcyc7XHJcbmltcG9ydCB7IHByZUNoZWNrZWRJdGVtc0xpc3RTaGFwZSwgcG9wb3Zlck9wdGlvbnNUeXBlLCB2aWV3T3B0aW9uc1R5cGUgfSBmcm9tICcuLi8uLi90eXBlcyc7XHJcbmltcG9ydCBTcGlubmVyIGZyb20gJy4uL3NwaW5uZXInO1xyXG5pbXBvcnQgSFNQb3BvdmVyIGZyb20gJy4uL3BvcG92ZXInO1xyXG5pbXBvcnQgSFNWaWV3IGZyb20gJy4uL3ZpZXcnO1xyXG5pbXBvcnQgSFNCYWRnZSBmcm9tICcuLi9iYWRnZSc7XHJcblxyXG5cclxuaW1wb3J0IHsgVE9PTFRJUF9ERUxBWV9NUywgTUFYX0NPVU5UX09GX1RPT0xUSVBfSVRFTVMgfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmltcG9ydCAnLi9jb21iby1ib3guc2Nzcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuXHJcbiAgICBjb25zdCBpc0RhdGFMb2FkZWQgPSBwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuaXNMb2FkZWQ7XHJcbiAgICBjb25zdCBuZWVkVG9VcGRhdGVQcmVDaGVja2VkID0gcHJvcHMucHJlQ2hlY2tlZEl0ZW1zICYmIHByb3BzLnByZUNoZWNrZWRJdGVtcy5sZW5ndGg7XHJcbiAgICBjb25zdCBuZWVkVG9Mb2FkRGF0YSA9ICFpc0RhdGFMb2FkZWQgJiYgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZDtcclxuXHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBuZWVkVG9Mb2FkRGF0YSxcclxuICAgICAgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZCxcclxuICAgICAgcHJlQ2hlY2tlZEl0ZW1zOiBwcm9wcy5wcmVDaGVja2VkSXRlbXMsXHJcbiAgICAgIHNlbGVjdGVkOiBudWxsLFxyXG4gICAgICBpc1BvcG92ZXJWaXNpYmxlOiBwcm9wcy5wb3BvdmVyVmlzaWJsZSxcclxuICAgICAgaXNWaWV3VmlzaWJsZTogZmFsc2UsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgY29uc3QgeyBuZWVkVG9Mb2FkRGF0YSB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIGlmIChuZWVkVG9Mb2FkRGF0YSkge1xyXG4gICAgICB0aGlzLmxvYWREYXRhKHRoaXMucHJvcHMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgIGNvbnN0IHsgZGF0YVNvdXJjZVByb3ZpZGVyLCBwcmVDaGVja2VkSXRlbXMgfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgaWYgKGRhdGFTb3VyY2VQcm92aWRlciAhPT0gbmV4dFByb3BzLmRhdGFTb3VyY2VQcm92aWRlcikge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICBuZWVkVG9Mb2FkRGF0YTogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByZUNoZWNrZWRJdGVtcyAhPT0gbmV4dFByb3BzLnByZUNoZWNrZWRJdGVtcykge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICBuZWVkVG9VcGRhdGVQcmVDaGVja2VkOiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbXBvbmVudFdpbGxVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgIGNvbnN0IHsgbmVlZFRvTG9hZERhdGEsIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQgfSA9IG5leHRTdGF0ZTtcclxuICAgIGlmIChuZWVkVG9Mb2FkRGF0YSkge1xyXG4gICAgICB0aGlzLmxvYWREYXRhKG5leHRQcm9wcyk7XHJcbiAgICB9IGVsc2UgaWYgKG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQpIHtcclxuICAgICAgdGhpcy51cGRhdGVQcmVjaGVja2VkKG5leHRQcm9wcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkNsaWNrSGFuZGxlciA9ICgpID0+IHtcclxuICAgIHRoaXMuc2V0UG9wb3ZlclZpc2liaWxpdHkoIXRoaXMuc3RhdGUuaXNQb3BvdmVyVmlzaWJsZSk7XHJcbiAgfVxyXG5cclxuICBvbklucHV0Rm9jdXMgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmlucHV0RWxlbWVudC5ibHVyKCk7XHJcbiAgfVxyXG5cclxuICBvblNlbGVjdEhhbmRsZXIgPSAoZ3JvdXBOYW1lLCBzZWxlY3RlZEl0ZW0sIGNoZWNrZWRPdXRwdXQpID0+IHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBzZWxlY3RlZDogc2VsZWN0ZWRJdGVtLFxyXG4gICAgICBpc1BvcG92ZXJWaXNpYmxlOiBmYWxzZSxcclxuICAgICAgaXNWaWV3VmlzaWJsZTogZmFsc2UsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGl0ZW1zID0gY2hlY2tlZE91dHB1dCA/IGNoZWNrZWRPdXRwdXQubWFwKGl0ZW0gPT4gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSkpIDogW107XHJcblxyXG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChpdGVtcywgZ3JvdXBOYW1lKTtcclxuICB9XHJcblxyXG4gIG9uUG9wb3ZlckJsdXIgPSAoKSA9PiB7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5oaWRlT25Qb3BvdmVyQmx1cikge1xyXG4gICAgICB0aGlzLnBvcG92ZXJTaG91bGRCZUhpZGRlbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25TaG91bGRPcGVuVmlldyA9ICgpID0+IHtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBpc1ZpZXdWaXNpYmxlOiB0cnVlIH0pO1xyXG4gIH1cclxuXHJcbiAgb25TaG91bGRDbG9zZVBvcG92ZXIgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgaXNQb3BvdmVyVmlzaWJsZTogZmFsc2UsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uQ2FuY2VsZWRWaWV3ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGlzUG9wb3ZlclZpc2libGU6IGZhbHNlLFxyXG4gICAgICBpc1ZpZXdWaXNpYmxlOiBmYWxzZSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25TZWxlY3RlZEluVmlldyA9IChncm91cE5hbWUsIHNlbGVjdGVkSXRlbXMsIGNoZWNrZWRPdXRwdXQpID0+IHtcclxuICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IHtcclxuICAgICAgbmFtZTogZ3JvdXBOYW1lLFxyXG4gICAgICBpdGVtczogc2VsZWN0ZWRJdGVtcyxcclxuICAgIH07XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgcHJlQ2hlY2tlZEl0ZW1zOiBjaGVja2VkT3V0cHV0LFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLm9uU2VsZWN0SGFuZGxlcihncm91cE5hbWUsIHNlbGVjdGVkSXRlbSwgY2hlY2tlZE91dHB1dCk7XHJcbiAgfVxyXG5cclxuICBvblNlbGVjdGVkSW5Qb3BvdmVyID0gKHNlbGVjdGVkSXRlbSkgPT4ge1xyXG4gICAgdGhpcy51bmNoZWNrQWxsSXRlbXMoKTtcclxuICAgIGNvbnN0IGNoZWNrZWRPdXRwdXQgPSBzZWxlY3RlZEl0ZW0gJiYgQXJyYXkuaXNBcnJheShzZWxlY3RlZEl0ZW0uaXRlbXMpID9cclxuICAgICAgc2VsZWN0ZWRJdGVtLml0ZW1zIDogW107XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgcHJlQ2hlY2tlZEl0ZW1zOiBjaGVja2VkT3V0cHV0LFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLm9uU2VsZWN0SGFuZGxlcihzZWxlY3RlZEl0ZW0ubmFtZSwgc2VsZWN0ZWRJdGVtLCBjaGVja2VkT3V0cHV0KTtcclxuICB9XHJcblxyXG4gIGdldElucHV0VGV4dCA9ICgpID0+IHtcclxuICAgIGxldCBzZWxlY3Rpb25UZXh0ID0gJyc7XHJcblxyXG4gICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWQgJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcyAmJiB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgc2VsZWN0aW9uVGV4dCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWQubmFtZTtcclxuICAgIH1cclxuICAgIHJldHVybiBzZWxlY3Rpb25UZXh0O1xyXG4gIH1cclxuXHJcbiAgZ2V0VmlldyA9ICgpID0+IHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLnByb3BzLnZpZXdPcHRpb25zO1xyXG4gICAgY29uc3QgcHJlQ2hlY2tlZEl0ZW1zID0gQXJyYXkuaXNBcnJheSh0aGlzLnN0YXRlLnByZUNoZWNrZWRJdGVtcykgP1xyXG4gICAgICB0aGlzLnN0YXRlLnByZUNoZWNrZWRJdGVtcy5zbGljZSgpIDogbnVsbDtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8SFNWaWV3XHJcbiAgICAgICAgZGF0YVNvdXJjZVByb3ZpZGVyPXt0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlcn1cclxuICAgICAgICB7Li4ub3B0aW9uc31cclxuICAgICAgICBvbkNhbmNlbD17dGhpcy5vbkNhbmNlbGVkVmlld31cclxuICAgICAgICBvblNlbGVjdD17dGhpcy5vblNlbGVjdGVkSW5WaWV3fVxyXG4gICAgICAgIG9uSGVscD17dGhpcy5wcm9wcy5vbkhlbHB9XHJcbiAgICAgICAgZ3JvdXBOYW1lPXt0aGlzLnN0YXRlLnNlbGVjdGVkID8gdGhpcy5zdGF0ZS5zZWxlY3RlZC5uYW1lIDogJyd9XHJcbiAgICAgICAgcHJlQ2hlY2tlZEl0ZW1zPXtwcmVDaGVja2VkSXRlbXN9XHJcbiAgICAgIC8+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0UG9wb3ZlciA9ICgpID0+IHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLnByb3BzLnBvcG92ZXJPcHRpb25zO1xyXG5cclxuICAgIHJldHVybiAoPEhTUG9wb3ZlclxyXG4gICAgICBkYXRhU291cmNlUHJvdmlkZXI9e3RoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyfVxyXG4gICAgICBvbkNvbXBvbmVudEJsdXI9e3RoaXMub25Qb3BvdmVyQmx1cn1cclxuICAgICAgb25TZWxlY3Q9e3RoaXMub25TZWxlY3RlZEluUG9wb3Zlcn1cclxuICAgICAgb25TaG91bGRPcGVuVmlldz17dGhpcy5vblNob3VsZE9wZW5WaWV3fVxyXG4gICAgICBvblNob3VsZENsb3NlUG9wb3Zlcj17dGhpcy5vblNob3VsZENsb3NlUG9wb3Zlcn1cclxuICAgICAgey4uLm9wdGlvbnN9XHJcbiAgICAvPik7XHJcbiAgfVxyXG5cclxuICBnZXRUb29sVGlwID0gY29udGVudCA9PiA8VG9vbHRpcCBpZD1cInRvb2x0aXBcIiBjbGFzc05hbWU9XCJocy1jb21iby1ib3gtdG9vbHRpcFwiPntjb250ZW50fTwvVG9vbHRpcD47XHJcblxyXG4gIGdldERlZmF1bHRUb29sVGlwQ29udGVudCA9ICgpID0+IHtcclxuICAgIGlmICghdGhpcy5pc1NlbGVjdGVkSXRlbXMoKSkgcmV0dXJuIHRoaXMucHJvcHMubm9TZWxlY3Rpb25UZXh0O1xyXG4gICAgY29uc3QgdG90YWxDb3VudCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMubGVuZ3RoO1xyXG4gICAgY29uc3QgY291bnQgPSB0b3RhbENvdW50ID4gTUFYX0NPVU5UX09GX1RPT0xUSVBfSVRFTVMgPyBNQVhfQ09VTlRfT0ZfVE9PTFRJUF9JVEVNUyA6IHRvdGFsQ291bnQ7XHJcblxyXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLnNsaWNlKDAsIGNvdW50KTtcclxuICAgIGNvbnN0IGVsZW1lbnRzID0gT2JqZWN0LmtleXMoaXRlbXMpLm1hcChpID0+ICh0aGlzLnByb3BzLnRvb2x0aXBJdGVtUmVuZGVyRnVuY3Rpb24gP1xyXG4gICAgICB0aGlzLnByb3BzLnRvb2x0aXBJdGVtUmVuZGVyRnVuY3Rpb24oaXRlbXNbaV0sIGksIHRoaXMuZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbikgOlxyXG4gICAgICB0aGlzLmRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24oaXRlbXNbaV0sIGkpKSk7XHJcbiAgICBpZiAoY291bnQgPCB0b3RhbENvdW50KSBlbGVtZW50cy5wdXNoKDxwIGtleT17Y291bnR9Pi4gLiAuPC9wPik7XHJcblxyXG4gICAgcmV0dXJuIGVsZW1lbnRzO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q291bnRPZlNlbGVjdGVkSXRlbXMgPSAoKSA9PiAodGhpcy5pc1NlbGVjdGVkSXRlbXMoKSA/IHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMubGVuZ3RoIDogMCk7XHJcblxyXG4gIHNldFBvcG92ZXJWaXNpYmlsaXR5ID0gKGlzVmlzaWJsZSkgPT4ge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlzUG9wb3ZlclZpc2libGU6IGlzVmlzaWJsZSB9KTtcclxuICB9XHJcblxyXG4gIGRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24gPSAoaXRlbSwga2V5KSA9PiAoPHAga2V5PXtrZXl9PntpdGVtLm5hbWV9PC9wPik7XHJcblxyXG4gIGlzU2VsZWN0ZWRJdGVtcyA9ICgpID0+IChcclxuICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWQgJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcyAmJiB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLmxlbmd0aCA+IDBcclxuICApO1xyXG5cclxuICBsb2FkRGF0YSA9IChwcm9wcykgPT4ge1xyXG4gICAgcHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmxvYWREYXRhKCkudGhlbigoKSA9PiB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIG5lZWRUb0xvYWREYXRhOiBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHBvcG92ZXJTaG91bGRCZUhpZGRlbiA9ICgpID0+IHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5zdGF0ZS5pc1BvcG92ZXJWaXNpYmxlKSB0aGlzLnNldFBvcG92ZXJWaXNpYmlsaXR5KGZhbHNlKTtcclxuICAgIH0sIDE1MCk7XHJcbiAgfVxyXG5cclxuICB1bmNoZWNrQWxsSXRlbXMgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgcHJlQ2hlY2tlZEl0ZW1zOiBbXSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUHJlY2hlY2tlZCA9IChwcm9wcykgPT4ge1xyXG4gICAgY29uc3QgeyBkYXRhU291cmNlUHJvdmlkZXIsIHByZUNoZWNrZWRHcm91cE5hbWUsIHByZUNoZWNrZWRJdGVtcyB9ID0gcHJvcHM7XHJcblxyXG4gICAgZGF0YVNvdXJjZVByb3ZpZGVyLnNldFByZWNoZWNrZWRJdGVtcyhwcmVDaGVja2VkSXRlbXMpO1xyXG5cclxuICAgIGNvbnN0IGNoZWNrZWRPdXRwdXQgPSBkYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZE91dHB1dCgpO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRJdGVtcyA9IGRhdGFTb3VyY2VQcm92aWRlci5nZXRBbGxDaGVja2VkSXRlbXMoKTtcclxuICAgIGNvbnN0IGNoZWNrZWQgPSBjaGVja2VkT3V0cHV0LmNoZWNrZWQgfHwgW107XHJcblxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5vblNlbGVjdGVkSW5WaWV3KHByZUNoZWNrZWRHcm91cE5hbWUsIHNlbGVjdGVkSXRlbXMsIGNoZWNrZWQpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBpbnB1dE5hbWUgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCBpbnB1dE9wdGlvbnMgPSB7XHJcbiAgICAgIG9uRm9jdXM6IHRoaXMub25JbnB1dEZvY3VzLFxyXG4gICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnByb3BzLm5vU2VsZWN0aW9uVGV4dCxcclxuICAgICAgcmVhZE9ubHk6IHRydWUsXHJcbiAgICAgIHJlZjogKGlucHV0KSA9PiB7IHRoaXMuaW5wdXRFbGVtZW50ID0gaW5wdXQ7IH0sXHJcbiAgICAgIHZhbHVlOiB0aGlzLmdldElucHV0VGV4dCgpLFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoaW5wdXROYW1lLnRyaW0oKSAhPT0gJycpIHtcclxuICAgICAgaW5wdXRPcHRpb25zLm5hbWUgPSBpbnB1dE5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItbGlzdC13cmFwcGVyXCI+XHJcbiAgICAgICAgPE92ZXJsYXlUcmlnZ2VyXHJcbiAgICAgICAgICBkZWxheT17VE9PTFRJUF9ERUxBWV9NU31cclxuICAgICAgICAgIHBsYWNlbWVudD17dGhpcy5wcm9wcy50b29sdGlwUGxhY2VtZW50fVxyXG4gICAgICAgICAgb3ZlcmxheT17dGhpcy5nZXRUb29sVGlwKHRoaXMuZ2V0RGVmYXVsdFRvb2xUaXBDb250ZW50KCkpfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWxpc3RcIj5cclxuICAgICAgICAgICAgPGlucHV0IHsuLi5pbnB1dE9wdGlvbnN9IC8+XHJcbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLm5lZWRUb0xvYWREYXRhID9cclxuICAgICAgICAgICAgICA8U3Bpbm5lciAvPiA6XHJcbiAgICAgICAgICAgICAgPEhTQmFkZ2UgY2xhc3NOYW1lPVwiYmFkZ2Utb3JhbmdlXCI+e3RoaXMuZ2V0Q291bnRPZlNlbGVjdGVkSXRlbXMoKX08L0hTQmFkZ2U+XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZGlzYWJsZWQ9e3RoaXMuc3RhdGUubmVlZFRvTG9hZERhdGF9IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1saXN0LWJ0blwiIG9uQ2xpY2s9e3RoaXMub25DbGlja0hhbmRsZXJ9PjxGYUNoZXZyb25Eb3duIC8+PC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L092ZXJsYXlUcmlnZ2VyPlxyXG4gICAgICAgIHsgdGhpcy5zdGF0ZS5pc1BvcG92ZXJWaXNpYmxlID8gdGhpcy5nZXRQb3BvdmVyKCkgOiBudWxsIH1cclxuICAgICAgICB7IHRoaXMuc3RhdGUuaXNWaWV3VmlzaWJsZSA/IHRoaXMuZ2V0VmlldygpIDogbnVsbCB9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbkhpZXJhcmNoeVNlbGVjdG9yQ29tYm9Cb3gucHJvcFR5cGVzID0ge1xyXG4gIGRhdGFTb3VyY2VQcm92aWRlcjogZGF0YVNvdXJjZVByb3ZpZGVyVHlwZS5pc1JlcXVpcmVkLFxyXG4gIGhpZGVPblBvcG92ZXJCbHVyOiBQcm9wVHlwZXMuYm9vbCxcclxuICBpbnB1dE5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgbm9TZWxlY3Rpb25UZXh0OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIHBvcG92ZXJWaXNpYmxlOiBQcm9wVHlwZXMuYm9vbCxcclxuICBwb3BvdmVyT3B0aW9uczogcG9wb3Zlck9wdGlvbnNUeXBlLmlzUmVxdWlyZWQsXHJcbiAgcHJlQ2hlY2tlZEl0ZW1zOiBwcmVDaGVja2VkSXRlbXNMaXN0U2hhcGUsXHJcbiAgcHJlQ2hlY2tlZEdyb3VwTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICB0b29sdGlwUGxhY2VtZW50OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIHZpZXdPcHRpb25zOiB2aWV3T3B0aW9uc1R5cGUuaXNSZXF1aXJlZCxcclxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgb25IZWxwOiBQcm9wVHlwZXMuZnVuYyxcclxuICB0b29sdGlwSXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcclxufTtcclxuXHJcbkhpZXJhcmNoeVNlbGVjdG9yQ29tYm9Cb3guZGVmYXVsdFByb3BzID0ge1xyXG4gIGhpZGVPblBvcG92ZXJCbHVyOiB0cnVlLFxyXG4gIGlucHV0TmFtZTogJycsXHJcbiAgbm9TZWxlY3Rpb25UZXh0OiAnTm8gb25lIHNlbGVjdGVkLi4uJyxcclxuICBwb3BvdmVyVmlzaWJsZTogZmFsc2UsXHJcbiAgcHJlQ2hlY2tlZEl0ZW1zOiBudWxsLFxyXG4gIHByZUNoZWNrZWRHcm91cE5hbWU6ICdEZWZhdWx0IGdyb3VwJyxcclxuICB0b29sdGlwUGxhY2VtZW50OiAnYm90dG9tJyxcclxuICBvblNlbGVjdDogKCkgPT4ge30sXHJcbiAgb25IZWxwOiAoKSA9PiB7fSxcclxuICB0b29sdGlwSXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxyXG59O1xyXG4iXX0=