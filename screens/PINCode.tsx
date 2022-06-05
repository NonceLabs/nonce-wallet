import { useRoute } from '@react-navigation/native'
import Box from 'components/common/Box'
import SheetHeader from 'components/common/SheetHeader'
import { Text, View } from 'components/Themed'
import useColorScheme from 'hooks/useColorScheme'
import I18n from 'i18n-js'
import _ from 'lodash'
import { useRef, useState } from 'react'
import { TextInput, StyleSheet, Pressable } from 'react-native'
import { useAppSelector } from 'store/hooks'
import Colors from 'theme/Colors'
import Styles from 'theme/Styles'

export default function PINCode() {
  const _pincode = useAppSelector((state) => state.setting.pincode)
  const [pinCode, setPINCode] = useState('')
  const inputRef = useRef<TextInput>(null)
  const theme = useColorScheme()

  const { params } = useRoute()
  const onConfirmed = (params as any)?.onConfirmed as () => void

  return (
    <View style={{ flex: 1 }}>
      <SheetHeader title={I18n.t('Confirm PIN Code')} />
      <View style={[Styles.page, Styles.center, { paddingBottom: 300 }]}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          secureTextEntry
          value={pinCode}
          keyboardType="number-pad"
          autoFocus
          maxLength={6}
          onChangeText={(text) => {
            setPINCode(text)
            if (text.length === 6 && _pincode === text) {
              setTimeout(() => {
                onConfirmed()
              }, 100)
            }
          }}
          selectionColor="transparent"
        />

        <Pressable onPress={() => inputRef?.current?.focus()}>
          <Box justify="space-around" full style={{ paddingHorizontal: 50 }}>
            {_.fill(Array(6), 0).map((_, i) => {
              const isActive = i < pinCode.length
              return (
                <View
                  key={i}
                  style={[
                    styles.pin,
                    {
                      borderColor: Colors[theme].text,
                    },
                    isActive && { backgroundColor: Colors[theme].text },
                  ]}
                />
              )
            })}
          </Box>
        </Pressable>

        <Text style={styles.match}>
          {pinCode.length === 6 && _pincode !== pinCode
            ? I18n.t('PIN code does not match')
            : ''}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
  },
  input: {
    color: 'transparent',
  },
  tip: {
    fontSize: 16,
    textAlign: 'center',
  },
  pin: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 10,
  },
  match: {
    color: Colors.red,
    fontSize: 14,
    marginTop: 30,
  },
})
