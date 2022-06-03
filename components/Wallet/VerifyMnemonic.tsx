import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, TextInput } from 'react-native'
import Colors from 'theme/Colors'
import useColorScheme from 'hooks/useColorScheme'
import Fonts from 'theme/Fonts'
import Button from 'components/common/Button'
import { View } from 'components/Themed'
import { ButtonType } from 'types'
import I18n from 'i18n-js'
import _ from 'lodash'
import Heading from 'components/common/Heading'
import Box from 'components/common/Box'

export default function VerifyMnemonic({
  mnemonic,
  onNext,
  onBack,
}: {
  mnemonic: string
  onNext: () => void
  onBack: () => void
}) {
  const [word, setWord] = useState('')
  const [wordIndex, setWordIndex] = useState(1)
  const [inputFocus, setInputFocus] = useState(false)
  const theme = useColorScheme()

  const words = mnemonic.split(' ')

  useEffect(() => {
    const nth = Math.ceil(Math.random() * 100) % words.length
    setWordIndex(nth + 1)
    // setWord(words[nth])
  }, [])

  const isValid = words[wordIndex - 1] === word

  return (
    <ScrollView style={styles.container}>
      <Box direction="column">
        <Heading>(2/3)</Heading>
        <Heading>{I18n.t('Verify Mnemonic')}</Heading>
      </Box>

      <View style={styles.mnemonicWrap}>
        <TextInput
          style={[
            styles.input,
            {
              color: Colors[theme].text,
              borderBottomColor: inputFocus
                ? Colors[theme].text
                : Colors[theme].borderColor,
            },
          ]}
          value={word}
          onChangeText={(text) => setWord(text)}
          placeholder={`Enter the #${wordIndex} word`}
          autoCapitalize="none"
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
        />
      </View>

      <Box style={{ marginTop: 20 }} justify="space-around">
        <Button
          label={I18n.t('Back')}
          type={ButtonType.DEFAULT}
          style={{ marginHorizontal: 0, width: 160 }}
          onPress={onBack}
        />
        <Button
          label={I18n.t('Next')}
          type={ButtonType.PRIMARY}
          style={{ marginHorizontal: 0, width: 160 }}
          onPress={onNext}
          disabled={!isValid}
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
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 50,
    marginBottom: 0,
    fontFamily: Fonts.heading,
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  radioText: {
    fontSize: 20,
    fontFamily: Fonts.variable,
    marginLeft: 8,
  },
  mnemonicWrap: {
    marginTop: 30,
  },
  input: {
    borderBottomWidth: 1,
    fontSize: 24,
    fontFamily: Fonts.variable,
    padding: 8,
    textAlign: 'center',
  },
})
