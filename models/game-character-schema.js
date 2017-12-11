const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// This is gameCharacter Schema
const gameCharacterSchema = new Schema({
    name: {type: String, max: 255},
    punch: {type: Number, max: 15, min:10},
    kick: {type: Number, max: 15, min:10},
    speed: {type: Number, max: 15, min:10},
    jump: {type: Number, max: 15, min:10},
    image_src: { type: String }    
});

// now to create gameCharacterSchema Model

const myGameCharacters = mongoose.model('my_game_characters', gameCharacterSchema);
module.exports = myGameCharacters;