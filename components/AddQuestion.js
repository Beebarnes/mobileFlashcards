import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native'
import { addQuestion, getQuestions } from '../actions'
import TextButton from '../components/TextButton'
import { connect } from 'react-redux'
import { generateId } from '../utils/helpers'
import { createQuestion, fetchQuestions } from '../utils/API'

class AddQuestion extends Component {

  state = {
    questionText: '',
    answerText: '',
  }

  setText = (text, target) => {
    this.setState({
      [target] : text
    })
  }

  submitQuestion = () => {
    const {dispatch} = this.props
    

    const question = {
      id: generateId(),
      deckId: this.props.route.params.deckId,
      questionText: this.state.questionText,
      answer: this.state.answerText,
    }
 
    dispatch(addQuestion(question.id, question))

    createQuestion(question.id, question)

    this.setState({
        questionText: '',
        answerText: ''
    })
  }

  render() {
    return (
      <View>
        <TextInput style={styles.font} multiline={true} numberOfLines={4} placeholder='Question' onChangeText={text => this.setText(text, 'questionText')} value={this.state.questionText} />
        <TextInput multiline={true} numberOfLines={4} style={styles.font} placeholder='Answer' onChangeText={text => this.setText(text, 'answerText')} value={this.state.answerText} />
        <TextButton onPress={this.submitQuestion}>Submit</TextButton>
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


export default connect()(AddQuestion);