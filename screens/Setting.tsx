import I18n from 'i18n-js'
import {
  Discord,
  GitHub,
  Globe,
  HistoricShieldAlt,
  Network,
  Translate,
  Twitter,
  Wallet,
} from 'iconoir-react-native'
import { useRef } from 'react'
import { StyleSheet, ScrollView, Linking } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import ScreenHeader from 'components/common/ScreenHeader'
import LanguageModal from 'components/Setting/LanguageModal'
import SettingBlock from 'components/Setting/SettingBlock'
import ThemeModal from 'components/Setting/ThemeModal'
import { View } from 'components/Themed'
import Colors from 'theme/Colors'
import useColorScheme from 'hooks/useColorScheme'
import { useAppSelector } from 'store/hooks'
import Fonts from 'theme/Fonts'
import { capitalizeFirstLetter, formatAccountId } from 'utils/format'
import { useNavigation } from '@react-navigation/native'

export default function SettingScreen() {
  const languageRef = useRef<Modalize>(null)
  const themeRef = useRef<Modalize>(null)

  const themeSetting = useAppSelector((state) => state.setting.theme)
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
              onPress: () => {
                // navigation.navigate('AccountListScreen')
              },
            },
            {
              icon: HistoricShieldAlt,
              title: 'Security',
              value: '',
              onPress: () => {},
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
              icon: Globe,
              title: 'Theme',
              value: I18n.t(capitalizeFirstLetter(themeSetting)),
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
