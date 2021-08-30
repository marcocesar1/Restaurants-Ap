import React from 'react';
import { CardContent, Typography } from '@material-ui/core';

export default function ItemReview({ email, comments, rating }) {
    return (
        <>
            <CardContent>
                <Typography paragraph>Email: { email }</Typography>                
                <Typography paragraph>Comments: { comments } </Typography>
                <Typography paragraph>Rating: { rating }</Typography>
            </CardContent>  
        </>
    )
}