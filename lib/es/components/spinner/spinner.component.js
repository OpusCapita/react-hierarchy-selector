function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React from 'react';
import Spinner from '@opuscapita/react-spinner';
var DELAY = 50;

var SelectorSpinner =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(SelectorSpinner, _React$PureComponent);

  function SelectorSpinner() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = SelectorSpinner.prototype;

  _proto.render = function render() {
    return React.createElement(Spinner, {
      delay: DELAY
    });
  };

  return SelectorSpinner;
}(React.PureComponent);

export { SelectorSpinner as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NwaW5uZXIvc3Bpbm5lci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiU3Bpbm5lciIsIkRFTEFZIiwiU2VsZWN0b3JTcGlubmVyIiwicmVuZGVyIiwiUHVyZUNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsT0FBUCxNQUFvQiwyQkFBcEI7QUFFQSxJQUFNQyxLQUFLLEdBQUcsRUFBZDs7SUFFcUJDLGU7Ozs7Ozs7Ozs7O1NBQ25CQyxNLEdBQUEsa0JBQVM7QUFDUCxXQUFPLG9CQUFDLE9BQUQ7QUFBUyxNQUFBLEtBQUssRUFBRUY7QUFBaEIsTUFBUDtBQUNELEc7OztFQUgwQ0YsS0FBSyxDQUFDSyxhOztTQUE5QkYsZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU3Bpbm5lciBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zcGlubmVyJztcblxuY29uc3QgREVMQVkgPSA1MDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0b3JTcGlubmVyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gPFNwaW5uZXIgZGVsYXk9e0RFTEFZfSAvPjtcbiAgfVxufVxuIl19