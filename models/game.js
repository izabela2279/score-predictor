import mongoose from "mongoose"

const Schema = mongoose.Schema

const gameSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  playerPrediction: [{type: Schema.Types.ObjectId, ref: "Player"}]
}, {
  timestamps: true
})

const Game = mongoose.model("Game", gameSchema)

export {
  Game
}