const { Router } = require('express');

const { getPlatforms } = require("../controllers/getPlatforms")

const platformsRouter = Router();

platformsRouter.get("/", async (req, res)=>{
    try {
        const response = await getPlatforms();
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
})

module.exports = {platformsRouter}