import AsyncStorage from '@react-native-async-storage/async-storage'

const DECK_STORAGE_KEY = 'mobileFlashcards:decks'
const QUESTION_STORAGE_KEY = 'mobileFlashcards:questions'

export const fetchDecks = async () => {
  try {
    const deckString = await AsyncStorage.getItem(DECK_STORAGE_KEY)
    if (deckString !== null) {
      return JSON.parse(deckString)
    }
  } catch (error) {
    console.log(error)
  }
}

export const fetchQuestions = async () => {
  try {
    const questionString = await AsyncStorage.getItem(QUESTION_STORAGE_KEY)
    if (questionString !== null) {
      return JSON.parse(questionString)
    }
  } catch (error) {
    console.log(error)
  }
}

export const createDeck = async (deck) => {
  try {
    const deckString = JSON.stringify({[deck.id]: deck})
    await AsyncStorage.mergeItem(DECK_STORAGE_KEY, deckString)
  } catch (error) {
    console.log(error)
  }
}

export const createQuestion = async ( id, question) => {
  try {
    const questionString = JSON.stringify({[id] : question})
    await AsyncStorage.mergeItem(QUESTION_STORAGE_KEY, questionString)
  } catch (error){
    console.log(error)
  }
}

export const deleteDeck = async (deckId) => {
  try {
    const results = await AsyncStorage.getItem(DECK_STORAGE_KEY)
    const data = JSON.parse(results)
    delete data[deckId]
    await AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.log(error)
  }
}