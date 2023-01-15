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
    res.redirect("/games")
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

function show(req, res) {
  Game.findById(req.params.id)
  .then(game => {
    res.render("games/show", { 
      title: "Game Detail", 
      game: game,
    })    
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function deleteGame(req, res) {
  Game.findByIdAndDelete(req.params.id)
  .then(game => {
    res.redirect("/games") 
  })
  .catch(err => {
    console.log(err)
    res.redirect("/games")
  })
}

function edit(req, res) {
  Game.findById(req.params.id)
  .then(game => {
    res.render("games/edit", { 
      title: "Edit Game", 
      game,
    })    
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function update(req, res) {
  for (const key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }
  Game.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(game => {
    console.log(game);
    res.redirect(`/games/${game._id}`)
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
  show,
  deleteGame as delete,
  edit,
  update,
}