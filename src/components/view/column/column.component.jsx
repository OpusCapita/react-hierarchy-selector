import React from 'react';
import Checkbox from '@opuscapita/react-checkbox';
import PropTypes from 'prop-types';

import SelectableList from '../../selectable-list';
import ColumnData from '../../../models/column/column-data';

import './column.scss';

export default class ViewColumn extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checkedAll: this.props.checkedAll,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checkedAll !== this.props.checkedAll) {
      this.setState({
        checkedAll: nextProps.checkedAll,
      });
    }
  }

  clickHandler = (id, event) => {
    this.props.onClick(this.props.index, id, event);
  }

  checkHandler = (id, checkState) => {
    this.props.onCheck(this.props.referenceIds.slice(), id, checkState);
  }

  checkAllHandler = () => {
    const newState = !this.state.checkedAll;
    this.props.onCheckAll(this.props.referenceIds.slice(), newState);
    this.setState({
      checkedAll: newState,
    });
  }

  renderWrapperFunction = index => (item, defaultRenderFunction) =>
    this.props.itemRenderFunction(index, item, defaultRenderFunction);

  render() {
    // TODO: 'All' text should be passed here to show translated text.
    const disabledProperty = this.props.checkedAllDisabled ? { disabled: true } : null;
    return (
      <div className="oc-hierarchy-selector-column">
        <div className="oc-hierarchy-selector-column-all">
          {!this.props.checkedAllHidden ?
            <Checkbox
              onChange={this.checkAllHandler}
              checked={this.state.checkedAll}
              label={this.props.allLabel}
              {...disabledProperty}
            />
            : null
          }
        </div>
        <SelectableList
          checkedAll={this.props.checkedAll}
          checkDisabled={this.state.checkedAll}
          checkedIds={this.props.checkedIds}
          items={this.props.data.items}
          itemRenderFunction={this.props.itemRenderFunction ?
                              this.renderWrapperFunction(this.props.index) : null}
          selectedId={this.props.selectedId}
          onCheck={this.checkHandler}
          onClick={this.clickHandler}
        />
      </div>
    );
  }
}

ViewColumn.propTypes = {
  allLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  checkedIds: PropTypes.arrayOf(PropTypes.number),
  checkedAll: PropTypes.bool,
  checkedAllDisabled: PropTypes.bool,
  checkedAllHidden: PropTypes.bool,
  index: PropTypes.number.isRequired,
  itemRenderFunction: PropTypes.func,
  data: PropTypes.instanceOf(ColumnData),
  selectedId: PropTypes.string,
  referenceIds: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  onCheck: PropTypes.func,
  onCheckAll: PropTypes.func,
  onClick: PropTypes.func,
};

ViewColumn.defaultProps = {
  allLabel: 'All',
  checkedAll: false,
  checkedAllDisabled: false,
  checkedAllHidden: false,
  data: new ColumnData(),
  itemRenderFunction: null,
  selectedId: null,
  referenceIds: [],
  onCheck: () => {},
  onCheckAll: () => {},
  onClick: () => {},
  checkedIds: [],
};
