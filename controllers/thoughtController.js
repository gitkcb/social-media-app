const { Thought, User } = require("../models");

module.exports = {
  //get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  //get single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id}) => {
        return User.findOneAndUpdate(
            {_id :req.body.userId },
            { $push: {thoughts: _id } },
            {new: true}
        );
      })
      .then((thought) => 
      !thought 
       ? res.status(404).json({ message: "No user with this ID "})
       :res.json(thought))
      
  },
  //delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then((thought) => 
      !thought
       ?res.status(404).json({ message: 'No thought with this ID '})
       :User.findOneAndUpdate (
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        {new : true }
        )
       )
       .then((user) => 
       !user 
       ? res.status(404).json({ message: 'Thought deleted!, no user found'})
       :res.json({ message: 'Thought deleted'})
       )
       .catch((err) => res.status(500).json(err));


  },
  //update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
        )
    .then((user) => 
     !user
     ? res.status(404).json({ message: 'No thought with this ID' })
     : res.json(user)
     )
     .catch((err) => res.status(500).json(err));
  },
  //create a reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body }},
        { runValidators: true, new: true }
    )
    .then((thought) => 
    !thought 
     ?res.status(404).json({ message: 'No thought found with this ID'})
     : res.json(thought)
     )
     .catch((err) => res.status(500).json(err));
  },
  //delete a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate( 
        { _id: req.params.thoughtId },
        { $pull: {reactions: { reactionId: req.params,reactionId} } },
        { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought 
         ?res.status(404).json({ message: "No thought found with this ID"})
         : res.json(thought)
         )
         .catch((err) => res.status(500).json(err));
  },


};
