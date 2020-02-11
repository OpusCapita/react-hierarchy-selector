function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';

var HierarchySelectorAbstractList =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(HierarchySelectorAbstractList, _React$PureComponent);

  function HierarchySelectorAbstractList() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "onSelect", function () {
      /** Template of onSelect event. It should be overridden in a child component */
      _this.props.onSelectHandler();
    });

    return _this;
  }

  return HierarchySelectorAbstractList;
}(React.PureComponent);

export { HierarchySelectorAbstractList as default };
HierarchySelectorAbstractList.defaultProps = {
  onSelectHandler: function onSelectHandler() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvYWJzdHJhY3QtbGlzdC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiSGllcmFyY2h5U2VsZWN0b3JBYnN0cmFjdExpc3QiLCJwcm9wcyIsIm9uU2VsZWN0SGFuZGxlciIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCOztJQUVxQkMsNkI7Ozs7Ozs7Ozs7Ozs7OytEQUNSLFlBQU07QUFDZjtBQUNBLFlBQUtDLEtBQUwsQ0FBV0MsZUFBWDtBQUNELEs7Ozs7OztFQUp3REosS0FBSyxDQUFDSyxhOztTQUE1Q0gsNkI7QUFXckJBLDZCQUE2QixDQUFDSSxZQUE5QixHQUE2QztBQUMzQ0YsRUFBQUEsZUFBZSxFQUFFLDJCQUFNLENBQUU7QUFEa0IsQ0FBN0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5U2VsZWN0b3JBYnN0cmFjdExpc3QgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgb25TZWxlY3QgPSAoKSA9PiB7XG4gICAgLyoqIFRlbXBsYXRlIG9mIG9uU2VsZWN0IGV2ZW50LiBJdCBzaG91bGQgYmUgb3ZlcnJpZGRlbiBpbiBhIGNoaWxkIGNvbXBvbmVudCAqL1xuICAgIHRoaXMucHJvcHMub25TZWxlY3RIYW5kbGVyKCk7XG4gIH1cbn1cblxuSGllcmFyY2h5U2VsZWN0b3JBYnN0cmFjdExpc3QucHJvcFR5cGVzID0ge1xuICBvblNlbGVjdEhhbmRsZXI6IFByb3BUeXBlcy5mdW5jLFxufTtcblxuSGllcmFyY2h5U2VsZWN0b3JBYnN0cmFjdExpc3QuZGVmYXVsdFByb3BzID0ge1xuICBvblNlbGVjdEhhbmRsZXI6ICgpID0+IHt9LFxufTtcbiJdfQ==