const mongoose = require('mongoose');
const passport = require('passport');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    firstname:{
        type:String,
        default:''
    },
    lastname:{
        type:String,
        default:''
    },
    facebookId: String,
    admin:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema,'user');

module.exports = User; 