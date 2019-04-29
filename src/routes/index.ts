import { Router } from 'express'
import business from './business'
import setup from './setup'

const router = Router()

router.use('/business', business)
router.use('/setup', setup)

export default router
