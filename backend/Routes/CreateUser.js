const express = require('express')
const { body, validationResult } = require('express-validator');
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const jwtSecret = "klddhdskjkdsuyidgbsdnooiii#ss"
router.post("/createuser", [
  body('email').isEmail(),
  // password must be at least 5 chars long
  body('name').isLength({ min: 5 }),
  body('password', 'Incorrect Password').isLength({ min: 5 }),
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const salt = await bcrypt.genSalt(10);
  const secPassword = await bcrypt.hash(req.body.password,salt)
  try {
    await User.create({
      name: req.body.name,
      password: secPassword,
      email: req.body.email,
      location: req.body.location,
    })
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
})


router.post("/loginuser",
  body('email').isEmail(),

  body('password', 'Incorrect Password').isLength({ min: 5 }), async (req, res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email
    try {
      let userdata = await User.findOne({ email });
      if (!userdata) {
        res.status(400).json({ errors: "try login with correct credentials" });
      }

      const pwdCompare = await bcrypt.compare(req.body.password,userdata.password);

      if (!pwdCompare) {
        res.status(400).json({ errors: "try login with correct credentials" });

      }

      const data = {
        user : {
          id: userdata.id
        }
      }
      const authToken = jwt.sign(data,jwtSecret)
      return res.json({ success: true,authToken:authToken })
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  })
module.exports = router;