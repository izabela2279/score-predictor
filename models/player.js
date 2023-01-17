import mongoose from "mongoose"

const Schema = mongoose.Schema

const playerSchema = new Schema({
  player: {
    type: String,
    required: true,
  }, 
}, {
  timestamps: true
})

const Player = mongoose.model("Player", playerSchema)

export {
  Player
}