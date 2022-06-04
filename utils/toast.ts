import Toasty from 'react-native-toast-message'
import { ToastType } from '../types'

export const toast = (type: ToastType, message: string): void => {
  Toasty.show({
    type,
    text1: message,
    visibilityTime: 2000,
  })
}

export default class Toast {
  static error(error: unknown) {
    if (error instanceof Error) {
      toast('error', error.message)
    } else if (typeof error === 'string') {
      toast('error', error)
    }
  }

  static success(message: string) {
    toast('success', message)
  }
}
