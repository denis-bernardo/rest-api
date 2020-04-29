import { Router } from 'express'
import BusinessController from '../controllers/BusinessController'
import asyncFn from '../middlewares/asyncMiddleware'
import validate from '../middlewares/validationMiddleware'
import businessValidator from '../validations/validators/BusinessValidator'
import authMiddleware from '../middlewares/authMiddleware'
import identityMiddleware from '../middlewares/identityMiddleware'

const businessController = new BusinessController()

const router = Router()

router.use(authMiddleware)
router.use(identityMiddleware)

router.get('/', asyncFn(businessController.list.bind(businessController)))
router.get('/:id', asyncFn(businessController.show.bind(businessController)))
router.post('/', validate(businessValidator.validate()),
  asyncFn(businessController.create.bind(businessController)))
router.put('/:id', validate(businessValidator.validate(false)),
  asyncFn(businessController.update.bind(businessController)))

export default router
