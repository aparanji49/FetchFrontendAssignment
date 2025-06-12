import React from 'react';
import {
  Card, CardHeader, CardMedia, CardContent, Typography
} from '@mui/material';
import type { DogCardProps } from '../types';



const DogCard: React.FC<DogCardProps> = ({ dog }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={dog.name} subheader={dog.breed} />
      <CardMedia
        component="img"
        height="200"
        width={"auto"}
        image={dog.img}
        alt={dog.name}
      />
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
