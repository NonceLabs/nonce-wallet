export const txGraphQL = (address: string | undefined) => {
  if (!address) {
    return null
  }

  return `
    {
      transactions(limit: 30, query: {to: "${address}"}, sortBy: BLOCKHEIGHT_DESC) {
        amount
        blockHeight
        canonical
        from
        hash
        nonce
        memo
        kind
        isDelegation
        id
        to
        token
        fee
        feeToken
        failureReason
        dateTime
      }
    }
  `
}
