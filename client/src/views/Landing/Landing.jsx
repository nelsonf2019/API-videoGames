import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

const Landing =()=>{
    return(
        <div className={styles.container}>
            <h1 className={styles.titulos}>Bienvenidos tus juegos </h1>
            <Link to="/home">
                <button>Ingresar</button>
            </Link>
        </div>
    )
}

export default Landing;