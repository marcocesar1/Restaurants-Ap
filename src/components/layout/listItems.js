import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const MainListItems = () => {
  const { t } = useTranslation();

  return (
    <div>
      <ListItem button component={Link} to={"/"}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary={t('menu.home')} />
      </ListItem>
      <ListItem button component={Link} to={"/food-types"}>
        <ListItemIcon>
          <FastfoodIcon />
        </ListItemIcon>
        <ListItemText primary={t('menu.foodTypes')} />
      </ListItem>
    </div>
  )
};