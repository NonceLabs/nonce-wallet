import { useNavigation, useRoute } from '@react-navigation/native'
import { useRef, useState } from 'react'
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import * as Clipboard from 'expo-clipboard'
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { Portal } from 'react-native-portalize'
import {
  NavArrowDown,
  PasteClipboard,
  Scanning,
  ScanQrCode,
} from 'iconoir-react-native'

import Button from 'components/common/Button'
import ScreenHeader from 'components/common/ScreenHeader'
import TokenLogo from 'components/Assets/TokenLogo'
import { Text, View } from 'components/Themed'
import Colors from 'theme/Colors'
import useColorScheme from 'hooks/useColorScheme'
import { useAppSelector } from 'store/hooks'
import { formatBalance } from 'utils/format'
import Fonts from 'theme/Fonts'
import { toast } from 'utils/toast'
import I18n from 'i18n-js'
import { ButtonType, Currency, CurrencyRate, Token } from 'types'
import { CURRENCY_SYMBOL, DEFAULT_CURRENCY_RATE } from 'utils/configure'
import TokenItem from 'components/Assets/TokenItem'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Transfer() {
  const currencyRates: CurrencyRate = useAppSelector(
    (state) => state.setting.currencyRates || DEFAULT_CURRENCY_RATE
  )
  const currency: Currency = useAppSelector(
    (state) => state.setting.currentCurrency || Currency.USD
  )

  const tokens: Token[] = useAppSelector((state) => state.asset.tokens)

  const tokenListRef = useRef<BottomSheet>(null)

  const navigation = useNavigation()
  const { params } = useRoute()
  const _receiver = (params as any)?.receiver || ''
  const _token = (params as any)?.token
  const [receiver, setReceiver] = useState(_receiver)
  const [amount, setAmount] = useState('')
  const [selectedToken, setSelectedToken] = useState(_token || tokens[0])

  const theme = useColorScheme()
  const insets = useSafeAreaInsets()

  const onSelect = (item: Token) => {
    setSelectedToken(item)
    setAmount('')
    tokenListRef.current?.close()
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[theme].screenBackground },
      ]}
    >
      <ScreenHeader title="Transfer" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={[
            styles.formWrap,
            { backgroundColor: Colors[theme].cardBackground },
          ]}
        >
          <View style={[styles.row, { flexDirection: 'column' }]}>
            <View style={[styles.row, styles.rowEnd]}>
              <Scanning
                width={18}
                height={18}
                color={Colors[theme].link}
                onPress={async () => {
                  try {
                  } catch (error) {}
                }}
              />
            </View>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, { color: Colors[theme].text }]}
                value={receiver}
                autoCapitalize="none"
                placeholder={I18n.t('Receiver Address')}
                onChangeText={(text) => setReceiver(text)}
                autoCorrect={false}
                onFocus={() => tokenListRef.current?.close()}
                placeholderTextColor={Colors.gray9}
              />
            </View>
          </View>
          <View
            style={[
              styles.divider,
              {
                backgroundColor: Colors[theme].borderColor,
              },
            ]}
          />
          <View style={[styles.row, { flexDirection: 'column' }]}>
            <View style={[styles.row, styles.rowEnd]}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setAmount(
                    formatBalance(
                      selectedToken.balance,
                      selectedToken.decimals,
                      6
                    )
                  )
                }}
              >
                <Text style={{ color: Colors[theme].link, fontSize: 12 }}>
                  {`${I18n.t('Balance')}: ${formatBalance(
                    selectedToken.balance,
                    selectedToken.decimals
                  )} ${selectedToken.symbol}`}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, { color: Colors[theme].text }]}
                value={amount}
                keyboardType="numeric"
                autoCapitalize="none"
                placeholder={I18n.t('Amount')}
                onChangeText={(text) => setAmount(text)}
                onFocus={() => tokenListRef.current?.close()}
                placeholderTextColor={Colors.gray9}
              />

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  Keyboard.dismiss()
                  tokenListRef.current?.expand()
                }}
              >
                <View style={styles.tokenWrap}>
                  <TokenLogo size={30} token={selectedToken} />
                  <NavArrowDown
                    color={Colors[theme].link}
                    width={28}
                    height={28}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Button
          label={I18n.t('Next')}
          type={ButtonType.PRIMARY}
          onPress={() => {}}
        />
      </ScrollView>

      <Portal>
        <BottomSheet
          ref={tokenListRef}
          index={-1}
          enablePanDownToClose
          keyboardBehavior="fillParent"
          snapPoints={['60%']}
          backgroundStyle={{ backgroundColor: Colors[theme].cardBackground }}
        >
          <BottomSheetFlatList
            data={tokens}
            keyExtractor={(item: Token) => item.symbol}
            renderItem={({ item }) => {
              return (
                <TokenItem
                  item={item}
                  onSelect={onSelect}
                  rate={currencyRates[currency]}
                  unit={CURRENCY_SYMBOL[currency]}
                />
              )
            }}
            contentContainerStyle={{
              paddingBottom: insets.bottom,
            }}
          />
        </BottomSheet>
      </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formWrap: {
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 20,
    fontFamily: Fonts.variable,
  },
  suffix: {
    fontSize: 20,
    fontFamily: Fonts.variable,
    position: 'absolute',
    opacity: 0.7,
  },
  paste: {
    fontSize: 20,
    marginHorizontal: 10,
    fontWeight: 'bold',
    fontFamily: Fonts.heading,
  },
  divider: {
    width: '100%',
    height: 1,
    marginVertical: 15,
  },
  icon: {
    width: 30,
    height: 30,
  },
  tokenWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowEnd: {
    marginBottom: 8,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
  },
})
