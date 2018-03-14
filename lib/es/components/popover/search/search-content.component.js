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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvc2VhcmNoL3NlYXJjaC1jb250ZW50LmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJQb3BvdmVyRm91bmRJdGVtcyIsImZvdW5kSXRlbXNTaGFwZSIsIlBvcG92ZXJTZWFyY2hDb250ZW50IiwiZ2V0Rm91bmRJdGVtcyIsImZvdW5kSXRlbXMiLCJwcm9wcyIsImVsIiwibWFpbkVsZW1lbnQiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5IiwibmFtZSIsIml0ZW1zIiwib25TZWxlY3QiLCJkYXRhIiwiZ2V0TWVzc2FnZSIsIm1lc3NhZ2UiLCJyZW5kZXIiLCJsZW5ndGgiLCJub01hdGNoZXNMYWJlbCIsInRvb011Y2hNYXRjaGVzTGFiZWwiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0Qjs7QUFFQSxPQUFPQyxpQkFBUCxNQUE4Qix5QkFBOUI7QUFDQSxTQUFTQyxlQUFULFFBQWdDLGdCQUFoQzs7SUFFcUJDLG9COzs7Ozs7Ozs7Ozs7Z0tBQ25CQyxhLEdBQWdCLFlBQU07QUFBQSxVQUNaQyxVQURZLEdBQ0csTUFBS0MsS0FEUixDQUNaRCxVQURZOzs7QUFHcEIsYUFDRTtBQUFBO0FBQUE7QUFDRSxxQkFBVSw4Q0FEWjtBQUVFLGVBQUssYUFBQ0UsRUFBRCxFQUFRO0FBQUUsa0JBQUtDLFdBQUwsR0FBbUJELEVBQW5CO0FBQXdCO0FBRnpDO0FBSUU7QUFBQTtBQUFBLFlBQUksV0FBVSxZQUFkO0FBQ0dFLGlCQUFPQyxJQUFQLENBQVlMLFVBQVosRUFBd0JNLEdBQXhCLENBQTRCO0FBQUEsbUJBQzNCLG9CQUFDLGlCQUFEO0FBQ0UsbUJBQUtOLFdBQVdPLEdBQVgsRUFBZ0JDLElBRHZCO0FBRUUseUJBQVdSLFdBQVdPLEdBQVgsRUFBZ0JDLElBRjdCO0FBR0Usb0JBQU1SLFdBQVdPLEdBQVgsRUFBZ0JFLEtBSHhCO0FBSUUsd0JBQVU7QUFBQSx1QkFBUSxNQUFLUixLQUFMLENBQVdTLFFBQVgsQ0FBb0JDLElBQXBCLENBQVI7QUFBQTtBQUpaLGNBRDJCO0FBQUEsV0FBNUI7QUFESDtBQUpGLE9BREY7QUFpQkQsSyxRQUVEQyxVLEdBQWE7QUFBQSxhQUNYO0FBQUE7QUFBQSxVQUFHLFdBQVUsaUJBQWI7QUFBZ0NDO0FBQWhDLE9BRFc7QUFBQSxLOzs7aUNBSWJDLE0scUJBQVM7QUFDUCxRQUFJLEtBQUtiLEtBQUwsQ0FBV0QsVUFBWCxDQUFzQmUsTUFBdEIsS0FBaUMsQ0FBckMsRUFBd0M7QUFDdEMsYUFBTyxLQUFLSCxVQUFMLENBQWdCLEtBQUtYLEtBQUwsQ0FBV2UsY0FBM0IsQ0FBUDtBQUNELEtBRkQsTUFFTyxJQUFJLEtBQUtmLEtBQUwsQ0FBV0QsVUFBWCxDQUFzQmUsTUFBdEIsR0FBK0IsR0FBbkMsRUFBd0M7QUFDN0MsYUFBTyxLQUFLSCxVQUFMLENBQWdCLEtBQUtYLEtBQUwsQ0FBV2dCLG1CQUEzQixDQUFQO0FBQ0Q7O0FBRUQsV0FBTyxLQUFLbEIsYUFBTCxFQUFQO0FBQ0QsRzs7O0VBbkMrQ0wsTUFBTXdCLGE7O1NBQW5DcEIsb0I7OztBQTZDckJBLHFCQUFxQnFCLFlBQXJCLEdBQW9DO0FBQ2xDVCxZQUFVLG9CQUFNLENBQUUsQ0FEZ0I7QUFFbENWLGNBQVksRUFGc0I7QUFHbENnQixrQkFBZ0IsWUFIa0I7QUFJbENDLHVCQUFxQjtBQUphLENBQXBDIiwiZmlsZSI6InNlYXJjaC1jb250ZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgUG9wb3ZlckZvdW5kSXRlbXMgZnJvbSAnLi9mb3VuZC1pdGVtcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgZm91bmRJdGVtc1NoYXBlIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3BvdmVyU2VhcmNoQ29udGVudCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBnZXRGb3VuZEl0ZW1zID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZm91bmRJdGVtcyB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1wb3BvdmVyLXNlYXJjaC1jb250ZW50XCJcbiAgICAgICAgcmVmPXsoZWwpID0+IHsgdGhpcy5tYWluRWxlbWVudCA9IGVsOyB9fVxuICAgICAgPlxuICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdC1ncm91cFwiPlxuICAgICAgICAgIHtPYmplY3Qua2V5cyhmb3VuZEl0ZW1zKS5tYXAoa2V5ID0+IChcbiAgICAgICAgICAgIDxQb3BvdmVyRm91bmRJdGVtc1xuICAgICAgICAgICAgICBrZXk9e2ZvdW5kSXRlbXNba2V5XS5uYW1lfVxuICAgICAgICAgICAgICBncm91cE5hbWU9e2ZvdW5kSXRlbXNba2V5XS5uYW1lfVxuICAgICAgICAgICAgICBkYXRhPXtmb3VuZEl0ZW1zW2tleV0uaXRlbXN9XG4gICAgICAgICAgICAgIG9uU2VsZWN0PXtkYXRhID0+IHRoaXMucHJvcHMub25TZWxlY3QoZGF0YSl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGdldE1lc3NhZ2UgPSBtZXNzYWdlID0+IChcbiAgICA8cCBjbGFzc05hbWU9XCJtZXNzYWdlIHdhcm5pbmdcIj57bWVzc2FnZX08L3A+XG4gIClcblxuICByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuZm91bmRJdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmdldE1lc3NhZ2UodGhpcy5wcm9wcy5ub01hdGNoZXNMYWJlbCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLmZvdW5kSXRlbXMubGVuZ3RoID4gMTAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRNZXNzYWdlKHRoaXMucHJvcHMudG9vTXVjaE1hdGNoZXNMYWJlbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZ2V0Rm91bmRJdGVtcygpO1xuICB9XG59XG5cblBvcG92ZXJTZWFyY2hDb250ZW50LnByb3BUeXBlcyA9IHtcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBmb3VuZEl0ZW1zOiBmb3VuZEl0ZW1zU2hhcGUsXG4gIG5vTWF0Y2hlc0xhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICB0b29NdWNoTWF0Y2hlc0xhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuUG9wb3ZlclNlYXJjaENvbnRlbnQuZGVmYXVsdFByb3BzID0ge1xuICBvblNlbGVjdDogKCkgPT4ge30sXG4gIGZvdW5kSXRlbXM6IFtdLFxuICBub01hdGNoZXNMYWJlbDogJ05vIG1hdGNoZXMnLFxuICB0b29NdWNoTWF0Y2hlc0xhYmVsOiAnVG9vIG11Y2ggbWF0Y2hlcyBmb3VuZCwgcmVmaW5lIHNlYXJjaC4nLFxufTtcbiJdfQ==