'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    /*'_id' : {
        type : String
    },*/
    'name' : {
        type : String
    },
    'password':{
        type: String
    },
    'id' : {
        type : String
    },
},
{
    collection : 'user'
});


module.exports = mongoose.model('User', User);