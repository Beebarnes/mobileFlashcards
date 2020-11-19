export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_DECK = 'ADD_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'
export const DELETE_QUESTION = 'DELETE_QUESTION'

export function getDecks ( decks ) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function getQuestions ( questions ) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function addDeck ( deck ) {
  return { 
    type: ADD_DECK,
    deck
  }
}

export function removeDeck (deckId) {
  return {
    type: DELETE_DECK,
    deckId
  }
}

export function addQuestion (id, question) {
  return {
    type: ADD_QUESTION,
    id,
    question
  }
}

export function removeQuestion (id) {
  return {
    type: DELETE_QUESTION,
    questionId
  }
}

