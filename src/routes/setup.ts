import { Router } from 'express'
import asyncFn from '../middlewares/asyncMiddleware'
import validate from '../middlewares/validationMiddleware'
import setupValidator from '../validations/validators/SetupValidator'
import SetupController from '../controllers/SetupController'

const setupController = new SetupController()

const router = Router()

router.post('/', validate(setupValidator.validateCreation()),
  asyncFn(setupController.create.bind(setupController)))

export default router
