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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJCOCIsImN4IiwibSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvU3RyaW5nIiwic3Vic3RyaW5nIiwiVXRpbHMiLCJpc0NoaWxkIiwibm9kZSIsInBhcmVudCIsImNoaWxkIiwicGFyZW50Tm9kZSIsImlzRm9jdXNPbkN1cnJlbnRUYXJnZXQiLCJyZWxhdGVkVGFyZ2V0IiwiY3VycmVudFRhcmdldCIsIkhhc2hUb0FycmF5Iiwib2JqIiwidmFsdWVzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJwdXNoIiwiZW5vdWdoU2VhcmNoVGV4dExlbmd0aCIsInRleHQiLCJsZW5ndGgiLCJ1SWQ4IiwidUlkMTYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsSUFBTUEsS0FBSyxXQUFYOztBQUVBLFNBQVNDLEVBQVQsQ0FBWUMsQ0FBWixFQUFlO0FBQ2IsU0FBT0MsS0FBS0MsS0FBTCxDQUFXLENBQUMsSUFBSUQsS0FBS0UsTUFBTCxFQUFMLElBQXNCSCxDQUFqQyxFQUNKSSxRQURJLENBQ0ssRUFETCxFQUVKQyxTQUZJLENBRU0sQ0FGTixDQUFQO0FBR0Q7O0lBRW9CQyxLOzs7OztRQUNaQyxPLG9CQUFRQyxJLEVBQU1DLE0sRUFBUTtBQUMzQixRQUFJQyxRQUFRRixJQUFaOztBQUVBLFdBQU9FLFVBQVUsSUFBakIsRUFBdUI7QUFDckIsVUFBSUEsVUFBVUQsTUFBZCxFQUFzQixPQUFPLElBQVA7QUFDdEJDLGNBQVFBLE1BQU1DLFVBQWQ7QUFDRDs7QUFFRCxXQUFPLEtBQVA7QUFDRCxHOztRQUVNQyxzQix5Q0FBeUQ7QUFBQSxRQUFoQ0MsYUFBZ0MsUUFBaENBLGFBQWdDO0FBQUEsUUFBakJDLGFBQWlCLFFBQWpCQSxhQUFpQjs7QUFDOUQsUUFBSUQsa0JBQWtCLElBQXRCLEVBQTRCLE9BQU8sS0FBUDs7QUFFNUIsV0FBT1AsTUFBTUMsT0FBTixDQUFjTSxhQUFkLEVBQTZCQyxhQUE3QixDQUFQO0FBQ0QsRzs7UUFFTUMsVyx3QkFBWUMsRyxFQUFLO0FBQ3RCLFFBQU1DLFNBQVMsRUFBZjtBQUNBQyxXQUFPQyxJQUFQLENBQVlILEdBQVosRUFBaUJJLE9BQWpCLENBQXlCLFVBQUNDLEdBQUQsRUFBUztBQUNoQ0osYUFBT0ssSUFBUCxDQUFZTixJQUFJSyxHQUFKLENBQVo7QUFDRCxLQUZEO0FBR0EsV0FBT0osTUFBUDtBQUNELEc7O1FBRU1NLHNCLG1DQUF1QkMsSSxFQUFNO0FBQ2xDLFdBQU8sT0FBT0EsSUFBUCxLQUFnQixRQUFoQixJQUE0QkEsS0FBS0MsTUFBTCxHQUFjLENBQWpEO0FBQ0QsRzs7O1lBRU1DLEksR0FBTztBQUFBLFNBQU0zQixHQUFHRCxFQUFILENBQU47QUFBQSxDLFNBRVA2QixLLEdBQVE7QUFBQSxTQUFNNUIsR0FBR0QsRUFBSCxJQUFTQyxHQUFHRCxFQUFILENBQWY7QUFBQSxDO2tCQWhDSVEsSyIsImZpbGUiOiJ1dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEI4ID0gMHgxMDAwMDAwMDA7XG5cbmZ1bmN0aW9uIGN4KG0pIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIG0pXG4gICAgLnRvU3RyaW5nKDE2KVxuICAgIC5zdWJzdHJpbmcoMSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFV0aWxzIHtcbiAgc3RhdGljIGlzQ2hpbGQobm9kZSwgcGFyZW50KSB7XG4gICAgbGV0IGNoaWxkID0gbm9kZTtcblxuICAgIHdoaWxlIChjaGlsZCAhPT0gbnVsbCkge1xuICAgICAgaWYgKGNoaWxkID09PSBwYXJlbnQpIHJldHVybiB0cnVlO1xuICAgICAgY2hpbGQgPSBjaGlsZC5wYXJlbnROb2RlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0YXRpYyBpc0ZvY3VzT25DdXJyZW50VGFyZ2V0KHsgcmVsYXRlZFRhcmdldCwgY3VycmVudFRhcmdldCB9KSB7XG4gICAgaWYgKHJlbGF0ZWRUYXJnZXQgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiBVdGlscy5pc0NoaWxkKHJlbGF0ZWRUYXJnZXQsIGN1cnJlbnRUYXJnZXQpO1xuICB9XG5cbiAgc3RhdGljIEhhc2hUb0FycmF5KG9iaikge1xuICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICB2YWx1ZXMucHVzaChvYmpba2V5XSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfVxuXG4gIHN0YXRpYyBlbm91Z2hTZWFyY2hUZXh0TGVuZ3RoKHRleHQpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRleHQgPT09ICdzdHJpbmcnICYmIHRleHQubGVuZ3RoID4gMjtcbiAgfVxuXG4gIHN0YXRpYyB1SWQ4ID0gKCkgPT4gY3goQjgpO1xuXG4gIHN0YXRpYyB1SWQxNiA9ICgpID0+IGN4KEI4KSArIGN4KEI4KTtcbn1cbiJdfQ==