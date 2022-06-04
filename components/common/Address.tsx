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
  fontSize = 18,
  ellipsis = true,
  numberOfLines = 1,
}: {
  wallet: Wallet | undefined
  fontSize?: number
  ellipsis?: boolean
  color?: string
  numberOfLines?: number
}) {
  const theme = useColorScheme()
  if (!wallet) {
    return null
  }
  return (
    <Text
      style={[
        styles.address,
        {
          color: color ?? Colors[theme].link,
          fontSize,
        },
      ]}
      numberOfLines={numberOfLines}
    >
      {ellipsis ? formatAccountId(wallet) : wallet.publicKey}
    </Text>
  )
}

const styles = StyleSheet.create({
  address: {
    fontFamily: Fonts.variable,
  },
})
