
const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  answer: {
    type: String,
        unique: true,
  },
    created: {
        type: Date,
        default:Date.now
    },
  questionId: { type: Schema.Types.ObjectId, ref: "Question" },
  userId: { type: Schema.Types.ObjectId, ref: "User" }
});

const Answer = mongoose.model("Answer", AnswerSchema);
module.exports = Answer;
