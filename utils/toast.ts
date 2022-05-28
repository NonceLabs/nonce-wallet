import Toast from 'react-native-toast-message'
import { ToastType } from 'types'

export const toast = (type: ToastType, message: string): void => {
  Toast.show({
    type,
    text1: message,
    visibilityTime: 2000,
  })
}
