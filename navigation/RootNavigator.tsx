import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  HomeAlt,
  Settings,
  Svg3DSelectFace,
  Svg3DSelectSolid,
  Tunnel,
} from 'iconoir-react-native'
import I18n from 'i18n-js'
import { StyleProp, TextStyle } from 'react-native'

import Colors from 'theme/Colors'
import useColorScheme from 'hooks/useColorScheme'
import ModalScreen from 'screens/ModalScreen'
import NotFoundScreen from 'screens/NotFoundScreen'
import Setting from 'screens/Setting'
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from 'types'
import Start from 'screens/Start'
import Restore from 'screens/Restore'
import Transfer from 'screens/Transfer'
import Staking from 'screens/Staking'
import Home from 'screens/Home'
import TokenScreen from 'screens/Token'
import Create from 'screens/Create'
import Security from 'screens/Security'
import About from 'screens/About'
import WalletsManage from 'screens/WalletsManage'
import WalletDetail from 'screens/WalletDetail'
import ContactsManage from 'screens/ContactsManage'
import ContactNew from 'screens/ContactNew'
import PINCode from 'screens/PINCode'
import PrivateKey from 'screens/PrivateKey'
import TxDetail from 'screens/TxDetail'
import Validators from 'screens/Validators'

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
        name="Token"
        component={TokenScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Security"
        component={Security}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Transfer"
        component={Transfer}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="WalletsManage"
        component={WalletsManage}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="WalletDetail"
        component={WalletDetail}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="ContactsManage"
        component={ContactsManage}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="ContactNew"
        component={ContactNew}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="PrivateKey"
        component={PrivateKey}
        options={{ header: () => null }}
      />
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
      <Stack.Screen
        name="Create"
        component={Create}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="TxDetail"
        component={TxDetail}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Validators"
        component={Validators}
        options={{ header: () => null }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen
          name="PINCode"
          component={PINCode}
          options={{ header: () => null }}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{ presentation: 'fullScreenModal' }}
      ></Stack.Group>
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
        component={Home}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          tabBarIcon: ({ color }) => (
            <HomeAlt width={30} height={30} color={color} />
          ),
          headerShown: false,
          title: I18n.t('Asset'),
          tabBarLabelStyle,
        })}
      />
      <BottomTab.Screen
        name="Staking"
        component={Staking}
        options={({ navigation }: RootTabScreenProps<'Staking'>) => ({
          tabBarIcon: ({ color }) => (
            <Svg3DSelectFace width={30} height={30} color={color} />
          ),
          headerShown: false,
          title: I18n.t('Staking'),
          tabBarLabelStyle,
        })}
      />
      <BottomTab.Screen
        name="Setting"
        component={Setting}
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
