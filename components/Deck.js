import React, { Component } from 'react'
import { Easing, View } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { deleteDeck } from '../utils/API'
import { removeDeck } from '../actions/index'




// navigation will have deck title and goBack()

class Deck extends Component {
  addQuestion = (id) => {
    this.props.navigation.navigate('Add Question', { 
      deckId: id,
    })
  }

  startQuiz = (id) => {
    this.props.navigation.navigate('Quiz', {
      deckId: id,
    })
  }

  deleteDeckBtn = async (id) => {
    this.props.navigation.navigate('Home')
    this.props.dispatch(removeDeck(id))
    deleteDeck(id)
    
  }

  render() {
      const deck = this.props.decks[this.props.route.params.deckId]
      const questions = this.props.questions
      
    return (
      <View>
        <TextButton onPress={() => this.addQuestion(deck.id)}>Add Question</TextButton>
        {(deck && deck.questionTotal) > 0 &&
          <TextButton onPress={() => this.startQuiz(deck.id)}>
            Start Quiz ({deck.questionTotal} question{deck.questionTotal !== 1 && 's'})
            </TextButton>}
        <TextButton onPress={() => this.deleteDeckBtn(deck.id)}>Delete Deck</TextButton>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Deck);