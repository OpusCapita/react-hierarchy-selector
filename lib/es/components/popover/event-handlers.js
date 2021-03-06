import { KEYS, CLASS_NAME_SEARCH_FOCUSABLE } from './constants';

function getFocusableFoundElements(target) {
  return Array.prototype.slice.call(target.getElementsByClassName(CLASS_NAME_SEARCH_FOCUSABLE));
}

function calculateNewIndex(key, index, listLength) {
  var i = index;

  switch (key) {
    case KEYS.UP:
      i -= 1;
      break;

    case KEYS.DOWN:
      i += 1;
      break;

    default:
  }

  return function (ind, min, max) {
    if (ind < min) return max;
    if (ind > max) return min;
    return ind;
  }(i, 0, listLength - 1);
}

var EventHandler =
/*#__PURE__*/
function () {
  function EventHandler() {}

  EventHandler.searchElementFocusHanlder = function searchElementFocusHanlder(event) {
    var key = event.keyCode;
    if (!key || key !== KEYS.UP && key !== KEYS.DOWN) return;
    var allFoundItems = getFocusableFoundElements(event.currentTarget);
    if (allFoundItems.length === 0) return;
    var _document = document,
        activeElement = _document.activeElement;
    var index = allFoundItems.findIndex(function (i) {
      return i === activeElement;
    });
    index = calculateNewIndex(key, index, allFoundItems.length);
    allFoundItems[index].focus();
  };

  return EventHandler;
}();

export { EventHandler as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvZXZlbnQtaGFuZGxlcnMuanMiXSwibmFtZXMiOlsiS0VZUyIsIkNMQVNTX05BTUVfU0VBUkNIX0ZPQ1VTQUJMRSIsImdldEZvY3VzYWJsZUZvdW5kRWxlbWVudHMiLCJ0YXJnZXQiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjYWxjdWxhdGVOZXdJbmRleCIsImtleSIsImluZGV4IiwibGlzdExlbmd0aCIsImkiLCJVUCIsIkRPV04iLCJpbmQiLCJtaW4iLCJtYXgiLCJFdmVudEhhbmRsZXIiLCJzZWFyY2hFbGVtZW50Rm9jdXNIYW5sZGVyIiwiZXZlbnQiLCJrZXlDb2RlIiwiYWxsRm91bmRJdGVtcyIsImN1cnJlbnRUYXJnZXQiLCJsZW5ndGgiLCJkb2N1bWVudCIsImFjdGl2ZUVsZW1lbnQiLCJmaW5kSW5kZXgiLCJmb2N1cyJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBU0EsSUFBVCxFQUFlQywyQkFBZixRQUFrRCxhQUFsRDs7QUFFQSxTQUFTQyx5QkFBVCxDQUFtQ0MsTUFBbkMsRUFBMkM7QUFDekMsU0FBT0MsS0FBSyxDQUFDQyxTQUFOLENBQ0pDLEtBREksQ0FFSkMsSUFGSSxDQUVDSixNQUFNLENBQUNLLHNCQUFQLENBQThCUCwyQkFBOUIsQ0FGRCxDQUFQO0FBR0Q7O0FBRUQsU0FBU1EsaUJBQVQsQ0FBMkJDLEdBQTNCLEVBQWdDQyxLQUFoQyxFQUF1Q0MsVUFBdkMsRUFBbUQ7QUFDakQsTUFBSUMsQ0FBQyxHQUFHRixLQUFSOztBQUNBLFVBQVFELEdBQVI7QUFDRSxTQUFLVixJQUFJLENBQUNjLEVBQVY7QUFDRUQsTUFBQUEsQ0FBQyxJQUFJLENBQUw7QUFDQTs7QUFDRixTQUFLYixJQUFJLENBQUNlLElBQVY7QUFDRUYsTUFBQUEsQ0FBQyxJQUFJLENBQUw7QUFDQTs7QUFDRjtBQVBGOztBQVVBLFNBQVEsVUFBQ0csR0FBRCxFQUFNQyxHQUFOLEVBQVdDLEdBQVgsRUFBbUI7QUFDekIsUUFBSUYsR0FBRyxHQUFHQyxHQUFWLEVBQWUsT0FBT0MsR0FBUDtBQUNmLFFBQUlGLEdBQUcsR0FBR0UsR0FBVixFQUFlLE9BQU9ELEdBQVA7QUFFZixXQUFPRCxHQUFQO0FBQ0QsR0FMTSxDQUtKSCxDQUxJLEVBS0QsQ0FMQyxFQUtFRCxVQUFVLEdBQUcsQ0FMZixDQUFQO0FBTUQ7O0lBRW9CTyxZOzs7OztlQUNaQyx5QixHQUFQLG1DQUFpQ0MsS0FBakMsRUFBd0M7QUFDdEMsUUFBTVgsR0FBRyxHQUFHVyxLQUFLLENBQUNDLE9BQWxCO0FBRUEsUUFBSSxDQUFDWixHQUFELElBQVNBLEdBQUcsS0FBS1YsSUFBSSxDQUFDYyxFQUFiLElBQW1CSixHQUFHLEtBQUtWLElBQUksQ0FBQ2UsSUFBN0MsRUFBb0Q7QUFFcEQsUUFBTVEsYUFBYSxHQUFHckIseUJBQXlCLENBQUNtQixLQUFLLENBQUNHLGFBQVAsQ0FBL0M7QUFFQSxRQUFJRCxhQUFhLENBQUNFLE1BQWQsS0FBeUIsQ0FBN0IsRUFBZ0M7QUFQTSxvQkFTWkMsUUFUWTtBQUFBLFFBUzlCQyxhQVQ4QixhQVM5QkEsYUFUOEI7QUFVdEMsUUFBSWhCLEtBQUssR0FBR1ksYUFBYSxDQUFDSyxTQUFkLENBQXdCLFVBQUFmLENBQUM7QUFBQSxhQUFJQSxDQUFDLEtBQUtjLGFBQVY7QUFBQSxLQUF6QixDQUFaO0FBQ0FoQixJQUFBQSxLQUFLLEdBQUdGLGlCQUFpQixDQUFDQyxHQUFELEVBQU1DLEtBQU4sRUFBYVksYUFBYSxDQUFDRSxNQUEzQixDQUF6QjtBQUVBRixJQUFBQSxhQUFhLENBQUNaLEtBQUQsQ0FBYixDQUFxQmtCLEtBQXJCO0FBQ0QsRzs7Ozs7U0Fma0JWLFkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBLRVlTLCBDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmZ1bmN0aW9uIGdldEZvY3VzYWJsZUZvdW5kRWxlbWVudHModGFyZ2V0KSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGVcbiAgICAuc2xpY2VcbiAgICAuY2FsbCh0YXJnZXQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEUpKTtcbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlTmV3SW5kZXgoa2V5LCBpbmRleCwgbGlzdExlbmd0aCkge1xuICBsZXQgaSA9IGluZGV4O1xuICBzd2l0Y2ggKGtleSkge1xuICAgIGNhc2UgS0VZUy5VUDpcbiAgICAgIGkgLT0gMTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgS0VZUy5ET1dOOlxuICAgICAgaSArPSAxO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgfVxuXG4gIHJldHVybiAoKGluZCwgbWluLCBtYXgpID0+IHtcbiAgICBpZiAoaW5kIDwgbWluKSByZXR1cm4gbWF4O1xuICAgIGlmIChpbmQgPiBtYXgpIHJldHVybiBtaW47XG5cbiAgICByZXR1cm4gaW5kO1xuICB9KShpLCAwLCBsaXN0TGVuZ3RoIC0gMSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50SGFuZGxlciB7XG4gIHN0YXRpYyBzZWFyY2hFbGVtZW50Rm9jdXNIYW5sZGVyKGV2ZW50KSB7XG4gICAgY29uc3Qga2V5ID0gZXZlbnQua2V5Q29kZTtcblxuICAgIGlmICgha2V5IHx8IChrZXkgIT09IEtFWVMuVVAgJiYga2V5ICE9PSBLRVlTLkRPV04pKSByZXR1cm47XG5cbiAgICBjb25zdCBhbGxGb3VuZEl0ZW1zID0gZ2V0Rm9jdXNhYmxlRm91bmRFbGVtZW50cyhldmVudC5jdXJyZW50VGFyZ2V0KTtcblxuICAgIGlmIChhbGxGb3VuZEl0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgY29uc3QgeyBhY3RpdmVFbGVtZW50IH0gPSBkb2N1bWVudDtcbiAgICBsZXQgaW5kZXggPSBhbGxGb3VuZEl0ZW1zLmZpbmRJbmRleChpID0+IGkgPT09IGFjdGl2ZUVsZW1lbnQpO1xuICAgIGluZGV4ID0gY2FsY3VsYXRlTmV3SW5kZXgoa2V5LCBpbmRleCwgYWxsRm91bmRJdGVtcy5sZW5ndGgpO1xuXG4gICAgYWxsRm91bmRJdGVtc1tpbmRleF0uZm9jdXMoKTtcbiAgfVxufVxuIl19