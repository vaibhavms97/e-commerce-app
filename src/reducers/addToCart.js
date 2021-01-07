const addToCartReducer = (state= [],action) => {
    console.log(action)
    switch(action.type){
        case 'AddToCart':
            return [...state, action.product];
        default:
            return state;

    }
    
}

export default addToCartReducer;