'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HSPopoverCommonLayout = function (_React$PureComponent) {
  _inherits(HSPopoverCommonLayout, _React$PureComponent);

  function HSPopoverCommonLayout() {
    _classCallCheck(this, HSPopoverCommonLayout);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  HSPopoverCommonLayout.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'oc-hierarchy-selector-popover-layout' },
      this.props.children
    );
  };

  return HSPopoverCommonLayout;
}(_react2.default.PureComponent);

exports.default = HSPopoverCommonLayout;


HSPopoverCommonLayout.defaultProps = {
  children: null
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvbGF5b3V0cy9jb21tb24ubGF5b3V0LmpzeCJdLCJuYW1lcyI6WyJIU1BvcG92ZXJDb21tb25MYXlvdXQiLCJyZW5kZXIiLCJwcm9wcyIsImNoaWxkcmVuIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLHFCOzs7Ozs7Ozs7a0NBQ25CQyxNLHFCQUFTO0FBQ1AsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLHNDQUFmO0FBQ0ksV0FBS0MsS0FBTCxDQUFXQztBQURmLEtBREY7QUFLRCxHOzs7RUFQZ0QsZ0JBQU1DLGE7O2tCQUFwQ0oscUI7OztBQWNyQkEsc0JBQXNCSyxZQUF0QixHQUFxQztBQUNuQ0YsWUFBVTtBQUR5QixDQUFyQyIsImZpbGUiOiJjb21tb24ubGF5b3V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhTUG9wb3ZlckNvbW1vbkxheW91dCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXBvcG92ZXItbGF5b3V0XCI+XG4gICAgICAgIHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkhTUG9wb3ZlckNvbW1vbkxheW91dC5wcm9wVHlwZXMgPSB7XG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbn07XG5cbkhTUG9wb3ZlckNvbW1vbkxheW91dC5kZWZhdWx0UHJvcHMgPSB7XG4gIGNoaWxkcmVuOiBudWxsLFxufTtcbiJdfQ==