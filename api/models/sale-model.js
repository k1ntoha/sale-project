const { Schema, model } = require("mongoose");

const SaleSchema = new Schema({
  categories: { type: [String], required: true },
  status: { type: String, default: "unmoderated" },
  percent: { type: Number, required: true },
  company: { type: String, required: true },
  description: { type: String, maxLenght: 100 },
  link: { type: String, required: true },
  deadlineDate: { type: String, required: true },
});

module.exports = model("sale", SaleSchema);
