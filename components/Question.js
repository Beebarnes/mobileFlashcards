import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class Question extends Component {
  render() {
    return (
      <View>
        <Text> Question </Text>
        <Text> Answer List (up to 4) </Text>
      </View>
    )
  }
}
