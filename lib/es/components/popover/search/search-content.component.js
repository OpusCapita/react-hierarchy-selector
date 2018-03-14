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
              }
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
  foundItems: [],
  noMatchesLabel: 'No matches',
  tooMuchMatchesLabel: 'Too much matches found, refine search.'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvc2VhcmNoL3NlYXJjaC1jb250ZW50LmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJQb3BvdmVyRm91bmRJdGVtcyIsImZvdW5kSXRlbXNTaGFwZSIsIlBvcG92ZXJTZWFyY2hDb250ZW50IiwiZ2V0Rm91bmRJdGVtcyIsImZvdW5kSXRlbXMiLCJwcm9wcyIsImVsIiwibWFpbkVsZW1lbnQiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5IiwibmFtZSIsIml0ZW1zIiwib25TZWxlY3QiLCJkYXRhIiwiZ2V0TWVzc2FnZSIsIm1lc3NhZ2UiLCJyZW5kZXIiLCJsZW5ndGgiLCJub01hdGNoZXNMYWJlbCIsInRvb011Y2hNYXRjaGVzTGFiZWwiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0Qjs7QUFFQSxPQUFPQyxpQkFBUCxNQUE4Qix5QkFBOUI7QUFDQSxTQUFTQyxlQUFULFFBQWdDLGdCQUFoQzs7SUFFcUJDLG9COzs7Ozs7Ozs7Ozs7Z0tBQ25CQyxhLEdBQWdCLFlBQU07QUFBQSxVQUNaQyxVQURZLEdBQ0csTUFBS0MsS0FEUixDQUNaRCxVQURZOzs7QUFHcEIsYUFDRTtBQUFBO0FBQUE7QUFDRSxxQkFBVSw4Q0FEWjtBQUVFLGVBQUssYUFBQ0UsRUFBRCxFQUFRO0FBQUUsa0JBQUtDLFdBQUwsR0FBbUJELEVBQW5CO0FBQXdCO0FBRnpDO0FBSUU7QUFBQTtBQUFBLFlBQUksV0FBVSxZQUFkO0FBQ0dFLGlCQUFPQyxJQUFQLENBQVlMLFVBQVosRUFBd0JNLEdBQXhCLENBQTRCO0FBQUEsbUJBQzNCLG9CQUFDLGlCQUFEO0FBQ0UsbUJBQUtOLFdBQVdPLEdBQVgsRUFBZ0JDLElBRHZCO0FBRUUseUJBQVdSLFdBQVdPLEdBQVgsRUFBZ0JDLElBRjdCO0FBR0Usb0JBQU1SLFdBQVdPLEdBQVgsRUFBZ0JFLEtBSHhCO0FBSUUsd0JBQVU7QUFBQSx1QkFBUSxNQUFLUixLQUFMLENBQVdTLFFBQVgsQ0FBb0JDLElBQXBCLENBQVI7QUFBQTtBQUpaLGNBRDJCO0FBQUEsV0FBNUI7QUFESDtBQUpGLE9BREY7QUFpQkQsSyxRQUVEQyxVLEdBQWE7QUFBQSxhQUNYO0FBQUE7QUFBQSxVQUFHLFdBQVUsaUJBQWI7QUFBZ0NDO0FBQWhDLE9BRFc7QUFBQSxLOzs7aUNBSWJDLE0scUJBQVM7QUFDUCxRQUFJLEtBQUtiLEtBQUwsQ0FBV0QsVUFBWCxDQUFzQmUsTUFBdEIsS0FBaUMsQ0FBckMsRUFBd0M7QUFDdEMsYUFBTyxLQUFLSCxVQUFMLENBQWdCLEtBQUtYLEtBQUwsQ0FBV2UsY0FBM0IsQ0FBUDtBQUNELEtBRkQsTUFFTyxJQUFJLEtBQUtmLEtBQUwsQ0FBV0QsVUFBWCxDQUFzQmUsTUFBdEIsR0FBK0IsR0FBbkMsRUFBd0M7QUFDN0MsYUFBTyxLQUFLSCxVQUFMLENBQWdCLEtBQUtYLEtBQUwsQ0FBV2dCLG1CQUEzQixDQUFQO0FBQ0Q7O0FBRUQsV0FBTyxLQUFLbEIsYUFBTCxFQUFQO0FBQ0QsRzs7O0VBbkMrQ0wsTUFBTXdCLGE7O1NBQW5DcEIsb0I7OztBQTZDckJBLHFCQUFxQnFCLFlBQXJCLEdBQW9DO0FBQ2xDVCxZQUFVLG9CQUFNLENBQUUsQ0FEZ0I7QUFFbENWLGNBQVksRUFGc0I7QUFHbENnQixrQkFBZ0IsWUFIa0I7QUFJbENDLHVCQUFxQjtBQUphLENBQXBDIiwiZmlsZSI6InNlYXJjaC1jb250ZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcblxyXG5pbXBvcnQgUG9wb3ZlckZvdW5kSXRlbXMgZnJvbSAnLi9mb3VuZC1pdGVtcy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBmb3VuZEl0ZW1zU2hhcGUgfSBmcm9tICcuLi8uLi8uLi90eXBlcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3BvdmVyU2VhcmNoQ29udGVudCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gIGdldEZvdW5kSXRlbXMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB7IGZvdW5kSXRlbXMgfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1wb3BvdmVyLXNlYXJjaC1jb250ZW50XCJcclxuICAgICAgICByZWY9eyhlbCkgPT4geyB0aGlzLm1haW5FbGVtZW50ID0gZWw7IH19XHJcbiAgICAgID5cclxuICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdC1ncm91cFwiPlxyXG4gICAgICAgICAge09iamVjdC5rZXlzKGZvdW5kSXRlbXMpLm1hcChrZXkgPT4gKFxyXG4gICAgICAgICAgICA8UG9wb3ZlckZvdW5kSXRlbXNcclxuICAgICAgICAgICAgICBrZXk9e2ZvdW5kSXRlbXNba2V5XS5uYW1lfVxyXG4gICAgICAgICAgICAgIGdyb3VwTmFtZT17Zm91bmRJdGVtc1trZXldLm5hbWV9XHJcbiAgICAgICAgICAgICAgZGF0YT17Zm91bmRJdGVtc1trZXldLml0ZW1zfVxyXG4gICAgICAgICAgICAgIG9uU2VsZWN0PXtkYXRhID0+IHRoaXMucHJvcHMub25TZWxlY3QoZGF0YSl9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApKX1cclxuICAgICAgICA8L3VsPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXRNZXNzYWdlID0gbWVzc2FnZSA9PiAoXHJcbiAgICA8cCBjbGFzc05hbWU9XCJtZXNzYWdlIHdhcm5pbmdcIj57bWVzc2FnZX08L3A+XHJcbiAgKVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5mb3VuZEl0ZW1zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRNZXNzYWdlKHRoaXMucHJvcHMubm9NYXRjaGVzTGFiZWwpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLmZvdW5kSXRlbXMubGVuZ3RoID4gMTAwKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldE1lc3NhZ2UodGhpcy5wcm9wcy50b29NdWNoTWF0Y2hlc0xhYmVsKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5nZXRGb3VuZEl0ZW1zKCk7XHJcbiAgfVxyXG59XHJcblxyXG5Qb3BvdmVyU2VhcmNoQ29udGVudC5wcm9wVHlwZXMgPSB7XHJcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxyXG4gIGZvdW5kSXRlbXM6IGZvdW5kSXRlbXNTaGFwZSxcclxuICBub01hdGNoZXNMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcclxuICB0b29NdWNoTWF0Y2hlc0xhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5cclxuUG9wb3ZlclNlYXJjaENvbnRlbnQuZGVmYXVsdFByb3BzID0ge1xyXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcclxuICBmb3VuZEl0ZW1zOiBbXSxcclxuICBub01hdGNoZXNMYWJlbDogJ05vIG1hdGNoZXMnLFxyXG4gIHRvb011Y2hNYXRjaGVzTGFiZWw6ICdUb28gbXVjaCBtYXRjaGVzIGZvdW5kLCByZWZpbmUgc2VhcmNoLicsXHJcbn07XHJcbiJdfQ==