import { StyleSheet } from 'react-native'
import PubSub from 'pubsub-js'

import { View } from 'components/Themed'
import { PUB, RootTabScreenProps } from 'types'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import Banner from 'components/Banner'
import Assets from 'components/Assets'
import { fetcher, fetchFixer, fetchPrice } from 'utils/fetcher'
import { parseAmount } from 'utils/format'
import { MINA_TOKEN } from 'utils/configure'

export default function Home({ navigation }: RootTabScreenProps<'Home'>) {
  const walletList = useAppSelector((state) => state.wallet.list)
  const wallet = useAppSelector((state) => state.wallet.current)

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
    // setTimeout(() => {
    //   if (walletList.length === 0 && !wallet) {
    //     navigation.push('Start', { new: true })
    //   }
    // }, 500)
    async function syncWalletInfo() {
      if (wallet) {
        fetcher(`https://api.minaexplorer.com/accounts/${wallet.publicKey}`)
          .then((result) => {
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
          .catch(console.error)
      }
    }

    syncWalletInfo()

    const token = PubSub.subscribe(PUB.SYNC_WALLET_INFO, syncWalletInfo)

    return () => {
      token && PubSub.unsubscribe(token)
    }
  }, [walletList, wallet])

  return (
    <View style={styles.container}>
      <Banner />
      <Assets />
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
