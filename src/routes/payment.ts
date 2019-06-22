import { Router } from 'express'
import asyncFn from '../middlewares/asyncMiddleware'
import PaymentController from '../controllers/PaymentController'

const paymentController = new PaymentController()

const router = Router()

router.get('/', asyncFn(paymentController.list.bind(paymentController)))
router.get('/:id', asyncFn(paymentController.show.bind(paymentController)))

export default router
