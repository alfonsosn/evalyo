import $ from 'jquery'
import { withProps } from 'recompose'

const getProfessorsByName = (name) =>
 new Promise((resolve, reject) => {
    $.ajax({
      url: `/api/professors/search/${name}`,
      type: 'GET'
    })
    .done((professors) => {
      resolve(professors)
    })
  }) 

export default withProps({getProfessorsByName})