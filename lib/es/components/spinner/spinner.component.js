function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import Spinner from '@opuscapita/react-spinner';

var DELAY = 50;

var SelectorSpinner = function (_React$PureComponent) {
  _inherits(SelectorSpinner, _React$PureComponent);

  function SelectorSpinner() {
    _classCallCheck(this, SelectorSpinner);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  SelectorSpinner.prototype.render = function render() {
    return React.createElement(Spinner, { delay: DELAY });
  };

  return SelectorSpinner;
}(React.PureComponent);

export { SelectorSpinner as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NwaW5uZXIvc3Bpbm5lci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiU3Bpbm5lciIsIkRFTEFZIiwiU2VsZWN0b3JTcGlubmVyIiwicmVuZGVyIiwiUHVyZUNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLE9BQVAsTUFBb0IsMkJBQXBCOztBQUVBLElBQU1DLFFBQVEsRUFBZDs7SUFFcUJDLGU7Ozs7Ozs7Ozs0QkFDbkJDLE0scUJBQVM7QUFDUCxXQUFPLG9CQUFDLE9BQUQsSUFBUyxPQUFPRixLQUFoQixHQUFQO0FBQ0QsRzs7O0VBSDBDRixNQUFNSyxhOztTQUE5QkYsZSIsImZpbGUiOiJzcGlubmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU3Bpbm5lciBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zcGlubmVyJztcblxuY29uc3QgREVMQVkgPSA1MDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0b3JTcGlubmVyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gPFNwaW5uZXIgZGVsYXk9e0RFTEFZfSAvPjtcbiAgfVxufVxuIl19