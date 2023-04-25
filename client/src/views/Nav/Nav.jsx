import { Link, useLocation } from "react-router-dom";
import  SearchBar  from "../SearchBar/SearchBar"
const Nav = ()=>{
    return(
        <div>
        <Link to="/">
            <button>Logout</button>
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
           
        </div>
    )
}

export default Nav;
