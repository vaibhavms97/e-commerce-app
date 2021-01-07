import { combineReducers } from 'redux';
import addToCartReducer from './addToCart';
import currPageReducer from './currentPage';
import displayComponentReducer from './displayComponent';
import filterChangeReducer from './filterChange';
import isLoggedInReducer from './IsLoggedIn';
import searchBarValueReducer from './searchBarValue';
import userIdReducer from './UserId';

const allReducers = combineReducers({
    searchedValue: searchBarValueReducer,
    cart: addToCartReducer,
    isLogged: isLoggedInReducer,
    userId: userIdReducer,
    displayComponent : displayComponentReducer,
    currentPage: currPageReducer,
    filterChange : filterChangeReducer
})

export default allReducers