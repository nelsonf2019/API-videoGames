const { Genre } = require("../db");
const axios = require('axios');
require('dotenv').config();
const { DB_API_KEY } = process.env;
const URL_API = `https://api.rawg.io/api`;

const saveGenresDB = async()=>{
       const buscarGenerosDB = await Genre.findAll();
       if(buscarGenerosDB.length===0){
              const response = await axios.get(`${URL_API}/genres?key=${DB_API_KEY}`);             
              // Hacemos un map y solo traemos el nombre de cada género
              const allGenres = response?.data?.results?.map((genre)=>{
                     return{
                            name:genre.name
                     }
              })
              // el bulkCreate => permite pasarle un array de objetos y los crea todos juntos en la Base de Datos
              await Genre.bulkCreate(allGenres);            
              return allGenres;
       }
      
       return buscarGenerosDB;
       // Traemos el results de la api     
}
module.exports = {saveGenresDB};