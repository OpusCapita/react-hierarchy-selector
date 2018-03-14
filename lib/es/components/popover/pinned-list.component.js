function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

import HierarchySelectorAbstractList from './abstract-list.component';

var HierarchySelectorPinnedList = function (_HierarchySelectorAbs) {
  _inherits(HierarchySelectorPinnedList, _HierarchySelectorAbs);

  function HierarchySelectorPinnedList() {
    _classCallCheck(this, HierarchySelectorPinnedList);

    return _possibleConstructorReturn(this, _HierarchySelectorAbs.apply(this, arguments));
  }

  HierarchySelectorPinnedList.prototype.render = function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'p',
        { className: 'list-group-header' },
        this.props.pinnedGroupLabel
      )
    );
  };

  return HierarchySelectorPinnedList;
}(HierarchySelectorAbstractList);

export { HierarchySelectorPinnedList as default };


HierarchySelectorPinnedList.propTypes = {
  pinnedGroupLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

HierarchySelectorPinnedList.defaultProps = {
  pinnedGroupLabel: 'Pinned items'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvcGlubmVkLWxpc3QuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIkhpZXJhcmNoeVNlbGVjdG9yQWJzdHJhY3RMaXN0IiwiSGllcmFyY2h5U2VsZWN0b3JQaW5uZWRMaXN0IiwicmVuZGVyIiwicHJvcHMiLCJwaW5uZWRHcm91cExhYmVsIiwicHJvcFR5cGVzIiwib25lT2ZUeXBlIiwic3RyaW5nIiwiZWxlbWVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7O0FBRUEsT0FBT0MsNkJBQVAsTUFBMEMsMkJBQTFDOztJQUVxQkMsMkI7Ozs7Ozs7Ozt3Q0FDbkJDLE0scUJBQVM7QUFDUCxXQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxVQUFHLFdBQVUsbUJBQWI7QUFBa0MsYUFBS0MsS0FBTCxDQUFXQztBQUE3QztBQURGLEtBREY7QUFLRCxHOzs7RUFQc0RKLDZCOztTQUFwQ0MsMkI7OztBQVVyQkEsNEJBQTRCSSxTQUE1QixHQUF3QztBQUN0Q0Qsb0JBQWtCTCxVQUFVTyxTQUFWLENBQW9CLENBQUNQLFVBQVVRLE1BQVgsRUFBbUJSLFVBQVVTLE9BQTdCLENBQXBCO0FBRG9CLENBQXhDOztBQUlBUCw0QkFBNEJRLFlBQTVCLEdBQTJDO0FBQ3pDTCxvQkFBa0I7QUFEdUIsQ0FBM0MiLCJmaWxlIjoicGlubmVkLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCBIaWVyYXJjaHlTZWxlY3RvckFic3RyYWN0TGlzdCBmcm9tICcuL2Fic3RyYWN0LWxpc3QuY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5U2VsZWN0b3JQaW5uZWRMaXN0IGV4dGVuZHMgSGllcmFyY2h5U2VsZWN0b3JBYnN0cmFjdExpc3Qge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaGVhZGVyXCI+e3RoaXMucHJvcHMucGlubmVkR3JvdXBMYWJlbH08L3A+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkhpZXJhcmNoeVNlbGVjdG9yUGlubmVkTGlzdC5wcm9wVHlwZXMgPSB7XG4gIHBpbm5lZEdyb3VwTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG59O1xuXG5IaWVyYXJjaHlTZWxlY3RvclBpbm5lZExpc3QuZGVmYXVsdFByb3BzID0ge1xuICBwaW5uZWRHcm91cExhYmVsOiAnUGlubmVkIGl0ZW1zJyxcbn07XG4iXX0=