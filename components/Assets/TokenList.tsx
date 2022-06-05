import { useNavigation } from '@react-navigation/native'
import { FlatList, RefreshControl, StyleSheet } from 'react-native'
import PubSub from 'pubsub-js'

import Colors from 'theme/Colors'
import useColorScheme from 'hooks/useColorScheme'
import { useAppSelector } from 'store/hooks'
import { Currency, CurrencyRate, PUB, Token } from 'types'
import { calcValue } from 'utils/helper'
import { View } from 'components/Themed'
import { CURRENCY_SYMBOL, DEFAULT_CURRENCY_RATE } from 'utils/configure'
import TokenItem from 'components/Assets/TokenItem'

export default function TokenList({ isLoading }: { isLoading: boolean }) {
  const currencyRates: CurrencyRate = useAppSelector(
    (state) => state.setting.currencyRates || DEFAULT_CURRENCY_RATE
  )
  const currency: Currency = useAppSelector(
    (state) => state.setting.currentCurrency || Currency.USD
  )

  const tokens = useAppSelector((state) => state.asset.tokens)
  const navigation = useNavigation()
  const theme = useColorScheme()

  const pinnedTokens = tokens.filter((t: Token) => t.isNative)
  const otherTokens = tokens
    .filter((t: Token) => !t.isNative)
    .sort((a: Token, b: Token) => {
      return calcValue(b) - calcValue(a) > 0 ? 1 : -1
    })

  const onSelect = (item: Token) => {
    navigation.navigate('Token', { token: item })
  }

  return (
    <View
      style={[
        styles.pageWrap,
        {
          backgroundColor: Colors[theme].background,
        },
      ]}
    >
      <FlatList
        data={[...pinnedTokens, ...otherTokens]}
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
        keyExtractor={(item) => item.symbol}
        contentContainerStyle={{ paddingLeft: 10 }}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              if (!isLoading) {
                PubSub.publish(PUB.SYNC_WALLET_INFO)
              }
            }}
          />
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  pageWrap: {
    flex: 1,
    borderRadius: 8,
  },
})
