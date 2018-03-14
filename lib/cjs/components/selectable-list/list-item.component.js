'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _checkbox = require('./checkbox.component');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _types = require('../../types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

function defaultItemRenderFunction(item) {
  return _react2.default.createElement(
    'span',
    null,
    item.name
  );
}

var ListItem = function (_React$Component) {
  _inherits(ListItem, _React$Component);

  function ListItem() {
    var _temp, _this, _ret;

    _classCallCheck(this, ListItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.clickHandler = function (event) {
      _this.props.onClick(_this.props.item.id, event);
    }, _this.checkHandler = function (checkState) {
      _this.props.onCheck(_this.props.item.id, checkState);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ListItem.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    var _props = this.props,
        checked = _props.checked,
        checkDisabled = _props.checkDisabled,
        selected = _props.selected,
        item = _props.item;


    if (checked !== nextProps.checked) return true;
    if (checkDisabled !== nextProps.checkDisabled) return true;
    if (selected !== nextProps.selected) return true;
    if (item !== nextProps.item || item.id !== nextProps.item.id) return true;

    return false;
  };

  ListItem.prototype.render = function render() {
    var names = (0, _classnames2.default)({
      'oc-selectable-list-item': true,
      selected: this.props.selected
    });
    return _react2.default.createElement(
      'div',
      { className: names, onClick: this.clickHandler },
      _react2.default.createElement(
        'div',
        { className: 'oc-selectable-list-item-container' },
        _react2.default.createElement(_checkbox2.default, {
          disabled: this.props.checkDisabled,
          onCheck: this.checkHandler,
          checked: this.props.checked
        }),
        _react2.default.createElement(
          'div',
          { className: 'oc-list-item-text-container' },
          this.props.itemRenderFunction ? this.props.itemRenderFunction(this.props.item, defaultItemRenderFunction) : defaultItemRenderFunction(this.props.item)
        )
      )
    );
  };

  return ListItem;
}(_react2.default.Component);

exports.default = ListItem;


ListItem.defaultProps = {
  checked: false,
  checkDisabled: false,
  itemRenderFunction: null,
  selected: false,
  onCheck: function onCheck() {},
  onClick: function onClick() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NlbGVjdGFibGUtbGlzdC9saXN0LWl0ZW0uY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJkZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uIiwiaXRlbSIsIm5hbWUiLCJMaXN0SXRlbSIsImNsaWNrSGFuZGxlciIsImV2ZW50IiwicHJvcHMiLCJvbkNsaWNrIiwiaWQiLCJjaGVja0hhbmRsZXIiLCJjaGVja1N0YXRlIiwib25DaGVjayIsInNob3VsZENvbXBvbmVudFVwZGF0ZSIsIm5leHRQcm9wcyIsImNoZWNrZWQiLCJjaGVja0Rpc2FibGVkIiwic2VsZWN0ZWQiLCJyZW5kZXIiLCJuYW1lcyIsIml0ZW1SZW5kZXJGdW5jdGlvbiIsIkNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7OzsrZUFSQTtBQUNBOztBQVNBLFNBQVNBLHlCQUFULENBQW1DQyxJQUFuQyxFQUF5QztBQUN2QyxTQUNFO0FBQUE7QUFBQTtBQUNHQSxTQUFLQztBQURSLEdBREY7QUFLRDs7SUFFb0JDLFE7Ozs7Ozs7Ozs7Ozt3SkFpQm5CQyxZLEdBQWUsVUFBQ0MsS0FBRCxFQUFXO0FBQ3hCLFlBQUtDLEtBQUwsQ0FBV0MsT0FBWCxDQUFtQixNQUFLRCxLQUFMLENBQVdMLElBQVgsQ0FBZ0JPLEVBQW5DLEVBQXVDSCxLQUF2QztBQUNELEssUUFFREksWSxHQUFlLFVBQUNDLFVBQUQsRUFBZ0I7QUFDN0IsWUFBS0osS0FBTCxDQUFXSyxPQUFYLENBQW1CLE1BQUtMLEtBQUwsQ0FBV0wsSUFBWCxDQUFnQk8sRUFBbkMsRUFBdUNFLFVBQXZDO0FBQ0QsSzs7O3FCQXRCREUscUIsa0NBQXNCQyxTLEVBQVc7QUFBQSxpQkFNM0IsS0FBS1AsS0FOc0I7QUFBQSxRQUU3QlEsT0FGNkIsVUFFN0JBLE9BRjZCO0FBQUEsUUFHN0JDLGFBSDZCLFVBRzdCQSxhQUg2QjtBQUFBLFFBSTdCQyxRQUo2QixVQUk3QkEsUUFKNkI7QUFBQSxRQUs3QmYsSUFMNkIsVUFLN0JBLElBTDZCOzs7QUFRL0IsUUFBSWEsWUFBWUQsVUFBVUMsT0FBMUIsRUFBbUMsT0FBTyxJQUFQO0FBQ25DLFFBQUlDLGtCQUFrQkYsVUFBVUUsYUFBaEMsRUFBK0MsT0FBTyxJQUFQO0FBQy9DLFFBQUlDLGFBQWFILFVBQVVHLFFBQTNCLEVBQXFDLE9BQU8sSUFBUDtBQUNyQyxRQUFJZixTQUFTWSxVQUFVWixJQUFuQixJQUEyQkEsS0FBS08sRUFBTCxLQUFZSyxVQUFVWixJQUFWLENBQWVPLEVBQTFELEVBQThELE9BQU8sSUFBUDs7QUFFOUQsV0FBTyxLQUFQO0FBQ0QsRzs7cUJBVURTLE0scUJBQVM7QUFDUCxRQUFNQyxRQUFRLDBCQUFXO0FBQ3ZCLGlDQUEyQixJQURKO0FBRXZCRixnQkFBVSxLQUFLVixLQUFMLENBQVdVO0FBRkUsS0FBWCxDQUFkO0FBSUEsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFXRSxLQUFoQixFQUF1QixTQUFTLEtBQUtkLFlBQXJDO0FBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxtQ0FBZjtBQUNFO0FBQ0Usb0JBQVUsS0FBS0UsS0FBTCxDQUFXUyxhQUR2QjtBQUVFLG1CQUFTLEtBQUtOLFlBRmhCO0FBR0UsbUJBQVMsS0FBS0gsS0FBTCxDQUFXUTtBQUh0QixVQURGO0FBTUU7QUFBQTtBQUFBLFlBQUssV0FBVSw2QkFBZjtBQUNHLGVBQUtSLEtBQUwsQ0FBV2Esa0JBQVgsR0FDQyxLQUFLYixLQUFMLENBQVdhLGtCQUFYLENBQThCLEtBQUtiLEtBQUwsQ0FBV0wsSUFBekMsRUFBK0NELHlCQUEvQyxDQURELEdBRUNBLDBCQUEwQixLQUFLTSxLQUFMLENBQVdMLElBQXJDO0FBSEo7QUFORjtBQURGLEtBREY7QUFpQkQsRzs7O0VBL0NtQyxnQkFBTW1CLFM7O2tCQUF2QmpCLFE7OztBQTREckJBLFNBQVNrQixZQUFULEdBQXdCO0FBQ3RCUCxXQUFTLEtBRGE7QUFFdEJDLGlCQUFlLEtBRk87QUFHdEJJLHNCQUFvQixJQUhFO0FBSXRCSCxZQUFVLEtBSlk7QUFLdEJMLFdBQVMsbUJBQU0sQ0FBRSxDQUxLO0FBTXRCSixXQUFTLG1CQUFNLENBQUU7QUFOSyxDQUF4QiIsImZpbGUiOiJsaXN0LWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBDaGVja2JveCBmcm9tICcuL2NoZWNrYm94LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBoaWVyYXJjaHlJdGVtU2hhcGUgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5cbmZ1bmN0aW9uIGRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24oaXRlbSkge1xuICByZXR1cm4gKFxuICAgIDxzcGFuPlxuICAgICAge2l0ZW0ubmFtZX1cbiAgICA8L3NwYW4+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpc3RJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcykge1xuICAgIGNvbnN0IHtcbiAgICAgIGNoZWNrZWQsXG4gICAgICBjaGVja0Rpc2FibGVkLFxuICAgICAgc2VsZWN0ZWQsXG4gICAgICBpdGVtLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKGNoZWNrZWQgIT09IG5leHRQcm9wcy5jaGVja2VkKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoY2hlY2tEaXNhYmxlZCAhPT0gbmV4dFByb3BzLmNoZWNrRGlzYWJsZWQpIHJldHVybiB0cnVlO1xuICAgIGlmIChzZWxlY3RlZCAhPT0gbmV4dFByb3BzLnNlbGVjdGVkKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoaXRlbSAhPT0gbmV4dFByb3BzLml0ZW0gfHwgaXRlbS5pZCAhPT0gbmV4dFByb3BzLml0ZW0uaWQpIHJldHVybiB0cnVlO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY2xpY2tIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbkNsaWNrKHRoaXMucHJvcHMuaXRlbS5pZCwgZXZlbnQpO1xuICB9XG5cbiAgY2hlY2tIYW5kbGVyID0gKGNoZWNrU3RhdGUpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2hlY2sodGhpcy5wcm9wcy5pdGVtLmlkLCBjaGVja1N0YXRlKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBuYW1lcyA9IGNsYXNzTmFtZXMoe1xuICAgICAgJ29jLXNlbGVjdGFibGUtbGlzdC1pdGVtJzogdHJ1ZSxcbiAgICAgIHNlbGVjdGVkOiB0aGlzLnByb3BzLnNlbGVjdGVkLFxuICAgIH0pO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17bmFtZXN9IG9uQ2xpY2s9e3RoaXMuY2xpY2tIYW5kbGVyfSA+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2Mtc2VsZWN0YWJsZS1saXN0LWl0ZW0tY29udGFpbmVyXCI+XG4gICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5wcm9wcy5jaGVja0Rpc2FibGVkfVxuICAgICAgICAgICAgb25DaGVjaz17dGhpcy5jaGVja0hhbmRsZXJ9XG4gICAgICAgICAgICBjaGVja2VkPXt0aGlzLnByb3BzLmNoZWNrZWR9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWxpc3QtaXRlbS10ZXh0LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAge3RoaXMucHJvcHMuaXRlbVJlbmRlckZ1bmN0aW9uID9cbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5pdGVtUmVuZGVyRnVuY3Rpb24odGhpcy5wcm9wcy5pdGVtLCBkZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uKSA6XG4gICAgICAgICAgICAgIGRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24odGhpcy5wcm9wcy5pdGVtKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuTGlzdEl0ZW0ucHJvcFR5cGVzID0ge1xuICBjaGVja2VkOiBQcm9wVHlwZXMuYm9vbCxcbiAgY2hlY2tEaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gIGl0ZW06IGhpZXJhcmNoeUl0ZW1TaGFwZS5pc1JlcXVpcmVkLFxuICBpdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICBzZWxlY3RlZDogUHJvcFR5cGVzLmJvb2wsXG4gIG9uQ2hlY2s6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cbkxpc3RJdGVtLmRlZmF1bHRQcm9wcyA9IHtcbiAgY2hlY2tlZDogZmFsc2UsXG4gIGNoZWNrRGlzYWJsZWQ6IGZhbHNlLFxuICBpdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXG4gIHNlbGVjdGVkOiBmYWxzZSxcbiAgb25DaGVjazogKCkgPT4ge30sXG4gIG9uQ2xpY2s6ICgpID0+IHt9LFxufTtcbiJdfQ==