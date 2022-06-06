import _ from 'lodash'
import dayjs from 'dayjs'
import { MinaTransaction } from 'types'
import Box from 'components/common/Box'
import { Text, View } from 'components/Themed'
import TxItem from './TxItem'
import { StyleSheet } from 'react-native'
import Fonts from 'theme/Fonts'
import { useNavigation } from '@react-navigation/native'

export default function TxList({ txs }: { txs: MinaTransaction[] }) {
  const groupTxs = _.groupBy(txs, (tx) =>
    dayjs(tx.dateTime).format('MMM DD, YYYY')
  )

  const navigation = useNavigation()
  const onOpen = (item: MinaTransaction) => {
    navigation.navigate('TxDetail', { tx: item })
  }

  return (
    <Box direction="column" align="flex-start" full gap="small">
      {Object.keys(groupTxs).map((key) => {
        return (
          <View key={key} style={{ width: '100%' }}>
            <Text style={styles.date}>{key}</Text>
            <Box direction="column" gap="small">
              {groupTxs[key].map((tx, idx) => {
                return (
                  <TxItem key={`${tx.hash}-${idx}`} item={tx} onOpen={onOpen} />
                )
              })}
            </Box>
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
})
