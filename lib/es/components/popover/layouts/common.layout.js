function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

var HSPopoverCommonLayout = function (_React$PureComponent) {
  _inherits(HSPopoverCommonLayout, _React$PureComponent);

  function HSPopoverCommonLayout() {
    _classCallCheck(this, HSPopoverCommonLayout);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  HSPopoverCommonLayout.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'oc-hierarchy-selector-popover-layout' },
      this.props.children
    );
  };

  return HSPopoverCommonLayout;
}(React.PureComponent);

export { HSPopoverCommonLayout as default };


HSPopoverCommonLayout.defaultProps = {
  children: null
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvbGF5b3V0cy9jb21tb24ubGF5b3V0LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIkhTUG9wb3ZlckNvbW1vbkxheW91dCIsInJlbmRlciIsInByb3BzIiwiY2hpbGRyZW4iLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0Qjs7SUFFcUJDLHFCOzs7Ozs7Ozs7a0NBQ25CQyxNLHFCQUFTO0FBQ1AsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLHNDQUFmO0FBQ0ksV0FBS0MsS0FBTCxDQUFXQztBQURmLEtBREY7QUFLRCxHOzs7RUFQZ0RMLE1BQU1NLGE7O1NBQXBDSixxQjs7O0FBY3JCQSxzQkFBc0JLLFlBQXRCLEdBQXFDO0FBQ25DRixZQUFVO0FBRHlCLENBQXJDIiwiZmlsZSI6ImNvbW1vbi5sYXlvdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFNQb3BvdmVyQ29tbW9uTGF5b3V0IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItcG9wb3Zlci1sYXlvdXRcIj5cbiAgICAgICAgeyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuSFNQb3BvdmVyQ29tbW9uTGF5b3V0LnByb3BUeXBlcyA9IHtcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxufTtcblxuSFNQb3BvdmVyQ29tbW9uTGF5b3V0LmRlZmF1bHRQcm9wcyA9IHtcbiAgY2hpbGRyZW46IG51bGwsXG59O1xuIl19