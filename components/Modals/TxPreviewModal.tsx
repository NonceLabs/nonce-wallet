import Box from 'components/common/Box'
import Button from 'components/common/Button'
import Heading from 'components/common/Heading'
import InfoItem from 'components/common/InfoItem'
import { View } from 'components/Themed'
import useColorScheme from 'hooks/useColorScheme'
import I18n from 'i18n-js'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Colors from 'theme/Colors'
import { PaymentPreview } from 'types'

export default function TxPreviewModal({
  payment,
  onCancel,
  onConfirm,
}: {
  payment?: PaymentPreview
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
        <Heading level={2}>{I18n.t('Transfer Preview')}</Heading>

        <Box direction="column" align="flex-start" gap="small">
          <InfoItem title="From" value={payment?.from} />
          <InfoItem title="To" value={payment?.to} />
          <InfoItem title="Amount" value={payment?.amount} />
          <InfoItem title="Fee" value={payment?.fee} />
          <InfoItem title="Nonce" value={payment?.nonce} />
        </Box>

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
})
