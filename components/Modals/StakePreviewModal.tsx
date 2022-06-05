import Box from 'components/common/Box'
import Button from 'components/common/Button'
import Heading from 'components/common/Heading'
import InfoItem from 'components/common/InfoItem'
import { View } from 'components/Themed'
import useColorScheme from 'hooks/useColorScheme'
import I18n from 'i18n-js'
import { StakeDelegation } from 'mina-signer/dist/src/TSTypes'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Colors from 'theme/Colors'
import { StakePreview } from 'types'

export default function StakePreviewModal({
  delegation,
  onCancel,
  onConfirm,
}: {
  delegation?: StakePreview
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
        <Heading level={2}>{I18n.t('Stake Preview')}</Heading>

        <Box direction="column" align="flex-start" gap="small">
          <InfoItem title="From" value={delegation?.from} />
          <InfoItem title="To" value={delegation?.to} />
          <InfoItem title="Fee" value={delegation?.fee} />
          <InfoItem title="Nonce" value={delegation?.nonce} />
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
