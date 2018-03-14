function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FormControl } from 'react-bootstrap';
import FaSearch from 'react-icons/lib/fa/search';
import FaClose from 'react-icons/lib/fa/close';

import './search-bar.scss';

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
      return classnames({
        'oc-hierarchy-selector-search-bar': true,
        focused: _this.state.focused
      });
    };

    _this.getIcon = function () {
      var icon = _this.isSearchingForEmpty() ? React.createElement(
        'div',
        { className: 'search-component-icon' },
        React.createElement(FaSearch, null)
      ) : React.createElement(
        'div',
        { className: 'search-component-icon clickable', onClick: _this.onCloseHandler },
        React.createElement(FaClose, null)
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
    return React.createElement(
      'div',
      { className: this.getClassNames() },
      React.createElement(FormControl, {
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
}(React.PureComponent);

export { SearchBar as default };


SearchBar.defaultProps = {
  inputClassName: '',
  onSearchChange: function onSearchChange() {},
  onCloseClick: function onCloseClick() {},
  searchPlaceHolder: 'Search...'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NlYXJjaC1iYXIvc2VhcmNoLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiY2xhc3NuYW1lcyIsIkZvcm1Db250cm9sIiwiRmFTZWFyY2giLCJGYUNsb3NlIiwiU2VhcmNoQmFyIiwicHJvcHMiLCJvbklucHV0Qmx1ckhhbmRsZXIiLCJzZXRTdGF0ZSIsImZvY3VzZWQiLCJvbklucHV0Rm9jdXNIYW5kbGVyIiwib25DaGFuZ2VIYW5kbGVyIiwiZSIsInNlYXJjaGluZ0ZvciIsInRhcmdldCIsInZhbHVlIiwib25TZWFyY2hDaGFuZ2UiLCJvbkNsb3NlSGFuZGxlciIsIm9uQ2xvc2VDbGljayIsImdldENsYXNzTmFtZXMiLCJzdGF0ZSIsImdldEljb24iLCJpY29uIiwiaXNTZWFyY2hpbmdGb3JFbXB0eSIsInRyaW0iLCJyZW5kZXIiLCJpbnB1dENsYXNzTmFtZSIsInNlYXJjaFBsYWNlSG9sZGVyIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTs7QUFFQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsWUFBdkI7QUFDQSxTQUFTQyxXQUFULFFBQTRCLGlCQUE1QjtBQUNBLE9BQU9DLFFBQVAsTUFBcUIsMkJBQXJCO0FBQ0EsT0FBT0MsT0FBUCxNQUFvQiwwQkFBcEI7O0FBRUEsT0FBTyxtQkFBUDs7SUFFcUJDLFM7OztBQUNuQixxQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQSxVQVFuQkMsa0JBUm1CLEdBUUUsWUFBTTtBQUFFLFlBQUtDLFFBQUwsQ0FBYyxFQUFFQyxTQUFTLEtBQVgsRUFBZDtBQUFvQyxLQVI5Qzs7QUFBQSxVQVVuQkMsbUJBVm1CLEdBVUcsWUFBTTtBQUFFLFlBQUtGLFFBQUwsQ0FBYyxFQUFFQyxTQUFTLElBQVgsRUFBZDtBQUFtQyxLQVY5Qzs7QUFBQSxVQVluQkUsZUFabUIsR0FZRCxVQUFDQyxDQUFELEVBQU87QUFDdkIsVUFBTUMsZUFBZUQsRUFBRUUsTUFBRixHQUFXRixFQUFFRSxNQUFGLENBQVNDLEtBQVQsSUFBa0IsRUFBN0IsR0FBa0MsRUFBdkQ7QUFDQSxZQUFLUCxRQUFMLENBQWMsRUFBRUssMEJBQUYsRUFBZDtBQUNBLFlBQUtQLEtBQUwsQ0FBV1UsY0FBWCxDQUEwQkosQ0FBMUI7QUFDRCxLQWhCa0I7O0FBQUEsVUFrQm5CSyxjQWxCbUIsR0FrQkYsWUFBTTtBQUNyQixZQUFLVCxRQUFMLENBQWM7QUFDWkssc0JBQWM7QUFERixPQUFkO0FBR0EsWUFBS1AsS0FBTCxDQUFXWSxZQUFYO0FBQ0QsS0F2QmtCOztBQUFBLFVBeUJuQkMsYUF6Qm1CLEdBeUJIO0FBQUEsYUFBT2xCLFdBQVc7QUFDaEMsNENBQW9DLElBREo7QUFFaENRLGlCQUFTLE1BQUtXLEtBQUwsQ0FBV1g7QUFGWSxPQUFYLENBQVA7QUFBQSxLQXpCRzs7QUFBQSxVQThCbkJZLE9BOUJtQixHQThCVCxZQUFNO0FBQ2QsVUFBTUMsT0FBTyxNQUFLQyxtQkFBTCxLQUNYO0FBQUE7QUFBQSxVQUFLLFdBQVUsdUJBQWY7QUFBdUMsNEJBQUMsUUFBRDtBQUF2QyxPQURXLEdBSVQ7QUFBQTtBQUFBLFVBQUssV0FBVSxpQ0FBZixFQUFpRCxTQUFTLE1BQUtOLGNBQS9EO0FBQ0UsNEJBQUMsT0FBRDtBQURGLE9BSko7O0FBU0EsYUFBT0ssSUFBUDtBQUNELEtBekNrQjs7QUFBQSxVQTJDbkJDLG1CQTNDbUIsR0EyQ0c7QUFBQSxhQUFNLE1BQUtILEtBQUwsQ0FBV1AsWUFBWCxDQUF3QlcsSUFBeEIsT0FBbUMsRUFBekM7QUFBQSxLQTNDSDs7QUFFakIsVUFBS0osS0FBTCxHQUFhO0FBQ1hYLGVBQVMsS0FERTtBQUVYSSxvQkFBYztBQUZILEtBQWI7QUFGaUI7QUFNbEI7O3NCQXVDRFksTSxxQkFBUztBQUNQLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVyxLQUFLTixhQUFMLEVBQWhCO0FBQ0UsMEJBQUMsV0FBRDtBQUNFLG1CQUFXLEtBQUtiLEtBQUwsQ0FBV29CLGNBRHhCO0FBRUUsZ0JBQVEsS0FBS25CLGtCQUZmO0FBR0UsaUJBQVMsS0FBS0csbUJBSGhCO0FBSUUsa0JBQVUsS0FBS0MsZUFKakI7QUFLRSxxQkFBYSxLQUFLTCxLQUFMLENBQVdxQixpQkFMMUI7QUFNRSxlQUFPLEtBQUtQLEtBQUwsQ0FBV1A7QUFOcEIsUUFERjtBQVNHLFdBQUtRLE9BQUw7QUFUSCxLQURGO0FBYUQsRzs7O0VBNURvQ3RCLE1BQU02QixhOztTQUF4QnZCLFM7OztBQXNFckJBLFVBQVV3QixZQUFWLEdBQXlCO0FBQ3ZCSCxrQkFBZ0IsRUFETztBQUV2QlYsa0JBQWdCLDBCQUFNLENBQUUsQ0FGRDtBQUd2QkUsZ0JBQWMsd0JBQU0sQ0FBRSxDQUhDO0FBSXZCUyxxQkFBbUI7QUFKSSxDQUF6QiIsImZpbGUiOiJzZWFyY2gtYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9ucyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgRmFTZWFyY2ggZnJvbSAncmVhY3QtaWNvbnMvbGliL2ZhL3NlYXJjaCc7XHJcbmltcG9ydCBGYUNsb3NlIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9jbG9zZSc7XHJcblxyXG5pbXBvcnQgJy4vc2VhcmNoLWJhci5zY3NzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaEJhciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBmb2N1c2VkOiBmYWxzZSxcclxuICAgICAgc2VhcmNoaW5nRm9yOiAnJyxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBvbklucHV0Qmx1ckhhbmRsZXIgPSAoKSA9PiB7IHRoaXMuc2V0U3RhdGUoeyBmb2N1c2VkOiBmYWxzZSB9KTsgfVxyXG5cclxuICBvbklucHV0Rm9jdXNIYW5kbGVyID0gKCkgPT4geyB0aGlzLnNldFN0YXRlKHsgZm9jdXNlZDogdHJ1ZSB9KTsgfVxyXG5cclxuICBvbkNoYW5nZUhhbmRsZXIgPSAoZSkgPT4ge1xyXG4gICAgY29uc3Qgc2VhcmNoaW5nRm9yID0gZS50YXJnZXQgPyBlLnRhcmdldC52YWx1ZSB8fCAnJyA6ICcnO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaGluZ0ZvciB9KTtcclxuICAgIHRoaXMucHJvcHMub25TZWFyY2hDaGFuZ2UoZSk7XHJcbiAgfVxyXG5cclxuICBvbkNsb3NlSGFuZGxlciA9ICgpID0+IHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBzZWFyY2hpbmdGb3I6ICcnLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnByb3BzLm9uQ2xvc2VDbGljaygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2xhc3NOYW1lcyA9ICgpID0+IChjbGFzc25hbWVzKHtcclxuICAgICdvYy1oaWVyYXJjaHktc2VsZWN0b3Itc2VhcmNoLWJhcic6IHRydWUsXHJcbiAgICBmb2N1c2VkOiB0aGlzLnN0YXRlLmZvY3VzZWQsXHJcbiAgfSkpO1xyXG5cclxuICBnZXRJY29uID0gKCkgPT4ge1xyXG4gICAgY29uc3QgaWNvbiA9IHRoaXMuaXNTZWFyY2hpbmdGb3JFbXB0eSgpID9cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtY29tcG9uZW50LWljb25cIj48RmFTZWFyY2ggLz48L2Rpdj5cclxuICAgICAgOlxyXG4gICAgICAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtY29tcG9uZW50LWljb24gY2xpY2thYmxlXCIgb25DbGljaz17dGhpcy5vbkNsb3NlSGFuZGxlcn0+XHJcbiAgICAgICAgICA8RmFDbG9zZSAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG5cclxuICAgIHJldHVybiBpY29uO1xyXG4gIH1cclxuXHJcbiAgaXNTZWFyY2hpbmdGb3JFbXB0eSA9ICgpID0+IHRoaXMuc3RhdGUuc2VhcmNoaW5nRm9yLnRyaW0oKSA9PT0gJyc7XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoKX0+XHJcbiAgICAgICAgPEZvcm1Db250cm9sXHJcbiAgICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMuaW5wdXRDbGFzc05hbWV9XHJcbiAgICAgICAgICBvbkJsdXI9e3RoaXMub25JbnB1dEJsdXJIYW5kbGVyfVxyXG4gICAgICAgICAgb25Gb2N1cz17dGhpcy5vbklucHV0Rm9jdXNIYW5kbGVyfVxyXG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2VIYW5kbGVyfVxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3RoaXMucHJvcHMuc2VhcmNoUGxhY2VIb2xkZXJ9XHJcbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zZWFyY2hpbmdGb3J9XHJcbiAgICAgICAgLz5cclxuICAgICAgICB7dGhpcy5nZXRJY29uKCl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcblNlYXJjaEJhci5wcm9wVHlwZXMgPSB7XHJcbiAgaW5wdXRDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgb25TZWFyY2hDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxyXG4gIG9uQ2xvc2VDbGljazogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgc2VhcmNoUGxhY2VIb2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcblxyXG5TZWFyY2hCYXIuZGVmYXVsdFByb3BzID0ge1xyXG4gIGlucHV0Q2xhc3NOYW1lOiAnJyxcclxuICBvblNlYXJjaENoYW5nZTogKCkgPT4ge30sXHJcbiAgb25DbG9zZUNsaWNrOiAoKSA9PiB7fSxcclxuICBzZWFyY2hQbGFjZUhvbGRlcjogJ1NlYXJjaC4uLicsXHJcbn07XHJcbiJdfQ==