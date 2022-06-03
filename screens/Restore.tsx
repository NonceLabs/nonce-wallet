import { StackActions, useNavigation } from '@react-navigation/native'
import WalletAPI from 'chain/WalletAPI'
import ScreenHeader from 'components/common/ScreenHeader'
import { View } from 'components/Themed'
import RestoreForm from 'components/Wallet/RestoreForm'
import SetupPIN from 'components/Wallet/SetupPIN'
import I18n from 'i18n-js'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { KeyStoreFile } from 'types'
import Toast from 'utils/toast'

enum RESTORE_STEP {
  RESTORE = 'RESTORE',
  SETUP_PIN = 'SETUP_PIN',
}

export default function Restore() {
  const [step, setStep] = useState(RESTORE_STEP.RESTORE)
  const [keyFile, setKeyFile] = useState<KeyStoreFile | null>(null)

  const walletList = useAppSelector((state) => state.wallet.list)
  const pincode = useAppSelector((state) => state.setting.pincode)
  const dispatch = useAppDispatch()
  const navigation = useNavigation()

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title="Start" />

      {step === RESTORE_STEP.RESTORE && (
        <RestoreForm
          onNext={(_keyFile) => {
            if (pincode) {
              navigation.navigate('PINCode', {
                onConfirmed: async () => {
                  try {
                    if (
                      walletList.some((t) => t.publicKey === _keyFile.publicKey)
                    ) {
                      throw new Error(I18n.t('Wallet already exists'))
                    }

                    await WalletAPI.setKey(_keyFile)
                    dispatch({
                      type: 'wallet/add',
                      payload: {
                        publicKey: _keyFile.publicKey,
                        chain: _keyFile.chain,
                        hdIndex: _keyFile.hdIndex,
                        createdAt: _keyFile.createdAt,
                      },
                    })
                    setTimeout(() => {
                      navigation.dispatch(StackActions.popToTop())
                    }, 500)
                  } catch (error) {
                    Toast.error(error)
                  }
                },
              })
            } else {
              setKeyFile(_keyFile)
              setStep(RESTORE_STEP.SETUP_PIN)
            }
          }}
        />
      )}

      {step === RESTORE_STEP.SETUP_PIN && (
        <SetupPIN
          onNext={async () => {
            try {
              if (!keyFile) {
                throw new Error('keyFile is null')
              }
              await WalletAPI.setKey(keyFile)
              dispatch({
                type: 'wallet/add',
                payload: {
                  publicKey: keyFile.publicKey,
                  chain: keyFile.chain,
                  hdIndex: keyFile.hdIndex,
                  createdAt: keyFile.createdAt,
                },
              })
              setTimeout(() => {
                navigation.dispatch(StackActions.popToTop())
              }, 500)
            } catch (error) {}
          }}
          type="restore"
        />
      )}
    </View>
  )
}
