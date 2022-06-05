import WalletAPI from 'chain/WalletAPI'
import Box from 'components/common/Box'
import Button from 'components/common/Button'
import LottieAnim from 'components/common/LottieAnim'
import ScreenHeader from 'components/common/ScreenHeader'
import StakePreviewModal from 'components/Modals/StakePreviewModal'
import ValidatorItem from 'components/Staking/ValidatorItem'
import { View } from 'components/Themed'
import useAuth from 'hooks/useAuth'
import useColorScheme from 'hooks/useColorScheme'
import I18n from 'i18n-js'
import { Search } from 'iconoir-react-native'
import { useRef, useState } from 'react'
import { FlatList, StyleSheet, TextInput } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAppSelector } from 'store/hooks'
import useSWR from 'swr'
import Colors from 'theme/Colors'
import { Chain, StakePreview, Validator } from 'types'
import { GAS_FEE_LEVELS, MINA_TOKEN } from 'utils/configure'
import { fetcher } from 'utils/fetcher'
import { parseAmount } from 'utils/format'
import Toast from 'utils/toast'
import { stakeTx } from 'utils/fetcher'
import { useNavigation } from '@react-navigation/native'

export default function Validators() {
  const theme = useColorScheme()
  const [keyword, setKeyword] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Validator | undefined>()
  const confirmStakeRef = useRef<Modalize>(null)
  const [delegation, setDelegation] = useState<StakePreview | undefined>()

  const wallet = useAppSelector((state) => state.wallet.current)
  const detail = useAppSelector((state) => state.wallet.detail)
  const { data, error } = useSWR<Validator[]>(
    `https://mina-mainnet-indexer.aurowallet.com/validators`,
    fetcher
  )

  const isLoading = !data && !error

  const insets = useSafeAreaInsets()

  let validators = data || []
  if (keyword.trim()) {
    const _keyword = keyword.trim().toLowerCase()
    validators = validators?.filter((v) => {
      if (!v) {
        return false
      }
      return (
        v.public_key.toLowerCase().includes(_keyword) ||
        v.identity_name?.toLowerCase().includes(_keyword)
      )
    })
  }

  const onNext = () => {
    if (!selected || !wallet || !detail) {
      return
    }
    setDelegation({
      from: wallet.publicKey,
      to: selected.public_key,
      nonce: detail?.nonce,
      fee: GAS_FEE_LEVELS[1].value,
    })
    confirmStakeRef.current?.open()
  }

  const auth = useAuth()
  const navigation = useNavigation()
  const onConfirmStake = () => {
    confirmStakeRef.current?.close()
    if (!delegation || !wallet) {
      return
    }

    auth(async () => {
      try {
        const _stake = {
          ...delegation,
          fee: parseAmount(delegation.fee, MINA_TOKEN).toString(),
        }
        const result = await WalletAPI.stake(
          Chain.MINA,
          wallet.publicKey,
          _stake
        )
        const response = await stakeTx(result!)
        if (!response.error) {
          navigation.goBack()
        }
        Toast.success(response.message)
      } catch (error) {
        Toast.error(error)
      }
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
          onPress={onNext}
          disabled={!selected}
        />
      </Box>
      <Portal>
        <Modalize
          ref={confirmStakeRef}
          adjustToContentHeight
          closeOnOverlayTap
          withHandle={false}
        >
          <StakePreviewModal
            delegation={delegation}
            onCancel={() => {
              confirmStakeRef.current?.close()
            }}
            onConfirm={onConfirmStake}
          />
        </Modalize>
      </Portal>
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
