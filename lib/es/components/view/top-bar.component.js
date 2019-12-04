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
    var _temp, _this, _ret;

    _classCallCheck(this, ViewTopBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.handleSelectClick = function () {
      var flags = {
        interactive: true
      };
      _this.props.onSelect(flags);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ViewTopBar.prototype.render = function render() {
    var _props = this.props,
        title = _props.title,
        onCancel = _props.onCancel,
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
          {
            onClick: this.handleSelectClick,
            disabled: selectDisabled,
            className: 'btn-primary'
          },
          btnSelectLabel
        ),
        React.createElement(
          Button,
          { onClick: onCancel },
          btnCancelLabel
        ),
        React.createElement(
          'button',
          {
            type: 'button',
            className: 'oc-help-button' + (helpDisabled ? '-disabled' : ''),
            onClick: onHelp
          },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdG9wLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiTW9kYWwiLCJCdXR0b24iLCJGYVF1ZXN0aW9uIiwiVmlld1RvcEJhciIsImhhbmRsZVNlbGVjdENsaWNrIiwiZmxhZ3MiLCJpbnRlcmFjdGl2ZSIsInByb3BzIiwib25TZWxlY3QiLCJyZW5kZXIiLCJ0aXRsZSIsIm9uQ2FuY2VsIiwib25IZWxwIiwic2VsZWN0RGlzYWJsZWQiLCJidG5TZWxlY3RMYWJlbCIsImJ0bkNhbmNlbExhYmVsIiwiaGVscERpc2FibGVkIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxLQUFULEVBQWdCQyxNQUFoQixRQUE4QixpQkFBOUI7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLG9DQUF2Qjs7QUFFQSxPQUFPLGdCQUFQOztJQUVxQkMsVTs7Ozs7Ozs7Ozs7O2dLQUNuQkMsaUIsR0FBb0IsWUFBTTtBQUN4QixVQUFNQyxRQUFRO0FBQ1pDLHFCQUFhO0FBREQsT0FBZDtBQUdBLFlBQUtDLEtBQUwsQ0FBV0MsUUFBWCxDQUFvQkgsS0FBcEI7QUFDRCxLOzs7dUJBRURJLE0scUJBQVM7QUFBQSxpQkFTSCxLQUFLRixLQVRGO0FBQUEsUUFFTEcsS0FGSyxVQUVMQSxLQUZLO0FBQUEsUUFHTEMsUUFISyxVQUdMQSxRQUhLO0FBQUEsUUFJTEMsTUFKSyxVQUlMQSxNQUpLO0FBQUEsUUFLTEMsY0FMSyxVQUtMQSxjQUxLO0FBQUEsUUFNTEMsY0FOSyxVQU1MQSxjQU5LO0FBQUEsUUFPTEMsY0FQSyxVQU9MQSxjQVBLO0FBQUEsUUFRTEMsWUFSSyxVQVFMQSxZQVJLOztBQVVQLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSxtQkFBZjtBQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsYUFBZjtBQUNFO0FBQUMsZUFBRCxDQUFPLEtBQVA7QUFBQTtBQUFlTjtBQUFmO0FBREYsT0FERjtBQUlFO0FBQUE7QUFBQSxVQUFLLFdBQVUsY0FBZjtBQUNFO0FBQUMsZ0JBQUQ7QUFBQTtBQUNFLHFCQUFTLEtBQUtOLGlCQURoQjtBQUVFLHNCQUFVUyxjQUZaO0FBR0UsdUJBQVU7QUFIWjtBQUtHQztBQUxILFNBREY7QUFRRTtBQUFDLGdCQUFEO0FBQUEsWUFBUSxTQUFTSCxRQUFqQjtBQUE0Qkk7QUFBNUIsU0FSRjtBQVNFO0FBQUE7QUFBQTtBQUNFLGtCQUFLLFFBRFA7QUFFRSwyQ0FBNEJDLGVBQWUsV0FBZixHQUE2QixFQUF6RCxDQUZGO0FBR0UscUJBQVNKO0FBSFg7QUFLRSw4QkFBQyxVQUFEO0FBTEY7QUFURjtBQUpGLEtBREY7QUF3QkQsRzs7O0VBMUNxQ2QsTUFBTW1CLGE7O1NBQXpCZCxVOzs7QUF3RHJCQSxXQUFXZSxZQUFYLEdBQTBCO0FBQ3hCUCxZQUFVLG9CQUFNLENBQUUsQ0FETTtBQUV4QkgsWUFBVSxvQkFBTSxDQUFFLENBRk07QUFHeEJJLFVBQVEsa0JBQU0sQ0FBRSxDQUhRO0FBSXhCRSxrQkFBZ0IsUUFKUTtBQUt4QkMsa0JBQWdCO0FBTFEsQ0FBMUIiLCJmaWxlIjoidG9wLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IE1vZGFsLCBCdXR0b24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IEZhUXVlc3Rpb24gZnJvbSAncmVhY3QtaWNvbnMvbGliL2ZhL3F1ZXN0aW9uLWNpcmNsZSc7XG5cbmltcG9ydCAnLi90b3AtYmFyLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3VG9wQmFyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGhhbmRsZVNlbGVjdENsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IGZsYWdzID0ge1xuICAgICAgaW50ZXJhY3RpdmU6IHRydWUsXG4gICAgfTtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGZsYWdzKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB0aXRsZSxcbiAgICAgIG9uQ2FuY2VsLFxuICAgICAgb25IZWxwLFxuICAgICAgc2VsZWN0RGlzYWJsZWQsXG4gICAgICBidG5TZWxlY3RMYWJlbCxcbiAgICAgIGJ0bkNhbmNlbExhYmVsLFxuICAgICAgaGVscERpc2FibGVkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRpYWxvZy10b3AtYmFyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLWxlZnRcIj5cbiAgICAgICAgICA8TW9kYWwuVGl0bGU+eyB0aXRsZSB9PC9Nb2RhbC5UaXRsZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLXJpZ2h0XCI+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVTZWxlY3RDbGlja31cbiAgICAgICAgICAgIGRpc2FibGVkPXtzZWxlY3REaXNhYmxlZH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0bi1wcmltYXJ5XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7YnRuU2VsZWN0TGFiZWx9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtvbkNhbmNlbH0+e2J0bkNhbmNlbExhYmVsfTwvQnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgb2MtaGVscC1idXR0b24ke2hlbHBEaXNhYmxlZCA/ICctZGlzYWJsZWQnIDogJyd9YH1cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uSGVscH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8RmFRdWVzdGlvbiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuVmlld1RvcEJhci5wcm9wVHlwZXMgPSB7XG4gIG9uQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBvbkhlbHA6IFByb3BUeXBlcy5mdW5jLFxuICBoZWxwRGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIHNlbGVjdERpc2FibGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICB0aXRsZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKS5pc1JlcXVpcmVkLFxuICBidG5TZWxlY3RMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgYnRuQ2FuY2VsTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG59O1xuXG5WaWV3VG9wQmFyLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25DYW5jZWw6ICgpID0+IHt9LFxuICBvblNlbGVjdDogKCkgPT4ge30sXG4gIG9uSGVscDogKCkgPT4ge30sXG4gIGJ0blNlbGVjdExhYmVsOiAnU2VsZWN0JyxcbiAgYnRuQ2FuY2VsTGFiZWw6ICdDYW5jZWwnLFxufTtcbiJdfQ==