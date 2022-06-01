import Heading from 'components/common/Heading'
import ScreenHeader from 'components/common/ScreenHeader'
import { View } from 'components/Themed'
import useSWR from 'swr'
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
  console.log(data)
  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title="Staking" isBackable={false} />
      <View style={Styles.page}>
        <Heading>Epoch</Heading>
      </View>
    </View>
  )
}
