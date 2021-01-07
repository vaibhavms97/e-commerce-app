const initialState = {
    userId:undefined
}

const userIdReducer = (state= initialState,action) => {
    console.log(action)
    switch(action.type){
        case 'userId':
            return {...state, userId:action.userId};
        default:
            return state;

    }
    
}

export default userIdReducer;