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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvc2VsZWN0ZWQtaXRlbXMvaXRlbS5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiRmFUcmFzaCIsImhpZXJhcmNoeUl0ZW1TaGFwZSIsIkl0ZW0iLCJjbGlja0hhbmxkZXIiLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwicmVtb3ZlQ2xpY2tIYW5kbGVyIiwicHJvcHMiLCJvblJlbW92ZUNsaWNrIiwiaXRlbSIsInNvdXJjZUlkIiwicmVmZXJlbmNlSWRzIiwic2xpY2UiLCJpZCIsImRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24iLCJuYW1lIiwiZ2V0UmVtb3ZlSWNvbiIsInJlbW92YWJsZSIsInJlbmRlciIsIml0ZW1SZW5kZXJGdW5jdGlvbiIsIk9iamVjdCIsImFzc2lnbiIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7O0FBRUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxPQUFQLE1BQW9CLDBCQUFwQjtBQUNBLFNBQVNDLGtCQUFULFFBQW1DLGdCQUFuQzs7SUFFcUJDLEk7Ozs7Ozs7Ozs7OztnS0FTbkJDLFksR0FBZSxVQUFDQyxDQUFELEVBQU87QUFDcEJBLFFBQUVDLGVBQUY7QUFDRCxLLFFBRURDLGtCLEdBQXFCLFVBQUNGLENBQUQsRUFBTztBQUFBLHdCQU10QixNQUFLRyxLQU5pQjtBQUFBLFVBRXhCQyxhQUZ3QixlQUV4QkEsYUFGd0I7QUFBQSxVQUd4QkMsSUFId0IsZUFHeEJBLElBSHdCO0FBQUEsVUFJeEJDLFFBSndCLGVBSXhCQSxRQUp3QjtBQUFBLFVBS3hCQyxZQUx3QixlQUt4QkEsWUFMd0I7O0FBTzFCUCxRQUFFQyxlQUFGO0FBQ0FHLG9CQUFjRSxRQUFkLEVBQXdCQyxhQUFhQyxLQUFiLEVBQXhCLEVBQThDSCxLQUFLSSxFQUFuRDtBQUNELEssUUFFREMseUIsR0FBNEIsWUFBTTtBQUFBLFVBQ3hCTCxJQUR3QixHQUNmLE1BQUtGLEtBRFUsQ0FDeEJFLElBRHdCOztBQUVoQyxhQUNFO0FBQUE7QUFBQTtBQUNHQSxhQUFLTTtBQURSLE9BREY7QUFLRCxLOzs7aUJBOUJEQyxhLDRCQUFnQjtBQUNkLFdBQU8sS0FBS1QsS0FBTCxDQUFXVSxTQUFYLEdBQ0w7QUFBQTtBQUFBLFFBQU0sV0FBVSwwQkFBaEIsRUFBMkMsU0FBUyxLQUFLWCxrQkFBekQ7QUFDRSwwQkFBQyxPQUFEO0FBREYsS0FESyxHQUlILElBSko7QUFLRCxHOztpQkEwQkRZLE0scUJBQVM7QUFBQSxpQkFDOEIsS0FBS1gsS0FEbkM7QUFBQSxRQUNDRSxJQURELFVBQ0NBLElBREQ7QUFBQSxRQUNPVSxrQkFEUCxVQUNPQSxrQkFEUDs7QUFFUCxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsZUFBZixFQUErQixTQUFTLEtBQUtoQixZQUE3QztBQUNHZ0IsMkJBQ0NBLG1CQUFtQkMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JaLElBQWxCLENBQW5CLENBREQsR0FDK0MsS0FBS0sseUJBQUwsRUFGbEQ7QUFHRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGFBQWY7QUFDRyxhQUFLRSxhQUFMO0FBREg7QUFIRixLQURGO0FBU0QsRzs7O0VBNUMrQmxCLE1BQU13QixhOztTQUFuQnBCLEk7OztBQXdEckJBLEtBQUtxQixZQUFMLEdBQW9CO0FBQ2xCZixpQkFBZSx5QkFBTSxDQUFFLENBREw7QUFFbEJXLHNCQUFvQixJQUZGO0FBR2xCUixnQkFBYztBQUhJLENBQXBCIiwiZmlsZSI6Iml0ZW0uY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEZhVHJhc2ggZnJvbSAncmVhY3QtaWNvbnMvbGliL2ZhL3RyYXNoJztcbmltcG9ydCB7IGhpZXJhcmNoeUl0ZW1TaGFwZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBnZXRSZW1vdmVJY29uKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLnJlbW92YWJsZSA/XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJjb21wb25lbnQtaWNvbiBjbGlja2FibGVcIiBvbkNsaWNrPXt0aGlzLnJlbW92ZUNsaWNrSGFuZGxlcn0+XG4gICAgICAgIDxGYVRyYXNoIC8+XG4gICAgICA8L3NwYW4+XG4gICAgICA6IG51bGw7XG4gIH1cblxuICBjbGlja0hhbmxkZXIgPSAoZSkgPT4ge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICByZW1vdmVDbGlja0hhbmRsZXIgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uUmVtb3ZlQ2xpY2ssXG4gICAgICBpdGVtLFxuICAgICAgc291cmNlSWQsXG4gICAgICByZWZlcmVuY2VJZHMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBvblJlbW92ZUNsaWNrKHNvdXJjZUlkLCByZWZlcmVuY2VJZHMuc2xpY2UoKSwgaXRlbS5pZCk7XG4gIH1cblxuICBkZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgaXRlbSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPHNwYW4+XG4gICAgICAgIHtpdGVtLm5hbWV9XG4gICAgICA8L3NwYW4+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGl0ZW0sIGl0ZW1SZW5kZXJGdW5jdGlvbiB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWxlY3RlZC1pdGVtXCIgb25DbGljaz17dGhpcy5jbGlja0hhbmxkZXJ9PlxuICAgICAgICB7aXRlbVJlbmRlckZ1bmN0aW9uID9cbiAgICAgICAgICBpdGVtUmVuZGVyRnVuY3Rpb24oT2JqZWN0LmFzc2lnbih7fSwgaXRlbSkpIDogdGhpcy5kZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uKCl9XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmlnaHQtYmxvY2tcIj5cbiAgICAgICAgICB7dGhpcy5nZXRSZW1vdmVJY29uKCl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5JdGVtLnByb3BUeXBlcyA9IHtcbiAgaXRlbTogaGllcmFyY2h5SXRlbVNoYXBlLmlzUmVxdWlyZWQsXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gIHJlbW92YWJsZTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgc291cmNlSWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgcmVmZXJlbmNlSWRzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSkpLFxuICBvblJlbW92ZUNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cbkl0ZW0uZGVmYXVsdFByb3BzID0ge1xuICBvblJlbW92ZUNsaWNrOiAoKSA9PiB7fSxcbiAgaXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxuICByZWZlcmVuY2VJZHM6IFtdLFxufTtcbiJdfQ==