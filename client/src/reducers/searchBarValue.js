const initialState = {
    value:""
}

const searchBarValueReducer = (state= initialState,action) => {
    console.log(action)
    switch(action.type){
        case 'Changevalue':
            return {...state, value:action.value};
        default:
            return state;

    }
    
}

export default searchBarValueReducer;