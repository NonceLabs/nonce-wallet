import * as LocalAuthentication from 'expo-local-authentication'
import { StackActions, useNavigation } from '@react-navigation/native'
import { parseMnemonic } from 'chain/crypto'
import WalletAPI from 'chain/WalletAPI'
import ScreenHeader from 'components/common/ScreenHeader'
import { View } from 'components/Themed'
import GenMnemonic from 'components/Wallet/GenMnemonic'
import SetupPIN from 'components/Wallet/SetupPIN'
import VerifyMnemonic from 'components/Wallet/VerifyMnemonic'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import Toast from 'utils/toast'
import I18n from 'i18n-js'

enum CREATE_STEP {
  GEN_MNEMONIC = 'GEN_MNEMONIC',
  VERIFY_MNEMONIC = 'VERIFY_MNEMONIC',
  SETUP_PIN = 'SETUP_PIN',
}

export default function Create() {
  const [step, setStep] = useState(CREATE_STEP.GEN_MNEMONIC)
  const [mnemonic, setMnemonic] = useState('')

  const pincode = useAppSelector((state) => state.setting.pincode)
  const bioAuthEnabled = useAppSelector((state) => state.setting.bioAuthEnabled)
  const navigation = useNavigation()
  const dispatch = useAppDispatch()

  const onConfirmed = async () => {
    const keyFile = await parseMnemonic(mnemonic)
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
    }, 100)
  }

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title="Start" />
      {step === CREATE_STEP.GEN_MNEMONIC && (
        <GenMnemonic
          onNext={(_mnemonic) => {
            setStep(CREATE_STEP.VERIFY_MNEMONIC)
            setMnemonic(_mnemonic)
          }}
        />
      )}
      {step === CREATE_STEP.VERIFY_MNEMONIC && (
        <VerifyMnemonic
          onNext={async () => {
            if (bioAuthEnabled) {
              try {
                const result = await LocalAuthentication.authenticateAsync()
                if (!result.success) {
                  throw new Error(I18n.t('Authentication failed'))
                }
                await onConfirmed()
              } catch (error) {
                Toast.error(error)
              }
            } else if (pincode) {
              navigation.navigate('PINCode', {
                onConfirmed,
              })
            } else {
              setStep(CREATE_STEP.SETUP_PIN)
            }
          }}
          onBack={() => setStep(CREATE_STEP.GEN_MNEMONIC)}
          mnemonic={mnemonic}
        />
      )}
      {step === CREATE_STEP.SETUP_PIN && <SetupPIN onNext={() => {}} />}
    </View>
  )
}

const styles = StyleSheet.create({})
