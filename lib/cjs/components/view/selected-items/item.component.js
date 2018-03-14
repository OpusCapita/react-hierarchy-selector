'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _trash = require('react-icons/lib/fa/trash');

var _trash2 = _interopRequireDefault(_trash);

var _types = require('../../../types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

var Item = function (_React$PureComponent) {
  _inherits(Item, _React$PureComponent);

  function Item() {
    var _temp, _this, _ret;

    _classCallCheck(this, Item);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.clickHanlder = function (e) {
      e.stopPropagation();
    }, _this.removeClickHandler = function (e) {
      var _this$props = _this.props,
          onRemoveClick = _this$props.onRemoveClick,
          item = _this$props.item,
          sourceId = _this$props.sourceId,
          referenceIds = _this$props.referenceIds;

      e.stopPropagation();
      onRemoveClick(sourceId, referenceIds.slice(), item.id);
    }, _this.defaultItemRenderFunction = function () {
      var item = _this.props.item;

      return _react2.default.createElement(
        'span',
        null,
        item.name
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Item.prototype.getRemoveIcon = function getRemoveIcon() {
    return this.props.removable ? _react2.default.createElement(
      'span',
      { className: 'component-icon clickable', onClick: this.removeClickHandler },
      _react2.default.createElement(_trash2.default, null)
    ) : null;
  };

  Item.prototype.render = function render() {
    var _props = this.props,
        item = _props.item,
        itemRenderFunction = _props.itemRenderFunction;

    return _react2.default.createElement(
      'div',
      { className: 'selected-item', onClick: this.clickHanlder },
      itemRenderFunction ? itemRenderFunction(Object.assign({}, item)) : this.defaultItemRenderFunction(),
      _react2.default.createElement(
        'div',
        { className: 'right-block' },
        this.getRemoveIcon()
      )
    );
  };

  return Item;
}(_react2.default.PureComponent);

exports.default = Item;


Item.defaultProps = {
  onRemoveClick: function onRemoveClick() {},
  itemRenderFunction: null,
  referenceIds: []
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvc2VsZWN0ZWQtaXRlbXMvaXRlbS5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkl0ZW0iLCJjbGlja0hhbmxkZXIiLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwicmVtb3ZlQ2xpY2tIYW5kbGVyIiwicHJvcHMiLCJvblJlbW92ZUNsaWNrIiwiaXRlbSIsInNvdXJjZUlkIiwicmVmZXJlbmNlSWRzIiwic2xpY2UiLCJpZCIsImRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24iLCJuYW1lIiwiZ2V0UmVtb3ZlSWNvbiIsInJlbW92YWJsZSIsInJlbmRlciIsIml0ZW1SZW5kZXJGdW5jdGlvbiIsIk9iamVjdCIsImFzc2lnbiIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7OytlQU5BO0FBQ0E7O0lBT3FCQSxJOzs7Ozs7Ozs7Ozs7Z0tBU25CQyxZLEdBQWUsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3BCQSxRQUFFQyxlQUFGO0FBQ0QsSyxRQUVEQyxrQixHQUFxQixVQUFDRixDQUFELEVBQU87QUFBQSx3QkFNdEIsTUFBS0csS0FOaUI7QUFBQSxVQUV4QkMsYUFGd0IsZUFFeEJBLGFBRndCO0FBQUEsVUFHeEJDLElBSHdCLGVBR3hCQSxJQUh3QjtBQUFBLFVBSXhCQyxRQUp3QixlQUl4QkEsUUFKd0I7QUFBQSxVQUt4QkMsWUFMd0IsZUFLeEJBLFlBTHdCOztBQU8xQlAsUUFBRUMsZUFBRjtBQUNBRyxvQkFBY0UsUUFBZCxFQUF3QkMsYUFBYUMsS0FBYixFQUF4QixFQUE4Q0gsS0FBS0ksRUFBbkQ7QUFDRCxLLFFBRURDLHlCLEdBQTRCLFlBQU07QUFBQSxVQUN4QkwsSUFEd0IsR0FDZixNQUFLRixLQURVLENBQ3hCRSxJQUR3Qjs7QUFFaEMsYUFDRTtBQUFBO0FBQUE7QUFDR0EsYUFBS007QUFEUixPQURGO0FBS0QsSzs7O2lCQTlCREMsYSw0QkFBZ0I7QUFDZCxXQUFPLEtBQUtULEtBQUwsQ0FBV1UsU0FBWCxHQUNMO0FBQUE7QUFBQSxRQUFNLFdBQVUsMEJBQWhCLEVBQTJDLFNBQVMsS0FBS1gsa0JBQXpEO0FBQ0U7QUFERixLQURLLEdBSUgsSUFKSjtBQUtELEc7O2lCQTBCRFksTSxxQkFBUztBQUFBLGlCQUM4QixLQUFLWCxLQURuQztBQUFBLFFBQ0NFLElBREQsVUFDQ0EsSUFERDtBQUFBLFFBQ09VLGtCQURQLFVBQ09BLGtCQURQOztBQUVQLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSxlQUFmLEVBQStCLFNBQVMsS0FBS2hCLFlBQTdDO0FBQ0dnQiwyQkFDQ0EsbUJBQW1CQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQlosSUFBbEIsQ0FBbkIsQ0FERCxHQUMrQyxLQUFLSyx5QkFBTCxFQUZsRDtBQUdFO0FBQUE7QUFBQSxVQUFLLFdBQVUsYUFBZjtBQUNHLGFBQUtFLGFBQUw7QUFESDtBQUhGLEtBREY7QUFTRCxHOzs7RUE1QytCLGdCQUFNTSxhOztrQkFBbkJwQixJOzs7QUF3RHJCQSxLQUFLcUIsWUFBTCxHQUFvQjtBQUNsQmYsaUJBQWUseUJBQU0sQ0FBRSxDQURMO0FBRWxCVyxzQkFBb0IsSUFGRjtBQUdsQlIsZ0JBQWM7QUFISSxDQUFwQiIsImZpbGUiOiJpdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9ucyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5pbXBvcnQgRmFUcmFzaCBmcm9tICdyZWFjdC1pY29ucy9saWIvZmEvdHJhc2gnO1xyXG5pbXBvcnQgeyBoaWVyYXJjaHlJdGVtU2hhcGUgfSBmcm9tICcuLi8uLi8uLi90eXBlcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XHJcbiAgZ2V0UmVtb3ZlSWNvbigpIHtcclxuICAgIHJldHVybiB0aGlzLnByb3BzLnJlbW92YWJsZSA/XHJcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNvbXBvbmVudC1pY29uIGNsaWNrYWJsZVwiIG9uQ2xpY2s9e3RoaXMucmVtb3ZlQ2xpY2tIYW5kbGVyfT5cclxuICAgICAgICA8RmFUcmFzaCAvPlxyXG4gICAgICA8L3NwYW4+XHJcbiAgICAgIDogbnVsbDtcclxuICB9XHJcblxyXG4gIGNsaWNrSGFubGRlciA9IChlKSA9PiB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlQ2xpY2tIYW5kbGVyID0gKGUpID0+IHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgb25SZW1vdmVDbGljayxcclxuICAgICAgaXRlbSxcclxuICAgICAgc291cmNlSWQsXHJcbiAgICAgIHJlZmVyZW5jZUlkcyxcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIG9uUmVtb3ZlQ2xpY2soc291cmNlSWQsIHJlZmVyZW5jZUlkcy5zbGljZSgpLCBpdGVtLmlkKTtcclxuICB9XHJcblxyXG4gIGRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24gPSAoKSA9PiB7XHJcbiAgICBjb25zdCB7IGl0ZW0gfSA9IHRoaXMucHJvcHM7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8c3Bhbj5cclxuICAgICAgICB7aXRlbS5uYW1lfVxyXG4gICAgICA8L3NwYW4+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBpdGVtLCBpdGVtUmVuZGVyRnVuY3Rpb24gfSA9IHRoaXMucHJvcHM7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdGVkLWl0ZW1cIiBvbkNsaWNrPXt0aGlzLmNsaWNrSGFubGRlcn0+XHJcbiAgICAgICAge2l0ZW1SZW5kZXJGdW5jdGlvbiA/XHJcbiAgICAgICAgICBpdGVtUmVuZGVyRnVuY3Rpb24oT2JqZWN0LmFzc2lnbih7fSwgaXRlbSkpIDogdGhpcy5kZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uKCl9XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyaWdodC1ibG9ja1wiPlxyXG4gICAgICAgICAge3RoaXMuZ2V0UmVtb3ZlSWNvbigpfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5JdGVtLnByb3BUeXBlcyA9IHtcclxuICBpdGVtOiBoaWVyYXJjaHlJdGVtU2hhcGUuaXNSZXF1aXJlZCxcclxuICBpdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxyXG4gIHJlbW92YWJsZTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICBzb3VyY2VJZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gIHJlZmVyZW5jZUlkczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pKSxcclxuICBvblJlbW92ZUNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcclxufTtcclxuXHJcbkl0ZW0uZGVmYXVsdFByb3BzID0ge1xyXG4gIG9uUmVtb3ZlQ2xpY2s6ICgpID0+IHt9LFxyXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcclxuICByZWZlcmVuY2VJZHM6IFtdLFxyXG59O1xyXG4iXX0=