import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../../redux/action/actions";

const SearchBar = ()=>{

    const [name, setName] = useState("")

     const dispatch = useDispatch();

     function handleInputChange(event){
        event.preventDefault()
        setName(event.target.value);
        console.log(name)
     } 
     const handleSubmit =(event)=>{
        event.preventDefault()
        dispatch(getNameVideogames(name))
      //  console.log(dispatch(getNameVideogames(name)))
     }  

    return(

        <div>
         <h1>Soy la searchbar </h1>
         <input 
            type="search"
            placeholder="Searchar by name..."
            onChange={(event)=>handleInputChange(event)}      
        />
         <button type="submit" onClick={(event)=>{handleSubmit(event)}} >Agregar</button>
        </div>
    )
}

export default SearchBar;