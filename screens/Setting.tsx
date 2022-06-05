import I18n from 'i18n-js'
import {
  Discord,
  GitHub,
  Globe,
  HistoricShieldAlt,
  LotOfCash,
  Translate,
  Tunnel,
  Twitter,
  UserCircleAlt,
  Wallet,
} from 'iconoir-react-native'
import { useRef, useState } from 'react'
import { StyleSheet, ScrollView, Linking, Image, Pressable } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import ScreenHeader from 'components/common/ScreenHeader'
import LanguageModal from 'components/Setting/LanguageModal'
import SettingBlock from 'components/Setting/SettingBlock'
import ThemeModal from 'components/Setting/ThemeModal'
import { Text, View } from 'components/Themed'
import Colors from 'theme/Colors'
import useColorScheme from 'hooks/useColorScheme'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import Fonts from 'theme/Fonts'
import { capitalizeFirstLetter } from 'utils/format'
import { useNavigation } from '@react-navigation/native'
import Box from 'components/common/Box'
import icons from 'utils/icons'
import CurrencyModal from 'components/Modals/CurrencyModal'
import Toast from 'utils/toast'

export default function SettingScreen() {
  const languageRef = useRef<Modalize>(null)
  const themeRef = useRef<Modalize>(null)
  const currencyRef = useRef<Modalize>(null)
  const [clickCount, setClickCount] = useState(0)
  const isDevMode = useAppSelector((state) => state.setting.isDevMode)

  const { theme: _theme, currentCurrency } = useAppSelector(
    (state) => state.setting
  )

  const navigation = useNavigation()
  const theme = useColorScheme()
  const dispatch = useAppDispatch()

  return (
    <View style={{ flex: 1, backgroundColor: Colors[theme].screenBackground }}>
      <ScreenHeader title="Setting" isBackable={false} />
      <ScrollView
        style={[styles.container]}
        contentContainerStyle={styles.contentContainer}
      >
        <SettingBlock
          title="Wallet"
          items={[
            {
              icon: Wallet,
              title: 'Wallets',
              value: '',
              onPress: () => {
                navigation.navigate('WalletsManage')
              },
            },
            {
              icon: HistoricShieldAlt,
              title: 'Security',
              value: '',
              onPress: () => {
                navigation.navigate('Security')
              },
            },
            {
              icon: UserCircleAlt,
              title: 'Contacts',
              value: '',
              onPress: () => {
                navigation.navigate('ContactsManage')
              },
            },
          ]}
        />

        <SettingBlock
          title="Display"
          items={[
            {
              icon: Translate,
              title: 'Language',
              value: I18n.t(I18n.locale),
              onPress: () => languageRef.current?.open(),
            },
            {
              icon: LotOfCash,
              title: 'Currency',
              value: I18n.t(currentCurrency),
              onPress: () => currencyRef.current?.open(),
            },
            {
              icon: Globe,
              title: 'Theme',
              value: I18n.t(capitalizeFirstLetter(_theme)),
              onPress: () => themeRef.current?.open(),
            },
          ]}
        />

        <SettingBlock
          title="Community"
          items={[
            {
              icon: Twitter,
              title: 'Twitter',
              value: '',
              onPress: () => Linking.openURL('#'),
            },
            {
              icon: Discord,
              title: 'Discord',
              value: '',
              onPress: () => Linking.openURL('#'),
            },
            {
              icon: GitHub,
              title: 'Github',
              value: '',
              onPress: () => Linking.openURL('https://github.com/noncelabs'),
            },
          ]}
        />

        <SettingBlock
          title="About"
          items={[
            {
              icon: Tunnel,
              title: 'Nonce',
              value: '',
              onPress: () => navigation.navigate('About'),
            },
          ]}
        />

        <Box align="center" justify="center" pad="large">
          <Pressable
            onPress={() => {
              if (clickCount < 7) {
                setClickCount(clickCount + 1)
              }
              if (clickCount === 7) {
                Toast.success(
                  I18n.t(!isDevMode ? 'Dev mode enabled' : 'Dev mode disabled')
                )
                setClickCount(0)
                dispatch({
                  type: 'setting/updateDevMode',
                  payload: !isDevMode,
                })
              }
            }}
          >
            <Image source={icons.LOGO} style={styles.logo} />
          </Pressable>
        </Box>
      </ScrollView>
      <Portal>
        <Modalize ref={languageRef} adjustToContentHeight>
          <LanguageModal
            onClose={() => {
              setClickCount(1)
              languageRef.current?.close()
              navigation.goBack()
            }}
          />
        </Modalize>
        <Modalize ref={themeRef} adjustToContentHeight>
          <ThemeModal onClose={() => themeRef.current?.close()} />
        </Modalize>
        <Modalize ref={currencyRef} adjustToContentHeight>
          <CurrencyModal onClose={() => currencyRef.current?.close()} />
        </Modalize>
      </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 50,
  },
  head: {
    fontSize: 40,
    fontFamily: Fonts.heading,
    marginBottom: 0,
  },
  blockTitle: {
    fontSize: 18,
    fontFamily: Fonts.heading,
    lineHeight: 30,
    color: Colors.gray9,
    marginBottom: 4,
    marginLeft: 10,
  },
  blockWrap: {
    borderRadius: 4,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 30,
  },
  logo: {
    width: 70,
    height: 70,
  },
})
