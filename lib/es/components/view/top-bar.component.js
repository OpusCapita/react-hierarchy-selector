function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { FaQuestion } from 'react-icons/fa';
import './top-bar.scss';

var ViewTopBar =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(ViewTopBar, _React$PureComponent);

  function ViewTopBar() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "handleSelectClick", function () {
      var flags = {
        interactive: true
      };

      _this.props.onSelect(flags);
    });

    return _this;
  }

  var _proto = ViewTopBar.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        title = _this$props.title,
        onCancel = _this$props.onCancel,
        onHelp = _this$props.onHelp,
        selectDisabled = _this$props.selectDisabled,
        btnSelectLabel = _this$props.btnSelectLabel,
        btnCancelLabel = _this$props.btnCancelLabel,
        helpDisabled = _this$props.helpDisabled;
    return React.createElement("div", {
      className: "oc-dialog-top-bar"
    }, React.createElement("div", {
      className: "action-left"
    }, React.createElement(Modal.Title, null, title)), React.createElement("div", {
      className: "action-right"
    }, React.createElement(Button, {
      onClick: this.handleSelectClick,
      disabled: selectDisabled,
      className: "btn-primary"
    }, btnSelectLabel), React.createElement(Button, {
      onClick: onCancel
    }, btnCancelLabel), React.createElement("button", {
      type: "button",
      className: "oc-help-button" + (helpDisabled ? '-disabled' : ''),
      onClick: onHelp
    }, React.createElement(FaQuestion, null))));
  };

  return ViewTopBar;
}(React.PureComponent);

export { ViewTopBar as default };
ViewTopBar.defaultProps = {
  onCancel: function onCancel() {},
  onSelect: function onSelect() {},
  onHelp: function onHelp() {},
  btnSelectLabel: 'Select',
  btnCancelLabel: 'Cancel'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdG9wLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiTW9kYWwiLCJCdXR0b24iLCJGYVF1ZXN0aW9uIiwiVmlld1RvcEJhciIsImZsYWdzIiwiaW50ZXJhY3RpdmUiLCJwcm9wcyIsIm9uU2VsZWN0IiwicmVuZGVyIiwidGl0bGUiLCJvbkNhbmNlbCIsIm9uSGVscCIsInNlbGVjdERpc2FibGVkIiwiYnRuU2VsZWN0TGFiZWwiLCJidG5DYW5jZWxMYWJlbCIsImhlbHBEaXNhYmxlZCIsImhhbmRsZVNlbGVjdENsaWNrIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxLQUFULEVBQWdCQyxNQUFoQixRQUE4QixpQkFBOUI7QUFDQSxTQUFTQyxVQUFULFFBQTJCLGdCQUEzQjtBQUVBLE9BQU8sZ0JBQVA7O0lBRXFCQyxVOzs7Ozs7Ozs7Ozs7Ozt3RUFDQyxZQUFNO0FBQ3hCLFVBQU1DLEtBQUssR0FBRztBQUNaQyxRQUFBQSxXQUFXLEVBQUU7QUFERCxPQUFkOztBQUdBLFlBQUtDLEtBQUwsQ0FBV0MsUUFBWCxDQUFvQkgsS0FBcEI7QUFDRCxLOzs7Ozs7O1NBRURJLE0sR0FBQSxrQkFBUztBQUFBLHNCQVNILEtBQUtGLEtBVEY7QUFBQSxRQUVMRyxLQUZLLGVBRUxBLEtBRks7QUFBQSxRQUdMQyxRQUhLLGVBR0xBLFFBSEs7QUFBQSxRQUlMQyxNQUpLLGVBSUxBLE1BSks7QUFBQSxRQUtMQyxjQUxLLGVBS0xBLGNBTEs7QUFBQSxRQU1MQyxjQU5LLGVBTUxBLGNBTks7QUFBQSxRQU9MQyxjQVBLLGVBT0xBLGNBUEs7QUFBQSxRQVFMQyxZQVJLLGVBUUxBLFlBUks7QUFVUCxXQUNFO0FBQUssTUFBQSxTQUFTLEVBQUM7QUFBZixPQUNFO0FBQUssTUFBQSxTQUFTLEVBQUM7QUFBZixPQUNFLG9CQUFDLEtBQUQsQ0FBTyxLQUFQLFFBQWVOLEtBQWYsQ0FERixDQURGLEVBSUU7QUFBSyxNQUFBLFNBQVMsRUFBQztBQUFmLE9BQ0Usb0JBQUMsTUFBRDtBQUNFLE1BQUEsT0FBTyxFQUFFLEtBQUtPLGlCQURoQjtBQUVFLE1BQUEsUUFBUSxFQUFFSixjQUZaO0FBR0UsTUFBQSxTQUFTLEVBQUM7QUFIWixPQUtHQyxjQUxILENBREYsRUFRRSxvQkFBQyxNQUFEO0FBQVEsTUFBQSxPQUFPLEVBQUVIO0FBQWpCLE9BQTRCSSxjQUE1QixDQVJGLEVBU0U7QUFDRSxNQUFBLElBQUksRUFBQyxRQURQO0FBRUUsTUFBQSxTQUFTLHNCQUFtQkMsWUFBWSxHQUFHLFdBQUgsR0FBaUIsRUFBaEQsQ0FGWDtBQUdFLE1BQUEsT0FBTyxFQUFFSjtBQUhYLE9BS0Usb0JBQUMsVUFBRCxPQUxGLENBVEYsQ0FKRixDQURGO0FBd0JELEc7OztFQTFDcUNiLEtBQUssQ0FBQ21CLGE7O1NBQXpCZCxVO0FBd0RyQkEsVUFBVSxDQUFDZSxZQUFYLEdBQTBCO0FBQ3hCUixFQUFBQSxRQUFRLEVBQUUsb0JBQU0sQ0FBRSxDQURNO0FBRXhCSCxFQUFBQSxRQUFRLEVBQUUsb0JBQU0sQ0FBRSxDQUZNO0FBR3hCSSxFQUFBQSxNQUFNLEVBQUUsa0JBQU0sQ0FBRSxDQUhRO0FBSXhCRSxFQUFBQSxjQUFjLEVBQUUsUUFKUTtBQUt4QkMsRUFBQUEsY0FBYyxFQUFFO0FBTFEsQ0FBMUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IE1vZGFsLCBCdXR0b24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IHsgRmFRdWVzdGlvbiB9IGZyb20gJ3JlYWN0LWljb25zL2ZhJztcblxuaW1wb3J0ICcuL3RvcC1iYXIuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdUb3BCYXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgaGFuZGxlU2VsZWN0Q2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgZmxhZ3MgPSB7XG4gICAgICBpbnRlcmFjdGl2ZTogdHJ1ZSxcbiAgICB9O1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QoZmxhZ3MpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHRpdGxlLFxuICAgICAgb25DYW5jZWwsXG4gICAgICBvbkhlbHAsXG4gICAgICBzZWxlY3REaXNhYmxlZCxcbiAgICAgIGJ0blNlbGVjdExhYmVsLFxuICAgICAgYnRuQ2FuY2VsTGFiZWwsXG4gICAgICBoZWxwRGlzYWJsZWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGlhbG9nLXRvcC1iYXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tbGVmdFwiPlxuICAgICAgICAgIDxNb2RhbC5UaXRsZT57IHRpdGxlIH08L01vZGFsLlRpdGxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tcmlnaHRcIj5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZVNlbGVjdENsaWNrfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e3NlbGVjdERpc2FibGVkfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLXByaW1hcnlcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtidG5TZWxlY3RMYWJlbH1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e29uQ2FuY2VsfT57YnRuQ2FuY2VsTGFiZWx9PC9CdXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzc05hbWU9e2BvYy1oZWxwLWJ1dHRvbiR7aGVscERpc2FibGVkID8gJy1kaXNhYmxlZCcgOiAnJ31gfVxuICAgICAgICAgICAgb25DbGljaz17b25IZWxwfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxGYVF1ZXN0aW9uIC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5WaWV3VG9wQmFyLnByb3BUeXBlcyA9IHtcbiAgb25DYW5jZWw6IFByb3BUeXBlcy5mdW5jLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uSGVscDogUHJvcFR5cGVzLmZ1bmMsXG4gIGhlbHBEaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgc2VsZWN0RGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIHRpdGxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLmlzUmVxdWlyZWQsXG4gIGJ0blNlbGVjdExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBidG5DYW5jZWxMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbn07XG5cblZpZXdUb3BCYXIuZGVmYXVsdFByb3BzID0ge1xuICBvbkNhbmNlbDogKCkgPT4ge30sXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgb25IZWxwOiAoKSA9PiB7fSxcbiAgYnRuU2VsZWN0TGFiZWw6ICdTZWxlY3QnLFxuICBidG5DYW5jZWxMYWJlbDogJ0NhbmNlbCcsXG59O1xuIl19