import { Grid } from '@mui/material';
import React from 'react';
import { useAppSelector } from './redux/hooks';
import UserCard from './UserCard';

export default function Users(): JSX.Element {
  const users = useAppSelector((store) => store.user.allUsers);
  return (
    <Grid
      mt={10}
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '60vh' }}
    >
      <Grid item xs={3}>
        <Grid container spacing={2}>
          {users.map((user) => (
            <Grid xs={4} mb={5}>
              <UserCard user={user} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
