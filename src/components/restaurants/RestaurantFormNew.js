import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Button, FormControl, Select, InputLabel, MenuItem, Checkbox , ListItemText, Input } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { useForm } from '../../hooks/useForm'
import { restaStartAdd } from '../../actions/restaurants';
import Loader from '../layout/Loader';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        marginTop: 15,
        marginBottom: 15
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        marginBottom: '20px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
    btn: {
        marginTop: '20px'
    }
}));
  
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
};

const initForm = {
    name: '',
    description: '',
    rating: 1,
    food_type: []
}

export default function RestaurantFormNew() {
    const classes = useStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [isCreated, setIsCreated] = useState(false);
    const { values, handleInputChange, reset } = useForm(initForm);
    const { types: food_types } = useSelector(state => state.food_types);
    const { isLoading } = useSelector(state => state.restaurants);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch( restaStartAdd(values, setIsCreated, reset) );
    }

    if(isLoading) return <Loader />;

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                    <h3>{t('restaurants.titleNew')}</h3>
                    {
                        isCreated && <Alert severity="success">Created!</Alert>
                    }
                    <form onSubmit={ handleSubmit } className={classes.form}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="my-input">Name</InputLabel>
                            <Input 
                                name="name"
                                value={values.name}
                                onChange={handleInputChange}
                                placeholder="Name"
                                type="text"
                                aria-describedby="my-helper-text"
                                required
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="my-input">Description</InputLabel>
                            <Input 
                                name="description"
                                value={values.description}
                                onChange={handleInputChange}
                                placeholder="Description"
                                type="text" 
                                aria-describedby="my-helper-text"
                                required
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-mutiple-checkbox-label">Food Type</InputLabel>
                            <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                multiple
                                value={values.food_type}
                                onChange={handleInputChange}
                                name="food_type"
                                input={<Input />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                                required
                            >
                                {
                                    food_types.map(food => (
                                        <MenuItem key={food.slug} value={food.slug}>
                                            <Checkbox checked={values.food_type.indexOf(food.slug) > -1} />
                                            <ListItemText primary={food.name} />
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <Button 
                            type="submit" 
                            className={classes.btn} 
                            variant="contained" 
                            color="primary"
                        >
                            {t('restaurants.btnCreate')}
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    )
}