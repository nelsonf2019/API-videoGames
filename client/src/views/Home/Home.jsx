import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";//hooks
import { getVideogames, getGenres, filterCreated, orderName, filterGenres, filterRating } from "../../redux/action/actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "./paginado"
import SearchBar from "../SearchBar/SearchBar";
import styles from "./HomeAndPaginated.module.css"
import Form from "../Form/Form"

const   Home =()=>{
    const dispatch = useDispatch();
    const allGames = useSelector((state)=> state.games)
    const allGenres = useSelector((state)=> state.genres)
    //#region ///////// estado para paginado
    //empezamos con un estado para la paginación
    const [currentPage, setcurrentPage] = useState(1)//un estado con la pagina actual y un estado q setee la pagina actual 
    const [videogamesPerPage, setvideogamesPerPage] = useState(15)//cuantos videos tenemos por página y un estado q setee la página
    //el indice del ultimo video por página 
    const indexOfLastVideogames = currentPage * videogamesPerPage //15
    //indice del primer personaje
    const indexOfFirstVideogames = indexOfLastVideogames - videogamesPerPage//0
    //que me guarde todos los juegos por página
    const currentVideogame = allGames.slice(indexOfFirstVideogames, indexOfLastVideogames);
    //                                                                    
    const [order, setOrder] = useState("")
    //#endregion //////fin paginado
    const paginado =(pageNum)=>{
        setcurrentPage(pageNum)
    }
    //USAMO useEffect PARA MONTAR EL COMPONENTE
    useEffect(()=>{
        dispatch(getVideogames())
    },[])//ponemos un array vacío ya que sino la accion se dispara infinitamente
    const handleFilterCreated =(event)=>{

        dispatch(filterCreated(event.target.value));
    }
    const handleFilterGenres =(event)=>{
        event.preventDefault();
        dispatch(filterGenres(event.target.value))
    }
    const hanldeOrderRating =(event)=>{
        event.preventDefault();
        dispatch(filterRating(event.target.value))
    }
    const handleClick=(event)=>{
        event.preventDefault();
        dispatch(getVideogames());
    }
    const handleOrderByName=(event)=>{
        event.preventDefault();
        dispatch(orderName(event.target.value));
        setcurrentPage(1);//seteo la página para que comienze desde la 1
        setOrder(`Ordenado ${event.target.value}`)
    }
    useEffect(()=>{
        dispatch(getGenres());
    },[])
    //#region return components
    return(
        <>
            <Form 
              allGenres ={allGenres}

            />
        </>,
        <div className={styles.containt}>   
           <Link to="/create">Crear Juego</Link>
            <button onClick={handleClick}>
                volver a cargar los juegos
            </button>

            <select onChange={handleFilterGenres}>
                //filtrado por genres
            <option>Filtrar por Genero</option>
            <option value="All">Todos</option>
                 {
                    allGenres?.map((genre)=>(
                        <option key={genre.id} value={genre.name}>{genre.name}</option>
                    ))
                 }
            </select>
            <div>
              
            </div>
            <select onChange={hanldeOrderRating}>
                <option>Por orden de Rating</option>
                <option value="0-5">Ascendente</option>
                <option value="5-0">Descendente</option>
            </select>
            <select onChange={handleOrderByName}>
                <option value="none">Por orden alfbetico</option>
                <option value="Asc">Ascendente</option>
                <option value="Desc">Descendente</option>
            </select>
            <select onChange={handleFilterCreated}>
                <option value="All">Todos</option>
                <option value="created">Creados</option>
                <option value="api">Existentes</option>
            </select>
            {/* //les paso las props al componente paginado como variables */}
            <Paginado 
                videogamesPerPage={videogamesPerPage}
                allGames={allGames.length}
                paginado={paginado}
             />
            <SearchBar />
            {
              currentVideogame?.map(ele=>{
                    return(
                        <Card
                        key={ele.id}
                        id={ele.id}
                        name={ele.name}
                        image={ele.image}
                        genre={ele.created ? ele.genres.map(ele => ele.name).join(" | ") : ele.genres }
                    />
                    )
                })
            }
             <Paginado 
                videogamesPerPage={videogamesPerPage}
                allGames={allGames.length}
                paginado={paginado}
             />
        </div>
    )
    //#region fin return componente
}

export default Home;