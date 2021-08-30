import { types } from "../types/types";

const INITIAL_STATE = {
    restaurants: [],
    isLoading: false,
    isLoaded: false,
    active: { reviews: [] }
}

export const restaurantsReducer = ( state = INITIAL_STATE, action ) => {

    switch (action.type) {

        case types.restaLoading : return {
            ...state,
            isLoading: action.payload
        }

        case types.restaDataLoaded : return {
            ...state,
            isLoaded: true,
            restaurants: action.payload
        }

        case types.restaSetActive: return{
            ...state,
            active:{
                ...state.active,
                ...action.payload
            }
        }

        case types.restaAddNew: return {
            ...state,
            restaurants: [
                action.payload,
                ...state.restaurants
            ]
        }

        case types.restaUpdate: return{
            ...state,
            restaurants: state.restaurants.map(
                resta => ( resta.slug === action.payload.slug ) ? action.payload : resta
            )
        }

        case types.restaDelete: return{
            ...state,
            restaurants: state.restaurants.filter(resta => resta.slug !== action.payload)
        }

        case types.restaAddReviewActive: return {
            ...state,
            active: {
                ...state.active,
                reviews: [
                    action.payload,
                    ...state.active.reviews,
                ]
            }
        }
        
        default: return state;
    }

}