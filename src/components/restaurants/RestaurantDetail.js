import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { useParams } from 'react-router-dom';
import useRestaurant from '../../hooks/useRestaurant';
import { Box } from '@material-ui/core';
import NoImage from '../../assets/images/no-image.jpg'
import ItemReview from '../reviews/ItemReview'
import Loader from '../layout/Loader'
import FormReview from '../reviews/FormReview';

const useStyles = makeStyles((theme) => ({
    box:{
        width: '100%'
    },
    root: {
      maxWidth: 500,
      width: 500
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

export default function RestaurantDetail() {

    const classes = useStyles();

    const { slug } = useParams();

    const { restaurant, isLoading } = useRestaurant(slug);

    if(restaurant.detail === "No encontrado.") return <p>No existe el recurso solicitado</p>

    if(isLoading) return <Loader />;

    return (
        <Box display="flex" justifyContent="center" className={classes.box}>        
            <Card className={classes.root}>
                <CardHeader
                    title={restaurant.name}
                />
                <CardMedia
                    className={classes.media}
                    image={restaurant.logo ? restaurant.logo : NoImage}
                    title="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {restaurant.description}
                    </Typography>
                </CardContent>
                <Collapse in={true} timeout="auto" unmountOnExit>                                        
                    <CardContent style={{ backgroundColor: '#edf0ff'}}>
                        <FormReview 
                            restaurantSlug={ restaurant.slug }
                        />
                    </CardContent>
                    <CardContent>
                        <Typography paragraph>{restaurant.reviews.length ? 'Reviews' : 'No Reviews'}</Typography>
                    </CardContent>
                    {
                        restaurant.reviews.map(review => (
                            <ItemReview 
                                key={review.slug}
                                { ...review }
                            />
                        ))
                    }                    
                </Collapse>                
            </Card>
        </Box>
    )
}