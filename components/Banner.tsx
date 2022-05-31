import { Portal } from 'react-native-portalize'
import { useRef } from 'react'
import { Modalize } from 'react-native-modalize'
import I18n from 'i18n-js'
import { StyleSheet, TouchableOpacity } from 'react-native'
import {
  Bank,
  Bell,
  Dollar,
  NavArrowDown,
  QrCode,
  Scanning,
} from 'iconoir-react-native'
import { Text, View } from './Themed'
import { formatAccountId } from 'utils/format'
import { useAppSelector } from 'store/hooks'
import { Account, Currency, CurrencyRate } from 'types'
import { useNavigation } from '@react-navigation/native'
import Icon from './common/Icon'
import Fonts from 'theme/Fonts'
import useColorScheme from 'hooks/useColorScheme'
import Colors from 'theme/Colors'
import ReceiveModal from 'components/Modals/ReceiveModal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AccountsModal from 'components/Modals/AccountsModal'
import { calcTotal } from 'utils/helper'
import { DEFAULT_CURRENCY_RATE } from 'utils/configure'

export default function Banner({ account }: { account: Account | null }) {
  const currencyRates: CurrencyRate = useAppSelector(
    (state) => state.setting.currencyRates || DEFAULT_CURRENCY_RATE
  )
  const currency: Currency = useAppSelector(
    (state) => state.setting.currentCurrency || Currency.USD
  )

  const receiveRef = useRef<Modalize>()
  const accountsRef = useRef<Modalize>()
  const navigation = useNavigation()
  const theme = useColorScheme()

  const insets = useSafeAreaInsets()

  if (!account) {
    return null
  }
  return (
    <View
      style={[
        styles.banner,
        { backgroundColor: Colors[theme].bannerBackground },
      ]}
    >
      <View style={[styles.header, { top: insets.top }]}>
        <Icon
          isTransparent
          icon={
            <View style={{ position: 'relative' }}>
              <Bell width={24} height={24} color={Colors[theme].link} />
            </View>
          }
          onPress={() => {}}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => accountsRef?.current?.open()}
        >
          <View style={styles.row}>
            <Text style={[styles.account, { color: Colors[theme].link }]}>
              {formatAccountId(account)}
            </Text>
            <NavArrowDown color={Colors[theme].link} width={24} height={24} />
          </View>
        </TouchableOpacity>

        <Icon
          icon={<Scanning width={24} height={24} color={Colors[theme].link} />}
          isTransparent
          onPress={() => {
            // navigation.navigate('Scanner', { fromPage: 'HomeScreen' })
          }}
        />
      </View>
      <View style={styles.balanceWrap}>
        <Text style={styles.total}>
          {/* {I18n.toCurrency(Number(calcTotal(tokens, currencyRates[currency])), {
            unit: CURRENCY_SYMBOL[currency],
          })} */}
          0
        </Text>
      </View>
      <View style={styles.buttonGroup}>
        <Icon
          icon={
            <Dollar
              width={24}
              height={24}
              color={Colors[theme].screenBackground}
              strokeWidth={2}
            />
          }
          onPress={() => {
            navigation.navigate('Transfer')
          }}
        />
        <Icon
          icon={
            <QrCode
              width={24}
              height={24}
              color={Colors[theme].screenBackground}
              strokeWidth={2}
            />
          }
          onPress={() => receiveRef.current?.open()}
        />
        <Icon
          icon={
            <Bank
              width={24}
              height={24}
              color={Colors[theme].screenBackground}
              strokeWidth={2}
            />
          }
          onPress={() => {
            // navigation.navigate('StakingScreen')
          }}
        />
      </View>
      <Portal>
        <Modalize ref={receiveRef} adjustToContentHeight closeOnOverlayTap>
          <ReceiveModal onClose={() => receiveRef.current?.close()} />
        </Modalize>
        <Modalize ref={accountsRef} adjustToContentHeight>
          <AccountsModal onClose={() => accountsRef.current?.close()} />
        </Modalize>
      </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  banner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 220,
    paddingTop: 80,
  },
  balanceWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 20,
  },
  total: {
    fontSize: 30,
    fontWeight: '800',
    fontFamily: Fonts.numberBold,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  account: {
    fontSize: 16,
    fontFamily: Fonts.heading,
  },
  header: {
    width: '100%',
    position: 'absolute',
    paddingVertical: 0,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  badge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.red,
    position: 'absolute',
    right: 0,
  },
})
