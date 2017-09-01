import { Strategy as LocalStrategy } from 'passport-local';

import bcrypt from 'bcrypt';
import uuidv1 from 'uuid/v1';

import {
  isNotValidConfirmPassword,
  isNotValidEmail,
  isNotValidPassword
} from 'utils/VerificationUtils';
import models from 'models';
import { sendEmailConfirmation } from 'mailer';

const localOptions = {
  usernameField: 'email',
  passReqToCallback: true
};

const signUp = new LocalStrategy(localOptions, async (req, email, password, done) => {
  // verify request inputs inputs
  const errorMessage =
    isNotValidEmail(email) ||
    isNotValidPassword(password) ||
    isNotValidConfirmPassword(password, req.body.confirmPassword);

  if (errorMessage) {
    return done(null, false, { message: errorMessage });
  }

  // verify db users
  const existingUser = await models.User.findOne({
    where: {
      $or: [
        { googleEmail: { $eq: email } },
        { email: { $eq: email } },
        { facebookEmail: { $eq: email } }
      ]
    }
  });

  if (existingUser && existingUser.email !== null) {
    return done(null, false, { message: 'email already exists' });
  }

  // When user previously logged in with facebook or google account
  if (existingUser.facebookEmail || existingUser.googleEmail) {
    try {
      existingUser.email = email;
      existingUser.password = await bcrypt.hash(password, 10);
      existingUser.verified = true;

      existingUser.save();
      return done(null, existingUser);
    } catch (e) {
      return done(null, false, { message: 'Server error' });
    }
  }

  // generate code for email verification
  const verificationCode = uuidv1();

  // create new user
  let newUser;
  try {
    newUser = await models.User.create({
      email,
      password: await bcrypt.hash(password, 10),
      verificationCode
    });
  } catch (err) {
    return done(null, false, { message: 'Server error' });
  }

  sendEmailConfirmation(newUser.email, verificationCode, (error, info) => {
    if (error || info.rejected.length !== 0) {
      return done(null, false, { message: 'Message not sent' });
    }

    return done(null, newUser);
  });
});

export default signUp;
