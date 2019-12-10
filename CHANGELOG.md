# Changelog

* In general follow (https://docs.npmjs.com/getting-started/semantic-versioning) versioning.

## <next>

## 1.10.0
* Add `isClearable` prop to allow clearing of selected values.
* Add option to hide group name input

## 1.9.1
* Fix npm package content, include only necessary files.
* Update docs to new format

## 1.9.0
* Add `flags` object as onSelect thirds argument.
* Pass `interactive` flag in onSelect if change was triggered by user.

## 1.8.0
* Updated a version of @opuscapita/react-searchbar component.
* Component's popup window opens by clicking anywhere on combo box.
* Search field of a popup window gets a focus automatically, after the popup window has been opened.
* Searching starts with 2 letters by default.
* Color of "Select" button was changed to orange in View panel.

## 1.7.0
* Added 'mainFields' property to resolve section

## 1.6.4
* Upgrade some packages

## 1.6.3
* Upgrade to latest packages

## 1.6.2
* Fixed the most of dependency vulnerabilities

## 1.6.1
* Fixed a bug: Trash button jumps to next row (fixded item styles of a selected item list) 

## 1.6.0

* Made use of @opuscapita/react-searchbar
* Updated @opuscapita/react-checkbox version

## 1.5.2

* Fixed tooltipItemRenderFunction parametering
* Fixed popover searched item selection

## 1.5.1

* Updated @opuscapita/react-checkbox version

## 1.5.0

* Added a new prop `tooltipItemRenderFunction` for HierarchySelectorComboBox component 

## 1.4.2
* Added helpDisabled property to define, whethet Help-button is visible or not in top-bar
* Added onHelp event

## 1.4.1

* Copied found object as such to search result in order to enable custom format

## 1.4.0

* Added a new prop `foundItemRenderFunction` for Popover component of HierarchySelectorComboBox component

## 1.3.2

* Added a new parameter `groupName` to onSelect event handler of HierarchySelectorComboBox component
* Added an empty combo-box element without prechecked items to DEMO page

## 1.2.2

* Updated @opuscapita/react-checkbox version

## 1.2.1

* Styles from @opuscapita/oc-cm-common-styles
* Checkbox from @opuscapita/react-checkbox

## 1.2.0

* Removed pinned and recently used lists from Popover component as unused and not-yet-implemented
* Fixed a style of selected item
* Added babel-polyfill for DEMO

## 1.1.0

* CSS styles changing.
* Added Webpack Bundle Analyzer and a script for running it.
* Added all peer dependencies to WebPack externals.
* Value of Webpack configuration `devTool` option changed to `source-map`.

## 1.0.0

* Initial release of `HierarchySelector` component
