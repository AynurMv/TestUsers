import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions, Grid } from '@mui/material';
import type { BackendUser } from './redux/userSice/userSlice';

export default function UserCard({ user }: { user: BackendUser }): JSX.Element {
  const curDate = new Date().getTime();
  const usersBirthDay = new Date(user?.dateOfBirth).getTime();
  const userAge = Math.floor((curDate - usersBirthDay) / (60 * 60 * 24 * 1000 * 365));
  return (
    <Box alignItems="center" justifyContent="center">
      <Card sx={{ width: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="400"
            image={`http://localhost:3001/images/${user?.photo}`}
            alt="User Photo"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {user?.name}
            </Typography>
            {user?.dateOfBirth && (
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Полных лет: {userAge}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}
