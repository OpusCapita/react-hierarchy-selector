'use strict';

exports.__esModule = true;

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var B8 = 0x100000000;

function cx(m) {
  return Math.floor((1 + Math.random()) * m).toString(16).substring(1);
}

var Utils = (_temp = _class = function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  Utils.isChild = function isChild(node, parent) {
    var child = node;

    while (child !== null) {
      if (child === parent) return true;
      child = child.parentNode;
    }

    return false;
  };

  Utils.isFocusOnCurrentTarget = function isFocusOnCurrentTarget(_ref) {
    var relatedTarget = _ref.relatedTarget,
        currentTarget = _ref.currentTarget;

    if (relatedTarget === null) return false;

    return Utils.isChild(relatedTarget, currentTarget);
  };

  Utils.HashToArray = function HashToArray(obj) {
    var values = [];
    Object.keys(obj).forEach(function (key) {
      values.push(obj[key]);
    });
    return values;
  };

  Utils.enoughSearchTextLength = function enoughSearchTextLength(text) {
    return typeof text === 'string' && text.length > 2;
  };

  return Utils;
}(), _class.uId8 = function () {
  return cx(B8);
}, _class.uId16 = function () {
  return cx(B8) + cx(B8);
}, _temp);
exports.default = Utils;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJCOCIsImN4IiwibSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvU3RyaW5nIiwic3Vic3RyaW5nIiwiVXRpbHMiLCJpc0NoaWxkIiwibm9kZSIsInBhcmVudCIsImNoaWxkIiwicGFyZW50Tm9kZSIsImlzRm9jdXNPbkN1cnJlbnRUYXJnZXQiLCJyZWxhdGVkVGFyZ2V0IiwiY3VycmVudFRhcmdldCIsIkhhc2hUb0FycmF5Iiwib2JqIiwidmFsdWVzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJwdXNoIiwiZW5vdWdoU2VhcmNoVGV4dExlbmd0aCIsInRleHQiLCJsZW5ndGgiLCJ1SWQ4IiwidUlkMTYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsSUFBTUEsS0FBSyxXQUFYOztBQUVBLFNBQVNDLEVBQVQsQ0FBWUMsQ0FBWixFQUFlO0FBQ2IsU0FBT0MsS0FBS0MsS0FBTCxDQUFXLENBQUMsSUFBSUQsS0FBS0UsTUFBTCxFQUFMLElBQXNCSCxDQUFqQyxFQUNKSSxRQURJLENBQ0ssRUFETCxFQUVKQyxTQUZJLENBRU0sQ0FGTixDQUFQO0FBR0Q7O0lBRW9CQyxLOzs7OztRQUNaQyxPLG9CQUFRQyxJLEVBQU1DLE0sRUFBUTtBQUMzQixRQUFJQyxRQUFRRixJQUFaOztBQUVBLFdBQU9FLFVBQVUsSUFBakIsRUFBdUI7QUFDckIsVUFBSUEsVUFBVUQsTUFBZCxFQUFzQixPQUFPLElBQVA7QUFDdEJDLGNBQVFBLE1BQU1DLFVBQWQ7QUFDRDs7QUFFRCxXQUFPLEtBQVA7QUFDRCxHOztRQUVNQyxzQix5Q0FBeUQ7QUFBQSxRQUFoQ0MsYUFBZ0MsUUFBaENBLGFBQWdDO0FBQUEsUUFBakJDLGFBQWlCLFFBQWpCQSxhQUFpQjs7QUFDOUQsUUFBSUQsa0JBQWtCLElBQXRCLEVBQTRCLE9BQU8sS0FBUDs7QUFFNUIsV0FBT1AsTUFBTUMsT0FBTixDQUFjTSxhQUFkLEVBQTZCQyxhQUE3QixDQUFQO0FBQ0QsRzs7UUFFTUMsVyx3QkFBWUMsRyxFQUFLO0FBQ3RCLFFBQU1DLFNBQVMsRUFBZjtBQUNBQyxXQUFPQyxJQUFQLENBQVlILEdBQVosRUFBaUJJLE9BQWpCLENBQXlCLFVBQUNDLEdBQUQsRUFBUztBQUNoQ0osYUFBT0ssSUFBUCxDQUFZTixJQUFJSyxHQUFKLENBQVo7QUFDRCxLQUZEO0FBR0EsV0FBT0osTUFBUDtBQUNELEc7O1FBRU1NLHNCLG1DQUF1QkMsSSxFQUFNO0FBQ2xDLFdBQU8sT0FBT0EsSUFBUCxLQUFnQixRQUFoQixJQUE0QkEsS0FBS0MsTUFBTCxHQUFjLENBQWpEO0FBQ0QsRzs7O1lBRU1DLEksR0FBTztBQUFBLFNBQU0zQixHQUFHRCxFQUFILENBQU47QUFBQSxDLFNBRVA2QixLLEdBQVE7QUFBQSxTQUFNNUIsR0FBR0QsRUFBSCxJQUFTQyxHQUFHRCxFQUFILENBQWY7QUFBQSxDO2tCQWhDSVEsSyIsImZpbGUiOiJ1dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEI4ID0gMHgxMDAwMDAwMDA7XHJcblxyXG5mdW5jdGlvbiBjeChtKSB7XHJcbiAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIG0pXHJcbiAgICAudG9TdHJpbmcoMTYpXHJcbiAgICAuc3Vic3RyaW5nKDEpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVdGlscyB7XHJcbiAgc3RhdGljIGlzQ2hpbGQobm9kZSwgcGFyZW50KSB7XHJcbiAgICBsZXQgY2hpbGQgPSBub2RlO1xyXG5cclxuICAgIHdoaWxlIChjaGlsZCAhPT0gbnVsbCkge1xyXG4gICAgICBpZiAoY2hpbGQgPT09IHBhcmVudCkgcmV0dXJuIHRydWU7XHJcbiAgICAgIGNoaWxkID0gY2hpbGQucGFyZW50Tm9kZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaXNGb2N1c09uQ3VycmVudFRhcmdldCh7IHJlbGF0ZWRUYXJnZXQsIGN1cnJlbnRUYXJnZXQgfSkge1xyXG4gICAgaWYgKHJlbGF0ZWRUYXJnZXQgPT09IG51bGwpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICByZXR1cm4gVXRpbHMuaXNDaGlsZChyZWxhdGVkVGFyZ2V0LCBjdXJyZW50VGFyZ2V0KTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBIYXNoVG9BcnJheShvYmopIHtcclxuICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xyXG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgdmFsdWVzLnB1c2gob2JqW2tleV0pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdmFsdWVzO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGVub3VnaFNlYXJjaFRleHRMZW5ndGgodGV4dCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB0ZXh0ID09PSAnc3RyaW5nJyAmJiB0ZXh0Lmxlbmd0aCA+IDI7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgdUlkOCA9ICgpID0+IGN4KEI4KTtcclxuXHJcbiAgc3RhdGljIHVJZDE2ID0gKCkgPT4gY3goQjgpICsgY3goQjgpO1xyXG59XHJcbiJdfQ==