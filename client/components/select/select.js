import React from 'react'
import PropTypes from 'prop-types';
import {Select} from 'rebass'
import {withProps} from 'recompose'

const CustomSelect = ({name, value, onChange, options, generateOptions}) => 
    <Select
      name= {name}
      label= {name}
      value={value || ''}
      onChange={onChange}
      options={generateOptions(options)}
    /> 

const enhance = withProps({
  generateOptions: (arr) => [{ value: '', children: 'choose one'}, ...arr]
})

const SelectWithProps = enhance(CustomSelect)

CustomSelect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  generateOptions: PropTypes.func.isRequired
}


export default SelectWithProps
