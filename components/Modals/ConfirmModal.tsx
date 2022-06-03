import { Text, View } from '../Themed'
import Box from '../common/Box'
import Button from '../common/Button'
import I18n from 'i18n-js'
import Heading from 'components/common/Heading'
import Styles from 'theme/Styles'

export default function ConfirmModal({
  title,
  subtitle,
  onCancel,
  onConfirm,
}: {
  title: string
  subtitle: string
  onCancel: () => void
  onConfirm: () => void
}) {
  return (
    <View>
      <View style={[Styles.center, { padding: 20 }]}>
        <Heading level={2}>{title}</Heading>
        <Text>{subtitle}</Text>
        <Box justify="space-between">
          <Button
            style={{ width: 150 }}
            label={I18n.t('Cancel')}
            onPress={onCancel}
          />
          <Button
            style={{ width: 150 }}
            label={I18n.t('Confirm')}
            onPress={onConfirm}
          />
        </Box>
      </View>
    </View>
  )
}
