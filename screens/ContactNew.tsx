import { useNavigation, useRoute } from '@react-navigation/native'
import { isAddressValid } from 'chain/crypto'
import Box from 'components/common/Box'
import Button from 'components/common/Button'
import ScreenHeader from 'components/common/ScreenHeader'
import { View } from 'components/Themed'
import useColorScheme from 'hooks/useColorScheme'
import I18n from 'i18n-js'
import { Scanning } from 'iconoir-react-native'
import _ from 'lodash'
import { useState } from 'react'
import { Pressable, StyleSheet, TextInput } from 'react-native'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import Colors from 'theme/Colors'
import Fonts from 'theme/Fonts'
import Styles from 'theme/Styles'
import { Chain, Contact } from 'types'
import Toast from 'utils/toast'

export default function ContactNew() {
  const { params } = useRoute()
  const contact = (params as any)?.contact as Contact | undefined
  const [name, setName] = useState(contact?.name ?? '')
  const [address, setAddress] = useState(contact?.publicKey ?? '')

  const [nameFocus, setNameFocus] = useState(false)
  const [addressFocus, setAddressFocus] = useState(false)

  const contacts = useAppSelector((state) => state.setting.contacts)
  const theme = useColorScheme()
  const dispatch = useAppDispatch()
  const navigation = useNavigation()

  const isEdit = !!contact

  const onDelete = () => {
    dispatch({
      type: 'setting/removeContact',
      payload: contact,
    })
    Toast.success('Contact deleted')
    navigation.goBack()
  }

  const onAdd = async () => {
    try {
      const _name = _.trim(name)
      if (!_name) {
        throw new Error(I18n.t('Invalid name'))
      }
      if (!isAddressValid(address)) {
        throw new Error(I18n.t('Invalid address'))
      }
      if (!isEdit && contacts.some((t) => t.publicKey === address)) {
        throw new Error(I18n.t('Contact already exists'))
      }
      const newContact = {
        name: _name,
        publicKey: address,
        chain: Chain.MINA,
      }
      if (isEdit) {
        dispatch({
          type: 'setting/updateContact',
          payload: {
            oldContact: contact,
            newContact,
          },
        })
        Toast.success(I18n.t('Updated'))
      } else {
        dispatch({
          type: 'setting/addContact',
          payload: newContact,
        })
        Toast.success(I18n.t('Added'))
      }
      navigation.goBack()
    } catch (error) {
      Toast.error(error)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title={isEdit ? 'Edit Contact' : 'New Contact'} />

      <View style={Styles.page}>
        <Box direction="column" gap="xlarge" full>
          <Box
            full
            style={{
              borderBottomWidth: 1,
              borderBottomColor: nameFocus
                ? Colors[theme].text
                : Colors[theme].borderColor,
            }}
          >
            <TextInput
              placeholder={I18n.t('Name')}
              style={[styles.input, { color: Colors[theme].text }]}
              value={name}
              onChangeText={(_text) => setName(_text)}
              onFocus={() => setNameFocus(true)}
              onBlur={() => setNameFocus(false)}
              placeholderTextColor={Colors.gray9}
            />
          </Box>
          <Box
            full
            align="center"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: addressFocus
                ? Colors[theme].text
                : Colors[theme].borderColor,
            }}
          >
            <TextInput
              placeholder={I18n.t('Wallet Address')}
              autoCapitalize="none"
              style={[
                styles.input,
                { fontFamily: Fonts.variable, color: Colors[theme].text },
              ]}
              value={address}
              onChangeText={(_text) => setAddress(_text)}
              onFocus={() => setAddressFocus(true)}
              onBlur={() => setAddressFocus(false)}
              placeholderTextColor={Colors.gray9}
              numberOfLines={2}
              multiline
            />
            <Pressable>
              <Scanning width={20} height={20} color={Colors[theme].link} />
            </Pressable>
          </Box>

          <Box gap="medium">
            {isEdit && (
              <Button
                style={{ width: 150 }}
                label={I18n.t('Delete')}
                onPress={onDelete}
                size="medium"
              />
            )}
            <Button
              style={{ width: isEdit ? 150 : '100%' }}
              label={I18n.t('Confirm')}
              primary
              onPress={onAdd}
              size={isEdit ? 'medium' : 'large'}
            />
          </Box>
        </Box>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    padding: 8,
    flex: 1,
  },
  wrap: {
    borderBottomWidth: 1,
  },
})
