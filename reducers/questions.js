import {ADD_QUESTION, DELETE_QUESTION, RECEIVE_QUESTIONS } from '../actions'

function questions (state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS: {
      return {
        ...state,
        ...action.questions
      }
    }
    case ADD_QUESTION:
      const {id, question} = action
        return {
          ...state,
          [id] : question
        }
      case DELETE_QUESTION:
        return {
          ...state,
          [action.id]: state.filter((questionId) => questionId !== action.questionId)
        }
    default: {
      return state
    }
  }
}

export default questions