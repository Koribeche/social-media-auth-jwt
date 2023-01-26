const passport = require("passport");
const User = require("../models/User");
const S3 = require("../middleware/s3");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

// GET ( Google authentification )
exports.google = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// GET ( Github authentification )
exports.github = passport.authenticate("github");

// GET ( Facebook authentification )
exports.facebook = passport.authenticate("facebook", { scope: ["email"] });

// POST ( Register )
exports.register = async (req, res) => {
  try {
    if (req.file) {
      let photo = await S3.uploadFile(req.file);
      req.body.photo = photo.Location;
      await unlinkFile(req.file.path);
    }
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// POST ( Login user )
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne().where("email").equals(email);

    if (!user) {
      return res.status(400).json("l'adresse email n'existe pas");
    }

    let isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json("Mot de passe incorrecte");
    }

    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      }
    );
    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      }
    );
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });
    user.password = undefined;
    res.json({ user, accessToken });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// GET ( Logout )
exports.logout = (req, res) => {
  res.clearCookie("refresh_token");
  res.status(204).send();
};

// Generate Refresh token and send it to client
exports.postOAuth = (req, res) => {
  try {
    const refreshToken = jwt.sign(
      { _id: req.user._id },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      }
    );
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });
    res.redirect(process.env.CLIENT_URL);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// generate the access token
const generateAccessToken = (req) => {
  const refreshToken = req.cookies.refresh_token;
  let accessToken = null;

  if (!refreshToken) return accessToken;
  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, payload) => {
    if (err) return accessToken;
    accessToken = jwt.sign(
      { _id: payload._id },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      }
    );
  });
  return accessToken;
};

// refresh token
exports.refresh = (req, res) => {
  try {
    const accessToken = generateAccessToken(req);
    if (!accessToken) return res.status(401).json({ message: "Unauthorized" });
    res.json({ accessToken });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// GET ( récuprer l'utilisateur connecté )
exports.getMe = async (req, res) => {
  try {
    const accessToken = generateAccessToken(req);
    if (!accessToken) return res.status(401).json({ message: "Unauthorized" });
    const payload = jwt.decode(accessToken);
    const user = await User.findById(payload._id).select("-password");
    res.status(200).json({ user, accessToken });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
