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
          { onClick: onSelect, disabled: selectDisabled },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdG9wLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiTW9kYWwiLCJCdXR0b24iLCJGYVF1ZXN0aW9uIiwiVmlld1RvcEJhciIsInJlbmRlciIsInByb3BzIiwidGl0bGUiLCJvbkNhbmNlbCIsIm9uU2VsZWN0Iiwib25IZWxwIiwic2VsZWN0RGlzYWJsZWQiLCJidG5TZWxlY3RMYWJlbCIsImJ0bkNhbmNlbExhYmVsIiwiaGVscERpc2FibGVkIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxLQUFULEVBQWdCQyxNQUFoQixRQUE4QixpQkFBOUI7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLG9DQUF2Qjs7QUFFQSxPQUFPLGdCQUFQOztJQUVxQkMsVTs7Ozs7Ozs7O3VCQUNuQkMsTSxxQkFBUztBQUFBLGlCQVVILEtBQUtDLEtBVkY7QUFBQSxRQUVMQyxLQUZLLFVBRUxBLEtBRks7QUFBQSxRQUdMQyxRQUhLLFVBR0xBLFFBSEs7QUFBQSxRQUlMQyxRQUpLLFVBSUxBLFFBSks7QUFBQSxRQUtMQyxNQUxLLFVBS0xBLE1BTEs7QUFBQSxRQU1MQyxjQU5LLFVBTUxBLGNBTks7QUFBQSxRQU9MQyxjQVBLLFVBT0xBLGNBUEs7QUFBQSxRQVFMQyxjQVJLLFVBUUxBLGNBUks7QUFBQSxRQVNMQyxZQVRLLFVBU0xBLFlBVEs7O0FBV1AsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLG1CQUFmO0FBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxhQUFmO0FBQ0U7QUFBQyxlQUFELENBQU8sS0FBUDtBQUFBO0FBQWVQO0FBQWY7QUFERixPQURGO0FBSUU7QUFBQTtBQUFBLFVBQUssV0FBVSxjQUFmO0FBQ0U7QUFBQyxnQkFBRDtBQUFBLFlBQVEsU0FBU0UsUUFBakIsRUFBMkIsVUFBVUUsY0FBckM7QUFDR0M7QUFESCxTQURGO0FBSUU7QUFBQyxnQkFBRDtBQUFBLFlBQVEsU0FBU0osUUFBakI7QUFBNEJLO0FBQTVCLFNBSkY7QUFLRTtBQUFBO0FBQUEsWUFBUSxNQUFLLFFBQWIsRUFBc0IsK0JBQTRCQyxlQUFlLFdBQWYsR0FBNkIsRUFBekQsQ0FBdEIsRUFBcUYsU0FBU0osTUFBOUY7QUFDRSw4QkFBQyxVQUFEO0FBREY7QUFMRjtBQUpGLEtBREY7QUFnQkQsRzs7O0VBNUJxQ1gsTUFBTWdCLGE7O1NBQXpCWCxVOzs7QUEwQ3JCQSxXQUFXWSxZQUFYLEdBQTBCO0FBQ3hCUixZQUFVLG9CQUFNLENBQUUsQ0FETTtBQUV4QkMsWUFBVSxvQkFBTSxDQUFFLENBRk07QUFHeEJDLFVBQVEsa0JBQU0sQ0FBRSxDQUhRO0FBSXhCRSxrQkFBZ0IsUUFKUTtBQUt4QkMsa0JBQWdCO0FBTFEsQ0FBMUIiLCJmaWxlIjoidG9wLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5pbXBvcnQgeyBNb2RhbCwgQnV0dG9uIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuaW1wb3J0IEZhUXVlc3Rpb24gZnJvbSAncmVhY3QtaWNvbnMvbGliL2ZhL3F1ZXN0aW9uLWNpcmNsZSc7XHJcblxyXG5pbXBvcnQgJy4vdG9wLWJhci5zY3NzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdUb3BCYXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHRpdGxlLFxyXG4gICAgICBvbkNhbmNlbCxcclxuICAgICAgb25TZWxlY3QsXHJcbiAgICAgIG9uSGVscCxcclxuICAgICAgc2VsZWN0RGlzYWJsZWQsXHJcbiAgICAgIGJ0blNlbGVjdExhYmVsLFxyXG4gICAgICBidG5DYW5jZWxMYWJlbCxcclxuICAgICAgaGVscERpc2FibGVkLFxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRpYWxvZy10b3AtYmFyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tbGVmdFwiPlxyXG4gICAgICAgICAgPE1vZGFsLlRpdGxlPnsgdGl0bGUgfTwvTW9kYWwuVGl0bGU+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tcmlnaHRcIj5cclxuICAgICAgICAgIDxCdXR0b24gb25DbGljaz17b25TZWxlY3R9IGRpc2FibGVkPXtzZWxlY3REaXNhYmxlZH0+XHJcbiAgICAgICAgICAgIHtidG5TZWxlY3RMYWJlbH1cclxuICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtvbkNhbmNlbH0+e2J0bkNhbmNlbExhYmVsfTwvQnV0dG9uPlxyXG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPXtgb2MtaGVscC1idXR0b24ke2hlbHBEaXNhYmxlZCA/ICctZGlzYWJsZWQnIDogJyd9YH0gb25DbGljaz17b25IZWxwfT5cclxuICAgICAgICAgICAgPEZhUXVlc3Rpb24gLz5cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5WaWV3VG9wQmFyLnByb3BUeXBlcyA9IHtcclxuICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxyXG4gIG9uSGVscDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgaGVscERpc2FibGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxyXG4gIHNlbGVjdERpc2FibGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxyXG4gIHRpdGxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLmlzUmVxdWlyZWQsXHJcbiAgYnRuU2VsZWN0TGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXHJcbiAgYnRuQ2FuY2VsTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXHJcbn07XHJcblxyXG5WaWV3VG9wQmFyLmRlZmF1bHRQcm9wcyA9IHtcclxuICBvbkNhbmNlbDogKCkgPT4ge30sXHJcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxyXG4gIG9uSGVscDogKCkgPT4ge30sXHJcbiAgYnRuU2VsZWN0TGFiZWw6ICdTZWxlY3QnLFxyXG4gIGJ0bkNhbmNlbExhYmVsOiAnQ2FuY2VsJyxcclxufTtcclxuIl19