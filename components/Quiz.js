import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import TextButton from './TextButton'


class Quiz extends Component {
  state = {
    currentQuestion: 0,
    correctAnswers: 0,
    firstOfDay: true,
    showQuestion: true,
    flipValue: new Animated.Value(0)
  }

  
  

  checkAnswer = answer => {
    if (this.state.firstOfDay) {
      clearLocalNotification().then(setLocalNotification)
      this.setState( (state) => {
        return {
          firstOfDay: false,
        }
      })    
    } 
    if (answer === 'correct') { 
      this.state.flipValue.setValue(0)      
      this.setState( (state) => {
        return {
          currentQuestion: state.currentQuestion + 1,
          correctAnswers: state.correctAnswers + 1,
          showQuestion: true
        }
      })
    } else {
      this.state.flipValue.setValue(0)
      this.setState( (state) => {
        return {
          currentQuestion: state.currentQuestion + 1,
          showQuestion: true
        }
      })
      
    }
  }

  resetQuiz = () => {
    this.setState( (state) => {
      return {
        currentQuestion : 0,
        correctAnswers : 0
      }
    })
  }

  showAnswer = () => {
    if (!this.state.showQuestion){
      Animated.spring(this.state.flipValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start(() => this.state.flipValue.setValue(0))
    } else {
      Animated.spring(this.state.flipValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start(() => this.state.flipValue.setValue(180))
    }
    
    this.setState((state) => {
      return {
        showQuestion: !state.showQuestion,
      }
    })
  }
    
  render() {
    const { currentQuestion, showQuestion, firstOfDay } = this.state
    const { questionsArray } = this.props
    console.log('render', firstOfDay)
    const frontInterpolate = this.state.flipValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    })
    const backInterpolate = this.state.flipValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
    const frontOpacity = this.state.flipValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    })
    const backOpacity = this.state.flipValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    })

    const frontAnimatedStyle = {
      transform : [
        { rotateY: frontInterpolate}
      ]
    }
    const backAnimatedStyle = {
      transform : [
        { rotateY: backInterpolate}
      ]
    }
    
    return (
      <View>
        {questionsArray.length === currentQuestion ?
          <View style={styles.container}>
            <Text style={styles.text}>All Questions Answered. You scored a {this.state.correctAnswers} out of {questionsArray.length}</Text>
            <TextButton onPress={() => this.resetQuiz()}>Reset Quiz</TextButton>
            <TextButton onPress={() => this.props.navigation.navigate('Home')}>Return Home</TextButton>
          </View>
        :
        questionsArray.length < 1 ? 
          <View style={styles.container}>
            <Text style={styles.text}>No Questions to ask.</Text>
          </View>
          :
          <View style={styles.container}>
            <View style={styles.superscriptContainer}>
              <Text style={styles.superscript}>{currentQuestion}/{questionsArray.length}</Text>
            </View>
            <View style={styles.cardContainer}>
              <Animated.Text style={[styles.cardText, frontAnimatedStyle, {opacity: frontOpacity}]}>{questionsArray[currentQuestion].questionText}</Animated.Text>
              <Animated.Text style={[styles.cardText, styles.cardTextBack, backAnimatedStyle, {opacity: backOpacity}]}>{questionsArray[currentQuestion].answer}</Animated.Text>   
            </View>
            <TouchableOpacity style={styles.button} onPress={() => this.showAnswer()}>
              <Text style={[styles.text, styles.white]}>{showQuestion ? 'Show Answer' : 'Show Question'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: 'green'}]} onPress={() => this.checkAnswer('correct')}>
              <Text style={[styles.text, styles.white]}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: 'red'}]} onPress={() => this.checkAnswer('incorrect')}>
              <Text style={[styles.text, styles.white]}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },  
  text : {
    fontSize: 30,
  },
  cardContainer : {
    height: '50%',
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden'
  },
  cardText : {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 3,
    height: '100%',
    width: '100%',
    fontSize: 30,
    backgroundColor: 'white',
    opacity: 100,
    textAlign: 'center',
  },
  cardTextBack : {
    position: 'absolute',
    top: 0,
  },
  button : {
    display: 'flex',
    width: '80%',
    backgroundColor: '#111',
    padding: 20,
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  white : {
    color: '#eee'
  },
  superscriptContainer : {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  superscript : {
    fontSize: 12
  }
})

const mapStateToProps = (state, navigation) => {
  const questions = state.questions
  const deckId = navigation.route.params.deckId
  const questionsArray = []

  Object.keys(questions).map(key => {
    if (questions[key].deckId === deckId) {
      questionsArray.push(questions[key])
    }
  })

  return {
    questionsArray
  }
}

export default connect(mapStateToProps)(Quiz);