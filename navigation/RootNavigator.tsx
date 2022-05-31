import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeAlt, Settings } from 'iconoir-react-native'
import I18n from 'i18n-js'
import { StyleProp, TextStyle } from 'react-native'

import Colors from 'theme/Colors'
import useColorScheme from 'hooks/useColorScheme'
import ModalScreen from 'screens/ModalScreen'
import NotFoundScreen from 'screens/NotFoundScreen'
import TabOneScreen from 'screens/Home'
import TabTwoScreen from 'screens/Setting'
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from 'types'
import Start from 'screens/Start'
import Restore from 'screens/Restore'
import Transfer from 'screens/Transfer'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Screen
        name="Transfer"
        component={Transfer}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <Stack.Screen
          name="Start"
          component={Start}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Restore"
          component={Restore}
          options={{ header: () => null }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  const colorScheme = useColorScheme()

  const tabBarLabelStyle = {
    lineHeight: 12,
    position: 'relative',
    top: -4,
  } as StyleProp<TextStyle>

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          tabBarIcon: ({ color }) => (
            <HomeAlt width={30} height={30} color={color} />
          ),
          headerShown: false,
          title: I18n.t('Home'),
          tabBarLabelStyle,
        })}
      />
      <BottomTab.Screen
        name="Setting"
        component={TabTwoScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Settings width={30} height={30} color={color} />
          ),
          headerShown: false,
          title: I18n.t('Setting'),
          tabBarLabelStyle,
        }}
      />
    </BottomTab.Navigator>
  )
}
