function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import Spinner from '../../spinner';

import CommonLayout from './common.layout';

var HSSpinnerLayout = function (_React$PureComponent) {
  _inherits(HSSpinnerLayout, _React$PureComponent);

  function HSSpinnerLayout() {
    _classCallCheck(this, HSSpinnerLayout);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  HSSpinnerLayout.prototype.render = function render() {
    return React.createElement(
      CommonLayout,
      null,
      React.createElement(Spinner, null)
    );
  };

  return HSSpinnerLayout;
}(React.PureComponent);

export { HSSpinnerLayout as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvbGF5b3V0cy9zcGlubmVyLmxheW91dC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJTcGlubmVyIiwiQ29tbW9uTGF5b3V0IiwiSFNTcGlubmVyTGF5b3V0IiwicmVuZGVyIiwiUHVyZUNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLE9BQVAsTUFBb0IsZUFBcEI7O0FBRUEsT0FBT0MsWUFBUCxNQUF5QixpQkFBekI7O0lBRXFCQyxlOzs7Ozs7Ozs7NEJBQ25CQyxNLHFCQUFTO0FBQ1AsV0FDRTtBQUFDLGtCQUFEO0FBQUE7QUFDRSwwQkFBQyxPQUFEO0FBREYsS0FERjtBQUtELEc7OztFQVAwQ0osTUFBTUssYTs7U0FBOUJGLGUiLCJmaWxlIjoic3Bpbm5lci5sYXlvdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgU3Bpbm5lciBmcm9tICcuLi8uLi9zcGlubmVyJztcclxuXHJcbmltcG9ydCBDb21tb25MYXlvdXQgZnJvbSAnLi9jb21tb24ubGF5b3V0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhTU3Bpbm5lckxheW91dCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxDb21tb25MYXlvdXQ+XHJcbiAgICAgICAgPFNwaW5uZXIgLz5cclxuICAgICAgPC9Db21tb25MYXlvdXQ+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=