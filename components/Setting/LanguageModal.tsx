import AsyncStorageLib from '@react-native-async-storage/async-storage'
import I18n from 'i18n-js'
import Toast from 'utils/toast'
import SheetModal from 'components/common/SheetModal'

export default function LanguageModal({ onClose }: { onClose: () => void }) {
  const items = ['en', 'zh']
  return (
    <SheetModal
      title={I18n.t('Language')}
      items={items.map((t) => I18n.t(t))}
      active={I18n.t(I18n.currentLocale())}
      onClose={onClose}
      onSelect={(item: string, idx: number | undefined) => {
        if (typeof idx === 'number') {
          AsyncStorageLib.setItem('locale', items[idx])
            .then(() => {
              I18n.locale = items[idx]
              onClose()
            })
            .catch((error) => {
              Toast.error(error)
            })
        }
      }}
    />
  )
}
