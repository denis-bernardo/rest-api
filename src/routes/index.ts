import { Router } from 'express'
import business from './business'
import service from './service'
import setup from './setup'
import product from './product'

const router = Router()

router.use('/business', business)
router.use('/setup', setup)
router.use('/service', service)
router.use('/product', product)

export default router
