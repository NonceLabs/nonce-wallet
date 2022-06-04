import * as WebBrowser from 'expo-web-browser'
import _ from 'lodash'
import dayjs from 'dayjs'
import { MinaTransaction } from 'types'
import Box from 'components/common/Box'
import { Text, View } from 'components/Themed'
import TxItem from './TxItem'
import { StyleSheet } from 'react-native'
import Fonts from 'theme/Fonts'

export default function TxList({ txs }: { txs: MinaTransaction[] }) {
  const groupTxs = _.groupBy(txs, (tx) =>
    dayjs(tx.dateTime).format('MMM DD, YYYY')
  )

  const onOpen = (item: MinaTransaction) => {
    WebBrowser.openBrowserAsync(`https://minablock.xyz/tx/${item.hash}`)
  }

  return (
    <Box direction="column" align="flex-start" full gap="small">
      {Object.keys(groupTxs).map((key) => {
        return (
          <View key={key} style={{ width: '100%' }}>
            <Text style={styles.date}>{key}</Text>
            <View style={styles.txGroup}>
              {groupTxs[key].map((tx, idx) => {
                return (
                  <TxItem key={`${tx.hash}-${idx}`} item={tx} onOpen={onOpen} />
                )
              })}
            </View>
          </View>
        )
      })}
    </Box>
  )
}

const styles = StyleSheet.create({
  date: {
    fontSize: 18,
    fontFamily: Fonts.heading,
    marginVertical: 10,
  },
  txGroup: {},
})
