const { AuthenticationError, UserInputError } = require("apollo-server-express");
const { User, List, Item } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("lists", "items");

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
      .populate('lists', "items");

    },
    list: async (parent, { _id }) => {
      return List.findById(_id)
      .select("-__v")
      .populate('items');

    },
    item: async (parent, { _id }) => {
      return Item.findById(_id)
      .select("-__v");
    },
    allLists: async () => {
      return List.find()
    },
    
    allItems: async () => {
      return Item.find()
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

    removeList: async (parent, {_id}, context) => {
      console.log(context);
      if (context.user) {

        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { lists: _id } },
          { new: true, multi: true }
        ).populate('lists', 'items');

        return updatedUser;
      }

      throw new AuthenticationError("Not logged in");
    },
    addItem: async (parent, args, context) => {
      const { listId, ...rest} = args;
      if (context.user) {
        console.log(args);

        const item = await Item.create(args);

        await List.findByIdAndUpdate(
          { _id: listId },
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