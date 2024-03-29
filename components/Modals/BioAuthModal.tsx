import I18n from 'i18n-js'
import * as LocalAuthentication from 'expo-local-authentication'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import SheetModal from 'components/common/SheetModal'
import Toast from 'utils/toast'
import useAuth from 'hooks/useAuth'

export default function BioAuthModal({ onClose }: { onClose: () => void }) {
  const isAuthEnabled = useAppSelector((state) => state.setting.bioAuthEnabled)
  const dispatch = useAppDispatch()

  const auth = useAuth()

  const onChange = async (item: string) => {
    try {
      const hasAuth = await LocalAuthentication.hasHardwareAsync()
      if (!hasAuth) {
        throw new Error(I18n.t('No hardware auth detected'))
      }
      if (item === 'on') {
        const result = await LocalAuthentication.authenticateAsync()
        if (result.success) {
          dispatch({
            type: 'setting/updateBioAuth',
            payload: true,
          })
          Toast.success(I18n.t('Auth enabled'))
        }
      }

      if (item === 'off') {
        dispatch({
          type: 'setting/updateBioAuth',
          payload: false,
        })
        Toast.success(I18n.t('Auth disabled'))
      }
      onClose()
    } catch (error) {
      Toast.error(error)
    }
  }

  return (
    <SheetModal
      title={I18n.t('Security')}
      items={['on', 'off']}
      active={isAuthEnabled ? 'on' : 'off'}
      onClose={onClose}
      onSelect={(item) => {
        auth(() => onChange(item))
      }}
    />
  )
}
