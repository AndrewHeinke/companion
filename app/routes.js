var User = require('./models/user.js');

module.exports = function(app, passport) {

  app.get('/', function(req, res) {
    res.render('pages/index', {
      user: req.user
    });
  });

  app.get('/login', function(req,res) {
    res.render('pages/login', {message: req.flash('loginMessage')});
  });

  app.get('/signup', function(req,res) {
    res.render('pages/signup', {message: req.flash('signupMessage')});
  });

  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('pages/profile', {
      user: req.user
    });
  });

  app.get('/search', isLoggedIn, function(req, res) {
    User.find({}, function(err, doc) {
      if (err) {
        res.send(err);
      }
      else {
        res.render('pages/search', {
          list: doc,
          user: req.user
        });
      }
    });
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }

};
