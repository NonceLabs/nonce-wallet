import { Wallet, Chain, Token } from 'types'
import { BN } from 'bn.js'

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function formatAccountId(wallet: Wallet | null) {
  if (!wallet) {
    return ''
  }
  if (wallet.chain === Chain.MINA) {
    return (
      wallet.publicKey.substring(0, 12) +
      '...' +
      wallet.publicKey.substring(wallet.publicKey.length - 8)
    )
  }
  return wallet.publicKey
}

export const formatBalance = (
  balance: string,
  decimals: number,
  tail = 2
): string => {
  const bal = /[A-Fa-f]{1}/g.test(balance) ? `0x${balance}` : balance
  const v = new BN(bal).div(new BN(10).mul(new BN(decimals || 9))).toNumber()
  const result = Number(v).toFixed(tail)
  const resultStr = result.split('.')
  return Number(resultStr[1]) === 0 ? resultStr[0] : result
}

export const formatTokenBalance = (
  balance: string | number,
  token: Token | undefined
) => {
  return new BN(balance).div(new BN(10).mul(new BN(token?.decimals || 9)))
}
