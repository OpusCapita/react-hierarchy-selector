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
              }
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
  foundItems: [],
  noMatchesLabel: 'No matches',
  tooMuchMatchesLabel: 'Too much matches found, refine search.'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvc2VhcmNoL3NlYXJjaC1jb250ZW50LmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUG9wb3ZlclNlYXJjaENvbnRlbnQiLCJnZXRGb3VuZEl0ZW1zIiwiZm91bmRJdGVtcyIsInByb3BzIiwiZWwiLCJtYWluRWxlbWVudCIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJrZXkiLCJuYW1lIiwiaXRlbXMiLCJvblNlbGVjdCIsImRhdGEiLCJnZXRNZXNzYWdlIiwibWVzc2FnZSIsInJlbmRlciIsImxlbmd0aCIsIm5vTWF0Y2hlc0xhYmVsIiwidG9vTXVjaE1hdGNoZXNMYWJlbCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLG9COzs7Ozs7Ozs7Ozs7Z0tBQ25CQyxhLEdBQWdCLFlBQU07QUFBQSxVQUNaQyxVQURZLEdBQ0csTUFBS0MsS0FEUixDQUNaRCxVQURZOzs7QUFHcEIsYUFDRTtBQUFBO0FBQUE7QUFDRSxxQkFBVSw4Q0FEWjtBQUVFLGVBQUssYUFBQ0UsRUFBRCxFQUFRO0FBQUUsa0JBQUtDLFdBQUwsR0FBbUJELEVBQW5CO0FBQXdCO0FBRnpDO0FBSUU7QUFBQTtBQUFBLFlBQUksV0FBVSxZQUFkO0FBQ0dFLGlCQUFPQyxJQUFQLENBQVlMLFVBQVosRUFBd0JNLEdBQXhCLENBQTRCO0FBQUEsbUJBQzNCO0FBQ0UsbUJBQUtOLFdBQVdPLEdBQVgsRUFBZ0JDLElBRHZCO0FBRUUseUJBQVdSLFdBQVdPLEdBQVgsRUFBZ0JDLElBRjdCO0FBR0Usb0JBQU1SLFdBQVdPLEdBQVgsRUFBZ0JFLEtBSHhCO0FBSUUsd0JBQVU7QUFBQSx1QkFBUSxNQUFLUixLQUFMLENBQVdTLFFBQVgsQ0FBb0JDLElBQXBCLENBQVI7QUFBQTtBQUpaLGNBRDJCO0FBQUEsV0FBNUI7QUFESDtBQUpGLE9BREY7QUFpQkQsSyxRQUVEQyxVLEdBQWE7QUFBQSxhQUNYO0FBQUE7QUFBQSxVQUFHLFdBQVUsaUJBQWI7QUFBZ0NDO0FBQWhDLE9BRFc7QUFBQSxLOzs7aUNBSWJDLE0scUJBQVM7QUFDUCxRQUFJLEtBQUtiLEtBQUwsQ0FBV0QsVUFBWCxDQUFzQmUsTUFBdEIsS0FBaUMsQ0FBckMsRUFBd0M7QUFDdEMsYUFBTyxLQUFLSCxVQUFMLENBQWdCLEtBQUtYLEtBQUwsQ0FBV2UsY0FBM0IsQ0FBUDtBQUNELEtBRkQsTUFFTyxJQUFJLEtBQUtmLEtBQUwsQ0FBV0QsVUFBWCxDQUFzQmUsTUFBdEIsR0FBK0IsR0FBbkMsRUFBd0M7QUFDN0MsYUFBTyxLQUFLSCxVQUFMLENBQWdCLEtBQUtYLEtBQUwsQ0FBV2dCLG1CQUEzQixDQUFQO0FBQ0Q7O0FBRUQsV0FBTyxLQUFLbEIsYUFBTCxFQUFQO0FBQ0QsRzs7O0VBbkMrQyxnQkFBTW1CLGE7O2tCQUFuQ3BCLG9COzs7QUE2Q3JCQSxxQkFBcUJxQixZQUFyQixHQUFvQztBQUNsQ1QsWUFBVSxvQkFBTSxDQUFFLENBRGdCO0FBRWxDVixjQUFZLEVBRnNCO0FBR2xDZ0Isa0JBQWdCLFlBSGtCO0FBSWxDQyx1QkFBcUI7QUFKYSxDQUFwQyIsImZpbGUiOiJzZWFyY2gtY29udGVudC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IFBvcG92ZXJGb3VuZEl0ZW1zIGZyb20gJy4vZm91bmQtaXRlbXMuY29tcG9uZW50JztcbmltcG9ydCB7IGZvdW5kSXRlbXNTaGFwZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wb3ZlclNlYXJjaENvbnRlbnQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgZ2V0Rm91bmRJdGVtcyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGZvdW5kSXRlbXMgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItcG9wb3Zlci1zZWFyY2gtY29udGVudFwiXG4gICAgICAgIHJlZj17KGVsKSA9PiB7IHRoaXMubWFpbkVsZW1lbnQgPSBlbDsgfX1cbiAgICAgID5cbiAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXBcIj5cbiAgICAgICAgICB7T2JqZWN0LmtleXMoZm91bmRJdGVtcykubWFwKGtleSA9PiAoXG4gICAgICAgICAgICA8UG9wb3ZlckZvdW5kSXRlbXNcbiAgICAgICAgICAgICAga2V5PXtmb3VuZEl0ZW1zW2tleV0ubmFtZX1cbiAgICAgICAgICAgICAgZ3JvdXBOYW1lPXtmb3VuZEl0ZW1zW2tleV0ubmFtZX1cbiAgICAgICAgICAgICAgZGF0YT17Zm91bmRJdGVtc1trZXldLml0ZW1zfVxuICAgICAgICAgICAgICBvblNlbGVjdD17ZGF0YSA9PiB0aGlzLnByb3BzLm9uU2VsZWN0KGRhdGEpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBnZXRNZXNzYWdlID0gbWVzc2FnZSA9PiAoXG4gICAgPHAgY2xhc3NOYW1lPVwibWVzc2FnZSB3YXJuaW5nXCI+e21lc3NhZ2V9PC9wPlxuICApXG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLnByb3BzLmZvdW5kSXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRNZXNzYWdlKHRoaXMucHJvcHMubm9NYXRjaGVzTGFiZWwpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5mb3VuZEl0ZW1zLmxlbmd0aCA+IDEwMCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0TWVzc2FnZSh0aGlzLnByb3BzLnRvb011Y2hNYXRjaGVzTGFiZWwpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmdldEZvdW5kSXRlbXMoKTtcbiAgfVxufVxuXG5Qb3BvdmVyU2VhcmNoQ29udGVudC5wcm9wVHlwZXMgPSB7XG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgZm91bmRJdGVtczogZm91bmRJdGVtc1NoYXBlLFxuICBub01hdGNoZXNMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgdG9vTXVjaE1hdGNoZXNMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cblBvcG92ZXJTZWFyY2hDb250ZW50LmRlZmF1bHRQcm9wcyA9IHtcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBmb3VuZEl0ZW1zOiBbXSxcbiAgbm9NYXRjaGVzTGFiZWw6ICdObyBtYXRjaGVzJyxcbiAgdG9vTXVjaE1hdGNoZXNMYWJlbDogJ1RvbyBtdWNoIG1hdGNoZXMgZm91bmQsIHJlZmluZSBzZWFyY2guJyxcbn07XG4iXX0=