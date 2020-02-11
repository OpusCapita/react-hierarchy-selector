function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import ReactList from 'react-list';
import { FaCaretRight, FaCaretDown } from 'react-icons/fa';
import { hierarchyItemListShape } from '../../../types';
import { CLASS_NAME_SEARCH_FOCUSABLE } from '../constants';

var PopoverFoundItems =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(PopoverFoundItems, _React$PureComponent);

  function PopoverFoundItems(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onGroupClickHanlder", function (e) {
      e.preventDefault();

      _this.toggleCollapse();
    });

    _defineProperty(_assertThisInitialized(_this), "onClickHanlder", function (e, key) {
      e.preventDefault();

      _this.selectItem(key);
    });

    _defineProperty(_assertThisInitialized(_this), "onEnterPressed", function (e, key) {
      if (e.keyCode === 13) {
        e.preventDefault();

        _this.selectItem(key);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getItems", function () {
      var data = _this.props.data;

      var itemRenderer = function itemRenderer(index, key) {
        var item = data[index];
        return React.createElement("div", {
          className: "list-group-item found-item " + CLASS_NAME_SEARCH_FOCUSABLE,
          key: key,
          tabIndex: "0",
          onKeyDown: function onKeyDown(e) {
            return _this.onEnterPressed(e, index);
          },
          onClick: function onClick(e) {
            return _this.onClickHanlder(e, index);
          }
        }, _this.props.itemRenderFunction ? _this.props.itemRenderFunction(item, _this.defaultItemRenderFunction) : _this.defaultItemRenderFunction(item));
      };

      return React.createElement(ReactList, {
        itemRenderer: itemRenderer,
        length: data.length,
        type: "uniform",
        useStaticSize: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getIcon", function () {
      return _this.state.collapsed ? React.createElement(FaCaretRight, null) : React.createElement(FaCaretDown, null);
    });

    _defineProperty(_assertThisInitialized(_this), "defaultItemRenderFunction", function (item) {
      return React.createElement("span", null, item.name);
    });

    _defineProperty(_assertThisInitialized(_this), "selectItem", function (key) {
      var flags = {
        interactive: true
      };

      _this.props.onSelect(_this.props.data[key], flags);
    });

    _defineProperty(_assertThisInitialized(_this), "toggleCollapse", function () {
      _this.setState({
        collapsed: !_this.state.collapsed
      });
    });

    _this.state = {
      collapsed: false
    };
    return _this;
  }

  var _proto = PopoverFoundItems.prototype;

  _proto.render = function render() {
    return React.createElement("li", {
      className: "list-group-item found-group-item",
      onClick: this.onGroupClickHanlder
    }, this.getIcon(), React.createElement("span", null, this.props.groupName), !this.state.collapsed && this.props.data.length > 0 ? this.getItems() : null);
  };

  return PopoverFoundItems;
}(React.PureComponent);

export { PopoverFoundItems as default };
PopoverFoundItems.defaultProps = {
  onSelect: function onSelect() {},
  data: [],
  itemRenderFunction: null
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvc2VhcmNoL2ZvdW5kLWl0ZW1zLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJSZWFjdExpc3QiLCJGYUNhcmV0UmlnaHQiLCJGYUNhcmV0RG93biIsImhpZXJhcmNoeUl0ZW1MaXN0U2hhcGUiLCJDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEUiLCJQb3BvdmVyRm91bmRJdGVtcyIsInByb3BzIiwiZSIsInByZXZlbnREZWZhdWx0IiwidG9nZ2xlQ29sbGFwc2UiLCJrZXkiLCJzZWxlY3RJdGVtIiwia2V5Q29kZSIsImRhdGEiLCJpdGVtUmVuZGVyZXIiLCJpbmRleCIsIml0ZW0iLCJvbkVudGVyUHJlc3NlZCIsIm9uQ2xpY2tIYW5sZGVyIiwiaXRlbVJlbmRlckZ1bmN0aW9uIiwiZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbiIsImxlbmd0aCIsInN0YXRlIiwiY29sbGFwc2VkIiwibmFtZSIsImZsYWdzIiwiaW50ZXJhY3RpdmUiLCJvblNlbGVjdCIsInNldFN0YXRlIiwicmVuZGVyIiwib25Hcm91cENsaWNrSGFubGRlciIsImdldEljb24iLCJncm91cE5hbWUiLCJnZXRJdGVtcyIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBO0FBRUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsWUFBVCxFQUF1QkMsV0FBdkIsUUFBMEMsZ0JBQTFDO0FBRUEsU0FBU0Msc0JBQVQsUUFBdUMsZ0JBQXZDO0FBQ0EsU0FBU0MsMkJBQVQsUUFBNEMsY0FBNUM7O0lBRXFCQyxpQjs7Ozs7QUFDbkIsNkJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFDakIsNENBQU1BLEtB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QUtWLEtBQUwsQ0FBV0MsU0FBWixJQUF5QixLQUFLakIsS0FBTCxDQUFXTyxJQUFYLENBQWdCUSxNQUFoQixHQUF5QixDQUFsRCxHQUFzRCxLQUFLWSxRQUFMLEVBQXRELEdBQXdFLElBSDNFLENBREY7QUFPRCxHOzs7RUFqRjRDbkMsS0FBSyxDQUFDb0MsYTs7U0FBaEM3QixpQjtBQTJGckJBLGlCQUFpQixDQUFDOEIsWUFBbEIsR0FBaUM7QUFDL0JSLEVBQUFBLFFBQVEsRUFBRSxvQkFBTSxDQUFFLENBRGE7QUFFL0JkLEVBQUFBLElBQUksRUFBRSxFQUZ5QjtBQUcvQk0sRUFBQUEsa0JBQWtCLEVBQUU7QUFIVyxDQUFqQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9ucyAqL1xuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tbm9uaW50ZXJhY3RpdmUtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLW5vbmludGVyYWN0aXZlLXRhYmluZGV4ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0TGlzdCBmcm9tICdyZWFjdC1saXN0JztcbmltcG9ydCB7IEZhQ2FyZXRSaWdodCwgRmFDYXJldERvd24gfSBmcm9tICdyZWFjdC1pY29ucy9mYSc7XG5cbmltcG9ydCB7IGhpZXJhcmNoeUl0ZW1MaXN0U2hhcGUgfSBmcm9tICcuLi8uLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEUgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3BvdmVyRm91bmRJdGVtcyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgb25Hcm91cENsaWNrSGFubGRlciA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMudG9nZ2xlQ29sbGFwc2UoKTtcbiAgfVxuXG4gIG9uQ2xpY2tIYW5sZGVyID0gKGUsIGtleSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnNlbGVjdEl0ZW0oa2V5KTtcbiAgfVxuXG4gIG9uRW50ZXJQcmVzc2VkID0gKGUsIGtleSkgPT4ge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnNlbGVjdEl0ZW0oa2V5KTtcbiAgICB9XG4gIH1cblxuICBnZXRJdGVtcyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRhdGEgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBpdGVtUmVuZGVyZXIgPSAoaW5kZXgsIGtleSkgPT4ge1xuICAgICAgY29uc3QgaXRlbSA9IGRhdGFbaW5kZXhdO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17YGxpc3QtZ3JvdXAtaXRlbSBmb3VuZC1pdGVtICR7Q0xBU1NfTkFNRV9TRUFSQ0hfRk9DVVNBQkxFfWB9XG4gICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgdGFiSW5kZXg9XCIwXCJcbiAgICAgICAgICBvbktleURvd249e2UgPT4gdGhpcy5vbkVudGVyUHJlc3NlZChlLCBpbmRleCl9XG4gICAgICAgICAgb25DbGljaz17ZSA9PiB0aGlzLm9uQ2xpY2tIYW5sZGVyKGUsIGluZGV4KX1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLnByb3BzLml0ZW1SZW5kZXJGdW5jdGlvbiA/XG4gICAgICAgICAgICB0aGlzLnByb3BzLml0ZW1SZW5kZXJGdW5jdGlvbihpdGVtLCB0aGlzLmRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24pIDpcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbihpdGVtKVxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFJlYWN0TGlzdFxuICAgICAgICBpdGVtUmVuZGVyZXI9e2l0ZW1SZW5kZXJlcn1cbiAgICAgICAgbGVuZ3RoPXtkYXRhLmxlbmd0aH1cbiAgICAgICAgdHlwZT1cInVuaWZvcm1cIlxuICAgICAgICB1c2VTdGF0aWNTaXplXG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICBnZXRJY29uID0gKCkgPT4gKHRoaXMuc3RhdGUuY29sbGFwc2VkID8gPEZhQ2FyZXRSaWdodCAvPiA6IDxGYUNhcmV0RG93biAvPik7XG5cbiAgZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbiA9IGl0ZW0gPT4gKDxzcGFuPntpdGVtLm5hbWV9PC9zcGFuPik7XG5cbiAgc2VsZWN0SXRlbSA9IChrZXkpID0+IHtcbiAgICBjb25zdCBmbGFncyA9IHtcbiAgICAgIGludGVyYWN0aXZlOiB0cnVlLFxuICAgIH07XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdCh0aGlzLnByb3BzLmRhdGFba2V5XSwgZmxhZ3MpO1xuICB9XG5cbiAgdG9nZ2xlQ29sbGFwc2UgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjb2xsYXBzZWQ6ICF0aGlzLnN0YXRlLmNvbGxhcHNlZCxcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbSBmb3VuZC1ncm91cC1pdGVtXCIgb25DbGljaz17dGhpcy5vbkdyb3VwQ2xpY2tIYW5sZGVyfT5cbiAgICAgICAge3RoaXMuZ2V0SWNvbigpfVxuICAgICAgICA8c3Bhbj57dGhpcy5wcm9wcy5ncm91cE5hbWV9PC9zcGFuPlxuICAgICAgICB7IXRoaXMuc3RhdGUuY29sbGFwc2VkICYmIHRoaXMucHJvcHMuZGF0YS5sZW5ndGggPiAwID8gdGhpcy5nZXRJdGVtcygpIDogbnVsbH1cbiAgICAgIDwvbGk+XG4gICAgKTtcbiAgfVxufVxuXG5Qb3BvdmVyRm91bmRJdGVtcy5wcm9wVHlwZXMgPSB7XG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgZ3JvdXBOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGRhdGE6IGhpZXJhcmNoeUl0ZW1MaXN0U2hhcGUsXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5Qb3BvdmVyRm91bmRJdGVtcy5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgZGF0YTogW10sXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcbn07XG4iXX0=