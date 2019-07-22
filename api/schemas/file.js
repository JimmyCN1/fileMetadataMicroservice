var mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
  fileName: { type: String, required: true },
  fileType: String,
  fileSize: Number
});

module.exports = mongoose.model("File", fileSchema);
