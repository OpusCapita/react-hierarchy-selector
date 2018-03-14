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
        itemRenderFunction = _props.itemRenderFunction;

    return React.createElement(
      'div',
      { className: 'selected-item', onClick: this.clickHanlder },
      itemRenderFunction ? itemRenderFunction(Object.assign({}, item)) : this.defaultItemRenderFunction(),
      React.createElement(
        'div',
        { className: 'right-block' },
        this.getRemoveIcon()
      )
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvc2VsZWN0ZWQtaXRlbXMvaXRlbS5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiRmFUcmFzaCIsImhpZXJhcmNoeUl0ZW1TaGFwZSIsIkl0ZW0iLCJjbGlja0hhbmxkZXIiLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwicmVtb3ZlQ2xpY2tIYW5kbGVyIiwicHJvcHMiLCJvblJlbW92ZUNsaWNrIiwiaXRlbSIsInNvdXJjZUlkIiwicmVmZXJlbmNlSWRzIiwic2xpY2UiLCJpZCIsImRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24iLCJuYW1lIiwiZ2V0UmVtb3ZlSWNvbiIsInJlbW92YWJsZSIsInJlbmRlciIsIml0ZW1SZW5kZXJGdW5jdGlvbiIsIk9iamVjdCIsImFzc2lnbiIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7O0FBRUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxPQUFQLE1BQW9CLDBCQUFwQjtBQUNBLFNBQVNDLGtCQUFULFFBQW1DLGdCQUFuQzs7SUFFcUJDLEk7Ozs7Ozs7Ozs7OztnS0FTbkJDLFksR0FBZSxVQUFDQyxDQUFELEVBQU87QUFDcEJBLFFBQUVDLGVBQUY7QUFDRCxLLFFBRURDLGtCLEdBQXFCLFVBQUNGLENBQUQsRUFBTztBQUFBLHdCQU10QixNQUFLRyxLQU5pQjtBQUFBLFVBRXhCQyxhQUZ3QixlQUV4QkEsYUFGd0I7QUFBQSxVQUd4QkMsSUFId0IsZUFHeEJBLElBSHdCO0FBQUEsVUFJeEJDLFFBSndCLGVBSXhCQSxRQUp3QjtBQUFBLFVBS3hCQyxZQUx3QixlQUt4QkEsWUFMd0I7O0FBTzFCUCxRQUFFQyxlQUFGO0FBQ0FHLG9CQUFjRSxRQUFkLEVBQXdCQyxhQUFhQyxLQUFiLEVBQXhCLEVBQThDSCxLQUFLSSxFQUFuRDtBQUNELEssUUFFREMseUIsR0FBNEIsWUFBTTtBQUFBLFVBQ3hCTCxJQUR3QixHQUNmLE1BQUtGLEtBRFUsQ0FDeEJFLElBRHdCOztBQUVoQyxhQUNFO0FBQUE7QUFBQTtBQUNHQSxhQUFLTTtBQURSLE9BREY7QUFLRCxLOzs7aUJBOUJEQyxhLDRCQUFnQjtBQUNkLFdBQU8sS0FBS1QsS0FBTCxDQUFXVSxTQUFYLEdBQ0w7QUFBQTtBQUFBLFFBQU0sV0FBVSwwQkFBaEIsRUFBMkMsU0FBUyxLQUFLWCxrQkFBekQ7QUFDRSwwQkFBQyxPQUFEO0FBREYsS0FESyxHQUlILElBSko7QUFLRCxHOztpQkEwQkRZLE0scUJBQVM7QUFBQSxpQkFDOEIsS0FBS1gsS0FEbkM7QUFBQSxRQUNDRSxJQURELFVBQ0NBLElBREQ7QUFBQSxRQUNPVSxrQkFEUCxVQUNPQSxrQkFEUDs7QUFFUCxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsZUFBZixFQUErQixTQUFTLEtBQUtoQixZQUE3QztBQUNHZ0IsMkJBQ0NBLG1CQUFtQkMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JaLElBQWxCLENBQW5CLENBREQsR0FDK0MsS0FBS0sseUJBQUwsRUFGbEQ7QUFHRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGFBQWY7QUFDRyxhQUFLRSxhQUFMO0FBREg7QUFIRixLQURGO0FBU0QsRzs7O0VBNUMrQmxCLE1BQU13QixhOztTQUFuQnBCLEk7OztBQXdEckJBLEtBQUtxQixZQUFMLEdBQW9CO0FBQ2xCZixpQkFBZSx5QkFBTSxDQUFFLENBREw7QUFFbEJXLHNCQUFvQixJQUZGO0FBR2xCUixnQkFBYztBQUhJLENBQXBCIiwiZmlsZSI6Iml0ZW0uY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L2NsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHMgKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCBGYVRyYXNoIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS90cmFzaCc7XHJcbmltcG9ydCB7IGhpZXJhcmNoeUl0ZW1TaGFwZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0ZW0gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcclxuICBnZXRSZW1vdmVJY29uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucHJvcHMucmVtb3ZhYmxlID9cclxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY29tcG9uZW50LWljb24gY2xpY2thYmxlXCIgb25DbGljaz17dGhpcy5yZW1vdmVDbGlja0hhbmRsZXJ9PlxyXG4gICAgICAgIDxGYVRyYXNoIC8+XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgICAgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgY2xpY2tIYW5sZGVyID0gKGUpID0+IHtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVDbGlja0hhbmRsZXIgPSAoZSkgPT4ge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBvblJlbW92ZUNsaWNrLFxyXG4gICAgICBpdGVtLFxyXG4gICAgICBzb3VyY2VJZCxcclxuICAgICAgcmVmZXJlbmNlSWRzLFxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgb25SZW1vdmVDbGljayhzb3VyY2VJZCwgcmVmZXJlbmNlSWRzLnNsaWNlKCksIGl0ZW0uaWQpO1xyXG4gIH1cclxuXHJcbiAgZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbiA9ICgpID0+IHtcclxuICAgIGNvbnN0IHsgaXRlbSB9ID0gdGhpcy5wcm9wcztcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxzcGFuPlxyXG4gICAgICAgIHtpdGVtLm5hbWV9XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IGl0ZW0sIGl0ZW1SZW5kZXJGdW5jdGlvbiB9ID0gdGhpcy5wcm9wcztcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0ZWQtaXRlbVwiIG9uQ2xpY2s9e3RoaXMuY2xpY2tIYW5sZGVyfT5cclxuICAgICAgICB7aXRlbVJlbmRlckZ1bmN0aW9uID9cclxuICAgICAgICAgIGl0ZW1SZW5kZXJGdW5jdGlvbihPYmplY3QuYXNzaWduKHt9LCBpdGVtKSkgOiB0aGlzLmRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24oKX1cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJpZ2h0LWJsb2NrXCI+XHJcbiAgICAgICAgICB7dGhpcy5nZXRSZW1vdmVJY29uKCl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbkl0ZW0ucHJvcFR5cGVzID0ge1xyXG4gIGl0ZW06IGhpZXJhcmNoeUl0ZW1TaGFwZS5pc1JlcXVpcmVkLFxyXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgcmVtb3ZhYmxlOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxyXG4gIHNvdXJjZUlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgcmVmZXJlbmNlSWRzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSkpLFxyXG4gIG9uUmVtb3ZlQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxyXG59O1xyXG5cclxuSXRlbS5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgb25SZW1vdmVDbGljazogKCkgPT4ge30sXHJcbiAgaXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxyXG4gIHJlZmVyZW5jZUlkczogW10sXHJcbn07XHJcbiJdfQ==