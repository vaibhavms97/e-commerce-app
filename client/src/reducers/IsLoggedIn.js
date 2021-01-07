const inistialState = {
    isLoggedIn:false
}

const isLoggedInReducer = (state= inistialState,action) => {
    console.log(action)
    switch(action.type){
        case 'isLogged':
            return {...state, isLoggedIn:action.value};
        default:
            return state;

    }
    
}

export default isLoggedInReducer;