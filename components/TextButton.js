import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'


export default function TextButton({children, onPress, style ={}}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.button, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  }
})