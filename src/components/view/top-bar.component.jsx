import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import FaQuestion from 'react-icons/lib/fa/question-circle';

import './top-bar.scss';

export default class ViewTopBar extends React.PureComponent {
  render() {
    return (
      <div className="oc-dialog-top-bar">
        <div className="action-left">
          <Modal.Title>{ this.props.title }</Modal.Title>
        </div>
        <div className="action-right">
          <Button onClick={this.props.onSelect} disabled={this.props.selectDisabled}>
            {this.props.btnSelectLabel}
          </Button>
          <Button onClick={this.props.onCancel}>{this.props.btnCancelLabel}</Button>
          <button type="button" className="oc-help-button" onClick={this.props.onHelp}>
            <FaQuestion />
          </button>
        </div>
      </div>
    );
  }
}

ViewTopBar.propTypes = {
  onCancel: PropTypes.func,
  onSelect: PropTypes.func,
  onHelp: PropTypes.func,
  selectDisabled: PropTypes.bool.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  btnSelectLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  btnCancelLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

ViewTopBar.defaultProps = {
  onCancel: () => {},
  onSelect: () => {},
  onHelp: () => {},
  btnSelectLabel: 'Select',
  btnCancelLabel: 'Cancel',
};
