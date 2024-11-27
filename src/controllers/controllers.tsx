import { charsInfos, charsModel, charsResponse, charsResponseModel, ListChar } from "@/types/charsTypes"
import axios from "axios"

export async function listChars(search: ListChar = null): Promise<charsResponse> {

  let url = 'https://swapi.dev/api/people/'

  if (search != null) {
    url = `https://swapi.dev/api/people/?search=${search}`
  }

  let listChars: charsResponse = charsResponseModel

  await axios.get<charsResponse>(url)
    .then(({ data }) => {
      listChars = data
    })
    .catch((error) => {
      return error
    })

  return listChars
}

export async function loadFavChars(id: ListChar = null): Promise<charsInfos> {
  let listFavChars: charsInfos = charsModel

  await axios.get<charsInfos>(`https://swapi.dev/api/people/${id}`)
    .then(({ data }) => {
      listFavChars = data
    })
    .catch((error) => {
      return error
    })

  return listFavChars
}

export async function pageNavigation(page: ListChar) {
  let listChars: charsResponse = charsResponseModel

  await axios.get<charsResponse>(`${page}`)
    .then(({ data }) => {
      listChars = data
    })
    .catch((error) => {
      return error
    })

  return listChars
}