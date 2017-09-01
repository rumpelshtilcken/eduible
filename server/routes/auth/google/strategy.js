import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';

import { googleConfig } from 'config';
import models from 'models';

const googleStrategy = new GoogleStrategy(
  googleConfig.options,
  async (accessToken, refreshToken, profile, done) => {
    // Verify main google params
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
          { googleId: { $eq: id } },
          { email: { $eq: emails[0].value } },
          { facebookEmail: { $eq: emails[0].value } }
        ]
      }
    });

    if (!user) {
      // Create new user
      try {
        const newUser = await models.User.create({
          googleId: id,
          googleToken: accessToken,
          googleName: `${name.familyName} ${name.givenName}`,
          verified: true
        });

        // verify email
        if (emails[0].value) {
          newUser.googleEmail = emails[0].value;
        }

        await newUser.save();
        return done(null, newUser);
      } catch (err) {
        return done(null, false, { message: 'Server error' });
      }
    }

    if (!user.googleId && (user.email || user.facebookEmail)) {
      // User previously authenticated via email
      user.googleId = id;
      user.googleToken = accessToken;
      user.googleEmail = emails[0].value;

      try {
        await user.save();
      } catch (err) {
        return done(null, false, { message: 'Server error' });
      }
    }

    // sign via google only
    return done(null, user);
  }
);

export default googleStrategy;
