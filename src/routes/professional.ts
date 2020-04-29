import { Router } from 'express'
import ProfessionalController from '../controllers/ProfessionalController'
import asyncFn from '../middlewares/asyncMiddleware'
import validate from '../middlewares/validationMiddleware'
import professionalValidator from '../validations/validators/ProfessionalValidator'
import authMiddleware from '../middlewares/authMiddleware'
import identityMiddleware from '../middlewares/identityMiddleware'

const professionalController = new ProfessionalController()

const router = Router()

router.use(authMiddleware)
router.use(identityMiddleware)

router.get('/', asyncFn(professionalController.list.bind(professionalController)))
router.get('/:id', asyncFn(professionalController.show.bind(professionalController)))
router.post('/', validate(professionalValidator.validate()),
  asyncFn(professionalController.create.bind(professionalController)))
router.put('/:id', validate(professionalValidator.validate(false)),
  asyncFn(professionalController.update.bind(professionalController)))
router.delete('/:id', asyncFn(professionalController.destroy.bind(professionalController)))

export default router
