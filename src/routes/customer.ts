import { Router } from 'express'
import asyncFn from '../middlewares/asyncMiddleware'
import validate from '../middlewares/validationMiddleware'
import customerValidator from '../validations/validators/CustomerValidator'
import CustomerController from '../controllers/CustomerController'

const customerController = new CustomerController()

const router = Router()

router.get('/', asyncFn(customerController.list.bind(customerController)))
router.get('/:id', asyncFn(customerController.show.bind(customerController)))
router.post('/', validate(customerValidator.validate()),
  asyncFn(customerController.create.bind(customerController)))
router.put('/:id', validate(customerValidator.validate(false)),
  asyncFn(customerController.update.bind(customerController)))
router.delete('/:id', asyncFn(customerController.destroy.bind(customerController)))

export default router
