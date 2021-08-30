import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Input, 
    InputLabel, 
    FormControl,
    MenuItem,
    Select,
    Button
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { useForm } from '../../hooks/useForm';
import Loader from '../layout/Loader';
import { reviewsSend, startAddReview } from '../../actions/reviews';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
    formControl: {
      margin: '10px 0px',
    },
    list: {
        listStyle: 'none',
        padding: 0
    }
}));

const initFormData = {
    restaurant: '',
    email: 'test@test.test',
    comments: 'Simple comment',
    rating: 1
};
  

export default function FormReview({ restaurantSlug }) {   
    
    const classes = useStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { values, handleInputChange } = useForm(initFormData);
    const { isLoading, isError, isReviewSend } = useSelector(state => state.reviews);

    const { email, comments, rating } = values;

    const handleSubmit = e => {
        e.preventDefault();

        const dataReview = {
            ...values,
            restaurant: restaurantSlug
        };
        dispatch( startAddReview(dataReview) );      
    }

    useEffect(() => {
        dispatch( reviewsSend(false) );
    }, [ dispatch ]);

    return (
        <div>
            <form onSubmit={ handleSubmit }>
                <h2>{t('reviews.title')}</h2>
                {
                    isReviewSend && <Alert severity="success">Review send!</Alert>
                }
                {
                    isError && <Alert severity="error">
                        <p>Error send review!</p>
                    </Alert>
                }
                <FormControl fullWidth={true} className={classes.formControl}>
                    <InputLabel>Email</InputLabel>
                    <Input 
                        value={ email }
                        onChange={handleInputChange} 
                        name="email"
                        type="text" 
                        id="my-input" 
                        aria-describedby="my-helper-text" 
                        fullWidth={true} 
                        required
                    />
                </FormControl>
                <FormControl fullWidth={true} className={classes.formControl}>
                    <InputLabel>Comments</InputLabel>
                    <Input 
                    value={ comments }
                    name="comments"
                    onChange={handleInputChange}
                    aria-describedby="my-helper-text" 
                    fullWidth={true}
                    required
                />                    
                </FormControl>
                <FormControl fullWidth={true} className={classes.formControl}>
                    <InputLabel>Rating</InputLabel>
                    <Select
                        value={ rating }
                        onChange={handleInputChange} 
                        name="rating"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        required
                    >
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        <MenuItem value="5">5</MenuItem>
                    </Select>
                </FormControl>
                {
                    isLoading ? <Loader/> : 
                            <Button variant="contained" color="primary" type="submit">
                                {t('reviews.btn')}
                            </Button>     
                }
            </form>
        </div>
    )
}