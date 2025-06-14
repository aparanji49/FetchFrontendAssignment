import React from 'react';
import {
  Card, CardHeader, CardMedia, CardContent, Typography,
  IconButton,
  Box
} from '@mui/material';
import type { DogCardProps } from '../types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useFavorites } from '../context/FavoritesContext';


const DogCard: React.FC<DogCardProps> = ({ dog, showFavoriteIcon = true  }) => {
   const { favoriteIds, toggleFavorite } = useFavorites();
  const isFavorite = favoriteIds.includes(dog.id);
  return (
    <Card sx={{ 
      maxWidth: 345,
       height: "100%", 
       width: "100%",
       display: 'flex',
        flexDirection: 'column', 
        justifyContent: 'space-between',
        borderRadius: 3,
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
        },}}>
      <CardHeader 
      title={dog.name} 
      subheader={dog.breed}
      action={
         showFavoriteIcon !== false && (
          <IconButton onClick={() => toggleFavorite(dog.id)} aria-label='favorite'>
            {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton> )
        } 
         sx={{ pb: 0 }}/>
      <Box sx={{ position: 'relative', width: '100%', aspectRatio: '4 / 3', overflow: 'hidden' 
           }}>
      <CardMedia
        component="img"
        image={dog.img}
        alt={dog.name}
          sx={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      position: 'absolute',
      top: 0,
      left: 0,
    }}
      /></Box>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        Age: {dog.age} {dog.age === 1 ? 'year' : 'years'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Zip Code: {dog.zip_code}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DogCard;
