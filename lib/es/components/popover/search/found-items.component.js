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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvc2VhcmNoL2ZvdW5kLWl0ZW1zLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJSZWFjdExpc3QiLCJGYUNhcmV0UmlnaHQiLCJGYUNhcmV0RG93biIsImhpZXJhcmNoeUl0ZW1MaXN0U2hhcGUiLCJDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEUiLCJQb3BvdmVyRm91bmRJdGVtcyIsInByb3BzIiwib25Hcm91cENsaWNrSGFubGRlciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRvZ2dsZUNvbGxhcHNlIiwib25DbGlja0hhbmxkZXIiLCJrZXkiLCJzZWxlY3RJdGVtIiwib25FbnRlclByZXNzZWQiLCJrZXlDb2RlIiwiZ2V0SXRlbXMiLCJkYXRhIiwiaXRlbVJlbmRlcmVyIiwiaW5kZXgiLCJpdGVtIiwibmFtZSIsImxlbmd0aCIsImdldEljb24iLCJzdGF0ZSIsImNvbGxhcHNlZCIsIm9uU2VsZWN0Iiwic2V0U3RhdGUiLCJyZW5kZXIiLCJncm91cE5hbWUiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxZQUFQLE1BQXlCLGdDQUF6QjtBQUNBLE9BQU9DLFdBQVAsTUFBd0IsK0JBQXhCOztBQUVBLFNBQVNDLHNCQUFULFFBQXVDLGdCQUF2QztBQUNBLFNBQVNDLDJCQUFULFFBQTRDLGNBQTVDOztJQUVxQkMsaUI7OztBQUNuQiw2QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQSxVQU9uQkMsbUJBUG1CLEdBT0csVUFBQ0MsQ0FBRCxFQUFPO0FBQzNCQSxRQUFFQyxjQUFGO0FBQ0EsWUFBS0MsY0FBTDtBQUNELEtBVmtCOztBQUFBLFVBWW5CQyxjQVptQixHQVlGLFVBQUNILENBQUQsRUFBSUksR0FBSixFQUFZO0FBQzNCSixRQUFFQyxjQUFGO0FBQ0EsWUFBS0ksVUFBTCxDQUFnQkQsR0FBaEI7QUFDRCxLQWZrQjs7QUFBQSxVQWlCbkJFLGNBakJtQixHQWlCRixVQUFDTixDQUFELEVBQUlJLEdBQUosRUFBWTtBQUMzQixVQUFJSixFQUFFTyxPQUFGLEtBQWMsRUFBbEIsRUFBc0I7QUFDcEJQLFVBQUVDLGNBQUY7QUFDQSxjQUFLSSxVQUFMLENBQWdCRCxHQUFoQjtBQUNEO0FBQ0YsS0F0QmtCOztBQUFBLFVBd0JuQkksUUF4Qm1CLEdBd0JSLFlBQU07QUFBQSxVQUNQQyxJQURPLEdBQ0UsTUFBS1gsS0FEUCxDQUNQVyxJQURPOzs7QUFHZixVQUFNQyxlQUFlLFNBQWZBLFlBQWUsQ0FBQ0MsS0FBRCxFQUFRUCxHQUFSLEVBQWdCO0FBQ25DLFlBQU1RLE9BQU9ILEtBQUtFLEtBQUwsQ0FBYjtBQUNBLGVBQ0U7QUFBQTtBQUFBO0FBQ0UsdURBQXlDZiwyQkFEM0M7QUFFRSxpQkFBS1EsR0FGUDtBQUdFLHNCQUFTLEdBSFg7QUFJRSx1QkFBVztBQUFBLHFCQUFLLE1BQUtFLGNBQUwsQ0FBb0JOLENBQXBCLEVBQXVCVyxLQUF2QixDQUFMO0FBQUEsYUFKYjtBQUtFLHFCQUFTO0FBQUEscUJBQUssTUFBS1IsY0FBTCxDQUFvQkgsQ0FBcEIsRUFBdUJXLEtBQXZCLENBQUw7QUFBQTtBQUxYO0FBT0dDLGVBQUtDO0FBUFIsU0FERjtBQVdELE9BYkQ7O0FBZUEsYUFDRSxvQkFBQyxTQUFEO0FBQ0Usc0JBQWNILFlBRGhCO0FBRUUsZ0JBQVFELEtBQUtLLE1BRmY7QUFHRSxjQUFLLFNBSFA7QUFJRTtBQUpGLFFBREY7QUFRRCxLQWxEa0I7O0FBQUEsVUFvRG5CQyxPQXBEbUIsR0FvRFQ7QUFBQSxhQUFPLE1BQUtDLEtBQUwsQ0FBV0MsU0FBWCxHQUF1QixvQkFBQyxZQUFELE9BQXZCLEdBQTBDLG9CQUFDLFdBQUQsT0FBakQ7QUFBQSxLQXBEUzs7QUFBQSxVQXNEbkJaLFVBdERtQixHQXNETixVQUFDRCxHQUFELEVBQVM7QUFDcEIsWUFBS04sS0FBTCxDQUFXb0IsUUFBWCxDQUFvQixNQUFLcEIsS0FBTCxDQUFXVyxJQUFYLENBQWdCTCxHQUFoQixDQUFwQjtBQUNELEtBeERrQjs7QUFBQSxVQTBEbkJGLGNBMURtQixHQTBERixZQUFNO0FBQ3JCLFlBQUtpQixRQUFMLENBQWM7QUFDWkYsbUJBQVcsQ0FBQyxNQUFLRCxLQUFMLENBQVdDO0FBRFgsT0FBZDtBQUdELEtBOURrQjs7QUFFakIsVUFBS0QsS0FBTCxHQUFhO0FBQ1hDLGlCQUFXO0FBREEsS0FBYjtBQUZpQjtBQUtsQjs7OEJBMkRERyxNLHFCQUFTO0FBQ1AsV0FDRTtBQUFBO0FBQUEsUUFBSSxXQUFVLGtDQUFkLEVBQWlELFNBQVMsS0FBS3JCLG1CQUEvRDtBQUNHLFdBQUtnQixPQUFMLEVBREg7QUFFRTtBQUFBO0FBQUE7QUFBTyxhQUFLakIsS0FBTCxDQUFXdUI7QUFBbEIsT0FGRjtBQUdHLE9BQUMsS0FBS0wsS0FBTCxDQUFXQyxTQUFaLElBQXlCLEtBQUtuQixLQUFMLENBQVdXLElBQVgsQ0FBZ0JLLE1BQWhCLEdBQXlCLENBQWxELEdBQXNELEtBQUtOLFFBQUwsRUFBdEQsR0FBd0U7QUFIM0UsS0FERjtBQU9ELEc7OztFQXpFNENsQixNQUFNZ0MsYTs7U0FBaEN6QixpQjs7O0FBa0ZyQkEsa0JBQWtCMEIsWUFBbEIsR0FBaUM7QUFDL0JMLFlBQVUsb0JBQU0sQ0FBRSxDQURhO0FBRS9CVCxRQUFNO0FBRnlCLENBQWpDIiwiZmlsZSI6ImZvdW5kLWl0ZW1zLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9ucyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1ub25pbnRlcmFjdGl2ZS1lbGVtZW50LWludGVyYWN0aW9ucyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1ub25pbnRlcmFjdGl2ZS10YWJpbmRleCAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5pbXBvcnQgUmVhY3RMaXN0IGZyb20gJ3JlYWN0LWxpc3QnO1xyXG5pbXBvcnQgRmFDYXJldFJpZ2h0IGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9jYXJldC1yaWdodCc7XHJcbmltcG9ydCBGYUNhcmV0RG93biBmcm9tICdyZWFjdC1pY29ucy9saWIvZmEvY2FyZXQtZG93bic7XHJcblxyXG5pbXBvcnQgeyBoaWVyYXJjaHlJdGVtTGlzdFNoYXBlIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMnO1xyXG5pbXBvcnQgeyBDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEUgfSBmcm9tICcuLi9jb25zdGFudHMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wb3ZlckZvdW5kSXRlbXMgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgY29sbGFwc2VkOiBmYWxzZSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBvbkdyb3VwQ2xpY2tIYW5sZGVyID0gKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMudG9nZ2xlQ29sbGFwc2UoKTtcclxuICB9XHJcblxyXG4gIG9uQ2xpY2tIYW5sZGVyID0gKGUsIGtleSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdGhpcy5zZWxlY3RJdGVtKGtleSk7XHJcbiAgfVxyXG5cclxuICBvbkVudGVyUHJlc3NlZCA9IChlLCBrZXkpID0+IHtcclxuICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdGhpcy5zZWxlY3RJdGVtKGtleSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRJdGVtcyA9ICgpID0+IHtcclxuICAgIGNvbnN0IHsgZGF0YSB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICBjb25zdCBpdGVtUmVuZGVyZXIgPSAoaW5kZXgsIGtleSkgPT4ge1xyXG4gICAgICBjb25zdCBpdGVtID0gZGF0YVtpbmRleF07XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtgbGlzdC1ncm91cC1pdGVtIGZvdW5kLWl0ZW0gJHtDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEV9YH1cclxuICAgICAgICAgIGtleT17a2V5fVxyXG4gICAgICAgICAgdGFiSW5kZXg9XCIwXCJcclxuICAgICAgICAgIG9uS2V5RG93bj17ZSA9PiB0aGlzLm9uRW50ZXJQcmVzc2VkKGUsIGluZGV4KX1cclxuICAgICAgICAgIG9uQ2xpY2s9e2UgPT4gdGhpcy5vbkNsaWNrSGFubGRlcihlLCBpbmRleCl9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAge2l0ZW0ubmFtZX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPFJlYWN0TGlzdFxyXG4gICAgICAgIGl0ZW1SZW5kZXJlcj17aXRlbVJlbmRlcmVyfVxyXG4gICAgICAgIGxlbmd0aD17ZGF0YS5sZW5ndGh9XHJcbiAgICAgICAgdHlwZT1cInVuaWZvcm1cIlxyXG4gICAgICAgIHVzZVN0YXRpY1NpemVcclxuICAgICAgLz5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXRJY29uID0gKCkgPT4gKHRoaXMuc3RhdGUuY29sbGFwc2VkID8gPEZhQ2FyZXRSaWdodCAvPiA6IDxGYUNhcmV0RG93biAvPik7XHJcblxyXG4gIHNlbGVjdEl0ZW0gPSAoa2V5KSA9PiB7XHJcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KHRoaXMucHJvcHMuZGF0YVtrZXldKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUNvbGxhcHNlID0gKCkgPT4ge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGNvbGxhcHNlZDogIXRoaXMuc3RhdGUuY29sbGFwc2VkLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8bGkgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtIGZvdW5kLWdyb3VwLWl0ZW1cIiBvbkNsaWNrPXt0aGlzLm9uR3JvdXBDbGlja0hhbmxkZXJ9PlxyXG4gICAgICAgIHt0aGlzLmdldEljb24oKX1cclxuICAgICAgICA8c3Bhbj57dGhpcy5wcm9wcy5ncm91cE5hbWV9PC9zcGFuPlxyXG4gICAgICAgIHshdGhpcy5zdGF0ZS5jb2xsYXBzZWQgJiYgdGhpcy5wcm9wcy5kYXRhLmxlbmd0aCA+IDAgPyB0aGlzLmdldEl0ZW1zKCkgOiBudWxsfVxyXG4gICAgICA8L2xpPlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcblBvcG92ZXJGb3VuZEl0ZW1zLnByb3BUeXBlcyA9IHtcclxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgZ3JvdXBOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgZGF0YTogaGllcmFyY2h5SXRlbUxpc3RTaGFwZSxcclxufTtcclxuXHJcblBvcG92ZXJGb3VuZEl0ZW1zLmRlZmF1bHRQcm9wcyA9IHtcclxuICBvblNlbGVjdDogKCkgPT4ge30sXHJcbiAgZGF0YTogW10sXHJcbn07XHJcbiJdfQ==