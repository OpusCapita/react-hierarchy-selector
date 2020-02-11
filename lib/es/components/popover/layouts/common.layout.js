function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

var HSPopoverCommonLayout =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(HSPopoverCommonLayout, _React$PureComponent);

  function HSPopoverCommonLayout() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = HSPopoverCommonLayout.prototype;

  _proto.render = function render() {
    return React.createElement("div", {
      className: "oc-hierarchy-selector-popover-layout"
    }, this.props.children);
  };

  return HSPopoverCommonLayout;
}(React.PureComponent);

export { HSPopoverCommonLayout as default };
HSPopoverCommonLayout.defaultProps = {
  children: null
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvbGF5b3V0cy9jb21tb24ubGF5b3V0LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIkhTUG9wb3ZlckNvbW1vbkxheW91dCIsInJlbmRlciIsInByb3BzIiwiY2hpbGRyZW4iLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCOztJQUVxQkMscUI7Ozs7Ozs7Ozs7O1NBQ25CQyxNLEdBQUEsa0JBQVM7QUFDUCxXQUNFO0FBQUssTUFBQSxTQUFTLEVBQUM7QUFBZixPQUNJLEtBQUtDLEtBQUwsQ0FBV0MsUUFEZixDQURGO0FBS0QsRzs7O0VBUGdETCxLQUFLLENBQUNNLGE7O1NBQXBDSixxQjtBQWNyQkEscUJBQXFCLENBQUNLLFlBQXRCLEdBQXFDO0FBQ25DRixFQUFBQSxRQUFRLEVBQUU7QUFEeUIsQ0FBckMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFNQb3BvdmVyQ29tbW9uTGF5b3V0IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItcG9wb3Zlci1sYXlvdXRcIj5cbiAgICAgICAgeyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuSFNQb3BvdmVyQ29tbW9uTGF5b3V0LnByb3BUeXBlcyA9IHtcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxufTtcblxuSFNQb3BvdmVyQ29tbW9uTGF5b3V0LmRlZmF1bHRQcm9wcyA9IHtcbiAgY2hpbGRyZW46IG51bGwsXG59O1xuIl19