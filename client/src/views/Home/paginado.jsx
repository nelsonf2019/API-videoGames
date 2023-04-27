import React from "react";
import styles from "./Paginado.module.css"

const Paginado =({videogamesPerPage,allGames, paginado})=>{
    const pageNums=[]      //redondemamos el número con ceil
    for(let i = 0; i < Math.ceil(allGames/videogamesPerPage); i++){
        pageNums.push(i+1)
    }
    return(

        <nav>
            <div  className={styles.contianerPaginado}>
                
                {
                    pageNums?.map(num =>(
                        <button key={num} onClick={()=> paginado(num)}>{num}</button>                 
                        )   
                    )
                }
            
            </div>         
        </nav>
    )
}

export default Paginado;