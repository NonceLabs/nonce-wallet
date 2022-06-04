import I18n from 'i18n-js'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { PUB } from 'types'
import SheetModal from 'components/common/SheetModal'
import PubSub from 'pubsub-js'
import { formatAccountId } from 'utils/format'

export default function WalletsModal({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch()
  const accounts = useAppSelector((state) => state.wallet.list)
  const current = useAppSelector((state) => state.wallet.current)

  return (
    <SheetModal
      title={I18n.t('Wallets')}
      items={accounts.map((t) => formatAccountId(t))}
      active={formatAccountId(current!) ?? ''}
      onClose={onClose}
      onSelect={(item) => {
        const wallet = accounts.find((t) => formatAccountId(t) === item)
        dispatch({
          type: 'wallet/setCurrent',
          payload: wallet,
        })
        PubSub.publish(PUB.SYNC_WALLET_INFO)
        onClose()
      }}
    />
  )
}
