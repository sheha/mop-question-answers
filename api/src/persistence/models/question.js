
const mongoose = require('mongoose');


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
  userId: { type: Schema.Types.ObjectId, ref: "User" },
    created: {
        type: Date,
        default: Date.now
    },
});

QuestionsSchema.method('like', function likes(like, cb) {
    this.likes += 1;
    this.parent().save(cb);

});

let Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;
