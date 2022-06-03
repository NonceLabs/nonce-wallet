import Box from 'components/common/Box'
import Heading from 'components/common/Heading'
import { Text, View } from 'components/Themed'
import useColorScheme from 'hooks/useColorScheme'
import I18n from 'i18n-js'
import _ from 'lodash'
import { useRef, useState } from 'react'
import { ScrollView, TextInput, StyleSheet, Pressable } from 'react-native'
import { useAppDispatch } from 'store/hooks'
import Colors from 'theme/Colors'

export default function SetupPIN({
  onNext,
  type = 'create',
}: {
  onNext: () => void
  type?: 'create' | 'restore'
}) {
  const [pswd, setPswd] = useState('')
  const [repeatPswd, setRepeatPswd] = useState('')
  const [isConfirming, setIsConfirming] = useState(false)
  const inputRef = useRef<TextInput>(null)

  const dispatch = useAppDispatch()
  const theme = useColorScheme()

  const onConfirmed = async () => {
    dispatch({
      type: 'setting/setupPINCode',
      payload: pswd,
    })
    onNext()
  }

  return (
    <ScrollView style={styles.container}>
      <Box direction="column">
        <Heading>({type === 'create' ? '3/3' : '2/2'})</Heading>
        <Heading>{I18n.t('Setup PIN Code')}</Heading>
      </Box>

      <Box
        direction="column"
        gap="medium"
        // align="flex-start"
        style={{ marginTop: 40 }}
      >
        <TextInput
          ref={inputRef}
          style={styles.input}
          secureTextEntry
          value={isConfirming ? repeatPswd : pswd}
          keyboardType="number-pad"
          autoFocus
          maxLength={6}
          onChangeText={(text) => {
            if (!isConfirming) {
              setPswd(text)
              if (text.length === 6) {
                setIsConfirming(true)
              }
            } else {
              setRepeatPswd(text)
              if (text.length === 6) {
                if (text === pswd) {
                  onConfirmed()
                }
              }
            }
          }}
          selectionColor="transparent"
        />

        <Text style={styles.tip}>
          {isConfirming ? I18n.t('Confirm PIN Code') : ''}
        </Text>

        <Pressable onPress={() => inputRef?.current?.focus()}>
          <Box justify="space-around" full style={{ paddingHorizontal: 50 }}>
            {_.fill(Array(6), 0).map((_, i) => {
              const isActive = i < (isConfirming ? repeatPswd : pswd).length
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
          {repeatPswd.length === 6 && repeatPswd !== pswd
            ? I18n.t('PIN code does not match')
            : ''}
        </Text>
      </Box>
    </ScrollView>
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
  },
})
