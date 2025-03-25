import { handleAuth, handleLogin, handleLogout } from '@auth0/nextjs-auth0';

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        returnTo: '/',
      });
      // Capture login time and store it in the database
    } catch (error) {
      res.status(500).json({ message: 'Failed to log in', error: error.message });
    }
  },
  async logout(req, res) {
    try {
      await handleLogout(req, res, {
        returnTo: '/',
      });
      // Capture logout time and store it in the database
    } catch (error) {
      res.status(500).json({ message: 'Failed to log out', error: error.message });
    }
  },
});