import { fetchRequest } from "../helpers/api";
import { types } from "../types/types";
import { restaAddReviewActive, restaUpdate } from "./restaurants";

export const startAddReview = formData => {
    return async (dispatch, getState) => {

        const { active } = getState().restaurants;

        dispatch( reviewsLoading(true) );
        dispatch( reviewsSend(false) );
        try{
            const res = await fetchRequest('reviews/', formData, 'POST');            
            const data = await res.json();
            if(res.status === 400){
                dispatch( reviewsError(true) );
            }else{
                dispatch( restaAddReviewActive(data) );
                const restaUpdated = {
                    ...active,
                    reviews: [
                        data,
                        ...active.reviews
                    ]
                };
                dispatch( restaUpdate(restaUpdated) );                
                dispatch( reviewsSend(true) );
            }
            dispatch( reviewsLoading(false) );
        }catch(error){
            dispatch( reviewsError(false) );
            dispatch( reviewsLoading(false) );
        }
    }
}

const reviewsLoading = boleano => ({
    type: types.reviewsLoading,
    payload: boleano
});

const reviewsError = boleano => ({
    type: types.reviewsError,
    payload: boleano
});

export const reviewsSend = boleano => ({
    type: types.reviewsSend,
    payload: boleano
});