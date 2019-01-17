const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb://mooncascade:mooncascade1@ds125684.mlab.com:25684/mooncascade"
);

const LogSchema = Schema({
  message: { type: String, required: true }
});

const AthleteSchema = Schema({
  AthleteID: { type: String, required: true, unique: true },
  StartNumber: { type: Number, required: true },
  FullName: { type: String, required: true },
  StartTime: { type: String, required: false },
  FinishTime: { type: String, required: false }
});

module.exports.Log = mongoose.model("Log", LogSchema);
module.exports.Athlete = mongoose.model("Athlete", AthleteSchema);
