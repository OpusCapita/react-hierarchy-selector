function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { FaTrashAlt } from 'react-icons/fa';
import { hierarchyItemShape } from '../../../types';

var Item =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(Item, _React$PureComponent);

  function Item() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "clickHanlder", function (e) {
      e.stopPropagation();
    });

    _defineProperty(_assertThisInitialized(_this), "removeClickHandler", function (e) {
      var _this$props = _this.props,
          onRemoveClick = _this$props.onRemoveClick,
          item = _this$props.item,
          sourceId = _this$props.sourceId,
          referenceIds = _this$props.referenceIds;
      e.stopPropagation();
      onRemoveClick(sourceId, referenceIds.slice(), item.id);
    });

    _defineProperty(_assertThisInitialized(_this), "defaultItemRenderFunction", function () {
      var item = _this.props.item;
      return React.createElement("span", null, item.name);
    });

    return _this;
  }

  var _proto = Item.prototype;

  _proto.getRemoveIcon = function getRemoveIcon() {
    return this.props.removable ? React.createElement("span", {
      className: "component-icon clickable",
      onClick: this.removeClickHandler
    }, React.createElement(FaTrashAlt, null)) : null;
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        item = _this$props2.item,
        itemRenderFunction = _this$props2.itemRenderFunction,
        removable = _this$props2.removable;
    return React.createElement("div", {
      className: "selected-item",
      onClick: this.clickHanlder
    }, React.createElement("div", {
      className: "left-block"
    }, itemRenderFunction ? itemRenderFunction(Object.assign({}, item)) : this.defaultItemRenderFunction()), removable ? React.createElement("div", {
      className: "right-block"
    }, this.getRemoveIcon()) : null);
  };

  return Item;
}(React.PureComponent);

export { Item as default };
Item.defaultProps = {
  onRemoveClick: function onRemoveClick() {},
  itemRenderFunction: null,
  referenceIds: []
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvc2VsZWN0ZWQtaXRlbXMvaXRlbS5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiRmFUcmFzaEFsdCIsImhpZXJhcmNoeUl0ZW1TaGFwZSIsIkl0ZW0iLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwicHJvcHMiLCJvblJlbW92ZUNsaWNrIiwiaXRlbSIsInNvdXJjZUlkIiwicmVmZXJlbmNlSWRzIiwic2xpY2UiLCJpZCIsIm5hbWUiLCJnZXRSZW1vdmVJY29uIiwicmVtb3ZhYmxlIiwicmVtb3ZlQ2xpY2tIYW5kbGVyIiwicmVuZGVyIiwiaXRlbVJlbmRlckZ1bmN0aW9uIiwiY2xpY2tIYW5sZGVyIiwiT2JqZWN0IiwiYXNzaWduIiwiZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbiIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBO0FBRUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxVQUFULFFBQTJCLGdCQUEzQjtBQUNBLFNBQVNDLGtCQUFULFFBQW1DLGdCQUFuQzs7SUFFcUJDLEk7Ozs7Ozs7Ozs7Ozs7O21FQVNKLFVBQUNDLENBQUQsRUFBTztBQUNwQkEsTUFBQUEsQ0FBQyxDQUFDQyxlQUFGO0FBQ0QsSzs7eUVBRW9CLFVBQUNELENBQUQsRUFBTztBQUFBLHdCQU10QixNQUFLRSxLQU5pQjtBQUFBLFVBRXhCQyxhQUZ3QixlQUV4QkEsYUFGd0I7QUFBQSxVQUd4QkMsSUFId0IsZUFHeEJBLElBSHdCO0FBQUEsVUFJeEJDLFFBSndCLGVBSXhCQSxRQUp3QjtBQUFBLFVBS3hCQyxZQUx3QixlQUt4QkEsWUFMd0I7QUFPMUJOLE1BQUFBLENBQUMsQ0FBQ0MsZUFBRjtBQUNBRSxNQUFBQSxhQUFhLENBQUNFLFFBQUQsRUFBV0MsWUFBWSxDQUFDQyxLQUFiLEVBQVgsRUFBaUNILElBQUksQ0FBQ0ksRUFBdEMsQ0FBYjtBQUNELEs7O2dGQUUyQixZQUFNO0FBQUEsVUFDeEJKLElBRHdCLEdBQ2YsTUFBS0YsS0FEVSxDQUN4QkUsSUFEd0I7QUFFaEMsYUFDRSxrQ0FDR0EsSUFBSSxDQUFDSyxJQURSLENBREY7QUFLRCxLOzs7Ozs7O1NBOUJEQyxhLEdBQUEseUJBQWdCO0FBQ2QsV0FBTyxLQUFLUixLQUFMLENBQVdTLFNBQVgsR0FDTDtBQUFNLE1BQUEsU0FBUyxFQUFDLDBCQUFoQjtBQUEyQyxNQUFBLE9BQU8sRUFBRSxLQUFLQztBQUF6RCxPQUNFLG9CQUFDLFVBQUQsT0FERixDQURLLEdBSUgsSUFKSjtBQUtELEc7O1NBMEJEQyxNLEdBQUEsa0JBQVM7QUFBQSx1QkFDeUMsS0FBS1gsS0FEOUM7QUFBQSxRQUNDRSxJQURELGdCQUNDQSxJQUREO0FBQUEsUUFDT1Usa0JBRFAsZ0JBQ09BLGtCQURQO0FBQUEsUUFDMkJILFNBRDNCLGdCQUMyQkEsU0FEM0I7QUFFUCxXQUNFO0FBQUssTUFBQSxTQUFTLEVBQUMsZUFBZjtBQUErQixNQUFBLE9BQU8sRUFBRSxLQUFLSTtBQUE3QyxPQUNFO0FBQUssTUFBQSxTQUFTLEVBQUM7QUFBZixPQUNHRCxrQkFBa0IsR0FDakJBLGtCQUFrQixDQUFDRSxNQUFNLENBQUNDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCYixJQUFsQixDQUFELENBREQsR0FDNkIsS0FBS2MseUJBQUwsRUFGbEQsQ0FERixFQUtHUCxTQUFTLEdBQ1I7QUFBSyxNQUFBLFNBQVMsRUFBQztBQUFmLE9BQ0csS0FBS0QsYUFBTCxFQURILENBRFEsR0FHQyxJQVJiLENBREY7QUFhRCxHOzs7RUFoRCtCZixLQUFLLENBQUN3QixhOztTQUFuQnBCLEk7QUE0RHJCQSxJQUFJLENBQUNxQixZQUFMLEdBQW9CO0FBQ2xCakIsRUFBQUEsYUFBYSxFQUFFLHlCQUFNLENBQUUsQ0FETDtBQUVsQlcsRUFBQUEsa0JBQWtCLEVBQUUsSUFGRjtBQUdsQlIsRUFBQUEsWUFBWSxFQUFFO0FBSEksQ0FBcEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L2NsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHMgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBGYVRyYXNoQWx0IH0gZnJvbSAncmVhY3QtaWNvbnMvZmEnO1xuaW1wb3J0IHsgaGllcmFyY2h5SXRlbVNoYXBlIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGdldFJlbW92ZUljb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMucmVtb3ZhYmxlID9cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNvbXBvbmVudC1pY29uIGNsaWNrYWJsZVwiIG9uQ2xpY2s9e3RoaXMucmVtb3ZlQ2xpY2tIYW5kbGVyfT5cbiAgICAgICAgPEZhVHJhc2hBbHQgLz5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDogbnVsbDtcbiAgfVxuXG4gIGNsaWNrSGFubGRlciA9IChlKSA9PiB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIHJlbW92ZUNsaWNrSGFuZGxlciA9IChlKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgb25SZW1vdmVDbGljayxcbiAgICAgIGl0ZW0sXG4gICAgICBzb3VyY2VJZCxcbiAgICAgIHJlZmVyZW5jZUlkcyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIG9uUmVtb3ZlQ2xpY2soc291cmNlSWQsIHJlZmVyZW5jZUlkcy5zbGljZSgpLCBpdGVtLmlkKTtcbiAgfVxuXG4gIGRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgeyBpdGVtIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8c3Bhbj5cbiAgICAgICAge2l0ZW0ubmFtZX1cbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaXRlbSwgaXRlbVJlbmRlckZ1bmN0aW9uLCByZW1vdmFibGUgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0ZWQtaXRlbVwiIG9uQ2xpY2s9e3RoaXMuY2xpY2tIYW5sZGVyfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZWZ0LWJsb2NrXCI+XG4gICAgICAgICAge2l0ZW1SZW5kZXJGdW5jdGlvbiA/XG4gICAgICAgICAgICBpdGVtUmVuZGVyRnVuY3Rpb24oT2JqZWN0LmFzc2lnbih7fSwgaXRlbSkpIDogdGhpcy5kZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uKCl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7cmVtb3ZhYmxlID9cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJpZ2h0LWJsb2NrXCI+XG4gICAgICAgICAgICB7dGhpcy5nZXRSZW1vdmVJY29uKCl9XG4gICAgICAgICAgPC9kaXY+IDogbnVsbFxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkl0ZW0ucHJvcFR5cGVzID0ge1xuICBpdGVtOiBoaWVyYXJjaHlJdGVtU2hhcGUuaXNSZXF1aXJlZCxcbiAgaXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgcmVtb3ZhYmxlOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBzb3VyY2VJZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICByZWZlcmVuY2VJZHM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5udW1iZXJdKSksXG4gIG9uUmVtb3ZlQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxufTtcblxuSXRlbS5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uUmVtb3ZlQ2xpY2s6ICgpID0+IHt9LFxuICBpdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXG4gIHJlZmVyZW5jZUlkczogW10sXG59O1xuIl19