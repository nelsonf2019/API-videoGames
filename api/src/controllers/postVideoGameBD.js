const { Videogame ,Genre } = require("../db");
const { saveGenresDB } = require("./saveGenresDB")


const postVideoGameBD = async({ name, description, plataforms, image, released, rating, genres})=>{
    //pregunto si hay datos en el modelo Genre
    const genresBD = await Genre.count();
    if(genresBD.length === 0) await saveGenresDB();   
    
    if(
       !name ||
       !description ||
       !plataforms ||
       !image ||
       !released ||
       !rating   
       ) throw Error("Datos incompletos, verifique")

    const game = await Videogame.create({
        name:name,
        description:description,
        plataforms:plataforms,
        image:image,
        released:released,
        rating:rating,
    })
    //busca en el modelo Genre si existe el nombre pasado por body
    //lo guarda como un arreglo
    let genreBD = await Genre.findAll({
        where:{ name:genres }
    })
    await game.addGenre(genreBD)
    return game;
}
module.exports = { postVideoGameBD };

