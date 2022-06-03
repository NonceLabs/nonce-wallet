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
import Styles from 'theme/Styles'

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
      {isBackable ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={[Styles.row, { paddingLeft: 5 }]}>
            <NavArrowLeft color={Colors[theme].link} width={30} height={30} />
            <Text style={[styles.backTitle]}>{I18n.t(title)}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={Styles.row}>
          <Text style={[styles.headerText]}>{I18n.t(title)}</Text>
        </View>
      )}

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
    fontFamily: Fonts.heading,
    fontSize: 30,
    marginLeft: 20,
  },
  icon: {
    width: 36,
    height: 36,
  },
  backTitle: {
    fontFamily: Fonts.heading,
    fontSize: 20,
  },
})
