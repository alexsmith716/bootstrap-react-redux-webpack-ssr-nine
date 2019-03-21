import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const DropdownSelect = props => {

  const { title, optionsArray, dropDownOptionSelected, onChange } = props;

  console.log('>>>>>>>>>>>>>>>> DropdownSelect > PROP > title: ', {title});
  console.log('>>>>>>>>>>>>>>>> DropdownSelect > PROP > dropDownOptionSelected: ', {dropDownOptionSelected});

  // onChange={e => {
  //   onChange(e.target.value);
  // }}

  // -------------------------------------------------------------

  return (

    <form>

      <div className="form-group">

        <label htmlFor="exampleFormControlSelect1">{ title }</label>

        <select
          className="custom-select custom-select-sm"
          id="exampleFormControlSelect1"
          value={dropDownOptionSelected}
          onChange={ onChange }
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
};

DropdownSelect.propTypes = {
  title: PropTypes.string,
  optionsArray: PropTypes.array.isRequired,
  dropDownOptionSelected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default DropdownSelect;
