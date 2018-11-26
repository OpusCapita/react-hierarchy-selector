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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvZ3JvdXAtbmFtZS9ncm91cC1uYW1lLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiR3JvdXBOYW1lIiwicHJvcHMiLCJjaGFuZ2VIYW5kbGVyIiwiZSIsInNldFN0YXRlIiwiY2hhbmdlZEJ5VXNlciIsInZhbHVlIiwidGFyZ2V0Iiwib25DaGFuZ2UiLCJzdGF0ZSIsImluaXRpYWxWYWx1ZSIsInRyaW0iLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwibmV3VmFsdWUiLCJyZW5kZXIiLCJsYWJlbCIsInBsYWNlSG9sZGVyIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7Ozs7Ozs7OztJQUVxQkEsUzs7O0FBQ25CLHFCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLGdDQUFNQSxLQUFOLENBRGlCOztBQUFBLFVBaUJuQkMsYUFqQm1CLEdBaUJILFVBQUNDLENBQUQsRUFBTztBQUNyQixZQUFLQyxRQUFMLENBQWM7QUFDWkMsdUJBQWUsSUFESDtBQUVaQyxlQUFPSCxFQUFFSSxNQUFGLENBQVNEO0FBRkosT0FBZDtBQUlBLFlBQUtMLEtBQUwsQ0FBV08sUUFBWCxDQUFvQkwsRUFBRUksTUFBRixDQUFTRCxLQUE3QjtBQUNELEtBdkJrQjs7QUFFakIsVUFBS0csS0FBTCxHQUFhO0FBQ1hKLHFCQUFlSixNQUFNUyxZQUFOLENBQW1CQyxJQUFuQixPQUE4QixFQURsQztBQUVYTCxhQUFPTCxNQUFNUztBQUZGLEtBQWI7QUFGaUI7QUFNbEI7O3NCQUVERSx5QixzQ0FBMEJDLFMsRUFBVztBQUNuQyxRQUFJLENBQUMsS0FBS0osS0FBTCxDQUFXSixhQUFoQixFQUErQjtBQUM3QixVQUFNUyxXQUFXRCxVQUFVSCxZQUEzQjtBQUNBLFdBQUtOLFFBQUwsQ0FBYztBQUNaRSxlQUFPUTtBQURLLE9BQWQ7QUFHRDtBQUNGLEc7O3NCQVVEQyxNLHFCQUFTO0FBQ1AsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLDBDQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQUksYUFBS2QsS0FBTCxDQUFXZTtBQUFmLE9BREY7QUFFRSxvQ0FBQywyQkFBRDtBQUNFLGNBQUssTUFEUDtBQUVFLHFCQUFhLEtBQUtmLEtBQUwsQ0FBV2dCLFdBRjFCO0FBR0Usa0JBQVUsS0FBS2YsYUFIakI7QUFJRSxlQUFPLEtBQUtPLEtBQUwsQ0FBV0g7QUFKcEI7QUFGRixLQURGO0FBV0QsRzs7O0VBdENvQ1ksZ0JBQU1DLGE7O2tCQUF4Qm5CLFM7OztBQWdEckJBLFVBQVVvQixZQUFWLEdBQXlCO0FBQ3ZCSixTQUFPLFlBRGdCO0FBRXZCQyxlQUFhLDJCQUZVO0FBR3ZCUCxnQkFBYyxFQUhTO0FBSXZCRixZQUFVLG9CQUFNLENBQUU7QUFKSyxDQUF6QiIsImZpbGUiOiJncm91cC1uYW1lLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuXG5pbXBvcnQgJy4vZ3JvdXAtbmFtZS5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JvdXBOYW1lIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjaGFuZ2VkQnlVc2VyOiBwcm9wcy5pbml0aWFsVmFsdWUudHJpbSgpICE9PSAnJyxcbiAgICAgIHZhbHVlOiBwcm9wcy5pbml0aWFsVmFsdWUsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLmNoYW5nZWRCeVVzZXIpIHtcbiAgICAgIGNvbnN0IG5ld1ZhbHVlID0gbmV4dFByb3BzLmluaXRpYWxWYWx1ZTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB2YWx1ZTogbmV3VmFsdWUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjaGFuZ2VIYW5kbGVyID0gKGUpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNoYW5nZWRCeVVzZXI6IHRydWUsXG4gICAgICB2YWx1ZTogZS50YXJnZXQudmFsdWUsXG4gICAgfSk7XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShlLnRhcmdldC52YWx1ZSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLWdyb3VwLW5hbWUtd3JhcHBlclwiPlxuICAgICAgICA8cD57dGhpcy5wcm9wcy5sYWJlbH08L3A+XG4gICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBwbGFjZWhvbGRlcj17dGhpcy5wcm9wcy5wbGFjZUhvbGRlcn1cbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5jaGFuZ2VIYW5kbGVyfVxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Hcm91cE5hbWUucHJvcFR5cGVzID0ge1xuICBsYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgcGxhY2VIb2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGluaXRpYWxWYWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxufTtcblxuR3JvdXBOYW1lLmRlZmF1bHRQcm9wcyA9IHtcbiAgbGFiZWw6ICdHcm91cCBuYW1lJyxcbiAgcGxhY2VIb2xkZXI6ICdQbGVhc2UsIGZpbGwgYSBncm91cCBuYW1lJyxcbiAgaW5pdGlhbFZhbHVlOiAnJyxcbiAgb25DaGFuZ2U6ICgpID0+IHt9LFxufTtcbiJdfQ==