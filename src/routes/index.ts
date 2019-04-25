import { Router } from 'express'
import business from './business'

const router = Router()

router.use('/business', business)

export default router
