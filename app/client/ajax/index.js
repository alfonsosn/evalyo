import $ from 'jquery'

const getProfessor = (profId) =>
  new Promise((resolve, reject) => {
    $.ajax({
      url: `/api/professors/${profId}`,
      type: 'GET'
    })
    .done((professor) => {
      resolve(professor)
    })
  })

const getRatings = (profId, courseId) =>
  new Promise((resolve, reject) => {
    $.ajax({
      url: `/api/professors/${profId}/${courseId}`,
      type: 'GET'
    })
    .done((ratings) => {
      resolve(ratings)
    })
  })

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

export default {
  getProfessor,
  getRatings,
  getProfessorsByName
}