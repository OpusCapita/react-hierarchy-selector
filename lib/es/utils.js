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
    return typeof text === 'string' && text.length > 1;
  };

  return Utils;
}(), _class.uId8 = function () {
  return cx(B8);
}, _class.uId16 = function () {
  return cx(B8) + cx(B8);
}, _temp);
export { Utils as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJCOCIsImN4IiwibSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvU3RyaW5nIiwic3Vic3RyaW5nIiwiVXRpbHMiLCJpc0NoaWxkIiwibm9kZSIsInBhcmVudCIsImNoaWxkIiwicGFyZW50Tm9kZSIsImlzRm9jdXNPbkN1cnJlbnRUYXJnZXQiLCJyZWxhdGVkVGFyZ2V0IiwiY3VycmVudFRhcmdldCIsIkhhc2hUb0FycmF5Iiwib2JqIiwidmFsdWVzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJwdXNoIiwiZW5vdWdoU2VhcmNoVGV4dExlbmd0aCIsInRleHQiLCJsZW5ndGgiLCJ1SWQ4IiwidUlkMTYiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxJQUFNQSxLQUFLLFdBQVg7O0FBRUEsU0FBU0MsRUFBVCxDQUFZQyxDQUFaLEVBQWU7QUFDYixTQUFPQyxLQUFLQyxLQUFMLENBQVcsQ0FBQyxJQUFJRCxLQUFLRSxNQUFMLEVBQUwsSUFBc0JILENBQWpDLEVBQ0pJLFFBREksQ0FDSyxFQURMLEVBRUpDLFNBRkksQ0FFTSxDQUZOLENBQVA7QUFHRDs7SUFFb0JDLEs7Ozs7O1FBQ1pDLE8sb0JBQVFDLEksRUFBTUMsTSxFQUFRO0FBQzNCLFFBQUlDLFFBQVFGLElBQVo7O0FBRUEsV0FBT0UsVUFBVSxJQUFqQixFQUF1QjtBQUNyQixVQUFJQSxVQUFVRCxNQUFkLEVBQXNCLE9BQU8sSUFBUDtBQUN0QkMsY0FBUUEsTUFBTUMsVUFBZDtBQUNEOztBQUVELFdBQU8sS0FBUDtBQUNELEc7O1FBRU1DLHNCLHlDQUF5RDtBQUFBLFFBQWhDQyxhQUFnQyxRQUFoQ0EsYUFBZ0M7QUFBQSxRQUFqQkMsYUFBaUIsUUFBakJBLGFBQWlCOztBQUM5RCxRQUFJRCxrQkFBa0IsSUFBdEIsRUFBNEIsT0FBTyxLQUFQOztBQUU1QixXQUFPUCxNQUFNQyxPQUFOLENBQWNNLGFBQWQsRUFBNkJDLGFBQTdCLENBQVA7QUFDRCxHOztRQUVNQyxXLHdCQUFZQyxHLEVBQUs7QUFDdEIsUUFBTUMsU0FBUyxFQUFmO0FBQ0FDLFdBQU9DLElBQVAsQ0FBWUgsR0FBWixFQUFpQkksT0FBakIsQ0FBeUIsVUFBQ0MsR0FBRCxFQUFTO0FBQ2hDSixhQUFPSyxJQUFQLENBQVlOLElBQUlLLEdBQUosQ0FBWjtBQUNELEtBRkQ7QUFHQSxXQUFPSixNQUFQO0FBQ0QsRzs7UUFFTU0sc0IsbUNBQXVCQyxJLEVBQU07QUFDbEMsV0FBTyxPQUFPQSxJQUFQLEtBQWdCLFFBQWhCLElBQTRCQSxLQUFLQyxNQUFMLEdBQWMsQ0FBakQ7QUFDRCxHOzs7WUFFTUMsSSxHQUFPO0FBQUEsU0FBTTNCLEdBQUdELEVBQUgsQ0FBTjtBQUFBLEMsU0FFUDZCLEssR0FBUTtBQUFBLFNBQU01QixHQUFHRCxFQUFILElBQVNDLEdBQUdELEVBQUgsQ0FBZjtBQUFBLEM7U0FoQ0lRLEsiLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBCOCA9IDB4MTAwMDAwMDAwO1xuXG5mdW5jdGlvbiBjeChtKSB7XG4gIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiBtKVxuICAgIC50b1N0cmluZygxNilcbiAgICAuc3Vic3RyaW5nKDEpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVdGlscyB7XG4gIHN0YXRpYyBpc0NoaWxkKG5vZGUsIHBhcmVudCkge1xuICAgIGxldCBjaGlsZCA9IG5vZGU7XG5cbiAgICB3aGlsZSAoY2hpbGQgIT09IG51bGwpIHtcbiAgICAgIGlmIChjaGlsZCA9PT0gcGFyZW50KSByZXR1cm4gdHJ1ZTtcbiAgICAgIGNoaWxkID0gY2hpbGQucGFyZW50Tm9kZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdGF0aWMgaXNGb2N1c09uQ3VycmVudFRhcmdldCh7IHJlbGF0ZWRUYXJnZXQsIGN1cnJlbnRUYXJnZXQgfSkge1xuICAgIGlmIChyZWxhdGVkVGFyZ2V0ID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICByZXR1cm4gVXRpbHMuaXNDaGlsZChyZWxhdGVkVGFyZ2V0LCBjdXJyZW50VGFyZ2V0KTtcbiAgfVxuXG4gIHN0YXRpYyBIYXNoVG9BcnJheShvYmopIHtcbiAgICBjb25zdCB2YWx1ZXMgPSBbXTtcbiAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgdmFsdWVzLnB1c2gob2JqW2tleV0pO1xuICAgIH0pO1xuICAgIHJldHVybiB2YWx1ZXM7XG4gIH1cblxuICBzdGF0aWMgZW5vdWdoU2VhcmNoVGV4dExlbmd0aCh0ZXh0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0ZXh0ID09PSAnc3RyaW5nJyAmJiB0ZXh0Lmxlbmd0aCA+IDE7XG4gIH1cblxuICBzdGF0aWMgdUlkOCA9ICgpID0+IGN4KEI4KTtcblxuICBzdGF0aWMgdUlkMTYgPSAoKSA9PiBjeChCOCkgKyBjeChCOCk7XG59XG4iXX0=