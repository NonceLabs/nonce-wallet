/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { PublicKey } from 'mina-signer/dist/src/TSTypes'
import { ImageSourcePropType } from 'react-native'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined
  Start: { new?: boolean }
  Restore: undefined
  Transfer: { token?: Token }
  Token: { token?: Token }
  Security: undefined
  Create: undefined
  About: undefined
  WalletsManage: undefined
  WalletDetail: { wallet?: Wallet }
  ContactsManage: undefined
  ContactNew: { contact?: Contact }
  PINCode: { onConfirmed: () => void }
  PrivateKey: { wallet?: Wallet }
  Modal: undefined
  NotFound: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>

export type RootTabParamList = {
  Home: undefined
  Setting: undefined
  Staking: undefined
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export enum NetworkType {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
}

export enum ButtonType {
  DEFAULT = 'default',
  PRIMARY = 'primary',
  DANGER = 'danger',
}

export enum Chain {
  MINA = 'MINA',
}

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  CNY = 'CNY',
}

export type CurrencyRate = {
  [key in Currency]?: number
}

export type Token = {
  name: string
  symbol: string
  price: number
  balance: string
  icon: ImageSourcePropType
  decimals: number
  isNative?: boolean
}

export enum PUB {
  REFRESH_TOKENLIST = 'REFRESH_TOKENLIST',
}

export interface MinaSummary {
  blockchainLength: number
  chainId: string
  circulatingSupply: string
  dateTime: string
  epoch: number
  globalSlot: number
  lockedSupply: string
  minWindowDensity: number
  nextEpochLedgerHash: string
  previousStateHash: string
  slot: number
  snarkedLedgerHash: string
  stagedLedgerHash: string
  stakingEpochLedgerHash: string
  stateHash: string
  totalCurrency: string
}

export interface Wallet {
  publicKey: string
  chain: Chain
  name?: string
  createdAt?: string
}

export interface KeyStoreFile {
  privateKey: string
  publicKey: string
  hdIndex?: number
  mnemonic?: string
  chain: Chain
  createdAt: string
}

export interface Contact extends Wallet {}

export interface PaymentPreview {
  to: PublicKey
  from: PublicKey
  fee: string
  amount: string
  nonce: number
  memo?: string
}
