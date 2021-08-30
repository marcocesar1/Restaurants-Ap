import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button } from '@material-ui/core';

import ConfirmDelete from '../layout/ConfirmDelete'
import FoodTypeFormEdit from './FoodTypeFormEdit';
import { foodEditStatus, foodStartDelete } from '../../actions/foodTypes';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor:'rgb(241 243 251)', 
        margin: '10px 0px'
    },
    food: {
        fontSize: '18px'
    },
    btnEdit: {
        marginRight: '10px'
    }
}));

const initDelete = { 
    openModal: false, 
    slug: '' 
};

export default function FoodTypeItem({ slug, name, isEdit }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [ confirmDelete, setConfirmDelete ] = useState(initDelete);

    const handleEdit = slug => {
        dispatch( foodEditStatus(slug) );
    }

    const handleConfirmDelete = slug => {
        setConfirmDelete({
            openModal: true,
            slug
        });
    }

    const handleDelete = () => {
        dispatch( foodStartDelete(confirmDelete.slug) );
    }

    return (
        <Paper variant="outlined" key={ slug } className={ classes.paper }>
            <p className={ classes.food }>{ name }</p>
            {
                isEdit ? 
                    <FoodTypeFormEdit 
                        slug={ slug } 
                        name={ name }
                    /> : 
                    <Button 
                        onClick={ () => handleEdit(slug) } 
                        className={ classes.btnEdit } 
                        variant="contained" 
                        color="primary" 
                        size="small"
                    >
                        Edit
                    </Button>                            
            }
            <Button 
                onClick={ () => handleConfirmDelete(slug) } 
                variant="contained" 
                color="secondary" 
                size="small"
            >
                Delete
            </Button>
            <ConfirmDelete 
                open={ confirmDelete.openModal }
                setConfirmDelete={ setConfirmDelete }
                handleDelete={ handleDelete }
            />
        </Paper>
    )
}