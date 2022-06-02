import BIP32Factory from 'bip32'
import * as ecc from 'tiny-secp256k1'
import * as bip39 from 'bip39'
import * as Random from 'expo-random'
import { MNEMONIC_STRENGTH } from './configure'

const getDerivedPath = (index: number) => `m/44'/12586'/${index}'/0/0`

const rng = (size: number): Buffer => {
  return Buffer.from(Random.getRandomBytes(size))
}

export const generateMnemonic = async () => {
  return bip39.generateMnemonic(MNEMONIC_STRENGTH, rng)
}

const normalizeSeedPhrase = (mnemonic: string) =>
  mnemonic
    .trim()
    .split(/\s+/)
    .map((part) => part.toLowerCase())
    .join(' ')

export const parseMnemonic = async (mnemonic: string, index: number = 0) => {
  // const bip32 = BIP32Factory(ecc)
  // const seed = await bip39.mnemonicToSeed(normalizeSeedPhrase(mnemonic))
  // const masterNode = bip32.fromSeed(seed)
  // const hdPath = getDerivedPath(index)
  // const child0 = masterNode.derivePath(hdPath)
  // return child0
}
