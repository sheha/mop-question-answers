const mongoose=require('mongoose');
//const bcrypt from 'bcrypt';


let Schema = mongoose.Schema;

let UserSchema = new Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: {
    type: String,
    unique: true
  },
  address: { type: String },
  city: { type: String },
  zip: { type: String },
  country: { type: String },
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }]

});
// get user with most answers
UserSchema.method('answer', function answering(answer, cb) {
  this.answered += 1;
  this.parent().save(cb);
})

// BandSchema.virtual('numMembers', {
//   ref: 'Person', // The model to use
//   localField: 'name', // Find people where `localField`
//   foreignField: 'band', // is equal to `foreignField`
//   count: true // And only get the number of docs
// });

// // Later
// const doc = await Band.findOne({ name: 'Motley Crue' }).
//   populate('numMembers');
// doc.numMembers; // 2
// hash password before saving
// UserSchema.pre('save', (next) => {
//     var user = this;
//     if (this.isModified('password') || this.isNew) {
//         bcrypt.genSalt(10, (err, salt) => {
//             if (err) { return next(err); }
//             bcrypt.hash(user.password, salt, (err, hash) => {
//                 if (err) {
//                     return next(err);
//                 }
//                 user.password = hash;
//                 next();
//             });
//         });

//     }
//     else {
//         return next();
//     }
// });
// //compare hashed passwords
// UserSchema.methods.comparePassword = function (pw, cb) {
//     bcrypt.compare(pw, this.password, (err, isMatch) => {
//         if (err) { return cb(err); }
//         cb(null, isMatch);
//     });
// };
let User = mongoose.model('User', UserSchema);
module.exports = User;
