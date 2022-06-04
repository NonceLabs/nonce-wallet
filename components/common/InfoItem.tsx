import { Text } from 'components/Themed'
import useColorScheme from 'hooks/useColorScheme'
import I18n from 'i18n-js'
import { StyleSheet } from 'react-native'
import Colors from 'theme/Colors'
import Fonts from 'theme/Fonts'
import Box from './Box'

export default function InfoItem({
  title,
  value,
}: {
  title: string
  value?: string | number
}) {
  const theme = useColorScheme()
  return (
    <Box direction="column" align="flex-start">
      <Text style={styles.title}>{I18n.t(title)}</Text>
      <Text style={[styles.value, { color: Colors[theme].link }]}>{value}</Text>
    </Box>
  )
}

const styles = StyleSheet.create({
  value: {
    fontSize: 16,
    fontFamily: Fonts.variable,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.heading,
  },
})
