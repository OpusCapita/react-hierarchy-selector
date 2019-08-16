/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from '@opuscapita/react-searchbar';

import { dataSourceProviderType } from '../../services/types';
import Search from '../../models/search';
import GroupEntity from '../../models/group.entity';

import CommonLayout from './layouts/common.layout';
import SpinnerLayout from './layouts/spinner.layout';
import HSSelectButton from './select-btn.component';
import PopoverSearchContent from './search/search-content.component';
import EventHandler from './event-handlers';
import { CLASS_NAME_SEARCH_FOCUSABLE } from './constants';
import Utils from '../../utils';
import './popover.scss';

export default class HierarchySelectorPopover extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDataLoaded: props.dataSourceProvider.isLoaded,
      searchingFor: '',
    };
  }

  componentWillMount() {
    if (!this.state.isDataLoaded) {
      this.props.dataSourceProvider.loadData().then(() => {
        this.setState({ isDataLoaded: true });
      });
    }
  }

  componentDidMount() {
    this.mainElement.addEventListener('focusout', this.onFocusOutHandler);
  }

  componentWillUnmount() {
    this.mainElement.removeEventListener('focusout', this.onFocusOutHandler);
  }

  onFocusOutHandler = (e) => {
    if (!Utils.isFocusOnCurrentTarget(e)) this.props.onComponentBlur();
  }

  onSearchChangeHandler = searchingFor => this.setState({ searchingFor });

  onSelectHandler = (data) => {
    let model = null;

    if (data) {
      const groupName = data.name ? data.name : 'Undefined';
      const items = Array.isArray(data) ? data : [data];
      model = new GroupEntity(groupName, items);
    }
    this.props.onSelect(model);
  }

  onKeyDownHanlder = (e) => {
    EventHandler.searchElementFocusHanlder(e);
  }

  getSearchElement = () => (
    <SearchBar
      autoFocus
      defaltValue={this.state.searchingFor}
      inputClassName={CLASS_NAME_SEARCH_FOCUSABLE}
      isDynamic
      isTooltipEnabled
      minChars={2}
      translations={{
        tooltip: this.props.searchTooltip,
        searchPlaceHolder: this.props.searchPlaceHolder,
      }}
      onSearch={this.onSearchChangeHandler}
      onClear={this.props.onShouldClosePopover}
    />
  );

  getLists = () => (
    <div>
      <HSSelectButton label={this.props.btnOpenViewLabel} onClick={this.props.onShouldOpenView} />
    </div>
  );

  getSearchLayout = () => {
    const searchModel = new Search(this.props.dataSourceProvider);
    const foundItems = searchModel.getFoundFromHierarchy(this.state.searchingFor);

    return (
      <PopoverSearchContent
        foundItems={foundItems}
        onSelect={data => this.onSelectHandler(data)}
        itemRenderFunction={this.props.foundItemRenderFunction}
      />
    );
  }

  getMainLayout = () => (
    <CommonLayout>
      {this.getSearchElement()}
      {this.state.searchingFor !== '' ? this.getSearchLayout() : this.getLists()}
    </CommonLayout>
  );

  render() {
    return (
      <div
        className="oc-hierarchy-selector-popover"
        tabIndex="0"
        ref={(el) => { this.mainElement = el; }}
      >
        { this.state.isDataLoaded ? this.getMainLayout() : <SpinnerLayout /> }
      </div>
    );
  }
}

HierarchySelectorPopover.propTypes = {
  dataSourceProvider: dataSourceProviderType.isRequired,
  onComponentBlur: PropTypes.func,
  onSelect: PropTypes.func,
  onShouldOpenView: PropTypes.func,
  foundItemRenderFunction: PropTypes.func,
  onShouldClosePopover: PropTypes.func,
  btnOpenViewLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  searchPlaceHolder: PropTypes.string,
  searchTooltip: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

HierarchySelectorPopover.defaultProps = {
  onComponentBlur: () => {},
  onSelect: () => {},
  onShouldOpenView: () => {},
  onShouldClosePopover: () => {},
  foundItemRenderFunction: null,
  btnOpenViewLabel: 'Select...',
  searchPlaceHolder: 'Search...',
  searchTooltip: null,
};
