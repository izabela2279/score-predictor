import mongoose from "mongoose"

const Schema = mongoose.Schema

const predictionSchema = new Schema({
  homeTeam: {
    type: String,
    required: true,
  },
  homeScore: {
    type: Number,
    required: true,
  }, 
  awayTeam: {
    type: String,
    required: true,
  },
  awayScore: {
    type: Number,
    required: true,
  }, 
}, {
  timestamps: true
})

const Prediction = mongoose.model("Prediction", predictionSchema)

export {
  Prediction
}