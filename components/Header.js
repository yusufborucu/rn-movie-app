import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Movie App</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34495e'
  },
  text: {
    fontSize: 30,
    color: '#ffffff'
  }
})

export default Header