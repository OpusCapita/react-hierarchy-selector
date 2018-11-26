'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSearchbar = require('@opuscapita/react-searchbar');

var _reactSearchbar2 = _interopRequireDefault(_reactSearchbar);

var _types = require('../../services/types');

var _search = require('../../models/search');

var _search2 = _interopRequireDefault(_search);

var _group = require('../../models/group.entity');

var _group2 = _interopRequireDefault(_group);

var _common = require('./layouts/common.layout');

var _common2 = _interopRequireDefault(_common);

var _spinner = require('./layouts/spinner.layout');

var _spinner2 = _interopRequireDefault(_spinner);

var _selectBtn = require('./select-btn.component');

var _selectBtn2 = _interopRequireDefault(_selectBtn);

var _searchContent = require('./search/search-content.component');

var _searchContent2 = _interopRequireDefault(_searchContent);

var _eventHandlers = require('./event-handlers');

var _eventHandlers2 = _interopRequireDefault(_eventHandlers);

var _constants = require('./constants');

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

require('./popover.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

var HierarchySelectorPopover = function (_React$PureComponent) {
  _inherits(HierarchySelectorPopover, _React$PureComponent);

  function HierarchySelectorPopover(props) {
    _classCallCheck(this, HierarchySelectorPopover);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.onFocusOutHandler = function (e) {
      if (!_utils2.default.isFocusOnCurrentTarget(e)) _this.props.onComponentBlur();
    };

    _this.onSearchChangeHandler = function (searchingFor) {
      return _this.setState({ searchingFor: searchingFor });
    };

    _this.onSelectHandler = function (data) {
      var model = null;

      if (data) {
        var groupName = data.name ? data.name : 'Undefined';
        var items = Array.isArray(data) ? data : [data];
        model = new _group2.default(groupName, items);
      }
      _this.props.onSelect(model);
    };

    _this.onKeyDownHanlder = function (e) {
      _eventHandlers2.default.searchElementFocusHanlder(e);
    };

    _this.getSearchElement = function () {
      return _react2.default.createElement(_reactSearchbar2.default, {
        onSearch: _this.onSearchChangeHandler,
        inputClassName: _constants.CLASS_NAME_SEARCH_FOCUSABLE,
        searchPlaceHolder: _this.props.searchPlaceHolder,
        onCloseClick: _this.props.onShouldClosePopover,
        dynamicSearchStartsFrom: 3,
        value: _this.state.searchingFor,
        tooltip: _this.props.searchTooltip
      });
    };

    _this.getLists = function () {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_selectBtn2.default, { label: _this.props.btnOpenViewLabel, onClick: _this.props.onShouldOpenView })
      );
    };

    _this.getSearchLayout = function () {
      var searchModel = new _search2.default(_this.props.dataSourceProvider);
      var foundItems = searchModel.getFoundFromHierarchy(_this.state.searchingFor);

      return _react2.default.createElement(_searchContent2.default, {
        foundItems: foundItems,
        onSelect: function onSelect(data) {
          return _this.onSelectHandler(data);
        },
        itemRenderFunction: _this.props.foundItemRenderFunction
      });
    };

    _this.getMainLayout = function () {
      return _react2.default.createElement(
        _common2.default,
        null,
        _this.getSearchElement(),
        _this.state.searchingFor !== '' ? _this.getSearchLayout() : _this.getLists()
      );
    };

    _this.state = {
      isDataLoaded: props.dataSourceProvider.isLoaded,
      searchingFor: ''
    };
    return _this;
  }

  HierarchySelectorPopover.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    if (!this.state.isDataLoaded) {
      this.props.dataSourceProvider.loadData().then(function () {
        _this2.setState({ isDataLoaded: true });
      });
    }
  };

  HierarchySelectorPopover.prototype.componentDidMount = function componentDidMount() {
    this.mainElement.focus();
    this.mainElement.addEventListener('focusout', this.onFocusOutHandler);
  };

  HierarchySelectorPopover.prototype.componentWillUnmount = function componentWillUnmount() {
    this.mainElement.removeEventListener('focusout', this.onFocusOutHandler);
  };

  HierarchySelectorPopover.prototype.render = function render() {
    var _this3 = this;

    return _react2.default.createElement(
      'div',
      {
        className: 'oc-hierarchy-selector-popover',
        tabIndex: '0',
        ref: function ref(el) {
          _this3.mainElement = el;
        }
      },
      this.state.isDataLoaded ? this.getMainLayout() : _react2.default.createElement(_spinner2.default, null)
    );
  };

  return HierarchySelectorPopover;
}(_react2.default.PureComponent);

exports.default = HierarchySelectorPopover;


HierarchySelectorPopover.defaultProps = {
  onComponentBlur: function onComponentBlur() {},
  onSelect: function onSelect() {},
  onShouldOpenView: function onShouldOpenView() {},
  onShouldClosePopover: function onShouldClosePopover() {},
  foundItemRenderFunction: null,
  btnOpenViewLabel: 'Select...',
  searchPlaceHolder: 'Search...',
  searchTooltip: null
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkhpZXJhcmNoeVNlbGVjdG9yUG9wb3ZlciIsInByb3BzIiwib25Gb2N1c091dEhhbmRsZXIiLCJlIiwiVXRpbHMiLCJpc0ZvY3VzT25DdXJyZW50VGFyZ2V0Iiwib25Db21wb25lbnRCbHVyIiwib25TZWFyY2hDaGFuZ2VIYW5kbGVyIiwic2V0U3RhdGUiLCJzZWFyY2hpbmdGb3IiLCJvblNlbGVjdEhhbmRsZXIiLCJkYXRhIiwibW9kZWwiLCJncm91cE5hbWUiLCJuYW1lIiwiaXRlbXMiLCJBcnJheSIsImlzQXJyYXkiLCJHcm91cEVudGl0eSIsIm9uU2VsZWN0Iiwib25LZXlEb3duSGFubGRlciIsIkV2ZW50SGFuZGxlciIsInNlYXJjaEVsZW1lbnRGb2N1c0hhbmxkZXIiLCJnZXRTZWFyY2hFbGVtZW50IiwiQ0xBU1NfTkFNRV9TRUFSQ0hfRk9DVVNBQkxFIiwic2VhcmNoUGxhY2VIb2xkZXIiLCJvblNob3VsZENsb3NlUG9wb3ZlciIsInN0YXRlIiwic2VhcmNoVG9vbHRpcCIsImdldExpc3RzIiwiYnRuT3BlblZpZXdMYWJlbCIsIm9uU2hvdWxkT3BlblZpZXciLCJnZXRTZWFyY2hMYXlvdXQiLCJzZWFyY2hNb2RlbCIsIlNlYXJjaCIsImRhdGFTb3VyY2VQcm92aWRlciIsImZvdW5kSXRlbXMiLCJnZXRGb3VuZEZyb21IaWVyYXJjaHkiLCJmb3VuZEl0ZW1SZW5kZXJGdW5jdGlvbiIsImdldE1haW5MYXlvdXQiLCJpc0RhdGFMb2FkZWQiLCJpc0xvYWRlZCIsImNvbXBvbmVudFdpbGxNb3VudCIsImxvYWREYXRhIiwidGhlbiIsImNvbXBvbmVudERpZE1vdW50IiwibWFpbkVsZW1lbnQiLCJmb2N1cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJlbCIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7OytlQWxCQTtBQUNBOztJQW1CcUJBLHdCOzs7QUFDbkIsb0NBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsZ0NBQU1BLEtBQU4sQ0FEaUI7O0FBQUEsVUF5Qm5CQyxpQkF6Qm1CLEdBeUJDLFVBQUNDLENBQUQsRUFBTztBQUN6QixVQUFJLENBQUNDLGdCQUFNQyxzQkFBTixDQUE2QkYsQ0FBN0IsQ0FBTCxFQUFzQyxNQUFLRixLQUFMLENBQVdLLGVBQVg7QUFDdkMsS0EzQmtCOztBQUFBLFVBNkJuQkMscUJBN0JtQixHQTZCSztBQUFBLGFBQWdCLE1BQUtDLFFBQUwsQ0FBYyxFQUFFQywwQkFBRixFQUFkLENBQWhCO0FBQUEsS0E3Qkw7O0FBQUEsVUErQm5CQyxlQS9CbUIsR0ErQkQsVUFBQ0MsSUFBRCxFQUFVO0FBQzFCLFVBQUlDLFFBQVEsSUFBWjs7QUFFQSxVQUFJRCxJQUFKLEVBQVU7QUFDUixZQUFNRSxZQUFZRixLQUFLRyxJQUFMLEdBQVlILEtBQUtHLElBQWpCLEdBQXdCLFdBQTFDO0FBQ0EsWUFBTUMsUUFBUUMsTUFBTUMsT0FBTixDQUFjTixJQUFkLElBQXNCQSxJQUF0QixHQUE2QixDQUFDQSxJQUFELENBQTNDO0FBQ0FDLGdCQUFRLElBQUlNLGVBQUosQ0FBZ0JMLFNBQWhCLEVBQTJCRSxLQUEzQixDQUFSO0FBQ0Q7QUFDRCxZQUFLZCxLQUFMLENBQVdrQixRQUFYLENBQW9CUCxLQUFwQjtBQUNELEtBeENrQjs7QUFBQSxVQTBDbkJRLGdCQTFDbUIsR0EwQ0EsVUFBQ2pCLENBQUQsRUFBTztBQUN4QmtCLDhCQUFhQyx5QkFBYixDQUF1Q25CLENBQXZDO0FBQ0QsS0E1Q2tCOztBQUFBLFVBOENuQm9CLGdCQTlDbUIsR0E4Q0E7QUFBQSxhQUNqQiw4QkFBQyx3QkFBRDtBQUNFLGtCQUFVLE1BQUtoQixxQkFEakI7QUFFRSx3QkFBZ0JpQixzQ0FGbEI7QUFHRSwyQkFBbUIsTUFBS3ZCLEtBQUwsQ0FBV3dCLGlCQUhoQztBQUlFLHNCQUFjLE1BQUt4QixLQUFMLENBQVd5QixvQkFKM0I7QUFLRSxpQ0FBeUIsQ0FMM0I7QUFNRSxlQUFPLE1BQUtDLEtBQUwsQ0FBV2xCLFlBTnBCO0FBT0UsaUJBQVMsTUFBS1IsS0FBTCxDQUFXMkI7QUFQdEIsUUFEaUI7QUFBQSxLQTlDQTs7QUFBQSxVQTBEbkJDLFFBMURtQixHQTBEUjtBQUFBLGFBQ1Q7QUFBQTtBQUFBO0FBQ0Usc0NBQUMsbUJBQUQsSUFBZ0IsT0FBTyxNQUFLNUIsS0FBTCxDQUFXNkIsZ0JBQWxDLEVBQW9ELFNBQVMsTUFBSzdCLEtBQUwsQ0FBVzhCLGdCQUF4RTtBQURGLE9BRFM7QUFBQSxLQTFEUTs7QUFBQSxVQWdFbkJDLGVBaEVtQixHQWdFRCxZQUFNO0FBQ3RCLFVBQU1DLGNBQWMsSUFBSUMsZ0JBQUosQ0FBVyxNQUFLakMsS0FBTCxDQUFXa0Msa0JBQXRCLENBQXBCO0FBQ0EsVUFBTUMsYUFBYUgsWUFBWUkscUJBQVosQ0FBa0MsTUFBS1YsS0FBTCxDQUFXbEIsWUFBN0MsQ0FBbkI7O0FBRUEsYUFDRSw4QkFBQyx1QkFBRDtBQUNFLG9CQUFZMkIsVUFEZDtBQUVFLGtCQUFVO0FBQUEsaUJBQVEsTUFBSzFCLGVBQUwsQ0FBcUJDLElBQXJCLENBQVI7QUFBQSxTQUZaO0FBR0UsNEJBQW9CLE1BQUtWLEtBQUwsQ0FBV3FDO0FBSGpDLFFBREY7QUFPRCxLQTNFa0I7O0FBQUEsVUE2RW5CQyxhQTdFbUIsR0E2RUg7QUFBQSxhQUNkO0FBQUMsd0JBQUQ7QUFBQTtBQUNHLGNBQUtoQixnQkFBTCxFQURIO0FBRUcsY0FBS0ksS0FBTCxDQUFXbEIsWUFBWCxLQUE0QixFQUE1QixHQUFpQyxNQUFLdUIsZUFBTCxFQUFqQyxHQUEwRCxNQUFLSCxRQUFMO0FBRjdELE9BRGM7QUFBQSxLQTdFRzs7QUFFakIsVUFBS0YsS0FBTCxHQUFhO0FBQ1hhLG9CQUFjdkMsTUFBTWtDLGtCQUFOLENBQXlCTSxRQUQ1QjtBQUVYaEMsb0JBQWM7QUFGSCxLQUFiO0FBRmlCO0FBTWxCOztxQ0FFRGlDLGtCLGlDQUFxQjtBQUFBOztBQUNuQixRQUFJLENBQUMsS0FBS2YsS0FBTCxDQUFXYSxZQUFoQixFQUE4QjtBQUM1QixXQUFLdkMsS0FBTCxDQUFXa0Msa0JBQVgsQ0FBOEJRLFFBQTlCLEdBQXlDQyxJQUF6QyxDQUE4QyxZQUFNO0FBQ2xELGVBQUtwQyxRQUFMLENBQWMsRUFBRWdDLGNBQWMsSUFBaEIsRUFBZDtBQUNELE9BRkQ7QUFHRDtBQUNGLEc7O3FDQUVESyxpQixnQ0FBb0I7QUFDbEIsU0FBS0MsV0FBTCxDQUFpQkMsS0FBakI7QUFDQSxTQUFLRCxXQUFMLENBQWlCRSxnQkFBakIsQ0FBa0MsVUFBbEMsRUFBOEMsS0FBSzlDLGlCQUFuRDtBQUNELEc7O3FDQUVEK0Msb0IsbUNBQXVCO0FBQ3JCLFNBQUtILFdBQUwsQ0FBaUJJLG1CQUFqQixDQUFxQyxVQUFyQyxFQUFpRCxLQUFLaEQsaUJBQXREO0FBQ0QsRzs7cUNBNkREaUQsTSxxQkFBUztBQUFBOztBQUNQLFdBQ0U7QUFBQTtBQUFBO0FBQ0UsbUJBQVUsK0JBRFo7QUFFRSxrQkFBUyxHQUZYO0FBR0UsYUFBSyxhQUFDQyxFQUFELEVBQVE7QUFBRSxpQkFBS04sV0FBTCxHQUFtQk0sRUFBbkI7QUFBd0I7QUFIekM7QUFLSSxXQUFLekIsS0FBTCxDQUFXYSxZQUFYLEdBQTBCLEtBQUtELGFBQUwsRUFBMUIsR0FBaUQsOEJBQUMsaUJBQUQ7QUFMckQsS0FERjtBQVNELEc7OztFQS9GbURjLGdCQUFNQyxhOztrQkFBdkN0RCx3Qjs7O0FBOEdyQkEseUJBQXlCdUQsWUFBekIsR0FBd0M7QUFDdENqRCxtQkFBaUIsMkJBQU0sQ0FBRSxDQURhO0FBRXRDYSxZQUFVLG9CQUFNLENBQUUsQ0FGb0I7QUFHdENZLG9CQUFrQiw0QkFBTSxDQUFFLENBSFk7QUFJdENMLHdCQUFzQixnQ0FBTSxDQUFFLENBSlE7QUFLdENZLDJCQUF5QixJQUxhO0FBTXRDUixvQkFBa0IsV0FOb0I7QUFPdENMLHFCQUFtQixXQVBtQjtBQVF0Q0csaUJBQWU7QUFSdUIsQ0FBeEMiLCJmaWxlIjoicG9wb3Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLW5vbmludGVyYWN0aXZlLXRhYmluZGV4ICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFNlYXJjaEJhciBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zZWFyY2hiYXInO1xuXG5pbXBvcnQgeyBkYXRhU291cmNlUHJvdmlkZXJUeXBlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdHlwZXMnO1xuaW1wb3J0IFNlYXJjaCBmcm9tICcuLi8uLi9tb2RlbHMvc2VhcmNoJztcbmltcG9ydCBHcm91cEVudGl0eSBmcm9tICcuLi8uLi9tb2RlbHMvZ3JvdXAuZW50aXR5JztcblxuaW1wb3J0IENvbW1vbkxheW91dCBmcm9tICcuL2xheW91dHMvY29tbW9uLmxheW91dCc7XG5pbXBvcnQgU3Bpbm5lckxheW91dCBmcm9tICcuL2xheW91dHMvc3Bpbm5lci5sYXlvdXQnO1xuaW1wb3J0IEhTU2VsZWN0QnV0dG9uIGZyb20gJy4vc2VsZWN0LWJ0bi5jb21wb25lbnQnO1xuaW1wb3J0IFBvcG92ZXJTZWFyY2hDb250ZW50IGZyb20gJy4vc2VhcmNoL3NlYXJjaC1jb250ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgRXZlbnRIYW5kbGVyIGZyb20gJy4vZXZlbnQtaGFuZGxlcnMnO1xuaW1wb3J0IHsgQ0xBU1NfTkFNRV9TRUFSQ0hfRk9DVVNBQkxFIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCAnLi9wb3BvdmVyLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlTZWxlY3RvclBvcG92ZXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzRGF0YUxvYWRlZDogcHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmlzTG9hZGVkLFxuICAgICAgc2VhcmNoaW5nRm9yOiAnJyxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGlmICghdGhpcy5zdGF0ZS5pc0RhdGFMb2FkZWQpIHtcbiAgICAgIHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmxvYWREYXRhKCkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0RhdGFMb2FkZWQ6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLm1haW5FbGVtZW50LmZvY3VzKCk7XG4gICAgdGhpcy5tYWluRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHRoaXMub25Gb2N1c091dEhhbmRsZXIpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5tYWluRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHRoaXMub25Gb2N1c091dEhhbmRsZXIpO1xuICB9XG5cbiAgb25Gb2N1c091dEhhbmRsZXIgPSAoZSkgPT4ge1xuICAgIGlmICghVXRpbHMuaXNGb2N1c09uQ3VycmVudFRhcmdldChlKSkgdGhpcy5wcm9wcy5vbkNvbXBvbmVudEJsdXIoKTtcbiAgfVxuXG4gIG9uU2VhcmNoQ2hhbmdlSGFuZGxlciA9IHNlYXJjaGluZ0ZvciA9PiB0aGlzLnNldFN0YXRlKHsgc2VhcmNoaW5nRm9yIH0pO1xuXG4gIG9uU2VsZWN0SGFuZGxlciA9IChkYXRhKSA9PiB7XG4gICAgbGV0IG1vZGVsID0gbnVsbDtcblxuICAgIGlmIChkYXRhKSB7XG4gICAgICBjb25zdCBncm91cE5hbWUgPSBkYXRhLm5hbWUgPyBkYXRhLm5hbWUgOiAnVW5kZWZpbmVkJztcbiAgICAgIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShkYXRhKSA/IGRhdGEgOiBbZGF0YV07XG4gICAgICBtb2RlbCA9IG5ldyBHcm91cEVudGl0eShncm91cE5hbWUsIGl0ZW1zKTtcbiAgICB9XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChtb2RlbCk7XG4gIH1cblxuICBvbktleURvd25IYW5sZGVyID0gKGUpID0+IHtcbiAgICBFdmVudEhhbmRsZXIuc2VhcmNoRWxlbWVudEZvY3VzSGFubGRlcihlKTtcbiAgfVxuXG4gIGdldFNlYXJjaEVsZW1lbnQgPSAoKSA9PiAoXG4gICAgPFNlYXJjaEJhclxuICAgICAgb25TZWFyY2g9e3RoaXMub25TZWFyY2hDaGFuZ2VIYW5kbGVyfVxuICAgICAgaW5wdXRDbGFzc05hbWU9e0NMQVNTX05BTUVfU0VBUkNIX0ZPQ1VTQUJMRX1cbiAgICAgIHNlYXJjaFBsYWNlSG9sZGVyPXt0aGlzLnByb3BzLnNlYXJjaFBsYWNlSG9sZGVyfVxuICAgICAgb25DbG9zZUNsaWNrPXt0aGlzLnByb3BzLm9uU2hvdWxkQ2xvc2VQb3BvdmVyfVxuICAgICAgZHluYW1pY1NlYXJjaFN0YXJ0c0Zyb209ezN9XG4gICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zZWFyY2hpbmdGb3J9XG4gICAgICB0b29sdGlwPXt0aGlzLnByb3BzLnNlYXJjaFRvb2x0aXB9XG4gICAgLz5cbiAgKTtcblxuICBnZXRMaXN0cyA9ICgpID0+IChcbiAgICA8ZGl2PlxuICAgICAgPEhTU2VsZWN0QnV0dG9uIGxhYmVsPXt0aGlzLnByb3BzLmJ0bk9wZW5WaWV3TGFiZWx9IG9uQ2xpY2s9e3RoaXMucHJvcHMub25TaG91bGRPcGVuVmlld30gLz5cbiAgICA8L2Rpdj5cbiAgKTtcblxuICBnZXRTZWFyY2hMYXlvdXQgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2VhcmNoTW9kZWwgPSBuZXcgU2VhcmNoKHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyKTtcbiAgICBjb25zdCBmb3VuZEl0ZW1zID0gc2VhcmNoTW9kZWwuZ2V0Rm91bmRGcm9tSGllcmFyY2h5KHRoaXMuc3RhdGUuc2VhcmNoaW5nRm9yKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8UG9wb3ZlclNlYXJjaENvbnRlbnRcbiAgICAgICAgZm91bmRJdGVtcz17Zm91bmRJdGVtc31cbiAgICAgICAgb25TZWxlY3Q9e2RhdGEgPT4gdGhpcy5vblNlbGVjdEhhbmRsZXIoZGF0YSl9XG4gICAgICAgIGl0ZW1SZW5kZXJGdW5jdGlvbj17dGhpcy5wcm9wcy5mb3VuZEl0ZW1SZW5kZXJGdW5jdGlvbn1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIGdldE1haW5MYXlvdXQgPSAoKSA9PiAoXG4gICAgPENvbW1vbkxheW91dD5cbiAgICAgIHt0aGlzLmdldFNlYXJjaEVsZW1lbnQoKX1cbiAgICAgIHt0aGlzLnN0YXRlLnNlYXJjaGluZ0ZvciAhPT0gJycgPyB0aGlzLmdldFNlYXJjaExheW91dCgpIDogdGhpcy5nZXRMaXN0cygpfVxuICAgIDwvQ29tbW9uTGF5b3V0PlxuICApO1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItcG9wb3ZlclwiXG4gICAgICAgIHRhYkluZGV4PVwiMFwiXG4gICAgICAgIHJlZj17KGVsKSA9PiB7IHRoaXMubWFpbkVsZW1lbnQgPSBlbDsgfX1cbiAgICAgID5cbiAgICAgICAgeyB0aGlzLnN0YXRlLmlzRGF0YUxvYWRlZCA/IHRoaXMuZ2V0TWFpbkxheW91dCgpIDogPFNwaW5uZXJMYXlvdXQgLz4gfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5IaWVyYXJjaHlTZWxlY3RvclBvcG92ZXIucHJvcFR5cGVzID0ge1xuICBkYXRhU291cmNlUHJvdmlkZXI6IGRhdGFTb3VyY2VQcm92aWRlclR5cGUuaXNSZXF1aXJlZCxcbiAgb25Db21wb25lbnRCbHVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBvblNob3VsZE9wZW5WaWV3OiBQcm9wVHlwZXMuZnVuYyxcbiAgZm91bmRJdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICBvblNob3VsZENsb3NlUG9wb3ZlcjogUHJvcFR5cGVzLmZ1bmMsXG4gIGJ0bk9wZW5WaWV3TGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBzZWFyY2hUb29sdGlwOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZWxlbWVudCwgUHJvcFR5cGVzLnN0cmluZ10pLFxufTtcblxuSGllcmFyY2h5U2VsZWN0b3JQb3BvdmVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25Db21wb25lbnRCbHVyOiAoKSA9PiB7fSxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBvblNob3VsZE9wZW5WaWV3OiAoKSA9PiB7fSxcbiAgb25TaG91bGRDbG9zZVBvcG92ZXI6ICgpID0+IHt9LFxuICBmb3VuZEl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcbiAgYnRuT3BlblZpZXdMYWJlbDogJ1NlbGVjdC4uLicsXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiAnU2VhcmNoLi4uJyxcbiAgc2VhcmNoVG9vbHRpcDogbnVsbCxcbn07XG4iXX0=