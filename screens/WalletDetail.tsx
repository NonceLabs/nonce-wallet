import { useNavigation, useRoute, StackActions } from '@react-navigation/native'
import Address from 'components/common/Address'
import Box from 'components/common/Box'
import Heading from 'components/common/Heading'
import ScreenHeader from 'components/common/ScreenHeader'
import { Text, View } from 'components/Themed'
import useColorScheme from 'hooks/useColorScheme'
import I18n from 'i18n-js'
import Colors from 'theme/Colors'
import { StyleSheet } from 'react-native'
import Styles from 'theme/Styles'
import { Chain, Wallet } from 'types'
import SettingBlock from 'components/Setting/SettingBlock'
import { Archive, Trash } from 'iconoir-react-native'
import { useRef, useState } from 'react'
import { Portal } from 'react-native-portalize'
import { Modalize } from 'react-native-modalize'
import ConfirmModal from 'components/Modals/ConfirmModal'
import WalletAPI from 'chain/WalletAPI'
import Toast, { toast } from 'utils/toast'
import { useAppDispatch } from 'store/hooks'

export default function WalletDetail() {
  const { params } = useRoute()
  const wallet = (params as any)?.wallet as Wallet
  const confirmDeleteRef = useRef<Modalize>()
  const exportKeyRef = useRef<Modalize>()

  const theme = useColorScheme()
  const dispatch = useAppDispatch()
  const navigation = useNavigation()

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title="Wallet" />
      <View style={Styles.page}>
        <Box
          direction="column"
          align="flex-start"
          backgroundColor={Colors[theme].cardBackground}
          pad="medium"
          gap="small"
          style={{ borderRadius: 4, marginBottom: 20 }}
        >
          <Heading level={3}>{I18n.t('Wallet Address')}</Heading>
          <Address wallet={wallet} ecllipsis={false} />
        </Box>

        <SettingBlock
          title=""
          items={[
            {
              icon: Archive,
              title: 'Export Private Key',
              value: '',
              onPress: () => {
                exportKeyRef?.current?.open()
              },
            },
            {
              icon: Trash,
              title: 'Delete',
              value: '',
              onPress: async () => {
                confirmDeleteRef?.current?.open()
              },
            },
          ]}
        />
      </View>
      <Portal>
        <Modalize
          ref={confirmDeleteRef}
          adjustToContentHeight
          closeOnOverlayTap
        >
          <ConfirmModal
            title="Delete Wallet"
            icon={<Trash width={40} height={40} color={Colors.black} />}
            iconWrapColor={Colors.red}
            subtitle="Make sure you have a backup of your private key before you delete this wallet."
            onCancel={() => confirmDeleteRef?.current?.close()}
            onConfirm={async () => {
              try {
                await WalletAPI.removeKey(Chain.MINA, wallet.publicKey)
                dispatch({
                  type: 'wallet/remove',
                  payload: wallet,
                })
                navigation.dispatch(StackActions.popToTop())
              } catch (error) {
                Toast.error(error)
              }
            }}
          />
        </Modalize>

        <Modalize ref={exportKeyRef} adjustToContentHeight closeOnOverlayTap>
          <ConfirmModal
            title="Export Private Key"
            icon={<Archive width={40} height={40} color={Colors.black} />}
            iconWrapColor={Colors.green}
            subtitle="Make sure you keep your private key safe. You will not be able to recover your funds if you lose your private key."
            onCancel={() => exportKeyRef?.current?.close()}
            onConfirm={async () => {
              exportKeyRef?.current?.close()
              navigation.navigate('PINCode', {
                onConfirmed: () => {
                  navigation.goBack()
                  navigation.navigate('PrivateKey', {
                    wallet,
                  })
                },
              })
            }}
          />
        </Modalize>
      </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  address: {
    fontSize: 16,
  },
})
