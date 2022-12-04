const mongoose = require("mongoose");
const { Schema } = mongoose;

const portfolioSchema = new mongoose.Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: String,
    description: String,
    tags: [
      {
        type: String,
      },
    ],
    attachments: [{ type: String }],
    tools: [{ type: String }],
    views: Number,
    category: String,
    link: String,

    githubLink: String,

    comments: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        text: String,
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = portfolio;
