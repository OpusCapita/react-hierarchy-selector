
const output = new WeakMap();

function getOutputObject(item, parentIds, isCheckedAll) {
  const currentItem = item ? Object.assign({}, item) : {};

  currentItem.id = currentItem.id || null;
  currentItem.name = currentItem.name || '';
  currentItem.children = currentItem.children || [];

  return {
    id: currentItem.id,
    name: currentItem.name,
    level: parentIds.length + 1,
    parentId: parentIds.length > 0 ? parentIds[parentIds.length - 1] : null,
    parentIds,
    isCheckedAll,
    isChildren: Array.isArray(currentItem.children) && currentItem.children.length > 0,
  };
}

function addToOutput(obj, checkedHashItem) {
  const currentOutput = output.get(obj);
  const isCheckedAll = checkedHashItem.isCheckedAll();
  const parents = checkedHashItem.getParents();

  if (isCheckedAll) {
    const item = parents[parents.length - 1];
    parents.pop();
    const parentIds = parents.map(i => i.id);
    currentOutput.push(getOutputObject(item, parentIds, isCheckedAll));
  } else {
    const checkedItems = checkedHashItem.getCheckedItems();
    const parentIds = parents.map(i => i.id);
    checkedItems.forEach((item) => {
      currentOutput.push(getOutputObject(item, parentIds, isCheckedAll));
    });
  }
}

export default class CheckedOutput {
  constructor() {
    output.set(this, []);
  }

  get = () => output.get(this).slice();

  add = (checkedHashItem) => {
    addToOutput(this, checkedHashItem);
  }

  clear = () => {
    output.get(this).splice(0);
  }

}
