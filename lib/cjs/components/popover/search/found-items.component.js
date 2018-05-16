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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvc2VhcmNoL2ZvdW5kLWl0ZW1zLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUG9wb3ZlckZvdW5kSXRlbXMiLCJwcm9wcyIsIm9uR3JvdXBDbGlja0hhbmxkZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJ0b2dnbGVDb2xsYXBzZSIsIm9uQ2xpY2tIYW5sZGVyIiwia2V5Iiwic2VsZWN0SXRlbSIsIm9uRW50ZXJQcmVzc2VkIiwia2V5Q29kZSIsImdldEl0ZW1zIiwiZGF0YSIsIml0ZW1SZW5kZXJlciIsImluZGV4IiwiaXRlbSIsIml0ZW1SZW5kZXJGdW5jdGlvbiIsImRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24iLCJsZW5ndGgiLCJnZXRJY29uIiwic3RhdGUiLCJjb2xsYXBzZWQiLCJuYW1lIiwib25TZWxlY3QiLCJzZXRTdGF0ZSIsInJlbmRlciIsImdyb3VwTmFtZSIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBS0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7OzsrZUFaQTtBQUNBO0FBQ0E7QUFDQTs7SUFXcUJBLGlCOzs7QUFDbkIsNkJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsZ0NBQU1BLEtBQU4sQ0FEaUI7O0FBQUEsVUFPbkJDLG1CQVBtQixHQU9HLFVBQUNDLENBQUQsRUFBTztBQUMzQkEsUUFBRUMsY0FBRjtBQUNBLFlBQUtDLGNBQUw7QUFDRCxLQVZrQjs7QUFBQSxVQVluQkMsY0FabUIsR0FZRixVQUFDSCxDQUFELEVBQUlJLEdBQUosRUFBWTtBQUMzQkosUUFBRUMsY0FBRjtBQUNBLFlBQUtJLFVBQUwsQ0FBZ0JELEdBQWhCO0FBQ0QsS0Fma0I7O0FBQUEsVUFpQm5CRSxjQWpCbUIsR0FpQkYsVUFBQ04sQ0FBRCxFQUFJSSxHQUFKLEVBQVk7QUFDM0IsVUFBSUosRUFBRU8sT0FBRixLQUFjLEVBQWxCLEVBQXNCO0FBQ3BCUCxVQUFFQyxjQUFGO0FBQ0EsY0FBS0ksVUFBTCxDQUFnQkQsR0FBaEI7QUFDRDtBQUNGLEtBdEJrQjs7QUFBQSxVQXdCbkJJLFFBeEJtQixHQXdCUixZQUFNO0FBQUEsVUFDUEMsSUFETyxHQUNFLE1BQUtYLEtBRFAsQ0FDUFcsSUFETzs7O0FBR2YsVUFBTUMsZUFBZSxTQUFmQSxZQUFlLENBQUNDLEtBQUQsRUFBUVAsR0FBUixFQUFnQjtBQUNuQyxZQUFNUSxPQUFPSCxLQUFLRSxLQUFMLENBQWI7QUFDQSxlQUNFO0FBQUE7QUFBQTtBQUNFLDZGQURGO0FBRUUsaUJBQUtQLEdBRlA7QUFHRSxzQkFBUyxHQUhYO0FBSUUsdUJBQVc7QUFBQSxxQkFBSyxNQUFLRSxjQUFMLENBQW9CTixDQUFwQixFQUF1QlcsS0FBdkIsQ0FBTDtBQUFBLGFBSmI7QUFLRSxxQkFBUztBQUFBLHFCQUFLLE1BQUtSLGNBQUwsQ0FBb0JILENBQXBCLEVBQXVCVyxLQUF2QixDQUFMO0FBQUE7QUFMWDtBQU9HLGdCQUFLYixLQUFMLENBQVdlLGtCQUFYLEdBQ0MsTUFBS2YsS0FBTCxDQUFXZSxrQkFBWCxDQUE4QkQsSUFBOUIsRUFBb0MsTUFBS0UseUJBQXpDLENBREQsR0FFQyxNQUFLQSx5QkFBTCxDQUErQkYsSUFBL0I7QUFUSixTQURGO0FBY0QsT0FoQkQ7O0FBa0JBLGFBQ0U7QUFDRSxzQkFBY0YsWUFEaEI7QUFFRSxnQkFBUUQsS0FBS00sTUFGZjtBQUdFLGNBQUssU0FIUDtBQUlFO0FBSkYsUUFERjtBQVFELEtBckRrQjs7QUFBQSxVQXVEbkJDLE9BdkRtQixHQXVEVDtBQUFBLGFBQU8sTUFBS0MsS0FBTCxDQUFXQyxTQUFYLEdBQXVCLHlEQUF2QixHQUEwQyx3REFBakQ7QUFBQSxLQXZEUzs7QUFBQSxVQXlEbkJKLHlCQXpEbUIsR0F5RFM7QUFBQSxhQUFTO0FBQUE7QUFBQTtBQUFPRixhQUFLTztBQUFaLE9BQVQ7QUFBQSxLQXpEVDs7QUFBQSxVQTJEbkJkLFVBM0RtQixHQTJETixVQUFDRCxHQUFELEVBQVM7QUFDcEIsWUFBS04sS0FBTCxDQUFXc0IsUUFBWCxDQUFvQixNQUFLdEIsS0FBTCxDQUFXVyxJQUFYLENBQWdCTCxHQUFoQixDQUFwQjtBQUNELEtBN0RrQjs7QUFBQSxVQStEbkJGLGNBL0RtQixHQStERixZQUFNO0FBQ3JCLFlBQUttQixRQUFMLENBQWM7QUFDWkgsbUJBQVcsQ0FBQyxNQUFLRCxLQUFMLENBQVdDO0FBRFgsT0FBZDtBQUdELEtBbkVrQjs7QUFFakIsVUFBS0QsS0FBTCxHQUFhO0FBQ1hDLGlCQUFXO0FBREEsS0FBYjtBQUZpQjtBQUtsQjs7OEJBZ0VESSxNLHFCQUFTO0FBQ1AsV0FDRTtBQUFBO0FBQUEsUUFBSSxXQUFVLGtDQUFkLEVBQWlELFNBQVMsS0FBS3ZCLG1CQUEvRDtBQUNHLFdBQUtpQixPQUFMLEVBREg7QUFFRTtBQUFBO0FBQUE7QUFBTyxhQUFLbEIsS0FBTCxDQUFXeUI7QUFBbEIsT0FGRjtBQUdHLE9BQUMsS0FBS04sS0FBTCxDQUFXQyxTQUFaLElBQXlCLEtBQUtwQixLQUFMLENBQVdXLElBQVgsQ0FBZ0JNLE1BQWhCLEdBQXlCLENBQWxELEdBQXNELEtBQUtQLFFBQUwsRUFBdEQsR0FBd0U7QUFIM0UsS0FERjtBQU9ELEc7OztFQTlFNEMsZ0JBQU1nQixhOztrQkFBaEMzQixpQjs7O0FBd0ZyQkEsa0JBQWtCNEIsWUFBbEIsR0FBaUM7QUFDL0JMLFlBQVUsb0JBQU0sQ0FBRSxDQURhO0FBRS9CWCxRQUFNLEVBRnlCO0FBRy9CSSxzQkFBb0I7QUFIVyxDQUFqQyIsImZpbGUiOiJmb3VuZC1pdGVtcy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLW5vbmludGVyYWN0aXZlLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1ub25pbnRlcmFjdGl2ZS10YWJpbmRleCAqL1xuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvY2xpY2stZXZlbnRzLWhhdmUta2V5LWV2ZW50cyAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdExpc3QgZnJvbSAncmVhY3QtbGlzdCc7XG5pbXBvcnQgRmFDYXJldFJpZ2h0IGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9jYXJldC1yaWdodCc7XG5pbXBvcnQgRmFDYXJldERvd24gZnJvbSAncmVhY3QtaWNvbnMvbGliL2ZhL2NhcmV0LWRvd24nO1xuXG5pbXBvcnQgeyBoaWVyYXJjaHlJdGVtTGlzdFNoYXBlIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMnO1xuaW1wb3J0IHsgQ0xBU1NfTkFNRV9TRUFSQ0hfRk9DVVNBQkxFIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wb3ZlckZvdW5kSXRlbXMgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIG9uR3JvdXBDbGlja0hhbmxkZXIgPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnRvZ2dsZUNvbGxhcHNlKCk7XG4gIH1cblxuICBvbkNsaWNrSGFubGRlciA9IChlLCBrZXkpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zZWxlY3RJdGVtKGtleSk7XG4gIH1cblxuICBvbkVudGVyUHJlc3NlZCA9IChlLCBrZXkpID0+IHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5zZWxlY3RJdGVtKGtleSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0SXRlbXMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgaXRlbVJlbmRlcmVyID0gKGluZGV4LCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBkYXRhW2luZGV4XTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2BsaXN0LWdyb3VwLWl0ZW0gZm91bmQtaXRlbSAke0NMQVNTX05BTUVfU0VBUkNIX0ZPQ1VTQUJMRX1gfVxuICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgIHRhYkluZGV4PVwiMFwiXG4gICAgICAgICAgb25LZXlEb3duPXtlID0+IHRoaXMub25FbnRlclByZXNzZWQoZSwgaW5kZXgpfVxuICAgICAgICAgIG9uQ2xpY2s9e2UgPT4gdGhpcy5vbkNsaWNrSGFubGRlcihlLCBpbmRleCl9XG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5pdGVtUmVuZGVyRnVuY3Rpb24gP1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pdGVtUmVuZGVyRnVuY3Rpb24oaXRlbSwgdGhpcy5kZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uKSA6XG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24oaXRlbSlcbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdExpc3RcbiAgICAgICAgaXRlbVJlbmRlcmVyPXtpdGVtUmVuZGVyZXJ9XG4gICAgICAgIGxlbmd0aD17ZGF0YS5sZW5ndGh9XG4gICAgICAgIHR5cGU9XCJ1bmlmb3JtXCJcbiAgICAgICAgdXNlU3RhdGljU2l6ZVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgZ2V0SWNvbiA9ICgpID0+ICh0aGlzLnN0YXRlLmNvbGxhcHNlZCA/IDxGYUNhcmV0UmlnaHQgLz4gOiA8RmFDYXJldERvd24gLz4pO1xuXG4gIGRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24gPSBpdGVtID0+ICg8c3Bhbj57aXRlbS5uYW1lfTwvc3Bhbj4pO1xuXG4gIHNlbGVjdEl0ZW0gPSAoa2V5KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdCh0aGlzLnByb3BzLmRhdGFba2V5XSk7XG4gIH1cblxuICB0b2dnbGVDb2xsYXBzZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNvbGxhcHNlZDogIXRoaXMuc3RhdGUuY29sbGFwc2VkLFxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8bGkgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtIGZvdW5kLWdyb3VwLWl0ZW1cIiBvbkNsaWNrPXt0aGlzLm9uR3JvdXBDbGlja0hhbmxkZXJ9PlxuICAgICAgICB7dGhpcy5nZXRJY29uKCl9XG4gICAgICAgIDxzcGFuPnt0aGlzLnByb3BzLmdyb3VwTmFtZX08L3NwYW4+XG4gICAgICAgIHshdGhpcy5zdGF0ZS5jb2xsYXBzZWQgJiYgdGhpcy5wcm9wcy5kYXRhLmxlbmd0aCA+IDAgPyB0aGlzLmdldEl0ZW1zKCkgOiBudWxsfVxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59XG5cblBvcG92ZXJGb3VuZEl0ZW1zLnByb3BUeXBlcyA9IHtcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBncm91cE5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgZGF0YTogaGllcmFyY2h5SXRlbUxpc3RTaGFwZSxcbiAgaXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cblBvcG92ZXJGb3VuZEl0ZW1zLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBkYXRhOiBbXSxcbiAgaXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxufTtcbiJdfQ==