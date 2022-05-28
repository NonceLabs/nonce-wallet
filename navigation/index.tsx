import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import useColorScheme from 'hooks/useColorScheme'
import * as React from 'react'
import { StatusBar } from 'expo-status-bar'

import LinkingConfiguration from './LinkingConfiguration'
import RootNavigator from './RootNavigator'

export default function Navigation() {
  const theme = useColorScheme()
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={theme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </NavigationContainer>
  )
}
