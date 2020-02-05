function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var B8 = 0x100000000;

function cx(m) {
  return Math.floor((1 + Math.random()) * m).toString(16).substring(1);
}

var Utils =
/*#__PURE__*/
function () {
  function Utils() {}

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
}();

_defineProperty(Utils, "uId8", function () {
  return cx(B8);
});

_defineProperty(Utils, "uId16", function () {
  return cx(B8) + cx(B8);
});

export { Utils as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJCOCIsImN4IiwibSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvU3RyaW5nIiwic3Vic3RyaW5nIiwiVXRpbHMiLCJpc0NoaWxkIiwibm9kZSIsInBhcmVudCIsImNoaWxkIiwicGFyZW50Tm9kZSIsImlzRm9jdXNPbkN1cnJlbnRUYXJnZXQiLCJyZWxhdGVkVGFyZ2V0IiwiY3VycmVudFRhcmdldCIsIkhhc2hUb0FycmF5Iiwib2JqIiwidmFsdWVzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJwdXNoIiwiZW5vdWdoU2VhcmNoVGV4dExlbmd0aCIsInRleHQiLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsRUFBRSxHQUFHLFdBQVg7O0FBRUEsU0FBU0MsRUFBVCxDQUFZQyxDQUFaLEVBQWU7QUFDYixTQUFPQyxJQUFJLENBQUNDLEtBQUwsQ0FBVyxDQUFDLElBQUlELElBQUksQ0FBQ0UsTUFBTCxFQUFMLElBQXNCSCxDQUFqQyxFQUNKSSxRQURJLENBQ0ssRUFETCxFQUVKQyxTQUZJLENBRU0sQ0FGTixDQUFQO0FBR0Q7O0lBRW9CQyxLOzs7OztRQUNaQyxPLEdBQVAsaUJBQWVDLElBQWYsRUFBcUJDLE1BQXJCLEVBQTZCO0FBQzNCLFFBQUlDLEtBQUssR0FBR0YsSUFBWjs7QUFFQSxXQUFPRSxLQUFLLEtBQUssSUFBakIsRUFBdUI7QUFDckIsVUFBSUEsS0FBSyxLQUFLRCxNQUFkLEVBQXNCLE9BQU8sSUFBUDtBQUN0QkMsTUFBQUEsS0FBSyxHQUFHQSxLQUFLLENBQUNDLFVBQWQ7QUFDRDs7QUFFRCxXQUFPLEtBQVA7QUFDRCxHOztRQUVNQyxzQixHQUFQLHNDQUFnRTtBQUFBLFFBQWhDQyxhQUFnQyxRQUFoQ0EsYUFBZ0M7QUFBQSxRQUFqQkMsYUFBaUIsUUFBakJBLGFBQWlCO0FBQzlELFFBQUlELGFBQWEsS0FBSyxJQUF0QixFQUE0QixPQUFPLEtBQVA7QUFFNUIsV0FBT1AsS0FBSyxDQUFDQyxPQUFOLENBQWNNLGFBQWQsRUFBNkJDLGFBQTdCLENBQVA7QUFDRCxHOztRQUVNQyxXLEdBQVAscUJBQW1CQyxHQUFuQixFQUF3QjtBQUN0QixRQUFNQyxNQUFNLEdBQUcsRUFBZjtBQUNBQyxJQUFBQSxNQUFNLENBQUNDLElBQVAsQ0FBWUgsR0FBWixFQUFpQkksT0FBakIsQ0FBeUIsVUFBQ0MsR0FBRCxFQUFTO0FBQ2hDSixNQUFBQSxNQUFNLENBQUNLLElBQVAsQ0FBWU4sR0FBRyxDQUFDSyxHQUFELENBQWY7QUFDRCxLQUZEO0FBR0EsV0FBT0osTUFBUDtBQUNELEc7O1FBRU1NLHNCLEdBQVAsZ0NBQThCQyxJQUE5QixFQUFvQztBQUNsQyxXQUFPLE9BQU9BLElBQVAsS0FBZ0IsUUFBaEIsSUFBNEJBLElBQUksQ0FBQ0MsTUFBTCxHQUFjLENBQWpEO0FBQ0QsRzs7Ozs7Z0JBNUJrQm5CLEssVUE4Qkw7QUFBQSxTQUFNUCxFQUFFLENBQUNELEVBQUQsQ0FBUjtBQUFBLEM7O2dCQTlCS1EsSyxXQWdDSjtBQUFBLFNBQU1QLEVBQUUsQ0FBQ0QsRUFBRCxDQUFGLEdBQVNDLEVBQUUsQ0FBQ0QsRUFBRCxDQUFqQjtBQUFBLEM7O1NBaENJUSxLIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQjggPSAweDEwMDAwMDAwMDtcblxuZnVuY3Rpb24gY3gobSkge1xuICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogbSlcbiAgICAudG9TdHJpbmcoMTYpXG4gICAgLnN1YnN0cmluZygxKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXRpbHMge1xuICBzdGF0aWMgaXNDaGlsZChub2RlLCBwYXJlbnQpIHtcbiAgICBsZXQgY2hpbGQgPSBub2RlO1xuXG4gICAgd2hpbGUgKGNoaWxkICE9PSBudWxsKSB7XG4gICAgICBpZiAoY2hpbGQgPT09IHBhcmVudCkgcmV0dXJuIHRydWU7XG4gICAgICBjaGlsZCA9IGNoaWxkLnBhcmVudE5vZGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3RhdGljIGlzRm9jdXNPbkN1cnJlbnRUYXJnZXQoeyByZWxhdGVkVGFyZ2V0LCBjdXJyZW50VGFyZ2V0IH0pIHtcbiAgICBpZiAocmVsYXRlZFRhcmdldCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmV0dXJuIFV0aWxzLmlzQ2hpbGQocmVsYXRlZFRhcmdldCwgY3VycmVudFRhcmdldCk7XG4gIH1cblxuICBzdGF0aWMgSGFzaFRvQXJyYXkob2JqKSB7XG4gICAgY29uc3QgdmFsdWVzID0gW107XG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIHZhbHVlcy5wdXNoKG9ialtrZXldKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdmFsdWVzO1xuICB9XG5cbiAgc3RhdGljIGVub3VnaFNlYXJjaFRleHRMZW5ndGgodGV4dCkge1xuICAgIHJldHVybiB0eXBlb2YgdGV4dCA9PT0gJ3N0cmluZycgJiYgdGV4dC5sZW5ndGggPiAxO1xuICB9XG5cbiAgc3RhdGljIHVJZDggPSAoKSA9PiBjeChCOCk7XG5cbiAgc3RhdGljIHVJZDE2ID0gKCkgPT4gY3goQjgpICsgY3goQjgpO1xufVxuIl19