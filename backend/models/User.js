const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    nom: { type: String },
    prenom: { type: String, default: "" },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    photo: {
      type: String,
      default:
        "https://springbootecom.s3.eu-west-3.amazonaws.com/user-1671580210646.png",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
