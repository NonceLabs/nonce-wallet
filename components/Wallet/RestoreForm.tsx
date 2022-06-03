import SegmentedControl from '@react-native-segmented-control/segmented-control'
import Box from 'components/common/Box'
import Button from 'components/common/Button'
import Heading from 'components/common/Heading'
import useColorScheme from 'hooks/useColorScheme'
import I18n from 'i18n-js'
import { useState } from 'react'
import { ScrollView, TextInput, StyleSheet } from 'react-native'
import Colors from 'theme/Colors'
import Fonts from 'theme/Fonts'
import Styles from 'theme/Styles'
import { parseMnemonic } from 'chain/crypto'
import { KeyStoreFile } from 'types'

export default function RestoreForm({
  onNext,
}: {
  onNext: (keyFile: KeyStoreFile) => void
}) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [value, setValue] = useState(
    'glare hunt strike analyst differ slam powder okay love width fat pig'
  )

  const theme = useColorScheme()

  return (
    <ScrollView style={Styles.page}>
      <Box direction="column" style={{ marginBottom: 30 }}>
        <Heading>(1/2)</Heading>
        <Heading>{I18n.t('Restore')}</Heading>
      </Box>
      <SegmentedControl
        values={[I18n.t('Seed Phrase'), I18n.t('Private Key')]}
        selectedIndex={selectedIndex}
        onChange={(event) => {
          setSelectedIndex(event.nativeEvent.selectedSegmentIndex)
        }}
        tintColor={theme === 'dark' ? Colors.white : undefined}
      />
      <Box direction="column" gap="medium" style={{ marginTop: 20 }}>
        <TextInput
          multiline
          autoCapitalize="none"
          numberOfLines={5}
          style={[styles.textarea, { color: Colors[theme].text }]}
          value={value}
          onChangeText={(text: string) => setValue(text)}
        />

        <Button
          label={I18n.t('Confirm')}
          primary
          onPress={async () => {
            try {
              const result = await parseMnemonic(value)
              onNext(result)
            } catch (error) {}
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
})
