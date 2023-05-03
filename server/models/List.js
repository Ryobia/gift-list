const { Schema, model } = require("mongoose");

const listSchema = new Schema(
  {
    listDate: {
      type: Date,
      default: Date.now,
    },
    listUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    listName: {
      type: String,
      required: true,
    },
    listFolders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Folder",
      }
    ],
    listUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

const List = model("List", listSchema);


module.exports = List;
