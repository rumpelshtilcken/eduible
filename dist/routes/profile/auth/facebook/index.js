'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('passport-facebook'),
    FacebookStrategy = _require.Strategy;

var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');

var models = require('../../../../models');
var config = require('../../../../config');

var facebookRoutes = express.Router();

var facebookOptions = {
  clientID: '503270650015067',
  clientSecret: '1346436d8ac6ff4e4dd7d6548fe12b89',
  callbackURL: 'http://localhost:3000/api/v1/auth/facebook/callback'
};

passport.use('signin', new FacebookStrategy(facebookOptions, function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, accessToken, refreshToken, profile, done) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(accessToken);
            console.log('Passport use');
            console.log(profile);
            if (!req.user) {
              console.log('++++');
              models.User.findOrCreate({ facebookId: profile.id }, function (err, user) {
                console.log('-----');
                // if (err) {
                //   console.log('=====');
                //   return done(err);
                // }
                // console.log('create new user');
                // const newUser = new models.User();
                // newUser.facebookId = profile.id;
                // newUser.facebookToken = accessToken;
                // newUser.facebookName = `${profile.name.givenName} ${profile.name.familyName}`;
                // newUser.facebookEmail = (profile.emails[0].value || '').toLowerCase();
                // console.log('profile: ', profile.id, accessToken, profile.name, profile.emails[0].value);
                // newUser.save((err) => {
                //   if (err) {
                //     return done(err);
                //   }
                //   return done(null, newUser);
                // });
                return done(err, user);
              });
            }
            return _context.abrupt('return', done(null, profile));

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}()));

// facebook signin
facebookRoutes.get('/signin', function (req, res, next) {
  console.log('------------------------------Facebook signin server side');
  passport.authenticate('signin', {
    failureRedirect: '/',
    session: false,
    scope: ['email']
  }, function (err, user, info) {
    console.log('Passport auth');
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json(info);
    }
    return res.status(200).json({ access_token: jwt.sign({ id: user.id }, config.JWT_SECRET) });
  })(req, res, next);
});

// facebook callback
facebookRoutes.get('/callback', passport.authenticate('signin', { session: false, failureRedirect: '/' }), function (req, res) {
  console.log('----------- Facebook callback');
  // Successful authentication, redirect home.
  // return the token or you would wish otherwise give eg. a succes message
  res.render('json', { data: JSON.stringify(req.user.access_token) });
}, function (err, req, res) {
  console.log('++++++ Facebook callback error');
  // You could put your own behavior in here, fx: you could force auth again...
  // res.redirect('/auth/facebook/');
  if (err) {
    res.status(400);
    res.render('error', { message: err.message });
  }
});

module.exports = facebookRoutes;