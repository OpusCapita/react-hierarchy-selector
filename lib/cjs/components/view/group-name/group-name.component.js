'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

require('./group-name.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GroupName = function (_React$PureComponent) {
  _inherits(GroupName, _React$PureComponent);

  function GroupName(props) {
    _classCallCheck(this, GroupName);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.changeHandler = function (e) {
      _this.setState({
        changedByUser: true,
        value: e.target.value
      });
      _this.props.onChange(e.target.value);
    };

    _this.state = {
      changedByUser: props.initialValue.trim() !== '',
      value: props.initialValue
    };
    return _this;
  }

  GroupName.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (!this.state.changedByUser) {
      var newValue = nextProps.initialValue;
      this.setState({
        value: newValue
      });
    }
  };

  GroupName.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'oc-hierarchy-selector-group-name-wrapper' },
      _react2.default.createElement(
        'p',
        null,
        this.props.label
      ),
      _react2.default.createElement(_reactBootstrap.FormControl, {
        type: 'text',
        placeholder: this.props.placeHolder,
        onChange: this.changeHandler,
        value: this.state.value
      })
    );
  };

  return GroupName;
}(_react2.default.PureComponent);

exports.default = GroupName;


GroupName.defaultProps = {
  label: 'Group name',
  placeHolder: 'Please, fill a group name',
  initialValue: '',
  onChange: function onChange() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvZ3JvdXAtbmFtZS9ncm91cC1uYW1lLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiR3JvdXBOYW1lIiwicHJvcHMiLCJjaGFuZ2VIYW5kbGVyIiwiZSIsInNldFN0YXRlIiwiY2hhbmdlZEJ5VXNlciIsInZhbHVlIiwidGFyZ2V0Iiwib25DaGFuZ2UiLCJzdGF0ZSIsImluaXRpYWxWYWx1ZSIsInRyaW0iLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwibmV3VmFsdWUiLCJyZW5kZXIiLCJsYWJlbCIsInBsYWNlSG9sZGVyIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7SUFFcUJBLFM7OztBQUNuQixxQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQSxVQWlCbkJDLGFBakJtQixHQWlCSCxVQUFDQyxDQUFELEVBQU87QUFDckIsWUFBS0MsUUFBTCxDQUFjO0FBQ1pDLHVCQUFlLElBREg7QUFFWkMsZUFBT0gsRUFBRUksTUFBRixDQUFTRDtBQUZKLE9BQWQ7QUFJQSxZQUFLTCxLQUFMLENBQVdPLFFBQVgsQ0FBb0JMLEVBQUVJLE1BQUYsQ0FBU0QsS0FBN0I7QUFDRCxLQXZCa0I7O0FBRWpCLFVBQUtHLEtBQUwsR0FBYTtBQUNYSixxQkFBZUosTUFBTVMsWUFBTixDQUFtQkMsSUFBbkIsT0FBOEIsRUFEbEM7QUFFWEwsYUFBT0wsTUFBTVM7QUFGRixLQUFiO0FBRmlCO0FBTWxCOztzQkFFREUseUIsc0NBQTBCQyxTLEVBQVc7QUFDbkMsUUFBSSxDQUFDLEtBQUtKLEtBQUwsQ0FBV0osYUFBaEIsRUFBK0I7QUFDN0IsVUFBTVMsV0FBV0QsVUFBVUgsWUFBM0I7QUFDQSxXQUFLTixRQUFMLENBQWM7QUFDWkUsZUFBT1E7QUFESyxPQUFkO0FBR0Q7QUFDRixHOztzQkFVREMsTSxxQkFBUztBQUNQLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSwwQ0FBZjtBQUNFO0FBQUE7QUFBQTtBQUFJLGFBQUtkLEtBQUwsQ0FBV2U7QUFBZixPQURGO0FBRUU7QUFDRSxjQUFLLE1BRFA7QUFFRSxxQkFBYSxLQUFLZixLQUFMLENBQVdnQixXQUYxQjtBQUdFLGtCQUFVLEtBQUtmLGFBSGpCO0FBSUUsZUFBTyxLQUFLTyxLQUFMLENBQVdIO0FBSnBCO0FBRkYsS0FERjtBQVdELEc7OztFQXRDb0MsZ0JBQU1ZLGE7O2tCQUF4QmxCLFM7OztBQWdEckJBLFVBQVVtQixZQUFWLEdBQXlCO0FBQ3ZCSCxTQUFPLFlBRGdCO0FBRXZCQyxlQUFhLDJCQUZVO0FBR3ZCUCxnQkFBYyxFQUhTO0FBSXZCRixZQUFVLG9CQUFNLENBQUU7QUFKSyxDQUF6QiIsImZpbGUiOiJncm91cC1uYW1lLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuXHJcbmltcG9ydCAnLi9ncm91cC1uYW1lLnNjc3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JvdXBOYW1lIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGNoYW5nZWRCeVVzZXI6IHByb3BzLmluaXRpYWxWYWx1ZS50cmltKCkgIT09ICcnLFxyXG4gICAgICB2YWx1ZTogcHJvcHMuaW5pdGlhbFZhbHVlLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XHJcbiAgICBpZiAoIXRoaXMuc3RhdGUuY2hhbmdlZEJ5VXNlcikge1xyXG4gICAgICBjb25zdCBuZXdWYWx1ZSA9IG5leHRQcm9wcy5pbml0aWFsVmFsdWU7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIHZhbHVlOiBuZXdWYWx1ZSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VIYW5kbGVyID0gKGUpID0+IHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBjaGFuZ2VkQnlVc2VyOiB0cnVlLFxyXG4gICAgICB2YWx1ZTogZS50YXJnZXQudmFsdWUsXHJcbiAgICB9KTtcclxuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoZS50YXJnZXQudmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItZ3JvdXAtbmFtZS13cmFwcGVyXCI+XHJcbiAgICAgICAgPHA+e3RoaXMucHJvcHMubGFiZWx9PC9wPlxyXG4gICAgICAgIDxGb3JtQ29udHJvbFxyXG4gICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3RoaXMucHJvcHMucGxhY2VIb2xkZXJ9XHJcbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5jaGFuZ2VIYW5kbGVyfVxyXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuR3JvdXBOYW1lLnByb3BUeXBlcyA9IHtcclxuICBsYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICBwbGFjZUhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcclxuICBpbml0aWFsVmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxyXG59O1xyXG5cclxuR3JvdXBOYW1lLmRlZmF1bHRQcm9wcyA9IHtcclxuICBsYWJlbDogJ0dyb3VwIG5hbWUnLFxyXG4gIHBsYWNlSG9sZGVyOiAnUGxlYXNlLCBmaWxsIGEgZ3JvdXAgbmFtZScsXHJcbiAgaW5pdGlhbFZhbHVlOiAnJyxcclxuICBvbkNoYW5nZTogKCkgPT4ge30sXHJcbn07XHJcbiJdfQ==