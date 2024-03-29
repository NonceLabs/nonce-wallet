import { Text, View } from 'components/Themed'
import { useEffect, useRef, useState } from 'react'
import { Animated, Easing, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Colors from 'theme/Colors'
import Fonts from 'theme/Fonts'
import { PUB, ToastPayload, ToastType } from 'types'
import Box from './Box'

const BG_COLORS = {
  error: Colors.red,
  success: Colors.green,
  info: Colors.purple,
  warning: Colors.yellow,
}

export default function ToastMessage() {
  const insets = useSafeAreaInsets()
  const { width } = useWindowDimensions()
  const [message, setMessage] = useState('')
  const [type, setType] = useState<ToastType>('info')
  const phPosY = useRef(new Animated.Value(-100)).current

  useEffect(() => {
    const onMessage = (
      msg: string,
      { type, message, duration }: ToastPayload
    ) => {
      setType(type)
      setMessage(message)
      Animated.parallel([
        Animated.timing(phPosY, {
          toValue: 0,
          duration: 200,
          easing: Easing.poly(1),
          useNativeDriver: true,
        }),
      ]).start()

      setTimeout(() => {
        Animated.parallel([
          Animated.timing(phPosY, {
            toValue: -100,
            duration: 200,
            easing: Easing.poly(1),
            useNativeDriver: true,
          }),
        ]).start()
        setTimeout(() => {
          setMessage('')
        }, 200)
      }, duration)
    }
    const token = PubSub.subscribe(PUB.TOAST_MESSAGE, onMessage)
    return () => {
      token && PubSub.unsubscribe(token)
    }
  }, [])

  if (!message) {
    return null
  }

  return (
    <Animated.View
      style={{
        paddingTop: insets.top,
        paddingBottom: 10,
        backgroundColor: BG_COLORS[type],
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        transform: [
          {
            translateY: phPosY,
          },
        ],
      }}
    >
      <Box justify="center" style={{ paddingHorizontal: 20 }}>
        <Text
          style={{
            color: Colors.white,
            fontSize: 18,
            fontFamily: Fonts.heading,
            textAlign: 'center',
          }}
        >
          {message}
        </Text>
      </Box>
    </Animated.View>
  )
}
