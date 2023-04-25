const axios = require('axios');

const getVideoGamesAPI = async (url, vGames = []) => {

    
    if (vGames.length === 100) return vGames;

    const { next, results } = (await axios(url)).data;

    results.forEach(vg => {
        if (vGames.length < 100) vGames.push({
            id: vg.id,
            name: vg.name,
            description: vg.description,
            image: vg.background_image,
            released: vg.released, // Fecha de publicación
            rating: vg.rating,
            platforms: vg.platforms.map(game => game.platform.name).join('  |  '),
            //genres: vg.genres,
            genres: vg.genres.map(vg => vg.name).join(" | "), //hacemos un map para poder obtner un arreglo con los names de cada genre
            //created: false,
        });
    });
  
    return getVideoGamesAPI(next, vGames);
};

module.exports = { getVideoGamesAPI };