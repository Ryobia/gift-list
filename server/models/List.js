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

listSchema.pre('deleteMany', function(next) {
  var list = this;
  list.model('Assignment').deleteOne({ list: list._id }, next);
});

const List = model('List', listSchema);

module.exports = List;