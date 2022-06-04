import Decimal from 'decimal.js'
import { Wallet, Chain, Token } from 'types'
import { BN } from 'bn.js'

export const ellipsis = (str: string, maxLength: number) => {
  if (str.length <= maxLength) {
    return str
  }
  return str.substring(0, maxLength - 3) + '...' + str.substring(str.length - 3)
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function formatAccountId(wallet: Wallet | undefined) {
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
  balance: string | number,
  decimals: number,
  tail = 2
): string => {
  const v = new Decimal(balance).div(10 ** (decimals || 24)).toNumber()
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

export const parseAmount = (amount: string, token: Token) => {
  return new BN(
    new Decimal(amount)
      .mul(new Decimal(10).pow(new Decimal(token.decimals)))
      .toString()
  )
}
