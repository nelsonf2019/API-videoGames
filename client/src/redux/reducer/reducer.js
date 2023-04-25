import { GET_GAMES,GET_GENRES,FILTER_CREATED,ORDER_BY_NAME, ORDER_BY_GENRES, ORDER_BY_RATING, GET_BY_NAME, GET_BY_ID, CLEAN_DETAIL, ADD_VIDEO_GAME,GET_PLATFORMS } from "../action/types"
 
const initialSate = {
    games:[],
    allGames:[],
    detailsGame:{},
    genres:[],
    platforms:[]
}



const rootReducer=(state=initialSate, action)=>{
    switch (action.type) {
        case GET_GAMES:
            return{
                ...state,
                games: action.payload,
                allGames:action.payload
            }
        case ADD_VIDEO_GAME:
            state.allGames.push(action.payload);
            return{
                ...state,
                games:[...state.allGames]
            }
        case GET_BY_ID:
            return {
                ...state,
                detailsGame: action.payload
            }
        case GET_GENRES:
            return{
                ...state,
                genres:action.payload
            }
        case GET_PLATFORMS:
            return {
                ...state,
                platforms: action.payload
            }
        case GET_BY_NAME:
            return{
                ...state,
                games:action.payload
            }
        case CLEAN_DETAIL:
            return {
                ...state,
                detailsGame: []
            }
        case FILTER_CREATED:
         //luego filtramos ese estado 
         const createdFilter =
          action.payload === "created" ? state.allGames.filter(ele => ele.created) : state.allGames.filter(ele=> !ele.created)
         
         return{
            ...state,
            //luego ese valor filtrado loa asignamos al esatdo games
            games: createdFilter
         } 
        case ORDER_BY_NAME:
            let orderName = [...state.games];

            if (action.payload === 'Asc') {
                orderName.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                })
            } else {
                orderName.sort((a, b) => {
                    if (a.name < b.name) return 1;
                    if (a.name > b.name) return -1;
                    return 0;
                })
            }
         return{
            ...state,
            games:orderName
            }  
        case ORDER_BY_GENRES:
            const videoGamesG = state.allGames
           
            let gameGenre = action.payload === 'All' 
            ? state.allGames                          //debemos aplicar map, porque genres es un array de string
            : videoGamesG.filter((game) => {
                return !game.created
                ? game.genres.includes(action.payload)
                : game.genres.map((gen)=> gen.name).includes(action.payload)
            })
            //si selecciono otro entonces mostrar todos los Video Juegos
            if (gameGenre.length === 0) {
                gameGenre = [...state.games];
                alert('No videogames found with the selected genre.')
            }
            
            return{
                ...state,
                games: gameGenre
            }
        case ORDER_BY_RATING:

            // let gameRating = [...state.allGames];

            // if (action.payload === '0-5') {
            //     gameRating.sort((a, b) => a.rating - b.rating);
            // } else {
            //     gameRating.sort((a, b) => b.rating - a.rating);
            // }

            // if(action.payload === undefined || action.payload === '') gameRating = [...state.allGames];
            let gameRating = [...state.games]
            let aux = [...state.games]
            gameRating.sort((a, b) => {
                if (action.payload === "none") {
                  return aux;
                } else if (action.payload === "0-5") {
                  return a.rating - b.rating;
                } else {
                  return b.rating - a.rating;
                }
              });
            return {
                ...state,
                games:gameRating
            }
         
        default:
            return{
                ...state
            }
            
    }

}

export default rootReducer;