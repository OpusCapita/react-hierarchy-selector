function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

var HierarchySelectorAbstractList = function (_React$PureComponent) {
  _inherits(HierarchySelectorAbstractList, _React$PureComponent);

  function HierarchySelectorAbstractList() {
    var _temp, _this, _ret;

    _classCallCheck(this, HierarchySelectorAbstractList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.onSelect = function () {
      /** Template of onSelect event. It should be overridden in a child component */
      _this.props.onSelectHandler();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return HierarchySelectorAbstractList;
}(React.PureComponent);

export { HierarchySelectorAbstractList as default };


HierarchySelectorAbstractList.defaultProps = {
  onSelectHandler: function onSelectHandler() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvYWJzdHJhY3QtbGlzdC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiSGllcmFyY2h5U2VsZWN0b3JBYnN0cmFjdExpc3QiLCJvblNlbGVjdCIsInByb3BzIiwib25TZWxlY3RIYW5kbGVyIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7O0lBRXFCQyw2Qjs7Ozs7Ozs7Ozs7O2dLQUNuQkMsUSxHQUFXLFlBQU07QUFDZjtBQUNBLFlBQUtDLEtBQUwsQ0FBV0MsZUFBWDtBQUNELEs7Ozs7RUFKd0RMLE1BQU1NLGE7O1NBQTVDSiw2Qjs7O0FBV3JCQSw4QkFBOEJLLFlBQTlCLEdBQTZDO0FBQzNDRixtQkFBaUIsMkJBQU0sQ0FBRTtBQURrQixDQUE3QyIsImZpbGUiOiJhYnN0cmFjdC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlTZWxlY3RvckFic3RyYWN0TGlzdCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBvblNlbGVjdCA9ICgpID0+IHtcbiAgICAvKiogVGVtcGxhdGUgb2Ygb25TZWxlY3QgZXZlbnQuIEl0IHNob3VsZCBiZSBvdmVycmlkZGVuIGluIGEgY2hpbGQgY29tcG9uZW50ICovXG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdEhhbmRsZXIoKTtcbiAgfVxufVxuXG5IaWVyYXJjaHlTZWxlY3RvckFic3RyYWN0TGlzdC5wcm9wVHlwZXMgPSB7XG4gIG9uU2VsZWN0SGFuZGxlcjogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5IaWVyYXJjaHlTZWxlY3RvckFic3RyYWN0TGlzdC5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uU2VsZWN0SGFuZGxlcjogKCkgPT4ge30sXG59O1xuIl19