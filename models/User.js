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
    match: [
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
      "Need a valid email address"
    ]
  },
  thoughts: [
    {
        type: Schema.Types.ObjectId,
        ref: "thought",
    },
  ],
  friends: [
    {
        type: Schema.Types.ObjectId,
        ref: "user",
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
