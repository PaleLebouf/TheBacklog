const router = require('express').Router();
const User = require('../models/user.model')

router.route('/').get((req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/register').post((req, res) => {
    let name = '';
    if( req.body.name !== null) name = req.body.name;
    
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        name: name,
    });
  
    newUser.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/login').post((req, res) => {
    User.findOne({username: req.body.username})
        .then((user) => {
            user.comparePassword(req.body.password, (err, isMatch) => {
                if(err) throw err;
            
                res.json(isMatch)
            })
        })
        .catch(err => res.status(400).json('Error: ' + err));
  });
  
  module.exports = router;