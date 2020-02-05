"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactCheckbox = _interopRequireDefault(require("@opuscapita/react-checkbox"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _shortid = _interopRequireDefault(require("shortid"));

var _selectableList = _interopRequireDefault(require("../../selectable-list"));

var _columnData = _interopRequireDefault(require("../../../models/column/column-data"));

require("./column.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ViewColumn =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(ViewColumn, _React$PureComponent);

  function ViewColumn(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "clickHandler", function (id, event) {
      _this.props.onClick(_this.props.index, id, event);
    });

    _defineProperty(_assertThisInitialized(_this), "checkHandler", function (id, checkState) {
      _this.props.onCheck(_this.props.referenceIds.slice(), id, checkState);
    });

    _defineProperty(_assertThisInitialized(_this), "checkAllHandler", function (e) {
      var newState = e.target.checked;

      _this.props.onCheckAll(_this.props.referenceIds.slice(), newState);

      _this.setState({
        checkedAll: newState
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderWrapperFunction", function (index) {
      return function (item, defaultRenderFunction) {
        return _this.props.itemRenderFunction(index, item, defaultRenderFunction);
      };
    });

    _this.id = (0, _shortid["default"])();
    _this.state = {
      checkedAll: _this.props.checkedAll
    };
    return _this;
  }

  var _proto = ViewColumn.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.checkedAll !== this.props.checkedAll) {
      this.setState({
        checkedAll: nextProps.checkedAll
      });
    }
  };

  _proto.render = function render() {
    // TODO: 'All' text should be passed here to show translated text.
    var disabledProperty = this.props.checkedAllDisabled ? {
      disabled: true
    } : null;
    return _react["default"].createElement("div", {
      className: "oc-hierarchy-selector-column"
    }, _react["default"].createElement("div", {
      className: "oc-hierarchy-selector-column-all"
    }, !this.props.checkedAllHidden ? _react["default"].createElement(_reactCheckbox["default"], _extends({
      id: "oc-hierarchy-selector-select-all-" + this.id,
      name: "oc-hierarchy-selector-select-all-" + this.id,
      onChange: this.checkAllHandler,
      checked: this.state.checkedAll,
      label: this.props.allLabel
    }, disabledProperty)) : null), _react["default"].createElement(_selectableList["default"], {
      checkedAll: this.props.checkedAll,
      checkDisabled: this.state.checkedAll,
      checkedIds: this.props.checkedIds,
      items: this.props.data.items,
      itemRenderFunction: this.props.itemRenderFunction ? this.renderWrapperFunction(this.props.index) : null,
      selectedId: this.props.selectedId,
      onCheck: this.checkHandler,
      onClick: this.clickHandler
    }));
  };

  return ViewColumn;
}(_react["default"].PureComponent);

exports["default"] = ViewColumn;
ViewColumn.defaultProps = {
  allLabel: 'All',
  checkedAll: false,
  checkedAllDisabled: false,
  checkedAllHidden: false,
  data: new _columnData["default"](),
  itemRenderFunction: null,
  selectedId: null,
  referenceIds: [],
  onCheck: function onCheck() {},
  onCheckAll: function onCheckAll() {},
  onClick: function onClick() {},
  checkedIds: []
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvY29sdW1uL2NvbHVtbi5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlZpZXdDb2x1bW4iLCJwcm9wcyIsImlkIiwiZXZlbnQiLCJvbkNsaWNrIiwiaW5kZXgiLCJjaGVja1N0YXRlIiwib25DaGVjayIsInJlZmVyZW5jZUlkcyIsInNsaWNlIiwiZSIsIm5ld1N0YXRlIiwidGFyZ2V0IiwiY2hlY2tlZCIsIm9uQ2hlY2tBbGwiLCJzZXRTdGF0ZSIsImNoZWNrZWRBbGwiLCJpdGVtIiwiZGVmYXVsdFJlbmRlckZ1bmN0aW9uIiwiaXRlbVJlbmRlckZ1bmN0aW9uIiwic3RhdGUiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwicmVuZGVyIiwiZGlzYWJsZWRQcm9wZXJ0eSIsImNoZWNrZWRBbGxEaXNhYmxlZCIsImRpc2FibGVkIiwiY2hlY2tlZEFsbEhpZGRlbiIsImNoZWNrQWxsSGFuZGxlciIsImFsbExhYmVsIiwiY2hlY2tlZElkcyIsImRhdGEiLCJpdGVtcyIsInJlbmRlcldyYXBwZXJGdW5jdGlvbiIsInNlbGVjdGVkSWQiLCJjaGVja0hhbmRsZXIiLCJjbGlja0hhbmRsZXIiLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJDb2x1bW5EYXRhIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFU7Ozs7O0FBQ25CLHNCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQ2pCLDRDQUFNQSxLQUFOOztBQURpQixtRUFnQkosVUFBQ0MsRUFBRCxFQUFLQyxLQUFMLEVBQWU7QUFDNUIsWUFBS0YsS0FBTCxDQUFXRyxPQUFYLENBQW1CLE1BQUtILEtBQUwsQ0FBV0ksS0FBOUIsRUFBcUNILEVBQXJDLEVBQXlDQyxLQUF6QztBQUNELEtBbEJrQjs7QUFBQSxtRUFv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LFFBQVEsRUFBRSxLQURjO0FBRXhCYixFQUFBQSxVQUFVLEVBQUUsS0FGWTtBQUd4QlMsRUFBQUEsa0JBQWtCLEVBQUUsS0FISTtBQUl4QkUsRUFBQUEsZ0JBQWdCLEVBQUUsS0FKTTtBQUt4QkksRUFBQUEsSUFBSSxFQUFFLElBQUlTLHNCQUFKLEVBTGtCO0FBTXhCckIsRUFBQUEsa0JBQWtCLEVBQUUsSUFOSTtBQU94QmUsRUFBQUEsVUFBVSxFQUFFLElBUFk7QUFReEIxQixFQUFBQSxZQUFZLEVBQUUsRUFSVTtBQVN4QkQsRUFBQUEsT0FBTyxFQUFFLG1CQUFNLENBQUUsQ0FUTztBQVV4Qk8sRUFBQUEsVUFBVSxFQUFFLHNCQUFNLENBQUUsQ0FWSTtBQVd4QlYsRUFBQUEsT0FBTyxFQUFFLG1CQUFNLENBQUUsQ0FYTztBQVl4QjBCLEVBQUFBLFVBQVUsRUFBRTtBQVpZLENBQTFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBDaGVja2JveCBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1jaGVja2JveCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHNob3J0aWQgZnJvbSAnc2hvcnRpZCc7XG5cbmltcG9ydCBTZWxlY3RhYmxlTGlzdCBmcm9tICcuLi8uLi9zZWxlY3RhYmxlLWxpc3QnO1xuaW1wb3J0IENvbHVtbkRhdGEgZnJvbSAnLi4vLi4vLi4vbW9kZWxzL2NvbHVtbi9jb2x1bW4tZGF0YSc7XG5cbmltcG9ydCAnLi9jb2x1bW4uc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdDb2x1bW4gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5pZCA9IHNob3J0aWQoKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY2hlY2tlZEFsbDogdGhpcy5wcm9wcy5jaGVja2VkQWxsLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGlmIChuZXh0UHJvcHMuY2hlY2tlZEFsbCAhPT0gdGhpcy5wcm9wcy5jaGVja2VkQWxsKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY2hlY2tlZEFsbDogbmV4dFByb3BzLmNoZWNrZWRBbGwsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjbGlja0hhbmRsZXIgPSAoaWQsIGV2ZW50KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbkNsaWNrKHRoaXMucHJvcHMuaW5kZXgsIGlkLCBldmVudCk7XG4gIH1cblxuICBjaGVja0hhbmRsZXIgPSAoaWQsIGNoZWNrU3RhdGUpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2hlY2sodGhpcy5wcm9wcy5yZWZlcmVuY2VJZHMuc2xpY2UoKSwgaWQsIGNoZWNrU3RhdGUpO1xuICB9XG5cbiAgY2hlY2tBbGxIYW5kbGVyID0gKGUpID0+IHtcbiAgICBjb25zdCBuZXdTdGF0ZSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgdGhpcy5wcm9wcy5vbkNoZWNrQWxsKHRoaXMucHJvcHMucmVmZXJlbmNlSWRzLnNsaWNlKCksIG5ld1N0YXRlKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNoZWNrZWRBbGw6IG5ld1N0YXRlLFxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyV3JhcHBlckZ1bmN0aW9uID0gaW5kZXggPT4gKGl0ZW0sIGRlZmF1bHRSZW5kZXJGdW5jdGlvbikgPT5cbiAgICB0aGlzLnByb3BzLml0ZW1SZW5kZXJGdW5jdGlvbihpbmRleCwgaXRlbSwgZGVmYXVsdFJlbmRlckZ1bmN0aW9uKTtcblxuICByZW5kZXIoKSB7XG4gICAgLy8gVE9ETzogJ0FsbCcgdGV4dCBzaG91bGQgYmUgcGFzc2VkIGhlcmUgdG8gc2hvdyB0cmFuc2xhdGVkIHRleHQuXG4gICAgY29uc3QgZGlzYWJsZWRQcm9wZXJ0eSA9IHRoaXMucHJvcHMuY2hlY2tlZEFsbERpc2FibGVkID8geyBkaXNhYmxlZDogdHJ1ZSB9IDogbnVsbDtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItY29sdW1uXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWNvbHVtbi1hbGxcIj5cbiAgICAgICAgICB7IXRoaXMucHJvcHMuY2hlY2tlZEFsbEhpZGRlbiA/XG4gICAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgICAgaWQ9e2BvYy1oaWVyYXJjaHktc2VsZWN0b3Itc2VsZWN0LWFsbC0ke3RoaXMuaWR9YH1cbiAgICAgICAgICAgICAgbmFtZT17YG9jLWhpZXJhcmNoeS1zZWxlY3Rvci1zZWxlY3QtYWxsLSR7dGhpcy5pZH1gfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5jaGVja0FsbEhhbmRsZXJ9XG4gICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuc3RhdGUuY2hlY2tlZEFsbH1cbiAgICAgICAgICAgICAgbGFiZWw9e3RoaXMucHJvcHMuYWxsTGFiZWx9XG4gICAgICAgICAgICAgIHsuLi5kaXNhYmxlZFByb3BlcnR5fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxTZWxlY3RhYmxlTGlzdFxuICAgICAgICAgIGNoZWNrZWRBbGw9e3RoaXMucHJvcHMuY2hlY2tlZEFsbH1cbiAgICAgICAgICBjaGVja0Rpc2FibGVkPXt0aGlzLnN0YXRlLmNoZWNrZWRBbGx9XG4gICAgICAgICAgY2hlY2tlZElkcz17dGhpcy5wcm9wcy5jaGVja2VkSWRzfVxuICAgICAgICAgIGl0ZW1zPXt0aGlzLnByb3BzLmRhdGEuaXRlbXN9XG4gICAgICAgICAgaXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLml0ZW1SZW5kZXJGdW5jdGlvbiA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcldyYXBwZXJGdW5jdGlvbih0aGlzLnByb3BzLmluZGV4KSA6IG51bGx9XG4gICAgICAgICAgc2VsZWN0ZWRJZD17dGhpcy5wcm9wcy5zZWxlY3RlZElkfVxuICAgICAgICAgIG9uQ2hlY2s9e3RoaXMuY2hlY2tIYW5kbGVyfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY2xpY2tIYW5kbGVyfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5WaWV3Q29sdW1uLnByb3BUeXBlcyA9IHtcbiAgYWxsTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIGNoZWNrZWRJZHM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpLFxuICBjaGVja2VkQWxsOiBQcm9wVHlwZXMuYm9vbCxcbiAgY2hlY2tlZEFsbERpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgY2hlY2tlZEFsbEhpZGRlbjogUHJvcFR5cGVzLmJvb2wsXG4gIGluZGV4OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gIGRhdGE6IFByb3BUeXBlcy5pbnN0YW5jZU9mKENvbHVtbkRhdGEpLFxuICBzZWxlY3RlZElkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICByZWZlcmVuY2VJZHM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5udW1iZXJdKSksXG4gIG9uQ2hlY2s6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNoZWNrQWxsOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5WaWV3Q29sdW1uLmRlZmF1bHRQcm9wcyA9IHtcbiAgYWxsTGFiZWw6ICdBbGwnLFxuICBjaGVja2VkQWxsOiBmYWxzZSxcbiAgY2hlY2tlZEFsbERpc2FibGVkOiBmYWxzZSxcbiAgY2hlY2tlZEFsbEhpZGRlbjogZmFsc2UsXG4gIGRhdGE6IG5ldyBDb2x1bW5EYXRhKCksXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcbiAgc2VsZWN0ZWRJZDogbnVsbCxcbiAgcmVmZXJlbmNlSWRzOiBbXSxcbiAgb25DaGVjazogKCkgPT4ge30sXG4gIG9uQ2hlY2tBbGw6ICgpID0+IHt9LFxuICBvbkNsaWNrOiAoKSA9PiB7fSxcbiAgY2hlY2tlZElkczogW10sXG59O1xuIl19