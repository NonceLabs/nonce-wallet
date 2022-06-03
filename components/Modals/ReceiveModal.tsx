import { Share, StyleSheet } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import * as Clipboard from 'expo-clipboard'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Text, View } from 'components/Themed'
import { useAppSelector } from 'store/hooks'
import Icon from 'components/common/Icon'
import Toast from 'utils/toast'
import useColorScheme from 'hooks/useColorScheme'
import Colors from 'theme/Colors'
import Fonts from 'theme/Fonts'
import icons from 'utils/icons'
import { Check, Copy, ShareAndroid, InfoEmpty } from 'iconoir-react-native'
import { useState } from 'react'
import { Wallet } from 'types'
import Heading from 'components/common/Heading'

export default function ReceiveModal({
  wallet,
  onClose,
  onManage,
}: {
  wallet: Wallet | undefined
  onClose: () => void
  onManage: () => void
}) {
  const _wallet = useAppSelector((state) => state.wallet.current)
  const [isCopied, setIsCopied] = useState(false)
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: wallet?.publicKey ?? '',
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          onClose()
        } else {
          onClose()
        }
      }
    } catch (error) {
      Toast.error(error)
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
      <View style={styles.content}>
        <Heading>{wallet?.name}</Heading>
        <Text style={styles.title}>{wallet?.publicKey}</Text>
        <View style={styles.qrcodeWrap}>
          <QRCode
            size={200}
            logo={icons.LOGO}
            logoBackgroundColor="white"
            logoMargin={5}
            logoSize={40}
            value={wallet?.publicKey ?? ''}
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
                await Clipboard.setStringAsync(wallet?.publicKey ?? '')
                setTimeout(() => {
                  setIsCopied(false)
                }, 1000)
              } catch (error) {
                setIsCopied(false)
                Toast.error(error)
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
          {_wallet?.publicKey === wallet?.publicKey && (
            <Icon
              icon={
                <InfoEmpty
                  width={25}
                  height={25}
                  color={Colors[theme].screenBackground}
                />
              }
              onPress={() => {
                onClose()
                onManage()
              }}
            />
          )}
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
    paddingTop: 15,
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
