import { Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Nav.module.css"
const Nav = ()=>{
    return(
        <div className={styles.container}>

        <Link to="/">
            <button >Logout</button>
        </Link> 
         <Link to="/about">
            <button>About</button>
         </Link>
         <Link to="/home">
            <button>Home</button>
         </Link>
         <Link to="/create">
            <button>Create</button>
         </Link>
         <SearchBar />
        </div>
    )
}

export default Nav;
