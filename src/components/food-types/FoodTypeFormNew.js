import React from 'react'
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, FormControl, InputLabel, Input, Button  } from '@material-ui/core';

import { foodStartAdd } from '../../actions/foodTypes';
import { useForm } from '../../hooks/useForm';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
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
    btn: {
        marginTop: '20px'
    }
}));
  
const initForm = {
    name: ''
}

export default function FoodTypeFormNew() {
    const classes = useStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    
    const { values, handleInputChange, reset } = useForm(initForm);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch( foodStartAdd(values, reset) );
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                    <h3>{t('foodTypes.title')}</h3>
                    <form onSubmit={ handleSubmit } className={classes.form}>
                        <FormControl>
                            <InputLabel htmlFor="my-input">Name</InputLabel>
                            <Input 
                                value={ values.name }
                                onChange={handleInputChange}
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
                            Add
                        </Button>
                    </form>
                </Paper>
            </Grid>                                    
        </Grid>
    )
}