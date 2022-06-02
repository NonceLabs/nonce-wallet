import Box from 'components/common/Box'
import Heading from 'components/common/Heading'
import ScreenHeader from 'components/common/ScreenHeader'
import { Text, View } from 'components/Themed'
import useColorScheme from 'hooks/useColorScheme'
import { ScrollView, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useSWR from 'swr'
import Colors from 'theme/Colors'
import Fonts from 'theme/Fonts'
import Styles from 'theme/Styles'
import { MinaSummary } from 'types'
import { fetcher } from 'utils/fetcher'

export default function Staking() {
  const { data, error } = useSWR<MinaSummary>(
    `https://api.minaexplorer.com/summary`,
    fetcher,
    {
      refreshInterval: 30000,
    }
  )
  const insets = useSafeAreaInsets()
  const theme = useColorScheme()

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title="Staking" />
      <ScrollView style={Styles.page}>
        <Box
          direction="column"
          align="flex-start"
          style={{ backgroundColor: Colors[theme].cardBackground }}
          pad="large"
          gap="small"
        >
          <Box align="flex-start" direction="column">
            <Text style={styles.title}>Block Height</Text>
            <Heading>{data?.blockchainLength}</Heading>
          </Box>

          <Box align="flex-start" direction="column">
            <Text style={styles.title}>Epoch</Text>
            <Heading>{data?.epoch}</Heading>
          </Box>

          <Box align="flex-start" direction="column" full>
            <Text style={styles.title}>Slot</Text>
            <Box direction="row">
              <Heading>{data?.slot}</Heading>
              <Text style={[styles.title, styles.number]}> / 7140</Text>
            </Box>
            <View
              style={[
                styles.progressWrap,
                {
                  backgroundColor: Colors[theme].bannerBackground,
                },
              ]}
            >
              <View
                style={[
                  styles.progress,
                  { width: `${((data?.slot ?? 0) * 100) / 7140}%` },
                ]}
              />
            </View>
          </Box>
        </Box>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: Colors.gray,
    fontFamily: Fonts.variable,
  },
  number: {
    fontFamily: Fonts.numberBold,
    fontSize: 18,
  },
  progressWrap: {
    height: 8,
    width: '100%',
    borderRadius: 4,
  },
  progress: {
    height: 8,
    backgroundColor: Colors.green,
    borderRadius: 4,
  },
})
