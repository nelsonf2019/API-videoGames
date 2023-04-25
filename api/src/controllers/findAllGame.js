const { Videogame } = require('../db.js')
const { Genre } = require('../db.js')
require('dotenv').config();
const { DB_API_KEY } = process.env;
const { getVideoGamesAPI } = require('./getVideoGamesAPI.js')

const API_URL = `https://api.rawg.io/api/games?key=${DB_API_KEY}`;

// Creamos la función de getAllGames donde retorna un arreglo de objetos, donde cada objeto es un videojuego con su información incluyendo los géneros asociados
const findAllvGames = async () => {

    // Buscamos en la base de datos todos los videojuegos
    const gameDB = await Videogame.findAll({
        // include: [{ model: Genre }]
        // attributes: ['id', 'name', 'description', 'platforms', 'image', 'released', 'rating', 'created'],
        include: [{
            model: Genre,
            attributes: ['name'], 
            through: { attributes: [] } 
        }],
    });

    // Busco de la api los 100 juegos que existan
    const gameApi = await getVideoGamesAPI(API_URL);
    

    const gameComplit = [...gameDB, ...gameApi];

    if (gameComplit.length === 0) throw new Error('No se encuentra ningún video juego');

    // son 100 videojuegos de la db y de la api
    // hago un slice para que solo tome los 100 juegos primeros
    return gameComplit.slice(0, 100);
};

// Exportamos la función para que sea utilizada por quien la requiera
module.exports = { findAllvGames };

