import React from 'react'
import { compose } from 'recompose'
import withAjax from './ajax'
import Search from './Search'

class SearchContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: '',
      professors: []
    }
    this.onClick = this.onClick.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
  }

  onInputChange(e){
    this.setState({ input: e.target.value })
  }
  
  onClick(e){
    e.preventDefault()
    this.props.getProfessorsByName(this.state.input)
    .then((professors) => {
        this.setState({ professors: professors })
    })
  }

  render(){
    return(
      <Search
        professors={this.state.professors}
        onInputChange={this.onInputChange}
        onClick={this.onClick}
      />
    )
  }
}

export default compose(withAjax)(Search)