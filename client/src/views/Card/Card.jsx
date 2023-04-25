import { Link, useNavigate } from "react-router-dom";
import styles from "./Card.module.css"
const Card = ({ id, name, image, genre })=>{
    const navigate = useNavigate();
    function handleDetialClick(){
        navigate(`/detail/${id}`)
    }
    return(
        <div    onClick={handleDetialClick} 
                className={styles.cardsContainer}>
            <h3>{name}</h3>
            <h5>{genre}</h5>
            <img src={image} alt={name} width="200px" height="150px"/>
        </div>
    )
}

export default Card;