'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactBootstrap = require('react-bootstrap');

var _search = require('react-icons/lib/fa/search');

var _search2 = _interopRequireDefault(_search);

var _close = require('react-icons/lib/fa/close');

var _close2 = _interopRequireDefault(_close);

require('./search-bar.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

var SearchBar = function (_React$PureComponent) {
  _inherits(SearchBar, _React$PureComponent);

  function SearchBar(props) {
    _classCallCheck(this, SearchBar);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.onInputBlurHandler = function () {
      _this.setState({ focused: false });
    };

    _this.onInputFocusHandler = function () {
      _this.setState({ focused: true });
    };

    _this.onChangeHandler = function (e) {
      var searchingFor = e.target ? e.target.value || '' : '';
      _this.setState({ searchingFor: searchingFor });
      _this.props.onSearchChange(e);
    };

    _this.onCloseHandler = function () {
      _this.setState({
        searchingFor: ''
      });
      _this.props.onCloseClick();
    };

    _this.getClassNames = function () {
      return (0, _classnames2.default)({
        'oc-hierarchy-selector-search-bar': true,
        focused: _this.state.focused
      });
    };

    _this.getIcon = function () {
      var icon = _this.isSearchingForEmpty() ? _react2.default.createElement(
        'div',
        { className: 'search-component-icon' },
        _react2.default.createElement(_search2.default, null)
      ) : _react2.default.createElement(
        'div',
        { className: 'search-component-icon clickable', onClick: _this.onCloseHandler },
        _react2.default.createElement(_close2.default, null)
      );

      return icon;
    };

    _this.isSearchingForEmpty = function () {
      return _this.state.searchingFor.trim() === '';
    };

    _this.state = {
      focused: false,
      searchingFor: ''
    };
    return _this;
  }

  SearchBar.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: this.getClassNames() },
      _react2.default.createElement(_reactBootstrap.FormControl, {
        className: this.props.inputClassName,
        onBlur: this.onInputBlurHandler,
        onFocus: this.onInputFocusHandler,
        onChange: this.onChangeHandler,
        placeholder: this.props.searchPlaceHolder,
        value: this.state.searchingFor
      }),
      this.getIcon()
    );
  };

  return SearchBar;
}(_react2.default.PureComponent);

exports.default = SearchBar;


SearchBar.defaultProps = {
  inputClassName: '',
  onSearchChange: function onSearchChange() {},
  onCloseClick: function onCloseClick() {},
  searchPlaceHolder: 'Search...'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NlYXJjaC1iYXIvc2VhcmNoLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlNlYXJjaEJhciIsInByb3BzIiwib25JbnB1dEJsdXJIYW5kbGVyIiwic2V0U3RhdGUiLCJmb2N1c2VkIiwib25JbnB1dEZvY3VzSGFuZGxlciIsIm9uQ2hhbmdlSGFuZGxlciIsImUiLCJzZWFyY2hpbmdGb3IiLCJ0YXJnZXQiLCJ2YWx1ZSIsIm9uU2VhcmNoQ2hhbmdlIiwib25DbG9zZUhhbmRsZXIiLCJvbkNsb3NlQ2xpY2siLCJnZXRDbGFzc05hbWVzIiwic3RhdGUiLCJnZXRJY29uIiwiaWNvbiIsImlzU2VhcmNoaW5nRm9yRW1wdHkiLCJ0cmltIiwicmVuZGVyIiwiaW5wdXRDbGFzc05hbWUiLCJzZWFyY2hQbGFjZUhvbGRlciIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7OzsrZUFWQTtBQUNBOztJQVdxQkEsUzs7O0FBQ25CLHFCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLGdDQUFNQSxLQUFOLENBRGlCOztBQUFBLFVBUW5CQyxrQkFSbUIsR0FRRSxZQUFNO0FBQUUsWUFBS0MsUUFBTCxDQUFjLEVBQUVDLFNBQVMsS0FBWCxFQUFkO0FBQW9DLEtBUjlDOztBQUFBLFVBVW5CQyxtQkFWbUIsR0FVRyxZQUFNO0FBQUUsWUFBS0YsUUFBTCxDQUFjLEVBQUVDLFNBQVMsSUFBWCxFQUFkO0FBQW1DLEtBVjlDOztBQUFBLFVBWW5CRSxlQVptQixHQVlELFVBQUNDLENBQUQsRUFBTztBQUN2QixVQUFNQyxlQUFlRCxFQUFFRSxNQUFGLEdBQVdGLEVBQUVFLE1BQUYsQ0FBU0MsS0FBVCxJQUFrQixFQUE3QixHQUFrQyxFQUF2RDtBQUNBLFlBQUtQLFFBQUwsQ0FBYyxFQUFFSywwQkFBRixFQUFkO0FBQ0EsWUFBS1AsS0FBTCxDQUFXVSxjQUFYLENBQTBCSixDQUExQjtBQUNELEtBaEJrQjs7QUFBQSxVQWtCbkJLLGNBbEJtQixHQWtCRixZQUFNO0FBQ3JCLFlBQUtULFFBQUwsQ0FBYztBQUNaSyxzQkFBYztBQURGLE9BQWQ7QUFHQSxZQUFLUCxLQUFMLENBQVdZLFlBQVg7QUFDRCxLQXZCa0I7O0FBQUEsVUF5Qm5CQyxhQXpCbUIsR0F5Qkg7QUFBQSxhQUFPLDBCQUFXO0FBQ2hDLDRDQUFvQyxJQURKO0FBRWhDVixpQkFBUyxNQUFLVyxLQUFMLENBQVdYO0FBRlksT0FBWCxDQUFQO0FBQUEsS0F6Qkc7O0FBQUEsVUE4Qm5CWSxPQTlCbUIsR0E4QlQsWUFBTTtBQUNkLFVBQU1DLE9BQU8sTUFBS0MsbUJBQUwsS0FDWDtBQUFBO0FBQUEsVUFBSyxXQUFVLHVCQUFmO0FBQXVDO0FBQXZDLE9BRFcsR0FJVDtBQUFBO0FBQUEsVUFBSyxXQUFVLGlDQUFmLEVBQWlELFNBQVMsTUFBS04sY0FBL0Q7QUFDRTtBQURGLE9BSko7O0FBU0EsYUFBT0ssSUFBUDtBQUNELEtBekNrQjs7QUFBQSxVQTJDbkJDLG1CQTNDbUIsR0EyQ0c7QUFBQSxhQUFNLE1BQUtILEtBQUwsQ0FBV1AsWUFBWCxDQUF3QlcsSUFBeEIsT0FBbUMsRUFBekM7QUFBQSxLQTNDSDs7QUFFakIsVUFBS0osS0FBTCxHQUFhO0FBQ1hYLGVBQVMsS0FERTtBQUVYSSxvQkFBYztBQUZILEtBQWI7QUFGaUI7QUFNbEI7O3NCQXVDRFksTSxxQkFBUztBQUNQLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVyxLQUFLTixhQUFMLEVBQWhCO0FBQ0U7QUFDRSxtQkFBVyxLQUFLYixLQUFMLENBQVdvQixjQUR4QjtBQUVFLGdCQUFRLEtBQUtuQixrQkFGZjtBQUdFLGlCQUFTLEtBQUtHLG1CQUhoQjtBQUlFLGtCQUFVLEtBQUtDLGVBSmpCO0FBS0UscUJBQWEsS0FBS0wsS0FBTCxDQUFXcUIsaUJBTDFCO0FBTUUsZUFBTyxLQUFLUCxLQUFMLENBQVdQO0FBTnBCLFFBREY7QUFTRyxXQUFLUSxPQUFMO0FBVEgsS0FERjtBQWFELEc7OztFQTVEb0MsZ0JBQU1PLGE7O2tCQUF4QnZCLFM7OztBQXNFckJBLFVBQVV3QixZQUFWLEdBQXlCO0FBQ3ZCSCxrQkFBZ0IsRUFETztBQUV2QlYsa0JBQWdCLDBCQUFNLENBQUUsQ0FGRDtBQUd2QkUsZ0JBQWMsd0JBQU0sQ0FBRSxDQUhDO0FBSXZCUyxxQkFBbUI7QUFKSSxDQUF6QiIsImZpbGUiOiJzZWFyY2gtYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9ucyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgRmFTZWFyY2ggZnJvbSAncmVhY3QtaWNvbnMvbGliL2ZhL3NlYXJjaCc7XHJcbmltcG9ydCBGYUNsb3NlIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9jbG9zZSc7XHJcblxyXG5pbXBvcnQgJy4vc2VhcmNoLWJhci5zY3NzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaEJhciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBmb2N1c2VkOiBmYWxzZSxcclxuICAgICAgc2VhcmNoaW5nRm9yOiAnJyxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBvbklucHV0Qmx1ckhhbmRsZXIgPSAoKSA9PiB7IHRoaXMuc2V0U3RhdGUoeyBmb2N1c2VkOiBmYWxzZSB9KTsgfVxyXG5cclxuICBvbklucHV0Rm9jdXNIYW5kbGVyID0gKCkgPT4geyB0aGlzLnNldFN0YXRlKHsgZm9jdXNlZDogdHJ1ZSB9KTsgfVxyXG5cclxuICBvbkNoYW5nZUhhbmRsZXIgPSAoZSkgPT4ge1xyXG4gICAgY29uc3Qgc2VhcmNoaW5nRm9yID0gZS50YXJnZXQgPyBlLnRhcmdldC52YWx1ZSB8fCAnJyA6ICcnO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaGluZ0ZvciB9KTtcclxuICAgIHRoaXMucHJvcHMub25TZWFyY2hDaGFuZ2UoZSk7XHJcbiAgfVxyXG5cclxuICBvbkNsb3NlSGFuZGxlciA9ICgpID0+IHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBzZWFyY2hpbmdGb3I6ICcnLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnByb3BzLm9uQ2xvc2VDbGljaygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2xhc3NOYW1lcyA9ICgpID0+IChjbGFzc25hbWVzKHtcclxuICAgICdvYy1oaWVyYXJjaHktc2VsZWN0b3Itc2VhcmNoLWJhcic6IHRydWUsXHJcbiAgICBmb2N1c2VkOiB0aGlzLnN0YXRlLmZvY3VzZWQsXHJcbiAgfSkpO1xyXG5cclxuICBnZXRJY29uID0gKCkgPT4ge1xyXG4gICAgY29uc3QgaWNvbiA9IHRoaXMuaXNTZWFyY2hpbmdGb3JFbXB0eSgpID9cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtY29tcG9uZW50LWljb25cIj48RmFTZWFyY2ggLz48L2Rpdj5cclxuICAgICAgOlxyXG4gICAgICAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtY29tcG9uZW50LWljb24gY2xpY2thYmxlXCIgb25DbGljaz17dGhpcy5vbkNsb3NlSGFuZGxlcn0+XHJcbiAgICAgICAgICA8RmFDbG9zZSAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG5cclxuICAgIHJldHVybiBpY29uO1xyXG4gIH1cclxuXHJcbiAgaXNTZWFyY2hpbmdGb3JFbXB0eSA9ICgpID0+IHRoaXMuc3RhdGUuc2VhcmNoaW5nRm9yLnRyaW0oKSA9PT0gJyc7XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX0+XHJcbiAgICAgICAgPEZvcm1Db250cm9sXHJcbiAgICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMuaW5wdXRDbGFzc05hbWV9XHJcbiAgICAgICAgICBvbkJsdXI9e3RoaXMub25JbnB1dEJsdXJIYW5kbGVyfVxyXG4gICAgICAgICAgb25Gb2N1cz17dGhpcy5vbklucHV0Rm9jdXNIYW5kbGVyfVxyXG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2VIYW5kbGVyfVxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3RoaXMucHJvcHMuc2VhcmNoUGxhY2VIb2xkZXJ9XHJcbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zZWFyY2hpbmdGb3J9XHJcbiAgICAgICAgLz5cclxuICAgICAgICB7dGhpcy5nZXRJY29uKCl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcblNlYXJjaEJhci5wcm9wVHlwZXMgPSB7XHJcbiAgaW5wdXRDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgb25TZWFyY2hDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxyXG4gIG9uQ2xvc2VDbGljazogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgc2VhcmNoUGxhY2VIb2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcblxyXG5TZWFyY2hCYXIuZGVmYXVsdFByb3BzID0ge1xyXG4gIGlucHV0Q2xhc3NOYW1lOiAnJyxcclxuICBvblNlYXJjaENoYW5nZTogKCkgPT4ge30sXHJcbiAgb25DbG9zZUNsaWNrOiAoKSA9PiB7fSxcclxuICBzZWFyY2hQbGFjZUhvbGRlcjogJ1NlYXJjaC4uLicsXHJcbn07XHJcbiJdfQ==