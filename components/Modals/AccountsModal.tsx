import I18n from 'i18n-js'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { Account, PUB } from 'types'
import SheetModal from 'components/common/SheetModal'
import PubSub from 'pubsub-js'
import { formatAccountId } from 'utils/format'

export default function AccountsModal({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch()
  const accounts = useAppSelector((state) => state.account.list)
  const current = useAppSelector((state) => state.account.current)

  return (
    <SheetModal
      title={I18n.t('Accounts')}
      items={accounts.map((t) => formatAccountId(t))}
      active={formatAccountId(current!) ?? ''}
      onClose={onClose}
      onSelect={(item) => {
        const account = accounts.find((t) => formatAccountId(t) === item)
        dispatch({
          type: 'account/setCurrent',
          payload: account,
        })
        PubSub.publish(PUB.REFRESH_TOKENLIST)
        onClose()
      }}
    />
  )
}
