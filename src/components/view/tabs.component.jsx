import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-bootstrap';

import ViewTabContent from './tab-content.component';
import { tabOptionsType } from '../../types';
import Utils from '../../utils';

import './tabs.scss';

export default class ViewTabs extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
    };
  }

  shouldComponentUpdate() {
    // should be updated always. Real update logic is delegated to children
    return true;
  }

  onSelectHandler = (key) => {
    this.setState({ activeTab: key });
  }

  getContent = () => {
    const { items } = this.props;
    const key = 0;
    const item = items[key];

    return item === undefined ? null : this.getViewTabContent(key + 1, item.dataSourceProvider);
  }

  getContentWithTabs = () => {
    const { items } = this.props;
    const tabsId = `hs-view-tabs-${Utils.uId8()}`;
    return (
      <Tabs
        activeKey={this.state.activeTab}
        animation
        className="oc-hierarchy-selector-view-tabs"
        id={tabsId}
        onSelect={this.onSelectHandler}
      >
        {Object.keys(items).map((key) => {
          const i = Number(key) + 1;
          const item = items[key];
          return (
            <Tab
              mountOnEnter
              key={i}
              eventKey={i}
              title={item.title}
            >
              {this.getViewTabContent(i, item.dataSourceProvider)}
            </Tab>
          );
        })}
      </Tabs>
    );
  }

  getViewTabContent = (i, dataSourceProvider) => (
    <ViewTabContent
      allLabel={this.props.allLabel}
      index={i}
      listItemRenderFunction={this.props.listItemRenderFunction}
      dataSourceProvider={dataSourceProvider}
      searchPlaceHolder={this.props.searchPlaceHolder}
      onCheckListChange={this.props.onCheckListChange}
    />
  )

  render() {
    return this.props.items.length === 1 && this.props.hideSingleTab ?
      this.getContent() : this.getContentWithTabs();
  }
}

ViewTabs.propTypes = {
  allLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  hideSingleTab: PropTypes.bool,
  items: PropTypes.arrayOf(tabOptionsType).isRequired,
  listItemRenderFunction: PropTypes.func,
  onCheckListChange: PropTypes.func,
  searchPlaceHolder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

ViewTabs.defaultProps = {
  allLabel: 'All',
  hideSingleTab: false,
  listItemRenderFunction: null,
  searchPlaceHolder: 'Search...',
  onCheckListChange: () => {},
};
