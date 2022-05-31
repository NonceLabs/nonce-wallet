import { TouchableOpacity, StyleSheet } from 'react-native'
import Colors from 'theme/Colors'
import useColorScheme from 'hooks/useColorScheme'

export default function Icon({
  backgroundColor,
  onPress,
  isTransparent = false,
  icon = null,
}: {
  backgroundColor?: string
  onPress?: () => void
  isTransparent?: boolean
  icon?: any
}) {
  const theme = useColorScheme()

  if (!onPress) {
    return icon
  }
  return (
    <TouchableOpacity
      style={[
        styles.button,
        !isTransparent && {
          backgroundColor: backgroundColor || Colors[theme].link,
        },
        {
          marginHorizontal: isTransparent ? 0 : 10,
        },
      ]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      {icon}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
