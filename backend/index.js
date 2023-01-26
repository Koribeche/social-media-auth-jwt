require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

// ----------------------- Database config -----------------------

require("./config/database");

// ----------------------- Passport config -----------------------

const initializePassport = require("./config/passport");
initializePassport(passport);
app.use(passport.initialize());

// --------------------------    Route      ----------------------------

app.use("/api/auth", require("./routes/RouteAuth"));

// clean all cookies
app.get("/api/clear", (req, res) => {
  res.clearCookie("refresh_token");
  res.status(204).send();
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
