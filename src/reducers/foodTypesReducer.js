import { types } from "../types/types";

const INITIAL_STATE = {
    types: [],
    isLoading: false,
    isLoaded: false
}

export const foodTypesReducer = ( state = INITIAL_STATE, action ) => {

    switch (action.type) {

        case types.foodLoading : return {
            ...state,
            isLoading: action.payload
        }

        case types.foodDataLoaded : return {
            ...state,
            isLoaded: true,
            types: action.payload
        }       
        
        case types.foodAdd: return {
            ...state,
            types: [
                {...action.payload, isEdit: false},
                ...state.types
            ]
        }

        case types.foodDelete: return {
            ...state,
            types: state.types.filter(type_food => type_food.slug !== action.payload)
        }

        case types.foodEditStatus: return {
            ...state,
            types: state.types.map(
                type_food => ( type_food.slug === action.payload ) ? ({...type_food, isEdit: true}) : ({...type_food, isEdit: false})
            )
        }

        case types.foodUpdate: return {
            ...state,
            types: state.types.map(
                type_food => ( type_food.slug === action.payload.slug ) ? ({...action.payload, isEdit: false}) : type_food
            )
        }
        
        default: return state;
    }

}