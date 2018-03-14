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
export { Utils as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJCOCIsImN4IiwibSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvU3RyaW5nIiwic3Vic3RyaW5nIiwiVXRpbHMiLCJpc0NoaWxkIiwibm9kZSIsInBhcmVudCIsImNoaWxkIiwicGFyZW50Tm9kZSIsImlzRm9jdXNPbkN1cnJlbnRUYXJnZXQiLCJyZWxhdGVkVGFyZ2V0IiwiY3VycmVudFRhcmdldCIsIkhhc2hUb0FycmF5Iiwib2JqIiwidmFsdWVzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJwdXNoIiwiZW5vdWdoU2VhcmNoVGV4dExlbmd0aCIsInRleHQiLCJsZW5ndGgiLCJ1SWQ4IiwidUlkMTYiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxJQUFNQSxLQUFLLFdBQVg7O0FBRUEsU0FBU0MsRUFBVCxDQUFZQyxDQUFaLEVBQWU7QUFDYixTQUFPQyxLQUFLQyxLQUFMLENBQVcsQ0FBQyxJQUFJRCxLQUFLRSxNQUFMLEVBQUwsSUFBc0JILENBQWpDLEVBQ0pJLFFBREksQ0FDSyxFQURMLEVBRUpDLFNBRkksQ0FFTSxDQUZOLENBQVA7QUFHRDs7SUFFb0JDLEs7Ozs7O1FBQ1pDLE8sb0JBQVFDLEksRUFBTUMsTSxFQUFRO0FBQzNCLFFBQUlDLFFBQVFGLElBQVo7O0FBRUEsV0FBT0UsVUFBVSxJQUFqQixFQUF1QjtBQUNyQixVQUFJQSxVQUFVRCxNQUFkLEVBQXNCLE9BQU8sSUFBUDtBQUN0QkMsY0FBUUEsTUFBTUMsVUFBZDtBQUNEOztBQUVELFdBQU8sS0FBUDtBQUNELEc7O1FBRU1DLHNCLHlDQUF5RDtBQUFBLFFBQWhDQyxhQUFnQyxRQUFoQ0EsYUFBZ0M7QUFBQSxRQUFqQkMsYUFBaUIsUUFBakJBLGFBQWlCOztBQUM5RCxRQUFJRCxrQkFBa0IsSUFBdEIsRUFBNEIsT0FBTyxLQUFQOztBQUU1QixXQUFPUCxNQUFNQyxPQUFOLENBQWNNLGFBQWQsRUFBNkJDLGFBQTdCLENBQVA7QUFDRCxHOztRQUVNQyxXLHdCQUFZQyxHLEVBQUs7QUFDdEIsUUFBTUMsU0FBUyxFQUFmO0FBQ0FDLFdBQU9DLElBQVAsQ0FBWUgsR0FBWixFQUFpQkksT0FBakIsQ0FBeUIsVUFBQ0MsR0FBRCxFQUFTO0FBQ2hDSixhQUFPSyxJQUFQLENBQVlOLElBQUlLLEdBQUosQ0FBWjtBQUNELEtBRkQ7QUFHQSxXQUFPSixNQUFQO0FBQ0QsRzs7UUFFTU0sc0IsbUNBQXVCQyxJLEVBQU07QUFDbEMsV0FBTyxPQUFPQSxJQUFQLEtBQWdCLFFBQWhCLElBQTRCQSxLQUFLQyxNQUFMLEdBQWMsQ0FBakQ7QUFDRCxHOzs7WUFFTUMsSSxHQUFPO0FBQUEsU0FBTTNCLEdBQUdELEVBQUgsQ0FBTjtBQUFBLEMsU0FFUDZCLEssR0FBUTtBQUFBLFNBQU01QixHQUFHRCxFQUFILElBQVNDLEdBQUdELEVBQUgsQ0FBZjtBQUFBLEM7U0FoQ0lRLEsiLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBCOCA9IDB4MTAwMDAwMDAwO1xyXG5cclxuZnVuY3Rpb24gY3gobSkge1xyXG4gIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiBtKVxyXG4gICAgLnRvU3RyaW5nKDE2KVxyXG4gICAgLnN1YnN0cmluZygxKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXRpbHMge1xyXG4gIHN0YXRpYyBpc0NoaWxkKG5vZGUsIHBhcmVudCkge1xyXG4gICAgbGV0IGNoaWxkID0gbm9kZTtcclxuXHJcbiAgICB3aGlsZSAoY2hpbGQgIT09IG51bGwpIHtcclxuICAgICAgaWYgKGNoaWxkID09PSBwYXJlbnQpIHJldHVybiB0cnVlO1xyXG4gICAgICBjaGlsZCA9IGNoaWxkLnBhcmVudE5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGlzRm9jdXNPbkN1cnJlbnRUYXJnZXQoeyByZWxhdGVkVGFyZ2V0LCBjdXJyZW50VGFyZ2V0IH0pIHtcclxuICAgIGlmIChyZWxhdGVkVGFyZ2V0ID09PSBudWxsKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgcmV0dXJuIFV0aWxzLmlzQ2hpbGQocmVsYXRlZFRhcmdldCwgY3VycmVudFRhcmdldCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgSGFzaFRvQXJyYXkob2JqKSB7XHJcbiAgICBjb25zdCB2YWx1ZXMgPSBbXTtcclxuICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgIHZhbHVlcy5wdXNoKG9ialtrZXldKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHZhbHVlcztcclxuICB9XHJcblxyXG4gIHN0YXRpYyBlbm91Z2hTZWFyY2hUZXh0TGVuZ3RoKHRleHQpIHtcclxuICAgIHJldHVybiB0eXBlb2YgdGV4dCA9PT0gJ3N0cmluZycgJiYgdGV4dC5sZW5ndGggPiAyO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHVJZDggPSAoKSA9PiBjeChCOCk7XHJcblxyXG4gIHN0YXRpYyB1SWQxNiA9ICgpID0+IGN4KEI4KSArIGN4KEI4KTtcclxufVxyXG4iXX0=