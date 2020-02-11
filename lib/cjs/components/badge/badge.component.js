"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactBootstrap = require("react-bootstrap");

require("./badge.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HSBadge =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(HSBadge, _React$PureComponent);

  function HSBadge() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "getClassNames", function (className) {
      return (0, _classnames["default"])('oc-hierarchy-selector-badge', className);
    });

    return _this;
  }

  var _proto = HSBadge.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        other = _objectWithoutPropertiesLoose(_this$props, ["className"]);

    return _react["default"].createElement(_reactBootstrap.Badge, _extends({
      className: this.getClassNames(className)
    }, other), this.props.children);
  };

  return HSBadge;
}(_react["default"].PureComponent);

exports["default"] = HSBadge;
HSBadge.defaultProps = {
  children: null,
  className: ''
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2JhZGdlL2JhZGdlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiSFNCYWRnZSIsImNsYXNzTmFtZSIsInJlbmRlciIsInByb3BzIiwib3RoZXIiLCJnZXRDbGFzc05hbWVzIiwiY2hpbGRyZW4iLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7OztvRUFDSCxVQUFBQyxTQUFTO0FBQUEsYUFDdkIsNEJBQVcsNkJBQVgsRUFBMENBLFNBQTFDLENBRHVCO0FBQUEsSzs7Ozs7OztTQUl6QkMsTSxHQUFBLGtCQUFTO0FBQUEsc0JBQ3lCLEtBQUtDLEtBRDlCO0FBQUEsUUFDQ0YsU0FERCxlQUNDQSxTQUREO0FBQUEsUUFDZUcsS0FEZjs7QUFFUCxXQUNFLGdDQUFDLHFCQUFEO0FBQU8sTUFBQSxTQUFTLEVBQUUsS0FBS0MsYUFBTCxDQUFtQkosU0FBbkI7QUFBbEIsT0FBcURHLEtBQXJELEdBQ0csS0FBS0QsS0FBTCxDQUFXRyxRQURkLENBREY7QUFLRCxHOzs7RUFaa0NDLGtCQUFNQyxhOzs7QUFvQjNDUixPQUFPLENBQUNTLFlBQVIsR0FBdUI7QUFDckJILEVBQUFBLFFBQVEsRUFBRSxJQURXO0FBRXJCTCxFQUFBQSxTQUFTLEVBQUU7QUFGVSxDQUF2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBCYWRnZSB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5cbmltcG9ydCAnLi9iYWRnZS5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFNCYWRnZSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBnZXRDbGFzc05hbWVzID0gY2xhc3NOYW1lID0+IChcbiAgICBjbGFzc25hbWVzKCdvYy1oaWVyYXJjaHktc2VsZWN0b3ItYmFkZ2UnLCBjbGFzc05hbWUpXG4gICk7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2xhc3NOYW1lLCAuLi5vdGhlciB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPEJhZGdlIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKGNsYXNzTmFtZSl9IHsuLi5vdGhlcn0+XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgPC9CYWRnZT5cbiAgICApO1xuICB9XG59XG5cbkhTQmFkZ2UucHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cbkhTQmFkZ2UuZGVmYXVsdFByb3BzID0ge1xuICBjaGlsZHJlbjogbnVsbCxcbiAgY2xhc3NOYW1lOiAnJyxcbn07XG4iXX0=