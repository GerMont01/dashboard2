import React, { useReducer, useEffect } from 'react';
export const myContext = React.createContext();


function reducer(state, action) {
    switch (action.type) {
        case 'SESSION':
            return {
                ...state,
                logedin: action.payload
            };
        case 'USER':
            return {
                ...state,
                user: action.payload
            };
        default:
            return {
                ...state
            };
    };
};
const initialState = {
    logedin: false
};

export default function Provider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(()=>{
        fetch('/api/loged')
        .then(res => res.json())
        .then(data => dispatch({type:'SESSION', payload: data}))
        fetch('/login')
        .then(res => res.json())
        .then(user => dispatch({type:'USER', payload: user}))
    },[])

    return(
        <myContext.Provider value={{state, dispatch}}>
            {props.children}
        </myContext.Provider>
    )
}