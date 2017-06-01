import React from 'react'
import {InlineForm, Panel, PanelHeader} from 'rebass'
import { Flex, Box } from 'reflexbox'
import { Link } from 'react-router';
import { compose } from 'recompose'
import ProfessorCard from '../cards/ProfessorCard.js';
import withAjax from './ajax'

class Search extends React.Component {
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
    const { professors } = this.state
    return(
      <div>

      <Flex pt={3} wrap>
        <Box col={12} lg={12} sm={12} >
          <h2> Search for your Professor: </h2>
        </Box>
        <Box col={12} lg={12} sm={12} pt={2}>
          <InlineForm
            buttonLabel="Go"
            label="ProfSearch"
            name="prof_search"
            onChange={this.onInputChange}
            onClick={this.onClick}
          />
        </Box>
      </Flex>

      <Flex justify='center'
            align='center'
            wrap>

          {professors.length === 0 ?
            <div>  </div>
            : professors.map((prof, index) => (
                <ProfessorCard key={index} prof={prof}></ProfessorCard>
              ))}

      </Flex>

      </div>
    )
  }
}

export default compose(withAjax)(Search)
