const _ = require('lodash');
const {ObjectID} = require('mongodb');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Player} = require('./models/player');

var app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname+'./../public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.post('/player', (req, res) => {
  var player = new Player({
    playername: req.body.playername,
    age: req.body.age,
    city: req.body.city,
    country: req.body.country,
    gender: req.body.gender,
    handedness: req.body.handedness,
    broom: req.body.broom,
    position: req.body.position,
    team: req.body.team,
    favoritecolor: req.body.favoritecolor,
    headshot: req.body.headshot
  });
  return player.save().then((doc) => {
    return res.status(200).json(doc);
  }, (e) => {
    return res.status(400).send(e);
  });
});

app.get('/players', (req, res) => {
  Player.find().then((players) => {
    res.status(200).json(players);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/players/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Player.findById(id).then((player) => {
    if (player) {
      res.status(200).json(player);
    } else {
      return res.status(404).send();
    }
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/players/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Player.findByIdAndRemove(id).then((player) => {
    if (player) {
      res.status(200).json(player);
    } else {
      return res.status(404).send();
    }
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/players/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['playername', 'age', 'city', 'country', 'gender', 'handedness', 'broom', 'position', 'team', 'favoritecolor', 'headshot']);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Player.findByIdAndUpdate(id, {$set: body}, {new: true}).then((player) => {
    if (!player) {
      return res.status(404).send();
    } else {
      res.status(200).json(player);
    }
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
