import { Token } from 'types'
import { formatTokenBalance } from './format'

export const calcValue = (token: Token, rate = 1) => {
  const bal = formatTokenBalance(token.balance, token).toNumber()
  const value = bal * token.price * rate
  return Number(value.toFixed(2))
}

export const calcAmountValue = (amount: number, token: Token, rate = 1) => {
  const value = amount * token.price * rate
  return Number(value.toFixed(2))
}

export const calcTotal = (tokens: Token[], rate = 1) => {
  let total = 0
  tokens.forEach((token) => {
    total += Number(calcValue(token, rate))
  })
  return total
}
