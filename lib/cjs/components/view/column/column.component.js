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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvY29sdW1uL2NvbHVtbi5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlZpZXdDb2x1bW4iLCJwcm9wcyIsImNsaWNrSGFuZGxlciIsImlkIiwiZXZlbnQiLCJvbkNsaWNrIiwiaW5kZXgiLCJjaGVja0hhbmRsZXIiLCJjaGVja1N0YXRlIiwib25DaGVjayIsInJlZmVyZW5jZUlkcyIsInNsaWNlIiwiY2hlY2tBbGxIYW5kbGVyIiwibmV3U3RhdGUiLCJzdGF0ZSIsImNoZWNrZWRBbGwiLCJvbkNoZWNrQWxsIiwic2V0U3RhdGUiLCJyZW5kZXJXcmFwcGVyRnVuY3Rpb24iLCJpdGVtIiwiZGVmYXVsdFJlbmRlckZ1bmN0aW9uIiwiaXRlbVJlbmRlckZ1bmN0aW9uIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsInJlbmRlciIsImRpc2FibGVkUHJvcGVydHkiLCJjaGVja2VkQWxsRGlzYWJsZWQiLCJkaXNhYmxlZCIsImNoZWNrZWRBbGxIaWRkZW4iLCJhbGxMYWJlbCIsImNoZWNrZWRJZHMiLCJkYXRhIiwiaXRlbXMiLCJzZWxlY3RlZElkIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwiQ29sdW1uRGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztJQUVxQkEsVTs7O0FBQ25CLHNCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLGdDQUFNQSxLQUFOLENBRGlCOztBQUFBLFVBZW5CQyxZQWZtQixHQWVKLFVBQUNDLEVBQUQsRUFBS0MsS0FBTCxFQUFlO0FBQzVCLFlBQUtILEtBQUwsQ0FBV0ksT0FBWCxDQUFtQixNQUFLSixLQUFMLENBQVdLLEtBQTlCLEVBQXFDSCxFQUFyQyxFQUF5Q0MsS0FBekM7QUFDRCxLQWpCa0I7O0FBQUEsVUFt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WSxDQUExQiIsImZpbGUiOiJjb2x1bW4uY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBDaGVja2JveCBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1jaGVja2JveCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgU2VsZWN0YWJsZUxpc3QgZnJvbSAnLi4vLi4vc2VsZWN0YWJsZS1saXN0JztcbmltcG9ydCBDb2x1bW5EYXRhIGZyb20gJy4uLy4uLy4uL21vZGVscy9jb2x1bW4vY29sdW1uLWRhdGEnO1xuXG5pbXBvcnQgJy4vY29sdW1uLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3Q29sdW1uIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjaGVja2VkQWxsOiB0aGlzLnByb3BzLmNoZWNrZWRBbGwsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgaWYgKG5leHRQcm9wcy5jaGVja2VkQWxsICE9PSB0aGlzLnByb3BzLmNoZWNrZWRBbGwpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjaGVja2VkQWxsOiBuZXh0UHJvcHMuY2hlY2tlZEFsbCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsaWNrSGFuZGxlciA9IChpZCwgZXZlbnQpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2xpY2sodGhpcy5wcm9wcy5pbmRleCwgaWQsIGV2ZW50KTtcbiAgfVxuXG4gIGNoZWNrSGFuZGxlciA9IChpZCwgY2hlY2tTdGF0ZSkgPT4ge1xuICAgIHRoaXMucHJvcHMub25DaGVjayh0aGlzLnByb3BzLnJlZmVyZW5jZUlkcy5zbGljZSgpLCBpZCwgY2hlY2tTdGF0ZSk7XG4gIH1cblxuICBjaGVja0FsbEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV3U3RhdGUgPSAhdGhpcy5zdGF0ZS5jaGVja2VkQWxsO1xuICAgIHRoaXMucHJvcHMub25DaGVja0FsbCh0aGlzLnByb3BzLnJlZmVyZW5jZUlkcy5zbGljZSgpLCBuZXdTdGF0ZSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjaGVja2VkQWxsOiBuZXdTdGF0ZSxcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcldyYXBwZXJGdW5jdGlvbiA9IGluZGV4ID0+IChpdGVtLCBkZWZhdWx0UmVuZGVyRnVuY3Rpb24pID0+XG4gICAgdGhpcy5wcm9wcy5pdGVtUmVuZGVyRnVuY3Rpb24oaW5kZXgsIGl0ZW0sIGRlZmF1bHRSZW5kZXJGdW5jdGlvbik7XG5cbiAgcmVuZGVyKCkge1xuICAgIC8vIFRPRE86ICdBbGwnIHRleHQgc2hvdWxkIGJlIHBhc3NlZCBoZXJlIHRvIHNob3cgdHJhbnNsYXRlZCB0ZXh0LlxuICAgIGNvbnN0IGRpc2FibGVkUHJvcGVydHkgPSB0aGlzLnByb3BzLmNoZWNrZWRBbGxEaXNhYmxlZCA/IHsgZGlzYWJsZWQ6IHRydWUgfSA6IG51bGw7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWNvbHVtblwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1jb2x1bW4tYWxsXCI+XG4gICAgICAgICAgeyF0aGlzLnByb3BzLmNoZWNrZWRBbGxIaWRkZW4gP1xuICAgICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmNoZWNrQWxsSGFuZGxlcn1cbiAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5zdGF0ZS5jaGVja2VkQWxsfVxuICAgICAgICAgICAgICBsYWJlbD17dGhpcy5wcm9wcy5hbGxMYWJlbH1cbiAgICAgICAgICAgICAgey4uLmRpc2FibGVkUHJvcGVydHl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPFNlbGVjdGFibGVMaXN0XG4gICAgICAgICAgY2hlY2tlZEFsbD17dGhpcy5wcm9wcy5jaGVja2VkQWxsfVxuICAgICAgICAgIGNoZWNrRGlzYWJsZWQ9e3RoaXMuc3RhdGUuY2hlY2tlZEFsbH1cbiAgICAgICAgICBjaGVja2VkSWRzPXt0aGlzLnByb3BzLmNoZWNrZWRJZHN9XG4gICAgICAgICAgaXRlbXM9e3RoaXMucHJvcHMuZGF0YS5pdGVtc31cbiAgICAgICAgICBpdGVtUmVuZGVyRnVuY3Rpb249e3RoaXMucHJvcHMuaXRlbVJlbmRlckZ1bmN0aW9uID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyV3JhcHBlckZ1bmN0aW9uKHRoaXMucHJvcHMuaW5kZXgpIDogbnVsbH1cbiAgICAgICAgICBzZWxlY3RlZElkPXt0aGlzLnByb3BzLnNlbGVjdGVkSWR9XG4gICAgICAgICAgb25DaGVjaz17dGhpcy5jaGVja0hhbmRsZXJ9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5jbGlja0hhbmRsZXJ9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblZpZXdDb2x1bW4ucHJvcFR5cGVzID0ge1xuICBhbGxMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgY2hlY2tlZElkczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm51bWJlciksXG4gIGNoZWNrZWRBbGw6IFByb3BUeXBlcy5ib29sLFxuICBjaGVja2VkQWxsRGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICBjaGVja2VkQWxsSGlkZGVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgaW5kZXg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgaXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgZGF0YTogUHJvcFR5cGVzLmluc3RhbmNlT2YoQ29sdW1uRGF0YSksXG4gIHNlbGVjdGVkSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHJlZmVyZW5jZUlkczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pKSxcbiAgb25DaGVjazogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2hlY2tBbGw6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cblZpZXdDb2x1bW4uZGVmYXVsdFByb3BzID0ge1xuICBhbGxMYWJlbDogJ0FsbCcsXG4gIGNoZWNrZWRBbGw6IGZhbHNlLFxuICBjaGVja2VkQWxsRGlzYWJsZWQ6IGZhbHNlLFxuICBjaGVja2VkQWxsSGlkZGVuOiBmYWxzZSxcbiAgZGF0YTogbmV3IENvbHVtbkRhdGEoKSxcbiAgaXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxuICBzZWxlY3RlZElkOiBudWxsLFxuICByZWZlcmVuY2VJZHM6IFtdLFxuICBvbkNoZWNrOiAoKSA9PiB7fSxcbiAgb25DaGVja0FsbDogKCkgPT4ge30sXG4gIG9uQ2xpY2s6ICgpID0+IHt9LFxuICBjaGVja2VkSWRzOiBbXSxcbn07XG4iXX0=