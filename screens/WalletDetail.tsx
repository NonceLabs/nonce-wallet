import { useRoute } from '@react-navigation/native'
import Address from 'components/common/Address'
import Box from 'components/common/Box'
import Heading from 'components/common/Heading'
import ScreenHeader from 'components/common/ScreenHeader'
import { Text, View } from 'components/Themed'
import useColorScheme from 'hooks/useColorScheme'
import I18n from 'i18n-js'
import Colors from 'theme/Colors'
import { StyleSheet } from 'react-native'
import Styles from 'theme/Styles'
import { Wallet } from 'types'
import SettingBlock from 'components/Setting/SettingBlock'
import { Archive, Trash } from 'iconoir-react-native'

export default function WalletDetail() {
  const { params } = useRoute()
  const wallet = (params as any)?.wallet as Wallet

  const theme = useColorScheme()
  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title="Wallet" />
      <View style={Styles.page}>
        <Box
          direction="column"
          align="flex-start"
          backgroundColor={Colors[theme].cardBackground}
          pad="medium"
          gap="small"
          style={{ borderRadius: 4, marginBottom: 20 }}
        >
          <Heading level={3}>{I18n.t('Wallet Address')}</Heading>
          <Address wallet={wallet} ecllipsis={false} />
        </Box>

        <SettingBlock
          title=""
          items={[
            {
              icon: Archive,
              title: 'Export Private Key',
              value: '',
              onPress: () => {},
            },
            {
              icon: Trash,
              title: 'Delete',
              value: '',
              onPress: () => {},
            },
          ]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  address: {
    fontSize: 16,
  },
})
