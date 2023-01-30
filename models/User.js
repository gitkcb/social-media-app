const { Schema, model } = require("mongoose");

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
        
    }
});
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})
const User = model('user', userSchema);

module.exports = User;
