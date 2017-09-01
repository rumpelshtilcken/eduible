import { Strategy as FacebookStrategy } from 'passport-facebook';

import { facebookConfig } from 'config';
import models from 'models';

const facebookStrategy = new FacebookStrategy(
  facebookConfig.options,
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
      where: {
        $or: [
          { facebookId: { $eq: id } },
          { email: { $eq: emails[0].value } },
          { googleEmail: { $eq: emails[0].value } }
        ]
      }
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

    if (!user.facebookId && (user.email || user.googleEmail)) {
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
