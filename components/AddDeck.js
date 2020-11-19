import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions/index'
import TextButton from './TextButton'
import { generateId } from '../utils/helpers'
import { createDeck } from '../utils/API'

class AddDeck extends Component {
  state = {
    text: '',
  }

  setText = (text) => {
    this.setState({
      text
    })
  }

  submitDeck = () => {
    const deck = {
      id: generateId(),
      title: this.state.text,
    }

    this.props.dispatch(addDeck(deck))

    createDeck(deck)


    this.setState({
        text: ''
    })

    this.props.navigation.navigate('Deck', { 
      deckId: deck.id,
      title: deck.title,
      questionTotal: 0
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.font}> What name would you like for this deck? </Text>
        <TextInput style={styles.font} placeholder='Deck Title' onChangeText={text => this.setText(text)} value={this.state.text} />
        <TextButton onPress={this.submitDeck}>Submit</TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  font: {
    fontSize: 30,
    textAlign: 'center'
  }
})



export default connect()(AddDeck)