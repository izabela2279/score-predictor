import mongoose from "mongoose"

const Schema = mongoose.Schema

const predictionSchema = new Schema({
  homeScore: Number,
  awayScore: Number,
  commenter: { type: Schema.Types.ObjectId, ref: "Profile"}
})

const gameSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  playerPrediction: [{type: Schema.Types.ObjectId, ref: "Player"}],
  scorePrediction: [predictionSchema]
}, {
  timestamps: true
})

const Game = mongoose.model("Game", gameSchema)

export {
  Game
}