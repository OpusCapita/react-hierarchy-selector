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
              onSelect: _this.props.onSelect,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvc2VhcmNoL3NlYXJjaC1jb250ZW50LmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUG9wb3ZlclNlYXJjaENvbnRlbnQiLCJnZXRGb3VuZEl0ZW1zIiwiZm91bmRJdGVtcyIsInByb3BzIiwiZWwiLCJtYWluRWxlbWVudCIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJrZXkiLCJuYW1lIiwiaXRlbXMiLCJvblNlbGVjdCIsIml0ZW1SZW5kZXJGdW5jdGlvbiIsImdldE1lc3NhZ2UiLCJtZXNzYWdlIiwicmVuZGVyIiwibGVuZ3RoIiwibm9NYXRjaGVzTGFiZWwiLCJ0b29NdWNoTWF0Y2hlc0xhYmVsIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxvQjs7Ozs7Ozs7Ozs7O2dLQUNuQkMsYSxHQUFnQixZQUFNO0FBQUEsVUFDWkMsVUFEWSxHQUNHLE1BQUtDLEtBRFIsQ0FDWkQsVUFEWTs7O0FBR3BCLGFBQ0U7QUFBQTtBQUFBO0FBQ0UscUJBQVUsOENBRFo7QUFFRSxlQUFLLGFBQUNFLEVBQUQsRUFBUTtBQUFFLGtCQUFLQyxXQUFMLEdBQW1CRCxFQUFuQjtBQUF3QjtBQUZ6QztBQUlFO0FBQUE7QUFBQSxZQUFJLFdBQVUsWUFBZDtBQUNHRSxpQkFBT0MsSUFBUCxDQUFZTCxVQUFaLEVBQXdCTSxHQUF4QixDQUE0QjtBQUFBLG1CQUMzQiw4QkFBQyxvQkFBRDtBQUNFLG1CQUFLTixXQUFXTyxHQUFYLEVBQWdCQyxJQUR2QjtBQUVFLHlCQUFXUixXQUFXTyxHQUFYLEVBQWdCQyxJQUY3QjtBQUdFLG9CQUFNUixXQUFXTyxHQUFYLEVBQWdCRSxLQUh4QjtBQUlFLHdCQUFVLE1BQUtSLEtBQUwsQ0FBV1MsUUFKdkI7QUFLRSxrQ0FBb0IsTUFBS1QsS0FBTCxDQUFXVTtBQUxqQyxjQUQyQjtBQUFBLFdBQTVCO0FBREg7QUFKRixPQURGO0FBa0JELEssUUFFREMsVSxHQUFhO0FBQUEsYUFDWDtBQUFBO0FBQUEsVUFBRyxXQUFVLGlCQUFiO0FBQWdDQztBQUFoQyxPQURXO0FBQUEsSzs7O2lDQUliQyxNLHFCQUFTO0FBQ1AsUUFBSSxLQUFLYixLQUFMLENBQVdELFVBQVgsQ0FBc0JlLE1BQXRCLEtBQWlDLENBQXJDLEVBQXdDO0FBQ3RDLGFBQU8sS0FBS0gsVUFBTCxDQUFnQixLQUFLWCxLQUFMLENBQVdlLGNBQTNCLENBQVA7QUFDRCxLQUZELE1BRU8sSUFBSSxLQUFLZixLQUFMLENBQVdELFVBQVgsQ0FBc0JlLE1BQXRCLEdBQStCLEdBQW5DLEVBQXdDO0FBQzdDLGFBQU8sS0FBS0gsVUFBTCxDQUFnQixLQUFLWCxLQUFMLENBQVdnQixtQkFBM0IsQ0FBUDtBQUNEOztBQUVELFdBQU8sS0FBS2xCLGFBQUwsRUFBUDtBQUNELEc7OztFQXBDK0NtQixnQkFBTUMsYTs7a0JBQW5DckIsb0I7OztBQStDckJBLHFCQUFxQnNCLFlBQXJCLEdBQW9DO0FBQ2xDVixZQUFVLG9CQUFNLENBQUUsQ0FEZ0I7QUFFbENDLHNCQUFvQixJQUZjO0FBR2xDWCxjQUFZLEVBSHNCO0FBSWxDZ0Isa0JBQWdCLFlBSmtCO0FBS2xDQyx1QkFBcUI7QUFMYSxDQUFwQyIsImZpbGUiOiJzZWFyY2gtY29udGVudC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IFBvcG92ZXJGb3VuZEl0ZW1zIGZyb20gJy4vZm91bmQtaXRlbXMuY29tcG9uZW50JztcbmltcG9ydCB7IGZvdW5kSXRlbXNTaGFwZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wb3ZlclNlYXJjaENvbnRlbnQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgZ2V0Rm91bmRJdGVtcyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGZvdW5kSXRlbXMgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItcG9wb3Zlci1zZWFyY2gtY29udGVudFwiXG4gICAgICAgIHJlZj17KGVsKSA9PiB7IHRoaXMubWFpbkVsZW1lbnQgPSBlbDsgfX1cbiAgICAgID5cbiAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXBcIj5cbiAgICAgICAgICB7T2JqZWN0LmtleXMoZm91bmRJdGVtcykubWFwKGtleSA9PiAoXG4gICAgICAgICAgICA8UG9wb3ZlckZvdW5kSXRlbXNcbiAgICAgICAgICAgICAga2V5PXtmb3VuZEl0ZW1zW2tleV0ubmFtZX1cbiAgICAgICAgICAgICAgZ3JvdXBOYW1lPXtmb3VuZEl0ZW1zW2tleV0ubmFtZX1cbiAgICAgICAgICAgICAgZGF0YT17Zm91bmRJdGVtc1trZXldLml0ZW1zfVxuICAgICAgICAgICAgICBvblNlbGVjdD17dGhpcy5wcm9wcy5vblNlbGVjdH1cbiAgICAgICAgICAgICAgaXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLml0ZW1SZW5kZXJGdW5jdGlvbn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgZ2V0TWVzc2FnZSA9IG1lc3NhZ2UgPT4gKFxuICAgIDxwIGNsYXNzTmFtZT1cIm1lc3NhZ2Ugd2FybmluZ1wiPnttZXNzYWdlfTwvcD5cbiAgKVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5mb3VuZEl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0TWVzc2FnZSh0aGlzLnByb3BzLm5vTWF0Y2hlc0xhYmVsKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuZm91bmRJdGVtcy5sZW5ndGggPiAxMDApIHtcbiAgICAgIHJldHVybiB0aGlzLmdldE1lc3NhZ2UodGhpcy5wcm9wcy50b29NdWNoTWF0Y2hlc0xhYmVsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5nZXRGb3VuZEl0ZW1zKCk7XG4gIH1cbn1cblxuUG9wb3ZlclNlYXJjaENvbnRlbnQucHJvcFR5cGVzID0ge1xuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gIGZvdW5kSXRlbXM6IGZvdW5kSXRlbXNTaGFwZSxcbiAgbm9NYXRjaGVzTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHRvb011Y2hNYXRjaGVzTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG5Qb3BvdmVyU2VhcmNoQ29udGVudC5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgaXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxuICBmb3VuZEl0ZW1zOiBbXSxcbiAgbm9NYXRjaGVzTGFiZWw6ICdObyBtYXRjaGVzJyxcbiAgdG9vTXVjaE1hdGNoZXNMYWJlbDogJ1RvbyBtdWNoIG1hdGNoZXMgZm91bmQsIHJlZmluZSBzZWFyY2guJyxcbn07XG4iXX0=