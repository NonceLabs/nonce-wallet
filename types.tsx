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
  TxDetail: { tx: MinaTransaction }
  Validators: undefined
  ChangePINCode: undefined
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

export type PublicKey = string

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
  SYNC_WALLET_INFO = 'SYNC_WALLET_INFO',
  TOAST_MESSAGE = 'TOAST_MESSAGE',
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

export interface StakePreview {
  to: PublicKey
  from: PublicKey
  fee: string
  nonce: number
  memo?: string
}

export interface PaymentPreview extends StakePreview {
  amount: string
}

export interface MinaAccountDetail {
  publicKey: string
  countPendingTransactions: number
  balance: {
    blockHeight: number
    lockedBalance: string
    total: string
    unknown: string
  }
  epochTotalStakingBalance: string
  nonce: number
  receiptChainHash: string
  totalBlocks: number
  totalSnarks: number
  totalTx: number
  username?: string
  votingFor: string
  delegate?: string
}

export interface MinaTransaction {
  id: string
  token: number
  to: PublicKey
  amount: number
  blockHeight: number
  blockStateHash: string
  dateTime: string
  failureReason: string
  fee: number
  feeToken: number
  from: PublicKey
  hash: string
  isDelegation: boolean
  kind: string
  memo: string
  nonce: number
  canonical: boolean
  block: {
    canonical: boolean
    stateHash: string
  }
}

export interface MinaSignature {
  readonly field: string
  readonly scalar: string
  readonly rawSignature?: string
}

export interface Validator {
  public_key: PublicKey
  identity_name?: string
  start_height: number
  start_time: string
  last_height: number
  last_time: string
  blocks_created: number
  blocks_proposed: number
  delegations: number
  stake: string
  account_balance: string
  account_balance_unknown: string
  fee: number
}

export interface MinaProducer extends MinaAccountDetail {
  nextEpochTotalStakingBalance: string
  epochDelegators: any[]
}

export enum ValidatorSort {
  NAME = 'Name',
  STAKE = 'Stake',
}

export interface ToastPayload {
  type: ToastType
  message: string
  duration: number
}
