function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

import PopoverFoundItems from './found-items.component';
import { foundItemsShape } from '../../../types';

var PopoverSearchContent = function (_React$PureComponent) {
  _inherits(PopoverSearchContent, _React$PureComponent);

  function PopoverSearchContent() {
    var _temp, _this, _ret;

    _classCallCheck(this, PopoverSearchContent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.getFoundItems = function () {
      var foundItems = _this.props.foundItems;


      return React.createElement(
        'div',
        {
          className: 'oc-hierarchy-selector-popover-search-content',
          ref: function ref(el) {
            _this.mainElement = el;
          }
        },
        React.createElement(
          'ul',
          { className: 'list-group' },
          Object.keys(foundItems).map(function (key) {
            return React.createElement(PopoverFoundItems, {
              key: foundItems[key].name,
              groupName: foundItems[key].name,
              data: foundItems[key].items,
              onSelect: function onSelect(data) {
                return _this.props.onSelect(data);
              },
              itemRenderFunction: _this.props.itemRenderFunction
            });
          })
        )
      );
    }, _this.getMessage = function (message) {
      return React.createElement(
        'p',
        { className: 'message warning' },
        message
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  PopoverSearchContent.prototype.render = function render() {
    if (this.props.foundItems.length === 0) {
      return this.getMessage(this.props.noMatchesLabel);
    } else if (this.props.foundItems.length > 100) {
      return this.getMessage(this.props.tooMuchMatchesLabel);
    }

    return this.getFoundItems();
  };

  return PopoverSearchContent;
}(React.PureComponent);

export { PopoverSearchContent as default };


PopoverSearchContent.defaultProps = {
  onSelect: function onSelect() {},
  itemRenderFunction: null,
  foundItems: [],
  noMatchesLabel: 'No matches',
  tooMuchMatchesLabel: 'Too much matches found, refine search.'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvc2VhcmNoL3NlYXJjaC1jb250ZW50LmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJQb3BvdmVyRm91bmRJdGVtcyIsImZvdW5kSXRlbXNTaGFwZSIsIlBvcG92ZXJTZWFyY2hDb250ZW50IiwiZ2V0Rm91bmRJdGVtcyIsImZvdW5kSXRlbXMiLCJwcm9wcyIsImVsIiwibWFpbkVsZW1lbnQiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5IiwibmFtZSIsIml0ZW1zIiwib25TZWxlY3QiLCJkYXRhIiwiaXRlbVJlbmRlckZ1bmN0aW9uIiwiZ2V0TWVzc2FnZSIsIm1lc3NhZ2UiLCJyZW5kZXIiLCJsZW5ndGgiLCJub01hdGNoZXNMYWJlbCIsInRvb011Y2hNYXRjaGVzTGFiZWwiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0Qjs7QUFFQSxPQUFPQyxpQkFBUCxNQUE4Qix5QkFBOUI7QUFDQSxTQUFTQyxlQUFULFFBQWdDLGdCQUFoQzs7SUFFcUJDLG9COzs7Ozs7Ozs7Ozs7Z0tBQ25CQyxhLEdBQWdCLFlBQU07QUFBQSxVQUNaQyxVQURZLEdBQ0csTUFBS0MsS0FEUixDQUNaRCxVQURZOzs7QUFHcEIsYUFDRTtBQUFBO0FBQUE7QUFDRSxxQkFBVSw4Q0FEWjtBQUVFLGVBQUssYUFBQ0UsRUFBRCxFQUFRO0FBQUUsa0JBQUtDLFdBQUwsR0FBbUJELEVBQW5CO0FBQXdCO0FBRnpDO0FBSUU7QUFBQTtBQUFBLFlBQUksV0FBVSxZQUFkO0FBQ0dFLGlCQUFPQyxJQUFQLENBQVlMLFVBQVosRUFBd0JNLEdBQXhCLENBQTRCO0FBQUEsbUJBQzNCLG9CQUFDLGlCQUFEO0FBQ0UsbUJBQUtOLFdBQVdPLEdBQVgsRUFBZ0JDLElBRHZCO0FBRUUseUJBQVdSLFdBQVdPLEdBQVgsRUFBZ0JDLElBRjdCO0FBR0Usb0JBQU1SLFdBQVdPLEdBQVgsRUFBZ0JFLEtBSHhCO0FBSUUsd0JBQVU7QUFBQSx1QkFBUSxNQUFLUixLQUFMLENBQVdTLFFBQVgsQ0FBb0JDLElBQXBCLENBQVI7QUFBQSxlQUpaO0FBS0Usa0NBQW9CLE1BQUtWLEtBQUwsQ0FBV1c7QUFMakMsY0FEMkI7QUFBQSxXQUE1QjtBQURIO0FBSkYsT0FERjtBQWtCRCxLLFFBRURDLFUsR0FBYTtBQUFBLGFBQ1g7QUFBQTtBQUFBLFVBQUcsV0FBVSxpQkFBYjtBQUFnQ0M7QUFBaEMsT0FEVztBQUFBLEs7OztpQ0FJYkMsTSxxQkFBUztBQUNQLFFBQUksS0FBS2QsS0FBTCxDQUFXRCxVQUFYLENBQXNCZ0IsTUFBdEIsS0FBaUMsQ0FBckMsRUFBd0M7QUFDdEMsYUFBTyxLQUFLSCxVQUFMLENBQWdCLEtBQUtaLEtBQUwsQ0FBV2dCLGNBQTNCLENBQVA7QUFDRCxLQUZELE1BRU8sSUFBSSxLQUFLaEIsS0FBTCxDQUFXRCxVQUFYLENBQXNCZ0IsTUFBdEIsR0FBK0IsR0FBbkMsRUFBd0M7QUFDN0MsYUFBTyxLQUFLSCxVQUFMLENBQWdCLEtBQUtaLEtBQUwsQ0FBV2lCLG1CQUEzQixDQUFQO0FBQ0Q7O0FBRUQsV0FBTyxLQUFLbkIsYUFBTCxFQUFQO0FBQ0QsRzs7O0VBcEMrQ0wsTUFBTXlCLGE7O1NBQW5DckIsb0I7OztBQStDckJBLHFCQUFxQnNCLFlBQXJCLEdBQW9DO0FBQ2xDVixZQUFVLG9CQUFNLENBQUUsQ0FEZ0I7QUFFbENFLHNCQUFvQixJQUZjO0FBR2xDWixjQUFZLEVBSHNCO0FBSWxDaUIsa0JBQWdCLFlBSmtCO0FBS2xDQyx1QkFBcUI7QUFMYSxDQUFwQyIsImZpbGUiOiJzZWFyY2gtY29udGVudC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5cclxuaW1wb3J0IFBvcG92ZXJGb3VuZEl0ZW1zIGZyb20gJy4vZm91bmQtaXRlbXMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgZm91bmRJdGVtc1NoYXBlIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wb3ZlclNlYXJjaENvbnRlbnQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcclxuICBnZXRGb3VuZEl0ZW1zID0gKCkgPT4ge1xyXG4gICAgY29uc3QgeyBmb3VuZEl0ZW1zIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItcG9wb3Zlci1zZWFyY2gtY29udGVudFwiXHJcbiAgICAgICAgcmVmPXsoZWwpID0+IHsgdGhpcy5tYWluRWxlbWVudCA9IGVsOyB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXBcIj5cclxuICAgICAgICAgIHtPYmplY3Qua2V5cyhmb3VuZEl0ZW1zKS5tYXAoa2V5ID0+IChcclxuICAgICAgICAgICAgPFBvcG92ZXJGb3VuZEl0ZW1zXHJcbiAgICAgICAgICAgICAga2V5PXtmb3VuZEl0ZW1zW2tleV0ubmFtZX1cclxuICAgICAgICAgICAgICBncm91cE5hbWU9e2ZvdW5kSXRlbXNba2V5XS5uYW1lfVxyXG4gICAgICAgICAgICAgIGRhdGE9e2ZvdW5kSXRlbXNba2V5XS5pdGVtc31cclxuICAgICAgICAgICAgICBvblNlbGVjdD17ZGF0YSA9PiB0aGlzLnByb3BzLm9uU2VsZWN0KGRhdGEpfVxyXG4gICAgICAgICAgICAgIGl0ZW1SZW5kZXJGdW5jdGlvbj17dGhpcy5wcm9wcy5pdGVtUmVuZGVyRnVuY3Rpb259XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApKX1cclxuICAgICAgICA8L3VsPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXRNZXNzYWdlID0gbWVzc2FnZSA9PiAoXHJcbiAgICA8cCBjbGFzc05hbWU9XCJtZXNzYWdlIHdhcm5pbmdcIj57bWVzc2FnZX08L3A+XHJcbiAgKVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5mb3VuZEl0ZW1zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRNZXNzYWdlKHRoaXMucHJvcHMubm9NYXRjaGVzTGFiZWwpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLmZvdW5kSXRlbXMubGVuZ3RoID4gMTAwKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldE1lc3NhZ2UodGhpcy5wcm9wcy50b29NdWNoTWF0Y2hlc0xhYmVsKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5nZXRGb3VuZEl0ZW1zKCk7XHJcbiAgfVxyXG59XHJcblxyXG5Qb3BvdmVyU2VhcmNoQ29udGVudC5wcm9wVHlwZXMgPSB7XHJcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxyXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgZm91bmRJdGVtczogZm91bmRJdGVtc1NoYXBlLFxyXG4gIG5vTWF0Y2hlc0xhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIHRvb011Y2hNYXRjaGVzTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcblxyXG5Qb3BvdmVyU2VhcmNoQ29udGVudC5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxyXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcclxuICBmb3VuZEl0ZW1zOiBbXSxcclxuICBub01hdGNoZXNMYWJlbDogJ05vIG1hdGNoZXMnLFxyXG4gIHRvb011Y2hNYXRjaGVzTGFiZWw6ICdUb28gbXVjaCBtYXRjaGVzIGZvdW5kLCByZWZpbmUgc2VhcmNoLicsXHJcbn07XHJcbiJdfQ==