const axios = require("axios")
const { Videogame, Genre } = require('../db.js')
const { Op } = require('sequelize');
require("dotenv").config()
const { DB_API_KEY } = process.env;
//const API_URL = `https://api.rawg.io/api/games?search`
const getGameByName = async(name)=>{
  
   // Buscamos en la base de datos los juegos que contengan la palabra recibida
   const responseDB = await Videogame?.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
    attributes: ['id', 'name', 'description', 'plataforms', 'image', 'released', 'rating', 'created'],
    include: [{
        model: Genre,
        attributes: ['name'], // Para que solo me traiga el atributo name del modelo género
        through: { attributes: [] } // Para no traer la tabla intermediaria de los modelos Videogame y Genre
    }],
});
   //BUSCO EN LA API SI EXISTE EL NOMBRE
    const response = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${DB_API_KEY}`);

    const responseAPI = response.data.results?.map(game => ({
        id: game.id,
        name: game.name.toLowerCase(),
        description:game.description,
        plataforms:game.platforms?.map(element => element.platform.name).join(" | "),
        image: game.background_image,
        genres: game.genres?.map(element=> element.name).join(" | "),
        released: game.released,
        rating:game.rating
    }))

    
    const totalGame = [...responseDB,...responseAPI]
    return totalGame.slice(0,15);   
}
module.exports = {getGameByName};