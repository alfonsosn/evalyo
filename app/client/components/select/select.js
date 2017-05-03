import React from 'react'
import PropTypes from 'prop-types';
import {Select} from 'rebass'
import {prependBlank} from './helpers'

const SelectUI = ({name, value, onChange, options}) => 
    <Select
      name= {name}
      label= {name}
      value={value}
      onChange={onChange}
      options={prependBlank(options)}
    /> 

SelectUI.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object)
}

export default SelectUI
