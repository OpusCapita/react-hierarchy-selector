function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React from 'react';
import Spinner from '../../spinner';
import CommonLayout from './common.layout';

var HSSpinnerLayout =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(HSSpinnerLayout, _React$PureComponent);

  function HSSpinnerLayout() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = HSSpinnerLayout.prototype;

  _proto.render = function render() {
    return React.createElement(CommonLayout, null, React.createElement(Spinner, null));
  };

  return HSSpinnerLayout;
}(React.PureComponent);

export { HSSpinnerLayout as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvbGF5b3V0cy9zcGlubmVyLmxheW91dC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJTcGlubmVyIiwiQ29tbW9uTGF5b3V0IiwiSFNTcGlubmVyTGF5b3V0IiwicmVuZGVyIiwiUHVyZUNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsT0FBUCxNQUFvQixlQUFwQjtBQUVBLE9BQU9DLFlBQVAsTUFBeUIsaUJBQXpCOztJQUVxQkMsZTs7Ozs7Ozs7Ozs7U0FDbkJDLE0sR0FBQSxrQkFBUztBQUNQLFdBQ0Usb0JBQUMsWUFBRCxRQUNFLG9CQUFDLE9BQUQsT0FERixDQURGO0FBS0QsRzs7O0VBUDBDSixLQUFLLENBQUNLLGE7O1NBQTlCRixlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTcGlubmVyIGZyb20gJy4uLy4uL3NwaW5uZXInO1xuXG5pbXBvcnQgQ29tbW9uTGF5b3V0IGZyb20gJy4vY29tbW9uLmxheW91dCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhTU3Bpbm5lckxheW91dCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21tb25MYXlvdXQ+XG4gICAgICAgIDxTcGlubmVyIC8+XG4gICAgICA8L0NvbW1vbkxheW91dD5cbiAgICApO1xuICB9XG59XG4iXX0=