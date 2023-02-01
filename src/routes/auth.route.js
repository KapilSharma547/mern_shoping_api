const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Register

router.post("/register", async (req, res) => {
  const { username, email, password, isAdmin } = req.body;
  let _isAdmin = isAdmin ? true : false;

  console.log("isAdmin", isAdmin);
  console.log("_isAdmin", _isAdmin);
  try {
    const isUserExist = await User.findOne({ username });

    if (!isUserExist) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username,
        email,
        password: hash,
        _isAdmin,
      });

      const savedUser = await newUser.save();
      res.status(201).json({ message: "User is created", savedUser });
    } else {
      res.status(500).json("User is Already exist");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//Login

router.post("/login", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json("User not found");

    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) return res.status(400).json("Invalid Password");

    // const accessToken = jwt.sign({ username }, process.env.JWT_SEC);

    //Now From token we find User Admin or not
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SEC
    );

    res.status(200).json({ user, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
