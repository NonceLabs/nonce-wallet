import { BaseToast, BaseToastProps } from 'react-native-toast-message'
import Fonts from 'constants/Fonts'
import { View } from 'components/Themed'

const CustomToast = (props: BaseToastProps & { backgroundColor: string }) => {
  return (
    <View>
      <BaseToast
        {...props}
        style={{
          borderLeftWidth: 0,
          backgroundColor: props.backgroundColor,
          paddingVertical: 0,
          zIndex: 10000,
          height: 40,
          width: undefined,
          elevation: 0,
          shadowRadius: 0,
          borderRadius: 20,
          alignSelf: 'flex-start',
        }}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingVertical: 5,
          flex: undefined,
        }}
        activeOpacity={1}
        text1Style={{
          fontSize: 14,
          lineHeight: 20,
          fontFamily: Fonts.heading,
          color: 'white',
        }}
      />
    </View>
  )
}

export const toastConfig = {
  success: (props: BaseToastProps) => (
    <CustomToast {...props} backgroundColor="#00C781" />
  ),
  error: (props: BaseToastProps) => (
    <CustomToast {...props} backgroundColor="#FF4040" />
  ),
}
