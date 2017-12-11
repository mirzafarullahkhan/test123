"use strict"
let express = require('express');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@ds129906.mlab.com:29906/mookahdb', {
    useMongoClient: true
}).then(function(){
    console.log("Database is connected");
});

// This is UserProfile Schema
let userProfileSchema = new Schema(
    {
    first_name: {type: String, max: 255},
    last_name: {type: String, max: 255},
    display_name: {type: String, required: true, unique: true, max: 255},
    email: {type: String, required: true, lowercase: true},
    password: {type: String, required: true, max: 125 },
    password_confirmation: {type: String, required: true, max: 125 },
    win: {type: Number, default: 0},
    lose: {type: Number, default: 0},
    timestamp: {type: Date, default: Date.now}
   
}, { runSettersOnQuery: true });

// now to create userProfile Model

let user_profiles = mongoose.model('user_profiles', userProfileSchema);
module.exports = user_profiles;