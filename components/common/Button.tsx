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
  icon = null,
  type = ButtonType.DEFAULT,
  disabled = false,
}: {
  label: string
  onPress: () => void
  style?: any
  icon?: any
  type?: ButtonType
  disabled?: boolean
}) {
  const theme = useColorScheme()
  const bstyles = {
    wrap: {
      default: {
        borderColor: Colors[theme].borderColor,
      },
      primary: {
        backgroundColor: '#008cd5',
        borderColor: '#008cd5',
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
        bstyles.wrap[type],
        style,
        { opacity: disabled ? 0.5 : 1 },
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
            color: bstyles.text[type],
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
    paddingVertical: 12,
    marginTop: 20,
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
})
