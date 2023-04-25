const { Router } = require('express');

//IMPORTO LOS CONTROLADORES
const { findAllvGames } = require("../controllers/findAllGame")
const { getGameByName } = require("../controllers/getGameByName")
const { postVideoGameBD } = require("../controllers/postVideoGameBD")
//const { getGVByid } = require("../controllers/getGVByid")
const gamesRouter = Router();

//la ruta :id se encuentra en el index
gamesRouter.get("/name", async(req, res)=>{

    try {
        const { name }  = req.query;

        const response = await getGameByName(name)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({message: error.message})
    }

})
//ruta a get de los videos juegos

gamesRouter.get("/", async(req, res)=>{
    try {
        const response = await findAllvGames();
        return res.status(200).json(response)

    } catch (error) {
        res.status(404).json({error:error.message})
    }
})
gamesRouter.post("/", async(req, res)=>{
    try {  

        const  { name, description, plataforms, image, released , rating, genres} = req.body
       
        const response = await postVideoGameBD({ name, description, plataforms, image, released , rating, genres})
       // console.log({ name, description, plataforms, image, released , rating, genres})
        res.status(201).send("the games successfully created || El juego a sido creado sastifactoriamente")//201 cuando se crea algo
    } catch (error) {
        res.status(500).send(error.message)// error del lado del cliente
    }
})

module.exports = { gamesRouter }
// const getAllVideoGamesApi = async()=>{
//     const apiUrl = await axios(URL_API);
//     const response = apiUrl.data.results.map(el =>{
//         return{
//             id: el.id,
//             name: el.name,
//             description: el.description,
//             image: el.background_image,
//             released: el.released, // Fecha de publicación
//             rating: el.rating,
//             platforms: el.platforms.map(game => game.platform.name),
//             genres: el.genres.map(vg => vg.name), //hacemos un map para poder obtner un arreglo con los names de cada genre
//             created: false,

//         };
//     });
//     return response;
// }

// const getfindAllbd = async()=>{
//     return await Videogame.findAll({

//         include: [
//             {
//               model: Genre,
//               attributes: ["name"],
//               through: {
//                 attributes: []
//              },
//             },
//           ],
//     })
// }

// /////-------------ruta----------
// gamesRouter.get("/", async(req, res)=>{
//     const response = await getAllVideoGamesApi();
//     //si no tiene nada
//     if(!response.error)
//     return res.status(200).json(response);
//     return res.status(503).send("Datos no buscado")
// })
// //si recibe la info por query, recibe un dato como ejemplo
// // si recibe la info por body, recibe un objeto el cual se puede desestructurar

// ///-----Hacemos un get y treamos todos, desde la base de datos y desde la api
// //me devuelve doto api más db
// const getAllVideoGame = async()=>{
//     const apiInfo = await getAllVideoGamesApi();
//     const dbInfo = await  getfindAllbd();
//     const infoTodo = apiInfo.cancat(dbInfo);
//     return infoTodo;
// }
// //-------le pega a la ruta con name
// gamesRouter.get("/name", async(req, res)=>{
//     const name = req.query.name.toLowerCase();
//     const infoTotaldb = getAllVideoGame();
//     if(name){
//         let gameName = await infoTotaldb.filter(element => element.name.toLowerCase().includes(name))
//         gameName.length ?
//         res.status(200).json(gameName) :
//         res.status(404).send("No se encuentra el personaje")
//     }else{
//         res.status(200).send(infoTotaldb)
//     }
// })


