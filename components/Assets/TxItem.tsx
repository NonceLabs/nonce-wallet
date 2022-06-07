import Address from 'components/common/Address'
import Box from 'components/common/Box'
import { Text, View } from 'components/Themed'
import dayjs from 'dayjs'
import useColorScheme from 'hooks/useColorScheme'
import I18n from 'i18n-js'
import { ArrowDown, ArrowUp, Bank } from 'iconoir-react-native'
import { Pressable, StyleSheet } from 'react-native'
import { useAppSelector } from 'store/hooks'
import Colors from 'theme/Colors'
import Fonts from 'theme/Fonts'
import { Chain, MinaTransaction } from 'types'
import { MINA_TOKEN } from 'utils/configure'
import { formatBalance } from 'utils/format'

export default function TxItem({
  item,
  onOpen,
}: {
  item: MinaTransaction
  onOpen: (tx: MinaTransaction) => void
}) {
  const wallet = useAppSelector((state) => state.wallet.current)
  const isSend = item.from === wallet?.publicKey
  const theme = useColorScheme()
  return (
    <Pressable onPress={() => onOpen(item)}>
      <Box full backgroundColor={Colors[theme].cardBackground} pad="medium">
        <Box direction="column">
          {item.isDelegation ? (
            <Bank width={30} height={30} color={Colors.gray9} />
          ) : isSend ? (
            <ArrowUp width={30} height={30} color={Colors.gray9} />
          ) : (
            <ArrowDown width={30} height={30} color={Colors.gray9} />
          )}
          <Text style={styles.time}>
            {dayjs(item.dateTime).format('HH:mm')}
          </Text>
        </Box>

        <View style={styles.detail}>
          <Box direction="row" align="flex-start" justify="space-between">
            <Box
              direction="column"
              gap="small"
              align="flex-start"
              justify="flex-start"
            >
              <Text style={styles.label}>
                {I18n.t(isSend ? (item.isDelegation ? 'Stake' : 'To') : 'From')}
              </Text>
              <Address
                wallet={{
                  chain: Chain.MINA,
                  publicKey: isSend || item.isDelegation ? item.to : item.from,
                }}
                fontSize={14}
              />
            </Box>
            {!item.isDelegation && (
              <Text style={[styles.amount]}>
                {isSend ? '-' : '+'}
                {formatBalance(item.amount, MINA_TOKEN.decimals)}
              </Text>
            )}
          </Box>
        </View>
      </Box>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  detail: {
    flex: 1,
    paddingLeft: 10,
  },
  actionDesc: {
    fontSize: 14,
    fontFamily: Fonts.variable,
  },
  time: {
    fontSize: 12,
    color: Colors.gray9,
    fontFamily: Fonts.variable,
  },
  label: {
    fontFamily: Fonts.symbol,
  },
  amount: {
    fontSize: 16,
    fontFamily: Fonts.number,
  },
})
