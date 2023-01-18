import { Router } from "express"
import * as gamesCtrl from "../controllers/games.js"
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

router.get("/", gamesCtrl.index)
router.get("/new", isLoggedIn, gamesCtrl.new)
router.get("/:id", gamesCtrl.show)
router.get("/:id/edit", gamesCtrl.edit)

router.put("/:id", gamesCtrl.update)

router.post("/", gamesCtrl.create)
router.post("/:id/players", gamesCtrl.addToPlayerPrediction)
router.post("/:id/scorePrediction", isLoggedIn, gamesCtrl.addScorePrediction)

router.delete("/:id", gamesCtrl.delete)

export {
	router
}