import Box from 'components/common/Box'
import Button from 'components/common/Button'
import LottieAnim from 'components/common/LottieAnim'
import ScreenHeader from 'components/common/ScreenHeader'
import ValidatorItem from 'components/Staking/ValidatorItem'
import { View } from 'components/Themed'
import useColorScheme from 'hooks/useColorScheme'
import I18n from 'i18n-js'
import { Search } from 'iconoir-react-native'
import { useState } from 'react'
import { FlatList, StyleSheet, TextInput } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useSWR from 'swr'
import Colors from 'theme/Colors'
import { Validator } from 'types'
import { fetcher } from 'utils/fetcher'

export default function Validators() {
  const theme = useColorScheme()
  const [keyword, setKeyword] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Validator | undefined>()

  const { data, error } = useSWR<Validator[]>(
    `https://mina-mainnet-indexer.aurowallet.com/validators`,
    fetcher
  )

  const isLoading = !data && !error

  const insets = useSafeAreaInsets()

  let validators = data || []
  if (keyword.trim()) {
    validators = validators?.filter((v) => {
      if (!v) {
        return false
      }
      return (
        v.public_key.includes(keyword) || v.identity_name?.includes(keyword)
      )
    })
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors[theme].background }}>
      <ScreenHeader title="Validators" />
      <Box
        style={{
          ...styles.inputWrap,
          borderColor: isFocused
            ? Colors[theme].text
            : Colors[theme].borderColor,
          backgroundColor: Colors[theme].inputBackground,
        }}
      >
        <Search width={24} height={24} color={Colors.gray9} />
        <TextInput
          placeholder={I18n.t('Search')}
          style={[styles.input, { color: Colors[theme].text }]}
          value={keyword}
          onChangeText={(_text) => {
            setKeyword(_text)
            setPage(1)
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={Colors.gray9}
          autoCapitalize="none"
        />
      </Box>

      {isLoading && (
        <Box align="center" justify="center" pad="large">
          <LottieAnim
            style={{
              width: 200,
              height: 200,
            }}
            source={require('assets/lottie/pacman.json')}
          />
        </Box>
      )}

      <FlatList
        data={validators.slice(0, 20 * page)}
        keyExtractor={(t) => t.public_key}
        renderItem={({ item }) => {
          return (
            <ValidatorItem
              item={item}
              selected={selected?.public_key === item.public_key}
              onSelect={() => {
                if (selected && selected.public_key === item.public_key) {
                  setSelected(undefined)
                } else {
                  setSelected(item)
                }
              }}
            />
          )
        }}
        onMomentumScrollEnd={({ nativeEvent }) => {
          if (nativeEvent.contentOffset.y > 0) {
            setPage(page + 1)
          }
        }}
        contentContainerStyle={styles.listInner}
      />
      <Box style={{ ...styles.bottomButton, paddingBottom: insets.bottom }}>
        <Button
          label={I18n.t('Next')}
          primary
          onPress={() => {}}
          disabled={!selected}
        />
      </Box>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderColor: Colors.gray,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 10,
    flex: 1,
  },
  inputWrap: {
    borderWidth: 1,
    borderRadius: 6,
    marginHorizontal: 20,
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  listInner: {
    paddingHorizontal: 20,
  },
  bottomButton: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
})
