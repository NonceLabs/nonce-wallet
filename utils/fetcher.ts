import { request } from 'graphql-request'
import {
  Payment,
  Signature,
  Signed,
  StakeDelegation,
} from 'mina-signer/dist/src/TSTypes'

export const graphFetcher = (query: string) => {
  return request('https://graphql.minaexplorer.com/', query)
}

export const post = async (url: string, json: object) => {
  const body = JSON.stringify(json)
  console.log('###POST', url, json)
  const response = await fetch(url, {
    method: 'POST',
    body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const responseJson = await response.json()
  return responseJson
}

export const fetcher = async (url: string, headers = {}) => {
  // console.log('###GET', url)
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), 30000)
  const response = await fetch(url, {
    signal: controller.signal,
    headers,
  })
  clearTimeout(id)
  return response.json()
}

export const fetchFixer = async () => {
  return fetcher('https://nier.wtf/api/fixer')
    .then((data) => data.rates)
    .catch(() => ({}))
}

export async function sendTx(signed: Signed<Payment>) {
  return await post(`https://api.minaexplorer.com/broadcast/transaction`, {
    publicKey: signed.data.from,
    signature: signed.signature,
    payload: signed.data,
  })
}

export async function stakeTx(signed: Signed<StakeDelegation>) {
  return await post(`https://api.minaexplorer.com/broadcast/delegation`, {
    publicKey: signed.data.from,
    signature: signed.signature,
    payload: signed.data,
  })
}

export const fetchPrice = async () => {
  return fetcher(
    `https://api.coingecko.com/api/v3/simple/price?ids=mina-protocol&vs_currencies=usd`
  )
    .then((data) => data['mina-protocol'])
    .catch(() => ({}))
}
