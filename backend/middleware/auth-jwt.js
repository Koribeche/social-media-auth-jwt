const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, function (err, payload) {
      if (err) {
        res.status(401).json({ message: "Unauthorized" });
      } else {
        req.payload = payload;
        next();
      }
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "veuillez envoyer le header authorization" });
  }
};
