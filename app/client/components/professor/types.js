//@flow

/*
 *   Type Aliases - alternative names for existing types
 *   '?' inicates an optional property
 */

export type Option = {
  value: string,
  children: string
};

export type Review = {
  id: number,
  question: string,
  average?: number,
  yes?: number,
  no?: number,
  noAnswer?: number
}

export type Rating = {
  _id: string,
  year: string,
  semester: string,
  section?: string,
  subject: string,
  professor: string,
  reviews: Review []
}

export type Professor = {
  firstName: string,
  lastName: string,
  department: string,
  courses: Course[],
  ratings: Rating[]
}

export type Course = {
  _id: string,
  subject: string,
  name: string,
  professors: Professor[]
}

export type SortedReviews = {
  organization: Review[],
  experience: Review[],
  clarity: Review[],
  personality: Review[]
}