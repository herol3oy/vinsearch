export const fetcher = async <T>(apiUrl: string, options = {}) => {
  const res = await fetch(apiUrl, options)
  const json: T = await res.json()

  return json
}
