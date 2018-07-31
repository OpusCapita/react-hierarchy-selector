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
      _react2.default.createElement(
        'div',
        { className: 'title-block' },
        _react2.default.createElement(
          'div',
          { className: 'left-block' },
          this.getIcon(),
          _react2.default.createElement(
            'span',
            null,
            title
          )
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
        )
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvc2VsZWN0ZWQtaXRlbXMvZ3JvdXAuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJHcm91cEl0ZW0iLCJwcm9wcyIsImdldEljb24iLCJzdGF0ZSIsImNvbGxhcHNlZCIsImNsaWNrSGFubGRlciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRvZ2dsZUNvbGxhcHNlIiwicmVtb3ZlQ2xpY2tIYW5kbGVyIiwic3RvcFByb3BhZ2F0aW9uIiwib25SZW1vdmVDbGljayIsInNvdXJjZUlkIiwicmVmZXJlbmNlSWRzIiwic2xpY2UiLCJzZXRTdGF0ZSIsImdldFJlbW92ZUljb24iLCJyZW1vdmFibGUiLCJyZW5kZXIiLCJjb250ZW50IiwiY2hpbGRyZW4iLCJjb3VudCIsInRpdGxlIiwic2VsZWN0ZWRBbGwiLCJzZWxlY3RlQWxsQ29udGVudCIsImFsbExhYmVsIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFJQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7K2VBVkE7QUFDQTtBQUNBOztJQVVxQkEsUzs7O0FBQ25CLHFCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLGdDQUFNQSxLQUFOLENBRGlCOztBQUFBLFVBT25CQyxPQVBtQixHQU9UO0FBQUEsYUFBTyxNQUFLQyxLQUFMLENBQVdDLFNBQVgsR0FBdUIseURBQXZCLEdBQTBDLHdEQUFqRDtBQUFBLEtBUFM7O0FBQUEsVUFpQm5CQyxZQWpCbUIsR0FpQkosVUFBQ0MsQ0FBRCxFQUFPO0FBQ3BCQSxRQUFFQyxjQUFGO0FBQ0EsWUFBS0MsY0FBTDtBQUNELEtBcEJrQjs7QUFBQSxVQXNCbkJDLGtCQXRCbUIsR0FzQkUsVUFBQ0gsQ0FBRCxFQUFPO0FBQzFCQSxRQUFFSSxlQUFGO0FBQ0EsWUFBS1QsS0FBTCxDQUFXVSxhQUFYLENBQXlCLE1BQUtWLEtBQUwsQ0FBV1csUUFBcEMsRUFBOEMsTUFBS1gsS0FBTCxDQUFXWSxZQUFYLENBQXdCQyxLQUF4QixFQUE5QztBQUNELEtBekJrQjs7QUFBQSxVQTJCbkJOLGNBM0JtQixHQTJCRixZQUFNO0FBQ3JCLFlBQUtPLFFBQUwsQ0FBYztBQUNaWCxtQkFBVyxDQUFDLE1BQUtELEtBQUwsQ0FBV0M7QUFEWCxPQUFkO0FBR0QsS0EvQmtCOztBQUVqQixVQUFLRCxLQUFMLEdBQWE7QUFDWEMsaUJBQVc7QUFEQSxLQUFiO0FBRmlCO0FBS2xCOztzQkFJRFksYSw0QkFBZ0I7QUFDZCxXQUFPLEtBQUtmLEtBQUwsQ0FBV2dCLFNBQVgsR0FDTDtBQUFBO0FBQUEsUUFBTSxXQUFVLDBCQUFoQixFQUEyQyxTQUFTLEtBQUtSLGtCQUF6RDtBQUNFO0FBREYsS0FESyxHQUlILElBSko7QUFLRCxHOztzQkFrQkRTLE0scUJBQVM7QUFDUCxRQUFNQyxVQUFVLENBQUMsS0FBS2hCLEtBQUwsQ0FBV0MsU0FBWixHQUF3QixLQUFLSCxLQUFMLENBQVdtQixRQUFuQyxHQUE4QyxJQUE5RDtBQURPLGlCQUUrQixLQUFLbkIsS0FGcEM7QUFBQSxRQUVDb0IsS0FGRCxVQUVDQSxLQUZEO0FBQUEsUUFFUUMsS0FGUixVQUVRQSxLQUZSO0FBQUEsUUFFZUMsV0FGZixVQUVlQSxXQUZmOzs7QUFJUCxRQUFNQyxvQkFBb0JELGNBQ3hCO0FBQUE7QUFBQTtBQUFPLFdBQUt0QixLQUFMLENBQVd3QjtBQUFsQixLQUR3QixHQUNhLElBRHZDOztBQUdBLFdBQ0U7QUFBQTtBQUFBLFFBQUksV0FBVSxpQkFBZCxFQUFnQyxTQUFTLEtBQUtwQixZQUE5QztBQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsYUFBZjtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsWUFBZjtBQUNHLGVBQUtILE9BQUwsRUFESDtBQUVFO0FBQUE7QUFBQTtBQUFPb0I7QUFBUDtBQUZGLFNBREY7QUFLRTtBQUFBO0FBQUEsWUFBSyxXQUFVLGFBQWY7QUFDR0UsMkJBREg7QUFFRTtBQUFBO0FBQUEsY0FBUyxXQUFVLGNBQW5CO0FBQW1DSDtBQUFuQyxXQUZGO0FBR0csZUFBS0wsYUFBTDtBQUhIO0FBTEYsT0FERjtBQVlHRztBQVpILEtBREY7QUFnQkQsRzs7O0VBekRvQyxnQkFBTU8sYTs7a0JBQXhCMUIsUzs7O0FBd0VyQkEsVUFBVTJCLFlBQVYsR0FBeUI7QUFDdkJGLFlBQVUsS0FEYTtBQUV2QkwsWUFBVSxJQUZhO0FBR3ZCUCxnQkFBYyxFQUhTO0FBSXZCRixpQkFBZSx5QkFBTSxDQUFFO0FBSkEsQ0FBekIiLCJmaWxlIjoiZ3JvdXAuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1ub25pbnRlcmFjdGl2ZS1lbGVtZW50LWludGVyYWN0aW9ucyAqL1xuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvY2xpY2stZXZlbnRzLWhhdmUta2V5LWV2ZW50cyAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBGYVRyYXNoIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS90cmFzaCc7XG5pbXBvcnQgRmFDYXJldFJpZ2h0IGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9jYXJldC1yaWdodCc7XG5pbXBvcnQgRmFDYXJldERvd24gZnJvbSAncmVhY3QtaWNvbnMvbGliL2ZhL2NhcmV0LWRvd24nO1xuXG5pbXBvcnQgSFNCYWRnZSBmcm9tICcuLi8uLi9iYWRnZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyb3VwSXRlbSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0SWNvbiA9ICgpID0+ICh0aGlzLnN0YXRlLmNvbGxhcHNlZCA/IDxGYUNhcmV0UmlnaHQgLz4gOiA8RmFDYXJldERvd24gLz4pO1xuXG4gIGdldFJlbW92ZUljb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMucmVtb3ZhYmxlID9cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNvbXBvbmVudC1pY29uIGNsaWNrYWJsZVwiIG9uQ2xpY2s9e3RoaXMucmVtb3ZlQ2xpY2tIYW5kbGVyfT5cbiAgICAgICAgPEZhVHJhc2ggLz5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDogbnVsbDtcbiAgfVxuXG4gIGNsaWNrSGFubGRlciA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMudG9nZ2xlQ29sbGFwc2UoKTtcbiAgfVxuXG4gIHJlbW92ZUNsaWNrSGFuZGxlciA9IChlKSA9PiB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLnByb3BzLm9uUmVtb3ZlQ2xpY2sodGhpcy5wcm9wcy5zb3VyY2VJZCwgdGhpcy5wcm9wcy5yZWZlcmVuY2VJZHMuc2xpY2UoKSk7XG4gIH1cblxuICB0b2dnbGVDb2xsYXBzZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNvbGxhcHNlZDogIXRoaXMuc3RhdGUuY29sbGFwc2VkLFxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSAhdGhpcy5zdGF0ZS5jb2xsYXBzZWQgPyB0aGlzLnByb3BzLmNoaWxkcmVuIDogbnVsbDtcbiAgICBjb25zdCB7IGNvdW50LCB0aXRsZSwgc2VsZWN0ZWRBbGwgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBzZWxlY3RlQWxsQ29udGVudCA9IHNlbGVjdGVkQWxsID9cbiAgICAgIDxzcGFuPnt0aGlzLnByb3BzLmFsbExhYmVsfTwvc3Bhbj4gOiBudWxsO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxsaSBjbGFzc05hbWU9XCJncm91cC1saXN0LWl0ZW1cIiBvbkNsaWNrPXt0aGlzLmNsaWNrSGFubGRlcn0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGUtYmxvY2tcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxlZnQtYmxvY2tcIj5cbiAgICAgICAgICAgIHt0aGlzLmdldEljb24oKX1cbiAgICAgICAgICAgIDxzcGFuPnt0aXRsZX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyaWdodC1ibG9ja1wiPlxuICAgICAgICAgICAge3NlbGVjdGVBbGxDb250ZW50fVxuICAgICAgICAgICAgPEhTQmFkZ2UgY2xhc3NOYW1lPVwiYmFkZ2Utb3JhbmdlXCI+e2NvdW50fTwvSFNCYWRnZT5cbiAgICAgICAgICAgIHt0aGlzLmdldFJlbW92ZUljb24oKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtjb250ZW50fVxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59XG5cbkdyb3VwSXRlbS5wcm9wVHlwZXMgPSB7XG4gIGFsbExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBjb3VudDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gIHJlZmVyZW5jZUlkczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pKSxcbiAgcmVtb3ZhYmxlOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBzb3VyY2VJZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBzZWxlY3RlZEFsbDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgb25SZW1vdmVDbGljazogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5Hcm91cEl0ZW0uZGVmYXVsdFByb3BzID0ge1xuICBhbGxMYWJlbDogJ0FsbCcsXG4gIGNoaWxkcmVuOiBudWxsLFxuICByZWZlcmVuY2VJZHM6IFtdLFxuICBvblJlbW92ZUNsaWNrOiAoKSA9PiB7fSxcbn07XG4iXX0=