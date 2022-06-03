import { StackActions, useNavigation } from '@react-navigation/native'
import WalletAPI from 'chain/WalletAPI'
import ScreenHeader from 'components/common/ScreenHeader'
import { View } from 'components/Themed'
import RestoreForm from 'components/Wallet/RestoreForm'
import SetupPIN from 'components/Wallet/SetupPIN'
import { useState } from 'react'
import { useAppDispatch } from 'store/hooks'
import { KeyStoreFile } from 'types'

enum RESTORE_STEP {
  RESTORE = 'RESTORE',
  SETUP_PIN = 'SETUP_PIN',
}

export default function Restore() {
  const [step, setStep] = useState(RESTORE_STEP.RESTORE)
  const [keyFile, setKeyFile] = useState<KeyStoreFile | null>(null)

  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title="Start" />

      {step === RESTORE_STEP.RESTORE && (
        <RestoreForm
          onNext={(_keyFile) => {
            setKeyFile(_keyFile)
            setStep(RESTORE_STEP.SETUP_PIN)
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
                type: 'wallet/addAccount',
                payload: {
                  publicKey: keyFile.publicKey,
                  chain: keyFile.chain,
                  hdIndex: keyFile.hdIndex,
                  createdAt: keyFile.createdAt,
                },
              })
              navigation.dispatch(StackActions.popToTop())
            } catch (error) {}
          }}
          type="restore"
        />
      )}
    </View>
  )
}
