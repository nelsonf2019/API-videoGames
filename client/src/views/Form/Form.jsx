import { useEffect, useState } from "react";
import { postVideoGame, addGame,getGenres,getPlatforms } from "../../redux/action/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import  validate from "./validate"
import styles from "./Form.module.css"

const Form = ()=>{
    const dispatch = useDispatch();
    const genres = useSelector(state => state.genres);
    const platforms = useSelector(state => state.platforms)
    useEffect(()=>{
        dispatch(getPlatforms())
        dispatch(getGenres())
    },[])
    //guardamos genres en una variable
    const optionsGenres = Array.isArray(genres)
    ? genres.map((genre) => ({
        id: parseInt(genre.id),
        name: genre.name,
    }))
    : [];
    //guardamos platforms en una variable
    const optionsPlatforms = Array.isArray(platforms)
    ? platforms.map((platform) => ({
        id: parseInt(platform.id),
        name: platform.name,
    }))
    : [];
    

    const [form, setForm] = useState({
        name: '',
        description: '',
        plataforms: [],
        image: '',
        released: '',
        rating: '',
        genres: [],

    })

    const [errors, setErrors] = useState({
        name: '',
        description: '',
        plataforms: '',
        image: '',
        released: '',
        rating: '',
        genres: '',
    });
  //FUNCION QUE GUARDA LOS DATOS DESDE LOS INPUT
  const changeHandler =(event)=>{
    const property = event.target.name
    const value = event.target.value
    setForm({
        ...form,
        [property]:value
    })
    // setErrors(
    //     validate({
    //         ...form,
    //         [property]: value
    //     })
    // );
}
///FUNCION QUE GUARDA LAS PLATFORMS EN EL ARRAY DESDE LOS BOTONES
const handleClickPlatform=(event)=>{
    event.preventDefault()
    if(form.plataforms.includes(event.target.value)){
        alert(`La plataforma ${event.target.value}  ya existe, intente con otra}`)
    }else{
        setForm({
            ...form,
            plataforms:[...form.plataforms, event.target.value]
        })
        // setErrors(
        //     validate({
        //         ...form,
        //         plataforms: [...form.plataforms, event.target.value]
        //     })
        // );
         
    }
}
///FUNCION QUE GUARDA LOS GNERES EN EL ARRAY DESDE LOS BOTONES
const handleClickGenres =(event)=>{
     event.preventDefault()
     
     if(form.genres.includes(event.target.value)){
        alert(alert(`EL género ${event.target.value} ya existe, intente con otra`))
       
     }else{
        setForm({
            ...form,
            genres:[...form.genres, event.target.value]
         })
        //  setErrors(
        //     validate({
        //         ...form,
        //         genres:[...form.genres, event.target.value]
        //     })
        // );
     }
     
     
}

      // MENAJAMOS CON ESTES ESTADO QUE NO TENGA CAMPOS VACIOS ANTES DE ENVIAR
      const [disabled, setDisabled] = useState(true);

    //   const checkComplit = () => {
    //     if (
    //         form.name === "" ||
    //         form.description === "" ||
    //         form.plataforms.length === 0 ||
    //         form.image === "" ||
    //         form.released === "" ||
    //         form.rating === "" ||
    //         form.genres.length === 0
    //     ) {
    //         return true;
    //     }
    //     return false;
    // };

    // useEffect(() => {
    //     setDisabled(checkComplit());
    // }, [form]);
  
    
    const submitHandler=(event)=>{
        event.preventDefault()
        const createVideoGames = dispatch(postVideoGame(form))
        //  const createVideoGames = form
        if(createVideoGames){
          dispatch(addGame(createVideoGames))
           console.log(form)
            setForm({
                name: '',
                description: '',
                plataforms: [],
                image: '',
                released: '',
                rating: '',
                genres: [],
            })
        }

    }
    return(
        <div className={styles.containerForm}>
          <form onSubmit={submitHandler}>

                    <hr />
                    <input 
                        placeholder="Nombre..." 
                        type="text"
                        onChange={changeHandler}
                        name="name"
                        value={form.name}
                    />
                       {/* <p>{errors.name ? errors.name : ''}</p> */}
                    <hr />
                    <input 
                        placeholder="Fecha..." 
                        type="date" 
                        onChange={changeHandler}
                        name="released"
                        value={form.released}
                    />
                       {/* <p>{errors.released ? errors.released : ''}</p> */}
                    <hr />
                    <input 
                        placeholder="Rating..." 
                        type="text"
                        onChange={changeHandler}
                        name="rating"
                        value={form.rating}
                        />
                        {/* <p>{errors.rating ? errors.rating : ''}</p> */}
                    <hr />
                    <label htmlFor="">Add platforms</label>
                        {
                            optionsPlatforms?.map((pltf)=>(
                                <button 
                                    key={pltf.id} 
                                    value={pltf.name}
                                    name="optionsPlatforms"
                                    onClick={(value)=>handleClickPlatform(value)}
                                >{pltf.name}</button>
                            ))
                        }
                         {/* <p>{errors.plataforms ? errors.plataforms : ''}</p> */}
                    <hr />
                    
                    <input 
                        placeholder="Imagen url..." 
                        type="text"
                        onChange={changeHandler}
                        name="image"
                        value={form.image}    
                        />
                    <hr />
                    <textarea placeholder="Descripción..." 
                         type="text"
                         onChange={changeHandler}
                         name="description"
                         value={form.description} 
                    />
                      {/* <p>{errors.description ? errors.description : ''}</p> */}
                    <hr />

                        {
                            optionsGenres?.map((genre)=>(
                                <button  
                                    className={styles.buttonGernes}
                                    key={genre.name}
                                    value={genre.name}
                                    name="optionsGenres"
                                    onClick={(value)=>handleClickGenres(value)}
                                    
                                >{genre.name}</button>
                            ))
                        }
                        {/* <p>{errors.genres ? errors.genres : ''}</p> */}
                    <hr />

                    <button >to Back home</button>
                    <hr />
                    <button type="submit"  >CREATE</button> 
                    {/* disabled={disabled} */}
            </form>
        </div>
    )
}

export default Form;