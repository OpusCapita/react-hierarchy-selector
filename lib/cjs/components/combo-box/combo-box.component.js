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
              disabled: this.state.needToLoadData,
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
    var groupName = null;
    var selectedItem = null;
    var checkedOutput = null;
    var flags = { interactive: true };
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
  isClearable: false
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbWJvLWJveC9jb21iby1ib3guY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJIaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94IiwicHJvcHMiLCJpc0RhdGFMb2FkZWQiLCJkYXRhU291cmNlUHJvdmlkZXIiLCJpc0xvYWRlZCIsIm5lZWRUb1VwZGF0ZVByZUNoZWNrZWQiLCJwcmVDaGVja2VkSXRlbXMiLCJsZW5ndGgiLCJuZWVkVG9Mb2FkRGF0YSIsInN0YXRlIiwic2VsZWN0ZWQiLCJpc1BvcG92ZXJWaXNpYmxlIiwicG9wb3ZlclZpc2libGUiLCJpc1ZpZXdWaXNpYmxlIiwiY29tcG9uZW50V2lsbE1vdW50IiwibG9hZERhdGEiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwic2V0U3RhdGUiLCJjb21wb25lbnRXaWxsVXBkYXRlIiwibmV4dFN0YXRlIiwidXBkYXRlUHJlY2hlY2tlZCIsInJlbmRlciIsImlucHV0TmFtZSIsImlucHV0T3B0aW9ucyIsIm9uRm9jdXMiLCJvbklucHV0Rm9jdXMiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJub1NlbGVjdGlvblRleHQiLCJyZWFkT25seSIsInJlZiIsImlucHV0IiwiaW5wdXRFbGVtZW50IiwidmFsdWUiLCJnZXRJbnB1dFRleHQiLCJvbkNsaWNrIiwib25DbGlja0hhbmRsZXIiLCJ0cmltIiwibmFtZSIsIlRPT0xUSVBfREVMQVlfTVMiLCJ0b29sdGlwUGxhY2VtZW50IiwiZ2V0VG9vbFRpcCIsImdldERlZmF1bHRUb29sVGlwQ29udGVudCIsImdldENvdW50T2ZTZWxlY3RlZEl0ZW1zIiwiZ2V0Q2xlYXJCdXR0b24iLCJnZXRQb3BvdmVyIiwiZ2V0VmlldyIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsInNldFBvcG92ZXJWaXNpYmlsaXR5IiwiYmx1ciIsIm9uU2VsZWN0SGFuZGxlciIsImdyb3VwTmFtZSIsInNlbGVjdGVkSXRlbSIsImNoZWNrZWRPdXRwdXQiLCJmbGFncyIsIml0ZW1zIiwibWFwIiwiT2JqZWN0IiwiYXNzaWduIiwiaXRlbSIsIm9uU2VsZWN0Iiwib25Qb3BvdmVyQmx1ciIsImhpZGVPblBvcG92ZXJCbHVyIiwicG9wb3ZlclNob3VsZEJlSGlkZGVuIiwib25TaG91bGRPcGVuVmlldyIsIm9uU2hvdWxkQ2xvc2VQb3BvdmVyIiwib25DYW5jZWxlZFZpZXciLCJvblNlbGVjdGVkSW5WaWV3Iiwic2VsZWN0ZWRJdGVtcyIsIm9uU2VsZWN0ZWRJblBvcG92ZXIiLCJ1bmNoZWNrQWxsSXRlbXMiLCJBcnJheSIsImlzQXJyYXkiLCJvbkNsZWFySGFuZGxlciIsImludGVyYWN0aXZlIiwiaXNDbGVhcmFibGUiLCJzZWxlY3Rpb25UZXh0Iiwib3B0aW9ucyIsInZpZXdPcHRpb25zIiwic2xpY2UiLCJvbkhlbHAiLCJwb3BvdmVyT3B0aW9ucyIsImNvbnRlbnQiLCJpc1NlbGVjdGVkSXRlbXMiLCJ0b3RhbENvdW50IiwiY291bnQiLCJNQVhfQ09VTlRfT0ZfVE9PTFRJUF9JVEVNUyIsImVsZW1lbnRzIiwia2V5cyIsInRvb2x0aXBJdGVtUmVuZGVyRnVuY3Rpb24iLCJpIiwiZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbiIsInB1c2giLCJpc1Zpc2libGUiLCJrZXkiLCJ0aGVuIiwic2V0VGltZW91dCIsInByZUNoZWNrZWRHcm91cE5hbWUiLCJzZXRQcmVjaGVja2VkSXRlbXMiLCJnZXRDaGVja2VkT3V0cHV0IiwiZ2V0QWxsQ2hlY2tlZEl0ZW1zIiwiY2hlY2tlZCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztxQ0FBQTs7QUFFQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBR0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLHlCOzs7QUFDbkIscUNBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIs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QixrQkFBZ0IsS0FKdUI7QUFLdkNOLG1CQUFpQixJQUxzQjtBQU12QzZGLHVCQUFxQixlQU5rQjtBQU92QzFELG9CQUFrQixRQVBxQjtBQVF2Q3FCLFlBQVUsb0JBQU0sQ0FBRSxDQVJxQjtBQVN2Q29CLFVBQVEsa0JBQU0sQ0FBRSxDQVR1QjtBQVV2Q1MsNkJBQTJCLElBVlk7QUFXdkNkLGVBQWE7QUFYMEIsQ0FBekMiLCJmaWxlIjoiY29tYm8tYm94LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXVudXNlZC1zdGF0ZSAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgVG9vbHRpcCwgT3ZlcmxheVRyaWdnZXIgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBGYUNoZXZyb25Eb3duIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9jaGV2cm9uLWRvd24nO1xuaW1wb3J0IEZhQ2xvc2UgZnJvbSAncmVhY3QtaWNvbnMvbGliL2ZhL2Nsb3NlJztcbmltcG9ydCB7IGRhdGFTb3VyY2VQcm92aWRlclR5cGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90eXBlcyc7XG5pbXBvcnQgeyBwcmVDaGVja2VkSXRlbXNMaXN0U2hhcGUsIHBvcG92ZXJPcHRpb25zVHlwZSwgdmlld09wdGlvbnNUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IFNwaW5uZXIgZnJvbSAnLi4vc3Bpbm5lcic7XG5pbXBvcnQgSFNQb3BvdmVyIGZyb20gJy4uL3BvcG92ZXInO1xuaW1wb3J0IEhTVmlldyBmcm9tICcuLi92aWV3JztcbmltcG9ydCBIU0JhZGdlIGZyb20gJy4uL2JhZGdlJztcblxuXG5pbXBvcnQgeyBUT09MVElQX0RFTEFZX01TLCBNQVhfQ09VTlRfT0ZfVE9PTFRJUF9JVEVNUyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCAnLi9jb21iby1ib3guc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVNlbGVjdG9yQ29tYm9Cb3ggZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICBjb25zdCBpc0RhdGFMb2FkZWQgPSBwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuaXNMb2FkZWQ7XG4gICAgY29uc3QgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZCA9IHByb3BzLnByZUNoZWNrZWRJdGVtcyAmJiBwcm9wcy5wcmVDaGVja2VkSXRlbXMubGVuZ3RoO1xuICAgIGNvbnN0IG5lZWRUb0xvYWREYXRhID0gIWlzRGF0YUxvYWRlZCAmJiBuZWVkVG9VcGRhdGVQcmVDaGVja2VkO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG5lZWRUb0xvYWREYXRhLFxuICAgICAgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZCxcbiAgICAgIHByZUNoZWNrZWRJdGVtczogcHJvcHMucHJlQ2hlY2tlZEl0ZW1zLFxuICAgICAgc2VsZWN0ZWQ6IG51bGwsXG4gICAgICBpc1BvcG92ZXJWaXNpYmxlOiBwcm9wcy5wb3BvdmVyVmlzaWJsZSxcbiAgICAgIGlzVmlld1Zpc2libGU6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgY29uc3QgeyBuZWVkVG9Mb2FkRGF0YSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBpZiAobmVlZFRvTG9hZERhdGEpIHtcbiAgICAgIHRoaXMubG9hZERhdGEodGhpcy5wcm9wcyk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBjb25zdCB7IGRhdGFTb3VyY2VQcm92aWRlciwgcHJlQ2hlY2tlZEl0ZW1zIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKGRhdGFTb3VyY2VQcm92aWRlciAhPT0gbmV4dFByb3BzLmRhdGFTb3VyY2VQcm92aWRlcikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG5lZWRUb0xvYWREYXRhOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHByZUNoZWNrZWRJdGVtcyAhPT0gbmV4dFByb3BzLnByZUNoZWNrZWRJdGVtcykge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQ6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgY29uc3QgeyBuZWVkVG9Mb2FkRGF0YSwgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZCB9ID0gbmV4dFN0YXRlO1xuICAgIGlmIChuZWVkVG9Mb2FkRGF0YSkge1xuICAgICAgdGhpcy5sb2FkRGF0YShuZXh0UHJvcHMpO1xuICAgIH0gZWxzZSBpZiAobmVlZFRvVXBkYXRlUHJlQ2hlY2tlZCkge1xuICAgICAgdGhpcy51cGRhdGVQcmVjaGVja2VkKG5leHRQcm9wcyk7XG4gICAgfVxuICB9XG5cbiAgb25DbGlja0hhbmRsZXIgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRQb3BvdmVyVmlzaWJpbGl0eSghdGhpcy5zdGF0ZS5pc1BvcG92ZXJWaXNpYmxlKTtcbiAgfVxuXG4gIG9uSW5wdXRGb2N1cyA9ICgpID0+IHtcbiAgICB0aGlzLmlucHV0RWxlbWVudC5ibHVyKCk7XG4gIH1cblxuICBvblNlbGVjdEhhbmRsZXIgPSAoZ3JvdXBOYW1lLCBzZWxlY3RlZEl0ZW0sIGNoZWNrZWRPdXRwdXQsIGZsYWdzKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZDogc2VsZWN0ZWRJdGVtLFxuICAgICAgaXNQb3BvdmVyVmlzaWJsZTogZmFsc2UsXG4gICAgICBpc1ZpZXdWaXNpYmxlOiBmYWxzZSxcbiAgICB9KTtcbiAgICBjb25zdCBpdGVtcyA9IGNoZWNrZWRPdXRwdXQgPyBjaGVja2VkT3V0cHV0Lm1hcChpdGVtID0+IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pKSA6IFtdO1xuXG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChpdGVtcywgZ3JvdXBOYW1lLCBmbGFncyk7XG4gIH1cblxuICBvblBvcG92ZXJCbHVyID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmhpZGVPblBvcG92ZXJCbHVyKSB7XG4gICAgICB0aGlzLnBvcG92ZXJTaG91bGRCZUhpZGRlbigpO1xuICAgIH1cbiAgfVxuXG4gIG9uU2hvdWxkT3BlblZpZXcgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlzVmlld1Zpc2libGU6IHRydWUgfSk7XG4gIH1cblxuICBvblNob3VsZENsb3NlUG9wb3ZlciA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlzUG9wb3ZlclZpc2libGU6IGZhbHNlLFxuICAgIH0pO1xuICB9XG5cbiAgb25DYW5jZWxlZFZpZXcgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpc1BvcG92ZXJWaXNpYmxlOiBmYWxzZSxcbiAgICAgIGlzVmlld1Zpc2libGU6IGZhbHNlLFxuICAgIH0pO1xuICB9XG5cbiAgb25TZWxlY3RlZEluVmlldyA9IChncm91cE5hbWUsIHNlbGVjdGVkSXRlbXMsIGNoZWNrZWRPdXRwdXQsIGZsYWdzKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ZWRJdGVtID0ge1xuICAgICAgbmFtZTogZ3JvdXBOYW1lLFxuICAgICAgaXRlbXM6IHNlbGVjdGVkSXRlbXMsXG4gICAgfTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHByZUNoZWNrZWRJdGVtczogY2hlY2tlZE91dHB1dCxcbiAgICB9KTtcbiAgICB0aGlzLm9uU2VsZWN0SGFuZGxlcihncm91cE5hbWUsIHNlbGVjdGVkSXRlbSwgY2hlY2tlZE91dHB1dCwgZmxhZ3MpO1xuICB9XG5cbiAgb25TZWxlY3RlZEluUG9wb3ZlciA9IChzZWxlY3RlZEl0ZW0sIGZsYWdzKSA9PiB7XG4gICAgdGhpcy51bmNoZWNrQWxsSXRlbXMoKTtcbiAgICBjb25zdCBjaGVja2VkT3V0cHV0ID0gc2VsZWN0ZWRJdGVtICYmIEFycmF5LmlzQXJyYXkoc2VsZWN0ZWRJdGVtLml0ZW1zKSA/XG4gICAgICBzZWxlY3RlZEl0ZW0uaXRlbXMgOiBbXTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHByZUNoZWNrZWRJdGVtczogY2hlY2tlZE91dHB1dCxcbiAgICB9KTtcbiAgICB0aGlzLm9uU2VsZWN0SGFuZGxlcihzZWxlY3RlZEl0ZW0ubmFtZSwgc2VsZWN0ZWRJdGVtLCBjaGVja2VkT3V0cHV0LCBmbGFncyk7XG4gIH1cblxuICBvbkNsZWFySGFuZGxlciA9ICgpID0+IHtcbiAgICBjb25zdCBncm91cE5hbWUgPSBudWxsO1xuICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IG51bGw7XG4gICAgY29uc3QgY2hlY2tlZE91dHB1dCA9IG51bGw7XG4gICAgY29uc3QgZmxhZ3MgPSB7IGludGVyYWN0aXZlOiB0cnVlIH07XG4gICAgdGhpcy5vblNlbGVjdEhhbmRsZXIoZ3JvdXBOYW1lLCBzZWxlY3RlZEl0ZW0sIGNoZWNrZWRPdXRwdXQsIGZsYWdzKTtcbiAgfVxuXG4gIGdldENsZWFyQnV0dG9uID0gKCkgPT4ge1xuICAgIGlmIChcbiAgICAgICF0aGlzLnByb3BzLmlzQ2xlYXJhYmxlXG4gICAgICB8fCAhdGhpcy5zdGF0ZS5zZWxlY3RlZFxuICAgICAgfHwgIXRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXNcbiAgICAgIHx8ICF0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLmxlbmd0aFxuICAgICkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJyZXNldFwiXG4gICAgICAgIGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1saXN0LWNsZWFyLWJ0blwiXG4gICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGVhckhhbmRsZXJ9XG4gICAgICA+XG4gICAgICAgIDxGYUNsb3NlIC8+XG4gICAgICA8L2J1dHRvbj5cbiAgICApO1xuICB9XG5cbiAgZ2V0SW5wdXRUZXh0ID0gKCkgPT4ge1xuICAgIGxldCBzZWxlY3Rpb25UZXh0ID0gJyc7XG5cbiAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3RlZCAmJiB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zICYmIHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgc2VsZWN0aW9uVGV4dCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWQubmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGlvblRleHQ7XG4gIH1cblxuICBnZXRWaWV3ID0gKCkgPT4ge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLnByb3BzLnZpZXdPcHRpb25zO1xuICAgIGNvbnN0IHByZUNoZWNrZWRJdGVtcyA9IEFycmF5LmlzQXJyYXkodGhpcy5zdGF0ZS5wcmVDaGVja2VkSXRlbXMpID9cbiAgICAgIHRoaXMuc3RhdGUucHJlQ2hlY2tlZEl0ZW1zLnNsaWNlKCkgOiBudWxsO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxIU1ZpZXdcbiAgICAgICAgZGF0YVNvdXJjZVByb3ZpZGVyPXt0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlcn1cbiAgICAgICAgey4uLm9wdGlvbnN9XG4gICAgICAgIG9uQ2FuY2VsPXt0aGlzLm9uQ2FuY2VsZWRWaWV3fVxuICAgICAgICBvblNlbGVjdD17dGhpcy5vblNlbGVjdGVkSW5WaWV3fVxuICAgICAgICBvbkhlbHA9e3RoaXMucHJvcHMub25IZWxwfVxuICAgICAgICBncm91cE5hbWU9e3RoaXMuc3RhdGUuc2VsZWN0ZWQgPyB0aGlzLnN0YXRlLnNlbGVjdGVkLm5hbWUgOiAnJ31cbiAgICAgICAgcHJlQ2hlY2tlZEl0ZW1zPXtwcmVDaGVja2VkSXRlbXN9XG4gICAgICAgIGlzQ2xlYXJhYmxlPXt0aGlzLnByb3BzLmlzQ2xlYXJhYmxlfVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgZ2V0UG9wb3ZlciA9ICgpID0+IHtcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5wcm9wcy5wb3BvdmVyT3B0aW9ucztcblxuICAgIHJldHVybiAoPEhTUG9wb3ZlclxuICAgICAgZGF0YVNvdXJjZVByb3ZpZGVyPXt0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlcn1cbiAgICAgIG9uQ29tcG9uZW50Qmx1cj17dGhpcy5vblBvcG92ZXJCbHVyfVxuICAgICAgb25TZWxlY3Q9e3RoaXMub25TZWxlY3RlZEluUG9wb3Zlcn1cbiAgICAgIG9uU2hvdWxkT3BlblZpZXc9e3RoaXMub25TaG91bGRPcGVuVmlld31cbiAgICAgIG9uU2hvdWxkQ2xvc2VQb3BvdmVyPXt0aGlzLm9uU2hvdWxkQ2xvc2VQb3BvdmVyfVxuICAgICAgey4uLm9wdGlvbnN9XG4gICAgLz4pO1xuICB9XG5cbiAgZ2V0VG9vbFRpcCA9IGNvbnRlbnQgPT4gPFRvb2x0aXAgaWQ9XCJ0b29sdGlwXCIgY2xhc3NOYW1lPVwiaHMtY29tYm8tYm94LXRvb2x0aXBcIj57Y29udGVudH08L1Rvb2x0aXA+O1xuXG4gIGdldERlZmF1bHRUb29sVGlwQ29udGVudCA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNTZWxlY3RlZEl0ZW1zKCkpIHJldHVybiB0aGlzLnByb3BzLm5vU2VsZWN0aW9uVGV4dDtcbiAgICBjb25zdCB0b3RhbENvdW50ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5sZW5ndGg7XG4gICAgY29uc3QgY291bnQgPSB0b3RhbENvdW50ID4gTUFYX0NPVU5UX09GX1RPT0xUSVBfSVRFTVMgPyBNQVhfQ09VTlRfT0ZfVE9PTFRJUF9JVEVNUyA6IHRvdGFsQ291bnQ7XG5cbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMuc2xpY2UoMCwgY291bnQpO1xuICAgIGNvbnN0IGVsZW1lbnRzID0gT2JqZWN0LmtleXMoaXRlbXMpLm1hcChpID0+ICh0aGlzLnByb3BzLnRvb2x0aXBJdGVtUmVuZGVyRnVuY3Rpb24gP1xuICAgICAgdGhpcy5wcm9wcy50b29sdGlwSXRlbVJlbmRlckZ1bmN0aW9uKGl0ZW1zW2ldLCBpLCB0aGlzLmRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24pIDpcbiAgICAgIHRoaXMuZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbihpdGVtc1tpXSwgaSkpKTtcbiAgICBpZiAoY291bnQgPCB0b3RhbENvdW50KSBlbGVtZW50cy5wdXNoKDxwIGtleT17Y291bnR9Pi4gLiAuPC9wPik7XG5cbiAgICByZXR1cm4gZWxlbWVudHM7XG4gIH1cblxuICBnZXRDb3VudE9mU2VsZWN0ZWRJdGVtcyA9ICgpID0+ICh0aGlzLmlzU2VsZWN0ZWRJdGVtcygpID8gdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5sZW5ndGggOiAwKTtcblxuICBzZXRQb3BvdmVyVmlzaWJpbGl0eSA9IChpc1Zpc2libGUpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgaXNQb3BvdmVyVmlzaWJsZTogaXNWaXNpYmxlIH0pO1xuICB9XG5cbiAgZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbiA9IChpdGVtLCBrZXkpID0+ICg8cCBrZXk9e2tleX0+e2l0ZW0ubmFtZX08L3A+KTtcblxuICBpc1NlbGVjdGVkSXRlbXMgPSAoKSA9PiAoXG4gICAgdGhpcy5zdGF0ZS5zZWxlY3RlZCAmJiB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zICYmIHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMubGVuZ3RoID4gMFxuICApO1xuXG4gIGxvYWREYXRhID0gKHByb3BzKSA9PiB7XG4gICAgcHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmxvYWREYXRhKCkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbmVlZFRvTG9hZERhdGE6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwb3BvdmVyU2hvdWxkQmVIaWRkZW4gPSAoKSA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5pc1BvcG92ZXJWaXNpYmxlKSB0aGlzLnNldFBvcG92ZXJWaXNpYmlsaXR5KGZhbHNlKTtcbiAgICB9LCAxNTApO1xuICB9XG5cbiAgdW5jaGVja0FsbEl0ZW1zID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcHJlQ2hlY2tlZEl0ZW1zOiBbXSxcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVByZWNoZWNrZWQgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IGRhdGFTb3VyY2VQcm92aWRlciwgcHJlQ2hlY2tlZEdyb3VwTmFtZSwgcHJlQ2hlY2tlZEl0ZW1zIH0gPSBwcm9wcztcblxuICAgIGRhdGFTb3VyY2VQcm92aWRlci5zZXRQcmVjaGVja2VkSXRlbXMocHJlQ2hlY2tlZEl0ZW1zKTtcblxuICAgIGNvbnN0IGNoZWNrZWRPdXRwdXQgPSBkYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZE91dHB1dCgpO1xuICAgIGNvbnN0IHNlbGVjdGVkSXRlbXMgPSBkYXRhU291cmNlUHJvdmlkZXIuZ2V0QWxsQ2hlY2tlZEl0ZW1zKCk7XG4gICAgY29uc3QgY2hlY2tlZCA9IGNoZWNrZWRPdXRwdXQuY2hlY2tlZCB8fCBbXTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZDogZmFsc2UsXG4gICAgfSk7XG5cbiAgICB0aGlzLm9uU2VsZWN0ZWRJblZpZXcocHJlQ2hlY2tlZEdyb3VwTmFtZSwgc2VsZWN0ZWRJdGVtcywgY2hlY2tlZCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBpbnB1dE5hbWUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaW5wdXRPcHRpb25zID0ge1xuICAgICAgb25Gb2N1czogdGhpcy5vbklucHV0Rm9jdXMsXG4gICAgICB0eXBlOiAndGV4dCcsXG4gICAgICBwbGFjZWhvbGRlcjogdGhpcy5wcm9wcy5ub1NlbGVjdGlvblRleHQsXG4gICAgICByZWFkT25seTogdHJ1ZSxcbiAgICAgIHJlZjogKGlucHV0KSA9PiB7IHRoaXMuaW5wdXRFbGVtZW50ID0gaW5wdXQ7IH0sXG4gICAgICB2YWx1ZTogdGhpcy5nZXRJbnB1dFRleHQoKSxcbiAgICAgIG9uQ2xpY2s6IHRoaXMub25DbGlja0hhbmRsZXIsXG4gICAgfTtcblxuICAgIGlmIChpbnB1dE5hbWUudHJpbSgpICE9PSAnJykge1xuICAgICAgaW5wdXRPcHRpb25zLm5hbWUgPSBpbnB1dE5hbWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWxpc3Qtd3JhcHBlclwiPlxuICAgICAgICA8T3ZlcmxheVRyaWdnZXJcbiAgICAgICAgICBkZWxheT17VE9PTFRJUF9ERUxBWV9NU31cbiAgICAgICAgICBwbGFjZW1lbnQ9e3RoaXMucHJvcHMudG9vbHRpcFBsYWNlbWVudH1cbiAgICAgICAgICBvdmVybGF5PXt0aGlzLmdldFRvb2xUaXAodGhpcy5nZXREZWZhdWx0VG9vbFRpcENvbnRlbnQoKSl9XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1saXN0XCI+XG4gICAgICAgICAgICA8aW5wdXQgey4uLmlucHV0T3B0aW9uc30gLz5cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLm5lZWRUb0xvYWREYXRhID9cbiAgICAgICAgICAgICAgPFNwaW5uZXIgLz4gOlxuICAgICAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgPEhTQmFkZ2UgY2xhc3NOYW1lPVwiYmFkZ2Utb3JhbmdlXCI+e3RoaXMuZ2V0Q291bnRPZlNlbGVjdGVkSXRlbXMoKX08L0hTQmFkZ2U+XG4gICAgICAgICAgICAgICAge3RoaXMuZ2V0Q2xlYXJCdXR0b24oKX1cbiAgICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLnN0YXRlLm5lZWRUb0xvYWREYXRhfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItbGlzdC1idG5cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tIYW5kbGVyfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8RmFDaGV2cm9uRG93biAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvT3ZlcmxheVRyaWdnZXI+XG4gICAgICAgIHsgdGhpcy5zdGF0ZS5pc1BvcG92ZXJWaXNpYmxlID8gdGhpcy5nZXRQb3BvdmVyKCkgOiBudWxsIH1cbiAgICAgICAgeyB0aGlzLnN0YXRlLmlzVmlld1Zpc2libGUgPyB0aGlzLmdldFZpZXcoKSA6IG51bGwgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5IaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94LnByb3BUeXBlcyA9IHtcbiAgZGF0YVNvdXJjZVByb3ZpZGVyOiBkYXRhU291cmNlUHJvdmlkZXJUeXBlLmlzUmVxdWlyZWQsXG4gIGhpZGVPblBvcG92ZXJCbHVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgaW5wdXROYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBub1NlbGVjdGlvblRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHBvcG92ZXJWaXNpYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgcG9wb3Zlck9wdGlvbnM6IHBvcG92ZXJPcHRpb25zVHlwZS5pc1JlcXVpcmVkLFxuICBwcmVDaGVja2VkSXRlbXM6IHByZUNoZWNrZWRJdGVtc0xpc3RTaGFwZSxcbiAgcHJlQ2hlY2tlZEdyb3VwTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgdG9vbHRpcFBsYWNlbWVudDogUHJvcFR5cGVzLnN0cmluZyxcbiAgdmlld09wdGlvbnM6IHZpZXdPcHRpb25zVHlwZS5pc1JlcXVpcmVkLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uSGVscDogUHJvcFR5cGVzLmZ1bmMsXG4gIHRvb2x0aXBJdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICBpc0NsZWFyYWJsZTogUHJvcFR5cGVzLmJvb2wsXG59O1xuXG5IaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94LmRlZmF1bHRQcm9wcyA9IHtcbiAgaGlkZU9uUG9wb3ZlckJsdXI6IHRydWUsXG4gIGlucHV0TmFtZTogJycsXG4gIG5vU2VsZWN0aW9uVGV4dDogJ05vdGhpbmcgc2VsZWN0ZWQuLi4nLFxuICBwb3BvdmVyVmlzaWJsZTogZmFsc2UsXG4gIHByZUNoZWNrZWRJdGVtczogbnVsbCxcbiAgcHJlQ2hlY2tlZEdyb3VwTmFtZTogJ0RlZmF1bHQgZ3JvdXAnLFxuICB0b29sdGlwUGxhY2VtZW50OiAnYm90dG9tJyxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBvbkhlbHA6ICgpID0+IHt9LFxuICB0b29sdGlwSXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxuICBpc0NsZWFyYWJsZTogZmFsc2UsXG59O1xuIl19