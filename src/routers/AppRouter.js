import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import Dashboard from '../components/layout/Dashboard';
import Loader from '../components/layout/Loader';
import RestaurantFormEdit from '../components/restaurants/RestaurantFormEdit';
import RestaurantDetail from '../components/restaurants/RestaurantDetail';
import FoodTypes from '../components/food-types/FoodTypes';
import RestaurantFormNew from '../components/restaurants/RestaurantFormNew';
import { restaGetData } from '../actions/restaurants';
import { foodGetData } from '../actions/foodTypes';
import Restaurants from '../components/restaurants/Restaurants';

export default function AppRouter() {

    const dispatch = useDispatch();
    const { isLoaded } = useSelector(state => state.restaurants);

    useEffect(function(){
        dispatch( restaGetData() );
        dispatch( foodGetData() );
    }, [ dispatch ]);

    if(!isLoaded) return (
        <div>
            <p>Loading App...</p>
            <Loader />
        </div>
    );

    return (
        <div>
            <Router>
                <Dashboard>
                    <Switch>
                        <Route exact path="/">
                            <Restaurants />
                        </Route>
                        <Route path="/restaurant/:slug">
                            <RestaurantDetail />
                        </Route>
                        <Route path="/restaurants/create">
                            <RestaurantFormNew />
                        </Route>
                        <Route path="/restaurants/edit/:slug">
                            <RestaurantFormEdit />
                        </Route>
                        <Route path="/food-types/">
                            <FoodTypes />
                        </Route>
                        <Redirect from='*' to='/' />
                    </Switch>
                </Dashboard>
            </Router>
        </div>
    )
}