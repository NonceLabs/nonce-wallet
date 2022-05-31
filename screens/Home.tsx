import { StyleSheet } from 'react-native'

import { Text, View } from 'components/Themed'
import { RootTabScreenProps } from 'types'
import { useEffect } from 'react'
import { useAppSelector } from 'store/hooks'
import Banner from 'components/Banner'
import Assets from 'components/Assets'

export default function Home({ navigation }: RootTabScreenProps<'Home'>) {
  const accountList = useAppSelector((state) => state.account.list)
  const account = useAppSelector((state) => state.account.current)

  useEffect(() => {
    if (accountList.length === 0 && !account) {
      navigation.push('Start')
    }
  }, [accountList, account])

  return (
    <View style={styles.container}>
      <Banner account={account} />
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
