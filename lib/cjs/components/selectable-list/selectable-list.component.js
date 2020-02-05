"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactList = _interopRequireDefault(require("react-list"));

var _listItem = _interopRequireDefault(require("./list-item.component"));

var _types = require("../../types");

require("./selectable-list.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SelectableList =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(SelectableList, _React$PureComponent);

  function SelectableList() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "itemRenderer", function (index, key) {
      var _this$props = _this.props,
          items = _this$props.items,
          checkDisabled = _this$props.checkDisabled;
      var item = items[index];
      var isChildren = item.children && item.children.length > 0;
      var checked = _this.props.checkedAll || _this.props.checkedIds.indexOf(item.id) !== -1;
      return _react["default"].createElement(_listItem["default"], {
        key: "" + key,
        checked: checked,
        checkDisabled: checkDisabled || isChildren,
        item: item,
        itemRenderFunction: _this.props.itemRenderFunction,
        selected: _this.props.selectedId === String(item.id),
        onCheck: _this.props.onCheck,
        onClick: _this.props.onClick
      });
    });

    return _this;
  }

  var _proto = SelectableList.prototype;

  _proto.render = function render() {
    return _react["default"].createElement("div", {
      className: "oc-selectable-list-wrapper"
    }, _react["default"].createElement("div", null, _react["default"].createElement(_reactList["default"], {
      itemRenderer: this.itemRenderer,
      length: this.props.items.length,
      type: "uniform",
      useStaticSize: true
    })));
  };

  return SelectableList;
}(_react["default"].PureComponent);

exports["default"] = SelectableList;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NlbGVjdGFibGUtbGlzdC9zZWxlY3RhYmxlLWxpc3QuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJTZWxlY3RhYmxlTGlzdCIsImluZGV4Iiwia2V5IiwicHJvcHMiLCJpdGVtcyIsImNoZWNrRGlzYWJsZWQiLCJpdGVtIiwiaXNDaGlsZHJlbiIsImNoaWxkcmVuIiwibGVuZ3RoIiwiY2hlY2tlZCIsImNoZWNrZWRBbGwiLCJjaGVja2VkSWRzIiwiaW5kZXhPZiIsImlkIiwiaXRlbVJlbmRlckZ1bmN0aW9uIiwic2VsZWN0ZWRJZCIsIlN0cmluZyIsIm9uQ2hlY2siLCJvbkNsaWNrIiwicmVuZGVyIiwiaXRlbVJlbmRlcmVyIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBR3FCQSxjOzs7Ozs7Ozs7Ozs7OzttRUFDSixVQUFDQyxLQUFELEVBQVFDLEdBQVIsRUFBZ0I7QUFBQSx3QkFDSSxNQUFLQyxLQURUO0FBQUEsVUFDckJDLEtBRHFCLGVBQ3JCQSxLQURxQjtBQUFBLFVBQ2RDLGFBRGMsZUFDZEEsYUFEYztBQUU3QixVQUFNQyxJQUFJLEdBQUdGLEtBQUssQ0FBQ0gsS0FBRCxDQUFsQjtBQUNBLFVBQU1NLFVBQVUsR0FBR0QsSUFBSSxDQUFDRSxRQUFMLElBQWlCRixJQUFJLENBQUNFLFFBQUwsQ0FBY0MsTUFBZCxHQUF1QixDQUEzRDtBQUNBLFVBQU1DLE9BQU8sR0FBRyxNQUFLUCxLQUFMLENBQVdRLFVBQVgsSUFDYixNQUFLUixLQUFMLENBQVdTLFVBQVgsQ0FBc0JDLE9BQXRCLENBQThCUCxJQUFJLENBQUNRLEVBQW5DLE1BQTJDLENBQUMsQ0FEL0M7QUFHQSxhQUNFLGdDQUFDLG9CQUFEO0FBQ0UsUUFBQSxHQUFHLE9BQUtaLEdBRFY7QUFFRSxRQUFBLE9BQU8sRUFBRVEsT0FGWDtBQUdFLFFBQUEsYUFBYSxFQUFFTCxhQUFhLElBQUlFLFVBSGxDO0FBSUUsUUFBQSxJQUFJLEVBQUVELElBSlI7QUFLRSxRQUFBLGtCQUFrQixFQUFFLE1BQUtILEtBQUwsQ0FBV1ksa0JBTGpDO0FBTUUsUUFBQSxRQUFRLEVBQUUsTUFBS1osS0FBTCxDQUFXYSxVQUFYLEtBQTBCQyxNQUFNLENBQUNYLElBQUksQ0FBQ1EsRUFBTixDQU41QztBQU9FLFFBQUEsT0FBTyxFQUFFLE1BQUtYLEtBQUwsQ0FBV2UsT0FQdEI7QUFRRSxRQUFBLE9BQU8sRUFBRSxNQUFLZixLQUFMLENBQVdnQjtBQVJ0QixRQURGO0FBV0QsSzs7Ozs7OztTQUVEQyxNLEdBQUEsa0JBQVM7QUFDUCxXQUNFO0FBQUssTUFBQSxTQUFTLEVBQUM7QUFBZixPQUNFLDZDQUNFLGdDQUFDLHFCQUFEO0FBQ0UsTUFBQSxZQUFZLEVBQUUsS0FBS0MsWUFEckI7QUFFRSxNQUFBLE1BQU0sRUFBRSxLQUFLbEIsS0FBTCxDQUFXQyxLQUFYLENBQWlCSyxNQUYzQjtBQUdFLE1BQUEsSUFBSSxFQUFDLFNBSFA7QUFJRSxNQUFBLGFBQWE7QUFKZixNQURGLENBREYsQ0FERjtBQVlELEc7OztFQWxDeUNhLGtCQUFNQyxhOzs7QUFnRGxEdkIsY0FBYyxDQUFDd0IsWUFBZixHQUE4QjtBQUM1QmIsRUFBQUEsVUFBVSxFQUFFLEtBRGdCO0FBRTVCUCxFQUFBQSxLQUFLLEVBQUUsRUFGcUI7QUFHNUJXLEVBQUFBLGtCQUFrQixFQUFFLElBSFE7QUFJNUJILEVBQUFBLFVBQVUsRUFBRSxFQUpnQjtBQUs1QlAsRUFBQUEsYUFBYSxFQUFFLEtBTGE7QUFNNUJXLEVBQUFBLFVBQVUsRUFBRSxJQU5nQjtBQU81QkUsRUFBQUEsT0FBTyxFQUFFLG1CQUFNLENBQUUsQ0FQVztBQVE1QkMsRUFBQUEsT0FBTyxFQUFFLG1CQUFNLENBQUU7QUFSVyxDQUE5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0TGlzdCBmcm9tICdyZWFjdC1saXN0JztcblxuaW1wb3J0IExpc3RJdGVtIGZyb20gJy4vbGlzdC1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBoaWVyYXJjaHlJdGVtTGlzdFNoYXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0ICcuL3NlbGVjdGFibGUtbGlzdC5zY3NzJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWxlY3RhYmxlTGlzdCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBpdGVtUmVuZGVyZXIgPSAoaW5kZXgsIGtleSkgPT4ge1xuICAgIGNvbnN0IHsgaXRlbXMsIGNoZWNrRGlzYWJsZWQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaXRlbSA9IGl0ZW1zW2luZGV4XTtcbiAgICBjb25zdCBpc0NoaWxkcmVuID0gaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDA7XG4gICAgY29uc3QgY2hlY2tlZCA9IHRoaXMucHJvcHMuY2hlY2tlZEFsbFxuICAgIHx8IHRoaXMucHJvcHMuY2hlY2tlZElkcy5pbmRleE9mKGl0ZW0uaWQpICE9PSAtMTtcblxuICAgIHJldHVybiAoXG4gICAgICA8TGlzdEl0ZW1cbiAgICAgICAga2V5PXtgJHtrZXl9YH1cbiAgICAgICAgY2hlY2tlZD17Y2hlY2tlZH1cbiAgICAgICAgY2hlY2tEaXNhYmxlZD17Y2hlY2tEaXNhYmxlZCB8fCBpc0NoaWxkcmVufVxuICAgICAgICBpdGVtPXtpdGVtfVxuICAgICAgICBpdGVtUmVuZGVyRnVuY3Rpb249e3RoaXMucHJvcHMuaXRlbVJlbmRlckZ1bmN0aW9ufVxuICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZElkID09PSBTdHJpbmcoaXRlbS5pZCl9XG4gICAgICAgIG9uQ2hlY2s9e3RoaXMucHJvcHMub25DaGVja31cbiAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkNsaWNrfVxuICAgICAgLz4pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLXNlbGVjdGFibGUtbGlzdC13cmFwcGVyXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPFJlYWN0TGlzdFxuICAgICAgICAgICAgaXRlbVJlbmRlcmVyPXt0aGlzLml0ZW1SZW5kZXJlcn1cbiAgICAgICAgICAgIGxlbmd0aD17dGhpcy5wcm9wcy5pdGVtcy5sZW5ndGh9XG4gICAgICAgICAgICB0eXBlPVwidW5pZm9ybVwiXG4gICAgICAgICAgICB1c2VTdGF0aWNTaXplXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblNlbGVjdGFibGVMaXN0LnByb3BUeXBlcyA9IHtcbiAgY2hlY2tlZEFsbDogUHJvcFR5cGVzLmJvb2wsXG4gIGl0ZW1zOiBoaWVyYXJjaHlJdGVtTGlzdFNoYXBlLFxuICBpdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICBjaGVja2VkSWRzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMubnVtYmVyKSxcbiAgY2hlY2tEaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gIHNlbGVjdGVkSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIG9uQ2hlY2s6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cblNlbGVjdGFibGVMaXN0LmRlZmF1bHRQcm9wcyA9IHtcbiAgY2hlY2tlZEFsbDogZmFsc2UsXG4gIGl0ZW1zOiBbXSxcbiAgaXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxuICBjaGVja2VkSWRzOiBbXSxcbiAgY2hlY2tEaXNhYmxlZDogZmFsc2UsXG4gIHNlbGVjdGVkSWQ6IG51bGwsXG4gIG9uQ2hlY2s6ICgpID0+IHt9LFxuICBvbkNsaWNrOiAoKSA9PiB7fSxcbn07XG4iXX0=