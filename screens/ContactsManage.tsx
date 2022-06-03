import { useNavigation } from '@react-navigation/native'
import Address from 'components/common/Address'
import Box from 'components/common/Box'
import { Empty } from 'components/common/Placeholder'
import ScreenHeader from 'components/common/ScreenHeader'
import { Text, View } from 'components/Themed'
import useColorScheme from 'hooks/useColorScheme'
import I18n from 'i18n-js'
import { AddCircledOutline, QrCode } from 'iconoir-react-native'
import { FlatList, Pressable, StyleSheet } from 'react-native'
import { useAppSelector } from 'store/hooks'
import Colors from 'theme/Colors'
import Fonts from 'theme/Fonts'
import Styles from 'theme/Styles'
import { formatAccountId } from 'utils/format'

export default function ContactsManage() {
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
              navigation.navigate('ContactNew')
            }}
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
        <Empty title={I18n.t('No contacts yet')} />
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(t) => t.publicKey}
          renderItem={({ item }) => {
            return (
              <Box justify="space-between" pad="medium" style={styles.item}>
                <Box direction="column" align="flex-start" gap="small">
                  <Text style={styles.name}>{item.name}</Text>
                  <Address wallet={item} fontSize={16} />
                </Box>
                <QrCode width={24} height={24} color={Colors.gray} />
              </Box>
            )
          }}
          contentContainerStyle={{ padding: 20 }}
        />
      )}
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
