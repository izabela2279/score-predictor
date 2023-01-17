import { Player } from '../models/player.js'

function newPlayer(req, res) {
  Player.find({})
  .then(players => {
    res.render('players/new', {
      title: 'Add Player',
      players: players,
    })
  })
  .catch(err => {
    res.redirect("/games")
  })
}

function create(req, res) {
  Player.create(req.body)
  .then(player => {
    res.redirect("/players/new")
  })
  .catch(err => {
    console.log(err)
    res.redirect("/games")
  })
}

export {
  newPlayer as new,
  create,
}