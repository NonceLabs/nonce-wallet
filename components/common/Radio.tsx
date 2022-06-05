import { View } from 'components/Themed'
import { CheckCircledOutline, Circle } from 'iconoir-react-native'
import Colors from 'theme/Colors'

export default function Radio({
  checked,
  disabled,
}: {
  checked: boolean
  disabled?: boolean
}) {
  return checked ? (
    <View
      style={{
        backgroundColor: Colors.green,
        borderRadius: 12,
      }}
    >
      <CheckCircledOutline width={24} height={24} color={Colors.white} />
    </View>
  ) : disabled ? null : (
    <Circle width={24} height={24} color={Colors.green} />
  )
}
