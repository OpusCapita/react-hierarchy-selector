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
      return _this3.props.tooltipItemRenderFunction ? _this3.props.tooltipItemRenderFunction(items[i], _this3.defaultItemRenderFunction) : _this3.defaultItemRenderFunction(items[i]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbWJvLWJveC9jb21iby1ib3guY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJIaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94IiwicHJvcHMiLCJpc0RhdGFMb2FkZWQiLCJkYXRhU291cmNlUHJvdmlkZXIiLCJpc0xvYWRlZCIsIm5lZWRUb1VwZGF0ZVByZUNoZWNrZWQiLCJwcmVDaGVja2VkSXRlbXMiLCJsZW5ndGgiLCJuZWVkVG9Mb2FkRGF0YSIsInN0YXRlIiwic2VsZWN0ZWQiLCJpc1BvcG92ZXJWaXNpYmxlIiwicG9wb3ZlclZpc2libGUiLCJpc1ZpZXdWaXNpYmxlIiwiY29tcG9uZW50V2lsbE1vdW50IiwibG9hZERhdGEiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwic2V0U3RhdGUiLCJjb21wb25lbnRXaWxsVXBkYXRlIiwibmV4dFN0YXRlIiwidXBkYXRlUHJlY2hlY2tlZCIsInJlbmRlciIsImlucHV0TmFtZSIsImlucHV0T3B0aW9ucyIsIm9uRm9jdXMiLCJvbklucHV0Rm9jdXMiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJub1NlbGVjdGlvblRleHQiLCJyZWFkT25seSIsInJlZiIsImlucHV0IiwiaW5wdXRFbGVtZW50IiwidmFsdWUiLCJnZXRJbnB1dFRleHQiLCJ0cmltIiwibmFtZSIsInRvb2x0aXBQbGFjZW1lbnQiLCJnZXRUb29sVGlwIiwiZ2V0RGVmYXVsdFRvb2xUaXBDb250ZW50IiwiZ2V0Q291bnRPZlNlbGVjdGVkSXRlbXMiLCJvbkNsaWNrSGFuZGxlciIsImdldFBvcG92ZXIiLCJnZXRWaWV3IiwiUHVyZUNvbXBvbmVudCIsInNldFBvcG92ZXJWaXNpYmlsaXR5IiwiYmx1ciIsIm9uU2VsZWN0SGFuZGxlciIsImdyb3VwTmFtZSIsInNlbGVjdGVkSXRlbSIsImNoZWNrZWRPdXRwdXQiLCJpdGVtcyIsIm1hcCIsIk9iamVjdCIsImFzc2lnbiIsIml0ZW0iLCJvblNlbGVjdCIsIm9uUG9wb3ZlckJsdXIiLCJoaWRlT25Qb3BvdmVyQmx1ciIsInBvcG92ZXJTaG91bGRCZUhpZGRlbiIsIm9uU2hvdWxkT3BlblZpZXciLCJvblNob3VsZENsb3NlUG9wb3ZlciIsIm9uQ2FuY2VsZWRWaWV3Iiwib25TZWxlY3RlZEluVmlldyIsInNlbGVjdGVkSXRlbXMiLCJvblNlbGVjdGVkSW5Qb3BvdmVyIiwidW5jaGVja0FsbEl0ZW1zIiwiQXJyYXkiLCJpc0FycmF5IiwiaWQiLCJsZXZlbCIsInBhcmVudElkIiwicGFyZW50SWRzIiwiaXNDaGVja2VkQWxsIiwiaXNDaGlsZHJlbiIsInNlbGVjdGlvblRleHQiLCJvcHRpb25zIiwidmlld09wdGlvbnMiLCJzbGljZSIsIm9uSGVscCIsInBvcG92ZXJPcHRpb25zIiwiY29udGVudCIsImlzU2VsZWN0ZWRJdGVtcyIsInRvdGFsQ291bnQiLCJjb3VudCIsImVsZW1lbnRzIiwia2V5cyIsInRvb2x0aXBJdGVtUmVuZGVyRnVuY3Rpb24iLCJpIiwiZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbiIsInB1c2giLCJpc1Zpc2libGUiLCJrZXkiLCJ0aGVuIiwic2V0VGltZW91dCIsInByZUNoZWNrZWRHcm91cE5hbWUiLCJzZXRQcmVjaGVja2VkSXRlbXMiLCJnZXRDaGVja2VkT3V0cHV0IiwiZ2V0QWxsQ2hlY2tlZEl0ZW1zIiwiY2hlY2tlZCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztxQ0FBQTs7QUFFQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSx5Qjs7O0FBQ25CLHFDQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLGdDQUFNQSxLQUFOLENBRGlCOztBQUFBOztBQUdqQixRQUFNQyxlQUFlRCxNQUFNRSxrQkFBTixDQUF5QkMsUUFBOUM7QUFDQSxRQUFNQyx5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QUFxUnJCQSwwQkFBMEJxRyxZQUExQixHQUF5QztBQUN2QzFDLHFCQUFtQixJQURvQjtBQUV2Q3BDLGFBQVcsRUFGNEI7QUFHdkNNLG1CQUFpQixvQkFIc0I7QUFJdkNqQixrQkFBZ0IsS0FKdUI7QUFLdkNOLG1CQUFpQixJQUxzQjtBQU12QzBGLHVCQUFxQixlQU5rQjtBQU92QzFELG9CQUFrQixRQVBxQjtBQVF2Q21CLFlBQVUsb0JBQU0sQ0FBRSxDQVJxQjtBQVN2Q3VCLFVBQVEsa0JBQU0sQ0FBRSxDQVR1QjtBQVV2Q1EsNkJBQTJCO0FBVlksQ0FBekMiLCJmaWxlIjoiY29tYm8tYm94LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXVudXNlZC1zdGF0ZSAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgVG9vbHRpcCwgT3ZlcmxheVRyaWdnZXIgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5pbXBvcnQgRmFDaGV2cm9uRG93biBmcm9tICdyZWFjdC1pY29ucy9saWIvZmEvY2hldnJvbi1kb3duJztcclxuaW1wb3J0IHsgZGF0YVNvdXJjZVByb3ZpZGVyVHlwZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3R5cGVzJztcclxuaW1wb3J0IHsgcHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlLCBwb3BvdmVyT3B0aW9uc1R5cGUsIHZpZXdPcHRpb25zVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzJztcclxuaW1wb3J0IFNwaW5uZXIgZnJvbSAnLi4vc3Bpbm5lcic7XHJcbmltcG9ydCBIU1BvcG92ZXIgZnJvbSAnLi4vcG9wb3Zlcic7XHJcbmltcG9ydCBIU1ZpZXcgZnJvbSAnLi4vdmlldyc7XHJcbmltcG9ydCBIU0JhZGdlIGZyb20gJy4uL2JhZGdlJztcclxuXHJcblxyXG5pbXBvcnQgeyBUT09MVElQX0RFTEFZX01TLCBNQVhfQ09VTlRfT0ZfVE9PTFRJUF9JVEVNUyB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuaW1wb3J0ICcuL2NvbWJvLWJveC5zY3NzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVNlbGVjdG9yQ29tYm9Cb3ggZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG5cclxuICAgIGNvbnN0IGlzRGF0YUxvYWRlZCA9IHByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5pc0xvYWRlZDtcclxuICAgIGNvbnN0IG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQgPSBwcm9wcy5wcmVDaGVja2VkSXRlbXMgJiYgcHJvcHMucHJlQ2hlY2tlZEl0ZW1zLmxlbmd0aDtcclxuICAgIGNvbnN0IG5lZWRUb0xvYWREYXRhID0gIWlzRGF0YUxvYWRlZCAmJiBuZWVkVG9VcGRhdGVQcmVDaGVja2VkO1xyXG5cclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIG5lZWRUb0xvYWREYXRhLFxyXG4gICAgICBuZWVkVG9VcGRhdGVQcmVDaGVja2VkLFxyXG4gICAgICBwcmVDaGVja2VkSXRlbXM6IHByb3BzLnByZUNoZWNrZWRJdGVtcyxcclxuICAgICAgc2VsZWN0ZWQ6IG51bGwsXHJcbiAgICAgIGlzUG9wb3ZlclZpc2libGU6IHByb3BzLnBvcG92ZXJWaXNpYmxlLFxyXG4gICAgICBpc1ZpZXdWaXNpYmxlOiBmYWxzZSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICBjb25zdCB7IG5lZWRUb0xvYWREYXRhIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgaWYgKG5lZWRUb0xvYWREYXRhKSB7XHJcbiAgICAgIHRoaXMubG9hZERhdGEodGhpcy5wcm9wcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xyXG4gICAgY29uc3QgeyBkYXRhU291cmNlUHJvdmlkZXIsIHByZUNoZWNrZWRJdGVtcyB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICBpZiAoZGF0YVNvdXJjZVByb3ZpZGVyICE9PSBuZXh0UHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyKSB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIG5lZWRUb0xvYWREYXRhOiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocHJlQ2hlY2tlZEl0ZW1zICE9PSBuZXh0UHJvcHMucHJlQ2hlY2tlZEl0ZW1zKSB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQ6IHRydWUsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xyXG4gICAgY29uc3QgeyBuZWVkVG9Mb2FkRGF0YSwgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZCB9ID0gbmV4dFN0YXRlO1xyXG4gICAgaWYgKG5lZWRUb0xvYWREYXRhKSB7XHJcbiAgICAgIHRoaXMubG9hZERhdGEobmV4dFByb3BzKTtcclxuICAgIH0gZWxzZSBpZiAobmVlZFRvVXBkYXRlUHJlQ2hlY2tlZCkge1xyXG4gICAgICB0aGlzLnVwZGF0ZVByZWNoZWNrZWQobmV4dFByb3BzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uQ2xpY2tIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgdGhpcy5zZXRQb3BvdmVyVmlzaWJpbGl0eSghdGhpcy5zdGF0ZS5pc1BvcG92ZXJWaXNpYmxlKTtcclxuICB9XHJcblxyXG4gIG9uSW5wdXRGb2N1cyA9ICgpID0+IHtcclxuICAgIHRoaXMuaW5wdXRFbGVtZW50LmJsdXIoKTtcclxuICB9XHJcblxyXG4gIG9uU2VsZWN0SGFuZGxlciA9IChncm91cE5hbWUsIHNlbGVjdGVkSXRlbSwgY2hlY2tlZE91dHB1dCkgPT4ge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIHNlbGVjdGVkOiBzZWxlY3RlZEl0ZW0sXHJcbiAgICAgIGlzUG9wb3ZlclZpc2libGU6IGZhbHNlLFxyXG4gICAgICBpc1ZpZXdWaXNpYmxlOiBmYWxzZSxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgaXRlbXMgPSBjaGVja2VkT3V0cHV0ID8gY2hlY2tlZE91dHB1dC5tYXAoaXRlbSA9PiBPYmplY3QuYXNzaWduKHt9LCBpdGVtKSkgOiBbXTtcclxuXHJcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGl0ZW1zLCBncm91cE5hbWUpO1xyXG4gIH1cclxuXHJcbiAgb25Qb3BvdmVyQmx1ciA9ICgpID0+IHtcclxuICAgIGlmICh0aGlzLnByb3BzLmhpZGVPblBvcG92ZXJCbHVyKSB7XHJcbiAgICAgIHRoaXMucG9wb3ZlclNob3VsZEJlSGlkZGVuKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvblNob3VsZE9wZW5WaWV3ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlzVmlld1Zpc2libGU6IHRydWUgfSk7XHJcbiAgfVxyXG5cclxuICBvblNob3VsZENsb3NlUG9wb3ZlciA9ICgpID0+IHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBpc1BvcG92ZXJWaXNpYmxlOiBmYWxzZSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25DYW5jZWxlZFZpZXcgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgaXNQb3BvdmVyVmlzaWJsZTogZmFsc2UsXHJcbiAgICAgIGlzVmlld1Zpc2libGU6IGZhbHNlLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvblNlbGVjdGVkSW5WaWV3ID0gKGdyb3VwTmFtZSwgc2VsZWN0ZWRJdGVtcywgY2hlY2tlZE91dHB1dCkgPT4ge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRJdGVtID0ge1xyXG4gICAgICBuYW1lOiBncm91cE5hbWUsXHJcbiAgICAgIGl0ZW1zOiBzZWxlY3RlZEl0ZW1zLFxyXG4gICAgfTtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBwcmVDaGVja2VkSXRlbXM6IGNoZWNrZWRPdXRwdXQsXHJcbiAgICB9KTtcclxuICAgIHRoaXMub25TZWxlY3RIYW5kbGVyKGdyb3VwTmFtZSwgc2VsZWN0ZWRJdGVtLCBjaGVja2VkT3V0cHV0KTtcclxuICB9XHJcblxyXG4gIG9uU2VsZWN0ZWRJblBvcG92ZXIgPSAoc2VsZWN0ZWRJdGVtKSA9PiB7XHJcbiAgICB0aGlzLnVuY2hlY2tBbGxJdGVtcygpO1xyXG4gICAgY29uc3QgY2hlY2tlZE91dHB1dCA9IHNlbGVjdGVkSXRlbSAmJiBBcnJheS5pc0FycmF5KHNlbGVjdGVkSXRlbS5pdGVtcykgP1xyXG4gICAgICBzZWxlY3RlZEl0ZW0uaXRlbXMubWFwKGl0ZW0gPT4gKHtcclxuICAgICAgICBpZDogaXRlbS5pZCxcclxuICAgICAgICBuYW1lOiBpdGVtLm5hbWUsXHJcbiAgICAgICAgbGV2ZWw6IDAsXHJcbiAgICAgICAgcGFyZW50SWQ6IG51bGwsXHJcbiAgICAgICAgcGFyZW50SWRzOiBbXSxcclxuICAgICAgICBpc0NoZWNrZWRBbGw6IGZhbHNlLFxyXG4gICAgICAgIGlzQ2hpbGRyZW46IGZhbHNlLFxyXG4gICAgICB9KSlcclxuICAgICAgOiBbXTtcclxuICAgIHRoaXMub25TZWxlY3RIYW5kbGVyKHNlbGVjdGVkSXRlbSwgY2hlY2tlZE91dHB1dCk7XHJcbiAgfVxyXG5cclxuICBnZXRJbnB1dFRleHQgPSAoKSA9PiB7XHJcbiAgICBsZXQgc2VsZWN0aW9uVGV4dCA9ICcnO1xyXG5cclxuICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkICYmIHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMgJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHNlbGVjdGlvblRleHQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkLm5hbWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2VsZWN0aW9uVGV4dDtcclxuICB9XHJcblxyXG4gIGdldFZpZXcgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5wcm9wcy52aWV3T3B0aW9ucztcclxuICAgIGNvbnN0IHByZUNoZWNrZWRJdGVtcyA9IEFycmF5LmlzQXJyYXkodGhpcy5zdGF0ZS5wcmVDaGVja2VkSXRlbXMpID9cclxuICAgICAgdGhpcy5zdGF0ZS5wcmVDaGVja2VkSXRlbXMuc2xpY2UoKSA6IG51bGw7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPEhTVmlld1xyXG4gICAgICAgIGRhdGFTb3VyY2VQcm92aWRlcj17dGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXJ9XHJcbiAgICAgICAgey4uLm9wdGlvbnN9XHJcbiAgICAgICAgb25DYW5jZWw9e3RoaXMub25DYW5jZWxlZFZpZXd9XHJcbiAgICAgICAgb25TZWxlY3Q9e3RoaXMub25TZWxlY3RlZEluVmlld31cclxuICAgICAgICBvbkhlbHA9e3RoaXMucHJvcHMub25IZWxwfVxyXG4gICAgICAgIGdyb3VwTmFtZT17dGhpcy5zdGF0ZS5zZWxlY3RlZCA/IHRoaXMuc3RhdGUuc2VsZWN0ZWQubmFtZSA6ICcnfVxyXG4gICAgICAgIHByZUNoZWNrZWRJdGVtcz17cHJlQ2hlY2tlZEl0ZW1zfVxyXG4gICAgICAvPlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldFBvcG92ZXIgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5wcm9wcy5wb3BvdmVyT3B0aW9ucztcclxuXHJcbiAgICByZXR1cm4gKDxIU1BvcG92ZXJcclxuICAgICAgZGF0YVNvdXJjZVByb3ZpZGVyPXt0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlcn1cclxuICAgICAgb25Db21wb25lbnRCbHVyPXt0aGlzLm9uUG9wb3ZlckJsdXJ9XHJcbiAgICAgIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0ZWRJblBvcG92ZXJ9XHJcbiAgICAgIG9uU2hvdWxkT3BlblZpZXc9e3RoaXMub25TaG91bGRPcGVuVmlld31cclxuICAgICAgb25TaG91bGRDbG9zZVBvcG92ZXI9e3RoaXMub25TaG91bGRDbG9zZVBvcG92ZXJ9XHJcbiAgICAgIHsuLi5vcHRpb25zfVxyXG4gICAgLz4pO1xyXG4gIH1cclxuXHJcbiAgZ2V0VG9vbFRpcCA9IGNvbnRlbnQgPT4gPFRvb2x0aXAgaWQ9XCJ0b29sdGlwXCIgY2xhc3NOYW1lPVwiaHMtY29tYm8tYm94LXRvb2x0aXBcIj57Y29udGVudH08L1Rvb2x0aXA+O1xyXG5cclxuICBnZXREZWZhdWx0VG9vbFRpcENvbnRlbnQgPSAoKSA9PiB7XHJcbiAgICBpZiAoIXRoaXMuaXNTZWxlY3RlZEl0ZW1zKCkpIHJldHVybiB0aGlzLnByb3BzLm5vU2VsZWN0aW9uVGV4dDtcclxuICAgIGNvbnN0IHRvdGFsQ291bnQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLmxlbmd0aDtcclxuICAgIGNvbnN0IGNvdW50ID0gdG90YWxDb3VudCA+IE1BWF9DT1VOVF9PRl9UT09MVElQX0lURU1TID8gTUFYX0NPVU5UX09GX1RPT0xUSVBfSVRFTVMgOiB0b3RhbENvdW50O1xyXG5cclxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5zbGljZSgwLCBjb3VudCk7XHJcbiAgICBjb25zdCBlbGVtZW50cyA9IE9iamVjdC5rZXlzKGl0ZW1zKS5tYXAoaSA9PiAodGhpcy5wcm9wcy50b29sdGlwSXRlbVJlbmRlckZ1bmN0aW9uID9cclxuICAgICAgdGhpcy5wcm9wcy50b29sdGlwSXRlbVJlbmRlckZ1bmN0aW9uKGl0ZW1zW2ldLCB0aGlzLmRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24pIDpcclxuICAgICAgdGhpcy5kZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uKGl0ZW1zW2ldKSkpO1xyXG4gICAgaWYgKGNvdW50IDwgdG90YWxDb3VudCkgZWxlbWVudHMucHVzaCg8cCBrZXk9e2NvdW50fT4uIC4gLjwvcD4pO1xyXG5cclxuICAgIHJldHVybiBlbGVtZW50cztcclxuICB9XHJcblxyXG4gIGdldENvdW50T2ZTZWxlY3RlZEl0ZW1zID0gKCkgPT4gKHRoaXMuaXNTZWxlY3RlZEl0ZW1zKCkgPyB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLmxlbmd0aCA6IDApO1xyXG5cclxuICBzZXRQb3BvdmVyVmlzaWJpbGl0eSA9IChpc1Zpc2libGUpID0+IHtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBpc1BvcG92ZXJWaXNpYmxlOiBpc1Zpc2libGUgfSk7XHJcbiAgfVxyXG5cclxuICBkZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uID0gKGl0ZW0sIGtleSkgPT4gKDxwIGtleT17a2V5fT57aXRlbS5uYW1lfTwvcD4pO1xyXG5cclxuICBpc1NlbGVjdGVkSXRlbXMgPSAoKSA9PiAoXHJcbiAgICB0aGlzLnN0YXRlLnNlbGVjdGVkICYmIHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMgJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5sZW5ndGggPiAwXHJcbiAgKTtcclxuXHJcbiAgbG9hZERhdGEgPSAocHJvcHMpID0+IHtcclxuICAgIHByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5sb2FkRGF0YSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICBuZWVkVG9Mb2FkRGF0YTogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwb3BvdmVyU2hvdWxkQmVIaWRkZW4gPSAoKSA9PiB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuc3RhdGUuaXNQb3BvdmVyVmlzaWJsZSkgdGhpcy5zZXRQb3BvdmVyVmlzaWJpbGl0eShmYWxzZSk7XHJcbiAgICB9LCAxNTApO1xyXG4gIH1cclxuXHJcbiAgdW5jaGVja0FsbEl0ZW1zID0gKCkgPT4ge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIHByZUNoZWNrZWRJdGVtczogW10sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVByZWNoZWNrZWQgPSAocHJvcHMpID0+IHtcclxuICAgIGNvbnN0IHsgZGF0YVNvdXJjZVByb3ZpZGVyLCBwcmVDaGVja2VkR3JvdXBOYW1lLCBwcmVDaGVja2VkSXRlbXMgfSA9IHByb3BzO1xyXG5cclxuICAgIGRhdGFTb3VyY2VQcm92aWRlci5zZXRQcmVjaGVja2VkSXRlbXMocHJlQ2hlY2tlZEl0ZW1zKTtcclxuXHJcbiAgICBjb25zdCBjaGVja2VkT3V0cHV0ID0gZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWRPdXRwdXQoKTtcclxuICAgIGNvbnN0IHNlbGVjdGVkSXRlbXMgPSBkYXRhU291cmNlUHJvdmlkZXIuZ2V0QWxsQ2hlY2tlZEl0ZW1zKCk7XHJcbiAgICBjb25zdCBjaGVja2VkID0gY2hlY2tlZE91dHB1dC5jaGVja2VkIHx8IFtdO1xyXG5cclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBuZWVkVG9VcGRhdGVQcmVDaGVja2VkOiBmYWxzZSxcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMub25TZWxlY3RlZEluVmlldyhwcmVDaGVja2VkR3JvdXBOYW1lLCBzZWxlY3RlZEl0ZW1zLCBjaGVja2VkKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgaW5wdXROYW1lIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgaW5wdXRPcHRpb25zID0ge1xyXG4gICAgICBvbkZvY3VzOiB0aGlzLm9uSW5wdXRGb2N1cyxcclxuICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICBwbGFjZWhvbGRlcjogdGhpcy5wcm9wcy5ub1NlbGVjdGlvblRleHQsXHJcbiAgICAgIHJlYWRPbmx5OiB0cnVlLFxyXG4gICAgICByZWY6IChpbnB1dCkgPT4geyB0aGlzLmlucHV0RWxlbWVudCA9IGlucHV0OyB9LFxyXG4gICAgICB2YWx1ZTogdGhpcy5nZXRJbnB1dFRleHQoKSxcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGlucHV0TmFtZS50cmltKCkgIT09ICcnKSB7XHJcbiAgICAgIGlucHV0T3B0aW9ucy5uYW1lID0gaW5wdXROYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWxpc3Qtd3JhcHBlclwiPlxyXG4gICAgICAgIDxPdmVybGF5VHJpZ2dlclxyXG4gICAgICAgICAgZGVsYXk9e1RPT0xUSVBfREVMQVlfTVN9XHJcbiAgICAgICAgICBwbGFjZW1lbnQ9e3RoaXMucHJvcHMudG9vbHRpcFBsYWNlbWVudH1cclxuICAgICAgICAgIG92ZXJsYXk9e3RoaXMuZ2V0VG9vbFRpcCh0aGlzLmdldERlZmF1bHRUb29sVGlwQ29udGVudCgpKX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1saXN0XCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCB7Li4uaW5wdXRPcHRpb25zfSAvPlxyXG4gICAgICAgICAgICB7dGhpcy5zdGF0ZS5uZWVkVG9Mb2FkRGF0YSA/XHJcbiAgICAgICAgICAgICAgPFNwaW5uZXIgLz4gOlxyXG4gICAgICAgICAgICAgIDxIU0JhZGdlIGNsYXNzTmFtZT1cImJhZGdlLW9yYW5nZVwiPnt0aGlzLmdldENvdW50T2ZTZWxlY3RlZEl0ZW1zKCl9PC9IU0JhZGdlPlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRpc2FibGVkPXt0aGlzLnN0YXRlLm5lZWRUb0xvYWREYXRhfSBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItbGlzdC1idG5cIiBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tIYW5kbGVyfT48RmFDaGV2cm9uRG93biAvPjwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9PdmVybGF5VHJpZ2dlcj5cclxuICAgICAgICB7IHRoaXMuc3RhdGUuaXNQb3BvdmVyVmlzaWJsZSA/IHRoaXMuZ2V0UG9wb3ZlcigpIDogbnVsbCB9XHJcbiAgICAgICAgeyB0aGlzLnN0YXRlLmlzVmlld1Zpc2libGUgPyB0aGlzLmdldFZpZXcoKSA6IG51bGwgfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5IaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94LnByb3BUeXBlcyA9IHtcclxuICBkYXRhU291cmNlUHJvdmlkZXI6IGRhdGFTb3VyY2VQcm92aWRlclR5cGUuaXNSZXF1aXJlZCxcclxuICBoaWRlT25Qb3BvdmVyQmx1cjogUHJvcFR5cGVzLmJvb2wsXHJcbiAgaW5wdXROYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIG5vU2VsZWN0aW9uVGV4dDogUHJvcFR5cGVzLnN0cmluZyxcclxuICBwb3BvdmVyVmlzaWJsZTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgcG9wb3Zlck9wdGlvbnM6IHBvcG92ZXJPcHRpb25zVHlwZS5pc1JlcXVpcmVkLFxyXG4gIHByZUNoZWNrZWRJdGVtczogcHJlQ2hlY2tlZEl0ZW1zTGlzdFNoYXBlLFxyXG4gIHByZUNoZWNrZWRHcm91cE5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgdG9vbHRpcFBsYWNlbWVudDogUHJvcFR5cGVzLnN0cmluZyxcclxuICB2aWV3T3B0aW9uczogdmlld09wdGlvbnNUeXBlLmlzUmVxdWlyZWQsXHJcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxyXG4gIG9uSGVscDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgdG9vbHRpcEl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXHJcbn07XHJcblxyXG5IaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94LmRlZmF1bHRQcm9wcyA9IHtcclxuICBoaWRlT25Qb3BvdmVyQmx1cjogdHJ1ZSxcclxuICBpbnB1dE5hbWU6ICcnLFxyXG4gIG5vU2VsZWN0aW9uVGV4dDogJ05vIG9uZSBzZWxlY3RlZC4uLicsXHJcbiAgcG9wb3ZlclZpc2libGU6IGZhbHNlLFxyXG4gIHByZUNoZWNrZWRJdGVtczogbnVsbCxcclxuICBwcmVDaGVja2VkR3JvdXBOYW1lOiAnRGVmYXVsdCBncm91cCcsXHJcbiAgdG9vbHRpcFBsYWNlbWVudDogJ2JvdHRvbScsXHJcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxyXG4gIG9uSGVscDogKCkgPT4ge30sXHJcbiAgdG9vbHRpcEl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcclxufTtcclxuIl19