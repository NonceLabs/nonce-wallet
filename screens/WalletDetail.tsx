import * as LocalAuthentication from 'expo-local-authentication'
import { useNavigation, useRoute, StackActions } from '@react-navigation/native'
import Address from 'components/common/Address'
import Box from 'components/common/Box'
import Heading from 'components/common/Heading'
import ScreenHeader from 'components/common/ScreenHeader'
import { View } from 'components/Themed'
import useColorScheme from 'hooks/useColorScheme'
import I18n from 'i18n-js'
import Colors from 'theme/Colors'
import { StyleSheet } from 'react-native'
import Styles from 'theme/Styles'
import { Chain, Wallet } from 'types'
import SettingBlock from 'components/Setting/SettingBlock'
import { Archive, Trash } from 'iconoir-react-native'
import { useRef } from 'react'
import { Portal } from 'react-native-portalize'
import { Modalize } from 'react-native-modalize'
import ConfirmModal from 'components/Modals/ConfirmModal'
import WalletAPI from 'chain/WalletAPI'
import Toast from 'utils/toast'
import { useAppDispatch, useAppSelector } from 'store/hooks'

export default function WalletDetail() {
  const { params } = useRoute()
  const wallet = (params as any)?.wallet as Wallet
  const confirmDeleteRef = useRef<Modalize>()
  const exportKeyRef = useRef<Modalize>()

  const theme = useColorScheme()
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  const bioAuthEnabled = useAppSelector((state) => state.setting.bioAuthEnabled)

  const onConfirmDelete = async () => {
    await WalletAPI.removeKey(Chain.MINA, wallet.publicKey)
    dispatch({
      type: 'wallet/remove',
      payload: wallet,
    })
    navigation.dispatch(StackActions.popToTop())
  }

  const onConfirmExport = async () => {
    navigation.goBack()
    navigation.navigate('PrivateKey', {
      wallet,
    })
  }

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
          <Address wallet={wallet} ecllipsis={false} fontSize={16} />
        </Box>

        <SettingBlock
          title=""
          items={[
            {
              icon: Archive,
              title: 'Export',
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
          withHandle={false}
        >
          <ConfirmModal
            title="Delete"
            icon={<Trash width={40} height={40} color={Colors.black} />}
            iconWrapColor={Colors.red}
            subtitle="Make sure you have a backup of your private key before you delete this wallet"
            onCancel={() => confirmDeleteRef?.current?.close()}
            onConfirm={async () => {
              confirmDeleteRef.current?.close()
              if (bioAuthEnabled) {
                try {
                  const result = await LocalAuthentication.authenticateAsync()
                  if (!result.success) {
                    throw new Error(I18n.t('Authentication failed'))
                  }
                  await onConfirmDelete()
                } catch (error) {
                  Toast.error(error)
                }
              } else {
                navigation.navigate('PINCode', {
                  onConfirmed: onConfirmDelete,
                })
              }
            }}
          />
        </Modalize>

        <Modalize
          ref={exportKeyRef}
          adjustToContentHeight
          closeOnOverlayTap
          withHandle={false}
        >
          <ConfirmModal
            title="Export"
            icon={<Archive width={40} height={40} color={Colors.black} />}
            iconWrapColor={Colors.green}
            subtitle="Make sure you keep your private key safe"
            onCancel={() => exportKeyRef?.current?.close()}
            onConfirm={async () => {
              exportKeyRef?.current?.close()
              if (bioAuthEnabled) {
                try {
                  const result = await LocalAuthentication.authenticateAsync()
                  if (!result.success) {
                    throw new Error(I18n.t('Authentication failed'))
                  }
                  await onConfirmExport()
                } catch (error) {
                  Toast.error(error)
                }
              } else {
                navigation.navigate('PINCode', {
                  onConfirmed: onConfirmExport,
                })
              }
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
