import { View } from 'components/Themed'
import useColorScheme from 'hooks/useColorScheme'
import { FlexStyle, StyleSheet, ViewStyle } from 'react-native'
import Colors from 'theme/Colors'
import Styles from 'theme/Styles'

const padding = {
  none: 0,
  small: 5,
  medium: 10,
  large: 15,
}

export default function Box({
  children,
  style = {},
  direction = 'row',
  align = 'center',
  justify,
  gap = 'none',
  border = false,
  pad = 'none',
  full = false,
}: {
  children: any[]
  align?: FlexStyle['alignItems']
  justify?: FlexStyle['justifyContent']
  direction?: 'row' | 'column'
  style?: ViewStyle
  border?: boolean
  gap?: 'none' | 'small' | 'medium' | 'large'
  pad?: 'none' | 'small' | 'medium' | 'large'
  full?: boolean
}) {
  const _children = []
  for (let i = 0; i < children.length; i++) {
    _children.push(children[i])
    if (gap !== 'none' && i < children.length - 1) {
      _children.push(<View key={i} style={styles[gap]} />)
    }
  }
  const theme = useColorScheme()
  return (
    <View
      style={[
        Styles.row,
        {
          flexDirection: direction,
          alignItems: align,
          justifyContent: justify,
        },
        style,
        border && { borderColor: Colors[theme].borderColor, borderWidth: 1 },
        { padding: padding[pad], width: full ? '100%' : undefined },
      ]}
    >
      {_children}
    </View>
  )
}

const styles = StyleSheet.create({
  small: {
    width: 8,
    height: 8,
  },
  medium: {
    width: 16,
    height: 16,
  },
  large: {
    width: 24,
    height: 24,
  },
})
