import { KEYS, CLASS_NAME_SEARCH_FOCUSABLE } from './constants';

function getFocusableFoundElements(target) {
  return Array.prototype.slice.call(
    target.getElementsByClassName(CLASS_NAME_SEARCH_FOCUSABLE));
}

function calculateNewIndex(key, index, listLength) {
  let i = index;
  switch (key) {
    case KEYS.UP:
      i -= 1;
      break;
    case KEYS.DOWN:
      i += 1;
      break;
    default:
  }

  return ((ind, min, max) => {
    if (ind < min) return max;
    if (ind > max) return min;

    return ind;
  })(i, 0, listLength - 1);
}

export default class EventHandler {
  static searchElementFocusHanlder(event) {
    const key = event.keyCode;

    if (!key || (key !== KEYS.UP && key !== KEYS.DOWN)) return;

    const allFoundItems = getFocusableFoundElements(event.currentTarget);

    if (allFoundItems.length === 0) return;

    const activeElement = document.activeElement;
    let index = allFoundItems.findIndex(i => i === activeElement);
    index = calculateNewIndex(key, index, allFoundItems.length);

    allFoundItems[index].focus();
  }
}
