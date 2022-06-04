import React, { useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native'
import { ViewStyle } from 'react-native'

export default function LottieAnim({
  style,
  source,
}: {
  style: ViewStyle
  source: string
}) {
  return (
    <LottieView style={style} source={source} autoPlay loop duration={2000} />
  )
}
