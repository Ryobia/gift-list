const { Schema, model } = require("mongoose");

const storeSchema = new Schema(
  {
    storeName: {
      type: String,
      required: true,
    },
    storeURL: {
      type: String,
      required: false,
    }, 
    storeLogo: {
      type: String,
      required: false,
    },
    storeDescription: {
        type: String,
        required: false,
    },
    dateAdded: {
      type: Date,
      default: Date.now,
    },
    tags: {
      type: [String],
      required: false,
    }

  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

const Store = model("Store", storeSchema);


module.exports = Store;
