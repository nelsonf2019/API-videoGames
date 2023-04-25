import axios from "axios"
import { GET_GAMES,GET_GENRES,FILTER_CREATED,ORDER_BY_NAME, ORDER_BY_GENRES, ORDER_BY_RATING, GET_BY_NAME, GET_BY_ID, DELETE_GAME, ADD_VIDEO_GAME,GET_PLATFORMS,CLEAN_DETAIL } from "./types";


export function getVideogames(){
    return async function(dispatch){  //despues camabiar el puerto a 3001
        const allGames = await axios.get("http://localhost:3003/videogames")
        .catch(error => alert(error.response.data))

        return dispatch({
            type:GET_GAMES,
            payload: allGames.data                     
        }) 
    }
}

export function getGenres(){
    return async function(dispatch){
        const allGenres = await axios.get("http://localhost:3003/genres")
        .catch(error => alert(error.response.data))

        const genre = allGenres.data
        return dispatch({
            type:GET_GENRES,
            payload:genre
        })
    }
}
export function getNameVideogames(name){
    return async function(dispatch){
        const getNameVG = await axios.get(`http://localhost:3003/videogames/name?name=${name}`)
        .catch(error => alert(error.response.data))

        const getName = getNameVG.data

        return dispatch({
            type:GET_BY_NAME,
            payload:getName
        })
    }

}
export function getDetailGame(id){
    return async function(dispatch){
        const getGame = await axios.get(`http://localhost:3003/videogames/${id}`)
        .catch(error =>alert(error.response.data))

        const getGameDetalle = getGame.data

        return dispatch({
            type:GET_BY_ID,
            payload:getGameDetalle
        })
    }
}
export const postVideoGame =(payload)=>{
    return async function(){
       await axios.post("http://localhost:3003/videogames/", payload)
        .then(response => alert(response.data))
        .catch(error => alert(error.response.data))
    }
}  
export const getPlatforms =()=>{
    return async function(dispatch){
        const getPlatforms = await axios.get("http://localhost:3003/platforms")
        .catch(error=>alert(error.response.data))

        const platforms = getPlatforms.data
        return dispatch({
            type:GET_PLATFORMS,
            payload: platforms
        })
    }
}
export const addGame = (game) => {
    return {
        type: ADD_VIDEO_GAME,
        payload: game
    }
};

export const deleteGameCreated = (id) => {
    return async function () {
        await axios.delete(`http://localhost:3001/videogames/games/${id}`)
            .then(response => alert(response.data))
            .catch(error => alert(error.response.data))
    }
}

export const cleanDetail = () => {
    return {
        type: CLEAN_DETAIL
    }
};

export const deleteGame = (id) => {
    return {
        type: DELETE_GAME,
        payload: id
    }
};
export function orderName(payload){
    return{
        type:ORDER_BY_NAME,
        payload
    }
}
export function filterCreated(payload){
    return{
        type:FILTER_CREATED,
        payload
    }
}
export function filterRating(dato){
    return{
        type:ORDER_BY_RATING,
        payload:dato
    }
}

export const filterGenres = (tipo) => {
    return {
        type: ORDER_BY_GENRES,
        payload: tipo
    }
};