import { StackActions, useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import Colors from 'theme/Colors'
import useColorScheme from 'hooks/useColorScheme'
import { useAppDispatch } from 'store/hooks'
import Fonts from 'theme/Fonts'
import Button from 'components/common/Button'
import { Text, View } from 'components/Themed'
import { ButtonType, NetworkType } from 'types'
import { toast } from 'utils/toast'
import I18n from 'i18n-js'
import _ from 'lodash'
import { WarningTriangleOutline } from 'iconoir-react-native'
import Heading from 'components/common/Heading'
import { generateMnemonic, parseMnemonic } from 'utils/crypto'

export default function GenMnemonic() {
  const [modalVisible, setModalVisible] = useState(false)
  const [mnemonic, setMnemonic] = useState('')
  const [confirmTick, setConfirmTick] = useState(1)

  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  const theme = useColorScheme()

  useEffect(() => {
    if (!mnemonic) {
      generateMnemonic()
        .then((result) => {
          setMnemonic(result)
        })
        .catch(console.log)
    } else {
      if (confirmTick > 0) {
        setTimeout(() => {
          setConfirmTick(confirmTick - 1)
        }, 1000)
      }
    }
  }, [mnemonic, confirmTick])

  return (
    <ScrollView style={styles.container}>
      <Heading>(2/3)</Heading>
      <Heading>{I18n.t('Mnemonic')}</Heading>

      <View style={styles.mnemonicWrap}>
        {_.chunk(mnemonic.split(' '), 3).map((words, index) => {
          return (
            <View key={index} style={styles.row}>
              {words.map((word, idx) => {
                return (
                  <View
                    key={`${word}-${idx}`}
                    style={[styles.wordWrap, { borderColor: '#999' }]}
                  >
                    <Text style={[styles.word, { color: Colors[theme].link }]}>
                      {word}
                    </Text>
                  </View>
                )
              })}
            </View>
          )
        })}
      </View>
      <View style={styles.tipWrap}>
        <WarningTriangleOutline width={18} height={18} color="red" />
        <Text style={styles.tip} numberOfLines={2}>
          {I18n.t('Please keep the seed phrase safe')}
        </Text>
      </View>
      <Button
        label={`${I18n.t('Confirm')} ${
          confirmTick > 0 ? `(${confirmTick}s)` : ''
        }`}
        type={ButtonType.PRIMARY}
        disabled={confirmTick > 0}
        style={{ width: '100%', marginTop: 40, marginHorizontal: 0 }}
        onPress={async () => {
          try {
            const result = await parseMnemonic(mnemonic)
            console.log(result)
          } catch (error) {}
        }}
      />
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wordWrap: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 4,
    paddingVertical: 8,
    marginHorizontal: 2,
    marginVertical: 2,
  },
  word: {
    fontFamily: Fonts.variable,
    fontSize: 16,
  },
  accountId: {
    fontSize: 20,
    fontFamily: Fonts.heading,
    textAlign: 'center',
    marginBottom: 30,
  },
  tipWrap: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tip: {
    fontSize: 16,
    marginLeft: 10,
    maxWidth: '100%',
  },
})
