//const saveGenresDB = require("./saveGenresDB");
const { Genre } = require('../db.js')
const axios = require("axios");
const DB_API_KEY = process.env;
// axios.get(`https://api.rawg.io/api/games/${id}?key=${DB_API_KEY}`).
const URL_API = `https://api.rawg.io/api/genres?key=${DB_API_KEY}`;

const getGenresApi = async()=>{
    // Traemos los géneros de la API
    
    let infoApi = await axios.get(URL_API);
    infoApi = infoApi.data.results;
    
    // Agregamos los géneros a nuestra base de datos
    infoApi.forEach(async (genre) => 
        await Genre.findOrCreate({
            where: {
                name: genre.name
            }
        })
    );
        
    return await Genre.findAll({
        attributes: ['id','name']
    });
}

module.exports = {getGenresApi};