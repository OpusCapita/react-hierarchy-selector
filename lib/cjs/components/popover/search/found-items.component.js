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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvc2VhcmNoL2ZvdW5kLWl0ZW1zLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUG9wb3ZlckZvdW5kSXRlbXMiLCJwcm9wcyIsIm9uR3JvdXBDbGlja0hhbmxkZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJ0b2dnbGVDb2xsYXBzZSIsIm9uQ2xpY2tIYW5sZGVyIiwia2V5Iiwic2VsZWN0SXRlbSIsIm9uRW50ZXJQcmVzc2VkIiwia2V5Q29kZSIsImdldEl0ZW1zIiwiZGF0YSIsIml0ZW1SZW5kZXJlciIsImluZGV4IiwiaXRlbSIsIm5hbWUiLCJsZW5ndGgiLCJnZXRJY29uIiwic3RhdGUiLCJjb2xsYXBzZWQiLCJvblNlbGVjdCIsInNldFN0YXRlIiwicmVuZGVyIiwiZ3JvdXBOYW1lIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFLQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7OytlQVpBO0FBQ0E7QUFDQTtBQUNBOztJQVdxQkEsaUI7OztBQUNuQiw2QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQSxVQU9uQkMsbUJBUG1CLEdBT0csVUFBQ0MsQ0FBRCxFQUFPO0FBQzNCQSxRQUFFQyxjQUFGO0FBQ0EsWUFBS0MsY0FBTDtBQUNELEtBVmtCOztBQUFBLFVBWW5CQyxjQVptQixHQVlGLFVBQUNILENBQUQsRUFBSUksR0FBSixFQUFZO0FBQzNCSixRQUFFQyxjQUFGO0FBQ0EsWUFBS0ksVUFBTCxDQUFnQkQsR0FBaEI7QUFDRCxLQWZrQjs7QUFBQSxVQWlCbkJFLGNBakJtQixHQWlCRixVQUFDTixDQUFELEVBQUlJLEdBQUosRUFBWTtBQUMzQixVQUFJSixFQUFFTyxPQUFGLEtBQWMsRUFBbEIsRUFBc0I7QUFDcEJQLFVBQUVDLGNBQUY7QUFDQSxjQUFLSSxVQUFMLENBQWdCRCxHQUFoQjtBQUNEO0FBQ0YsS0F0QmtCOztBQUFBLFVBd0JuQkksUUF4Qm1CLEdBd0JSLFlBQU07QUFBQSxVQUNQQyxJQURPLEdBQ0UsTUFBS1gsS0FEUCxDQUNQVyxJQURPOzs7QUFHZixVQUFNQyxlQUFlLFNBQWZBLFlBQWUsQ0FBQ0MsS0FBRCxFQUFRUCxHQUFSLEVBQWdCO0FBQ25DLFlBQU1RLE9BQU9ILEtBQUtFLEtBQUwsQ0FBYjtBQUNBLGVBQ0U7QUFBQTtBQUFBO0FBQ0UsNkZBREY7QUFFRSxpQkFBS1AsR0FGUDtBQUdFLHNCQUFTLEdBSFg7QUFJRSx1QkFBVztBQUFBLHFCQUFLLE1BQUtFLGNBQUwsQ0FBb0JOLENBQXBCLEVBQXVCVyxLQUF2QixDQUFMO0FBQUEsYUFKYjtBQUtFLHFCQUFTO0FBQUEscUJBQUssTUFBS1IsY0FBTCxDQUFvQkgsQ0FBcEIsRUFBdUJXLEtBQXZCLENBQUw7QUFBQTtBQUxYO0FBT0dDLGVBQUtDO0FBUFIsU0FERjtBQVdELE9BYkQ7O0FBZUEsYUFDRTtBQUNFLHNCQUFjSCxZQURoQjtBQUVFLGdCQUFRRCxLQUFLSyxNQUZmO0FBR0UsY0FBSyxTQUhQO0FBSUU7QUFKRixRQURGO0FBUUQsS0FsRGtCOztBQUFBLFVBb0RuQkMsT0FwRG1CLEdBb0RUO0FBQUEsYUFBTyxNQUFLQyxLQUFMLENBQVdDLFNBQVgsR0FBdUIseURBQXZCLEdBQTBDLHdEQUFqRDtBQUFBLEtBcERTOztBQUFBLFVBc0RuQlosVUF0RG1CLEdBc0ROLFVBQUNELEdBQUQsRUFBUztBQUNwQixZQUFLTixLQUFMLENBQVdvQixRQUFYLENBQW9CLE1BQUtwQixLQUFMLENBQVdXLElBQVgsQ0FBZ0JMLEdBQWhCLENBQXBCO0FBQ0QsS0F4RGtCOztBQUFBLFVBMERuQkYsY0ExRG1CLEdBMERGLFlBQU07QUFDckIsWUFBS2lCLFFBQUwsQ0FBYztBQUNaRixtQkFBVyxDQUFDLE1BQUtELEtBQUwsQ0FBV0M7QUFEWCxPQUFkO0FBR0QsS0E5RGtCOztBQUVqQixVQUFLRCxLQUFMLEdBQWE7QUFDWEMsaUJBQVc7QUFEQSxLQUFiO0FBRmlCO0FBS2xCOzs4QkEyRERHLE0scUJBQVM7QUFDUCxXQUNFO0FBQUE7QUFBQSxRQUFJLFdBQVUsa0NBQWQsRUFBaUQsU0FBUyxLQUFLckIsbUJBQS9EO0FBQ0csV0FBS2dCLE9BQUwsRUFESDtBQUVFO0FBQUE7QUFBQTtBQUFPLGFBQUtqQixLQUFMLENBQVd1QjtBQUFsQixPQUZGO0FBR0csT0FBQyxLQUFLTCxLQUFMLENBQVdDLFNBQVosSUFBeUIsS0FBS25CLEtBQUwsQ0FBV1csSUFBWCxDQUFnQkssTUFBaEIsR0FBeUIsQ0FBbEQsR0FBc0QsS0FBS04sUUFBTCxFQUF0RCxHQUF3RTtBQUgzRSxLQURGO0FBT0QsRzs7O0VBekU0QyxnQkFBTWMsYTs7a0JBQWhDekIsaUI7OztBQWtGckJBLGtCQUFrQjBCLFlBQWxCLEdBQWlDO0FBQy9CTCxZQUFVLG9CQUFNLENBQUUsQ0FEYTtBQUUvQlQsUUFBTTtBQUZ5QixDQUFqQyIsImZpbGUiOiJmb3VuZC1pdGVtcy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLW5vbmludGVyYWN0aXZlLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1ub25pbnRlcmFjdGl2ZS10YWJpbmRleCAqL1xuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvY2xpY2stZXZlbnRzLWhhdmUta2V5LWV2ZW50cyAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdExpc3QgZnJvbSAncmVhY3QtbGlzdCc7XG5pbXBvcnQgRmFDYXJldFJpZ2h0IGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9jYXJldC1yaWdodCc7XG5pbXBvcnQgRmFDYXJldERvd24gZnJvbSAncmVhY3QtaWNvbnMvbGliL2ZhL2NhcmV0LWRvd24nO1xuXG5pbXBvcnQgeyBoaWVyYXJjaHlJdGVtTGlzdFNoYXBlIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMnO1xuaW1wb3J0IHsgQ0xBU1NfTkFNRV9TRUFSQ0hfRk9DVVNBQkxFIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wb3ZlckZvdW5kSXRlbXMgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIG9uR3JvdXBDbGlja0hhbmxkZXIgPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnRvZ2dsZUNvbGxhcHNlKCk7XG4gIH1cblxuICBvbkNsaWNrSGFubGRlciA9IChlLCBrZXkpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zZWxlY3RJdGVtKGtleSk7XG4gIH1cblxuICBvbkVudGVyUHJlc3NlZCA9IChlLCBrZXkpID0+IHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5zZWxlY3RJdGVtKGtleSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0SXRlbXMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgaXRlbVJlbmRlcmVyID0gKGluZGV4LCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBkYXRhW2luZGV4XTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2BsaXN0LWdyb3VwLWl0ZW0gZm91bmQtaXRlbSAke0NMQVNTX05BTUVfU0VBUkNIX0ZPQ1VTQUJMRX1gfVxuICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgIHRhYkluZGV4PVwiMFwiXG4gICAgICAgICAgb25LZXlEb3duPXtlID0+IHRoaXMub25FbnRlclByZXNzZWQoZSwgaW5kZXgpfVxuICAgICAgICAgIG9uQ2xpY2s9e2UgPT4gdGhpcy5vbkNsaWNrSGFubGRlcihlLCBpbmRleCl9XG4gICAgICAgID5cbiAgICAgICAgICB7aXRlbS5uYW1lfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8UmVhY3RMaXN0XG4gICAgICAgIGl0ZW1SZW5kZXJlcj17aXRlbVJlbmRlcmVyfVxuICAgICAgICBsZW5ndGg9e2RhdGEubGVuZ3RofVxuICAgICAgICB0eXBlPVwidW5pZm9ybVwiXG4gICAgICAgIHVzZVN0YXRpY1NpemVcbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIGdldEljb24gPSAoKSA9PiAodGhpcy5zdGF0ZS5jb2xsYXBzZWQgPyA8RmFDYXJldFJpZ2h0IC8+IDogPEZhQ2FyZXREb3duIC8+KTtcblxuICBzZWxlY3RJdGVtID0gKGtleSkgPT4ge1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QodGhpcy5wcm9wcy5kYXRhW2tleV0pO1xuICB9XG5cbiAgdG9nZ2xlQ29sbGFwc2UgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjb2xsYXBzZWQ6ICF0aGlzLnN0YXRlLmNvbGxhcHNlZCxcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbSBmb3VuZC1ncm91cC1pdGVtXCIgb25DbGljaz17dGhpcy5vbkdyb3VwQ2xpY2tIYW5sZGVyfT5cbiAgICAgICAge3RoaXMuZ2V0SWNvbigpfVxuICAgICAgICA8c3Bhbj57dGhpcy5wcm9wcy5ncm91cE5hbWV9PC9zcGFuPlxuICAgICAgICB7IXRoaXMuc3RhdGUuY29sbGFwc2VkICYmIHRoaXMucHJvcHMuZGF0YS5sZW5ndGggPiAwID8gdGhpcy5nZXRJdGVtcygpIDogbnVsbH1cbiAgICAgIDwvbGk+XG4gICAgKTtcbiAgfVxufVxuXG5Qb3BvdmVyRm91bmRJdGVtcy5wcm9wVHlwZXMgPSB7XG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgZ3JvdXBOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGRhdGE6IGhpZXJhcmNoeUl0ZW1MaXN0U2hhcGUsXG59O1xuXG5Qb3BvdmVyRm91bmRJdGVtcy5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgZGF0YTogW10sXG59O1xuIl19