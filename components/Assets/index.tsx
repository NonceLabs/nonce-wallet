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
import { IGNORE_APP_STORE } from 'utils/configure'

const renderTabBar = (
  props: SceneRendererProps & {
    navigationState: NavigationState<Route>
  }
) => {
  const theme = useColorScheme()
  return (
    <View style={[styles.tabBar]}>
      {props.navigationState.routes.map((route, index) => {
        const isActive = props.navigationState.index === index
        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.7}
            style={[
              styles.tabBarButton,
              {
                borderBottomColor: isActive
                  ? Colors[theme].link
                  : Colors[theme].bannerBackground,
              },
            ]}
            onPress={() => props.jumpTo(route.key)}
          >
            <Text style={[styles.tabBarTitle]}>{route.title}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const DEFAULT_ROUTES = [
  { key: 'token', title: 'Token' },
  // { key: 'nft', title: 'NFT' },
]

export default function Assets({ isLoading = false }: { isLoading?: boolean }) {
  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)

  const [routes, setRoutes] = useState(
    IGNORE_APP_STORE ? DEFAULT_ROUTES : DEFAULT_ROUTES.slice(0, 1)
  )

  const theme = useColorScheme()

  const renderScene = SceneMap({
    token: () => <TokenList isLoading={isLoading} />,
    // nft: NFTList,
  })

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
      sceneContainerStyle={[{ backgroundColor: Colors[theme].background }]}
      initialLayout={{ width: layout.width }}
    />
  )
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
