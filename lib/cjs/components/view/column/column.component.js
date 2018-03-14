'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _selectableList = require('../../selectable-list');

var _selectableList2 = _interopRequireDefault(_selectableList);

var _columnData = require('../../../models/column/column-data');

var _columnData2 = _interopRequireDefault(_columnData);

require('./column.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ViewColumn = function (_React$PureComponent) {
  _inherits(ViewColumn, _React$PureComponent);

  function ViewColumn(props) {
    _classCallCheck(this, ViewColumn);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.clickHandler = function (id, event) {
      _this.props.onClick(_this.props.index, id, event);
    };

    _this.checkHandler = function (id, checkState) {
      _this.props.onCheck(_this.props.referenceIds.slice(), id, checkState);
    };

    _this.checkAllHandler = function () {
      var newState = !_this.state.checkedAll;
      _this.props.onCheckAll(_this.props.referenceIds.slice(), newState);
      _this.setState({
        checkedAll: newState
      });
    };

    _this.renderWrapperFunction = function (index) {
      return function (item, defaultRenderFunction) {
        return _this.props.itemRenderFunction(index, item, defaultRenderFunction);
      };
    };

    _this.state = {
      checkedAll: _this.props.checkedAll
    };
    return _this;
  }

  ViewColumn.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.checkedAll !== this.props.checkedAll) {
      this.setState({
        checkedAll: nextProps.checkedAll
      });
    }
  };

  ViewColumn.prototype.render = function render() {
    // TODO: 'All' text should be passed here to show translated text.
    var disabledProperty = this.props.checkedAllDisabled ? { disabled: true } : null;
    return _react2.default.createElement(
      'div',
      { className: 'oc-hierarchy-selector-column' },
      _react2.default.createElement(
        'div',
        { className: 'oc-hierarchy-selector-column-all' },
        !this.props.checkedAllHidden ? _react2.default.createElement(
          _reactBootstrap.Checkbox,
          _extends({
            onChange: this.checkAllHandler,
            checked: this.state.checkedAll
          }, disabledProperty),
          this.props.allLabel
        ) : null
      ),
      _react2.default.createElement(_selectableList2.default, {
        checkedAll: this.props.checkedAll,
        checkDisabled: this.state.checkedAll,
        checkedIds: this.props.checkedIds,
        items: this.props.data.items,
        itemRenderFunction: this.props.itemRenderFunction ? this.renderWrapperFunction(this.props.index) : null,
        selectedId: this.props.selectedId,
        onCheck: this.checkHandler,
        onClick: this.clickHandler
      })
    );
  };

  return ViewColumn;
}(_react2.default.PureComponent);

exports.default = ViewColumn;


ViewColumn.defaultProps = {
  allLabel: 'All',
  checkedAll: false,
  checkedAllDisabled: false,
  checkedAllHidden: false,
  data: new _columnData2.default(),
  itemRenderFunction: null,
  selectedId: null,
  referenceIds: [],
  onCheck: function onCheck() {},
  onCheckAll: function onCheckAll() {},
  onClick: function onClick() {},
  checkedIds: []
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvY29sdW1uL2NvbHVtbi5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlZpZXdDb2x1bW4iLCJwcm9wcyIsImNsaWNrSGFuZGxlciIsImlkIiwiZXZlbnQiLCJvbkNsaWNrIiwiaW5kZXgiLCJjaGVja0hhbmRsZXIiLCJjaGVja1N0YXRlIiwib25DaGVjayIsInJlZmVyZW5jZUlkcyIsInNsaWNlIiwiY2hlY2tBbGxIYW5kbGVyIiwibmV3U3RhdGUiLCJzdGF0ZSIsImNoZWNrZWRBbGwiLCJvbkNoZWNrQWxsIiwic2V0U3RhdGUiLCJyZW5kZXJXcmFwcGVyRnVuY3Rpb24iLCJpdGVtIiwiZGVmYXVsdFJlbmRlckZ1bmN0aW9uIiwiaXRlbVJlbmRlckZ1bmN0aW9uIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsInJlbmRlciIsImRpc2FibGVkUHJvcGVydHkiLCJjaGVja2VkQWxsRGlzYWJsZWQiLCJkaXNhYmxlZCIsImNoZWNrZWRBbGxIaWRkZW4iLCJhbGxMYWJlbCIsImNoZWNrZWRJZHMiLCJkYXRhIiwiaXRlbXMiLCJzZWxlY3RlZElkIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7SUFFcUJBLFU7OztBQUNuQixzQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQSxVQWVuQkMsWUFmbUIsR0FlSixVQUFDQyxFQUFELEVBQUtDLEtBQUwsRUFBZTtBQUM1QixZQUFLSCxLQUFMLENBQVdJLE9BQVgsQ0FBbUIsTUFBS0osS0FBTCxDQUFXSyxLQUE5QixFQUFxQ0gsRUFBckMsRUFBeUNDLEtBQXpDO0FBQ0QsS0FqQmtCOztBQUFBLFVBbUJuQkcsWUFuQm1CLEdBbUJKLFVBQUNK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ImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IENoZWNrYm94IH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuXHJcbmltcG9ydCBTZWxlY3RhYmxlTGlzdCBmcm9tICcuLi8uLi9zZWxlY3RhYmxlLWxpc3QnO1xyXG5pbXBvcnQgQ29sdW1uRGF0YSBmcm9tICcuLi8uLi8uLi9tb2RlbHMvY29sdW1uL2NvbHVtbi1kYXRhJztcclxuXHJcbmltcG9ydCAnLi9jb2x1bW4uc2Nzcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3Q29sdW1uIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGNoZWNrZWRBbGw6IHRoaXMucHJvcHMuY2hlY2tlZEFsbCxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xyXG4gICAgaWYgKG5leHRQcm9wcy5jaGVja2VkQWxsICE9PSB0aGlzLnByb3BzLmNoZWNrZWRBbGwpIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgY2hlY2tlZEFsbDogbmV4dFByb3BzLmNoZWNrZWRBbGwsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2xpY2tIYW5kbGVyID0gKGlkLCBldmVudCkgPT4ge1xyXG4gICAgdGhpcy5wcm9wcy5vbkNsaWNrKHRoaXMucHJvcHMuaW5kZXgsIGlkLCBldmVudCk7XHJcbiAgfVxyXG5cclxuICBjaGVja0hhbmRsZXIgPSAoaWQsIGNoZWNrU3RhdGUpID0+IHtcclxuICAgIHRoaXMucHJvcHMub25DaGVjayh0aGlzLnByb3BzLnJlZmVyZW5jZUlkcy5zbGljZSgpLCBpZCwgY2hlY2tTdGF0ZSk7XHJcbiAgfVxyXG5cclxuICBjaGVja0FsbEhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBuZXdTdGF0ZSA9ICF0aGlzLnN0YXRlLmNoZWNrZWRBbGw7XHJcbiAgICB0aGlzLnByb3BzLm9uQ2hlY2tBbGwodGhpcy5wcm9wcy5yZWZlcmVuY2VJZHMuc2xpY2UoKSwgbmV3U3RhdGUpO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGNoZWNrZWRBbGw6IG5ld1N0YXRlLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJXcmFwcGVyRnVuY3Rpb24gPSBpbmRleCA9PiAoaXRlbSwgZGVmYXVsdFJlbmRlckZ1bmN0aW9uKSA9PlxyXG4gICAgdGhpcy5wcm9wcy5pdGVtUmVuZGVyRnVuY3Rpb24oaW5kZXgsIGl0ZW0sIGRlZmF1bHRSZW5kZXJGdW5jdGlvbik7XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIC8vIFRPRE86ICdBbGwnIHRleHQgc2hvdWxkIGJlIHBhc3NlZCBoZXJlIHRvIHNob3cgdHJhbnNsYXRlZCB0ZXh0LlxyXG4gICAgY29uc3QgZGlzYWJsZWRQcm9wZXJ0eSA9IHRoaXMucHJvcHMuY2hlY2tlZEFsbERpc2FibGVkID8geyBkaXNhYmxlZDogdHJ1ZSB9IDogbnVsbDtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWNvbHVtblwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWNvbHVtbi1hbGxcIj5cclxuICAgICAgICAgIHshdGhpcy5wcm9wcy5jaGVja2VkQWxsSGlkZGVuID9cclxuICAgICAgICAgICAgPENoZWNrYm94XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuY2hlY2tBbGxIYW5kbGVyfVxyXG4gICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuY2hlY2tlZEFsbH1cclxuICAgICAgICAgICAgICB7Li4uZGlzYWJsZWRQcm9wZXJ0eX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHt0aGlzLnByb3BzLmFsbExhYmVsfVxyXG4gICAgICAgICAgICA8L0NoZWNrYm94PlxyXG4gICAgICAgICAgICA6IG51bGxcclxuICAgICAgICAgIH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8U2VsZWN0YWJsZUxpc3RcclxuICAgICAgICAgIGNoZWNrZWRBbGw9e3RoaXMucHJvcHMuY2hlY2tlZEFsbH1cclxuICAgICAgICAgIGNoZWNrRGlzYWJsZWQ9e3RoaXMuc3RhdGUuY2hlY2tlZEFsbH1cclxuICAgICAgICAgIGNoZWNrZWRJZHM9e3RoaXMucHJvcHMuY2hlY2tlZElkc31cclxuICAgICAgICAgIGl0ZW1zPXt0aGlzLnByb3BzLmRhdGEuaXRlbXN9XHJcbiAgICAgICAgICBpdGVtUmVuZGVyRnVuY3Rpb249e3RoaXMucHJvcHMuaXRlbVJlbmRlckZ1bmN0aW9uID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJXcmFwcGVyRnVuY3Rpb24odGhpcy5wcm9wcy5pbmRleCkgOiBudWxsfVxyXG4gICAgICAgICAgc2VsZWN0ZWRJZD17dGhpcy5wcm9wcy5zZWxlY3RlZElkfVxyXG4gICAgICAgICAgb25DaGVjaz17dGhpcy5jaGVja0hhbmRsZXJ9XHJcbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmNsaWNrSGFuZGxlcn1cclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5WaWV3Q29sdW1uLnByb3BUeXBlcyA9IHtcclxuICBhbGxMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICBjaGVja2VkSWRzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMubnVtYmVyKSxcclxuICBjaGVja2VkQWxsOiBQcm9wVHlwZXMuYm9vbCxcclxuICBjaGVja2VkQWxsRGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gIGNoZWNrZWRBbGxIaWRkZW46IFByb3BUeXBlcy5ib29sLFxyXG4gIGluZGV4OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgaXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcclxuICBkYXRhOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihDb2x1bW5EYXRhKSxcclxuICBzZWxlY3RlZElkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIHJlZmVyZW5jZUlkczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pKSxcclxuICBvbkNoZWNrOiBQcm9wVHlwZXMuZnVuYyxcclxuICBvbkNoZWNrQWxsOiBQcm9wVHlwZXMuZnVuYyxcclxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcclxufTtcclxuXHJcblZpZXdDb2x1bW4uZGVmYXVsdFByb3BzID0ge1xyXG4gIGFsbExhYmVsOiAnQWxsJyxcclxuICBjaGVja2VkQWxsOiBmYWxzZSxcclxuICBjaGVja2VkQWxsRGlzYWJsZWQ6IGZhbHNlLFxyXG4gIGNoZWNrZWRBbGxIaWRkZW46IGZhbHNlLFxyXG4gIGRhdGE6IG5ldyBDb2x1bW5EYXRhKCksXHJcbiAgaXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxyXG4gIHNlbGVjdGVkSWQ6IG51bGwsXHJcbiAgcmVmZXJlbmNlSWRzOiBbXSxcclxuICBvbkNoZWNrOiAoKSA9PiB7fSxcclxuICBvbkNoZWNrQWxsOiAoKSA9PiB7fSxcclxuICBvbkNsaWNrOiAoKSA9PiB7fSxcclxuICBjaGVja2VkSWRzOiBbXSxcclxufTtcclxuIl19