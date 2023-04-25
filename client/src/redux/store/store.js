import { applyMiddleware, compose, createStore } from 'redux';
import reducer from '../reducer/reducer';                                                    // El reducer actualizará el estado de la aplicación
import thunkMiddleware from 'redux-thunk';                                          // Permite que las Actions retornen funciones asíncronas, en lugar de acciones directamente

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;     // Esta linea es para conectar con la extensión del navegador => REDUX DEVTOOOLS

const store = createStore(                                                          // Crea el store, pasando el reducer y el resultado de llamar a composeEnhancer. Esto crea 
    reducer,                                                                        // una instancia del store con el MW redux-thunk aplicado
    composeEnhancer(applyMiddleware(thunkMiddleware))                               // Esta linea es para poder hacer peticiones a un server
);


export default store;




/* applyMiddleware: Esta función se utiliza para aplicar middleware a un store de Redux. El middleware es una capa de software que 
                    se ejecuta entre la acción y el reducer en una aplicación de Redux. Permite realizar tareas adicionales en la 
                    aplicación, como el manejo de peticiones asíncronas, el registro de acciones o la implementación de lógica 
                    adicional antes de que una acción llegue al reducer.

compose: Esta función se utiliza para combinar varias funciones en una sola función. Es comúnmente utilizada para combinar varios 
        middleware en una única función.

createStore: Esta función se utiliza para crear un store de Redux. Toma como argumento un reducer y devuelve un objeto que 
            representa el store. El store almacena el estado de la aplicación y proporciona métodos para acceder y actualizar 
            el estado; como getState(), dispatch(action) */