import { Modal } from 'react-native'
import { View } from 'components/Themed'
import LottieAnim from 'components/common/LottieAnim'

export default function ScreenLoading({
  modalVisible,
}: {
  modalVisible: boolean
}) {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LottieAnim
          style={{
            width: 300,
            height: 300,
          }}
          source={require('assets/lottie/loading.json')}
        />
      </View>
    </Modal>
  )
}
