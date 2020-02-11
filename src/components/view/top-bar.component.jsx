import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { FaQuestion } from 'react-icons/fa';

import './top-bar.scss';

export default class ViewTopBar extends React.PureComponent {
  handleSelectClick = () => {
    const flags = {
      interactive: true,
    };
    this.props.onSelect(flags);
  }

  render() {
    const {
      title,
      onCancel,
      onHelp,
      selectDisabled,
      btnSelectLabel,
      btnCancelLabel,
      helpDisabled,
    } = this.props;
    return (
      <div className="oc-dialog-top-bar">
        <div className="action-left">
          <Modal.Title>{ title }</Modal.Title>
        </div>
        <div className="action-right">
          <Button
            onClick={this.handleSelectClick}
            disabled={selectDisabled}
            className="btn-primary"
          >
            {btnSelectLabel}
          </Button>
          <Button onClick={onCancel}>{btnCancelLabel}</Button>
          <button
            type="button"
            className={`oc-help-button${helpDisabled ? '-disabled' : ''}`}
            onClick={onHelp}
          >
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
  helpDisabled: PropTypes.bool.isRequired,
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
