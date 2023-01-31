const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');
//aggregate function to get the number of users overall
const userCount = async () => 
 User.aggregate()
    .count('usercount')
    .then((numberOfUsers) => numberOfUsers);


module.exports = {
    //Get all users
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                const userObj = {
                    users,
                    userCount: await userCount(),

                };
                return res.json(userObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.studentId })
        .select('-__v')
        .then(async (user) =>
        !user
            ? res.status(404).json({ message: 'No user with that ID'})
            : res.json({
                user,

            })
            )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    //create a user
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    }

}