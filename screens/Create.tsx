import Box from 'components/common/Box'
import Button from 'components/common/Button'
import Heading from 'components/common/Heading'
import ScreenHeader from 'components/common/ScreenHeader'
import { View, Text } from 'components/Themed'
import GenMnemonic from 'components/Wallet/GenMnemonic'
import SetupPswd from 'components/Wallet/SetupPswd'
import I18n from 'i18n-js'
import { useState } from 'react'
import { ScrollView, TextInput, StyleSheet } from 'react-native'
import Colors from 'theme/Colors'
import Styles from 'theme/Styles'

enum CREATE_STEP {
  SETUP_PSWD = 'SETUP_PSWD',
  GEN_MNEMONIC = 'GEN_MNEMONIC',
}

export default function Create() {
  const [step, setStep] = useState(CREATE_STEP.SETUP_PSWD)

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title="Create" />
      {step === CREATE_STEP.SETUP_PSWD && (
        <SetupPswd onNext={() => setStep(CREATE_STEP.GEN_MNEMONIC)} />
      )}
      {step === CREATE_STEP.GEN_MNEMONIC && <GenMnemonic />}
    </View>
  )
}

const styles = StyleSheet.create({})
