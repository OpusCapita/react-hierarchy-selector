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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvc2VhcmNoL3NlYXJjaC1jb250ZW50LmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJQb3BvdmVyRm91bmRJdGVtcyIsImZvdW5kSXRlbXNTaGFwZSIsIlBvcG92ZXJTZWFyY2hDb250ZW50IiwiZ2V0Rm91bmRJdGVtcyIsImZvdW5kSXRlbXMiLCJwcm9wcyIsImVsIiwibWFpbkVsZW1lbnQiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5IiwibmFtZSIsIml0ZW1zIiwib25TZWxlY3QiLCJkYXRhIiwiaXRlbVJlbmRlckZ1bmN0aW9uIiwiZ2V0TWVzc2FnZSIsIm1lc3NhZ2UiLCJyZW5kZXIiLCJsZW5ndGgiLCJub01hdGNoZXNMYWJlbCIsInRvb011Y2hNYXRjaGVzTGFiZWwiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0Qjs7QUFFQSxPQUFPQyxpQkFBUCxNQUE4Qix5QkFBOUI7QUFDQSxTQUFTQyxlQUFULFFBQWdDLGdCQUFoQzs7SUFFcUJDLG9COzs7Ozs7Ozs7Ozs7Z0tBQ25CQyxhLEdBQWdCLFlBQU07QUFBQSxVQUNaQyxVQURZLEdBQ0csTUFBS0MsS0FEUixDQUNaRCxVQURZOzs7QUFHcEIsYUFDRTtBQUFBO0FBQUE7QUFDRSxxQkFBVSw4Q0FEWjtBQUVFLGVBQUssYUFBQ0UsRUFBRCxFQUFRO0FBQUUsa0JBQUtDLFdBQUwsR0FBbUJELEVBQW5CO0FBQXdCO0FBRnpDO0FBSUU7QUFBQTtBQUFBLFlBQUksV0FBVSxZQUFkO0FBQ0dFLGlCQUFPQyxJQUFQLENBQVlMLFVBQVosRUFBd0JNLEdBQXhCLENBQTRCO0FBQUEsbUJBQzNCLG9CQUFDLGlCQUFEO0FBQ0UsbUJBQUtOLFdBQVdPLEdBQVgsRUFBZ0JDLElBRHZCO0FBRUUseUJBQVdSLFdBQVdPLEdBQVgsRUFBZ0JDLElBRjdCO0FBR0Usb0JBQU1SLFdBQVdPLEdBQVgsRUFBZ0JFLEtBSHhCO0FBSUUsd0JBQVU7QUFBQSx1QkFBUSxNQUFLUixLQUFMLENBQVdTLFFBQVgsQ0FBb0JDLElBQXBCLENBQVI7QUFBQSxlQUpaO0FBS0Usa0NBQW9CLE1BQUtWLEtBQUwsQ0FBV1c7QUFMakMsY0FEMkI7QUFBQSxXQUE1QjtBQURIO0FBSkYsT0FERjtBQWtCRCxLLFFBRURDLFUsR0FBYTtBQUFBLGFBQ1g7QUFBQTtBQUFBLFVBQUcsV0FBVSxpQkFBYjtBQUFnQ0M7QUFBaEMsT0FEVztBQUFBLEs7OztpQ0FJYkMsTSxxQkFBUztBQUNQLFFBQUksS0FBS2QsS0FBTCxDQUFXRCxVQUFYLENBQXNCZ0IsTUFBdEIsS0FBaUMsQ0FBckMsRUFBd0M7QUFDdEMsYUFBTyxLQUFLSCxVQUFMLENBQWdCLEtBQUtaLEtBQUwsQ0FBV2dCLGNBQTNCLENBQVA7QUFDRCxLQUZELE1BRU8sSUFBSSxLQUFLaEIsS0FBTCxDQUFXRCxVQUFYLENBQXNCZ0IsTUFBdEIsR0FBK0IsR0FBbkMsRUFBd0M7QUFDN0MsYUFBTyxLQUFLSCxVQUFMLENBQWdCLEtBQUtaLEtBQUwsQ0FBV2lCLG1CQUEzQixDQUFQO0FBQ0Q7O0FBRUQsV0FBTyxLQUFLbkIsYUFBTCxFQUFQO0FBQ0QsRzs7O0VBcEMrQ0wsTUFBTXlCLGE7O1NBQW5DckIsb0I7OztBQStDckJBLHFCQUFxQnNCLFlBQXJCLEdBQW9DO0FBQ2xDVixZQUFVLG9CQUFNLENBQUUsQ0FEZ0I7QUFFbENFLHNCQUFvQixJQUZjO0FBR2xDWixjQUFZLEVBSHNCO0FBSWxDaUIsa0JBQWdCLFlBSmtCO0FBS2xDQyx1QkFBcUI7QUFMYSxDQUFwQyIsImZpbGUiOiJzZWFyY2gtY29udGVudC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IFBvcG92ZXJGb3VuZEl0ZW1zIGZyb20gJy4vZm91bmQtaXRlbXMuY29tcG9uZW50JztcbmltcG9ydCB7IGZvdW5kSXRlbXNTaGFwZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wb3ZlclNlYXJjaENvbnRlbnQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgZ2V0Rm91bmRJdGVtcyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGZvdW5kSXRlbXMgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItcG9wb3Zlci1zZWFyY2gtY29udGVudFwiXG4gICAgICAgIHJlZj17KGVsKSA9PiB7IHRoaXMubWFpbkVsZW1lbnQgPSBlbDsgfX1cbiAgICAgID5cbiAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXBcIj5cbiAgICAgICAgICB7T2JqZWN0LmtleXMoZm91bmRJdGVtcykubWFwKGtleSA9PiAoXG4gICAgICAgICAgICA8UG9wb3ZlckZvdW5kSXRlbXNcbiAgICAgICAgICAgICAga2V5PXtmb3VuZEl0ZW1zW2tleV0ubmFtZX1cbiAgICAgICAgICAgICAgZ3JvdXBOYW1lPXtmb3VuZEl0ZW1zW2tleV0ubmFtZX1cbiAgICAgICAgICAgICAgZGF0YT17Zm91bmRJdGVtc1trZXldLml0ZW1zfVxuICAgICAgICAgICAgICBvblNlbGVjdD17ZGF0YSA9PiB0aGlzLnByb3BzLm9uU2VsZWN0KGRhdGEpfVxuICAgICAgICAgICAgICBpdGVtUmVuZGVyRnVuY3Rpb249e3RoaXMucHJvcHMuaXRlbVJlbmRlckZ1bmN0aW9ufVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBnZXRNZXNzYWdlID0gbWVzc2FnZSA9PiAoXG4gICAgPHAgY2xhc3NOYW1lPVwibWVzc2FnZSB3YXJuaW5nXCI+e21lc3NhZ2V9PC9wPlxuICApXG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLnByb3BzLmZvdW5kSXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRNZXNzYWdlKHRoaXMucHJvcHMubm9NYXRjaGVzTGFiZWwpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5mb3VuZEl0ZW1zLmxlbmd0aCA+IDEwMCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0TWVzc2FnZSh0aGlzLnByb3BzLnRvb011Y2hNYXRjaGVzTGFiZWwpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmdldEZvdW5kSXRlbXMoKTtcbiAgfVxufVxuXG5Qb3BvdmVyU2VhcmNoQ29udGVudC5wcm9wVHlwZXMgPSB7XG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgaXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgZm91bmRJdGVtczogZm91bmRJdGVtc1NoYXBlLFxuICBub01hdGNoZXNMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgdG9vTXVjaE1hdGNoZXNMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cblBvcG92ZXJTZWFyY2hDb250ZW50LmRlZmF1bHRQcm9wcyA9IHtcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBpdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXG4gIGZvdW5kSXRlbXM6IFtdLFxuICBub01hdGNoZXNMYWJlbDogJ05vIG1hdGNoZXMnLFxuICB0b29NdWNoTWF0Y2hlc0xhYmVsOiAnVG9vIG11Y2ggbWF0Y2hlcyBmb3VuZCwgcmVmaW5lIHNlYXJjaC4nLFxufTtcbiJdfQ==