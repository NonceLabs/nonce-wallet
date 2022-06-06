import I18n from 'i18n-js'
import SheetModal from 'components/common/SheetModal'
import { ValidatorSort } from 'types'

export default function SortValidatorModal({
  sortBy,
  onClose,
  onSelect,
}: {
  sortBy: ValidatorSort
  onClose: () => void
  onSelect: (sort: ValidatorSort) => void
}) {
  return (
    <SheetModal
      title={I18n.t('Sort')}
      items={Object.values(ValidatorSort).map((t) => t)}
      active={sortBy}
      onClose={onClose}
      onSelect={(item: string) => {
        onSelect(item as ValidatorSort)
      }}
    />
  )
}
