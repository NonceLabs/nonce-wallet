import bs58check from 'bs58check'
import HDKey from 'hdkey'
import * as bip39 from 'bip39'
import * as Random from 'expo-random'
import Client from 'mina-signer'
import { MNEMONIC_STRENGTH } from '../utils/configure'
import { Chain, KeyStoreFile } from 'types'

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

function reverse(bytes: Buffer) {
  const reversed = new Buffer(bytes.length)
  for (let i = bytes.length; i > 0; i--) {
    reversed[bytes.length - i] = bytes[i - 1]
  }
  return reversed
}

export const parseMnemonic = async (
  mnemonic: string,
  index: number = 0
): Promise<KeyStoreFile> => {
  const seed = await bip39.mnemonicToSeed(normalizeSeedPhrase(mnemonic))
  const hdkey = HDKey.fromMasterSeed(seed)
  const hdPath = getDerivedPath(index)
  const child0 = hdkey.derive(hdPath)

  child0.privateKey[0] &= 0x3f

  const childPrivateKey = reverse(child0.privateKey)
  const privateKeyHex = `5a01${childPrivateKey.toString('hex')}`
  const privateKey = bs58check.encode(Buffer.from(privateKeyHex, 'hex'))
  const client = new Client({ network: 'mainnet' })
  const publicKey = client.derivePublicKey(privateKey)

  return {
    privateKey: privateKey,
    publicKey: publicKey,
    hdIndex: index,
    mnemonic,
    chain: Chain.MINA,
    createdAt: new Date().toISOString(),
  }
}

export function isAddressValid(address: string) {
  try {
    const decodedAddress = bs58check.decode(address).toString('hex')
    return !!decodedAddress && decodedAddress.length === 72
  } catch (ex) {
    return false
  }
}
