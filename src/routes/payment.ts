import { Router } from 'express'
import asyncFn from '../middlewares/asyncMiddleware'
import PaymentController from '../controllers/PaymentController'
import authMiddleware from '../middlewares/authMiddleware'
import identityMiddleware from '../middlewares/identityMiddleware'

const paymentController = new PaymentController()

const router = Router()

router.use(authMiddleware)
router.use(identityMiddleware)

router.get('/', asyncFn(paymentController.list.bind(paymentController)))
router.get('/:id', asyncFn(paymentController.show.bind(paymentController)))

export default router
