import { Strategy as FacebookStrategy } from 'passport-facebook';

import models from 'models';

const facebookOptions = {
  clientID: '503270650015067',
  clientSecret: '1346436d8ac6ff4e4dd7d6548fe12b89',
  callbackURL: 'http://localhost:3000/api/v1/auth/facebook/callback'
};

const facebookStrategy = new FacebookStrategy(
  facebookOptions,
  async (accessToken, refreshToken, profile, done) => {
    console.log('AccessToken: ', accessToken);
    console.log('RefreshToken: ', refreshToken);
    console.log('Profile: ', profile);
  }
);

export default facebookStrategy;
