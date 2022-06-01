import Box from 'components/common/Box'
import Button from 'components/common/Button'
import Heading from 'components/common/Heading'
import { Text } from 'components/Themed'
import I18n from 'i18n-js'
import { useState } from 'react'
import { ScrollView, TextInput, StyleSheet } from 'react-native'
import { useAppDispatch } from 'store/hooks'
import Colors from 'theme/Colors'

export default function SetupPswd({ onNext }: { onNext: () => void }) {
  const [pswd, setPswd] = useState('zxasqw12')
  const [repeatPswd, setRepeatPswd] = useState('zxasqw12')

  const isValid = pswd === repeatPswd && pswd.length >= 6
  const dispatch = useAppDispatch()

  return (
    <ScrollView style={styles.container}>
      <Heading>(3/3)</Heading>
      <Heading>{I18n.t('Setup Password')}</Heading>

      <Box
        direction="column"
        gap="medium"
        align="flex-start"
        style={{ marginTop: 40 }}
      >
        <Box direction="column" gap="small" full align="flex-start">
          <Text style={styles.label}>{I18n.t('Password')}</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={pswd}
            onChangeText={(text) => setPswd(text)}
          />
        </Box>
        <Box direction="column" gap="small" full align="flex-start">
          <Text style={styles.label}>{I18n.t('Repeat Password')}</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={repeatPswd}
            onChangeText={(text) => setRepeatPswd(text)}
          />
        </Box>
        <Text style={styles.tip}>
          {I18n.t('Password length must be equal or more than 6 characters')}
        </Text>
        <Button
          label={I18n.t('Confirm')}
          disabled={!isValid}
          primary
          onPress={() => {
            dispatch({
              type: 'setting/setupPswd',
              payload: pswd,
            })
            onNext()
          }}
        />
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
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.gray9,
    fontSize: 20,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  tip: {
    fontSize: 14,
    color: Colors.gray9,
  },
})
