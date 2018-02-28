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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdG9wLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiTW9kYWwiLCJCdXR0b24iLCJGYVF1ZXN0aW9uIiwiVmlld1RvcEJhciIsInJlbmRlciIsInByb3BzIiwidGl0bGUiLCJvblNlbGVjdCIsInNlbGVjdERpc2FibGVkIiwiYnRuU2VsZWN0TGFiZWwiLCJvbkNhbmNlbCIsImJ0bkNhbmNlbExhYmVsIiwib25IZWxwIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxLQUFULEVBQWdCQyxNQUFoQixRQUE4QixpQkFBOUI7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLG9DQUF2Qjs7QUFFQSxPQUFPLGdCQUFQOztJQUVxQkMsVTs7Ozs7Ozs7O3VCQUNuQkMsTSxxQkFBUztBQUNQLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSxtQkFBZjtBQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsYUFBZjtBQUNFO0FBQUMsZUFBRCxDQUFPLEtBQVA7QUFBQTtBQUFlLGVBQUtDLEtBQUwsQ0FBV0M7QUFBMUI7QUFERixPQURGO0FBSUU7QUFBQTtBQUFBLFVBQUssV0FBVSxjQUFmO0FBQ0U7QUFBQyxnQkFBRDtBQUFBLFlBQVEsU0FBUyxLQUFLRCxLQUFMLENBQVdFLFFBQTVCLEVBQXNDLFVBQVUsS0FBS0YsS0FBTCxDQUFXRyxjQUEzRDtBQUNHLGVBQUtILEtBQUwsQ0FBV0k7QUFEZCxTQURGO0FBSUU7QUFBQyxnQkFBRDtBQUFBLFlBQVEsU0FBUyxLQUFLSixLQUFMLENBQVdLLFFBQTVCO0FBQXVDLGVBQUtMLEtBQUwsQ0FBV007QUFBbEQsU0FKRjtBQUtFO0FBQUE7QUFBQSxZQUFRLE1BQUssUUFBYixFQUFzQixXQUFVLGdCQUFoQyxFQUFpRCxTQUFTLEtBQUtOLEtBQUwsQ0FBV08sTUFBckU7QUFDRSw4QkFBQyxVQUFEO0FBREY7QUFMRjtBQUpGLEtBREY7QUFnQkQsRzs7O0VBbEJxQ2QsTUFBTWUsYTs7U0FBekJWLFU7OztBQStCckJBLFdBQVdXLFlBQVgsR0FBMEI7QUFDeEJKLFlBQVUsb0JBQU0sQ0FBRSxDQURNO0FBRXhCSCxZQUFVLG9CQUFNLENBQUUsQ0FGTTtBQUd4QkssVUFBUSxrQkFBTSxDQUFFLENBSFE7QUFJeEJILGtCQUFnQixRQUpRO0FBS3hCRSxrQkFBZ0I7QUFMUSxDQUExQiIsImZpbGUiOiJ0b3AtYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgTW9kYWwsIEJ1dHRvbiB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgRmFRdWVzdGlvbiBmcm9tICdyZWFjdC1pY29ucy9saWIvZmEvcXVlc3Rpb24tY2lyY2xlJztcblxuaW1wb3J0ICcuL3RvcC1iYXIuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdUb3BCYXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRpYWxvZy10b3AtYmFyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLWxlZnRcIj5cbiAgICAgICAgICA8TW9kYWwuVGl0bGU+eyB0aGlzLnByb3BzLnRpdGxlIH08L01vZGFsLlRpdGxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tcmlnaHRcIj5cbiAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMucHJvcHMub25TZWxlY3R9IGRpc2FibGVkPXt0aGlzLnByb3BzLnNlbGVjdERpc2FibGVkfT5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLmJ0blNlbGVjdExhYmVsfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5wcm9wcy5vbkNhbmNlbH0+e3RoaXMucHJvcHMuYnRuQ2FuY2VsTGFiZWx9PC9CdXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwib2MtaGVscC1idXR0b25cIiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uSGVscH0+XG4gICAgICAgICAgICA8RmFRdWVzdGlvbiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuVmlld1RvcEJhci5wcm9wVHlwZXMgPSB7XG4gIG9uQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBvbkhlbHA6IFByb3BUeXBlcy5mdW5jLFxuICBzZWxlY3REaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgdGl0bGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSkuaXNSZXF1aXJlZCxcbiAgYnRuU2VsZWN0TGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIGJ0bkNhbmNlbExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxufTtcblxuVmlld1RvcEJhci5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uQ2FuY2VsOiAoKSA9PiB7fSxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBvbkhlbHA6ICgpID0+IHt9LFxuICBidG5TZWxlY3RMYWJlbDogJ1NlbGVjdCcsXG4gIGJ0bkNhbmNlbExhYmVsOiAnQ2FuY2VsJyxcbn07XG4iXX0=