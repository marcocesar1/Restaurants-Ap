import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import NoImage from '../../assets/images/no-image.jpg'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { restaStartDelete } from '../../actions/restaurants';
import ConfirmDelete from '../layout/ConfirmDelete';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: '0 auto'
  },
});

const initDelete = { 
  openModal: false, 
  slug: '' 
};

export default function RestaurantItem({ slug, name, description, logo, rating }) {
  
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [ confirmDelete, setConfirmDelete ] = useState(initDelete);

  const handleConfirmDelete = slug => {
    setConfirmDelete({
        openModal: true,
        slug
    });
  }

  const handleDelete = () => {
    dispatch( restaStartDelete(confirmDelete.slug) );
  }

  return (
    <>
      <Card className={classes.root}>
        <Link to={`/restaurant/${slug}`} color="inherit">
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image={logo ? logo : NoImage}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                { name }
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                { description }
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions>
          <Button size="small" variant="contained" disabled>
            { rating ? rating : 'No rating' }
          </Button>
          <Button component={Link} to={`/restaurants/edit/${slug}`} size="small" variant="contained" color="primary">{t('restaurants.btnEdit')}</Button>
          <Button 
            onClick={() => handleConfirmDelete(slug)}
            size="small" variant="contained" color="secondary">{t('restaurants.btnDel')}</Button>
        </CardActions>
      </Card>
      <ConfirmDelete 
        open={ confirmDelete.openModal }
        setConfirmDelete={ setConfirmDelete }
        handleDelete={ handleDelete }
      />
    </>
  );
}