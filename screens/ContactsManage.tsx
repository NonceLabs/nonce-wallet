import { useNavigation } from '@react-navigation/native'
import { Empty } from 'components/common/Placeholder'
import ScreenHeader from 'components/common/ScreenHeader'
import AddressQRModal from 'components/Modals/AddressQRModal'
import ContactItem from 'components/Setting/ContactItem'
import { View } from 'components/Themed'
import useColorScheme from 'hooks/useColorScheme'
import { AddCircledOutline } from 'iconoir-react-native'
import { useRef, useState } from 'react'
import { FlatList, Pressable, StyleSheet } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { useAppSelector } from 'store/hooks'
import Colors from 'theme/Colors'
import Fonts from 'theme/Fonts'
import { Contact } from 'types'

export default function ContactsManage() {
  const [contact, setContact] = useState<Contact>()
  const receiveRef = useRef<Modalize>(null)
  const theme = useColorScheme()
  const navigation = useNavigation()
  const contacts = useAppSelector((state) => state.setting.contacts)

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader
        title="Contacts"
        rightEle={
          <Pressable
            onPress={() => {
              navigation.navigate('ContactNew', {})
            }}
            hitSlop={20}
          >
            <AddCircledOutline
              width={24}
              height={24}
              color={Colors[theme].link}
            />
          </Pressable>
        }
      />
      {contacts.length === 0 ? (
        <Empty title="No contacts yet" />
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(t) => t.publicKey}
          renderItem={({ item }) => {
            return (
              <ContactItem
                item={item}
                onSelect={() => {
                  navigation.navigate('ContactNew', { contact: item })
                }}
                isQRCodeVisible
                onQRCodePress={() => {
                  setContact(item)
                  setTimeout(() => {
                    receiveRef.current?.open()
                  }, 100)
                }}
              />
            )
          }}
          contentContainerStyle={{ padding: 20 }}
        />
      )}
      <Portal>
        <Modalize
          ref={receiveRef}
          adjustToContentHeight
          closeOnOverlayTap
          handlePosition="inside"
          handleStyle={{ backgroundColor: Colors.gray9 }}
        >
          <AddressQRModal
            wallet={contact}
            onClose={() => {
              setContact(undefined)
              receiveRef.current?.close()
            }}
            onManage={() => {}}
          />
        </Modalize>
      </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.gray9,
  },
  name: {
    fontSize: 18,
    fontFamily: Fonts.heading,
  },
})
