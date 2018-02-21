import React from 'react';
import PropTypes from 'prop-types';

import PopoverFoundItems from './found-items.component';
import { foundItemsShape } from '../../../types';

export default class PopoverSearchContent extends React.PureComponent {

  getFoundItems = () => {
    const { foundItems } = this.props;

    return (
      <div
        className="oc-hierarchy-selector-popover-search-content"
        ref={(el) => { this.mainElement = el; }}
      >
        <ul className="list-group">
          {Object.keys(foundItems).map(key => (
            <PopoverFoundItems
              key={foundItems[key].name}
              groupName={foundItems[key].name}
              data={foundItems[key].items}
              onSelect={data => this.props.onSelect(data)}
            />
          ))}
        </ul>
      </div>
    );
  }

  getMessage = message => (
    <p className="message warning">{message}</p>
  )

  render() {
    if (this.props.foundItems.length === 0) {
      return this.getMessage(this.props.noMatchesLabel);
    } else if (this.props.foundItems.length > 100) {
      return this.getMessage(this.props.tooMuchMatchesLabel);
    }

    return this.getFoundItems();
  }
}

PopoverSearchContent.propTypes = {
  onSelect: PropTypes.func,
  foundItems: foundItemsShape,
  noMatchesLabel: PropTypes.string,
  tooMuchMatchesLabel: PropTypes.string,
};

PopoverSearchContent.defaultProps = {
  onSelect: () => {},
  foundItems: [],
  noMatchesLabel: 'No matches',
  tooMuchMatchesLabel: 'Too much matches found, refine search.',
};
