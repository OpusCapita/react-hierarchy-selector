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
          _this.props.itemRenderFunction ? _this.props.itemRenderFunction(item, _this.defaultItemRenderFunction) : _this.defaultItemRenderFunction(item)
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

    _this.defaultItemRenderFunction = function (item) {
      return React.createElement(
        'span',
        null,
        item.name
      );
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
  data: [],
  itemRenderFunction: null
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvc2VhcmNoL2ZvdW5kLWl0ZW1zLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJSZWFjdExpc3QiLCJGYUNhcmV0UmlnaHQiLCJGYUNhcmV0RG93biIsImhpZXJhcmNoeUl0ZW1MaXN0U2hhcGUiLCJDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEUiLCJQb3BvdmVyRm91bmRJdGVtcyIsInByb3BzIiwib25Hcm91cENsaWNrSGFubGRlciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRvZ2dsZUNvbGxhcHNlIiwib25DbGlja0hhbmxkZXIiLCJrZXkiLCJzZWxlY3RJdGVtIiwib25FbnRlclByZXNzZWQiLCJrZXlDb2RlIiwiZ2V0SXRlbXMiLCJkYXRhIiwiaXRlbVJlbmRlcmVyIiwiaW5kZXgiLCJpdGVtIiwiaXRlbVJlbmRlckZ1bmN0aW9uIiwiZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbiIsImxlbmd0aCIsImdldEljb24iLCJzdGF0ZSIsImNvbGxhcHNlZCIsIm5hbWUiLCJvblNlbGVjdCIsInNldFN0YXRlIiwicmVuZGVyIiwiZ3JvdXBOYW1lIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsWUFBUCxNQUF5QixnQ0FBekI7QUFDQSxPQUFPQyxXQUFQLE1BQXdCLCtCQUF4Qjs7QUFFQSxTQUFTQyxzQkFBVCxRQUF1QyxnQkFBdkM7QUFDQSxTQUFTQywyQkFBVCxRQUE0QyxjQUE1Qzs7SUFFcUJDLGlCOzs7QUFDbkIsNkJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsZ0NBQU1BLEtBQU4s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QWhDM0IsaUI7OztBQXdGckJBLGtCQUFrQjRCLFlBQWxCLEdBQWlDO0FBQy9CTCxZQUFVLG9CQUFNLENBQUUsQ0FEYTtBQUUvQlgsUUFBTSxFQUZ5QjtBQUcvQkksc0JBQW9CO0FBSFcsQ0FBakMiLCJmaWxlIjoiZm91bmQtaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLW5vbmludGVyYWN0aXZlLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLW5vbmludGVyYWN0aXZlLXRhYmluZGV4ICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L2NsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHMgKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCBSZWFjdExpc3QgZnJvbSAncmVhY3QtbGlzdCc7XHJcbmltcG9ydCBGYUNhcmV0UmlnaHQgZnJvbSAncmVhY3QtaWNvbnMvbGliL2ZhL2NhcmV0LXJpZ2h0JztcclxuaW1wb3J0IEZhQ2FyZXREb3duIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9jYXJldC1kb3duJztcclxuXHJcbmltcG9ydCB7IGhpZXJhcmNoeUl0ZW1MaXN0U2hhcGUgfSBmcm9tICcuLi8uLi8uLi90eXBlcyc7XHJcbmltcG9ydCB7IENMQVNTX05BTUVfU0VBUkNIX0ZPQ1VTQUJMRSB9IGZyb20gJy4uL2NvbnN0YW50cyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3BvdmVyRm91bmRJdGVtcyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIG9uR3JvdXBDbGlja0hhbmxkZXIgPSAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdGhpcy50b2dnbGVDb2xsYXBzZSgpO1xyXG4gIH1cclxuXHJcbiAgb25DbGlja0hhbmxkZXIgPSAoZSwga2V5KSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0aGlzLnNlbGVjdEl0ZW0oa2V5KTtcclxuICB9XHJcblxyXG4gIG9uRW50ZXJQcmVzc2VkID0gKGUsIGtleSkgPT4ge1xyXG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0aGlzLnNlbGVjdEl0ZW0oa2V5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldEl0ZW1zID0gKCkgPT4ge1xyXG4gICAgY29uc3QgeyBkYXRhIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIGNvbnN0IGl0ZW1SZW5kZXJlciA9IChpbmRleCwga2V5KSA9PiB7XHJcbiAgICAgIGNvbnN0IGl0ZW0gPSBkYXRhW2luZGV4XTtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICBjbGFzc05hbWU9e2BsaXN0LWdyb3VwLWl0ZW0gZm91bmQtaXRlbSAke0NMQVNTX05BTUVfU0VBUkNIX0ZPQ1VTQUJMRX1gfVxyXG4gICAgICAgICAga2V5PXtrZXl9XHJcbiAgICAgICAgICB0YWJJbmRleD1cIjBcIlxyXG4gICAgICAgICAgb25LZXlEb3duPXtlID0+IHRoaXMub25FbnRlclByZXNzZWQoZSwgaW5kZXgpfVxyXG4gICAgICAgICAgb25DbGljaz17ZSA9PiB0aGlzLm9uQ2xpY2tIYW5sZGVyKGUsIGluZGV4KX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICB7dGhpcy5wcm9wcy5pdGVtUmVuZGVyRnVuY3Rpb24gP1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLml0ZW1SZW5kZXJGdW5jdGlvbihpdGVtLCB0aGlzLmRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24pIDpcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uKGl0ZW0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxSZWFjdExpc3RcclxuICAgICAgICBpdGVtUmVuZGVyZXI9e2l0ZW1SZW5kZXJlcn1cclxuICAgICAgICBsZW5ndGg9e2RhdGEubGVuZ3RofVxyXG4gICAgICAgIHR5cGU9XCJ1bmlmb3JtXCJcclxuICAgICAgICB1c2VTdGF0aWNTaXplXHJcbiAgICAgIC8+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0SWNvbiA9ICgpID0+ICh0aGlzLnN0YXRlLmNvbGxhcHNlZCA/IDxGYUNhcmV0UmlnaHQgLz4gOiA8RmFDYXJldERvd24gLz4pO1xyXG5cclxuICBkZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uID0gaXRlbSA9PiAoPHNwYW4+e2l0ZW0ubmFtZX08L3NwYW4+KTsgXHJcblxyXG4gIHNlbGVjdEl0ZW0gPSAoa2V5KSA9PiB7XHJcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KHRoaXMucHJvcHMuZGF0YVtrZXldKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUNvbGxhcHNlID0gKCkgPT4ge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGNvbGxhcHNlZDogIXRoaXMuc3RhdGUuY29sbGFwc2VkLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8bGkgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtIGZvdW5kLWdyb3VwLWl0ZW1cIiBvbkNsaWNrPXt0aGlzLm9uR3JvdXBDbGlja0hhbmxkZXJ9PlxyXG4gICAgICAgIHt0aGlzLmdldEljb24oKX1cclxuICAgICAgICA8c3Bhbj57dGhpcy5wcm9wcy5ncm91cE5hbWV9PC9zcGFuPlxyXG4gICAgICAgIHshdGhpcy5zdGF0ZS5jb2xsYXBzZWQgJiYgdGhpcy5wcm9wcy5kYXRhLmxlbmd0aCA+IDAgPyB0aGlzLmdldEl0ZW1zKCkgOiBudWxsfVxyXG4gICAgICA8L2xpPlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcblBvcG92ZXJGb3VuZEl0ZW1zLnByb3BUeXBlcyA9IHtcclxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgZ3JvdXBOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgZGF0YTogaGllcmFyY2h5SXRlbUxpc3RTaGFwZSxcclxuICBpdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxyXG59O1xyXG5cclxuUG9wb3ZlckZvdW5kSXRlbXMuZGVmYXVsdFByb3BzID0ge1xyXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcclxuICBkYXRhOiBbXSxcclxuICBpdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXHJcbn07XHJcbiJdfQ==