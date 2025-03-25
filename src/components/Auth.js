import { useUser } from '@auth0/nextjs-auth0';
import { Box, Button, Heading } from 'grommet';

export default function Auth() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <Box align="center" pad="medium">
        <Heading level="3">Welcome, {user.name}!</Heading>
        <a href="/api/auth/logout"><Button primary label="Logout" /></a>
      </Box>
    );
  }
  return (
    <Box align="center" pad="medium">
      <a href="/api/auth/login"><Button primary label="Login" /></a>
    </Box>
  );
}