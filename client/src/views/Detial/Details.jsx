import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getDetailGame,cleanDetail } from "../../redux/action/actions";
import styles from "./Details.module.css"

const Details = ()=>{
    const { id } = useParams();
    const dispatch = useDispatch();
    console.log(id)
    useEffect(()=>{
        dispatch(getDetailGame(id))
        return ()=>{
            dispatch(cleanDetail())
        }
    },[])
    //console.log(detailsGame)
    const detailsGame = useSelector(state => state.detailsGame); 
    
    return(
        
      <div className={styles.container} >
            {
                detailsGame.name ? (
                    <div >
                        <h2>ID: {detailsGame.id}</h2>
                            <h1>Name: {detailsGame.name}</h1>
                            <p>Description: {detailsGame.description.replace(/<[^>]*>?/g, '')}</p>
                            <hr />
                            <p>Realeased: {detailsGame.released}</p>
                            <img src={detailsGame.image ? detailsGame.game : detailsGame.background_image } alt="imagen Video Game" width="800px" height="600px" />
                            <hr />
                            <p>Rating: {detailsGame.rating}</p>
                            <hr />
                            <p>Platforms: {detailsGame.plataforms ? (detailsGame.plataforms).join(" | ") : detailsGame.platforms }</p>
                            <hr />
                            <p>Genres: {!detailsGame.created ? (detailsGame.genres).join(" | ") : detailsGame.genres.map(ele => ele.name).join(" | ")}</p>
                            <hr />
                            
                    </div>
                ): (
                    <div>
                        <h2>...loading</h2>
                    </div>
                )
            }
          
      </div>
    )
}

export default Details;