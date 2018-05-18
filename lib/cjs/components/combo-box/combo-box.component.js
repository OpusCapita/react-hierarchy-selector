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
  onSelect: function onSelect() {},
  onHelp: function onHelp() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbWJvLWJveC9jb21iby1ib3guY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJIaWVyYXJjaHlTZWxlY3RvckNvbWJvQm94IiwicHJvcHMiLCJpc0RhdGFMb2FkZWQiLCJkYXRhU291cmNlUHJvdmlkZXIiLCJpc0xvYWRlZCIsIm5lZWRUb1VwZGF0ZVByZUNoZWNrZWQiLCJwcmVDaGVja2VkSXRlbXMiLCJsZW5ndGgiLCJuZWVkVG9Mb2FkRGF0YSIsInN0YXRlIiwic2VsZWN0ZWQiLCJpc1BvcG92ZXJWaXNpYmxlIiwicG9wb3ZlclZpc2libGUiLCJpc1ZpZXdWaXNpYmxlIiwiY29tcG9uZW50V2lsbE1vdW50IiwibG9hZERhdGEiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwic2V0U3RhdGUiLCJjb21wb25lbnRXaWxsVXBkYXRlIiwibmV4dFN0YXRlIiwidXBkYXRlUHJlY2hlY2tlZCIsInJlbmRlciIsImlucHV0TmFtZSIsImlucHV0T3B0aW9ucyIsIm9uRm9jdXMiLCJvbklucHV0Rm9jdXMiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJub1NlbGVjdGlvblRleHQiLCJyZWFkT25seSIsInJlZiIsImlucHV0IiwiaW5wdXRFbGVtZW50IiwidmFsdWUiLCJnZXRJbnB1dFRleHQiLCJ0cmltIiwibmFtZSIsInRvb2x0aXBQbGFjZW1lbnQiLCJnZXRUb29sVGlwIiwiZ2V0RGVmYXVsdFRvb2xUaXBDb250ZW50IiwiZ2V0Q291bnRPZlNlbGVjdGVkSXRlbXMiLCJvbkNsaWNrSGFuZGxlciIsImdldFBvcG92ZXIiLCJnZXRWaWV3IiwiUHVyZUNvbXBvbmVudCIsInNldFBvcG92ZXJWaXNpYmlsaXR5IiwiYmx1ciIsIm9uU2VsZWN0SGFuZGxlciIsImdyb3VwTmFtZSIsInNlbGVjdGVkSXRlbSIsImNoZWNrZWRPdXRwdXQiLCJpdGVtcyIsIm1hcCIsIk9iamVjdCIsImFzc2lnbiIsIml0ZW0iLCJvblNlbGVjdCIsIm9uUG9wb3ZlckJsdXIiLCJoaWRlT25Qb3BvdmVyQmx1ciIsInBvcG92ZXJTaG91bGRCZUhpZGRlbiIsIm9uU2hvdWxkT3BlblZpZXciLCJvblNob3VsZENsb3NlUG9wb3ZlciIsIm9uQ2FuY2VsZWRWaWV3Iiwib25TZWxlY3RlZEluVmlldyIsInNlbGVjdGVkSXRlbXMiLCJvblNlbGVjdGVkSW5Qb3BvdmVyIiwidW5jaGVja0FsbEl0ZW1zIiwiQXJyYXkiLCJpc0FycmF5IiwiaWQiLCJsZXZlbCIsInBhcmVudElkIiwicGFyZW50SWRzIiwiaXNDaGVja2VkQWxsIiwiaXNDaGlsZHJlbiIsInNlbGVjdGlvblRleHQiLCJvcHRpb25zIiwidmlld09wdGlvbnMiLCJzbGljZSIsIm9uSGVscCIsInBvcG92ZXJPcHRpb25zIiwiY29udGVudCIsImlzU2VsZWN0ZWRJdGVtcyIsInRvdGFsQ291bnQiLCJjb3VudCIsImVsZW1lbnRzIiwia2V5cyIsImkiLCJwdXNoIiwiaXNWaXNpYmxlIiwidGhlbiIsInNldFRpbWVvdXQiLCJwcmVDaGVja2VkR3JvdXBOYW1lIiwic2V0UHJlY2hlY2tlZEl0ZW1zIiwiZ2V0Q2hlY2tlZE91dHB1dCIsImdldEFsbENoZWNrZWRJdGVtcyIsImNoZWNrZWQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7cUNBQUE7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFHQTs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEseUI7OztBQUNuQixxQ0FBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQTs7QUFHakIsUUFBTUMsZUFBZUQsTUFBTUUsa0JBQU4sQ0FBeUJDLFFBQTlDO0FBQ0EsUUFBTUMseUJBQXlCSixNQUFNSyxlQUFOLElBQXlCTCxNQUFNSyxlQUFOLENBQXNCQyxNQUE5RTtBQUNBLFFBQU1DLGlC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bnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby11bnVzZWQtc3RhdGUgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFRvb2x0aXAsIE92ZXJsYXlUcmlnZ2VyIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgRmFDaGV2cm9uRG93biBmcm9tICdyZWFjdC1pY29ucy9saWIvZmEvY2hldnJvbi1kb3duJztcbmltcG9ydCB7IGRhdGFTb3VyY2VQcm92aWRlclR5cGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90eXBlcyc7XG5pbXBvcnQgeyBwcmVDaGVja2VkSXRlbXNMaXN0U2hhcGUsIHBvcG92ZXJPcHRpb25zVHlwZSwgdmlld09wdGlvbnNUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IFNwaW5uZXIgZnJvbSAnLi4vc3Bpbm5lcic7XG5pbXBvcnQgSFNQb3BvdmVyIGZyb20gJy4uL3BvcG92ZXInO1xuaW1wb3J0IEhTVmlldyBmcm9tICcuLi92aWV3JztcbmltcG9ydCBIU0JhZGdlIGZyb20gJy4uL2JhZGdlJztcblxuXG5pbXBvcnQgeyBUT09MVElQX0RFTEFZX01TLCBNQVhfQ09VTlRfT0ZfVE9PTFRJUF9JVEVNUyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCAnLi9jb21iby1ib3guc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVNlbGVjdG9yQ29tYm9Cb3ggZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICBjb25zdCBpc0RhdGFMb2FkZWQgPSBwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuaXNMb2FkZWQ7XG4gICAgY29uc3QgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZCA9IHByb3BzLnByZUNoZWNrZWRJdGVtcyAmJiBwcm9wcy5wcmVDaGVja2VkSXRlbXMubGVuZ3RoO1xuICAgIGNvbnN0IG5lZWRUb0xvYWREYXRhID0gIWlzRGF0YUxvYWRlZCAmJiBuZWVkVG9VcGRhdGVQcmVDaGVja2VkO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG5lZWRUb0xvYWREYXRhLFxuICAgICAgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZCxcbiAgICAgIHByZUNoZWNrZWRJdGVtczogcHJvcHMucHJlQ2hlY2tlZEl0ZW1zLFxuICAgICAgc2VsZWN0ZWQ6IG51bGwsXG4gICAgICBpc1BvcG92ZXJWaXNpYmxlOiBwcm9wcy5wb3BvdmVyVmlzaWJsZSxcbiAgICAgIGlzVmlld1Zpc2libGU6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgY29uc3QgeyBuZWVkVG9Mb2FkRGF0YSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBpZiAobmVlZFRvTG9hZERhdGEpIHtcbiAgICAgIHRoaXMubG9hZERhdGEodGhpcy5wcm9wcyk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBjb25zdCB7IGRhdGFTb3VyY2VQcm92aWRlciwgcHJlQ2hlY2tlZEl0ZW1zIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKGRhdGFTb3VyY2VQcm92aWRlciAhPT0gbmV4dFByb3BzLmRhdGFTb3VyY2VQcm92aWRlcikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG5lZWRUb0xvYWREYXRhOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHByZUNoZWNrZWRJdGVtcyAhPT0gbmV4dFByb3BzLnByZUNoZWNrZWRJdGVtcykge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQ6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgY29uc3QgeyBuZWVkVG9Mb2FkRGF0YSwgbmVlZFRvVXBkYXRlUHJlQ2hlY2tlZCB9ID0gbmV4dFN0YXRlO1xuICAgIGlmIChuZWVkVG9Mb2FkRGF0YSkge1xuICAgICAgdGhpcy5sb2FkRGF0YShuZXh0UHJvcHMpO1xuICAgIH0gZWxzZSBpZiAobmVlZFRvVXBkYXRlUHJlQ2hlY2tlZCkge1xuICAgICAgdGhpcy51cGRhdGVQcmVjaGVja2VkKG5leHRQcm9wcyk7XG4gICAgfVxuICB9XG5cbiAgb25DbGlja0hhbmRsZXIgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRQb3BvdmVyVmlzaWJpbGl0eSghdGhpcy5zdGF0ZS5pc1BvcG92ZXJWaXNpYmxlKTtcbiAgfVxuXG4gIG9uSW5wdXRGb2N1cyA9ICgpID0+IHtcbiAgICB0aGlzLmlucHV0RWxlbWVudC5ibHVyKCk7XG4gIH1cblxuICBvblNlbGVjdEhhbmRsZXIgPSAoZ3JvdXBOYW1lLCBzZWxlY3RlZEl0ZW0sIGNoZWNrZWRPdXRwdXQpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkOiBzZWxlY3RlZEl0ZW0sXG4gICAgICBpc1BvcG92ZXJWaXNpYmxlOiBmYWxzZSxcbiAgICAgIGlzVmlld1Zpc2libGU6IGZhbHNlLFxuICAgIH0pO1xuICAgIGNvbnN0IGl0ZW1zID0gY2hlY2tlZE91dHB1dCA/IGNoZWNrZWRPdXRwdXQubWFwKGl0ZW0gPT4gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSkpIDogW107XG5cbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGl0ZW1zLCBncm91cE5hbWUpO1xuICB9XG5cbiAgb25Qb3BvdmVyQmx1ciA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5oaWRlT25Qb3BvdmVyQmx1cikge1xuICAgICAgdGhpcy5wb3BvdmVyU2hvdWxkQmVIaWRkZW4oKTtcbiAgICB9XG4gIH1cblxuICBvblNob3VsZE9wZW5WaWV3ID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBpc1ZpZXdWaXNpYmxlOiB0cnVlIH0pO1xuICB9XG5cbiAgb25TaG91bGRDbG9zZVBvcG92ZXIgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpc1BvcG92ZXJWaXNpYmxlOiBmYWxzZSxcbiAgICB9KTtcbiAgfVxuXG4gIG9uQ2FuY2VsZWRWaWV3ID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaXNQb3BvdmVyVmlzaWJsZTogZmFsc2UsXG4gICAgICBpc1ZpZXdWaXNpYmxlOiBmYWxzZSxcbiAgICB9KTtcbiAgfVxuXG4gIG9uU2VsZWN0ZWRJblZpZXcgPSAoZ3JvdXBOYW1lLCBzZWxlY3RlZEl0ZW1zLCBjaGVja2VkT3V0cHV0KSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ZWRJdGVtID0ge1xuICAgICAgbmFtZTogZ3JvdXBOYW1lLFxuICAgICAgaXRlbXM6IHNlbGVjdGVkSXRlbXMsXG4gICAgfTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHByZUNoZWNrZWRJdGVtczogY2hlY2tlZE91dHB1dCxcbiAgICB9KTtcbiAgICB0aGlzLm9uU2VsZWN0SGFuZGxlcihncm91cE5hbWUsIHNlbGVjdGVkSXRlbSwgY2hlY2tlZE91dHB1dCk7XG4gIH1cblxuICBvblNlbGVjdGVkSW5Qb3BvdmVyID0gKHNlbGVjdGVkSXRlbSkgPT4ge1xuICAgIHRoaXMudW5jaGVja0FsbEl0ZW1zKCk7XG4gICAgY29uc3QgY2hlY2tlZE91dHB1dCA9IHNlbGVjdGVkSXRlbSAmJiBBcnJheS5pc0FycmF5KHNlbGVjdGVkSXRlbS5pdGVtcykgP1xuICAgICAgc2VsZWN0ZWRJdGVtLml0ZW1zLm1hcChpdGVtID0+ICh7XG4gICAgICAgIGlkOiBpdGVtLmlkLFxuICAgICAgICBuYW1lOiBpdGVtLm5hbWUsXG4gICAgICAgIGxldmVsOiAwLFxuICAgICAgICBwYXJlbnRJZDogbnVsbCxcbiAgICAgICAgcGFyZW50SWRzOiBbXSxcbiAgICAgICAgaXNDaGVja2VkQWxsOiBmYWxzZSxcbiAgICAgICAgaXNDaGlsZHJlbjogZmFsc2UsXG4gICAgICB9KSlcbiAgICAgIDogW107XG4gICAgdGhpcy5vblNlbGVjdEhhbmRsZXIoc2VsZWN0ZWRJdGVtLCBjaGVja2VkT3V0cHV0KTtcbiAgfVxuXG4gIGdldElucHV0VGV4dCA9ICgpID0+IHtcbiAgICBsZXQgc2VsZWN0aW9uVGV4dCA9ICcnO1xuXG4gICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWQgJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcyAmJiB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgIHNlbGVjdGlvblRleHQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkLm5hbWU7XG4gICAgfVxuICAgIHJldHVybiBzZWxlY3Rpb25UZXh0O1xuICB9XG5cbiAgZ2V0VmlldyA9ICgpID0+IHtcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5wcm9wcy52aWV3T3B0aW9ucztcbiAgICBjb25zdCBwcmVDaGVja2VkSXRlbXMgPSBBcnJheS5pc0FycmF5KHRoaXMuc3RhdGUucHJlQ2hlY2tlZEl0ZW1zKSA/XG4gICAgICB0aGlzLnN0YXRlLnByZUNoZWNrZWRJdGVtcy5zbGljZSgpIDogbnVsbDtcblxuICAgIHJldHVybiAoXG4gICAgICA8SFNWaWV3XG4gICAgICAgIGRhdGFTb3VyY2VQcm92aWRlcj17dGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXJ9XG4gICAgICAgIHsuLi5vcHRpb25zfVxuICAgICAgICBvbkNhbmNlbD17dGhpcy5vbkNhbmNlbGVkVmlld31cbiAgICAgICAgb25TZWxlY3Q9e3RoaXMub25TZWxlY3RlZEluVmlld31cbiAgICAgICAgb25IZWxwPXt0aGlzLnByb3BzLm9uSGVscH1cbiAgICAgICAgZ3JvdXBOYW1lPXt0aGlzLnN0YXRlLnNlbGVjdGVkID8gdGhpcy5zdGF0ZS5zZWxlY3RlZC5uYW1lIDogJyd9XG4gICAgICAgIHByZUNoZWNrZWRJdGVtcz17cHJlQ2hlY2tlZEl0ZW1zfVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgZ2V0UG9wb3ZlciA9ICgpID0+IHtcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5wcm9wcy5wb3BvdmVyT3B0aW9ucztcblxuICAgIHJldHVybiAoPEhTUG9wb3ZlclxuICAgICAgZGF0YVNvdXJjZVByb3ZpZGVyPXt0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlcn1cbiAgICAgIG9uQ29tcG9uZW50Qmx1cj17dGhpcy5vblBvcG92ZXJCbHVyfVxuICAgICAgb25TZWxlY3Q9e3RoaXMub25TZWxlY3RlZEluUG9wb3Zlcn1cbiAgICAgIG9uU2hvdWxkT3BlblZpZXc9e3RoaXMub25TaG91bGRPcGVuVmlld31cbiAgICAgIG9uU2hvdWxkQ2xvc2VQb3BvdmVyPXt0aGlzLm9uU2hvdWxkQ2xvc2VQb3BvdmVyfVxuICAgICAgey4uLm9wdGlvbnN9XG4gICAgLz4pO1xuICB9XG5cbiAgZ2V0VG9vbFRpcCA9IGNvbnRlbnQgPT4gPFRvb2x0aXAgaWQ9XCJ0b29sdGlwXCIgY2xhc3NOYW1lPVwiaHMtY29tYm8tYm94LXRvb2x0aXBcIj57Y29udGVudH08L1Rvb2x0aXA+O1xuXG4gIGdldERlZmF1bHRUb29sVGlwQ29udGVudCA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNTZWxlY3RlZEl0ZW1zKCkpIHJldHVybiB0aGlzLnByb3BzLm5vU2VsZWN0aW9uVGV4dDtcbiAgICBjb25zdCB0b3RhbENvdW50ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5sZW5ndGg7XG4gICAgY29uc3QgY291bnQgPSB0b3RhbENvdW50ID4gTUFYX0NPVU5UX09GX1RPT0xUSVBfSVRFTVMgPyBNQVhfQ09VTlRfT0ZfVE9PTFRJUF9JVEVNUyA6IHRvdGFsQ291bnQ7XG5cbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuc3RhdGUuc2VsZWN0ZWQuaXRlbXMuc2xpY2UoMCwgY291bnQpO1xuICAgIGNvbnN0IGVsZW1lbnRzID0gT2JqZWN0LmtleXMoaXRlbXMpLm1hcChpID0+IDxwIGtleT17aX0+e2l0ZW1zW2ldLm5hbWV9PC9wPik7XG5cbiAgICBpZiAoY291bnQgPCB0b3RhbENvdW50KSBlbGVtZW50cy5wdXNoKDxwIGtleT17Y291bnR9Pi4gLiAuPC9wPik7XG5cbiAgICByZXR1cm4gZWxlbWVudHM7XG4gIH1cblxuICBnZXRDb3VudE9mU2VsZWN0ZWRJdGVtcyA9ICgpID0+ICh0aGlzLmlzU2VsZWN0ZWRJdGVtcygpID8gdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcy5sZW5ndGggOiAwKTtcblxuICBzZXRQb3BvdmVyVmlzaWJpbGl0eSA9IChpc1Zpc2libGUpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgaXNQb3BvdmVyVmlzaWJsZTogaXNWaXNpYmxlIH0pO1xuICB9XG5cbiAgaXNTZWxlY3RlZEl0ZW1zID0gKCkgPT4gKFxuICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWQgJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZC5pdGVtcyAmJiB0aGlzLnN0YXRlLnNlbGVjdGVkLml0ZW1zLmxlbmd0aCA+IDBcbiAgKTtcblxuICBsb2FkRGF0YSA9IChwcm9wcykgPT4ge1xuICAgIHByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5sb2FkRGF0YSgpLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG5lZWRUb0xvYWREYXRhOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcG9wb3ZlclNob3VsZEJlSGlkZGVuID0gKCkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuc3RhdGUuaXNQb3BvdmVyVmlzaWJsZSkgdGhpcy5zZXRQb3BvdmVyVmlzaWJpbGl0eShmYWxzZSk7XG4gICAgfSwgMTUwKTtcbiAgfVxuXG4gIHVuY2hlY2tBbGxJdGVtcyA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHByZUNoZWNrZWRJdGVtczogW10sXG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVQcmVjaGVja2VkID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhU291cmNlUHJvdmlkZXIsIHByZUNoZWNrZWRHcm91cE5hbWUsIHByZUNoZWNrZWRJdGVtcyB9ID0gcHJvcHM7XG5cbiAgICBkYXRhU291cmNlUHJvdmlkZXIuc2V0UHJlY2hlY2tlZEl0ZW1zKHByZUNoZWNrZWRJdGVtcyk7XG5cbiAgICBjb25zdCBjaGVja2VkT3V0cHV0ID0gZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWRPdXRwdXQoKTtcbiAgICBjb25zdCBzZWxlY3RlZEl0ZW1zID0gZGF0YVNvdXJjZVByb3ZpZGVyLmdldEFsbENoZWNrZWRJdGVtcygpO1xuICAgIGNvbnN0IGNoZWNrZWQgPSBjaGVja2VkT3V0cHV0LmNoZWNrZWQgfHwgW107XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG5lZWRUb1VwZGF0ZVByZUNoZWNrZWQ6IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5vblNlbGVjdGVkSW5WaWV3KHByZUNoZWNrZWRHcm91cE5hbWUsIHNlbGVjdGVkSXRlbXMsIGNoZWNrZWQpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaW5wdXROYW1lIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGlucHV0T3B0aW9ucyA9IHtcbiAgICAgIG9uRm9jdXM6IHRoaXMub25JbnB1dEZvY3VzLFxuICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucHJvcHMubm9TZWxlY3Rpb25UZXh0LFxuICAgICAgcmVhZE9ubHk6IHRydWUsXG4gICAgICByZWY6IChpbnB1dCkgPT4geyB0aGlzLmlucHV0RWxlbWVudCA9IGlucHV0OyB9LFxuICAgICAgdmFsdWU6IHRoaXMuZ2V0SW5wdXRUZXh0KCksXG4gICAgfTtcblxuICAgIGlmIChpbnB1dE5hbWUudHJpbSgpICE9PSAnJykge1xuICAgICAgaW5wdXRPcHRpb25zLm5hbWUgPSBpbnB1dE5hbWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWxpc3Qtd3JhcHBlclwiPlxuICAgICAgICA8T3ZlcmxheVRyaWdnZXJcbiAgICAgICAgICBkZWxheT17VE9PTFRJUF9ERUxBWV9NU31cbiAgICAgICAgICBwbGFjZW1lbnQ9e3RoaXMucHJvcHMudG9vbHRpcFBsYWNlbWVudH1cbiAgICAgICAgICBvdmVybGF5PXt0aGlzLmdldFRvb2xUaXAodGhpcy5nZXREZWZhdWx0VG9vbFRpcENvbnRlbnQoKSl9XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1saXN0XCI+XG4gICAgICAgICAgICA8aW5wdXQgey4uLmlucHV0T3B0aW9uc30gLz5cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLm5lZWRUb0xvYWREYXRhID9cbiAgICAgICAgICAgICAgPFNwaW5uZXIgLz4gOlxuICAgICAgICAgICAgICA8SFNCYWRnZSBjbGFzc05hbWU9XCJiYWRnZS1vcmFuZ2VcIj57dGhpcy5nZXRDb3VudE9mU2VsZWN0ZWRJdGVtcygpfTwvSFNCYWRnZT5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRpc2FibGVkPXt0aGlzLnN0YXRlLm5lZWRUb0xvYWREYXRhfSBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItbGlzdC1idG5cIiBvbkNsaWNrPXt0aGlzLm9uQ2xpY2tIYW5kbGVyfT48RmFDaGV2cm9uRG93biAvPjwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L092ZXJsYXlUcmlnZ2VyPlxuICAgICAgICB7IHRoaXMuc3RhdGUuaXNQb3BvdmVyVmlzaWJsZSA/IHRoaXMuZ2V0UG9wb3ZlcigpIDogbnVsbCB9XG4gICAgICAgIHsgdGhpcy5zdGF0ZS5pc1ZpZXdWaXNpYmxlID8gdGhpcy5nZXRWaWV3KCkgOiBudWxsIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuSGllcmFyY2h5U2VsZWN0b3JDb21ib0JveC5wcm9wVHlwZXMgPSB7XG4gIGRhdGFTb3VyY2VQcm92aWRlcjogZGF0YVNvdXJjZVByb3ZpZGVyVHlwZS5pc1JlcXVpcmVkLFxuICBoaWRlT25Qb3BvdmVyQmx1cjogUHJvcFR5cGVzLmJvb2wsXG4gIGlucHV0TmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgbm9TZWxlY3Rpb25UZXh0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICBwb3BvdmVyVmlzaWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gIHBvcG92ZXJPcHRpb25zOiBwb3BvdmVyT3B0aW9uc1R5cGUuaXNSZXF1aXJlZCxcbiAgcHJlQ2hlY2tlZEl0ZW1zOiBwcmVDaGVja2VkSXRlbXNMaXN0U2hhcGUsXG4gIHByZUNoZWNrZWRHcm91cE5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHRvb2x0aXBQbGFjZW1lbnQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHZpZXdPcHRpb25zOiB2aWV3T3B0aW9uc1R5cGUuaXNSZXF1aXJlZCxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBvbkhlbHA6IFByb3BUeXBlcy5mdW5jLFxufTtcblxuSGllcmFyY2h5U2VsZWN0b3JDb21ib0JveC5kZWZhdWx0UHJvcHMgPSB7XG4gIGhpZGVPblBvcG92ZXJCbHVyOiB0cnVlLFxuICBpbnB1dE5hbWU6ICcnLFxuICBub1NlbGVjdGlvblRleHQ6ICdObyBvbmUgc2VsZWN0ZWQuLi4nLFxuICBwb3BvdmVyVmlzaWJsZTogZmFsc2UsXG4gIHByZUNoZWNrZWRJdGVtczogbnVsbCxcbiAgcHJlQ2hlY2tlZEdyb3VwTmFtZTogJ0RlZmF1bHQgZ3JvdXAnLFxuICB0b29sdGlwUGxhY2VtZW50OiAnYm90dG9tJyxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBvbkhlbHA6ICgpID0+IHt9LFxufTtcbiJdfQ==