/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FormControl } from 'react-bootstrap';
import FaSearch from 'react-icons/lib/fa/search';
import FaClose from 'react-icons/lib/fa/close';

import './search-bar.scss';

export default class SearchBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      searchingFor: '',
    };
  }

  onInputBlurHandler = () => { this.setState({ focused: false }); }

  onInputFocusHandler = () => { this.setState({ focused: true }); }

  onChangeHandler = (e) => {
    const searchingFor = e.target ? e.target.value || '' : '';
    this.setState({ searchingFor });
    this.props.onSearchChange(e);
  }

  onCloseHandler = () => {
    this.setState({
      searchingFor: '',
    });
    this.props.onCloseClick();
  }

  getClassNames = () => (classnames({
    'oc-hierarchy-selector-search-bar': true,
    focused: this.state.focused,
  }));

  getIcon = () => {
    const icon = this.isSearchingForEmpty() ?
      <div className="search-component-icon"><FaSearch /></div>
      :
      (<div className="search-component-icon clickable" onClick={this.onCloseHandler}>
        <FaClose />
      </div>);

    return icon;
  }

  isSearchingForEmpty = () => this.state.searchingFor.trim() === '';

  render() {
    return (
      <div className={this.getClassNames()}>
        <FormControl
          className={this.props.inputClassName}
          onBlur={this.onInputBlurHandler}
          onFocus={this.onInputFocusHandler}
          onChange={this.onChangeHandler}
          placeholder={this.props.searchPlaceHolder}
          value={this.state.searchingFor}
        />
        {this.getIcon()}
      </div>
    );
  }
}

SearchBar.propTypes = {
  inputClassName: PropTypes.string,
  onSearchChange: PropTypes.func,
  onCloseClick: PropTypes.func,
  searchPlaceHolder: PropTypes.string,
};

SearchBar.defaultProps = {
  inputClassName: '',
  onSearchChange: () => {},
  onCloseClick: () => {},
  searchPlaceHolder: 'Search...',
};
