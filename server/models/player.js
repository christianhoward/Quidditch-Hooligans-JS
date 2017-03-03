var mongoose = require('mongoose');

var Player = mongoose.model('Player', {
  playername: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  age: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  city: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  country: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  gender: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  handedness: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  broom: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  position: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  team: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  favoritecolor: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  headshot: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

module.exports = {Player};
