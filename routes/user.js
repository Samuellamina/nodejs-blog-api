const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// update user ...
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.status(403).json("you can only update your account");
  }
});

// delete user ...
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.status(403).json("you can only delete your account");
  }
});

// get user ...
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      const { password, updatedAt, ...other } = user._doc;

      res.status(200).json(other);
    } else {
      return res.status(404).json("user dosen't exist");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
