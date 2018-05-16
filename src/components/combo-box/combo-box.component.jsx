/* eslint-disable react/no-unused-state */

import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import PropTypes from 'prop-types';
import FaChevronDown from 'react-icons/lib/fa/chevron-down';
import { dataSourceProviderType } from '../../services/types';
import { preCheckedItemsListShape, popoverOptionsType, viewOptionsType } from '../../types';
import Spinner from '../spinner';
import HSPopover from '../popover';
import HSView from '../view';
import HSBadge from '../badge';


import { TOOLTIP_DELAY_MS, MAX_COUNT_OF_TOOLTIP_ITEMS } from './constants';
import './combo-box.scss';

export default class HierarchySelectorComboBox extends React.PureComponent {
  constructor(props) {
    super(props);

    const isDataLoaded = props.dataSourceProvider.isLoaded;
    const needToUpdatePreChecked = props.preCheckedItems && props.preCheckedItems.length;
    const needToLoadData = !isDataLoaded && needToUpdatePreChecked;

    this.state = {
      needToLoadData,
      needToUpdatePreChecked,
      preCheckedItems: props.preCheckedItems,
      selected: null,
      isPopoverVisible: props.popoverVisible,
      isViewVisible: false,
    };
  }

  componentWillMount() {
    const { needToLoadData } = this.state;
    if (needToLoadData) {
      this.loadData(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dataSourceProvider, preCheckedItems } = this.props;

    if (dataSourceProvider !== nextProps.dataSourceProvider) {
      this.setState({
        needToLoadData: true,
      });
    }

    if (preCheckedItems !== nextProps.preCheckedItems) {
      this.setState({
        needToUpdatePreChecked: true,
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { needToLoadData, needToUpdatePreChecked } = nextState;
    if (needToLoadData) {
      this.loadData(nextProps);
    } else if (needToUpdatePreChecked) {
      this.updatePrechecked(nextProps);
    }
  }

  onClickHandler = () => {
    this.setPopoverVisibility(!this.state.isPopoverVisible);
  }

  onInputFocus = () => {
    this.inputElement.blur();
  }

  onSelectHandler = (groupName, selectedItem, checkedOutput) => {
    this.setState({
      selected: selectedItem,
      isPopoverVisible: false,
      isViewVisible: false,
    });
    const items = checkedOutput ? checkedOutput.map(item => Object.assign({}, item)) : [];

    this.props.onSelect(items, groupName);
  }

  onPopoverBlur = () => {
    if (this.props.hideOnPopoverBlur) {
      this.popoverShouldBeHidden();
    }
  }

  onShouldOpenView = () => {
    this.setState({ isViewVisible: true });
  }

  onShouldClosePopover = () => {
    this.setState({
      isPopoverVisible: false,
    });
  }

  onCanceledView = () => {
    this.setState({
      isPopoverVisible: false,
      isViewVisible: false,
    });
  }

  onSelectedInView = (groupName, selectedItems, checkedOutput) => {
    const selectedItem = {
      name: groupName,
      items: selectedItems,
    };
    this.setState({
      preCheckedItems: checkedOutput,
    });
    this.onSelectHandler(groupName, selectedItem, checkedOutput);
  }

  onSelectedInPopover = (selectedItem) => {
    this.uncheckAllItems();
    const checkedOutput = selectedItem && Array.isArray(selectedItem.items) ?
      selectedItem.items.map(item => ({
        id: item.id,
        name: item.name,
        level: 0,
        parentId: null,
        parentIds: [],
        isCheckedAll: false,
        isChildren: false,
      }))
      : [];
    this.onSelectHandler(selectedItem, checkedOutput);
  }

  getInputText = () => {
    let selectionText = '';

    if (this.state.selected && this.state.selected.items && this.state.selected.items.length > 0) {
      selectionText = this.state.selected.name;
    }
    return selectionText;
  }

  getView = () => {
    const options = this.props.viewOptions;
    const preCheckedItems = Array.isArray(this.state.preCheckedItems) ?
      this.state.preCheckedItems.slice() : null;

    return (
      <HSView
        dataSourceProvider={this.props.dataSourceProvider}
        {...options}
        onCancel={this.onCanceledView}
        onSelect={this.onSelectedInView}
        groupName={this.state.selected ? this.state.selected.name : ''}
        preCheckedItems={preCheckedItems}
      />
    );
  }

  getPopover = () => {
    const options = this.props.popoverOptions;

    return (<HSPopover
      dataSourceProvider={this.props.dataSourceProvider}
      onComponentBlur={this.onPopoverBlur}
      onSelect={this.onSelectedInPopover}
      onShouldOpenView={this.onShouldOpenView}
      onShouldClosePopover={this.onShouldClosePopover}
      {...options}
    />);
  }

  getToolTip = content => <Tooltip id="tooltip" className="hs-combo-box-tooltip">{content}</Tooltip>;

  getDefaultToolTipContent = () => {
    if (!this.isSelectedItems()) return this.props.noSelectionText;
    const totalCount = this.state.selected.items.length;
    const count = totalCount > MAX_COUNT_OF_TOOLTIP_ITEMS ? MAX_COUNT_OF_TOOLTIP_ITEMS : totalCount;

    const items = this.state.selected.items.slice(0, count);
    const elements = Object.keys(items).map(i => <p key={i}>{items[i].name}</p>);

    if (count < totalCount) elements.push(<p key={count}>. . .</p>);

    return elements;
  }

  getCountOfSelectedItems = () => (this.isSelectedItems() ? this.state.selected.items.length : 0);

  setPopoverVisibility = (isVisible) => {
    this.setState({ isPopoverVisible: isVisible });
  }

  isSelectedItems = () => (
    this.state.selected && this.state.selected.items && this.state.selected.items.length > 0
  );

  loadData = (props) => {
    props.dataSourceProvider.loadData().then(() => {
      this.setState({
        needToLoadData: false,
      });
    });
  }

  popoverShouldBeHidden = () => {
    setTimeout(() => {
      if (this.state.isPopoverVisible) this.setPopoverVisibility(false);
    }, 150);
  }

  uncheckAllItems = () => {
    this.setState({
      preCheckedItems: [],
    });
  }

  updatePrechecked = (props) => {
    const { dataSourceProvider, preCheckedGroupName, preCheckedItems } = props;

    dataSourceProvider.setPrecheckedItems(preCheckedItems);

    const checkedOutput = dataSourceProvider.getCheckedOutput();
    const selectedItems = dataSourceProvider.getAllCheckedItems();
    const checked = checkedOutput.checked || [];

    this.setState({
      needToUpdatePreChecked: false,
    });

    this.onSelectedInView(preCheckedGroupName, selectedItems, checked);
  }

  render() {
    const { inputName } = this.props;
    const inputOptions = {
      onFocus: this.onInputFocus,
      type: 'text',
      placeholder: this.props.noSelectionText,
      readOnly: true,
      ref: (input) => { this.inputElement = input; },
      value: this.getInputText(),
    };

    if (inputName.trim() !== '') {
      inputOptions.name = inputName;
    }

    return (
      <div className="oc-hierarchy-selector-list-wrapper">
        <OverlayTrigger
          delay={TOOLTIP_DELAY_MS}
          placement={this.props.tooltipPlacement}
          overlay={this.getToolTip(this.getDefaultToolTipContent())}
        >
          <div className="oc-hierarchy-selector-list">
            <input {...inputOptions} />
            {this.state.needToLoadData ?
              <Spinner /> :
              <HSBadge className="badge-orange">{this.getCountOfSelectedItems()}</HSBadge>
            }
            <button type="button" disabled={this.state.needToLoadData} className="oc-hierarchy-selector-list-btn" onClick={this.onClickHandler}><FaChevronDown /></button>
          </div>
        </OverlayTrigger>
        { this.state.isPopoverVisible ? this.getPopover() : null }
        { this.state.isViewVisible ? this.getView() : null }
      </div>
    );
  }
}

HierarchySelectorComboBox.propTypes = {
  dataSourceProvider: dataSourceProviderType.isRequired,
  hideOnPopoverBlur: PropTypes.bool,
  inputName: PropTypes.string,
  noSelectionText: PropTypes.string,
  popoverVisible: PropTypes.bool,
  popoverOptions: popoverOptionsType.isRequired,
  preCheckedItems: preCheckedItemsListShape,
  preCheckedGroupName: PropTypes.string,
  tooltipPlacement: PropTypes.string,
  viewOptions: viewOptionsType.isRequired,
  onSelect: PropTypes.func,
};

HierarchySelectorComboBox.defaultProps = {
  hideOnPopoverBlur: true,
  inputName: '',
  noSelectionText: 'No one selected...',
  popoverVisible: false,
  preCheckedItems: null,
  preCheckedGroupName: 'Default group',
  tooltipPlacement: 'bottom',
  onSelect: () => {},
};
