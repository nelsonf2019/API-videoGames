const { Router } = require('express');
const { gamesRouter } = require('../routes/gamesRouter')
const { genresRouter } = require("../routes/genresRoute")
const { platformsRouter } = require("../routes/platformsRouter")

const getGVByid  = require("../controllers/getGVByid")


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/videogames', gamesRouter);
router.use('/genres', genresRouter);
router.get("/videogames/:id", getGVByid)
router.use("/platforms", platformsRouter)

module.exports = router;






// const axios = require("axios");
// const Videogame = require("../models/Videogame");
// const { API_KEY, URL } = process.env;

// const getVideoGamesById = async (id) => {
//   const videogame = await Videogame.FindbyPk(id, {
//     include: {
//       model: Genre,
//       attributes: ["name"],
//       through: {
//         attributes: [],
//       },
//     },
//   });
//   if (!videogame) throw Error("No se pudo obtener el videojuego");
//   return videogame;
// };