'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _foundItems = require('./found-items.component');

var _foundItems2 = _interopRequireDefault(_foundItems);

var _types = require('../../../types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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


      return _react2.default.createElement(
        'div',
        {
          className: 'oc-hierarchy-selector-popover-search-content',
          ref: function ref(el) {
            _this.mainElement = el;
          }
        },
        _react2.default.createElement(
          'ul',
          { className: 'list-group' },
          Object.keys(foundItems).map(function (key) {
            return _react2.default.createElement(_foundItems2.default, {
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
      return _react2.default.createElement(
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
}(_react2.default.PureComponent);

exports.default = PopoverSearchContent;


PopoverSearchContent.defaultProps = {
  onSelect: function onSelect() {},
  itemRenderFunction: null,
  foundItems: [],
  noMatchesLabel: 'No matches',
  tooMuchMatchesLabel: 'Too much matches found, refine search.'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvc2VhcmNoL3NlYXJjaC1jb250ZW50LmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUG9wb3ZlclNlYXJjaENvbnRlbnQiLCJnZXRGb3VuZEl0ZW1zIiwiZm91bmRJdGVtcyIsInByb3BzIiwiZWwiLCJtYWluRWxlbWVudCIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJrZXkiLCJuYW1lIiwiaXRlbXMiLCJvblNlbGVjdCIsImRhdGEiLCJpdGVtUmVuZGVyRnVuY3Rpb24iLCJnZXRNZXNzYWdlIiwibWVzc2FnZSIsInJlbmRlciIsImxlbmd0aCIsIm5vTWF0Y2hlc0xhYmVsIiwidG9vTXVjaE1hdGNoZXNMYWJlbCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLG9COzs7Ozs7Ozs7Ozs7Z0tBQ25CQyxhLEdBQWdCLFlBQU07QUFBQSxVQUNaQyxVQURZLEdBQ0csTUFBS0MsS0FEUixDQUNaRCxVQURZOzs7QUFHcEIsYUFDRTtBQUFBO0FBQUE7QUFDRSxxQkFBVSw4Q0FEWjtBQUVFLGVBQUssYUFBQ0UsRUFBRCxFQUFRO0FBQUUsa0JBQUtDLFdBQUwsR0FBbUJELEVBQW5CO0FBQXdCO0FBRnpDO0FBSUU7QUFBQTtBQUFBLFlBQUksV0FBVSxZQUFkO0FBQ0dFLGlCQUFPQyxJQUFQLENBQVlMLFVBQVosRUFBd0JNLEdBQXhCLENBQTRCO0FBQUEsbUJBQzNCO0FBQ0UsbUJBQUtOLFdBQVdPLEdBQVgsRUFBZ0JDLElBRHZCO0FBRUUseUJBQVdSLFdBQVdPLEdBQVgsRUFBZ0JDLElBRjdCO0FBR0Usb0JBQU1SLFdBQVdPLEdBQVgsRUFBZ0JFLEtBSHhCO0FBSUUsd0JBQVU7QUFBQSx1QkFBUSxNQUFLUixLQUFMLENBQVdTLFFBQVgsQ0FBb0JDLElBQXBCLENBQVI7QUFBQSxlQUpaO0FBS0Usa0NBQW9CLE1BQUtWLEtBQUwsQ0FBV1c7QUFMakMsY0FEMkI7QUFBQSxXQUE1QjtBQURIO0FBSkYsT0FERjtBQWtCRCxLLFFBRURDLFUsR0FBYTtBQUFBLGFBQ1g7QUFBQTtBQUFBLFVBQUcsV0FBVSxpQkFBYjtBQUFnQ0M7QUFBaEMsT0FEVztBQUFBLEs7OztpQ0FJYkMsTSxxQkFBUztBQUNQLFFBQUksS0FBS2QsS0FBTCxDQUFXRCxVQUFYLENBQXNCZ0IsTUFBdEIsS0FBaUMsQ0FBckMsRUFBd0M7QUFDdEMsYUFBTyxLQUFLSCxVQUFMLENBQWdCLEtBQUtaLEtBQUwsQ0FBV2dCLGNBQTNCLENBQVA7QUFDRCxLQUZELE1BRU8sSUFBSSxLQUFLaEIsS0FBTCxDQUFXRCxVQUFYLENBQXNCZ0IsTUFBdEIsR0FBK0IsR0FBbkMsRUFBd0M7QUFDN0MsYUFBTyxLQUFLSCxVQUFMLENBQWdCLEtBQUtaLEtBQUwsQ0FBV2lCLG1CQUEzQixDQUFQO0FBQ0Q7O0FBRUQsV0FBTyxLQUFLbkIsYUFBTCxFQUFQO0FBQ0QsRzs7O0VBcEMrQyxnQkFBTW9CLGE7O2tCQUFuQ3JCLG9COzs7QUErQ3JCQSxxQkFBcUJzQixZQUFyQixHQUFvQztBQUNsQ1YsWUFBVSxvQkFBTSxDQUFFLENBRGdCO0FBRWxDRSxzQkFBb0IsSUFGYztBQUdsQ1osY0FBWSxFQUhzQjtBQUlsQ2lCLGtCQUFnQixZQUprQjtBQUtsQ0MsdUJBQXFCO0FBTGEsQ0FBcEMiLCJmaWxlIjoic2VhcmNoLWNvbnRlbnQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuXHJcbmltcG9ydCBQb3BvdmVyRm91bmRJdGVtcyBmcm9tICcuL2ZvdW5kLWl0ZW1zLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IGZvdW5kSXRlbXNTaGFwZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcG92ZXJTZWFyY2hDb250ZW50IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XHJcbiAgZ2V0Rm91bmRJdGVtcyA9ICgpID0+IHtcclxuICAgIGNvbnN0IHsgZm91bmRJdGVtcyB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXBvcG92ZXItc2VhcmNoLWNvbnRlbnRcIlxyXG4gICAgICAgIHJlZj17KGVsKSA9PiB7IHRoaXMubWFpbkVsZW1lbnQgPSBlbDsgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0LWdyb3VwXCI+XHJcbiAgICAgICAgICB7T2JqZWN0LmtleXMoZm91bmRJdGVtcykubWFwKGtleSA9PiAoXHJcbiAgICAgICAgICAgIDxQb3BvdmVyRm91bmRJdGVtc1xyXG4gICAgICAgICAgICAgIGtleT17Zm91bmRJdGVtc1trZXldLm5hbWV9XHJcbiAgICAgICAgICAgICAgZ3JvdXBOYW1lPXtmb3VuZEl0ZW1zW2tleV0ubmFtZX1cclxuICAgICAgICAgICAgICBkYXRhPXtmb3VuZEl0ZW1zW2tleV0uaXRlbXN9XHJcbiAgICAgICAgICAgICAgb25TZWxlY3Q9e2RhdGEgPT4gdGhpcy5wcm9wcy5vblNlbGVjdChkYXRhKX1cclxuICAgICAgICAgICAgICBpdGVtUmVuZGVyRnVuY3Rpb249e3RoaXMucHJvcHMuaXRlbVJlbmRlckZ1bmN0aW9ufVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKSl9XHJcbiAgICAgICAgPC91bD5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0TWVzc2FnZSA9IG1lc3NhZ2UgPT4gKFxyXG4gICAgPHAgY2xhc3NOYW1lPVwibWVzc2FnZSB3YXJuaW5nXCI+e21lc3NhZ2V9PC9wPlxyXG4gIClcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgaWYgKHRoaXMucHJvcHMuZm91bmRJdGVtcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0TWVzc2FnZSh0aGlzLnByb3BzLm5vTWF0Y2hlc0xhYmVsKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5mb3VuZEl0ZW1zLmxlbmd0aCA+IDEwMCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRNZXNzYWdlKHRoaXMucHJvcHMudG9vTXVjaE1hdGNoZXNMYWJlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZ2V0Rm91bmRJdGVtcygpO1xyXG4gIH1cclxufVxyXG5cclxuUG9wb3ZlclNlYXJjaENvbnRlbnQucHJvcFR5cGVzID0ge1xyXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcclxuICBpdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxyXG4gIGZvdW5kSXRlbXM6IGZvdW5kSXRlbXNTaGFwZSxcclxuICBub01hdGNoZXNMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcclxuICB0b29NdWNoTWF0Y2hlc0xhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5cclxuUG9wb3ZlclNlYXJjaENvbnRlbnQuZGVmYXVsdFByb3BzID0ge1xyXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcclxuICBpdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXHJcbiAgZm91bmRJdGVtczogW10sXHJcbiAgbm9NYXRjaGVzTGFiZWw6ICdObyBtYXRjaGVzJyxcclxuICB0b29NdWNoTWF0Y2hlc0xhYmVsOiAnVG9vIG11Y2ggbWF0Y2hlcyBmb3VuZCwgcmVmaW5lIHNlYXJjaC4nLFxyXG59O1xyXG4iXX0=