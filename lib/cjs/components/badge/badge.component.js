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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2JhZGdlL2JhZGdlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiSFNCYWRnZSIsImdldENsYXNzTmFtZXMiLCJjbGFzc05hbWUiLCJyZW5kZXIiLCJwcm9wcyIsIm90aGVyIiwiY2hpbGRyZW4iLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7O2dLQUNuQkMsYSxHQUFnQjtBQUFBLGFBQ2QsMEJBQVcsNkJBQVgsRUFBMENDLFNBQTFDLENBRGM7QUFBQSxLOzs7b0JBSWhCQyxNLHFCQUFTO0FBQUEsaUJBQ3lCLEtBQUtDLEtBRDlCO0FBQUEsUUFDQ0YsU0FERCxVQUNDQSxTQUREO0FBQUEsUUFDZUcsS0FEZjs7QUFFUCxXQUNFO0FBQUE7QUFBQSxpQkFBTyxXQUFXLEtBQUtKLGFBQUwsQ0FBbUJDLFNBQW5CLENBQWxCLElBQXFERyxLQUFyRDtBQUNHLFdBQUtELEtBQUwsQ0FBV0U7QUFEZCxLQURGO0FBS0QsRzs7O0VBWmtDLGdCQUFNQyxhOztrQkFBdEJQLE87OztBQW9CckJBLFFBQVFRLFlBQVIsR0FBdUI7QUFDckJGLFlBQVUsSUFEVztBQUVyQkosYUFBVztBQUZVLENBQXZCIiwiZmlsZSI6ImJhZGdlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xyXG5pbXBvcnQgeyBCYWRnZSB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcblxyXG5pbXBvcnQgJy4vYmFkZ2Uuc2Nzcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIU0JhZGdlIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XHJcbiAgZ2V0Q2xhc3NOYW1lcyA9IGNsYXNzTmFtZSA9PiAoXHJcbiAgICBjbGFzc25hbWVzKCdvYy1oaWVyYXJjaHktc2VsZWN0b3ItYmFkZ2UnLCBjbGFzc05hbWUpXHJcbiAgKTtcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBjbGFzc05hbWUsIC4uLm90aGVyIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPEJhZGdlIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWVzKGNsYXNzTmFtZSl9IHsuLi5vdGhlcn0+XHJcbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XHJcbiAgICAgIDwvQmFkZ2U+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuSFNCYWRnZS5wcm9wVHlwZXMgPSB7XHJcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxyXG4gIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcbkhTQmFkZ2UuZGVmYXVsdFByb3BzID0ge1xyXG4gIGNoaWxkcmVuOiBudWxsLFxyXG4gIGNsYXNzTmFtZTogJycsXHJcbn07XHJcbiJdfQ==