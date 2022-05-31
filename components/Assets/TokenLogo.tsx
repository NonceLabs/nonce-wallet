import { Image, StyleSheet } from 'react-native'
import { Token } from 'types'
import { View } from 'components/Themed'

export default function TokenLogo({
  token,
  size,
}: {
  token: Token
  size: number
}) {
  return (
    <View
      style={[
        styles.wrap,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      <Image
        source={token.icon}
        style={[
          styles.logo,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
  },
})
