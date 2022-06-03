import { StyleSheet } from 'react-native'

import { Text, View } from 'components/Themed'
import { RootTabScreenProps } from 'types'
import { useEffect } from 'react'
import { useAppSelector } from 'store/hooks'
import Banner from 'components/Banner'
import Assets from 'components/Assets'

export default function Home({ navigation }: RootTabScreenProps<'Home'>) {
  const walletList = useAppSelector((state) => state.wallet.list)
  const wallet = useAppSelector((state) => state.wallet.current)

  useEffect(() => {
    // setTimeout(() => {
    //   if (walletList.length === 0 && !wallet) {
    //     navigation.push('Start', { new: true })
    //   }
    // }, 500)
  }, [walletList, wallet])

  return (
    <View style={styles.container}>
      <Banner />
      <Assets />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
