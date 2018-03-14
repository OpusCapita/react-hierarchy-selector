var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Badge } from 'react-bootstrap';

import './badge.scss';

var HSBadge = function (_React$PureComponent) {
  _inherits(HSBadge, _React$PureComponent);

  function HSBadge() {
    var _temp, _this, _ret;

    _classCallCheck(this, HSBadge);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.getClassNames = function (className) {
      return classnames('oc-hierarchy-selector-badge', className);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  HSBadge.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        other = _objectWithoutProperties(_props, ['className']);

    return React.createElement(
      Badge,
      _extends({ className: this.getClassNames(className) }, other),
      this.props.children
    );
  };

  return HSBadge;
}(React.PureComponent);

export { HSBadge as default };


HSBadge.defaultProps = {
  children: null,
  className: ''
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2JhZGdlL2JhZGdlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJjbGFzc25hbWVzIiwiQmFkZ2UiLCJIU0JhZGdlIiwiZ2V0Q2xhc3NOYW1lcyIsImNsYXNzTmFtZSIsInJlbmRlciIsInByb3BzIiwib3RoZXIiLCJjaGlsZHJlbiIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsWUFBdkI7QUFDQSxTQUFTQyxLQUFULFFBQXNCLGlCQUF0Qjs7QUFFQSxPQUFPLGNBQVA7O0lBRXFCQyxPOzs7Ozs7Ozs7Ozs7Z0tBQ25CQyxhLEdBQWdCO0FBQUEsYUFDZEgsV0FBVyw2QkFBWCxFQUEwQ0ksU0FBMUMsQ0FEYztBQUFBLEs7OztvQkFJaEJDLE0scUJBQVM7QUFBQSxpQkFDeUIsS0FBS0MsS0FEOUI7QUFBQSxRQUNDRixTQURELFVBQ0NBLFNBREQ7QUFBQSxRQUNlRyxLQURmOztBQUVQLFdBQ0U7QUFBQyxXQUFEO0FBQUEsaUJBQU8sV0FBVyxLQUFLSixhQUFMLENBQW1CQyxTQUFuQixDQUFsQixJQUFxREcsS0FBckQ7QUFDRyxXQUFLRCxLQUFMLENBQVdFO0FBRGQsS0FERjtBQUtELEc7OztFQVprQ1YsTUFBTVcsYTs7U0FBdEJQLE87OztBQW9CckJBLFFBQVFRLFlBQVIsR0FBdUI7QUFDckJGLFlBQVUsSUFEVztBQUVyQkosYUFBVztBQUZVLENBQXZCIiwiZmlsZSI6ImJhZGdlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBCYWRnZSB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5cbmltcG9ydCAnLi9iYWRnZS5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFNCYWRnZSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBnZXRDbGFzc05hbWVzID0gY2xhc3NOYW1lID0+IChcbiAgICBjbGFzc25hbWVzKCdvYy1oaWVyYXJjaHktc2VsZWN0b3ItYmFkZ2UnLCBjbGFzc05hbWUpXG4gICk7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2xhc3NOYW1lLCAuLi5vdGhlciB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPEJhZGdlIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKGNsYXNzTmFtZSl9IHsuLi5vdGhlcn0+XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgPC9CYWRnZT5cbiAgICApO1xuICB9XG59XG5cbkhTQmFkZ2UucHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cbkhTQmFkZ2UuZGVmYXVsdFByb3BzID0ge1xuICBjaGlsZHJlbjogbnVsbCxcbiAgY2xhc3NOYW1lOiAnJyxcbn07XG4iXX0=