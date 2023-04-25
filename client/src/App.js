import './App.css';
//import { About, Details, Form, Home, Landing, Nav, Footer } from "./views/index"
import { Route, Routes,useLocation } from "react-router-dom"
import Landing from "./views/Landing/Landing"
import Home from "./views/Home/Home"
import Footer from "./views/Footer/Footer"
import Details from "./views/Detial/Details"
import Form from "./views/Form/Form"
import Nav from './views/Nav/Nav';
import About from "./views/About/About"
function App() {
  const location = useLocation()
  return (
    <div className="App">
      {
        location.pathname === "/" ? <Landing/>  : <Nav/>
      }
      <Routes>
        
        <Route path='/home' element={<Home />}/>
        <Route path='/about' element={<About />} />
        <Route path='/detail/:id' element={<Details />} />
        <Route path='/create' element={<Form />} />
      </Routes>
      <Footer/>
    
    </div>
  );
}

export default App;
