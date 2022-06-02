import ScreenHeader from 'components/common/ScreenHeader'
import { View } from 'components/Themed'
import RestoreForm from 'components/Wallet/RestoreForm'
import SetupPIN from 'components/Wallet/SetupPIN'
import I18n from 'i18n-js'
import { useState } from 'react'

enum RESTORE_STEP {
  RESTORE = 'RESTORE',
  SETUP_PIN = 'SETUP_PIN',
}

export default function Restore() {
  const [step, setStep] = useState(RESTORE_STEP.RESTORE)

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title="Start" />

      {step === RESTORE_STEP.RESTORE && (
        <RestoreForm onNext={() => setStep(RESTORE_STEP.SETUP_PIN)} />
      )}

      {step === RESTORE_STEP.SETUP_PIN && (
        <SetupPIN onNext={() => {}} type="restore" />
      )}
    </View>
  )
}
