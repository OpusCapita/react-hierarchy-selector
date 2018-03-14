function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import FaQuestion from 'react-icons/lib/fa/question-circle';

import './top-bar.scss';

var ViewTopBar = function (_React$PureComponent) {
  _inherits(ViewTopBar, _React$PureComponent);

  function ViewTopBar() {
    _classCallCheck(this, ViewTopBar);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  ViewTopBar.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'oc-dialog-top-bar' },
      React.createElement(
        'div',
        { className: 'action-left' },
        React.createElement(
          Modal.Title,
          null,
          this.props.title
        )
      ),
      React.createElement(
        'div',
        { className: 'action-right' },
        React.createElement(
          Button,
          { onClick: this.props.onSelect, disabled: this.props.selectDisabled },
          this.props.btnSelectLabel
        ),
        React.createElement(
          Button,
          { onClick: this.props.onCancel },
          this.props.btnCancelLabel
        ),
        React.createElement(
          'button',
          { type: 'button', className: 'oc-help-button', onClick: this.props.onHelp },
          React.createElement(FaQuestion, null)
        )
      )
    );
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdG9wLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiTW9kYWwiLCJCdXR0b24iLCJGYVF1ZXN0aW9uIiwiVmlld1RvcEJhciIsInJlbmRlciIsInByb3BzIiwidGl0bGUiLCJvblNlbGVjdCIsInNlbGVjdERpc2FibGVkIiwiYnRuU2VsZWN0TGFiZWwiLCJvbkNhbmNlbCIsImJ0bkNhbmNlbExhYmVsIiwib25IZWxwIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxLQUFULEVBQWdCQyxNQUFoQixRQUE4QixpQkFBOUI7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLG9DQUF2Qjs7QUFFQSxPQUFPLGdCQUFQOztJQUVxQkMsVTs7Ozs7Ozs7O3VCQUNuQkMsTSxxQkFBUztBQUNQLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSxtQkFBZjtBQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsYUFBZjtBQUNFO0FBQUMsZUFBRCxDQUFPLEtBQVA7QUFBQTtBQUFlLGVBQUtDLEtBQUwsQ0FBV0M7QUFBMUI7QUFERixPQURGO0FBSUU7QUFBQTtBQUFBLFVBQUssV0FBVSxjQUFmO0FBQ0U7QUFBQyxnQkFBRDtBQUFBLFlBQVEsU0FBUyxLQUFLRCxLQUFMLENBQVdFLFFBQTVCLEVBQXNDLFVBQVUsS0FBS0YsS0FBTCxDQUFXRyxjQUEzRDtBQUNHLGVBQUtILEtBQUwsQ0FBV0k7QUFEZCxTQURGO0FBSUU7QUFBQyxnQkFBRDtBQUFBLFlBQVEsU0FBUyxLQUFLSixLQUFMLENBQVdLLFFBQTVCO0FBQXVDLGVBQUtMLEtBQUwsQ0FBV007QUFBbEQsU0FKRjtBQUtFO0FBQUE7QUFBQSxZQUFRLE1BQUssUUFBYixFQUFzQixXQUFVLGdCQUFoQyxFQUFpRCxTQUFTLEtBQUtOLEtBQUwsQ0FBV08sTUFBckU7QUFDRSw4QkFBQyxVQUFEO0FBREY7QUFMRjtBQUpGLEtBREY7QUFnQkQsRzs7O0VBbEJxQ2QsTUFBTWUsYTs7U0FBekJWLFU7OztBQStCckJBLFdBQVdXLFlBQVgsR0FBMEI7QUFDeEJKLFlBQVUsb0JBQU0sQ0FBRSxDQURNO0FBRXhCSCxZQUFVLG9CQUFNLENBQUUsQ0FGTTtBQUd4QkssVUFBUSxrQkFBTSxDQUFFLENBSFE7QUFJeEJILGtCQUFnQixRQUpRO0FBS3hCRSxrQkFBZ0I7QUFMUSxDQUExQiIsImZpbGUiOiJ0b3AtYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCB7IE1vZGFsLCBCdXR0b24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgRmFRdWVzdGlvbiBmcm9tICdyZWFjdC1pY29ucy9saWIvZmEvcXVlc3Rpb24tY2lyY2xlJztcclxuXHJcbmltcG9ydCAnLi90b3AtYmFyLnNjc3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld1RvcEJhciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGlhbG9nLXRvcC1iYXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGlvbi1sZWZ0XCI+XHJcbiAgICAgICAgICA8TW9kYWwuVGl0bGU+eyB0aGlzLnByb3BzLnRpdGxlIH08L01vZGFsLlRpdGxlPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLXJpZ2h0XCI+XHJcbiAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMucHJvcHMub25TZWxlY3R9IGRpc2FibGVkPXt0aGlzLnByb3BzLnNlbGVjdERpc2FibGVkfT5cclxuICAgICAgICAgICAge3RoaXMucHJvcHMuYnRuU2VsZWN0TGFiZWx9XHJcbiAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5wcm9wcy5vbkNhbmNlbH0+e3RoaXMucHJvcHMuYnRuQ2FuY2VsTGFiZWx9PC9CdXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJvYy1oZWxwLWJ1dHRvblwiIG9uQ2xpY2s9e3RoaXMucHJvcHMub25IZWxwfT5cclxuICAgICAgICAgICAgPEZhUXVlc3Rpb24gLz5cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5WaWV3VG9wQmFyLnByb3BUeXBlcyA9IHtcclxuICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxyXG4gIG9uSGVscDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgc2VsZWN0RGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXHJcbiAgdGl0bGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSkuaXNSZXF1aXJlZCxcclxuICBidG5TZWxlY3RMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxuICBidG5DYW5jZWxMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcclxufTtcclxuXHJcblZpZXdUb3BCYXIuZGVmYXVsdFByb3BzID0ge1xyXG4gIG9uQ2FuY2VsOiAoKSA9PiB7fSxcclxuICBvblNlbGVjdDogKCkgPT4ge30sXHJcbiAgb25IZWxwOiAoKSA9PiB7fSxcclxuICBidG5TZWxlY3RMYWJlbDogJ1NlbGVjdCcsXHJcbiAgYnRuQ2FuY2VsTGFiZWw6ICdDYW5jZWwnLFxyXG59O1xyXG4iXX0=