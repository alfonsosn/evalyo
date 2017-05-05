import React from 'react'
import {InlineForm, Panel, PanelHeader} from 'rebass'
import { Flex, Box } from 'reflexbox'
import { Link } from 'react-router';
import ajax from '../../ajax/index'

export default class Search extends React.Component {
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
    ajax.getProfessorsByName(this.state.input)
    .then((professors) => {
        this.setState({ professors: professors })
    })
  }
  render(){
    const { professors } = this.state
    return(
        <Flex pt={1} justify='center' align='center' wrap>
        <Box col={12} lg={2}></Box>
        <Box lg={8} sm={12}>
          <Panel theme='secondary'>
            <PanelHeader>
              Search
            </PanelHeader>
            <Flex  py={2} justify='center' align='center' wrap>
              <Box  sm={8} px={2}>
                <InlineForm
                  buttonLabel="Go"
                  label="ProfSearch"
                  name="prof_search"
                  onChange={this.onInputChange}
                  onClick={this.onClick}
                />
                <br/><br/>
                <ul>
                {professors.length === 0 ?
                  <div> ---- </div>
                  : professors.map((prof, index) => (
                      <li key={index}> 
                        <Link to={`/professor/${prof._id}`}>
                          {prof.firstName} {prof.lastName}
                        </Link>
                      </li>
                    ))
                }
                </ul>
              </Box>
            </Flex>
          </Panel>
        </Box>
      </Flex>
    
    )
  }
}
