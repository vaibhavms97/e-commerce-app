const initialState = {
    filterChange: false
}

const filterChangeReducer = (state= [],action) => {
    console.log(action)
    switch(action.type){
        case 'filterChange':
            return {...state, filterChange:action.value};
        default:
            return state;

    }
    
}

export default filterChangeReducer;