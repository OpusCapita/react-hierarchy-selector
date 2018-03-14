'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactList = require('react-list');

var _reactList2 = _interopRequireDefault(_reactList);

var _listItem = require('./list-item.component');

var _listItem2 = _interopRequireDefault(_listItem);

var _types = require('../../types');

require('./selectable-list.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectableList = function (_React$PureComponent) {
  _inherits(SelectableList, _React$PureComponent);

  function SelectableList() {
    var _temp, _this, _ret;

    _classCallCheck(this, SelectableList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.itemRenderer = function (index, key) {
      var _this$props = _this.props,
          items = _this$props.items,
          checkDisabled = _this$props.checkDisabled;

      var item = items[index];
      var isChildren = item.children && item.children.length > 0;
      var checked = _this.props.checkedAll || _this.props.checkedIds.indexOf(item.id) !== -1;

      return _react2.default.createElement(_listItem2.default, {
        key: '' + key,
        checked: checked,
        checkDisabled: checkDisabled || isChildren,
        item: item,
        itemRenderFunction: _this.props.itemRenderFunction,
        selected: _this.props.selectedId === String(item.id),
        onCheck: _this.props.onCheck,
        onClick: _this.props.onClick
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  SelectableList.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'oc-selectable-list-wrapper' },
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_reactList2.default, {
          itemRenderer: this.itemRenderer,
          length: this.props.items.length,
          type: 'uniform',
          useStaticSize: true
        })
      )
    );
  };

  return SelectableList;
}(_react2.default.PureComponent);

exports.default = SelectableList;


SelectableList.defaultProps = {
  checkedAll: false,
  items: [],
  itemRenderFunction: null,
  checkedIds: [],
  checkDisabled: false,
  selectedId: null,
  onCheck: function onCheck() {},
  onClick: function onClick() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NlbGVjdGFibGUtbGlzdC9zZWxlY3RhYmxlLWxpc3QuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJTZWxlY3RhYmxlTGlzdCIsIml0ZW1SZW5kZXJlciIsImluZGV4Iiwia2V5IiwicHJvcHMiLCJpdGVtcyIsImNoZWNrRGlzYWJsZWQiLCJpdGVtIiwiaXNDaGlsZHJlbiIsImNoaWxkcmVuIiwibGVuZ3RoIiwiY2hlY2tlZCIsImNoZWNrZWRBbGwiLCJjaGVja2VkSWRzIiwiaW5kZXhPZiIsImlkIiwiaXRlbVJlbmRlckZ1bmN0aW9uIiwic2VsZWN0ZWRJZCIsIlN0cmluZyIsIm9uQ2hlY2siLCJvbkNsaWNrIiwicmVuZGVyIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBR3FCQSxjOzs7Ozs7Ozs7Ozs7Z0tBQ25CQyxZLEdBQWUsVUFBQ0MsS0FBRCxFQUFRQyxHQUFSLEVBQWdCO0FBQUEsd0JBQ0ksTUFBS0MsS0FEVDtBQUFBLFVBQ3JCQyxLQURxQixlQUNyQkEsS0FEcUI7QUFBQSxVQUNkQyxhQURjLGVBQ2RBLGFBRGM7O0FBRTdCLFVBQU1DLE9BQU9GLE1BQU1ILEtBQU4sQ0FBYjtBQUNBLFVBQU1NLGFBQWFELEtBQUtFLFFBQUwsSUFBaUJGLEtBQUtFLFFBQUwsQ0FBY0MsTUFBZCxHQUF1QixDQUEzRDtBQUNBLFVBQU1DLFVBQVUsTUFBS1AsS0FBTCxDQUFXUSxVQUFYLElBQ2IsTUFBS1IsS0FBTCxDQUFXUyxVQUFYLENBQXNCQyxPQUF0QixDQUE4QlAsS0FBS1EsRUFBbkMsTUFBMkMsQ0FBQyxDQUQvQzs7QUFHQSxhQUNFO0FBQ0Usa0JBQVFaLEdBRFY7QUFFRSxpQkFBU1EsT0FGWDtBQUdFLHVCQUFlTCxpQkFBaUJFLFVBSGxDO0FBSUUsY0FBTUQsSUFKUjtBQUtFLDRCQUFvQixNQUFLSCxLQUFMLENBQVdZLGtCQUxqQztBQU1FLGtCQUFVLE1BQUtaLEtBQUwsQ0FBV2EsVUFBWCxLQUEwQkMsT0FBT1gsS0FBS1EsRUFBWixDQU50QztBQU9FLGlCQUFTLE1BQUtYLEtBQUwsQ0FBV2UsT0FQdEI7QUFRRSxpQkFBUyxNQUFLZixLQUFMLENBQVdnQjtBQVJ0QixRQURGO0FBV0QsSzs7OzJCQUVEQyxNLHFCQUFTO0FBQ1AsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLDRCQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFDRSx3QkFBYyxLQUFLcEIsWUFEckI7QUFFRSxrQkFBUSxLQUFLRyxLQUFMLENBQVdDLEtBQVgsQ0FBaUJLLE1BRjNCO0FBR0UsZ0JBQUssU0FIUDtBQUlFO0FBSkY7QUFERjtBQURGLEtBREY7QUFZRCxHOzs7RUFsQ3lDLGdCQUFNWSxhOztrQkFBN0J0QixjOzs7QUFnRHJCQSxlQUFldUIsWUFBZixHQUE4QjtBQUM1QlgsY0FBWSxLQURnQjtBQUU1QlAsU0FBTyxFQUZxQjtBQUc1Qlcsc0JBQW9CLElBSFE7QUFJNUJILGNBQVksRUFKZ0I7QUFLNUJQLGlCQUFlLEtBTGE7QUFNNUJXLGNBQVksSUFOZ0I7QUFPNUJFLFdBQVMsbUJBQU0sQ0FBRSxDQVBXO0FBUTVCQyxXQUFTLG1CQUFNLENBQUU7QUFSVyxDQUE5QiIsImZpbGUiOiJzZWxlY3RhYmxlLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IFJlYWN0TGlzdCBmcm9tICdyZWFjdC1saXN0JztcclxuXHJcbmltcG9ydCBMaXN0SXRlbSBmcm9tICcuL2xpc3QtaXRlbS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBoaWVyYXJjaHlJdGVtTGlzdFNoYXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xyXG5pbXBvcnQgJy4vc2VsZWN0YWJsZS1saXN0LnNjc3MnO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlbGVjdGFibGVMaXN0IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XHJcbiAgaXRlbVJlbmRlcmVyID0gKGluZGV4LCBrZXkpID0+IHtcclxuICAgIGNvbnN0IHsgaXRlbXMsIGNoZWNrRGlzYWJsZWQgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCBpdGVtID0gaXRlbXNbaW5kZXhdO1xyXG4gICAgY29uc3QgaXNDaGlsZHJlbiA9IGl0ZW0uY2hpbGRyZW4gJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwO1xyXG4gICAgY29uc3QgY2hlY2tlZCA9IHRoaXMucHJvcHMuY2hlY2tlZEFsbFxyXG4gICAgfHwgdGhpcy5wcm9wcy5jaGVja2VkSWRzLmluZGV4T2YoaXRlbS5pZCkgIT09IC0xO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxMaXN0SXRlbVxyXG4gICAgICAgIGtleT17YCR7a2V5fWB9XHJcbiAgICAgICAgY2hlY2tlZD17Y2hlY2tlZH1cclxuICAgICAgICBjaGVja0Rpc2FibGVkPXtjaGVja0Rpc2FibGVkIHx8IGlzQ2hpbGRyZW59XHJcbiAgICAgICAgaXRlbT17aXRlbX1cclxuICAgICAgICBpdGVtUmVuZGVyRnVuY3Rpb249e3RoaXMucHJvcHMuaXRlbVJlbmRlckZ1bmN0aW9ufVxyXG4gICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkSWQgPT09IFN0cmluZyhpdGVtLmlkKX1cclxuICAgICAgICBvbkNoZWNrPXt0aGlzLnByb3BzLm9uQ2hlY2t9XHJcbiAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkNsaWNrfVxyXG4gICAgICAvPik7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLXNlbGVjdGFibGUtbGlzdC13cmFwcGVyXCI+XHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxSZWFjdExpc3RcclxuICAgICAgICAgICAgaXRlbVJlbmRlcmVyPXt0aGlzLml0ZW1SZW5kZXJlcn1cclxuICAgICAgICAgICAgbGVuZ3RoPXt0aGlzLnByb3BzLml0ZW1zLmxlbmd0aH1cclxuICAgICAgICAgICAgdHlwZT1cInVuaWZvcm1cIlxyXG4gICAgICAgICAgICB1c2VTdGF0aWNTaXplXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5TZWxlY3RhYmxlTGlzdC5wcm9wVHlwZXMgPSB7XHJcbiAgY2hlY2tlZEFsbDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgaXRlbXM6IGhpZXJhcmNoeUl0ZW1MaXN0U2hhcGUsXHJcbiAgaXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcclxuICBjaGVja2VkSWRzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMubnVtYmVyKSxcclxuICBjaGVja0Rpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcclxuICBzZWxlY3RlZElkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIG9uQ2hlY2s6IFByb3BUeXBlcy5mdW5jLFxyXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxyXG59O1xyXG5cclxuU2VsZWN0YWJsZUxpc3QuZGVmYXVsdFByb3BzID0ge1xyXG4gIGNoZWNrZWRBbGw6IGZhbHNlLFxyXG4gIGl0ZW1zOiBbXSxcclxuICBpdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXHJcbiAgY2hlY2tlZElkczogW10sXHJcbiAgY2hlY2tEaXNhYmxlZDogZmFsc2UsXHJcbiAgc2VsZWN0ZWRJZDogbnVsbCxcclxuICBvbkNoZWNrOiAoKSA9PiB7fSxcclxuICBvbkNsaWNrOiAoKSA9PiB7fSxcclxufTtcclxuIl19