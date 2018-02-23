# HierarchySelector component

## Description

Hierarchy selector component is a component that can be useful for selecting items of hierarchies. It can take data from any sources through a function that should return a promise object. The promise object, in its turn, should return a data structure `hierarchyItemListShape` of type

## Dependencies

- @opuscapita/react-perfect-scrollbar
- @opuscapita/react-spinner
- classnames
- react-icons
- react-list

## Data structure

### Content

Hierarchy selector component expects data, for example, from a back-end to show with the following structure (type `hierarchyItemListShape`):

```json
[
  {
    "id": 1,
    "name": "Company 1",
    "children": [
      {
        "id": 12,
        "name": "Europe",
        "children": [
          {
            "id": 113,
            "name": "FI12 1234 1234 1234 1234 14",
            "children": [],
          },
          {
            "id": 114,
            "name": "FI12 1234 1234 1234 1234 15",
            "children": [],
          }
        ]
      }
    ]
  },
  ...
]
```

where id, name and children are required properties. The last level of hierarchy can include also additional properties. Additional property information can be shown by implementing `listItemRenderFunction` callback function (see API of `HierarchySelectorView`). The number of level is not limited by the component.

### Checked items

Here is a data structure that components `HierarchySelectorView` and `HierarchySelectorComboBox` return within callback functions `onCheckListChanged` and onSelect and contains checked items:

```json
[
   {
     "id": 1,
     "name": "Company 1",
     "level": 1,
     "parentId": null,
     "parentIds": [],
     "isCheckedAll": true,
     "isChildren": true
   },
   {
     "id": 212,
     "name": "FI12 1234 1234 1234 1234 22",
     "level": 3,
     "parentId": 25,
     "parentIds": [2,25],
     "isCheckedAll": false,
     "isChildren": false
   },
   ...
]
```

See more information in descriptions of the callback functions.

### Pre-checked items

A structure of pre-checked items:

```js
[  
    {
      id: oneOfType([number, string]).isRequired,
      parentId: oneOfType([number, string]),
      isCheckedAll: bool,
    },
    ...
]
```

`id`, `parentId` and `isCheckedAll` attributes are enough to define pre-checked items for the components. If `isCheckedAll` attribute is missed the components interpret this as `false` value. If `parentId` is `null`, it means that the item has no parent.

In practice, you can pass, for example, the same structure as callback function `onSelect` returns back. The compoments will pay attention to id, parentId and isCheckedAll attributes only.

> <span style="color:#a00">The components (combo-box and view) pay attention to `id` and `parentId` while searching for pre-checked items. It means that Back-End _should return unique **parentId - id** combinations_ for all items of hierarchies while `id` of a particular item could be not unique.</span> 

## API

### HierarchySelectorView

#### Properties

Property name | Type | Required | Default value | Description
---|---|:---:|---|---
allLabel | string or element | | 'All' | A text of 'All' checkbox of combo-box lists
btnCancelLabel | string or element | | 'Cancel' | A text of Cancel button of the component	 
btnSelectLabel | string or element | | 'Select' | A text of Select button of the component	 
dataSourceProvider | dataSourceProviderType | yes | | Data provider for the component
groupName | string | | _&lt;empty string&gt;_ | Input field value of a group name
groupNameLabel | string or element | | 'Group name' | A label text of the group name input field	 
groupNamePlaceHolder | string | | 'Please, fill a group name'	| A placeholder text of the group name input field
listItemRenderFunction | function |  | null | A custom rendering function to render the last items in hierarchy differently than by default
preCheckedItems | preCheckedItemsListShape | | null	| Defines pre-checked items for the view
selectedItemListLabel |	string or element | | 'Selected items' | A label text of a selected items list
selectedItemRenderFunction | function | | null | A custom rendering function to render selected list items differently than by default. The function has only one parameter that represents the current selected item for rendering. Otherwise it works the same way like listItemRenderFunction function
showInModal | boolean | | true | Whether to show the component as a popup modal window or not (it uses a bootstrap modal component). When 'standalone' property = true, then the view will be rendered as a part of a page
standalone | boolean | | false | Set to true, if the component used as a standalone component without HierarchySelectorComboBox. In this case some elements such GroupName component will be hidden.
title | string or element | | _&lt;empty string&gt;_ | A title of the component
onCancel | function | |	_&lt;empty function&gt;_ | A callback function that is called when Cancel button of the component is clicked (Cancel button is visible only in a modal mode)
onCheckListChanged | function | | _&lt;empty function&gt;_ | A callback function that is called every time user checked or unchecked an item(s)

#### Callback functions

Here is a list of HierarchySelectorView callback functions.

- __onCancel()__ &mdash; Function is called when a user press Cancel button (the button is visible only when HierarchySelectorView is not in standalone mode)
- __onCheckListChanged(resultList)__ &mdash; Function is called everytime user check/uncheck items.
  - Parameters: resultList (array) &mdash; contains information about items, that are checked through the list(s) of hierarchies items, including data source provider ID.
  - resultList example: 
```json
    [
      {
        "id": 1,
        "name": "Company 1",
        "level": 1,
        "parentId": null,
        "parentIds": [],
        "isCheckedAll": true,
        "isChildren": true
      },
      {
        "id": 212,
        "name": "FI12 1234 1234 1234 1234 22",
        "level": 3,
        "parentId": 25,
        "parentIds": [2,25],
        "isCheckedAll": false,
        "isChildren": false
      },
      ...
    ]
```
A Level attribute's value starts from 1 (not zero-based). Property `parentIds` contains all parents of a chekced node. `parentId` contains only the closest parent id. If there is no parent the property contains `null` value.

#### Styling

HierarchySelectorView component doesn't have borders, so a developer need a DIV wrapper container to embed this component suitable way.

Here an example of style that brings to HierarchySelectorView borders and 100% height: 

```css
.bank-account-view-component-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
  background-color: #fff;
  border: 1px solid #ccc
}
```

### HierarchySelectorDataSourceProvider

This is a class, that provides data handling for HierarchySelectorView and HierarchySelectorComboBox components

#### Methods

Method name | Parameter
---|---
constructor (promiseFunction) | promiseFunction &mdash; function that returns a promise object such an instance of Promise ES6 or other promise objects, for example axios

Example of creating a Data Source object with a promise function:
```js
const dataSourceProvider = new HierarchySelectorDataSourceProvider(() => (
  new Promise((resolve) => {
    resolve(require('.../platform/components/hierarchy-selector/services/mockData.json'));
  })
));
```

### HierarchySelectorComboBox

This component looks like a combo-box and starts to load data after a user click on a down-arrow of a combo-box to open a popover window. However if there's _pre-checked data_ and initial data is not loaded the component starts to load initial data immediately to set pre-checked items.

#### Properties

Property name | Type | Required | Default value | Description
---|---|:---:|---|---
dataSourceProvider | dataSourceProviderType |	yes | | Data provider for the component
hideOnPopoverBlur | boolean | | true | The property defines whether a popover panel of this component should be closed on blur event. If true, then the popover will be closed afer blur event was triggered.
inputName |	string | | _&lt;empty string&gt;_ | The property defines Name property of DOM input element that contains a group name of selected items.
noSelectionText |	string | | 'No one selected...'	| The property defines a text that will appear in the combo box as a placeholder of an input element and in a tooltip when no one element was selected.
popoverOptions | popoverOptionsType | yes | | Defines options for the popover panel of the combo box component (see popoverOptionsType for more information).
popoverVisible | boolean | | false | Defines whether the popover panel shoud be opened from the start.
preCheckedGroupName |	string | | Default group | Defines group name for pre-checked items (will be shown as a combo box text). If there are no pre-checked items this property is not used
preCheckedItems |	preCheckedItemsListShape | | null |	Defines pre-checked items for the view
tooltipPlacement | string | | 'bottom' | Defines a placement for a tooltip and should contain one of the values described for OverlayTrigger component of  React-Bootstrap framework (property placement)
viewOptions | viewOptionsType |	yes	| | Defines options for the HierarchySelectorView component (see viewOptionsType and HierarchySelectorView for more information).
onSelect | function | |	_&lt;empty function&gt;_ | A callback function that is called when user has selected items in the popover panel or in HierarchySelectorView component.

#### Callback functions

Here is a list of HierarchySelectorComboBox callback functions.

- __onSelect (items)__ &mdash; Function is called when a user has selected items in the popover panel or in HierarchySelectorView component.
  - Parameter `items` - contains information about items, that were selected in the popover panel or in HierarchySelectorView component
  - Data structure of `items` parameter:
```json
    [
      {
        "id": 1,
        "name": "Company 1",
        "level": 1,
        "parentId": null,
        "parentIds": [],
        "isCheckedAll": true,
        "isChildren": true
      },
      ...
    ]
```
is the same as in `onCheckListChanged` callback function of View component. For an item that is selected from a popover the value of level attribute is 0 (zero).

## Types

Here is a list of types additional to JavaScript standard types:

- __dataSourceProviderType:__ `instanceOf(HierarchySelectorDataSourceProvider)`
- __foundItemsShape:__ `arrayOf(selectedItemsShape)`
- __hierarchyItemListShape:__ `arrayOf(hierarchyItemShape)`
- __hierarchyItemShape:__
```
  {
    id: number.isRequired,
    name: string.isRequired,
    children: arrayOf(hierarchyItemShape)
  }
```
- __popoverOptionsType:__ 
```
  {
    btnOpenViewLabel: oneOfType([string, element]),
    searchPlaceHolder: string,
    pinnedGroupLabel: oneOfType([string, element]),
    recentGroupLabel: oneOfType([string, element]),    
  }
```
- __preCheckedItemsListShape:__ `arrayOf(preCheckedItemsShape)`
- __preCheckedItemsShape:__ 
```
  {
    id: oneOfType([number, string]).isRequired,
    parentId: oneOfType([number, string]),
    isCheckedAll: bool,
  }
```
  - Parameter `parentId` is required if a checked element is deeper than in the first level of a hierarchy. 
  - Parameter `isCheckedAll` means that all child-elements of the checked element are checked as well. If `isCheckedAll` is missed it means `false` value.

- __selectedItemsShape__ - the same structure that described for callback function onCheckListChanged.
- __viewOptionsType:__
```
  {
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
  }
```

## Code example

For a usage example see [source code](../src_docs/components/example-view.component.jsx)
