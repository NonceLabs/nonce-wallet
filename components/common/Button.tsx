import { StyleSheet, TouchableOpacity } from 'react-native'
import Colors from 'theme/Colors'
import useColorScheme from 'hooks/useColorScheme'
import { ButtonType } from 'types'
import Fonts from 'theme/Fonts'
import { Text } from 'components/Themed'

export default function Button({
  label,
  onPress,
  style,
  size = 'medium',
  icon = null,
  type = ButtonType.DEFAULT,
  disabled = false,
  primary = false,
}: {
  label: string
  onPress: () => void
  size?: 'small' | 'medium' | 'large'
  style?: any
  icon?: any
  type?: ButtonType
  disabled?: boolean
  primary?: boolean
}) {
  const theme = useColorScheme()
  const bstyles = {
    wrap: {
      default: {
        borderColor: Colors[theme].borderColor,
      },
      primary: {
        backgroundColor: '#333',
        borderColor: '#333',
      },
      danger: {
        backgroundColor: '#FF4040',
        borderColor: '#FF4040',
      },
    },
    text: {
      default: Colors[theme].text,
      primary: 'white',
      danger: 'white',
    },
  }
  return (
    <TouchableOpacity
      style={[
        styles.button,
        bstyles.wrap[primary ? ButtonType.PRIMARY : type],
        style,
        { opacity: disabled ? 0.5 : 1 },
        styles[size],
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.9}
    >
      {icon}
      <Text
        style={[
          styles.buttonText,
          {
            color: bstyles.text[primary ? ButtonType.PRIMARY : type],
            marginLeft: icon ? 8 : 0,
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: 4,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {},
  buttonText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    fontFamily: Fonts.heading,
  },
  buttonTextPrimary: {
    color: 'white',
  },
  small: {
    paddingVertical: 4,
  },
  medium: {
    paddingVertical: 8,
  },
  large: {
    paddingVertical: 12,
  },
})
