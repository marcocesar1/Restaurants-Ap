import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function useRestaurants() {

    const { restaurants, isLoading, isLoaded } = useSelector(state => state.restaurants);
    const { types: food_types } = useSelector(state => state.food_types);

    const [restaFilter, setRestaFilter] = useState(restaurants);

    const filterByFood = filter => {
        if(!filter){
            setRestaFilter(restaurants);
            return;
        }
        const filterResta = restaurants.filter(resta => resta.food_type.indexOf(filter) !== -1 );
        setRestaFilter(filterResta);
    }

    const findRestaurant = slug => restaurants.find(resta => resta.slug === slug);

    useEffect(function(){
        setRestaFilter(restaurants);
    }, [ restaurants ]);

    return {
        restaurants: restaFilter,
        food_types,
        isLoading,
        isLoaded,
        filterByFood,
        findRestaurant
    }
}