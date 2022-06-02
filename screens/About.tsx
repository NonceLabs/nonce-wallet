import I18n from 'i18n-js'
import { Alert, Linking, Platform, StyleSheet } from 'react-native'
import * as Application from 'expo-application'
import * as StoreReview from 'expo-store-review'
import * as Clipboard from 'expo-clipboard'
import * as Updates from 'expo-updates'
import * as Device from 'expo-device'

import ScreenHeader from 'components/common/ScreenHeader'
import { View } from 'components/Themed'
import { RootStackScreenProps } from 'types'
import Colors from 'theme/Colors'
import useColorScheme from 'hooks/useColorScheme'
import {
  AppNotification,
  ChatBubble,
  Copy,
  Glasses,
  Keyframes,
  StarOutline,
  UploadSquareOutline,
} from 'iconoir-react-native'
import { useAppSelector } from 'store/hooks'
import { toast } from 'utils/toast'
import { useEffect, useState } from 'react'
import SettingBlock from 'components/Setting/SettingBlock'
import ScreenLoading from 'components/common/ScreenLoading'

export default function About({ navigation }: RootStackScreenProps<'About'>) {
  const theme = useColorScheme()
  const pushToken = useAppSelector((state) => state.setting.pushToken)
  const isDevMode = useAppSelector((state) => state.setting.isDevMode)
  const isNotiVisible = !!pushToken && isDevMode

  const [isUpdateAvaliable, setIsUpdateAvaliable] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (Device.isDevice) {
      Updates.checkForUpdateAsync()
        .then((update) => {
          setIsUpdateAvaliable(update.isAvailable)
        })
        .catch(console.error)
    }
  }, [])

  const onManualUpdate = async () => {
    try {
      Alert.alert(
        I18n.t('Tip'),
        I18n.t('Updated content will make effect after APP restarted'),
        [
          {
            text: I18n.t('Cancel'),
            onPress: () => {},
          },
          {
            text: I18n.t('Confirm'),
            onPress: async () => {
              try {
                setIsLoading(true)
                await Updates.fetchUpdateAsync()
                await Updates.reloadAsync()
                setIsLoading(false)
              } catch (error) {
                setIsLoading(false)
              }
            },
          },
        ],
        {
          cancelable: true,
        }
      )
    } catch (error) {
      setIsLoading(false)
      if (error instanceof Error) {
        toast('error', error.message)
      }
    }
  }

  const actions = []
  if (isDevMode) {
    actions.push({
      title: 'Update',
      icon: UploadSquareOutline,
      value: isUpdateAvaliable ? (
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: Colors.red,
          }}
        />
      ) : (
        ''
      ),
      onPress: () => {
        if (isUpdateAvaliable) {
          onManualUpdate()
        }
      },
    })
  }
  if (isNotiVisible) {
    actions.push({
      title: 'Notification',
      icon: AppNotification,
      value: <Copy width={20} height={20} color={Colors.gray9} />,
      onPress: async () => {
        try {
          await Clipboard.setStringAsync(pushToken)
          toast('success', I18n.t('Copied'))
        } catch (error) {
          if (error instanceof Error) {
            toast('error', error.message)
          }
        }
      },
    })
  }

  actions.push({
    title: 'Version',
    icon: Keyframes,
    value: `${Application.nativeApplicationVersion}${
      Platform.OS === 'android' ? `(${Application.nativeBuildVersion})` : ''
    }`,
    onPress: () => {},
    noChevron: true,
  })

  return (
    <View style={styles.container}>
      <ScreenHeader title={I18n.t('About')} />
      <View style={styles.content}>
        <SettingBlock
          title=""
          items={[
            {
              icon: Glasses,
              title: 'Privacy',
              value: '',
              onPress: () => Linking.openURL('#'),
            },
            {
              icon: ChatBubble,
              title: 'Feedback',
              value: '',
              onPress: () => Linking.openURL('#'),
            },
            {
              icon: StarOutline,
              title: 'Rate',
              value: '',
              onPress: () => {
                if (Platform.OS === 'ios') {
                  StoreReview.requestReview()
                } else {
                  Linking.openURL('#')
                }
              },
            },
          ]}
        />

        <SettingBlock title="" items={actions} />
      </View>
      <ScreenLoading modalVisible={isLoading} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  blockWrap: {
    borderRadius: 4,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
})
