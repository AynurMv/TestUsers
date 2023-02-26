import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { setIsEdit } from './redux/userSice/userSlice';

export default function Account(): JSX.Element {
  const currUser = useAppSelector((store) => store.user.currUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  if (currUser?.id) navigate('/notauth');
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '80vh' }}
    >
      <Grid item xs={3}>
        <Box width="1000" height="900" alignItems="center" justifyContent="center">
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="400"
                image={
                  currUser?.photo
                    ? `http://localhost:3001/images/${currUser?.photo}`
                    : 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Anonymous_emblem.svg'
                }
                alt="User Photo"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {currUser?.name}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Пол: {currUser?.sex}
                </Typography>
                {currUser?.dateOfBirth && (
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Дата рождения: {new Date(currUser?.dateOfBirth).toLocaleDateString()}
                  </Typography>
                )}
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Эл. почта: {currUser?.email}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={() => dispatch(setIsEdit(true))}>
                Изменить
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
}
