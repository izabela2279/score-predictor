import { Game } from "../models/game.js"
import { Player } from "../models/player.js"

function newGame(req, res) {
  res.render("games/new", {
    title: "Add Game",
  })
}

function create(req, res) {
  for (const key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }
  req.body.creator = req.user.profile._id
  Game.create(req.body)
  .then(game => {
    res.redirect(`/games/${game._id}`)
  })
  .catch(err => {
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
    res.redirect("/")
  })
}

function show(req, res) {
  Game.findById(req.params.id)
  .populate([
    {path: "creator"},
    {path: "playerPrediction"},
    {path: "scorePrediction.commenter"}
  ])
  .then(game => {
    Player.find({_id: {$nin: game.playerPrediction}})
    .then (players => {
      res.render("games/show", { 
        title: "Game Details", 
        game: game,
        players: players,
      }) 
    })
    .catch(err => {
      res.redirect("/games")    
    })
  })
  .catch(err => {
    res.redirect("/")
  })
}

function deleteGame(req, res) {
  Game.findByIdAndDelete(req.params.id)
  .then(game => {
    if (game.creator.equals(req.user.profile._id)) {
      game.delete()
      .then(()=> {
        res.redirect("/games") 
      })
    } else {
      throw new Error("Only creator can delete the game")
    }
  })
  .catch(err => {
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
    res.redirect("/")
  })
}

function update(req, res) {
  for (const key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }
  Game.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(game => {
    if (game.creator.equals(req.user.profile._id)){
      game.updateOne(req.body)
      .then(()=> {
        res.redirect(`/games/${game._id}`)
      })
    } else {
      throw new Error("Only creator can update the game")
    }  
  })
  .catch(err => {
    res.redirect("/")
  })
}

function addToPlayerPrediction(req, res) {
  Game.findById(req.params.id)
  .then(game => {
    game.playerPrediction.push(req.body.playerId)
    game.save()
		.then(() => {
		res.redirect(`/games/${game._id}`)
		})
    .catch(err => {
      res.redirect("/games")
    })
  })
  .catch(err => {
    res.redirect("/games")
  })
}

function addScorePrediction(req, res) {
  Game.findById(req.params.id)
  .then(game => {
    req.body.commenter = req.user.profile._id
    game.scorePrediction.push(req.body)
    game.save()
    .then(()=> {
      res.redirect(`/games/${game._id}`)
    })
    .catch(err => {
      res.redirect("/games")
    })
  })
  .catch(err => {
    res.redirect("/games")
  })
}

function editPrediction(req, res) {
  Game.findById(req.params.gameId)
  .then(game => {
    const prediction = game.scorePrediction.id(req.params.predictionId)
    if (prediction.commenter.equals(req.user.profile._id)) {
      res.render("games/editPrediction", {
        game, 
        prediction,
        title: "Update Prediction"
      })
    } else {
      throw new Error("Only creator can update the prediction")
    }
  })
  .catch(err => {
    res.redirect("/games")
  })
}

function updatePrediction(req, res) {
  Game.findById(req.params.gameId)
  .then(game => {
    const prediction = game.scorePrediction.id(req.params.predictionId)
    if (prediction.commenter.equals(req.user.profile._id)) {
      prediction.set(req.body)
      game.save()
      .then(() => {
        res.redirect(`/games/${game._id}`)
      })
      .catch(err => {
        res.redirect("/games")
      })
    } else {
      throw new Error("Only creator can update the prediction")
    }
  })
  .catch(err => {
    res.redirect("/games")
  })
}

function deletePrediction(req, res) {
  Game.findById(req.params.gameId)
  .then(game => {
    const prediction = game.scorePrediction.id(req.params.predictionId)
    if (prediction.commenter.equals(req.user.profile._id)) {
      game.scorePrediction.remove(prediction)
      game.save()
      .then(() => {
        res.redirect(`/games/${game._id}`)
      })
      .catch(err => {
        res.redirect("/games")
      })
    } else {
      throw new Error("Only creator can delete the prediction")
    }
  })
  .catch(err => {
    res.redirect("/games")
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
  addToPlayerPrediction,
  addScorePrediction,
  editPrediction,
  updatePrediction,
  deletePrediction,
}