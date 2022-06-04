import I18n from 'i18n-js'
import PubSub from 'pubsub-js'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import SheetModal from 'components/common/SheetModal'
import { NetworkType, PUB } from 'types'

export default function NetworksModal({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch()
  const network = useAppSelector((state) => state.setting.network)

  return (
    <SheetModal
      title={I18n.t('Networks')}
      items={Object.values(NetworkType).map((t) => t)}
      active={network}
      onClose={onClose}
      onSelect={(item: string) => {
        dispatch({
          type: 'network/setCurrent',
          payload: item,
        })
        PubSub.publish(PUB.SYNC_WALLET_INFO)
        setTimeout(() => {
          onClose()
        }, 300)
      }}
    />
  )
}
