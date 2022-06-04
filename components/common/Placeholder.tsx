import { ImageSourcePropType, StyleSheet, ViewStyle } from 'react-native'
import { Text, View } from 'components/Themed'
import Fonts from 'theme/Fonts'
import { EmojiLookBottom, EmojiLookTop } from 'iconoir-react-native'
import Colors from 'theme/Colors'
import I18n from 'i18n-js'

export function Empty({
  title,
  icon,
  style,
}: {
  title: string
  icon?: ImageSourcePropType
  style?: ViewStyle
}) {
  return (
    <View style={[styles.content, style]}>
      {icon ? null : (
        <EmojiLookBottom
          width={100}
          height={100}
          color={Colors.gray9}
          strokeWidth={1}
        />
      )}
      <Text style={styles.placeholder}>{I18n.t(title)}</Text>
    </View>
  )
}

export function ComingSoon({ title = 'Coming Soon' }: { title?: string }) {
  return (
    <View style={[styles.content, { justifyContent: 'flex-start' }]}>
      <Text style={[styles.placeholder, { marginBottom: 20 }]}>{title}</Text>
      <EmojiLookTop
        width={100}
        height={100}
        color={Colors.gray9}
        strokeWidth={1}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  placeholder: {
    fontSize: 20,
    color: '#999',
    fontFamily: Fonts.heading,
    marginTop: 10,
  },
})
