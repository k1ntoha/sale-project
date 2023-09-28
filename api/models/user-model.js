const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, unique: true, required: false },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  resetlink: { type: String, default: "" },
  savedSales: { type: [String] },
  createdSales: {
    type: [Schema.Types.ObjectId],
    ref: "sale",
  },
});

module.exports = model("User", UserSchema);
