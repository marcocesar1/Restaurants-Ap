
import { fetchWithFile, fetchRequest } from '../helpers/api';
import { parseRestaurants } from '../helpers/parseData';
import { types } from '../types/types';

export const restaGetData = () => {
    return async (dispatch) => {
        dispatch( restaLoading(true) );
        try{
            const res = await fetchRequest('restaurants/', {});
            const data = await res.json();
            const parseRating = parseRestaurants(data);

            dispatch( restaDataLoaded(parseRating) );
            dispatch( restaLoading(false) );
        }catch(err){
            dispatch( restaLoading(false) );
        }
    }
}

const restaDataLoaded = payload => ({
    type: types.restaDataLoaded,
    payload
});

const restaLoading = payload => ({
    type: types.restaLoading,
    payload
});

export const restaSetActive = payload => ({
    type: types.restaSetActive,
    payload
});

export const restaAddReviewActive = payload => ({
    type: types.restaAddReviewActive,
    payload
});

export const restaStartUpdate = ( formData, setIsUpdated ) => {
    return async (dispatch) => {
        dispatch( restaLoading(true) );
        setIsUpdated(false);
        try{
            const res = await fetchWithFile(formData);
            const data = await res.json();

            dispatch( restaUpdate(data) );
            dispatch( restaLoading(false) );
            setIsUpdated(true);
        }catch(err){
            console.log(err)
            dispatch( restaLoading(false) );
        }
    }
}

export const restaUpdate = payload => ({
    type: types.restaUpdate,
    payload
});

export const restaStartAdd = (formData, setIsCreated, resetForm) => {
    return async (dispatch) => {
        setIsCreated(false);
        dispatch( restaLoading(true) );
        try{
            const res = await fetchRequest('restaurants/', formData, 'POST');
            const data = await res.json();

            dispatch( restaAddNew(data) );
            dispatch( restaLoading(false) );
            setIsCreated(true);
            resetForm();
        }catch(err){
            console.log(err)
            dispatch( restaLoading(false) );
        }
    }
}

const restaAddNew = payload => ({
    type: types.restaAddNew,
    payload
});

export const restaStartDelete = slug => {
    return async (dispatch) => {
        dispatch( restaLoading(true) );
        try{
            await fetchRequest(`restaurants/${slug}/`, {}, 'DELETE');
            dispatch( restaDelete(slug) );
            dispatch( restaLoading(false) );
        }catch(err){
            console.log(err)
            dispatch( restaLoading(false) );
        }
    }
}

const restaDelete = payload => ({
    type: types.restaDelete,
    payload
});
