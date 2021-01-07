const intialState = {
    currentPage : 1
}

const currPageReducer = (state= intialState,action) => {
    console.log(action)
    switch(action.type){
        case 'currentPage':
            return {...state, currentPage:action.pageNum};
        default:
            return state;

    }
    
}

export default currPageReducer;