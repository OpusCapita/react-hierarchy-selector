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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvZ3JvdXAtbmFtZS9ncm91cC1uYW1lLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJGb3JtQ29udHJvbCIsIkdyb3VwTmFtZSIsInByb3BzIiwiY2hhbmdlSGFuZGxlciIsImUiLCJzZXRTdGF0ZSIsImNoYW5nZWRCeVVzZXIiLCJ2YWx1ZSIsInRhcmdldCIsIm9uQ2hhbmdlIiwic3RhdGUiLCJpbml0aWFsVmFsdWUiLCJ0cmltIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsIm5ld1ZhbHVlIiwicmVuZGVyIiwibGFiZWwiLCJwbGFjZUhvbGRlciIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsV0FBVCxRQUE0QixpQkFBNUI7O0FBRUEsT0FBTyxtQkFBUDs7SUFFcUJDLFM7OztBQUNuQixxQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQSxVQWlCbkJDLGFBakJtQixHQWlCSCxVQUFDQyxDQUFELEVBQU87QUFDckIsWUFBS0MsUUFBTCxDQUFjO0FBQ1pDLHVCQUFlLElBREg7QUFFWkMsZUFBT0gsRUFBRUksTUFBRixDQUFTRDtBQUZKLE9BQWQ7QUFJQSxZQUFLTCxLQUFMLENBQVdPLFFBQVgsQ0FBb0JMLEVBQUVJLE1BQUYsQ0FBU0QsS0FBN0I7QUFDRCxLQXZCa0I7O0FBRWpCLFVBQUtHLEtBQUwsR0FBYTtBQUNYSixxQkFBZUosTUFBTVMsWUFBTixDQUFtQkMsSUFBbkIsT0FBOEIsRUFEbEM7QUFFWEwsYUFBT0wsTUFBTVM7QUFGRixLQUFiO0FBRmlCO0FBTWxCOztzQkFFREUseUIsc0NBQTBCQyxTLEVBQVc7QUFDbkMsUUFBSSxDQUFDLEtBQUtKLEtBQUwsQ0FBV0osYUFBaEIsRUFBK0I7QUFDN0IsVUFBTVMsV0FBV0QsVUFBVUgsWUFBM0I7QUFDQSxXQUFLTixRQUFMLENBQWM7QUFDWkUsZUFBT1E7QUFESyxPQUFkO0FBR0Q7QUFDRixHOztzQkFVREMsTSxxQkFBUztBQUNQLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSwwQ0FBZjtBQUNFO0FBQUE7QUFBQTtBQUFJLGFBQUtkLEtBQUwsQ0FBV2U7QUFBZixPQURGO0FBRUUsMEJBQUMsV0FBRDtBQUNFLGNBQUssTUFEUDtBQUVFLHFCQUFhLEtBQUtmLEtBQUwsQ0FBV2dCLFdBRjFCO0FBR0Usa0JBQVUsS0FBS2YsYUFIakI7QUFJRSxlQUFPLEtBQUtPLEtBQUwsQ0FBV0g7QUFKcEI7QUFGRixLQURGO0FBV0QsRzs7O0VBdENvQ1QsTUFBTXFCLGE7O1NBQXhCbEIsUzs7O0FBZ0RyQkEsVUFBVW1CLFlBQVYsR0FBeUI7QUFDdkJILFNBQU8sWUFEZ0I7QUFFdkJDLGVBQWEsMkJBRlU7QUFHdkJQLGdCQUFjLEVBSFM7QUFJdkJGLFlBQVUsb0JBQU0sQ0FBRTtBQUpLLENBQXpCIiwiZmlsZSI6Imdyb3VwLW5hbWUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5cbmltcG9ydCAnLi9ncm91cC1uYW1lLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcm91cE5hbWUgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNoYW5nZWRCeVVzZXI6IHByb3BzLmluaXRpYWxWYWx1ZS50cmltKCkgIT09ICcnLFxuICAgICAgdmFsdWU6IHByb3BzLmluaXRpYWxWYWx1ZSxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAoIXRoaXMuc3RhdGUuY2hhbmdlZEJ5VXNlcikge1xuICAgICAgY29uc3QgbmV3VmFsdWUgPSBuZXh0UHJvcHMuaW5pdGlhbFZhbHVlO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHZhbHVlOiBuZXdWYWx1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNoYW5nZUhhbmRsZXIgPSAoZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY2hhbmdlZEJ5VXNlcjogdHJ1ZSxcbiAgICAgIHZhbHVlOiBlLnRhcmdldC52YWx1ZSxcbiAgICB9KTtcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItZ3JvdXAtbmFtZS13cmFwcGVyXCI+XG4gICAgICAgIDxwPnt0aGlzLnByb3BzLmxhYmVsfTwvcD5cbiAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPXt0aGlzLnByb3BzLnBsYWNlSG9sZGVyfVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmNoYW5nZUhhbmRsZXJ9XG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkdyb3VwTmFtZS5wcm9wVHlwZXMgPSB7XG4gIGxhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBwbGFjZUhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgaW5pdGlhbFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5Hcm91cE5hbWUuZGVmYXVsdFByb3BzID0ge1xuICBsYWJlbDogJ0dyb3VwIG5hbWUnLFxuICBwbGFjZUhvbGRlcjogJ1BsZWFzZSwgZmlsbCBhIGdyb3VwIG5hbWUnLFxuICBpbml0aWFsVmFsdWU6ICcnLFxuICBvbkNoYW5nZTogKCkgPT4ge30sXG59O1xuIl19