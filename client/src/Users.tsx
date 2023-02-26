import { Box, Grid } from '@mui/material';
import React from 'react';
import { useAppSelector } from './redux/hooks';
import UserCard from './UserCard';

export default function Users(): JSX.Element {
  const users = useAppSelector((store) => store.user.allUsers);
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Grid container mt={5} spacing={2}>
        {users.map((user) => (
          <Grid xs={4} mb={5} display="flex" justifyContent="center" alignItems="center" >
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
