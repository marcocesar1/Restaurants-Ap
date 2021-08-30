import { fetchRequest } from '../helpers/api';
import { parseFoodType } from '../helpers/parseData';
import { types } from '../types/types';


export const foodGetData = () => {
    return async (dispatch) => {
        dispatch( foodLoading(true) );
        try{
            const res = await fetchRequest('/food_types/', {});
            const data = await res.json();
            const parseFood = parseFoodType( data );

            dispatch( foodDataLoaded(parseFood) );
            dispatch( foodLoading(false) );
        }catch(err){
            dispatch( foodLoading(false) );
        }
    }
}

const foodDataLoaded = payload => ({
    type: types.foodDataLoaded,
    payload
});

export const foodStartAdd = (formData, resetForm) => {
    return async (dispatch) => {
        dispatch( foodLoading(true) );
        try{
            const res = await fetchRequest('/food_types/', formData, 'POST');
            const data = await res.json();

            dispatch( foodAdd(data) );
            dispatch( foodLoading(false) );
            resetForm();
        }catch(err){
            dispatch( foodLoading(false) );
        }
    }
}

const foodAdd = payload => ({
    type: types.foodAdd,
    payload
});

export const foodStartUpdate = (slug, formData) => {
    return async (dispatch) => {
        dispatch( foodLoading(true) );
        try{
            const res = await fetchRequest(`/food_types/${slug}/`, formData, 'PUT');
            const data = await res.json();
            
            dispatch( foodUpdate(data) );
            dispatch( foodLoading(false) );
        }catch(err){
            console.log(err)
            dispatch( foodLoading(false) );
        }
    }
}

const foodUpdate = payload => ({
    type: types.foodUpdate,
    payload
});

export const foodStartDelete = slug => {
    return async (dispatch) => {
        dispatch( foodLoading(true) );
        try{
            await fetchRequest(`/food_types/${slug}/`, {}, 'DELETE');
            
            dispatch( foodDelete(slug) );
            dispatch( foodLoading(false) );
        }catch(err){
            console.log(err)
            dispatch( foodLoading(false) );
        }
    }
}

const foodDelete = payload => ({
    type: types.foodDelete,
    payload
});

export const foodEditStatus = payload => ({
    type: types.foodEditStatus,
    payload
});

const foodLoading = payload => ({
    type: types.foodLoading,
    payload
});