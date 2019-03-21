import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// STATE: private and fully controlled by the component
// it's input (Prop) that the component can update/change/modify
// Because: All React components must act like pure functions with respect to their props


class Dropdown extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    title: PropTypes.string,
    optionsArray: PropTypes.array.isRequired,
    dropDownOptionSelected: PropTypes.string.isRequired,
    onDropdownChange: PropTypes.func.isRequired
  };

  // static defaultProps = {};

  // ================================================================================================

  handleChange = (e) => {
    console.log('>>>>>>>>>>>>>>>> Dropdown > handleChange > e.target.value: ', e.target.value);
    this.props.onDropdownChange(e.target.value);
  }

  componentDidMount() {
    console.log('>>>>>>>>>>>>>>>> Dropdown > componentDidMount() <<<<<<<<<<<<<<');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('>>>>>>>>>>>>>>>> Dropdown > componentDidUpdate() <<<<<<<<<<<<<<');
  }

  componentWillUnmount() {
    console.log('>>>>>>>>>>>>>>>> Dropdown > componentWillUnmount() <<<<<<<<<<<<<<');
  }

  render() {

    const { title, optionsArray, dropDownOptionSelected } = this.props;

    return (

      <form>

        <div className="form-group">

          <label htmlFor="exampleFormControlSelect1">{ title }</label>

          <select
            className="custom-select custom-select-sm"
            id="exampleFormControlSelect1"
            value={dropDownOptionSelected}
            onChange={this.handleChange}
          >

            <option value="">{ title }...</option>

            {optionsArray.map((option, index) => (
              <Fragment key={index}>
                <option value={option}>{option}</option>
              </Fragment>
            ))}

          </select>

        </div>

      </form>
    );
  }
}

export default Dropdown;
