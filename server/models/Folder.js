const { Schema, model } = require("mongoose");

const folderSchema = new Schema(
  {
    folderDate: {
      type: Date,
      default: Date.now,
    },
    folderName: {
      type: String,
      required: true,
    },
    folderItems: [
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

const Folder = model("Folder", folderSchema);


module.exports = Folder;