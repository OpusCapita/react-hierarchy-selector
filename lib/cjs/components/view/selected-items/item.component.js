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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvc2VsZWN0ZWQtaXRlbXMvaXRlbS5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkl0ZW0iLCJjbGlja0hhbmxkZXIiLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwicmVtb3ZlQ2xpY2tIYW5kbGVyIiwicHJvcHMiLCJvblJlbW92ZUNsaWNrIiwiaXRlbSIsInNvdXJjZUlkIiwicmVmZXJlbmNlSWRzIiwic2xpY2UiLCJpZCIsImRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24iLCJuYW1lIiwiZ2V0UmVtb3ZlSWNvbiIsInJlbW92YWJsZSIsInJlbmRlciIsIml0ZW1SZW5kZXJGdW5jdGlvbiIsIk9iamVjdCIsImFzc2lnbiIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7OytlQU5BO0FBQ0E7O0lBT3FCQSxJOzs7Ozs7Ozs7Ozs7Z0tBU25CQyxZLEdBQWUsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3BCQSxRQUFFQyxlQUFGO0FBQ0QsSyxRQUVEQyxrQixHQUFxQixVQUFDRixDQUFELEVBQU87QUFBQSx3QkFNdEIsTUFBS0csS0FOaUI7QUFBQSxVQUV4QkMsYUFGd0IsZUFFeEJBLGFBRndCO0FBQUEsVUFHeEJDLElBSHdCLGVBR3hCQSxJQUh3QjtBQUFBLFVBSXhCQyxRQUp3QixlQUl4QkEsUUFKd0I7QUFBQSxVQUt4QkMsWUFMd0IsZUFLeEJBLFlBTHdCOztBQU8xQlAsUUFBRUMsZUFBRjtBQUNBRyxvQkFBY0UsUUFBZCxFQUF3QkMsYUFBYUMsS0FBYixFQUF4QixFQUE4Q0gsS0FBS0ksRUFBbkQ7QUFDRCxLLFFBRURDLHlCLEdBQTRCLFlBQU07QUFBQSxVQUN4QkwsSUFEd0IsR0FDZixNQUFLRixLQURVLENBQ3hCRSxJQUR3Qjs7QUFFaEMsYUFDRTtBQUFBO0FBQUE7QUFDR0EsYUFBS007QUFEUixPQURGO0FBS0QsSzs7O2lCQTlCREMsYSw0QkFBZ0I7QUFDZCxXQUFPLEtBQUtULEtBQUwsQ0FBV1UsU0FBWCxHQUNMO0FBQUE7QUFBQSxRQUFNLFdBQVUsMEJBQWhCLEVBQTJDLFNBQVMsS0FBS1gsa0JBQXpEO0FBQ0U7QUFERixLQURLLEdBSUgsSUFKSjtBQUtELEc7O2lCQTBCRFksTSxxQkFBUztBQUFBLGlCQUM4QixLQUFLWCxLQURuQztBQUFBLFFBQ0NFLElBREQsVUFDQ0EsSUFERDtBQUFBLFFBQ09VLGtCQURQLFVBQ09BLGtCQURQOztBQUVQLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSxlQUFmLEVBQStCLFNBQVMsS0FBS2hCLFlBQTdDO0FBQ0dnQiwyQkFDQ0EsbUJBQW1CQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQlosSUFBbEIsQ0FBbkIsQ0FERCxHQUMrQyxLQUFLSyx5QkFBTCxFQUZsRDtBQUdFO0FBQUE7QUFBQSxVQUFLLFdBQVUsYUFBZjtBQUNHLGFBQUtFLGFBQUw7QUFESDtBQUhGLEtBREY7QUFTRCxHOzs7RUE1QytCLGdCQUFNTSxhOztrQkFBbkJwQixJOzs7QUF3RHJCQSxLQUFLcUIsWUFBTCxHQUFvQjtBQUNsQmYsaUJBQWUseUJBQU0sQ0FBRSxDQURMO0FBRWxCVyxzQkFBb0IsSUFGRjtBQUdsQlIsZ0JBQWM7QUFISSxDQUFwQiIsImZpbGUiOiJpdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9ucyAqL1xuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvY2xpY2stZXZlbnRzLWhhdmUta2V5LWV2ZW50cyAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBGYVRyYXNoIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS90cmFzaCc7XG5pbXBvcnQgeyBoaWVyYXJjaHlJdGVtU2hhcGUgfSBmcm9tICcuLi8uLi8uLi90eXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0ZW0gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgZ2V0UmVtb3ZlSWNvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5yZW1vdmFibGUgP1xuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY29tcG9uZW50LWljb24gY2xpY2thYmxlXCIgb25DbGljaz17dGhpcy5yZW1vdmVDbGlja0hhbmRsZXJ9PlxuICAgICAgICA8RmFUcmFzaCAvPlxuICAgICAgPC9zcGFuPlxuICAgICAgOiBudWxsO1xuICB9XG5cbiAgY2xpY2tIYW5sZGVyID0gKGUpID0+IHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgcmVtb3ZlQ2xpY2tIYW5kbGVyID0gKGUpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBvblJlbW92ZUNsaWNrLFxuICAgICAgaXRlbSxcbiAgICAgIHNvdXJjZUlkLFxuICAgICAgcmVmZXJlbmNlSWRzLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgb25SZW1vdmVDbGljayhzb3VyY2VJZCwgcmVmZXJlbmNlSWRzLnNsaWNlKCksIGl0ZW0uaWQpO1xuICB9XG5cbiAgZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbiA9ICgpID0+IHtcbiAgICBjb25zdCB7IGl0ZW0gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuPlxuICAgICAgICB7aXRlbS5uYW1lfVxuICAgICAgPC9zcGFuPlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBpdGVtLCBpdGVtUmVuZGVyRnVuY3Rpb24gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0ZWQtaXRlbVwiIG9uQ2xpY2s9e3RoaXMuY2xpY2tIYW5sZGVyfT5cbiAgICAgICAge2l0ZW1SZW5kZXJGdW5jdGlvbiA/XG4gICAgICAgICAgaXRlbVJlbmRlckZ1bmN0aW9uKE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pKSA6IHRoaXMuZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbigpfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJpZ2h0LWJsb2NrXCI+XG4gICAgICAgICAge3RoaXMuZ2V0UmVtb3ZlSWNvbigpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuSXRlbS5wcm9wVHlwZXMgPSB7XG4gIGl0ZW06IGhpZXJhcmNoeUl0ZW1TaGFwZS5pc1JlcXVpcmVkLFxuICBpdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICByZW1vdmFibGU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIHNvdXJjZUlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHJlZmVyZW5jZUlkczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pKSxcbiAgb25SZW1vdmVDbGljazogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5JdGVtLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25SZW1vdmVDbGljazogKCkgPT4ge30sXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcbiAgcmVmZXJlbmNlSWRzOiBbXSxcbn07XG4iXX0=