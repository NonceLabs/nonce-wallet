import { Portal } from 'react-native-portalize'
import { useRef } from 'react'
import { Modalize } from 'react-native-modalize'
import I18n from 'i18n-js'
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import {
  ArrowUp,
  Bell,
  NavArrowDown,
  QrCode,
  Wallet as WalletIcon,
} from 'iconoir-react-native'
import { Text, View } from './Themed'
import { capitalizeFirstLetter } from 'utils/format'
import { useAppSelector } from 'store/hooks'
import { Currency, CurrencyRate } from 'types'
import { useNavigation } from '@react-navigation/native'
import Icon from './common/Icon'
import Fonts from 'theme/Fonts'
import useColorScheme from 'hooks/useColorScheme'
import Colors from 'theme/Colors'
import AddressQRModal from 'components/Modals/AddressQRModal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import WalletsModal from 'components/Modals/WalletsModal'
import { calcTotal } from 'utils/helper'
import { CURRENCY_SYMBOL, DEFAULT_CURRENCY_RATE } from 'utils/configure'
import Styles from 'theme/Styles'
import Box from './common/Box'
import icons from 'utils/icons'
import NetworksModal from './Modals/NetworksModal'
import Address from './common/Address'

export default function Banner() {
  const wallet = useAppSelector((state) => state.wallet.current)
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
            icon={<WalletIcon width={30} height={30} color={Colors.white} />}
            isTransparent
            onPress={() => {
              accountsRef?.current?.open()
            }}
          />

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              // networksRef?.current?.open()
            }}
          >
            <View
              style={[Styles.row, styles.button, { borderColor: Colors.white }]}
            >
              <Text style={[styles.wallet, { fontSize: 14 }]}>
                {capitalizeFirstLetter(network)}
              </Text>
              {/* <NavArrowDown color={Colors.white} width={20} height={20} /> */}
            </View>
          </TouchableOpacity>

          {/* <Icon
            isTransparent
            icon={
              <View style={{ position: 'relative' }}>
                <Bell width={25} height={25} color={Colors.white} />
              </View>
            }
            onPress={() => {}}
          /> */}
        </View>
        <Box direction="column" gap="medium" style={{ paddingTop: 10 }}>
          <Address wallet={wallet} color={Colors.white} fontSize={16} />
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
              <ArrowUp
                width={24}
                height={24}
                color={Colors[theme].screenBackground}
                strokeWidth={2}
              />
            }
            onPress={() => {
              navigation.navigate('Transfer', {})
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
        </View>

        <Portal>
          <Modalize
            ref={receiveRef}
            adjustToContentHeight
            closeOnOverlayTap
            handlePosition="inside"
            handleStyle={{ backgroundColor: Colors.gray9 }}
          >
            <AddressQRModal
              wallet={wallet}
              onClose={() => receiveRef.current?.close()}
              onManage={() => navigation.navigate('WalletDetail', { wallet })}
            />
          </Modalize>
          <Modalize ref={networksRef} adjustToContentHeight closeOnOverlayTap>
            <NetworksModal onClose={() => networksRef.current?.close()} />
          </Modalize>
          <Modalize ref={accountsRef} adjustToContentHeight>
            <WalletsModal onClose={() => accountsRef.current?.close()} />
          </Modalize>
        </Portal>
      </Box>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  banner: {
    height: 300,
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
    fontFamily: Fonts.heading,
    color: Colors.white,
  },
  button: {
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingTop: 2,
    paddingBottom: 1,
    borderRadius: 4,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  wallet: {
    fontSize: 16,
    fontFamily: Fonts.variable,
    color: Colors.white,
  },
  header: {
    width: '100%',
    position: 'absolute',
    paddingVertical: 0,
    paddingHorizontal: 10,
    paddingRight: 20,
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
