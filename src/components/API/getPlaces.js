import axios from 'axios'

const API_KEY = import.meta.env.VITE_SERPER_API_KEY

export default async function getPlaces(query) {
  try {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://google.serper.dev/places?q=${query}&location=Minsk&gl=by&num=5&hl=ru&apiKey=${API_KEY}`,
      headers: {},
    }
    const response = await axios.request(config)
    console.log(JSON.stringify(response.data))

    return response.data.places
  } catch (error) {
    console.error('There was error fetching places: ', error)
  }
}
