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
          _this.props.itemRenderFunction ? _this.props.itemRenderFunction(item, _this.defaultItemRenderFunction) : _this.defaultItemRenderFunction(item)
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

    _this.defaultItemRenderFunction = function (item) {
      return _react2.default.createElement(
        'span',
        null,
        item.name
      );
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
  data: [],
  itemRenderFunction: null
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvc2VhcmNoL2ZvdW5kLWl0ZW1zLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUG9wb3ZlckZvdW5kSXRlbXMiLCJwcm9wcyIsIm9uR3JvdXBDbGlja0hhbmxkZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJ0b2dnbGVDb2xsYXBzZSIsIm9uQ2xpY2tIYW5sZGVyIiwia2V5Iiwic2VsZWN0SXRlbSIsIm9uRW50ZXJQcmVzc2VkIiwia2V5Q29kZSIsImdldEl0ZW1zIiwiZGF0YSIsIml0ZW1SZW5kZXJlciIsImluZGV4IiwiaXRlbSIsIkNMQVNTX05BTUVfU0VBUkNIX0ZPQ1VTQUJMRSIsIml0ZW1SZW5kZXJGdW5jdGlvbiIsImRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24iLCJsZW5ndGgiLCJnZXRJY29uIiwic3RhdGUiLCJjb2xsYXBzZWQiLCJuYW1lIiwib25TZWxlY3QiLCJzZXRTdGF0ZSIsInJlbmRlciIsImdyb3VwTmFtZSIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFLQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7OytlQVpBO0FBQ0E7QUFDQTtBQUNBOztJQVdxQkEsaUI7OztBQUNuQiw2QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQSxVQU9uQkMsbUJBUG1CLEdBT0csVUFBQ0MsQ0FBRCxFQUFPO0FBQzNCQSxRQUFFQyxjQUFGO0FBQ0EsWUFBS0MsY0FBTDtBQUNELEtBVmtCOztBQUFBLFVBWW5CQyxjQVptQixHQVlGLFVBQUNILENBQUQsRUFBSUksR0FBSixFQUFZO0FBQzNCSixRQUFFQyxjQUFGO0FBQ0EsWUFBS0ksVUFBTCxDQUFnQkQsR0FBaEI7QUFDRCxLQWZrQjs7QUFBQSxVQWlCbkJFLGNBakJtQixHQWlCRixVQUFDTixDQUFELEVBQUlJLEdBQUosRUFBWTtBQUMzQixVQUFJSixFQUFFTyxPQUFGLEtBQWMsRUFBbEIsRUFBc0I7QUFDcEJQLFVBQUVDLGNBQUY7QUFDQSxjQUFLSSxVQUFMLENBQWdCRCxHQUFoQjtBQUNEO0FBQ0YsS0F0QmtCOztBQUFBLFVBd0JuQkksUUF4Qm1CLEdBd0JSLFlBQU07QUFBQSxVQUNQQyxJQURPLEdBQ0UsTUFBS1gsS0FEUCxDQUNQVyxJQURPOzs7QUFHZixVQUFNQyxlQUFlLFNBQWZBLFlBQWUsQ0FBQ0MsS0FBRCxFQUFRUCxHQUFSLEVBQWdCO0FBQ25DLFlBQU1RLE9BQU9ILEtBQUtFLEtBQUwsQ0FBYjtBQUNBLGVBQ0U7QUFBQTtBQUFBO0FBQ0UsdURBQXlDRSxzQ0FEM0M7QUFFRSxpQkFBS1QsR0FGUDtBQUdFLHNCQUFTLEdBSFg7QUFJRSx1QkFBVztBQUFBLHFCQUFLLE1BQUtFLGNBQUwsQ0FBb0JOLENBQXBCLEVBQXVCVyxLQUF2QixDQUFMO0FBQUEsYUFKYjtBQUtFLHFCQUFTO0FBQUEscUJBQUssTUFBS1IsY0FBTCxDQUFvQkgsQ0FBcEIsRUFBdUJXLEtBQXZCLENBQUw7QUFBQTtBQUxYO0FBT0csZ0JBQUtiLEtBQUwsQ0FBV2dCLGtCQUFYLEdBQ0MsTUFBS2hCLEtBQUwsQ0FBV2dCLGtCQUFYLENBQThCRixJQUE5QixFQUFvQyxNQUFLRyx5QkFBekMsQ0FERCxHQUVDLE1BQUtBLHlCQUFMLENBQStCSCxJQUEvQjtBQVRKLFNBREY7QUFjRCxPQWhCRDs7QUFrQkEsYUFDRSw4QkFBQyxtQkFBRDtBQUNFLHNCQUFjRixZQURoQjtBQUVFLGdCQUFRRCxLQUFLTyxNQUZmO0FBR0UsY0FBSyxTQUhQO0FBSUU7QUFKRixRQURGO0FBUUQsS0FyRGtCOztBQUFBLFVBdURuQkMsT0F2RG1CLEdBdURUO0FBQUEsYUFBTyxNQUFLQyxLQUFMLENBQVdDLFNBQVgsR0FBdUIsOEJBQUMsb0JBQUQsT0FBdkIsR0FBMEMsOEJBQUMsbUJBQUQsT0FBakQ7QUFBQSxLQXZEUzs7QUFBQSxVQXlEbkJKLHlCQXpEbUIsR0F5RFM7QUFBQSxhQUFTO0FBQUE7QUFBQTtBQUFPSCxhQUFLUTtBQUFaLE9BQVQ7QUFBQSxLQXpEVDs7QUFBQSxVQTJEbkJmLFVBM0RtQixHQTJETixVQUFDRCxHQUFELEVBQVM7QUFDcEIsWUFBS04sS0FBTCxDQUFXdUIsUUFBWCxDQUFvQixNQUFLdkIsS0FBTCxDQUFXVyxJQUFYLENBQWdCTCxHQUFoQixDQUFwQjtBQUNELEtBN0RrQjs7QUFBQSxVQStEbkJGLGNBL0RtQixHQStERixZQUFNO0FBQ3JCLFlBQUtvQixRQUFMLENBQWM7QUFDWkgsbUJBQVcsQ0FBQyxNQUFLRCxLQUFMLENBQVdDO0FBRFgsT0FBZDtBQUdELEtBbkVrQjs7QUFFakIsVUFBS0QsS0FBTCxHQUFhO0FBQ1hDLGlCQUFXO0FBREEsS0FBYjtBQUZpQjtBQUtsQjs7OEJBZ0VESSxNLHFCQUFTO0FBQ1AsV0FDRTtBQUFBO0FBQUEsUUFBSSxXQUFVLGtDQUFkLEVBQWlELFNBQVMsS0FBS3hCLG1CQUEvRDtBQUNHLFdBQUtrQixPQUFMLEVBREg7QUFFRTtBQUFBO0FBQUE7QUFBTyxhQUFLbkIsS0FBTCxDQUFXMEI7QUFBbEIsT0FGRjtBQUdHLE9BQUMsS0FBS04sS0FBTCxDQUFXQyxTQUFaLElBQXlCLEtBQUtyQixLQUFMLENBQVdXLElBQVgsQ0FBZ0JPLE1BQWhCLEdBQXlCLENBQWxELEdBQXNELEtBQUtSLFFBQUwsRUFBdEQsR0FBd0U7QUFIM0UsS0FERjtBQU9ELEc7OztFQTlFNENpQixnQkFBTUMsYTs7a0JBQWhDN0IsaUI7OztBQXdGckJBLGtCQUFrQjhCLFlBQWxCLEdBQWlDO0FBQy9CTixZQUFVLG9CQUFNLENBQUUsQ0FEYTtBQUUvQlosUUFBTSxFQUZ5QjtBQUcvQkssc0JBQW9CO0FBSFcsQ0FBakMiLCJmaWxlIjoiZm91bmQtaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1ub25pbnRlcmFjdGl2ZS1lbGVtZW50LWludGVyYWN0aW9ucyAqL1xuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tbm9uaW50ZXJhY3RpdmUtdGFiaW5kZXggKi9cbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L2NsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHMgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3RMaXN0IGZyb20gJ3JlYWN0LWxpc3QnO1xuaW1wb3J0IEZhQ2FyZXRSaWdodCBmcm9tICdyZWFjdC1pY29ucy9saWIvZmEvY2FyZXQtcmlnaHQnO1xuaW1wb3J0IEZhQ2FyZXREb3duIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9jYXJldC1kb3duJztcblxuaW1wb3J0IHsgaGllcmFyY2h5SXRlbUxpc3RTaGFwZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzJztcbmltcG9ydCB7IENMQVNTX05BTUVfU0VBUkNIX0ZPQ1VTQUJMRSB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcG92ZXJGb3VuZEl0ZW1zIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBvbkdyb3VwQ2xpY2tIYW5sZGVyID0gKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy50b2dnbGVDb2xsYXBzZSgpO1xuICB9XG5cbiAgb25DbGlja0hhbmxkZXIgPSAoZSwga2V5KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc2VsZWN0SXRlbShrZXkpO1xuICB9XG5cbiAgb25FbnRlclByZXNzZWQgPSAoZSwga2V5KSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuc2VsZWN0SXRlbShrZXkpO1xuICAgIH1cbiAgfVxuXG4gIGdldEl0ZW1zID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF0YSB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGl0ZW1SZW5kZXJlciA9IChpbmRleCwga2V5KSA9PiB7XG4gICAgICBjb25zdCBpdGVtID0gZGF0YVtpbmRleF07XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtgbGlzdC1ncm91cC1pdGVtIGZvdW5kLWl0ZW0gJHtDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEV9YH1cbiAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICB0YWJJbmRleD1cIjBcIlxuICAgICAgICAgIG9uS2V5RG93bj17ZSA9PiB0aGlzLm9uRW50ZXJQcmVzc2VkKGUsIGluZGV4KX1cbiAgICAgICAgICBvbkNsaWNrPXtlID0+IHRoaXMub25DbGlja0hhbmxkZXIoZSwgaW5kZXgpfVxuICAgICAgICA+XG4gICAgICAgICAge3RoaXMucHJvcHMuaXRlbVJlbmRlckZ1bmN0aW9uID9cbiAgICAgICAgICAgIHRoaXMucHJvcHMuaXRlbVJlbmRlckZ1bmN0aW9uKGl0ZW0sIHRoaXMuZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbikgOlxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uKGl0ZW0pXG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8UmVhY3RMaXN0XG4gICAgICAgIGl0ZW1SZW5kZXJlcj17aXRlbVJlbmRlcmVyfVxuICAgICAgICBsZW5ndGg9e2RhdGEubGVuZ3RofVxuICAgICAgICB0eXBlPVwidW5pZm9ybVwiXG4gICAgICAgIHVzZVN0YXRpY1NpemVcbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIGdldEljb24gPSAoKSA9PiAodGhpcy5zdGF0ZS5jb2xsYXBzZWQgPyA8RmFDYXJldFJpZ2h0IC8+IDogPEZhQ2FyZXREb3duIC8+KTtcblxuICBkZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uID0gaXRlbSA9PiAoPHNwYW4+e2l0ZW0ubmFtZX08L3NwYW4+KTtcblxuICBzZWxlY3RJdGVtID0gKGtleSkgPT4ge1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QodGhpcy5wcm9wcy5kYXRhW2tleV0pO1xuICB9XG5cbiAgdG9nZ2xlQ29sbGFwc2UgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjb2xsYXBzZWQ6ICF0aGlzLnN0YXRlLmNvbGxhcHNlZCxcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbSBmb3VuZC1ncm91cC1pdGVtXCIgb25DbGljaz17dGhpcy5vbkdyb3VwQ2xpY2tIYW5sZGVyfT5cbiAgICAgICAge3RoaXMuZ2V0SWNvbigpfVxuICAgICAgICA8c3Bhbj57dGhpcy5wcm9wcy5ncm91cE5hbWV9PC9zcGFuPlxuICAgICAgICB7IXRoaXMuc3RhdGUuY29sbGFwc2VkICYmIHRoaXMucHJvcHMuZGF0YS5sZW5ndGggPiAwID8gdGhpcy5nZXRJdGVtcygpIDogbnVsbH1cbiAgICAgIDwvbGk+XG4gICAgKTtcbiAgfVxufVxuXG5Qb3BvdmVyRm91bmRJdGVtcy5wcm9wVHlwZXMgPSB7XG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgZ3JvdXBOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGRhdGE6IGhpZXJhcmNoeUl0ZW1MaXN0U2hhcGUsXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5Qb3BvdmVyRm91bmRJdGVtcy5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgZGF0YTogW10sXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcbn07XG4iXX0=