import { Strategy as FacebookStrategy } from 'passport-facebook';

import models from 'models';

const facebookOptions = {
  clientID: '305795383220393',
  clientSecret: '68253afcc6594c2a6b15249a8d75422b',
  callbackURL: 'http://localhost:3000/api/v1/auth/facebook/callback',
  profileFields: ['id', 'name', 'emails']
};

const facebookStrategy = new FacebookStrategy(
  facebookOptions,
  async (accessToken, refreshToken, profile, done) => {
    // Verify main facebook params
    if (!accessToken || !profile) {
      return done(null, false, { message: 'Not auth' });
    }

    const { id, name, emails } = profile;
    if (!id) {
      return done(null, false, { message: 'Id not defined' });
    }

    const user = await models.User.findOne({
      where: { $or: [{ facebookId: { $eq: id } }, { email: { $eq: emails[0].value } }] }
    });

    if (!user) {
      // Create new user
      try {
        const newUser = await models.User.create({
          facebookId: id,
          facebookToken: accessToken,
          facebookName: `${name.familyName} ${name.givenName}`,
          verified: true
        });

        // verify email
        if (emails[0].value) {
          newUser.facebookEmail = emails[0].value;
        }

        await newUser.save();
        return done(null, newUser);
      } catch (err) {
        return done(null, false, { message: 'Server error' });
      }
    }

    if (!user.facebookId && user.email) {
      // User previously authenticated via email
      user.facebookId = id;
      user.facebookToken = accessToken;
      user.facebookEmail = emails[0].value;

      try {
        await user.save();
      } catch (err) {
        return done(null, false, { message: 'Server error' });
      }
    }

    // sign via facebook only
    return done(null, user);
  }
);

export default facebookStrategy;
