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
              onSelect: _this.props.onSelect,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvc2VhcmNoL3NlYXJjaC1jb250ZW50LmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJQb3BvdmVyRm91bmRJdGVtcyIsImZvdW5kSXRlbXNTaGFwZSIsIlBvcG92ZXJTZWFyY2hDb250ZW50IiwiZ2V0Rm91bmRJdGVtcyIsImZvdW5kSXRlbXMiLCJwcm9wcyIsImVsIiwibWFpbkVsZW1lbnQiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5IiwibmFtZSIsIml0ZW1zIiwib25TZWxlY3QiLCJpdGVtUmVuZGVyRnVuY3Rpb24iLCJnZXRNZXNzYWdlIiwibWVzc2FnZSIsInJlbmRlciIsImxlbmd0aCIsIm5vTWF0Y2hlc0xhYmVsIiwidG9vTXVjaE1hdGNoZXNMYWJlbCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCOztBQUVBLE9BQU9DLGlCQUFQLE1BQThCLHlCQUE5QjtBQUNBLFNBQVNDLGVBQVQsUUFBZ0MsZ0JBQWhDOztJQUVxQkMsb0I7Ozs7Ozs7Ozs7OztnS0FDbkJDLGEsR0FBZ0IsWUFBTTtBQUFBLFVBQ1pDLFVBRFksR0FDRyxNQUFLQyxLQURSLENBQ1pELFVBRFk7OztBQUdwQixhQUNFO0FBQUE7QUFBQTtBQUNFLHFCQUFVLDhDQURaO0FBRUUsZUFBSyxhQUFDRSxFQUFELEVBQVE7QUFBRSxrQkFBS0MsV0FBTCxHQUFtQkQsRUFBbkI7QUFBd0I7QUFGekM7QUFJRTtBQUFBO0FBQUEsWUFBSSxXQUFVLFlBQWQ7QUFDR0UsaUJBQU9DLElBQVAsQ0FBWUwsVUFBWixFQUF3Qk0sR0FBeEIsQ0FBNEI7QUFBQSxtQkFDM0Isb0JBQUMsaUJBQUQ7QUFDRSxtQkFBS04sV0FBV08sR0FBWCxFQUFnQkMsSUFEdkI7QUFFRSx5QkFBV1IsV0FBV08sR0FBWCxFQUFnQkMsSUFGN0I7QUFHRSxvQkFBTVIsV0FBV08sR0FBWCxFQUFnQkUsS0FIeEI7QUFJRSx3QkFBVSxNQUFLUixLQUFMLENBQVdTLFFBSnZCO0FBS0Usa0NBQW9CLE1BQUtULEtBQUwsQ0FBV1U7QUFMakMsY0FEMkI7QUFBQSxXQUE1QjtBQURIO0FBSkYsT0FERjtBQWtCRCxLLFFBRURDLFUsR0FBYTtBQUFBLGFBQ1g7QUFBQTtBQUFBLFVBQUcsV0FBVSxpQkFBYjtBQUFnQ0M7QUFBaEMsT0FEVztBQUFBLEs7OztpQ0FJYkMsTSxxQkFBUztBQUNQLFFBQUksS0FBS2IsS0FBTCxDQUFXRCxVQUFYLENBQXNCZSxNQUF0QixLQUFpQyxDQUFyQyxFQUF3QztBQUN0QyxhQUFPLEtBQUtILFVBQUwsQ0FBZ0IsS0FBS1gsS0FBTCxDQUFXZSxjQUEzQixDQUFQO0FBQ0QsS0FGRCxNQUVPLElBQUksS0FBS2YsS0FBTCxDQUFXRCxVQUFYLENBQXNCZSxNQUF0QixHQUErQixHQUFuQyxFQUF3QztBQUM3QyxhQUFPLEtBQUtILFVBQUwsQ0FBZ0IsS0FBS1gsS0FBTCxDQUFXZ0IsbUJBQTNCLENBQVA7QUFDRDs7QUFFRCxXQUFPLEtBQUtsQixhQUFMLEVBQVA7QUFDRCxHOzs7RUFwQytDTCxNQUFNd0IsYTs7U0FBbkNwQixvQjs7O0FBK0NyQkEscUJBQXFCcUIsWUFBckIsR0FBb0M7QUFDbENULFlBQVUsb0JBQU0sQ0FBRSxDQURnQjtBQUVsQ0Msc0JBQW9CLElBRmM7QUFHbENYLGNBQVksRUFIc0I7QUFJbENnQixrQkFBZ0IsWUFKa0I7QUFLbENDLHVCQUFxQjtBQUxhLENBQXBDIiwiZmlsZSI6InNlYXJjaC1jb250ZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgUG9wb3ZlckZvdW5kSXRlbXMgZnJvbSAnLi9mb3VuZC1pdGVtcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgZm91bmRJdGVtc1NoYXBlIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3BvdmVyU2VhcmNoQ29udGVudCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBnZXRGb3VuZEl0ZW1zID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZm91bmRJdGVtcyB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1wb3BvdmVyLXNlYXJjaC1jb250ZW50XCJcbiAgICAgICAgcmVmPXsoZWwpID0+IHsgdGhpcy5tYWluRWxlbWVudCA9IGVsOyB9fVxuICAgICAgPlxuICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdC1ncm91cFwiPlxuICAgICAgICAgIHtPYmplY3Qua2V5cyhmb3VuZEl0ZW1zKS5tYXAoa2V5ID0+IChcbiAgICAgICAgICAgIDxQb3BvdmVyRm91bmRJdGVtc1xuICAgICAgICAgICAgICBrZXk9e2ZvdW5kSXRlbXNba2V5XS5uYW1lfVxuICAgICAgICAgICAgICBncm91cE5hbWU9e2ZvdW5kSXRlbXNba2V5XS5uYW1lfVxuICAgICAgICAgICAgICBkYXRhPXtmb3VuZEl0ZW1zW2tleV0uaXRlbXN9XG4gICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLnByb3BzLm9uU2VsZWN0fVxuICAgICAgICAgICAgICBpdGVtUmVuZGVyRnVuY3Rpb249e3RoaXMucHJvcHMuaXRlbVJlbmRlckZ1bmN0aW9ufVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBnZXRNZXNzYWdlID0gbWVzc2FnZSA9PiAoXG4gICAgPHAgY2xhc3NOYW1lPVwibWVzc2FnZSB3YXJuaW5nXCI+e21lc3NhZ2V9PC9wPlxuICApXG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLnByb3BzLmZvdW5kSXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRNZXNzYWdlKHRoaXMucHJvcHMubm9NYXRjaGVzTGFiZWwpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5mb3VuZEl0ZW1zLmxlbmd0aCA+IDEwMCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0TWVzc2FnZSh0aGlzLnByb3BzLnRvb011Y2hNYXRjaGVzTGFiZWwpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmdldEZvdW5kSXRlbXMoKTtcbiAgfVxufVxuXG5Qb3BvdmVyU2VhcmNoQ29udGVudC5wcm9wVHlwZXMgPSB7XG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgaXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgZm91bmRJdGVtczogZm91bmRJdGVtc1NoYXBlLFxuICBub01hdGNoZXNMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgdG9vTXVjaE1hdGNoZXNMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cblBvcG92ZXJTZWFyY2hDb250ZW50LmRlZmF1bHRQcm9wcyA9IHtcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBpdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXG4gIGZvdW5kSXRlbXM6IFtdLFxuICBub01hdGNoZXNMYWJlbDogJ05vIG1hdGNoZXMnLFxuICB0b29NdWNoTWF0Y2hlc0xhYmVsOiAnVG9vIG11Y2ggbWF0Y2hlcyBmb3VuZCwgcmVmaW5lIHNlYXJjaC4nLFxufTtcbiJdfQ==