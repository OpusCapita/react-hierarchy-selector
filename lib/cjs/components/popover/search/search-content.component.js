"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _foundItems = _interopRequireDefault(require("./found-items.component"));

var _types = require("../../../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PopoverSearchContent =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(PopoverSearchContent, _React$PureComponent);

  function PopoverSearchContent() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "getFoundItems", function () {
      var foundItems = _this.props.foundItems;
      return _react["default"].createElement("div", {
        className: "oc-hierarchy-selector-popover-search-content",
        ref: function ref(el) {
          _this.mainElement = el;
        }
      }, _react["default"].createElement("ul", {
        className: "list-group"
      }, Object.keys(foundItems).map(function (key) {
        return _react["default"].createElement(_foundItems["default"], {
          key: foundItems[key].name,
          groupName: foundItems[key].name,
          data: foundItems[key].items,
          onSelect: _this.props.onSelect,
          itemRenderFunction: _this.props.itemRenderFunction
        });
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "getMessage", function (message) {
      return _react["default"].createElement("p", {
        className: "message warning"
      }, message);
    });

    return _this;
  }

  var _proto = PopoverSearchContent.prototype;

  _proto.render = function render() {
    if (this.props.foundItems.length === 0) {
      return this.getMessage(this.props.noMatchesLabel);
    } else if (this.props.foundItems.length > 100) {
      return this.getMessage(this.props.tooMuchMatchesLabel);
    }

    return this.getFoundItems();
  };

  return PopoverSearchContent;
}(_react["default"].PureComponent);

exports["default"] = PopoverSearchContent;
PopoverSearchContent.defaultProps = {
  onSelect: function onSelect() {},
  itemRenderFunction: null,
  foundItems: [],
  noMatchesLabel: 'No matches',
  tooMuchMatchesLabel: 'Too much matches found, refine search.'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvc2VhcmNoL3NlYXJjaC1jb250ZW50LmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUG9wb3ZlclNlYXJjaENvbnRlbnQiLCJmb3VuZEl0ZW1zIiwicHJvcHMiLCJlbCIsIm1haW5FbGVtZW50IiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsImtleSIsIm5hbWUiLCJpdGVtcyIsIm9uU2VsZWN0IiwiaXRlbVJlbmRlckZ1bmN0aW9uIiwibWVzc2FnZSIsInJlbmRlciIsImxlbmd0aCIsImdldE1lc3NhZ2UiLCJub01hdGNoZXNMYWJlbCIsInRvb011Y2hNYXRjaGVzTGFiZWwiLCJnZXRGb3VuZEl0ZW1zIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOztBQUVBOztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxvQjs7Ozs7Ozs7Ozs7Ozs7b0VBQ0gsWUFBTTtBQUFBLFVBQ1pDLFVBRFksR0FDRyxNQUFLQyxLQURSLENBQ1pELFVBRFk7QUFHcEIsYUFDRTtBQUNFLFFBQUEsU0FBUyxFQUFDLDhDQURaO0FBRUUsUUFBQSxHQUFHLEVBQUUsYUFBQ0UsRUFBRCxFQUFRO0FBQUUsZ0JBQUtDLFdBQUwsR0FBbUJELEVBQW5CO0FBQXdCO0FBRnpDLFNBSUU7QUFBSSxRQUFBLFNBQVMsRUFBQztBQUFkLFNBQ0dFLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZTCxVQUFaLEVBQXdCTSxHQUF4QixDQUE0QixVQUFBQyxHQUFHO0FBQUEsZUFDOUIsZ0NBQUMsc0JBQUQ7QUFDRSxVQUFBLEdBQUcsRUFBRVAsVUFBVSxDQUFDTyxHQUFELENBQVYsQ0FBZ0JDLElBRHZCO0FBRUUsVUFBQSxTQUFTLEVBQUVSLFVBQVUsQ0FBQ08sR0FBRCxDQUFWLENBQWdCQyxJQUY3QjtBQUdFLFVBQUEsSUFBSSxFQUFFUixVQUFVLENBQUNPLEdBQUQsQ0FBVixDQUFnQkUsS0FIeEI7QUFJRSxVQUFBLFFBQVEsRUFBRSxNQUFLUixLQUFMLENBQVdTLFFBSnZCO0FBS0UsVUFBQSxrQkFBa0IsRUFBRSxNQUFLVCxLQUFMLENBQVdVO0FBTGpDLFVBRDhCO0FBQUEsT0FBL0IsQ0FESCxDQUpGLENBREY7QUFrQkQsSzs7aUVBRVksVUFBQUMsT0FBTztBQUFBLGFBQ2xCO0FBQUcsUUFBQSxTQUFTLEVBQUM7QUFBYixTQUFnQ0EsT0FBaEMsQ0FEa0I7QUFBQSxLOzs7Ozs7O1NBSXBCQyxNLEdBQUEsa0JBQVM7QUFDUCxRQUFJLEtBQUtaLEtBQUwsQ0FBV0QsVUFBWCxDQUFzQmMsTUFBdEIsS0FBaUMsQ0FBckMsRUFBd0M7QUFDdEMsYUFBTyxLQUFLQyxVQUFMLENBQWdCLEtBQUtkLEtBQUwsQ0FBV2UsY0FBM0IsQ0FBUDtBQUNELEtBRkQsTUFFTyxJQUFJLEtBQUtmLEtBQUwsQ0FBV0QsVUFBWCxDQUFzQmMsTUFBdEIsR0FBK0IsR0FBbkMsRUFBd0M7QUFDN0MsYUFBTyxLQUFLQyxVQUFMLENBQWdCLEtBQUtkLEtBQUwsQ0FBV2dCLG1CQUEzQixDQUFQO0FBQ0Q7O0FBRUQsV0FBTyxLQUFLQyxhQUFMLEVBQVA7QUFDRCxHOzs7RUFwQytDQyxrQkFBTUMsYTs7O0FBK0N4RHJCLG9CQUFvQixDQUFDc0IsWUFBckIsR0FBb0M7QUFDbENYLEVBQUFBLFFBQVEsRUFBRSxvQkFBTSxDQUFFLENBRGdCO0FBRWxDQyxFQUFBQSxrQkFBa0IsRUFBRSxJQUZjO0FBR2xDWCxFQUFBQSxVQUFVLEVBQUUsRUFIc0I7QUFJbENnQixFQUFBQSxjQUFjLEVBQUUsWUFKa0I7QUFLbENDLEVBQUFBLG1CQUFtQixFQUFFO0FBTGEsQ0FBcEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IFBvcG92ZXJGb3VuZEl0ZW1zIGZyb20gJy4vZm91bmQtaXRlbXMuY29tcG9uZW50JztcbmltcG9ydCB7IGZvdW5kSXRlbXNTaGFwZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wb3ZlclNlYXJjaENvbnRlbnQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgZ2V0Rm91bmRJdGVtcyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGZvdW5kSXRlbXMgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItcG9wb3Zlci1zZWFyY2gtY29udGVudFwiXG4gICAgICAgIHJlZj17KGVsKSA9PiB7IHRoaXMubWFpbkVsZW1lbnQgPSBlbDsgfX1cbiAgICAgID5cbiAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXBcIj5cbiAgICAgICAgICB7T2JqZWN0LmtleXMoZm91bmRJdGVtcykubWFwKGtleSA9PiAoXG4gICAgICAgICAgICA8UG9wb3ZlckZvdW5kSXRlbXNcbiAgICAgICAgICAgICAga2V5PXtmb3VuZEl0ZW1zW2tleV0ubmFtZX1cbiAgICAgICAgICAgICAgZ3JvdXBOYW1lPXtmb3VuZEl0ZW1zW2tleV0ubmFtZX1cbiAgICAgICAgICAgICAgZGF0YT17Zm91bmRJdGVtc1trZXldLml0ZW1zfVxuICAgICAgICAgICAgICBvblNlbGVjdD17dGhpcy5wcm9wcy5vblNlbGVjdH1cbiAgICAgICAgICAgICAgaXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLml0ZW1SZW5kZXJGdW5jdGlvbn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgZ2V0TWVzc2FnZSA9IG1lc3NhZ2UgPT4gKFxuICAgIDxwIGNsYXNzTmFtZT1cIm1lc3NhZ2Ugd2FybmluZ1wiPnttZXNzYWdlfTwvcD5cbiAgKVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5mb3VuZEl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0TWVzc2FnZSh0aGlzLnByb3BzLm5vTWF0Y2hlc0xhYmVsKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuZm91bmRJdGVtcy5sZW5ndGggPiAxMDApIHtcbiAgICAgIHJldHVybiB0aGlzLmdldE1lc3NhZ2UodGhpcy5wcm9wcy50b29NdWNoTWF0Y2hlc0xhYmVsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5nZXRGb3VuZEl0ZW1zKCk7XG4gIH1cbn1cblxuUG9wb3ZlclNlYXJjaENvbnRlbnQucHJvcFR5cGVzID0ge1xuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gIGZvdW5kSXRlbXM6IGZvdW5kSXRlbXNTaGFwZSxcbiAgbm9NYXRjaGVzTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHRvb011Y2hNYXRjaGVzTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG5Qb3BvdmVyU2VhcmNoQ29udGVudC5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgaXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxuICBmb3VuZEl0ZW1zOiBbXSxcbiAgbm9NYXRjaGVzTGFiZWw6ICdObyBtYXRjaGVzJyxcbiAgdG9vTXVjaE1hdGNoZXNMYWJlbDogJ1RvbyBtdWNoIG1hdGNoZXMgZm91bmQsIHJlZmluZSBzZWFyY2guJyxcbn07XG4iXX0=