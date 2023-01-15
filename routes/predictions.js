import { Router } from 'express'
import * as predictionsCtrl from '../controllers/predictions.js'

const router = Router()

router.get('/new', predictionsCtrl.new)

router.post('/', predictionsCtrl.create)

export {
  router
}