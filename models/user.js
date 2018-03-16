var mongoose = require('mongoose')
var passportLocalMongosoe = require('passport-local-mongoose')

var UserSchema = new mongoose.Schema({
    username : String,
    passpord : String
})

UserSchema.plugin(passportLocalMongosoe)

module.exports = mongoose.model('User', UserSchema)
