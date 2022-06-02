import React, { useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native'

export default function LottieAnim({
  style,
  source,
}: {
  style: any
  source: string
}) {
  const lottieRef = useRef<LottieView>(null)

  useEffect(() => {
    if (lottieRef) {
      lottieRef?.current?.play()
    }
  }, [lottieRef])

  return <LottieView ref={lottieRef} style={style} source={source} />
}
