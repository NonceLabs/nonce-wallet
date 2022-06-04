import { useRoute } from '@react-navigation/native'
import { ArrowDown, ArrowUp, OpenInBrowser } from 'iconoir-react-native'
import _ from 'lodash'
import { ScrollView, StyleSheet } from 'react-native'
import Icon from 'components/common/Icon'
import ScreenHeader from 'components/common/ScreenHeader'
import TokenLogo from 'components/Assets/TokenLogo'
import { Text, View } from 'components/Themed'
import Colors from 'theme/Colors'
import useColorScheme from 'hooks/useColorScheme'
import { useAppSelector } from 'store/hooks'
import { RootStackScreenProps, Token } from 'types'
import { formatBalance } from 'utils/format'
import Fonts from 'theme/Fonts'
import { Portal } from 'react-native-portalize'
import { Modalize } from 'react-native-modalize'
import AddressQRModal from 'components/Modals/AddressQRModal'
import { useRef } from 'react'
import Box from 'components/common/Box'

export default function TokenScreen({
  navigation,
}: RootStackScreenProps<'Token'>) {
  const { params } = useRoute()
  const token = (params as any).token as Token

  const wallet = useAppSelector((state) => state.wallet.current)
  const receiveRef = useRef<Modalize>()

  const theme = useColorScheme()

  let txs = []

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Token"
        rightEle={
          <Icon
            isTransparent
            icon={
              <OpenInBrowser
                width={24}
                height={24}
                color={Colors[theme].link}
              />
            }
            onPress={() => {}}
          />
        }
      />
      <View style={styles.content}>
        <ScrollView
          contentContainerStyle={{
            padding: 20,
          }}
        >
          <Box direction="column" gap="small" style={styles.banner}>
            <TokenLogo token={token} size={80} />
            <Text style={[styles.balance, { color: Colors[theme].link }]}>
              {`${formatBalance(token.balance, token.decimals)} ${
                token.symbol
              }`}
            </Text>
            <View style={styles.buttonGroup}>
              <Icon
                icon={
                  <ArrowUp
                    width={24}
                    height={24}
                    color={Colors[theme].screenBackground}
                    strokeWidth={2}
                  />
                }
                onPress={() => {
                  navigation.navigate('Transfer', {
                    token,
                  })
                }}
              />
              <Icon
                icon={
                  <ArrowDown
                    width={24}
                    height={24}
                    color={Colors[theme].screenBackground}
                    strokeWidth={2}
                  />
                }
                onPress={() => receiveRef.current?.open()}
              />
            </View>
          </Box>
        </ScrollView>
      </View>
      <Portal>
        <Modalize
          ref={receiveRef}
          adjustToContentHeight
          closeOnOverlayTap
          handlePosition="inside"
          handleStyle={{ backgroundColor: Colors.gray9 }}
        >
          <AddressQRModal
            wallet={wallet}
            onClose={() => receiveRef.current?.close()}
            onManage={() => navigation.navigate('WalletDetail', { wallet })}
          />
        </Modalize>
      </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  banner: {
    paddingBottom: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.gray,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  balance: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: Fonts.heading,
  },
  date: {
    fontSize: 18,
    fontFamily: Fonts.heading,
    marginVertical: 10,
  },
  txGroup: {},
})
