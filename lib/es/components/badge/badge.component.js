function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Badge } from 'react-bootstrap';
import './badge.scss';

var HSBadge =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(HSBadge, _React$PureComponent);

  function HSBadge() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "getClassNames", function (className) {
      return classnames('oc-hierarchy-selector-badge', className);
    });

    return _this;
  }

  var _proto = HSBadge.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        other = _objectWithoutPropertiesLoose(_this$props, ["className"]);

    return React.createElement(Badge, _extends({
      className: this.getClassNames(className)
    }, other), this.props.children);
  };

  return HSBadge;
}(React.PureComponent);

export { HSBadge as default };
HSBadge.defaultProps = {
  children: null,
  className: ''
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2JhZGdlL2JhZGdlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJjbGFzc25hbWVzIiwiQmFkZ2UiLCJIU0JhZGdlIiwiY2xhc3NOYW1lIiwicmVuZGVyIiwicHJvcHMiLCJvdGhlciIsImdldENsYXNzTmFtZXMiLCJjaGlsZHJlbiIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsWUFBdkI7QUFDQSxTQUFTQyxLQUFULFFBQXNCLGlCQUF0QjtBQUVBLE9BQU8sY0FBUDs7SUFFcUJDLE87Ozs7Ozs7Ozs7Ozs7O29FQUNILFVBQUFDLFNBQVM7QUFBQSxhQUN2QkgsVUFBVSxDQUFDLDZCQUFELEVBQWdDRyxTQUFoQyxDQURhO0FBQUEsSzs7Ozs7OztTQUl6QkMsTSxHQUFBLGtCQUFTO0FBQUEsc0JBQ3lCLEtBQUtDLEtBRDlCO0FBQUEsUUFDQ0YsU0FERCxlQUNDQSxTQUREO0FBQUEsUUFDZUcsS0FEZjs7QUFFUCxXQUNFLG9CQUFDLEtBQUQ7QUFBTyxNQUFBLFNBQVMsRUFBRSxLQUFLQyxhQUFMLENBQW1CSixTQUFuQjtBQUFsQixPQUFxREcsS0FBckQsR0FDRyxLQUFLRCxLQUFMLENBQVdHLFFBRGQsQ0FERjtBQUtELEc7OztFQVprQ1YsS0FBSyxDQUFDVyxhOztTQUF0QlAsTztBQW9CckJBLE9BQU8sQ0FBQ1EsWUFBUixHQUF1QjtBQUNyQkYsRUFBQUEsUUFBUSxFQUFFLElBRFc7QUFFckJMLEVBQUFBLFNBQVMsRUFBRTtBQUZVLENBQXZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IEJhZGdlIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcblxuaW1wb3J0ICcuL2JhZGdlLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIU0JhZGdlIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGdldENsYXNzTmFtZXMgPSBjbGFzc05hbWUgPT4gKFxuICAgIGNsYXNzbmFtZXMoJ29jLWhpZXJhcmNoeS1zZWxlY3Rvci1iYWRnZScsIGNsYXNzTmFtZSlcbiAgKTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjbGFzc05hbWUsIC4uLm90aGVyIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8QmFkZ2UgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZXMoY2xhc3NOYW1lKX0gey4uLm90aGVyfT5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L0JhZGdlPlxuICAgICk7XG4gIH1cbn1cblxuSFNCYWRnZS5wcm9wVHlwZXMgPSB7XG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuSFNCYWRnZS5kZWZhdWx0UHJvcHMgPSB7XG4gIGNoaWxkcmVuOiBudWxsLFxuICBjbGFzc05hbWU6ICcnLFxufTtcbiJdfQ==