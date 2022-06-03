import { useRoute } from '@react-navigation/native'
import * as ClipBoard from 'expo-clipboard'
import WalletAPI from 'chain/WalletAPI'
import Button from 'components/common/Button'
import ScreenHeader from 'components/common/ScreenHeader'
import { Text, View } from 'components/Themed'
import useColorScheme from 'hooks/useColorScheme'
import I18n from 'i18n-js'
import { useEffect, useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Colors from 'theme/Colors'
import Fonts from 'theme/Fonts'
import Styles from 'theme/Styles'
import { Wallet, KeyStoreFile } from 'types'
import Toast from 'utils/toast'
import Box from 'components/common/Box'
import { Copy } from 'iconoir-react-native'

export default function PrivateKey() {
  const { params } = useRoute()
  const wallet = (params as any)?.wallet as Wallet
  const [keyStore, setKeyStore] = useState<KeyStoreFile>('')
  const theme = useColorScheme()

  useEffect(() => {
    async function getPrivateKey() {
      try {
        const result = await WalletAPI.getKey(wallet.chain, wallet.publicKey)
        if (result?.privateKey) {
          setKeyStore(result)
        }
      } catch (error) {
        Toast.error(error)
      }
    }

    getPrivateKey()
  }, [wallet])

  const copy = <Copy width={24} height={24} color={Colors[theme].link} />

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title="Export Wallet" />
      <View style={Styles.page}>
        <Box align="center" justify="space-between" margin="small">
          <Text style={styles.title}>{I18n.t('Public Key')}</Text>
          <Pressable
            onPress={async () => {
              await ClipBoard.setStringAsync(wallet.publicKey)
              Toast.success(I18n.t('Copied'))
            }}
          >
            {copy}
          </Pressable>
        </Box>
        <View
          style={[
            Styles.card,
            { backgroundColor: Colors[theme].cardBackground, marginBottom: 20 },
          ]}
        >
          <Text style={styles.priv}>{keyStore?.publicKey}</Text>
        </View>

        {!!keyStore?.mnemonic && (
          <Box direction="column" full align="flex-start">
            <Box align="center" justify="space-between" margin="small" full>
              <Text style={styles.title}>{I18n.t('Mnemonic')}</Text>
              <Pressable
                onPress={async () => {
                  await ClipBoard.setStringAsync(keyStore?.publicKey)
                  Toast.success(I18n.t('Copied'))
                }}
              >
                {copy}
              </Pressable>
            </Box>
            <View
              style={[
                Styles.card,
                {
                  backgroundColor: Colors[theme].cardBackground,
                  marginBottom: 20,
                  width: '100%',
                },
              ]}
            >
              <Text style={styles.priv}>{keyStore?.mnemonic}</Text>
            </View>
          </Box>
        )}

        <Box align="center" justify="space-between" margin="small">
          <Text style={styles.title}>{I18n.t('Private Key')}</Text>
          <Pressable
            onPress={async () => {
              await ClipBoard.setStringAsync(keyStore?.privateKey)
              Toast.success(I18n.t('Copied'))
            }}
          >
            {copy}
          </Pressable>
        </Box>
        <View
          style={[
            Styles.card,
            { backgroundColor: Colors[theme].cardBackground, marginBottom: 20 },
          ]}
        >
          <Text style={styles.priv}>{keyStore?.privateKey}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  priv: {
    fontSize: 16,
    fontFamily: Fonts.variable,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.heading,
  },
})
