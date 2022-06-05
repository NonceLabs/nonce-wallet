import * as WebBrowser from 'expo-web-browser'
import { useRoute } from '@react-navigation/native'
import Box from 'components/common/Box'
import Heading from 'components/common/Heading'
import InfoItem from 'components/common/InfoItem'
import ScreenHeader from 'components/common/ScreenHeader'
import { Text, View } from 'components/Themed'
import dayjs from 'dayjs'
import useColorScheme from 'hooks/useColorScheme'
import I18n from 'i18n-js'
import { Compass } from 'iconoir-react-native'
import { Pressable, ScrollView } from 'react-native'
import { useAppSelector } from 'store/hooks'
import Colors from 'theme/Colors'
import Styles from 'theme/Styles'
import { MinaTransaction } from 'types'
import { MINA_TOKEN } from 'utils/configure'
import { formatBalance } from 'utils/format'

export default function TxDetail() {
  const { params } = useRoute()
  const tx = (params as any)?.tx as MinaTransaction
  const wallet = useAppSelector((state) => state.wallet.current)
  const isSend = tx.from === wallet?.publicKey

  const theme = useColorScheme()

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title="Tx Detail" />

      <ScrollView style={Styles.page}>
        <Box justify="center" pad="medium">
          <Heading>
            {isSend ? '-' : '+'}
            {formatBalance(tx.amount, MINA_TOKEN.decimals, MINA_TOKEN.decimals)}
            {' MINA'}
          </Heading>
        </Box>
        <Box direction="column" gap="small" align="flex-start">
          <InfoItem title="Hash" value={tx.hash} />
          <InfoItem title="From" value={tx.from} />
          <InfoItem title="To" value={tx.to} />
          <InfoItem title="Block Height" value={tx.blockHeight} />
          <InfoItem title="Nonce" value={tx.nonce} />
          <InfoItem title="Kind" value={tx.kind} />
          <InfoItem
            title="Fee"
            value={formatBalance(
              tx.fee,
              MINA_TOKEN.decimals,
              MINA_TOKEN.decimals
            )}
          />
          <InfoItem
            title="Time"
            value={dayjs(tx.dateTime).format('MMM D, YYYY HH:mm:ss')}
          />
        </Box>
        <Box justify="flex-end" pad="medium" style={{ marginTop: 20 }}>
          <Pressable
            onPress={() => {
              WebBrowser.openBrowserAsync(`https://minablock.xyz/tx/${tx.hash}`)
            }}
            style={Styles.row}
          >
            <Compass width={20} height={20} color={Colors.purple} />
            <Text style={{ color: Colors.purple, marginLeft: 6 }}>
              {I18n.t('More detail')}
            </Text>
          </Pressable>
        </Box>
      </ScrollView>
    </View>
  )
}
