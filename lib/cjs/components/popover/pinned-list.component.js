'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _abstractList = require('./abstract-list.component');

var _abstractList2 = _interopRequireDefault(_abstractList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HierarchySelectorPinnedList = function (_HierarchySelectorAbs) {
  _inherits(HierarchySelectorPinnedList, _HierarchySelectorAbs);

  function HierarchySelectorPinnedList() {
    _classCallCheck(this, HierarchySelectorPinnedList);

    return _possibleConstructorReturn(this, _HierarchySelectorAbs.apply(this, arguments));
  }

  HierarchySelectorPinnedList.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'p',
        { className: 'list-group-header' },
        this.props.pinnedGroupLabel
      )
    );
  };

  return HierarchySelectorPinnedList;
}(_abstractList2.default);

exports.default = HierarchySelectorPinnedList;


HierarchySelectorPinnedList.propTypes = {
  pinnedGroupLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element])
};

HierarchySelectorPinnedList.defaultProps = {
  pinnedGroupLabel: 'Pinned items'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvcGlubmVkLWxpc3QuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJIaWVyYXJjaHlTZWxlY3RvclBpbm5lZExpc3QiLCJyZW5kZXIiLCJwcm9wcyIsInBpbm5lZEdyb3VwTGFiZWwiLCJIaWVyYXJjaHlTZWxlY3RvckFic3RyYWN0TGlzdCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9uZU9mVHlwZSIsInN0cmluZyIsImVsZW1lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7SUFFcUJBLDJCOzs7Ozs7Ozs7d0NBQ25CQyxNLHFCQUFTO0FBQ1AsV0FDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsVUFBRyxXQUFVLG1CQUFiO0FBQWtDLGFBQUtDLEtBQUwsQ0FBV0M7QUFBN0M7QUFERixLQURGO0FBS0QsRzs7O0VBUHNEQyxzQjs7a0JBQXBDSiwyQjs7O0FBVXJCQSw0QkFBNEJLLFNBQTVCLEdBQXdDO0FBQ3RDRixvQkFBa0JHLG9CQUFVQyxTQUFWLENBQW9CLENBQUNELG9CQUFVRSxNQUFYLEVBQW1CRixvQkFBVUcsT0FBN0IsQ0FBcEI7QUFEb0IsQ0FBeEM7O0FBSUFULDRCQUE0QlUsWUFBNUIsR0FBMkM7QUFDekNQLG9CQUFrQjtBQUR1QixDQUEzQyIsImZpbGUiOiJwaW5uZWQtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IEhpZXJhcmNoeVNlbGVjdG9yQWJzdHJhY3RMaXN0IGZyb20gJy4vYWJzdHJhY3QtbGlzdC5jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlTZWxlY3RvclBpbm5lZExpc3QgZXh0ZW5kcyBIaWVyYXJjaHlTZWxlY3RvckFic3RyYWN0TGlzdCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1oZWFkZXJcIj57dGhpcy5wcm9wcy5waW5uZWRHcm91cExhYmVsfTwvcD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuSGllcmFyY2h5U2VsZWN0b3JQaW5uZWRMaXN0LnByb3BUeXBlcyA9IHtcbiAgcGlubmVkR3JvdXBMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbn07XG5cbkhpZXJhcmNoeVNlbGVjdG9yUGlubmVkTGlzdC5kZWZhdWx0UHJvcHMgPSB7XG4gIHBpbm5lZEdyb3VwTGFiZWw6ICdQaW5uZWQgaXRlbXMnLFxufTtcbiJdfQ==