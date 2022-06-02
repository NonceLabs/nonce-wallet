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
import { ImageSourcePropType } from 'react-native'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined
  Start: undefined
  Restore: undefined
  Transfer: { token?: Token }
  Token: { token?: Token }
  Security: undefined
  Create: undefined
  About: undefined
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

export interface Account {
  publicKey: string
  chain: Chain
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
