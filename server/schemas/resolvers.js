const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { User, List, Item } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("lists")
          .populate("items")
          .populate("listUser")
          .populate("listUsers")
          .populate("friends");

        return userData;
      }

      throw new AuthenticationError("You are not logged in");
    },
    myFriends: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("lists")
          .populate("items")
          .populate("listUsers")
          .populate("friendRequests")
          .populate("friends");

        return userData;
      }

      throw new AuthenticationError("You are not logged in");
    },

    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("friends")
        .populate("lists")
        .populate("items");
    },
    user: async (parent, { email }) => {
      return User.findOne({ email })
        .select("-__v -password")
        .populate("lists")
        .populate("listUser")
        .populate("items")
        .populate("users")
        .populate("friends");
    },
    list: async (parent, { _id }) => {
      return List.findById(_id)
        .select("-__v")
        .populate("items")
        .populate("listUser")
        .populate("listUsers")
        .populate("friends")
        .populate("lists");
    },
    item: async (parent, { _id }) => {
      return Item.findById(_id)
        .select("-__v")
        .populate("items")
        .populate("listUser")
        .populate("listUsers")
        .populate("lists");
    },
    allLists: async () => {
      return List.find()
        .select("-__v")
        .populate("lists")
        .populate("items")
        .populate("listUser")
        .populate("friends")
        .populate("listUsers");
    },

    allItems: async () => {
      return Item.find();
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      if (!args || args.password.length < 8) {
        throw new UserInputError(
          "All fields required and password length must be 8 characters or more."
        );
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

    removeList: async (parent, { _id }, context) => {
      console.log(context);
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { lists: _id } },
          { new: true, multi: true }
        ).populate("lists", "items");

        await List.findByIdAndDelete({ _id: _id }).populate("lists", "users");

        return updatedUser;
      }

      throw new AuthenticationError("Not logged in");
    },
    addItem: async (parent, args, context) => {
      const { listId, ...rest } = args;
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

    addUserToList: async (parent, { _id, userId }, context) => {
      if (context.user) {
        console.log(userId, _id);

        const updatedUserList = await List.findByIdAndUpdate(
          { _id: _id },
          { $addToSet: { listUsers: userId } },
          { new: true, multi: true }
        ).populate("listUsers");

        return updatedUserList;
      }

      throw new AuthenticationError("Not logged in");
    },

    removeItem: async (parent, { _id, listId }, context) => {
      console.log(context);
      if (context.user) {
        const deletedList = await List.findByIdAndUpdate(
          { _id: listId },
          { $pull: { items: _id } },
          { new: true, multi: true }
        ).populate("lists", "items", "users");

        await Item.findByIdAndDelete({ _id: _id }).populate("lists", "users");

        return deletedList;
      }

      throw new AuthenticationError("Not logged in");
    },

    updateItem: async (parent, args, context) => {
      console.log(args);
      let { _id, ...rest } = args;
      if (context.user) {
        return await Item.findByIdAndUpdate(_id, rest, {
          new: true,
          multi: true,
        }).populate("items", "lists", "users");
      }

      throw new AuthenticationError("Not logged in");
    },

    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser1 = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate("friends", "users");
        await User.findOneAndUpdate(
          { _id: friendId },
          { $addToSet: { friends: context.user._id } },
          { new: true }
        ).populate("friends", "users");
        

        return (updatedUser1);
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const removedFriend = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { friends: friendId } },
          { new: true, multi: true }
        ).populate("users", "friends");
        await User.findByIdAndUpdate(
          { _id: friendId },
          { $pull: { friends: context.user._id } },
          { new: true, multi: true }
        ).populate("users", "friends");
        return removedFriend;
      }

      throw new AuthenticationError("Not logged in");
    },
    addFriendRequest: async (parent, { userId, friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: friendId },
          { $addToSet: { friendRequests: userId } },
          { new: true }
        ).populate("friends", "users");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeFriendRequest: async (parent, { friendId }, context) => {
      if (context.user) {
        const removedFriendRequest = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { friendRequests: friendId } },
          { new: true, multi: true }
        ).populate("users", "friends");

        return removedFriendRequest;
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
