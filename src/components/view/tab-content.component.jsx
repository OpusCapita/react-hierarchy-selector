/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner';
import SearchBar from '../search-bar';
import { dataSourceProviderType } from '../../services/types';
import ColumnList from '../../models/column/column-list';
import Utils from '../../utils';
import ViewColumn from './column/column.component';

export default class ViewTabContent extends React.PureComponent {
  constructor(props) {
    super(props);

    const isDataLoaded = props.dataSourceProvider.isLoaded;
    const idOfFirstItem = this.getIdOfFirstItem(props);

    this.state = {
      isDataLoaded,
      checkedItemsLastUpdate: 0,
      searchingFor: '',
      selectedColumn: idOfFirstItem !== null ? 1 : 0,
      selectedId: idOfFirstItem,
    };

    this.columns = new ColumnList(props.dataSourceProvider);
  }

  componentWillMount() {
    if (!this.state.isDataLoaded) {
      this.loadData(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isLoaded } = nextProps.dataSourceProvider;
    const checked = nextProps.dataSourceProvider.getChecked();

    if (this.state.isDataLoaded !== isLoaded) {
      this.setState({
        isDataLoaded: isLoaded,
      });
    }

    if (!isLoaded) {
      this.loadData(nextProps);
    }

    if (checked) {
      const lastUpdated = checked.getLastUpdateStamp();
      if (lastUpdated !== this.state.checkedItemsLastUpdate) {
        this.setState({
          checkedItemsLastUpdate: lastUpdated,
        });
      }
    }
  }

  getIdOfFirstItem = (props) => {
    const { dataSourceProvider } = props;
    const firstItem = dataSourceProvider.getFirstItem();
    if (firstItem === null || !firstItem.id) return null;

    return firstItem.id;
  }

  getIsCheckedAll(parentIds) {
    const checkedItemHashList = this.props.dataSourceProvider.getChecked();
    return checkedItemHashList.getIsCheckedAll(parentIds);
  }

  getCheckedIds(parentIds, data) {
    const checkedItemHashList = this.props.dataSourceProvider.getChecked();
    const result = checkedItemHashList.getCheckedItems(parentIds).map(i => i.id);

    // Adds all items that have checkedAll in children
    if (data && Array.isArray(data.items)) {
      data.items.forEach((item) => {
        const currentParentIds = parentIds.slice();
        currentParentIds.push(item.id);
        if (this.getIsCheckedAll(currentParentIds)) {
          result.push(item.id);
        }
      });
    }

    return result;
  }

  getContent = () => {
    this.refreshContent();
    const list = this.columns.list || [];
    const selectedPath = this.columns.selectedPath || [];
    const parentIds = [];
    let anyCheckedAll = false;

    return (
      <div className="oc-hierarchy-selector-tab-content">
        <div className="oc-hierarchy-selector-tab-search-bar">
          <SearchBar
            searchPlaceHolder={this.props.searchPlaceHolder}
            onSearchChange={this.searchChangeHandler}
            onCloseClick={this.searchClearHandler}
          />
        </div>
        <div className="oc-hierarchy-selector-column-wrapper">
          { Object.keys(list).map((key) => {
            const data = list[key];
            const selectedId = selectedPath[key] ? String(selectedPath[key]) : null;
            const parentReferenceIds = parentIds.slice();
            const isCheckedAll = this.getIsCheckedAll(parentIds);
            const checkedIds = isCheckedAll ? [] : this.getCheckedIds(parentIds, data);

            anyCheckedAll = anyCheckedAll || isCheckedAll;
            parentIds.push(selectedId);

            return (
              <ViewColumn
                allLabel={this.props.allLabel}
                checkedAll={anyCheckedAll || isCheckedAll}
                checkedAllDisabled={anyCheckedAll && !isCheckedAll}
                checkedAllHidden={Number(key) === 0}
                checkedIds={checkedIds}
                data={data}
                index={Number(key) + 1}
                itemRenderFunction={this.props.listItemRenderFunction}
                key={Number(key) + 1}
                referenceIds={parentReferenceIds}
                selectedId={selectedId}
                onCheck={this.checkHandler}
                onCheckAll={this.checkAllHandler}
                onClick={this.clickHandler}
              />
            );
          }) }
        </div>
      </div>
    );
  };

  getSpinner = () => <div className="oc-hierarchy-selector-tab-content"><Spinner /></div>;

  clickHandler = (level, id) => {
    this.setState({
      selectedColumn: level,
      selectedId: id,
    });
  }

  checkHandler = (referenceIds, id, checkState) => {
    const checkedItemHashList = this.props.dataSourceProvider.getChecked();
    if (checkState) {
      checkedItemHashList.add(referenceIds, id);
    } else {
      checkedItemHashList.remove(referenceIds, id);
    }
    this.setState({
      checkedItemsLastUpdate: checkedItemHashList.getLastUpdateStamp(),
    });
    this.props.onCheckListChange(checkedItemHashList);
  }

  checkAllHandler = (referenceIds, checkState) => {
    const parentIds = referenceIds.slice();
    const id = parentIds.pop();

    if (!id) throw new Error('There is no selected parent element to perform checking of all elements');

    const checkedItemHashList = this.props.dataSourceProvider.getChecked();
    if (checkState) {
      checkedItemHashList.addAll(parentIds, id);
    } else {
      checkedItemHashList.removeAll(parentIds, id);
    }
    this.setState({
      checkedItemsLastUpdate: checkedItemHashList.getLastUpdateStamp(),
    });
    this.props.onCheckListChange(checkedItemHashList);
  }

  searchChangeHandler = (e) => {
    const searchingValue = e.target ? e.target.value || '' : '';
    let searchingFor = '';

    if (Utils.enoughSearchTextLength(searchingValue)) {
      searchingFor = searchingValue;
    }
    this.setState({ searchingFor });
  }

  searchClearHandler = () => {
    this.setState({ searchingFor: '' });
  }

  loadData = (props) => {
    const { dataSourceProvider, onCheckListChange } = props;
    dataSourceProvider.loadData().then(() => {
      const checkedItemHashList = dataSourceProvider.getChecked();
      const stateObject = {
        isDataLoaded: dataSourceProvider.isLoaded,
        checkedItemsLastUpdate: checkedItemHashList.getLastUpdateStamp(),
      };

      const idOfFirstItem = this.getIdOfFirstItem(props);
      if (idOfFirstItem !== null) {
        stateObject.selectedColumn = 1;
        stateObject.selectedId = idOfFirstItem;
      }

      this.setState(stateObject);

      onCheckListChange(checkedItemHashList);
    });
  }

  refreshContent = () => {
    const { selectedColumn, selectedId, searchingFor } = this.state;
    this.columns.setSearchingFor(searchingFor);
    this.columns.refresh(selectedColumn, selectedId);
  }

  render() {
    return (
      this.state.isDataLoaded ? this.getContent() : this.getSpinner()
    );
  }
}

ViewTabContent.propTypes = {
  allLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  index: PropTypes.number.isRequired,
  listItemRenderFunction: PropTypes.func,
  dataSourceProvider: dataSourceProviderType.isRequired,
  searchPlaceHolder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onCheckListChange: PropTypes.func,
};

ViewTabContent.defaultProps = {
  allLabel: 'All',
  listItemRenderFunction: null,
  searchPlaceHolder: 'Search...',
  onCheckListChange: () => {},
};
