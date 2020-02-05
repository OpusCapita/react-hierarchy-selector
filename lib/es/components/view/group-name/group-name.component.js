function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';
import './group-name.scss';

var GroupName =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(GroupName, _React$PureComponent);

  function GroupName(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "changeHandler", function (e) {
      _this.setState({
        changedByUser: true,
        value: e.target.value
      });

      _this.props.onChange(e.target.value);
    });

    _this.state = {
      changedByUser: props.initialValue.trim() !== '',
      value: props.initialValue
    };
    return _this;
  }

  var _proto = GroupName.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (!this.state.changedByUser) {
      var newValue = nextProps.initialValue;
      this.setState({
        value: newValue
      });
    }
  };

  _proto.render = function render() {
    return React.createElement("div", {
      className: "oc-hierarchy-selector-group-name-wrapper"
    }, React.createElement("p", null, this.props.label), React.createElement(FormControl, {
      type: "text",
      placeholder: this.props.placeHolder,
      onChange: this.changeHandler,
      value: this.state.value
    }));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvZ3JvdXAtbmFtZS9ncm91cC1uYW1lLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJGb3JtQ29udHJvbCIsIkdyb3VwTmFtZSIsInByb3BzIiwiZSIsInNldFN0YXRlIiwiY2hhbmdlZEJ5VXNlciIsInZhbHVlIiwidGFyZ2V0Iiwib25DaGFuZ2UiLCJzdGF0ZSIsImluaXRpYWxWYWx1ZSIsInRyaW0iLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwibmV3VmFsdWUiLCJyZW5kZXIiLCJsYWJlbCIsInBsYWNlSG9sZGVyIiwiY2hhbmdlSGFuZGxlciIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsV0FBVCxRQUE0QixpQkFBNUI7QUFFQSxPQUFPLG1CQUFQOztJQUVxQkMsUzs7Ozs7QUFDbkIscUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFDakIsNENBQU1BLEtBQU47O0FBRGlCLG9FQWlCSCxVQUFDQyxDQUFELEVBQU87QUFDckIsWUFBS0MsUUFBTCxDQUFjO0FBQ1pDLFFBQUFBLGFBQWEsRUFBRSxJQURIO0FBRVpDLFFBQUFBLEtBQUssRUFBRUgsQ0FBQyxDQUFDSSxNQUFGLENBQVNEO0FBRkosT0FBZDs7QUFJQSxZQUFLSixLQUFMLENBQVdNLFFBQVgsQ0FBb0JMLENBQUMsQ0FBQ0ksTUFBRixDQUFTRCxLQUE3QjtBQUNELEtBdkJrQjs7QUFFakIsVUFBS0csS0FBTCxHQUFhO0FBQ1hKLE1BQUFBLGFBQWEsRUFBRUgsS0FBSyxDQUFDUSxZQUFOLENBQW1CQyxJQUFuQixPQUE4QixFQURsQztBQUVYTCxNQUFBQSxLQUFLLEVBQUVKLEtBQUssQ0FBQ1E7QUFGRixLQUFiO0FBRmlCO0FBTWxCOzs7O1NBRURFLHlCLEdBQUEsbUNBQTBCQyxTQUExQixFQUFxQztBQUNuQyxRQUFJLENBQUMsS0FBS0osS0FBTCxDQUFXSixhQUFoQixFQUErQjtBQUM3QixVQUFNUyxRQUFRLEdBQUdELFNBQVMsQ0FBQ0gsWUFBM0I7QUFDQSxXQUFLTixRQUFMLENBQWM7QUFDWkUsUUFBQUEsS0FBSyxFQUFFUTtBQURLLE9BQWQ7QUFHRDtBQUNGLEc7O1NBVURDLE0sR0FBQSxrQkFBUztBQUNQLFdBQ0U7QUFBSyxNQUFBLFNBQVMsRUFBQztBQUFmLE9BQ0UsK0JBQUksS0FBS2IsS0FBTCxDQUFXYyxLQUFmLENBREYsRUFFRSxvQkFBQyxXQUFEO0FBQ0UsTUFBQSxJQUFJLEVBQUMsTUFEUDtBQUVFLE1BQUEsV0FBVyxFQUFFLEtBQUtkLEtBQUwsQ0FBV2UsV0FGMUI7QUFHRSxNQUFBLFFBQVEsRUFBRSxLQUFLQyxhQUhqQjtBQUlFLE1BQUEsS0FBSyxFQUFFLEtBQUtULEtBQUwsQ0FBV0g7QUFKcEIsTUFGRixDQURGO0FBV0QsRzs7O0VBdENvQ1IsS0FBSyxDQUFDcUIsYTs7U0FBeEJsQixTO0FBZ0RyQkEsU0FBUyxDQUFDbUIsWUFBVixHQUF5QjtBQUN2QkosRUFBQUEsS0FBSyxFQUFFLFlBRGdCO0FBRXZCQyxFQUFBQSxXQUFXLEVBQUUsMkJBRlU7QUFHdkJQLEVBQUFBLFlBQVksRUFBRSxFQUhTO0FBSXZCRixFQUFBQSxRQUFRLEVBQUUsb0JBQU0sQ0FBRTtBQUpLLENBQXpCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5cbmltcG9ydCAnLi9ncm91cC1uYW1lLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcm91cE5hbWUgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNoYW5nZWRCeVVzZXI6IHByb3BzLmluaXRpYWxWYWx1ZS50cmltKCkgIT09ICcnLFxuICAgICAgdmFsdWU6IHByb3BzLmluaXRpYWxWYWx1ZSxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAoIXRoaXMuc3RhdGUuY2hhbmdlZEJ5VXNlcikge1xuICAgICAgY29uc3QgbmV3VmFsdWUgPSBuZXh0UHJvcHMuaW5pdGlhbFZhbHVlO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHZhbHVlOiBuZXdWYWx1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNoYW5nZUhhbmRsZXIgPSAoZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY2hhbmdlZEJ5VXNlcjogdHJ1ZSxcbiAgICAgIHZhbHVlOiBlLnRhcmdldC52YWx1ZSxcbiAgICB9KTtcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItZ3JvdXAtbmFtZS13cmFwcGVyXCI+XG4gICAgICAgIDxwPnt0aGlzLnByb3BzLmxhYmVsfTwvcD5cbiAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPXt0aGlzLnByb3BzLnBsYWNlSG9sZGVyfVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmNoYW5nZUhhbmRsZXJ9XG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkdyb3VwTmFtZS5wcm9wVHlwZXMgPSB7XG4gIGxhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBwbGFjZUhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgaW5pdGlhbFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5Hcm91cE5hbWUuZGVmYXVsdFByb3BzID0ge1xuICBsYWJlbDogJ0dyb3VwIG5hbWUnLFxuICBwbGFjZUhvbGRlcjogJ1BsZWFzZSwgZmlsbCBhIGdyb3VwIG5hbWUnLFxuICBpbml0aWFsVmFsdWU6ICcnLFxuICBvbkNoYW5nZTogKCkgPT4ge30sXG59O1xuIl19