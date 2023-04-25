const  axios = require("axios")
const { Videogame } = require("../db")
const { Genre } = require("../db")
const { DB_API_KEY } = process.env;

//const API_URL = `https://api.rawg.io/api/games?key=${DB_API_KEY}`;

//const UUDI_Regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
const getGVByid = async(req, res)=>{
    //if (UUDI_Regex.test(id)){
    let videogames;
    const { id } = req.params;

    if(isNaN(id)){
         videogames = await Videogame.findByPk(id,{
            include:{
                model: Genre,
                attributes:["name"],
                through:{attributes:[]}
            }
        })
        return res.status(200).json(videogames)
    } 
        axios.get(`https://api.rawg.io/api/games/${id}?key=${DB_API_KEY}`).
        then((response)=> {
            const { id, name, description, platforms, background_image, released, rating, genres } = response.data
            videogames =  { id, name, description, 
                            platforms:platforms.map(ele => ele.platform.name).join(" | "),
                            background_image, released, 
                            rating, 
                            genres: genres.map(ele => ele.name).join(" | ") }
        
            return res.status(200).json(videogames);
            
        }).catch((error)=>{res.status(500).json({error:error.message})});
  
    //if (!videogames) throw new Error(`Existe un problema con la busqueda del video juego con el : ${id}`);
    console.log(videogames)
    return videogames
    
}

module.exports =  getGVByid;

