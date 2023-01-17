import { Prediction } from '../models/prediction.js'

function newPrediction(req, res) {
  Prediction.find({})
  .then(predictions => {
    res.render('predictions/new', {
      title: 'Add Prediction',
      predictions: predictions,
    })
  })
  .catch(err => {
    res.redirect("/games")
  })
}

function create(req, res) {
  Prediction.create(req.body)
  .then(prediction => {
    res.redirect("/predictions/new")
  })
  .catch(err => {
    console.log(err)
    res.redirect("/games")
  })
}

export {
  newPrediction as new,
  create,
}