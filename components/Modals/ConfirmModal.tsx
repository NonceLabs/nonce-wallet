import { Text, View } from '../Themed'
import Box from '../common/Box'
import Button from '../common/Button'
import I18n from 'i18n-js'
import Heading from 'components/common/Heading'
import Styles from 'theme/Styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import Colors from 'theme/Colors'
import useColorScheme from 'hooks/useColorScheme'

export default function ConfirmModal({
  title,
  icon,
  iconWrapColor,
  subtitle,
  onCancel,
  onConfirm,
}: {
  title: string
  icon: any
  iconWrapColor: string
  subtitle: string
  onCancel: () => void
  onConfirm: () => void
}) {
  const insets = useSafeAreaInsets()
  const theme = useColorScheme()
  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
          backgroundColor: Colors[theme].modalBackground,
        },
      ]}
    >
      <Box direction="column" gap="medium" pad="large">
        <Heading level={2}>{I18n.t(title)}</Heading>
        <View
          style={[
            Styles.center,
            styles.iconWrap,
            {
              backgroundColor: iconWrapColor,
            },
          ]}
        >
          {icon}
        </View>
        <Text style={styles.subtitle}>{I18n.t(subtitle)}</Text>
        <Box justify="space-between" gap="medium" style={{ marginTop: 30 }}>
          <Button
            style={{ width: 150 }}
            label={I18n.t('Cancel')}
            onPress={onCancel}
          />
          <Button
            style={{ width: 150 }}
            label={I18n.t('Confirm')}
            onPress={onConfirm}
            primary
          />
        </Box>
      </Box>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    maxWidth: 320,
    opacity: 0.7,
  },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
})
