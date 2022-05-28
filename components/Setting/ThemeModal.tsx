import I18n from 'i18n-js'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { capitalizeFirstLetter } from 'utils/format'
import SheetModal from 'components/common/SheetModal'

export default function ThemeModal({ onClose }: { onClose: () => void }) {
  const themeSetting = useAppSelector((state) => state.setting.theme)
  const dispatch = useAppDispatch()
  return (
    <SheetModal
      title={I18n.t('Theme')}
      items={['Light', 'Dark', 'Auto']}
      active={capitalizeFirstLetter(themeSetting)}
      onClose={onClose}
      onSelect={(_theme: string) => {
        dispatch({
          type: 'setting/updateTheme',
          payload: _theme.toLowerCase(),
        })
        onClose()
      }}
    />
  )
}
