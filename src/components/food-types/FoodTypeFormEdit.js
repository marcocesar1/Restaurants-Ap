import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Input, Button  } from '@material-ui/core';

import { foodStartUpdate } from '../../actions/foodTypes';
import { useForm } from '../../hooks/useForm'
import Loader from '../layout/Loader';

const useStyles = makeStyles(() => ({
    root:{
        paddingBottom: '19px', 
        maxWidth:'350px', 
        margin: '0 auto'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    btn: {
        marginTop: '20px'
    }
}));
  

export default function FoodTypeFormEdit({ slug, name }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { isLoading } = useSelector(state => state.food_types);    
    const { values, handleInputChange } = useForm({name});


    const handleSubmit = e => {
        e.preventDefault();
        dispatch( foodStartUpdate(slug, values) );
    }

    if(isLoading) return <Loader />

    return (
        <div className={classes.root}>
            <form onSubmit={handleSubmit} className={classes.form}>
                <FormControl>
                    <InputLabel htmlFor="my-input">Update Name</InputLabel>
                    <Input 
                        onChange={ handleInputChange }
                        value={values.name}
                        name="name"
                        placeholder="Name"
                        type="text"                                
                        id="my-input" 
                        aria-describedby="my-helper-text"
                        required
                    />
                </FormControl>
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    className={classes.btn}
                >
                    Update
                </Button>
            </form>
        </div>
    )
}