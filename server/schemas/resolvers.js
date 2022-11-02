const { AuthenticationError, UserInputError } = require("apollo-server-express");
const { User, List, Item } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("scores");

        return userData;
      }

      throw new AuthenticationError("You are not logged in");
    },

    users: async () => {
      return User.find()
      .select("-__v -password")
    },
    user: async (parent, { _id }) => {
      return User.findById(_id)
      .select("-__v -password")
      .populate('scores');

    },
    allLists: async () => {
      return List.find()
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      if (!args || args.password.length < 8) {
        throw new UserInputError('All fields required and password length must be 8 characters or more.')
      } 
      const user = await User.create(args);
      const token = signToken(user);


      return { token, user };
    },
    addList: async (parent, args, context) => {
      console.log(context);
      if (context.user) {
        const list = await List.create(args);

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { lists: list._id } },
          { new: true }
        );

        return list;
      }

      throw new AuthenticationError("Not logged in");
    },
    addItem: async (parent, args, context) => {
      console.log(context);
      if (context.user) {
        const item = await Item.create(args);

        await List.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { items: item._id } },
          { new: true }
        );

        return item;
      }

      throw new AuthenticationError("Not logged in");
    },
    updateUser: async (parent, args, context) => {
      console.log(context);
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;