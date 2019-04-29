import { Request, Response } from 'express'
import SetupService from '../services/SetupService'

export default class SetupController {
  public async create (req: Request, res: Response) {
    const setupService = new SetupService()
    await setupService.create(req.body)
    return res.status(201).json()
  }
}
