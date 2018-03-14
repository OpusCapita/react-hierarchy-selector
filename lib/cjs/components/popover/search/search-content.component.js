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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvc2VhcmNoL3NlYXJjaC1jb250ZW50LmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUG9wb3ZlclNlYXJjaENvbnRlbnQiLCJnZXRGb3VuZEl0ZW1zIiwiZm91bmRJdGVtcyIsInByb3BzIiwiZWwiLCJtYWluRWxlbWVudCIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJrZXkiLCJuYW1lIiwiaXRlbXMiLCJvblNlbGVjdCIsImRhdGEiLCJnZXRNZXNzYWdlIiwibWVzc2FnZSIsInJlbmRlciIsImxlbmd0aCIsIm5vTWF0Y2hlc0xhYmVsIiwidG9vTXVjaE1hdGNoZXNMYWJlbCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLG9COzs7Ozs7Ozs7Ozs7Z0tBQ25CQyxhLEdBQWdCLFlBQU07QUFBQSxVQUNaQyxVQURZLEdBQ0csTUFBS0MsS0FEUixDQUNaRCxVQURZOzs7QUFHcEIsYUFDRTtBQUFBO0FBQUE7QUFDRSxxQkFBVSw4Q0FEWjtBQUVFLGVBQUssYUFBQ0UsRUFBRCxFQUFRO0FBQUUsa0JBQUtDLFdBQUwsR0FBbUJELEVBQW5CO0FBQXdCO0FBRnpDO0FBSUU7QUFBQTtBQUFBLFlBQUksV0FBVSxZQUFkO0FBQ0dFLGlCQUFPQyxJQUFQLENBQVlMLFVBQVosRUFBd0JNLEdBQXhCLENBQTRCO0FBQUEsbUJBQzNCO0FBQ0UsbUJBQUtOLFdBQVdPLEdBQVgsRUFBZ0JDLElBRHZCO0FBRUUseUJBQVdSLFdBQVdPLEdBQVgsRUFBZ0JDLElBRjdCO0FBR0Usb0JBQU1SLFdBQVdPLEdBQVgsRUFBZ0JFLEtBSHhCO0FBSUUsd0JBQVU7QUFBQSx1QkFBUSxNQUFLUixLQUFMLENBQVdTLFFBQVgsQ0FBb0JDLElBQXBCLENBQVI7QUFBQTtBQUpaLGNBRDJCO0FBQUEsV0FBNUI7QUFESDtBQUpGLE9BREY7QUFpQkQsSyxRQUVEQyxVLEdBQWE7QUFBQSxhQUNYO0FBQUE7QUFBQSxVQUFHLFdBQVUsaUJBQWI7QUFBZ0NDO0FBQWhDLE9BRFc7QUFBQSxLOzs7aUNBSWJDLE0scUJBQVM7QUFDUCxRQUFJLEtBQUtiLEtBQUwsQ0FBV0QsVUFBWCxDQUFzQmUsTUFBdEIsS0FBaUMsQ0FBckMsRUFBd0M7QUFDdEMsYUFBTyxLQUFLSCxVQUFMLENBQWdCLEtBQUtYLEtBQUwsQ0FBV2UsY0FBM0IsQ0FBUDtBQUNELEtBRkQsTUFFTyxJQUFJLEtBQUtmLEtBQUwsQ0FBV0QsVUFBWCxDQUFzQmUsTUFBdEIsR0FBK0IsR0FBbkMsRUFBd0M7QUFDN0MsYUFBTyxLQUFLSCxVQUFMLENBQWdCLEtBQUtYLEtBQUwsQ0FBV2dCLG1CQUEzQixDQUFQO0FBQ0Q7O0FBRUQsV0FBTyxLQUFLbEIsYUFBTCxFQUFQO0FBQ0QsRzs7O0VBbkMrQyxnQkFBTW1CLGE7O2tCQUFuQ3BCLG9COzs7QUE2Q3JCQSxxQkFBcUJxQixZQUFyQixHQUFvQztBQUNsQ1QsWUFBVSxvQkFBTSxDQUFFLENBRGdCO0FBRWxDVixjQUFZLEVBRnNCO0FBR2xDZ0Isa0JBQWdCLFlBSGtCO0FBSWxDQyx1QkFBcUI7QUFKYSxDQUFwQyIsImZpbGUiOiJzZWFyY2gtY29udGVudC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5cclxuaW1wb3J0IFBvcG92ZXJGb3VuZEl0ZW1zIGZyb20gJy4vZm91bmQtaXRlbXMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgZm91bmRJdGVtc1NoYXBlIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wb3ZlclNlYXJjaENvbnRlbnQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcclxuICBnZXRGb3VuZEl0ZW1zID0gKCkgPT4ge1xyXG4gICAgY29uc3QgeyBmb3VuZEl0ZW1zIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItcG9wb3Zlci1zZWFyY2gtY29udGVudFwiXHJcbiAgICAgICAgcmVmPXsoZWwpID0+IHsgdGhpcy5tYWluRWxlbWVudCA9IGVsOyB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXBcIj5cclxuICAgICAgICAgIHtPYmplY3Qua2V5cyhmb3VuZEl0ZW1zKS5tYXAoa2V5ID0+IChcclxuICAgICAgICAgICAgPFBvcG92ZXJGb3VuZEl0ZW1zXHJcbiAgICAgICAgICAgICAga2V5PXtmb3VuZEl0ZW1zW2tleV0ubmFtZX1cclxuICAgICAgICAgICAgICBncm91cE5hbWU9e2ZvdW5kSXRlbXNba2V5XS5uYW1lfVxyXG4gICAgICAgICAgICAgIGRhdGE9e2ZvdW5kSXRlbXNba2V5XS5pdGVtc31cclxuICAgICAgICAgICAgICBvblNlbGVjdD17ZGF0YSA9PiB0aGlzLnByb3BzLm9uU2VsZWN0KGRhdGEpfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKSl9XHJcbiAgICAgICAgPC91bD5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0TWVzc2FnZSA9IG1lc3NhZ2UgPT4gKFxyXG4gICAgPHAgY2xhc3NOYW1lPVwibWVzc2FnZSB3YXJuaW5nXCI+e21lc3NhZ2V9PC9wPlxyXG4gIClcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgaWYgKHRoaXMucHJvcHMuZm91bmRJdGVtcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0TWVzc2FnZSh0aGlzLnByb3BzLm5vTWF0Y2hlc0xhYmVsKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5mb3VuZEl0ZW1zLmxlbmd0aCA+IDEwMCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRNZXNzYWdlKHRoaXMucHJvcHMudG9vTXVjaE1hdGNoZXNMYWJlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZ2V0Rm91bmRJdGVtcygpO1xyXG4gIH1cclxufVxyXG5cclxuUG9wb3ZlclNlYXJjaENvbnRlbnQucHJvcFR5cGVzID0ge1xyXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcclxuICBmb3VuZEl0ZW1zOiBmb3VuZEl0ZW1zU2hhcGUsXHJcbiAgbm9NYXRjaGVzTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgdG9vTXVjaE1hdGNoZXNMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcblBvcG92ZXJTZWFyY2hDb250ZW50LmRlZmF1bHRQcm9wcyA9IHtcclxuICBvblNlbGVjdDogKCkgPT4ge30sXHJcbiAgZm91bmRJdGVtczogW10sXHJcbiAgbm9NYXRjaGVzTGFiZWw6ICdObyBtYXRjaGVzJyxcclxuICB0b29NdWNoTWF0Y2hlc0xhYmVsOiAnVG9vIG11Y2ggbWF0Y2hlcyBmb3VuZCwgcmVmaW5lIHNlYXJjaC4nLFxyXG59O1xyXG4iXX0=