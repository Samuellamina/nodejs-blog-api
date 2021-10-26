const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register ......
router.post("/register", async (req, res) => {
  try {
    // generate password....
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create user....
    const newUser = new User({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashedPassword,
    });

    // save user
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

// login ...
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).send("email or password is incorrect");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      res.status(404).send("email or password is incorrect");
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
