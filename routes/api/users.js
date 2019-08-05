const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route GET  api/users
// @desc       signup users
// @access     Public
router.post('/',
   [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Please enter a password with 4 or more characters').isLength({min: 6})
   ],
   async (req, res) => {
      // Check to see if the validation was successful
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      // get parameters from request body
      const { name, email, password } = req.body;

      try {
         // check if user email already exist
         let user = await User.findOne({ email });
         if(user) {
            return res.status(400).json({ errors: [ { msg: 'User already exists '}] });
         }

         // create new user object
         user = new User({
            name,
            email,
            password
         });

         const salt = await bcrypt.genSalt(8);

         // encrypt password
         user.password = await bcrypt.hash(password, salt);
         await user.save();

         // return jsonwebtoken for auth
         const payload = {
            user: {
               id: user.id
            }
         }

         jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 },
            (err, token) => {
               if(err) throw err;
               res.json({ token });
            }
         );

      } catch(err) {
         console.error(err.message);
         res.status(500).send('Server error');
      }
});

module.exports = router;
