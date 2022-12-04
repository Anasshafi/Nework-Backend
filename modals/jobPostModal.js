const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobPostSchema = new mongoose.Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: String,
    description: String,
    country: String,
    city: String,
    type: String, // on-site, remote, hybrid
    salaryCurrencyCode: String, // USD, PKR...
    salaryPeriod: String, // hourly, weekly,monthl,yearly
    salaryFrom: Number,
    salaryTo: Number,
    positionType: String, // contract, part-time, full-time
    category: String, // web-dev, mobile-dev..
    skills: [{ type: String }], // reactjs..
    requiredExperience: String, // 1-2 years, 2-4 years...
    link: String,
  },
  {
    timestamps: true,
  }
);

const jobpost = mongoose.model("JobPost", jobPostSchema);

module.exports = jobpost;
