import { StyleSheet } from 'react-native'

import { Text, View } from 'components/Themed'
import { RootTabScreenProps } from 'types'
import { useEffect } from 'react'
import { useAppSelector } from 'store/hooks'

export default function Home({ navigation }: RootTabScreenProps<'Home'>) {
  const accountList = useAppSelector((state) => state.account.list)
  const currentAccount = useAppSelector((state) => state.account.current)

  useEffect(() => {
    if (accountList.length === 0 && !currentAccount) {
      navigation.push('Start')
    }
  }, [accountList, currentAccount])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
