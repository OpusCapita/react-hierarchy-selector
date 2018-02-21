import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Badge } from 'react-bootstrap';

import './badge.scss';

export default class HSBadge extends React.PureComponent {

  getClassNames = className => (classnames(
    'oc-hierarchy-selector-badge', className,
  ));

  render() {
    const { className, ...other } = this.props;
    return (
      <Badge className={this.getClassNames(className)} {...other}>
        {this.props.children}
      </Badge>
    );
  }
}

HSBadge.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

HSBadge.defaultProps = {
  children: null,
  className: '',
};
