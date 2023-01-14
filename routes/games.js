import { Router } from 'express'
import * as gamesCtrl from '../controllers/games.js'

const router = Router()

router.get('/new', gamesCtrl.new)

export {
	router
}