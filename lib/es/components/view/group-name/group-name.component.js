function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

import './group-name.scss';

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
    return React.createElement(
      'div',
      { className: 'oc-hierarchy-selector-group-name-wrapper' },
      React.createElement(
        'p',
        null,
        this.props.label
      ),
      React.createElement(FormControl, {
        type: 'text',
        placeholder: this.props.placeHolder,
        onChange: this.changeHandler,
        value: this.state.value
      })
    );
  };

  return GroupName;
}(React.PureComponent);

export { GroupName as default };


GroupName.defaultProps = {
  label: 'Group name',
  placeHolder: 'Please, fill a group name',
  initialValue: '',
  onChange: function onChange() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvZ3JvdXAtbmFtZS9ncm91cC1uYW1lLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJGb3JtQ29udHJvbCIsIkdyb3VwTmFtZSIsInByb3BzIiwiY2hhbmdlSGFuZGxlciIsImUiLCJzZXRTdGF0ZSIsImNoYW5nZWRCeVVzZXIiLCJ2YWx1ZSIsInRhcmdldCIsIm9uQ2hhbmdlIiwic3RhdGUiLCJpbml0aWFsVmFsdWUiLCJ0cmltIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsIm5ld1ZhbHVlIiwicmVuZGVyIiwibGFiZWwiLCJwbGFjZUhvbGRlciIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsV0FBVCxRQUE0QixpQkFBNUI7O0FBRUEsT0FBTyxtQkFBUDs7SUFFcUJDLFM7OztBQUNuQixxQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQSxVQWlCbkJDLGFBakJtQixHQWlCSCxVQUFDQyxDQUFELEVBQU87QUFDckIsWUFBS0MsUUFBTCxDQUFjO0FBQ1pDLHVCQUFlLElBREg7QUFFWkMsZUFBT0gsRUFBRUksTUFBRixDQUFTRDtBQUZKLE9BQWQ7QUFJQSxZQUFLTCxLQUFMLENBQVdPLFFBQVgsQ0FBb0JMLEVBQUVJLE1BQUYsQ0FBU0QsS0FBN0I7QUFDRCxLQXZCa0I7O0FBRWpCLFVBQUtHLEtBQUwsR0FBYTtBQUNYSixxQkFBZUosTUFBTVMsWUFBTixDQUFtQkMsSUFBbkIsT0FBOEIsRUFEbEM7QUFFWEwsYUFBT0wsTUFBTVM7QUFGRixLQUFiO0FBRmlCO0FBTWxCOztzQkFFREUseUIsc0NBQTBCQyxTLEVBQVc7QUFDbkMsUUFBSSxDQUFDLEtBQUtKLEtBQUwsQ0FBV0osYUFBaEIsRUFBK0I7QUFDN0IsVUFBTVMsV0FBV0QsVUFBVUgsWUFBM0I7QUFDQSxXQUFLTixRQUFMLENBQWM7QUFDWkUsZUFBT1E7QUFESyxPQUFkO0FBR0Q7QUFDRixHOztzQkFVREMsTSxxQkFBUztBQUNQLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSwwQ0FBZjtBQUNFO0FBQUE7QUFBQTtBQUFJLGFBQUtkLEtBQUwsQ0FBV2U7QUFBZixPQURGO0FBRUUsMEJBQUMsV0FBRDtBQUNFLGNBQUssTUFEUDtBQUVFLHFCQUFhLEtBQUtmLEtBQUwsQ0FBV2dCLFdBRjFCO0FBR0Usa0JBQVUsS0FBS2YsYUFIakI7QUFJRSxlQUFPLEtBQUtPLEtBQUwsQ0FBV0g7QUFKcEI7QUFGRixLQURGO0FBV0QsRzs7O0VBdENvQ1QsTUFBTXFCLGE7O1NBQXhCbEIsUzs7O0FBZ0RyQkEsVUFBVW1CLFlBQVYsR0FBeUI7QUFDdkJILFNBQU8sWUFEZ0I7QUFFdkJDLGVBQWEsMkJBRlU7QUFHdkJQLGdCQUFjLEVBSFM7QUFJdkJGLFlBQVUsb0JBQU0sQ0FBRTtBQUpLLENBQXpCIiwiZmlsZSI6Imdyb3VwLW5hbWUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5cclxuaW1wb3J0ICcuL2dyb3VwLW5hbWUuc2Nzcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcm91cE5hbWUgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgY2hhbmdlZEJ5VXNlcjogcHJvcHMuaW5pdGlhbFZhbHVlLnRyaW0oKSAhPT0gJycsXHJcbiAgICAgIHZhbHVlOiBwcm9wcy5pbml0aWFsVmFsdWUsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgIGlmICghdGhpcy5zdGF0ZS5jaGFuZ2VkQnlVc2VyKSB7XHJcbiAgICAgIGNvbnN0IG5ld1ZhbHVlID0gbmV4dFByb3BzLmluaXRpYWxWYWx1ZTtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgdmFsdWU6IG5ld1ZhbHVlLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoYW5nZUhhbmRsZXIgPSAoZSkgPT4ge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGNoYW5nZWRCeVVzZXI6IHRydWUsXHJcbiAgICAgIHZhbHVlOiBlLnRhcmdldC52YWx1ZSxcclxuICAgIH0pO1xyXG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShlLnRhcmdldC52YWx1ZSk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1ncm91cC1uYW1lLXdyYXBwZXJcIj5cclxuICAgICAgICA8cD57dGhpcy5wcm9wcy5sYWJlbH08L3A+XHJcbiAgICAgICAgPEZvcm1Db250cm9sXHJcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICBwbGFjZWhvbGRlcj17dGhpcy5wcm9wcy5wbGFjZUhvbGRlcn1cclxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmNoYW5nZUhhbmRsZXJ9XHJcbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5Hcm91cE5hbWUucHJvcFR5cGVzID0ge1xyXG4gIGxhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG4gIHBsYWNlSG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIGluaXRpYWxWYWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXHJcbn07XHJcblxyXG5Hcm91cE5hbWUuZGVmYXVsdFByb3BzID0ge1xyXG4gIGxhYmVsOiAnR3JvdXAgbmFtZScsXHJcbiAgcGxhY2VIb2xkZXI6ICdQbGVhc2UsIGZpbGwgYSBncm91cCBuYW1lJyxcclxuICBpbml0aWFsVmFsdWU6ICcnLFxyXG4gIG9uQ2hhbmdlOiAoKSA9PiB7fSxcclxufTtcclxuIl19