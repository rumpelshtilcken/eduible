// import passport from 'passport';
// import { createToken } from '../utils/jwt';

// export const middlewareConstructor = (passportName, statusCode) => {
//   return (req, res, next) => {
//     passport.authenticate(passportName, (err, user, info) => {
//       if (err) { return next(err); }
//       if (!user) {
//         const error = new Error(info.message);
//         error.status = 401;
//         return next(error);
//       }
//       // return res.redirect('/?access_token=' + createToken(user));
//       return res.status(statusCode).json({ access_token: createToken(user) });
//     })(req, res, next);
//   };
// };
