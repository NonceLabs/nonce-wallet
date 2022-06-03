import { StyleSheet } from 'react-native'
import { Text } from '../Themed'
import Fonts from 'theme/Fonts'
import { formatAccountId } from 'utils/format'
import { Wallet } from 'types'
import useColorScheme from 'hooks/useColorScheme'
import Colors from 'theme/Colors'

export default function Address({
  wallet,
  color,
  ecllipsis = true,
}: {
  wallet: Wallet
  ecllipsis?: boolean
  color?: string
}) {
  const theme = useColorScheme()
  return (
    <Text
      style={[
        styles.address,
        {
          color: color ?? Colors[theme].link,
        },
      ]}
    >
      {ecllipsis ? formatAccountId(wallet) : wallet.publicKey}
    </Text>
  )
}

const styles = StyleSheet.create({
  address: {
    fontSize: 18,
    fontFamily: Fonts.variable,
  },
})
