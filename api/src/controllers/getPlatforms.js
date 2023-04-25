require('dotenv').config();
const {DB_API_KEY} = process.env
const axios = require('axios')

const getPlatforms = async() =>{
  const platformsFromApi = await axios.get(`https://api.rawg.io/api/platforms?key=${DB_API_KEY}`)
  return platformsFromApi.data.results.map(p =>{
    return {
      id: p.id,
      name: p.name
    }
  })
}

module.exports = {getPlatforms}