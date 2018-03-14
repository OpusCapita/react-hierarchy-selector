'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactList = require('react-list');

var _reactList2 = _interopRequireDefault(_reactList);

var _caretRight = require('react-icons/lib/fa/caret-right');

var _caretRight2 = _interopRequireDefault(_caretRight);

var _caretDown = require('react-icons/lib/fa/caret-down');

var _caretDown2 = _interopRequireDefault(_caretDown);

var _types = require('../../../types');

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/click-events-have-key-events */

var PopoverFoundItems = function (_React$PureComponent) {
  _inherits(PopoverFoundItems, _React$PureComponent);

  function PopoverFoundItems(props) {
    _classCallCheck(this, PopoverFoundItems);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.onGroupClickHanlder = function (e) {
      e.preventDefault();
      _this.toggleCollapse();
    };

    _this.onClickHanlder = function (e, key) {
      e.preventDefault();
      _this.selectItem(key);
    };

    _this.onEnterPressed = function (e, key) {
      if (e.keyCode === 13) {
        e.preventDefault();
        _this.selectItem(key);
      }
    };

    _this.getItems = function () {
      var data = _this.props.data;


      var itemRenderer = function itemRenderer(index, key) {
        var item = data[index];
        return _react2.default.createElement(
          'div',
          {
            className: 'list-group-item found-item ' + _constants.CLASS_NAME_SEARCH_FOCUSABLE,
            key: key,
            tabIndex: '0',
            onKeyDown: function onKeyDown(e) {
              return _this.onEnterPressed(e, index);
            },
            onClick: function onClick(e) {
              return _this.onClickHanlder(e, index);
            }
          },
          item.name
        );
      };

      return _react2.default.createElement(_reactList2.default, {
        itemRenderer: itemRenderer,
        length: data.length,
        type: 'uniform',
        useStaticSize: true
      });
    };

    _this.getIcon = function () {
      return _this.state.collapsed ? _react2.default.createElement(_caretRight2.default, null) : _react2.default.createElement(_caretDown2.default, null);
    };

    _this.selectItem = function (key) {
      _this.props.onSelect(_this.props.data[key]);
    };

    _this.toggleCollapse = function () {
      _this.setState({
        collapsed: !_this.state.collapsed
      });
    };

    _this.state = {
      collapsed: false
    };
    return _this;
  }

  PopoverFoundItems.prototype.render = function render() {
    return _react2.default.createElement(
      'li',
      { className: 'list-group-item found-group-item', onClick: this.onGroupClickHanlder },
      this.getIcon(),
      _react2.default.createElement(
        'span',
        null,
        this.props.groupName
      ),
      !this.state.collapsed && this.props.data.length > 0 ? this.getItems() : null
    );
  };

  return PopoverFoundItems;
}(_react2.default.PureComponent);

exports.default = PopoverFoundItems;


PopoverFoundItems.defaultProps = {
  onSelect: function onSelect() {},
  data: []
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvc2VhcmNoL2ZvdW5kLWl0ZW1zLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUG9wb3ZlckZvdW5kSXRlbXMiLCJwcm9wcyIsIm9uR3JvdXBDbGlja0hhbmxkZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJ0b2dnbGVDb2xsYXBzZSIsIm9uQ2xpY2tIYW5sZGVyIiwia2V5Iiwic2VsZWN0SXRlbSIsIm9uRW50ZXJQcmVzc2VkIiwia2V5Q29kZSIsImdldEl0ZW1zIiwiZGF0YSIsIml0ZW1SZW5kZXJlciIsImluZGV4IiwiaXRlbSIsIm5hbWUiLCJsZW5ndGgiLCJnZXRJY29uIiwic3RhdGUiLCJjb2xsYXBzZWQiLCJvblNlbGVjdCIsInNldFN0YXRlIiwicmVuZGVyIiwiZ3JvdXBOYW1lIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFLQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7OytlQVpBO0FBQ0E7QUFDQTtBQUNBOztJQVdxQkEsaUI7OztBQUNuQiw2QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQSxVQU9uQkMsbUJBUG1CLEdBT0csVUFBQ0MsQ0FBRCxFQUFPO0FBQzNCQSxRQUFFQyxjQUFGO0FBQ0EsWUFBS0MsY0FBTDtBQUNELEtBVmtCOztBQUFBLFVBWW5CQyxjQVptQixHQVlGLFVBQUNILENBQUQsRUFBSUksR0FBSixFQUFZO0FBQzNCSixRQUFFQyxjQUFGO0FBQ0EsWUFBS0ksVUFBTCxDQUFnQkQsR0FBaEI7QUFDRCxLQWZrQjs7QUFBQSxVQWlCbkJFLGNBakJtQixHQWlCRixVQUFDTixDQUFELEVBQUlJLEdBQUosRUFBWTtBQUMzQixVQUFJSixFQUFFTyxPQUFGLEtBQWMsRUFBbEIsRUFBc0I7QUFDcEJQLFVBQUVDLGNBQUY7QUFDQSxjQUFLSSxVQUFMLENBQWdCRCxHQUFoQjtBQUNEO0FBQ0YsS0F0QmtCOztBQUFBLFVBd0JuQkksUUF4Qm1CLEdBd0JSLFlBQU07QUFBQSxVQUNQQyxJQURPLEdBQ0UsTUFBS1gsS0FEUCxDQUNQVyxJQURPOzs7QUFHZixVQUFNQyxlQUFlLFNBQWZBLFlBQWUsQ0FBQ0MsS0FBRCxFQUFRUCxHQUFSLEVBQWdCO0FBQ25DLFlBQU1RLE9BQU9ILEtBQUtFLEtBQUwsQ0FBYjtBQUNBLGVBQ0U7QUFBQTtBQUFBO0FBQ0UsNkZBREY7QUFFRSxpQkFBS1AsR0FGUDtBQUdFLHNCQUFTLEdBSFg7QUFJRSx1QkFBVztBQUFBLHFCQUFLLE1BQUtFLGNBQUwsQ0FBb0JOLENBQXBCLEVBQXVCVyxLQUF2QixDQUFMO0FBQUEsYUFKYjtBQUtFLHFCQUFTO0FBQUEscUJBQUssTUFBS1IsY0FBTCxDQUFvQkgsQ0FBcEIsRUFBdUJXLEtBQXZCLENBQUw7QUFBQTtBQUxYO0FBT0dDLGVBQUtDO0FBUFIsU0FERjtBQVdELE9BYkQ7O0FBZUEsYUFDRTtBQUNFLHNCQUFjSCxZQURoQjtBQUVFLGdCQUFRRCxLQUFLSyxNQUZmO0FBR0UsY0FBSyxTQUhQO0FBSUU7QUFKRixRQURGO0FBUUQsS0FsRGtCOztBQUFBLFVBb0RuQkMsT0FwRG1CLEdBb0RUO0FBQUEsYUFBTyxNQUFLQyxLQUFMLENBQVdDLFNBQVgsR0FBdUIseURBQXZCLEdBQTBDLHdEQUFqRDtBQUFBLEtBcERTOztBQUFBLFVBc0RuQlosVUF0RG1CLEdBc0ROLFVBQUNELEdBQUQsRUFBUztBQUNwQixZQUFLTixLQUFMLENBQVdvQixRQUFYLENBQW9CLE1BQUtwQixLQUFMLENBQVdXLElBQVgsQ0FBZ0JMLEdBQWhCLENBQXBCO0FBQ0QsS0F4RGtCOztBQUFBLFVBMERuQkYsY0ExRG1CLEdBMERGLFlBQU07QUFDckIsWUFBS2lCLFFBQUwsQ0FBYztBQUNaRixtQkFBVyxDQUFDLE1BQUtELEtBQUwsQ0FBV0M7QUFEWCxPQUFkO0FBR0QsS0E5RGtCOztBQUVqQixVQUFLRCxLQUFMLEdBQWE7QUFDWEMsaUJBQVc7QUFEQSxLQUFiO0FBRmlCO0FBS2xCOzs4QkEyRERHLE0scUJBQVM7QUFDUCxXQUNFO0FBQUE7QUFBQSxRQUFJLFdBQVUsa0NBQWQsRUFBaUQsU0FBUyxLQUFLckIsbUJBQS9EO0FBQ0csV0FBS2dCLE9BQUwsRUFESDtBQUVFO0FBQUE7QUFBQTtBQUFPLGFBQUtqQixLQUFMLENBQVd1QjtBQUFsQixPQUZGO0FBR0csT0FBQyxLQUFLTCxLQUFMLENBQVdDLFNBQVosSUFBeUIsS0FBS25CLEtBQUwsQ0FBV1csSUFBWCxDQUFnQkssTUFBaEIsR0FBeUIsQ0FBbEQsR0FBc0QsS0FBS04sUUFBTCxFQUF0RCxHQUF3RTtBQUgzRSxLQURGO0FBT0QsRzs7O0VBekU0QyxnQkFBTWMsYTs7a0JBQWhDekIsaUI7OztBQWtGckJBLGtCQUFrQjBCLFlBQWxCLEdBQWlDO0FBQy9CTCxZQUFVLG9CQUFNLENBQUUsQ0FEYTtBQUUvQlQsUUFBTTtBQUZ5QixDQUFqQyIsImZpbGUiOiJmb3VuZC1pdGVtcy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tbm9uaW50ZXJhY3RpdmUtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tbm9uaW50ZXJhY3RpdmUtdGFiaW5kZXggKi9cclxuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvY2xpY2stZXZlbnRzLWhhdmUta2V5LWV2ZW50cyAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IFJlYWN0TGlzdCBmcm9tICdyZWFjdC1saXN0JztcclxuaW1wb3J0IEZhQ2FyZXRSaWdodCBmcm9tICdyZWFjdC1pY29ucy9saWIvZmEvY2FyZXQtcmlnaHQnO1xyXG5pbXBvcnQgRmFDYXJldERvd24gZnJvbSAncmVhY3QtaWNvbnMvbGliL2ZhL2NhcmV0LWRvd24nO1xyXG5cclxuaW1wb3J0IHsgaGllcmFyY2h5SXRlbUxpc3RTaGFwZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzJztcclxuaW1wb3J0IHsgQ0xBU1NfTkFNRV9TRUFSQ0hfRk9DVVNBQkxFIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcG92ZXJGb3VuZEl0ZW1zIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGNvbGxhcHNlZDogZmFsc2UsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgb25Hcm91cENsaWNrSGFubGRlciA9IChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0aGlzLnRvZ2dsZUNvbGxhcHNlKCk7XHJcbiAgfVxyXG5cclxuICBvbkNsaWNrSGFubGRlciA9IChlLCBrZXkpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMuc2VsZWN0SXRlbShrZXkpO1xyXG4gIH1cclxuXHJcbiAgb25FbnRlclByZXNzZWQgPSAoZSwga2V5KSA9PiB7XHJcbiAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHRoaXMuc2VsZWN0SXRlbShrZXkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SXRlbXMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB7IGRhdGEgfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgY29uc3QgaXRlbVJlbmRlcmVyID0gKGluZGV4LCBrZXkpID0+IHtcclxuICAgICAgY29uc3QgaXRlbSA9IGRhdGFbaW5kZXhdO1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNsYXNzTmFtZT17YGxpc3QtZ3JvdXAtaXRlbSBmb3VuZC1pdGVtICR7Q0xBU1NfTkFNRV9TRUFSQ0hfRk9DVVNBQkxFfWB9XHJcbiAgICAgICAgICBrZXk9e2tleX1cclxuICAgICAgICAgIHRhYkluZGV4PVwiMFwiXHJcbiAgICAgICAgICBvbktleURvd249e2UgPT4gdGhpcy5vbkVudGVyUHJlc3NlZChlLCBpbmRleCl9XHJcbiAgICAgICAgICBvbkNsaWNrPXtlID0+IHRoaXMub25DbGlja0hhbmxkZXIoZSwgaW5kZXgpfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHtpdGVtLm5hbWV9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxSZWFjdExpc3RcclxuICAgICAgICBpdGVtUmVuZGVyZXI9e2l0ZW1SZW5kZXJlcn1cclxuICAgICAgICBsZW5ndGg9e2RhdGEubGVuZ3RofVxyXG4gICAgICAgIHR5cGU9XCJ1bmlmb3JtXCJcclxuICAgICAgICB1c2VTdGF0aWNTaXplXHJcbiAgICAgIC8+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0SWNvbiA9ICgpID0+ICh0aGlzLnN0YXRlLmNvbGxhcHNlZCA/IDxGYUNhcmV0UmlnaHQgLz4gOiA8RmFDYXJldERvd24gLz4pO1xyXG5cclxuICBzZWxlY3RJdGVtID0gKGtleSkgPT4ge1xyXG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdCh0aGlzLnByb3BzLmRhdGFba2V5XSk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVDb2xsYXBzZSA9ICgpID0+IHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBjb2xsYXBzZWQ6ICF0aGlzLnN0YXRlLmNvbGxhcHNlZCxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbSBmb3VuZC1ncm91cC1pdGVtXCIgb25DbGljaz17dGhpcy5vbkdyb3VwQ2xpY2tIYW5sZGVyfT5cclxuICAgICAgICB7dGhpcy5nZXRJY29uKCl9XHJcbiAgICAgICAgPHNwYW4+e3RoaXMucHJvcHMuZ3JvdXBOYW1lfTwvc3Bhbj5cclxuICAgICAgICB7IXRoaXMuc3RhdGUuY29sbGFwc2VkICYmIHRoaXMucHJvcHMuZGF0YS5sZW5ndGggPiAwID8gdGhpcy5nZXRJdGVtcygpIDogbnVsbH1cclxuICAgICAgPC9saT5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5Qb3BvdmVyRm91bmRJdGVtcy5wcm9wVHlwZXMgPSB7XHJcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxyXG4gIGdyb3VwTmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gIGRhdGE6IGhpZXJhcmNoeUl0ZW1MaXN0U2hhcGUsXHJcbn07XHJcblxyXG5Qb3BvdmVyRm91bmRJdGVtcy5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxyXG4gIGRhdGE6IFtdLFxyXG59O1xyXG4iXX0=