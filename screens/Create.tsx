import ScreenHeader from 'components/common/ScreenHeader'
import { View, Text } from 'components/Themed'
import GenMnemonic from 'components/Wallet/GenMnemonic'
import SetupPswd from 'components/Wallet/SetupPswd'
import VerifyMnemonic from 'components/Wallet/VerifyMnemonic'
import { useState } from 'react'
import { StyleSheet } from 'react-native'

enum CREATE_STEP {
  GEN_MNEMONIC = 'GEN_MNEMONIC',
  VERIFY_MNEMONIC = 'VERIFY_MNEMONIC',
  SETUP_PSWD = 'SETUP_PSWD',
}

export default function Create() {
  const [step, setStep] = useState(CREATE_STEP.GEN_MNEMONIC)
  const [mnemonic, setMnemonic] = useState('')

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title="Create" />
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
          onNext={() => setStep(CREATE_STEP.SETUP_PSWD)}
          onBack={() => setStep(CREATE_STEP.GEN_MNEMONIC)}
          mnemonic={mnemonic}
        />
      )}
      {step === CREATE_STEP.SETUP_PSWD && (
        <SetupPswd onNext={() => setStep(CREATE_STEP.GEN_MNEMONIC)} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({})
