import { types } from "../types/types";

const INITIAL_STATE = {
    isLoading: false,
    isError: false,
    isReviewSend: false
}

export const reviewsReducer = ( state = INITIAL_STATE, action ) => {

    switch (action.type) {  
        
        case types.reviewsLoading: return {
            ...state,
            isLoading: action.payload
        }

        case types.reviewsError: return {
            ...state,
            isError: action.payload
        }

        case types.reviewsSend: return {
            ...state,
            isReviewSend: action.payload
        }
        
        default: return state;
    }

}