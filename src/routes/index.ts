import { Router } from 'express'
import business from './business'
import service from './service'
import setup from './setup'
import product from './product'
import professional from './professional'
import customer from './customer'
import payment from './payment'
import order from './order'
import schedule from './schedule'

const router = Router()

router.use('/business', business)
router.use('/setup', setup)
router.use('/service', service)
router.use('/product', product)
router.use('/professional', professional)
router.use('/customer', customer)
router.use('/payment', payment)
router.use('/order', order)
router.use('/schedule', schedule)

export default router
