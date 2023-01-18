import { Router } from 'express'
import * as playersCtrl from '../controllers/players.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/new', isLoggedIn, playersCtrl.new)

router.post('/', isLoggedIn, playersCtrl.create)

export {
  router
}