import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Movie App @ 2022</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height:50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34495e'
  },
  text: {
    fontSize: 16,
    color: '#ffffff'
  }
})

export default Footer