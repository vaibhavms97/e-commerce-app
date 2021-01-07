export const value = (value) => {
    return {
        type: 'Changevalue',value
    }
}

export const addToCart = (product) => {
    return {
        type: 'AddToCart',product
    }
}

export const isLoggedIn = (value) => {
    return {
        type: 'isLogged',value
    }
}

export const userId = (userId) => {
    return {
        type: 'userId',userId
    }
}


export const displayComponents = (componentName) => {
    return {
        type: 'displayComponent',componentName
    }
}

export const currentPage = (pageNum) => {
    return{
        type:'currentPage',pageNum
    }
}

export const handleFilterChange = (value) => {
    return{
        type:'filterChange',value
    }
}