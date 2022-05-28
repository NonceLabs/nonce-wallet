import { StyleSheet } from 'react-native'
import Fonts from 'constants/Fonts'
import { Text, View } from 'components/Themed'

export default function SheetHeader({ title }: { title: string }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: '#00739D',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: Fonts.heading,
    textAlign: 'center',
    color: 'white',
  },
})
