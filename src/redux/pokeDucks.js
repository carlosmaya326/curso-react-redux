import axios from 'axios'
// Constantes
const dataInicial = {
    array: []
}

const OBTENER_PEKEMONES_EXITO = "OBTENER_PEKEMONES_EXITO";

// Reducer
export default function pokeReducer (state = dataInicial, action) {
    switch (action.type) {
        case OBTENER_PEKEMONES_EXITO:
            return {
                ...state, 
                array: action.payload
            };
        default:
            return state;
    }
}

// Acciones
export const obtenerPokemonesAccion = () => async (dispatch, getState) => {
    try {
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=20&limit=20");
        dispatch({
            type: OBTENER_PEKEMONES_EXITO,
            payload: res.data.results
        });
    } catch (error) {
        console.log(error);
    }
}