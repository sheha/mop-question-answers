
import mongoose from 'mongoose';


const Schema = mongoose.Schema;

let QuestionSchema = new Schema({
  question: {
    type: String,
    unique: true
  },
  likes: {
    type: Number,
    default: 0
  },
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  _userId: { type: Schema.Types.ObjectId, ref: "User" },
    created: {
        type: Date,
        default: Date.now
    },
});

QuestionsSchema.method('like', function likes(like, cb) {
    this.likes += 1;
    this.parent().save(cb);

});

let Questions = mongoose.model("Question", QuestionsSchema);
module.exports = Questions;
