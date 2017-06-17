// @flow

import $ from 'jquery'
import { withProps } from 'recompose'
import type {Professor, Rating} from './types'

/**
 *  Fetches professor from the server by prof ID
 */
function getProfessor(profId: string): Promise<Professor> {
 return new Promise((resolve, reject) => {
    $.ajax({
      url: `/api/professors/${profId}`,
      type: 'GET'
    })
    .done((professor:Professor) => {
      resolve(professor)
    })
  })
}

/**
 * Fetch Ratings from the server by prof ID and course ID
 */
function getRatings (profId: string, courseId: string): Promise<Rating[]>{
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `/api/professors/${profId}/${courseId}`,
      type: 'GET'
    })
    .done((ratings) => {
      resolve(ratings)
    })
  })
}

/**
 *  Fetch professors from the server by name
 */
function getProfessorsByName (name: string): Promise<Professor[]> {
 return new Promise((resolve, reject) => {
    $.ajax({
      url: `/api/professors/search/${name}`,
      type: 'GET'
    })
    .done((professors) => {
      resolve(professors)
    })
  }) 
}

export default {
  getProfessor,
  getRatings,
  getProfessorsByName
}