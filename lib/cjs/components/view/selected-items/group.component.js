'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _trash = require('react-icons/lib/fa/trash');

var _trash2 = _interopRequireDefault(_trash);

var _caretRight = require('react-icons/lib/fa/caret-right');

var _caretRight2 = _interopRequireDefault(_caretRight);

var _caretDown = require('react-icons/lib/fa/caret-down');

var _caretDown2 = _interopRequireDefault(_caretDown);

var _badge = require('../../badge');

var _badge2 = _interopRequireDefault(_badge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

var GroupItem = function (_React$PureComponent) {
  _inherits(GroupItem, _React$PureComponent);

  function GroupItem(props) {
    _classCallCheck(this, GroupItem);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.getIcon = function () {
      return _this.state.collapsed ? _react2.default.createElement(_caretRight2.default, null) : _react2.default.createElement(_caretDown2.default, null);
    };

    _this.clickHanlder = function (e) {
      e.preventDefault();
      _this.toggleCollapse();
    };

    _this.removeClickHandler = function (e) {
      e.stopPropagation();
      _this.props.onRemoveClick(_this.props.sourceId, _this.props.referenceIds.slice());
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

  GroupItem.prototype.getRemoveIcon = function getRemoveIcon() {
    return this.props.removable ? _react2.default.createElement(
      'span',
      { className: 'component-icon clickable', onClick: this.removeClickHandler },
      _react2.default.createElement(_trash2.default, null)
    ) : null;
  };

  GroupItem.prototype.render = function render() {
    var content = !this.state.collapsed ? this.props.children : null;
    var _props = this.props,
        count = _props.count,
        title = _props.title,
        selectedAll = _props.selectedAll;


    var selecteAllContent = selectedAll ? _react2.default.createElement(
      'span',
      null,
      this.props.allLabel
    ) : null;

    return _react2.default.createElement(
      'li',
      { className: 'group-list-item', onClick: this.clickHanlder },
      this.getIcon(),
      _react2.default.createElement(
        'span',
        null,
        title
      ),
      _react2.default.createElement(
        'div',
        { className: 'right-block' },
        selecteAllContent,
        _react2.default.createElement(
          _badge2.default,
          { className: 'badge-orange' },
          count
        ),
        this.getRemoveIcon()
      ),
      content
    );
  };

  return GroupItem;
}(_react2.default.PureComponent);

exports.default = GroupItem;


GroupItem.defaultProps = {
  allLabel: 'All',
  children: null,
  referenceIds: [],
  onRemoveClick: function onRemoveClick() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvc2VsZWN0ZWQtaXRlbXMvZ3JvdXAuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJHcm91cEl0ZW0iLCJwcm9wcyIsImdldEljb24iLCJzdGF0ZSIsImNvbGxhcHNlZCIsImNsaWNrSGFubGRlciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRvZ2dsZUNvbGxhcHNlIiwicmVtb3ZlQ2xpY2tIYW5kbGVyIiwic3RvcFByb3BhZ2F0aW9uIiwib25SZW1vdmVDbGljayIsInNvdXJjZUlkIiwicmVmZXJlbmNlSWRzIiwic2xpY2UiLCJzZXRTdGF0ZSIsImdldFJlbW92ZUljb24iLCJyZW1vdmFibGUiLCJyZW5kZXIiLCJjb250ZW50IiwiY2hpbGRyZW4iLCJjb3VudCIsInRpdGxlIiwic2VsZWN0ZWRBbGwiLCJzZWxlY3RlQWxsQ29udGVudCIsImFsbExhYmVsIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFJQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7K2VBVkE7QUFDQTtBQUNBOztJQVVxQkEsUzs7O0FBQ25CLHFCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLGdDQUFNQSxLQUFOLENBRGlCOztBQUFBLFVBT25CQyxPQVBtQixHQU9UO0FBQUEsYUFBTyxNQUFLQyxLQUFMLENBQVdDLFNBQVgsR0FBdUIseURBQXZCLEdBQTBDLHdEQUFqRDtBQUFBLEtBUFM7O0FBQUEsVUFpQm5CQyxZQWpCbUIsR0FpQkosVUFBQ0MsQ0FBRCxFQUFPO0FBQ3BCQSxRQUFFQyxjQUFGO0FBQ0EsWUFBS0MsY0FBTDtBQUNELEtBcEJrQjs7QUFBQSxVQXNCbkJDLGtCQXRCbUIsR0FzQkUsVUFBQ0gsQ0FBRCxFQUFPO0FBQzFCQSxRQUFFSSxlQUFGO0FBQ0EsWUFBS1QsS0FBTCxDQUFXVSxhQUFYLENBQXlCLE1BQUtWLEtBQUwsQ0FBV1csUUFBcEMsRUFBOEMsTUFBS1gsS0FBTCxDQUFXWSxZQUFYLENBQXdCQyxLQUF4QixFQUE5QztBQUNELEtBekJrQjs7QUFBQSxVQTJCbkJOLGNBM0JtQixHQTJCRixZQUFNO0FBQ3JCLFlBQUtPLFFBQUwsQ0FBYztBQUNaWCxtQkFBVyxDQUFDLE1BQUtELEtBQUwsQ0FBV0M7QUFEWCxPQUFkO0FBR0QsS0EvQmtCOztBQUVqQixVQUFLRCxLQUFMLEdBQWE7QUFDWEMsaUJBQVc7QUFEQSxLQUFiO0FBRmlCO0FBS2xCOztzQkFJRFksYSw0QkFBZ0I7QUFDZCxXQUFPLEtBQUtmLEtBQUwsQ0FBV2dCLFNBQVgsR0FDTDtBQUFBO0FBQUEsUUFBTSxXQUFVLDBCQUFoQixFQUEyQyxTQUFTLEtBQUtSLGtCQUF6RDtBQUNFO0FBREYsS0FESyxHQUlILElBSko7QUFLRCxHOztzQkFrQkRTLE0scUJBQVM7QUFDUCxRQUFNQyxVQUFVLENBQUMsS0FBS2hCLEtBQUwsQ0FBV0MsU0FBWixHQUF3QixLQUFLSCxLQUFMLENBQVdtQixRQUFuQyxHQUE4QyxJQUE5RDtBQURPLGlCQUUrQixLQUFLbkIsS0FGcEM7QUFBQSxRQUVDb0IsS0FGRCxVQUVDQSxLQUZEO0FBQUEsUUFFUUMsS0FGUixVQUVRQSxLQUZSO0FBQUEsUUFFZUMsV0FGZixVQUVlQSxXQUZmOzs7QUFJUCxRQUFNQyxvQkFBb0JELGNBQ3hCO0FBQUE7QUFBQTtBQUFPLFdBQUt0QixLQUFMLENBQVd3QjtBQUFsQixLQUR3QixHQUNhLElBRHZDOztBQUdBLFdBQ0U7QUFBQTtBQUFBLFFBQUksV0FBVSxpQkFBZCxFQUFnQyxTQUFTLEtBQUtwQixZQUE5QztBQUNHLFdBQUtILE9BQUwsRUFESDtBQUVFO0FBQUE7QUFBQTtBQUFPb0I7QUFBUCxPQUZGO0FBR0U7QUFBQTtBQUFBLFVBQUssV0FBVSxhQUFmO0FBQ0dFLHlCQURIO0FBRUU7QUFBQTtBQUFBLFlBQVMsV0FBVSxjQUFuQjtBQUFtQ0g7QUFBbkMsU0FGRjtBQUdHLGFBQUtMLGFBQUw7QUFISCxPQUhGO0FBUUdHO0FBUkgsS0FERjtBQVlELEc7OztFQXJEb0MsZ0JBQU1PLGE7O2tCQUF4QjFCLFM7OztBQW9FckJBLFVBQVUyQixZQUFWLEdBQXlCO0FBQ3ZCRixZQUFVLEtBRGE7QUFFdkJMLFlBQVUsSUFGYTtBQUd2QlAsZ0JBQWMsRUFIUztBQUl2QkYsaUJBQWUseUJBQU0sQ0FBRTtBQUpBLENBQXpCIiwiZmlsZSI6Imdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9ucyAqL1xuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tbm9uaW50ZXJhY3RpdmUtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L2NsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHMgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgRmFUcmFzaCBmcm9tICdyZWFjdC1pY29ucy9saWIvZmEvdHJhc2gnO1xuaW1wb3J0IEZhQ2FyZXRSaWdodCBmcm9tICdyZWFjdC1pY29ucy9saWIvZmEvY2FyZXQtcmlnaHQnO1xuaW1wb3J0IEZhQ2FyZXREb3duIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9jYXJldC1kb3duJztcblxuaW1wb3J0IEhTQmFkZ2UgZnJvbSAnLi4vLi4vYmFkZ2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcm91cEl0ZW0gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGdldEljb24gPSAoKSA9PiAodGhpcy5zdGF0ZS5jb2xsYXBzZWQgPyA8RmFDYXJldFJpZ2h0IC8+IDogPEZhQ2FyZXREb3duIC8+KTtcblxuICBnZXRSZW1vdmVJY29uKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLnJlbW92YWJsZSA/XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJjb21wb25lbnQtaWNvbiBjbGlja2FibGVcIiBvbkNsaWNrPXt0aGlzLnJlbW92ZUNsaWNrSGFuZGxlcn0+XG4gICAgICAgIDxGYVRyYXNoIC8+XG4gICAgICA8L3NwYW4+XG4gICAgICA6IG51bGw7XG4gIH1cblxuICBjbGlja0hhbmxkZXIgPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnRvZ2dsZUNvbGxhcHNlKCk7XG4gIH1cblxuICByZW1vdmVDbGlja0hhbmRsZXIgPSAoZSkgPT4ge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5wcm9wcy5vblJlbW92ZUNsaWNrKHRoaXMucHJvcHMuc291cmNlSWQsIHRoaXMucHJvcHMucmVmZXJlbmNlSWRzLnNsaWNlKCkpO1xuICB9XG5cbiAgdG9nZ2xlQ29sbGFwc2UgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjb2xsYXBzZWQ6ICF0aGlzLnN0YXRlLmNvbGxhcHNlZCxcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjb250ZW50ID0gIXRoaXMuc3RhdGUuY29sbGFwc2VkID8gdGhpcy5wcm9wcy5jaGlsZHJlbiA6IG51bGw7XG4gICAgY29uc3QgeyBjb3VudCwgdGl0bGUsIHNlbGVjdGVkQWxsIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3Qgc2VsZWN0ZUFsbENvbnRlbnQgPSBzZWxlY3RlZEFsbCA/XG4gICAgICA8c3Bhbj57dGhpcy5wcm9wcy5hbGxMYWJlbH08L3NwYW4+IDogbnVsbDtcblxuICAgIHJldHVybiAoXG4gICAgICA8bGkgY2xhc3NOYW1lPVwiZ3JvdXAtbGlzdC1pdGVtXCIgb25DbGljaz17dGhpcy5jbGlja0hhbmxkZXJ9PlxuICAgICAgICB7dGhpcy5nZXRJY29uKCl9XG4gICAgICAgIDxzcGFuPnt0aXRsZX08L3NwYW4+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmlnaHQtYmxvY2tcIj5cbiAgICAgICAgICB7c2VsZWN0ZUFsbENvbnRlbnR9XG4gICAgICAgICAgPEhTQmFkZ2UgY2xhc3NOYW1lPVwiYmFkZ2Utb3JhbmdlXCI+e2NvdW50fTwvSFNCYWRnZT5cbiAgICAgICAgICB7dGhpcy5nZXRSZW1vdmVJY29uKCl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7Y29udGVudH1cbiAgICAgIDwvbGk+XG4gICAgKTtcbiAgfVxufVxuXG5Hcm91cEl0ZW0ucHJvcFR5cGVzID0ge1xuICBhbGxMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgY291bnQ6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICByZWZlcmVuY2VJZHM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5udW1iZXJdKSksXG4gIHJlbW92YWJsZTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgc291cmNlSWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgc2VsZWN0ZWRBbGw6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIG9uUmVtb3ZlQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxufTtcblxuR3JvdXBJdGVtLmRlZmF1bHRQcm9wcyA9IHtcbiAgYWxsTGFiZWw6ICdBbGwnLFxuICBjaGlsZHJlbjogbnVsbCxcbiAgcmVmZXJlbmNlSWRzOiBbXSxcbiAgb25SZW1vdmVDbGljazogKCkgPT4ge30sXG59O1xuIl19