import I18n from 'i18n-js'
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from 'components/common/Button'
import ScreenHeader from 'components/common/ScreenHeader'

import { View } from 'components/Themed'
import Colors from 'theme/Colors'
import useColorScheme from 'hooks/useColorScheme'
import { useAppSelector } from 'store/hooks'
import { ButtonType, RootStackScreenProps, Wallet } from 'types'
import Fonts from 'theme/Fonts'
import Address from 'components/common/Address'
import Radio from 'components/common/Radio'

export default function WalletsManage({
  navigation,
}: RootStackScreenProps<'WalletsManage'>) {
  const wallets: Wallet[] = useAppSelector((state) => state.wallet.list)
  const wallet = useAppSelector((state) => state.wallet.current)
  const theme = useColorScheme()
  const insets = useSafeAreaInsets()

  return (
    <View style={styles.container}>
      <ScreenHeader title="Wallets" />
      <FlatList
        data={wallets}
        keyExtractor={(t) => t.publicKey}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('WalletDetail', { wallet: item })
              }}
              style={{ marginBottom: 10 }}
            >
              <View
                style={[
                  styles.card,
                  { backgroundColor: Colors[theme].cardBackground },
                ]}
              >
                <Address wallet={item} />
                <Radio
                  checked={wallet?.publicKey === item.publicKey}
                  disabled
                />
              </View>
            </TouchableOpacity>
          )
        }}
        contentContainerStyle={styles.contentContainer}
      />
      <View style={{ marginBottom: insets.bottom + 20, paddingHorizontal: 20 }}>
        <Button
          label={I18n.t('Add Wallet')}
          type={ButtonType.PRIMARY}
          onPress={() => {
            navigation.navigate('Start', {
              new: false,
            })
          }}
          size="large"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: 15,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentContainer: {
    padding: 20,
  },
  itemText: {
    fontSize: 18,
    fontFamily: Fonts.variable,
    marginLeft: 10,
  },
})
