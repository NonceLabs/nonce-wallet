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
  console.log('###GET', url)
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
