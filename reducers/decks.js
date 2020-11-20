import {ADD_DECK, DELETE_DECK, RECEIVE_DECKS} from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...action.decks
      }
    case ADD_DECK: 
      return {
        ...state, 
        [action.deck.id]: action.deck
      }
    case DELETE_DECK:
      const {[action.deckId]: value, ...newState } = state
      return {
        ...newState
      }
      
    default:
      return state
  }
}

export default decks