import { element, shape, string, number, bool, arrayOf, oneOfType, func } from 'prop-types';

import { dataSourceProviderType } from './services/types';

const hierarchyItemShape = shape({
  id: number.isRequired,
  name: string.isRequired,
});

hierarchyItemShape.children = arrayOf(hierarchyItemShape);

const hierarchyItemListShape = arrayOf(hierarchyItemShape);

const selectedItemsShape = shape({
  name: string.isRequired,
  items: hierarchyItemListShape,
});

const foundItemsShape = arrayOf(selectedItemsShape);

const preCheckedItemsShape = shape({
  id: oneOfType([number, string]).isRequired,
  parentId: oneOfType([number, string]),
  isCheckedAll: bool,
});

const preCheckedItemsListShape = arrayOf(preCheckedItemsShape);

const popoverOptionsType = shape({
  btnOpenViewLabel: oneOfType([string, element]),
  foundItemRenderFunction: func,
  searchPlaceHolder: string,
  pinnedGroupLabel: oneOfType([string, element]),
  recentGroupLabel: oneOfType([string, element]),
});

const tabOptionsType = shape({
  title: oneOfType([string, element]).isRequired,
  dataSourceProvider: dataSourceProviderType.isRequired,
});

const viewOptionsType = shape({
  allLabel: oneOfType([string, element]),
  btnSelectLabel: oneOfType([string, element]),
  btnCancelLabel: oneOfType([string, element]),
  groupNameLabel: oneOfType([string, element]),
  groupNamePlaceHolder: string,
  listItemRenderFunction: func,
  searchPlaceHolder: oneOfType([string, element]),
  selectedItemListLabel: oneOfType([string, element]),
  selectedItemRenderFunction: func,
  showInModal: bool,
  title: oneOfType([string, element]).isRequired,
});

export {
  popoverOptionsType,
  viewOptionsType,
  hierarchyItemShape,
  hierarchyItemListShape,
  selectedItemsShape,
  foundItemsShape,
  tabOptionsType,
  preCheckedItemsShape,
  preCheckedItemsListShape,
};

