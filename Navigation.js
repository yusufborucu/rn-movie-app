import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import HomeScreen from './screens/HomeScreen'
import DetailScreen from './screens/DetailScreen'

const Stack = createStackNavigator()

const screenOptions = {
  headerShown: false
}

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  </NavigationContainer>
)

export default Navigation
