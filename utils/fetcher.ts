export const fetcher = async <T>(apiUrl: string) => {
  const res = await fetch(apiUrl)
  const json: T = await res.json()

  return json
}
