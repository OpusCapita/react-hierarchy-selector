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
    var _props = this.props,
        title = _props.title,
        onCancel = _props.onCancel,
        onSelect = _props.onSelect,
        onHelp = _props.onHelp,
        selectDisabled = _props.selectDisabled,
        btnSelectLabel = _props.btnSelectLabel,
        btnCancelLabel = _props.btnCancelLabel,
        helpDisabled = _props.helpDisabled;

    return React.createElement(
      'div',
      { className: 'oc-dialog-top-bar' },
      React.createElement(
        'div',
        { className: 'action-left' },
        React.createElement(
          Modal.Title,
          null,
          title
        )
      ),
      React.createElement(
        'div',
        { className: 'action-right' },
        React.createElement(
          Button,
          { onClick: onSelect, disabled: selectDisabled, className: 'btn-primary' },
          btnSelectLabel
        ),
        React.createElement(
          Button,
          { onClick: onCancel },
          btnCancelLabel
        ),
        React.createElement(
          'button',
          { type: 'button', className: 'oc-help-button' + (helpDisabled ? '-disabled' : ''), onClick: onHelp },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdG9wLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiTW9kYWwiLCJCdXR0b24iLCJGYVF1ZXN0aW9uIiwiVmlld1RvcEJhciIsInJlbmRlciIsInByb3BzIiwidGl0bGUiLCJvbkNhbmNlbCIsIm9uU2VsZWN0Iiwib25IZWxwIiwic2VsZWN0RGlzYWJsZWQiLCJidG5TZWxlY3RMYWJlbCIsImJ0bkNhbmNlbExhYmVsIiwiaGVscERpc2FibGVkIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxLQUFULEVBQWdCQyxNQUFoQixRQUE4QixpQkFBOUI7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLG9DQUF2Qjs7QUFFQSxPQUFPLGdCQUFQOztJQUVxQkMsVTs7Ozs7Ozs7O3VCQUNuQkMsTSxxQkFBUztBQUFBLGlCQVVILEtBQUtDLEtBVkY7QUFBQSxRQUVMQyxLQUZLLFVBRUxBLEtBRks7QUFBQSxRQUdMQyxRQUhLLFVBR0xBLFFBSEs7QUFBQSxRQUlMQyxRQUpLLFVBSUxBLFFBSks7QUFBQSxRQUtMQyxNQUxLLFVBS0xBLE1BTEs7QUFBQSxRQU1MQyxjQU5LLFVBTUxBLGNBTks7QUFBQSxRQU9MQyxjQVBLLFVBT0xBLGNBUEs7QUFBQSxRQVFMQyxjQVJLLFVBUUxBLGNBUks7QUFBQSxRQVNMQyxZQVRLLFVBU0xBLFlBVEs7O0FBV1AsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLG1CQUFmO0FBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxhQUFmO0FBQ0U7QUFBQyxlQUFELENBQU8sS0FBUDtBQUFBO0FBQWVQO0FBQWY7QUFERixPQURGO0FBSUU7QUFBQTtBQUFBLFVBQUssV0FBVSxjQUFmO0FBQ0U7QUFBQyxnQkFBRDtBQUFBLFlBQVEsU0FBU0UsUUFBakIsRUFBMkIsVUFBVUUsY0FBckMsRUFBcUQsV0FBVSxhQUEvRDtBQUNHQztBQURILFNBREY7QUFJRTtBQUFDLGdCQUFEO0FBQUEsWUFBUSxTQUFTSixRQUFqQjtBQUE0Qks7QUFBNUIsU0FKRjtBQUtFO0FBQUE7QUFBQSxZQUFRLE1BQUssUUFBYixFQUFzQiwrQkFBNEJDLGVBQWUsV0FBZixHQUE2QixFQUF6RCxDQUF0QixFQUFxRixTQUFTSixNQUE5RjtBQUNFLDhCQUFDLFVBQUQ7QUFERjtBQUxGO0FBSkYsS0FERjtBQWdCRCxHOzs7RUE1QnFDWCxNQUFNZ0IsYTs7U0FBekJYLFU7OztBQTBDckJBLFdBQVdZLFlBQVgsR0FBMEI7QUFDeEJSLFlBQVUsb0JBQU0sQ0FBRSxDQURNO0FBRXhCQyxZQUFVLG9CQUFNLENBQUUsQ0FGTTtBQUd4QkMsVUFBUSxrQkFBTSxDQUFFLENBSFE7QUFJeEJFLGtCQUFnQixRQUpRO0FBS3hCQyxrQkFBZ0I7QUFMUSxDQUExQiIsImZpbGUiOiJ0b3AtYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgTW9kYWwsIEJ1dHRvbiB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgRmFRdWVzdGlvbiBmcm9tICdyZWFjdC1pY29ucy9saWIvZmEvcXVlc3Rpb24tY2lyY2xlJztcblxuaW1wb3J0ICcuL3RvcC1iYXIuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdUb3BCYXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHRpdGxlLFxuICAgICAgb25DYW5jZWwsXG4gICAgICBvblNlbGVjdCxcbiAgICAgIG9uSGVscCxcbiAgICAgIHNlbGVjdERpc2FibGVkLFxuICAgICAgYnRuU2VsZWN0TGFiZWwsXG4gICAgICBidG5DYW5jZWxMYWJlbCxcbiAgICAgIGhlbHBEaXNhYmxlZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kaWFsb2ctdG9wLWJhclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGlvbi1sZWZ0XCI+XG4gICAgICAgICAgPE1vZGFsLlRpdGxlPnsgdGl0bGUgfTwvTW9kYWwuVGl0bGU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGlvbi1yaWdodFwiPlxuICAgICAgICAgIDxCdXR0b24gb25DbGljaz17b25TZWxlY3R9IGRpc2FibGVkPXtzZWxlY3REaXNhYmxlZH0gY2xhc3NOYW1lPVwiYnRuLXByaW1hcnlcIj5cbiAgICAgICAgICAgIHtidG5TZWxlY3RMYWJlbH1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e29uQ2FuY2VsfT57YnRuQ2FuY2VsTGFiZWx9PC9CdXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPXtgb2MtaGVscC1idXR0b24ke2hlbHBEaXNhYmxlZCA/ICctZGlzYWJsZWQnIDogJyd9YH0gb25DbGljaz17b25IZWxwfT5cbiAgICAgICAgICAgIDxGYVF1ZXN0aW9uIC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5WaWV3VG9wQmFyLnByb3BUeXBlcyA9IHtcbiAgb25DYW5jZWw6IFByb3BUeXBlcy5mdW5jLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uSGVscDogUHJvcFR5cGVzLmZ1bmMsXG4gIGhlbHBEaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgc2VsZWN0RGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIHRpdGxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLmlzUmVxdWlyZWQsXG4gIGJ0blNlbGVjdExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBidG5DYW5jZWxMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbn07XG5cblZpZXdUb3BCYXIuZGVmYXVsdFByb3BzID0ge1xuICBvbkNhbmNlbDogKCkgPT4ge30sXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgb25IZWxwOiAoKSA9PiB7fSxcbiAgYnRuU2VsZWN0TGFiZWw6ICdTZWxlY3QnLFxuICBidG5DYW5jZWxMYWJlbDogJ0NhbmNlbCcsXG59O1xuIl19