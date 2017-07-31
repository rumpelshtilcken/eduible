const { Router } = require('express');
// const jwt = require('express-jwt');
// const { JWT_SECRET } = require('../config');
// const Schema = require('../schema');
const localAuth = require('./local-auth');
// const facebookAuth = require('./facebook-auth');

const router = Router(); // eslint-disable-line

router.post('/signup', localAuth.localSignup);
router.post('/signin', localAuth.localLogin);
// router.get('/facebook', facebookAuth.facebookLogin);
//  router.get('/facebook/callback', facebookAuth.facebookCallback);
// Auth Middleware - This will check if the token is valid
// Only the requests that start with /graphql will be checked for the token.
// router.all('/graphql', jwt({ secret: JWT_SECRET }), (req, res, next) => {
//   graphQLHTTP({ schema: Schema, rootValue: req.user })(req, res, next);
// });

export default router;
