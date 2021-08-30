import React from 'react';
import { Grid } from '@material-ui/core';

import useFoodTypes from '../../hooks/useFoodTypes';
import Loader from '../layout/Loader';
import FoodTypeFormNew from './FoodTypeFormNew';
import FoodTypeItem from './FoodTypeItem';

export default function FoodTypes() {
 
    const { food_types, isLoading } = useFoodTypes();

    return (
        <>
            {
                isLoading && <Loader />
            }
            <FoodTypeFormNew />
            <Grid item xs={12}>            
                <div>
                    {
                        food_types.map(type => (
                            <FoodTypeItem
                                key={type.slug} 
                                { ...type }
                            />
                        ))
                    }
                </div>
            </Grid>
        </>
    )
}