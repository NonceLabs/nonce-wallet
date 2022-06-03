import Box from 'components/common/Box'
import Button from 'components/common/Button'
import Icon from 'components/common/Icon'
import ScreenHeader from 'components/common/ScreenHeader'
import { View } from 'components/Themed'
import useColorScheme from 'hooks/useColorScheme'
import I18n from 'i18n-js'
import { Scanning } from 'iconoir-react-native'
import { useState } from 'react'
import { Pressable, StyleSheet, TextInput } from 'react-native'
import Colors from 'theme/Colors'
import Styles from 'theme/Styles'

export default function ContactNew() {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')

  const [nameFocus, setNameFocus] = useState(false)
  const [addressFocus, setAddressFocus] = useState(false)

  const theme = useColorScheme()

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title="New Contact" />

      <View style={Styles.page}>
        <Box direction="column" gap="xlarge" full>
          <Box
            full
            style={{
              borderBottomWidth: 1,
              borderBottomColor: nameFocus
                ? Colors[theme].text
                : Colors[theme].borderColor,
            }}
          >
            <TextInput
              placeholder={I18n.t('Name')}
              style={styles.input}
              value={name}
              onChangeText={(_text) => setName(_text)}
              onFocus={() => setNameFocus(true)}
              onBlur={() => setNameFocus(false)}
              placeholderTextColor={Colors.gray9}
            />
          </Box>
          <Box
            full
            align="center"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: addressFocus
                ? Colors[theme].text
                : Colors[theme].borderColor,
            }}
          >
            <TextInput
              placeholder={I18n.t('Wallet Address')}
              autoCapitalize="none"
              style={[styles.input]}
              value={address}
              onChangeText={(_text) => setAddress(_text)}
              onFocus={() => setAddressFocus(true)}
              onBlur={() => setAddressFocus(false)}
              placeholderTextColor={Colors.gray9}
            />
            <Pressable>
              <Scanning width={20} height={20} color={Colors[theme].link} />
            </Pressable>
          </Box>

          <Button label={I18n.t('Confirm')} primary onPress={() => {}} />
        </Box>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    padding: 8,
    flex: 1,
  },
  wrap: {
    borderBottomWidth: 1,
  },
})
