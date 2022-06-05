import Address from 'components/common/Address'
import Box from 'components/common/Box'
import Heading from 'components/common/Heading'
import Radio from 'components/common/Radio'
import { Text } from 'components/Themed'
import useColorScheme from 'hooks/useColorScheme'
import I18n from 'i18n-js'
import { Pressable, StyleSheet } from 'react-native'
import Fonts from 'theme/Fonts'
import { Chain, Validator } from 'types'
import { MINA_TOKEN } from 'utils/configure'
import { formatBalance } from 'utils/format'

export default function ValidatorItem({
  item,
  selected,
  onSelect,
}: {
  item: Validator
  selected: boolean
  onSelect: () => void
}) {
  const theme = useColorScheme()
  return (
    <Pressable onPress={onSelect}>
      <Box
        justify="space-between"
        full
        style={
          {
            // backgroundColor: Colors[theme].cardBackground,
          }
        }
        pad="medium"
      >
        <Box
          direction="column"
          justify="space-between"
          align="flex-start"
          style={{
            ...styles.wrap,
          }}
        >
          <Heading level={3}>{item.identity_name}</Heading>
          <Address
            wallet={{ chain: Chain.MINA, publicKey: item.public_key }}
            fontSize={16}
          />
          <Box gap="small">
            <Text>{I18n.t('Staked')}</Text>
            <Text style={styles.staked}>
              {formatBalance(item.stake, MINA_TOKEN.decimals)}
            </Text>
          </Box>
        </Box>

        <Radio checked={selected} />
      </Box>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 6,
  },
  staked: {
    fontSize: 16,
    fontFamily: Fonts.numberBold,
  },
})
