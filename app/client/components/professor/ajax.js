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

export default {
  getProfessor,
  getRatings
}