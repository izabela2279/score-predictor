import { Game } from "../models/game.js"

function newGame(req, res) {
  res.render("games/new", {
    title: "Add Game",
  })
}

function create(req, res) {
  for (const key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }
  console.log(req.body);
  Game.create(req.body)
  .then(game => {
    console.log(game);
    res.redirect(`/games/${game._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect("/games")
  })
}

function index(req, res) {
  Game.find({})
  .then(games => {
    res.render("games/index", {
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
  create,
}