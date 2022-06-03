import { useNavigation, useRoute } from '@react-navigation/native'
import Box from 'components/common/Box'
import Heading from 'components/common/Heading'
import ScreenHeader from 'components/common/ScreenHeader'
import { Text, View } from 'components/Themed'
import useColorScheme from 'hooks/useColorScheme'
import I18n from 'i18n-js'
import { KeyAltPlus, Wallet } from 'iconoir-react-native'
import { useEffect } from 'react'
import { Image, Pressable, StyleSheet, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAppSelector } from 'store/hooks'
import Colors from 'theme/Colors'
import Styles, { ICON_WRAP_SIZE } from 'theme/Styles'
import icons from 'utils/icons'

export default function Start() {
  const insets = useSafeAreaInsets()
  const theme = useColorScheme()
  const { width } = useWindowDimensions()
  const navigation = useNavigation()

  const { params } = useRoute()
  const isNew = (params as any).new as boolean

  const wallet = useAppSelector((state) => state.wallet.current)

  useEffect(() => {
    if (isNew && wallet) {
      navigation.goBack()
    }
  }, [wallet])

  return (
    <View style={{ flex: 1, paddingTop: isNew ? insets.top : 0 }}>
      {!isNew && <ScreenHeader title="Back" />}
      <View style={{ flex: 1, padding: 20 }}>
        <Heading>{I18n.t('Welcome to')}</Heading>
        <Heading>Nonce Wallet</Heading>

        <Box
          direction="column"
          align="flex-start"
          justify="flex-start"
          gap="medium"
          style={{ flex: 1, paddingTop: 50 }}
        >
          <Image source={icons.MINA_CUBES} style={styles.cubes} />

          <Box
            justify="space-between"
            align="flex-end"
            style={{ backgroundColor: '#ff603b' }}
            pad="medium"
            full
          >
            <Heading level={2} style={{ color: Colors.white, lineHeight: 38 }}>
              MINA
            </Heading>

            <Box gap="small" align="flex-end" justify="flex-end">
              <Text
                style={{ lineHeight: 34, fontSize: 20, color: Colors.white }}
              >
                FIXED SIZE
              </Text>
              <Box align="flex-start">
                <Heading style={{ color: Colors.white }}>22</Heading>
                <Text style={{ color: Colors.white }}>KB</Text>
              </Box>
            </Box>
          </Box>

          <Box
            direction="column"
            align="flex-start"
            gap="small"
            border
            style={{ width: '100%', marginTop: 50, borderRadius: 4 }}
          >
            <Box gap="medium" pad="medium">
              <View
                style={[
                  Styles.iconWrap,
                  { backgroundColor: Colors[theme].borderColor },
                ]}
              >
                <Wallet
                  width={ICON_WRAP_SIZE * 0.6}
                  height={ICON_WRAP_SIZE * 0.6}
                />
              </View>
              <View>
                <Pressable onPress={() => navigation.navigate('Create')}>
                  <Heading level={3} style={{ color: Colors[theme].link }}>
                    {I18n.t('Create')}
                  </Heading>
                </Pressable>
                <Text style={styles.subtitle}>
                  {I18n.t('I am new to crypto world')}
                </Text>
              </View>
            </Box>

            <View
              style={{
                height: 1, //StyleSheet.hairlineWidth,
                width: width - 40,
                backgroundColor: Colors[theme].borderColor,
              }}
            />

            <Box gap="medium" pad="medium">
              <View
                style={[
                  Styles.iconWrap,
                  { backgroundColor: Colors[theme].borderColor },
                ]}
              >
                <KeyAltPlus
                  width={ICON_WRAP_SIZE * 0.6}
                  height={ICON_WRAP_SIZE * 0.6}
                />
              </View>
              <View>
                <Pressable onPress={() => navigation.navigate('Restore')}>
                  <Heading level={3} style={{ color: Colors[theme].link }}>
                    {I18n.t('Restore')}
                  </Heading>
                </Pressable>
                <Text style={styles.subtitle}>
                  {I18n.t('Have mnemonic or private keys?')}
                </Text>
              </View>
            </Box>
          </Box>
        </Box>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  subtitle: {
    color: Colors.gray,
  },
  cubes: {
    width: '100%',
    height: 200,
  },
})
