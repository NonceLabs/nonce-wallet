import { Portal } from 'react-native-portalize'
import { useRef } from 'react'
import { Modalize } from 'react-native-modalize'
import I18n from 'i18n-js'
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import {
  Bank,
  Bell,
  Dollar,
  NavArrowDown,
  QrCode,
  Scanning,
  Wallet,
} from 'iconoir-react-native'
import { Text, View } from './Themed'
import { capitalizeFirstLetter, formatAccountId } from 'utils/format'
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
import { CURRENCY_SYMBOL, DEFAULT_CURRENCY_RATE } from 'utils/configure'
import Styles from 'theme/Styles'
import Box from './common/Box'
import icons from 'utils/icons'
import NetworksModal from './Modals/NetworksModal'

export default function Banner({ account }: { account: Account | null }) {
  const currencyRates: CurrencyRate = useAppSelector(
    (state) => state.setting.currencyRates || DEFAULT_CURRENCY_RATE
  )
  const currency: Currency = useAppSelector(
    (state) => state.setting.currentCurrency || Currency.USD
  )
  const tokens = useAppSelector((state) => state.asset.tokens)

  const network = useAppSelector((state) => state.setting.network)

  const receiveRef = useRef<Modalize>()
  const accountsRef = useRef<Modalize>()
  const networksRef = useRef<Modalize>()
  const navigation = useNavigation()
  const theme = useColorScheme()

  const insets = useSafeAreaInsets()

  if (!account) {
    return null
  }
  return (
    <ImageBackground
      source={icons.MINA_BANNER}
      style={[styles.banner]}
      resizeMode="cover"
    >
      <Box
        direction="column"
        style={{ height: '100%', paddingTop: insets.top + 50 }}
      >
        <View style={[styles.header, { top: insets.top }]}>
          <Icon
            isTransparent
            icon={
              <View style={{ position: 'relative' }}>
                <Bell width={24} height={24} color={Colors.white} />
              </View>
            }
            onPress={() => {}}
          />

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => networksRef?.current?.open()}
          >
            <View
              style={[Styles.row, styles.button, { borderColor: Colors.white }]}
            >
              <Text style={[styles.account, { fontSize: 14 }]}>
                {capitalizeFirstLetter(network)}
              </Text>
              <NavArrowDown color={Colors.white} width={24} height={24} />
            </View>
          </TouchableOpacity>

          <Icon
            icon={<Wallet width={24} height={24} color={Colors.white} />}
            isTransparent
            onPress={() => {
              accountsRef?.current?.open()
              // navigation.navigate('Scanner', { fromPage: 'HomeScreen' })
            }}
          />
        </View>
        <Box direction="column" gap="medium" style={{ paddingTop: 10 }}>
          <Text style={[styles.account, {}]}>{formatAccountId(account)}</Text>
          <Text style={styles.total}>
            {I18n.toCurrency(
              Number(calcTotal(tokens, currencyRates[currency])),
              {
                unit: CURRENCY_SYMBOL[currency],
              }
            )}
          </Text>
        </Box>
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
          <Modalize ref={networksRef} adjustToContentHeight closeOnOverlayTap>
            <NetworksModal onClose={() => networksRef.current?.close()} />
          </Modalize>
          <Modalize ref={accountsRef} adjustToContentHeight>
            <AccountsModal onClose={() => accountsRef.current?.close()} />
          </Modalize>
        </Portal>
      </Box>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  banner: {
    height: 280,
  },
  balanceWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 20,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 20,
  },
  total: {
    fontSize: 30,
    fontWeight: '800',
    fontFamily: Fonts.numberBold,
    color: Colors.white,
  },
  button: {
    borderWidth: 1,
    paddingLeft: 4,
    borderRadius: 4,
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
    fontFamily: Fonts.variable,
    color: Colors.white,
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
