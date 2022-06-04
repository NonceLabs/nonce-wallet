import * as FileSystem from 'expo-file-system'
import I18n from 'i18n-js'
import Client from 'mina-signer'
import { Payment, Signed, StakeDelegation } from 'mina-signer/dist/src/TSTypes'
import { Wallet, Chain, KeyStoreFile } from 'types'

console.log(FileSystem.documentDirectory)

const exists = async (fileUri: string) => {
  try {
    const result = await FileSystem.getInfoAsync(fileUri)
    return result.exists
  } catch (error) {
    return false
  }
}
const readFile = async (fileUri: string) => {
  return await FileSystem.readAsStringAsync(fileUri)
}
const writeFile = async (fileUri: string, data: string) => {
  return await FileSystem.writeAsStringAsync(fileUri, data)
}
const unlink = FileSystem.deleteAsync
const readdir = FileSystem.readDirectoryAsync
const mkdir = FileSystem.makeDirectoryAsync

/** @hidden */
export async function loadJSONFile(filename: string): Promise<any> {
  const content = await readFile(filename)
  return JSON.parse(content)
}

async function ensureDir(dir: string): Promise<void> {
  try {
    if (!(await exists(dir))) {
      await mkdir(dir, {})
    }
  } catch (err) {
    if (err instanceof Error && (err as any).code !== 'EEXIST') {
      throw err
    }
  }
}

/** @hidden */
export async function readKeyFile(
  filename: string
): Promise<[string, KeyStoreFile]> {
  const accountInfo = (await loadJSONFile(filename)) as KeyStoreFile
  return [accountInfo.publicKey, accountInfo]
}

const KEYDIR = FileSystem.documentDirectory!

export default class WalletAPI {
  static getKeyFilePath(chain: Chain, publicKey: string): string {
    // if (keyFile.chain === Chain.MINA) {
    //   return `${this.keyDir}${keyFile.chain}/${keyFile.publicKey}.json`
    // }
    return `${KEYDIR}${chain}/${publicKey}.json`
  }

  static async setKey(keyFile: KeyStoreFile): Promise<void> {
    await ensureDir(`${KEYDIR}${keyFile.chain}`)
    await writeFile(
      this.getKeyFilePath(keyFile.chain, keyFile.publicKey),
      JSON.stringify(keyFile)
    )
  }

  static async getKey(
    chain: Chain,
    publicKey: string
  ): Promise<KeyStoreFile | null> {
    if (!(await exists(this.getKeyFilePath(chain, publicKey)))) {
      return null
    }
    const accountKeyPair = await readKeyFile(
      this.getKeyFilePath(chain, publicKey)
    )
    return accountKeyPair[1]
  }

  static async removeKey(chain: Chain, publicKey: string): Promise<void> {
    if (await exists(this.getKeyFilePath(chain, publicKey))) {
      await unlink(this.getKeyFilePath(chain, publicKey))
    }
  }

  static async clear(): Promise<void> {
    for (const network of await this.getChains()) {
      //
    }
  }

  static async getChains(): Promise<string[]> {
    const files: string[] = await readdir(KEYDIR)
    const result = new Array<string>()
    files.forEach((item) => {
      result.push(item)
    })
    return result
  }

  static async getAccounts(chain: Chain): Promise<Wallet[]> {
    if (!(await exists(`${KEYDIR}${chain}`))) {
      return []
    }
    const files: string[] = await readdir(`${KEYDIR}${chain}`)
    return files
      .filter((file) => file.endsWith('.json'))
      .map((file) => {
        return {
          chain,
          publicKey: file.replace(/.json$/, ''),
        }
      })
  }

  static async transfer(
    chain: Chain,
    publicKey: string,
    payment: Payment
  ): Promise<Signed<Payment> | null> {
    if (chain === Chain.MINA) {
      const keyFile = await this.getKey(chain, publicKey)
      if (!keyFile) {
        throw new Error('Invalid keystore')
      }
      const { privateKey } = keyFile
      const client = new Client({ network: 'mainnet' })
      const signedPayment = client.signPayment(payment, privateKey)
      if (!client.verifyPayment(signedPayment)) {
        throw new Error('Invalid payment')
      }

      return signedPayment
    }
    return null
  }

  static async stake(
    chain: Chain,
    publicKey: string,
    delegation: StakeDelegation
  ): Promise<Signed<StakeDelegation> | null> {
    if (chain === Chain.MINA) {
      const keyFile = await this.getKey(chain, publicKey)
      if (!keyFile) {
        throw new Error('Invalid keystore')
      }
      const { privateKey } = keyFile
      const client = new Client({ network: 'mainnet' })
      const signedDelegation = client.signStakeDelegation(
        delegation,
        privateKey
      )
      if (!client.verifyStakeDelegation(signedDelegation)) {
        throw new Error('Invalid payment')
      }

      return signedDelegation
    }
    return null
  }
}
