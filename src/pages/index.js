import { useState } from 'react';
import { Box, Heading } from 'grommet';
import Login from '../components/Login';
import ClockInOut from '../components/ClockInOut';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userId = 1; // Replace with actual user ID from authentication

  return (
    <Box pad="medium">
      <Heading level="1" textAlign="center">Healthcare Worker Clock-In</Heading>
      {isLoggedIn ? (
        <ClockInOut userId={userId} />
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </Box>
  );
}