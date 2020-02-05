"use strict";

exports.__esModule = true;
exports["default"] = void 0;

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

exports["default"] = Utils;

_defineProperty(Utils, "uId8", function () {
  return cx(B8);
});

_defineProperty(Utils, "uId16", function () {
  return cx(B8) + cx(B8);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJCOCIsImN4IiwibSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvU3RyaW5nIiwic3Vic3RyaW5nIiwiVXRpbHMiLCJpc0NoaWxkIiwibm9kZSIsInBhcmVudCIsImNoaWxkIiwicGFyZW50Tm9kZSIsImlzRm9jdXNPbkN1cnJlbnRUYXJnZXQiLCJyZWxhdGVkVGFyZ2V0IiwiY3VycmVudFRhcmdldCIsIkhhc2hUb0FycmF5Iiwib2JqIiwidmFsdWVzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJwdXNoIiwiZW5vdWdoU2VhcmNoVGV4dExlbmd0aCIsInRleHQiLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFNQSxFQUFFLEdBQUcsV0FBWDs7QUFFQSxTQUFTQyxFQUFULENBQVlDLENBQVosRUFBZTtBQUNiLFNBQU9DLElBQUksQ0FBQ0MsS0FBTCxDQUFXLENBQUMsSUFBSUQsSUFBSSxDQUFDRSxNQUFMLEVBQUwsSUFBc0JILENBQWpDLEVBQ0pJLFFBREksQ0FDSyxFQURMLEVBRUpDLFNBRkksQ0FFTSxDQUZOLENBQVA7QUFHRDs7SUFFb0JDLEs7Ozs7O1FBQ1pDLE8sR0FBUCxpQkFBZUMsSUFBZixFQUFxQkMsTUFBckIsRUFBNkI7QUFDM0IsUUFBSUMsS0FBSyxHQUFHRixJQUFaOztBQUVBLFdBQU9FLEtBQUssS0FBSyxJQUFqQixFQUF1QjtBQUNyQixVQUFJQSxLQUFLLEtBQUtELE1BQWQsRUFBc0IsT0FBTyxJQUFQO0FBQ3RCQyxNQUFBQSxLQUFLLEdBQUdBLEtBQUssQ0FBQ0MsVUFBZDtBQUNEOztBQUVELFdBQU8sS0FBUDtBQUNELEc7O1FBRU1DLHNCLEdBQVAsc0NBQWdFO0FBQUEsUUFBaENDLGFBQWdDLFFBQWhDQSxhQUFnQztBQUFBLFFBQWpCQyxhQUFpQixRQUFqQkEsYUFBaUI7QUFDOUQsUUFBSUQsYUFBYSxLQUFLLElBQXRCLEVBQTRCLE9BQU8sS0FBUDtBQUU1QixXQUFPUCxLQUFLLENBQUNDLE9BQU4sQ0FBY00sYUFBZCxFQUE2QkMsYUFBN0IsQ0FBUDtBQUNELEc7O1FBRU1DLFcsR0FBUCxxQkFBbUJDLEdBQW5CLEVBQXdCO0FBQ3RCLFFBQU1DLE1BQU0sR0FBRyxFQUFmO0FBQ0FDLElBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZSCxHQUFaLEVBQWlCSSxPQUFqQixDQUF5QixVQUFDQyxHQUFELEVBQVM7QUFDaENKLE1BQUFBLE1BQU0sQ0FBQ0ssSUFBUCxDQUFZTixHQUFHLENBQUNLLEdBQUQsQ0FBZjtBQUNELEtBRkQ7QUFHQSxXQUFPSixNQUFQO0FBQ0QsRzs7UUFFTU0sc0IsR0FBUCxnQ0FBOEJDLElBQTlCLEVBQW9DO0FBQ2xDLFdBQU8sT0FBT0EsSUFBUCxLQUFnQixRQUFoQixJQUE0QkEsSUFBSSxDQUFDQyxNQUFMLEdBQWMsQ0FBakQ7QUFDRCxHOzs7Ozs7O2dCQTVCa0JuQixLLFVBOEJMO0FBQUEsU0FBTVAsRUFBRSxDQUFDRCxFQUFELENBQVI7QUFBQSxDOztnQkE5QktRLEssV0FnQ0o7QUFBQSxTQUFNUCxFQUFFLENBQUNELEVBQUQsQ0FBRixHQUFTQyxFQUFFLENBQUNELEVBQUQsQ0FBakI7QUFBQSxDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQjggPSAweDEwMDAwMDAwMDtcblxuZnVuY3Rpb24gY3gobSkge1xuICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogbSlcbiAgICAudG9TdHJpbmcoMTYpXG4gICAgLnN1YnN0cmluZygxKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXRpbHMge1xuICBzdGF0aWMgaXNDaGlsZChub2RlLCBwYXJlbnQpIHtcbiAgICBsZXQgY2hpbGQgPSBub2RlO1xuXG4gICAgd2hpbGUgKGNoaWxkICE9PSBudWxsKSB7XG4gICAgICBpZiAoY2hpbGQgPT09IHBhcmVudCkgcmV0dXJuIHRydWU7XG4gICAgICBjaGlsZCA9IGNoaWxkLnBhcmVudE5vZGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3RhdGljIGlzRm9jdXNPbkN1cnJlbnRUYXJnZXQoeyByZWxhdGVkVGFyZ2V0LCBjdXJyZW50VGFyZ2V0IH0pIHtcbiAgICBpZiAocmVsYXRlZFRhcmdldCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmV0dXJuIFV0aWxzLmlzQ2hpbGQocmVsYXRlZFRhcmdldCwgY3VycmVudFRhcmdldCk7XG4gIH1cblxuICBzdGF0aWMgSGFzaFRvQXJyYXkob2JqKSB7XG4gICAgY29uc3QgdmFsdWVzID0gW107XG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIHZhbHVlcy5wdXNoKG9ialtrZXldKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdmFsdWVzO1xuICB9XG5cbiAgc3RhdGljIGVub3VnaFNlYXJjaFRleHRMZW5ndGgodGV4dCkge1xuICAgIHJldHVybiB0eXBlb2YgdGV4dCA9PT0gJ3N0cmluZycgJiYgdGV4dC5sZW5ndGggPiAxO1xuICB9XG5cbiAgc3RhdGljIHVJZDggPSAoKSA9PiBjeChCOCk7XG5cbiAgc3RhdGljIHVJZDE2ID0gKCkgPT4gY3goQjgpICsgY3goQjgpO1xufVxuIl19