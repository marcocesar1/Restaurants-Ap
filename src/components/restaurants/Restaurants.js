import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, InputLabel, Button, MenuItem, FormControl, Select } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import Title from '../layout/Title';
import RestaurantItem from './RestaurantItem';
import Loader from '../layout/Loader';
import useRestaurants from '../../hooks/useRestaurants';

import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  search: {
    margin: '20px 0px',
    minWidth: 200,
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  formControl: {
    minWidth: 200,
  },
}));

export default function Restaurants() {

  const classes = useStyles();
  const { t } = useTranslation();
  const [selSlug, setSelSlug] = useState('');
  const { restaurants, food_types, filterByFood, isLoading } = useRestaurants();

  const handleChange = e => {
    const foodSlug = e.target.value;

    setSelSlug(foodSlug);
    filterByFood(foodSlug);
  }  

  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>              
        {
          isLoading && <Loader/>
        }
        <Title>{t('restaurants.title')}</Title>
        <Button component={Link} to="/restaurants/create" variant="contained" color="primary">
          {t('restaurants.btnNew')}
        </Button>
        <div className={classes.root}>        
        <FormControl className={classes.search}>
          <InputLabel id="demo-simple-select-label">{t('restaurants.filter')}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={ selSlug }
            onChange={handleChange}
          >
            <MenuItem value="">Clear search</MenuItem>
            {
              food_types.map(({name, slug}) => (
                <MenuItem key={slug} value={slug}>{name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
          <Grid container spacing={3}>            
            <Grid item xs={12}>
              {              
                (!restaurants.length && !isLoading) ? 
                <Alert severity="warning">No results!</Alert> : null
              }
            </Grid>
            {
              restaurants.map(restaurant => (
                <Grid
                  key={restaurant.slug}                
                  item 
                  xs={12} 
                  sm={6} 
                  md={3}
                >
                    <RestaurantItem 
                      { ...restaurant }
                    />
                </Grid>
              ))
            }            
          </Grid>
        </div>
    </Paper>
  </Grid>
  );
}