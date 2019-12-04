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
      var flags = {
        interactive: true
      };
      _this.props.onSelect(_this.props.data[key], flags);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvc2VhcmNoL2ZvdW5kLWl0ZW1zLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJSZWFjdExpc3QiLCJGYUNhcmV0UmlnaHQiLCJGYUNhcmV0RG93biIsImhpZXJhcmNoeUl0ZW1MaXN0U2hhcGUiLCJDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEUiLCJQb3BvdmVyRm91bmRJdGVtcyIsInByb3BzIiwib25Hcm91cENsaWNrSGFubGRlciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRvZ2dsZUNvbGxhcHNlIiwib25DbGlja0hhbmxkZXIiLCJrZXkiLCJzZWxlY3RJdGVtIiwib25FbnRlclByZXNzZWQiLCJrZXlDb2RlIiwiZ2V0SXRlbXMiLCJkYXRhIiwiaXRlbVJlbmRlcmVyIiwiaW5kZXgiLCJpdGVtIiwiaXRlbVJlbmRlckZ1bmN0aW9uIiwiZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbiIsImxlbmd0aCIsImdldEljb24iLCJzdGF0ZSIsImNvbGxhcHNlZCIsIm5hbWUiLCJmbGFncyIsImludGVyYWN0aXZlIiwib25TZWxlY3QiLCJzZXRTdGF0ZSIsInJlbmRlciIsImdyb3VwTmFtZSIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLFlBQVAsTUFBeUIsZ0NBQXpCO0FBQ0EsT0FBT0MsV0FBUCxNQUF3QiwrQkFBeEI7O0FBRUEsU0FBU0Msc0JBQVQsUUFBdUMsZ0JBQXZDO0FBQ0EsU0FBU0MsMkJBQVQsUUFBNEMsY0FBNUM7O0lBRXFCQyxpQjs7O0FBQ25CLDZCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FB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LENBQWxELEdBQXNELEtBQUtQLFFBQUwsRUFBdEQsR0FBd0U7QUFIM0UsS0FERjtBQU9ELEc7OztFQWpGNENsQixNQUFNb0MsYTs7U0FBaEM3QixpQjs7O0FBMkZyQkEsa0JBQWtCOEIsWUFBbEIsR0FBaUM7QUFDL0JMLFlBQVUsb0JBQU0sQ0FBRSxDQURhO0FBRS9CYixRQUFNLEVBRnlCO0FBRy9CSSxzQkFBb0I7QUFIVyxDQUFqQyIsImZpbGUiOiJmb3VuZC1pdGVtcy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLW5vbmludGVyYWN0aXZlLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1ub25pbnRlcmFjdGl2ZS10YWJpbmRleCAqL1xuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvY2xpY2stZXZlbnRzLWhhdmUta2V5LWV2ZW50cyAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdExpc3QgZnJvbSAncmVhY3QtbGlzdCc7XG5pbXBvcnQgRmFDYXJldFJpZ2h0IGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9jYXJldC1yaWdodCc7XG5pbXBvcnQgRmFDYXJldERvd24gZnJvbSAncmVhY3QtaWNvbnMvbGliL2ZhL2NhcmV0LWRvd24nO1xuXG5pbXBvcnQgeyBoaWVyYXJjaHlJdGVtTGlzdFNoYXBlIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMnO1xuaW1wb3J0IHsgQ0xBU1NfTkFNRV9TRUFSQ0hfRk9DVVNBQkxFIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wb3ZlckZvdW5kSXRlbXMgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIG9uR3JvdXBDbGlja0hhbmxkZXIgPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnRvZ2dsZUNvbGxhcHNlKCk7XG4gIH1cblxuICBvbkNsaWNrSGFubGRlciA9IChlLCBrZXkpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zZWxlY3RJdGVtKGtleSk7XG4gIH1cblxuICBvbkVudGVyUHJlc3NlZCA9IChlLCBrZXkpID0+IHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5zZWxlY3RJdGVtKGtleSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0SXRlbXMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgaXRlbVJlbmRlcmVyID0gKGluZGV4LCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBkYXRhW2luZGV4XTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2BsaXN0LWdyb3VwLWl0ZW0gZm91bmQtaXRlbSAke0NMQVNTX05BTUVfU0VBUkNIX0ZPQ1VTQUJMRX1gfVxuICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgIHRhYkluZGV4PVwiMFwiXG4gICAgICAgICAgb25LZXlEb3duPXtlID0+IHRoaXMub25FbnRlclByZXNzZWQoZSwgaW5kZXgpfVxuICAgICAgICAgIG9uQ2xpY2s9e2UgPT4gdGhpcy5vbkNsaWNrSGFubGRlcihlLCBpbmRleCl9XG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5pdGVtUmVuZGVyRnVuY3Rpb24gP1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pdGVtUmVuZGVyRnVuY3Rpb24oaXRlbSwgdGhpcy5kZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uKSA6XG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24oaXRlbSlcbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdExpc3RcbiAgICAgICAgaXRlbVJlbmRlcmVyPXtpdGVtUmVuZGVyZXJ9XG4gICAgICAgIGxlbmd0aD17ZGF0YS5sZW5ndGh9XG4gICAgICAgIHR5cGU9XCJ1bmlmb3JtXCJcbiAgICAgICAgdXNlU3RhdGljU2l6ZVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgZ2V0SWNvbiA9ICgpID0+ICh0aGlzLnN0YXRlLmNvbGxhcHNlZCA/IDxGYUNhcmV0UmlnaHQgLz4gOiA8RmFDYXJldERvd24gLz4pO1xuXG4gIGRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24gPSBpdGVtID0+ICg8c3Bhbj57aXRlbS5uYW1lfTwvc3Bhbj4pO1xuXG4gIHNlbGVjdEl0ZW0gPSAoa2V5KSA9PiB7XG4gICAgY29uc3QgZmxhZ3MgPSB7XG4gICAgICBpbnRlcmFjdGl2ZTogdHJ1ZSxcbiAgICB9O1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QodGhpcy5wcm9wcy5kYXRhW2tleV0sIGZsYWdzKTtcbiAgfVxuXG4gIHRvZ2dsZUNvbGxhcHNlID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY29sbGFwc2VkOiAhdGhpcy5zdGF0ZS5jb2xsYXBzZWQsXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxsaSBjbGFzc05hbWU9XCJsaXN0LWdyb3VwLWl0ZW0gZm91bmQtZ3JvdXAtaXRlbVwiIG9uQ2xpY2s9e3RoaXMub25Hcm91cENsaWNrSGFubGRlcn0+XG4gICAgICAgIHt0aGlzLmdldEljb24oKX1cbiAgICAgICAgPHNwYW4+e3RoaXMucHJvcHMuZ3JvdXBOYW1lfTwvc3Bhbj5cbiAgICAgICAgeyF0aGlzLnN0YXRlLmNvbGxhcHNlZCAmJiB0aGlzLnByb3BzLmRhdGEubGVuZ3RoID4gMCA/IHRoaXMuZ2V0SXRlbXMoKSA6IG51bGx9XG4gICAgICA8L2xpPlxuICAgICk7XG4gIH1cbn1cblxuUG9wb3ZlckZvdW5kSXRlbXMucHJvcFR5cGVzID0ge1xuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIGdyb3VwTmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBkYXRhOiBoaWVyYXJjaHlJdGVtTGlzdFNoYXBlLFxuICBpdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxufTtcblxuUG9wb3ZlckZvdW5kSXRlbXMuZGVmYXVsdFByb3BzID0ge1xuICBvblNlbGVjdDogKCkgPT4ge30sXG4gIGRhdGE6IFtdLFxuICBpdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXG59O1xuIl19