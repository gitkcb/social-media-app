const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  thoughts: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    },
  ],
  friends: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
  ],
},
{
    toJSON: {
      virtuals: true,
        
    },
    id: false,
});
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})
const User = model('user', userSchema);

module.exports = User;
