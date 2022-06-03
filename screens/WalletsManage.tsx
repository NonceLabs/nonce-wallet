import I18n from 'i18n-js'
import { CheckCircledOutline, Circle } from 'iconoir-react-native'
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from 'components/common/Button'
import ScreenHeader from 'components/common/ScreenHeader'

import { Text, View } from 'components/Themed'
import Colors from 'theme/Colors'
import useColorScheme from 'hooks/useColorScheme'
import { useAppSelector } from 'store/hooks'
import { ButtonType, RootStackScreenProps, Wallet } from 'types'
import Fonts from 'theme/Fonts'
import { formatAccountId } from 'utils/format'
import Address from 'components/common/Address'

export default function WalletsManage({
  navigation,
}: RootStackScreenProps<'WalletsManage'>) {
  const accountIds: Wallet[] = useAppSelector((state) => state.wallet.list)
  const currentAccountId = useAppSelector((state) => state.wallet.current)
  const theme = useColorScheme()
  const insets = useSafeAreaInsets()

  return (
    <View style={styles.container}>
      <ScreenHeader title="Wallets" />
      <FlatList
        data={accountIds}
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
                {currentAccountId === item && (
                  <View
                    style={{ backgroundColor: Colors.green, borderRadius: 12 }}
                  >
                    <CheckCircledOutline
                      width={24}
                      height={24}
                      color={Colors.white}
                    />
                  </View>
                )}
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
