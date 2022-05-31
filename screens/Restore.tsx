import SegmentedControl from '@react-native-segmented-control/segmented-control'
import Button from 'components/common/Button'
import ScreenHeader from 'components/common/ScreenHeader'
import { View } from 'components/Themed'
import useColorScheme from 'hooks/useColorScheme'
import I18n from 'i18n-js'
import { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import Colors from 'theme/Colors'
import Fonts from 'theme/Fonts'
import Styles from 'theme/Styles'

export default function Restore() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [value, setValue] = useState('')

  const theme = useColorScheme()

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title={I18n.t('Restore')} />
      <View style={Styles.page}>
        <SegmentedControl
          values={[I18n.t('Seed Phrase'), I18n.t('Private Key')]}
          selectedIndex={selectedIndex}
          onChange={(event) => {
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex)
          }}
        />

        <TextInput
          multiline
          autoCapitalize="none"
          numberOfLines={5}
          style={[styles.textarea, { color: Colors[theme].text }]}
          value={value}
          onChangeText={(text: string) => setValue(text)}
        />

        <Button label={I18n.t('Confirm')} primary onPress={() => {}} />
      </View>
    </View>
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
    marginVertical: 20,
    fontFamily: Fonts.variable,
  },
})
