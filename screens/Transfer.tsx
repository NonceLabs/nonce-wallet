import { useNavigation, useRoute } from '@react-navigation/native'
import { useRef, useState } from 'react'
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native'
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { Portal } from 'react-native-portalize'
import { NavArrowDown, UserCircleAlt } from 'iconoir-react-native'

import Button from 'components/common/Button'
import ScreenHeader from 'components/common/ScreenHeader'
import TokenLogo from 'components/Assets/TokenLogo'
import { Text, View } from 'components/Themed'
import Colors from 'theme/Colors'
import useColorScheme from 'hooks/useColorScheme'
import { useAppSelector } from 'store/hooks'
import { formatBalance } from 'utils/format'
import Fonts from 'theme/Fonts'
import I18n from 'i18n-js'
import { ButtonType, Contact, Currency, CurrencyRate, Token } from 'types'
import { CURRENCY_SYMBOL, DEFAULT_CURRENCY_RATE } from 'utils/configure'
import TokenItem from 'components/Assets/TokenItem'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Box from 'components/common/Box'
import ContactItem from 'components/Setting/ContactItem'

export default function Transfer() {
  const currencyRates: CurrencyRate = useAppSelector(
    (state) => state.setting.currencyRates || DEFAULT_CURRENCY_RATE
  )
  const currency: Currency = useAppSelector(
    (state) => state.setting.currentCurrency || Currency.USD
  )

  const tokens: Token[] = useAppSelector((state) => state.asset.tokens)
  const contacts = useAppSelector((state) => state.setting.contacts)

  const tokenListRef = useRef<BottomSheet>(null)
  const contactListRef = useRef<BottomSheet>(null)

  const navigation = useNavigation()
  const { params } = useRoute()
  const _receiver = (params as any)?.receiver || ''
  const _token = (params as any)?.token
  const [receiver, setReceiver] = useState(_receiver)
  const [amount, setAmount] = useState('')
  const [selectedToken, setSelectedToken] = useState(_token || tokens[0])
  const [addressFocus, setAddressFocus] = useState(false)
  const [amountFocus, setAmountFocus] = useState(false)

  const theme = useColorScheme()
  const insets = useSafeAreaInsets()

  const onSelect = (item: Token) => {
    setSelectedToken(item)
    setAmount('')
    tokenListRef.current?.close()
  }

  const contact = contacts.find((c) => c.publicKey === receiver)

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
        <Box direction="column" gap="xlarge" full>
          <Box direction="column">
            <Box justify="flex-end" full>
              <Text style={{ color: Colors[theme].link, fontSize: 14 }}>
                {contact?.name}
              </Text>
            </Box>

            <Box
              full
              align="center"
              style={{
                paddingVertical: 4,
                borderBottomWidth: 1,
                borderBottomColor: addressFocus
                  ? Colors[theme].text
                  : Colors[theme].borderColor,
              }}
            >
              <TextInput
                placeholder={I18n.t('Receiver Address')}
                autoCapitalize="none"
                style={[styles.input]}
                value={receiver}
                onChangeText={(_text) => setReceiver(_text)}
                onFocus={() => {
                  tokenListRef.current?.close()
                  contactListRef.current?.close()
                  setAddressFocus(true)
                }}
                onBlur={() => setAddressFocus(false)}
                placeholderTextColor={Colors.gray9}
                numberOfLines={3}
                multiline
              />
              <Pressable
                onPress={() => {
                  Keyboard.dismiss()
                  tokenListRef.current?.close()
                  contactListRef.current?.expand()
                }}
              >
                <UserCircleAlt
                  width={30}
                  height={30}
                  color={Colors[theme].link}
                />
              </Pressable>
            </Box>
          </Box>

          <Box direction="column">
            <Box justify="flex-end" full>
              <Pressable
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
                <Text style={{ color: Colors[theme].link, fontSize: 14 }}>
                  {`${I18n.t('Balance')}: ${formatBalance(
                    selectedToken.balance,
                    selectedToken.decimals
                  )} ${selectedToken.symbol}`}
                </Text>
              </Pressable>
            </Box>
            <Box
              full
              align="center"
              style={{
                paddingVertical: 4,
                borderBottomWidth: 1,
                borderBottomColor: amountFocus
                  ? Colors[theme].text
                  : Colors[theme].borderColor,
              }}
            >
              <TextInput
                placeholder={I18n.t('Amount')}
                autoCapitalize="none"
                style={[styles.input, { fontFamily: Fonts.variable }]}
                value={amount}
                keyboardType="numeric"
                onChangeText={(_text) => setAmount(_text)}
                onFocus={() => {
                  setAmountFocus(true)
                  tokenListRef.current?.close()
                  contactListRef.current?.close()
                }}
                onBlur={() => setAmountFocus(false)}
                placeholderTextColor={Colors.gray9}
              />
              <Pressable
                onPress={() => {
                  Keyboard.dismiss()
                  contactListRef.current?.close()
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
              </Pressable>
            </Box>
          </Box>
        </Box>

        <Button
          label={I18n.t('Next')}
          type={ButtonType.PRIMARY}
          style={{ marginTop: 20 }}
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
        <BottomSheet
          ref={contactListRef}
          index={-1}
          enablePanDownToClose
          keyboardBehavior="fillParent"
          snapPoints={['60%']}
          backgroundStyle={{ backgroundColor: Colors[theme].cardBackground }}
        >
          <BottomSheetFlatList
            data={contacts}
            keyExtractor={(item: Contact) => item.publicKey}
            renderItem={({ item }) => {
              return (
                <ContactItem
                  item={item}
                  isQRCodeVisible={false}
                  onSelect={() => {
                    setReceiver(item.publicKey)
                    contactListRef.current?.close()
                  }}
                />
              )
            }}
            contentContainerStyle={{
              paddingBottom: insets.bottom,
              paddingHorizontal: 20,
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
  input: {
    fontSize: 18,
    padding: 8,
    flex: 1,
    fontFamily: Fonts.variable,
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
