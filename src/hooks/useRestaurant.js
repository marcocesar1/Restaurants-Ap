import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restaSetActive } from '../actions/restaurants';
import { fetchRequest } from '../helpers/api';

const useRestaurant = ( slug ) => {

    const { restaurants, active } = useSelector(state => state.restaurants);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const restaFromCache = restaurants.find(resta => resta.slug === slug);
    
    useEffect(() => {
        if(restaFromCache){
            dispatch( restaSetActive(restaFromCache) );
            return;
        }else{
            setIsLoading(true);
            fetchRequest(`restaurants/${slug}/`, {}).then(res => res.json())
            .then(data => {
                dispatch( restaSetActive(data) );
                setIsLoading(false);
            });
        }            
    }, [ dispatch, restaFromCache, slug, setIsLoading ]);


    return {
        restaurant: active,
        isLoading
    }
}

export default useRestaurant;