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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvc2VhcmNoL2ZvdW5kLWl0ZW1zLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUG9wb3ZlckZvdW5kSXRlbXMiLCJwcm9wcyIsIm9uR3JvdXBDbGlja0hhbmxkZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJ0b2dnbGVDb2xsYXBzZSIsIm9uQ2xpY2tIYW5sZGVyIiwia2V5Iiwic2VsZWN0SXRlbSIsIm9uRW50ZXJQcmVzc2VkIiwia2V5Q29kZSIsImdldEl0ZW1zIiwiZGF0YSIsIml0ZW1SZW5kZXJlciIsImluZGV4IiwiaXRlbSIsIml0ZW1SZW5kZXJGdW5jdGlvbiIsImRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24iLCJsZW5ndGgiLCJnZXRJY29uIiwic3RhdGUiLCJjb2xsYXBzZWQiLCJuYW1lIiwib25TZWxlY3QiLCJzZXRTdGF0ZSIsInJlbmRlciIsImdyb3VwTmFtZSIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBS0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7OzsrZUFaQTtBQUNBO0FBQ0E7QUFDQTs7SUFXcUJBLGlCOzs7QUFDbkIsNkJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsZ0NBQU1BLEtBQU4sQ0FEaUI7O0FBQUEsVUFPbkJDLG1CQVBtQixHQU9HLFVBQUNDLENBQUQsRUFBTztBQUMzQkEsUUFBRUMsY0FBRjtBQUNBLFlBQUtDLGNBQUw7QUFDRCxLQVZrQjs7QUFBQSxVQVluQkMsY0FabUIsR0FZRixVQUFDSCxDQUFELEVBQUlJLEdBQUosRUFBWTtBQUMzQkosUUFBRUMsY0FBRjtBQUNBLFlBQUtJLFVBQUwsQ0FBZ0JELEdBQWhCO0FBQ0QsS0Fma0I7O0FBQUEsVUFpQm5CRSxjQWpCbUIsR0FpQkYsVUFBQ04sQ0FBRCxFQUFJSSxHQUFKLEVBQVk7QUFDM0IsVUFBSUosRUFBRU8sT0FBRixLQUFjLEVBQWxCLEVBQXNCO0FBQ3BCUCxVQUFFQyxjQUFGO0FBQ0EsY0FBS0ksVUFBTCxDQUFnQkQsR0FBaEI7QUFDRDtBQUNGLEtBdEJrQjs7QUFBQSxVQXdCbkJJLFFBeEJtQixHQXdCUixZQUFNO0FBQUEsVUFDUEMsSUFETyxHQUNFLE1BQUtYLEtBRFAsQ0FDUFcsSUFETzs7O0FBR2YsVUFBTUMsZUFBZSxTQUFmQSxZQUFlLENBQUNDLEtBQUQsRUFBUVAsR0FBUixFQUFnQjtBQUNuQyxZQUFNUSxPQUFPSCxLQUFLRSxLQUFMLENBQWI7QUFDQSxlQUNFO0FBQUE7QUFBQTtBQUNFLDZGQURGO0FBRUUsaUJBQUtQLEdBRlA7QUFHRSxzQkFBUyxHQUhYO0FBSUUsdUJBQVc7QUFBQSxxQkFBSyxNQUFLRSxjQUFMLENBQW9CTixDQUFwQixFQUF1QlcsS0FBdkIsQ0FBTDtBQUFBLGFBSmI7QUFLRSxxQkFBUztBQUFBLHFCQUFLLE1BQUtSLGNBQUwsQ0FBb0JILENBQXBCLEVBQXVCVyxLQUF2QixDQUFMO0FBQUE7QUFMWDtBQU9HLGdCQUFLYixLQUFMLENBQVdlLGtCQUFYLEdBQ0MsTUFBS2YsS0FBTCxDQUFXZSxrQkFBWCxDQUE4QkQsSUFBOUIsRUFBb0MsTUFBS0UseUJBQXpDLENBREQsR0FFQyxNQUFLQSx5QkFBTCxDQUErQkYsSUFBL0I7QUFUSixTQURGO0FBY0QsT0FoQkQ7O0FBa0JBLGFBQ0U7QUFDRSxzQkFBY0YsWUFEaEI7QUFFRSxnQkFBUUQsS0FBS00sTUFGZjtBQUdFLGNBQUssU0FIUDtBQUlFO0FBSkYsUUFERjtBQVFELEtBckRrQjs7QUFBQSxVQXVEbkJDLE9BdkRtQixHQXVEVDtBQUFBLGFBQU8sTUFBS0MsS0FBTCxDQUFXQyxTQUFYLEdBQXVCLHlEQUF2QixHQUEwQyx3REFBakQ7QUFBQSxLQXZEUzs7QUFBQSxVQXlEbkJKLHlCQXpEbUIsR0F5RFM7QUFBQSxhQUFTO0FBQUE7QUFBQTtBQUFPRixhQUFLTztBQUFaLE9BQVQ7QUFBQSxLQXpEVDs7QUFBQSxVQTJEbkJkLFVBM0RtQixHQTJETixVQUFDRCxHQUFELEVBQVM7QUFDcEIsWUFBS04sS0FBTCxDQUFXc0IsUUFBWCxDQUFvQixNQUFLdEIsS0FBTCxDQUFXVyxJQUFYLENBQWdCTCxHQUFoQixDQUFwQjtBQUNELEtBN0RrQjs7QUFBQSxVQStEbkJGLGNBL0RtQixHQStERixZQUFNO0FBQ3JCLFlBQUttQixRQUFMLENBQWM7QUFDWkgsbUJBQVcsQ0FBQyxNQUFLRCxLQUFMLENBQVdDO0FBRFgsT0FBZDtBQUdELEtBbkVrQjs7QUFFakIsVUFBS0QsS0FBTCxHQUFhO0FBQ1hDLGlCQUFXO0FBREEsS0FBYjtBQUZpQjtBQUtsQjs7OEJBZ0VESSxNLHFCQUFTO0FBQ1AsV0FDRTtBQUFBO0FBQUEsUUFBSSxXQUFVLGtDQUFkLEVBQWlELFNBQVMsS0FBS3ZCLG1CQUEvRDtBQUNHLFdBQUtpQixPQUFMLEVBREg7QUFFRTtBQUFBO0FBQUE7QUFBTyxhQUFLbEIsS0FBTCxDQUFXeUI7QUFBbEIsT0FGRjtBQUdHLE9BQUMsS0FBS04sS0FBTCxDQUFXQyxTQUFaLElBQXlCLEtBQUtwQixLQUFMLENBQVdXLElBQVgsQ0FBZ0JNLE1BQWhCLEdBQXlCLENBQWxELEdBQXNELEtBQUtQLFFBQUwsRUFBdEQsR0FBd0U7QUFIM0UsS0FERjtBQU9ELEc7OztFQTlFNEMsZ0JBQU1nQixhOztrQkFBaEMzQixpQjs7O0FBd0ZyQkEsa0JBQWtCNEIsWUFBbEIsR0FBaUM7QUFDL0JMLFlBQVUsb0JBQU0sQ0FBRSxDQURhO0FBRS9CWCxRQUFNLEVBRnlCO0FBRy9CSSxzQkFBb0I7QUFIVyxDQUFqQyIsImZpbGUiOiJmb3VuZC1pdGVtcy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tbm9uaW50ZXJhY3RpdmUtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tbm9uaW50ZXJhY3RpdmUtdGFiaW5kZXggKi9cclxuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvY2xpY2stZXZlbnRzLWhhdmUta2V5LWV2ZW50cyAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IFJlYWN0TGlzdCBmcm9tICdyZWFjdC1saXN0JztcclxuaW1wb3J0IEZhQ2FyZXRSaWdodCBmcm9tICdyZWFjdC1pY29ucy9saWIvZmEvY2FyZXQtcmlnaHQnO1xyXG5pbXBvcnQgRmFDYXJldERvd24gZnJvbSAncmVhY3QtaWNvbnMvbGliL2ZhL2NhcmV0LWRvd24nO1xyXG5cclxuaW1wb3J0IHsgaGllcmFyY2h5SXRlbUxpc3RTaGFwZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzJztcclxuaW1wb3J0IHsgQ0xBU1NfTkFNRV9TRUFSQ0hfRk9DVVNBQkxFIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcG92ZXJGb3VuZEl0ZW1zIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGNvbGxhcHNlZDogZmFsc2UsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgb25Hcm91cENsaWNrSGFubGRlciA9IChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0aGlzLnRvZ2dsZUNvbGxhcHNlKCk7XHJcbiAgfVxyXG5cclxuICBvbkNsaWNrSGFubGRlciA9IChlLCBrZXkpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMuc2VsZWN0SXRlbShrZXkpO1xyXG4gIH1cclxuXHJcbiAgb25FbnRlclByZXNzZWQgPSAoZSwga2V5KSA9PiB7XHJcbiAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHRoaXMuc2VsZWN0SXRlbShrZXkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SXRlbXMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB7IGRhdGEgfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgY29uc3QgaXRlbVJlbmRlcmVyID0gKGluZGV4LCBrZXkpID0+IHtcclxuICAgICAgY29uc3QgaXRlbSA9IGRhdGFbaW5kZXhdO1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNsYXNzTmFtZT17YGxpc3QtZ3JvdXAtaXRlbSBmb3VuZC1pdGVtICR7Q0xBU1NfTkFNRV9TRUFSQ0hfRk9DVVNBQkxFfWB9XHJcbiAgICAgICAgICBrZXk9e2tleX1cclxuICAgICAgICAgIHRhYkluZGV4PVwiMFwiXHJcbiAgICAgICAgICBvbktleURvd249e2UgPT4gdGhpcy5vbkVudGVyUHJlc3NlZChlLCBpbmRleCl9XHJcbiAgICAgICAgICBvbkNsaWNrPXtlID0+IHRoaXMub25DbGlja0hhbmxkZXIoZSwgaW5kZXgpfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHt0aGlzLnByb3BzLml0ZW1SZW5kZXJGdW5jdGlvbiA/XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaXRlbVJlbmRlckZ1bmN0aW9uKGl0ZW0sIHRoaXMuZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbikgOlxyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24oaXRlbSlcclxuICAgICAgICAgIH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPFJlYWN0TGlzdFxyXG4gICAgICAgIGl0ZW1SZW5kZXJlcj17aXRlbVJlbmRlcmVyfVxyXG4gICAgICAgIGxlbmd0aD17ZGF0YS5sZW5ndGh9XHJcbiAgICAgICAgdHlwZT1cInVuaWZvcm1cIlxyXG4gICAgICAgIHVzZVN0YXRpY1NpemVcclxuICAgICAgLz5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXRJY29uID0gKCkgPT4gKHRoaXMuc3RhdGUuY29sbGFwc2VkID8gPEZhQ2FyZXRSaWdodCAvPiA6IDxGYUNhcmV0RG93biAvPik7XHJcblxyXG4gIGRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24gPSBpdGVtID0+ICg8c3Bhbj57aXRlbS5uYW1lfTwvc3Bhbj4pOyBcclxuXHJcbiAgc2VsZWN0SXRlbSA9IChrZXkpID0+IHtcclxuICAgIHRoaXMucHJvcHMub25TZWxlY3QodGhpcy5wcm9wcy5kYXRhW2tleV0pO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlQ29sbGFwc2UgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgY29sbGFwc2VkOiAhdGhpcy5zdGF0ZS5jb2xsYXBzZWQsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxsaSBjbGFzc05hbWU9XCJsaXN0LWdyb3VwLWl0ZW0gZm91bmQtZ3JvdXAtaXRlbVwiIG9uQ2xpY2s9e3RoaXMub25Hcm91cENsaWNrSGFubGRlcn0+XHJcbiAgICAgICAge3RoaXMuZ2V0SWNvbigpfVxyXG4gICAgICAgIDxzcGFuPnt0aGlzLnByb3BzLmdyb3VwTmFtZX08L3NwYW4+XHJcbiAgICAgICAgeyF0aGlzLnN0YXRlLmNvbGxhcHNlZCAmJiB0aGlzLnByb3BzLmRhdGEubGVuZ3RoID4gMCA/IHRoaXMuZ2V0SXRlbXMoKSA6IG51bGx9XHJcbiAgICAgIDwvbGk+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuUG9wb3ZlckZvdW5kSXRlbXMucHJvcFR5cGVzID0ge1xyXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcclxuICBncm91cE5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICBkYXRhOiBoaWVyYXJjaHlJdGVtTGlzdFNoYXBlLFxyXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXHJcbn07XHJcblxyXG5Qb3BvdmVyRm91bmRJdGVtcy5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxyXG4gIGRhdGE6IFtdLFxyXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcclxufTtcclxuIl19