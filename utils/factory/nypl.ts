export const createNYPLApiUrl = (query: string) => {
  return `http://api.repo.nypl.org/api/v2/items/search?q=${query}&publicDomainOnly=true&per_page=100`
}

export const createNYPLImageUrl = (id: string) => {
  return `http://images.nypl.org/index.php?id=${id}&t=w`
}
