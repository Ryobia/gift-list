const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [/^[a-zA-Z0-9]+$/, 'Invalid Username']
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    },
    dateJoined: {
      type: Date,
      default: Date.now
    },
    lists: [
      {
        type: Schema.Types.ObjectId,
        ref: 'List'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);


// userSchema.pre('save', async function(next) {
//   if (this.isNew) {
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
//   }

//   next();
// });

userSchema.pre('save', async function (next) {
  try {
      if (!this.isModified('password')) {
          return next();
      }
      const hashed = await bcrypt.hash(this.password, 10);
      this.password = hashed;
  } catch (err) {
      return next(err);
  }
});

userSchema.pre('findOneAndUpdate', async function (next) {
  try {
      if (this._update.password) {
          const hashed = await bcrypt.hash(this._update.password, 10)
          this._update.password = hashed;
      }
      next();
  } catch (err) {
      return next(err);
  }
});

userSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;