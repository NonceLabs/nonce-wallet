import {
  Platform,
  RefreshControl,
  StyleSheet,
  useWindowDimensions,
} from 'react-native'
import PubSub from 'pubsub-js'

import { View } from 'components/Themed'
import { Currency, CurrencyRate, PUB, RootTabScreenProps, Token } from 'types'
import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import Banner from 'components/Banner'
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { fetcher, fetchFixer, fetchPrice } from 'utils/fetcher'
import { parseAmount } from 'utils/format'
import {
  CURRENCY_SYMBOL,
  DEFAULT_CURRENCY_RATE,
  MINA_TOKEN,
} from 'utils/configure'
import useColorScheme from 'hooks/useColorScheme'
import Colors from 'theme/Colors'
import TokenItem from 'components/Assets/TokenItem'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Home({ navigation }: RootTabScreenProps<'Home'>) {
  const walletList = useAppSelector((state) => state.wallet.list)
  const wallet = useAppSelector((state) => state.wallet.current)
  const tokenListRef = useRef<BottomSheet>(null)
  const tokens: Token[] = useAppSelector((state) => state.asset.tokens)
  const currencyRates: CurrencyRate = useAppSelector(
    (state) => state.setting.currencyRates || DEFAULT_CURRENCY_RATE
  )
  const currency: Currency = useAppSelector(
    (state) => state.setting.currentCurrency || Currency.USD
  )
  const [refreshing, setRefreshing] = useState(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    fetchPrice().then((res) => {
      if (res && typeof res.usd !== 'undefined') {
        dispatch({
          type: 'asset/updateNativeTokenPrice',
          payload: res.usd,
        })
      }
    })

    fetchFixer().then((rates) => {
      dispatch({
        type: 'setting/updateCurrencyRate',
        payload: { ...rates, USD: 1 },
      })
    })
  }, [])

  useEffect(() => {
    if (walletList.length === 0 && !wallet) {
      navigation.push('Start', { new: true })
      return
    }

    async function syncWalletInfo() {
      if (wallet) {
        console.log('syncing wallet info')
        fetcher(`https://api.minaexplorer.com/accounts/${wallet.publicKey}`)
          .then((result) => {
            console.log('synced')
            setRefreshing(false)
            if (result.account) {
              dispatch({
                type: 'wallet/setDetail',
                payload: result.account,
              })
              const balance = parseAmount(
                result.account.balance.total,
                MINA_TOKEN
              ).toString()
              dispatch({
                type: 'asset/updateNativeTokenBalance',
                payload: balance,
              })
            }
          })
          .catch((error) => {
            console.log('error', error)

            setRefreshing(false)
          })
      }
    }

    syncWalletInfo()

    const token = PubSub.subscribe(PUB.SYNC_WALLET_INFO, syncWalletInfo)

    const tick = setInterval(syncWalletInfo, 10000)

    return () => {
      token && PubSub.unsubscribe(token)
      tick && clearInterval(tick)
    }
  }, [walletList, wallet])

  const theme = useColorScheme()
  const insets = useSafeAreaInsets()
  const { height } = useWindowDimensions()

  const onSelect = (item: Token) => {
    navigation.navigate('Token', { token: item })
  }

  return (
    <View style={styles.container}>
      <Banner />
      <BottomSheet
        ref={tokenListRef}
        index={0}
        keyboardBehavior="fillParent"
        snapPoints={[
          height - 320 - insets.bottom + (Platform.OS === 'android' ? 30 : 0),
        ]}
        backgroundStyle={{ backgroundColor: Colors[theme].cardBackground }}
        handleComponent={null}
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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                console.log('onRefresh')
                setRefreshing(true)
                PubSub.publish(PUB.SYNC_WALLET_INFO)
              }}
            />
          }
        />
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
