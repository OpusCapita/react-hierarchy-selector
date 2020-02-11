function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Checkbox from './checkbox.component';
import { hierarchyItemShape } from '../../types';

function defaultItemRenderFunction(item) {
  return React.createElement("span", null, item.name);
}

var ListItem =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ListItem, _React$Component);

  function ListItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "clickHandler", function (event) {
      _this.props.onClick(_this.props.item.id, event);
    });

    _defineProperty(_assertThisInitialized(_this), "checkHandler", function (checkState) {
      _this.props.onCheck(_this.props.item.id, checkState);
    });

    return _this;
  }

  var _proto = ListItem.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    var _this$props = this.props,
        checked = _this$props.checked,
        checkDisabled = _this$props.checkDisabled,
        selected = _this$props.selected,
        item = _this$props.item;
    if (checked !== nextProps.checked) return true;
    if (checkDisabled !== nextProps.checkDisabled) return true;
    if (selected !== nextProps.selected) return true;
    if (item !== nextProps.item || item.id !== nextProps.item.id) return true;
    return false;
  };

  _proto.render = function render() {
    var names = classNames({
      'oc-selectable-list-item': true,
      selected: this.props.selected
    });
    return React.createElement("div", {
      className: names,
      onClick: this.clickHandler
    }, React.createElement("div", {
      className: "oc-selectable-list-item-container"
    }, React.createElement(Checkbox, {
      disabled: this.props.checkDisabled,
      onCheck: this.checkHandler,
      checked: this.props.checked
    }), React.createElement("div", {
      className: "oc-list-item-text-container"
    }, this.props.itemRenderFunction ? this.props.itemRenderFunction(this.props.item, defaultItemRenderFunction) : defaultItemRenderFunction(this.props.item))));
  };

  return ListItem;
}(React.Component);

export { ListItem as default };
ListItem.defaultProps = {
  checked: false,
  checkDisabled: false,
  itemRenderFunction: null,
  selected: false,
  onCheck: function onCheck() {},
  onClick: function onClick() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NlbGVjdGFibGUtbGlzdC9saXN0LWl0ZW0uY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsImNsYXNzTmFtZXMiLCJDaGVja2JveCIsImhpZXJhcmNoeUl0ZW1TaGFwZSIsImRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24iLCJpdGVtIiwibmFtZSIsIkxpc3RJdGVtIiwiZXZlbnQiLCJwcm9wcyIsIm9uQ2xpY2siLCJpZCIsImNoZWNrU3RhdGUiLCJvbkNoZWNrIiwic2hvdWxkQ29tcG9uZW50VXBkYXRlIiwibmV4dFByb3BzIiwiY2hlY2tlZCIsImNoZWNrRGlzYWJsZWQiLCJzZWxlY3RlZCIsInJlbmRlciIsIm5hbWVzIiwiY2xpY2tIYW5kbGVyIiwiY2hlY2tIYW5kbGVyIiwiaXRlbVJlbmRlckZ1bmN0aW9uIiwiQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTtBQUVBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixZQUF2QjtBQUVBLE9BQU9DLFFBQVAsTUFBcUIsc0JBQXJCO0FBQ0EsU0FBU0Msa0JBQVQsUUFBbUMsYUFBbkM7O0FBRUEsU0FBU0MseUJBQVQsQ0FBbUNDLElBQW5DLEVBQXlDO0FBQ3ZDLFNBQ0Usa0NBQ0dBLElBQUksQ0FBQ0MsSUFEUixDQURGO0FBS0Q7O0lBRW9CQyxROzs7Ozs7Ozs7Ozs7OzttRUFpQkosVUFBQ0MsS0FBRCxFQUFXO0FBQ3hCLFlBQUtDLEtBQUwsQ0FBV0MsT0FBWCxDQUFtQixNQUFLRCxLQUFMLENBQVdKLElBQVgsQ0FBZ0JNLEVBQW5DLEVBQXVDSCxLQUF2QztBQUNELEs7O21FQUVjLFVBQUNJLFVBQUQsRUFBZ0I7QUFDN0IsWUFBS0gsS0FBTCxDQUFXSSxPQUFYLENBQW1CLE1BQUtKLEtBQUwsQ0FBV0osSUFBWCxDQUFnQk0sRUFBbkMsRUFBdUNDLFVBQXZDO0FBQ0QsSzs7Ozs7OztTQXRCREUscUIsR0FBQSwrQkFBc0JDLFNBQXRCLEVBQWlDO0FBQUEsc0JBTTNCLEtBQUtOLEtBTnNCO0FBQUEsUUFFN0JPLE9BRjZCLGVBRTdCQSxPQUY2QjtBQUFBLFFBRzdCQyxhQUg2QixlQUc3QkEsYUFINkI7QUFBQSxRQUk3QkMsUUFKNkIsZUFJN0JBLFFBSjZCO0FBQUEsUUFLN0JiLElBTDZCLGVBSzdCQSxJQUw2QjtBQVEvQixRQUFJVyxPQUFPLEtBQUtELFNBQVMsQ0FBQ0MsT0FBMUIsRUFBbUMsT0FBTyxJQUFQO0FBQ25DLFFBQUlDLGFBQWEsS0FBS0YsU0FBUyxDQUFDRSxhQUFoQyxFQUErQyxPQUFPLElBQVA7QUFDL0MsUUFBSUMsUUFBUSxLQUFLSCxTQUFTLENBQUNHLFFBQTNCLEVBQXFDLE9BQU8sSUFBUDtBQUNyQyxRQUFJYixJQUFJLEtBQUtVLFNBQVMsQ0FBQ1YsSUFBbkIsSUFBMkJBLElBQUksQ0FBQ00sRUFBTCxLQUFZSSxTQUFTLENBQUNWLElBQVYsQ0FBZU0sRUFBMUQsRUFBOEQsT0FBTyxJQUFQO0FBRTlELFdBQU8sS0FBUDtBQUNELEc7O1NBVURRLE0sR0FBQSxrQkFBUztBQUNQLFFBQU1DLEtBQUssR0FBR25CLFVBQVUsQ0FBQztBQUN2QixpQ0FBMkIsSUFESjtBQUV2QmlCLE1BQUFBLFFBQVEsRUFBRSxLQUFLVCxLQUFMLENBQVdTO0FBRkUsS0FBRCxDQUF4QjtBQUlBLFdBQ0U7QUFBSyxNQUFBLFNBQVMsRUFBRUUsS0FBaEI7QUFBdUIsTUFBQSxPQUFPLEVBQUUsS0FBS0M7QUFBckMsT0FDRTtBQUFLLE1BQUEsU0FBUyxFQUFDO0FBQWYsT0FDRSxvQkFBQyxRQUFEO0FBQ0UsTUFBQSxRQUFRLEVBQUUsS0FBS1osS0FBTCxDQUFXUSxhQUR2QjtBQUVFLE1BQUEsT0FBTyxFQUFFLEtBQUtLLFlBRmhCO0FBR0UsTUFBQSxPQUFPLEVBQUUsS0FBS2IsS0FBTCxDQUFXTztBQUh0QixNQURGLEVBTUU7QUFBSyxNQUFBLFNBQVMsRUFBQztBQUFmLE9BQ0csS0FBS1AsS0FBTCxDQUFXYyxrQkFBWCxHQUNDLEtBQUtkLEtBQUwsQ0FBV2Msa0JBQVgsQ0FBOEIsS0FBS2QsS0FBTCxDQUFXSixJQUF6QyxFQUErQ0QseUJBQS9DLENBREQsR0FFQ0EseUJBQXlCLENBQUMsS0FBS0ssS0FBTCxDQUFXSixJQUFaLENBSDdCLENBTkYsQ0FERixDQURGO0FBaUJELEc7OztFQS9DbUNOLEtBQUssQ0FBQ3lCLFM7O1NBQXZCakIsUTtBQTREckJBLFFBQVEsQ0FBQ2tCLFlBQVQsR0FBd0I7QUFDdEJULEVBQUFBLE9BQU8sRUFBRSxLQURhO0FBRXRCQyxFQUFBQSxhQUFhLEVBQUUsS0FGTztBQUd0Qk0sRUFBQUEsa0JBQWtCLEVBQUUsSUFIRTtBQUl0QkwsRUFBQUEsUUFBUSxFQUFFLEtBSlk7QUFLdEJMLEVBQUFBLE9BQU8sRUFBRSxtQkFBTSxDQUFFLENBTEs7QUFNdEJILEVBQUFBLE9BQU8sRUFBRSxtQkFBTSxDQUFFO0FBTkssQ0FBeEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L2NsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHMgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IENoZWNrYm94IGZyb20gJy4vY2hlY2tib3guY29tcG9uZW50JztcbmltcG9ydCB7IGhpZXJhcmNoeUl0ZW1TaGFwZSB9IGZyb20gJy4uLy4uL3R5cGVzJztcblxuZnVuY3Rpb24gZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbihpdGVtKSB7XG4gIHJldHVybiAoXG4gICAgPHNwYW4+XG4gICAgICB7aXRlbS5uYW1lfVxuICAgIDwvc3Bhbj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdEl0ZW0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzKSB7XG4gICAgY29uc3Qge1xuICAgICAgY2hlY2tlZCxcbiAgICAgIGNoZWNrRGlzYWJsZWQsXG4gICAgICBzZWxlY3RlZCxcbiAgICAgIGl0ZW0sXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoY2hlY2tlZCAhPT0gbmV4dFByb3BzLmNoZWNrZWQpIHJldHVybiB0cnVlO1xuICAgIGlmIChjaGVja0Rpc2FibGVkICE9PSBuZXh0UHJvcHMuY2hlY2tEaXNhYmxlZCkgcmV0dXJuIHRydWU7XG4gICAgaWYgKHNlbGVjdGVkICE9PSBuZXh0UHJvcHMuc2VsZWN0ZWQpIHJldHVybiB0cnVlO1xuICAgIGlmIChpdGVtICE9PSBuZXh0UHJvcHMuaXRlbSB8fCBpdGVtLmlkICE9PSBuZXh0UHJvcHMuaXRlbS5pZCkgcmV0dXJuIHRydWU7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjbGlja0hhbmRsZXIgPSAoZXZlbnQpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2xpY2sodGhpcy5wcm9wcy5pdGVtLmlkLCBldmVudCk7XG4gIH1cblxuICBjaGVja0hhbmRsZXIgPSAoY2hlY2tTdGF0ZSkgPT4ge1xuICAgIHRoaXMucHJvcHMub25DaGVjayh0aGlzLnByb3BzLml0ZW0uaWQsIGNoZWNrU3RhdGUpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IG5hbWVzID0gY2xhc3NOYW1lcyh7XG4gICAgICAnb2Mtc2VsZWN0YWJsZS1saXN0LWl0ZW0nOiB0cnVlLFxuICAgICAgc2VsZWN0ZWQ6IHRoaXMucHJvcHMuc2VsZWN0ZWQsXG4gICAgfSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtuYW1lc30gb25DbGljaz17dGhpcy5jbGlja0hhbmRsZXJ9ID5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1zZWxlY3RhYmxlLWxpc3QtaXRlbS1jb250YWluZXJcIj5cbiAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLnByb3BzLmNoZWNrRGlzYWJsZWR9XG4gICAgICAgICAgICBvbkNoZWNrPXt0aGlzLmNoZWNrSGFuZGxlcn1cbiAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMucHJvcHMuY2hlY2tlZH1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtbGlzdC1pdGVtLXRleHQtY29udGFpbmVyXCI+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5pdGVtUmVuZGVyRnVuY3Rpb24gP1xuICAgICAgICAgICAgICB0aGlzLnByb3BzLml0ZW1SZW5kZXJGdW5jdGlvbih0aGlzLnByb3BzLml0ZW0sIGRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24pIDpcbiAgICAgICAgICAgICAgZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbih0aGlzLnByb3BzLml0ZW0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5MaXN0SXRlbS5wcm9wVHlwZXMgPSB7XG4gIGNoZWNrZWQ6IFByb3BUeXBlcy5ib29sLFxuICBjaGVja0Rpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgaXRlbTogaGllcmFyY2h5SXRlbVNoYXBlLmlzUmVxdWlyZWQsXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gIHNlbGVjdGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgb25DaGVjazogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxufTtcblxuTGlzdEl0ZW0uZGVmYXVsdFByb3BzID0ge1xuICBjaGVja2VkOiBmYWxzZSxcbiAgY2hlY2tEaXNhYmxlZDogZmFsc2UsXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcbiAgc2VsZWN0ZWQ6IGZhbHNlLFxuICBvbkNoZWNrOiAoKSA9PiB7fSxcbiAgb25DbGljazogKCkgPT4ge30sXG59O1xuIl19