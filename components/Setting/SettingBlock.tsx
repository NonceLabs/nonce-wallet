import I18n from 'i18n-js'
import { NavArrowRight } from 'iconoir-react-native'
import { StyleSheet, Pressable } from 'react-native'
import Colors from 'theme/Colors'
import useColorScheme from 'hooks/useColorScheme'
import Fonts from 'theme/Fonts'
import { View, Text } from 'components/Themed'

interface SettingItem {
  icon: any
  title: string
  value?: any
  noChevron?: boolean
  onPress: () => void
}

export default function SettingBlock({
  title,
  items,
}: {
  title: string
  items: SettingItem[]
}) {
  const theme = useColorScheme()
  return (
    <View>
      {!!title && <Text style={styles.blockTitle}>{I18n.t(title)}</Text>}

      <View
        style={[
          styles.blockWrap,
          {
            backgroundColor: Colors[theme].cardBackground,
          },
        ]}
      >
        {items.map((item, idx) => {
          const Icon = item.icon
          const noBorder = idx === items.length - 1
          return (
            <Pressable
              key={idx}
              style={[
                styles.rowWrap,
                {
                  borderBottomWidth: noBorder ? 0 : StyleSheet.hairlineWidth,
                  borderBottomColor: Colors[theme].borderColor,
                },
              ]}
              onPress={item.onPress}
            >
              <View style={styles.row}>
                <Icon width={24} height={24} color={Colors[theme].text} />
                <Text style={styles.key}>{I18n.t(item.title)}</Text>
              </View>
              <View style={styles.row}>
                {typeof item.value === 'string' ? (
                  <Text style={[styles.value, { color: Colors[theme].link }]}>
                    {item.value}
                  </Text>
                ) : (
                  item.value
                )}

                {!item.noChevron && (
                  <NavArrowRight color="#999" width={24} height={24} />
                )}
              </View>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  blockWrap: {
    borderRadius: 4,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  blockTitle: {
    fontSize: 18,
    fontFamily: Fonts.heading,
    lineHeight: 30,
    color: Colors.gray9,
    marginBottom: 4,
    marginLeft: 10,
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  key: {
    fontSize: 18,
    marginLeft: 10,
  },
  value: {
    fontSize: 18,
    fontFamily: Fonts.variable,
  },
})
