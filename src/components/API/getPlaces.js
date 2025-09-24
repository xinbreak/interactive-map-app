import axios from 'axios'

const API_KEY = import.meta.env.VITE_YANDEX_API_KEY

export default async function getPlaces(query) {
  try {
    const response = await axios.get(
      `https://search-maps.yandex.ru/v1/?text=${query}&type=biz&results=5&lang=ru_RU&bbox=27.69,53.83~27.40,53.97&apikey=${API_KEY}`
    )
    return response.data.features
  } catch (error) {
    console.error('There was error fetching places: ', error)
  }
}
