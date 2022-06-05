import { useState } from 'react'
import {
  View,
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import {
  TabView,
  SceneMap,
  SceneRendererProps,
  NavigationState,
  Route,
} from 'react-native-tab-view'

import Colors from 'theme/Colors'
import useColorScheme from 'hooks/useColorScheme'
import Fonts from 'theme/Fonts'
import { Text } from '../Themed'
import TokenList from 'components/Assets/TokenList'

export default function Assets({ isLoading = false }: { isLoading?: boolean }) {
  return <TokenList isLoading={isLoading} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray,
  },
  tabBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabBarButton: {
    flex: 1,
    paddingVertical: 10,
    borderBottomWidth: 3,
  },
  tabBarTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: Fonts.heading,
  },
})
