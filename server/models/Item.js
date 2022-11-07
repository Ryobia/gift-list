const { Schema, model } = require('mongoose');

const itemSchema = new Schema(
  {
    itemDate: {
      type: Date,
      default: Date.now,
    },
    itemUser: {
      type: String,
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
    purchased: {
      type: Boolean,
      default: false,
    }
  }
);

const Item = model('Item', itemSchema);

module.exports = Item;