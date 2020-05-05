import { Router } from 'express'
import asyncFn from '../middlewares/asyncMiddleware'
import validate from '../middlewares/validationMiddleware'
import ScheduleValidator from '../validations/validators/ScheduleValidator'
import authMiddleware from '../middlewares/authMiddleware'
import identityMiddleware from '../middlewares/identityMiddleware'
import ScheduleController from '../controllers/ScheduleController'

const scheduleController = new ScheduleController()

const router = Router()

router.use(authMiddleware)
router.use(identityMiddleware)

router.get('/', asyncFn(scheduleController.list.bind(scheduleController)))
router.get('/:id', asyncFn(scheduleController.show.bind(scheduleController)))
router.post('/', validate(ScheduleValidator.validate()),
  asyncFn(scheduleController.create.bind(scheduleController)))

export default router
