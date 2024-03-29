import * as bip39 from 'bip39'
import Box from 'components/common/Box'
import Button from 'components/common/Button'
import Heading from 'components/common/Heading'
import useColorScheme from 'hooks/useColorScheme'
import I18n from 'i18n-js'
import { useState } from 'react'
import { ScrollView, TextInput, StyleSheet, Pressable } from 'react-native'
import Colors from 'theme/Colors'
import Fonts from 'theme/Fonts'
import Styles from 'theme/Styles'
import { parseMnemonic, parsePrivateKey } from 'chain/crypto'
import { KeyStoreFile } from 'types'
import Toast from 'utils/toast'
import { Text } from 'components/Themed'
import Radio from 'components/common/Radio'

export default function RestoreForm({
  onNext,
}: {
  onNext: (keyFile: KeyStoreFile) => void
}) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [value, setValue] = useState('')

  const theme = useColorScheme()

  return (
    <ScrollView style={Styles.page}>
      <Box direction="column" style={{ marginBottom: 30 }}>
        <Heading>(1/2)</Heading>
        <Heading>{I18n.t('Restore')}</Heading>
      </Box>

      <Box direction="column" gap="medium" style={{ marginTop: 20 }}>
        <TextInput
          multiline
          autoCapitalize="none"
          numberOfLines={5}
          style={[styles.textarea, { color: Colors[theme].text }]}
          value={value}
          onChangeText={(text: string) => setValue(text)}
        />

        <Box direction="column" align="flex-start" full gap="small">
          {[I18n.t('Mnemonic'), I18n.t('Private Key')].map((t, idx) => {
            return (
              <Pressable key={t} onPress={() => setSelectedIndex(idx)}>
                <Box gap="small">
                  <Radio checked={selectedIndex === idx} />
                  <Text style={styles.title}>{t}</Text>
                </Box>
              </Pressable>
            )
          })}
        </Box>

        <Button
          label={I18n.t('Confirm')}
          primary
          disabled={!value.trim()}
          onPress={async () => {
            try {
              let _keyfile = null
              if (selectedIndex === 0) {
                if (!bip39.validateMnemonic(value)) {
                  throw new Error(I18n.t('Invalid mnemonic'))
                }
                _keyfile = await parseMnemonic(value)
              } else {
                _keyfile = await parsePrivateKey(value)
              }
              if (!_keyfile) {
                throw new Error(
                  I18n.t(
                    `Invalid ${
                      selectedIndex === 0 ? 'mnemonic' : 'private key'
                    }`
                  )
                )
              }
              onNext(_keyfile)
            } catch (error) {
              Toast.error(error)
            }
          }}
        />
      </Box>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  textarea: {
    width: '100%',
    height: 140,
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: 4,
    padding: 10,
    fontSize: 20,
    fontFamily: Fonts.variable,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.heading,
  },
})
