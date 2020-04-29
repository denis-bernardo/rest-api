import { Router } from 'express'
import asyncFn from '../middlewares/asyncMiddleware'
import ServiceController from '../controllers/ServiceController'
import validate from '../middlewares/validationMiddleware'
import serviceValidator from '../validations/validators/ServiceValidator'
import authMiddleware from '../middlewares/authMiddleware'
import identityMiddleware from '../middlewares/identityMiddleware'

const serviceController = new ServiceController()

const router = Router()

router.use(authMiddleware)
router.use(identityMiddleware)

router.get('/', asyncFn(serviceController.list.bind(serviceController)))
router.post('/', validate(serviceValidator.validateCreation()),
  asyncFn(serviceController.create.bind(serviceController)))
router.get('/:id', asyncFn(serviceController.show.bind(serviceController)))
router.put('/:id', validate(serviceValidator.validateUpdate()),
  asyncFn(serviceController.update.bind(serviceController)))
router.delete('/:id', asyncFn(serviceController.destroy.bind(serviceController)))

export default router
