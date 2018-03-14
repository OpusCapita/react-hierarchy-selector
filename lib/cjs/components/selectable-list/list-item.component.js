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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NlbGVjdGFibGUtbGlzdC9saXN0LWl0ZW0uY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJkZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uIiwiaXRlbSIsIm5hbWUiLCJMaXN0SXRlbSIsImNsaWNrSGFuZGxlciIsImV2ZW50IiwicHJvcHMiLCJvbkNsaWNrIiwiaWQiLCJjaGVja0hhbmRsZXIiLCJjaGVja1N0YXRlIiwib25DaGVjayIsInNob3VsZENvbXBvbmVudFVwZGF0ZSIsIm5leHRQcm9wcyIsImNoZWNrZWQiLCJjaGVja0Rpc2FibGVkIiwic2VsZWN0ZWQiLCJyZW5kZXIiLCJuYW1lcyIsIml0ZW1SZW5kZXJGdW5jdGlvbiIsIkNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7OzsrZUFSQTtBQUNBOztBQVNBLFNBQVNBLHlCQUFULENBQW1DQyxJQUFuQyxFQUF5QztBQUN2QyxTQUNFO0FBQUE7QUFBQTtBQUNHQSxTQUFLQztBQURSLEdBREY7QUFLRDs7SUFFb0JDLFE7Ozs7Ozs7Ozs7Ozt3SkFpQm5CQyxZLEdBQWUsVUFBQ0MsS0FBRCxFQUFXO0FBQ3hCLFlBQUtDLEtBQUwsQ0FBV0MsT0FBWCxDQUFtQixNQUFLRCxLQUFMLENBQVdMLElBQVgsQ0FBZ0JPLEVBQW5DLEVBQXVDSCxLQUF2QztBQUNELEssUUFFREksWSxHQUFlLFVBQUNDLFVBQUQsRUFBZ0I7QUFDN0IsWUFBS0osS0FBTCxDQUFXSyxPQUFYLENBQW1CLE1BQUtMLEtBQUwsQ0FBV0wsSUFBWCxDQUFnQk8sRUFBbkMsRUFBdUNFLFVBQXZDO0FBQ0QsSzs7O3FCQXRCREUscUIsa0NBQXNCQyxTLEVBQVc7QUFBQSxpQkFNM0IsS0FBS1AsS0FOc0I7QUFBQSxRQUU3QlEsT0FGNkIsVUFFN0JBLE9BRjZCO0FBQUEsUUFHN0JDLGFBSDZCLFVBRzdCQSxhQUg2QjtBQUFBLFFBSTdCQyxRQUo2QixVQUk3QkEsUUFKNkI7QUFBQSxRQUs3QmYsSUFMNkIsVUFLN0JBLElBTDZCOzs7QUFRL0IsUUFBSWEsWUFBWUQsVUFBVUMsT0FBMUIsRUFBbUMsT0FBTyxJQUFQO0FBQ25DLFFBQUlDLGtCQUFrQkYsVUFBVUUsYUFBaEMsRUFBK0MsT0FBTyxJQUFQO0FBQy9DLFFBQUlDLGFBQWFILFVBQVVHLFFBQTNCLEVBQXFDLE9BQU8sSUFBUDtBQUNyQyxRQUFJZixTQUFTWSxVQUFVWixJQUFuQixJQUEyQkEsS0FBS08sRUFBTCxLQUFZSyxVQUFVWixJQUFWLENBQWVPLEVBQTFELEVBQThELE9BQU8sSUFBUDs7QUFFOUQsV0FBTyxLQUFQO0FBQ0QsRzs7cUJBVURTLE0scUJBQVM7QUFDUCxRQUFNQyxRQUFRLDBCQUFXO0FBQ3ZCLGlDQUEyQixJQURKO0FBRXZCRixnQkFBVSxLQUFLVixLQUFMLENBQVdVO0FBRkUsS0FBWCxDQUFkO0FBSUEsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFXRSxLQUFoQixFQUF1QixTQUFTLEtBQUtkLFlBQXJDO0FBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxtQ0FBZjtBQUNFO0FBQ0Usb0JBQVUsS0FBS0UsS0FBTCxDQUFXUyxhQUR2QjtBQUVFLG1CQUFTLEtBQUtOLFlBRmhCO0FBR0UsbUJBQVMsS0FBS0gsS0FBTCxDQUFXUTtBQUh0QixVQURGO0FBTUU7QUFBQTtBQUFBLFlBQUssV0FBVSw2QkFBZjtBQUNHLGVBQUtSLEtBQUwsQ0FBV2Esa0JBQVgsR0FDQyxLQUFLYixLQUFMLENBQVdhLGtCQUFYLENBQThCLEtBQUtiLEtBQUwsQ0FBV0wsSUFBekMsRUFBK0NELHlCQUEvQyxDQURELEdBRUNBLDBCQUEwQixLQUFLTSxLQUFMLENBQVdMLElBQXJDO0FBSEo7QUFORjtBQURGLEtBREY7QUFpQkQsRzs7O0VBL0NtQyxnQkFBTW1CLFM7O2tCQUF2QmpCLFE7OztBQTREckJBLFNBQVNrQixZQUFULEdBQXdCO0FBQ3RCUCxXQUFTLEtBRGE7QUFFdEJDLGlCQUFlLEtBRk87QUFHdEJJLHNCQUFvQixJQUhFO0FBSXRCSCxZQUFVLEtBSlk7QUFLdEJMLFdBQVMsbUJBQU0sQ0FBRSxDQUxLO0FBTXRCSixXQUFTLG1CQUFNLENBQUU7QUFOSyxDQUF4QiIsImZpbGUiOiJsaXN0LWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L2NsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHMgKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xyXG5cclxuaW1wb3J0IENoZWNrYm94IGZyb20gJy4vY2hlY2tib3guY29tcG9uZW50JztcclxuaW1wb3J0IHsgaGllcmFyY2h5SXRlbVNoYXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xyXG5cclxuZnVuY3Rpb24gZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbihpdGVtKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzcGFuPlxyXG4gICAgICB7aXRlbS5uYW1lfVxyXG4gICAgPC9zcGFuPlxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpc3RJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNoZWNrZWQsXHJcbiAgICAgIGNoZWNrRGlzYWJsZWQsXHJcbiAgICAgIHNlbGVjdGVkLFxyXG4gICAgICBpdGVtLFxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgaWYgKGNoZWNrZWQgIT09IG5leHRQcm9wcy5jaGVja2VkKSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmIChjaGVja0Rpc2FibGVkICE9PSBuZXh0UHJvcHMuY2hlY2tEaXNhYmxlZCkgcmV0dXJuIHRydWU7XHJcbiAgICBpZiAoc2VsZWN0ZWQgIT09IG5leHRQcm9wcy5zZWxlY3RlZCkgcmV0dXJuIHRydWU7XHJcbiAgICBpZiAoaXRlbSAhPT0gbmV4dFByb3BzLml0ZW0gfHwgaXRlbS5pZCAhPT0gbmV4dFByb3BzLml0ZW0uaWQpIHJldHVybiB0cnVlO1xyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNsaWNrSGFuZGxlciA9IChldmVudCkgPT4ge1xyXG4gICAgdGhpcy5wcm9wcy5vbkNsaWNrKHRoaXMucHJvcHMuaXRlbS5pZCwgZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tIYW5kbGVyID0gKGNoZWNrU3RhdGUpID0+IHtcclxuICAgIHRoaXMucHJvcHMub25DaGVjayh0aGlzLnByb3BzLml0ZW0uaWQsIGNoZWNrU3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgbmFtZXMgPSBjbGFzc05hbWVzKHtcclxuICAgICAgJ29jLXNlbGVjdGFibGUtbGlzdC1pdGVtJzogdHJ1ZSxcclxuICAgICAgc2VsZWN0ZWQ6IHRoaXMucHJvcHMuc2VsZWN0ZWQsXHJcbiAgICB9KTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtuYW1lc30gb25DbGljaz17dGhpcy5jbGlja0hhbmRsZXJ9ID5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLXNlbGVjdGFibGUtbGlzdC1pdGVtLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgPENoZWNrYm94XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLnByb3BzLmNoZWNrRGlzYWJsZWR9XHJcbiAgICAgICAgICAgIG9uQ2hlY2s9e3RoaXMuY2hlY2tIYW5kbGVyfVxyXG4gICAgICAgICAgICBjaGVja2VkPXt0aGlzLnByb3BzLmNoZWNrZWR9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1saXN0LWl0ZW0tdGV4dC1jb250YWluZXJcIj5cclxuICAgICAgICAgICAge3RoaXMucHJvcHMuaXRlbVJlbmRlckZ1bmN0aW9uID9cclxuICAgICAgICAgICAgICB0aGlzLnByb3BzLml0ZW1SZW5kZXJGdW5jdGlvbih0aGlzLnByb3BzLml0ZW0sIGRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24pIDpcclxuICAgICAgICAgICAgICBkZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uKHRoaXMucHJvcHMuaXRlbSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbkxpc3RJdGVtLnByb3BUeXBlcyA9IHtcclxuICBjaGVja2VkOiBQcm9wVHlwZXMuYm9vbCxcclxuICBjaGVja0Rpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcclxuICBpdGVtOiBoaWVyYXJjaHlJdGVtU2hhcGUuaXNSZXF1aXJlZCxcclxuICBpdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxyXG4gIHNlbGVjdGVkOiBQcm9wVHlwZXMuYm9vbCxcclxuICBvbkNoZWNrOiBQcm9wVHlwZXMuZnVuYyxcclxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcclxufTtcclxuXHJcbkxpc3RJdGVtLmRlZmF1bHRQcm9wcyA9IHtcclxuICBjaGVja2VkOiBmYWxzZSxcclxuICBjaGVja0Rpc2FibGVkOiBmYWxzZSxcclxuICBpdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXHJcbiAgc2VsZWN0ZWQ6IGZhbHNlLFxyXG4gIG9uQ2hlY2s6ICgpID0+IHt9LFxyXG4gIG9uQ2xpY2s6ICgpID0+IHt9LFxyXG59O1xyXG4iXX0=