import { Router } from 'express'
import * as gamesCtrl from '../controllers/games.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get("/", gamesCtrl.index)
router.get('/new', isLoggedIn, gamesCtrl.new)
router.get('/:id', gamesCtrl.show)
router.post("/", gamesCtrl.create)

export {
	router
}