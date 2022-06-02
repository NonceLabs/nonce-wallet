import ScreenHeader from 'components/common/ScreenHeader'
import BioAuthModal from 'components/Modals/BioAuthModal'
import SettingBlock from 'components/Setting/SettingBlock'
import { View } from 'components/Themed'
import { Fingerprint, FingerprintScan, KeyAlt } from 'iconoir-react-native'
import { useRef } from 'react'
import { ScrollView } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { useAppSelector } from 'store/hooks'
import Styles from 'theme/Styles'

export default function Security() {
  const isAuthEnabled = useAppSelector((state) => state.setting.bioAuthEnabled)
  const bioAuthRef = useRef<Modalize>()

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title="Security" />

      <ScrollView style={Styles.page}>
        <SettingBlock
          title=""
          items={[
            {
              icon: KeyAlt,
              title: 'Update PIN Code',
              value: '',
              onPress: () => {},
            },
            {
              icon: FingerprintScan,
              title: 'Enable Bio Auth',
              value: isAuthEnabled ? 'on' : 'off',
              onPress: () => bioAuthRef.current?.open(),
            },
          ]}
        />
      </ScrollView>
      <Modalize ref={bioAuthRef} adjustToContentHeight>
        <BioAuthModal onClose={() => bioAuthRef.current?.close()} />
      </Modalize>
    </View>
  )
}
