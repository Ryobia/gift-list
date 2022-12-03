const { Schema, model } = require("mongoose");

const listSchema = new Schema({
  listDate: {
    type: Date,
    default: Date.now,
  },
  listUser: {
    type: String,
  },
  listName: {
    type: String,
    required: true
  },
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
    virtuals: true
  }
}
);

const List = model("List", listSchema);

listSchema.virtual('listUsersCount').get(function() {
  return this.listUsers.length;
});

module.exports = List;
