import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  avatarUrl: String,
  githubId: Number,
  kakaoId: Number,
  comments: [
    {
      type: ObjectId,
      ref: "Comment",
    },
  ],
  videos: [
    {
      type: ObjectId,
      ref: "Video",
    },
  ],
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;
