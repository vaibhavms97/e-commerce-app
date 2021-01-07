const initialState = {
    displayComponents : undefined
}


const displayComponentReducer = (state= initialState,action) => {
    console.log(action)
    switch(action.type){
        case 'displayComponent':
            return {...state, displayComponents:action.componentName};
        default:
            return state;

    }
    
}

export default displayComponentReducer;