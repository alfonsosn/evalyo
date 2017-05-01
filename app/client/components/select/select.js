import React from 'react'
import PropTypes from 'prop-types';
import {Select} from 'rebass'



const SelectUI = ({value, onChange, options}) => (
  <Select
      name='semester'
      label='Semester'
      value={value}
      onChange={onChange}
      options={options}
  />
)

SelectUI.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object)
}

export default SelectUI
