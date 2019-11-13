//importing createstore from redux to create an redux store
import  { createStore } from 'redux';

//initalize the initail state
const initialState = {
    timestamp:{
        timeelapsed:'',
        value:''
    },
    isAuthenticated:false,
    user:''
}



function saveToLocalStorage(state){
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state',serializedState);
    } catch (error) {
        console.log(error)
    }
}

function loadFromLocalStorage(){
    try {
        const serializedState = localStorage.getItem('state');
        if(serializedState == null) return undefined;
        return JSON.parse(serializedState);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

const persistedState = loadFromLocalStorage();

//create a redux store with reducer, initailstate
export const store = createStore(
    reducer,
    // initialState,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

)

store.subscribe(()=>saveToLocalStorage(store.getState()))

// export default store;

//Reducer function
function reducer(state=initialState, action){
    switch(action.type){
        case 'GET_DATA':
            return{
                ...state,
                timestamp:action.payload
            }
        case 'GET_DATA_SOCKET':
            return{
                ...state,
                timestamp:action.payload
            }
        case 'REGISTER_USER':
            return{
                ...state,
                isAuthenticated:true,
                user:action.payload
            }
        case 'LOGIN_USER':
            return{
                ...state,
                isAuthenticated:true,
                user:action.payload
            }
        case 'LOGOUT_USER':
            return{
                ...state,
                timestamp:{
                    timeelapsed:'',
                    value:''
                },
                isAuthenticated:false,
                user:''
            }
        case 'CLEAR_DATA':
            return{
                ...state,
                timestamp:{
                    timeelapsed:'',
                    value:''
                },
            }
        default:
            return state;
    }
}


// redux Action
export const getDatasAction =(obj) => ({
        type: 'GET_DATA',
        payload: obj
})

export const getDatasSocketAction = (obj) =>({
    type: 'GET_DATA_SOCKET',
    payload: obj
})

export const registerUserAction = (obj) =>({
    type: 'REGISTER_USER',
    payload: obj
})

export const loginUserAction = (obj) =>({
    type: 'LOGIN_USER',
    payload: obj
})

export const logoutUserAction = () =>({
    type: 'LOGOUT_USER',
    payload:{}
})

export const clearTimeStampdataAction = () =>({
    type:'CLEAR_DATA',
    payload:{}
})