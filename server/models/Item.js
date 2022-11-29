const { Schema, model } = require("mongoose");

const itemSchema = new Schema(
  {
    itemDate: {
      type: Date,
      default: Date.now,
    },
    itemUser: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    itemName: {
      type: String,
      required: true,
    },
    itemLink: {
      type: String,
    },
    itemDetails: {
      type: String,
    },
    itemPrice: {
      type: Number,
    },
    priority: {
      type: Number,
    },
    purchased: {
      type: Boolean,
      default: false,
    },
    linkedItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Item = model("Item", itemSchema);

module.exports = Item;
