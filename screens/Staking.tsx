import { useNavigation } from '@react-navigation/native'
import Box from 'components/common/Box'
import Button from 'components/common/Button'
import Heading from 'components/common/Heading'
import InfoItem from 'components/common/InfoItem'
import { Empty } from 'components/common/Placeholder'
import ScreenHeader from 'components/common/ScreenHeader'
import { Text, View } from 'components/Themed'
import useColorScheme from 'hooks/useColorScheme'
import I18n from 'i18n-js'
import { ScrollView, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAppSelector } from 'store/hooks'
import useSWR from 'swr'
import Colors from 'theme/Colors'
import Fonts from 'theme/Fonts'
import Styles from 'theme/Styles'
import { MinaSummary, MinaProdocuer } from 'types'
import { fetcher } from 'utils/fetcher'

export default function Staking() {
  const { data, error } = useSWR<MinaSummary>(
    `https://api.minaexplorer.com/summary`,
    fetcher,
    {
      refreshInterval: 30000,
    }
  )
  const detail = useAppSelector((state) => state.wallet.detail)
  const theme = useColorScheme()
  const navigation = useNavigation()

  const isDelegated = !!detail?.delegate && detail.delegate !== detail.publicKey

  const { data: producer, error: producerError } = useSWR<{
    account: MinaProdocuer
  }>(
    isDelegated
      ? `https://api.minaexplorer.com/accounts/${detail?.delegate}`
      : null,
    fetcher
  )

  const pAccount = producer?.account

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title="Staking" isBackable={false} />
      <ScrollView style={[Styles.page]}>
        <Box
          direction="column"
          align="flex-start"
          style={{
            backgroundColor: Colors[theme].cardBackground,
            borderRadius: 6,
          }}
          pad="large"
          gap="small"
        >
          <Box align="flex-start" direction="column">
            <Text style={styles.title}>Block Height</Text>
            <Heading>{data?.blockchainLength ?? '-'}</Heading>
          </Box>

          <Box align="flex-start" direction="column">
            <Text style={styles.title}>Epoch</Text>
            <Heading>{data?.epoch ?? '-'}</Heading>
          </Box>

          <Box align="flex-start" direction="column" full>
            <Text style={styles.title}>Slot</Text>
            <Box direction="row">
              <Heading>{data?.slot ?? '-'}</Heading>
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

        <Box
          justify="space-between"
          style={{ marginTop: 20, marginBottom: 10 }}
        >
          <Heading level={2}>{I18n.t('My Delegation')}</Heading>
        </Box>
        <Box
          direction="column"
          align="center"
          style={{
            backgroundColor: Colors[theme].cardBackground,
            borderRadius: 6,
          }}
          pad="large"
        >
          {isDelegated ? (
            <Box direction="column" align="flex-start" gap="medium">
              {!!pAccount?.username && (
                <InfoItem title="Name" value={pAccount.username} />
              )}

              <InfoItem title="Producer" value={detail.delegate} />

              <InfoItem
                title="Staked Balance"
                value={
                  pAccount
                    ? Number(pAccount.epochTotalStakingBalance).toFixed(0)
                    : '-'
                }
              />
              <InfoItem
                title="Next Epoch Staked Balance"
                value={
                  pAccount
                    ? Number(pAccount.nextEpochTotalStakingBalance).toFixed(0)
                    : '-'
                }
              />
            </Box>
          ) : (
            <Empty
              title="Not delegation yet"
              style={{ width: '100%', paddingTop: 30 }}
            />
          )}
          <Button
            label={I18n.t(isDelegated ? 'Change' : 'Delegate Now')}
            primary
            style={{ width: 200, marginTop: 30 }}
            size="medium"
            onPress={() => {
              navigation.navigate('Validators')
            }}
          />
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
  heading: {
    fontFamily: Fonts.numberBold,
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
