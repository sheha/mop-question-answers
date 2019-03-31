
const mongoose = require('mongoose');


const Schema = mongoose.Schema;

let AnswerSchema = new Schema({
  answer: {
    type: String,
        unique: true,
  },
    created: {
        type: Date,
        default:Date.now
    },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  question:{ type: Schema.Types.ObjectId, ref: "Question" }
});

const Answer = mongoose.model("Answer", AnswerSchema);
module.exports = Answer;
