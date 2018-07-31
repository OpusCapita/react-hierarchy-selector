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
        itemRenderFunction = _props.itemRenderFunction,
        removable = _props.removable;

    return _react2.default.createElement(
      'div',
      { className: 'selected-item', onClick: this.clickHanlder },
      _react2.default.createElement(
        'div',
        { className: 'left-block' },
        itemRenderFunction ? itemRenderFunction(Object.assign({}, item)) : this.defaultItemRenderFunction()
      ),
      removable ? _react2.default.createElement(
        'div',
        { className: 'right-block' },
        this.getRemoveIcon()
      ) : null
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvc2VsZWN0ZWQtaXRlbXMvaXRlbS5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkl0ZW0iLCJjbGlja0hhbmxkZXIiLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwicmVtb3ZlQ2xpY2tIYW5kbGVyIiwicHJvcHMiLCJvblJlbW92ZUNsaWNrIiwiaXRlbSIsInNvdXJjZUlkIiwicmVmZXJlbmNlSWRzIiwic2xpY2UiLCJpZCIsImRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24iLCJuYW1lIiwiZ2V0UmVtb3ZlSWNvbiIsInJlbW92YWJsZSIsInJlbmRlciIsIml0ZW1SZW5kZXJGdW5jdGlvbiIsIk9iamVjdCIsImFzc2lnbiIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7OytlQU5BO0FBQ0E7O0lBT3FCQSxJOzs7Ozs7Ozs7Ozs7Z0tBU25CQyxZLEdBQWUsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3BCQSxRQUFFQyxlQUFGO0FBQ0QsSyxRQUVEQyxrQixHQUFxQixVQUFDRixDQUFELEVBQU87QUFBQSx3QkFNdEIsTUFBS0csS0FOaUI7QUFBQSxVQUV4QkMsYUFGd0IsZUFFeEJBLGFBRndCO0FBQUEsVUFHeEJDLElBSHdCLGVBR3hCQSxJQUh3QjtBQUFBLFVBSXhCQyxRQUp3QixlQUl4QkEsUUFKd0I7QUFBQSxVQUt4QkMsWUFMd0IsZUFLeEJBLFlBTHdCOztBQU8xQlAsUUFBRUMsZUFBRjtBQUNBRyxvQkFBY0UsUUFBZCxFQUF3QkMsYUFBYUMsS0FBYixFQUF4QixFQUE4Q0gsS0FBS0ksRUFBbkQ7QUFDRCxLLFFBRURDLHlCLEdBQTRCLFlBQU07QUFBQSxVQUN4QkwsSUFEd0IsR0FDZixNQUFLRixLQURVLENBQ3hCRSxJQUR3Qjs7QUFFaEMsYUFDRTtBQUFBO0FBQUE7QUFDR0EsYUFBS007QUFEUixPQURGO0FBS0QsSzs7O2lCQTlCREMsYSw0QkFBZ0I7QUFDZCxXQUFPLEtBQUtULEtBQUwsQ0FBV1UsU0FBWCxHQUNMO0FBQUE7QUFBQSxRQUFNLFdBQVUsMEJBQWhCLEVBQTJDLFNBQVMsS0FBS1gsa0JBQXpEO0FBQ0U7QUFERixLQURLLEdBSUgsSUFKSjtBQUtELEc7O2lCQTBCRFksTSxxQkFBUztBQUFBLGlCQUN5QyxLQUFLWCxLQUQ5QztBQUFBLFFBQ0NFLElBREQsVUFDQ0EsSUFERDtBQUFBLFFBQ09VLGtCQURQLFVBQ09BLGtCQURQO0FBQUEsUUFDMkJGLFNBRDNCLFVBQzJCQSxTQUQzQjs7QUFFUCxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsZUFBZixFQUErQixTQUFTLEtBQUtkLFlBQTdDO0FBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxZQUFmO0FBQ0dnQiw2QkFDQ0EsbUJBQW1CQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQlosSUFBbEIsQ0FBbkIsQ0FERCxHQUMrQyxLQUFLSyx5QkFBTDtBQUZsRCxPQURGO0FBS0dHLGtCQUNDO0FBQUE7QUFBQSxVQUFLLFdBQVUsYUFBZjtBQUNHLGFBQUtELGFBQUw7QUFESCxPQURELEdBR1U7QUFSYixLQURGO0FBYUQsRzs7O0VBaEQrQixnQkFBTU0sYTs7a0JBQW5CcEIsSTs7O0FBNERyQkEsS0FBS3FCLFlBQUwsR0FBb0I7QUFDbEJmLGlCQUFlLHlCQUFNLENBQUUsQ0FETDtBQUVsQlcsc0JBQW9CLElBRkY7QUFHbEJSLGdCQUFjO0FBSEksQ0FBcEIiLCJmaWxlIjoiaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L2NsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHMgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgRmFUcmFzaCBmcm9tICdyZWFjdC1pY29ucy9saWIvZmEvdHJhc2gnO1xuaW1wb3J0IHsgaGllcmFyY2h5SXRlbVNoYXBlIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGdldFJlbW92ZUljb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMucmVtb3ZhYmxlID9cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNvbXBvbmVudC1pY29uIGNsaWNrYWJsZVwiIG9uQ2xpY2s9e3RoaXMucmVtb3ZlQ2xpY2tIYW5kbGVyfT5cbiAgICAgICAgPEZhVHJhc2ggLz5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDogbnVsbDtcbiAgfVxuXG4gIGNsaWNrSGFubGRlciA9IChlKSA9PiB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIHJlbW92ZUNsaWNrSGFuZGxlciA9IChlKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgb25SZW1vdmVDbGljayxcbiAgICAgIGl0ZW0sXG4gICAgICBzb3VyY2VJZCxcbiAgICAgIHJlZmVyZW5jZUlkcyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIG9uUmVtb3ZlQ2xpY2soc291cmNlSWQsIHJlZmVyZW5jZUlkcy5zbGljZSgpLCBpdGVtLmlkKTtcbiAgfVxuXG4gIGRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgeyBpdGVtIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8c3Bhbj5cbiAgICAgICAge2l0ZW0ubmFtZX1cbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaXRlbSwgaXRlbVJlbmRlckZ1bmN0aW9uLCByZW1vdmFibGUgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0ZWQtaXRlbVwiIG9uQ2xpY2s9e3RoaXMuY2xpY2tIYW5sZGVyfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZWZ0LWJsb2NrXCI+XG4gICAgICAgICAge2l0ZW1SZW5kZXJGdW5jdGlvbiA/XG4gICAgICAgICAgICBpdGVtUmVuZGVyRnVuY3Rpb24oT2JqZWN0LmFzc2lnbih7fSwgaXRlbSkpIDogdGhpcy5kZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uKCl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7cmVtb3ZhYmxlID9cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJpZ2h0LWJsb2NrXCI+XG4gICAgICAgICAgICB7dGhpcy5nZXRSZW1vdmVJY29uKCl9XG4gICAgICAgICAgPC9kaXY+IDogbnVsbFxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkl0ZW0ucHJvcFR5cGVzID0ge1xuICBpdGVtOiBoaWVyYXJjaHlJdGVtU2hhcGUuaXNSZXF1aXJlZCxcbiAgaXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgcmVtb3ZhYmxlOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBzb3VyY2VJZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICByZWZlcmVuY2VJZHM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5udW1iZXJdKSksXG4gIG9uUmVtb3ZlQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxufTtcblxuSXRlbS5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uUmVtb3ZlQ2xpY2s6ICgpID0+IHt9LFxuICBpdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXG4gIHJlZmVyZW5jZUlkczogW10sXG59O1xuIl19