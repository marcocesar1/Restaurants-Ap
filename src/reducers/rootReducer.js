import { combineReducers } from 'redux';

import { restaurantsReducer } from './restaurantsReducer';
import { foodTypesReducer } from './foodTypesReducer';
import { reviewsReducer } from './reviewsReducer';



export const rootReducer = combineReducers({
    restaurants: restaurantsReducer,
    food_types: foodTypesReducer,
    reviews: reviewsReducer,
});

