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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NlbGVjdGFibGUtbGlzdC9zZWxlY3RhYmxlLWxpc3QuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJTZWxlY3RhYmxlTGlzdCIsIml0ZW1SZW5kZXJlciIsImluZGV4Iiwia2V5IiwicHJvcHMiLCJpdGVtcyIsImNoZWNrRGlzYWJsZWQiLCJpdGVtIiwiaXNDaGlsZHJlbiIsImNoaWxkcmVuIiwibGVuZ3RoIiwiY2hlY2tlZCIsImNoZWNrZWRBbGwiLCJjaGVja2VkSWRzIiwiaW5kZXhPZiIsImlkIiwiaXRlbVJlbmRlckZ1bmN0aW9uIiwic2VsZWN0ZWRJZCIsIlN0cmluZyIsIm9uQ2hlY2siLCJvbkNsaWNrIiwicmVuZGVyIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFHcUJBLGM7Ozs7Ozs7Ozs7OztnS0FDbkJDLFksR0FBZSxVQUFDQyxLQUFELEVBQVFDLEdBQVIsRUFBZ0I7QUFBQSx3QkFDSSxNQUFLQyxLQURUO0FBQUEsVUFDckJDLEtBRHFCLGVBQ3JCQSxLQURxQjtBQUFBLFVBQ2RDLGFBRGMsZUFDZEEsYUFEYzs7QUFFN0IsVUFBTUMsT0FBT0YsTUFBTUgsS0FBTixDQUFiO0FBQ0EsVUFBTU0sYUFBYUQsS0FBS0UsUUFBTCxJQUFpQkYsS0FBS0UsUUFBTCxDQUFjQyxNQUFkLEdBQXVCLENBQTNEO0FBQ0EsVUFBTUMsVUFBVSxNQUFLUCxLQUFMLENBQVdRLFVBQVgsSUFDYixNQUFLUixLQUFMLENBQVdTLFVBQVgsQ0FBc0JDLE9BQXRCLENBQThCUCxLQUFLUSxFQUFuQyxNQUEyQyxDQUFDLENBRC9DOztBQUdBLGFBQ0UsOEJBQUMsa0JBQUQ7QUFDRSxrQkFBUVosR0FEVjtBQUVFLGlCQUFTUSxPQUZYO0FBR0UsdUJBQWVMLGlCQUFpQkUsVUFIbEM7QUFJRSxjQUFNRCxJQUpSO0FBS0UsNEJBQW9CLE1BQUtILEtBQUwsQ0FBV1ksa0JBTGpDO0FBTUUsa0JBQVUsTUFBS1osS0FBTCxDQUFXYSxVQUFYLEtBQTBCQyxPQUFPWCxLQUFLUSxFQUFaLENBTnRDO0FBT0UsaUJBQVMsTUFBS1gsS0FBTCxDQUFXZSxPQVB0QjtBQVFFLGlCQUFTLE1BQUtmLEtBQUwsQ0FBV2dCO0FBUnRCLFFBREY7QUFXRCxLOzs7MkJBRURDLE0scUJBQVM7QUFDUCxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsNEJBQWY7QUFDRTtBQUFBO0FBQUE7QUFDRSxzQ0FBQyxtQkFBRDtBQUNFLHdCQUFjLEtBQUtwQixZQURyQjtBQUVFLGtCQUFRLEtBQUtHLEtBQUwsQ0FBV0MsS0FBWCxDQUFpQkssTUFGM0I7QUFHRSxnQkFBSyxTQUhQO0FBSUU7QUFKRjtBQURGO0FBREYsS0FERjtBQVlELEc7OztFQWxDeUNZLGdCQUFNQyxhOztrQkFBN0J2QixjOzs7QUFnRHJCQSxlQUFld0IsWUFBZixHQUE4QjtBQUM1QlosY0FBWSxLQURnQjtBQUU1QlAsU0FBTyxFQUZxQjtBQUc1Qlcsc0JBQW9CLElBSFE7QUFJNUJILGNBQVksRUFKZ0I7QUFLNUJQLGlCQUFlLEtBTGE7QUFNNUJXLGNBQVksSUFOZ0I7QUFPNUJFLFdBQVMsbUJBQU0sQ0FBRSxDQVBXO0FBUTVCQyxXQUFTLG1CQUFNLENBQUU7QUFSVyxDQUE5QiIsImZpbGUiOiJzZWxlY3RhYmxlLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3RMaXN0IGZyb20gJ3JlYWN0LWxpc3QnO1xuXG5pbXBvcnQgTGlzdEl0ZW0gZnJvbSAnLi9saXN0LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IGhpZXJhcmNoeUl0ZW1MaXN0U2hhcGUgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgJy4vc2VsZWN0YWJsZS1saXN0LnNjc3MnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlbGVjdGFibGVMaXN0IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGl0ZW1SZW5kZXJlciA9IChpbmRleCwga2V5KSA9PiB7XG4gICAgY29uc3QgeyBpdGVtcywgY2hlY2tEaXNhYmxlZCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpdGVtID0gaXRlbXNbaW5kZXhdO1xuICAgIGNvbnN0IGlzQ2hpbGRyZW4gPSBpdGVtLmNoaWxkcmVuICYmIGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID4gMDtcbiAgICBjb25zdCBjaGVja2VkID0gdGhpcy5wcm9wcy5jaGVja2VkQWxsXG4gICAgfHwgdGhpcy5wcm9wcy5jaGVja2VkSWRzLmluZGV4T2YoaXRlbS5pZCkgIT09IC0xO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxMaXN0SXRlbVxuICAgICAgICBrZXk9e2Ake2tleX1gfVxuICAgICAgICBjaGVja2VkPXtjaGVja2VkfVxuICAgICAgICBjaGVja0Rpc2FibGVkPXtjaGVja0Rpc2FibGVkIHx8IGlzQ2hpbGRyZW59XG4gICAgICAgIGl0ZW09e2l0ZW19XG4gICAgICAgIGl0ZW1SZW5kZXJGdW5jdGlvbj17dGhpcy5wcm9wcy5pdGVtUmVuZGVyRnVuY3Rpb259XG4gICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkSWQgPT09IFN0cmluZyhpdGVtLmlkKX1cbiAgICAgICAgb25DaGVjaz17dGhpcy5wcm9wcy5vbkNoZWNrfVxuICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xpY2t9XG4gICAgICAvPik7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2Mtc2VsZWN0YWJsZS1saXN0LXdyYXBwZXJcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8UmVhY3RMaXN0XG4gICAgICAgICAgICBpdGVtUmVuZGVyZXI9e3RoaXMuaXRlbVJlbmRlcmVyfVxuICAgICAgICAgICAgbGVuZ3RoPXt0aGlzLnByb3BzLml0ZW1zLmxlbmd0aH1cbiAgICAgICAgICAgIHR5cGU9XCJ1bmlmb3JtXCJcbiAgICAgICAgICAgIHVzZVN0YXRpY1NpemVcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuU2VsZWN0YWJsZUxpc3QucHJvcFR5cGVzID0ge1xuICBjaGVja2VkQWxsOiBQcm9wVHlwZXMuYm9vbCxcbiAgaXRlbXM6IGhpZXJhcmNoeUl0ZW1MaXN0U2hhcGUsXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gIGNoZWNrZWRJZHM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpLFxuICBjaGVja0Rpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgc2VsZWN0ZWRJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgb25DaGVjazogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxufTtcblxuU2VsZWN0YWJsZUxpc3QuZGVmYXVsdFByb3BzID0ge1xuICBjaGVja2VkQWxsOiBmYWxzZSxcbiAgaXRlbXM6IFtdLFxuICBpdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXG4gIGNoZWNrZWRJZHM6IFtdLFxuICBjaGVja0Rpc2FibGVkOiBmYWxzZSxcbiAgc2VsZWN0ZWRJZDogbnVsbCxcbiAgb25DaGVjazogKCkgPT4ge30sXG4gIG9uQ2xpY2s6ICgpID0+IHt9LFxufTtcbiJdfQ==