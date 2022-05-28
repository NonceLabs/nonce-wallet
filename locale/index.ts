import AsyncStorageLib from '@react-native-async-storage/async-storage'
import * as Localization from 'expo-localization'
import i18n from 'i18n-js'
import en from './en'
import zh from './zh'

i18n.translations = {
  en,
  'en-US': en,
  'en-GB': en,
  zh,
  'zh-Hans': zh,
  'zh-Hans-CN': zh,
  'zh-Hans-US': zh,
}

AsyncStorageLib.getItem('locale')
  .then((res) => {
    if (res) {
      i18n.locale = res
    } else {
      const systemLan = Localization.locale.split('-')[0]
      i18n.locale = ['zh', 'en'].includes(systemLan) ? systemLan : 'en'
    }
  })
  .catch(console.log)

i18n.defaultLocale = 'en'
i18n.fallbacks = true
