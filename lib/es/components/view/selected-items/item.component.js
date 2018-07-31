function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import PropTypes from 'prop-types';
import FaTrash from 'react-icons/lib/fa/trash';
import { hierarchyItemShape } from '../../../types';

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

      return React.createElement(
        'span',
        null,
        item.name
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Item.prototype.getRemoveIcon = function getRemoveIcon() {
    return this.props.removable ? React.createElement(
      'span',
      { className: 'component-icon clickable', onClick: this.removeClickHandler },
      React.createElement(FaTrash, null)
    ) : null;
  };

  Item.prototype.render = function render() {
    var _props = this.props,
        item = _props.item,
        itemRenderFunction = _props.itemRenderFunction,
        removable = _props.removable;

    return React.createElement(
      'div',
      { className: 'selected-item', onClick: this.clickHanlder },
      React.createElement(
        'div',
        { className: 'left-block' },
        itemRenderFunction ? itemRenderFunction(Object.assign({}, item)) : this.defaultItemRenderFunction()
      ),
      removable ? React.createElement(
        'div',
        { className: 'right-block' },
        this.getRemoveIcon()
      ) : null
    );
  };

  return Item;
}(React.PureComponent);

export { Item as default };


Item.defaultProps = {
  onRemoveClick: function onRemoveClick() {},
  itemRenderFunction: null,
  referenceIds: []
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvc2VsZWN0ZWQtaXRlbXMvaXRlbS5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiRmFUcmFzaCIsImhpZXJhcmNoeUl0ZW1TaGFwZSIsIkl0ZW0iLCJjbGlja0hhbmxkZXIiLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwicmVtb3ZlQ2xpY2tIYW5kbGVyIiwicHJvcHMiLCJvblJlbW92ZUNsaWNrIiwiaXRlbSIsInNvdXJjZUlkIiwicmVmZXJlbmNlSWRzIiwic2xpY2UiLCJpZCIsImRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24iLCJuYW1lIiwiZ2V0UmVtb3ZlSWNvbiIsInJlbW92YWJsZSIsInJlbmRlciIsIml0ZW1SZW5kZXJGdW5jdGlvbiIsIk9iamVjdCIsImFzc2lnbiIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7O0FBRUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxPQUFQLE1BQW9CLDBCQUFwQjtBQUNBLFNBQVNDLGtCQUFULFFBQW1DLGdCQUFuQzs7SUFFcUJDLEk7Ozs7Ozs7Ozs7OztnS0FTbkJDLFksR0FBZSxVQUFDQyxDQUFELEVBQU87QUFDcEJBLFFBQUVDLGVBQUY7QUFDRCxLLFFBRURDLGtCLEdBQXFCLFVBQUNGLENBQUQsRUFBTztBQUFBLHdCQU10QixNQUFLRyxLQU5pQjtBQUFBLFVBRXhCQyxhQUZ3QixlQUV4QkEsYUFGd0I7QUFBQSxVQUd4QkMsSUFId0IsZUFHeEJBLElBSHdCO0FBQUEsVUFJeEJDLFFBSndCLGVBSXhCQSxRQUp3QjtBQUFBLFVBS3hCQyxZQUx3QixlQUt4QkEsWUFMd0I7O0FBTzFCUCxRQUFFQyxlQUFGO0FBQ0FHLG9CQUFjRSxRQUFkLEVBQXdCQyxhQUFhQyxLQUFiLEVBQXhCLEVBQThDSCxLQUFLSSxFQUFuRDtBQUNELEssUUFFREMseUIsR0FBNEIsWUFBTTtBQUFBLFVBQ3hCTCxJQUR3QixHQUNmLE1BQUtGLEtBRFUsQ0FDeEJFLElBRHdCOztBQUVoQyxhQUNFO0FBQUE7QUFBQTtBQUNHQSxhQUFLTTtBQURSLE9BREY7QUFLRCxLOzs7aUJBOUJEQyxhLDRCQUFnQjtBQUNkLFdBQU8sS0FBS1QsS0FBTCxDQUFXVSxTQUFYLEdBQ0w7QUFBQTtBQUFBLFFBQU0sV0FBVSwwQkFBaEIsRUFBMkMsU0FBUyxLQUFLWCxrQkFBekQ7QUFDRSwwQkFBQyxPQUFEO0FBREYsS0FESyxHQUlILElBSko7QUFLRCxHOztpQkEwQkRZLE0scUJBQVM7QUFBQSxpQkFDeUMsS0FBS1gsS0FEOUM7QUFBQSxRQUNDRSxJQURELFVBQ0NBLElBREQ7QUFBQSxRQUNPVSxrQkFEUCxVQUNPQSxrQkFEUDtBQUFBLFFBQzJCRixTQUQzQixVQUMyQkEsU0FEM0I7O0FBRVAsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLGVBQWYsRUFBK0IsU0FBUyxLQUFLZCxZQUE3QztBQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsWUFBZjtBQUNHZ0IsNkJBQ0NBLG1CQUFtQkMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JaLElBQWxCLENBQW5CLENBREQsR0FDK0MsS0FBS0sseUJBQUw7QUFGbEQsT0FERjtBQUtHRyxrQkFDQztBQUFBO0FBQUEsVUFBSyxXQUFVLGFBQWY7QUFDRyxhQUFLRCxhQUFMO0FBREgsT0FERCxHQUdVO0FBUmIsS0FERjtBQWFELEc7OztFQWhEK0JsQixNQUFNd0IsYTs7U0FBbkJwQixJOzs7QUE0RHJCQSxLQUFLcUIsWUFBTCxHQUFvQjtBQUNsQmYsaUJBQWUseUJBQU0sQ0FBRSxDQURMO0FBRWxCVyxzQkFBb0IsSUFGRjtBQUdsQlIsZ0JBQWM7QUFISSxDQUFwQiIsImZpbGUiOiJpdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9ucyAqL1xuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvY2xpY2stZXZlbnRzLWhhdmUta2V5LWV2ZW50cyAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBGYVRyYXNoIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS90cmFzaCc7XG5pbXBvcnQgeyBoaWVyYXJjaHlJdGVtU2hhcGUgfSBmcm9tICcuLi8uLi8uLi90eXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0ZW0gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgZ2V0UmVtb3ZlSWNvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5yZW1vdmFibGUgP1xuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY29tcG9uZW50LWljb24gY2xpY2thYmxlXCIgb25DbGljaz17dGhpcy5yZW1vdmVDbGlja0hhbmRsZXJ9PlxuICAgICAgICA8RmFUcmFzaCAvPlxuICAgICAgPC9zcGFuPlxuICAgICAgOiBudWxsO1xuICB9XG5cbiAgY2xpY2tIYW5sZGVyID0gKGUpID0+IHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgcmVtb3ZlQ2xpY2tIYW5kbGVyID0gKGUpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBvblJlbW92ZUNsaWNrLFxuICAgICAgaXRlbSxcbiAgICAgIHNvdXJjZUlkLFxuICAgICAgcmVmZXJlbmNlSWRzLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgb25SZW1vdmVDbGljayhzb3VyY2VJZCwgcmVmZXJlbmNlSWRzLnNsaWNlKCksIGl0ZW0uaWQpO1xuICB9XG5cbiAgZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbiA9ICgpID0+IHtcbiAgICBjb25zdCB7IGl0ZW0gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuPlxuICAgICAgICB7aXRlbS5uYW1lfVxuICAgICAgPC9zcGFuPlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBpdGVtLCBpdGVtUmVuZGVyRnVuY3Rpb24sIHJlbW92YWJsZSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWxlY3RlZC1pdGVtXCIgb25DbGljaz17dGhpcy5jbGlja0hhbmxkZXJ9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxlZnQtYmxvY2tcIj5cbiAgICAgICAgICB7aXRlbVJlbmRlckZ1bmN0aW9uID9cbiAgICAgICAgICAgIGl0ZW1SZW5kZXJGdW5jdGlvbihPYmplY3QuYXNzaWduKHt9LCBpdGVtKSkgOiB0aGlzLmRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24oKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtyZW1vdmFibGUgP1xuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmlnaHQtYmxvY2tcIj5cbiAgICAgICAgICAgIHt0aGlzLmdldFJlbW92ZUljb24oKX1cbiAgICAgICAgICA8L2Rpdj4gOiBudWxsXG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuSXRlbS5wcm9wVHlwZXMgPSB7XG4gIGl0ZW06IGhpZXJhcmNoeUl0ZW1TaGFwZS5pc1JlcXVpcmVkLFxuICBpdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICByZW1vdmFibGU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIHNvdXJjZUlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHJlZmVyZW5jZUlkczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pKSxcbiAgb25SZW1vdmVDbGljazogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5JdGVtLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25SZW1vdmVDbGljazogKCkgPT4ge30sXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcbiAgcmVmZXJlbmNlSWRzOiBbXSxcbn07XG4iXX0=