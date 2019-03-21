import React from 'react';
import PropTypes from 'prop-types';

const Option = ({ option, onChange }) => {

  const values = option.values
    .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
    .map((value, index) => (
      <option key={index} value={value.id}>
        {value.name}
      </option>
    ));

  const notSelectedTitle = `${text.selectOption} ${option.name}`;

  return (

    <div className="product-option">

      <div className="product-option-name">{option.name}</div>

      <span className="select is-fullwidth">

        <select
          onChange={e => {
            onChange(option.id, e.target.value);
          }}
        >
          <option value="">{notSelectedTitle}</option>
          {values}
        </select>
        
      </span>
    </div>
  );
};
// =====================================================================
const DropdownSelect = props => {

  const { onChange } = props;

  if (props && props.length > 0) {

    const items = props.map((prop, index) => (

      <Option key={index} prop={prop} onChange={onChange} />

    ));

    return <form><div className="form-group">{items}</div></form>;
  } else {
    return null;
  }
};

DropdownSelect.propTypes = {
  title: PropTypes.string,
  optionsArray: PropTypes.array.isRequired,
  dropDownOptionSelected: PropTypes.string.isRequired,
  onDropdownChange: PropTypes.func.isRequired
};

export default DropdownSelect;
