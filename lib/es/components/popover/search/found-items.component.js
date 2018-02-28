function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import PropTypes from 'prop-types';
import ReactList from 'react-list';
import FaCaretRight from 'react-icons/lib/fa/caret-right';
import FaCaretDown from 'react-icons/lib/fa/caret-down';

import { hierarchyItemListShape } from '../../../types';
import { CLASS_NAME_SEARCH_FOCUSABLE } from '../constants';

var PopoverFoundItems = function (_React$PureComponent) {
  _inherits(PopoverFoundItems, _React$PureComponent);

  function PopoverFoundItems(props) {
    _classCallCheck(this, PopoverFoundItems);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.onGroupClickHanlder = function (e) {
      e.preventDefault();
      _this.toggleCollapse();
    };

    _this.onClickHanlder = function (e, key) {
      e.preventDefault();
      _this.selectItem(key);
    };

    _this.onEnterPressed = function (e, key) {
      if (e.keyCode === 13) {
        e.preventDefault();
        _this.selectItem(key);
      }
    };

    _this.getItems = function () {
      var data = _this.props.data;


      var itemRenderer = function itemRenderer(index, key) {
        var item = data[index];
        return React.createElement(
          'div',
          {
            className: 'list-group-item found-item ' + CLASS_NAME_SEARCH_FOCUSABLE,
            key: key,
            tabIndex: '0',
            onKeyDown: function onKeyDown(e) {
              return _this.onEnterPressed(e, index);
            },
            onClick: function onClick(e) {
              return _this.onClickHanlder(e, index);
            }
          },
          item.name
        );
      };

      return React.createElement(ReactList, {
        itemRenderer: itemRenderer,
        length: data.length,
        type: 'uniform',
        useStaticSize: true
      });
    };

    _this.getIcon = function () {
      return _this.state.collapsed ? React.createElement(FaCaretRight, null) : React.createElement(FaCaretDown, null);
    };

    _this.selectItem = function (key) {
      _this.props.onSelect(_this.props.data[key]);
    };

    _this.toggleCollapse = function () {
      _this.setState({
        collapsed: !_this.state.collapsed
      });
    };

    _this.state = {
      collapsed: false
    };
    return _this;
  }

  PopoverFoundItems.prototype.render = function render() {
    return React.createElement(
      'li',
      { className: 'list-group-item found-group-item', onClick: this.onGroupClickHanlder },
      this.getIcon(),
      React.createElement(
        'span',
        null,
        this.props.groupName
      ),
      !this.state.collapsed && this.props.data.length > 0 ? this.getItems() : null
    );
  };

  return PopoverFoundItems;
}(React.PureComponent);

export { PopoverFoundItems as default };


PopoverFoundItems.defaultProps = {
  onSelect: function onSelect() {},
  data: []
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvc2VhcmNoL2ZvdW5kLWl0ZW1zLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJSZWFjdExpc3QiLCJGYUNhcmV0UmlnaHQiLCJGYUNhcmV0RG93biIsImhpZXJhcmNoeUl0ZW1MaXN0U2hhcGUiLCJDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEUiLCJQb3BvdmVyRm91bmRJdGVtcyIsInByb3BzIiwib25Hcm91cENsaWNrSGFubGRlciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRvZ2dsZUNvbGxhcHNlIiwib25DbGlja0hhbmxkZXIiLCJrZXkiLCJzZWxlY3RJdGVtIiwib25FbnRlclByZXNzZWQiLCJrZXlDb2RlIiwiZ2V0SXRlbXMiLCJkYXRhIiwiaXRlbVJlbmRlcmVyIiwiaW5kZXgiLCJpdGVtIiwibmFtZSIsImxlbmd0aCIsImdldEljb24iLCJzdGF0ZSIsImNvbGxhcHNlZCIsIm9uU2VsZWN0Iiwic2V0U3RhdGUiLCJyZW5kZXIiLCJncm91cE5hbWUiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxZQUFQLE1BQXlCLGdDQUF6QjtBQUNBLE9BQU9DLFdBQVAsTUFBd0IsK0JBQXhCOztBQUVBLFNBQVNDLHNCQUFULFFBQXVDLGdCQUF2QztBQUNBLFNBQVNDLDJCQUFULFFBQTRDLGNBQTVDOztJQUVxQkMsaUI7OztBQUNuQiw2QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQSxVQU9uQkMsbUJBUG1CLEdBT0csVUFBQ0MsQ0FBRCxFQUFPO0FBQzNCQSxRQUFFQyxjQUFGO0FBQ0EsWUFBS0MsY0FBTDtBQUNELEtBVmtCOztBQUFBLFVBWW5CQyxjQVptQixHQVlGLFVBQUNILENBQUQsRUFBSUksR0FBSixFQUFZO0FBQzNCSixRQUFFQyxjQUFGO0FBQ0EsWUFBS0ksVUFBTCxDQUFnQkQsR0FBaEI7QUFDRCxLQWZrQjs7QUFBQSxVQWlCbkJFLGNBakJtQixHQWlCRixVQUFDTixDQUFELEVBQUlJLEdBQUosRUFBWTtBQUMzQixVQUFJSixFQUFFTyxPQUFGLEtBQWMsRUFBbEIsRUFBc0I7QUFDcEJQLFVBQUVDLGNBQUY7QUFDQSxjQUFLSSxVQUFMLENBQWdCRCxHQUFoQjtBQUNEO0FBQ0YsS0F0QmtCOztBQUFBLFVBd0JuQkksUUF4Qm1CLEdBd0JSLFlBQU07QUFBQSxVQUNQQyxJQURPLEdBQ0UsTUFBS1gsS0FEUCxDQUNQVyxJQURPOzs7QUFHZixVQUFNQyxlQUFlLFNBQWZBLFlBQWUsQ0FBQ0MsS0FBRCxFQUFRUCxHQUFSLEVBQWdCO0FBQ25DLFlBQU1RLE9BQU9ILEtBQUtFLEtBQUwsQ0FBYjtBQUNBLGVBQ0U7QUFBQTtBQUFBO0FBQ0UsdURBQXlDZiwyQkFEM0M7QUFFRSxpQkFBS1EsR0FGUDtBQUdFLHNCQUFTLEdBSFg7QUFJRSx1QkFBVztBQUFBLHFCQUFLLE1BQUtFLGNBQUwsQ0FBb0JOLENBQXBCLEVBQXVCVyxLQUF2QixDQUFMO0FBQUEsYUFKYjtBQUtFLHFCQUFTO0FBQUEscUJBQUssTUFBS1IsY0FBTCxDQUFvQkgsQ0FBcEIsRUFBdUJXLEtBQXZCLENBQUw7QUFBQTtBQUxYO0FBT0dDLGVBQUtDO0FBUFIsU0FERjtBQVdELE9BYkQ7O0FBZUEsYUFDRSxvQkFBQyxTQUFEO0FBQ0Usc0JBQWNILFlBRGhCO0FBRUUsZ0JBQVFELEtBQUtLLE1BRmY7QUFHRSxjQUFLLFNBSFA7QUFJRTtBQUpGLFFBREY7QUFRRCxLQWxEa0I7O0FBQUEsVUFvRG5CQyxPQXBEbUIsR0FvRFQ7QUFBQSxhQUFPLE1BQUtDLEtBQUwsQ0FBV0MsU0FBWCxHQUF1QixvQkFBQyxZQUFELE9BQXZCLEdBQTBDLG9CQUFDLFdBQUQsT0FBakQ7QUFBQSxLQXBEUzs7QUFBQSxVQXNEbkJaLFVBdERtQixHQXNETixVQUFDRCxHQUFELEVBQVM7QUFDcEIsWUFBS04sS0FBTCxDQUFXb0IsUUFBWCxDQUFvQixNQUFLcEIsS0FBTCxDQUFXVyxJQUFYLENBQWdCTCxHQUFoQixDQUFwQjtBQUNELEtBeERrQjs7QUFBQSxVQTBEbkJGLGNBMURtQixHQTBERixZQUFNO0FBQ3JCLFlBQUtpQixRQUFMLENBQWM7QUFDWkYsbUJBQVcsQ0FBQyxNQUFLRCxLQUFMLENBQVdDO0FBRFgsT0FBZDtBQUdELEtBOURrQjs7QUFFakIsVUFBS0QsS0FBTCxHQUFhO0FBQ1hDLGlCQUFXO0FBREEsS0FBYjtBQUZpQjtBQUtsQjs7OEJBMkRERyxNLHFCQUFTO0FBQ1AsV0FDRTtBQUFBO0FBQUEsUUFBSSxXQUFVLGtDQUFkLEVBQWlELFNBQVMsS0FBS3JCLG1CQUEvRDtBQUNHLFdBQUtnQixPQUFMLEVBREg7QUFFRTtBQUFBO0FBQUE7QUFBTyxhQUFLakIsS0FBTCxDQUFXdUI7QUFBbEIsT0FGRjtBQUdHLE9BQUMsS0FBS0wsS0FBTCxDQUFXQyxTQUFaLElBQXlCLEtBQUtuQixLQUFMLENBQVdXLElBQVgsQ0FBZ0JLLE1BQWhCLEdBQXlCLENBQWxELEdBQXNELEtBQUtOLFFBQUwsRUFBdEQsR0FBd0U7QUFIM0UsS0FERjtBQU9ELEc7OztFQXpFNENsQixNQUFNZ0MsYTs7U0FBaEN6QixpQjs7O0FBa0ZyQkEsa0JBQWtCMEIsWUFBbEIsR0FBaUM7QUFDL0JMLFlBQVUsb0JBQU0sQ0FBRSxDQURhO0FBRS9CVCxRQUFNO0FBRnlCLENBQWpDIiwiZmlsZSI6ImZvdW5kLWl0ZW1zLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9ucyAqL1xuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tbm9uaW50ZXJhY3RpdmUtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLW5vbmludGVyYWN0aXZlLXRhYmluZGV4ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0TGlzdCBmcm9tICdyZWFjdC1saXN0JztcbmltcG9ydCBGYUNhcmV0UmlnaHQgZnJvbSAncmVhY3QtaWNvbnMvbGliL2ZhL2NhcmV0LXJpZ2h0JztcbmltcG9ydCBGYUNhcmV0RG93biBmcm9tICdyZWFjdC1pY29ucy9saWIvZmEvY2FyZXQtZG93bic7XG5cbmltcG9ydCB7IGhpZXJhcmNoeUl0ZW1MaXN0U2hhcGUgfSBmcm9tICcuLi8uLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEUgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3BvdmVyRm91bmRJdGVtcyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgb25Hcm91cENsaWNrSGFubGRlciA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMudG9nZ2xlQ29sbGFwc2UoKTtcbiAgfVxuXG4gIG9uQ2xpY2tIYW5sZGVyID0gKGUsIGtleSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnNlbGVjdEl0ZW0oa2V5KTtcbiAgfVxuXG4gIG9uRW50ZXJQcmVzc2VkID0gKGUsIGtleSkgPT4ge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnNlbGVjdEl0ZW0oa2V5KTtcbiAgICB9XG4gIH1cblxuICBnZXRJdGVtcyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRhdGEgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBpdGVtUmVuZGVyZXIgPSAoaW5kZXgsIGtleSkgPT4ge1xuICAgICAgY29uc3QgaXRlbSA9IGRhdGFbaW5kZXhdO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17YGxpc3QtZ3JvdXAtaXRlbSBmb3VuZC1pdGVtICR7Q0xBU1NfTkFNRV9TRUFSQ0hfRk9DVVNBQkxFfWB9XG4gICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgdGFiSW5kZXg9XCIwXCJcbiAgICAgICAgICBvbktleURvd249e2UgPT4gdGhpcy5vbkVudGVyUHJlc3NlZChlLCBpbmRleCl9XG4gICAgICAgICAgb25DbGljaz17ZSA9PiB0aGlzLm9uQ2xpY2tIYW5sZGVyKGUsIGluZGV4KX1cbiAgICAgICAgPlxuICAgICAgICAgIHtpdGVtLm5hbWV9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdExpc3RcbiAgICAgICAgaXRlbVJlbmRlcmVyPXtpdGVtUmVuZGVyZXJ9XG4gICAgICAgIGxlbmd0aD17ZGF0YS5sZW5ndGh9XG4gICAgICAgIHR5cGU9XCJ1bmlmb3JtXCJcbiAgICAgICAgdXNlU3RhdGljU2l6ZVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgZ2V0SWNvbiA9ICgpID0+ICh0aGlzLnN0YXRlLmNvbGxhcHNlZCA/IDxGYUNhcmV0UmlnaHQgLz4gOiA8RmFDYXJldERvd24gLz4pO1xuXG4gIHNlbGVjdEl0ZW0gPSAoa2V5KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdCh0aGlzLnByb3BzLmRhdGFba2V5XSk7XG4gIH1cblxuICB0b2dnbGVDb2xsYXBzZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNvbGxhcHNlZDogIXRoaXMuc3RhdGUuY29sbGFwc2VkLFxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8bGkgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtIGZvdW5kLWdyb3VwLWl0ZW1cIiBvbkNsaWNrPXt0aGlzLm9uR3JvdXBDbGlja0hhbmxkZXJ9PlxuICAgICAgICB7dGhpcy5nZXRJY29uKCl9XG4gICAgICAgIDxzcGFuPnt0aGlzLnByb3BzLmdyb3VwTmFtZX08L3NwYW4+XG4gICAgICAgIHshdGhpcy5zdGF0ZS5jb2xsYXBzZWQgJiYgdGhpcy5wcm9wcy5kYXRhLmxlbmd0aCA+IDAgPyB0aGlzLmdldEl0ZW1zKCkgOiBudWxsfVxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59XG5cblBvcG92ZXJGb3VuZEl0ZW1zLnByb3BUeXBlcyA9IHtcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBncm91cE5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgZGF0YTogaGllcmFyY2h5SXRlbUxpc3RTaGFwZSxcbn07XG5cblBvcG92ZXJGb3VuZEl0ZW1zLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBkYXRhOiBbXSxcbn07XG4iXX0=