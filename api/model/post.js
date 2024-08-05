import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  desc: String,
  img: String,
  date: {
    type: Date,
    default: () => Date.now(),
  },
  cat: String,
});

const postModel = mongoose.model("post", postSchema);

export { postModel };
