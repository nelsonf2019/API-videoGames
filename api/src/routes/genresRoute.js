const { Router } = require('express');
//const {getGenresApi} = require("../controllers/getGenresApi");
const { saveGenresDB } = require("../controllers/saveGenresDB")


const genresRouter = Router();

genresRouter.get("/", async (req, res)=>{
 try {  
        const response = await saveGenresDB();
        if(!response) throw Error("Tiene problemas para consultar las categorias")
        res.status(200).json(response);
    } catch (error) {
        res.status(404).send(error.message);
    }   
})

module.exports = { genresRouter }