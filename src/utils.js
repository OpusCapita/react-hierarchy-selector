const B8 = 0x100000000;

function cx(m) {
  return Math.floor((1 + Math.random()) * m)
    .toString(16)
    .substring(1);
}

export default class Utils {
  static isChild(node, parent) {
    let child = node;

    while (child !== null) {
      if (child === parent) return true;
      child = child.parentNode;
    }

    return false;
  }

  static isFocusOnCurrentTarget({ relatedTarget, currentTarget }) {
    if (relatedTarget === null) return false;

    return Utils.isChild(relatedTarget, currentTarget);
  }

  static HashToArray(obj) {
    const values = [];
    Object.keys(obj).forEach((key) => {
      values.push(obj[key]);
    });
    return values;
  }

  static enoughSearchTextLength(text) {
    return typeof text === 'string' && text.length > 2;
  }

  static uId8 = () => cx(B8);

  static uId16 = () => cx(B8) + cx(B8);
}
