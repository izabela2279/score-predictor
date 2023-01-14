import { Game } from "../models/game.js"

function newGame(req, res) {
  res.render("games/new", {
    title: "Add Game",
  })
}

function index(req, res) {
  Game.find({})
  .then(games => {
    res.render('games/index', {
      title: "All Games",
      games,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

export {
  index,
  newGame as new,
}