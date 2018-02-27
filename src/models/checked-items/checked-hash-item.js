/* eslint-disable array-callback-return */

const parents = new WeakMap();
const checkedAll = new WeakMap();
const checkedItemsBackUp = new WeakMap();
const checkedItems = new WeakMap();

function addChildren(that, item) {
  if (item) {
    if (item.children && Array.isArray(item.children) && item.children.length > 0) {
      item.children.forEach((child) => { addChildren(that, child); });
    } else {
      that.addCheckedItem(item);
    }
  }
}

export default class CheckedHashItem {
  constructor(prnts = []) {
    this.timestamp = Date.now();
    parents.set(this, prnts.slice());
    checkedAll.set(this, false);
    checkedItems.set(this, []);
    checkedItemsBackUp.set(this, []);
  }

  getParents() {
    return parents.get(this).slice();
  }

  getCheckedItems() {
    return checkedItems.get(this).slice();
  }

  checkAll() {
    const prnts = parents.get(this);
    checkedAll.set(this, true);
    this.clearChecked();
    const initialParent = prnts.length > 0 ? prnts[prnts.length - 1] : undefined;

    if (initialParent) addChildren(this, initialParent);
  }

  uncheckAll() {
    checkedAll.set(this, false);
    this.clearChecked();
  }

  isCheckedAll() {
    return checkedAll.get(this);
  }

  clearChecked() {
    checkedItems.get(this).splice(0);
  }

  addCheckedItem(item) {
    checkedItems.get(this).push(item);
  }

  removeCheckedItem(item) {
    const items = checkedItems.get(this);
    items.reduceRight((acc, currentItem, index, currentItems) => {
      if (currentItem.id === item.id) {
        currentItems.splice(index, 1);
      }
    }, []);
  }

  createCopy() {
    const copy = new CheckedHashItem();

    parents.set(copy, [...parents.get(this)]);
    checkedAll.set(copy, checkedAll.get(this));
    checkedItems.set(copy, [...checkedItems.get(this)]);
    checkedItemsBackUp.set(copy, [...checkedItemsBackUp.get(this)]);

    return copy;
  }

  makeBackUp() {
    checkedItemsBackUp.set(this, [...checkedItems.get(this)]);
  }

  restoreFromBackUp() {
    checkedItems.set(this, [...checkedItemsBackUp.get(this)]);
  }
}
