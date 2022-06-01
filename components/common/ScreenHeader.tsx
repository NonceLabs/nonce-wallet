import { useNavigation } from '@react-navigation/native'
import { NavArrowLeft } from 'iconoir-react-native'
import {
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Colors from 'theme/Colors'
import useColorScheme from 'hooks/useColorScheme'
import Fonts from 'theme/Fonts'
import { Text, View } from 'components/Themed'
import I18n from 'i18n-js'

export default function ScreenHeader({
  title,
  isBackable = true,
  style,
  rightEle = null,
}: {
  title: string
  isBackable?: boolean
  style?: StyleProp<ViewStyle>
  rightEle?: any
}) {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const theme = useColorScheme()
  return (
    <View style={[styles.header, { paddingTop: insets.top }, style]}>
      <View style={styles.row}>
        {isBackable && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <NavArrowLeft color={Colors[theme].link} width={40} height={40} />
          </TouchableOpacity>
        )}
        <Text style={[styles.headerText, { marginLeft: isBackable ? 0 : 20 }]}>
          {I18n.t(title)}
        </Text>
      </View>
      {rightEle}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 5,
    paddingRight: 20,
  },
  headerText: {
    textAlign: 'center',
    fontFamily: Fonts.heading,
    fontSize: 30,
  },
  icon: {
    width: 36,
    height: 36,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
