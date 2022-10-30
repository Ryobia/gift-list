const { Schema, model } = require('mongoose');

const listSchema = new Schema(
  {
    listDate: {
      type: Date,
      default: Date.now,
    },
    listUser: {
      type: String,
    },
    listName: {
      type: String,
    },
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        }
    ]
  }
);

const List = model('List', listSchema);

module.exports = List;