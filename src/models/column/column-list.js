import ColumnData from './column-data';
import BaseModel from '../base';
import Search from '../search';
import Utils from '../../utils';

const data = new WeakMap();
const list = new WeakMap();
const states = new WeakMap();
const searchingFor = new WeakMap();
const searchModel = new WeakMap();
const selectedPath = new WeakMap();

function getData(thisObj) {
  return data.get(thisObj) || [];
}

function getDefaultStates() {
  return {
    needToSearch: false,
  };
}

function getStates(thisObj) {
  return states.get(thisObj) || {};
}

function setStates(thisObj, stateObj) {
  return states.set(thisObj, stateObj);
}

function refreshData(thisObj) {
  const dataProvider = thisObj.dataSourceProvider;

  if (data.get(thisObj) === null) {
    if (dataProvider.isLoaded) {
      data.set(thisObj, dataProvider.getData());
    }
  }

  if (data.get(thisObj) !== null) {
    const currentStates = getStates(thisObj);

    if (currentStates.needToSearch) {
      const searchinForText = searchingFor.get(thisObj);

      if (Utils.enoughSearchTextLength(searchinForText)) {
        const model = searchModel.get(thisObj);
        data.set(thisObj, model.search(searchinForText));
      } else {
        data.set(thisObj, dataProvider.getData());
      }

      currentStates.needToSearch = false;
      setStates(thisObj, currentStates);
    }
  }
}

export default class ColumnList extends BaseModel {
  constructor(dataSourceProvider) {
    super(dataSourceProvider);

    data.set(this, null);
    list.set(this, []);
    states.set(this, getDefaultStates());
    searchingFor.set(this, '');
    searchModel.set(this, new Search(dataSourceProvider));
    selectedPath.set(this, []);
  }

  get length() {
    return list.get(this).length;
  }

  get list() {
    return list.get(this);
  }

  get selectedPath() {
    return selectedPath.get(this);
  }

  getData() {
    return getData(this);
  }

  setSearchingFor = (text) => {
    const currentSearchingFor = searchingFor.get(this);

    if (currentSearchingFor !== text) {
      const currentStates = getStates(this);
      currentStates.needToSearch = true;
      setStates(this, currentStates);
      searchingFor.set(this, text);
    }
  }

  /**
   * Method recalculate selected paths and fills list of columns
   * @param {number} level The selected level (column)
   * @param {number} id The ID of selected item in a column
   */
  refresh(level, id = null) {
    const listOfColumns = list.get(this);
    const path = selectedPath.get(this);

    const cleanLevel = level && level > 0 ? level - 1 : 0;

    refreshData(this);

    path.splice(cleanLevel);
    listOfColumns.splice(0);

    if (id !== null) {
      path.push(id);
    }

    if (listOfColumns.length === 0) {
      listOfColumns.push(new ColumnData(null, getData(this)));
    }

    path.forEach((selectedId, thisLevel) => {
      const nextLevel = thisLevel + 1;

      const item = listOfColumns[thisLevel] ?
        listOfColumns[thisLevel].items.find(el => (el.id === selectedId)) : null;

      if (item && item.children && item.children.length > 0) {
        if (nextLevel >= listOfColumns.length) {
          listOfColumns.push(new ColumnData());
        }
        if (listOfColumns[nextLevel].parentId !== selectedId) {
          listOfColumns[nextLevel].parentId = selectedId;
          listOfColumns[nextLevel].items = item.children;
        }
      }
    });
  }
}
