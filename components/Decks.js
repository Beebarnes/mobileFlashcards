import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { getDecks, getQuestions } from '../actions/index'
import { fetchDecks, fetchQuestions } from '../utils/API'



class Decks extends Component {
  componentDidMount() {
    const {dispatch} = this.props

    fetchDecks()
      .then(decks => dispatch(getDecks(decks)))
    fetchQuestions()
      .then(questions => dispatch(getQuestions(questions)))

  }

  handlePress = (deck) => {
    this.props.navigation.navigate('Deck', { 
      deckId: deck.id,
      title: deck.title,
      questionTotal: deck.questionTotal
    })
  }

  renderDeck = ({item}) => {
    return Object.keys(item).map(key => (
      <TouchableOpacity style={styles.container} key={item[key].id} onPress={() => this.handlePress(item[key])}>
        <Text style={styles.text}>{item[key].title}</Text>
        <Text style={styles.text}>{item[key].questionTotal} question{item[key].questionTotal !== 1 && 's'} </Text>
      </TouchableOpacity>)
    )
  }
 
  render() {
    const {decks, questions} = this.props
    Object.keys(decks).map(deckKey => {
      let questionTotal = 0
      Object.keys(questions).map(key => {
        if (questions[key].deckId === decks[deckKey].id){
          questionTotal++
        }
      })
      decks[deckKey].questionTotal = questionTotal
    })

    return (
      <View>
        <FlatList
          data={[decks]}
          renderItem={this.renderDeck}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#333',
    padding: 20,
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text : {
    fontSize: 30,
    color: '#eee'
  }
})

const mapStateToProps = ({decks, questions}) => {
  return {
    decks,
    questions
  }
}

export default connect(mapStateToProps)(Decks);