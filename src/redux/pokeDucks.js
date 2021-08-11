import axios from 'axios'
// Constantes
const dataInicial = {
    array: [],
    offset: 0
}

const OBTENER_PEKEMONES_EXITO = "OBTENER_PEKEMONES_EXITO";
const SIGUIENTE_PEKEMONES_EXITO = "SIGUIENTE_PEKEMONES_EXITO";

// Reducer
export default function pokeReducer (state = dataInicial, action) {
    switch (action.type) {
        case OBTENER_PEKEMONES_EXITO:
            return {
                ...state, 
                array: action.payload
            };
        case SIGUIENTE_PEKEMONES_EXITO:
            return {
                ...state, 
                array: action.payload.array,
                offset: action.payload.offset
            };
        default:
            return state;
    }
}

// Acciones
export const obtenerPokemonesAccion = () => async (dispatch, getState) => {
    const offset = getState().pokemones.offset;
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
        dispatch({
            type: OBTENER_PEKEMONES_EXITO,
            payload: res.data.results
        });
    } catch (error) {
        console.log(error);
    }
}

export const siguientePokemonesAccion = (numero) => async (dispatch, getState) => {
    const offset = getState().pokemones.offset;
    const siguiente = offset + numero;
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${siguiente}&limit=20`);
        dispatch({
            type: SIGUIENTE_PEKEMONES_EXITO,
            payload: {
                array: res.data.results,
                offset: siguiente
            }
        });
    } catch (error) {
        console.log(error);
    }
}