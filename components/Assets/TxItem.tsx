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
import { ellipsis, formatBalance } from 'utils/format'

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
          <Box direction="column" align="flex-start">
            {!item.isDelegation && (
              <Box gap="small" justify="flex-start" align="flex-end">
                <Text style={styles.label}>{I18n.t('Amount')}</Text>
                <Text style={[styles.amount]}>
                  {isSend ? '-' : '+'}
                  {formatBalance(item.amount, MINA_TOKEN.decimals)}
                </Text>
              </Box>
            )}
            {isSend ? (
              <Box gap="small" justify="flex-start">
                <Text style={styles.label}>
                  {I18n.t(item.isDelegation ? 'Stake' : 'To')}
                </Text>
                <Address
                  wallet={{ chain: Chain.MINA, publicKey: item.to }}
                  fontSize={14}
                />
              </Box>
            ) : (
              <Box gap="small" justify="flex-start">
                <Text style={styles.label}>{I18n.t('From')}</Text>
                <Address
                  wallet={{ chain: Chain.MINA, publicKey: item.from }}
                  fontSize={14}
                />
              </Box>
            )}

            <Box gap="small" justify="flex-start">
              <Text style={styles.label}>{I18n.t('Hash')}</Text>
              <Text style={[styles.actionDesc, { color: Colors[theme].link }]}>
                {ellipsis(item.hash, 16)}
              </Text>
            </Box>
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
    fontFamily: Fonts.heading,
    fontSize: 20,
  },
})
