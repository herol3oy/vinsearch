import { NYPLResponseItem } from './nypl-response-item'

export interface NYPLAPIResponse {
  response: {
    result: NYPLResponseItem[] | NYPLResponseItem
  }
}
