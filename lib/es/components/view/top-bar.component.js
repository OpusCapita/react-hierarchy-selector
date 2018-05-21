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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdG9wLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiTW9kYWwiLCJCdXR0b24iLCJGYVF1ZXN0aW9uIiwiVmlld1RvcEJhciIsInJlbmRlciIsInByb3BzIiwidGl0bGUiLCJvbkNhbmNlbCIsIm9uU2VsZWN0Iiwib25IZWxwIiwic2VsZWN0RGlzYWJsZWQiLCJidG5TZWxlY3RMYWJlbCIsImJ0bkNhbmNlbExhYmVsIiwiaGVscERpc2FibGVkIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxLQUFULEVBQWdCQyxNQUFoQixRQUE4QixpQkFBOUI7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLG9DQUF2Qjs7QUFFQSxPQUFPLGdCQUFQOztJQUVxQkMsVTs7Ozs7Ozs7O3VCQUNuQkMsTSxxQkFBUztBQUFBLGlCQVVILEtBQUtDLEtBVkY7QUFBQSxRQUVMQyxLQUZLLFVBRUxBLEtBRks7QUFBQSxRQUdMQyxRQUhLLFVBR0xBLFFBSEs7QUFBQSxRQUlMQyxRQUpLLFVBSUxBLFFBSks7QUFBQSxRQUtMQyxNQUxLLFVBS0xBLE1BTEs7QUFBQSxRQU1MQyxjQU5LLFVBTUxBLGNBTks7QUFBQSxRQU9MQyxjQVBLLFVBT0xBLGNBUEs7QUFBQSxRQVFMQyxjQVJLLFVBUUxBLGNBUks7QUFBQSxRQVNMQyxZQVRLLFVBU0xBLFlBVEs7O0FBV1AsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLG1CQUFmO0FBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxhQUFmO0FBQ0U7QUFBQyxlQUFELENBQU8sS0FBUDtBQUFBO0FBQWVQO0FBQWY7QUFERixPQURGO0FBSUU7QUFBQTtBQUFBLFVBQUssV0FBVSxjQUFmO0FBQ0U7QUFBQyxnQkFBRDtBQUFBLFlBQVEsU0FBU0UsUUFBakIsRUFBMkIsVUFBVUUsY0FBckM7QUFDR0M7QUFESCxTQURGO0FBSUU7QUFBQyxnQkFBRDtBQUFBLFlBQVEsU0FBU0osUUFBakI7QUFBNEJLO0FBQTVCLFNBSkY7QUFLRTtBQUFBO0FBQUEsWUFBUSxNQUFLLFFBQWIsRUFBc0IsK0JBQTRCQyxlQUFlLFdBQWYsR0FBNkIsRUFBekQsQ0FBdEIsRUFBcUYsU0FBU0osTUFBOUY7QUFDRSw4QkFBQyxVQUFEO0FBREY7QUFMRjtBQUpGLEtBREY7QUFnQkQsRzs7O0VBNUJxQ1gsTUFBTWdCLGE7O1NBQXpCWCxVOzs7QUEwQ3JCQSxXQUFXWSxZQUFYLEdBQTBCO0FBQ3hCUixZQUFVLG9CQUFNLENBQUUsQ0FETTtBQUV4QkMsWUFBVSxvQkFBTSxDQUFFLENBRk07QUFHeEJDLFVBQVEsa0JBQU0sQ0FBRSxDQUhRO0FBSXhCRSxrQkFBZ0IsUUFKUTtBQUt4QkMsa0JBQWdCO0FBTFEsQ0FBMUIiLCJmaWxlIjoidG9wLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IE1vZGFsLCBCdXR0b24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IEZhUXVlc3Rpb24gZnJvbSAncmVhY3QtaWNvbnMvbGliL2ZhL3F1ZXN0aW9uLWNpcmNsZSc7XG5cbmltcG9ydCAnLi90b3AtYmFyLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3VG9wQmFyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB0aXRsZSxcbiAgICAgIG9uQ2FuY2VsLFxuICAgICAgb25TZWxlY3QsXG4gICAgICBvbkhlbHAsXG4gICAgICBzZWxlY3REaXNhYmxlZCxcbiAgICAgIGJ0blNlbGVjdExhYmVsLFxuICAgICAgYnRuQ2FuY2VsTGFiZWwsXG4gICAgICBoZWxwRGlzYWJsZWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGlhbG9nLXRvcC1iYXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tbGVmdFwiPlxuICAgICAgICAgIDxNb2RhbC5UaXRsZT57IHRpdGxlIH08L01vZGFsLlRpdGxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tcmlnaHRcIj5cbiAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e29uU2VsZWN0fSBkaXNhYmxlZD17c2VsZWN0RGlzYWJsZWR9PlxuICAgICAgICAgICAge2J0blNlbGVjdExhYmVsfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b24gb25DbGljaz17b25DYW5jZWx9PntidG5DYW5jZWxMYWJlbH08L0J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9e2BvYy1oZWxwLWJ1dHRvbiR7aGVscERpc2FibGVkID8gJy1kaXNhYmxlZCcgOiAnJ31gfSBvbkNsaWNrPXtvbkhlbHB9PlxuICAgICAgICAgICAgPEZhUXVlc3Rpb24gLz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblZpZXdUb3BCYXIucHJvcFR5cGVzID0ge1xuICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgb25IZWxwOiBQcm9wVHlwZXMuZnVuYyxcbiAgaGVscERpc2FibGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBzZWxlY3REaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgdGl0bGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSkuaXNSZXF1aXJlZCxcbiAgYnRuU2VsZWN0TGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIGJ0bkNhbmNlbExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxufTtcblxuVmlld1RvcEJhci5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uQ2FuY2VsOiAoKSA9PiB7fSxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBvbkhlbHA6ICgpID0+IHt9LFxuICBidG5TZWxlY3RMYWJlbDogJ1NlbGVjdCcsXG4gIGJ0bkNhbmNlbExhYmVsOiAnQ2FuY2VsJyxcbn07XG4iXX0=