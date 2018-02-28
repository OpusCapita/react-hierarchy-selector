'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _selectableList = require('../../selectable-list');

var _selectableList2 = _interopRequireDefault(_selectableList);

var _columnData = require('../../../models/column/column-data');

var _columnData2 = _interopRequireDefault(_columnData);

require('./column.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ViewColumn = function (_React$PureComponent) {
  _inherits(ViewColumn, _React$PureComponent);

  function ViewColumn(props) {
    _classCallCheck(this, ViewColumn);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.clickHandler = function (id, event) {
      _this.props.onClick(_this.props.index, id, event);
    };

    _this.checkHandler = function (id, checkState) {
      _this.props.onCheck(_this.props.referenceIds.slice(), id, checkState);
    };

    _this.checkAllHandler = function () {
      var newState = !_this.state.checkedAll;
      _this.props.onCheckAll(_this.props.referenceIds.slice(), newState);
      _this.setState({
        checkedAll: newState
      });
    };

    _this.renderWrapperFunction = function (index) {
      return function (item, defaultRenderFunction) {
        return _this.props.itemRenderFunction(index, item, defaultRenderFunction);
      };
    };

    _this.state = {
      checkedAll: _this.props.checkedAll
    };
    return _this;
  }

  ViewColumn.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.checkedAll !== this.props.checkedAll) {
      this.setState({
        checkedAll: nextProps.checkedAll
      });
    }
  };

  ViewColumn.prototype.render = function render() {
    // TODO: 'All' text should be passed here to show translated text.
    var disabledProperty = this.props.checkedAllDisabled ? { disabled: true } : null;
    return _react2.default.createElement(
      'div',
      { className: 'oc-hierarchy-selector-column' },
      _react2.default.createElement(
        'div',
        { className: 'oc-hierarchy-selector-column-all' },
        !this.props.checkedAllHidden ? _react2.default.createElement(
          _reactBootstrap.Checkbox,
          _extends({
            onChange: this.checkAllHandler,
            checked: this.state.checkedAll
          }, disabledProperty),
          this.props.allLabel
        ) : null
      ),
      _react2.default.createElement(_selectableList2.default, {
        checkedAll: this.props.checkedAll,
        checkDisabled: this.state.checkedAll,
        checkedIds: this.props.checkedIds,
        items: this.props.data.items,
        itemRenderFunction: this.props.itemRenderFunction ? this.renderWrapperFunction(this.props.index) : null,
        selectedId: this.props.selectedId,
        onCheck: this.checkHandler,
        onClick: this.clickHandler
      })
    );
  };

  return ViewColumn;
}(_react2.default.PureComponent);

exports.default = ViewColumn;


ViewColumn.defaultProps = {
  allLabel: 'All',
  checkedAll: false,
  checkedAllDisabled: false,
  checkedAllHidden: false,
  data: new _columnData2.default(),
  itemRenderFunction: null,
  selectedId: null,
  referenceIds: [],
  onCheck: function onCheck() {},
  onCheckAll: function onCheckAll() {},
  onClick: function onClick() {},
  checkedIds: []
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvY29sdW1uL2NvbHVtbi5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlZpZXdDb2x1bW4iLCJwcm9wcyIsImNsaWNrSGFuZGxlciIsImlkIiwiZXZlbnQiLCJvbkNsaWNrIiwiaW5kZXgiLCJjaGVja0hhbmRsZXIiLCJjaGVja1N0YXRlIiwib25DaGVjayIsInJlZmVyZW5jZUlkcyIsInNsaWNlIiwiY2hlY2tBbGxIYW5kbGVyIiwibmV3U3RhdGUiLCJzdGF0ZSIsImNoZWNrZWRBbGwiLCJvbkNoZWNrQWxsIiwic2V0U3RhdGUiLCJyZW5kZXJXcmFwcGVyRnVuY3Rpb24iLCJpdGVtIiwiZGVmYXVsdFJlbmRlckZ1bmN0aW9uIiwiaXRlbVJlbmRlckZ1bmN0aW9uIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsInJlbmRlciIsImRpc2FibGVkUHJvcGVydHkiLCJjaGVja2VkQWxsRGlzYWJsZWQiLCJkaXNhYmxlZCIsImNoZWNrZWRBbGxIaWRkZW4iLCJhbGxMYWJlbCIsImNoZWNrZWRJZHMiLCJkYXRhIiwiaXRlbXMiLCJzZWxlY3RlZElkIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7SUFFcUJBLFU7OztBQUNuQixzQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQSxVQWVuQkMsWUFmbUIsR0FlSixVQUFDQyxFQUFELEVBQUtDLEtBQUwsRUFBZTtBQUM1QixZQUFLSCxLQUFMLENBQVdJLE9BQVgsQ0FBbUIsTUFBS0osS0FBTCxDQUFXSyxLQUE5QixFQUFxQ0gsRUFBckMsRUFBeUNDLEtBQXpDO0FBQ0QsS0FqQmtCOztBQUFBLFVBbUJuQkcsWUFuQm1CLEdBbUJKLFVBQUNKLEVBQUQsRUFBS0ssVUFBTCxFQUFvQjtBQUNqQyxZQUFLUCxLQUFMLENBQVdRLE9BQVgsQ0FBbUIsTUFBS1IsS0FBTCxDQUFXUyxZQUFYLENBQXdCQyxLQUF4QixFQUFuQixFQUFvRFIsRUFBcEQsRUFBd0RLLFVBQXhEO0FBQ0QsS0FyQmtCOztBQUFBLFVBdUJuQkksZUF2Qm1CLEdBdUJELFlBQU07QUFDdEIsVUFBTUMsV0FBVyxDQUFDLE1BQUtDLEtBQUwsQ0FBV0MsVUFBN0I7QUFDQSxZQUFLZCxLQUFMLENBQVdlLFVBQVgsQ0FBc0IsTUFBS2YsS0FBTCxDQUFXUyxZQUFYLENBQXdCQyxLQUF4QixFQUF0QixFQUF1REUsUUFBdkQ7QUFDQSxZQUFLSSxRQUFMLENBQWM7QUFDWkYsb0JBQVlGO0FBREEsT0FBZDtBQUdELEtBN0JrQjs7QUFBQSxVQStCbkJLLHFCQS9CbUIsR0ErQks7QUFBQSxhQUFTLFVBQUNDLElBQUQsRUFBT0MscUJBQVA7QUFBQSxlQUMvQixNQUFLbkIsS0FBTCxDQUFXb0Isa0JBQVgsQ0FBOEJmLEtBQTlCLEVBQXFDYSxJQUFyQyxFQUEyQ0MscUJBQTNDLENBRCtCO0FBQUEsT0FBVDtBQUFBLEtBL0JMOztBQUVqQixVQUFLTixLQUFMLEdBQWE7QUFDWEMsa0JBQVksTUFBS2QsS0FBTCxDQUFXYztBQURaLEtBQWI7QUFGaUI7QUFLbEI7O3VCQUVETyx5QixzQ0FBMEJDLFMsRUFBVztBQUNuQyxRQUFJQSxVQUFVUixVQUFWLEtBQXlCLEtBQUtkLEtBQUwsQ0FBV2MsVUFBeEMsRUFBb0Q7QUFDbEQsV0FBS0UsUUFBTCxDQUFjO0FBQ1pGLG9CQUFZUSxVQUFVUjtBQURWLE9BQWQ7QUFHRDtBQUNGLEc7O3VCQXFCRFMsTSxxQkFBUztBQUNQO0FBQ0EsUUFBTUMsbUJBQW1CLEtBQUt4QixLQUFMLENBQVd5QixrQkFBWCxHQUFnQyxFQUFFQyxVQUFVLElBQVosRUFBaEMsR0FBcUQsSUFBOUU7QUFDQSxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsOEJBQWY7QUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGtDQUFmO0FBQ0csU0FBQyxLQUFLMUIsS0FBTCxDQUFXMkIsZ0JBQVosR0FDQztBQUFBO0FBQUE7QUFDRSxzQkFBVSxLQUFLaEIsZUFEakI7QUFFRSxxQkFBUyxLQUFLRSxLQUFMLENBQVdDO0FBRnRCLGFBR01VLGdCQUhOO0FBS0csZUFBS3hCLEtBQUwsQ0FBVzRCO0FBTGQsU0FERCxHQVFHO0FBVE4sT0FERjtBQWFFO0FBQ0Usb0JBQVksS0FBSzVCLEtBQUwsQ0FBV2MsVUFEekI7QUFFRSx1QkFBZSxLQUFLRCxLQUFMLENBQVdDLFVBRjVCO0FBR0Usb0JBQVksS0FBS2QsS0FBTCxDQUFXNkIsVUFIekI7QUFJRSxlQUFPLEtBQUs3QixLQUFMLENBQVc4QixJQUFYLENBQWdCQyxLQUp6QjtBQUtFLDRCQUFvQixLQUFLL0IsS0FBTCxDQUFXb0Isa0JBQVgsR0FDQSxLQUFLSCxxQkFBTCxDQUEyQixLQUFLakIsS0FBTCxDQUFXSyxLQUF0QyxDQURBLEdBQytDLElBTnJFO0FBT0Usb0JBQVksS0FBS0wsS0FBTCxDQUFXZ0MsVUFQekI7QUFRRSxpQkFBUyxLQUFLMUIsWUFSaEI7QUFTRSxpQkFBUyxLQUFLTDtBQVRoQjtBQWJGLEtBREY7QUEyQkQsRzs7O0VBakVxQyxnQkFBTWdDLGE7O2tCQUF6QmxDLFU7OztBQW9GckJBLFdBQVdtQyxZQUFYLEdBQTBCO0FBQ3hCTixZQUFVLEtBRGM7QUFFeEJkLGNBQVksS0FGWTtBQUd4Qlcsc0JBQW9CLEtBSEk7QUFJeEJFLG9CQUFrQixLQUpNO0FBS3hCRyxRQUFNLDBCQUxrQjtBQU14QlYsc0JBQW9CLElBTkk7QUFPeEJZLGNBQVksSUFQWTtBQVF4QnZCLGdCQUFjLEVBUlU7QUFTeEJELFdBQVMsbUJBQU0sQ0FBRSxDQVRPO0FBVXhCTyxjQUFZLHNCQUFNLENBQUUsQ0FWSTtBQVd4QlgsV0FBUyxtQkFBTSxDQUFFLENBWE87QUFZeEJ5QixjQUFZO0FBWlksQ0FBMUIiLCJmaWxlIjoiY29sdW1uLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBDaGVja2JveCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgU2VsZWN0YWJsZUxpc3QgZnJvbSAnLi4vLi4vc2VsZWN0YWJsZS1saXN0JztcbmltcG9ydCBDb2x1bW5EYXRhIGZyb20gJy4uLy4uLy4uL21vZGVscy9jb2x1bW4vY29sdW1uLWRhdGEnO1xuXG5pbXBvcnQgJy4vY29sdW1uLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3Q29sdW1uIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjaGVja2VkQWxsOiB0aGlzLnByb3BzLmNoZWNrZWRBbGwsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgaWYgKG5leHRQcm9wcy5jaGVja2VkQWxsICE9PSB0aGlzLnByb3BzLmNoZWNrZWRBbGwpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjaGVja2VkQWxsOiBuZXh0UHJvcHMuY2hlY2tlZEFsbCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsaWNrSGFuZGxlciA9IChpZCwgZXZlbnQpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2xpY2sodGhpcy5wcm9wcy5pbmRleCwgaWQsIGV2ZW50KTtcbiAgfVxuXG4gIGNoZWNrSGFuZGxlciA9IChpZCwgY2hlY2tTdGF0ZSkgPT4ge1xuICAgIHRoaXMucHJvcHMub25DaGVjayh0aGlzLnByb3BzLnJlZmVyZW5jZUlkcy5zbGljZSgpLCBpZCwgY2hlY2tTdGF0ZSk7XG4gIH1cblxuICBjaGVja0FsbEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV3U3RhdGUgPSAhdGhpcy5zdGF0ZS5jaGVja2VkQWxsO1xuICAgIHRoaXMucHJvcHMub25DaGVja0FsbCh0aGlzLnByb3BzLnJlZmVyZW5jZUlkcy5zbGljZSgpLCBuZXdTdGF0ZSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjaGVja2VkQWxsOiBuZXdTdGF0ZSxcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcldyYXBwZXJGdW5jdGlvbiA9IGluZGV4ID0+IChpdGVtLCBkZWZhdWx0UmVuZGVyRnVuY3Rpb24pID0+XG4gICAgdGhpcy5wcm9wcy5pdGVtUmVuZGVyRnVuY3Rpb24oaW5kZXgsIGl0ZW0sIGRlZmF1bHRSZW5kZXJGdW5jdGlvbik7XG5cbiAgcmVuZGVyKCkge1xuICAgIC8vIFRPRE86ICdBbGwnIHRleHQgc2hvdWxkIGJlIHBhc3NlZCBoZXJlIHRvIHNob3cgdHJhbnNsYXRlZCB0ZXh0LlxuICAgIGNvbnN0IGRpc2FibGVkUHJvcGVydHkgPSB0aGlzLnByb3BzLmNoZWNrZWRBbGxEaXNhYmxlZCA/IHsgZGlzYWJsZWQ6IHRydWUgfSA6IG51bGw7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWNvbHVtblwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1jb2x1bW4tYWxsXCI+XG4gICAgICAgICAgeyF0aGlzLnByb3BzLmNoZWNrZWRBbGxIaWRkZW4gP1xuICAgICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmNoZWNrQWxsSGFuZGxlcn1cbiAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5zdGF0ZS5jaGVja2VkQWxsfVxuICAgICAgICAgICAgICB7Li4uZGlzYWJsZWRQcm9wZXJ0eX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3RoaXMucHJvcHMuYWxsTGFiZWx9XG4gICAgICAgICAgICA8L0NoZWNrYm94PlxuICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPFNlbGVjdGFibGVMaXN0XG4gICAgICAgICAgY2hlY2tlZEFsbD17dGhpcy5wcm9wcy5jaGVja2VkQWxsfVxuICAgICAgICAgIGNoZWNrRGlzYWJsZWQ9e3RoaXMuc3RhdGUuY2hlY2tlZEFsbH1cbiAgICAgICAgICBjaGVja2VkSWRzPXt0aGlzLnByb3BzLmNoZWNrZWRJZHN9XG4gICAgICAgICAgaXRlbXM9e3RoaXMucHJvcHMuZGF0YS5pdGVtc31cbiAgICAgICAgICBpdGVtUmVuZGVyRnVuY3Rpb249e3RoaXMucHJvcHMuaXRlbVJlbmRlckZ1bmN0aW9uID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyV3JhcHBlckZ1bmN0aW9uKHRoaXMucHJvcHMuaW5kZXgpIDogbnVsbH1cbiAgICAgICAgICBzZWxlY3RlZElkPXt0aGlzLnByb3BzLnNlbGVjdGVkSWR9XG4gICAgICAgICAgb25DaGVjaz17dGhpcy5jaGVja0hhbmRsZXJ9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5jbGlja0hhbmRsZXJ9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblZpZXdDb2x1bW4ucHJvcFR5cGVzID0ge1xuICBhbGxMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgY2hlY2tlZElkczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm51bWJlciksXG4gIGNoZWNrZWRBbGw6IFByb3BUeXBlcy5ib29sLFxuICBjaGVja2VkQWxsRGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICBjaGVja2VkQWxsSGlkZGVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgaW5kZXg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgaXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgZGF0YTogUHJvcFR5cGVzLmluc3RhbmNlT2YoQ29sdW1uRGF0YSksXG4gIHNlbGVjdGVkSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHJlZmVyZW5jZUlkczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pKSxcbiAgb25DaGVjazogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2hlY2tBbGw6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cblZpZXdDb2x1bW4uZGVmYXVsdFByb3BzID0ge1xuICBhbGxMYWJlbDogJ0FsbCcsXG4gIGNoZWNrZWRBbGw6IGZhbHNlLFxuICBjaGVja2VkQWxsRGlzYWJsZWQ6IGZhbHNlLFxuICBjaGVja2VkQWxsSGlkZGVuOiBmYWxzZSxcbiAgZGF0YTogbmV3IENvbHVtbkRhdGEoKSxcbiAgaXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxuICBzZWxlY3RlZElkOiBudWxsLFxuICByZWZlcmVuY2VJZHM6IFtdLFxuICBvbkNoZWNrOiAoKSA9PiB7fSxcbiAgb25DaGVja0FsbDogKCkgPT4ge30sXG4gIG9uQ2xpY2s6ICgpID0+IHt9LFxuICBjaGVja2VkSWRzOiBbXSxcbn07XG4iXX0=