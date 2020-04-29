import { Router } from 'express'
import asyncFn from '../middlewares/asyncMiddleware'
import OrderController from '../controllers/OrderController'
import validate from '../middlewares/validationMiddleware'
import orderValidator from '../validations/validators/OrderValidator'
import authMiddleware from '../middlewares/authMiddleware'
import identityMiddleware from '../middlewares/identityMiddleware'

const orderController = new OrderController()

const router = Router()

router.use(authMiddleware)
router.use(identityMiddleware)

router.get('/', asyncFn(orderController.list.bind(orderController)))
router.post('/', validate(orderValidator.validate()),
  asyncFn(orderController.create.bind(orderController)))
router.get('/status', asyncFn(orderController.status.bind(orderController)))
router.get('/:id', asyncFn(orderController.show.bind(orderController)))
router.put('/:id', validate(orderValidator.validate(false)),
  asyncFn(orderController.update.bind(orderController)))
router.delete('/:id', asyncFn(orderController.destroy.bind(orderController)))

export default router
