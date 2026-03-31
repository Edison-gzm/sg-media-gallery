// Handles all authentication related API calls.

import client from './client';

export const loginUser = (email, password) =>
  client.post('/auth/login', { email, password });