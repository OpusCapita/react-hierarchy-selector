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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvc2VhcmNoL2ZvdW5kLWl0ZW1zLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJSZWFjdExpc3QiLCJGYUNhcmV0UmlnaHQiLCJGYUNhcmV0RG93biIsImhpZXJhcmNoeUl0ZW1MaXN0U2hhcGUiLCJDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEUiLCJQb3BvdmVyRm91bmRJdGVtcyIsInByb3BzIiwib25Hcm91cENsaWNrSGFubGRlciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRvZ2dsZUNvbGxhcHNlIiwib25DbGlja0hhbmxkZXIiLCJrZXkiLCJzZWxlY3RJdGVtIiwib25FbnRlclByZXNzZWQiLCJrZXlDb2RlIiwiZ2V0SXRlbXMiLCJkYXRhIiwiaXRlbVJlbmRlcmVyIiwiaW5kZXgiLCJpdGVtIiwiaXRlbVJlbmRlckZ1bmN0aW9uIiwiZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbiIsImxlbmd0aCIsImdldEljb24iLCJzdGF0ZSIsImNvbGxhcHNlZCIsIm5hbWUiLCJvblNlbGVjdCIsInNldFN0YXRlIiwicmVuZGVyIiwiZ3JvdXBOYW1lIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsWUFBUCxNQUF5QixnQ0FBekI7QUFDQSxPQUFPQyxXQUFQLE1BQXdCLCtCQUF4Qjs7QUFFQSxTQUFTQyxzQkFBVCxRQUF1QyxnQkFBdkM7QUFDQSxTQUFTQywyQkFBVCxRQUE0QyxjQUE1Qzs7SUFFcUJDLGlCOzs7QUFDbkIsNkJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsZ0NBQU1BLEtBQU4s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QWhDM0IsaUI7OztBQXdGckJBLGtCQUFrQjRCLFlBQWxCLEdBQWlDO0FBQy9CTCxZQUFVLG9CQUFNLENBQUUsQ0FEYTtBQUUvQlgsUUFBTSxFQUZ5QjtBQUcvQkksc0JBQW9CO0FBSFcsQ0FBakMiLCJmaWxlIjoiZm91bmQtaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1ub25pbnRlcmFjdGl2ZS1lbGVtZW50LWludGVyYWN0aW9ucyAqL1xuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tbm9uaW50ZXJhY3RpdmUtdGFiaW5kZXggKi9cbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L2NsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHMgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3RMaXN0IGZyb20gJ3JlYWN0LWxpc3QnO1xuaW1wb3J0IEZhQ2FyZXRSaWdodCBmcm9tICdyZWFjdC1pY29ucy9saWIvZmEvY2FyZXQtcmlnaHQnO1xuaW1wb3J0IEZhQ2FyZXREb3duIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9jYXJldC1kb3duJztcblxuaW1wb3J0IHsgaGllcmFyY2h5SXRlbUxpc3RTaGFwZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzJztcbmltcG9ydCB7IENMQVNTX05BTUVfU0VBUkNIX0ZPQ1VTQUJMRSB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcG92ZXJGb3VuZEl0ZW1zIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBvbkdyb3VwQ2xpY2tIYW5sZGVyID0gKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy50b2dnbGVDb2xsYXBzZSgpO1xuICB9XG5cbiAgb25DbGlja0hhbmxkZXIgPSAoZSwga2V5KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc2VsZWN0SXRlbShrZXkpO1xuICB9XG5cbiAgb25FbnRlclByZXNzZWQgPSAoZSwga2V5KSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuc2VsZWN0SXRlbShrZXkpO1xuICAgIH1cbiAgfVxuXG4gIGdldEl0ZW1zID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZGF0YSB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGl0ZW1SZW5kZXJlciA9IChpbmRleCwga2V5KSA9PiB7XG4gICAgICBjb25zdCBpdGVtID0gZGF0YVtpbmRleF07XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtgbGlzdC1ncm91cC1pdGVtIGZvdW5kLWl0ZW0gJHtDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEV9YH1cbiAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICB0YWJJbmRleD1cIjBcIlxuICAgICAgICAgIG9uS2V5RG93bj17ZSA9PiB0aGlzLm9uRW50ZXJQcmVzc2VkKGUsIGluZGV4KX1cbiAgICAgICAgICBvbkNsaWNrPXtlID0+IHRoaXMub25DbGlja0hhbmxkZXIoZSwgaW5kZXgpfVxuICAgICAgICA+XG4gICAgICAgICAge3RoaXMucHJvcHMuaXRlbVJlbmRlckZ1bmN0aW9uID9cbiAgICAgICAgICAgIHRoaXMucHJvcHMuaXRlbVJlbmRlckZ1bmN0aW9uKGl0ZW0sIHRoaXMuZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbikgOlxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uKGl0ZW0pXG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8UmVhY3RMaXN0XG4gICAgICAgIGl0ZW1SZW5kZXJlcj17aXRlbVJlbmRlcmVyfVxuICAgICAgICBsZW5ndGg9e2RhdGEubGVuZ3RofVxuICAgICAgICB0eXBlPVwidW5pZm9ybVwiXG4gICAgICAgIHVzZVN0YXRpY1NpemVcbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIGdldEljb24gPSAoKSA9PiAodGhpcy5zdGF0ZS5jb2xsYXBzZWQgPyA8RmFDYXJldFJpZ2h0IC8+IDogPEZhQ2FyZXREb3duIC8+KTtcblxuICBkZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uID0gaXRlbSA9PiAoPHNwYW4+e2l0ZW0ubmFtZX08L3NwYW4+KTtcblxuICBzZWxlY3RJdGVtID0gKGtleSkgPT4ge1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QodGhpcy5wcm9wcy5kYXRhW2tleV0pO1xuICB9XG5cbiAgdG9nZ2xlQ29sbGFwc2UgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjb2xsYXBzZWQ6ICF0aGlzLnN0YXRlLmNvbGxhcHNlZCxcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbSBmb3VuZC1ncm91cC1pdGVtXCIgb25DbGljaz17dGhpcy5vbkdyb3VwQ2xpY2tIYW5sZGVyfT5cbiAgICAgICAge3RoaXMuZ2V0SWNvbigpfVxuICAgICAgICA8c3Bhbj57dGhpcy5wcm9wcy5ncm91cE5hbWV9PC9zcGFuPlxuICAgICAgICB7IXRoaXMuc3RhdGUuY29sbGFwc2VkICYmIHRoaXMucHJvcHMuZGF0YS5sZW5ndGggPiAwID8gdGhpcy5nZXRJdGVtcygpIDogbnVsbH1cbiAgICAgIDwvbGk+XG4gICAgKTtcbiAgfVxufVxuXG5Qb3BvdmVyRm91bmRJdGVtcy5wcm9wVHlwZXMgPSB7XG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgZ3JvdXBOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGRhdGE6IGhpZXJhcmNoeUl0ZW1MaXN0U2hhcGUsXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5Qb3BvdmVyRm91bmRJdGVtcy5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgZGF0YTogW10sXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcbn07XG4iXX0=