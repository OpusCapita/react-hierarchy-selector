'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactBootstrap = require('react-bootstrap');

require('./badge.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HSBadge = function (_React$PureComponent) {
  _inherits(HSBadge, _React$PureComponent);

  function HSBadge() {
    var _temp, _this, _ret;

    _classCallCheck(this, HSBadge);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.getClassNames = function (className) {
      return (0, _classnames2.default)('oc-hierarchy-selector-badge', className);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  HSBadge.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        other = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      _reactBootstrap.Badge,
      _extends({ className: this.getClassNames(className) }, other),
      this.props.children
    );
  };

  return HSBadge;
}(_react2.default.PureComponent);

exports.default = HSBadge;


HSBadge.defaultProps = {
  children: null,
  className: ''
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2JhZGdlL2JhZGdlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiSFNCYWRnZSIsImdldENsYXNzTmFtZXMiLCJjbGFzc05hbWUiLCJyZW5kZXIiLCJwcm9wcyIsIm90aGVyIiwiY2hpbGRyZW4iLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Z0tBQ25CQyxhLEdBQWdCO0FBQUEsYUFDZCwwQkFBVyw2QkFBWCxFQUEwQ0MsU0FBMUMsQ0FEYztBQUFBLEs7OztvQkFJaEJDLE0scUJBQVM7QUFBQSxpQkFDeUIsS0FBS0MsS0FEOUI7QUFBQSxRQUNDRixTQURELFVBQ0NBLFNBREQ7QUFBQSxRQUNlRyxLQURmOztBQUVQLFdBQ0U7QUFBQywyQkFBRDtBQUFBLGlCQUFPLFdBQVcsS0FBS0osYUFBTCxDQUFtQkMsU0FBbkIsQ0FBbEIsSUFBcURHLEtBQXJEO0FBQ0csV0FBS0QsS0FBTCxDQUFXRTtBQURkLEtBREY7QUFLRCxHOzs7RUFaa0NDLGdCQUFNQyxhOztrQkFBdEJSLE87OztBQW9CckJBLFFBQVFTLFlBQVIsR0FBdUI7QUFDckJILFlBQVUsSUFEVztBQUVyQkosYUFBVztBQUZVLENBQXZCIiwiZmlsZSI6ImJhZGdlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBCYWRnZSB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5cbmltcG9ydCAnLi9iYWRnZS5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFNCYWRnZSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBnZXRDbGFzc05hbWVzID0gY2xhc3NOYW1lID0+IChcbiAgICBjbGFzc25hbWVzKCdvYy1oaWVyYXJjaHktc2VsZWN0b3ItYmFkZ2UnLCBjbGFzc05hbWUpXG4gICk7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2xhc3NOYW1lLCAuLi5vdGhlciB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPEJhZGdlIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKGNsYXNzTmFtZSl9IHsuLi5vdGhlcn0+XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgPC9CYWRnZT5cbiAgICApO1xuICB9XG59XG5cbkhTQmFkZ2UucHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cbkhTQmFkZ2UuZGVmYXVsdFByb3BzID0ge1xuICBjaGlsZHJlbjogbnVsbCxcbiAgY2xhc3NOYW1lOiAnJyxcbn07XG4iXX0=