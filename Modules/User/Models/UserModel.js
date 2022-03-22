const { text } = require('express');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let constants = require('../../../Utils/ModelConstants');


//sub document
let childSchema = new Schema({
  address : { type: String },
  city : { type: String },
  state : { type: String },
  Country : { type: String },
})

let schema = new Schema({
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String , unique:true },
    password: { type: String },
    gender: { type: String },
    child : [childSchema] 
},{
    collection: constants.UserModel ,timestamps: true, 
    toObject: {
      transform: function (doc, obj) {
        obj.id = obj._id;
        delete obj._id;
      }
    },
    toJSON: {
      transform: function (doc, obj) {
        obj.id = obj._id;
        delete obj._id;
      }
    }
});
//schema.index({ firstname: 1 , lastname: 1 })


mongoose.model( constants.UserModel , schema );
//let users = mongoose.model( 'users' , schema );
//module.exports = users