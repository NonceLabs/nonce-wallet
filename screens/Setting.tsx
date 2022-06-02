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
  Wallet,
} from 'iconoir-react-native'
import { useRef } from 'react'
import { StyleSheet, ScrollView, Linking, Image } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import ScreenHeader from 'components/common/ScreenHeader'
import LanguageModal from 'components/Setting/LanguageModal'
import SettingBlock from 'components/Setting/SettingBlock'
import ThemeModal from 'components/Setting/ThemeModal'
import { Text, View } from 'components/Themed'
import Colors from 'theme/Colors'
import useColorScheme from 'hooks/useColorScheme'
import { useAppSelector } from 'store/hooks'
import Fonts from 'theme/Fonts'
import { capitalizeFirstLetter } from 'utils/format'
import { useNavigation } from '@react-navigation/native'
import Box from 'components/common/Box'
import icons from 'utils/icons'
import CurrencyModal from 'components/Modals/CurrencyModal'

export default function SettingScreen() {
  const languageRef = useRef<Modalize>(null)
  const themeRef = useRef<Modalize>(null)
  const currencyRef = useRef<Modalize>(null)

  const { theme: _theme, currentCurrency } = useAppSelector(
    (state) => state.setting
  )
  const account = useAppSelector((state) => state.account.current)

  const navigation = useNavigation()
  const theme = useColorScheme()

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
              title: 'Account',
              value: '',
              onPress: () => {},
            },
            {
              icon: HistoricShieldAlt,
              title: 'Security',
              value: '',
              onPress: () => {
                navigation.navigate('Security')
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
              value: currentCurrency,
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
              onPress: () => Linking.openURL('#'),
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
          <Image source={icons.LOGO} style={styles.logo} />
          <Text></Text>
        </Box>
      </ScrollView>
      <Portal>
        <Modalize ref={languageRef} adjustToContentHeight>
          <LanguageModal
            onClose={() => {
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
