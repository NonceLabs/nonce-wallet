import PubSub from 'pubsub-js'
import { PUB, ToastType } from '../types'

const DURATION = 2000

const toast = (type: ToastType, message: string) => {
  PubSub.publish(PUB.TOAST_MESSAGE, {
    type,
    message,
    duration: DURATION,
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

  static info(message: string) {
    toast('info', message)
  }

  static warning(message: string) {
    toast('warning', message)
  }
}
