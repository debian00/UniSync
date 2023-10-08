const { Router } = require('express');
const { localLogin } = require('../../configuration/login/localLogin');

const localLoginRouter = Router();

localLoginRouter.post('/', (req, res, next) => {
  localLogin(req, res, (err, user) => {
    if (err) {
      return next(err);
    }

    if (user) {
      req.session.userId = user.id;
      return res.redirect('/dashboard');
    }

    return res.redirect('/login?error=1');
  });
});

module.exports = localLoginRouter;
