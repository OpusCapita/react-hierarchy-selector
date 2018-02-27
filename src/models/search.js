import BaseModel from './base';
import ItemEntity from './item.entity';
import GroupEntity from './group.entity';

import Utils from '../utils';

const isFound = (searchingIn, searchingFor) => (
  searchingIn.toLowerCase().indexOf(searchingFor.toLowerCase()) > -1
);

const findFromHierarchy = (data, searchingFor, foundData = {}, groupNames = []) => {
  let result = foundData;

  if (data) {
    Object.keys(data).forEach((key) => {
      const currentItem = new ItemEntity(data[key]);
      const isChildren = currentItem.children &&
                        Array.isArray(currentItem.children) &&
                        currentItem.children.length > 0;

      if (isChildren) {
        result = findFromHierarchy(
          currentItem.children,
          searchingFor,
          result,
          [...groupNames, { id: currentItem.id, name: currentItem.name }],
        );
      } else if (currentItem.name && isFound(currentItem.name, searchingFor)) {
        const groupId = groupNames.map(i => i.id).join('_');
        const groupName = groupNames.map(i => i.name).join(' / ');

        if (result[groupId] === undefined) {
          result[groupId] = new GroupEntity(groupName);
        }
        result[groupId].items.push(currentItem);
      }
    });
  }

  return result;
};

function filter(data, searchingFor) {
  const itemList = [];

  data.forEach((item) => {
    const isChildren = Array.isArray(item.children) && item.children.length > 0;

    if (isChildren) {
      const children = filter(item.children, searchingFor);
      if (children.length > 0) {
        const itemCopy = Object.assign({}, item);
        itemCopy.children = children;
        itemList.push(itemCopy);
      }
    } else if (isFound(item.name, searchingFor)) {
      const itemCopy = Object.assign({}, item);
      itemList.push(itemCopy);
    }
  });

  return itemList;
}

export default class Search extends BaseModel {
  getFoundFromHierarchy = (searchingFor) => {
    if (!this.dataSourceProvider.isLoaded || !this.dataSourceProvider.isData) return null;

    return Utils.HashToArray(findFromHierarchy(this.dataSourceProvider.getData(), searchingFor));
  };

  search = (searchingFor) => {
    if (!this.dataSourceProvider.isLoaded || !this.dataSourceProvider.isData) return [];

    const data = filter(this.dataSourceProvider.getData(), searchingFor);
    return data;
  }
}
