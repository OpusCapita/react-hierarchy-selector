'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCheckbox = require('@opuscapita/react-checkbox');

var _reactCheckbox2 = _interopRequireDefault(_reactCheckbox);

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
        !this.props.checkedAllHidden ? _react2.default.createElement(_reactCheckbox2.default, _extends({
          onChange: this.checkAllHandler,
          checked: this.state.checkedAll,
          label: this.props.allLabel
        }, disabledProperty)) : null
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvY29sdW1uL2NvbHVtbi5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlZpZXdDb2x1bW4iLCJwcm9wcyIsImNsaWNrSGFuZGxlciIsImlkIiwiZXZlbnQiLCJvbkNsaWNrIiwiaW5kZXgiLCJjaGVja0hhbmRsZXIiLCJjaGVja1N0YXRlIiwib25DaGVjayIsInJlZmVyZW5jZUlkcyIsInNsaWNlIiwiY2hlY2tBbGxIYW5kbGVyIiwibmV3U3RhdGUiLCJzdGF0ZSIsImNoZWNrZWRBbGwiLCJvbkNoZWNrQWxsIiwic2V0U3RhdGUiLCJyZW5kZXJXcmFwcGVyRnVuY3Rpb24iLCJpdGVtIiwiZGVmYXVsdFJlbmRlckZ1bmN0aW9uIiwiaXRlbVJlbmRlckZ1bmN0aW9uIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsInJlbmRlciIsImRpc2FibGVkUHJvcGVydHkiLCJjaGVja2VkQWxsRGlzYWJsZWQiLCJkaXNhYmxlZCIsImNoZWNrZWRBbGxIaWRkZW4iLCJhbGxMYWJlbCIsImNoZWNrZWRJZHMiLCJkYXRhIiwiaXRlbXMiLCJzZWxlY3RlZElkIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztJQUVxQkEsVTs7O0FBQ25CLHNCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLGdDQUFNQSxLQUFOLENBRGlCOztBQUFBLFVBZW5CQyxZQWZtQixHQWVKLFVBQUNDLEVBQUQsRUFBS0MsS0FBTCxFQUFlO0FBQzVCLFlBQUtILEtBQUwsQ0FBV0ksT0FBWCxDQUFtQixNQUFLSixLQUFMLENBQVdLLEtBQTlCLEVBQXFDSCxFQUFyQyxFQUF5Q0MsS0FBekM7QUFDRCxLQWpCa0I7O0FBQUEsVUFtQm5CRyxZQW5CbUIsR0FtQkosVUFB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bXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IENoZWNrYm94IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWNoZWNrYm94JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCBTZWxlY3RhYmxlTGlzdCBmcm9tICcuLi8uLi9zZWxlY3RhYmxlLWxpc3QnO1xuaW1wb3J0IENvbHVtbkRhdGEgZnJvbSAnLi4vLi4vLi4vbW9kZWxzL2NvbHVtbi9jb2x1bW4tZGF0YSc7XG5cbmltcG9ydCAnLi9jb2x1bW4uc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdDb2x1bW4gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNoZWNrZWRBbGw6IHRoaXMucHJvcHMuY2hlY2tlZEFsbCxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAobmV4dFByb3BzLmNoZWNrZWRBbGwgIT09IHRoaXMucHJvcHMuY2hlY2tlZEFsbCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNoZWNrZWRBbGw6IG5leHRQcm9wcy5jaGVja2VkQWxsLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY2xpY2tIYW5kbGVyID0gKGlkLCBldmVudCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25DbGljayh0aGlzLnByb3BzLmluZGV4LCBpZCwgZXZlbnQpO1xuICB9XG5cbiAgY2hlY2tIYW5kbGVyID0gKGlkLCBjaGVja1N0YXRlKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbkNoZWNrKHRoaXMucHJvcHMucmVmZXJlbmNlSWRzLnNsaWNlKCksIGlkLCBjaGVja1N0YXRlKTtcbiAgfVxuXG4gIGNoZWNrQWxsSGFuZGxlciA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdTdGF0ZSA9ICF0aGlzLnN0YXRlLmNoZWNrZWRBbGw7XG4gICAgdGhpcy5wcm9wcy5vbkNoZWNrQWxsKHRoaXMucHJvcHMucmVmZXJlbmNlSWRzLnNsaWNlKCksIG5ld1N0YXRlKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNoZWNrZWRBbGw6IG5ld1N0YXRlLFxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyV3JhcHBlckZ1bmN0aW9uID0gaW5kZXggPT4gKGl0ZW0sIGRlZmF1bHRSZW5kZXJGdW5jdGlvbikgPT5cbiAgICB0aGlzLnByb3BzLml0ZW1SZW5kZXJGdW5jdGlvbihpbmRleCwgaXRlbSwgZGVmYXVsdFJlbmRlckZ1bmN0aW9uKTtcblxuICByZW5kZXIoKSB7XG4gICAgLy8gVE9ETzogJ0FsbCcgdGV4dCBzaG91bGQgYmUgcGFzc2VkIGhlcmUgdG8gc2hvdyB0cmFuc2xhdGVkIHRleHQuXG4gICAgY29uc3QgZGlzYWJsZWRQcm9wZXJ0eSA9IHRoaXMucHJvcHMuY2hlY2tlZEFsbERpc2FibGVkID8geyBkaXNhYmxlZDogdHJ1ZSB9IDogbnVsbDtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItY29sdW1uXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWNvbHVtbi1hbGxcIj5cbiAgICAgICAgICB7IXRoaXMucHJvcHMuY2hlY2tlZEFsbEhpZGRlbiA/XG4gICAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuY2hlY2tBbGxIYW5kbGVyfVxuICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnN0YXRlLmNoZWNrZWRBbGx9XG4gICAgICAgICAgICAgIGxhYmVsPXt0aGlzLnByb3BzLmFsbExhYmVsfVxuICAgICAgICAgICAgICB7Li4uZGlzYWJsZWRQcm9wZXJ0eX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8U2VsZWN0YWJsZUxpc3RcbiAgICAgICAgICBjaGVja2VkQWxsPXt0aGlzLnByb3BzLmNoZWNrZWRBbGx9XG4gICAgICAgICAgY2hlY2tEaXNhYmxlZD17dGhpcy5zdGF0ZS5jaGVja2VkQWxsfVxuICAgICAgICAgIGNoZWNrZWRJZHM9e3RoaXMucHJvcHMuY2hlY2tlZElkc31cbiAgICAgICAgICBpdGVtcz17dGhpcy5wcm9wcy5kYXRhLml0ZW1zfVxuICAgICAgICAgIGl0ZW1SZW5kZXJGdW5jdGlvbj17dGhpcy5wcm9wcy5pdGVtUmVuZGVyRnVuY3Rpb24gP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJXcmFwcGVyRnVuY3Rpb24odGhpcy5wcm9wcy5pbmRleCkgOiBudWxsfVxuICAgICAgICAgIHNlbGVjdGVkSWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWRJZH1cbiAgICAgICAgICBvbkNoZWNrPXt0aGlzLmNoZWNrSGFuZGxlcn1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmNsaWNrSGFuZGxlcn1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuVmlld0NvbHVtbi5wcm9wVHlwZXMgPSB7XG4gIGFsbExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBjaGVja2VkSWRzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMubnVtYmVyKSxcbiAgY2hlY2tlZEFsbDogUHJvcFR5cGVzLmJvb2wsXG4gIGNoZWNrZWRBbGxEaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gIGNoZWNrZWRBbGxIaWRkZW46IFByb3BUeXBlcy5ib29sLFxuICBpbmRleDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICBpdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICBkYXRhOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihDb2x1bW5EYXRhKSxcbiAgc2VsZWN0ZWRJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgcmVmZXJlbmNlSWRzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSkpLFxuICBvbkNoZWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25DaGVja0FsbDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxufTtcblxuVmlld0NvbHVtbi5kZWZhdWx0UHJvcHMgPSB7XG4gIGFsbExhYmVsOiAnQWxsJyxcbiAgY2hlY2tlZEFsbDogZmFsc2UsXG4gIGNoZWNrZWRBbGxEaXNhYmxlZDogZmFsc2UsXG4gIGNoZWNrZWRBbGxIaWRkZW46IGZhbHNlLFxuICBkYXRhOiBuZXcgQ29sdW1uRGF0YSgpLFxuICBpdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXG4gIHNlbGVjdGVkSWQ6IG51bGwsXG4gIHJlZmVyZW5jZUlkczogW10sXG4gIG9uQ2hlY2s6ICgpID0+IHt9LFxuICBvbkNoZWNrQWxsOiAoKSA9PiB7fSxcbiAgb25DbGljazogKCkgPT4ge30sXG4gIGNoZWNrZWRJZHM6IFtdLFxufTtcbiJdfQ==