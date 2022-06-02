import { Share, StyleSheet } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import * as Clipboard from 'expo-clipboard'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Text, View } from 'components/Themed'
import { useAppSelector } from 'store/hooks'
import Icon from 'components/common/Icon'
import { toast } from 'utils/toast'
import useColorScheme from 'hooks/useColorScheme'
import Colors from 'theme/Colors'
import Fonts from 'theme/Fonts'
import SheetHeader from 'components/common/SheetHeader'
import icons from 'utils/icons'
import I18n from 'i18n-js'
import { Check, Copy, ShareAndroid } from 'iconoir-react-native'
import { useState } from 'react'

export default function ReceiveModal({ onClose }: { onClose: () => void }) {
  const account = useAppSelector((state) => state.account.current)
  const [isCopied, setIsCopied] = useState(false)
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: account?.publicKey || '',
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          onClose()
        } else {
          onClose()
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        toast('error', error.message)
      }
    }
  }

  const theme = useColorScheme()
  const insets = useSafeAreaInsets()
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors[theme].modalBackground,
          paddingBottom: insets.bottom + 20,
        },
      ]}
    >
      <SheetHeader title={I18n.t('My Account')} />
      <View style={styles.content}>
        <Text style={styles.title}>{account?.publicKey}</Text>
        <View style={styles.qrcodeWrap}>
          <QRCode
            size={200}
            logo={icons.LOGO}
            logoBackgroundColor="white"
            logoMargin={5}
            logoSize={40}
            value={account?.publicKey || ''}
          />
        </View>
        <View style={styles.buttonGroup}>
          <Icon
            backgroundColor={isCopied ? '#00C781' : undefined}
            icon={
              isCopied ? (
                <Check
                  width={25}
                  height={25}
                  color={Colors[theme].screenBackground}
                />
              ) : (
                <Copy
                  width={25}
                  height={25}
                  color={Colors[theme].screenBackground}
                />
              )
            }
            onPress={async () => {
              try {
                setIsCopied(true)
                await Clipboard.setString(account?.publicKey || '')
                setTimeout(() => {
                  setIsCopied(false)
                }, 1000)
              } catch (error) {
                setIsCopied(false)
                if (error instanceof Error) {
                  toast('error', error.message)
                }
              }
            }}
          />
          <Icon
            icon={
              <ShareAndroid
                width={25}
                height={25}
                color={Colors[theme].screenBackground}
              />
            }
            onPress={onShare}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    alignItems: 'center',
    width: '90%',
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.link,
    fontFamily: Fonts.variable,
    width: 310,
  },
  qrcodeWrap: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  gloss: {
    color: Colors.gray9,
    marginTop: 20,
    fontSize: 14,
  },
})
